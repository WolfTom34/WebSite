// components/language_switcher.tsx - Version modernisée
"use client";
import { useState } from "react";
import styles from "../styles/language.module.css";

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
    <>
      <button
        onClick={handleSwitch}
        className={`${styles.switcher} ${isAnimating ? styles.animating : ''}`}
        aria-label={`Changer la langue vers ${lang === "fr" ? "anglais" : "français"}`}
        disabled={isAnimating}
      >
        <div 
          className={styles.track}
          style={{
            transform: `translateX(${lang === "fr" ? "0" : "28px"})`
          }}
        />
        <span className={`${styles.label} ${lang === "fr" ? styles.active : ''}`}>
          FR
        </span>
        <span className={`${styles.label} ${lang === "en" ? styles.active : ''}`}>
          EN
        </span>
      </button>

      <div
        className={`${styles.fadeOverlay} ${isAnimating ? styles.fadeActive : ''}`}
        aria-hidden="true"
      />
    </>
  );
}