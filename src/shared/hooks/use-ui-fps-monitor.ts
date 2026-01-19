import { useRef, useState, useEffect } from 'react';

export const useUIFPSMonitor = () => {
    const [fps, setFps] = useState(0);
    const frameCount = useRef(0);
    // const frameCount = useRef(0); // Removed duplicate
    const lastTime = useRef(0);

    // Initialize timing on first render if needed, or better, let the effect handle it completely.
    // Actually, in the effect loop `time` is passed by rAF, so we just need to init lastTime once.
    const requestRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const animate = (time: number) => {
            frameCount.current++;
            const delta = time - lastTime.current;

            if (delta >= 1000) {
                setFps(Math.round((frameCount.current * 1000) / delta));
                frameCount.current = 0;
                lastTime.current = time;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return fps;
};
