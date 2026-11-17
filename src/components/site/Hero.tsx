import { useState, useRef } from "react";
import {
  ArrowRight,
  ChevronDown,
  Play,
  X,
  Layers,
  Globe2,
  Plane,
  Sparkles,
  Award,
} from "lucide-react";
import heroAtelierPhoto from "@/assets/hero-editorial-concept01.jpg";

export function Hero() {
  const [cinemaModalOpen, setCinemaModalOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const openFullFilm = () => {
    setCinemaModalOpen(true);
    setTimeout(() => {
      modalVideoRef.current?.play().catch(() => {});
    }, 100);
  };

  const closeFilm = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setCinemaModalOpen(false);
  };

  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#FAF8F5] text-[#0E1015] pt-24 sm:pt-28 lg:pt-32"
    >
      {/* ── SUBTILE TEXTURE DE FOND CHALEUREUSE ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(#E8E2D8 1px, transparent 1px), radial-gradient(#E8E2D8 1px, #FAF8F5 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        {/* ── 01 / GRILLE HERO : TITRE & CTA À GAUCHE · ATELIER PARISIEN À DROITE ── */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 pb-12 sm:pb-16">
          
          {/* Colonne Gauche (7 cols) */}
          <div className="lg:col-span-6 xl:col-span-6 max-w-[680px]">
            {/* Kicker supérieur avec tiret fin */}
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[#BFA27E]" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#8F7453]">
                AGENCE DIGITALE INTERNATIONALE
              </span>
            </div>

            {/* Titre Principal H1 Éditorial */}
            <h1 className="font-sans text-[clamp(2.6rem,5vw,5.2rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-[#0E1015]">
              <span className="block">L'art du digital</span>
              <span className="mt-1 block font-serif font-normal italic tracking-tight text-[#BFA27E]">
                sur mesure.
              </span>
            </h1>

            {/* Paragraphe descriptif */}
            <p className="mt-5 text-[15px] sm:text-[16.5px] leading-relaxed text-[#4A4E57] max-w-[560px]">
              Stratégie, création et performance pour les marques, restaurants, hôtels et entreprises ambitieuses en France et à l'international.
            </p>

            {/* Double Bouton d'Action */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#tunnel-secteurs"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0E1015] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_12px_30px_rgba(14,16,21,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20242D] hover:shadow-[0_16px_36px_rgba(14,16,21,0.3)] active:scale-[0.98]"
              >
                <span>Démarrer mon projet</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                onClick={openFullFilm}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#0E1015]/15 bg-white/80 px-6 py-3.5 text-[11px] font-semibold text-[#0E1015] shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BFA27E] hover:bg-white active:scale-[0.98]"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#FAF3EA] text-[#8F7453] transition-colors group-hover:bg-[#BFA27E] group-hover:text-white">
                  <Play className="h-3 w-3 fill-current ml-0.5" />
                </span>
                <span>Découvrir notre approche</span>
              </button>
            </div>

            {/* Preuve Sociale & Avis Google */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#0E1015]/10 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                {/* Icône Google G colorée */}
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="font-bold text-xs text-[#0E1015]">4,9 / 5</span>
              </div>
              <div className="flex text-[#BFA27E] text-xs">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <span className="h-3 w-px bg-[#0E1015]/15" />
              <span className="text-[11.5px] font-medium text-[#4A4E57]">
                +50 entreprises accompagnées
              </span>
            </div>
          </div>

          {/* Colonne Droite (6 cols) : Photographie Haute Résolution Atelier Parisien */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative group overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-[#0E1015]/10 bg-white p-2.5 shadow-[0_30px_90px_rgba(14,16,21,0.12)] transition-transform duration-500 hover:shadow-[0_35px_100px_rgba(14,16,21,0.16)]">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.6rem] sm:rounded-[2.1rem]">
                <img
                  src={heroAtelierPhoto}
                  alt="Équipe XR Agency au travail dans l'atelier parisien avec vue sur la Tour Eiffel"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                
                {/* Voile de dégradé subtil en bas de l'image */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Badge Flottant Paris Tour Eiffel */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white drop-shadow">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-white/95">
                      Paris · Siège International
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={openFullFilm}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/25 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white hover:text-black"
                  >
                    <Play className="h-3 w-3 fill-current" /> Voir le film
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BANDEAU DE RÉASSURANCE PRESTIGE : MARQUES MONDIALES ── */}
        <div className="border-t border-[#0E1015]/10 py-6 sm:py-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Intitulé à gauche */}
            <div className="flex items-center gap-4">
              <span className="text-[12px] font-semibold text-[#666B75] uppercase tracking-wider">
                Ils nous font confiance
              </span>
              <span className="hidden sm:block h-4 w-px bg-[#0E1015]/15" />
            </div>

            {/* Logos de Prestige : Typographie Haute Couture & Authenticité */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-12 text-[#22252C] font-serif text-lg sm:text-xl font-bold tracking-widest opacity-85">
              <span className="transition hover:opacity-100 font-sans tracking-[0.25em] text-[15px] sm:text-[17px] font-black">
                ACCOR
              </span>
              <span className="transition hover:opacity-100 font-serif tracking-[0.2em] text-[16px] sm:text-[18px]">
                L'ORÉAL
              </span>
              <span className="transition hover:opacity-100 font-serif tracking-[0.3em] text-[15px] sm:text-[17px]">
                DIOR
              </span>
              <span className="transition hover:opacity-100 font-sans tracking-[0.18em] text-[15px] sm:text-[17px] font-bold">
                MARRIOTT
              </span>
              <span className="transition hover:opacity-100 font-serif tracking-[0.25em] text-[15px] sm:text-[17px]">
                HYATT
              </span>
              <span className="transition hover:opacity-100 font-sans tracking-[0.15em] text-[15px] sm:text-[17px] font-black">
                Uber
              </span>
            </div>

            {/* Lien droit vers réalisations */}
            <a
              href="#realisations"
              className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#0E1015] hover:text-[#BFA27E] transition"
            >
              <span>+ 50 projets réalisés</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* ── LES 4 PILIERS FONDAMENTAUX DE VALEUR ── */}
        <div className="border-t border-[#0E1015]/10 pt-8 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Pilier 1 : Conseil stratégique */}
            <div className="group rounded-2xl border border-[#0E1015]/8 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#BFA27E] hover:bg-white hover:shadow-md">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#FAF3EA] text-[#8F7453] transition-colors group-hover:bg-[#BFA27E] group-hover:text-white">
                  <Award className="h-5 w-5" />
                </span>
                <h3 className="font-sans text-sm font-bold text-[#0E1015]">
                  Conseil stratégique
                </h3>
              </div>
              <p className="text-[12.5px] leading-relaxed text-[#555A64]">
                Des recommandations claires, concrètes et adaptées à votre marché.
              </p>
            </div>

            {/* Pilier 2 : Exécution sur mesure */}
            <div className="group rounded-2xl border border-[#0E1015]/8 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#BFA27E] hover:bg-white hover:shadow-md">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#FAF3EA] text-[#8F7453] transition-colors group-hover:bg-[#BFA27E] group-hover:text-white">
                  <Layers className="h-5 w-5" />
                </span>
                <h3 className="font-sans text-sm font-bold text-[#0E1015]">
                  Exécution sur mesure
                </h3>
              </div>
              <p className="text-[12.5px] leading-relaxed text-[#555A64]">
                Des solutions concrètes, créatives et hautement performantes.
              </p>
            </div>

            {/* Pilier 3 : Expertise digitale */}
            <div className="group rounded-2xl border border-[#0E1015]/8 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#BFA27E] hover:bg-white hover:shadow-md">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#FAF3EA] text-[#8F7453] transition-colors group-hover:bg-[#BFA27E] group-hover:text-white">
                  <Globe2 className="h-5 w-5" />
                </span>
                <h3 className="font-sans text-sm font-bold text-[#0E1015]">
                  Expertise digitale
                </h3>
              </div>
              <p className="text-[12.5px] leading-relaxed text-[#555A64]">
                Une maîtrise complète des leviers de visibilité et d'acquisition 360°.
              </p>
            </div>

            {/* Pilier 4 : Accompagnement international */}
            <div className="group rounded-2xl border border-[#0E1015]/8 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#BFA27E] hover:bg-white hover:shadow-md">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#FAF3EA] text-[#8F7453] transition-colors group-hover:bg-[#BFA27E] group-hover:text-white">
                  <Plane className="h-5 w-5" />
                </span>
                <h3 className="font-sans text-sm font-bold text-[#0E1015]">
                  Accompagnement international
                </h3>
              </div>
              <p className="text-[12.5px] leading-relaxed text-[#555A64]">
                Une équipe réactive et multiculturelle pour vous accompagner partout.
              </p>
            </div>
          </div>

          {/* Indicateur de Découverte / Scroll */}
          <div className="mt-8 flex justify-center">
            <a
              href="#services"
              className="group inline-flex flex-col items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F7453] transition hover:text-[#0E1015]"
            >
              <span>Découvrir nos expertises</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
          </div>
        </div>
      </div>

      {/* ── MODALE PLEIN ÉCRAN DU FILM CINÉMA AVEC SON ── */}
      {cinemaModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-[#BFA27E]/50 bg-[#08090c] p-3 shadow-2xl">
            <div className="mb-2 flex items-center justify-between px-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E5CBA4]">
                🎬 FILM OFFICIEL XR AGENCY — COMMUNICATION, WEB, SEO, MAPS TOP 3 & IA
              </span>
              <button
                type="button"
                onClick={closeFilm}
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
