"use client";
import { useEffect, useState } from "react";

interface Props {
  lang: string;
  setLang: (lang: string) => void;
}

export default function LanguageSwitcher({ lang, setLang }: Props) {
  const [fade, setFade] = useState(false);

  // Charger la langue sauvegardée
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== lang) {
      setLang(savedLang);
    }
  }, []);

  // Sauvegarder la langue quand elle change
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  // Gérer le fade-out / fade-in
  const handleSwitch = () => {
    setFade(true);
    setTimeout(() => {
      setLang(lang === "fr" ? "en" : "fr");
      setFade(false);
    }, 300);
  };

  return (
    <>
      {/* Bouton switch */}
      <div
        onClick={handleSwitch}
        style={{
          display: "flex",
          alignItems: "center",
          width: "80px",
          height: "32px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.4)",
          cursor: "pointer",
          padding: "2px",
          position: "fixed",
          top: "20px",
          left: "20px",
          fontSize: "0.85rem",
          color: "white",
          userSelect: "none",
          zIndex: 20,
        }}
      >
        {/* Pastille */}
        <div
          style={{
            position: "absolute",
            top: "2px",
            left: lang === "fr" ? "2px" : "42px",
            width: "36px",
            height: "28px",
            background: "white",
            borderRadius: "20px",
            transition: "left 0.3s ease",
          }}
        />
        {/* Labels */}
        <span
          style={{
            flex: 1,
            textAlign: "center",
            zIndex: 1,
            color: lang === "fr" ? "black" : "rgba(255,255,255,0.6)",
          }}
        >
          FR
        </span>
        <span
          style={{
            flex: 1,
            textAlign: "center",
            zIndex: 1,
            color: lang === "en" ? "black" : "rgba(255,255,255,0.6)",
          }}
        >
          EN
        </span>
      </div>

      {/* Overlay fade-out / fade-in */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "black",
          opacity: fade ? 0.6 : 0,
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
          zIndex: 15,
        }}
      />
    </>
  );
}