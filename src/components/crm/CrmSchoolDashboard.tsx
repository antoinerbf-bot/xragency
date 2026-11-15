import { useState } from "react";
import {
  GraduationCap,
  Sparkles,
  Trophy,
  CheckCircle2,
  BookOpen,
  PhoneCall,
  Volume2,
  VolumeX,
  LogOut,
  Target,
  ArrowRight,
  Shield,
  Star,
  PartyPopper,
  Copy,
  Check,
  Zap,
  Swords,
  Layers,
  ChevronRight,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  XR_SCHOOL_SECTORS,
  XR_SALES_PHASES,
  type ProspectingSector,
  type SalesPhase,
} from "@/lib/crm-gamified-state";
import { CrmEgoLeaderboard } from "./CrmEgoLeaderboard";

interface CrmSchoolDashboardProps {
  user: {
    fullName: string;
    email: string;
  };
  onLogout: () => void;
}

// 3 Prospects d'entraînement sans risque
const TRAINING_PROSPECTS = [
  {
    id: "train-1",
    name: "La Trattoria Di Napoli (Test)",
    contact: "Marco (Gérant)",
    budget: "2 000 €",
    profile: "Pizzeria débordée le vendredi soir, 40 commandes/jour sur Deliveroo (30% de commission perdue).",
    scriptTip: "Mettre en avant l'imprimante ticket cuisine automatique et l'économie de 1 200 €/mois.",
  },
  {
    id: "train-2",
    name: "Burger Smash Lab (Test)",
    contact: "Sophie (Propriétaire)",
    budget: "2 000 €",
    profile: "Fast-food récent, recherche écran tactile caisse et site web pour commander au comptoir.",
    scriptTip: "Mettre en avant la borne de commande tactile et le suivi des stocks en temps réel.",
  },
  {
    id: "train-3",
    name: "L'Atelier Bistronomique (Test)",
    contact: "Thierry (Chef)",
    budget: "5 000 €",
    profile: "Restaurant gastronomique avec terrasse, intéressé par le menu interactif 3D immersif.",
    scriptTip: "Proposer le jumeau 3D et la réservation de table en direct sans commission.",
  },
];

