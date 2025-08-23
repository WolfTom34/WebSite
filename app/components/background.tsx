"use client";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useRef, useEffect } from "react";

/* ---------- SHADER ---------- */
const BackgroundMaterial = shaderMaterial(
  { time: 0, mouse: [0.5, 0.5] },
  `
    uniform vec2 mouse;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  `
    uniform float time;
    uniform vec2 mouse;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i+vec2(1.0,0.0));
      float c = hash(i+vec2(0.0,1.0));
      float d = hash(i+vec2(1.0,1.0));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
    }

    float sonar(vec2 uv, vec2 center, float speed, float spread) {
      float d = length(uv - center);
      d += (noise(uv*20.0 + time*0.1) - 0.5) * 0.005;
      float wave = sin((d - time*speed*0.7) * spread);
      return exp(-40.0 * abs(wave));
    }

    void main() {
      vec2 uv = vUv;
      uv += (mouse - 0.5) * 0.06;

      // Couleur de base légèrement plus claire avec teinte bleue
      vec3 baseColor = vec3(0.04, 0.04, 0.06);
      
      // Ondes sonar
      float s1 = sonar(uv, vec2(0.3,0.3),0.025,50.0);
      float s2 = sonar(uv, vec2(0.7,0.6),0.02,48.0);
      float s3 = sonar(uv, vec2(0.5,0.8),0.022,52.0);
      float s4 = sonar(uv, vec2(0.2,0.75),0.018,53.0);
      float s5 = sonar(uv, vec2(0.8,0.2),0.02,51.0);

      float pulse = clamp(s1 + s2 + s3 + s4 + s5, 0.0, 0.6);
      
      // Couleur des pulses avec gradient bleu -> cyan
      vec3 pulseColor1 = vec3(0.0, 0.4, 1.0);  // Bleu #0066FF
      vec3 pulseColor2 = vec3(0.0, 0.83, 1.0); // Cyan #00D4FF
      
      // Mix entre les deux couleurs selon l'intensité
      vec3 pulseColor = mix(pulseColor1, pulseColor2, pulse * 0.5);
      
      // Diminuer l'intensité pour garder l'effet subtil
      pulseColor *= 0.15;
      
      // Ajouter un peu de variation selon la position
      float colorVariation = noise(uv * 10.0 + time * 0.05);
      pulseColor += vec3(0.0, 0.02, 0.03) * colorVariation;

      gl_FragColor = vec4(mix(baseColor, pulseColor, pulse),1.0);
    }
  `
);

extend({ BackgroundMaterial });

function BackgroundPlane() {
  const ref = useRef<any>();
  useFrame(({ clock }) => (ref.current.time = clock.getElapsedTime()));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.mouse = [
          e.clientX / window.innerWidth,
          1 - e.clientY / window.innerHeight,
        ];
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <mesh scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2, 200, 200]} />
      <backgroundMaterial ref={ref} />
    </mesh>
  );
}

export default function Background() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 1] }} 
      style={{ 
        position: "fixed", 
        zIndex: -10,
        background: "#0A0A0F" // Fond légèrement plus clair
      }}
    >
      <BackgroundPlane />
    </Canvas>
  );
}