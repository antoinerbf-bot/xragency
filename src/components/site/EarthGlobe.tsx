// src/components/site/EarthGlobe.tsx
import { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, Stars, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

// ----- Textures (public domain NASA high‑res) -----
const earthMap = "https://cdn.jsdelivr.net/gh/rodlukas/earth-textures@master/2_no_clouds_4k.jpg";
const earthBump = "https://cdn.jsdelivr.net/gh/rodlukas/earth-textures@master/elev_bumps_4k.jpg";
const earthSpec = "https://cdn.jsdelivr.net/gh/rodlukas/earth-textures@master/water_4k.jpg";
const cloudsMap = "https://cdn.jsdelivr.net/gh/rodlukas/earth-textures@master/fair_clouds_4k.png";

type City = { name: string; lat: number; lon: number };
const CITIES: City[] = [
  // France (20 cities)
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Marseille", lat: 43.2965, lon: 5.3698 },
  { name: "Lyon", lat: 45.7640, lon: 4.8357 },
  { name: "Toulouse", lat: 43.6047, lon: 1.4442 },
  { name: "Nice", lat: 43.7102, lon: 7.2620 },
  { name: "Bordeaux", lat: 44.8378, lon: -0.5792 },
  { name: "Nantes", lat: 47.2184, lon: -1.5536 },
  { name: "Montpellier", lat: 43.6108, lon: 3.8777 },
  { name: "Strasbourg", lat: 48.5734, lon: 7.7521 },
  { name: "Lille", lat: 50.6292, lon: 3.0573 },
  { name: "Rennes", lat: 48.1173, lon: -1.6778 },
  { name: "Grenoble", lat: 45.1885, lon: 5.7245 },
  { name: "Rouen", lat: 49.4432, lon: 1.0999 },
  { name: "Toulon", lat: 43.1242, lon: 5.9280 },
  { name: "Reims", lat: 49.2583, lon: 4.0317 },
  { name: "Saint‑Étienne", lat: 45.4397, lon: 4.3870 },
  { name: "Le Havre", lat: 49.4944, lon: 0.1079 },
  { name: "Dijon", lat: 47.3220, lon: 5.0415 },
  { name: "Angers", lat: 47.4784, lon: -0.5632 },
  { name: "Clermont‑Ferrand", lat: 45.7772, lon: 3.0870 },
  // International
  { name: "Dubai", lat: 25.2048, lon: 55.2708 },
  { name: "New York", lat: 40.7128, lon: -74.0060 },
];

function latLonToVec3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Globe({ autoRotate }: { autoRotate: boolean }) {
  const [earthMapTex, earthBumpTex, earthSpecTex, cloudsTex] = useTexture([
    earthMap,
    earthBump,
    earthSpec,
    cloudsMap,
  ]);

  const globeRef = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);
  const { camera, gl } = useThree();
  const radius = 1.5;

  const [isUserInteracting, setUserInteracting] = useState(false);
  const velocity = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  useFrame((_, delta) => {
    if (autoRotate && !isUserInteracting) {
      globeRef.current.rotation.y += 0.02 * delta;
    }
    if (velocity.current.lengthSq() > 0.000001) {
      globeRef.current.rotation.y += velocity.current.x * delta;
      globeRef.current.rotation.x += velocity.current.y * delta;
      velocity.current.multiplyScalar(0.95);
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.005 * delta;
    }
  });

  const onPointerDown = useCallback((e: THREE.PointerEvent) => {
    setUserInteracting(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };
  }, []);
  const onPointerMove = useCallback((e: THREE.PointerEvent) => {
    if (!isUserInteracting || !lastPointer.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    const factor = 0.001;
    velocity.current.set(-dx * factor, -dy * factor);
    lastPointer.current = { x: e.clientX, y: e.clientY };
  }, [isUserInteracting]);
  const onPointerUp = useCallback(() => {
    setUserInteracting(false);
    lastPointer.current = null;
  }, []);

  // Resize camera on window resize
  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      gl.setSize(innerWidth, innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [camera, gl]);

  return (
    <>
      {/* Earth */}
      <mesh
        ref={globeRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerUp}
      >
        <sphereGeometry args={[radius, 96, 96]} />
        <meshStandardMaterial
          map={earthMapTex}
          bumpMap={earthBumpTex}
          bumpScale={0.05}
          metalness={0}
          roughness={1}
          specularMap={earthSpecTex}
          specular={new THREE.Color("gray")}
        />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudsRef} visible={typeof window !== "undefined" && window.innerWidth > 768}>
        <sphereGeometry args={[radius + 0.015, 96, 96]} />
        <meshStandardMaterial map={cloudsTex} transparent opacity={0.4} depthWrite={false} />
      </mesh>

      {/* Atmosphere – subtle glow */}
      <mesh>
        <sphereGeometry args={[radius + 0.04, 96, 96]} />
        <meshBasicMaterial
          color="#88c5ff"
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* City markers */}
      {CITIES.map((city, idx) => {
        const pos = latLonToVec3(city.lat, city.lon, radius + 0.06);
        return (
          <group key={idx} position={pos}>
            <mesh>
              <sphereGeometry args={[0.015, 8, 8]} />
              <meshBasicMaterial color="#fff" />
            </mesh>
            <Html distanceFactor={10} style={{ pointerEvents: "none" }}>
              <div className="label-mono text-xs text-foreground bg-card/80 px-1 rounded">
                {city.name}
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}

export default function EarthGlobe({ className }: { className?: string }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />
        <Globe autoRotate={!isMobile} />
      </Canvas>
    </div>
  );
}
