import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, Language } from '../i18n/translations';

const LANG_STORAGE_KEY = 'kolth_pref_lang';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    // 1. Initialize from localStorage or default to 'fr'
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem(LANG_STORAGE_KEY);
        // Validate saved language against available types
        if (saved === 'en' || saved === 'fr' || saved === 'lb') {
            return saved as Language;
        }
        return 'fr';
    });

    // 2. Sync to localStorage whenever language changes
    useEffect(() => {
        localStorage.setItem(LANG_STORAGE_KEY, language);
    }, [language]);

    // Helper to access nested keys string 'nav.home'
    const t = (path: string): string => {
        const keys = path.split('.');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let current: any = translations[language];

        for (const key of keys) {
            if (current === undefined || current[key] === undefined) {
                console.warn(`Translation missing for key: ${path} in language: ${language}`);
                return path;
            }
            current = current[key];
        }

        return current as string;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
