// hooks/useLanguage.ts
"use client";
import { useState, useEffect } from "react";

type Language = "fr" | "en";

// Utilise la même clé que ton composant existant
const LANGUAGE_KEY = "lang";

export function useLanguage() {
  const [lang, setLangState] = useState<Language>("fr");
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialisation compatible avec ton système existant
  useEffect(() => {
    const initializeLanguage = () => {
      // 1. Vérifier le localStorage (même clé que LanguageSwitcher)
      const savedLang = localStorage.getItem(LANGUAGE_KEY) as Language;
      if (savedLang && (savedLang === "fr" || savedLang === "en")) {
        setLangState(savedLang);
        setIsLoaded(true);
        return;
      }

      // 2. Détecter la langue du navigateur
      const browserLang = navigator.language.toLowerCase();
      const detectedLang: Language = browserLang.startsWith("fr") ? "fr" : "en";
      
      setLangState(detectedLang);
      localStorage.setItem(LANGUAGE_KEY, detectedLang);
      setIsLoaded(true);
    };

    initializeLanguage();
  }, []);

  // Fonction compatible avec ton LanguageSwitcher
  const setLang = (newLang: string) => {
    const validLang = (newLang === "fr" || newLang === "en") ? newLang as Language : "fr";
    setLangState(validLang);
    localStorage.setItem(LANGUAGE_KEY, validLang);
    
    // Analytics optionnel
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "language_change", {
        new_language: validLang,
        previous_language: lang
      });
    }
  };

  // Fonction utilitaire pour obtenir le texte dans la bonne langue
  const getText = (texts: { fr: string; en: string }) => {
    return texts[lang];
  };

  // Fonction pour formater les dates selon la locale
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const locale = lang === "fr" ? "fr-FR" : "en-US";
    
    return dateObj.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Code de langue pour les balises HTML
  const langCode = lang === "fr" ? "fr-FR" : "en-US";

  return {
    lang,
    setLang,
    getText,
    formatDate,
    langCode,
    isLoaded
  };
}