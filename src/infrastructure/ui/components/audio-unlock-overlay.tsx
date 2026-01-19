import React, { useState } from 'react';
import { useAudio } from '../../../shared/context/audio-context';
import { useGyroscope } from '../../../shared/hooks/use-gyroscope';
import { useDeviceTier } from '../../../shared/hooks/use-device-tier';

export const AudioUnlockOverlay: React.FC = () => {
    const { resumeAudio } = useAudio();
    const { requestAccess } = useGyroscope();
    const tier = useDeviceTier();
    const [visible, setVisible] = useState(true);

    // Only show on ECO tier (Mobile/Tablet)
    if (tier !== 'ECO') return null;
    if (!visible) return null;

    const handleUnlock = async () => {
        // 1. Resume Audio Context (needs user gesture)
        await resumeAudio();

        // 2. Request Gyroscope Permission (needs use gesture)
        await requestAccess();

        // 3. Fade Out
        setVisible(false);
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.9)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                fontFamily: 'Rajdhani, sans-serif'
            }}
        >
            <button
                onClick={handleUnlock}
                style={{
                    background: 'transparent',
                    border: '1px solid #00D1FF',
                    color: '#00D1FF',
                    padding: '1.5rem 3rem',
                    fontSize: '1.2rem',
                    letterSpacing: '4px',
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(0, 209, 255, 0.3)',
                    textTransform: 'uppercase'
                }}
            >
                Initialize System
            </button>
            <p
                style={{
                    color: '#B0B0B0',
                    marginTop: '2rem',
                    fontSize: '0.8rem',
                    letterSpacing: '2px',
                    opacity: 0.7
                }}
            >
                TAP TO ENGAGE NEURAL LINK
            </p>
        </div>
    );
};
