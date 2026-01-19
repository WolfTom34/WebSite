import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { THEME } from '../../../shared/constants/theme';

export const CursorLight = () => {
    const lightRef = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        if (lightRef.current) {
            // Map mouse (normalized -1 to 1) to world coordinates
            // Z is fixed at 15 to hover above the terrain (-25) and lattice (0)
            const x = (state.mouse.x * state.viewport.width) / 2;
            const y = (state.mouse.y * state.viewport.height) / 2;

            // Smmooth follow could be added here, but direct tracking feels more responsive for a "pointer"
            lightRef.current.position.set(x, y, 15);
        }
    });

    return (
        <pointLight
            ref={lightRef}
            color={THEME.COLORS.TITANIUM} // White/Blueish tint
            intensity={5.0} // Bright enough to cast visible light
            distance={100} // Range of influence
            decay={2}
        />
    );
};
