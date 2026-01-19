import React from 'react';
import { useLanguage } from '../../../shared/context/language-context';
import { Language } from '../../../shared/i18n/translations';
import './language-switcher.css';

export const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    const languages: { code: Language; label: string }[] = [
        { code: 'fr', label: 'FR' },
        { code: 'en', label: 'EN' },
        { code: 'lb', label: 'LB' }
    ];

    return (
        <div className="language-switcher">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    className={`lang-btn ${language === lang.code ? 'active' : ''}`}
                    onClick={() => setLanguage(lang.code)}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
};
