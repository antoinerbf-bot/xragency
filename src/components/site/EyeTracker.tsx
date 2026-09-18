import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";

function Leaf() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-2.7, 0);
    shape.bezierCurveTo(-1.6, 1.35, 1.55, 1.25, 2.9, 0);
    shape.bezierCurveTo(1.45, -1.1, -1.5, -1.05, -2.7, 0);
    return new THREE.ShapeGeometry(shape, 18);
  }, []);

  return (
    <group rotation={[0.05, 0.08, -0.12]} position={[0, -1.35, 0]}>
      <mesh geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial
          color="#173d2d"
          roughness={0.58}
          metalness={0.04}
          clearcoat={0.18}
        />
      </mesh>
      <mesh position={[0, 0.02, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[5.1, 0.018, 0.025]} />
        <meshStandardMaterial color="#6d9a70" roughness={0.7} />
      </mesh>
    </group>
  );
}

function Tail() {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.15, -0.3, 0),
        new THREE.Vector3(-0.85, -0.55, 0.05),
        new THREE.Vector3(-1.55, -0.32, 0.12),
        new THREE.Vector3(-1.72, 0.28, 0.08),
        new THREE.Vector3(-1.25, 0.72, 0),
        new THREE.Vector3(-0.72, 0.62, -0.08),
      ]),
    [],
  );

  return (
    <mesh geometry={new THREE.TubeGeometry(curve, 32, 0.18, 12, false)}>
      <meshPhysicalMaterial
        color="#2f8f69"
        roughness={0.34}
        metalness={0.02}
        clearcoat={0.55}
        iridescence={0.25}
        iridescenceIOR={1.35}
      />
    </mesh>
  );
}

function Chameleon({ pointer }: { pointer: MutableRefObject<THREE.Vector2> }) {
  const root = useRef<THREE.Group>(null);
  const leftEye = useRef<THREE.Group>(null);
  const rightEye = useRef<THREE.Group>(null);
  const tongue = useRef<THREE.Mesh>(null);

  const scales = useMemo(() => {
    const points: [number, number, number][] = [];
    for (let i = 0; i < 70; i += 1) {
      const t = i / 69;
      const x = -0.95 + t * 1.85;
      const radius = 0.48 - Math.abs(t - 0.52) * 0.2;
      const rows = i % 5;
      const y = (rows - 2) * 0.16;
      const z = Math.sqrt(Math.max(0.01, radius * radius - y * y)) * 0.72;
      points.push([x, y, z]);
    }
    return points;
  }, []);

  useFrame((state) => {
    if (!root.current) return;
    const p = pointer.current;
    const time = state.clock.elapsedTime;
    const hunting = Math.hypot(p.x, p.y) < 0.35;
    const pounce = Math.hypot(p.x, p.y) < 0.16;

    root.current.rotation.y += ((p.x * 0.5) - root.current.rotation.y) * 0.055;
    root.current.rotation.x += ((-p.y * 0.18) - root.current.rotation.x) * 0.055;
    root.current.position.x += ((p.x * (pounce ? 0.48 : hunting ? 0.22 : 0.12)) - root.current.position.x) * 0.055;
    root.current.position.y += ((-p.y * (pounce ? 0.26 : hunting ? 0.12 : 0.07)) - root.current.position.y) * 0.055;
    root.current.position.y += Math.sin(time * 1.7) * 0.002;

    const eyeTurn = p.x * 0.9;
    const eyeTilt = -p.y * 0.55;
    if (leftEye.current) {
      leftEye.current.rotation.y += (eyeTurn - leftEye.current.rotation.y) * 0.11;
      leftEye.current.rotation.x += (eyeTilt - leftEye.current.rotation.x) * 0.11;
    }
    if (rightEye.current) {
      rightEye.current.rotation.y += (eyeTurn - rightEye.current.rotation.y) * 0.11;
      rightEye.current.rotation.x += (eyeTilt - rightEye.current.rotation.x) * 0.11;
    }
    if (tongue.current) {
      tongue.current.scale.x += ((pounce ? 4.8 : hunting ? 1.7 : 0.05) - tongue.current.scale.x) * 0.14;
      tongue.current.position.z = 0.55 + Math.sin(time * 8) * (pounce ? 0.025 : 0);
    }
  });

  const bodyMaterial = {
    color: "#24956d",
    roughness: 0.3,
    metalness: 0.02,
    clearcoat: 0.62,
    clearcoatRoughness: 0.2,
    iridescence: 0.3,
    iridescenceIOR: 1.38,
  };

  return (
    <group ref={root} scale={1.05}>
      <mesh position={[0, -0.1, 0]} scale={[1.25, 0.58, 0.52]}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshPhysicalMaterial {...bodyMaterial} />
      </mesh>

      <mesh position={[0.9, 0.12, 0.02]} scale={[0.7, 0.48, 0.46]}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshPhysicalMaterial {...bodyMaterial} />
      </mesh>

      <mesh position={[1.38, 0.2, 0.02]} scale={[0.48, 0.39, 0.38]}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshPhysicalMaterial color="#2b9f75" roughness={0.28} clearcoat={0.7} iridescence={0.35} />
      </mesh>

      <Tail />

      {scales.map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z + 0.08]} rotation={[0.25, 0, 0]} scale={0.045 + (index % 3) * 0.008}>
          <icosahedronGeometry args={[1, 2]} />
          <meshPhysicalMaterial color={index % 4 === 0 ? "#66c58d" : "#1c7659"} roughness={0.42} clearcoat={0.25} />
        </mesh>
      ))}

      {([-0.48, 0.48] as const).map((x, i) => (
        <group key={x} position={[1.22 + x * 0.3, 0.48, x * 0.22]} ref={i === 0 ? leftEye : rightEye}>
          <mesh scale={[0.23, 0.23, 0.18]}>
            <sphereGeometry args={[1, 32, 24]} />
            <meshPhysicalMaterial color="#d6a62e" roughness={0.2} clearcoat={0.55} />
          </mesh>
          <mesh position={[0, 0, 0.18]} scale={0.075}>
            <sphereGeometry args={[1, 24, 18]} />
            <meshStandardMaterial color="#111" roughness={0.18} />
          </mesh>
        </group>
      ))}

      <mesh position={[1.7, 0.05, 0.04]} rotation={[0, 0, -0.1]}>
        <sphereGeometry args={[0.22, 24, 18]} />
        <meshPhysicalMaterial color="#328d66" roughness={0.35} clearcoat={0.5} />
      </mesh>

      <mesh ref={tongue} position={[1.92, 0.02, 0.56]} scale={[0.05, 0.018, 0.018]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="#d66f83" roughness={0.4} />
      </mesh>

      <mesh position={[0.1, 0.08, 0.51]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.7, 0.08]} />
        <meshBasicMaterial color="#86c78e" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function Scene() {
  const pointer = useRef(new THREE.Vector2(0, 0));

  useFrame(({ pointer: p }) => {
    pointer.current.lerp(new THREE.Vector2(p.x, p.y), 0.08);
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 5, 4]} intensity={3.2} />
      <pointLight position={[-3, 1, 2]} intensity={18} distance={8} color="#7cf0b0" />
      <pointLight position={[3, 0, 1]} intensity={10} distance={7} color="#d7a7ff" />
      <Leaf />
      <Chameleon pointer={pointer} />
    </>
  );
}

export function EyeTracker({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`relative h-full w-full overflow-visible ${className}`} aria-label="Interactive 3D chameleon">
      {mounted && <Canvas
        dpr={[1, 1.7]}
        camera={{ position: [0, 0.2, 5.4], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>}
    </div>
  );
}
