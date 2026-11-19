import { useRef, useState } from "react";
import { ArrowDown, ArrowRight, BarChart3, Bot, Globe2, MapPin, Megaphone, Monitor, Play, Share2, Video, X, Palette } from "lucide-react";
import heroAtelierPhoto from "@/assets/hero-editorial-concept01.jpg";

const cities = ["Da Nang", "Paris", "Bruxelles", "New York", "Tokyo", "Dubaï", "Singapour"];

const expertise = [
  { label: "Marketing &\nStratégie", icon: Megaphone },
  { label: "Sites Web\n& E-commerce", icon: Monitor },
  { label: "SEO &\nGoogle Maps", icon: MapPin },
  { label: "Réseaux\nSociaux", icon: Share2 },
  { label: "Production\nVidéo", icon: Video },
  { label: "Automatisation\n& IA", icon: Bot },
  { label: "Branding\n& Identité", icon: Palette },
];

export function Hero() {
  const [cinemaModalOpen, setCinemaModalOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const openFullFilm = () => {
    setCinemaModalOpen(true);
    window.setTimeout(() => modalVideoRef.current?.play().catch(() => {}), 100);
  };

  const closeFilm = () => {
    modalVideoRef.current?.pause();
    setCinemaModalOpen(false);
  };

  return (
    <section id="hero" className="relative isolate min-h-[100svh] overflow-hidden bg-[#100d0b] text-[#fff8ef]">
      <div className="absolute inset-0">
        <img
          src={heroAtelierPhoto}
          alt="Équipe en réunion de travail dans un bureau parisien au coucher du soleil"
          className="h-full w-full object-cover object-[58%_center]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,9,.92)_0%,rgba(12,10,9,.76)_28%,rgba(12,10,9,.18)_62%,rgba(12,10,9,.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,10,9,.94)_0%,rgba(12,10,9,.1)_42%,rgba(12,10,9,.32)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,transparent_0%,rgba(10,8,7,.12)_65%,rgba(10,8,7,.48)_100%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[.13]" aria-hidden="true" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.22'/%3E%3C/svg%3E\")" }} />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1720px] flex-col px-5 pb-5 pt-28 sm:px-8 sm:pb-7 sm:pt-32 lg:px-12 lg:pt-36">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,.8fr)]">
          <div className="max-w-[690px]">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.28em] text-[#f1d0a8] sm:text-[11px]">
              <span className="h-px w-8 bg-[#d9ad78]" />
              Stratégie · Création · Performance
            </p>
            <h1 className="font-display text-[clamp(3.25rem,7.2vw,7.4rem)] leading-[.88] tracking-[-.055em] text-[#fff7ed]">
              <span className="block">L’Art du Digital</span>
              <span className="mt-2 block italic text-[#e8bd91]">Sur-Mesure.</span>
            </h1>
            <p className="mt-7 max-w-[510px] text-[15px] leading-[1.65] text-white/85 sm:text-[17px]">
              Une agence digitale internationale pour développer votre marque, attirer vos clients et accélérer votre croissance.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#tunnel-secteurs" className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#f1c18f] px-7 py-3 text-[12px] font-semibold text-[#1a120c] shadow-[0_12px_38px_rgba(0,0,0,.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffdab2]">
                Démarrer un projet <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button type="button" onClick={openFullFilm} className="group inline-flex min-h-12 items-center gap-3 text-[12px] font-medium text-white transition hover:text-[#f1c18f]">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/70 bg-white/10 backdrop-blur-sm transition group-hover:border-[#f1c18f] group-hover:bg-[#f1c18f] group-hover:text-[#1a120c]">
                  <Play className="ml-0.5 h-4 w-4 fill-current" />
                </span>
                Voir notre showreel
              </button>
            </div>
          </div>

          <div className="hidden self-end pb-5 lg:flex lg:justify-end">
            <div className="w-full max-w-[390px] rounded-[1.25rem] border border-white/20 bg-[#17120f]/55 p-5 shadow-[0_22px_70px_rgba(0,0,0,.34)] backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <BarChart3 className="h-9 w-9 shrink-0 text-[#edc397]" strokeWidth={1.4} />
                <div>
                  <p className="text-[14px] font-semibold text-white">Stratégie. Création. Performance.</p>
                  <p className="mt-1 text-[11px] text-white/65">Une approche globale pour des résultats concrets.</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 shrink-0 rounded-full bg-[#f1c18f] p-1 text-[#1a120c]" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/20 pt-5 text-[11px] text-white/80 sm:mt-14">
          <span className="inline-flex items-center gap-2 text-[#f1c18f]"><Globe2 className="h-4 w-4" /> Une présence internationale</span>
          <span className="hidden h-px w-8 bg-[#d9ad78]/70 sm:block" />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {cities.map((city, index) => (
              <span key={city} className="inline-flex items-center gap-3">
                {city}
                {index < cities.length - 1 && <span className="text-[#d9ad78]/70">·</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/15 bg-[#17120f]/55 backdrop-blur-xl sm:grid-cols-4 lg:grid-cols-7">
          {expertise.map(({ label, icon: Icon }, index) => (
            <a key={label} href={index === 1 ? "/services/websites" : index === 2 ? "/services/seo" : index === 3 ? "/services/social" : index === 6 ? "/services/branding" : "/services"} className="group flex min-h-[66px] items-center gap-3 border-b border-white/10 px-3 py-3 text-[10px] font-medium leading-[1.35] text-white/90 transition hover:bg-white/10 sm:px-4 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <Icon className="h-5 w-5 shrink-0 text-[#edc397] transition-transform group-hover:scale-110" strokeWidth={1.5} />
              <span className="whitespace-pre-line">{label}</span>
            </a>
          ))}
        </div>

        <a href="#services" className="mx-auto mt-5 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.24em] text-white/65 transition hover:text-[#f1c18f]">
          Défiler pour découvrir <ArrowDown className="h-3.5 w-3.5" />
        </a>
      </div>

      {cinemaModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-xl sm:p-6" role="dialog" aria-modal="true" aria-label="Showreel XR Agency">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-[#d9ad78]/40 bg-[#08090c] p-2 shadow-2xl sm:rounded-3xl sm:p-3">
            <div className="mb-2 flex items-center justify-between gap-3 px-2 py-1">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#e5cba4] sm:text-xs">XR Agency · Showreel</span>
              <button type="button" onClick={closeFilm} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10">
                <X className="h-4 w-4" /> Fermer
              </button>
            </div>
            <div className="aspect-video overflow-hidden rounded-xl bg-black sm:rounded-2xl">
              <video ref={modalVideoRef} src="/videos/xr-agency-vsl.mp4" poster="/videos/vsl-poster.jpg" controls playsInline className="h-full w-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
