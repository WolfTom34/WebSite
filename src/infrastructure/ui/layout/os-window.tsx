import { Html } from "@react-three/drei";
import React from 'react';
import { useLocation } from 'wouter';
import { THEME } from '../../../shared/constants/theme';
import './os-window.css'; // We'll create this corresponding CSS
import { useLanguage } from "../../../shared/context/language-context";

interface OSWindowProps {
    title: string;
    children: React.ReactNode;
}

export const OSWindow: React.FC<OSWindowProps> = ({ title, children }) => {
    const [, setLocation] = useLocation();
    const { t } = useLanguage();

    return (
        <group>
            {/* Fullscreen HTML overlay positioned in 3D scene but rendered as DOM */}
            <Html fullscreen style={{ pointerEvents: 'none', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="os-window-container" style={{ pointerEvents: 'auto' }}>
                    {/* Background Reticle */}
                    <div className="os-background-reticle" />

                    {/* Corner Accents */}
                    <div className="os-corner tl" />
                    <div className="os-corner tr" />
                    <div className="os-corner bl" />
                    <div className="os-corner br" />

                    {/* Header / Title Bar */}
                    <div className="os-window-header">
                        <div className="os-title">
                            <span className="scifi-prefix">SECURE NODE</span>
                            {title}
                        </div>
                        <div
                            className="os-close-btn"
                            onClick={() => setLocation('/')}
                            title="Close Window"
                        >
                            CLOSE PANEL [ X ]
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="os-window-content custom-scrollbar">
                        {children}
                    </div>

                    {/* Decorative Footer */}
                    <div className="os-window-footer">
                        <div className="os-status">SYSTEM STATUS: OPTIMAL</div>
                        <div className="os-encryption">ENCRYPTION: AES-4096 [ACTIVE]</div>
                    </div>
                </div>
            </Html>
        </group>
    );
};
