"use client";
import { useState } from "react";

interface Props {
  lang: "fr" | "en";
  setLang: (lang: string) => void;
}

export default function LanguageSwitcher({ lang, setLang }: Props) {
  const [fade, setFade] = useState(false);

  // Gérer le fade-out / fade-in avec une transition plus fluide
  const handleSwitch = () => {
    if (fade) return; // Éviter les doubles clics
    
    setFade(true);
    setTimeout(() => {
      setLang(lang === "fr" ? "en" : "fr");
      setFade(false);
    }, 300);
  };

  return (
    <>
      {/* Bouton switch amélioré */}
      <button
        onClick={handleSwitch}
        className="language-switcher"
        aria-label={`Changer la langue vers ${lang === "fr" ? "anglais" : "français"}`}
        disabled={fade}
      >
        {/* Pastille mobile */}
        <div 
          className="switcher-track"
          style={{
            transform: `translateX(${lang === "fr" ? "0px" : "40px"})`
          }}
        />
        
        {/* Labels */}
        <span className={`lang-label ${lang === "fr" ? "active" : ""}`}>
          FR
        </span>
        <span className={`lang-label ${lang === "en" ? "active" : ""}`}>
          EN
        </span>
      </button>

      {/* Overlay fade-out / fade-in */}
      <div
        className="fade-overlay"
        style={{ opacity: fade ? 0.6 : 0 }}
        aria-hidden="true"
      />

      <style jsx>{`
        .language-switcher {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 80px;
          height: 32px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          cursor: pointer;
          padding: 2px;
          position: fixed;
          top: max(20px, env(safe-area-inset-top));
          left: max(20px, env(safe-area-inset-left));
          font-size: 0.85rem;
          color: white;
          user-select: none;
          z-index: var(--z-nav, 120);
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .language-switcher:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.6);
          transform: scale(1.05);
        }

        .language-switcher:focus-visible {
          outline: 2px solid var(--accent, #6a6aff);
          outline-offset: 2px;
        }

        .language-switcher:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }

        .switcher-track {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 36px;
          height: 28px;
          background: linear-gradient(135deg, #ffffff, #f0f0f0);
          border-radius: 20px;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .lang-label {
          flex: 1;
          text-align: center;
          z-index: 1;
          position: relative;
          font-weight: 600;
          transition: color 0.3s ease;
          padding: 4px 0;
        }

        .lang-label.active {
          color: #2d3748;
        }

        .lang-label:not(.active) {
          color: rgba(255, 255, 255, 0.6);
        }

        .fade-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: var(--z-header, 100);
        }

        /* Animation pour les changements de langue */
        @keyframes languageChange {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }

        .language-switcher.changing {
          animation: languageChange 0.6s ease;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .language-switcher {
            width: 70px;
            height: 28px;
            font-size: 0.75rem;
            top: max(16px, env(safe-area-inset-top));
            left: max(16px, env(safe-area-inset-left));
          }

          .switcher-track {
            width: 32px;
            height: 24px;
          }
        }

        /* Réduction de mouvement */
        @media (prefers-reduced-motion: reduce) {
          .switcher-track,
          .lang-label,
          .fade-overlay,
          .language-switcher {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}