"use client";
import { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "./navbar";
import LanguageSwitcher from "./language_switcher";
import CustomCursor from "./custom_cursor";

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
  logoSize?: "small" | "medium" | "large";
}

export default function Layout({ 
  children, 
  lang, 
  setLang, 
  className = "", 
  showLogo = true,
  logoSize = "medium"
}: LayoutProps) {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();
  
  // Charger Background Three.js uniquement sur homepage
  const isHomepage = pathname === "/" || pathname === "/en";
  
  const logoSizes = {
    small: { width: 80, height: 40 },
    medium: { width: 120, height: 60 },
    large: { width: 160, height: 80 }
  };

  return (
    <div className={`page-layout ${className}`} data-lang={lang}>
      {/* Background conditionnel */}
      <Background 
        enableThreeJS={isHomepage} 
        forceDisable={!isHomepage}
      />
      
      <CustomCursor />
      <Navbar showNav={showNav} setShowNav={setShowNav} lang={lang} />
      <LanguageSwitcher lang={lang} setLang={setLang} />

      <button      
        className="nav-btn focusable"
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

      {showLogo && (
        <div className="logo-container">
          <Image
            src="/logo.png"
            alt="Safe Valley SVE - Drones autonomes de surveillance"
            className="logo"
            width={logoSizes[logoSize].width}
            height={logoSizes[logoSize].height}
            priority
            sizes={`${logoSizes[logoSize].width}px`}
          />
        </div>
      )}

      <main className="main-content">
        {children}
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
    </div>
  );
}