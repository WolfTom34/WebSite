"use client";
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
  loading: () => <div className="loading-placeholder">Chargement...</div>,
  ssr: false
});

const TechInnovation = dynamic(() => import("./components/tech_innovation"), {
  loading: () => <div className="loading-placeholder">Chargement...</div>,
  ssr: false
});

export default function Page() {
  const { lang, setLang } = useLanguage();
  const { scrollYProgress } = useScroll();
  const currentSEO = homepageSEO[lang];

  return (
    <>
      <SEOHead seoData={currentSEO} lang={lang} />
      <Layout lang={lang} setLang={setLang} showLogo={false}>
        <motion.div className={styles.scrollBar} style={{ scaleX: scrollYProgress }} />
        <main className={styles.content}>
          <section className={styles.frontPage}>
            <h1 className="sr-only">{currentSEO.h1}</h1>
            <div className={`${styles.videoBox} card ${styles.glowAnimated}`}>
              <iframe
                className={styles.ytEmbed}
                src={`${videos[1].src}?autoplay=1&mute=1&loop=1&playlist=${videos[1].id}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                title={videos[1].title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            {/* Image optimisée avec Next.js */}
            <Image 
              src="/logo.png" 
              className={styles.logo} 
              alt="Safe Valley SVE - Drones autonomes de surveillance"
              width={95}
              height={50}
              priority
              sizes="95px"
            />
            <Image 
              src="/arrow.png" 
              className={`${styles.arrow} focusable`} 
              alt="Défiler vers nos services"
              width={36}
              height={36}
              loading="lazy"
              sizes="36px"
            />
          </section>

          <section id="services" className={`${styles.sectionBox} ${styles.diagonals}`}>
            <div className="container">
              <h2 className={styles.sectionTitle}>
                {lang === "fr" ? "Nos Solutions de Drones Autonomes" : "Our Autonomous Drone Solutions"}
              </h2>
              <Section lang={lang} />
            </div>
          </section>

          {/* Composant lazy-loadé */}
          <TechInnovation lang={lang} />

          <section className={styles.ctaSection}>
            <div className="container">
              <div className={styles.heroCta}>
                <h2 className={styles.ctaTitle}>
                  {lang === "fr" ? "Sécurisez votre site avec nos drones autonomes" : "Secure your site with our autonomous drones"}
                </h2>
                <p className={styles.ctaSubtitle}>
                  {lang === "fr" 
                    ? "Surveillance 24/7, inspection technique et protection périmétrique. Devis gratuit sous 24h."
                    : "24/7 surveillance, technical inspection and perimeter protection. Free quote within 24h."
                  }
                </p>
                <a href="/contact/" className={styles.ctaButton}>
                  {lang === "fr" ? "Demander un devis gratuit" : "Request free quote"}
                </a>
              </div>
            </div>
          </section>

          <section className={`container ${styles.sectionSpacing}`}>
            {/* Composant lazy-loadé */}
            <Carousel lang={lang} />
          </section>
        </main>
      </Layout>
    </>
  );
}