// components/language_switcher.tsx - Version adaptée pour le nouveau CSS unifié
"use client";
import { useState } from "react";
import styles from "../styles/layout.module.css";

interface Props {
  lang: "fr" | "en";
  setLang: (lang: string) => void;
}

export default function LanguageSwitcher({ lang, setLang }: Props) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwitch = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setLang(lang === "fr" ? "en" : "fr");
      setIsAnimating(false);
    }, 300);
  };

  return (
    <button
      onClick={handleSwitch}
      className={`${styles.languageSwitcher} ${isAnimating ? styles.languageAnimating : ''}`}
      aria-label={`Changer la langue vers ${lang === "fr" ? "anglais" : "français"}`}
      disabled={isAnimating}
    >
      <div 
        className={styles.languageTrack}
        style={{
          transform: `translateX(${lang === "fr" ? "0" : "36px"})`
        }}
      />
      <span className={`${styles.languageLabel} ${lang === "fr" ? styles.languageLabelActive : ''}`}>
        FR
      </span>
      <span className={`${styles.languageLabel} ${lang === "en" ? styles.languageLabelActive : ''}`}>
        EN
      </span>
    </button>
  );
}