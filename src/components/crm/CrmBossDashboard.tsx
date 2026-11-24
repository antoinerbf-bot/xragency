import { useState, useEffect } from "react";
import {
  Crown,
  Coins,
  Shield,
  Sparkles,
  Target,
  Plus,
  Check,
  Trash2,
  PhoneCall,
  UserCheck,
  Send,
  Zap,
  LogOut,
  SlidersHorizontal,
  Flame,
  ArrowRight,
  TrendingUp,
  Volume2,
  VolumeX,
  Users,
  Building2,
  Calendar,
  CheckCircle2,
  Lock,
  Palette,
  MapPin,
  Instagram,
  Facebook,
  Globe,
  ExternalLink,
  Trophy,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CrmLead } from "@/routes/api/crm";
import { type MaquetteRequest, getSavedMaquettes, saveMaquettes } from "@/lib/crm-gamified-state";
import { CrmEgoLeaderboard } from "./CrmEgoLeaderboard";

export interface CrmTodo {
  id: string;
  category: "pro" | "perso";
  title: string;
  priority: "urgent" | "high" | "normal";
  deadline: string;
  tag: string;
  done: boolean;
  createdAt: string;
}

interface CrmBossDashboardProps {
  user: {
    fullName: string;
    email: string;
    role: string;
  };
  leads: CrmLead[];
  todos: CrmTodo[];
  onToggleTodo: (id: string) => void;
  onAddTodo: (todo: Omit<CrmTodo, "id" | "createdAt">) => void;
  onDeleteTodo: (id: string) => void;
  onDispatchLead?: (leadId: string, memberEmail: string) => void;
  onLogout: () => void;
  onSwitchToProMode?: () => void;
}

