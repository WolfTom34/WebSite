import React from 'react';
import { useAudio } from '../../shared/context/audio-context';

export const AudioDebugger = () => {
    const audioCtx = useAudio();
    console.log("AUDIO DEBUGGER (Inside Bridge):", audioCtx);
    return null;
};
