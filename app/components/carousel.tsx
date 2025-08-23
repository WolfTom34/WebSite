// components/carousel.tsx - Version améliorée avec préchargement
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "../styles/carousel.module.css";

const slides = [
  { 
    id: 1, 
    image: "/slides/1.png", 
    title: "Agriculture Intelligente",
    titleEn: "Smart Agriculture",
    desc: "Surveillance des cultures et détection précoce",
    descEn: "Crop monitoring and early detection"
  },
  { 
    id: 2, 
    image: "/slides/2.png", 
    title: "Inspection Industrielle",
    titleEn: "Industrial Inspection",
    desc: "Maintenance prédictive des infrastructures",
    descEn: "Predictive infrastructure maintenance"
  },
  { 
    id: 3, 
    image: "/slides/3.png", 
    title: "Défense & Sécurité",
    titleEn: "Defense & Security",
    desc: "Protection périmétrique avancée",
    descEn: "Advanced perimeter protection"
  },
];

export default function Carousel({ lang }: { lang: "fr" | "en" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((i) => (i + 1) % slides.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Indices pour les slides d'arrière-plan
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  const nextIndex = (currentIndex + 1) % slides.length;

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselWindow}>
          {/* Images floues en arrière-plan avec profondeur */}
          <div className={styles.bgSlides}>
            <img
              src={slides[prevIndex].image}
              alt="prev background"
              className={`${styles.bgImg} ${styles.bgPrev}`}
            />
            <img
              src={slides[nextIndex].image}
              alt="next background"
              className={`${styles.bgImg} ${styles.bgNext}`}
            />
          </div>

          {/* Slide principal animé */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className={styles.slideMain}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <img 
                src={slides[currentIndex].image} 
                alt={lang === "fr" ? slides[currentIndex].title : slides[currentIndex].titleEn}
                className={styles.mainImage}
              />
              <div className={styles.slideInfo}>
                <motion.span 
                  className={styles.slideNumber}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  0{currentIndex + 1} / 0{slides.length}
                </motion.span>
                <motion.h3 
                  className={styles.slideTitle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {lang === "fr" ? slides[currentIndex].title : slides[currentIndex].titleEn}
                </motion.h3>
                <motion.p 
                  className={styles.slideDesc}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {lang === "fr" ? slides[currentIndex].desc : slides[currentIndex].descEn}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <button 
          className={`${styles.navButton} ${styles.navPrev}`}
          onClick={handlePrev}
          aria-label="Slide précédent"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button 
          className={`${styles.navButton} ${styles.navNext}`}
          onClick={handleNext}
          aria-label="Slide suivant"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Dots indicator */}
        <div className={styles.dotsContainer}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className={styles.progressBar}>
          <motion.div 
            className={styles.progressFill}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            key={currentIndex}
          />
        </div>
      </div>
    </div>
  );
}