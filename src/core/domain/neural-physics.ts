import * as THREE from 'three';

/**
 * Generates a random point within a defined volumetric sphere.
 * Uses uniform distribution math to avoid clumping at center.
 * 
 * @param radius Radius of the volume
 * @returns THREE.Vector3
 */
export const getVolumetricPoint = (radius: number): THREE.Vector3 => {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = radius * Math.cbrt(Math.random()); // Cubic root for uniform volume distribution

    return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
    );
};
