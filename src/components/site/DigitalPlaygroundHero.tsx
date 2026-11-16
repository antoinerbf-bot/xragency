import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Share2,
  MapPin,
  Search,
  Zap,
  Bot,
  Check,
  Plus,
  Volume2,
  VolumeX,
  Compass,
  Trophy,
  Flame,
  ChevronRight
} from "lucide-react";
import { useFunnel } from "@/lib/funnel";
import heroPlaygroundImg from "@/assets/hero-digital-playground.jpg";

interface MissionPin {
  id: string;
  funnelServiceId: string;
  label: string;
  icon: React.ReactNode;
  tag: string;
  metric: string;
  description: string;
  desktopCoords: { top: string; left: string };
  badgeColor: string;
}

const MISSIONS: MissionPin[] = [
  {
    id: "web",
    funnelServiceId: "website",
    label: "Site Web",
    icon: <Code2 className="h-4 w-4" />,
    tag: "Vitrine & E-Commerce",
    metric: "Conversion x3",
    description: "Design haute joaillerie, vitesse 99/100, tunnel d'achat fluide & zéro commission.",
    desktopCoords: { top: "22%", left: "18%" },
    badgeColor: "from-blue-500/20 to-cyan-500/20 border-cyan-400/50 text-cyan-200",
  },
  {
    id: "social",
    funnelServiceId: "social",
    label: "Réseaux Sociaux",
    icon: <Share2 className="h-4 w-4" />,
    tag: "Shorts, Reels & TikTok",
    metric: "+150k vues/mois",
    description: "Vidéos professionnelles, hooks percutants et acquisition organique garantie.",
    desktopCoords: { top: "20%", left: "72%" },
    badgeColor: "from-pink-500/20 to-purple-500/20 border-pink-400/50 text-pink-200",
  },
  {
    id: "maps",
    funnelServiceId: "maps",
    label: "Google Maps",
    icon: <MapPin className="h-4 w-4" />,
    tag: "Pack Local & NFC",
    metric: "+340% d'appels",
    description: "Top 3 garanti dans votre zone, fiches optimisées et collecte automatisée d'avis 5★.",
    desktopCoords: { top: "48%", left: "78%" },
    badgeColor: "from-emerald-500/20 to-teal-500/20 border-emerald-400/50 text-emerald-200",
  },
  {
    id: "seo",
    funnelServiceId: "seo",
    label: "SEO",
    icon: <Search className="h-4 w-4" />,
    tag: "Domination Mots-Clés",
    metric: "Trafic pérenne 24/7",
    description: "Positionnement en 1ère page Google sur vos mots-clés les plus rentables sans payer d'ads.",
    desktopCoords: { top: "48%", left: "14%" },
    badgeColor: "from-amber-500/20 to-yellow-500/20 border-amber-400/50 text-amber-200",
  },
  {
    id: "branding",
    funnelServiceId: "branding",
    label: "Branding",
    icon: <Zap className="h-4 w-4" />,
    tag: "Identité de Marque",
    metric: "+40% valeur perçue",
    description: "Logo, typographie, charte de prestige et stature qui justifie des prix haut de gamme.",
    desktopCoords: { top: "76%", left: "22%" },
    badgeColor: "from-amber-600/20 to-orange-500/20 border-[#D4AF37]/60 text-[#E2D5BC]",
  },
  {
    id: "ia",
    funnelServiceId: "robotics",
    label: "IA & Automatisation",
    icon: <Bot className="h-4 w-4" />,
    tag: "Agents & CRM 24/7",
    metric: "15h gagnées/sem.",
    description: "Agents IA d'accueil, synchronisation automatique devis/factures et relances WhatsApp intelligentes.",
    desktopCoords: { top: "75%", left: "68%" },
    badgeColor: "from-indigo-500/20 to-violet-500/20 border-violet-400/50 text-violet-200",
  },
];

