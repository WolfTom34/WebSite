import React from 'react';
import * as THREE from 'three';
import {
    EffectComposer,
    Bloom,
    Noise,
    ChromaticAberration,
    DepthOfField
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

import { DeviceTier } from '../../shared/hooks/use-device-tier';

interface PostProcessingProps {
    tier: DeviceTier;
}

export const PostProcessing = ({ tier }: PostProcessingProps) => {
    return (
        <EffectComposer enableNormalPass={false}>
            {/* TIER 3 (ULTRA) ONLY: Depth of Field */}
            {tier === 'ULTRA' ? (
                <DepthOfField
                    target={[0, 0, 0]}
                    focalLength={0.02}
                    bokehScale={0}
                    height={480}
                />
            ) : <group />}

            {/* TIER 2 & 3: Standard Bloom. TIER 1 (ECO): Substantial reduction */}
            <Bloom
                luminanceThreshold={0.6}
                mipmapBlur={true}
                intensity={tier === 'ECO' ? 0.1 : 0.6}
                radius={0.4}
            />

            {/* PERFORMANCE: Disable Noise & Aberration on ECO tier */}
            {tier !== 'ECO' ? (
                <>
                    <Noise
                        opacity={0.01}
                        blendFunction={BlendFunction.OVERLAY}
                        premultiply
                    />
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL}
                        offset={new THREE.Vector2(0.001, 0.001)}
                    />
                </>
            ) : <group />}
        </EffectComposer>
    );
};
