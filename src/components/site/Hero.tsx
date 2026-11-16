import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Code2,
  Globe2,
  MapPin,
  Monitor,
  Play,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { XR_HERO_PHOTO, XR_PHOTOS } from "@/lib/photography";
import { useFunnel } from "@/lib/funnel";
import { HERO_FUNNEL_PILLS } from "@/lib/funnel-i18n";

export function Hero() {
  const { t, lang } = useLang();
  const currentLang = (lang || "fr") as Lang;
  const { applyGoalPreset } = useFunnel();
  const sectionRef = useRef<HTMLElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const heroSpotlightRef = useRef<HTMLDivElement>(null);

  const [bgMuted, setBgMuted] = useState(true);
  const [cinemaModalOpen, setCinemaModalOpen] = useState(false);
  const [activeStudioTab, setActiveStudioTab] = useState<"web" | "maps" | "ai">("web");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      if (heroSpotlightRef.current) {
        heroSpotlightRef.current.style.background = `radial-gradient(900px circle at ${x}% ${y}%, rgba(197,168,128,0.18), rgba(197,168,128,0.04) 45%, transparent 80%)`;
      }
    };

    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const toggleBgAudio = () => {
    const v = bgVideoRef.current;
    if (!v) return;
    const nextMuted = !bgMuted;
    v.muted = nextMuted;
    setBgMuted(nextMuted);
    if (!nextMuted) {
      v.play().catch(() => {});
    }
  };

  const openFullFilm = () => {
    setCinemaModalOpen(true);
    setTimeout(() => {
      modalVideoRef.current?.play().catch(() => {});
    }, 80);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="xr-hero relative isolate min-h-[100svh] overflow-hidden bg-[#06070a] text-white"
    >
      {/* ── ARRIÈRE-PLAN VIDÉO D'AMBIANCE STUDIO 4K (SANS TEXTE PARASITE) ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          ref={bgVideoRef}
          className="absolute inset-0 h-full w-full object-cover object-center contrast-[1.12] brightness-[0.82] saturate-[1.08] scale-[1.02]"
          autoPlay
          muted={bgMuted}
          loop
          playsInline
          preload="auto"
          poster={XR_HERO_PHOTO}
        >
          <source src="/videos/hero-ambient-loop.mp4" type="video/mp4" />
        </video>

        {/* Halo interactif doré au suivi du curseur */}
        <div
          ref={heroSpotlightRef}
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none mix-blend-screen"
          style={{
            background:
              "radial-gradient(900px circle at 68% 45%, rgba(197,168,128,0.16), transparent 80%)",
          }}
        />

        {/* Dégradés d'orfèvrerie : lisibilité parfaite à gauche, clarté cristalline à droite */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,7,10,0.94)_0%,rgba(6,7,10,0.82)_38%,rgba(6,7,10,0.42)_68%,rgba(6,7,10,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#06070a_0%,rgba(6,7,10,0.4)_18%,transparent_45%)]" />
      </div>

      {/* ── GRILLE PRINCIPALE HERO : ÉDITORIAL GAUCHE + COCKPIT INTERACTIF DROITE ── */}
      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1700px] items-center gap-10 px-5 pb-14 pt-24 sm:px-8 md:pt-28 lg:grid-cols-12 lg:px-14 xl:px-20">
        {/* Colonne Gauche (7 cols) : Positionnement 360° & Actions */}
        <div className="lg:col-span-7 max-w-[780px]">
          <div className="mb-4 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-[#c5a880]/45 bg-black/60 px-4 py-1.5 backdrop-blur-xl shadow-lg">
            <span className="h-2 w-2 rounded-full bg-[#c5a880] animate-pulse" />
            <span className="label-mono text-[8px] tracking-[.22em] text-[#e5cba4] sm:text-[9px]">
              {t(UI.heroKicker)}
            </span>
          </div>

          <h1 className="xr-hero-heading max-w-[760px] text-[clamp(2.4rem,4.7vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-white drop-shadow-[0_14px_40px_rgba(0,0,0,0.9)] [text-wrap:balance]">
            <span className="block">{t(UI.heroTitle1)}</span>
            <span className="mt-1 block font-serif font-light italic tracking-tight text-[#dfc39d]">
              {t(UI.heroTitleAccent)}
            </span>
            <span className="mt-1 block">{t(UI.heroTitle2)}</span>
          </h1>

          <p className="mt-4 max-w-[610px] text-[13.5px] leading-relaxed text-white/85 drop-shadow sm:mt-5 sm:text-[15px] sm:leading-7">
            {t(UI.heroLead)}
          </p>

          {/* Boutons d'Action Principaux */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#tunnel-secteurs"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#c5a880] px-6 py-3.5 text-[10px] font-black uppercase tracking-[.13em] text-[#090a0d] shadow-[0_12px_40px_rgba(197,168,128,0.42)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e3c9a4] sm:min-w-[225px]"
            >
              <span>Démarrer mon projet</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <button
              type="button"
              onClick={openFullFilm}
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-[#c5a880]/50 bg-black/65 px-5 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-white backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#c5a880] hover:bg-black/85"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#c5a880] text-[#090a0d]">
                <Play className="h-3 w-3 fill-current ml-0.5" />
              </span>
              <span>Découvrir en 1 min</span>
            </button>

            <a
              href="#audit"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-[9.5px] font-semibold uppercase tracking-[.1em] text-white/90 backdrop-blur-md transition duration-300 hover:border-[#c5a880] hover:bg-white/10"
            >
              {t(UI.heroCtaAudit)}
              <Search className="h-3.5 w-3.5 text-[#c5a880]" />
            </a>
          </div>

          {/* Chiffres d'autorité du Concept 01 de l'esquisse */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/15 pt-5 max-w-[500px]">
            <div>
              <strong className="block font-mono text-2xl font-bold text-white">+300</strong>
              <span className="text-[11px] text-white/65">Projets réalisés</span>
            </div>
            <div>
              <strong className="block font-mono text-2xl font-bold text-[#c5a880]">10 ans</strong>
              <span className="text-[11px] text-white/65">d'expertise</span>
            </div>
            <div>
              <strong className="block font-mono text-2xl font-bold text-white">50 experts</strong>
              <span className="text-[11px] text-white/65">à l'international</span>
            </div>
          </div>

          {/* 4 Accès Directs par Objectif Stratégique */}
          <div className="mt-7 border-t border-white/15 pt-5">
            <span className="mb-2.5 block label-mono text-[7px] uppercase tracking-[.22em] text-[#e5cba4]">
              {currentLang === "fr"
                ? "Accès direct par objectif stratégique :"
                : currentLang === "vi"
                  ? "Truy cập nhanh theo mục tiêu chiến lược :"
                  : "Direct access by strategic goal:"}
            </span>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {HERO_FUNNEL_PILLS.map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => applyGoalPreset(pill.id)}
                  className="group relative flex flex-col items-start rounded-2xl border border-white/15 bg-black/60 p-3 text-left shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c5a880] hover:bg-black/80 active:scale-[0.98]"
                >
                  <span className="mb-1 text-base">{pill.icon}</span>
                  <span className="text-[10px] font-bold leading-tight text-white transition group-hover:text-[#e5cba4]">
                    {pill.label[currentLang] ?? pill.label.fr}
                  </span>
                  <span className="mt-0.5 line-clamp-1 text-[8px] text-white/65">
                    {pill.sub[currentLang] ?? pill.sub.fr}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne Droite (5 cols) : Console Interactive Studio XR 360° */}
        <div className="lg:col-span-5 flex flex-col items-end justify-center">
          <div className="w-full max-w-[540px] overflow-hidden rounded-[2rem] border border-[#c5a880]/45 bg-[#0c0e13]/90 p-5 shadow-[0_35px_100px_rgba(0,0,0,0.92)] backdrop-blur-2xl">
            {/* Barre supérieure du Cockpit */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#e5cba4]">
                  STUDIO XR AGENCY · ARCHITECTURE EN DIRECT
                </span>
              </div>
              <button
                type="button"
                onClick={toggleBgAudio}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[8.5px] font-bold text-white/80 hover:border-[#c5a880] hover:text-white"
              >
                {bgMuted ? (
                  <>
                    <VolumeX className="h-3 w-3 text-white/60" /> Ambiance [OFF]
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3 w-3 text-[#c5a880]" /> Ambiance [ON]
                  </>
                )}
              </button>
            </div>

            {/* Sélecteur interactif des 3 Pôles Majeurs */}
            <div className="mt-3.5 grid grid-cols-3 gap-1.5 rounded-2xl border border-white/10 bg-black/50 p-1">
              <button
                type="button"
                onClick={() => setActiveStudioTab("web")}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-[10px] font-bold transition ${
                  activeStudioTab === "web"
                    ? "bg-[#c5a880] text-[#090a0d] shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Monitor className="h-3.5 w-3.5" /> 1. Web & Design
              </button>
              <button
                type="button"
                onClick={() => setActiveStudioTab("maps")}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-[10px] font-bold transition ${
                  activeStudioTab === "maps"
                    ? "bg-[#c5a880] text-[#090a0d] shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <MapPin className="h-3.5 w-3.5" /> 2. Maps Top 3
              </button>
              <button
                type="button"
                onClick={() => setActiveStudioTab("ai")}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-[10px] font-bold transition ${
                  activeStudioTab === "ai"
                    ? "bg-[#c5a880] text-[#090a0d] shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Bot className="h-3.5 w-3.5" /> 3. IA & Robots
              </button>
            </div>

            {/* Écran Dynamique selon l'onglet sélectionné */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/15 bg-black/70">
              {activeStudioTab === "web" && (
                <div className="relative">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <video
                      src="/videos/hero-ambient-loop.mp4"
                      poster={XR_PHOTOS.websites}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="rounded-full border border-emerald-400/40 bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[8.5px] font-bold text-emerald-300 backdrop-blur-md">
                        ● MAQUETTE VALIDÉE EN 24–48H
                      </span>
                      <span className="rounded-full bg-[#c5a880] px-2.5 py-0.5 font-mono text-[8.5px] font-black text-[#090a0d]">
                        DÈS 499 €
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3.5 right-3.5">
                      <p className="font-serif text-lg font-medium text-white">
                        Sites Vitrine, Business & E-Commerce Haute Couture
                      </p>
                      <p className="mt-0.5 text-[11px] text-white/75">
                        100 % fluides sur Mobile & PC · Livraison clé en main en 7 jours ouvrés.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeStudioTab === "maps" && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="font-mono text-[9px] font-bold text-emerald-300">
                      📍 GARANTIE CONTRACTUELLE TOP 3 (24H/24 · 7J/7 · 1 AN)
                    </span>
                    <span className="rounded-full bg-[#c5a880]/20 px-2.5 py-0.5 font-mono text-[9px] font-bold text-[#e5cba4]">
                      Dès 999 € / an
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-xl border border-emerald-400/40 bg-emerald-500/15 p-3">
                      <div>
                        <span className="font-mono text-[8px] font-bold text-emerald-300">
                          #1 RÉSULTAT GOOGLE MAPS · VOTRE ENSEIGNE
                        </span>
                        <p className="text-xs font-bold text-white">5.0 ★★★★★ · +340 % d’appels directs</p>
                      </div>
                      <span className="rounded-lg bg-emerald-400 px-2.5 py-1 font-mono text-[8px] font-black text-black">
                        TOP 3 GARANTI
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2.5 text-[11px] text-white/80">
                      <span>Offre 2 : Gestion Annuelle complète de fiche (12 mois)</span>
                      <strong className="font-mono text-[#e5cba4]">500 € / an</strong>
                    </div>
                  </div>
                  <a
                    href="#maps-simulator"
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#c5a880] py-2.5 text-[10px] font-black uppercase tracking-wider text-black"
                  >
                    Tester mon positionnement Google Maps <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}

              {activeStudioTab === "ai" && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="font-mono text-[9px] font-bold text-[#e5cba4]">
                      🤖 LOGICIELS SUR-MESURE, AUTOMATISATION IA & ROBOTS
                    </span>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[8.5px] text-white">
                      360° Tech
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <Code2 className="h-4 w-4 text-[#c5a880]" />
                      <p className="mt-1.5 text-xs font-bold text-white">Logiciels & CRM Métier</p>
                      <p className="mt-0.5 text-[10px] text-white/65">
                        Outils internes, caisses POS, facturation et agents IA 24/7.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <Bot className="h-4 w-4 text-[#c5a880]" />
                      <p className="mt-1.5 text-xs font-bold text-white">Robots & Humanoïdes</p>
                      <p className="mt-0.5 text-[10px] text-white/65">
                        Accueil, service en salle, nettoyage et logistique dès 499 €/m.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pied du Cockpit : Compteurs d'Autorité */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono text-[9px] text-white/85">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] py-2">
                <strong className="block text-xs text-[#e5cba4]">7 HUBS</strong>
                Présence Mondiale
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] py-2">
                <strong className="block text-xs text-emerald-300">TOP 3 MAPS</strong>
                Garanti 1 an ou remboursé
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] py-2">
                <strong className="block text-xs text-[#e5cba4]">LIVRAISON 7J</strong>
                Maquette gratuite 24h
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de défilement inférieure */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 bg-black/70 px-5 py-3.5 backdrop-blur-md sm:px-8 lg:px-16">
        <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/65">
          PARIS · GENÈVE · DUBAÏ · LONDRES · HÔ CHI MINH-VILLE · SINGAPOUR · MIAMI
        </span>
        <a
          href="#services"
          className="group inline-flex items-center gap-2 label-mono text-[8px] tracking-[.16em] text-[#e5cba4] transition hover:text-white"
        >
          {t(UI.heroScrollNotice)}
          <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
        </a>
      </div>

      {/* Modale Plein Écran du Film Cinéma avec Son */}
      {cinemaModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-[#c5a880]/50 bg-[#08090c] p-3 shadow-2xl">
            <div className="mb-2 flex items-center justify-between px-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#e5cba4]">
                🎬 FILM OFFICIEL XR AGENCY — COMMUNICATION, WEB, MAPS TOP 3, IA & ROBOTIQUE
              </span>
              <button
                type="button"
                onClick={() => setCinemaModalOpen(false)}
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" /> Fermer
              </button>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <video
                ref={modalVideoRef}
                src="/videos/xr-agency-vsl.mp4"
                poster="/videos/vsl-poster.jpg"
                controls
                autoPlay
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
