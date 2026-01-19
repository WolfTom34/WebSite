import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { THEME } from '../../shared/constants/theme';
import { useBootSequence } from '../../shared/context/boot-sequence-context';

const atmosphereVertexShader = `
uniform float uTime;
uniform vec3 uMouse;
uniform vec2 uVelocity; // Cursor Velocity (X, Y)
attribute vec3 color;
attribute float size;
varying vec3 vColor;
// ... (rest of shader)

// Simplex Noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
    vColor = color;
    vec3 pos = position;

    // 1. AMBIENT RIVER FLOW - INTENSIFIED
    // Gentle undulation based on position and time
    // Increased speed (* 0.2) and Amplitude (* 2.0)
    float noise = snoise(pos * 0.05 + vec3(uTime * 0.2));
    pos.x += noise * 2.0; // Stronger drift X
    pos.y += snoise(pos * 0.05 + vec3(uTime * 0.25)) * 2.0; // Stronger drift Y

    // 2. CURSOR WAKE (The Swim)
    // We assume cursor is at z=11, but influence extends deep
    vec3 cursorWorld = vec3(uMouse.x, uMouse.y, 10.0);
    vec3 toParticle = pos - cursorWorld;
    // flattened distance for cylinder wake
    float dist = length(toParticle);
    
    // Wake Radius - Large fit for the void
    float wakeRadius = 25.0;
    float influence = smoothstep(wakeRadius, 0.0, dist); // 1.0 at center, 0.0 at edge
    
    // Drag Force: Move particles in direction of velocity
    // If influence is high, drag them along
    vec3 drag = vec3(uVelocity.x, uVelocity.y, 0.0) * influence * 1.5;
    
    // Repel Force: Push aside slightly to clear path (Bow Wave)
    vec3 repel = normalize(toParticle) * influence * 1.5;
    
    pos += drag + repel;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation
    gl_PointSize = size * (300.0 / -mvPosition.z);
}
`;

const atmosphereFragmentShader = `
varying vec3 vColor;
uniform float uOpacity; // Boot Fade

void main() {
    // Round particles
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    if (r > 1.0) discard;
    
    // Soft edge
    float alpha = 1.0 - smoothstep(0.5, 1.0, r);
    
    gl_FragColor = vec4(vColor, alpha * 0.6 * uOpacity); // Semi-transparent dust with Boot Fade
}
`;

export const Atmosphere = () => {
    const particleCount = 6000; // Restored Volume

    const { positions, colors, sizes } = useMemo(() => {
        /* eslint-disable react-hooks/purity */
        const pos = new Float32Array(particleCount * 3);
        const col = new Float32Array(particleCount * 3);
        const siz = new Float32Array(particleCount);

        const color = new THREE.Color(THEME.COLORS.PLASMA_BLUE);

        for (let i = 0; i < particleCount; i++) {
            // Random distribution in a large volume
            pos[i * 3] = (Math.random() - 0.5) * 350; // Wide X (Increased)
            pos[i * 3 + 1] = (Math.random() - 0.5) * 250; // Wide Y (Increased)
            pos[i * 3 + 2] = (Math.random() - 0.5) * 150; // Depth Range (Deepened)

            col[i * 3] = color.r;
            col[i * 3 + 1] = color.g;
            col[i * 3 + 2] = color.b;

            siz[i] = Math.random() * 1.5 + 0.5; // Larger, more visible "Dust Motes"
        }

        return { positions: pos, colors: col, sizes: siz };
        /* eslint-enable react-hooks/purity */
    }, []);

    const shaderRef = useRef<THREE.ShaderMaterial>(null!);
    const lastMouse = useRef(new THREE.Vector2(0, 0));

    // BOOT SEQUENCE
    const { atmosphereOpacity } = useBootSequence();
    const currentOpacity = useRef(0);

    useFrame((state, delta) => {
        if (!shaderRef.current) return;

        shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;

        // Mouse & Velocity
        const x = (state.mouse.x * state.viewport.width) / 2;
        const y = (state.mouse.y * state.viewport.height) / 2;

        const dx = x - lastMouse.current.x;
        const dy = y - lastMouse.current.y;

        shaderRef.current.uniforms.uMouse.value.set(x, y, 0);

        // Dampened Velocity for smoother wake
        shaderRef.current.uniforms.uVelocity.value.lerp(new THREE.Vector2(dx, dy), 0.1);

        lastMouse.current.set(x, y);

        // FADE IN
        const target = atmosphereOpacity;
        // Fast fade (0.8s approx)
        currentOpacity.current = THREE.MathUtils.lerp(currentOpacity.current, target, delta * 2.0);
        shaderRef.current.uniforms.uOpacity.value = currentOpacity.current;
    });

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(0, 0, 0) },
        uVelocity: { value: new THREE.Vector2(0, 0) },
        uOpacity: { value: 0.0 } // Init invisible
    }), []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={colors}
                    itemSize={3}
                    args={[colors, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={particleCount}
                    array={sizes}
                    itemSize={1}
                    args={[sizes, 1]}
                />
            </bufferGeometry>
            <shaderMaterial
                ref={shaderRef}
                vertexShader={atmosphereVertexShader}
                fragmentShader={atmosphereFragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};
