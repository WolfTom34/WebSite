import { Canvas } from '@react-three/fiber';
import React from 'react';
import { THEME } from '../../shared/constants/theme';
import { PostProcessing } from './post-processing';
import { useFPSMonitor } from '../../shared/hooks/use-fps-monitor';
import { useDeviceTier } from '../../shared/hooks/use-device-tier';
import { useContextBridge } from '@react-three/drei';
import { AudioDebugger } from '../audio/audio-debugger';

import { BootSequenceContext } from '../../shared/context/boot-sequence-context';
import { InteractionContext } from '../../shared/context/interaction-context';
import { GlobalAudioContext } from '../../shared/context/audio-context';
import { LanguageContext } from '../../shared/context/language-context';
import { SEOContext } from '../../shared/context/seo-context';
import { CyberTerrain } from './cyber-terrain';
import { CursorLight } from './lighting/cursor-light';

const FPSDisplayEdge = () => {
    useFPSMonitor();
    return null; // Hidden for now, but monitoring active
};

export const Scene = ({ children }: { children: React.ReactNode }) => {
    // Bridge Contexts from DOM to Canvas
    // Bridge Contexts from DOM to Canvas
    const ContextBridge = useContextBridge(
        BootSequenceContext,
        InteractionContext,
        LanguageContext,
        GlobalAudioContext,
        SEOContext
    );

    const audioCheck = React.useContext(GlobalAudioContext);
    console.log('SCENE DEBUG: Audio Context Value:', audioCheck);

    const tier = useDeviceTier();

    return (
        <div style={{ width: '100vw', height: '100vh', background: THEME.COLORS.VOID }}>
            <Canvas
                shadows
                dpr={tier === 'ECO' ? 1 : [1, 2]} // Lock 1x res on Mobile
                gl={{
                    antialias: true,
                    powerPreference: 'high-performance',
                    alpha: false
                }}
                camera={{ position: [0, 10, 160], fov: 65 }}
                onCreated={({ gl }) => {
                    gl.setClearColor(THEME.COLORS.VOID);
                }}
            >
                <fog attach="fog" args={[THEME.COLORS.VOID, 50, 400]} />
                {/* eslint-disable-next-line */}
                <ContextBridge>
                    {/* AudioProvider moved to App.tsx, context bridged above */}
                    <FPSDisplayEdge />

                    {/* The Zero-Ambient Rule: No AmbientLight here */}
                    <AudioDebugger />

                    {/* Dynamic Cursor Light */}
                    <CursorLight />

                    {/* Directional Light (Titanium Spectrum) */}
                    <directionalLight
                        position={[100, 100, 100]}
                        intensity={1.5}
                        color={THEME.COLORS.TITANIUM}
                        castShadow
                    />

                    <CyberTerrain />
                    {children}

                    <PostProcessing tier={tier} />
                </ContextBridge>
            </Canvas>
        </div>
    );
};
