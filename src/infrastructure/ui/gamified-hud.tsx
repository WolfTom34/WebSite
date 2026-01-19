import React from "react";
import "./hud.css";
import { useUIFPSMonitor } from "../../shared/hooks/use-ui-fps-monitor";

import { useBootSequence } from "../../shared/context/boot-sequence-context";
import { useAudio } from "../../shared/context/audio-context";
import { LanguageSwitcher } from "./components/language-switcher";
import { useLanguage } from "../../shared/context/language-context";
import { useTransmission } from "../../shared/context/transmission-context";
import { RadarWidget } from "./components/radar-widget";
import { StatusModule } from "./components/status-module";
import { MiniLatticeWidget } from "./components/mini-lattice-widget";
import { NeuralCommandBar } from "./components/neural-command-bar";
import { ThreatIndicator } from "./components/threat-indicator";

export const GamifiedHUD: React.FC = () => {
    const fps = useUIFPSMonitor();
    const { isHudActive } = useBootSequence();
    const { t } = useLanguage();
    const { openTransmission } = useTransmission();
    const { isMuted, toggleMute } = useAudio();

    return (
        <>
            <div className="hud-screen-fx" />
            <div className={`hud-overlay ${isHudActive ? 'boot-active' : ''}`} style={{ pointerEvents: 'none' }}>

                {/* --- CENTRAL TOP: NEURAL COMMAND BAR --- */}
                <NeuralCommandBar />
                {/* --- TOP LEFT: MINI LATTICE --- */}
                <div className="hud-corner top-left" style={{ padding: '40px 0 0 40px' }}>
                    <MiniLatticeWidget />
                </div>



                {/* --- TOP RIGHT: STATUS MODULE (Audio) --- */}
                <div className="hud-corner top-right" style={{ pointerEvents: 'auto', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                    {/* AUDIO STATUS BOX */}
                    <div onClick={toggleMute} style={{ cursor: 'pointer' }}>
                        <StatusModule
                            status={isMuted ? 'OFFLINE' : 'ONLINE'}
                            label={isMuted ? t('hud.audio_offline') : t('hud.audio_online')}
                            subLabel="SYSTEM AUDIO CHANNEL"
                        />
                    </div>

                    {/* CTA UPLINK below it */}
                    <div
                        className="cta-button pulse"
                        onClick={() => openTransmission()}
                        style={{ marginTop: '10px' }}
                    >
                        {t('cta.uplink')}
                    </div>
                </div>

                {/* --- BOTTOM LEFT: RADAR --- */}
                <div className="hud-corner bottom-left" style={{ padding: '0 20px 20px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
                        <RadarWidget />

                        {/* FPS next to Radar */}
                        <div className="hud-group" style={{ height: 'fit-content' }}>
                            <div className="label">FPS</div>
                            <div className="data">{fps.toFixed(0)}</div>
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM RIGHT: VERSION & LANG --- */}
                <div className="hud-corner bottom-right">
                    <div className="hud-group pointer-events-auto" style={{ pointerEvents: 'auto' }}>
                        <LanguageSwitcher />
                    </div>
                    <div className="hud-group">
                        <div className="label">BUILD</div>
                        <div className="data" style={{ fontSize: '14px' }}>v0.2.0-BETA</div>
                        <div className="legal-notice">© 2026 Safe Valley - SVE | All Rights Reserved</div>
                    </div>
                </div>

                {/* --- BOTTOM CENTER: THREAT MONITOR --- */}
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'auto',
                    zIndex: 10
                }}>
                    <ThreatIndicator
                        isCritical={false}
                        statusText="THREAT_SCAN: STANDBY"
                    />
                </div>

            </div>
        </>
    );
};
