"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import videos from "../data/video.json";
import Navbar from "../components/navbar";
import LanguageSwitcher from "../components/language_switcher";
import CustomCursor from "../components/custom_cursor";
import Background from "../components/background";
import SEOHead from "../components/seo_head";
import { videoSEO, generateVideoGallerySchema } from "../data/seo";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export default function VideoGallery() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [showNav, setShowNav] = useState(false);
  const [lightboxVideo, setLightboxVideo] = useState<Video | null>(null);

  const currentSEO = videoSEO[lang];
  const structuredData = generateVideoGallerySchema(videos, lang);

  useEffect(() => {
    document.body.style.overflow = lightboxVideo ? "hidden" : "auto";
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxVideo) setLightboxVideo(null);
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener('keydown', handleEscape);
    };
  }, [lightboxVideo]);

  return (
    <>
      <SEOHead 
        seoData={currentSEO} 
        lang={lang} 
        structuredData={structuredData}
        pageType="video"
      />

      <div className="page" data-lang={lang}>
        <Background />
        <CustomCursor />
        <Navbar showNav={showNav} setShowNav={setShowNav} lang={lang} />
        <LanguageSwitcher lang={lang} setLang={setLang} />

        <button
          className="nav-btn"
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

        <main className="content">
          <div className="container">
            <header>
              <h1>{currentSEO.h1}</h1>
              <p>
                {lang === "fr" 
                  ? "Découvrez la technologie Safe Valley à travers nos démonstrations vidéo : écosystème Maverick, station Ruche, et essaims de drones en mission."
                  : "Discover Safe Valley technology through our video demonstrations: Maverick ecosystem, Hive station, and drone swarms on mission."
                }
              </p>
            </header>

            <section className="grid" aria-label={lang === "fr" ? "Galerie vidéo" : "Video gallery"}>
              {videos.map((video: Video) => (
                <article className="card" key={video.id}>
                  <div 
                    className="thumbnail" 
                    onClick={() => setLightboxVideo(video)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setLightboxVideo(video);
                      }
                    }}
                  >
                    <Image 
                      src={video.thumbnail} 
                      alt={`Démonstration ${video.title} - Safe Valley`}
                      width={400}
                      height={225}
                      loading="lazy"
                      className="thumbnail-img"
                    />
                    <div className="play" aria-label="Lire la vidéo">▶</div>
                  </div>
                  <div className="info">
                    <h2>{video.title}</h2>
                    <p>{video.description}</p>
                    <button 
                      onClick={() => setLightboxVideo(video)}
                      aria-label={`Regarder ${video.title}`}
                      className="watch-btn"
                    >
                      {lang === "fr" ? "Regarder" : "Watch"}
                    </button>
                  </div>
                </article>
              ))}
            </section>
          </div>
        </main>

        {lightboxVideo && (
          <div 
            className="lightbox" 
            onClick={() => setLightboxVideo(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-title"
          >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button 
                className="close" 
                onClick={() => setLightboxVideo(null)}
                aria-label="Fermer la vidéo"
              >
                ×
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${lightboxVideo.id}?autoplay=1&rel=0`}
                title={lightboxVideo.title}
                allow="autoplay; fullscreen"
                allowFullScreen
                width="100%"
                height="400"
              />
              <h3 id="video-title">{lightboxVideo.title}</h3>
              <p>{lightboxVideo.description}</p>
            </div>
          </div>
        )}

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
            --shadow-glow-md: 0 0 20px rgba(255,255,255,0.25), 0 0 40px rgba(106,106,255,0.28);
            --radius: 20px;
            --container-w: min(92vw, 1200px);
            --fs-body: clamp(14px, 1.2vw, 16px);
            --fs-h1: clamp(28px, 4vw, 48px);
            --fs-h3: clamp(18px, 2.2vw, 24px);
          }
          
          .page { 
            min-height: 100vh; 
            color: var(--text); 
            text-align: center; 
            position: relative; 
            overflow-x: hidden;
            padding: max(0px, env(safe-area-inset-top)) max(0px, env(safe-area-inset-right)) 0 max(0px, env(safe-area-inset-left));
          }
          
          .content, .content *, .footer, .footer * {
            color: #ffffff !important;
          }
          
          .nav-btn { 
            position: fixed; 
            top: max(16px, env(safe-area-inset-top)); 
            right: max(16px, env(safe-area-inset-right)); 
            background: none;
            border: none;
            cursor: pointer; 
            z-index: 110; 
            transition: transform .2s ease, filter .2s ease;
            transform: translateZ(0);
          }
          .nav-btn:hover { filter: drop-shadow(0 0 8px white); }
          .nav-btn:active { transform: scale(.9); }
          
          .logo-container { 
            position: relative; 
            top: 40px; 
            text-align: center;
            margin-bottom: 40px; 
            z-index: 10;
          }
          .logo { pointer-events: none; }
          
          .content { padding: 140px 0 80px; z-index: 10; position: relative; }
          .container { width: var(--container-w); margin: 0 auto; }
          
          h1 { font-size: var(--fs-h1); margin-bottom: 16px; }
          header p { max-width: 70ch; margin: 0 auto 40px; opacity: 0.95; }
          
          .grid { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 28px; 
            text-align: left; 
          }
          
          .card { 
            background: var(--bg-card); 
            border: 2px solid var(--border); 
            border-radius: var(--radius); 
            overflow: hidden; 
            box-shadow: var(--shadow-glow-sm); 
            transition: all 0.25s;
            will-change: transform, box-shadow;
          }
          .card:hover { 
            box-shadow: 0 0 16px rgba(255,255,255,0.25), 0 0 32px rgba(106,106,255,0.35); 
          }
          
          .thumbnail { 
            position: relative; 
            aspect-ratio: 16/9; 
            overflow: hidden; 
            cursor: pointer; 
          }
          .thumbnail-img { 
            width: 100%; 
            height: 100%; 
            object-fit: cover; 
            transition: transform 0.3s; 
          }
          .card:hover .thumbnail-img { transform: scale(1.05); }
          
          .play { 
            position: absolute; 
            top: 50%; 
            left: 50%; 
            transform: translate(-50%, -50%); 
            width: 60px; 
            height: 60px; 
            background: var(--accent); 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 20px; 
            opacity: 0; 
            transition: opacity 0.3s; 
            color: white;
          }
          .thumbnail:hover .play { opacity: 1; }
          
          .info { padding: 24px; }
          .info h2 { 
            font-size: var(--fs-h3); 
            margin-bottom: 8px; 
            color: #ffffff;
          }
          .info p { 
            margin-bottom: 16px; 
            opacity: 0.95; 
            color: #ffffff;
          }
          .watch-btn { 
            background: var(--accent); 
            color: white; 
            padding: 10px 20px; 
            border: none; 
            border-radius: 10px; 
            cursor: pointer; 
            font-weight: 700; 
            transition: all 0.15s; 
          }
          .watch-btn:hover { background: var(--accent-600); }
          .watch-btn:active { transform: translateY(1px) scale(.99); }
          
          .lightbox { 
            position: fixed; 
            inset: 0; 
            background: rgba(0,0,0,0.95); 
            z-index: 1000; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            padding: 20px; 
          }
          .modal { 
            position: relative; 
            max-width: 90vw; 
            max-height: 90vh; 
            background: var(--bg-card); 
            border-radius: 20px; 
            padding: 20px; 
            border: 1px solid var(--border); 
          }
          .close { 
            position: absolute; 
            top: 10px; 
            right: 15px; 
            background: none; 
            border: none; 
            font-size: 30px; 
            color: var(--text); 
            cursor: pointer; 
            width: 40px; 
            height: 40px; 
            border-radius: 50%; 
            transition: all 0.2s; 
          }
          .close:hover { background: rgba(255,255,255,0.1); }
          
          iframe { 
            width: 100%; 
            aspect-ratio: 16/9; 
            border-radius: 12px; 
            margin-bottom: 20px; 
          }
          .modal h3 { 
            margin-bottom: 8px; 
            color: #ffffff;
          }
          .modal p { 
            opacity: 0.9; 
            max-width: 600px; 
            margin: 0 auto; 
            color: #ffffff;
          }
          
          .footer { 
            background: rgba(0,0,0,0.3); 
            backdrop-filter: blur(8px); 
            -webkit-backdrop-filter: blur(8px);
            padding: 20px 0; 
            border-top: 1px solid var(--border); 
            text-align: center; 
          }
          address { 
            font-style: normal; 
            margin-bottom: 10px; 
            color: #ffffff;
          }
          
          @media (max-width: 940px) { 
            .grid { grid-template-columns: repeat(2, 1fr); } 
          }
          @media (max-width: 640px) { 
            .grid { grid-template-columns: 1fr; gap: 20px; } 
            .content { padding: 120px 0 60px; } 
          }
        `}</style>
      </div>
    </>
  );
}