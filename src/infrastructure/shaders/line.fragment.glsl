uniform vec3 uColor;
uniform float uOpacity; // Boot Fade
uniform float uProgress;

void main() {
    float alpha = uOpacity * 0.4; // Base opacity 0.4
    gl_FragColor = vec4(uColor, alpha * uProgress);
}
