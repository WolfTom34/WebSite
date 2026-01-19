import React from 'react';
import { THEME } from '../../../shared/constants/theme';

export const RadarWidget = () => {
    return (
        <div className="radar-container" style={{ width: '180px', height: '180px', position: 'relative' }}>
            {/* SVG Radar */}
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                {/* Defs for Glows */}
                <defs>
                    <filter id="radar-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="scan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(0, 209, 255, 0)" />
                        <stop offset="100%" stopColor="rgba(0, 209, 255, 0.5)" />
                    </linearGradient>
                </defs>

                {/* Outer Ring & Background Fill */}
                <circle cx="50" cy="50" r="48" fill="rgba(0, 10, 20, 0.6)" stroke="rgba(0, 209, 255, 0.6)" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(0, 209, 255, 1.0)" strokeWidth="0.5" strokeDasharray="10 5" opacity="0.8" />

                {/* Inner Rings */}
                <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(0, 209, 255, 0.4)" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(0, 209, 255, 0.4)" strokeWidth="0.5" />

                {/* Crosshairs */}
                <line x1="50" y1="2" x2="50" y2="98" stroke="rgba(0, 209, 255, 0.3)" strokeWidth="0.5" />
                <line x1="2" y1="50" x2="98" y2="50" stroke="rgba(0, 209, 255, 0.3)" strokeWidth="0.5" />

                {/* Rotating Scan Line */}
                <g className="radar-sweep">
                    <path d="M50 50 L98 50 A 48 48 0 0 0 50 2" fill="url(#scan-grad)" opacity="0.6" transform="rotate(-45 50 50)" />
                    <line x1="50" y1="50" x2="98" y2="50" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1" />
                </g>

                {/* Cardinal Points */}
                <text x="50" y="8" fill="#FFF" fontSize="6" fontWeight="bold" textAnchor="middle" filter="url(#radar-glow)">N</text>
                <text x="95" y="51" fill="#FFF" fontSize="6" fontWeight="bold" textAnchor="middle" filter="url(#radar-glow)">E</text>
                <text x="50" y="96" fill="#FFF" fontSize="6" fontWeight="bold" textAnchor="middle" filter="url(#radar-glow)">S</text>
                <text x="5" y="51" fill="#FFF" fontSize="6" fontWeight="bold" textAnchor="middle" filter="url(#radar-glow)">W</text>

                {/* Random Blips */}
                <circle cx="65" cy="35" r="1.5" fill="#FF3333" filter="url(#radar-glow)" className="radar-blip-1" />
                <circle cx="30" cy="70" r="1.5" fill="#00D1FF" filter="url(#radar-glow)" className="radar-blip-2" />
            </svg>

            {/* CSS Animation Styles */}
            <style>{`
                .radar-sweep {
                    transform-origin: 50% 50%;
                    animation: radarSpin 4s linear infinite;
                }
                .radar-blip-1 { animation: blipFlash 2s infinite; }
                .radar-blip-2 { animation: blipFlash 3s infinite 1s; }

                @keyframes radarSpin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes blipFlash {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};
