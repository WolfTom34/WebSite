"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import Image from "next/image";
import videos from "../data/video.json";
import Layout from "../components/layout";
import SEOHead from "../components/seo_head";
import { videoSEO, generateVideoGallerySchema } from "../data/seo";
import styles from "../styles/gallery.module.css";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export default function VideoGallery() {
  const { lang, setLang } = useLanguage();
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
      <SEOHead seoData={currentSEO} lang={lang} structuredData={structuredData} pageType="video" />
      <Layout lang={lang} setLang={setLang}>
        <main className={styles.content}>
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
            <section className={styles.grid} aria-label={lang === "fr" ? "Galerie vidéo" : "Video gallery"}>
              {videos.map((video: Video) => (
                <article className={`${styles.videoCard} card`} key={video.id}>
                  <div className={styles.thumbnail} onClick={() => setLightboxVideo(video)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxVideo(video); } }}>
                    <Image src={video.thumbnail} alt={`Démonstration ${video.title} - Safe Valley`} width={400} height={225} loading="lazy" className={styles.thumbnailImg} />
                    <div className={styles.play} aria-label="Lire la vidéo">▶</div>
                  </div>
                  <div className={styles.info}>
                    <h2>{video.title}</h2>
                    <p>{video.description}</p>
                    <button onClick={() => setLightboxVideo(video)} aria-label={`Regarder ${video.title}`} className={styles.watchBtn}>
                      {lang === "fr" ? "Regarder" : "Watch"}
                    </button>
                  </div>
                </article>
              ))}
            </section>
          </div>
        </main>
        {lightboxVideo && (
          <div className={styles.lightbox} onClick={() => setLightboxVideo(null)} role="dialog" aria-modal="true" aria-labelledby="video-title">
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <button className={styles.close} onClick={() => setLightboxVideo(null)} aria-label="Fermer la vidéo">×</button>
              <iframe src={`https://www.youtube.com/embed/${lightboxVideo.id}?autoplay=1&rel=0`} title={lightboxVideo.title} allow="autoplay; fullscreen" allowFullScreen width="100%" height="400" />
              <h3 id="video-title">{lightboxVideo.title}</h3>
              <p>{lightboxVideo.description}</p>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}