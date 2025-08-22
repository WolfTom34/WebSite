"use client";
import { useState } from "react";
import { motion, useScroll } from "framer-motion";

import LanguageSwitcher from "./components/language_switcher";
import CustomCursor from "./components/custom_cursor";
import Carousel from "./components/carousel";
import Navbar from "./components/navbar";
import Section from "./components/solution";
import Background from "./components/background";
import TechInnovation from "./components/tech_innovation";
import SEOHead from "./components/seo_head";

import { homepageSEO } from "./data/seo";
import videos from "./data/video.json";

export default function Page() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const { scrollYProgress } = useScroll();
  const [showNav, setShowNav] = useState(false);

  // Récupération des données SEO pour la langue actuelle
  const currentSEO = homepageSEO[lang];

  return (
    <>
      <SEOHead seoData={currentSEO} lang={lang} />
      
      <div className="page-container" data-lang={lang}>
        <motion.div className="scroll-bar" style={{ scaleX: scrollYProgress }} />

        <Background />
        <CustomCursor />
        <Navbar showNav={showNav} setShowNav={setShowNav} lang={lang} />
        <LanguageSwitcher lang={lang} setLang={setLang} />

        <img      
          src="/button.png"
          className="nav-btn focusable"
          alt="Menu navigation"
          onClick={() => setShowNav(prev => !prev)}
        />

        <main className="content">
          <section className="front-page">
            <h1 className="sr-only">{currentSEO.h1}</h1>
            
            <div className="video-box card glow-animated">
              <iframe
                className="yt-embed"
                src={`${videos[1].src}?autoplay=1&mute=1&loop=1&playlist=${videos[1].id}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                title={videos[1].title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <img
              src="/logo.png"
              className="logo"
              alt="Safe Valley SVE - Drones autonomes de surveillance"
            />

            <img
              src="/arrow.png"
              className="arrow focusable"
              alt="Défiler vers nos services"
            />
          </section>

          <section id="services" className="section-box diagonals">
            <div className="container">
              <h2 className="section-title">
                {lang === "fr" ? "Nos Solutions de Drones Autonomes" : "Our Autonomous Drone Solutions"}
              </h2>
              <Section lang={lang} />
            </div>
          </section>

          <TechInnovation lang={lang} />

          <section className="cta-section">
            <div className="container">
              <div className="hero-cta">
                <h2 className="cta-title">
                  {lang === "fr" ? "Sécurisez votre site avec nos drones autonomes" : "Secure your site with our autonomous drones"}
                </h2>
                <p className="cta-subtitle">
                  {lang === "fr" 
                    ? "Surveillance 24/7, inspection technique et protection périmétrique. Devis gratuit sous 24h."
                    : "24/7 surveillance, technical inspection and perimeter protection. Free quote within 24h."
                  }
                </p>
                <a href="/contact/" className="cta-button">
                  {lang === "fr" ? "Demander un devis gratuit" : "Request free quote"}
                </a>
              </div>
            </div>
          </section>

          <section className="container section-spacing">
            <Carousel lang={lang} />
          </section>
        </main>

        <footer className="footer">
          <div className="footer-content container">
            <address>
              345 Rte de Carpentras<br />
              84570 Villes-sur-Auzon, France
            </address>
            <p>
              &copy; {new Date().getFullYear()} Safe Valley - SVE | {" "} 
              {lang === "fr" ? "Tous droits réservés." : "All Rights Reserved."}
            </p>
          </div>
        </footer>

        <style>{`
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
            --container-w: min(92vw, 1200px);
            --fs-body: clamp(14px, 1.2vw, 16px);
            --fs-h2: clamp(22px, 3vw, 32px);
          }

          .page-container, .content { color: var(--text); }
          .container { width: var(--container-w); margin: 0 auto; }
          .card { border-radius: var(--radius); background: var(--bg-card); border: 2px solid var(--border); }
          .section-spacing { padding: 60px 0; }
          
          .sr-only {
            position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
            overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
          }

          .page-container {
            width: 100%; min-height: 100vh; overflow-x: hidden; position: relative;
            padding: max(0px, env(safe-area-inset-top)) max(0px, env(safe-area-inset-right)) 0 max(0px, env(safe-area-inset-left));
          }

          .scroll-bar {
            position: fixed; top: 0; left: 0; height: 4px; width: 100%;
            background: linear-gradient(90deg, #ffffff, var(--accent));
            box-shadow: 0 0 12px rgba(255,255,255,0.6);
            transform-origin: 0%; z-index: 100;
          }

          .content { position: relative; z-index: 10; }

          .front-page {
            width: 100%; min-height: 100vh; position: relative;
            display: grid; place-items: center; padding-top: 40px;
          }

          .video-box {
            position: relative; width: min(92vw, 960px); aspect-ratio: 16/9;
            overflow: hidden; background: rgba(0,0,0,0.4);
          }
          .yt-embed { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

          .glow-animated {
            box-shadow: var(--shadow-glow-sm);
            animation: glowPulse 3.5s ease-in-out infinite;
          }

          .logo {
            position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
            width: 95px; z-index: 30; pointer-events: none;
          }

          .arrow {
            position: absolute; z-index: 30; bottom: 12px; left: 50%;
            width: 36px; cursor: pointer; transform: translateX(-50%);
            animation: bounce 2s infinite;
          }

          .section-box {
            margin: 60px 0; padding: 60px 0; width: 100%; position: relative;
            background: var(--bg-soft); border-top: 2px solid var(--border);
            border-bottom: 2px solid var(--border);
          }
          .section-box.diagonals { clip-path: polygon(0 0, 100% 4%, 100% 96%, 0 100%); }

          .section-title {
            text-align: center; font-size: var(--fs-h2);
            margin-bottom: 40px; font-weight: 600;
          }

          .cta-section {
            padding: 80px 0; background: var(--bg-soft);
            border-top: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
          }

          .hero-cta {
            text-align: center; max-width: 700px; margin: 0 auto;
            background: var(--bg-card); backdrop-filter: blur(12px);
            border-radius: 20px; padding: 40px 30px; border: 2px solid var(--border);
            box-shadow: var(--shadow-glow-sm);
          }

          .cta-title {
            font-size: clamp(24px, 4vw, 36px); font-weight: 700;
            margin: 0 0 16px; color: #ffffff; line-height: 1.2;
          }

          .cta-subtitle {
            font-size: clamp(16px, 2.5vw, 18px); margin: 0 0 24px;
            color: rgba(255,255,255,0.9); line-height: 1.5; max-width: 500px;
            margin-left: auto; margin-right: auto;
          }

          .cta-button {
            display: inline-block; background: var(--accent); color: #ffffff;
            padding: 16px 32px; border-radius: 12px; text-decoration: none;
            font-weight: 700; font-size: 18px; transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(106,106,255,0.3);
          }
          .cta-button:hover {
            background: var(--accent-600); transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(106,106,255,0.4);
          }

          .footer {
            position: relative; background: rgba(0,0,0,0.3);
            backdrop-filter: blur(8px); color: var(--text);
            padding: 20px 0; text-align: center; border-top: 1px solid var(--border);
          }
          .footer-content { display: flex; flex-direction: column; gap: 10px; align-items: center; }
          address { font-style: normal; margin-bottom: 10px; }

          .nav-btn {
            position: fixed; top: max(16px, env(safe-area-inset-top));
            right: max(16px, env(safe-area-inset-right));
            width: 32px; cursor: pointer; z-index: 110;
            transition: transform .2s ease, filter .2s ease;
          }
          .nav-btn:hover { filter: drop-shadow(0 0 8px white); }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translate(-50%, 0); }
            40% { transform: translate(-50%, -20px); }
          }
          @keyframes glowPulse {
            0% { box-shadow: var(--shadow-glow-sm); }
            50% { box-shadow: var(--shadow-glow-md); }
            100% { box-shadow: var(--shadow-glow-sm); }
          }

          @media (max-width: 768px) {
            .section-box.diagonals { clip-path: polygon(0 0, 100% 3%, 100% 97%, 0 100%); }
            .cta-section { padding: 60px 0; }
            .hero-cta { padding: 30px 20px; }
          }
          @media (max-width: 480px) {
            .logo { width: 80px; }
            .nav-btn { width: 28px; }
            .arrow { width: 30px; }
            .cta-section { padding: 40px 0; }
            .hero-cta { padding: 24px 16px; }
            .cta-button { padding: 14px 28px; font-size: 16px; }
          }
        `}</style>
      </div>
    </> 
  );
}