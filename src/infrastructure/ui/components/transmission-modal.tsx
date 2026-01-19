import React, { useState, useEffect } from 'react';
import './transmission-modal.css';
import { useLanguage } from '../../../shared/context/language-context';
// import { useAudio } from '../../../shared/context/audio-context';

interface TransmissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialSubject?: string;
}

export const TransmissionModal: React.FC<TransmissionModalProps> = ({ isOpen, onClose, initialSubject = '' }) => {
    const { t } = useLanguage();

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState(initialSubject);
    const [message, setMessage] = useState('');

    // UI State
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Reset/Init
    useEffect(() => {
        if (isOpen && initialSubject) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSubject(initialSubject);
        }
        if (!isOpen) {
            const timer = setTimeout(() => {
                setIsSuccess(false);
                setIsSending(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, initialSubject]);

    const handleSubmit = async () => {
        if (!name || !email || !message) return;
        setIsSending(true);
        // Simulate Transmission Latency
        await new Promise(r => setTimeout(r, 2000));
        setIsSending(false);
        setIsSuccess(true);
        setTimeout(() => onClose(), 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="transmission-modal-overlay" onClick={onClose}>
            <div className="transmission-terminal" onClick={e => e.stopPropagation()}>
                {/* Scanning Laser Effect */}
                <div className="scan-overlay" />

                {/* Header */}
                <div className="terminal-header">
                    <div className="terminal-title">
                        {isSuccess ? 'TRANSMISSION COMPLETE' : 'ENCYCLOPEDIA: MODE ON'}
                    </div>
                    <div className="terminal-close" onClick={onClose}>✕</div>
                </div>

                {/* Body Content */}
                <div className="terminal-body">
                    {!isSuccess ? (
                        <>
                            {/* ITEM 01: IDENTITY */}
                            <div className="transmission-item" style={{ animationDelay: '0.1s' }}>
                                <div className="item-index">01</div>
                                <div className="item-content">
                                    <div className="item-label">{t('cta.form.name')}</div>
                                    <input
                                        type="text"
                                        className="terminal-input"
                                        placeholder="OPERATOR NAME"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <div className="item-action">➜</div>
                            </div>

                            {/* ITEM 02: FREQUENCY */}
                            <div className="transmission-item" style={{ animationDelay: '0.2s' }}>
                                <div className="item-index">02</div>
                                <div className="item-content">
                                    <div className="item-label">{t('cta.form.email')}</div>
                                    <input
                                        type="email"
                                        className="terminal-input"
                                        placeholder="SECURE FREQUENCY"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="item-action">➜</div>
                            </div>

                            {/* ITEM 03: PARAMETER */}
                            <div className="transmission-item" style={{ animationDelay: '0.3s' }}>
                                <div className="item-index">03</div>
                                <div className="item-content">
                                    <div className="item-label">{t('cta.form.subject')}</div>
                                    <input
                                        type="text"
                                        className="terminal-input"
                                        placeholder="MISSION PARAMETER"
                                        value={subject}
                                        onChange={e => setSubject(e.target.value)}
                                    />
                                </div>
                                <div className="item-action">➜</div>
                            </div>

                            {/* ITEM 04: PACKET */}
                            <div className="transmission-item" style={{ animationDelay: '0.4s', height: '120px' }}>
                                <div className="item-index">04</div>
                                <div className="item-content">
                                    <div className="item-label">{t('cta.form.message')}</div>
                                    <textarea
                                        className="terminal-input"
                                        style={{ resize: 'none', height: '80px' }}
                                        placeholder="DATA CONTENT..."
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                    />
                                </div>
                                <div className="item-action">➜</div>
                            </div>

                            {/* ITEM 05: ACTION */}
                            <div
                                className={`transmission-item action-row ${isSending ? 'sending' : ''}`}
                                onClick={!isSending ? handleSubmit : undefined}
                                style={{ animationDelay: '0.5s' }}
                            >
                                <div className="send-label">
                                    {isSending ? 'TRANSMITTING...' : 'ESTABLISH UPLINK'}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="success-message">
                            <h2>UPLINK ESTABLISHED</h2>
                            <p>SECURE TRANSMISSION SENT SUCCESSFULLY.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
