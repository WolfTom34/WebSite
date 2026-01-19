import React from 'react';
import './threat-indicator.css';

interface ThreatIndicatorProps {
    isCritical?: boolean;
    statusText?: string;
    subText?: string;
}

export const ThreatIndicator: React.FC<ThreatIndicatorProps> = ({
    isCritical = false,
    statusText = 'THREAT_SCAN: STANDBY'
}) => {
    return (
        <div className={`threat-indicator ${isCritical ? 'critical' : ''}`}>
            <div className="threat-scanline" />

            <div className="threat-icon-wrapper">{isCritical ? '!' : 'OK'}</div>

            <div className="threat-text">
                <span className="threat-label">
                    {isCritical ? 'CRITICAL_ALERT' : 'SYSTEM_MONITOR'}
                </span>
                <span className="threat-status">
                    {isCritical ? statusText : 'STBY_MODE_ACTIVE'}
                </span>
            </div>

            {/* Visual Brackets */}
            <div className="threat-accent top-left" />
            <div className="threat-accent top-right" />
            <div className="threat-accent bottom-left" />
            <div className="threat-accent bottom-right" />
        </div>
    );
};
