import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TransmissionModal } from '../../infrastructure/ui/components/transmission-modal';

interface TransmissionContextType {
    openTransmission: (subject?: string) => void;
    closeTransmission: () => void;
}

const TransmissionContext = createContext<TransmissionContextType | undefined>(undefined);

export const TransmissionProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subject, setSubject] = useState('');

    const openTransmission = (initialSubject?: string) => {
        setSubject(initialSubject || '');
        setIsOpen(true);
    };

    const closeTransmission = () => {
        setIsOpen(false);
    };

    return (
        <TransmissionContext.Provider value={{ openTransmission, closeTransmission }}>
            {children}
            <TransmissionModal
                isOpen={isOpen}
                onClose={closeTransmission}
                initialSubject={subject}
            />
        </TransmissionContext.Provider>
    );
};

export const useTransmission = () => {
    const context = useContext(TransmissionContext);
    if (!context) {
        throw new Error('useTransmission must be used within a TransmissionProvider');
    }
    return context;
};