export function DigitalPlaygroundHero({
  onSwitchToEditorial,
}: {
  onSwitchToEditorial?: () => void;
}) {
  const { selectedServices, toggleService, setServices } = useFunnel();
  const [activePin, setActivePin] = useState<string>("web");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isHoveredMap, setIsHoveredMap] = useState(false);

  // Synth sonore Web Audio pour effet ludique immédiat sans fichier audio externe
  const playPlaygroundSound = (type: "pin" | "complete" | "toggle") => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "pin") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.16);
      } else if (type === "toggle") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15); // G5
        gain.gain.setValueAtTime(0.09, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.start();
        osc.stop(ctx.currentTime + 0.19);
      } else {
        // level-up chord
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = "sine";
          o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.05);
          g.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.05);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
          o.start(ctx.currentTime + i * 0.05);
          o.stop(ctx.currentTime + 0.4);
        });
      }
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const handleToggleMission = (pin: MissionPin) => {
    playPlaygroundSound("toggle");
    toggleService(pin.funnelServiceId);
    setActivePin(pin.id);
  };

  const handleSelectAll = () => {
    playPlaygroundSound("complete");
    setServices(MISSIONS.map((m) => m.funnelServiceId));
  };

  const activeMission = MISSIONS.find((m) => m.id === activePin) || MISSIONS[0];

  const selectedCount = MISSIONS.filter((m) =>
    selectedServices.includes(m.funnelServiceId)
  ).length;

  const powerPercent = Math.round((selectedCount / MISSIONS.length) * 100);

  const getPowerTier = () => {
    if (powerPercent >= 100) return { title: "👑 Domination Totale 360°", color: "text-[#D4AF37]" };
    if (powerPercent >= 60) return { title: "🔥 Écosystème Haute Performance", color: "text-amber-400" };
    if (powerPercent >= 30) return { title: "⚡ Arsenal Hybride Actif", color: "text-emerald-400" };
    return { title: "🎯 Starterpack Prêt", color: "text-cyan-400" };
  };

  const powerTier = getPowerTier();

  const scrollToDiagnostic = () => {
    playPlaygroundSound("pin");
    const elem = document.getElementById("tunnel-secteurs") || document.getElementById("quote");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#07090E] text-[#F8FAFC] pt-20 pb-16 lg:pt-28 lg:pb-20 flex flex-col justify-center"
    >
      {/* ── LUMIÈRES & NEONS CYBER-LUXE D'AMBIANCE ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 right-1/4 h-[600px] w-[600px] rounded-full opacity-25 blur-[140px]"
          style={{
            background: "radial-gradient(circle, #D4AF37 0%, rgba(16,185,129,0.15) 50%, transparent 80%)",
          }}
        />
        <div
          className="absolute bottom-10 left-10 h-[500px] w-[500px] rounded-full opacity-20 blur-[130px]"
          style={{
            background: "radial-gradient(circle, #06B6D4 0%, rgba(139,92,246,0.15) 70%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1720px] w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        
        {/* ── EN-TÊTE / TOP BAR DU PLAYGROUND ── */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-[#0F172A]/80 px-4 py-1.5 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-300">
              05 Digital Playground · Univers 3D Interactif
            </span>
          </div>

          {/* Outils d'interaction (Audio & Switcher vers Editorial) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] text-neutral-300 backdrop-blur-md transition hover:border-[#D4AF37]/50 hover:text-white"
              title="Effets sonores ludiques"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="h-3 w-3 text-emerald-400" />
                  <span className="hidden sm:inline">Son Activé</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3 w-3 text-neutral-500" />
                  <span className="hidden sm:inline">Son Muet</span>
                </>
              )}
            </button>

            {onSwitchToEditorial && (
              <button
                type="button"
                onClick={onSwitchToEditorial}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-300 backdrop-blur-md transition hover:border-[#D4AF37] hover:bg-white/5 hover:text-[#E2D5BC]"
              >
                <span>Mode Éditorial</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {/* ── TITRE DU CONCEPT 05 DE L'ESQUISSE ── */}
        <div className="mb-8 max-w-4xl">
          <h1 className="font-serif text-[clamp(2.4rem,5vw,5rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
            Choisissez vos missions.{" "}
            <span className="block font-light italic text-[#E2D5BC] drop-shadow-[0_4px_30px_rgba(226,213,188,0.3)]">
              On s'occupe du reste.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] sm:text-[17px] font-light text-neutral-300">
            Explorez l'archipel digital de XR Agency en 3D. Cliquez sur les leviers pour composer votre arsenal et booster votre visibilité.
          </p>
        </div>

        {/* ── GRILLE PRINCIPALE DU PLAYGROUND ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ── COLONNE GAUCHE (7 cols) : L'ÎLE 3D INTERACTIVE AVEC PINS FLOTTANTS ── */}
          <div className="lg:col-span-8 relative">
            <div
              className={`group relative overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/35 bg-[#0A0D14] shadow-[0_30px_120px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-500 ${
                isHoveredMap ? "border-[#D4AF37]/70 shadow-[0_30px_140px_rgba(212,175,55,0.25)]" : ""
              }`}
              onMouseEnter={() => setIsHoveredMap(true)}
              onMouseLeave={() => setIsHoveredMap(false)}
            >
              
              {/* Image de fond de l'île 3D */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black select-none">
                <img
                  src={heroPlaygroundImg}
                  alt="Digital Playground 3D XR Agency"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="eager"
                />

                {/* Voile dégradé cinématographique pour faire ressortir les pins néons */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-black/25 to-black/30 pointer-events-none" />

                {/* ── PINS INTERACTIFS FLOTTANTS SUR L'ÎLE 3D ── */}
                {MISSIONS.map((pin) => {
                  const isSelected = selectedServices.includes(pin.funnelServiceId);
                  const isCurrentActive = activePin === pin.id;

                  return (
                    <div
                      key={pin.id}
                      style={{
                        top: pin.desktopCoords.top,
                        left: pin.desktopCoords.left,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
                      onClick={() => handleToggleMission(pin)}
                      onMouseEnter={() => {
                        setActivePin(pin.id);
                        playPlaygroundSound("pin");
                      }}
                    >
                      {/* Aura néon pulsante si sélectionné */}
                      {isSelected && (
                        <span className="absolute -inset-2 rounded-full bg-[#D4AF37]/30 blur-md animate-pulse" />
                      )}

                      {/* Badge du Pin */}
                      <div
                        className={`relative flex items-center gap-2 rounded-full border px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold tracking-wide backdrop-blur-xl shadow-2xl transition-all duration-300 ${
                          isSelected
                            ? "border-[#D4AF37] bg-[#D4AF37] text-black shadow-[0_0_25px_rgba(212,175,55,0.6)]"
                            : isCurrentActive
                            ? "border-cyan-400 bg-cyan-950/90 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                            : "border-white/20 bg-black/80 text-white hover:border-white/50"
                        }`}
                      >
                        <span className="text-base sm:text-lg">{pin.icon}</span>
                        <span>{pin.label}</span>
                        <span
                          className={`ml-1 grid h-4 w-4 place-items-center rounded-full text-[9px] font-black ${
                            isSelected
                              ? "bg-black text-[#D4AF37]"
                              : "bg-white/20 text-white"
                          }`}
                        >
                          {isSelected ? <Check className="h-2.5 w-2.5" /> : <Plus className="h-2.5 w-2.5" />}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Badge d'aide tactile en bas de l'image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-neutral-300 backdrop-blur-md">
                    <Compass className="h-3 w-3 text-[#D4AF37] animate-spin" />
                    Cliquez sur les zones pour activer
                  </span>
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3 py-1 font-mono text-[9px] font-bold text-emerald-300 backdrop-blur-md">
                    {selectedCount}/6 LEVIERS ACTIVÉS
                  </span>
                </div>

              </div>

              {/* ── BARRE DE SÉLECTION RAPIDE SOUS L'ÎLE (SMARTPHONE ET DESKTOP) ── */}
              <div className="border-t border-white/10 bg-[#0F172A]/90 p-3 sm:p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  <div className="flex items-center gap-2">
                    {MISSIONS.map((pin) => {
                      const isSelected = selectedServices.includes(pin.funnelServiceId);
                      return (
                        <button
                          key={pin.id}
                          type="button"
                          onClick={() => handleToggleMission(pin)}
                          className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-[10px] transition-all duration-200 ${
                            isSelected
                              ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#E2D5BC] font-bold"
                              : "border-white/10 bg-white/5 text-neutral-400 hover:text-white"
                          }`}
                        >
                          <span>{pin.label}</span>
                          {isSelected ? (
                            <Check className="h-3 w-3 text-[#D4AF37]" />
                          ) : (
                            <Plus className="h-3 w-3 opacity-40" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="shrink-0 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-1.5 font-mono text-[9.5px] font-bold text-[#E2D5BC] uppercase tracking-wider hover:bg-[#D4AF37] hover:text-black transition"
                  >
                    Pack 360° (Tout)
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ── COLONNE DROITE (4 cols) : PANNEAU DE BORD DE LA QUÊTE DU CLIENT ── */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* Carte Focus de la mission survolée/active */}
            <div className="rounded-3xl border border-[#D4AF37]/35 bg-[#0F172A]/85 p-6 backdrop-blur-2xl shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E2D5BC]">
                    {activeMission.icon}
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                      Levier Sélectionné
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {activeMission.label}
                    </h3>
                  </div>
                </div>

                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-bold text-emerald-400">
                  {activeMission.metric}
                </span>
              </div>

              <div className="py-4">
                <span className="inline-block rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-[#E2D5BC]">
                  {activeMission.tag}
                </span>
                <p className="mt-3 text-xs sm:text-sm font-light text-neutral-300 leading-relaxed">
                  {activeMission.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleToggleMission(activeMission)}
                className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition ${
                  selectedServices.includes(activeMission.funnelServiceId)
                    ? "border border-[#D4AF37]/60 bg-[#D4AF37]/20 text-[#E2D5BC] hover:bg-rose-500/20 hover:border-rose-500 hover:text-rose-200"
                    : "border border-cyan-500/50 bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500 hover:text-black"
                }`}
              >
                {selectedServices.includes(activeMission.funnelServiceId) ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Mission Activée (Retirer)</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Ajouter à mon Arsenal</span>
                  </>
                )}
              </button>
            </div>

            {/* Jauge de Puissance Digitale Globale */}
            <div className="rounded-3xl border border-white/15 bg-[#0F172A]/70 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-amber-400 animate-bounce" />
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-300">
                    Puissance Digitale
                  </span>
                </div>
                <span className="font-mono text-lg font-black text-white">
                  {powerPercent}%
                </span>
              </div>

              {/* Barre de progression */}
              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white/10 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-amber-400 to-[#D4AF37] transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                  style={{ width: `${Math.max(powerPercent, 15)}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className={`font-semibold ${powerTier.color}`}>
                  {powerTier.title}
                </span>
                <span className="font-mono text-neutral-400">
                  {selectedCount} levier{selectedCount > 1 ? "s" : ""} actif{selectedCount > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Bouton d'Action Principal exact du Concept 05 */}
            <button
              type="button"
              onClick={scrollToDiagnostic}
              className="group relative flex w-full min-h-[58px] items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#E2D5BC] px-8 py-4 text-xs font-black uppercase tracking-[0.16em] text-[#080B10] shadow-[0_12px_40px_rgba(226,213,188,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_50px_rgba(226,213,188,0.5)] active:scale-[0.98]"
            >
              <span>Lancer mon parcours</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
