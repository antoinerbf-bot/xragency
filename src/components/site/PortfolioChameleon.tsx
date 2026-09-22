import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Chameleon({ cursor }: { cursor: THREE.Vector3 }) {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const tongue = useRef<THREE.Mesh>(null);
  const tongueMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const [striking, setStriking] = useState(false);
  const strike = useRef(0);
  const nextStrike = useRef(2.8 + Math.random() * 2.5);

  const tail = useMemo(() => {
    const points = [
      new THREE.Vector3(-0.75, -0.02, 0),
      new THREE.Vector3(-1.45, -0.12, -0.05),
      new THREE.Vector3(-2.05, 0.05, 0.02),
      new THREE.Vector3(-2.42, 0.42, 0.06),
      new THREE.Vector3(-2.28, 0.85, 0.08),
    ];
    return new THREE.CatmullRomCurve3(points);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!striking) {
        setStriking(true);
        strike.current = 0;
      }
    }, 5200 + Math.random() * 2400);
    return () => window.clearInterval(timer);
  }, [striking]);

  useFrame((state, delta) => {
    if (!group.current || !head.current || !tongue.current) return;

    const t = state.clock.elapsedTime;
    group.current.rotation.z = Math.sin(t * 0.7) * 0.025;
    group.current.position.y = Math.sin(t * 1.1) * 0.035;

    const dx = cursor.x - head.current.position.x;
    const dy = cursor.y - head.current.position.y;
    const angle = Math.atan2(dy, dx);
    head.current.rotation.z = THREE.MathUtils.lerp(head.current.rotation.z, angle * 0.22, 1 - Math.pow(0.001, delta));

    if (striking) {
      strike.current += delta;
      const p = strike.current / 0.72;
      const extension = p < 0.28 ? p / 0.28 : p < 0.62 ? 1 : 1 - (p - 0.62) / 0.38;
      tongue.current.scale.x = Math.max(0, extension);
      tongue.current.position.x = 0.55 + extension * 0.95;
      if (tongueMaterial.current) tongueMaterial.current.opacity = Math.max(0, extension);
      if (p >= 1) {
        setStriking(false);
        tongue.current.scale.x = 0;
        tongue.current.position.x = 0.55;
      }
    }

    nextStrike.current -= delta;
    if (nextStrike.current <= 0 && !striking) {
      nextStrike.current = 3.8 + Math.random() * 4.5;
      setStriking(true);
      strike.current = 0;
    }
  });

  return (
    <group ref={group} rotation={[0.08, -0.12, 0]}>
      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.22}>
        <mesh position={[-0.15, 0, 0]} castShadow>
          <capsuleGeometry args={[0.42, 1.55, 10, 20]} />
          <MeshTransmissionMaterial
            transmission={0.12}
            thickness={0.5}
            roughness={0.28}
            metalness={0.05}
            color="#6f8b2e"
          />
        </mesh>

        <mesh position={[0.62, 0.12, 0]} scale={[0.72, 0.62, 0.68]} castShadow>
          <sphereGeometry args={[0.58, 32, 20]} />
          <meshStandardMaterial color="#829d37" roughness={0.3} metalness={0.08} />
        </mesh>

        <group ref={head} position={[0.9, 0.2, 0]}>
          <mesh scale={[0.92, 0.78, 0.75]} castShadow>
            <sphereGeometry args={[0.58, 32, 20]} />
            <meshStandardMaterial color="#8fae42" roughness={0.26} metalness={0.08} />
          </mesh>

          <mesh position={[0.34, 0.26, 0.38]} castShadow>
            <sphereGeometry args={[0.17, 24, 16]} />
            <meshStandardMaterial color="#93ad42" roughness={0.2} />
          </mesh>
          <mesh position={[0.34, 0.26, -0.38]} castShadow>
            <sphereGeometry args={[0.17, 24, 16]} />
            <meshStandardMaterial color="#93ad42" roughness={0.2} />
          </mesh>

          <mesh position={[0.43, 0.27, 0.4]}>
            <sphereGeometry args={[0.075, 20, 14]} />
            <meshStandardMaterial color="#0b0b09" roughness={0.18} />
          </mesh>
          <mesh position={[0.43, 0.27, -0.4]}>
            <sphereGeometry args={[0.075, 20, 14]} />
            <meshStandardMaterial color="#0b0b09" roughness={0.18} />
          </mesh>

          <mesh position={[0.52, -0.06, 0]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.18, 24, 12]} />
            <meshStandardMaterial color="#526e20" roughness={0.32} />
          </mesh>

          <mesh
            ref={tongue}
            position={[0.55, -0.02, 0]}
            scale={[0, 1, 1]}
            rotation={[0, 0, 0]}
          >
            <cylinderGeometry args={[0.025, 0.035, 2.0, 12]} />
            <meshStandardMaterial
              ref={tongueMaterial}
              color="#c86f55"
              roughness={0.4}
              transparent
              opacity={0}
            />
          </mesh>
        </group>

        {[-1, 1].map((side) => (
          <group key={side} position={[0.15, -0.25, side * 0.38]} rotation={[0, side * 0.18, side * 0.12]}>
            <mesh position={[0, -0.28, 0]} castShadow>
              <capsuleGeometry args={[0.1, 0.48, 6, 10]} />
              <meshStandardMaterial color="#708d2d" roughness={0.38} />
            </mesh>
            <mesh position={[0.12, -0.54, 0]} rotation={[0, 0, -0.35 * side]}>
              <capsuleGeometry args={[0.065, 0.28, 5, 8]} />
              <meshStandardMaterial color="#647f28" roughness={0.4} />
            </mesh>
          </group>
        ))}

        {[-1, 1].map((side) => (
          <group key={side} position={[-0.58, -0.22, side * 0.38]} rotation={[0, side * 0.18, -side * 0.15]}>
            <mesh position={[0, -0.3, 0]} castShadow>
              <capsuleGeometry args={[0.1, 0.46, 6, 10]} />
              <meshStandardMaterial color="#708d2d" roughness={0.38} />
            </mesh>
            <mesh position={[0.12, -0.54, 0]} rotation={[0, 0, -0.28 * side]}>
              <capsuleGeometry args={[0.065, 0.26, 5, 8]} />
              <meshStandardMaterial color="#647f28" roughness={0.4} />
            </mesh>
          </group>
        ))}

        <mesh castShadow>
          <tubeGeometry args={[tail, 28, 0.16, 10, false]} />
          <meshStandardMaterial color="#627f28" roughness={0.34} metalness={0.04} />
        </mesh>
      </Float>
    </group>
  );
}

function Scene() {
  const cursor = useRef(new THREE.Vector3(1.1, 0.2, 0));
  const { camera, gl } = useThree();

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      const world = new THREE.Vector3(x * 2.6, y * 1.8, 0);
      world.unproject(camera);
      world.z = 0;
      cursor.current.lerp(world, 0.35);
    };
    gl.domElement.addEventListener("pointermove", onMove, { passive: true });
    return () => gl.domElement.removeEventListener("pointermove", onMove);
  }, [camera, gl]);

  return <Chameleon cursor={cursor.current} />;
}

export function PortfolioChameleon() {
  return (
    <div className="pointer-events-auto absolute inset-0">
      <Canvas
        dpr={[1, 1.7]}
        camera={{ position: [0, 0, 7], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 5, 6]} intensity={4} castShadow />
        <spotLight position={[-4, 3, 5]} intensity={3} angle={0.5} penumbra={0.8} />
        <Environment preset="city" environmentIntensity={0.55} />
        <Scene />
        <ContactShadows position={[0, -1.05, 0]} opacity={0.28} scale={6} blur={2.8} far={3} />
      </Canvas>
    </div>
  );
}
