import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

import './neural-command-bar.css';

export const NeuralCommandBar: React.FC = () => {
    const [location] = useLocation();

    const [time, setTime] = useState(new Date());
    const [isHovered, setIsHovered] = useState(false);
    // Stable random ID generated once on mount to avoid hydration mismatches
    const [nodeId] = useState(() =>
        Math.floor(Math.random() * 1000)
            .toString(16)
            .toUpperCase()
    );

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getSectorLabel = (path: string) => {
        switch (path) {
            case '/':
                return 'CENTRAL_COMMAND';
            case '/work':
                return 'PROJECT_ARCHIVE';
            case '/gallery':
                return 'VISUAL_INTELLIGENCE';
            case '/partners':
                return 'ALLIANCE_NETWORK';
            case '/blog':
                return 'INTEL_FEEDS';
            default:
                return 'CLASSIFIED_ZONE';
        }
    };

    return (
        <div
            className={`neural-command-bar ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="bar-glass" />
            <div className="bar-content">
                <div className="bar-section left">
                    <div className="system-status">
                        <span className="dot" />
                        <span className="status-text">
                            SYSTEM: {isHovered ? 'SCAN_ACTIVE' : 'READY'}
                        </span>
                    </div>
                </div>

                <div className="bar-section center">
                    <div className="sector-id">
                        {isHovered ? (
                            <div className="kolth-branding">
                                <span className="bracket">[</span>
                                <div className="toroidal-icon">
                                    <svg width="28" height="28" viewBox="0 0 100 100">
                                        <g transform="translate(50, 50)">
                                            {/* Three Toroidal Blades (Loops) - Symmetrical to vertical axis */}
                                            {[0, 120, 240].map((angle) => (
                                                <path
                                                    key={angle}
                                                    transform={`rotate(${angle})`}
                                                    d="M 0,0 C -15,-35 15,-35 0,0"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="5"
                                                    strokeLinecap="round"
                                                />
                                            ))}
                                            {/* Hub */}
                                            <circle cx="0" cy="0" r="4" fill="currentColor" />
                                        </g>
                                    </svg>
                                </div>
                                <span className="sector-text kolth-title">SAFE VALLEY - SVE</span>
                                <span className="bracket">]</span>
                            </div>
                        ) : (
                            <>
                                <span className="bracket">[</span>
                                <span className="sector-text">
                                    SECTOR: {getSectorLabel(location)}
                                </span>
                                <span className="bracket">]</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="bar-section right">
                    <div className="bit-feed">
                        {isHovered ? (
                            <div className="scrolling-bits">
                                10101101 00110101 11010010 10110101
                            </div>
                        ) : (
                            <span className="node-id">NODE_0x{nodeId}</span>
                        )}
                    </div>
                    <div className="system-clock">
                        {time.toLocaleTimeString([], { hour12: false })}
                    </div>
                </div>
            </div>

            {/* Visual Brackets */}
            <div className="bar-accent top-left" />
            <div className="bar-accent top-right" />
            <div className="bar-accent bottom-left" />
            <div className="bar-accent bottom-right" />
        </div>
    );
};
