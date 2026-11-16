import React, { useState } from "react";
import {
  Crown,
  Swords,
  GraduationCap,
  Lock,
  KeyRound,
  Sparkles,
  Shield,
  Coins,
  Flame,
  ArrowRight,
  Zap,
  CheckCircle2,
  Volume2,
  VolumeX
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CharacterSelectLoginProps {
  onLoginWithPin: (portal: "director" | "closer" | "student", pin: string, advisorEmail?: string) => Promise<void>;
  isLoading: boolean;
  errorMessage?: string | null;
}

interface HeroClass {
  id: "director" | "closer" | "student";
  title: string;
  subtitle: string;
  level: string;
  icon: React.ReactNode;
  auraColor: string;
  borderColor: string;
  badge: string;
  perks: string[];
  powerStat: string;
}

const HERO_CLASSES: HeroClass[] = [
  {
    id: "director",
    title: "Maître de Guilde",
    subtitle: "Direction Générale & Stratégie SASU",
    level: "NIV. 99",
    icon: <Crown className="h-8 w-8 text-[#D4AF37]" />,
    auraColor: "from-amber-500/20 via-yellow-500/10 to-transparent",
    borderColor: "border-[#D4AF37]",
    badge: "👑 QG STRATÉGIQUE",
    perks: [
      "Trésorerie & Factures SASU KARMA",
      "Attribution des Quêtes (Dispatch 1-clic)",
      "Vision Pipeline Global & Rapports",
    ],
    powerStat: "Vision 360° · Trésorerie SASU",
  },
  {
    id: "closer",
    title: "Apex Closer",
    subtitle: "Chasseur de Primes & Ventes Directes",
    level: "NIV. 4",
    icon: <Swords className="h-8 w-8 text-emerald-400" />,
    auraColor: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderColor: "border-emerald-400",
    badge: "⚔️ ARÈNE TACTIQUE",
    perks: [
      "Deck de Cibles & Pitchs Mot-à-Mot",
      "Arme WhatsApp (Maquettes 24h offertes)",
      "Coffre-Fort & Primes Cash Direct",
    ],
    powerStat: "+150 € à 500 € Cash par Deal",
  },
  {
    id: "student",
    title: "Apprenti de Guilde",
    subtitle: "Académie XR School 90 Jours",
    level: "RECRUE",
    icon: <GraduationCap className="h-8 w-8 text-sky-400" />,
    auraColor: "from-sky-500/20 via-indigo-500/10 to-transparent",
    borderColor: "border-sky-400",
    badge: "🎓 ENTRAÎNEMENT",
    perks: [
      "Dojo d'Objections & Combats IA",
      "Modules de Vente Pas-à-Pas",
      "Passerelle vers le Closing Réel",
    ],
    powerStat: "Progression & Montée en Rang",
  },
];

export function CharacterSelectLogin({
  onLoginWithPin,
  isLoading,
  errorMessage,
}: CharacterSelectLoginProps) {
  const [selectedHero, setSelectedHero] = useState<"director" | "closer" | "student">("closer");
  const [pin, setPin] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playChime = (type: "select" | "digit" | "enter") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      if (type === "select") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      } else if (type === "digit") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(700, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      } else {
        osc.type = "sine";
        osc.frequency.setValueAtTime(1046.5, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      }
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } catch {}
  };

  const handleSelectHero = (heroId: "director" | "closer" | "student") => {
    playChime("select");
    setSelectedHero(heroId);
    setPin("");
  };

  const handleDigitPress = (digit: string) => {
    playChime("digit");
    if (digit === "C") {
      setPin("");
    } else if (digit === "⌫") {
      setPin((p) => p.slice(0, -1));
    } else {
      if (pin.length < 8) {
        setPin((p) => p + digit);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin || isLoading) return;
    playChime("enter");
    onLoginWithPin(selectedHero, pin);
  };

  const currentHero = HERO_CLASSES.find((h) => h.id === selectedHero) || HERO_CLASSES[1];

  return (
    <div className="relative min-h-screen bg-[#07090E] text-[#F8FAFC] flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-8 select-none">
      
      {/* ── LUMIÈRES & NEONS CYBER-LUXE D'AMBIANCE ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full opacity-25 blur-[150px]"
          style={{
            background: "radial-gradient(circle, #D4AF37 0%, rgba(16,185,129,0.15) 50%, transparent 80%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl w-full">
        
        {/* ── EN-TÊTE ÉCRAN SÉLECTION DE PERSONNAGE ── */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#0F172A]/80 px-4 py-1.5 backdrop-blur-xl shadow-[0_0_25px_rgba(212,175,55,0.15)] mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37] animate-spin" />
            <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-[#E2D5BC] font-bold">
              XR AGENCY · TERMINAL DES HÉROS
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
            Choisissez votre classe.{" "}
            <span className="block font-light italic text-[#E2D5BC] drop-shadow-[0_4px_25px_rgba(226,213,188,0.25)]">
              Débloquez votre arène.
            </span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
            Sélectionnez votre rôle dans la guilde et entrez votre code d'accès privé pour débuter.
          </p>
        </div>

        {/* ── GRILLE DES 3 CLASSES DE HÉROS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {HERO_CLASSES.map((hero) => {
            const isSelected = selectedHero === hero.id;

            return (
              <div
                key={hero.id}
                onClick={() => handleSelectHero(hero.id)}
                className={cn(
                  "relative cursor-pointer rounded-3xl border-2 p-5 sm:p-6 transition-all duration-300 backdrop-blur-2xl overflow-hidden flex flex-col justify-between",
                  isSelected
                    ? `${hero.borderColor} bg-gradient-to-b ${hero.auraColor} shadow-[0_0_40px_rgba(212,175,55,0.3)] scale-[1.02]`
                    : "border-white/10 bg-[#0F1422]/70 hover:border-white/30 hover:bg-[#0F1422]/90"
                )}
              >
                {/* Badge niveau en haut */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#E2D5BC] bg-black/60 px-3 py-1 rounded-full border border-white/10">
                    {hero.badge}
                  </span>
                  <span className="font-mono text-[10px] font-black text-amber-300">
                    {hero.level}
                  </span>
                </div>

                {/* Avatar / Icône du Héros */}
                <div className="my-5 flex flex-col items-center text-center">
                  <div
                    className={cn(
                      "flex h-20 w-20 items-center justify-center rounded-3xl border-2 p-4 shadow-xl transition-transform duration-300",
                      isSelected
                        ? "border-[#D4AF37] bg-black/70 scale-110 shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                        : "border-white/10 bg-white/5"
                    )}
                  >
                    {hero.icon}
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-white tracking-wide">
                    {hero.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-neutral-400 font-light">
                    {hero.subtitle}
                  </p>
                </div>

                {/* Pouvoirs / Atouts de la classe */}
                <div className="border-t border-white/10 pt-3 space-y-1.5">
                  {hero.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-neutral-300">
                      <Zap className="h-3 w-3 text-[#D4AF37] shrink-0" />
                      <span className="truncate">{perk}</span>
                    </div>
                  ))}
                </div>

                {/* Indicateur de Sélection */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-neutral-400">{hero.powerStat}</span>
                  {isSelected && (
                    <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" /> CHOISI
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── TERMINAL DE DÉVERROUILLAGE PIN TACTILE ── */}
        <div className="max-w-md mx-auto rounded-3xl border border-[#D4AF37]/35 bg-[#0B0F19]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-[#D4AF37]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E2D5BC]">
                  CODE D&apos;ACCÈS · {currentHero.title.toUpperCase()}
                </span>
              </div>
              <Lock className="h-4 w-4 text-neutral-500" />
            </div>

            {/* Affichage des points de saisie masqués */}
            <div className="py-2">
              <div className="flex justify-center gap-2.5">
                {[0, 1, 2, 3, 4, 5].map((idx) => {
                  const isFilled = pin.length > idx;
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "h-12 w-12 rounded-2xl border-2 flex items-center justify-center font-mono text-2xl font-black transition-all duration-200",
                        isFilled
                          ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#E2D5BC] shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105"
                          : "border-white/15 bg-black/40 text-neutral-600"
                      )}
                    >
                      {isFilled ? "•" : ""}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Clavier numérique rétro arcade */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => handleDigitPress(digit)}
                  className="rounded-2xl border border-white/10 bg-white/5 py-3 font-mono text-lg font-bold text-white transition hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 active:scale-95"
                >
                  {digit}
                </button>
              ))}
            </div>

            {errorMessage && (
              <p className="rounded-xl border border-red-500/40 bg-red-500/15 p-2.5 text-center font-mono text-xs text-red-300">
                {errorMessage}
              </p>
            )}

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isLoading || pin.length < 3}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#E2D5BC] py-4 text-xs font-black uppercase tracking-widest text-[#080B10] shadow-[0_10px_30px_rgba(226,213,188,0.3)] transition hover:bg-white hover:-translate-y-0.5 active:scale-95 disabled:opacity-40"
            >
              <Zap className="h-4 w-4 fill-current" />
              <span>{isLoading ? "Déverrouillage..." : "Déverrouiller le Terminal"}</span>
            </button>

            <div className="text-center pt-2 text-[10px] font-mono text-neutral-500 flex items-center justify-center gap-1.5">
              <Lock className="h-3 w-3" />
              <span>Accès strictement réservé · Code délivré en privé par la Direction</span>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
