// data/seo.ts
export interface SEOData {
  title: string;
  description: string;
  h1: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export interface PageSEO {
  fr: SEOData;
  en: SEOData;
}

// Homepage
export const homepageSEO: PageSEO = {
  fr: {
    title: "Drones Autonomes de Surveillance | Solutions de Sécurité | Safe Valley",
    description: "Solutions de drones autonomes pour surveillance, inspection et sécurité périmétrique. Écosystème Maverick avec station Ruche. Devis gratuit.",
    h1: "Solutions de Drones Autonomes",
    keywords: "drone autonome, surveillance, sécurité, inspection, Maverick, station ruche, DGAC",
    canonicalUrl: "https://www.safevalleysve.com/",
    ogImage: "https://www.safevalleysve.com/logo.png"
  },
  en: {
    title: "Autonomous Surveillance Drones | Security Solutions | Safe Valley",
    description: "Autonomous drone solutions for surveillance, inspection and perimeter security. Maverick ecosystem with Hive station. Free quote.",
    h1: "Autonomous Drone Solutions",
    keywords: "autonomous drone, surveillance, security, inspection, Maverick, hive station, DGAC",
    canonicalUrl: "https://www.safevalleysve.com/en/",
    ogImage: "https://www.safevalleysve.com/logo.png"
  }
};

// Partners Page
export const partnersSEO: PageSEO = {
  fr: {
    title: "Partenaires Safe Valley | Mountain Edge | Chiron Solutions",
    description: "Nos partenaires technologiques : Mountain Edge (Edge AI), Chiron Solutions (formations sécurité). Écosystème complet pour vos projets drones.",
    h1: "Nos partenaires technologiques",
    keywords: "partenaires, Mountain Edge, Chiron Solutions, IA embarquée, formations drone",
    canonicalUrl: "https://www.safevalleysve.com/partners/",
    ogImage: "https://www.safevalleysve.com/logo.png"
  },
  en: {
    title: "Safe Valley Partners | Mountain Edge | Chiron Solutions",
    description: "Our technology partners: Mountain Edge (Edge AI), Chiron Solutions (security training). Complete ecosystem for your drone projects.",
    h1: "Our technology partners",
    keywords: "partners, Mountain Edge, Chiron Solutions, embedded AI, drone training",
    canonicalUrl: "https://www.safevalleysve.com/en/partners/",
    ogImage: "https://www.safevalleysve.com/logo.png"
  }
};

// Video Gallery
export const videoSEO: PageSEO = {
  fr: {
    title: "Démonstrations Drones Autonomes | Vidéos Techniques | Safe Valley",
    description: "Découvrez nos drones autonomes en action : surveillance, inspection, sécurité. Vidéos techniques et démonstrations de l'écosystème Maverick.",
    h1: "Nos drones autonomes en action",
    keywords: "vidéos drone, démonstrations, surveillance autonome, inspection technique, Maverick",
    canonicalUrl: "https://www.safevalleysve.com/galerie/",
    ogImage: "https://www.safevalleysve.com/logo.png"
  },
  en: {
    title: "Autonomous Drone Demonstrations | Technical Videos | Safe Valley",
    description: "Discover our autonomous drones in action: surveillance, inspection, security. Technical videos and Maverick ecosystem demonstrations.",
    h1: "Our autonomous drones in action",
    keywords: "drone videos, demonstrations, autonomous surveillance, technical inspection, Maverick",
    canonicalUrl: "https://www.safevalleysve.com/en/galerie/",
    ogImage: "https://www.safevalleysve.com/logo.png"
  }
};

// Contact Page
export const contactSEO: PageSEO = {
  fr: {
    title: "Contact Safe Valley | Devis Drones Autonomes | Vaucluse",
    description: "Contactez Safe Valley pour vos projets de drones autonomes. Devis gratuit pour surveillance, inspection et sécurité. Villes-sur-Auzon, Vaucluse.",
    h1: "Contactez nos experts en drones autonomes",
    keywords: "contact, devis drone, surveillance sécurité, Vaucluse, Villes-sur-Auzon",
    canonicalUrl: "https://www.safevalleysve.com/contact/",
    ogImage: "https://www.safevalleysve.com/logo.png"
  },
  en: {
    title: "Contact Safe Valley | Autonomous Drone Quote | Vaucluse",
    description: "Contact Safe Valley for your autonomous drone projects. Free quote for surveillance, inspection and security. Villes-sur-Auzon, Vaucluse.",
    h1: "Contact our autonomous drone experts",
    keywords: "contact, drone quote, security surveillance, Vaucluse, Villes-sur-Auzon",
    canonicalUrl: "https://www.safevalleysve.com/en/contact/",
    ogImage: "https://www.safevalleysve.com/logo.png"
  }
};

// Blog Page
export const blogSEO: PageSEO = {
  fr: {
    title: "Blog Safe Valley | Actualités Drones Autonomes | Expertise Technique",
    description: "Découvrez nos analyses sur les drones autonomes, réglementation, tendances du marché et innovations technologiques. Expertise Safe Valley.",
    h1: "Actualités et expertise",
    keywords: "blog drone, actualités, réglementation DGAC, innovation, tendances marché",
    canonicalUrl: "https://www.safevalleysve.com/blog/",
    ogImage: "https://www.safevalleysve.com/logo.png"
  },
  en: {
    title: "Safe Valley Blog | Autonomous Drone News | Technical Expertise",
    description: "Discover our analysis on autonomous drones, regulations, market trends and technological innovations. Safe Valley expertise.",
    h1: "News and expertise",
    keywords: "drone blog, news, DGAC regulations, innovation, market trends",
    canonicalUrl: "https://www.safevalleysve.com/en/blog/",
    ogImage: "https://www.safevalleysve.com/logo.png"
  }
};

// Organization Schema centralisé
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Safe Valley SVE",
  "alternateName": "Safe Valley",
  "url": "https://www.safevalleysve.com",
  "logo": "https://www.safevalleysve.com/logo.png",
  "image": "https://www.safevalleysve.com/og/homepage-fr.jpg",
  "description": "Solutions de drones autonomes pour surveillance, inspection et sécurité périmétrique",
  "email": "contact@safevalleysve.com",
  "telephone": "+33-XXX-XXX-XXX", // Remplacer par ton vrai numéro
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "345 Rte de Carpentras",
    "addressLocality": "Villes-sur-Auzon",
    "postalCode": "84570",
    "addressRegion": "Vaucluse",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "44.05698",
    "longitude": "5.22298"
  },
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
  "serviceType": [
    "Surveillance autonome par drones",
    "Inspection technique aérienne",
    "Sécurité périmétrique",
    "Solutions anti-drones"
  ],
  "industry": "Sécurité et surveillance",
  "foundingDate": "2020", // Ajuster selon la réalité
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "5-10" // Ajuster selon la réalité
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "telephone": "+33-XXX-XXX-XXX",
    "email": "contact@safevalleysve.com",
    "url": "https://www.safevalleysve.com/contact/",
    "availableLanguage": ["French", "English"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/safevalleysve/"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Solutions de drones autonomes",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Surveillance autonome",
        "description": "Service de surveillance continue par essaims de drones",
        "category": "Sécurité",
        "areaServed": "France"
      },
      {
        "@type": "Service", 
        "name": "Inspection technique",
        "description": "Inspection aérienne d'infrastructures",
        "category": "Maintenance prédictive",
        "areaServed": "France"
      },
      {
        "@type": "Service",
        "name": "Sécurisation périmétrique", 
        "description": "Protection périmètres par drones autonomes",
        "category": "Sécurité",
        "areaServed": "France"
      }
    ]
  }
};

