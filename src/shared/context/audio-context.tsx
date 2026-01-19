import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface AudioContextType {
    isMuted: boolean;
    toggleMute: () => void;
    volume: number; // 0.0 to 1.0
    setVolume: (v: number) => void;
    audioContext: AudioContext | null;
    resumeAudio: () => Promise<void>;
}

export const GlobalAudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const [isMuted, setIsMuted] = useState(true); // Start muted by default (Browser Policy)
    const [volume, setVolume] = useState(0.5);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const contextRef = useRef<AudioContext | null>(null);

    // Initialize AudioContext lazily
    const initContext = () => {
        if (!contextRef.current) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioCtx();
            contextRef.current = ctx;
            setAudioContext(ctx); // Expose to state
        }
        return contextRef.current;
    };

    const toggleMute = () => {
        setIsMuted((prev) => !prev);
        if (contextRef.current) {
            if (!isMuted) {
                // Muting
                contextRef.current.suspend();
            } else {
                // Unmuting
                contextRef.current.resume();
            }
        }
    };

    const resumeAudio = async () => {
        const ctx = initContext();
        if (ctx && ctx.state === 'suspended') {
            await ctx.resume();
        }
    };

    console.log('AudiProvider: Rendered');
    return (
        <GlobalAudioContext.Provider
            value={{
                isMuted,
                toggleMute,
                volume,
                setVolume,
                audioContext,
                resumeAudio
            }}
        >
            {children}
        </GlobalAudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(GlobalAudioContext);
    if (!context) {
        console.error('useAudio FAILED: No Context found!');
        console.warn('useAudio must be used within an AudioProvider. Using mock context.');
        return {
            isMuted: true,
            toggleMute: () => console.log('Audio Mock Toggle (Context Missing)'),
            volume: 0.0,
            setVolume: () => { },
            audioContext: null,
            resumeAudio: async () => { }
        };
    }
    return context;
};
