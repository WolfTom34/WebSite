import { useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';

// Interface for iOS 13+ DeviceOrientationEvent
interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    requestPermission?: () => Promise<'granted' | 'denied'>;
}

export const useGyroscope = () => {
    const [orientation, setOrientation] = useState(new THREE.Vector2(0, 0));
    const [permissionGranted, setPermissionGranted] = useState(false);

    const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
        // Gamma: Left/Right tilt (-90 to 90)
        // Beta: Front/Back tilt (-180 to 180)

        let x = event.gamma ? event.gamma : 0;
        let y = event.beta ? event.beta : 0;

        // Clamp & Normalize to -1...1 range (approx)
        // We limit the active range to +/- 30 degrees for subtle parallax
        const limit = 30;

        x = Math.max(-limit, Math.min(limit, x));
        y = Math.max(-limit, Math.min(limit, y));

        // Normalize
        const normX = x / limit;
        const normY = y / limit;

        setOrientation(new THREE.Vector2(normX, normY));
    }, []);

    const requestAccess = async () => {
        if (
            typeof (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS)
                .requestPermission === 'function'
        ) {
            try {
                const permissionState = await (
                    DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
                ).requestPermission!();
                if (permissionState === 'granted') {
                    setPermissionGranted(true);
                }
            } catch (e) {
                console.warn('Gyroscope permission denied or error:', e);
            }
        } else {
            // Non-iOS 13+ devices typically don't need permission
            setPermissionGranted(true);
        }
    };

    useEffect(() => {
        if (permissionGranted) {
            window.addEventListener('deviceorientation', handleOrientation);
            return () => window.removeEventListener('deviceorientation', handleOrientation);
        }
    }, [permissionGranted, handleOrientation]);

    return { orientation, requestAccess, permissionGranted };
};
