"use client";
import { useState } from "react";
import { motion, useScroll } from "framer-motion";

import LanguageSwitcher from "./components/language_switcher";
import CustomCursor from "./components/custom_cursor";
import Carousel from "./components/carousel";
import Navbar from "./components/navbar";
import Section from "./components/section";
import Background from "./components/background";

import videos from "./data/video.json";

export default function Page() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const { scrollYProgress } = useScroll();
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="page-container" data-lang={lang}>
      {/* BARRE DE SCROLL */}
      <motion.div className="scroll-bar" style={{ scaleX: scrollYProgress }} />

      {/* ÉLÉMENTS FIXES */}
      <Background />
      <CustomCursor />
      <Navbar showNav={showNav} setShowNav={setShowNav} lang={lang} />
      <LanguageSwitcher lang={lang} setLang={setLang} />

      {/* BOUTON NAV FIXE */}
      <img      
        src="/button.png"
        className="nav-btn focusable"
        alt="Button"
        decoding="async"
        fetchPriority="high"
        onClick={() => setShowNav((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShowNav((prev) => !prev);
          }
        }}
      />

      {/* CONTENU GLOBAL */}
      <div className="content">
        {/* HERO */}
        <section className="front-page">
          <div className="video-box card glow-animated">
            <iframe
              className="yt-embed"
              src={`${videos[0].src}?autoplay=1&mute=1&loop=1&playlist=${videos[0].id}&controls=0&modestbranding=1&rel=0&playsinline=1`}
              title={videos[0].title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Logo */}
          <img
            src="/logo.png"
            className="logo"
            alt="Logo"
            decoding="async"
            fetchPriority="high"
          />

          {/* Scroll Arrow */}
          <img
            src="/arrow.png"
            className="arrow focusable"
            alt="Arrow"
            decoding="async"
            fetchPriority="high"
          />
        </section>

        {/* SECTION 2 (encadrée diagonale) */}
        <section id="section2" className="section-box diagonals">
          <div className="container">
            <Section lang={lang} />
          </div>
        </section>

        {/* CAROUSEL */}
        <section className="container section-spacing">
          <Carousel lang={lang} />
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-content container">
            <p>
              &copy; {new Date().getFullYear()} Safe Valley - SVE | {" "} 
              {lang === "fr" ? "All Rights Reserved." : "All Rights Reserved."}
            </p>
          </div>
        </footer>
      </div>

      {/* STYLES */}
      <style>{`
        /* ===========================
           DESIGN TOKENS
        =========================== */
        :root {
          --accent: #6a6aff;
          --accent-600: #5959e0;
          --text: #ffffff;
          --bg-card: rgba(0,0,0,0.35);
          --bg-soft: rgba(0,0,0,0.25);
          --border: rgba(255,255,255,0.20);
          --border-soft: rgba(255,255,255,0.15);
          --shadow-glow-sm: 0 0 12px rgba(255,255,255,0.15), 0 0 24px rgba(106,106,255,0.18);
          --shadow-glow-md: 0 0 20px rgba(255,255,255,0.25), 0 0 40px rgba(106,106,255,0.28);
          --radius: 20px;
          --radius-sm: 12px;

          --container-w: min(92vw, 1200px);

          /* Typo scale */
          --fs-body: clamp(14px, 1.2vw, 16px);
          --fs-h1: clamp(28px, 4vw, 48px);
          --fs-h2: clamp(22px, 3vw, 32px);
          --fs-h3: clamp(18px, 2.2vw, 24px);
          --lh-body: 1.65;
        }

        /* ===========================
           RESET LÉGER
        =========================== */
        .page-container, .content { color: var(--text); }
        p { font-size: var(--fs-body); line-height: var(--lh-body); margin: 0; }
        h1 { font-size: var(--fs-h1); margin: 0 0 12px; }
        h2 { font-size: var(--fs-h2); margin: 0 0 10px; }
        h3 { font-size: var(--fs-h3); margin: 0 0 8px; }

        /* Utilitaires */
        .container { width: var(--container-w); margin: 0 auto; }
        .card {
          border-radius: var(--radius);
          background: var(--bg-card);
          border: 2px solid var(--border);
        }
        .focusable:focus-visible {
          outline: 2px solid var(--text);
          outline-offset: 6px;
          border-radius: 8px;
        }
        .section-spacing { padding: 60px 0; }

        /* ===========================
           STRUCTURE
        =========================== */
        .page-container {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
          padding-top: max(0px, env(safe-area-inset-top));
          padding-left: max(0px, env(safe-area-inset-left));
          padding-right: max(0px, env(safe-area-inset-right));
        }

        .scroll-bar {
          position: fixed; top: 0; left: 0; height: 4px; width: 100%;
          background: linear-gradient(90deg, #ffffff, var(--accent));
          box-shadow: 0 0 12px rgba(255,255,255,0.6);
          transform-origin: 0%;
          z-index: 100;
        }

        .content { position: relative; z-index: 10; }

        /* ===========================
           HERO
        =========================== */
        .front-page {
          width: 100%;
          min-height: 100vh;
          position: relative;
          display: grid;
          place-items: center;
          padding-top: 40px;
        }

        .video-box {
          position: relative;
          width: min(92vw, 960px);
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.4);
          will-change: transform, box-shadow;
        }
        /* L'iframe remplit le conteneur */
        .video-box .yt-embed {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .glow-animated {
          box-shadow: var(--shadow-glow-sm);
          animation: glowPulse 3.5s ease-in-out infinite;
        }

        .logo {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 95px;
          z-index: 30;
          pointer-events: none;
        }

        .arrow {
          position: absolute;
          z-index: 30;
          bottom: 12px;
          left: 50%;
          width: 36px;
          cursor: pointer;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
        }

        /* ===========================
           SECTION 2 (DIAGONALES)
        =========================== */
        .section-box {
          margin: 60px 0;
          padding: 60px 0;   /* padding vertical — le contenu est centré via .container */
          width: 100%;
          position: relative;
          isolation: isolate;
          background: var(--bg-soft);
          border-top: 2px solid var(--border);
          border-bottom: 2px solid var(--border);
          box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.08);
        }
        .section-box.diagonals {
          clip-path: polygon(0 0, 100% 4%, 100% 96%, 0 100%);
        }

        /* ===========================
           FOOTER (seul blur conservé)
        =========================== */
        .footer {
          position: relative;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: var(--text);
          padding: 20px 0;
          text-align: center;
          border-top: 1px solid var(--border);
        }
        .footer-content { display: flex; flex-direction: column; gap: 10px; align-items: center; }

        /* ===========================
           NAV BUTTON FIXE
        =========================== */
            /* Nav button */
        .nav-btn {
          position: fixed;
          top: max(16px, env(safe-area-inset-top));
          right: max(16px, env(safe-area-inset-right));
          width: 32px;
          cursor: pointer;
          transition: transform .2s ease, filter .2s ease;
          z-index: 110;
          transform: translateZ(0);
        }
        .nav-btn:hover { filter: drop-shadow(0 0 8px white); }
        .nav-btn:active { transform: scale(.9); }

        /* ===========================
           ANIMATIONS
        =========================== */
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translate(-50%, 0); }
          40% { transform: translate(-50%, -20px); }
          60% { transform: translate(-50%, -10px); }
        }
        @keyframes glowPulse {
          0% { box-shadow: var(--shadow-glow-sm); }
          50% { box-shadow: var(--shadow-glow-md); }
          100% { box-shadow: var(--shadow-glow-sm); }
        }

        /* ===========================
           ACCESSIBILITÉ / RÉDUCTIONS
        =========================== */
        @media (prefers-reduced-motion: reduce) {
          .arrow { animation: none; }
          .glow-animated { animation: none; }
          .scroll-bar { transition: none; }
        }

        /* ===========================
           RWD FINITIONS
        =========================== */
        @media (max-width: 768px) {
          .section-box.diagonals {
            clip-path: polygon(0 0, 100% 3%, 100% 97%, 0 100%);
          }
        }
        @media (max-width: 480px) {
          .logo { width: 80px; }
          .nav-btn { width: 28px; }
          .arrow { width: 30px; bottom: 8px; }
        }
      `}</style>
    </div>
  );
}