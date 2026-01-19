import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as THREE from 'three';

// Interaction Types
export type InteractionMode = 'IDLE' | 'HOVER' | 'CLICK';

export interface HoverTarget {
    position: THREE.Vector3; // World space position
    width: number; // For the rect frame
    height: number;
}

interface InteractionContextType {
    mode: InteractionMode;
    hoverTarget: HoverTarget | null;
    setHover: (target: HoverTarget | null) => void;
    setMode: (mode: InteractionMode) => void;
}

export const InteractionContext = createContext<InteractionContextType | null>(null);

export const InteractionProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<InteractionMode>('IDLE');
    const [hoverTarget, setHoverTarget] = useState<HoverTarget | null>(null);

    const setHover = (target: HoverTarget | null) => {
        setHoverTarget(target);
        setMode(target ? 'HOVER' : 'IDLE');
    };

    return (
        <InteractionContext.Provider value={{ mode, hoverTarget, setHover, setMode }}>
            {children}
        </InteractionContext.Provider>
    );
};

export const useInteraction = () => {
    const context = useContext(InteractionContext);
    if (!context) {
        throw new Error('useInteraction must be used within an InteractionProvider');
    }
    return context;
};
