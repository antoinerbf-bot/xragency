import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Eye,
  Laptop,
  MessageCircle,
  Play,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import heroCinematic from "@/assets/hero-cinematic.jpg";
import { audioEngine } from "@/lib/audioExperience";

const WHATSAPP_PHONE = "33767566783";

export function ImmersiveStudioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [soundActive, setSoundActive] = useState(false);
  const [activeScreen, setActiveScreen] = useState<"poke" | "maps" | "code">("poke");

  useEffect(() => {
    setSoundActive(audioEngine.active);
    const unsub = audioEngine.subscribe((act) => setSoundActive(act));

    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return unsub;

    let frame = 0;
    const handleScroll = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      image.style.transform = `scale(${1 + progress * 0.08}) translate3d(0, ${(progress * 40).toFixed(1)}px, 0)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(900px circle at ${x}% ${y}%, rgba(212,175,55,0.18), rgba(0,0,0,0) 65%)`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    section.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      unsub();
      window.removeEventListener("scroll", onScroll);
      section.removeEventListener("mousemove", handleMouseMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const toggleSound = () => {
    audioEngine.toggle();
    setSoundActive(audioEngine.active);
  };

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    "Bonjour Antoine, je découvre les bureaux immersifs de XR Agency et je souhaite échanger sur mon projet."
  )}`;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#030406] text-white flex flex-col justify-between"
    >
      {/* ── 1. CINEMATIC REAL PARISIAN ATELIER PENTHOUSE BACKDROP ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <img
          ref={imageRef}
          src={heroCinematic}
          alt="Studio XR Agency Paris — Équipe de direction & ingénierie face à la Tour Eiffel"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] md:object-[60%_35%] brightness-[0.72] contrast-[1.12] saturate-[1.08] transition-transform duration-300 ease-out will-change-transform"
        />

        {/* Interactive Mouse Spotlight Flare */}
        <div
          ref={spotlightRef}
          className="absolute inset-0 transition-opacity duration-200 pointer-events-none mix-blend-screen"
          style={{
            background: "radial-gradient(900px circle at 60% 40%, rgba(212,175,55,0.14), transparent 70%)",
          }}
        />

        {/* Luxury Vignettes: Deep Obsidian on Left & Bottom for Legibility, Luminous View on Right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030406] via-[#030406]/85 to-[#030406]/30 sm:to-[#030406]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030406] via-[#030406]/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.12)_0%,transparent_60%)]" />
      </div>

      {/* ── 2. TOP TELEMETRY STRIP ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1680px] px-5 sm:px-8 lg:px-14 pt-24 sm:pt-28">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-[#d4af37] shadow-[0_0_12px_#d4af37] animate-pulse" />
            <span className="font-mono text-[8px] sm:text-[9.5px] font-bold uppercase tracking-[0.24em] text-neutral-300">
              ATELIER PARIS 8E · VUE TOUR EIFFEL · HUB ĐÀ NẴNG / SAIGON
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-300 hover:text-white hover:border-[#d4af37] backdrop-blur-xl transition"
              title="Ambiance sonore du studio"
            >
              {soundActive ? (
                <>
                  <Volume2 className="h-3 w-3 text-[#d4af37] animate-pulse" />
                  <span>STUDIO SOUND [ON]</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3 w-3 text-neutral-400" />
                  <span>STUDIO SOUND [OFF]</span>
                </>
              )}
            </button>

            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-[9px] font-bold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              ÉQUIPE ACTIVE EN LIGNE
            </span>
          </div>
        </div>
      </div>

      {/* ── 3. HERO CONTENT & INTERACTIVE SHOWROOM OVERLAY ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1680px] px-5 sm:px-8 lg:px-14 py-8 sm:py-12 my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Monumental Editorial Value Proposition */}
        <div className="lg:col-span-7 space-y-6 text-left max-w-[760px]">
          {/* Trust Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1.5 backdrop-blur-xl shadow-lg">
              <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
              <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                ★ 4.9/5 · STUDIO DE PRESTIGE &amp; RÉSULTATS
              </span>
            </div>

            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[9px] text-neutral-300">
              LIVRAISON 5 À 7 JOURS OUVRÉS
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-[clamp(2.6rem,5.6vw,6.4rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-white [text-wrap:balance] drop-shadow-[0_18px_45px_rgba(0,0,0,0.8)]">
            <span>L&apos;ÉLÉGANCE DIGITALE.</span>
            <span className="block font-serif font-light italic text-[#d4af37] tracking-normal mt-2">
              La Machine à Vendre.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg leading-[1.75] text-[#f7f4eb] font-normal max-w-[620px] drop-shadow-md">
            Des sites web exceptionnels, une image de marque forte et une visibilité locale puissante sur Google Maps.
          </p>

          {/* Dual Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 pointer-events-auto">
            <a
              href="#offres"
              className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#f3e8c8] via-[#d4af37] to-[#a3784a] px-8 py-4 text-xs font-black uppercase tracking-[0.16em] text-[#050608] shadow-[0_10px_35px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_55px_rgba(212,175,55,0.5)]"
            >
              <span>Découvrir nos solutions</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#diagnostic"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#d4af37]/60 bg-[#d4af37]/10 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#e8dcc4] backdrop-blur-xl transition hover:border-[#d4af37] hover:bg-[#d4af37]/25 shadow-xl"
            >
              <Sparkles className="h-4 w-4 text-[#d4af37]" />
              <span>Obtenir mon diagnostic</span>
            </a>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 px-5 py-4 text-xs font-bold text-emerald-300 backdrop-blur-xl transition shadow-lg"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          {/* Quick Assurance */}
          <p className="text-[11px] text-neutral-400 pt-1 flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>0 € de frais cachés · Devis contractuel ferme et définitif · Accompagnement dédié</span>
          </p>
        </div>

        {/* Right Column: Live Interactive Studio Displays (Holographic Workspace) */}
        <div className="lg:col-span-5 pointer-events-auto">
          <div className="rounded-3xl border border-white/15 bg-[#090b10]/90 p-5 sm:p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Laptop className="h-4 w-4 text-[#d4af37]" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                  ÉCRANS EN DIRECT · ATELIER PROJETS
                </span>
              </div>
              <span className="rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 px-2 py-0.5 font-mono text-[8px] font-bold text-[#d4af37]">
                PARIS 11E
              </span>
            </div>

            {/* Screen Selector Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setActiveScreen("poke")}
                className={`py-2 px-2 rounded-lg font-bold text-[10px] transition ${
                  activeScreen === "poke" ? "bg-[#d4af37] text-black shadow" : "text-neutral-400 hover:text-white"
                }`}
              >
                1. Poke-N-Ball
              </button>
              <button
                type="button"
                onClick={() => setActiveScreen("maps")}
                className={`py-2 px-2 rounded-lg font-bold text-[10px] transition ${
                  activeScreen === "maps" ? "bg-[#d4af37] text-black shadow" : "text-neutral-400 hover:text-white"
                }`}
              >
                2. Maps Top 3
              </button>
              <button
                type="button"
                onClick={() => setActiveScreen("code")}
                className={`py-2 px-2 rounded-lg font-bold text-[10px] transition ${
                  activeScreen === "code" ? "bg-[#d4af37] text-black shadow" : "text-neutral-400 hover:text-white"
                }`}
              >
                3. VSL Film 55s
              </button>
            </div>

            {/* Display Body */}
            {activeScreen === "poke" && (
              <div className="space-y-3 pt-1 animate-in fade-in">
                <div className="rounded-2xl border border-white/10 bg-black/70 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Poke-N-Ball Paris 11e</span>
                    <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-2 py-0.5 font-mono text-[9px] font-bold">
                      +340% Commandes
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Plateforme web mobile sur-mesure déployée en 6 jours. Zéro commission prélevée sur les habitués.
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-[#d4af37]">
                    <span>Score Vitesse : 98/100</span>
                    <a href="#case-study-poke" className="underline hover:text-white flex items-center gap-1">
                      Voir l&apos;étude de cas →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeScreen === "maps" && (
              <div className="space-y-3 pt-1 animate-in fade-in">
                <div className="rounded-2xl border border-white/10 bg-black/70 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Google Maps Conquête</span>
                    <span className="rounded-full bg-amber-400/20 text-amber-300 px-2 py-0.5 font-mono text-[9px] font-bold">
                      Top 1 à 3 Local
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Positionnement agressif dans le pack local Google pour capter les appels et itinéraires des clients de votre ville.
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-[#d4af37]">
                    <span>Dès 550 € contractuel</span>
                    <a href="#packs" className="underline hover:text-white flex items-center gap-1">
                      Voir le Pack Visibilité →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeScreen === "code" && (
              <div className="space-y-3 pt-1 animate-in fade-in">
                <div className="rounded-2xl border border-white/10 bg-black/70 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Film Studio XR Agency</span>
                    <span className="rounded-full bg-cyan-400/20 text-cyan-300 px-2 py-0.5 font-mono text-[9px] font-bold">
                      55 Secondes
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Plongez dans les coulisses de nos productions digitales de prestige et découvrez notre méthode opérationnelle.
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-[#d4af37]">
                    <span>Visionner la vidéo</span>
                    <a href="#vsl-showcase" className="underline hover:text-white flex items-center gap-1">
                      Lancer le lecteur →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Direct Audit CTA Banner */}
            <a
              href="#audit-express"
              className="w-full flex items-center justify-between rounded-xl border border-[#d4af37]/30 bg-gradient-to-r from-[#d4af37]/15 to-transparent p-3 text-xs font-bold text-white hover:border-[#d4af37] transition"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#d4af37]" />
                <span>Tester la visibilité de mon entreprise</span>
              </div>
              <ArrowRight className="h-4 w-4 text-[#d4af37]" />
            </a>

          </div>
        </div>

      </div>

      {/* ── 4. BOTTOM TELEMETRY HUD TILES ── */}
      <div className="relative z-10 border-t border-white/10 bg-[#06070a]/90 backdrop-blur-xl py-6 px-5 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1680px] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-white">5 à 7 j</p>
            <p className="text-[11px] font-medium text-neutral-400 mt-0.5">Délai moyen garanti vitrine &amp; business</p>
          </div>
          <div className="border-l border-white/10 pl-6">
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-[#d4af37]">Top 3</p>
            <p className="text-[11px] font-medium text-neutral-400 mt-0.5">Objectif d&apos;autorité Google Maps local</p>
          </div>
          <div className="border-l border-white/10 pl-6">
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-white">100%</p>
            <p className="text-[11px] font-medium text-neutral-400 mt-0.5">Propriétaire exclusif du code &amp; domaine</p>
          </div>
          <div className="border-l border-white/10 pl-6">
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-400">48 500 €</p>
            <p className="text-[11px] font-medium text-neutral-400 mt-0.5">Trésorerie &amp; solvabilité garantie agence</p>
          </div>
        </div>
      </div>
    </section>
  );
}
