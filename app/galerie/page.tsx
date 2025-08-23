"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
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
  category?: string;
}

// Catégories de vidéos
const categories = {
  fr: ["Toutes", "Démonstrations", "Missions", "Technologies", "Formations"],
  en: ["All", "Demonstrations", "Missions", "Technologies", "Training"]
};

export default function VideoGallery() {
  const { lang, setLang } = useLanguage();
  const [lightboxVideo, setLightboxVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");
  const [isLoading, setIsLoading] = useState(true);
  const currentSEO = videoSEO[lang];
  
  // Enrichir les vidéos avec des métadonnées (simulé)
  const enrichedVideos = useMemo(() => {
    return videos.map((video: any, index: number) => ({
      ...video,
      category: ["Démonstrations", "Missions", "Technologies"][index % 3]
    }));
  }, []);

  // Filtrer les vidéos par catégorie
  const filteredVideos = useMemo(() => {
    if (selectedCategory === "Toutes" || selectedCategory === "All") {
      return enrichedVideos;
    }
    return enrichedVideos.filter(video => video.category === selectedCategory);
  }, [selectedCategory, enrichedVideos]);

  const structuredData = generateVideoGallerySchema(filteredVideos, lang);

  useEffect(() => {
    // Simuler le chargement
    setTimeout(() => setIsLoading(false), 800);
  }, []);

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

  // Fonction de partage
  const handleShare = (platform: string, video: Video) => {
    const url = `https://www.safevalleysve.com/video/${video.id}`;
    const text = `Découvrez cette vidéo : ${video.title}`;
    
    switch(platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert(lang === "fr" ? "Lien copié !" : "Link copied!");
        break;
    }
  };

  return (
    <>
      <SEOHead seoData={currentSEO} lang={lang} structuredData={structuredData} pageType="video" />
      <Layout lang={lang} setLang={setLang}>
        <main className={styles.content}>
          <div className="container">
            <motion.header 
              className={styles.pageHeader}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.categoryBadge}>
                <span>📹</span>
                <span>{lang === "fr" ? "Galerie Vidéo" : "Video Gallery"}</span>
              </div>
              <h1>{currentSEO.h1}</h1>
              <p>
                {lang === "fr" 
                  ? "Découvrez la technologie Safe Valley à travers nos démonstrations vidéo : écosystème Maverick, station Ruche, et essaims de drones en mission."
                  : "Discover Safe Valley technology through our video demonstrations: Maverick ecosystem, Hive station, and drone swarms on mission."
                }
              </p>
            </motion.header>

            {/* Barre de filtres */}
            <motion.div 
              className={styles.filterBar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {categories[lang].map((category) => (
                <button
                  key={category}
                  className={`${styles.filterBtn} ${selectedCategory === category ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Grille de vidéos */}
            {isLoading ? (
              <div className={styles.loading}>
                <div className={styles.loadingSpinner}></div>
              </div>
            ) : filteredVideos.length > 0 ? (
              <motion.section 
                className={styles.grid} 
                aria-label={lang === "fr" ? "Galerie vidéo" : "Video gallery"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {filteredVideos.map((video: Video, index: number) => (
                  <motion.article 
                    className={`${styles.videoCard} card`} 
                    key={video.id}
                    style={{ '--card-index': index } as any}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div 
                      className={styles.thumbnail} 
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
                        className={styles.thumbnailImg} 
                      />
                      <div className={styles.play} aria-label="Lire la vidéo">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className={styles.info}>
                      <h2>{video.title}</h2>
                      <p>{video.description}</p>
                      <button 
                        onClick={() => setLightboxVideo(video)} 
                        aria-label={`Regarder ${video.title}`} 
                        className={styles.watchBtn}
                      >
                        <span>{lang === "fr" ? "Regarder" : "Watch"}</span>
                        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                          <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                        </svg>
                      </button>
                    </div>
                  </motion.article>
                ))}
              </motion.section>
            ) : (
              <div className={styles.emptyState}>
                <h2>{lang === "fr" ? "Aucune vidéo trouvée" : "No videos found"}</h2>
                <p>
                  {lang === "fr" 
                    ? "Essayez de sélectionner une autre catégorie"
                    : "Try selecting another category"
                  }
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Lightbox améliorée */}
        {lightboxVideo && (
          <motion.div 
            className={styles.lightbox} 
            onClick={() => setLightboxVideo(null)} 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="video-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.modal} 
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                className={styles.close} 
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
              
              {/* Boutons de partage */}
              <div className={styles.shareButtons}>
                <button 
                  className={styles.shareBtn}
                  onClick={() => handleShare('linkedin', lightboxVideo)}
                  aria-label="Partager sur LinkedIn"
                >
                  💼 LinkedIn
                </button>
                <button 
                  className={styles.shareBtn}
                  onClick={() => handleShare('copy', lightboxVideo)}
                  aria-label="Copier le lien"
                >
                  🔗 {lang === "fr" ? "Copier le lien" : "Copy link"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </Layout>
    </>
  );
}