import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";

const earthMap = "https://cdn.jsdelivr.net/gh/rodlukas/earth-textures@master/2_no_clouds_4k.jpg";
const earthBump = "https://cdn.jsdelivr.net/gh/rodlukas/earth-textures@master/elev_bumps_4k.jpg";
const earthSpec = "https://cdn.jsdelivr.net/gh/rodlukas/earth-textures@master/water_4k.jpg";
const cloudsMap = "https://cdn.jsdelivr.net/gh/rodlukas/earth-textures@master/fair_clouds_4k.png";

type Market = { name: string; lat: number; lon: number };
const MARKETS: Market[] = [
  { name: "France", lat: 46.2, lon: 2.2 },
  { name: "Monaco", lat: 43.7, lon: 7.4 },
  { name: "Spain", lat: 40.4, lon: -3.7 },
  { name: "United Kingdom", lat: 51.5, lon: -0.1 },
  { name: "United States", lat: 38.9, lon: -77.0 },
  { name: "UAE", lat: 24.5, lon: 54.4 },
  { name: "Vietnam", lat: 16.0, lon: 108.0 },
  { name: "Hong Kong", lat: 22.3, lon: 114.2 },
  { name: "Singapore", lat: 1.3, lon: 103.8 },
  { name: "Thailand", lat: 13.8, lon: 100.5 },
  { name: "Indonesia", lat: -6.2, lon: 106.8 },
  { name: "Japan", lat: 35.7, lon: 139.7 },
  { name: "Switzerland", lat: 46.8, lon: 8.2 },
  { name: "Italy", lat: 41.9, lon: 12.5 },
  { name: "Australia", lat: -33.9, lon: 151.2 },
];

function latLonToVector(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function Connection({ from, to }: { from: Market; to: Market }) {
  const points = useMemo(() => {
    const start = latLonToVector(from.lat, from.lon, 1.53);
    const end = latLonToVector(to.lat, to.lon, 1.53);
    const midpoint = start.clone().add(end).normalize().multiplyScalar(1.78);
    const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end);
    return curve.getPoints(36);
  }, [from, to]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points);
    return g;
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#ff4fb3" transparent opacity={0.72} />
    </line>
  );
}

function GlobeScene() {
  const [earth, bump, _specular, clouds] = useTexture([earthMap, earthBump, earthSpec, cloudsMap]);
  const globeRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [dragging, setDragging] = useState(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const velocity = useRef(new THREE.Vector2(0, 0));

  useFrame((_, delta) => {
    if (!globeRef.current) return;
    if (!dragging) globeRef.current.rotation.y += delta * 0.055;
    globeRef.current.rotation.y += velocity.current.x * delta;
    globeRef.current.rotation.x = THREE.MathUtils.clamp(globeRef.current.rotation.x + velocity.current.y * delta, -0.55, 0.55);
    velocity.current.multiplyScalar(0.92);
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.012;
  });

  const pointerDown = useCallback((e: any) => {
    setDragging(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };
    e.stopPropagation();
  }, []);

  const pointerMove = useCallback((e: any) => {
    if (!dragging) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    velocity.current.set(-dx * 0.004, -dy * 0.002);
    lastPointer.current = { x: e.clientX, y: e.clientY };
  }, [dragging]);

  const pointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  return (
    <group ref={globeRef} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerLeave={pointerUp}>
      <mesh>
        <sphereGeometry args={[1.5, 128, 128]} />
        <meshStandardMaterial map={earth} bumpMap={bump} bumpScale={0.045} roughness={0.82} metalness={0.02} />
      </mesh>

      <mesh ref={cloudsRef} scale={1.012}>
        <sphereGeometry args={[1.5, 128, 128]} />
        <meshStandardMaterial map={clouds} transparent opacity={0.32} depthWrite={false} />
      </mesh>

      <mesh scale={1.045}>
        <sphereGeometry args={[1.5, 96, 96]} />
        <meshBasicMaterial color="#59baff" side={THREE.BackSide} transparent opacity={0.11} blending={THREE.AdditiveBlending} />
      </mesh>

      {MARKETS.slice(1).map((market) => (
        <Connection key={market.name} from={MARKETS[0]} to={market} />
      ))}

      {MARKETS.map((market) => {
        const position = latLonToVector(market.lat, market.lon, 1.56);
        return (
          <group key={market.name} position={position}>
            <mesh>
              <sphereGeometry args={[0.028, 16, 16]} />
              <meshBasicMaterial color="#ff4fb3" />
            </mesh>
            <mesh scale={1.8}>
              <sphereGeometry args={[0.028, 12, 12]} />
              <meshBasicMaterial color="#ff4fb3" transparent opacity={0.18} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function EarthGlobe({ className = "" }: { className?: string }) {
  useEffect(() => {
    document.documentElement.style.setProperty("--xr-globe-ready", "1");
    return () => document.documentElement.style.removeProperty("--xr-globe-ready");
  }, []);

  return (
    <div className={`relative aspect-square w-full ${className}`}>
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,75,179,.22),transparent_25%),radial-gradient(circle_at_70%_72%,rgba(55,190,255,.2),transparent_32%)] blur-3xl" />
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.2], fov: 42 }} gl={{ antialias: true, alpha: true }} style={{ position: "relative", width: "100%", height: "100%", cursor: "grab" }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 4, 5]} intensity={2.2} />
        <directionalLight position={[-4, -2, -5]} intensity={0.45} color="#5bbcff" />
        <Stars radius={60} depth={40} count={900} factor={2.5} saturation={0} fade speed={0.25} />
        <GlobeScene />
      </Canvas>
      <div className="pointer-events-none absolute bottom-[4%] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
        15 marchés · réseau mondial · glisser pour explorer
      </div>
    </div>
  );
}
