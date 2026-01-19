import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

import * as THREE from 'three';
import { THEME } from '../../shared/constants/theme';
import { useBootSequence } from '../../shared/context/boot-sequence-context';

import { getVolumetricPoint } from '../../core/domain/neural-physics';

import birthVertexShader from '../shaders/birth.vertex.glsl?raw';
import birthFragmentShader from '../shaders/birth.fragment.glsl?raw';


import { useDeviceTier } from '../../shared/hooks/use-device-tier';

export const CoreLattice = () => {
    const tier = useDeviceTier();
    // Reduce count on ECO devices to save CPU/GPU
    // Restoring density to 450 (The Core needs to look solid)
    const nodeCount = tier === 'ECO' ? 200 : 450;
    const radius = 45; // Tightened from 60 for a denser core appearance
    const maxDistance = 20; // Increased slightly from 18 for better connectivity

    const { nodes, connections } = useMemo(() => {
        const points: THREE.Vector3[] = [];
        for (let i = 0; i < nodeCount; i++) {
            points.push(getVolumetricPoint(radius));
        }

        const lines: THREE.Vector3[] = [];
        for (let i = 0; i < nodeCount; i++) {
            const p1 = points[i];
            if (!p1) continue;
            for (let j = i + 1; j < nodeCount; j++) {
                const p2 = points[j];
                if (p2 && p1.distanceTo(p2) < maxDistance) {
                    lines.push(p1, p2);
                }
            }
        }
        return { nodes: points, connections: lines };
    }, [nodeCount]);

    const nodePositions = useMemo(
        () => new Float32Array(nodes.flatMap((v) => [v.x, v.y, v.z])),
        [nodes]
    );

    const shaderRef = useRef<THREE.ShaderMaterial>(null!);
    const groupRef = useRef<THREE.Group>(null!);
    const lastMouse = useRef(new THREE.Vector2(0, 0));
    const { latticeOpacity } = useBootSequence();



    const linesGeometry = useMemo(() => {
        // Flatten connections into a single Float32Array for lineSegments
        const positions = new Float32Array(connections.length * 3);
        connections.forEach((v, i) => {
            positions[i * 3] = v.x;
            positions[i * 3 + 1] = v.y;
            positions[i * 3 + 2] = v.z;
        });
        return positions;
    }, [connections]);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();
        const dt = delta;

        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.02;
        }

        // Shared Uniform Logic
        const updateUniforms = (shader: THREE.ShaderMaterial) => {
            if (!shader) return;
            shader.uniforms.uTime.value = t;

            // Mouse & Velocity
            const x = (state.mouse.x * state.viewport.width) / 2;
            const y = (state.mouse.y * state.viewport.height) / 2;
            const dx = x - lastMouse.current.x;
            const dy = y - lastMouse.current.y;

            shader.uniforms.uMouse.value.set(x, y, 0);
            shader.uniforms.uVelocity.value.lerp(new THREE.Vector2(dx, dy), 0.1);

            // ANIMATION TRIGGER
            const current = shader.uniforms.uProgress.value;
            if (latticeOpacity > 0.5) {
                if (current < 1.0) {
                    shader.uniforms.uProgress.value = Math.min(current + dt * 0.8, 1.0);
                }
            } else {
                shader.uniforms.uProgress.value = 0;
            }
        };

        if (shaderRef.current) {
            updateUniforms(shaderRef.current);
            // Sync lastMouse only once
            // (We set it here, but updateUniforms reads current state)
        }


        // Update mouse ref at end of frame
        const x = (state.mouse.x * state.viewport.width) / 2;
        const y = (state.mouse.y * state.viewport.height) / 2;
        lastMouse.current.set(x, y);
    });

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uProgress: { value: 0.0 },
            uMouse: { value: new THREE.Vector3(0, 0, 0) },
            uVelocity: { value: new THREE.Vector2(0, 0) },
            uOpacity: { value: 0 }
        }),
        []
    );

    return (
        <group ref={groupRef} position={[0, 10, 15]}>
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[
                            new Float32Array(nodeCount * 3).fill(0).map((_, i) => {
                                // Generate color per vertex (r, g, b)
                                // We need to group by 3 to ensure r,g,b belong to same node
                                const index = Math.floor(i / 3);
                                const component = i % 3;

                                // Deterministic random per node for consistency
                                const rand = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
                                const r = rand - Math.floor(rand);

                                let c;
                                if (r > 0.95) {
                                    c = new THREE.Color(THEME.COLORS.CRIMSON_ALERT); // Tactical Red Spikes (5%)
                                } else if (r > 0.9) {
                                    c = new THREE.Color('#FFFFFF'); // White Hot Highlights (5%)
                                } else if (r > 0.75) {
                                    c = new THREE.Color('#BD00FF'); // Electric Purple/Neural (15%)
                                } else {
                                    c = new THREE.Color(THEME.COLORS.PLASMA_BLUE); // Base Blue (75%)
                                }

                                return component === 0 ? c.r : component === 1 ? c.g : c.b;
                            }),
                            3
                        ]}
                    />
                </bufferGeometry>
                <shaderMaterial
                    ref={shaderRef}
                    vertexShader={birthVertexShader}
                    fragmentShader={birthFragmentShader}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* SYNCHRONIZED LINES */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[linesGeometry, 3]} />
                </bufferGeometry>
                <lineBasicMaterial
                    color={THEME.COLORS.TITANIUM}
                    transparent
                    opacity={0.6}
                    linewidth={1.5} // Increased slightly from 1.0
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>

            {/* CORE GLOW */}
            <mesh>
                <sphereGeometry args={[3, 16, 16]} />
                <meshStandardMaterial
                    color="#FFFFFF"
                    emissive={THEME.COLORS.PLASMA_BLUE}
                    emissiveIntensity={10}
                />
            </mesh>
            <pointLight color={THEME.COLORS.PLASMA_BLUE} intensity={800} distance={150} />
        </group>
    );
};
