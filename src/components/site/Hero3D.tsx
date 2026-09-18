import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Avatar() {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      target.current.x = (event.clientX / window.innerWidth - 0.5) * 0.55;
      target.current.y = (event.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  useFrame((state) => {
    if (!group.current) return;
    const scroll = window.scrollY;
    group.current.rotation.y += (target.current.x + scroll * 0.00012 - group.current.rotation.y) * 0.045;
    group.current.rotation.x += (-target.current.y - group.current.rotation.x) * 0.045;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.12 - Math.min(scroll / 1800, 0.5);
  });
  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.48, 32, 32]} />
          <MeshTransmissionMaterial color="#d8fff7" roughness={0.18} thickness={0.5} transmission={0.65} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <capsuleGeometry args={[0.48, 0.9, 8, 24]} />
          <meshStandardMaterial color="#8bd8ca" metalness={0.55} roughness={0.22} />
        </mesh>
        <mesh position={[-0.68, 0.05, 0]} rotation={[0, 0, -0.2]}>
          <capsuleGeometry args={[0.13, 0.72, 6, 16]} />
          <meshStandardMaterial color="#8bd8ca" metalness={0.45} roughness={0.25} />
        </mesh>
        <mesh position={[0.68, 0.05, 0]} rotation={[0, 0, 0.2]}>
          <capsuleGeometry args={[0.13, 0.72, 6, 16]} />
          <meshStandardMaterial color="#8bd8ca" metalness={0.45} roughness={0.25} />
        </mesh>
        <mesh position={[-0.22, -0.98, 0]}>
          <capsuleGeometry args={[0.16, 0.82, 6, 16]} />
          <meshStandardMaterial color="#5aa99c" metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh position={[0.22, -0.98, 0]}>
          <capsuleGeometry args={[0.16, 0.82, 6, 16]} />
          <meshStandardMaterial color="#5aa99c" metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh position={[-0.17, 1.27, 0.4]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#0b1618" />
        </mesh>
        <mesh position={[0.17, 1.27, 0.4]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#0b1618" />
        </mesh>
      </Float>
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
    <div className="pointer-events-none absolute inset-0 z-[1] opacity-70 sm:opacity-80" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.25, 6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <pointLight position={[-3, 1, 3]} intensity={2} color="#7dd3c0" />
        <Avatar />
      </Canvas>
    </div>
  );
}
