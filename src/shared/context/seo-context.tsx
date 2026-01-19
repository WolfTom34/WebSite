import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SEOState {
    title: string;
    description: string;
    setSEO: (title: string, description: string) => void;
}

const defaultState: SEOState = {
    title: 'Orbital OS',
    description: 'Advanced Robotics & Defense Systems',
    setSEO: () => {}
};

export const SEOContext = createContext<SEOState>(defaultState);

export const SEOProvider = ({ children }: { children: ReactNode }) => {
    const [title, setTitle] = useState(defaultState.title);
    const [description, setDescription] = useState(defaultState.description);

    const setSEO = (t: string, d: string) => {
        setTitle(t);
        setDescription(d);
    };

    return (
        <SEOContext.Provider value={{ title, description, setSEO }}>{children}</SEOContext.Provider>
    );
};

export const useSEO = () => useContext(SEOContext);