export function CrmBossDashboard({
  user,
  leads,
  todos,
  onToggleTodo,
  onAddTodo,
  onDeleteTodo,
  onDispatchLead,
  onLogout,
  onSwitchToProMode,
}: CrmBossDashboardProps) {
  const [bossTab, setBossTab] = useState<"qg" | "maquettes" | "dispatch" | "todos" | "ego">("qg");
  const [todoTab, setTodoTab] = useState<"pro" | "perso">("pro");
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<"urgent" | "high" | "normal">("high");
  const [newDeadline, setNewDeadline] = useState("Aujourd'hui 18h");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [dispatchedNotif, setDispatchedNotif] = useState<string | null>(null);

  // Maquettes State synchronized with closers
  const [maquettes, setMaquettes] = useState<MaquetteRequest[]>(getSavedMaquettes());

  useEffect(() => {
    const handleSync = () => setMaquettes(getSavedMaquettes());
    window.addEventListener("xr_maquettes_updated", handleSync);
    return () => window.removeEventListener("xr_maquettes_updated", handleSync);
  }, []);

  // Play simple 8-bit sound
  const playSound = (type: "coin" | "click" | "win") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      if (type === "coin" || type === "win") {
        osc.frequency.setValueAtTime(987.77, now);
        osc.frequency.setValueAtTime(1318.51, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else {
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch {
      /* Audio or storage fallback: keep the interface usable. */
    }
  };

  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddTodo({
      category: todoTab,
      title: newTitle.trim(),
      priority: newPriority,
      deadline: newDeadline,
      tag: todoTab === "pro" ? "Stratégie Boss" : "Perso Antoine",
      done: false,
    });
    setNewTitle("");
    playSound("coin");
  };

  const handleDispatch = (
    leadId: string,
    leadContact: string,
    targetName: string,
    targetEmail: string,
  ) => {
    if (onDispatchLead) onDispatchLead(leadId, targetEmail);
    playSound("coin");
    setDispatchedNotif(`⚡ Lead "${leadContact}" envoyé à ${targetName} !`);
    setTimeout(() => setDispatchedNotif(null), 4000);
  };

  const handleDispatchPack = (targetName: string, targetEmail: string, count: number) => {
    const unassigned = leads.slice(0, count);
    unassigned.forEach((l) => {
      if (onDispatchLead) onDispatchLead(l.id, targetEmail);
    });
    playSound("win");
    setDispatchedNotif(`📦 PACK DE ${count} LEADS ENVOYÉ À ${targetName.toUpperCase()} !`);
    setTimeout(() => setDispatchedNotif(null), 5000);
  };

  const handleUpdateMaquetteStatus = (id: string, status: MaquetteRequest["status"]) => {
    const updated = maquettes.map((m) => (m.id === id ? { ...m, status } : m));
    setMaquettes(updated);
    saveMaquettes(updated);
    playSound("coin");
    setDispatchedNotif(`🎨 Statut de la maquette mis à jour !`);
    setTimeout(() => setDispatchedNotif(null), 3000);
  };

  const filteredTodos = todos.filter((t) => t.category === todoTab);
  const pendingMaquettesCount = maquettes.filter((m) => m.status === "pending_boss").length;

  return (
    <div className="min-h-screen bg-[#05040a] text-white p-3 sm:p-6 lg:p-8 space-y-6 select-none">
      {/* Toast Notification */}
      {dispatchedNotif && (
        <div className="fixed top-6 right-6 z-50 rounded-2xl border-2 border-[#d4af37] bg-black/95 p-4 text-sm font-black text-white shadow-[0_0_40px_rgba(212,175,55,0.6)] backdrop-blur-xl animate-bounce flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-yellow-300" />
          <span>{dispatchedNotif}</span>
        </div>
      )}

      {/* Top Arcade HUD Bar Antoine */}
      <header className="rounded-3xl border-2 border-yellow-500/50 bg-gradient-to-r from-yellow-950/60 via-black to-purple-950/60 p-4 sm:p-6 backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.25)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#f59e0b] to-[#b45309] text-3xl shadow-xl shadow-[#d4af37]/40 border-2 border-yellow-200 animate-pulse">
              👑
            </div>
            <span className="absolute -bottom-1 -right-1 rounded-full bg-red-600 px-2 py-0.5 text-[9px] font-black text-white border border-white">
              NIV. 99
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#d4af37] bg-yellow-950/60 px-3 py-0.5 rounded-full border border-[#d4af37]/40">
                GRAND PALAIS DU FONDATEUR · DIRECTION ROYALE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Antoine{" "}
              <span className="text-[#d4af37] font-serif italic font-normal">
                · Direction Suprême
              </span>
            </h1>
            <p className="text-xs text-neutral-300">
              Trésorerie QG · Validation des Maquettes 3D · Envoi de listes aux vendeurs &amp; To-Do
              Secrète
            </p>
          </div>
        </div>

        {/* Boss Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setBossTab("qg");
              playSound("coin");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition",
              bossTab === "qg"
                ? "bg-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10",
            )}
          >
            <Crown className="h-4 w-4" />
            <span>1. Trésorerie &amp; QG</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setBossTab("maquettes");
              playSound("coin");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition relative",
              bossTab === "maquettes"
                ? "bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10",
            )}
          >
            <Palette className="h-4 w-4" />
            <span>2. Demandes de Maquette ({maquettes.length})</span>
            {pendingMaquettesCount > 0 && (
              <span className="rounded-full bg-red-500 px-1.5 py-0.2 text-[9px] font-black text-white animate-ping ml-1">
                {pendingMaquettesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setBossTab("dispatch");
              playSound("coin");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition",
              bossTab === "dispatch"
                ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10",
            )}
          >
            <Package className="h-4 w-4" />
            <span>3. Envoi de Leads</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setBossTab("todos");
              playSound("coin");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition",
              bossTab === "todos"
                ? "bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10",
            )}
          >
            <Target className="h-4 w-4" />
            <span>4. To-Do Secrète</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setBossTab("ego");
              playSound("coin");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition",
              bossTab === "ego"
                ? "bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.5)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10",
            )}
          >
            <Trophy className="h-4 w-4" />
            <span>5. Concours d&apos;Ego 🏆</span>
          </button>

          {onSwitchToProMode && (
            <button
              type="button"
              onClick={onSwitchToProMode}
              className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold text-neutral-200 hover:border-[#d4af37] hover:text-[#d4af37] transition ml-2"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Tableau Pro</span>
            </button>
          )}

          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-950/40 px-3.5 py-2 text-xs font-black text-red-300 hover:bg-red-900/60 transition ml-1"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Changer</span>
          </button>
        </div>
      </header>

      {/* VUE 1 : TRÉSORERIE & QG GÉNÉRAL */}
      {bossTab === "qg" && (
        <div className="space-y-6">
          {/* SECTION 1: COFFRE-FORT & STATS DU ROYAUME */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Coffre Fort */}
            <div className="rounded-3xl border-2 border-[#d4af37] bg-gradient-to-br from-[#d4af37]/25 via-black to-black p-5 shadow-[0_0_35px_rgba(212,175,55,0.3)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-25 text-6xl group-hover:scale-110 transition">
                🪙
              </div>
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#d4af37]">
                LE COFFRE DE L&apos;AGENCE
              </span>
              <div className="mt-2 text-3xl sm:text-4xl font-black text-[#d4af37] font-mono">
                Données à synchroniser
              </div>
              <p className="mt-1 text-xs text-neutral-300 font-medium">
                Trésorerie disponible sécurisée
              </p>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                <TrendingUp className="h-3.5 w-3.5" /> +14 200 € cette semaine
              </div>
            </div>

            {/* Chiffre d'affaires mensuel */}
            <div className="rounded-3xl border border-white/10 bg-black/60 p-5 backdrop-blur-xl">
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-neutral-400">
                CHIFFRE D&apos;AFFAIRES MOIS
              </span>
              <div className="mt-2 text-3xl font-black text-white font-mono">64 200 €</div>
              <p className="mt-1 text-xs text-neutral-400">Objectif du mois : 80 000 €</p>
              <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 w-[80%]" />
              </div>
            </div>

            {/* Commissions versées */}
            <div className="rounded-3xl border border-white/10 bg-black/60 p-5 backdrop-blur-xl">
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-neutral-400">
                COMMISSIONS ÉQUIPE
              </span>
              <div className="mt-2 text-3xl font-black text-yellow-300 font-mono">11 500 €</div>
              <p className="mt-1 text-xs text-neutral-400">Versées aux closers &amp; élèves</p>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-yellow-300 font-bold">
                ⚔️ Lucas (5 040 €) · 🎯 Sarah (6 500 €)
              </div>
            </div>

            {/* Demandes de maquettes en attente */}
            <div
              onClick={() => setBossTab("maquettes")}
              className="rounded-3xl border-2 border-pink-500/50 bg-gradient-to-br from-pink-950/30 to-black p-5 cursor-pointer hover:border-pink-400 transition"
            >
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-pink-400">
                MAQUETTES EN ATTENTE
              </span>
              <div className="mt-2 text-3xl font-black text-pink-300 font-mono">
                {pendingMaquettesCount} Demandes
              </div>
              <p className="mt-1 text-xs text-neutral-300">Envoyées par Lucas &amp; Sarah</p>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-pink-400 font-bold">
                <Palette className="h-3.5 w-3.5" /> Cliquez pour valider au studio 3D
              </div>
            </div>
          </section>

          {/* SANTÉ DE L'ÉQUIPE (AVATARS 3D & BARRES DE VIE) */}
          <section className="rounded-3xl border border-white/10 bg-black/60 p-5 sm:p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👥</span>
                <div>
                  <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#d4af37]">
                    ÉTAT DES FORCES DE L&apos;AGENCE
                  </span>
                  <h3 className="text-lg font-black text-white">
                    Barres de Vie &amp; Quêtes de l&apos;Équipe
                  </h3>
                </div>
              </div>
              <span className="font-mono text-xs text-neutral-400">4 membres connectés</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Sarah */}
              <div className="rounded-2xl border-2 border-pink-500/40 bg-pink-950/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🧝‍♀️</span>
                    <span className="text-xs font-black text-white">Sarah Benali</span>
                  </div>
                  <span className="font-mono text-[10px] text-pink-400 font-bold">20% Comms</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-neutral-300">
                    <span>Performance Closing</span>
                    <span className="font-mono font-bold text-pink-300">32 500 € CA</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-rose-400 w-[95%]" />
                  </div>
                </div>
                <p className="text-[10px] text-yellow-300 font-bold">
                  👑 Numéro 1 au Concours d&apos;Ego
                </p>
              </div>

              {/* Lucas */}
              <div className="rounded-2xl border-2 border-red-500/40 bg-red-950/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🥷</span>
                    <span className="text-xs font-black text-white">Lucas Martin</span>
                  </div>
                  <span className="font-mono text-[10px] text-red-400 font-bold">18% Comms</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-neutral-300">
                    <span>Performance Closing</span>
                    <span className="font-mono font-bold text-red-300">28 000 € CA</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-orange-400 w-[85%]" />
                  </div>
                </div>
                <p className="text-[10px] text-neutral-300">12 maquettes demandées</p>
              </div>

              {/* Karim */}
              <div className="rounded-2xl border-2 border-[#00f2fe]/40 bg-cyan-950/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🥋</span>
                    <span className="text-xs font-black text-white">Karim Diallo</span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-400 font-bold">
                    Ceinture Marron
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-neutral-300">
                    <span>Progression XR School</span>
                    <span className="font-mono font-bold text-cyan-300">Jour 42 / 90</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-[#00f2fe] w-[46%]" />
                  </div>
                </div>
                <p className="text-[10px] text-neutral-300">6 000 € CA générés déjà !</p>
              </div>

              {/* Thomas */}
              <div className="rounded-2xl border-2 border-amber-500/40 bg-amber-950/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    <span className="text-xs font-black text-white">Thomas (Atelier)</span>
                  </div>
                  <span className="font-mono text-[10px] text-amber-400 font-bold">Hardware</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-neutral-300">
                    <span>Caisses en préparation</span>
                    <span className="font-mono font-bold text-amber-300">4 livraisons</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-amber-500 w-[80%]" />
                  </div>
                </div>
                <p className="text-[10px] text-neutral-300">0 bug bloquant matériel</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* VUE 2 : DEMANDES DE MAQUETTE ENVOYÉES PAR LES VENDEURS (AU STUDIO 3D) */}
      {bossTab === "maquettes" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-pink-400">
                REÇU EN TEMPS RÉEL DES CLOSERS
              </span>
              <h2 className="text-2xl font-black text-white">
                Demandes de Maquette à Modéliser &amp; Valider
              </h2>
              <p className="text-xs text-neutral-300">
                Les vendeurs inscrivent les informations client (Google Maps, Instagram, Facebook,
                site actuel) pour que le studio 3D prépare la maquette.
              </p>
            </div>
            <span className="rounded-full bg-pink-500/20 border border-pink-500/40 px-3 py-1 font-mono text-xs font-bold text-pink-300">
              {maquettes.length} demandes totales
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {maquettes.map((maq) => {
              const isPending = maq.status === "pending_boss";
              return (
                <div
                  key={maq.id}
                  className={cn(
                    "rounded-3xl border-2 p-5 space-y-3.5 backdrop-blur-xl shadow-2xl transition",
                    isPending
                      ? "border-pink-500 bg-gradient-to-b from-pink-950/40 to-black shadow-[0_0_35px_rgba(236,72,153,0.3)]"
                      : "border-white/10 bg-black/70",
                  )}
                >
                  <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <span className="font-mono text-[9px] font-bold text-pink-400 uppercase">
                        Demandé par : {maq.closerName}
                      </span>
                      <h4 className="text-lg font-black text-white mt-0.5">{maq.company}</h4>
                      <p className="text-xs text-neutral-400">
                        {maq.contactName} · {maq.phone} · {maq.city}
                      </p>
                    </div>
                    <span className="rounded-xl bg-yellow-400/20 border border-yellow-400/40 px-2.5 py-1 text-xs font-mono font-black text-yellow-300">
                      {maq.budgetEur} €
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                      TYPE DE MAQUETTE
                    </span>
                    <p className="text-xs font-black text-[#d4af37]">{maq.serviceType}</p>
                  </div>

                  {/* Notes & brief du client */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-3 space-y-1">
                    <span className="text-[9px] font-mono uppercase text-neutral-400 block">
                      NOTES DU CLOSER
                    </span>
                    <p className="text-xs text-neutral-200 leading-relaxed font-sans">
                      {maq.notes}
                    </p>
                  </div>

                  {/* LIENS DIRECTS GOOGLE MAPS, INSTAGRAM, FACEBOOK, SITE WEB */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[9px] font-mono uppercase text-neutral-400 block">
                      LIENS CLIENT DIRECTS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {maq.googleMapsUrl && (
                        <a
                          href={maq.googleMapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-bold text-emerald-300 flex items-center gap-1.5 hover:bg-emerald-500/40 transition"
                        >
                          <MapPin className="h-3.5 w-3.5" />
                          <span>Google Maps</span>
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </a>
                      )}

                      {maq.instagramUrl && (
                        <a
                          href={maq.instagramUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl bg-pink-500/20 border border-pink-500/40 px-3 py-1.5 text-xs font-bold text-pink-300 flex items-center gap-1.5 hover:bg-pink-500/40 transition"
                        >
                          <Instagram className="h-3.5 w-3.5" />
                          <span>Instagram</span>
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </a>
                      )}

                      {maq.facebookUrl && (
                        <a
                          href={maq.facebookUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl bg-blue-500/20 border border-blue-500/40 px-3 py-1.5 text-xs font-bold text-blue-300 flex items-center gap-1.5 hover:bg-blue-500/40 transition"
                        >
                          <Facebook className="h-3.5 w-3.5" />
                          <span>Facebook</span>
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </a>
                      )}

                      {maq.websiteUrl && (
                        <a
                          href={maq.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl bg-cyan-500/20 border border-cyan-500/40 px-3 py-1.5 text-xs font-bold text-cyan-300 flex items-center gap-1.5 hover:bg-cyan-500/40 transition"
                        >
                          <Globe className="h-3.5 w-3.5" />
                          <span>Site Actuel</span>
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* BOUTONS D'ACTION POUR ANTOINE */}
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <span className="text-[9px] font-mono uppercase text-neutral-400 block">
                      ACTION DIRECTION
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateMaquetteStatus(maq.id, "in_design")}
                        className={cn(
                          "rounded-xl p-2 text-center text-xs font-black transition",
                          maq.status === "in_design"
                            ? "bg-purple-600 text-white"
                            : "bg-purple-950/60 border border-purple-500/40 text-purple-200 hover:bg-purple-800",
                        )}
                      >
                        🎨 En cours studio 3D
                      </button>

                      <button
                        type="button"
                        onClick={() => handleUpdateMaquetteStatus(maq.id, "ready_to_close")}
                        className={cn(
                          "rounded-xl p-2 text-center text-xs font-black transition",
                          maq.status === "ready_to_close"
                            ? "bg-emerald-600 text-white"
                            : "bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 hover:bg-emerald-800",
                        )}
                      >
                        ✅ Prête à Closer !
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VUE 3 : ENVOI DE PACKS DE LEADS AUX VENDEURS */}
      {bossTab === "dispatch" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-red-400">
                DISTRIBUTION DE MUNITIONS COMMERCIALES
              </span>
              <h2 className="text-2xl font-black text-white">
                Envoi de Listes &amp; Packs de Leads
              </h2>
              <p className="text-xs text-neutral-300">
                Envoyez des packs complets de 5 ou 10 leads d&apos;un seul clic dans l&apos;arène de
                Lucas ou Sarah.
              </p>
            </div>
          </div>

          {/* ACTIONS D'ENVOI EN GROS (PACKS) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-3xl border-2 border-red-500/50 bg-gradient-to-b from-red-950/40 to-black p-5 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚔️</span>
                <div>
                  <h3 className="text-base font-black text-white">Pack Closer · Lucas Martin</h3>
                  <span className="text-xs font-mono text-red-400">
                    Spécialiste Caisse POS &amp; Web
                  </span>
                </div>
              </div>
              <p className="text-xs text-neutral-300">
                Envoyer les prochains leads Restauration à Lucas pour ses appels de
                l&apos;après-midi.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleDispatchPack("Lucas Martin", "lucas@xragency.fr", 3)}
                  className="rounded-xl bg-red-600 p-2.5 text-xs font-black text-white hover:bg-red-500 transition active:scale-95"
                >
                  ⚡ Pack 3 Leads
                </button>
                <button
                  type="button"
                  onClick={() => handleDispatchPack("Lucas Martin", "lucas@xragency.fr", 5)}
                  className="rounded-xl bg-red-700 p-2.5 text-xs font-black text-white hover:bg-red-600 transition active:scale-95"
                >
                  🔥 Pack 5 Leads
                </button>
              </div>
            </div>

            <div className="rounded-3xl border-2 border-pink-500/50 bg-gradient-to-b from-pink-950/40 to-black p-5 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                <div>
                  <h3 className="text-base font-black text-white">
                    Pack High-Ticket · Sarah Benali
                  </h3>
                  <span className="text-xs font-mono text-pink-400">
                    Spécialiste 3D Immersif &amp; SEO
                  </span>
                </div>
              </div>
              <p className="text-xs text-neutral-300">
                Envoyer les leads à gros budget (5k€+) à Sarah pour signature rapide.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleDispatchPack("Sarah Benali", "sarah@xragency.fr", 3)}
                  className="rounded-xl bg-pink-600 p-2.5 text-xs font-black text-white hover:bg-pink-500 transition active:scale-95"
                >
                  ⚡ Pack 3 Leads
                </button>
                <button
                  type="button"
                  onClick={() => handleDispatchPack("Sarah Benali", "sarah@xragency.fr", 5)}
                  className="rounded-xl bg-pink-700 p-2.5 text-xs font-black text-white hover:bg-pink-600 transition active:scale-95"
                >
                  🔥 Pack 5 Leads
                </button>
              </div>
            </div>

            <div className="rounded-3xl border-2 border-cyan-500/50 bg-gradient-to-b from-cyan-950/40 to-black p-5 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🥋</span>
                <div>
                  <h3 className="text-base font-black text-white">Dojo École · Karim Diallo</h3>
                  <span className="text-xs font-mono text-cyan-400">Élève XR School 90j</span>
                </div>
              </div>
              <p className="text-xs text-neutral-300">
                Envoyer des prospects pour sa session de formation et son entraînement du jour.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleDispatchPack("Karim Diallo", "karim@xragency.fr", 3)}
                  className="rounded-xl bg-cyan-600 p-2.5 text-xs font-black text-black hover:bg-cyan-500 transition active:scale-95"
                >
                  ⚡ Pack 3 Leads
                </button>
                <button
                  type="button"
                  onClick={() => handleDispatchPack("Karim Diallo", "karim@xragency.fr", 5)}
                  className="rounded-xl bg-cyan-500 p-2.5 text-xs font-black text-black hover:bg-cyan-400 transition active:scale-95"
                >
                  🔥 Pack 5 Leads
                </button>
              </div>
            </div>
          </div>

          {/* LISTE DÉTAILLÉE PAR LEAD */}
          <div className="rounded-3xl border-2 border-white/10 bg-black/70 p-5 sm:p-6 space-y-3">
            <h3 className="text-lg font-black text-white">Dispatch Individuel</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 hover:border-[#d4af37]/60 transition"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-white">{lead.contactName}</h4>
                      <span className="rounded-lg bg-yellow-400/20 px-2 py-0.5 font-mono text-xs font-bold text-yellow-300">
                        {lead.budgetEur} €
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      {lead.company} · {lead.city} · {lead.phone}
                    </p>
                    <span className="text-[11px] text-[#d4af37] font-medium">
                      {lead.serviceTarget}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleDispatch(
                          lead.id,
                          lead.contactName,
                          "Lucas Martin",
                          "lucas@xragency.fr",
                        )
                      }
                      className="rounded-xl bg-red-950/60 border border-red-500/40 px-3 py-1.5 text-xs font-black text-red-200 hover:bg-red-800 transition"
                    >
                      ⚔️ Lucas
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleDispatch(
                          lead.id,
                          lead.contactName,
                          "Sarah Benali",
                          "sarah@xragency.fr",
                        )
                      }
                      className="rounded-xl bg-pink-950/60 border border-pink-500/40 px-3 py-1.5 text-xs font-black text-pink-200 hover:bg-pink-800 transition"
                    >
                      🎯 Sarah
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleDispatch(
                          lead.id,
                          lead.contactName,
                          "Karim Diallo",
                          "karim@xragency.fr",
                        )
                      }
                      className="rounded-xl bg-cyan-950/60 border border-cyan-500/40 px-3 py-1.5 text-xs font-black text-cyan-200 hover:bg-cyan-800 transition"
                    >
                      🥋 Karim
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VUE 4 : TO-DO SECRÈTE (PRO & PERSO ANTOINE) */}
      {bossTab === "todos" && (
        <div className="max-w-4xl mx-auto rounded-3xl border-2 border-purple-500/60 bg-gradient-to-b from-purple-950/30 to-black/90 p-5 sm:p-7 shadow-2xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500 text-black font-black text-2xl shadow-lg">
                🎯
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] font-black uppercase tracking-widest text-purple-400">
                    ESPACE CONFIDENTIEL ANTOINE
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 border border-red-500/40 px-2 py-0.5 text-[8.5px] font-bold text-red-300">
                    <Lock className="h-2.5 w-2.5" /> Invisible pour l&apos;équipe
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white">
                  To-Do List Secrète · Pro &amp; Perso
                </h2>
              </div>
            </div>

            {/* Toggle Pro vs Perso */}
            <div className="flex rounded-2xl border border-white/15 bg-black/60 p-1">
              <button
                type="button"
                onClick={() => {
                  setTodoTab("pro");
                  playSound("click");
                }}
                className={cn(
                  "rounded-xl px-4 py-2 text-xs font-black transition",
                  todoTab === "pro"
                    ? "bg-[#d4af37] text-black shadow-md"
                    : "text-neutral-400 hover:text-white",
                )}
              >
                💼 Pro Agence ({todos.filter((t) => t.category === "pro" && !t.done).length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setTodoTab("perso");
                  playSound("click");
                }}
                className={cn(
                  "rounded-xl px-4 py-2 text-xs font-black transition",
                  todoTab === "perso"
                    ? "bg-purple-500 text-white shadow-md"
                    : "text-neutral-400 hover:text-white",
                )}
              >
                🏠 Perso Antoine ({todos.filter((t) => t.category === "perso" && !t.done).length})
              </button>
            </div>
          </div>

          {/* Formulaire ajout rapide */}
          <form onSubmit={handleCreateTodo} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder={
                todoTab === "pro"
                  ? "Ex: Valider le contrat caisse POS 2 000 € avec le restaurant Le Gabriel..."
                  : "Ex: Séance de sport à 19h, acheter billets d'avion..."
              }
              className="flex-1 rounded-2xl border border-white/20 bg-black/70 px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:border-purple-400 focus:outline-none"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as "urgent" | "high" | "normal")}
              aria-label="Priorité de la tâche"
              className="rounded-2xl border border-white/20 bg-black px-3 py-3 text-xs text-white focus:border-purple-400"
            >
              <option value="urgent">🔥 Urgent</option>
              <option value="high">⭐ Haute</option>
              <option value="normal">💡 Normal</option>
            </select>
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-xs font-black text-white hover:opacity-90 active:scale-95 transition flex items-center justify-center gap-1.5 shadow-lg"
            >
              <Plus className="h-4 w-4" />
              <span>Ajouter</span>
            </button>
          </form>

          {/* Liste des tâches */}
          <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
            {filteredTodos.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/20 p-8 text-center text-neutral-400">
                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400 mb-2 opacity-50" />
                <p className="text-sm font-bold">
                  Toutes les tâches de cette catégorie sont terminées !
                </p>
              </div>
            ) : (
              filteredTodos.map((todo) => {
                const isUrgent = todo.priority === "urgent";
                return (
                  <div
                    key={todo.id}
                    onClick={() => {
                      onToggleTodo(todo.id);
                      playSound("coin");
                    }}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-2xl border p-3.5 transition-all cursor-pointer group",
                      todo.done
                        ? "border-emerald-500/20 bg-emerald-950/20 opacity-60"
                        : isUrgent
                          ? "border-red-500/60 bg-red-950/20 hover:border-red-400"
                          : "border-white/10 bg-black/50 hover:border-purple-400/60",
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border-2 transition",
                          todo.done
                            ? "border-emerald-400 bg-emerald-500 text-black"
                            : "border-white/30 group-hover:border-purple-400",
                        )}
                      >
                        {todo.done && <Check className="h-4 w-4 font-black" />}
                      </div>
                      <div className="min-w-0">
                        <p
                          className={cn(
                            "text-xs sm:text-sm font-bold truncate",
                            todo.done ? "line-through text-neutral-400" : "text-white",
                          )}
                        >
                          {todo.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px]">
                          <span
                            className={cn(
                              "font-mono font-bold uppercase",
                              isUrgent ? "text-red-400" : "text-purple-400",
                            )}
                          >
                            {isUrgent ? "🔥 Urgent" : "⭐ Normal"}
                          </span>
                          <span className="text-neutral-500">• {todo.deadline}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTodo(todo.id);
                        playSound("click");
                      }}
                      className="opacity-0 group-hover:opacity-100 rounded-lg p-1.5 text-neutral-400 hover:text-red-400 transition"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* VUE 5 : CONCOURS D'EGO DES VENDEURS */}
      {bossTab === "ego" && <CrmEgoLeaderboard currentUserName="Antoine" />}
    </div>
  );
}
