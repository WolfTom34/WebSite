import React, { useMemo } from 'react';
import { OSWindow } from '../layout/os-window';
import './work-page.css';
import { useLanguage } from '../../../shared/context/language-context';
import { SEOHead } from '../components/seo-head';
import { useTransmission } from '../../../shared/context/transmission-context';

interface FleetUnit {
    id: string;
    designation: string;
    name: string;
    description: string;
    capabilities: string[];
    status: 'ACTIVE' | 'PROTOTYPE';
}

export const WorkPage = () => {
    const { t } = useLanguage();
    const { openTransmission } = useTransmission();

    const FLEET: FleetUnit[] = useMemo(
        () => [
            {
                id: 'AERIAL_RECON',
                designation: 'UAV-01',
                name: 'STORM PETREL',
                description: t('fleet.uav_01_desc'),
                capabilities: ['AI-DRIVEN ISR', 'ORGANIC DESIGN', 'EXTENDED ENDURANCE'],
                status: 'ACTIVE'
            },
            {
                id: 'GROUND_ASSAULT',
                designation: 'UGV-04',
                name: 'IRON CLAD',
                description: t('fleet.ugv_04_desc'),
                capabilities: ['HEAVY LOAD', 'GENERATIVE CHASSIS', 'ALL-TERRAIN'],
                status: 'ACTIVE'
            },
            {
                id: 'MARINE_OPS',
                designation: 'UMV-09',
                name: 'DEEP DIVE',
                description: t('fleet.umv_09_desc'),
                capabilities: ['DEEP DIVE', 'ADDITIVE LATTICE', 'SONAR MAPPING'],
                status: 'PROTOTYPE'
            },
            {
                id: 'MICRO_SWARM',
                designation: 'UAV-X',
                name: 'LOCUST SWARM',
                description: t('fleet.uav_x_desc'),
                capabilities: ['AETHERMIND CORE', 'FULL AUTOMATED SYSTEM', 'SWARM INTEL'],
                status: 'PROTOTYPE'
            }
        ],
        [t]
    );

    return (
        <OSWindow title={t('fleet.title')}>
            <SEOHead
                title="The Fleet"
                description="Technical specifications of Safe Valley Engineering's autonomous units, highlighting AI-driven ISR, organic design, and advanced additive fabrication."
            />
            <div className="work-grid">
                {FLEET.map((unit) => (
                    <div key={unit.id} className="project-card">
                        <div className="card-header">
                            <span className="id-tag">{unit.designation}</span>
                            <div
                                className={`status-dot ${unit.status === 'ACTIVE' ? 'on' : 'off'}`}
                            ></div>
                        </div>
                        <h2 className="fleet-name">{unit.name}</h2>
                        <p>{unit.description}</p>
                        <div className="tech-stack">
                            {unit.capabilities.map((cap) => (
                                <span key={cap} className="tech-tag">
                                    {cap}
                                </span>
                            ))}
                        </div>
                        <div className="unit-footer">
                            <span
                                style={{ color: unit.status === 'ACTIVE' ? '#00FF41' : '#FFD700' }}
                            >
                                {unit.status === 'ACTIVE'
                                    ? t('fleet.status_active')
                                    : t('fleet.status_prototype')}
                            </span>
                        </div>
                        <button
                            className="requisition-btn"
                            onClick={() =>
                                openTransmission(`${t('cta.requisition')}: ${unit.designation}`)
                            }
                        >
                            {t('cta.requisition')}
                        </button>
                    </div>
                ))}
            </div>
        </OSWindow>
    );
};
