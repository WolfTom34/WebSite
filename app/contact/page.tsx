"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Navbar from "../components/navbar";
import LanguageSwitcher from "../components/language_switcher";
import CustomCursor from "../components/custom_cursor";
import Background from "../components/background";

export default function ContactPage() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [showNav, setShowNav] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const seo = {
    fr: {
      title: "Contact Safe Valley | Devis Drones Autonomes | Vaucluse",
      description: "Contactez Safe Valley pour vos projets de drones autonomes. Devis gratuit pour surveillance, inspection et sécurité. Villes-sur-Auzon, Vaucluse.",
      h1: "Contactez nos experts en drones autonomes"
    },
    en: {
      title: "Contact Safe Valley | Autonomous Drone Quote | Vaucluse", 
      description: "Contact Safe Valley for your autonomous drone projects. Free quote for surveillance, inspection and security. Villes-sur-Auzon, Vaucluse.",
      h1: "Contact our autonomous drone experts"
    }
  }[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      // Debug : voir les données du formulaire
    const formData = new FormData(formRef.current!);
    console.log('Données du formulaire:');
    for (let [key, value] of formData.entries()) {
      console.log(key + ': ' + value);
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Vérifier si EmailJS est chargé, sinon le charger dynamiquement
      if (!(window as any).emailjs) {
        // Charger EmailJS dynamiquement
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = () => {
          (window as any).emailjs.init('YOUR_PUBLIC_KEY'); // Remplace par ta vraie clé
          sendEmail();
        };
        document.head.appendChild(script);
      } else {
        sendEmail();
      }

      async function sendEmail() {
        const emailjs = (window as any).emailjs;
        
        const result = await emailjs.sendForm(
          'service_0bu64to',
          'template_pvdnufs',
          formRef.current,
          'vkDhcBEBj8AUBP6EE'
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
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.safevalleysve.com/contact/" />
        
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content="https://www.safevalleysve.com/logo.png" />
        <meta property="og:url" content="https://www.safevalleysve.com/contact/" />
        <meta property="og:type" content="website" />
        
        {/* EmailJS Script - chargement optimisé */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Charger EmailJS et l'initialiser
            (function() {
              const script = document.createElement('script');
              script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
              script.onload = function() {
                emailjs.init('YOUR_PUBLIC_KEY'); // Remplace par ta vraie Public Key
              };
              document.head.appendChild(script);
            })();
          `
        }} />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Safe Valley SVE",
            "description": seo.description,
            "url": "https://www.safevalleysve.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "345 Rte de Carpentras",
              "addressLocality": "Villes-sur-Auzon",
              "postalCode": "84570",
              "addressCountry": "FR"
            }
          })
        }} />
      </Head>

      <div className="page contact" data-lang={lang}>
        <Background />
        <CustomCursor />
        <Navbar showNav={showNav} setShowNav={setShowNav} lang={lang} />
        <LanguageSwitcher lang={lang} setLang={setLang} />

        <img src="/button.png" className="nav-btn focusable" alt="Menu navigation" 
             onClick={() => setShowNav(prev => !prev)} />

        <div className="overlay-fade" />

        <main className="contact-content">
          <img src="/logo.png" alt="Safe Valley SVE - Drones autonomes de surveillance" className="logo" />

          <div className="card contact-box">
            <header>
              <h1 className="title">{seo.h1}</h1>
              <p className="subtitle">
                {lang === "fr" 
                  ? "Obtenez un devis personnalisé pour vos besoins en surveillance et sécurité"
                  : "Get a personalized quote for your surveillance and security needs"}
              </p>
            </header>

            {submitStatus === 'success' && (
              <div className="success-message">
                <h2>{lang === "fr" ? "Message envoyé avec succès !" : "Message sent successfully!"}</h2>
                <p>{lang === "fr" ? "Nous vous recontacterons dans les plus brefs délais." : "We will contact you as soon as possible."}</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="error-message">
                <h2>{lang === "fr" ? "Erreur lors de l'envoi" : "Error sending message"}</h2>
                <p>{lang === "fr" ? "Veuillez réessayer ou nous contacter directement." : "Please try again or contact us directly."}</p>
              </div>
            )}

            <form 
              ref={formRef}
              className="form" 
              onSubmit={handleSubmit}
            >
              <input 
                type="text" 
                name="name"
                placeholder={lang === "fr" ? "Nom complet *" : "Full name *"} 
                className="input" 
                required 
                disabled={isSubmitting}
              />
              
              <input 
                type="email" 
                name="email"
                placeholder="Email *" 
                className="input" 
                required 
                disabled={isSubmitting}
              />
              
              <input 
                type="tel" 
                name="phone"
                placeholder={lang === "fr" ? "Téléphone" : "Phone"} 
                className="input" 
                disabled={isSubmitting}
              />
              
              <textarea 
                name="message"
                placeholder={lang === "fr" ? "Décrivez votre projet (type de site, superficie, besoins spécifiques)" : "Describe your project (site type, area, specific needs)"} 
                className="textarea" 
                required 
                disabled={isSubmitting}
              />
              
              {/* Champs cachés pour plus d'infos */}
              <input type="hidden" name="website_source" value="safevalleysve.com" />
              <input type="hidden" name="contact_date" value={new Date().toLocaleString('fr-FR')} />
              <input type="hidden" name="language" value={lang} />
              
              <button 
                type="submit" 
                className="btn btn-primary focusable" 
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? (lang === "fr" ? "Envoi en cours..." : "Sending...")
                  : (lang === "fr" ? "Demander un devis gratuit" : "Request free quote")
                }
              </button>
            </form>
          </div>
        </main>

        <section className="map-section">
          <div className="map-box card">
            <iframe 
              title="Safe Valley SVE - Localisation" 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2867.2773696116597!2d5.22297907640068!3d44.05698082622179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ca71fe0d140113%3A0xf092ef9ec2d3c21c!2s345%20Rte%20de%20Carpentras%2C%2084570%20Villes-sur-Auzon!5e0!3m2!1sfr!2sfr!4v1754140778473!5m2!1sfr!2sfr"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
            />
          </div>
        </section>

        <footer className="footer">
          <div className="footer-content container">
            <address>
              <strong>Safe Valley SVE</strong><br />
              345 Rte de Carpentras<br />
              84570 Villes-sur-Auzon, France
            </address>
            <p>&copy; {new Date().getFullYear()} Safe Valley SVE</p>
          </div>
        </footer>

        <style>{`
          :root {
            --accent: #6a6aff; --accent-600: #5959e0; --success: #22c55e; --error: #ef4444;
            --text: #ffffff; --bg-card: rgba(0,0,0,0.35); --border: rgba(255,255,255,0.20);
            --shadow-glow-sm: 0 0 12px rgba(255,255,255,0.15), 0 0 24px rgba(106,106,255,0.18);
            --radius: 20px; --container-w: min(92vw, 1200px); --fs-h1: clamp(28px, 4vw, 48px);
          }
          .container { width: var(--container-w); margin: 0 auto; }
          .card { border-radius: var(--radius); background: var(--bg-card); border: 2px solid var(--border); }
          .btn { border: none; border-radius: 10px; font-weight: 700; cursor: pointer; }
          .btn-primary { background: var(--accent); color: #fff; padding: 14px 18px; transition: all .2s; }
          .btn-primary:hover:not(:disabled) { background: var(--accent-600); }
          .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
          
          .page { 
            min-height: 100vh; position: relative; overflow-x: hidden; color: var(--text); 
            padding: max(0px, env(safe-area-inset-top)) max(0px, env(safe-area-inset-right)) 0 max(0px, env(safe-area-inset-left)); 
          }
          .nav-btn { 
            position: fixed; top: max(16px, env(safe-area-inset-top)); right: max(16px, env(safe-area-inset-right)); 
            width: 32px; cursor: pointer; z-index: 110; transition: filter .2s ease; 
          }
          .nav-btn:hover { filter: drop-shadow(0 0 8px white); }
          .overlay-fade { 
            position: absolute; bottom: 0; left: 0; width: 100%; height: 40%; 
            background: linear-gradient(to top, rgba(0,0,0,0.35), transparent); z-index: 5; pointer-events: none; 
          }
          .contact-content { 
            min-height: 60vh; display: flex; flex-direction: column; align-items: center; 
            padding: 60px 20px 30px; position: relative; z-index: 10; text-align: center; 
          }
          .logo { width: 100px; margin-bottom: 30px; pointer-events: none; }
          .contact-box { 
            width: min(92vw, 720px); padding: clamp(24px, 4vw, 40px) clamp(20px, 3vw, 30px); 
            box-shadow: var(--shadow-glow-sm); 
          }
          .title { font-size: var(--fs-h1); margin: 0 0 8px; }
          .subtitle { margin: 0 0 24px; opacity: 0.9; }
          
          .success-message, .error-message { border-radius: 10px; padding: 20px; margin-bottom: 20px; text-align: center; }
          .success-message { background: rgba(34, 197, 94, 0.1); border: 2px solid var(--success); }
          .success-message h2 { color: var(--success); margin: 0 0 8px; }
          .error-message { background: rgba(239, 68, 68, 0.1); border: 2px solid var(--error); }
          .error-message h2 { color: var(--error); margin: 0 0 8px; }
          
          .form { display: flex; flex-direction: column; gap: 16px; width: 100%; }
          .input, .textarea { 
            padding: 14px; width: 100%; color: #fff; background: rgba(255,255,255,0.06); 
            border: 1px solid rgba(255,255,255,0.28); border-radius: 10px; transition: border-color 0.2s; 
          }
          .input:focus, .textarea:focus { border-color: var(--accent); outline: none; }
          .input:disabled, .textarea:disabled { opacity: 0.6; cursor: not-allowed; }
          .textarea { min-height: 120px; resize: vertical; }
          .input::placeholder, .textarea::placeholder { color: rgba(255,255,255,0.8); }
          
          .map-section { 
            width: 100%; padding: 40px 20px 60px; display: flex; justify-content: center; 
            position: relative; z-index: 10; 
          }
          .map-box { width: min(92vw, 1100px); height: clamp(320px, 50vh, 520px); overflow: hidden; }
          
          .footer { 
            position: relative; background: rgba(0,0,0,0.3); backdrop-filter: blur(8px); color: var(--text); 
            padding: 20px 0; border-top: 1px solid var(--border); text-align: center; z-index: 20; 
          }
          .footer-content { display: flex; flex-direction: column; gap: 10px; align-items: center; }
          address { font-style: normal; margin-bottom: 10px; }
        `}</style>
      </div>
    </>
  );
}