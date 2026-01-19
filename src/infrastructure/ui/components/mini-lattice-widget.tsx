import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { THEME } from '../../../shared/constants/theme';

const RotatingLattice = () => {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += delta * 0.8;
        meshRef.current.rotation.x += delta * 0.4;
    });

    return (
        <Sphere args={[1, 8, 8]} ref={meshRef} scale={2}>
            <meshBasicMaterial
                color={THEME.COLORS.PLASMA_BLUE}
                wireframe
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </Sphere>
    );
};

export const MiniLatticeWidget = () => {
    return (
        <div style={{ width: '80px', height: '80px', opacity: 0.8 }}>
            <div style={{
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, rgba(0, 209, 255, 0.15) 0%, transparent 70%)',
                borderRadius: '50%', // Keep the round shape for the gradient
                boxShadow: '0 0 30px rgba(0, 209, 255, 0.3)'
            }}>
                <Canvas
                    gl={{ alpha: true, antialias: true }}
                    camera={{ position: [0, 0, 5], fov: 45 }}
                >
                    <RotatingLattice />
                </Canvas>
            </div>
        </div>
    );
};
