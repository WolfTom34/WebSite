import { useState, useEffect } from 'react';

export type DeviceTier = 'ULTRA' | 'HIGH' | 'ECO';

export const useDeviceTier = (): DeviceTier => {
    // Lazy initialization for correct initial state
    const [tier, setTier] = useState<DeviceTier>(() => {
        if (typeof window === 'undefined') return 'ULTRA';
        const width = window.innerWidth;
        const ua = navigator.userAgent.toLowerCase();
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
        if (isMobile || width < 768) return 'ECO';
        if (width > 1440) return 'ULTRA';
        return 'HIGH';
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const ua = navigator.userAgent.toLowerCase();
            const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);

            let newTier: DeviceTier = 'HIGH';
            if (isMobile || width < 768) newTier = 'ECO';
            else if (width > 1440) newTier = 'ULTRA';

            setTier(newTier);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return tier;
};
