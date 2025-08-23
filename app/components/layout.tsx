// components/layout.tsx - Version corrigée
"use client";
import { useState, ReactNode } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "./navbar";
import LanguageSwitcher from "./language_switcher";
import CustomCursor from "./custom_cursor";
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
  showLogo?: boolean;
  showNavButton?: boolean; // Nouveau prop pour contrôler le bouton
  logoSize?: "small" | "medium" | "large";
}

export default function Layout({ 
  children, 
  lang, 
  setLang, 
  className = "", 
  showLogo = true,
  showNavButton = true, // Par défaut true pour les autres pages
  logoSize = "medium"
}: LayoutProps) {
  const [showNav, setShowNav] = useState(false);
  
  const logoSizes = {
    small: { width: 80, height: 40 },
    medium: { width: 120, height: 60 },
    large: { width: 160, height: 80 }
  };

  return (
    <div className={`${styles.pageLayout} ${className}`} data-lang={lang}>
      {/* Background conditionnel */}
      {<Background />}
      
      <CustomCursor />
      <Navbar showNav={showNav} setShowNav={setShowNav} lang={lang} />
      <LanguageSwitcher lang={lang} setLang={setLang} />

      {/* Bouton de navigation optionnel - pour les pages autres que homepage */}
      {showNavButton && (
        <button      
          className={styles.navBtn}
          aria-label="Menu navigation"
          onClick={() => setShowNav(prev => !prev)}
        >
          <Image 
            src="/button.png"
            alt=""
            width={32}
            height={32}
            priority
            sizes="32px"
          />
        </button>
      )}

      {/* Logo optionnel */}
      {showLogo && (
        <div className={styles.logoContainer}>
          <Image
            src="/logo.png"
            alt="Safe Valley SVE - Drones autonomes de surveillance"
            className={styles.logo}
            width={logoSizes[logoSize].width}
            height={logoSizes[logoSize].height}
            priority
            sizes={`${logoSizes[logoSize].width}px`}
          />
        </div>
      )}

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