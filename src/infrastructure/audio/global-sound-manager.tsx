import React, { useEffect, useRef } from 'react';
import { useAudio } from '../../shared/context/audio-context';
import { useLocation } from 'wouter';
import { Html } from '@react-three/drei';

export const GlobalSoundManager = () => {
    const { isMuted, volume } = useAudio();
    const ambientRef = useRef<HTMLAudioElement>(null);
    const clickRef = useRef<HTMLAudioElement>(null);
    const [location] = useLocation();

    // 1. Volume & Mute Sync
    useEffect(() => {
        if (ambientRef.current) {
            ambientRef.current.volume = volume * 0.5; // Dampen ambient slightly
            ambientRef.current.muted = isMuted;

            // Auto-play attempt if not muted
            if (!isMuted && ambientRef.current.paused) {
                ambientRef.current.play().catch(e => console.log("Audio Autoplay prevented:", e));
            } else if (isMuted) {
                ambientRef.current.pause();
            }
        }
    }, [isMuted, volume]);

    // 2. Navigation Click Effect
    useEffect(() => {
        // Play click sound on route change
        if (clickRef.current && !isMuted) {
            clickRef.current.currentTime = 0;
            clickRef.current.volume = volume;
            clickRef.current.play().catch(() => { });
        }
    }, [location, isMuted, volume]);

    return (
        <group>
            {/* Hidden Audio Elements */}
            <Html>
                <div style={{ display: 'none' }}>
                    <audio
                        ref={ambientRef}
                        src="/audio/ambient.mp3"
                        loop
                        crossOrigin="anonymous"
                    />
                    <audio
                        ref={clickRef}
                        src="/audio/click.mp3"
                        crossOrigin="anonymous"
                    />
                </div>
            </Html>
        </group>
    );
};
