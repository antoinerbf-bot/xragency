import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function PremiumForm() {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      target.current.x = (event.clientX / window.innerWidth - 0.5) * 0.8;
      target.current.y = (event.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const scroll = window.scrollY;
    const t = state.clock.elapsedTime;
    group.current.rotation.y += (target.current.x + scroll * 0.00018 - group.current.rotation.y) * 0.035;
    group.current.rotation.x += (-target.current.y + Math.sin(t * 0.45) * 0.08 - group.current.rotation.x) * 0.035;
    group.current.rotation.z += (Math.sin(t * 0.3) * 0.08 - group.current.rotation.z) * 0.025;
    group.current.position.y = Math.sin(t * 0.65) * 0.18 - Math.min(scroll / 1900, 0.45);
  });

  return (
    <group ref={group}>
      <mesh scale={[1.15, 1.15, 1.15]}>
        <icosahedronGeometry args={[1.15, 5]} />
        <meshPhysicalMaterial
          color="#d9fff7"
          roughness={0.12}
          metalness={0.45}
          transmission={0.42}
          thickness={1.1}
          clearcoat={1}
          clearcoatRoughness={0.08}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh scale={[1.42, 1.42, 1.42]} rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[1.18, 0.018, 16, 160]} />
        <meshStandardMaterial color="#8bd8ca" emissive="#8bd8ca" emissiveIntensity={1.8} />
      </mesh>
      <mesh scale={[1.18, 1.18, 1.18]} rotation={[1.05, -0.4, 0.35]}>
        <torusGeometry args={[1.22, 0.012, 12, 160]} />
        <meshStandardMaterial color="#ffffff" emissive="#b7fff2" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0.1, 0.1, 1.05]} scale={0.12}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

export function Hero3D() {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduced);
  }, []);
  if (!enabled) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] opacity-55 sm:opacity-70" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.15, 6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={2.4} />
        <pointLight position={[-3, 1, 3]} intensity={2.2} color="#7dd3c0" />
        <pointLight position={[3, -2, 2]} intensity={1.2} color="#ffffff" />
        <PremiumForm />
      </Canvas>
    </div>
  );
}