export function CrmSchoolDashboard({ user, onLogout }: CrmSchoolDashboardProps) {
  const [activeTab, setActiveTab] = useState<"sectors" | "phases" | "simulator" | "quests" | "ego">("sectors");
  const [selectedSector, setSelectedSector] = useState<ProspectingSector>(XR_SCHOOL_SECTORS[0]);
  const [selectedPhase, setSelectedPhase] = useState<SalesPhase>(XR_SALES_PHASES[0]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedQuests, setCompletedQuests] = useState<number[]>([1]);
  const [studentXp, setStudentXp] = useState(1850);
  const [selectedProspect, setSelectedProspect] = useState(TRAINING_PROSPECTS[0]);
  const [testCallSuccess, setTestCallSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sound Synth
  const playSound = (type: "coin" | "win") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    playSound("coin");
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleToggleQuest = (questId: number) => {
    if (completedQuests.includes(questId)) {
      setCompletedQuests(completedQuests.filter((id) => id !== questId));
    } else {
      setCompletedQuests([...completedQuests, questId]);
      setStudentXp(studentXp + 200);
      playSound("coin");
    }
  };

  return (
    <div className="min-h-screen bg-[#020612] text-white p-3 sm:p-6 lg:p-8 space-y-6 select-none">
      {/* Top Arcade School HUD */}
      <header className="rounded-3xl border-2 border-cyan-400/60 bg-gradient-to-r from-cyan-950/80 via-black to-blue-950/80 p-4 sm:p-6 backdrop-blur-xl shadow-[0_0_50px_rgba(0,242,254,0.3)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00f2fe] via-cyan-600 to-blue-800 text-3xl shadow-lg shadow-[#00f2fe]/40 border-2 border-cyan-200 animate-pulse">
              🥋
            </div>
            <span className="absolute -bottom-1 -right-1 rounded-full bg-cyan-400 px-2 py-0.5 text-[9px] font-black text-black border border-white">
              JOUR 42
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#00f2fe] bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/50">
                DOJO DU CLOSING · PROGRAMME ACCÉLÉRÉ 90 JOURS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {user.fullName} <span className="text-[#00f2fe] font-serif italic font-normal">· Ceinture Marron</span>
            </h1>
            <p className="text-xs text-neutral-300">
              Trames complètes par secteur d&apos;activité · Méthode Setting &amp; Closing · Objectif 10 000 €
            </p>
          </div>
        </div>

        {/* Navigation Tabs School */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab("sectors");
              playSound("coin");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition",
              activeTab === "sectors"
                ? "bg-[#00f2fe] text-black shadow-[0_0_20px_rgba(0,242,254,0.5)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10"
            )}
          >
            <BookOpen className="h-4 w-4" />
            <span>1. Trames par Métier ({XR_SCHOOL_SECTORS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("phases");
              playSound("coin");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition",
              activeTab === "phases"
                ? "bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10"
            )}
          >
            <Layers className="h-4 w-4" />
            <span>2. Setting &amp; Closing</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("simulator");
              playSound("coin");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition",
              activeTab === "simulator"
                ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10"
            )}
          >
            <PhoneCall className="h-4 w-4" />
            <span>3. Simulateur d&apos;Appels</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("quests");
              playSound("coin");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition",
              activeTab === "quests"
                ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10"
            )}
          >
            <Target className="h-4 w-4" />
            <span>4. Quêtes du Jour</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("ego");
              playSound("coin");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition",
              activeTab === "ego"
                ? "bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.5)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10"
            )}
          >
            <Trophy className="h-4 w-4" />
            <span>5. Concours d&apos;Ego 🏆</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-black text-white hover:bg-red-900/60 transition ml-2"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Changer</span>
          </button>
        </div>
      </header>

      {/* SECTION 1: BARRE DU PARCOURS 90 JOURS & STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Progression 90 Jours */}
        <div className="sm:col-span-2 rounded-3xl border-2 border-[#00f2fe] bg-gradient-to-br from-cyan-950/40 via-black to-black p-5 shadow-[0_0_35px_rgba(0,242,254,0.25)] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#00f2fe]">
                VOIE DU GUERRIER DU CLOSING
              </span>
              <h2 className="text-xl font-black text-white">Progression : Jour 42 sur 90 (46% accompli)</h2>
            </div>
            <span className="rounded-full bg-cyan-500/20 px-3 py-1 font-mono text-xs font-bold text-cyan-300">
              Ceinture Marron
            </span>
          </div>

          <div className="h-4 w-full rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/20">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-[#00f2fe] to-emerald-400 w-[46%] shadow-[0_0_15px_rgba(0,242,254,0.6)]" />
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-300 pt-1">
            <span>J1 : Les Fondations &amp; Mental</span>
            <span className="text-[#00f2fe] font-bold">Actuel : Closing Caisse POS 2k€</span>
            <span>J90 : 10 000 € de commissions</span>
          </div>
        </div>

        {/* XP Total */}
        <div className="rounded-3xl border border-white/10 bg-black/60 p-5 backdrop-blur-xl">
          <span className="font-mono text-[9px] font-black uppercase tracking-widest text-neutral-400">
            EXPERIENCE TOTALE
          </span>
          <div className="mt-2 text-3xl font-black text-[#00f2fe] font-mono">
            {studentXp} XP
          </div>
          <p className="mt-1 text-xs text-neutral-400">Prochain rang : Ceinture Noire (2 500 XP)</p>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-cyan-300 font-bold">
            <Star className="h-3.5 w-3.5" /> +200 XP par quête validée
          </div>
        </div>
      </section>

      {/* VUE 1 : TRAMES DE PROSPECTION PAR SECTEUR D'ACTIVITÉ */}
      {activeTab === "sectors" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#00f2fe]">
                CATALOGUE DE MUNITIONS PAR MÉTIER
              </span>
              <h2 className="text-2xl font-black text-white">Trames Complètes de Prospection</h2>
              <p className="text-xs text-neutral-300">
                Sélectionnez le secteur d&apos;activité de votre prospect pour dégainer la trame mot-à-mot adaptée.
              </p>
            </div>
          </div>

          {/* Sélecteur de secteur (Boutons horizontaux riches) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {XR_SCHOOL_SECTORS.map((sector) => {
              const isSelected = selectedSector.id === sector.id;
              return (
                <button
                  key={sector.id}
                  type="button"
                  onClick={() => {
                    setSelectedSector(sector);
                    playSound("coin");
                  }}
                  className={cn(
                    "rounded-2xl border-2 p-3 text-left transition flex flex-col justify-between gap-2 group",
                    isSelected
                      ? "border-[#00f2fe] bg-cyan-950/60 shadow-[0_0_25px_rgba(0,242,254,0.4)]"
                      : "border-white/10 bg-black/60 hover:border-white/30"
                  )}
                >
                  <span className="text-3xl group-hover:scale-110 transition">{sector.icon}</span>
                  <div>
                    <h4 className="text-xs font-black text-white leading-tight">{sector.name}</h4>
                    <span className="text-[10px] text-cyan-300 font-mono block mt-1">{sector.avgDeal}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* FICHE DÉTAILLÉE DU SECTEUR SÉLECTIONNÉ */}
          <div className="rounded-3xl border-2 border-[#00f2fe]/40 bg-gradient-to-b from-cyan-950/30 to-black/90 p-5 sm:p-7 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedSector.icon}</span>
                <div>
                  <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#00f2fe]">
                    SECTEUR : {selectedSector.name}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">{selectedSector.tagline}</h3>
                </div>
              </div>
              <span className="rounded-xl bg-yellow-400/20 border border-yellow-400/40 px-3 py-1 font-mono text-xs font-black text-yellow-300">
                Panier Moyen : {selectedSector.avgDeal}
              </span>
            </div>

            {/* 1. L'ACCROCHE AU TÉLÉPHONE (PITCH MOT-À-MOT) */}
            <div className="rounded-2xl border border-white/15 bg-black/70 p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-yellow-300 flex items-center gap-1.5">
                  <PhoneCall className="h-4 w-4" /> ACCROCHE TÉLÉPHONIQUE (CHOC EN 30 SECONDES)
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(selectedSector.hookPitch, "hook")}
                  className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-1"
                >
                  {copiedKey === "hook" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedKey === "hook" ? "Copié !" : "Copier"}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-neutral-100 font-serif italic bg-white/5 p-3 rounded-xl border border-white/10 leading-relaxed">
                {selectedSector.hookPitch}
              </p>
            </div>

            {/* 2. TEMPLATE DE MESSAGE INSTAGRAM / WHATSAPP */}
            <div className="rounded-2xl border border-white/15 bg-black/70 p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-pink-300 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" /> TEMPLATE DM INSTAGRAM / MESSAGE VOCAL (SETTING)
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(selectedSector.settingDmTemplate, "dm")}
                  className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-1"
                >
                  {copiedKey === "dm" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedKey === "dm" ? "Copié !" : "Copier"}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-neutral-100 font-sans bg-white/5 p-3 rounded-xl border border-white/10 leading-relaxed">
                {selectedSector.settingDmTemplate}
              </p>
            </div>

            {/* 3. LES ARGUMENTS CLÉS DE CLOSING & L'OBJECTION MASSUE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Arguments clés */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-3">
                <span className="font-mono text-xs font-black text-emerald-400 block">
                  🎯 LES 4 ARGUMENTS MASSE DE CLOSING
                </span>
                <ul className="space-y-2 text-xs text-neutral-200">
                  {selectedSector.closingKeyArguments.map((arg, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{arg}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Riposte à l'objection */}
              <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-4 space-y-2.5">
                <span className="font-mono text-xs font-black text-red-400 block">
                  ⚔️ RIPOSTE À L&apos;OBJECTION MORTELLE
                </span>
                <p className="text-xs font-bold text-white font-serif italic">
                  {selectedSector.killerObjection.objection}
                </p>
                <div className="rounded-xl bg-black/60 p-3 border border-red-500/20 text-xs text-neutral-200 leading-relaxed">
                  <span className="text-yellow-400 font-bold block mb-1">Votre réponse imparable :</span>
                  {selectedSector.killerObjection.riposte}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VUE 2 : LES 3 PHASES DE LA VENTE (SETTING, DIAGNOSTIC, CLOSING) */}
      {activeTab === "phases" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-purple-400">
                MÉTHODOLOGIE OFFICIELLE XR AGENCY
              </span>
              <h2 className="text-2xl font-black text-white">Le Protocole des 3 Phases</h2>
              <p className="text-xs text-neutral-300">
                Maîtrisez les étapes exactes : de l&apos;accroche initiale en 45 secondes jusqu&apos;à l&apos;encaissement de l&apos;acompte.
              </p>
            </div>
          </div>

          {/* Sélecteur de phase */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {XR_SALES_PHASES.map((phase) => {
              const isSelected = selectedPhase.phaseNumber === phase.phaseNumber;
              return (
                <button
                  key={phase.phaseNumber}
                  type="button"
                  onClick={() => {
                    setSelectedPhase(phase);
                    playSound("coin");
                  }}
                  className={cn(
                    "rounded-2xl border-2 p-4 text-left transition space-y-1.5",
                    isSelected
                      ? "border-purple-400 bg-purple-950/60 shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                      : "border-white/10 bg-black/60 hover:border-white/30"
                  )}
                >
                  <span className="font-mono text-[9px] font-black text-purple-300 uppercase">
                    {phase.badge}
                  </span>
                  <h3 className="text-base font-black text-white">{phase.phaseName}</h3>
                  <p className="text-xs text-neutral-400 leading-snug">{phase.goal}</p>
                </button>
              );
            })}
          </div>

          {/* DÉTAIL DES ÉTAPES DE LA PHASE */}
          <div className="rounded-3xl border-2 border-purple-500/40 bg-gradient-to-b from-purple-950/30 to-black/90 p-5 sm:p-7 shadow-2xl space-y-6">
            <div className="border-b border-white/10 pb-3">
              <span className="font-mono text-xs font-black text-purple-400 uppercase">
                OBJECTIF CLÉ : {selectedPhase.goal}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {selectedPhase.steps.map((st, idx) => (
                <div key={idx} className="rounded-2xl border border-white/15 bg-black/70 p-5 space-y-3">
                  <h4 className="text-base font-black text-white flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-black text-xs font-black">
                      {idx + 1}
                    </span>
                    {st.title}
                  </h4>
                  <p className="text-xs text-neutral-300">{st.description}</p>

                  <div className="rounded-xl bg-purple-950/40 border border-purple-500/30 p-3 space-y-1 text-xs text-purple-200">
                    <span className="font-bold text-yellow-300 block">💬 Ce qu&apos;il faut dire mot-à-mot :</span>
                    <p className="font-serif italic text-white leading-relaxed">{st.scriptDialogue}</p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-2.5 text-[11px] text-neutral-400 border border-white/10">
                    <span className="font-bold text-cyan-300">💡 Conseil d&apos;Élite :</span> {st.proTip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VUE 3 : SIMULATEUR D'APPELS SANS RISQUE */}
      {activeTab === "simulator" && (
        <div className="rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-b from-cyan-950/30 to-black/90 p-5 sm:p-7 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🎯</span>
              <div>
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#00f2fe]">
                  SIMULATEUR SANS PRESSION
                </span>
                <h3 className="text-xl font-black text-white">Prospects d&apos;Entraînement Virtuels</h3>
              </div>
            </div>
            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-mono font-bold text-cyan-300">
              0 risque de refus
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TRAINING_PROSPECTS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setSelectedProspect(p);
                  setTestCallSuccess(false);
                  playSound("coin");
                }}
                className={cn(
                  "rounded-2xl border-2 p-3 text-left transition",
                  selectedProspect.id === p.id
                    ? "border-[#00f2fe] bg-cyan-950/60"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                )}
              >
                <p className="text-xs font-black truncate text-white">{p.name}</p>
                <span className="text-[10px] text-cyan-300 font-mono">{p.budget}</span>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-white/15 bg-black/60 p-5 space-y-4">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase">PROFIL DU PROSPECT SIMULÉ</span>
              <h4 className="text-lg font-black text-white">{selectedProspect.name} ({selectedProspect.contact})</h4>
              <p className="text-xs text-neutral-300 mt-1">{selectedProspect.profile}</p>
            </div>

            <div className="rounded-xl bg-cyan-950/40 border border-cyan-500/30 p-3.5 text-xs text-cyan-200">
              <span className="font-bold block text-[#00f2fe] mb-0.5">💡 Conseil Tactique pour ce prospect :</span>
              {selectedProspect.scriptTip}
            </div>

            <button
              type="button"
              onClick={() => {
                setTestCallSuccess(true);
                setStudentXp(studentXp + 100);
                playSound("win");
              }}
              className="w-full rounded-2xl bg-gradient-to-r from-[#00f2fe] to-cyan-500 p-3.5 text-center text-black font-black text-sm hover:opacity-90 active:scale-95 transition shadow-lg"
            >
              🎤 Valider ma simulation d&apos;appel avec succès (+100 XP)
            </button>

            {testCallSuccess && (
              <div className="rounded-xl border-2 border-emerald-400 bg-emerald-950/60 p-4 text-xs text-emerald-300 font-bold flex items-center gap-3 animate-bounce">
                <PartyPopper className="h-5 w-5 text-yellow-300" />
                <span>Bravo ! Pitch exécuté à la perfection. Le Sensei Antoine a validé ton entraînement !</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VUE 4 : QUÊTES DU JOUR */}
      {activeTab === "quests" && (
        <div className="rounded-3xl border-2 border-white/10 bg-black/70 p-5 sm:p-7 backdrop-blur-xl shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">📜</span>
              <div>
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#00f2fe]">
                  FEUILLE DE ROUTE QUOTIDIENNE
                </span>
                <h3 className="text-xl font-black text-white">Quêtes du Jour</h3>
              </div>
            </div>
            <span className="font-mono text-xs text-cyan-300">
              {completedQuests.length} / 3 terminées
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                id: 1,
                title: "Étudier le calcul d'amortissement de la Caisse POS 2 000 € vs Uber Eats 30%",
                badge: "COURS 15 MIN",
                xp: "+150 XP",
              },
              {
                id: 2,
                title: "Simuler 2 appels d'entraînement au dojo sur la pizzeria ou le smash burger",
                badge: "PRATIQUE",
                xp: "+200 XP",
              },
              {
                id: 3,
                title: "Contrer l'objection du gérant pressé avec la frappe critique ROI",
                badge: "TEST FINAL",
                xp: "+300 XP",
              },
            ].map((quest) => {
              const isDone = completedQuests.includes(quest.id);
              return (
                <div
                  key={quest.id}
                  onClick={() => handleToggleQuest(quest.id)}
                  className={cn(
                    "rounded-2xl border-2 p-4 transition-all cursor-pointer flex items-center justify-between gap-3 group",
                    isDone
                      ? "border-emerald-500/50 bg-emerald-950/20"
                      : "border-white/10 bg-black/50 hover:border-cyan-400"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "h-7 w-7 rounded-xl border-2 flex items-center justify-center transition",
                        isDone ? "border-emerald-400 bg-emerald-500 text-black font-black" : "border-white/30"
                      )}
                    >
                      {isDone && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className={cn("text-xs sm:text-sm font-bold", isDone ? "line-through text-neutral-400" : "text-white")}>
                        {quest.title}
                      </p>
                      <span className="text-[10px] font-mono text-cyan-400">{quest.badge}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-yellow-300">{quest.xp}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VUE 5 : CONCOURS D'EGO DES VENDEURS */}
      {activeTab === "ego" && (
        <CrmEgoLeaderboard currentUserName="Karim" />
      )}
    </div>
  );
}
