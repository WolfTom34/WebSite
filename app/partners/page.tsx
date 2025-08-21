"use client";
import { useState } from "react";
import Head from "next/head";
import partners from "../data/partners.json";
import Navbar from "../components/navbar";
import LanguageSwitcher from "../components/language_switcher";
import CustomCursor from "../components/custom_cursor";
import Background from "../components/background";

export default function PartnersPage() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [showNav, setShowNav] = useState(false);

  const seo = {
    fr: {
      title: "Partenaires Safe Valley | Mountain Edge | Chiron Solutions",
      description: "Nos partenaires technologiques : Mountain Edge (Edge AI), Chiron Solutions (formations sécurité). Écosystème complet pour vos projets drones.",
      h1: "Nos partenaires technologiques"
    },
    en: {
      title: "Safe Valley Partners | Mountain Edge | Chiron Solutions",
      description: "Our technology partners: Mountain Edge (Edge AI), Chiron Solutions (security training). Complete ecosystem for your drone projects.",
      h1: "Our technology partners"
    }
  }[lang];

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.safevalleysve.com/partners/" />
        
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content="https://www.safevalleysve.com/logo.png" />
        <meta property="og:url" content="https://www.safevalleysve.com/partners/" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": seo.title,
            "description": seo.description,
            "publisher": {
              "@type": "Organization",
              "name": "Safe Valley SVE",
              "url": "https://www.safevalleysve.com"
            },
            "about": partners.map(partner => ({
              "@type": "Organization",
              "name": partner.name,
              "description": lang === "fr" ? partner.descriptionFr : partner.descriptionEn,
              "url": partner.link
            }))
          })
        }} />
      </Head>

      <div className="page partners" data-lang={lang}>
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

        <img
          src="/logo.png"
          alt="Safe Valley SVE - Drones autonomes de surveillance"
          className="logo"
        />

        <main className="partners-content">
          <div className="container">
            <header>
              <h1 className="title">{seo.h1}</h1>
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
                    <img
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      className="partner-logo"
                      loading="lazy"
                      decoding="async"
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
              {lang === "fr" ? "All Rights Reserved." : "All Rights Reserved."}
            </p>
          </div>
        </footer>

        <style>{`
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
            width: 32px; cursor: pointer; z-index: 110; transition: transform .2s ease, filter .2s ease;
          }
          .nav-btn:hover { filter: drop-shadow(0 0 8px white); }

          .logo {
            position: relative; top: 40px; left: 50%; transform: translateX(-50%);
            width: 120px; margin-bottom: 40px; z-index: 10; pointer-events: none;
          }

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
          .partner-logo { max-width: 100%; max-height: 100%; display: block; }

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