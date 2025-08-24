// components/layout.tsx - Version avec Language Switcher en CSS pur
"use client";
import { useState, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import CustomCursor from "./custom_cursor";
import { navContent } from "../data/nav_content";
import styles from "../styles/layout.module.css";

// Lazy load Background uniquement pour homepage
const Background = dynamic(() => import("./background"), {
  ssr: false,
  loading: () => null
});

interface LayoutProps {
  children: ReactNode;
  lang: "fr" | "en";
  setLang: (lang: string) => void;
  className?: string;
  currentPage?: string;
}

export default function Layout({ 
  children, 
  lang, 
  setLang, 
  className = "", 
  currentPage = "/"
}: LayoutProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className={`${styles.pageLayout} ${className}`} data-lang={lang}>
      {/* Background */}
      <Background />
      
      <CustomCursor />
      
      {/* Header toujours affiché */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          {/* Language Switcher en CSS pur à gauche */}
          <div className={styles.headerLeft}>
            <div className={styles.languageSwitcher}>
              <input 
                type="radio" 
                id="lang-fr" 
                name="language" 
                className={styles.langInput}
                checked={lang === "fr"}
                onChange={() => setLang("fr")}
              />
              <label htmlFor="lang-fr" className={styles.langLabel}>
                <span className={styles.langFlag}>🇫🇷</span>
                <span className={styles.langCode}>FR</span>
              </label>
              
              <input 
                type="radio" 
                id="lang-en" 
                name="language" 
                className={styles.langInput}
                checked={lang === "en"}
                onChange={() => setLang("en")}
              />
              <label htmlFor="lang-en" className={styles.langLabel}>
                <span className={styles.langFlag}>🇬🇧</span>
                <span className={styles.langCode}>EN</span>
              </label>
              
              <div className={styles.langSlider} data-lang={lang} />
            </div>
          </div>

          {/* Logo centré */}
          <div className={styles.headerCenter}>
            <Link href="/" className={styles.logoLink}>
              <Image
                src="/logo.png"
                alt="Safe Valley SVE"
                width={160}
                height={80}
                priority
                className={styles.headerLogo}
              />
            </Link>
          </div>

          {/* Navigation à droite */}
          <div className={styles.headerRight}>
            {/* Navigation desktop */}
            <nav className={styles.desktopNav}>
              {navContent.links.map((link) => (
                <Link
                  key={link.id}
                  href={link.id}
                  className={`${styles.navLink} ${link.id === "/contact" ? styles.navLinkContact : ""}`}
                  data-active={currentPage === link.id ? "true" : "false"}
                >
                  {lang === "fr" ? link.labelFr : link.labelEn}
                </Link>
              ))}
            </nav>

            {/* Bouton menu mobile */}
            <button
              className={styles.mobileMenuBtn}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Menu mobile"
            >
              <span className={`${styles.menuLine} ${showMobileMenu ? styles.menuLine1Active : ""}`} />
              <span className={`${styles.menuLine} ${showMobileMenu ? styles.menuLine2Active : ""}`} />
              <span className={`${styles.menuLine} ${showMobileMenu ? styles.menuLine3Active : ""}`} />
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {showMobileMenu && (
          <>
            {/* Overlay */}
            <div 
              className={styles.mobileMenuOverlay}
              onClick={() => setShowMobileMenu(false)}
              style={{ opacity: 1, visibility: 'visible' }}
            />
            
            {/* Menu panel */}
            <div className={`${styles.mobileMenu} ${styles.mobileMenuActive}`}>
              <nav className={styles.mobileNav}>
                {navContent.links.map((link) => (
                  <Link
                    key={link.id}
                    href={link.id}
                    className={`${styles.mobileNavLink} ${
                      currentPage === link.id ? styles.mobileNavLinkActive : ""
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {lang === "fr" ? link.labelFr : link.labelEn}
                  </Link>
                ))}
              </nav>
            </div>
          </>
        )}
      </header>

      <main className={styles.mainContent}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.footerContent} ${styles.container}`}>
          <address className={styles.address}>
            345 Rte de Carpentras<br />
            84570 Villes-sur-Auzon, France
          </address>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Safe Valley - SVE | {" "} 
            {lang === "fr" ? "Tous droits réservés" : "All Rights Reserved"}
          </p>
        </div>
      </footer>
    </div>
  );
}