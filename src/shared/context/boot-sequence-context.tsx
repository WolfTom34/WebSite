import React, { createContext, useContext, useEffect, useState } from 'react';

type BootStage = 'VOID' | 'IGNITION' | 'PRESSURIZATION' | 'ONLINE';

interface BootSequenceContextType {
    stage: BootStage;
    latticeOpacity: number; // 0 to 1
    atmosphereOpacity: number; // 0 to 1
    isHudActive: boolean;
}

export const BootSequenceContext = createContext<BootSequenceContextType>(null!);

export const useBootSequence = () => useContext(BootSequenceContext);

export const BootSequenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [stage, setStage] = useState<BootStage>('VOID');

    // Animation Values (could be driven by useSpring in components, 
    // but simple state triggers are enough for the orchestrator)
    const [latticeVisible, setLatticeVisible] = useState(false);
    const [atmosphereVisible, setAtmosphereVisible] = useState(false);
    const [hudActive, setHudActive] = useState(false);

    useEffect(() => {
        // T+0.0s: VOID

        // T+0.1s: IGNITION (Lattice Explodes)
        const t1 = setTimeout(() => {
            setStage('IGNITION');
            setLatticeVisible(true);
        }, 100);

        // T+0.8s: PRESSURIZATION (Atmosphere Rushes In)
        const t2 = setTimeout(() => {
            setStage('PRESSURIZATION');
            setAtmosphereVisible(true);
        }, 800);

        // T+1.6s: ONLINE (HUD Snaps)
        const t3 = setTimeout(() => {
            setStage('ONLINE');
            setHudActive(true);
        }, 1600);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    return (
        <BootSequenceContext.Provider value={{
            stage,
            latticeOpacity: latticeVisible ? 1 : 0,
            atmosphereOpacity: atmosphereVisible ? 1 : 0,
            isHudActive: hudActive
        }}>
            {children}
        </BootSequenceContext.Provider>
    );
};
