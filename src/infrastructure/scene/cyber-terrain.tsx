
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from './shaders/CyberTerrain.vert?raw';
import fragmentShader from './shaders/CyberTerrain.frag?raw';
import { THEME } from '../../shared/constants/theme';

export const CyberTerrain = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    // Uniforms
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uScrollSpeed: { value: 2.0 }, // Flight speed
        uTerrainHeight: { value: 4.5 }, // Reduced height for gentler inclination
        uColorGrid: { value: new THREE.Color('#00D1FF') }, // Cyan
        uGridThickness: { value: 0.05 },
        uMouse: { value: new THREE.Vector3(0, 0, 0) }, // Added for interaction
        uVelocity: { value: new THREE.Vector2(0, 0) }, // Added for interaction
    }), []);

    const lastMouse = useRef(new THREE.Vector2(0, 0));

    useFrame((state, delta) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;

            // Update time for scrolling
            material.uniforms.uTime.value += delta;

            // Mouse & Velocity
            // Map mouse to a world-like coordinate for the shader
            // Viewport width/height is at z=0 by default
            const x = (state.mouse.x * state.viewport.width) / 2;
            const y = (state.mouse.y * state.viewport.height) / 2;

            const dx = x - lastMouse.current.x;
            const dy = y - lastMouse.current.y;

            // Pass Uniforms
            // We map Y screen coord to Z world coord because terrain is rotated
            // But wait, the terrain rotation handles that? 
            // In vertex shader 'position' is local.
            // Let's pass the raw "World at Z=0" coordinates and let the shader solve the distance.
            material.uniforms.uMouse.value.set(x, y, 0);
            material.uniforms.uVelocity.value.lerp(new THREE.Vector2(dx, dy), 0.1);

            lastMouse.current.set(x, y);
        }
    });

    return (
        <mesh
            ref={meshRef}
            rotation={[-Math.PI / 2, 0, 0]} // Original Incline
            position={[0, -25, -60]} // Moved up and back slightly
            renderOrder={-1} // Render behind text
        >
            {/* 
              Plane Geometry: Width, Height, SegmentsW, SegmentsH 
              Increased density (256x256) for sharper Ridged Noise peaks
            */}
            <planeGeometry args={[600, 600, 256, 256]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false} // Don't block stars behind it (if any)
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending} // Optional: Additive makes it look like light
            />
        </mesh>
    );
};
