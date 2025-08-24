"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import Image from "next/image";
import Layout from "../components/layout";
import SEOHead from "../components/seo_head";
import { contactSEO, generateContactSchema } from "../data/seo";
import styles from "../styles/contact.module.css";

export default function ContactPage() {
  const { lang, setLang } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const currentSEO = contactSEO[lang];
  const structuredData = generateContactSchema(lang);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = formRef.current;
    if (!form) return;

    // Vérification des champs obligatoires
    const newErrors: { [key: string]: boolean } = {};
    const requiredFields = ["name", "email", "message"];

    requiredFields.forEach((field) => {
      const input = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement;
      if (!input?.value.trim()) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return; // On bloque l'envoi
    }

    setErrors({}); // aucune erreur → on continue

    try {
      const emailjsConfig = {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      };

      if (!(window as any).emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = () => {
          (window as any).emailjs.init(emailjsConfig.publicKey);
          sendEmail();
        };
        document.head.appendChild(script);
      } else {
        sendEmail();
      }

      async function sendEmail() {
        const emailjs = (window as any).emailjs;
        const result = await emailjs.sendForm(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          formRef.current,
          emailjsConfig.publicKey
        );

        if (result.status === 200) {
          setSubmitStatus('success');
          formRef.current?.reset();
        } else {
          setSubmitStatus('error');
        }
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead seoData={currentSEO} lang={lang} structuredData={structuredData} />
      <Layout lang={lang} setLang={setLang} currentPage="/contact">
        {/* Hero Section avec formulaire */}
        <section className={styles.contactHero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroGradient} />
            <div className={styles.heroPattern} />
          </div>

          <div className={styles.contactWrapper}>
            {/* Colonne gauche : Formulaire */}
            <motion.div 
              className={styles.formSection}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.contactBox}>
                <header>
                  <h1 className={styles.title}>{currentSEO.h1}</h1>
                  <p className={styles.subtitle}>
                    {lang === "fr" 
                      ? "Obtenez un devis personnalisé pour vos besoins en surveillance et sécurité"
                      : "Get a personalized quote for your surveillance and security needs"}
                  </p>
                </header>

                {submitStatus === 'success' && (
                  <motion.div 
                    className={styles.successMessage} 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.3 }}
                  >
                    <h2>{lang === "fr" ? "Message envoyé avec succès !" : "Message sent successfully!"}</h2>
                    <p>{lang === "fr" ? "Nous vous recontacterons dans les plus brefs délais." : "We will contact you as soon as possible."}</p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div 
                    className={styles.errorMessage} 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.3 }}
                  >
                    <h2>{lang === "fr" ? "Erreur lors de l'envoi" : "Error sending message"}</h2>
                    <p>{lang === "fr" ? "Veuillez réessayer ou nous contacter directement." : "Please try again or contact us directly."}</p>
                  </motion.div>
                )}

                <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.inputGroup}>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder={lang === "fr" ? "Nom complet" : "Full name"} 
                      className={`${styles.input} ${errors.message ? styles.inputError : ""}`}   
                      required 
                      disabled={isSubmitting} 
                      aria-label={lang === "fr" ? "Nom complet" : "Full name"} 
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Email" 
                      className={`${styles.input} ${errors.message ? styles.inputError : ""}`}
                      required 
                      disabled={isSubmitting} 
                      aria-label="Email" 
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder={lang === "fr" ? "Téléphone" : "Phone"} 
                      className={`${styles.input} ${errors.message ? styles.inputError : ""}`}
                      disabled={isSubmitting} 
                      aria-label={lang === "fr" ? "Téléphone" : "Phone"} 
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <textarea 
                      name="message" 
                      placeholder={lang === "fr" 
                        ? "Décrivez votre projet (type de site, superficie, besoins spécifiques)" 
                        : "Describe your project (site type, area, specific needs)"} 
                      className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                      required 
                      disabled={isSubmitting} 
                      aria-label={lang === "fr" ? "Description du projet" : "Project description"} 
                    />
                  </div>

                  <input type="hidden" name="website_source" value="safevalleysve.com" />
                  <input type="hidden" name="contact_date" value={new Date().toLocaleString('fr-FR')} />
                  <input type="hidden" name="language" value={lang} />
                  
                  <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting 
                      ? (lang === "fr" ? "Envoi en cours..." : "Sending...") 
                      : (lang === "fr" ? "Demander un devis gratuit" : "Request free quote")}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Colonne droite : Informations */}
            <motion.div 
              className={styles.infoSection}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={styles.infoBox}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📧</div>
                  <div className={styles.infoContent}>
                    <h3>Email</h3>
                    <p>
                      <a href="mailto:wolftom@safevalleysve.com">
                        wolftom@safevalleysve.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📱</div>
                  <div className={styles.infoContent}>
                    <h3>{lang === "fr" ? "Téléphone" : "Phone"}</h3>
                    <p>
                      <a href="tel:+33 (0)6 70 67 78 44">
                        +33 (0)6 70 67 78 44
                      </a>
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📍</div>
                  <div className={styles.infoContent}>
                    <h3>{lang === "fr" ? "Adresse" : "Address"}</h3>
                    <p>
                      345 Rte de Carpentras<br />
                      84570 Villes-sur-Auzon<br />
                      France
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>⏰</div>
                  <div className={styles.infoContent}>
                    <h3>{lang === "fr" ? "Horaires" : "Hours"}</h3>
                    <p>
                      {lang === "fr" 
                        ? "Lun - Ven: 9h00 - 18h00\nSupport 24/7 disponible"
                        : "Mon - Fri: 9:00 AM - 6:00 PM\n24/7 Support available"}
                    </p>
                  </div>
                </div>

                <div className={styles.ctaBox}>
                  <h3>
                    {lang === "fr" 
                      ? "Intervention rapide"
                      : "Fast response"}
                  </h3>
                  <p>
                    {lang === "fr" 
                      ? "Déploiement en moins de 24h pour les situations d'urgence"
                      : "Deployment in less than 24h for emergency situations"}
                  </p>
                  <a href="tel:+33XXXXXXXXX" className={styles.ctaButton}>
                    {lang === "fr" ? "Appeler maintenant" : "Call now"}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <section className={styles.mapSection}>
          <div className={styles.mapContainer}>
            <motion.div 
              className={styles.mapHeader}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.mapTitle}>
                {lang === "fr" ? "Notre localisation" : "Our location"}
              </h2>
              <p className={styles.mapSubtitle}>
                {lang === "fr" 
                  ? "Basés en Provence, nous intervenons dans toute la France"
                  : "Based in Provence, we operate throughout France"}
              </p>
            </motion.div>

            <motion.div 
              className={styles.mapBox}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <iframe 
                title="Safe Valley SVE - Localisation" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2867.2773696116597!2d5.22297907640068!3d44.05698082622179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ca71fe0d140113%3A0xf092ef9ec2d3c21c!2s345%20Rte%20de%20Carpentras%2C%2084570%20Villes-sur-Auzon!5e0!3m2!1sfr!2sfr!4v1754140778473!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}