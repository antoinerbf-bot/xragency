import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ArrowRight, Sparkles } from "lucide-react";

const MODEL_URL = "https://readyplayerme.github.io/visage/male.glb";

function AlexandreModel({ pointer }: { pointer: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.22, 0.08);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * -0.06, 0.08);
    group.current.position.y = Math.sin(t * 1.4) * 0.012;
  });

  return <primitive ref={group} object={scene.clone()} scale={1.45} position={[0, -1.55, 0]} />;
}

function AvatarScene({ pointer }: { pointer: { x: number; y: number } }) {
  return (
    <Canvas camera={{ position: [0, 0.15, 3.1], fov: 28 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[2, 3, 4]} intensity={2.2} />
      <directionalLight position={[-2, 1, 2]} intensity={0.8} />
      <Suspense fallback={<Html center><span className="label-mono text-[8px] text-muted-foreground">Alexandre</span></Html>}>
        <AlexandreModel pointer={pointer} />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}

export function AlexandreAdvisor() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  return (
    <div
      className="relative mx-auto h-[150px] w-[145px] sm:h-[180px] sm:w-[170px]"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: Math.max(-1, Math.min(1, (event.clientX - rect.left - rect.width / 2) / (rect.width / 2))),
          y: Math.max(-1, Math.min(1, (event.clientY - rect.top - rect.height / 2) / (rect.height / 2))),
        });
      }}
    >
      <div className="absolute inset-x-4 bottom-2 h-12 rounded-full bg-primary/10 blur-xl" />
      <div className="absolute inset-3 rounded-full border border-primary/10 bg-primary/[0.025]" />
      <AvatarScene pointer={pointer} />
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-background/90 px-2.5 py-1 backdrop-blur">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
        <span className="label-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground">Alexandre · en ligne</span>
      </div>
    </div>
  );
}

export function AlexandreIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid items-center gap-6 lg:grid-cols-[190px_1fr] lg:gap-10">
      <AlexandreAdvisor />
      <div>
        <div className="mb-3 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-primary"><Sparkles className="h-3.5 w-3.5" /> XR Intelligence</div>
        <h2 className="display-serif max-w-3xl text-3xl leading-[0.98] tracking-tight sm:text-5xl">Votre stratégie commence avec Alexandre.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">Stratège digital senior en ligne. Il analyse votre activité, vos priorités et vos canaux d’acquisition pour construire un devis personnalisé.</p>
        <div className="mt-5 flex flex-wrap gap-2 text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="rounded-full border border-border px-3 py-1.5">Analyse interactive</span>
          <span className="rounded-full border border-border px-3 py-1.5">Recommandations</span>
          <span className="rounded-full border border-border px-3 py-1.5">Devis sur mesure</span>
        </div>
        <button type="button" onClick={onStart} className="mt-6 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-lg transition hover:-translate-y-0.5">Lancer mon analyse <ArrowRight className="h-3.5 w-3.5" /></button>
      </div>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
