"use client";
import { navContent } from "../data/nav_content";
import Link from "next/link";

interface Props {
  showNav: boolean;
  setShowNav: (val: boolean) => void;
  lang: "fr" | "en"; // pour la langue
}

export default function Navbar({ showNav, setShowNav, lang }: Props) {
  return (
    <>
      {/* Overlay sombre */}
      <div
        onClick={() => setShowNav(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.35)",
          opacity: showNav ? 1 : 0,
          pointerEvents: showNav ? "auto" : "none",
          transition: "opacity 0.4s ease",
          zIndex: 20,
        }}
      />

      {/* Fenêtre latérale */}
      <div
        style={{
          position: "fixed",
          top: "80px",
          right: showNav ? "40px" : "-260px",
          width: "220px",
          background: "rgba(15, 15, 18, 0.65)",
          borderRadius: "14px",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: `
            0 0 18px rgba(255,255,255,0.15),
            0 8px 28px rgba(0,0,0,0.6)
          `,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "25px 15px",
          gap: "16px",
          transition:
            "right 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease",
          opacity: showNav ? 1 : 0,
          animation: showNav ? "glowPulse 3s ease-in-out infinite" : "none",
          zIndex: 25,
        }}
      >
        {/* Logo */}
        <img
          src="/logo.png"
          style={{
            width: "65px",
            marginBottom: "8px",
            cursor: "pointer",
          }}
          onClick={() => setShowNav(false)}
        />

        {/* Liens */}
        {navContent.links.map((link, i) => (
          <Link
            key={link.id}
            href={link.id}
            onClick={() => setShowNav(false)}
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
              letterSpacing: "0.5px",
              opacity: showNav ? 1 : 0,
              transform: showNav ? "translateY(0)" : "translateY(10px)",
              transition: `all 0.4s ease ${i * 0.06 + 0.2}s`,
            }}
          >
            {lang === "fr" ? link.labelFr : link.labelEn}
          </Link>
        ))}
      </div>

      {/* CSS animation du halo */}
      <style>{`
        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 12px rgba(255,255,255,0.08),
                        0 8px 24px rgba(0,0,0,0.5);
          }
          50% {
            box-shadow: 0 0 22px rgba(255,255,255,0.22),
                        0 8px 28px rgba(0,0,0,0.6);
          }
          100% {
            box-shadow: 0 0 12px rgba(255,255,255,0.08),
                        0 8px 24px rgba(0,0,0,0.5);
          }
        }
      `}</style>
    </>
  );
}