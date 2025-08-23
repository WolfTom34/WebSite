import { motion } from "framer-motion";
import content_fr from "../data/content_fr";
import content_en from "../data/content_en";
import styles from "../styles/solution.module.css";

export default function Section({ lang }: { lang: "fr" | "en" }) {
  const content = lang === "fr" ? content_fr : content_en;
  const sections = [content.section1, content.section2, content.section3];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.sectionGrid}>
        {sections.map((sec, i) => (
          <motion.article
            key={i}
            className={styles.serviceCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className={styles.cardIcon}>
              {i === 0 && "🛡️"}
              {i === 1 && "🔍"}
              {i === 2 && "⚡"}
            </div>
            <h3 className={styles.cardTitle}>{sec.title}</h3>
            <div className={styles.cardContent}>
              {sec.text.split("\n").map((line, idx) => (
                <p key={idx} className={styles.cardText}>{line}</p>
              ))}
            </div>
            <div className={styles.cardFooter}>
              <a href="/contact/" className={styles.cardLink}>
                <span>{lang === "fr" ? "En savoir plus" : "Learn more"}</span>
                <svg className={styles.linkIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                </svg>
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}