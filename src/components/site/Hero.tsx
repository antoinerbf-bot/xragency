import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Play, Search, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { XR_HERO_PHOTO } from "@/lib/photography";
import { useFunnel } from "@/lib/funnel";
import { HERO_FUNNEL_PILLS } from "@/lib/funnel-i18n";

export function Hero() {
  const { t, lang } = useLang();
  const currentLang = (lang || "fr") as Lang;
  // Active la vraie vidéo cinématique dès l'ouverture du site
  const heroVideoUrl =
    (import.meta.env.VITE_XR_HERO_VIDEO_URL as string | undefined) ||
    "/videos/xr-agency-vsl.mp4";
  const { applyGoalPreset } = useFunnel();
  const sectionRef = useRef<HTMLElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const heroSpotlightRef = useRef<HTMLDivElement>(null);

  const [bgMuted, setBgMuted] = useState(true);
  const [cinemaModalOpen, setCinemaModalOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      if (heroSpotlightRef.current) {
        heroSpotlightRef.current.style.background = `radial-gradient(850px circle at ${x}% ${y}%, rgba(212,175,122,0.16), rgba(197,168,128,0.05) 45%, transparent 80%)`;
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
      className="xr-hero relative isolate min-h-[100svh] overflow-hidden bg-[#07080b] text-white"
    >
      {/* ── ARRIÈRE-PLAN VIDÉO 4K CINÉMATIQUE CRISTALLIN EN DIRECT ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          ref={bgVideoRef}
          className="absolute inset-0 h-full w-full object-cover object-center contrast-[1.08] brightness-[0.88] saturate-[1.06] scale-[1.01]"
          autoPlay
          muted={bgMuted}
          loop
          playsInline
          preload="auto"
          poster="/videos/vsl-poster.jpg"
        >
          <source src={heroVideoUrl} type="video/mp4" />
          <source src="/videos/hero-ambient-loop.mp4" type="video/mp4" />
        </video>

        {/* Halo interactif doré au passage de la souris */}
        <div
          ref={heroSpotlightRef}
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none mix-blend-screen"
          style={{
            background:
              "radial-gradient(850px circle at 68% 45%, rgba(212,175,122,0.15), transparent 80%)",
          }}
        />

        {/* Dégradé cinématique calibré : lisible à gauche pour le texte, ultra-net et dégagé à droite pour voir la vidéo */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,11,0.92)_0%,rgba(7,8,11,0.78)_34%,rgba(7,8,11,0.28)_64%,rgba(7,8,11,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#07080b_0%,rgba(7,8,11,0.35)_16%,transparent_42%)]" />
      </div>

      {/* ── CONTENU PRINCIPAL & SHOWCASE VIDÉO INTERACTIF ── */}
      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1700px] items-center gap-8 px-5 pb-14 pt-24 sm:px-8 md:pt-28 lg:grid-cols-12 lg:px-14 xl:px-20">
        {/* Colonne Gauche : Titre Monumental & Positionnement 360° */}
        <div className="lg:col-span-7 max-w-[780px]">
          <div className="mb-4 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-[#c5a880]/40 bg-black/55 px-4 py-1.5 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-[#c5a880] animate-pulse" />
            <span className="label-mono text-[8px] tracking-[.22em] text-[#e5cba4] sm:text-[9px]">
              {t(UI.heroKicker)}
            </span>
          </div>

          <h1 className="xr-hero-heading max-w-[760px] text-[clamp(2.35rem,4.6vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white drop-shadow-[0_12px_35px_rgba(0,0,0,0.85)] [text-wrap:balance]">
            <span className="block">{t(UI.heroTitle1)}</span>
            <span className="mt-1 block font-serif font-light italic tracking-tight text-[#d8be98]">
              {t(UI.heroTitleAccent)}
            </span>
            <span className="mt-1 block">{t(UI.heroTitle2)}</span>
          </h1>

          <p className="mt-4 max-w-[600px] text-[13.5px] leading-relaxed text-white/85 drop-shadow sm:mt-5 sm:text-[15px] sm:leading-7">
            {t(UI.heroLead)}
          </p>

          {/* Boutons d'Action Principaux + Bouton Film Studio */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#quote"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#c5a880] px-6 py-3.5 text-[10px] font-black uppercase tracking-[.12em] text-[#090a0d] shadow-[0_10px_35px_rgba(197,168,128,0.4)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#dfc6a2] sm:min-w-[220px]"
            >
              {t(UI.heroCtaMockup)}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <button
              type="button"
              onClick={openFullFilm}
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/25 bg-black/55 px-5 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-white backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#c5a880] hover:bg-black/75"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#c5a880] text-[#090a0d]">
                <Play className="h-3 w-3 fill-current ml-0.5" />
              </span>
              {currentLang === "en"
                ? "Watch Studio Film (55s)"
                : currentLang === "vi"
                  ? "Xem Phim Studio (55s)"
                  : "Lancer le Film Studio (55s avec son)"}
            </button>

            <a
              href="#audit"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-[9.5px] font-semibold uppercase tracking-[.1em] text-white/90 backdrop-blur-md transition duration-300 hover:border-[#c5a880] hover:bg-white/10"
            >
              {t(UI.heroCtaAudit)}
              <Search className="h-3.5 w-3.5 text-[#c5a880]" />
            </a>
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
                  className="group relative flex flex-col items-start rounded-2xl border border-white/15 bg-black/55 p-3 text-left shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c5a880] hover:bg-black/75 active:scale-[0.98]"
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

        {/* Colonne Droite : Fenêtre Vidéo Cinématique Flottante + Contrôle Son Direct */}
        <div className="lg:col-span-5 flex flex-col items-end justify-center">
          <div className="w-full max-w-[500px] overflow-hidden rounded-3xl border border-[#c5a880]/45 bg-black/65 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
            <div className="mb-2.5 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#c5a880]" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#e5cba4]">
                  SHOWREEL STUDIO XR AGENCY · LIVE
                </span>
              </div>
              <button
                type="button"
                onClick={toggleBgAudio}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 font-mono text-[9px] font-bold text-white hover:border-[#c5a880]"
              >
                {bgMuted ? (
                  <>
                    <VolumeX className="h-3 w-3 text-white/70" /> Son [OFF]
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3 w-3 text-[#c5a880]" /> Son [ON]
                  </>
                )}
              </button>
            </div>

            <div
              onClick={openFullFilm}
              className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-black"
            >
              <video
                src="/videos/xr-agency-vsl.mp4"
                poster="/videos/vsl-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/15">
                <div className="flex items-center gap-2.5 rounded-full border border-[#c5a880] bg-black/80 px-4 py-2.5 text-xs font-bold text-white shadow-2xl backdrop-blur-md transition group-hover:scale-105">
                  <Play className="h-4 w-4 fill-[#c5a880] text-[#c5a880]" />
                  <span>Ouvrir en plein écran avec son</span>
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-center font-mono text-[9px] text-white/80">
              <div className="rounded-xl border border-white/10 bg-white/5 py-1.5">
                <strong className="block text-[#e5cba4]">WEB & BRANDING</strong>
                Dès 499 € · 7j
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 py-1.5">
                <strong className="block text-[#e5cba4]">MAPS TOP 3</strong>
                Garanti 1 an · 999 €
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 py-1.5">
                <strong className="block text-[#e5cba4]">IA & ROBOTS</strong>
                Logiciels & Korben
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de défilement inférieure */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 bg-black/60 px-5 py-3.5 backdrop-blur-md sm:px-8 lg:px-16">
        <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/60">
          PARIS · GENÈVE · DUBAÏ · LONDRES · HÔ CHI MINH-VILLE · SINGAPOUR · MIAMI
        </span>
        <a
          href="#homepage-services"
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
