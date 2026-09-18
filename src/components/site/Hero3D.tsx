import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const HEAD_MODEL =
  "https://threejs.org/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb";

function RealisticHeroObject() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(HEAD_MODEL);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const material = child.material as THREE.MeshStandardMaterial;
        if (material) {
          material.metalness = 0.72;
          material.roughness = 0.16;
          material.envMapIntensity = 2.2;
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      target.current.x = (event.clientX / window.innerWidth - 0.5) * 0.55;
      target.current.y = (event.clientY / window.innerHeight - 0.5) * 0.32;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const scroll = Math.min(window.scrollY, 1800);
    group.current.rotation.y +=
      (target.current.x + Math.sin(t * 0.28) * 0.06 - group.current.rotation.y) * 0.035;
    group.current.rotation.x +=
      (-target.current.y + Math.sin(t * 0.4) * 0.025 - group.current.rotation.x) * 0.035;
    group.current.position.y +=
      (Math.sin(t * 0.65) * 0.12 - scroll * 0.00016 - group.current.position.y) * 0.025;
  });

  return (
    <group ref={group} position={[0.45, 0, 0]} scale={1.8}>
      <primitive object={scene.clone(true)} rotation={[0, Math.PI, 0]} />
      <mesh rotation={[Math.PI / 2.1, 0.1, 0]} position={[0, 0.1, -0.02]}>
        <torusGeometry args={[1.18, 0.018, 16, 160]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#b9fff3"
          emissiveIntensity={1.1}
          metalness={0.8}
          roughness={0.18}
        />
      </mesh>
    </group>
  );
}

function HeroFallback() {
  return (
    <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.2}>
      <mesh scale={1.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#dffaf4"
          metalness={0.8}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.04}
        />
      </mesh>
    </Float>
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
    <div
      className="pointer-events-none absolute inset-0 z-[1] opacity-70 sm:opacity-85"
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.05, 5.2], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <ambientLight intensity={0.45} />
        <spotLight
          position={[3, 5, 5]}
          intensity={7}
          angle={0.32}
          penumbra={0.7}
          castShadow
        />
        <pointLight position={[-3, 1, 3]} intensity={4} color="#8ff1df" />
        <pointLight position={[3, -2, 2]} intensity={2.2} color="#ffffff" />
        <Environment preset="studio" />
        <Suspense fallback={<HeroFallback />}>
          <RealisticHeroObject />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(HEAD_MODEL);
