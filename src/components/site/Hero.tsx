import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Sparkles, Volume2, VolumeX, X, ShieldCheck } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { useFunnel } from "@/lib/funnel";
import heroEditorialImg from "@/assets/hero-editorial-concept01.jpg";

export function Hero() {
  const { lang } = useLang();
  const currentLang = (lang || "fr") as Lang;
  const { applyGoalPreset } = useFunnel();

  const [cinemaModalOpen, setCinemaModalOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const openFullFilm = () => {
    setCinemaModalOpen(true);
    setTimeout(() => {
      modalVideoRef.current?.play().catch(() => {});
    }, 100);
  };

  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#080B10] text-[#F8FAFC] pt-24 pb-16 lg:pt-32 lg:pb-24 flex items-center"
    >
      {/* ── LUMIÈRES & DÉGRADÉS D'OR D'AMBIANCE HAUTE JOAILLERIE ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-40 right-0 h-[650px] w-[650px] rounded-full opacity-20 blur-[130px]"
          style={{
            background: "radial-gradient(circle, #D4AF37 0%, rgba(212,175,55,0.05) 70%, transparent 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-[-100px] h-[500px] w-[500px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #10B981 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1680px] w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        
        <div className="grid items-center gap-12 lg:grid-cols-12 xl:gap-16">
          
          {/* ── COLONNE GAUCHE (7 cols) : CONCEPT 01 ÉDITORIAL PREMIUM ── */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Tag / Kicker officiel */}
            <div className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-[#D4AF37]/35 bg-[#0F172A]/70 px-4 py-1.5 backdrop-blur-xl shadow-[0_0_20px_rgba(212,175,55,0.12)]">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-[#E2D5BC]">
                Agence Conseil & Studio Digital 360°
              </span>
            </div>

            {/* Titre Principal exact du Concept 01 de l'esquisse */}
            <h1 className="font-serif text-[clamp(2.5rem,5.2vw,5.2rem)] font-normal leading-[1.04] tracking-[-0.03em] text-white [text-wrap:balance]">
              Votre partenaire digital,{" "}
              <span className="block font-light italic text-[#E2D5BC] drop-shadow-[0_4px_24px_rgba(226,213,188,0.25)]">
                de la stratégie à la
              </span>
              performance.
            </h1>

            {/* Sous-titre exact du Concept 01 */}
            <p className="mt-6 max-w-[620px] text-[15px] sm:text-[17px] font-light leading-relaxed tracking-wide text-neutral-300">
              Communication · Marketing · Sites web · Référencement · Réseaux sociaux · Automatisation
            </p>

            {/* Deux Boutons d'Action Principaux */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#tunnel-secteurs"
                className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[#E2D5BC] px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#080B10] shadow-[0_12px_32px_rgba(226,213,188,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_40px_rgba(226,213,188,0.48)] active:scale-[0.98]"
              >
                <span>Démarrer mon projet</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                onClick={openFullFilm}
                className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-white/25 bg-black/40 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37] hover:bg-black/70 hover:text-[#E2D5BC]"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 border border-white/20 text-white transition-colors group-hover:bg-[#D4AF37] group-hover:text-black">
                  <Play className="h-3 w-3 fill-current ml-0.5" />
                </span>
                <span>Découvrir en 1 min</span>
              </button>
            </div>

            {/* Ligne Métriques d'Autorité Exacte de l'Esquisse */}
            <div className="mt-12 sm:mt-14 grid grid-cols-3 gap-6 sm:gap-10 border-t border-white/10 pt-8 max-w-[560px]">
              <div>
                <strong className="block font-mono text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  +300
                </strong>
                <span className="mt-1 block text-[12px] sm:text-[13px] text-neutral-400 font-light">
                  Projets réalisés
                </span>
              </div>
              <div className="border-x border-white/10 px-4 sm:px-8">
                <strong className="block font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[#D4AF37]">
                  10 ans
                </strong>
                <span className="mt-1 block text-[12px] sm:text-[13px] text-neutral-400 font-light">
                  d'expertise
                </span>
              </div>
              <div>
                <strong className="block font-mono text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  50 experts
                </strong>
                <span className="mt-1 block text-[12px] sm:text-[13px] text-neutral-400 font-light">
                  à l'international
                </span>
              </div>
            </div>

          </div>

          {/* ── COLONNE DROITE (5 cols) : VISUEL IMMERSIF LOUNGE ATELIER XR AGENCY ── */}
          <div className="lg:col-span-5 relative">
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/35 bg-[#0F172A]/80 shadow-[0_30px_100px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-500 hover:border-[#D4AF37]/60">
              
              {/* Image d'accueil / Lounge Studio de l'agence */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                <img
                  src={heroEditorialImg}
                  alt="Lounge d'accueil prestigieux XR Agency"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 contrast-[1.08] brightness-[0.95]"
                  loading="eager"
                />
                
                {/* Dégradés d'ombrage et de contraste cinématographique */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-transparent to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080B10]/40 via-transparent to-transparent" />

                {/* Badge d'autorité en haut */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-[#E2D5BC] backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    SIÈGE OPÉRATIONNEL & STUDIO
                  </span>
                  <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/20 px-3 py-1 font-mono text-[9px] font-bold text-[#E2D5BC] backdrop-blur-md">
                    PARIS · TOULOUSE · ASIE
                  </span>
                </div>

                {/* Titrage de la plaque d'agence en bas du cadre */}
                <div className="absolute bottom-5 left-6 right-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-xl sm:text-2xl font-light text-white tracking-wide">
                        XR AGENCY
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
                        Architecture Digitale & Stratégie 360°
                      </p>
                    </div>
                    <a
                      href="#tunnel-secteurs"
                      className="grid h-10 w-10 place-items-center rounded-full bg-[#E2D5BC] text-[#080B10] transition-transform duration-300 hover:scale-110"
                      title="Découvrir les expertises"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Barre de réassurance immédiate sous le cadre visuel */}
              <div className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10 bg-[#0F172A]/90 p-4 font-mono text-[10px]">
                <div className="flex items-center gap-2 pl-2 text-neutral-300">
                  <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
                  <span>Maquette sur-mesure en 24h</span>
                </div>
                <div className="flex items-center gap-2 pl-4 text-neutral-300">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <span>Garantie de résultat chiffrée</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── MODAL CINÉMA DU FILM DE PRÉSENTATION ── */}
      {cinemaModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-3xl animate-in fade-in duration-300"
          onClick={() => setCinemaModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-[#D4AF37]/40 bg-[#080B10] shadow-[0_0_100px_rgba(212,175,55,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#E2D5BC]">
                  XR AGENCY · LE FILM MANIFESTE
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCinemaModalOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <video
                ref={modalVideoRef}
                controls
                autoPlay
                className="h-full w-full object-cover"
                poster={heroEditorialImg}
              >
                <source src="/videos/hero-ambient-loop.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
