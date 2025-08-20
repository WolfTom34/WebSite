"use client";
import { useState, useEffect } from "react";
import videos from "../data/video.json";
import Navbar from "../components/navbar";
import LanguageSwitcher from "../components/language_switcher";
import CustomCursor from "../components/custom_cursor";
import Background from "../components/background";

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
    <div className="page" data-lang={lang}>
      <Background />
      <CustomCursor />
      <Navbar showNav={showNav} setShowNav={setShowNav} lang={lang} />
      <LanguageSwitcher lang={lang} setLang={setLang} />

      <img
        src="/button.png"
        className="nav-btn"
        alt="Menu"
        role="button"
        tabIndex={0}
        onClick={() => setShowNav(prev => !prev)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setShowNav(prev => !prev))}
      />

      <img src="/logo.png" alt="Logo" className="logo" />

      <section className="content">
        <div className="container">
          <h1>{lang === "fr" ? "Notre Galerie Vidéo" : "Our Video Gallery"}</h1>
          <p>{lang === "fr" ? "Découvrez nos vidéos, présentations et témoignages." : "Discover our videos, presentations and testimonials."}</p>

          <div className="grid">
            {videos.map((video: Video) => (
              <div className="card" key={video.id}>
                <div className="thumbnail" onClick={() => setLightboxVideo(video)}>
                  <img src={video.thumbnail} alt={video.title} loading="lazy" />
                  <div className="play">▶</div>
                </div>
                <div className="info">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <button onClick={() => setLightboxVideo(video)}>
                    {lang === "fr" ? "Regarder" : "Watch"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxVideo && (
        <div className="lightbox" onClick={() => setLightboxVideo(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setLightboxVideo(null)}>×</button>
            <iframe
              src={`https://www.youtube.com/embed/${lightboxVideo.id}?autoplay=1&rel=0`}
              title={lightboxVideo.title}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
            <h3>{lightboxVideo.title}</h3>
            <p>{lightboxVideo.description}</p>
          </div>
        </div>
      )}

      <footer>
        <p>&copy; {new Date().getFullYear()} Safe Valley - SVE | {lang === "fr" ? "Tous droits réservés." : "All Rights Reserved."}</p>
      </footer>

      <style jsx>{`
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
          --fs-body: clamp(14px, 1.2vw, 16px);
          --fs-h1: clamp(28px, 4vw, 48px);
          --fs-h3: clamp(18px, 2.2vw, 24px);
          --lh-body: 1.65;
        }
        .page { 
          min-height: 100vh; 
          color: var(--text); 
          text-align: center; 
          position: relative;
          overflow-x: hidden;
          padding-top: max(0px, env(safe-area-inset-top));
          padding-left: max(0px, env(safe-area-inset-left));
          padding-right: max(0px, env(safe-area-inset-right));
        }
        /* Application ciblée de la couleur blanche seulement sur le contenu principal */
        .content, .content * {
          color: #ffffff;
        }
        
        footer, footer * {
          color: #ffffff;
        }
        
        .nav-btn { 
          position: fixed; 
          top: max(16px, env(safe-area-inset-top)); 
          right: max(16px, env(safe-area-inset-right)); 
          width: 32px; 
          cursor: pointer; 
          z-index: 110; 
          transition: transform .2s ease, filter .2s ease;
          transform: translateZ(0);
        }
        .nav-btn:hover { filter: drop-shadow(0 0 8px white); }
        .logo { position: relative; top: 40px; left: 50%; transform: translateX(-50%); width: 120px; margin-bottom: 40px; z-index: 10; pointer-events: none; }
        .content { padding: 140px 0 80px; z-index: 10; position: relative; }
        .container { width: min(92vw, 1200px); margin: 0 auto; }
        h1 { font-size: clamp(28px, 4vw, 48px); margin-bottom: 16px; }
        p { max-width: 70ch; margin: 0 auto 40px; opacity: 0.95; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; text-align: left; }
        .card { background: var(--bg-card); border: 2px solid var(--border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-glow-sm); transition: all 0.25s; }
        .card:hover { box-shadow: 0 0 16px rgba(255,255,255,0.25), 0 0 32px rgba(106,106,255,0.35); }
        .thumbnail { position: relative; aspect-ratio: 16/9; overflow: hidden; cursor: pointer; }
        .thumbnail img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .card:hover img { transform: scale(1.05); }
        .play { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; opacity: 0; transition: opacity 0.3s; }
        .thumbnail:hover .play { opacity: 1; }
        .info { padding: 24px; }
        .info h3 { font-size: clamp(18px, 2.2vw, 24px); margin-bottom: 8px; }
        .info p { margin-bottom: 16px; opacity: 0.95; }
        .info button { background: var(--accent); color: white; padding: 10px 20px; border: none; border-radius: 10px; cursor: pointer; font-weight: 700; transition: all 0.15s; }
        .info button:hover { background: #5959e0; }
        .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal { position: relative; max-width: 90vw; max-height: 90vh; background: var(--bg); border-radius: 20px; padding: 20px; border: 1px solid var(--border); }
        .close { position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 30px; color: var(--text); cursor: pointer; width: 40px; height: 40px; border-radius: 50%; transition: all 0.2s; }
        .close:hover { background: rgba(255,255,255,0.1); }
        iframe { width: 100%; aspect-ratio: 16/9; border-radius: 12px; margin-bottom: 20px; }
        .modal h3 { margin-bottom: 8px; }
        .modal p { opacity: 0.9; max-width: 600px; margin: 0 auto; }
        footer { background: rgba(0,0,0,0.3); backdrop-filter: blur(8px); padding: 20px 0; border-top: 1px solid var(--border); }
        @media (max-width: 940px) { .grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .grid { grid-template-columns: 1fr; gap: 20px; } .content { padding: 120px 0 60px; } }
      `}</style>
    </div>
  );
}