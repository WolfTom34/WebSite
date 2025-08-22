"use client";
import { useState } from "react";
import Image from "next/image";
import partners from "../data/partners.json";
import Navbar from "../components/navbar";
import LanguageSwitcher from "../components/language_switcher";
import CustomCursor from "../components/custom_cursor";
import Background from "../components/background";
import SEOHead from "../components/seo_head";
import { partnersSEO, generatePartnersSchema } from "../data/seo";

export default function PartnersPage() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [showNav, setShowNav] = useState(false);

  const currentSEO = partnersSEO[lang];
  const structuredData = generatePartnersSchema(partners, lang);

  return (
    <>
      <SEOHead 
        seoData={currentSEO} 
        lang={lang} 
        structuredData={structuredData}
      />

      <div className="page partners" data-lang={lang}>
        <Background />
        <CustomCursor />
        <Navbar showNav={showNav} setShowNav={setShowNav} lang={lang} />
        <LanguageSwitcher lang={lang} setLang={setLang} />

        <button      
          className="nav-btn focusable"
          aria-label="Menu navigation"
          onClick={() => setShowNav(prev => !prev)}
        >
          <Image 
            src="/button.png"
            alt=""
            width={32}
            height={32}
            priority
          />
        </button>

        <div className="logo-container">
          <Image
            src="/logo.png"
            alt="Safe Valley SVE - Drones autonomes de surveillance"
            className="logo"
            width={120}
            height={60}
            priority
          />
        </div>

        <main className="partners-content">
          <div className="container">
            <header>
              <h1 className="title">{currentSEO.h1}</h1>
              <p className="lead">
                {lang === "fr"
                  ? "Safe Valley s'associe avec les leaders technologiques pour vous offrir des solutions complètes et innovantes"
                  : "Safe Valley partners with technology leaders to offer you complete and innovative solutions"
                }
              </p>
            </header>

            <section className="grid" aria-label={lang === "fr" ? "Liste des partenaires" : "Partners list"}>
              {partners.map((partner: any, index: number) => (
                <article className="card partner" key={partner?.name ?? index}>
                  <div className="logo-box">
                    <Image
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      className="partner-logo"
                      width={140}
                      height={140}
                      loading="lazy"
                    />
                  </div>
                  <div className="info">
                    <h2 className="name">{partner.name}</h2>
                    <p className="desc">{lang === "fr" ? partner.descriptionFr : partner.descriptionEn}</p>
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="btn-link focusable"
                      aria-label={lang === "fr" ? `Visiter le site de ${partner.name}` : `Visit ${partner.name} website`}
                    >
                      {lang === "fr" ? "Visiter" : "Visit"}
                    </a>
                  </div>
                </article>
              ))}
            </section>
          </div>
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

        <style jsx>{`
          :root {
            --accent: #6a6aff;
            --accent-600: #5959e0;
            --text: #ffffff;
            --bg-card: rgba(0,0,0,0.35);
            --border: rgba(255,255,255,0.20);
            --shadow-glow-sm: 0 0 12px rgba(255,255,255,0.15), 0 0 24px rgba(106,106,255,0.18);
            --shadow-glow-strong: 0 0 16px rgba(255,255,255,0.25), 0 0 32px rgba(106,106,255,0.35);
            --radius: 20px;
            --radius-sm: 12px;
            --container-w: min(92vw, 1200px);
            --fs-body: clamp(14px, 1.2vw, 16px);
            --fs-h1: clamp(28px, 4vw, 48px);
            --fs-h3: clamp(18px, 2.2vw, 24px);
          }

          .container { width: var(--container-w); margin: 0 auto; }
          .card { border-radius: var(--radius); background: var(--bg-card); border: 2px solid var(--border); }
          .focusable:focus-visible { outline: 2px solid var(--text); outline-offset: 4px; border-radius: 8px; }

          .page {
            min-height: 100vh; position: relative; overflow-x: hidden; color: var(--text); text-align: center;
            padding: max(0px, env(safe-area-inset-top)) max(0px, env(safe-area-inset-right)) 0 max(0px, env(safe-area-inset-left));
          }

          .nav-btn {
            position: fixed; top: max(16px, env(safe-area-inset-top)); right: max(16px, env(safe-area-inset-right));
            background: none; border: none; cursor: pointer; z-index: 110; 
            transition: transform .2s ease, filter .2s ease;
          }
          .nav-btn:hover { filter: drop-shadow(0 0 8px white); }

          .logo-container {
            position: relative; top: 40px; text-align: center;
            margin-bottom: 40px; z-index: 10;
          }
          .logo { pointer-events: none; }

          .partners-content { padding: 140px 0 80px; position: relative; z-index: 10; }

          .title { font-size: var(--fs-h1); margin-bottom: 16px; }
          .lead { 
            max-width: 70ch; margin: 0 auto 40px; font-size: var(--fs-body); 
            line-height: 1.65; opacity: .95; 
          }

          .grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 28px; text-align: left;
          }

          .partner {
            display: flex; align-items: center; gap: 20px; padding: 24px;
            box-shadow: var(--shadow-glow-sm); transition: box-shadow .25s ease;
          }
          .partner:hover { box-shadow: var(--shadow-glow-strong); }

          .logo-box {
            flex: 0 0 140px; height: 140px; display: flex; align-items: center; justify-content: center;
            background: rgba(255,255,255,0.06); border-radius: var(--radius-sm); overflow: hidden;
          }
          .partner-logo { object-fit: contain; }

          .info { flex: 1; min-width: 0; }
          .name { font-size: var(--fs-h3); margin: 0 0 8px; line-height: 1.2; }
          .desc { font-size: var(--fs-body); margin: 0 0 16px; opacity: .95; }

          .btn-link {
            display: inline-block; background: var(--accent); color: #fff;
            padding: 10px 20px; border-radius: 10px; text-decoration: none; font-weight: 700;
            transition: transform .15s ease, background .2s ease;
          }
          .btn-link:hover { background: var(--accent-600); }

          .footer {
            position: relative; background: rgba(0,0,0,0.3); backdrop-filter: blur(8px);
            color: var(--text); padding: 20px 0; border-top: 1px solid var(--border);
            text-align: center; z-index: 20;
          }
          .footer-content { display: flex; flex-direction: column; gap: 10px; align-items: center; }
          address { font-style: normal; margin-bottom: 10px; }

          @media (max-width: 640px) {
            .partner { flex-direction: column; align-items: stretch; padding: 20px; gap: 16px; }
            .logo-box { flex: 0 0 auto; height: 120px; }
          }
        `}</style>
      </div>
    </>
  );
}