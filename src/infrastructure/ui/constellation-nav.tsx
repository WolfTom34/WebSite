import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { THEME } from '../../shared/constants/theme';

import { useLocation } from 'wouter';
import { useLanguage } from '../../shared/context/language-context';
import { useGyroscope } from '../../shared/hooks/use-gyroscope';
import { useDeviceTier } from '../../shared/hooks/use-device-tier';

interface NavNode {
    id: string;
    label: string;
    position: THREE.Vector3;
    path: string;
}

// Fixed coordinates balanced within the 45-radius lattice volume
const NODES: NavNode[] = [
    { id: '2', label: 'UNIT DATABASE', position: new THREE.Vector3(-25, 15, -5), path: '/work' },
    { id: '3', label: 'OPTIC ARCHIVE', position: new THREE.Vector3(25, 15, 5), path: '/gallery' },
    {
        id: '4',
        label: 'STRATEGIC NETWORK',
        position: new THREE.Vector3(-18, -12, 0),
        path: '/partners'
    },
    { id: '5', label: 'NEURAL FEED', position: new THREE.Vector3(18, -12, -5), path: '/blog' }
];

const StarNode = ({
    node,
    mouseRef,
    label
}: {
    node: NavNode;
    mouseRef: React.MutableRefObject<THREE.Vector3>;
    label: string;
}) => {
    const groupRef = useRef<THREE.Group>(null!);
    const [hovered, setHovered] = useState(false);
    const [, setLocation] = useLocation();

    const [offset] = useState(() => Math.random() * 100);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();

        // 1. Subtle Organic Drift (Sync with Lattice logic but minimized)
        const driftX = Math.sin(time * 0.4 + offset) * 0.1;
        const driftY = Math.cos(time * 0.2 + offset) * 0.1;
        const targetPos = node.position.clone().add(new THREE.Vector3(driftX, driftY, 0));

        const dist = targetPos.distanceTo(mouseRef.current);
        const magnetRadius = 3.0;

        if (dist < magnetRadius) {
            const pullStrength = (1 - dist / magnetRadius) * 0.05;
            targetPos.lerp(mouseRef.current, pullStrength);
        }

        groupRef.current.position.lerp(targetPos, 0.1);
        const scaleTarget = hovered ? 1.2 : 1.0;
        groupRef.current.scale.lerp(new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget), 0.1);
    });

    return (
        <group
            ref={groupRef}
            onPointerOver={() => {
                document.body.style.cursor = 'pointer';
                setHovered(true);
            }}
            onPointerOut={() => {
                document.body.style.cursor = 'auto';
                setHovered(false);
            }}
            onClick={() => setLocation(node.path)}
        >
            {/* The Neural Node (Pulsing Diamond Center) */}
            <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
                <octahedronGeometry args={[0.5, 0]} />
                <meshBasicMaterial
                    color={hovered ? '#ff0000' : THEME.COLORS.PLASMA_BLUE}
                    transparent
                    opacity={1.0}
                />
            </mesh>

            {/* Glass Tag Container */}
            <group position={[0, 0, 1.2]} renderOrder={10}>
                {/* 1. The Holographic Glass ("Smoke Black") */}
                <mesh>
                    <planeGeometry args={[label.length * 1.5 + 4, 4.5]} />
                    <meshBasicMaterial
                        color={hovered ? '#150000' : '#050505'}
                        transparent
                        opacity={0.85} // Solid enough to block noise, but remains "smoky"
                        depthWrite={false}
                    />
                </mesh>

                {/* 2. The Main Precision Frame (Thin & Sharp) */}
                <Line
                    points={[
                        [-label.length * 0.75 - 2, 2.25, 0],
                        [label.length * 0.75 + 2, 2.25, 0],
                        [label.length * 0.75 + 2, -2.25, 0],
                        [-label.length * 0.75 - 2, -2.25, 0],
                        [-label.length * 0.75 - 2, 2.25, 0]
                    ]}
                    color={hovered ? THEME.COLORS.CRIMSON_ALERT : THEME.COLORS.PLASMA_BLUE}
                    lineWidth={1.2}
                    transparent
                    opacity={0.8}
                />

                {/* 3. Technical Secondary Label (Top Left) */}
                <Text
                    position={[-label.length * 0.75 - 1.8, 1.8, 0.1]}
                    fontSize={0.8}
                    color={hovered ? THEME.COLORS.CRIMSON_ALERT : THEME.COLORS.PLASMA_BLUE}
                    anchorX="left"
                    fillOpacity={0.7}
                >
                    {`SEC_${node.id.padStart(2, '0')}`}
                </Text>

                {/* 4. Corner Accents (Precision L-Brackets) */}
                <Line
                    points={[
                        [-label.length * 0.75 - 2.5, 1.5, 0],
                        [-label.length * 0.75 - 2.5, 2.25, 0],
                        [-label.length * 0.75 - 1.7, 2.25, 0]
                    ]}
                    color={hovered ? THEME.COLORS.CRIMSON_ALERT : THEME.COLORS.PLASMA_BLUE}
                    lineWidth={2}
                />
                <Line
                    points={[
                        [label.length * 0.75 + 2.5, -1.5, 0],
                        [label.length * 0.75 + 2.5, -2.25, 0],
                        [label.length * 0.75 + 1.7, -2.25, 0]
                    ]}
                    color={hovered ? THEME.COLORS.CRIMSON_ALERT : THEME.COLORS.PLASMA_BLUE}
                    lineWidth={2}
                />

                {/* 5. The High-Contrast Label Text (Brilliant White) */}
                <Text
                    position={[0, 0, 0.2]}
                    fontSize={2.5}
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.06}
                >
                    <meshBasicMaterial color="#FFFFFF" transparent opacity={hovered ? 1 : 0.9} />
                    {label}
                </Text>

                {/* Tactical HUD Reticle (Hover Only - Red Alert) */}
                {hovered && (
                    <group position={[0, 0, 0.3]}>
                        <Line
                            points={[
                                [-label.length * 0.75 - 3.2, 2.6, 0],
                                [-label.length * 0.75 - 3.2, 3.2, 0],
                                [-label.length * 0.75 - 2.6, 3.2, 0]
                            ]}
                            color={THEME.COLORS.CRIMSON_ALERT}
                            lineWidth={2.5}
                        />
                        <Line
                            points={[
                                [label.length * 0.75 + 3.2, 2.6, 0],
                                [label.length * 0.75 + 3.2, 3.2, 0],
                                [label.length * 0.75 + 2.6, 3.2, 0]
                            ]}
                            color={THEME.COLORS.CRIMSON_ALERT}
                            lineWidth={2.5}
                        />
                        <Line
                            points={[
                                [-label.length * 0.75 - 3.2, -2.6, 0],
                                [-label.length * 0.75 - 3.2, -3.2, 0],
                                [-label.length * 0.75 - 2.6, -3.2, 0]
                            ]}
                            color={THEME.COLORS.CRIMSON_ALERT}
                            lineWidth={2.5}
                        />
                        <Line
                            points={[
                                [label.length * 0.75 + 3.2, -2.6, 0],
                                [label.length * 0.75 + 3.2, -3.2, 0],
                                [label.length * 0.75 + 2.6, -3.2, 0]
                            ]}
                            color={THEME.COLORS.CRIMSON_ALERT}
                            lineWidth={2.5}
                        />
                    </group>
                )}
            </group>
        </group>
    );
};

