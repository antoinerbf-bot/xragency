import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Component, Suspense, type ErrorInfo, type ReactNode } from "react";
import { useRef } from "react";
import * as THREE from "three";

const MODEL = "https://threejs.org/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb";

class Alexandre3DErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {\n  state = { hasError: false };\n  static getDerivedStateFromError() { return { hasError: true }; }\n  componentDidCatch(_error: Error, _info: ErrorInfo) {}\n  render() { return this.state.hasError ? null : this.props.children; }\n}\n\nfunction AlexandreModel() {
  const { scene } = useGLTF(MODEL);
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.16;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.035;
  });

  return (
    <group ref={ref} scale={0.82} rotation={[0, Math.PI, 0]}>
      <primitive object={scene.clone(true)} />
      <mesh position={[0, 0.05, -0.02]} rotation={[Math.PI / 2.1, 0.1, 0]}>
        <torusGeometry args={[1.12, 0.014, 12, 128]} />
        <meshStandardMaterial color="#ffffff" emissive="#9ff3e2" emissiveIntensity={1.2} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

export function Alexandre3D({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none relative h-24 w-24 shrink-0 sm:h-28 sm:w-28 ${className}`} aria-hidden>
      <Alexandre3DErrorBoundary>\n        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3.6], fov: 34 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 4]} intensity={3.2} />
        <pointLight position={[-2, 1, 2]} intensity={1.8} color="#8ff1df" />
        <Environment preset="studio" />
        <Suspense fallback={null}>
          <AlexandreModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL);
