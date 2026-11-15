import { useState } from "react";
import {
  Wrench,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  LogOut,
  Volume2,
  VolumeX,
  Server,
  Layers,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CrmTechDashboardProps {
  user: {
    fullName: string;
    email: string;
  };
  onLogout: () => void;
}

interface TechBuild {
  id: string;
  client: string;
  type: "Caisse POS Tactile 2 000 €" | "Jumeau 3D Immersif 5 000 €";
  step: "hardware" | "config" | "shipped";
  hardware: string;
}

const DEFAULT_BUILDS: TechBuild[] = [
  {
    id: "b-1",
    client: "Le Bistrot de la Gare",
    type: "Caisse POS Tactile 2 000 €",
    step: "config",
    hardware: "Tablette 15.6'' + Imprimante thermique 80mm + Tiroir caisse sécurisé",
  },
  {
    id: "b-2",
    client: "Smash Burger Bastille",
    type: "Caisse POS Tactile 2 000 €",
    step: "hardware",
    hardware: "Borne commande tactile + KDS Cuisine",
  },
  {
    id: "b-3",
    client: "Château & Spa de Bourgogne",
    type: "Jumeau 3D Immersif 5 000 €",
    step: "shipped",
    hardware: "Visite virtuelle WebGL + Réservation 3D",
  },
];

export function CrmTechDashboard({ user, onLogout }: CrmTechDashboardProps) {
  const [builds, setBuilds] = useState<TechBuild[]>(DEFAULT_BUILDS);
  const [alertSent, setAlertSent] = useState(false);

  const advanceStep = (id: string) => {
    setBuilds(
      builds.map((b) => {
        if (b.id !== id) return b;
        if (b.step === "hardware") return { ...b, step: "config" };
        if (b.step === "config") return { ...b, step: "shipped" };
        return b;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#070502] text-white p-3 sm:p-6 lg:p-8 space-y-6 select-none">
      {/* Top Arcade Tech HUD */}
      <header className="rounded-3xl border-2 border-amber-500/50 bg-gradient-to-r from-black via-[#1c1204] to-black p-4 sm:p-6 backdrop-blur-xl shadow-[0_0_45px_rgba(245,158,11,0.2)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-yellow-700 text-3xl shadow-lg shadow-amber-500/40 border-2 border-amber-200">
              🛠️
            </div>
            <span className="absolute -bottom-1 -right-1 rounded-full bg-amber-400 px-2 py-0.5 text-[9px] font-black text-black border border-white">
              CHEF ATELIER
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                ATELIER HARDWARE &amp; DÉVELOPPEMENT 3D
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {user.fullName} <span className="text-amber-400 font-serif italic font-normal">· Ingénieur Systèmes</span>
            </h1>
            <p className="text-xs text-neutral-400">
              Assemblage des caisses POS · Synchronisation Cloud &amp; Intégration Jumeaux 3D
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-black text-white hover:bg-white/20 transition"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Changer de Personnage</span>
        </button>
      </header>

      {/* PIPELINE DE FABRICATION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-amber-400" /> Ligne d&apos;Assemblage &amp; Déploiement
          </h2>
          <button
            type="button"
            onClick={() => {
              setAlertSent(true);
              setTimeout(() => setAlertSent(false), 4000);
            }}
            className="rounded-xl border border-amber-500/40 bg-amber-950/40 px-3.5 py-2 text-xs font-black text-amber-300 hover:bg-amber-900/60 transition flex items-center gap-1.5"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>{alertSent ? "Alerte envoyée au Boss !" : "Signaler un composant manquant à Antoine"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Étape 1 : Hardware */}
          <div className="rounded-3xl border border-white/15 bg-black/60 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono text-xs font-black text-amber-400">1. HARDWARE EN PRÉPARATION</span>
              <span className="text-xs font-mono text-neutral-400">
                {builds.filter((b) => b.step === "hardware").length}
              </span>
            </div>
            {builds
              .filter((b) => b.step === "hardware")
              .map((b) => (
                <div key={b.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                  <h4 className="text-sm font-black text-white">{b.client}</h4>
                  <p className="text-xs text-amber-300">{b.type}</p>
                  <p className="text-[11px] text-neutral-400">{b.hardware}</p>
                  <button
                    type="button"
                    onClick={() => advanceStep(b.id)}
                    className="w-full mt-2 rounded-xl bg-amber-500/20 border border-amber-500/40 p-2 text-xs font-black text-amber-300 hover:bg-amber-500 hover:text-black transition"
                  >
                    Passer en configuration logicielle ➜
                  </button>
                </div>
              ))}
          </div>

          {/* Étape 2 : Config */}
          <div className="rounded-3xl border border-white/15 bg-black/60 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono text-xs font-black text-cyan-400">2. CONFIGURATION LOGICIELLE</span>
              <span className="text-xs font-mono text-neutral-400">
                {builds.filter((b) => b.step === "config").length}
              </span>
            </div>
            {builds
              .filter((b) => b.step === "config")
              .map((b) => (
                <div key={b.id} className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-4 space-y-2">
                  <h4 className="text-sm font-black text-white">{b.client}</h4>
                  <p className="text-xs text-cyan-300">{b.type}</p>
                  <p className="text-[11px] text-neutral-400">{b.hardware}</p>
                  <button
                    type="button"
                    onClick={() => advanceStep(b.id)}
                    className="w-full mt-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 p-2 text-xs font-black text-emerald-300 hover:bg-emerald-500 hover:text-black transition"
                  >
                    Valider les tests &amp; Expédier ➜
                  </button>
                </div>
              ))}
          </div>

          {/* Étape 3 : Expédié */}
          <div className="rounded-3xl border border-white/15 bg-black/60 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono text-xs font-black text-emerald-400">3. PRÊT &amp; DÉPLOYÉ</span>
              <span className="text-xs font-mono text-neutral-400">
                {builds.filter((b) => b.step === "shipped").length}
              </span>
            </div>
            {builds
              .filter((b) => b.step === "shipped")
              .map((b) => (
                <div key={b.id} className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-black">
                    <CheckCircle2 className="h-4 w-4" /> Installé avec succès
                  </div>
                  <h4 className="text-sm font-black text-white">{b.client}</h4>
                  <p className="text-xs text-neutral-300">{b.type}</p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