// Schema LocalBusiness pour le référencement local
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Safe Valley SVE",
  "description": "Solutions de drones autonomes pour surveillance et sécurité",
  "url": "https://www.safevalleysve.com",
  "telephone": "+33-XXX-XXX-XXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "345 Rte de Carpentras",
    "addressLocality": "Villes-sur-Auzon", 
    "postalCode": "84570",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "44.05698",
    "longitude": "5.22298"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday", 
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "Sur devis"
};

// Schema pour les produits/services
export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Écosystème Maverick",
  "description": "Solution complète de drones autonomes avec station Ruche",
  "brand": {
    "@type": "Brand",
    "name": "Safe Valley"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Safe Valley SVE"
  },
  "category": "Drone de surveillance",
  "image": "https://www.safevalleysve.com/og/homepage-fr.jpg",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "price": "Sur devis",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Safe Valley SVE"
    }
  },
  "hasEnergyConsumptionDetails": {
    "@type": "EnergyConsumptionDetails",
    "energyEfficiencyScaleMax": "A+++"
  }
};

// Fonctions pour générer les schemas par page
export const generateContactSchema = (lang: "fr" | "en") => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": contactSEO[lang].title,
  "description": contactSEO[lang].description,
  "url": contactSEO[lang].canonicalUrl,
  "mainEntity": organizationSchema,
  "potentialAction": {
    "@type": "ContactAction",
    "target": "https://www.safevalleysve.com/contact/",
    "name": lang === "fr" ? "Demander un devis" : "Request quote"
  }
});

