import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSEO } from '../../../shared/context/seo-context';

export const SEORenderer: React.FC = () => {
    const { title, description } = useSEO();
    const siteTitle = `SAFE VALLEY - SVE | ${title}`;
    const url = window.location.href; // Note: This might not update if not reactive to location, but typically fine for SPA meta

    const schemaOrg = {
        "@context": "http://schema.org",
        "@type": "Organization",
        "name": "Safe Valley Engineering - SVE",
        "url": "https://kolth.io",
        "logo": "https://kolth.io/logo.png",
        "description": "Advanced Robotics and Autonomous Defense Systems."
    };

    return (
        <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph */}
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schemaOrg)}
            </script>
        </Helmet>
    );
};