export const ConstellationNav = () => {
    const groupRef = useRef<THREE.Group>(null!);
    const mouseWorldRef = useRef(new THREE.Vector3(0, 0, 0));
    const { t } = useLanguage();
    const { orientation } = useGyroscope();
    const tier = useDeviceTier();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = time * 0.02; // Synchronized with CoreLattice
        }

        const { width, height } = state.viewport;
        let inputX = 0;
        let inputY = 0;

        if (tier === 'ECO') {
            inputX = orientation.x;
            inputY = orientation.y;
        } else {
            inputX = state.mouse.x;
            inputY = state.mouse.y;
        }

        mouseWorldRef.current.set((inputX * width) / 2, (inputY * height) / 2, 0);
    });



    const getLabel = (id: string) => {
        switch (id) {
            case '2':
                return t('nav.fleet');
            case '3':
                return t('nav.gallery');
            case '4':
                return t('nav.partners');
            case '5':
                return t('nav.blog');
            default:
                return 'NODE';
        }
    };

    return (
        <group ref={groupRef} position={[0, 10, 15]}>
            {/* Render Nodes */}
            {NODES.map((node) => (
                <StarNode
                    key={node.id}
                    node={node}
                    mouseRef={mouseWorldRef}
                    label={getLabel(node.id)}
                />
            ))}

            {/* Connection Lines (Tactical Quad-Loop) */}
            <Line
                points={[
                    NODES[0].position,
                    NODES[1].position,
                    NODES[3].position,
                    NODES[2].position,
                    NODES[0].position
                ]}
                color={THEME.COLORS.CRIMSON_ALERT}
                lineWidth={1}
                dashed={true}
                dashScale={50}
                gapSize={20}
                opacity={0.3}
                transparent
            />
        </group>
    );
};
