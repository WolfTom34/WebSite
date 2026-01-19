varying vec3 vColor;
varying float vPulse; // Added
uniform float uProgress;

void main() {
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    if (r > 1.0) discard;
    
    // SOFT HALO (Neural Glow)
    float delta = fwidth(r);
    float alphaShape = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
    
    // Inner Glow (Hot Core)
    float core = 1.0 - smoothstep(0.3, 0.8, r);

    // Dynamic Alpha based on Pulse
    // Determine brightness: vPulse goes 0.0 -> 2.0 (excited)
    float brightness = 0.5 + vPulse * 0.5;

    // Hot White Core mixed with Base Color
    vec3 finalColor = mix(vColor, vec3(1.0), core * vPulse * 0.5);

    // Boot fade in multiplication
    gl_FragColor = vec4(finalColor, alphaShape * brightness * uProgress);
}
