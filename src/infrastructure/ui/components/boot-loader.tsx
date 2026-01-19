import React, { useEffect, useState } from 'react';
import { useBootSequence } from '../../../shared/context/boot-sequence-context';
import { MiniLatticeWidget } from './mini-lattice-widget';
import './boot-loader.css';

const CODE_SNIPPETS = [
    "INITIALIZING CORE LATTICE...",
    "LOADING NEURAL PHYSICS MODULE...",
    "HANDSHAKE PROTOCOL: ACCEPTED",
    "DECRYPTING SECURE SECTOR 04...",
    "MOUNTING ATMOSPHERE LAYERS...",
    "CHECKING PERIPHERAL VISION...",
    "CALIBRATING GYROSCOPE...",
    "ESTABLISHING UPLINK...",
    "SYSTEM OPTIMIZATION: 98%",
    "RENDER PIPELINE: ACTIVE",
    "LOADING ASSETS: [TEXTURES, MESHES, SOUNDS]",
    "BUFFER CLEARED.",
    "EXECUTING MAIN LOOP...",
    "WELCOME COMMANDER."
];

export const BootLoader: React.FC = () => {
    const { stage } = useBootSequence();
    const [lines, setLines] = useState<string[]>([]);

    // Determine visibility based on stage
    const isVisible = stage !== 'ONLINE';

    // Simulate Code Scrolling
    useEffect(() => {
        if (!isVisible) return;

        let index = 0;
        const interval = setInterval(() => {
            if (index < CODE_SNIPPETS.length) {
                setLines(prev => [...prev.slice(-15), CODE_SNIPPETS[index]]);
                index++;
            }
        }, 100); // Speed of scroll

        return () => clearInterval(interval);
    }, [isVisible]);

    return (
        <div className={`boot-loader-overlay ${!isVisible ? 'hidden' : ''}`}>
            {/* Corners */}
            <div className="corner-frame tl" />
            <div className="corner-frame tr" />
            <div className="corner-frame bl" />
            <div className="corner-frame br" />

            <div className="boot-grid">
                {/* Left: Code Output */}
                <div className="boot-left">
                    {lines.map((line, i) => (
                        <div key={i} className="code-line">
                            {`> ${line}`}
                        </div>
                    ))}
                </div>

                {/* Center: Spinner */}
                <div className="boot-center">
                    <div className="spinner-ring" />
                    <div className="spinner-label">
                        TRAVEL ARRANGEMENTS IN PROGRESS<br />
                        SYSTEM STATUS CHECKING
                    </div>
                </div>

                {/* Right: Status */}
                <div className="boot-right">
                    <div className="protocol-box">
                        <div className="p-label">PROTOCOL</div>
                        <div className="p-value">453.541.2090</div>
                    </div>
                    <div className="protocol-box" style={{ marginTop: '20px', borderColor: 'rgba(0, 209, 255, 0.1)' }}>
                        <div className="p-label">MEMORY</div>
                        <div className="p-value">16.0 EB</div>
                    </div>
                    <div className="protocol-box" style={{ marginTop: 'auto', border: 'none', display: 'flex', justifyContent: 'center' }}>
                        <MiniLatticeWidget />
                    </div>
                </div>
            </div>
        </div>
    );
};
