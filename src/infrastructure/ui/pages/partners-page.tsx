
import React from 'react';
import { OSWindow } from '../layout/os-window';
import './partners-page.css';
import { useLanguage } from '../../../shared/context/language-context';
import { SEOHead } from '../components/seo-head';

export const PartnersPage = () => {
    const { t } = useLanguage();

    return (
        <OSWindow title={t('partners.title')}>
            <SEOHead
                title="Strategic Alliances"
                description="Global partners and strategic stakeholders of Safe Valley Engineering - SVE."
            />
            <div className="partners-grid">
                <a href={t('partners.chiron.url')} target="_blank" rel="noopener noreferrer" className="partner-card">
                    <h3 className="partner-name">{t('partners.chiron.name')}</h3>
                    <div className="partner-role">{t('partners.chiron.role')}</div>
                    <p className="partner-desc">{t('partners.chiron.desc')}</p>
                </a>
                <a href={t('partners.mountain.url')} target="_blank" rel="noopener noreferrer" className="partner-card">
                    <h3 className="partner-name">{t('partners.mountain.name')}</h3>
                    <div className="partner-role">{t('partners.mountain.role')}</div>
                    <p className="partner-desc">{t('partners.mountain.desc')}</p>
                </a>
                <a href={t('partners.firis.url')} target="_blank" rel="noopener noreferrer" className="partner-card">
                    <h3 className="partner-name">{t('partners.firis.name')}</h3>
                    <div className="partner-role">{t('partners.firis.role')}</div>
                    <p className="partner-desc">{t('partners.firis.desc')}</p>
                </a>
            </div>
        </OSWindow>
    );
};
