import React from 'react';
import { OSWindow } from '../layout/os-window';
import './gallery-page.css';
import { useLanguage } from '../../../shared/context/language-context';
import { SEOHead } from '../components/seo-head';

export const GalleryPage = () => {
    const { t } = useLanguage();

    return (
        <OSWindow title={t('gallery.title')}>
            <SEOHead
                title="Visual Logs"
                description="Technical schematics and design blueprints of the Safe Valley Engineering - SVE Drone Fleet."
            />
            <div className="gallery-grid">
                <div className="gallery-item video-item">
                    <div className="video-container">
                        <iframe
                            src="https://www.youtube.com/embed/c587qrFUBe8"
                            title="SVE Operational Footage"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="caption">{t('gallery.captions.video_uplink')}</div>
                </div>
                <div className="gallery-item">
                    <img
                        src="/assets/images/gallery_uav_spectre.png"
                        alt="UAV Spectre"
                        className="gallery-image"
                    />
                    <div className="caption">{t('gallery.captions.uav')}</div>
                </div>
                <div className="gallery-item">
                    <img
                        src="/assets/images/gallery_ugv_grizzly.png"
                        alt="UGV Grizzly"
                        className="gallery-image"
                    />
                    <div className="caption">{t('gallery.captions.ugv')}</div>
                </div>
                <div className="gallery-item">
                    <img
                        src="/assets/images/gallery_umv_abyss.png"
                        alt="UMV Abyss"
                        className="gallery-image"
                    />
                    <div className="caption">{t('gallery.captions.umv')}</div>
                </div>
                <div className="gallery-item">
                    <img
                        src="/assets/images/gallery_interface_nexus.png"
                        alt="Interface Nexus"
                        className="gallery-image"
                    />
                    <div className="caption">{t('gallery.captions.interface')}</div>
                </div>
            </div>
        </OSWindow>
    );
};
