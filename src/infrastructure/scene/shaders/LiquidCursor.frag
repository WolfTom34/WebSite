varying vec2 vUv;
uniform float uTime;
uniform float uIntensity;
uniform float uDistortion;

// Colors
const vec3 COLOR_CORE = vec3(0.8, 0.8, 0.8); // Titanium
const vec3 COLOR_SHELL = vec3(0.0, 0.82, 1.0); // Plasma Blue (#00D1FF)

// SDF for a Circle
float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

// Noise for liquid edge distortion
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    // Center UVs to -1.0 to 1.0
    vec2 uv = vUv * 2.0 - 1.0;
    
    // Add subtle organic noise to the edge
    float n = noise(uv * 5.0 + uTime * 2.0) * 0.05 * uDistortion;
    
    // Core SDF
    float dist = sdCircle(uv, 0.4 + n);
    
    // Soften edges for the Glow/Shell
    // Core (Hard opaque center)
    float coreAlpha = smoothstep(0.02, 0.0, dist);
    
    // Shell (Soft glow)
    float shellAlpha = smoothstep(0.5, 0.0, dist);
    
    // Mixing Colors
    vec3 color = mix(COLOR_SHELL * 2.0, COLOR_CORE, coreAlpha); // Shell is HDR (intensity > 1) to bloom
    
    // Add inner specular highlight for Titanium feel
    float highlight = smoothstep(0.3, 0.35, 1.0 - length(uv - vec2(0.15, 0.15)));
    color += vec3(1.0) * highlight * coreAlpha * 0.5;

    // Final Alpha
    float alpha = shellAlpha * uIntensity;

    gl_FragColor = vec4(color, alpha);
}
