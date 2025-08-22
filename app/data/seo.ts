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
  "url": "https://www.safevalleysve.com",
  "logo": "https://www.safevalleysve.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "345 Rte de Carpentras",
    "addressLocality": "Villes-sur-Auzon",
    "postalCode": "84570",
    "addressCountry": "FR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://www.safevalleysve.com/contact/"
  },
  "sameAs": [
    "https://www.linkedin.com/company/safevalleysve/"
  ]
};

// Schémas spécialisés par type de page
export const generateContactSchema = (lang: "fr" | "en") => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Safe Valley SVE",
  "description": contactSEO[lang].description,
  "url": "https://www.safevalleysve.com",
  "address": organizationSchema.address,
  "contactPoint": organizationSchema.contactPoint
});

export const generateVideoGallerySchema = (videos: any[], lang: "fr" | "en") => ({
  "@context": "https://schema.org",
  "@type": "VideoGallery",
  "name": videoSEO[lang].title,
  "description": videoSEO[lang].description,
  "publisher": {
    "@type": "Organization",
    "name": "Safe Valley SVE",
    "url": "https://www.safevalleysve.com"
  },
  "video": videos.map(video => ({
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description,
    "thumbnailUrl": video.thumbnail,
    "embedUrl": `https://www.youtube.com/embed/${video.id}`,
    "uploadDate": "2024-01-01",
    "duration": "PT3M",
    "publisher": {
      "@type": "Organization",
      "name": "Safe Valley SVE"
    }
  }))
});

export const generateBlogSchema = (posts: any[], lang: "fr" | "en") => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": blogSEO[lang].title,
  "description": blogSEO[lang].description,
  "url": "https://www.safevalleysve.com/blog/",
  "publisher": {
    "@type": "Organization",
    "name": "Safe Valley SVE",
    "url": "https://www.safevalleysve.com"
  },
  "blogPost": posts.map(post => ({
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Organization", 
      "name": "Safe Valley SVE"
    }
  }))
});

export const generatePartnersSchema = (partners: any[], lang: "fr" | "en") => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": partnersSEO[lang].title,
  "description": partnersSEO[lang].description,
  "publisher": {
    "@type": "Organization",
    "name": "Safe Valley SVE",
    "url": "https://www.safevalleysve.com"
  },
  "about": partners.map(partner => ({
    "@type": "Organization",
    "name": partner.name,
    "description": lang === "fr" ? partner.descriptionFr : partner.descriptionEn,
    "url": partner.link
  }))
});