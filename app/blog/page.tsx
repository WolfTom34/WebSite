"use client";
import { useState } from "react";
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
    title: post.title[lang],
    excerpt: post.excerpt[lang],
    category: post.category[lang]
  }));

  const structuredData = generateBlogSchema(posts, lang);
  const categories = blogData.categories[lang];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredPosts = selectedCategory === categories[0] ? posts : posts.filter(post => post.category === selectedCategory);

  return (
    <>
      <SEOHead seoData={currentSEO} lang={lang} structuredData={structuredData} pageType="article" />
      <Layout lang={lang} setLang={setLang} className="blog">
        <main className={styles.blogContent}>
          <div className="container">
            <header className={styles.blogHeader}>
              <h1>{currentSEO.h1}</h1>
              <p>
                {lang === "fr" 
                  ? "Suivez nos analyses et retours d'expérience sur les drones autonomes, partagés depuis notre page LinkedIn professionnelle."
                  : "Follow our analysis and feedback on autonomous drones, shared from our professional LinkedIn page."
                }
              </p>
            </header>
            <nav className={styles.categories} aria-label={lang === "fr" ? "Filtrer par catégorie" : "Filter by category"}>
              {categories.map(category => (
                <button key={category} onClick={() => setSelectedCategory(category)} className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ''}`} aria-pressed={selectedCategory === category}>
                  {category}
                </button>
              ))}
            </nav>
            <section className={styles.postsGrid} aria-label={lang === "fr" ? "Articles de blog" : "Blog articles"}>
              {filteredPosts.map(post => (
                <article key={post.id} className={styles.postCard}>
                  <div className={styles.postImage}>
                    <Image src={post.image} alt={post.title} width={400} height={225} loading="lazy" className={styles.postImg} />
                    <span className={styles.categoryTag}>{post.category}</span>
                  </div>
                  <div className={styles.postContent}>
                    <header>
                      <h2>{post.title}</h2>
                      <div className={styles.postMeta}>
                        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(lang)}</time>
                        <span aria-hidden="true">•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </header>
                    <p>{post.excerpt}</p>
                    <footer className={styles.postFooter}>
                      <a href={post.linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.readMore} aria-label={`${lang === "fr" ? "Lire l'article" : "Read article"} "${post.title}" ${lang === "fr" ? "sur LinkedIn" : "on LinkedIn"}`}>
                        {lang === "fr" ? "Lire sur LinkedIn" : "Read on LinkedIn"} →
                      </a>
                    </footer>
                  </div>
                </article>
              ))}
            </section>
            <div className={styles.linkedinCta}>
              <div className={styles.ctaContent}>
                <h2>{lang === "fr" ? "Suivez-nous sur LinkedIn" : "Follow us on LinkedIn"}</h2>
                <p>{lang === "fr" ? "Ne manquez aucune de nos analyses et retours d'expérience sur les drones autonomes." : "Don't miss any of our analysis and feedback on autonomous drones."}</p>
                <a href="https://www.linkedin.com/company/safevalleysve/" target="_blank" rel="noopener noreferrer" className={styles.linkedinBtn} aria-label={lang === "fr" ? "Suivre Safe Valley sur LinkedIn" : "Follow Safe Valley on LinkedIn"}>
                  {lang === "fr" ? "Suivre Safe Valley" : "Follow Safe Valley"}
                </a>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}