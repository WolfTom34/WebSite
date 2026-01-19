import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useFPSMonitor } from './use-fps-monitor';

// Mock useFrame since we are testing outside Canvas
vi.mock('@react-three/fiber', () => ({
    useFrame: (callback: (state: unknown, delta: number) => void) =>
        callback({ clock: { elapsedTime: 100 } }, 0.016)
}));

describe('useFPSMonitor', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('initializes with 0 FPS', () => {
        const { result } = renderHook(() => useFPSMonitor());
        expect(result.current).toBe(0);
    });

    // Note: Testing the actual loop requires mocking requestAnimationFrame
    // which is handled by Vitest/JSDOM but timing can be tricky.
    // For now, we verify the hook mounts safely.
});
