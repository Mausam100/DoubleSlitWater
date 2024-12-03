precision mediump float;

uniform vec2 u_resolution; // Canvas resolution
uniform float u_time;      // Time for animation
uniform vec2 u_slit1;      // Position of slit 1
uniform vec2 u_slit2;      // Position of slit 2

varying vec2 vUv;

void main() {
    // Normalize UV to [-1, 1] for screen coordinates
    vec2 uv = vUv * 2.0 - 1.0;

    // Flip Y-axis to start ripples from the bottom
    uv.y *= -1.0;

    // Calculate distances from slits
    float d1 = length(uv - u_slit1);
    float d2 = length(uv - u_slit2);

    // Generate dynamic wave patterns based on distances
    float wave1 = sin(d1 * 30.0 - u_time * 3.0); // Faster propagation
    float wave2 = sin(d2 * 30.0 - u_time * 3.0);

    // Combine waves for interference
    float interference = wave1 + wave2;

    // Map interference to a water-like color
    vec3 color = vec3(0.3, 0.5, 1.0) * (0.5 + 0.5 * sin(interference));

    gl_FragColor = vec4(color, 1.0);
}
