// components/tech_innovation.tsx - Version améliorée
import { motion } from "framer-motion";
import styles from "../styles/tech.module.css";

interface TechInnovationProps {
  lang: "fr" | "en";
}

export default function TechInnovation({ lang }: TechInnovationProps) {
  const techData = {
    fr: {
      title: "Technologies de Pointe",
      subtitle: "L'écosystème Maverick intègre les dernières avancées en IA et robotique pour une autonomie totale",
      cards: [
        {
          icon: "🤖",
          title: "Autonomie Complète",
          desc: "Déploiement automatique en moins de 30 secondes, coordination intelligente d'essaims jusqu'à 8 drones simultanés.",
          specs: ["45-60 min autonomie", "Portée 10 km", "Homologué DGAC"]
        },
        {
          icon: "🧠",
          title: "IA Embarquée",
          desc: "Traitement temps réel des données, détection automatique d'intrusions, reconnaissance de formes et comportements suspects.",
          specs: ["Vision 4K/thermique", "Détection 300m nuit", "Chiffrement AES-256"]
        },
        {
          icon: "📡",
          title: "Station Ruche",
          desc: "Infrastructure automatisée gérant recharge, maintenance, et coordination. Intégration native avec systèmes de sécurité existants.",
          specs: ["4-8 drones simultanés", "Recharge 35 min", "APIs ouvertes"]
        }
      ],
      cta: {
        title: "Documentation technique complète",
        desc: "Accédez aux spécifications détaillées et guides d'intégration",
        button: "Demander la documentation"
      }
    },
    en: {
      title: "Cutting-Edge Technologies",
      subtitle: "The Maverick ecosystem integrates the latest advances in AI and robotics for total autonomy",
      cards: [
        {
          icon: "🤖",
          title: "Complete Autonomy",
          desc: "Automatic deployment in under 30 seconds, intelligent swarm coordination up to 8 simultaneous drones.",
          specs: ["45-60 min autonomy", "10 km range", "DGAC certified"]
        },
        {
          icon: "🧠",
          title: "Embedded AI",
          desc: "Real-time data processing, automatic intrusion detection, recognition of suspicious shapes and behaviors.",
          specs: ["4K/thermal vision", "300m night detection", "AES-256 encryption"]
        },
        {
          icon: "📡",
          title: "Hive Station",
          desc: "Automated infrastructure managing charging, maintenance, and coordination. Native integration with existing security systems.",
          specs: ["4-8 simultaneous drones", "35 min charging", "Open APIs"]
        }
      ],
      cta: {
        title: "Complete technical documentation",
        desc: "Access detailed specifications and integration guides",
        button: "Request documentation"
      }
    }
  };

  const data = techData[lang];

  return (
    <section className={styles.techSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.sectionBadge}>Innovation</span>
          <h2 className={styles.sectionTitle}>{data.title}</h2>
          <p className={styles.sectionSubtitle}>{data.subtitle}</p>
        </motion.div>

        <div className={styles.techGrid}>
          {data.cards.map((card, idx) => (
            <motion.div
              key={idx}
              className={styles.techCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <div className={styles.techIcon}>{card.icon}</div>
              <h3 className={styles.techTitle}>{card.title}</h3>
              <p className={styles.techDesc}>{card.desc}</p>
              <ul className={styles.techSpecs}>
                {card.specs.map((spec, i) => (
                  <li key={i} className={styles.specItem}>
                    <span className={styles.specDot}></span>
                    {spec}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={styles.techCta}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className={styles.ctaContent}>
            <h3>{data.cta.title}</h3>
            <p>{data.cta.desc}</p>
            <a href="/contact/" className={styles.ctaButton}>
              {data.cta.button}
              <svg className={styles.ctaIcon} viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}