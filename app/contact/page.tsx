"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import LanguageSwitcher from "../components/language_switcher";
import CustomCursor from "../components/custom_cursor";
import Background from "../components/background";

export default function ContactPage() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="page contact" data-lang={lang}>
      {/* FIXED ELEMENTS */}
      <Background />
      <CustomCursor />
      <Navbar showNav={showNav} setShowNav={setShowNav} lang={lang} />
      <LanguageSwitcher lang={lang} setLang={setLang} />

      {/* NAV BUTTON (fixed) */}
      <img
        src="/button.png"
        className="nav-btn focusable"
        alt={lang === "fr" ? "Ouvrir la navigation" : "Open navigation"}
        role="button"
        aria-label={lang === "fr" ? "Ouvrir la navigation" : "Open navigation"}
        tabIndex={0}
        onClick={() => setShowNav((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShowNav((prev) => !prev);
          }
        }}
      />

      {/* OVERLAY (fondu, pas de blur) */}
      <div className="overlay-fade" />

      {/* FORM SECTION */}
      <motion.div
        className="contact-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/logo.png"
          alt="Logo Safe Valley – SVE"
          className="logo"
          decoding="async"
          fetchPriority="high"
        />

        <div className="card contact-box">
          <h1 className="title">
            {lang === "fr" ? "Contactez-nous" : "Contact Us"}
          </h1>

          <form className="form">
            <input
              type="text"
              placeholder={lang === "fr" ? "Nom" : "Name"}
              className="input"
              name="name"
              autoComplete="name"
            />
            <input
              type="email"
              placeholder="Email"
              className="input"
              name="email"
              autoComplete="email"
              inputMode="email"
            />
            <textarea
              placeholder={lang === "fr" ? "Votre message" : "Your message"}
              className="textarea"
              name="message"
            />
            <button type="submit" className="btn btn-primary focusable">
              {lang === "fr" ? "Envoyer" : "Send"}
            </button>
          </form>
        </div>
      </motion.div>

      {/* MAP SECTION */}
      <motion.section
        className="map-section"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="map-box card">
          <iframe
            title={lang === "fr" ? "Localisation sur Google Maps" : "Location on Google Maps"}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2867.2773696116597!2d5.22297907640068!3d44.05698082622179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ca71fe0d140113%3A0xf092ef9ec2d3c21c!2s345%20Rte%20de%20Carpentras%2C%2084570%20Villes-sur-Auzon!5e0!3m2!1sfr!2sfr!4v1754140778473!5m2!1sfr!2sfr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </motion.section>

      {/* FOOTER (seul blur conservé) */}
      <footer className="footer">
        <div className="footer-content container">
          <p>
            &copy; {new Date().getFullYear()} Safe Valley - SVE |{" "}
            {lang === "fr" ? "All Rights Reserved." : "All Rights Reserved."}
          </p>
        </div>
      </footer>

      {/* STYLES */}
      <style>{`
        /* TOKENS (mêmes que page principale) */
        :root {
          --accent: #6a6aff;
          --accent-600: #5959e0;
          --text: #ffffff;
          --bg-card: rgba(0,0,0,0.35);
          --bg-soft: rgba(0,0,0,0.25);
          --border: rgba(255,255,255,0.20);
          --shadow-glow-sm: 0 0 12px rgba(255,255,255,0.15), 0 0 24px rgba(106,106,255,0.18);
          --shadow-glow-strong: 0 0 16px rgba(255,255,255,0.25), 0 0 32px rgba(106,106,255,0.35);
          --radius: 20px;

          --container-w: min(92vw, 1200px);
          --fs-body: clamp(14px, 1.2vw, 16px);
          --fs-h1: clamp(28px, 4vw, 48px);
          --lh-body: 1.65;
        }

        /* Utils */
        .container { width: var(--container-w); margin: 0 auto; }
        .card { border-radius: var(--radius); background: var(--bg-card); border: 2px solid var(--border); }
        .btn { border: none; border-radius: 10px; font-weight: 700; cursor: pointer; }
        .btn-primary { background: var(--accent); color: #fff; padding: 14px 18px; transition: transform .15s ease, background .2s ease; }
        .btn-primary:hover { background: var(--accent-600); }
        .btn-primary:active { transform: translateY(1px) scale(.99); }
        .focusable:focus-visible { outline: 2px solid var(--text); outline-offset: 4px; border-radius: 8px; }

        /* Page shell */
        .page {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          color: var(--text);
          padding-top: max(0px, env(safe-area-inset-top));
          padding-left: max(0px, env(safe-area-inset-left));
          padding-right: max(0px, env(safe-area-inset-right));
        }

        /* Nav button (fixed) */
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

        /* Overlay fade (no blur) */
        .overlay-fade {
          position: absolute;
          bottom: 0; left: 0; width: 100%; height: 40%;
          background: linear-gradient(to top, rgba(0,0,0,0.35), transparent);
          z-index: 5;
          pointer-events: none;
        }

        /* Content */
        .contact-content {
          min-height: 60vh;
          display: flex; flex-direction: column; align-items: center;
          padding: 60px 20px 30px;
          position: relative; z-index: 10; text-align: center;
        }
        .logo { width: 100px; margin-bottom: 30px; display: block; pointer-events: none; }

        /* 🔥 Glow appliqué ici */
        .contact-box {
          width: min(92vw, 720px);
          padding: clamp(24px, 4vw, 40px) clamp(20px, 3vw, 30px);
          box-shadow: var(--shadow-glow-sm);
          will-change: transform, box-shadow;
          transition: box-shadow .25s ease;
        }
        .contact-box:hover {
          box-shadow: var(--shadow-glow-strong);
        }

        .title { font-size: var(--fs-h1); margin: 0 0 16px; }

        .form { display: flex; flex-direction: column; gap: 16px; width: 100%; }
        .input, .textarea {
          padding: 14px; width: 100%; color: #fff;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 10px;
        }
        .textarea { min-height: 120px; resize: vertical; }
        .input::placeholder, .textarea::placeholder { color: rgba(255,255,255,0.8); }

        /* Map */
        .map-section { width: 100%; padding: 40px 20px 60px; display: flex; justify-content: center; position: relative; z-index: 10; }
        .map-box { width: min(92vw, 1100px); height: clamp(320px, 50vh, 520px); overflow: hidden; }

        /* Footer (only blur kept) */
        .footer {
          position: relative;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: var(--text);
          padding: 20px 0;
          border-top: 1px solid var(--border);
          text-align: center;
          z-index: 20;
        }
        .footer-content { display: flex; flex-direction: column; gap: 10px; align-items: center; }

        @media (prefers-reduced-motion: reduce) {
          /* plus d'animations ici */
        }
      `}</style>
    </div>
  );
}