export const generateVideoGallerySchema = (videos: any[], lang: "fr" | "en") => ({
  "@context": "https://schema.org",
  "@type": "VideoGallery", 
  "name": videoSEO[lang].title,
  "description": videoSEO[lang].description,
  "url": videoSEO[lang].canonicalUrl,
  "publisher": organizationSchema,
  "video": videos.map(video => ({
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description,
    "thumbnailUrl": video.thumbnail,
    "embedUrl": `https://www.youtube.com/embed/${video.id}`,
    "uploadDate": "2024-01-01", // Ajuster selon réalité
    "duration": "PT3M", // Durée approximative
    "publisher": {
      "@type": "Organization",
      "name": "Safe Valley SVE",
      "logo": "https://www.safevalleysve.com/logo.png"
    },
    "contentUrl": `https://www.youtube.com/watch?v=${video.id}`,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/WatchAction",
      "userInteractionCount": 0
    }
  }))
});

export const generateBlogSchema = (posts: any[], lang: "fr" | "en") => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": blogSEO[lang].title,
  "description": blogSEO[lang].description,
  "url": blogSEO[lang].canonicalUrl,
  "publisher": organizationSchema,
  "blogPost": posts.map(post => ({
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": organizationSchema,
    "publisher": organizationSchema,
    "image": post.image,
    "url": post.linkedinUrl,
    "isPartOf": {
      "@type": "Blog",
      "name": blogSEO[lang].title
    },
    "inLanguage": lang === "fr" ? "fr-FR" : "en-US"
  }))
});

export const generatePartnersSchema = (partners: any[], lang: "fr" | "en") => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": partnersSEO[lang].title,
  "description": partnersSEO[lang].description,
  "url": partnersSEO[lang].canonicalUrl,
  "mainEntity": organizationSchema,
  "about": partners.map(partner => ({
    "@type": "Organization",
    "name": partner.name,
    "description": lang === "fr" ? partner.descriptionFr : partner.descriptionEn,
    "url": partner.link,
    "logo": partner.logo,
    "partner": organizationSchema
  }))
});

// Schema de FAQ pour améliorer les rich snippets
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage", 
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quelle est l'autonomie des drones Safe Valley ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nos drones autonomes Maverick offrent 45 à 60 minutes d'autonomie de vol avec recharge automatique via la station Ruche."
      }
    },
    {
      "@type": "Question",
      "name": "Dans quelles zones géographiques intervenez-vous ?",
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": "Safe Valley intervient sur tout le territoire français avec des solutions de surveillance par drones autonomes."
      }
    },
    {
      "@type": "Question",
      "name": "Vos drones sont-ils homologués DGAC ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, tous nos systèmes de drones autonomes respectent la réglementation DGAC française et européenne."
      }
    }
  ]
};