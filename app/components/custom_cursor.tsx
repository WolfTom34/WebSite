"use client";
import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const targetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    // Suivi de la souris
    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Magnétisme : détecte si on est au-dessus d'un élément interactif
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, img, video")) {
        setHovering(true);

        // Magnétisme : attirer vers l'élément
        const rect = target.getBoundingClientRect();
        targetRef.current.x = rect.left + rect.width / 2;
        targetRef.current.y = rect.top + rect.height / 2;
      } else {
        setHovering(false);
        targetRef.current.x = mouseX;
        targetRef.current.y = mouseY;
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Animation fluide avec requestAnimationFrame
    const animate = () => {
      if (cursorRef.current) {
        const dx = (targetRef.current.x || mouseX) - mouseX;
        const dy = (targetRef.current.y || mouseY) - mouseY;

        // Si hover, attirer légèrement vers le centre de l'élément
        const finalX = hovering ? mouseX + dx * 0.3 : mouseX;
        const finalY = hovering ? mouseY + dy * 0.3 : mouseY;

        cursorRef.current.style.transform = `translate(${finalX - (hovering ? 25 : 12)}px, ${
          finalY - (hovering ? 25 : 12)
        }px)`;
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [hovering]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: hovering ? "50px" : "24px",
        height: hovering ? "50px" : "24px",
        borderRadius: "50%",
        background: hovering
          ? "rgba(255,255,255,0.12)"
          : "rgba(255,255,255,0.06)",
        boxShadow: hovering
          ? "0 0 28px rgba(255,255,255,0.5)"
          : "0 0 12px rgba(255,255,255,0.25)",
        transition: "all 0.3s ease-out",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    />
  );
}