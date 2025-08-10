"use client";
import { useState } from "react";
import partners from "../data/partners.json";
import Navbar from "../components/navbar";
import LanguageSwitcher from "../components/language_switcher";
import CustomCursor from "../components/custom_cursor";
import Background from "../components/background";

export default function PartnersPage() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="page partners" data-lang={lang}>
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

      {/* LOGO */}
      <img
        src="/logo.png"
        alt="Logo"
        className="logo"
        decoding="async"
        fetchPriority="high"
      />

      <section className="partners-content">
        <div className="container">
          <h1 className="title">
            {lang === "fr" ? "Nos partenaires" : "Our Partners"}
          </h1>
          <p className="lead">
            {lang === "fr"
              ? "Découvrez les entreprises et organisations qui collaborent avec nous."
              : "Discover the companies and organizations that work with us."}
          </p>

          <div className="grid">
            {partners.map((p: any, index: number) => (
              <div className="card partner" key={p?.name ?? index}>
                <div className="logo-box">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="partner-logo"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="info">
                  <h3 className="name">{p.name}</h3>
                  <p className="desc">{lang === "fr" ? p.descriptionFr : p.descriptionEn}</p>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link focusable"
                    aria-label={lang === "fr" ? `Visiter le site de ${p.name}` : `Visit ${p.name} website`}
                  >
                    {lang === "fr" ? "Visiter" : "Visit"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content container">
          <p>
            &copy; {new Date().getFullYear()} Mon Site.{" "}
            {lang === "fr" ? "Tous droits réservés." : "All Rights Reserved"}
          </p>
        </div>
      </footer>

      <style>{`
        /* TOKENS (mêmes que page principale) */
        :root {
          --accent: #6a6aff;
          --accent-600: #5959e0;
          --text: #ffffff;
          --bg-card: rgba(0,0,0,0.35);
          --bg-soft: rgba(0,0,0,0.25);
          --border: rgba(255,255,255,0.20);
          --border-soft: rgba(255,255,255,0.15);
          --shadow-glow-sm: 0 0 12px rgba(255,255,255,0.15), 0 0 24px rgba(106,106,255,0.18);
          --radius: 20px;
          --radius-sm: 12px;

          --container-w: min(92vw, 1200px);
          --fs-body: clamp(14px, 1.2vw, 16px);
          --fs-h1: clamp(28px, 4vw, 48px);
          --fs-h3: clamp(18px, 2.2vw, 24px);
          --lh-body: 1.65;
        }

        /* Utils */
        .container { width: var(--container-w); margin: 0 auto; }
        .card { border-radius: var(--radius); background: var(--bg-card); border: 2px solid var(--border); }
        .focusable:focus-visible { outline: 2px solid var(--text); outline-offset: 4px; border-radius: 8px; }

        /* Page */
        .page {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          color: var(--text);
          text-align: center;
          padding-top: max(0px, env(safe-area-inset-top));
          padding-left: max(0px, env(safe-area-inset-left));
          padding-right: max(0px, env(safe-area-inset-right));
        }

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

        .logo {
          position: relative;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          margin-bottom: 40px;
          z-index: 10;
          pointer-events: none;
        }

        .partners-content { padding: 140px 0 80px; position: relative; z-index: 10; }

        .title { font-size: var(--fs-h1); margin-bottom: 16px; }
        .lead { max-width: 70ch; margin: 0 auto 40px; font-size: var(--fs-body); line-height: var(--lh-body); opacity: .95; }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 28px;
          width: var(--container-w);
          margin: 0 auto;
          text-align: left;
        }

        .partner {
          display: flex; align-items: center; gap: 20px;
          padding: 24px;
          box-shadow: var(--shadow-glow-sm);
          will-change: transform, box-shadow;
        }

        .logo-box {
          flex: 0 0 140px; height: 140px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.06);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }
        .partner-logo { max-width: 100%; max-height: 100%; display: block; }

        .info { flex: 1; min-width: 0; }
        .name { font-size: var(--fs-h3); margin: 0 0 8px; line-height: 1.2; }
        .desc { font-size: var(--fs-body); margin: 0 0 16px; opacity: .95; }

        .btn-link {
          display: inline-block;
          background: var(--accent); color: #fff;
          padding: 10px 20px; border-radius: 10px;
          text-decoration: none; font-weight: 700;
          transition: transform .15s ease, background .2s ease;
        }
        .btn-link:hover { background: var(--accent-600); }
        .btn-link:active { transform: translateY(1px) scale(.98); }

        /* Footer (même que principal) */
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

        /* Mobile: stack */
        @media (max-width: 640px) {
          .partner { flex-direction: column; align-items: stretch; padding: 20px; gap: 16px; }
          .logo-box { flex: 0 0 auto; height: 120px; }
        }

        @media (prefers-reduced-motion: reduce) {
          /* pas d'animations spécifiques ici */
        }
      `}</style>
    </div>
  );
}