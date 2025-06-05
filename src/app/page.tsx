"use client";

import React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import Nebula from "../components/Nebula";
import StarField from "../components/Starfield";

function EarthMesh() {
  const ref = React.useRef<THREE.Mesh>(null);
  const map = useLoader(THREE.TextureLoader, "/textures/earth-daymap-4k.jpg");

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });
  
  return (
    <group rotation-z={THREE.MathUtils.degToRad(-23.5)}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.5, 32]} />
        <meshStandardMaterial map={map} />
      </mesh>
    </group>
  );
}

export default function App() {

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
    <Canvas gl={{toneMapping: THREE.NoToneMapping}}>
      <EarthMesh />
      <hemisphereLight args={[0xffffff, 0x000000, 3.0]} />
      <Nebula />
      <StarField />
      <OrbitControls />
    </Canvas>
    </div>
  );
}
