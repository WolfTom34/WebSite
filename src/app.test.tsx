import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './app';
import { HelmetProvider } from 'react-helmet-async';

// Mock Three.js/R3F components as they require a WebGL context which JSDOM doesn't support well
vi.mock('@react-three/fiber', () => ({
    Canvas: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    useFrame: vi.fn(),
    useThree: () => ({
        camera: { position: { z: 5 } },
        gl: { domElement: document.createElement('canvas') }
    }),
    extend: vi.fn()
}));

vi.mock('@react-three/drei', () => ({
    OrbitControls: () => null,
    Text: () => null,
    Line: () => null,
    Plane: () => null,
    Sphere: () => null,
    EffectComposer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Bloom: () => null,
    Noise: () => null,
    Vignette: () => null,
    meshTransmissionMaterial: () => null,
    Html: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Icosahedron: () => null,
    useContextBridge:
        () =>
        ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

vi.mock('@react-three/postprocessing', () => ({
    EffectComposer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Bloom: () => null,
    Noise: () => null,
    Vignette: () => null,
    DepthOfField: () => null,
    ChromaticAberration: () => null
}));

describe('App', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <HelmetProvider>
                <App />
            </HelmetProvider>
        );
        expect(container).toBeInTheDocument();
    });
});
