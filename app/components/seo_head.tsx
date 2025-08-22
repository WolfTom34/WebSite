// components/seo_head.tsx
import Head from "next/head";

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
  pageType?: "website" | "article" | "video";
}

export default function SEOHead({ 
  seoData, 
  lang, 
  structuredData, 
  pageType = "website" 
}: SEOHeadProps) {
  const langCode = lang === "fr" ? "fr-FR" : "en-US";
  const alternateUrl = lang === "fr" 
    ? seoData.canonicalUrl?.replace("/", "/en/") 
    : seoData.canonicalUrl?.replace("/en/", "/");

  return (
    <Head>
      {/* Meta tags de base */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={langCode} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Keywords si disponibles */}
      {seoData.keywords && (
        <meta name="keywords" content={seoData.keywords} />
      )}

      {/* URL canonique */}
      {seoData.canonicalUrl && (
        <link rel="canonical" href={seoData.canonicalUrl} />
      )}

      {/* Liens alternatifs pour les langues */}
      <link rel="alternate" hrefLang="fr" href="https://www.safevalleysve.com/" />
      <link rel="alternate" hrefLang="en" href="https://www.safevalleysve.com/en/" />
      <link rel="alternate" hrefLang="x-default" href="https://www.safevalleysve.com/" />

      {/* Open Graph */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.ogImage || "https://www.safevalleysve.com/logo.png"} />
      <meta property="og:url" content={seoData.canonicalUrl || "https://www.safevalleysve.com"} />
      <meta property="og:type" content={pageType} />
      <meta property="og:locale" content={langCode} />
      <meta property="og:site_name" content="Safe Valley SVE" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.ogImage || "https://www.safevalleysve.com/logo.png"} />

      {/* Structured Data */}
      {structuredData && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }} 
        />
      )}

      {/* Favicon et autres */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="theme-color" content="#6a6aff" />
      
      {/* Preconnect pour performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
    </Head>
  );
}