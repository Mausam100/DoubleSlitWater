import React, { useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Import shaders
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

// Create custom ShaderMaterial
const WaterRippleMaterial = shaderMaterial(
  {
    u_time: 0,
    u_resolution: new THREE.Vector2(),
    u_slit1: new THREE.Vector2(-0.15, 0.9), // Slit 1 position
    u_slit2: new THREE.Vector2(0.3, 0.9),  // Slit 2 position
  },
  vertexShader,
  fragmentShader
);

// Extend the material to make it available in the JSX
extend({ WaterRippleMaterial });

function WaterRipplePlane() {
  const materialRef = useRef();

  useFrame(({ clock, viewport }) => {
    if (materialRef.current) {
      materialRef.current.u_time = clock.getElapsedTime();
      materialRef.current.u_resolution.set(viewport.width, viewport.height);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[8, 8]} />
      <waterRippleMaterial ref={materialRef} />
    </mesh>
  );
}

export default function App() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas className="w-full h-full">
        <WaterRipplePlane />
      </Canvas>
    </div>
  );
}
