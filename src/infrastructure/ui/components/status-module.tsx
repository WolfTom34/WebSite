import React from 'react';
import { useLanguage } from '../../../shared/context/language-context';
import { THEME } from '../../../shared/constants/theme';

/* 
  Status Module from terrain.png
  - Framed Box
  - "AUDIO HORS LIGNE" (Audio Offline)
  - Subtext
  - Orange/Red Accent
*/

interface StatusModuleProps {
    status: 'ONLINE' | 'OFFLINE' | 'ALERT';
    label: string;
    subLabel?: string;
}

export const StatusModule: React.FC<StatusModuleProps> = ({ status, label, subLabel }) => {
    const isOffline = status === 'OFFLINE';
    const isAlert = status === 'ALERT';
    const accentColor = isAlert ? THEME.COLORS.CRIMSON_ALERT : isOffline ? '#FF4A22' : THEME.COLORS.PLASMA_BLUE;

    return (
        <div style={{
            border: `1px solid ${accentColor}`,
            padding: '4px',
            display: 'inline-flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            minWidth: '180px',
            transform: 'skewX(-5deg)', // Tactical skew
            boxShadow: `0 0 10px ${accentColor}40`
        }}>
            {/* Top Bar with Accent */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4px 8px',
                borderBottom: `1px solid ${accentColor}40`
            }}>
                <span style={{
                    fontFamily: 'Rajdhani',
                    fontWeight: 700,
                    fontSize: '12px',
                    letterSpacing: '2px',
                    color: accentColor,
                    textTransform: 'uppercase'
                }}>
                    {status === 'OFFLINE' ? '⚠️ ' : '✓ '}
                    {/* Tiny status icon */}
                </span>
                <div style={{ width: '6px', height: '6px', background: accentColor, borderRadius: '50%' }} className={isOffline ? 'pulse-slow' : ''} />
            </div>

            {/* Main Content */}
            <div style={{ padding: '8px 12px' }}>
                <div style={{
                    fontFamily: 'Rajdhani',
                    fontWeight: 700,
                    fontSize: '16px',
                    letterSpacing: '1px',
                    color: '#FFF',
                    textTransform: 'uppercase',
                    textShadow: `0 0 5px ${accentColor}`
                }}>
                    {label}
                </div>
                {subLabel && (
                    <div style={{
                        marginTop: '2px',
                        fontFamily: 'Rajdhani',
                        fontSize: '10px',
                        color: accentColor,
                        opacity: 0.8
                    }}>
                        {subLabel}
                    </div>
                )}
            </div>

            <style>{`
                .pulse-slow {
                    animation: pulseOp 2s infinite;
                }
                @keyframes pulseOp {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
            `}</style>
        </div>
    );
};
