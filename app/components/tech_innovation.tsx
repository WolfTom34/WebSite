// components/tech_innovation.tsx
interface TechInnovationProps {
  lang: "fr" | "en";
}

export default function TechInnovation({ lang }: TechInnovationProps) {
  return (
    <section className="tech-innovation">
      <div className="container">
        <header className="tech-header">
          <h2>
            {lang === "fr" ? "Innovation technologique" : "Technological innovation"}
          </h2>
          <p>
            {lang === "fr" 
              ? "L'écosystème Maverick intègre les dernières avancées en intelligence artificielle et robotique pour une autonomie totale."
              : "The Maverick ecosystem integrates the latest advances in artificial intelligence and robotics for total autonomy."
            }
          </p>
        </header>

        <div className="tech-grid">
          <div className="tech-card">
            <h3>
              {lang === "fr" ? "Autonomie Complète" : "Complete Autonomy"}
            </h3>
            <p>
              {lang === "fr" 
                ? "Déploiement automatique en moins de 30 secondes, coordination intelligente d'essaims jusqu'à 8 drones simultanés."
                : "Automatic deployment in under 30 seconds, intelligent swarm coordination up to 8 simultaneous drones."
              }
            </p>
            <div className="tech-specs">
              <span>• {lang === "fr" ? "45-60 min autonomie" : "45-60 min autonomy"}</span>
              <span>• {lang === "fr" ? "Portée 10 km" : "10 km range"}</span>
              <span>• {lang === "fr" ? "Homologué DGAC" : "DGAC certified"}</span>
            </div>
          </div>

          <div className="tech-card">
            <h3>
              {lang === "fr" ? "IA Embarquée" : "Embedded AI"}
            </h3>
            <p>
              {lang === "fr" 
                ? "Traitement temps réel des données, détection automatique d'intrusions, reconnaissance de formes et comportements suspects."
                : "Real-time data processing, automatic intrusion detection, recognition of suspicious shapes and behaviors."
              }
            </p>
            <div className="tech-specs">
              <span>• {lang === "fr" ? "Vision 4K/thermique" : "4K/thermal vision"}</span>
              <span>• {lang === "fr" ? "Détection 300m nuit" : "300m night detection"}</span>
              <span>• {lang === "fr" ? "Chiffrement AES-256" : "AES-256 encryption"}</span>
            </div>
          </div>

          <div className="tech-card">
            <h3>
              {lang === "fr" ? "Station Ruche" : "Hive Station"}
            </h3>
            <p>
              {lang === "fr" 
                ? "Infrastructure automatisée gérant recharge, maintenance, et coordination. Intégration native avec systèmes de sécurité existants."
                : "Automated infrastructure managing charging, maintenance, and coordination. Native integration with existing security systems."
              }
            </p>
            <div className="tech-specs">
              <span>• {lang === "fr" ? "4-8 drones simultanés" : "4-8 simultaneous drones"}</span>
              <span>• {lang === "fr" ? "Recharge 35 min" : "35 min charging"}</span>
              <span>• {lang === "fr" ? "APIs ouvertes" : "Open APIs"}</span>
            </div>
          </div>
        </div>

        <div className="tech-cta">
          <div className="tech-cta-content">
            <h3>
              {lang === "fr" ? "Documentation technique complète" : "Complete technical documentation"}
            </h3>
            <p>
              {lang === "fr" 
                ? "Accédez aux spécifications détaillées, études de cas et guides d'intégration sous accord de confidentialité."
                : "Access detailed specifications, case studies and integration guides under confidentiality agreement."
              }
            </p>
            <a href="/contact/" className="tech-cta-button">
              {lang === "fr" ? "Demander la documentation" : "Request documentation"}
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tech-innovation {
          padding: 80px 0;
          background: var(--bg-card);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .tech-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .tech-header h2 {
          font-size: var(--fs-h2);
          margin-bottom: 16px;
          font-weight: 600;
        }

        .tech-header p {
          max-width: 60ch;
          margin: 0 auto;
          opacity: 0.9;
          font-size: var(--fs-body);
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
        }

        .tech-card {
          background: var(--bg-soft);
          border: 1px solid var(--border-soft);
          border-radius: 16px;
          padding: 30px;
          transition: all 0.3s ease;
          border-top: 3px solid var(--accent);
        }

        .tech-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: var(--shadow-glow-sm);
        }

        .tech-card h3 {
          font-size: 20px;
          margin-bottom: 12px;
          color: var(--accent);
          font-weight: 600;
        }

        .tech-card p {
          margin-bottom: 20px;
          line-height: 1.6;
          opacity: 0.9;
        }

        .tech-specs {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tech-specs span {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          padding-left: 8px;
          position: relative;
        }

        .tech-specs span::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          width: 4px;
          height: 4px;
          background: var(--accent);
          border-radius: 50%;
          transform: translateY(-50%);
        }

        .tech-cta {
          text-align: center;
        }

        .tech-cta-content {
          background: var(--bg-soft);
          border: 2px solid var(--border);
          border-radius: 16px;
          padding: 30px;
          max-width: 500px;
          margin: 0 auto;
          border-top: 3px solid var(--accent);
        }

        .tech-cta-content h3 {
          margin: 0 0 12px;
          font-size: 20px;
          color: var(--accent);
        }

        .tech-cta-content p {
          margin: 0 0 20px;
          opacity: 0.9;
          font-size: 14px;
        }

        .tech-cta-button {
          display: inline-block;
          background: transparent;
          color: var(--accent);
          border: 2px solid var(--accent);
          padding: 12px 24px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .tech-cta-button:hover {
          background: var(--accent);
          color: white;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .tech-innovation {
            padding: 60px 0;
          }

          .tech-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .tech-card {
            padding: 24px;
          }
        }

        @media (max-width: 480px) {
          .tech-innovation {
            padding: 40px 0;
          }
        }
      `}</style>
    </section>
  );
}