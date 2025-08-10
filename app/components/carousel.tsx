"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  { id: 1, image: "/slides/1.png", title: "Smart Agriculture" },
  { id: 2, image: "/slides/2.png", title: "Industrial Inspection" },
  { id: 3, image: "/slides/3.png", title: "Military & Defense" },
];

export default function Carousel({ lang }: { lang: "fr" | "en" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  // indices for background slides
  const prevIndex = (index - 1 + slides.length) % slides.length;
  const nextIndex = (index + 1) % slides.length;

  return (
    <div>
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <button className="nav left" onClick={prev}>‹</button>

          <div className="carousel-window">
            {/* blurred background slides with depth */}
            <div className="bg-slides">
              <img
                src={slides[prevIndex].image}
                alt="prev background"
                className="bg-img prev"
              />
              <img
                src={slides[nextIndex].image}
                alt="next background"
                className="bg-img next"
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={slides[index].id}
                className="carousel-slide"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8 }}
              >
                <img src={slides[index].image} alt="slide" />
                <div className="caption">
                  <h3>
                    {lang === "fr"
                      ? slides[index].titleFr
                      : slides[index].titleEn}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="nav right" onClick={next}>›</button>
        </div>
      </div>

      <style jsx>{`
        .carousel-container {
          width: 90%;
          max-width: 1000px;
          margin: 60px auto;
        }

        .carousel-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 80px;
        }

        .carousel-window {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%;
          overflow: visible;
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        /* background blurred images with depth perspective */
        .bg-slides {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .bg-img {
          position: absolute;
          top: 50%;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: blur(5px) brightness(1);
          opacity: 0.5;
          transform-origin: center center;
          transition: transform 0.5s ease;
        }

        .bg-img.prev {
          transform: translate3d(-100%, -50%, -200px) scale(0.8);
        }

        .bg-img.next {
          transform: translate3d(100%, -50%, -200px) scale(0.8);
        }

        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          backface-visibility: hidden;
        }

        .carousel-slide img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }

        .caption {
          position: absolute;
          bottom: 20px;
          left: 30px;
          color: white;
          mix-blend-mode: difference;
        }

        .caption h3 {
          font-size: 2rem;
          margin: 0;
        }

        .nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.3);
          border: none;
          color: white;
          font-size: 2.5rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 5;
        }

        .nav.left {
          left: -60px;
        }

        .nav.right {
          right: -60px;
        }

        .nav:hover {
          background: rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </div>
  );
}
