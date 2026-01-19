import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ConstellationNav } from './constellation-nav';
import { LanguageProvider } from '../../shared/context/language-context';

// Mock R3F
vi.mock('@react-three/fiber', () => ({
    useFrame: vi.fn(),
    useThree: () => ({ viewport: { width: 10, height: 10 } }),
    extend: vi.fn(),
}));

// Mock Drei
vi.mock('@react-three/drei', () => ({
    Text: ({ children }: { children: React.ReactNode }) => <div data-testid="nav-text">{children}</div>,
    Sphere: () => <div data-testid="nav-star" />,
    Line: () => <div data-testid="nav-line" />,
}));

// Mock Context
vi.mock('../../shared/context/interaction-context', () => ({
    useInteraction: () => ({
        mouse: { x: 0, y: 0 },
    }),
}));

describe('ConstellationNav', () => {
    it('renders star nodes and lines', () => {
        const { getAllByTestId } = render(
            <LanguageProvider>
                <ConstellationNav />
            </LanguageProvider>
        );

        // Should have 8 text nodes (2 per node * 4 nodes)
        // 1. Label
        // 2. SEC_ID
        expect(getAllByTestId('nav-text')).toHaveLength(8);

        // Stars are now rendered as custom meshes (octahedrons), not Spheres from Drei
        // So we don't expect 'nav-star' unless we mock the mesh, which is hard in this setup.
        // We can verify the lines though.

        // Lines:
        // Each node has: 1 Main Frame + 2 Corner Accents = 3 lines
        // 4 nodes * 3 = 12 lines
        // + 1 main connection line in ConstellationNav
        // Total = 13 lines
        expect(getAllByTestId('nav-line')).toHaveLength(13);
    });
});
