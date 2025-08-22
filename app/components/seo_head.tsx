// components/seo_head.tsx
import Head from "next/head";
import { organizationSchema, localBusinessSchema, productSchema, faqSchema } from "../data/seo";

interface SEOData {
  title: string;
  description: string;
  h1: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

interface SEOHeadProps {
  seoData: SEOData;
  lang: "fr" | "en";
  structuredData?: object;
  pageType?: "website" | "article" | "video" | "contact" | "product";
  includeOrganizationSchema?: boolean;
  includeFAQSchema?: boolean;
}

export default function SEOHead({ 
  seoData, 
  lang, 
  structuredData, 
  pageType = "website",
  includeOrganizationSchema = true,
  includeFAQSchema = false
}: SEOHeadProps) {
  const langCode = lang === "fr" ? "fr-FR" : "en-US";
  const baseUrl = "https://www.safevalleysve.com";
  
  // URLs alternates pour les langues
  const currentPath = seoData.canonicalUrl?.replace(baseUrl, "") || "/";
  const alternateFrUrl = lang === "en" && currentPath.startsWith("/en") 
    ? `${baseUrl}${currentPath.replace("/en", "")}`
    : `${baseUrl}${currentPath}`;
  const alternateEnUrl = lang === "fr"
    ? `${baseUrl}/en${currentPath === "/" ? "" : currentPath}`
    : `${baseUrl}${currentPath}`;

  // Image Open Graph avec fallback
  const ogImage = seoData.ogImage || `${baseUrl}/og/default-${lang}.jpg`;
  
  // Schema.org combinés
  const combinedSchemas = {
    "@context": "https://schema.org",
    "@graph": [
      // Toujours inclure l'organisation
      ...(includeOrganizationSchema ? [organizationSchema, localBusinessSchema] : []),
      // Schema spécifique à la page
      ...(structuredData ? [structuredData] : []),
      // FAQ si demandé (utile pour homepage)
      ...(includeFAQSchema ? [faqSchema] : []),
      // Produit pour pages pertinentes
      ...(pageType === "product" ? [productSchema] : [])
    ]
  };

  return (
    <Head>
      {/* Meta tags de base */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="language" content={langCode} />
      <meta name="author" content="Safe Valley SVE" />
      <meta name="copyright" content="Safe Valley SVE" />
      
      {/* Keywords si disponibles */}
      {seoData.keywords && (
        <meta name="keywords" content={seoData.keywords} />
      )}

      {/* URL canonique */}
      {seoData.canonicalUrl && (
        <link rel="canonical" href={seoData.canonicalUrl} />
      )}

      {/* Liens alternatifs pour les langues */}
      <link rel="alternate" hrefLang="fr" href={alternateFrUrl} />
      <link rel="alternate" hrefLang="en" href={alternateEnUrl} />
      <link rel="alternate" hrefLang="x-default" href={alternateFrUrl} />

      {/* Open Graph optimisé */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${seoData.title} - Safe Valley SVE`} />
      <meta property="og:url" content={seoData.canonicalUrl || baseUrl} />
      <meta property="og:type" content={pageType === "article" ? "article" : "website"} />
      <meta property="og:locale" content={langCode} />
      <meta property="og:locale:alternate" content={lang === "fr" ? "en-US" : "fr-FR"} />
      <meta property="og:site_name" content="Safe Valley SVE" />
      <meta property="og:updated_time" content={new Date().toISOString()} />

      {/* Twitter Cards optimisé */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${seoData.title} - Safe Valley SVE`} />
      <meta name="twitter:site" content="@safevalleysve" />
      <meta name="twitter:creator" content="@safevalleysve" />

      {/* LinkedIn optimisé */}
      <meta property="linkedin:owner" content="safevalleysve" />

      {/* Meta tags additionnels pour le business */}
      <meta name="geo.region" content="FR-84" />
      <meta name="geo.placename" content="Villes-sur-Auzon" />
      <meta name="geo.position" content="44.05698;5.22298" />
      <meta name="ICBM" content="44.05698, 5.22298" />
      
      {/* Meta tags spécifiques au secteur */}
      <meta name="industry" content="Security, Surveillance, Drones" />
      <meta name="target_country" content="FR" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Schema.org structuré */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedSchemas, null, 0)
        }} 
      />

      {/* Rich Cards additionnels pour Google */}
      {pageType === "contact" && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": baseUrl,
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${baseUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      )}

      {/* Preloads critiques */}
      <link rel="preload" href="/fonts/AldotheApache.ttf" as="font" type="font/ttf" crossOrigin="" />
      <link rel="preload" href={ogImage} as="image" />
      
      {/* DNS Prefetch pour performance */}
      <link rel="dns-prefetch" href="//www.youtube.com" />
      <link rel="dns-prefetch" href="//img.youtube.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />

      {/* Favicons complets */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/icons/icon-16x16.png" type="image/png" sizes="16x16" />
      <link rel="icon" href="/icons/icon-32x32.png" type="image/png" sizes="32x32" />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      
      {/* Meta pour l'accessibilité */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="format-detection" content="address=yes" />
      
      {/* Cache control pour les ressources statiques */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
      
      {/* Security headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Liens de navigation pour crawlers */}
      <link rel="home" href={baseUrl} />
      <link rel="help" href={`${baseUrl}/contact/`} />
      <link rel="search" href={`${baseUrl}/search/`} />
    </Head>
  );
}