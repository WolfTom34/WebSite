import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSEO } from '../../../shared/context/seo-context';

interface SEOHeadProps {
    title: string;
    description: string;
    image?: string;
    type?: 'website' | 'article';
}

export const SEOHead: React.FC<SEOHeadProps> = ({
    title,
    description,
}) => {
    const { setSEO } = useSEO();

    useEffect(() => {
        setSEO(title, description);
    }, [title, description, setSEO]);

    return null;
};
