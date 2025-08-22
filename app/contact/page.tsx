"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import Layout from "../components/layout";
import SEOHead from "../components/seo_head";
import { contactSEO, generateContactSchema } from "../data/seo";
import styles from "../styles/contact.module.css";

export default function ContactPage() {
  const { lang, setLang } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const currentSEO = contactSEO[lang];
  const structuredData = generateContactSchema(lang);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

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
      <Layout lang={lang} setLang={setLang} className="contact" showLogo={false}>
        <div className={styles.overlayFade} />
        <main className={styles.contactContent}>
          <div className={styles.logoContainer}>
            <img src="/logo.png" alt="Safe Valley SVE - Drones autonomes de surveillance" className={styles.logo} width="100" height="50" />
          </div>
          <div className={`card ${styles.contactBox}`}>
            <header>
              <h1 className={styles.title}>{currentSEO.h1}</h1>
              <p className={styles.subtitle}>
                {lang === "fr" 
                  ? "Obtenez un devis personnalisé pour vos besoins en surveillance et sécurité"
                  : "Get a personalized quote for your surveillance and security needs"}
              </p>
            </header>

            {submitStatus === 'success' && (
              <motion.div className={styles.successMessage} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h2>{lang === "fr" ? "Message envoyé avec succès !" : "Message sent successfully!"}</h2>
                <p>{lang === "fr" ? "Nous vous recontacterons dans les plus brefs délais." : "We will contact you as soon as possible."}</p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div className={styles.errorMessage} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h2>{lang === "fr" ? "Erreur lors de l'envoi" : "Error sending message"}</h2>
                <p>{lang === "fr" ? "Veuillez réessayer ou nous contacter directement." : "Please try again or contact us directly."}</p>
              </motion.div>
            )}

            <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
              <input type="text" name="name" placeholder={lang === "fr" ? "Nom complet *" : "Full name *"} className={styles.input} required disabled={isSubmitting} aria-label={lang === "fr" ? "Nom complet" : "Full name"} />
              <input type="email" name="email" placeholder="Email *" className={styles.input} required disabled={isSubmitting} aria-label="Email" />
              <input type="tel" name="phone" placeholder={lang === "fr" ? "Téléphone" : "Phone"} className={styles.input} disabled={isSubmitting} aria-label={lang === "fr" ? "Téléphone" : "Phone"} />
              <textarea name="message" placeholder={lang === "fr" ? "Décrivez votre projet (type de site, superficie, besoins spécifiques)" : "Describe your project (site type, area, specific needs)"} className={styles.textarea} required disabled={isSubmitting} aria-label={lang === "fr" ? "Description du projet" : "Project description"} />
              <input type="hidden" name="website_source" value="safevalleysve.com" />
              <input type="hidden" name="contact_date" value={new Date().toLocaleString('fr-FR')} />
              <input type="hidden" name="language" value={lang} />
              <button type="submit" className="btn btn-primary focusable" disabled={isSubmitting}>
                {isSubmitting ? (lang === "fr" ? "Envoi en cours..." : "Sending...") : (lang === "fr" ? "Demander un devis gratuit" : "Request free quote")}
              </button>
            </form>
          </div>
        </main>
        <section className={styles.mapSection}>
          <div className={`${styles.mapBox} card`}>
            <iframe title="Safe Valley SVE - Localisation" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2867.2773696116597!2d5.22297907640068!3d44.05698082622179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ca71fe0d140113%3A0xf092ef9ec2d3c21c!2s345%20Rte%20de%20Carpentras%2C%2084570%20Villes-sur-Auzon!5e0!3m2!1sfr!2sfr!4v1754140778473!5m2!1sfr!2sfr" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
          </div>
        </section>
      </Layout>
    </>
  );
}