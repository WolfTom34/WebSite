// page.tsx - Version corrigée
"use client";
import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { useLanguage } from "./hooks/useLanguage";
import Image from "next/image";
import dynamic from "next/dynamic";
import Layout from "./components/layout";
import Section from "./components/solution";
import SEOHead from "./components/seo_head";
import { homepageSEO } from "./data/seo";
import videos from "./data/video.json";
import styles from "./styles/homepage.module.css";

// Lazy load des composants lourds
const Carousel = dynamic(() => import("./components/carousel"), {
  loading: () => <div className={styles.carouselLoading}>Chargement...</div>,
  ssr: false
});

const TechInnovation = dynamic(() => import("./components/tech_innovation"), {
  loading: () => <div className={styles.techLoading}>Chargement...</div>,
  ssr: false
});

export default function Page() {
  const { lang, setLang } = useLanguage();
  const { scrollYProgress } = useScroll();
  const currentSEO = homepageSEO[lang];
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <SEOHead seoData={currentSEO} lang={lang} />
      <Layout lang={lang} setLang={setLang} currentPage="/">
        <motion.div 
          className={styles.scrollBar} 
          style={{ scaleX: scrollYProgress }} 
        />
        
        <main className={styles.content}>
          {/* Hero Section avec layout 2 colonnes */}
          <section className={styles.heroSection}>
            <div className={styles.heroWrapper}>
              {/* Colonne gauche : Contenu texte */}
              <div className={styles.heroContent}>
                {/* Badge d'état */}
                <motion.div 
                  className={styles.heroBadge}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className={styles.badgeDot} />
                  <span>{lang === "fr" ? "Technologie Opérationnelle" : "Operational Technology"}</span>
                </motion.div>

                {/* Titre principal avec animation */}
                <motion.h1 
                  className={styles.heroTitle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className={styles.titleGradient}>
                    {lang === "fr" 
                      ? "Surveillance Autonome" 
                      : "Autonomous Surveillance"}
                  </span>
                  <br />
                  <span className={styles.titleSubline}>
                    {lang === "fr" 
                      ? "par Essaims de Drones" 
                      : "by Drone Swarms"}
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p 
                  className={styles.heroDescription}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {lang === "fr"
                    ? "L'écosystème Maverick révolutionne la sécurité avec une surveillance intelligente 24/7, une levée de doute automatisée et une protection périmétrique nouvelle génération."
                    : "The Maverick ecosystem revolutionizes security with 24/7 intelligent surveillance, automated doubt removal and next-generation perimeter protection."}
                </motion.p>

                {/* Boutons d'action */}
                <motion.div 
                  className={styles.heroActions}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <a href="/contact/" className={styles.btnPrimary}>
                    <span>{lang === "fr" ? "Demander une démo" : "Request a demo"}</span>
                    <svg className={styles.btnIcon} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                    </svg>
                  </a>
                  <button 
                    className={styles.btnSecondary}
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {lang === "fr" ? "Découvrir nos services" : "Discover our services"}
                  </button>
                </motion.div>

                {/* Stats */}
                <motion.div 
                  className={styles.heroStats}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>24/7</span>
                    <span className={styles.statLabel}>
                      {lang === "fr" ? "Surveillance Continue" : "Continuous Surveillance"}
                    </span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>&lt;30s</span>
                    <span className={styles.statLabel}>
                      {lang === "fr" ? "Temps de Réaction" : "Response Time"}
                    </span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>100%</span>
                    <span className={styles.statLabel}>
                      {lang === "fr" ? "Autonome" : "Autonomous"}
                    </span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>360°</span>
                    <span className={styles.statLabel}>
                      {lang === "fr" ? "Couverture" : "Coverage"}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Colonne droite : Video showcase */}
              <motion.div 
                className={styles.heroMedia}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className={`${styles.videoContainer} ${videoLoaded ? styles.videoLoaded : ''}`}>
                  <div className={styles.videoGlow} />
                  <iframe
                    className={styles.videoEmbed}
                    src={`${videos[1].src}?autoplay=1&mute=1&loop=1&playlist=${videos[1].id}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                    title={videos[1].title}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    onLoad={() => setVideoLoaded(true)}
                  />
                  {!videoLoaded && (
                    <div className={styles.videoLoader}>
                      <div className={styles.loaderSpinner} />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Indicateur de scroll amélioré */}
            <motion.button 
              className={styles.scrollIndicator}
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              aria-label="Défiler vers le bas"
            >
              <span className={styles.scrollText}>
                {lang === "fr" ? "Découvrir" : "Discover"}
              </span>
              <div className={styles.scrollArrow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
              </div>
            </motion.button>
          </section>

          {/* Services Section améliorée */}
          <section id="services" className={styles.servicesSection}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <motion.span 
                  className={styles.sectionTag}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {lang === "fr" ? "Nos Solutions" : "Our Solutions"}
                </motion.span>
                <motion.h2 
                  className={styles.sectionTitle}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {lang === "fr" 
                    ? "Solutions de Drones Autonomes" 
                    : "Autonomous Drone Solutions"}
                </motion.h2>
                <motion.p 
                  className={styles.sectionSubtitle}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {lang === "fr"
                    ? "Des services adaptés à vos besoins critiques de sécurité et surveillance"
                    : "Services adapted to your critical security and surveillance needs"}
                </motion.p>
              </div>
              <Section lang={lang} />
            </div>
          </section>

          {/* Tech Innovation Section */}
          <TechInnovation lang={lang} />

          {/* CTA Section améliorée */}
          <section className={styles.ctaSection}>
            <div className={styles.container}>
              <motion.div 
                className={styles.ctaContent}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className={styles.ctaTitle}>
                  {lang === "fr" 
                    ? "Sécurisez votre site avec nos drones autonomes" 
                    : "Secure your site with our autonomous drones"}
                </h2>
                <p className={styles.ctaSubtitle}>
                  {lang === "fr" 
                    ? "Surveillance 24/7, inspection technique et protection périmétrique. Devis gratuit sous 24h."
                    : "24/7 surveillance, technical inspection and perimeter protection. Free quote within 24h."}
                </p>
                <div className={styles.ctaButtons}>
                  <a href="/contact/" className={styles.ctaButton}>
                    <span>{lang === "fr" ? "Demander un devis gratuit" : "Request free quote"}</span>
                    <svg className={styles.ctaIcon} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Carousel Section */}
          <section>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>
                  {lang === "fr" ? "Galerie" : "Gallery"}
                </span>
                <h2 className={styles.sectionTitle}>
                  {lang === "fr" ? "Nos Réalisations" : "Our Achievements"}
                </h2>
              </div>
              <Carousel lang={lang} />
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}