"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import Image from "next/image";
import Layout from "../components/layout";
import SEOHead from "../components/seo_head";
import { blogSEO, generateBlogSchema } from "../data/seo";
import blogData from "../data/blog.json";
import styles from "../styles/blog.module.css";

export default function BlogPage() {
  const { lang, setLang } = useLanguage();
  const currentSEO = blogSEO[lang];

  const posts = blogData.posts.map(post => ({
    ...post,
    category: post.category[lang]
  }));

  const structuredData = generateBlogSchema(posts, lang);
  const categories = blogData.categories[lang];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredPosts = selectedCategory === categories[0] 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <>
      <SEOHead 
        seoData={currentSEO} 
        lang={lang} 
        structuredData={structuredData} 
        pageType="article" 
      />
      <Layout lang={lang} setLang={setLang} currentPage="/blog" className="blog">
        <main className={styles.blogContent}>
          <div className="container">
            {/* Header avec animation */}
            <motion.header 
              className={styles.blogHeader}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>{currentSEO.h1}</h1>
              <p>
                {lang === "fr" 
                  ? "Suivez nos analyses et retours d'expérience sur les drones autonomes, partagés depuis notre page LinkedIn professionnelle."
                  : "Follow our analysis and feedback on autonomous drones, shared from our professional LinkedIn page."
                }
              </p>
            </motion.header>

            {/* Filtres de catégories */}
            <motion.nav 
              className={styles.categories} 
              aria-label={lang === "fr" ? "Filtrer par catégorie" : "Filter by category"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {categories.map((category, index) => (
                <motion.button 
                  key={category} 
                  onClick={() => setSelectedCategory(category)} 
                  className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ''}`} 
                  aria-pressed={selectedCategory === category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.nav>

            {/* Grille d'articles */}
            <section 
              className={styles.postsGrid} 
              aria-label={lang === "fr" ? "Articles de blog" : "Blog articles"}
            >
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <motion.article 
                    key={post.id} 
                    className={styles.postCard}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    <div className={styles.postImage}>
                      <Image 
                        src={post.image} 
                        alt=""
                        width={400} 
                        height={225} 
                        loading="lazy" 
                        className={styles.postImg}
                        quality={85}
                      />
                      <span className={styles.categoryTag}>{post.category}</span>
                    </div>
                    <div className={styles.postContent}>
                      <footer className={styles.postFooter}>
                        <a 
                          href={post.linkedinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={styles.readMore} 
                          aria-label={`${lang === "fr" ? "Lire l'article" : "Read article"} "${post.title}" ${lang === "fr" ? "sur LinkedIn" : "on LinkedIn"}`}
                        >
                          {lang === "fr" ? "Lire sur LinkedIn" : "Read on LinkedIn"}
                        </a>
                      </footer>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p>
                    {lang === "fr" 
                      ? "Aucun article dans cette catégorie pour le moment."
                      : "No articles in this category yet."}
                  </p>
                </div>
              )}
            </section>

            {/* CTA LinkedIn */}
            <motion.div 
              className={styles.linkedinCta}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.ctaContent}>
                <h2>
                  {lang === "fr" ? "Suivez-nous sur LinkedIn" : "Follow us on LinkedIn"}
                </h2>
                <p>
                  {lang === "fr" 
                    ? "Ne manquez aucune de nos analyses et retours d'expérience sur les drones autonomes." 
                    : "Don't miss any of our analysis and feedback on autonomous drones."}
                </p>
                <a 
                  href="https://www.linkedin.com/company/safevalleysve/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.linkedinBtn} 
                  aria-label={lang === "fr" ? "Suivre Safe Valley sur LinkedIn" : "Follow Safe Valley on LinkedIn"}
                >
                  {lang === "fr" ? "Suivre Safe Valley" : "Follow Safe Valley"}
                </a>
              </div>
            </motion.div>
          </div>
        </main>
      </Layout>
    </>
  );
}