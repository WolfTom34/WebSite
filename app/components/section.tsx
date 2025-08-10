import { motion } from "framer-motion";
import content_fr from "../data/content_fr";
import content_en from "../data/content_en";

export default function Section({ lang }: { lang: "fr" | "en" }) {
  const content = lang === "fr" ? content_fr : content_en;
  const sections = [content.section1, content.section2, content.section3];

  return (
    <section className="section-wrapper">
      {sections.map((sec, i) => (
        <motion.div
          key={i}
          className={`section-block ${i % 2 === 0 ? "left" : "right"}`}
          initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-box">
            <h2>{sec.title}</h2>
            {sec.text.split("\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
          {i < sections.length - 1 && <BreathingLine reverse={i % 2 !== 0} />}
        </motion.div>
      ))}

      <style jsx>{`
        .section-wrapper {
          width: 100%;
          padding: 100px 20px;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 80px;
        }

        .section-block {
          width: 100%;
          max-width: 1000px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .text-box {
          max-width: 800px;
          width: 100%;
          text-align: center;
        }

        .text-box h2 {
          font-size: 2.4rem;
          margin-bottom: 16px;
        }

        .text-box p {
          font-size: 1.2rem;
          line-height: 1.7;
          margin-bottom: 12px;
        }
      `}</style>
    </section>
  );
}

function BreathingLine({ reverse }: { reverse?: boolean }) {
  return (
    <div className={`breathing-line ${reverse ? "reverse" : ""}`}>
      <motion.div
        animate={{ scaleY: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="glow"
      />

      <style jsx>{`
        .breathing-line {
          width: 100%;
          max-width: 900px;
          height: 4px;
          margin: 40px 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.1)
          );
          border-radius: 6px;
          position: relative;
          overflow: hidden;
          transform: skewY(-4deg);
        }

        .breathing-line.reverse {
          transform: skewY(4deg);
        }

        .glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, white, transparent);
          filter: blur(8px);
          opacity: 0.8;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
}