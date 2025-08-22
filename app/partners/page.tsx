"use client";
import { useLanguage } from "../hooks/useLanguage";
import Image from "next/image";
import partners from "../data/partners.json";
import Layout from "../components/layout";
import SEOHead from "../components/seo_head";
import { partnersSEO, generatePartnersSchema } from "../data/seo";
import styles from "../styles/partners.module.css";

export default function PartnersPage() {
  const { lang, setLang } = useLanguage();
  const currentSEO = partnersSEO[lang];
  const structuredData = generatePartnersSchema(partners, lang);

  return (
    <>
      <SEOHead seoData={currentSEO} lang={lang} structuredData={structuredData} />
      <Layout lang={lang} setLang={setLang} className="partners">
        <main className={styles.partnersContent}>
          <div className="container">
            <header>
              <h1 className={styles.title}>{currentSEO.h1}</h1>
              <p className={styles.lead}>
                {lang === "fr"
                  ? "Safe Valley s'associe avec les leaders technologiques pour vous offrir des solutions complètes et innovantes"
                  : "Safe Valley partners with technology leaders to offer you complete and innovative solutions"
                }
              </p>
            </header>
            <section className={styles.grid} aria-label={lang === "fr" ? "Liste des partenaires" : "Partners list"}>
              {partners.map((partner: any, index: number) => (
                <article className={`card ${styles.partner}`} key={partner?.name ?? index}>
                  <div className={styles.logoBox}>
                    <Image
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      className={styles.partnerLogo}
                      width={140}
                      height={140}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.info}>
                    <h2 className={styles.name}>{partner.name}</h2>
                    <p className={styles.desc}>{lang === "fr" ? partner.descriptionFr : partner.descriptionEn}</p>
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className={`${styles.btnLink} focusable`}
                      aria-label={lang === "fr" ? `Visiter le site de ${partner.name}` : `Visit ${partner.name} website`}
                    >
                      {lang === "fr" ? "Visiter" : "Visit"}
                    </a>
                  </div>
                </article>
              ))}
            </section>
          </div>
        </main>
      </Layout>
    </>
  );
}