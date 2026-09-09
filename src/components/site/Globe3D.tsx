// src/components/site/Globe3D.tsx
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Convert latitude/longitude to 3D vector on sphere
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

// Marker for a city/location
function Marker({ name, lat, lng, radius }: { name: string; lat: number; lng: number; radius: number }) {
  const pos = useMemo(() => latLngToVector3(lat, lng, radius + 0.02), [lat, lng, radius]);
  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" />
      </mesh>
      <Html distanceFactor={10} style={{ color: "var(--foreground)", fontSize: "0.6rem", pointerEvents: "none" }}>
        {name}
      </Html>
    </group>
  );
}

export default function Globe3D({ className }: { className?: string }) {
  const earthRef = useRef<THREE.Mesh>(null!);
  const [colorMap] = useTexture(["/src/assets/earth_texture.jpg"]);

  // Subtle auto‑rotation
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0005;
    }
  });

  const locations = useMemo(
    () => [
      { name: "Paris", lat: 48.8566, lng: 2.3522 },
      { name: "Marseille", lat: 43.2965, lng: 5.3698 },
      { name: "Lyon", lat: 45.764, lng: 4.8357 },
      { name: "Bordeaux", lat: 44.8378, lng: -0.5792 },
      { name: "Dubai", lat: 25.2048, lng: 55.2708 },
      { name: "New York", lat: 40.7128, lng: -74.006 },
      { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
    ],
    []
  );

  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 2.5], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      frameloop="demand"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 3, 5]} intensity={0.8} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={colorMap} metalness={0.2} roughness={0.7} />
      </mesh>
      {locations.map((loc) => (
        <Marker key={loc.name} name={loc.name} lat={loc.lat} lng={loc.lng} radius={1} />
      ))}
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
    </Canvas>
  );
}

