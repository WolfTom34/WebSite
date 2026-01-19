# ADR 001: Immersive Command Deck UI Strategy

## Status
Accepted

## Date
2026-01-16

## Context
The application initially used a flat, 2D overlay for the HUD (Head-Up Display) and OS Windows on top of a 3D R3F (React Three Fiber) scene. This created a visual disconnect between the "world" (Terrain, Particles) and the "interface", making the UI feel like a generic website layer floating on top of a canvas.

Attempts were made to use extreme "Tunnel" distortion (`perspective: 400px`) to force integration, but this compromised readability and user experience.

## Decision
We refrain from using flat 2D overlays and aggressive warp effects. Instead, we adopt a **"Command Deck" Spatial Architecture**.

This strategy involves:
1.  **Wide-Angle View**: locking the main Camera FOV to **65 degrees** (Panoramic) and elevating the camera position (`Y: 10`) to reveal the horizon.
2.  **Curved Plane Projection**: Applying synchronized CSS 3D transforms (`perspective: 1500px`, `rotateX: 5deg`) to all top-level UI containers (`HUD`, `OSWindow`).
3.  **Isolated Glow Protocol**: Restricting "Bloom" effects strictly to typography elements (via `text-shadow`) while keeping container backgrounds matte and high-transparency `blur(50px)`.

## Consequences
### Positive
*   **Immersion**: The UI appears to physically exist within the 3D cockpit space.
*   **Readability**: The gentler curve (`1500px`) preserves text legibility compared to the tunnel warp.
*   **Performance**: Uses GPU-accelerated CSS transforms instead of heavy Post-Processing passes for the UI distortion.

### Negative
*   **Layout Complications**: CSS 3D transforms can alter the stacking context and click-hit areas. Interactions must be tested on extreme edge cases.
*   **Mobile Complexity**: The `perspective` and `fov` settings may need aggressive media-query adjustments for portrait screens (already bridged via `use-device-tier` hook).

## Compliance
This aligns with the **Lead Developer Protocol** (Innovation Mindset) by abandoning legacy "flat web" patterns in favor of a spatial computing approach.
