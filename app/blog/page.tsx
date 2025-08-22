"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/navbar";
import LanguageSwitcher from "../components/language_switcher";
import CustomCursor from "../components/custom_cursor";
import Background from "../components/background";
import SEOHead from "../components/seo_head";
import { blogSEO, generateBlogSchema } from "../data/seo";

import blogData from "../data/blog.json";

export default function BlogPage() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [showNav, setShowNav] = useState(false);

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

      <div className="page blog" data-lang={lang}>
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
            alt="Safe Valley SVE - Blog drones autonomes" 
            className="logo"
            width={120}
            height={60}
            priority
          />
        </div>

        <main className="blog-content">
          <div className="container">
            <header className="blog-header">
              <h1>{currentSEO.h1}</h1>
              <p>
                {lang === "fr" 
                  ? "Suivez nos analyses et retours d'expérience sur les drones autonomes, partagés depuis notre page LinkedIn professionnelle."
                  : "Follow our analysis and feedback on autonomous drones, shared from our professional LinkedIn page."
                }
              </p>
            </header>

            <nav className="categories" aria-label={lang === "fr" ? "Filtrer par catégorie" : "Filter by category"}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  aria-pressed={selectedCategory === category}
                >
                  {category}
                </button>
              ))}
            </nav>

            <section 
              className="posts-grid"
              aria-label={lang === "fr" ? "Articles de blog" : "Blog articles"}
            >
              {filteredPosts.map(post => (
                <article key={post.id} className="post-card">
                  <div className="post-image">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      width={400}
                      height={225}
                      loading="lazy"
                      className="post-img"
                    />
                    <span className="category-tag">{post.category}</span>
                  </div>
                  <div className="post-content">
                    <header>
                      <h2>{post.title}</h2>
                      <div className="post-meta">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString(lang)}
                        </time>
                        <span aria-hidden="true">•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </header>
                    <p>{post.excerpt}</p>
                    <footer className="post-footer">
                      <a 
                        href={post.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="read-more"
                        aria-label={`${lang === "fr" ? "Lire l'article" : "Read article"} "${post.title}" ${lang === "fr" ? "sur LinkedIn" : "on LinkedIn"}`}
                      >
                        {lang === "fr" ? "Lire sur LinkedIn" : "Read on LinkedIn"} →
                      </a>
                    </footer>
                  </div>
                </article>
              ))}
            </section>

            <div className="linkedin-cta">
              <div className="cta-content">
                <h2>
                  {lang === "fr" ? "Suivez-nous sur LinkedIn" : "Follow us on LinkedIn"}
                </h2>
                <p>
                  {lang === "fr" 
                    ? "Ne manquez aucune de nos analyses et retours d'expérience sur les drones autonomes."
                    : "Don't miss any of our analysis and feedback on autonomous drones."
                  }
                </p>
                <a 
                  href="https://www.linkedin.com/company/safevalleysve/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="linkedin-btn"
                  aria-label={lang === "fr" ? "Suivre Safe Valley sur LinkedIn" : "Follow Safe Valley on LinkedIn"}
                >
                  {lang === "fr" ? "Suivre Safe Valley" : "Follow Safe Valley"}
                </a>
              </div>
            </div>
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
                {lang === "fr" ? "Tous droits réservés." : "All Rights Reserved."}
            </p>
          </div>
        </footer>

        <style jsx>{`
          :root {
            --accent: #6a6aff; --accent-600: #5959e0; --text: #ffffff; --bg-card: rgba(0,0,0,0.35);
            --bg-soft: rgba(0,0,0,0.25); --border: rgba(255,255,255,0.20); --border-soft: rgba(255,255,255,0.15);
            --shadow-glow-sm: 0 0 12px rgba(255,255,255,0.15), 0 0 24px rgba(106,106,255,0.18);
            --radius: 20px; --container-w: min(92vw, 1200px); --fs-body: clamp(14px, 1.2vw, 16px);
            --fs-h1: clamp(28px, 4vw, 48px);
          }

          .page { 
            min-height: 100vh; color: var(--text); position: relative; overflow-x: hidden;
            padding: max(0px, env(safe-area-inset-top)) max(0px, env(safe-area-inset-right)) 0 max(0px, env(safe-area-inset-left));
          }
          .container { width: var(--container-w); margin: 0 auto; }
          
          .nav-btn { 
            position: fixed; top: max(16px, env(safe-area-inset-top)); right: max(16px, env(safe-area-inset-right));
            background: none; border: none; cursor: pointer; z-index: 110; transition: filter .2s ease;
          }
          .nav-btn:hover { filter: drop-shadow(0 0 8px white); }
          
          .logo-container { 
            position: relative; top: 40px; text-align: center;
            margin-bottom: 40px; z-index: 10;
          }
          .logo { pointer-events: none; }

          .blog-content { padding: 140px 0 80px; position: relative; z-index: 10; }
          
          .blog-header { text-align: center; margin-bottom: 60px; }
          .blog-header h1 { font-size: var(--fs-h1); margin-bottom: 16px; }
          .blog-header p { max-width: 60ch; margin: 0 auto; opacity: 0.9; }

          .categories { 
            display: flex; gap: 8px; margin-bottom: 40px; justify-content: center; flex-wrap: wrap;
          }
          .category-btn { 
            padding: 8px 16px; border: 1px solid var(--border); background: transparent; color: var(--text);
            border-radius: 20px; cursor: pointer; transition: all 0.2s; font-size: 14px;
          }
          .category-btn:hover, .category-btn.active { 
            background: var(--accent); border-color: var(--accent); color: white; 
          }
          .category-btn:focus-visible {
            outline: 2px solid var(--accent); outline-offset: 2px;
          }

          .posts-grid { 
            display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px; margin-bottom: 60px;
          }

          .post-card { 
            background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px;
            overflow: hidden; transition: all 0.3s ease;
          }
          .post-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-glow-sm); }

          .post-image { position: relative; aspect-ratio: 16/9; overflow: hidden; }
          .post-img { width: 100%; height: 100%; object-fit: cover; }
          .category-tag { 
            position: absolute; top: 12px; left: 12px; background: var(--accent); color: white;
            padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;
          }

          .post-content { padding: 24px; }
          .post-content h2 { margin: 0 0 8px; font-size: 18px; line-height: 1.3; }
          .post-meta { 
            display: flex; align-items: center; gap: 8px; margin-bottom: 12px;
            font-size: 13px; color: rgba(255,255,255,0.7);
          }
          .post-content p { margin: 0 0 16px; opacity: 0.9; line-height: 1.5; }
          
          .post-footer { display: flex; justify-content: space-between; align-items: center; }
          .read-more { 
            color: var(--accent); text-decoration: none; font-weight: 600; font-size: 14px;
            transition: color 0.2s;
          }
          .read-more:hover { color: var(--accent-600); }
          .read-more:focus-visible {
            outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px;
          }

          .linkedin-cta { 
            text-align: center; background: var(--bg-soft); border-radius: 16px; padding: 40px;
            border: 1px solid var(--border);
          }
          .cta-content h2 { margin: 0 0 12px; color: var(--accent); }
          .cta-content p { margin: 0 0 24px; opacity: 0.9; }
          .linkedin-btn { 
            display: inline-block; background: #0077b5; color: white; padding: 12px 24px;
            border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.2s;
          }
          .linkedin-btn:hover { background: #005582; transform: translateY(-2px); }
          .linkedin-btn:focus-visible {
            outline: 2px solid #0077b5; outline-offset: 2px;
          }

          .footer { 
            background: rgba(0,0,0,0.3); backdrop-filter: blur(8px); padding: 20px 0;
            border-top: 1px solid var(--border); text-align: center;
          }
          .footer-content { display: flex; flex-direction: column; gap: 10px; align-items: center; }
          address { font-style: normal; margin-bottom: 10px; }

          @media (max-width: 768px) {
            .posts-grid { grid-template-columns: 1fr; gap: 20px; }
            .categories { gap: 6px; }
            .category-btn { padding: 6px 12px; font-size: 13px; }
            .blog-content { padding: 120px 0 60px; }
          }
        `}</style>
      </div>
    </>
  );
}