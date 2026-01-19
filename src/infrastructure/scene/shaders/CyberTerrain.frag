// OES_standard_derivatives is standard in WebGL2, but good to retain structure if needed
//#extension GL_OES_standard_derivatives : enable

varying vec2 vUv;
varying float vElevation;

uniform vec3 uColorGrid;
uniform float uGridThickness;
uniform vec3 uMouse; // Added
varying vec3 vWorldPosition; // Added

void main() {
    // 1. Grid Logic (Derivative-Based for Constant Line Width)
    // Avoids aliasing and maintains line crispness at distance
    // Using 60x60 grid
    vec2 gridScale = vec2(60.0, 60.0);
    vec2 gridPos = vUv * gridScale;
    
    // Calculate derivatives (rate of change of gridPos relative to screen pixels)
    vec2 dGrid = fwidth(gridPos);
    
    // Grid Factor: Distance to nearest integer
    // fract(gridPos - 0.5) centers the line on integer coordinates
    // abs(...) gets distance
    vec2 gridDist = abs(fract(gridPos - 0.5) - 0.5);
    
    // Smoothstep based on derivative to keep line width constant (approx 1.5 pixels)
    float line = min(
        smoothstep(dGrid.x * 1.5, 0.0, gridDist.x),
        smoothstep(dGrid.y * 1.5, 0.0, gridDist.y)
    );
    
    // Invert because min/smoothstep above creates "holes", we want lines
    float gridPattern = 1.0 - min(
        smoothstep(0.0, dGrid.x * 1.5, gridDist.x),
        smoothstep(0.0, dGrid.y * 1.5, gridDist.y)
    );
    // Actually the above math is tricky. Let's stick to standard anti-aliased grid technique:
    // https://madebyevan.com/shaders/grid/
    
    vec2 coord = gridPos;
    vec2 derivative = fwidth(coord);
    vec2 grid = abs(fract(coord - 0.5) - 0.5) / derivative;
    float lineW = min(grid.x, grid.y);
    float gridAlpha = 1.0 - min(lineW, 1.0);


    // 2. Color Logic
    vec3 color = uColorGrid;
    
    // 3. Elevation Height Color
    // Peaks turn White/Cyan
    float peakFactor = smoothstep(5.0, 25.0, vElevation);
    color = mix(color, vec3(1.0), peakFactor * 0.5);

    // 4. Alpha / Visibility
    float alpha = gridAlpha;

    // Enhance Alpha on peaks
    alpha = max(alpha, peakFactor * 0.2); 

    // 5. Distance Fade (Fog)
    // Fade out far distance (Top of UV, y=0)
    float distanceFade = smoothstep(0.0, 0.2, vUv.y);
    // Circle Vignette fade
    float vignette = 1.0 - smoothstep(0.0, 0.8, distance(vUv - 0.5, vec2(0.3, 0.0))); 

    alpha *= distanceFade;

    // 5. User Interaction: SEARCHLIGHT / SONAR
    // Project mouse to worldish space?
    // Passed uMouse is (x, y, 0) at Z=0 plane.
    // vWorldPosition is actual 3D point.
    // Terrain is at Y=-25.
    // We want the light to act like a column from the mouse (infinite Z) or a point?
    // Let's treat uMouse as a column source (X, Y) and check horizontal distance.
    
    // Convert uMouse X/Y (View Center relative) to match World X/Y roughly
    // This is an approximation.
    float distToMouse = distance(vWorldPosition.xy, uMouse.xy);
    
    // Light Radius
    float cursorRadius = 60.0;
    float cursorGlow = 1.0 - smoothstep(0.0, cursorRadius, distToMouse);
    cursorGlow = max(0.0, cursorGlow);
    
    // Intensity
    cursorGlow = pow(cursorGlow, 2.0) * 0.8; // Reduced from 1.5 (Too bright)

    // Add Cursor Glow to Alpha and Color
    vec3 cursorColor = vec3(0.8, 0.9, 1.0); // Slightly bluish white, less harsh
    
    color = mix(color, cursorColor, cursorGlow * 0.3); // Reduced mix (was 0.5)
    alpha += cursorGlow * 0.2; // Reduced alpha reveal (was 0.4)

    gl_FragColor = vec4(color, alpha * 0.8);
}
