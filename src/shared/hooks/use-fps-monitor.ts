import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { THEME } from '../../shared/constants/theme';

export const useFPSMonitor = () => {
    const [fps, setFps] = useState(0);
    const frameCount = useRef(0);
    const lastTime = useRef(0);

    useEffect(() => {
        // Initialize lastTime on mount to avoid impure render call
        lastTime.current = performance.now();
    }, []);

    useFrame(() => {
        frameCount.current++;
        const now = performance.now();
        const delta = now - lastTime.current;

        if (delta >= 1000) {
            setFps(Math.round((frameCount.current * 1000) / delta));
            frameCount.current = 0;
            lastTime.current = now;
        }
    });

    useEffect(() => {
        if (fps > 0 && fps < THEME.RENDERING.TARGET_FPS * 0.9) {
            console.warn(`Low FPS detected: ${fps}. Target: ${THEME.RENDERING.TARGET_FPS}`);
        }
    }, [fps]);

    return fps;
};
