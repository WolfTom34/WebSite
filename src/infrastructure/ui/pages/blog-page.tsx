
import React from 'react';
import { OSWindow } from '../layout/os-window';
import './blog-page.css';
import { useLanguage } from '../../../shared/context/language-context';
import { SEOHead } from '../components/seo-head';

export const BlogPage = () => {
    const { t } = useLanguage();

    return (
        <OSWindow title={t('blog.title')}>
            <SEOHead
                title="Transmissions"
                description="Incoming development logs and system updates from the Core Lattice."
            />
            <div className="blog-empty-state">
                <div className="empty-message">{t('blog.empty_state')}</div>
                <a
                    href={t('blog.linkedin_url')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-uplink"
                >
                    <span className="uplink-icon">📡</span>
                    {t('blog.linkedin_link')}
                </a>
            </div>
        </OSWindow>
    );
};
