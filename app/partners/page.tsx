"use client";
import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import Image from "next/image";
import partners from "../data/partners.json";
import Layout from "../components/layout";
import SEOHead from "../components/seo_head";
import { partnersSEO, generatePartnersSchema } from "../data/seo";
import styles from "../styles/partners.module.css";

// Types pour TypeScript
interface Partner {
  name: string;
  logo: string;
  descriptionFr: string;
  descriptionEn: string;
  link: string;
  tags?: string[];
  category?: string;
}

export default function PartnersPage() {
  const { lang, setLang } = useLanguage();
  const currentSEO = partnersSEO[lang];
  const structuredData = generatePartnersSchema(partners, lang);
  
  // État pour filtrer par catégorie (optionnel)
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Catégories uniques extraites des partenaires
  const categories = useMemo(() => {
    const cats = new Set<string>();
    partners.forEach((p: any) => {
      if (p.category) cats.add(p.category);
    });
    return ["all", ...Array.from(cats)];
  }, []);
  
  // Filtrage des partenaires
  const filteredPartners = useMemo(() => {
    if (selectedCategory === "all") return partners;
    return partners.filter((p: any) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  return (
    <>
      <SEOHead seoData={currentSEO} lang={lang} structuredData={structuredData} />
      <Layout lang={lang} setLang={setLang} currentPage="/partners">
        
        {/* Hero Section */}
        <section className={styles.partnersHero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroGradient} />
            <div className={styles.heroPattern} />
          </div>

          <motion.div 
            className={styles.headerContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className={styles.badge}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.badgeDot} />
              <span>{lang === "fr" ? "Écosystème Partenaire" : "Partner Ecosystem"}</span>
            </motion.div>

            <h1 className={styles.title}>{currentSEO.h1}</h1>
            <p className={styles.lead}>
              {lang === "fr"
                ? "Safe Valley s'associe avec les leaders technologiques pour vous offrir des solutions complètes et innovantes"
                : "Safe Valley partners with technology leaders to offer you complete and innovative solutions"}
            </p>

            <motion.div 
              className={styles.statsBar}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className={styles.statItem} variants={statVariants}>
                <span className={styles.statNumber}>{filteredPartners.length}+</span>
                <span className={styles.statLabel}>
                  {lang === "fr" ? "Partenaires" : "Partners"}
                </span>
              </motion.div>
              <motion.div className={styles.statItem} variants={statVariants}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>
                  {lang === "fr" ? "Certifiés" : "Certified"}
                </span>
              </motion.div>
              <motion.div className={styles.statItem} variants={statVariants}>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>
                  {lang === "fr" ? "Support" : "Support"}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Partners Grid Section */}
        <section className={styles.partnersSection}>
          <div className={styles.container}>
            <motion.div 
              className={styles.sectionHeader}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className={styles.sectionTag}
                whileHover={{ scale: 1.05 }}
              >
                {lang === "fr" ? "Nos Partenaires" : "Our Partners"}
              </motion.span>
              <h2 className={styles.sectionTitle}>
                {lang === "fr" 
                  ? "Un réseau d'experts à votre service"
                  : "A network of experts at your service"}
              </h2>
              
              {/* Filtres optionnels par catégorie */}
              {categories.length > 1 && (
                <div className={styles.filterBar}>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat === "all" 
                        ? (lang === "fr" ? "Tous" : "All")
                        : cat
                      }
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div 
              className={styles.grid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              aria-label={lang === "fr" ? "Liste des partenaires" : "Partners list"}
            >
              {filteredPartners.map((partner: any, index: number) => (
                <motion.article 
                  className={styles.partner} 
                  key={partner?.name ?? index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  layout
                >
                  <motion.div 
                    className={styles.logoBox}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      className={styles.partnerLogo}
                      width={160}
                      height={160}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgZmlsbD0iIzMzMyIvPjwvc3ZnPg=="
                    />
                  </motion.div>
                  
                  <div className={styles.info}>
                    <h3 className={styles.name}>{partner.name}</h3>
                    
                    {/* Tags avec animations */}
                    {partner.tags && (
                      <motion.div 
                        className={styles.tags}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {partner.tags.map((tag: string, i: number) => (
                          <motion.span 
                            key={i} 
                            className={styles.tag}
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </motion.div>
                    )}
                    
                    <p className={styles.desc}>
                      {lang === "fr" ? partner.descriptionFr : partner.descriptionEn}
                    </p>
                    
                    <motion.a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className={styles.btnLink}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={lang === "fr" 
                        ? `Visiter le site de ${partner.name}` 
                        : `Visit ${partner.name} website`}
                    >
                      {lang === "fr" ? "Découvrir" : "Discover"}
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <motion.div 
              className={styles.ctaBox}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <h2 className={styles.ctaTitle}>
                {lang === "fr" 
                  ? "Devenez partenaire Safe Valley"
                  : "Become a Safe Valley partner"}
              </h2>
              <p className={styles.ctaSubtitle}>
                {lang === "fr" 
                  ? "Rejoignez notre écosystème et participez à la révolution de la sécurité autonome"
                  : "Join our ecosystem and be part of the autonomous security revolution"}
              </p>
              <motion.a 
                href="/contact/" 
                className={styles.ctaButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang === "fr" ? "Nous contacter" : "Contact us"}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </section>

      </Layout>
    </>
  );
}