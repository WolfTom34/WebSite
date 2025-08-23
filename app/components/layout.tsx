// components/layout.tsx - Version avec Header permanent
"use client";
import { useState, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import CustomCursor from "./custom_cursor";
import LanguageSwitcher from "./language_switcher";
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
          {/* Sélecteur de langue à gauche - on utilise le composant existant */}
          <div className={styles.headerLeft}>
            <LanguageSwitcher lang={lang} setLang={setLang} />
          </div>

          {/* Logo centré */}
          <div className={styles.headerCenter}>
            <Link href="/" className={styles.logoLink}>
              <Image
                src="/logo.png"
                alt="Safe Valley SVE"
                width={120}
                height={60}
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
                  className={`${styles.navLink} ${
                    currentPage === link.id ? styles.navLinkActive : ""
                  } ${link.id === "/contact" ? styles.navLinkContact : ""}`}
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
        <div className={`${styles.mobileMenu} ${showMobileMenu ? styles.mobileMenuActive : ""}`}>
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
            {lang === "fr" ? "Tous droits réservés." : "All Rights Reserved."}
          </p>
        </div>
      </footer>
    </div>
  );
}