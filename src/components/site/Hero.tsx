import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, CheckCircle2, CreditCard, MapPinned, Play, Search, Sparkles, Zap } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { XR_HERO_PHOTO } from "@/lib/photography";
import { useFunnel } from "@/lib/funnel";
import { HERO_FUNNEL_PILLS } from "@/lib/funnel-i18n";

const PILL_ICONS = {
  local_domination: MapPinned,
  ecommerce_sales: CreditCard,
  luxury_rebrand: Sparkles,
  complete_reboot: Zap,
} as const;

export function Hero() {
  const { t, lang } = useLang();
  const currentLang = (lang || "fr") as Lang;
  const heroVideoUrl = import.meta.env.VITE_XR_HERO_VIDEO_URL as string | undefined;
  const { applyGoalPreset } = useFunnel();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const heroSpotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    setMotionAllowed(!reducedMotion && !saveData);
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image || reducedMotion || saveData) return;
    let frame = 0;
    const updateDepth = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      image.style.transform = `translate3d(0, ${((progress - 0.5) * -22).toFixed(2)}px, 0)`;
    };
    const requestUpdate = () => { if (!frame) frame = window.requestAnimationFrame(updateDepth); };
    updateDepth();

    const handleMouseMove = (e: MouseEvent) => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      if (heroSpotlightRef.current) {
        heroSpotlightRef.current.style.background = `radial-gradient(800px circle at ${x}% ${y}%, rgba(255,255,255,0.18), rgba(197,168,128,0.05) 40%, transparent 80%)`;
      }
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      section.removeEventListener("mousemove", handleMouseMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="xr-hero xr-hero-refined relative isolate overflow-hidden bg-[#11100f] text-[#f7f4ed]">
      {/* High-res cinematic photo backdrop - crystal clear Eiffel Tower & Parisian studio team */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src={XR_HERO_PHOTO}
          alt="Studio XR Agency à Paris avec vue Tour Eiffel"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[42%_22%] md:object-[58%_22%] contrast-[1.06] brightness-[0.98] saturate-[1.06] transition-transform duration-300 ease-out will-change-transform"
        />
        {heroVideoUrl && motionAllowed && (
          <video
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[42%_22%] md:object-[58%_22%] contrast-[1.06] brightness-[0.98] saturate-[1.06]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={XR_HERO_PHOTO}
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
        )}
        {/* Dynamic interactive subtle golden spotlight */}
        <div
          ref={heroSpotlightRef}
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none mix-blend-soft-light"
          style={{
            background: "radial-gradient(760px circle at 65% 45%, rgba(232,207,166,0.16), transparent 75%)",
          }}
        />
        {/* Desktop vignette: focused dark scrim only behind left text column, leaving Eiffel Tower & studio crystal-clear */}
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(90deg,rgba(14,13,12,0.88)_0%,rgba(14,13,12,0.72)_26%,rgba(14,13,12,0.34)_44%,rgba(14,13,12,0.06)_64%,transparent_84%)]" />
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(0deg,rgba(14,13,12,0.78)_0%,transparent_28%)]" />
        {/* Mobile vignette: clear unobstructed Eiffel window top 0-22%, deep velvety Obsidian transition behind kicker & headline */}
        <div className="block md:hidden absolute inset-0 bg-[linear-gradient(180deg,rgba(14,13,12,0.48)_0%,rgba(14,13,12,0.06)_15%,rgba(14,13,12,0.48)_25%,rgba(14,13,12,0.86)_36%,rgba(14,13,12,0.96)_52%,#11100f_66%)]" />
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1700px] md:grid-cols-[minmax(0,1.08fr)_minmax(240px,.92fr)] items-center">
        <div className="relative z-10 flex items-center px-5 pb-12 pt-[235px] sm:px-8 md:px-10 md:pb-16 md:pt-28 lg:px-14 xl:px-20">
          <div className="max-w-[700px]">
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <span className="h-px w-8 bg-[#c5a880]" />
              <span className="label-mono text-[7.5px] tracking-[.24em] text-[#e8cfa6] drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)] sm:text-[8.5px]">{t(UI.heroKicker)}</span>
            </div>
            <h1 className="xr-hero-heading max-w-[700px] text-[clamp(2.2rem,4.3vw,4.15rem)] font-medium leading-[0.98] tracking-[-0.05em] text-[#f7f4ed] drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] [text-wrap:balance]">
              <span className="block">{t(UI.heroTitle1)}</span>
              <span className="mt-1 block font-serif font-light italic tracking-tight text-[#e4c79a]">{t(UI.heroTitleAccent)}</span>
              <span className="mt-1 block">{t(UI.heroTitle2)}</span>
            </h1>
            <p className="mt-4 max-w-[530px] text-[13px] leading-relaxed text-[#f7f4ed]/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] sm:mt-5 sm:text-[14.5px] sm:leading-6">{t(UI.heroLead)}</p>
            <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#quote" className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#f7f4ed] to-[#ece2cf] px-5 py-3 text-[9.5px] font-bold uppercase tracking-[.1em] text-[#141312] shadow-[0_14px_34px_-10px_rgba(0,0,0,0.65)] transition duration-300 hover:-translate-y-0.5 hover:from-[#e8cfa6] hover:to-[#c5a880] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a880] sm:min-w-[215px]">
                {t(UI.heroCtaMockup)}
                <ArrowRight className="h-3.5 w-3.5 text-[#141312] transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#audit" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#c5a880]/55 bg-black/45 px-4 py-3 text-[9.5px] font-semibold uppercase tracking-[.1em] text-[#f7f4ed] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[#c5a880] hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a880] sm:min-w-[175px]">
                {t(UI.heroCtaAudit)}<Search className="h-3.5 w-3.5 text-[#e8cfa6] transition-transform group-hover:scale-110" />
              </a>
              <a href="#vsl-showcase" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-black/45 px-4 py-3 text-[9.5px] font-semibold uppercase tracking-[.1em] text-[#f7f4ed] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[#c5a880] hover:bg-black/70">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#c5a880] text-[#141312]">
                  <Play className="h-2.5 w-2.5 fill-current ml-0.5" />
                </span>
                <span>{currentLang === "fr" ? "Vidéo · 1 min 40" : "Video · 1m40"}</span>
              </a>
            </div>

            {/* Instant Above-the-Fold Proof Strip */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-medium text-[#f7f4ed]/85">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#c5a880]" />
                {currentLang === "fr" ? "+50 entreprises accompagnées" : "+50 companies supported"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#c5a880]" />
                {currentLang === "fr" ? "Maquette offerte sous 48h" : "Free mockup in 48h"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#c5a880]" />
                {currentLang === "fr" ? "Sans engagement" : "No commitment"}
              </span>
            </div>

            {/* 1-Click Interactive Funnel Qualification Pills */}
            <div className="mt-5 pt-4 border-t border-white/15">
              <span className="block label-mono text-[6.5px] tracking-[.22em] text-[#e8cfa6]/85 mb-2.5 uppercase">
                {currentLang === "fr" ? "Accès direct par objectif stratégique :" : currentLang === "vi" ? "Truy cập nhanh theo mục tiêu chiến lược :" : currentLang === "ar" ? "انطلاق سريع حسب الهدف الاستراتيجي :" : currentLang === "ru" ? "Быстрый выбор стратегической цели :" : "Direct access by strategic goal:"}
              </span>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {HERO_FUNNEL_PILLS.map((pill) => {
                  const PillIcon = PILL_ICONS[pill.id as keyof typeof PILL_ICONS] ?? Sparkles;
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => applyGoalPreset(pill.id)}
                      className="group relative flex flex-col items-start rounded-2xl border border-white/15 bg-black/55 p-3 text-left shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c5a880]/75 hover:bg-black/75 active:scale-[0.98]"
                    >
                      <span className="mb-2 grid h-7 w-7 place-items-center rounded-lg border border-[#c5a880]/35 bg-[#c5a880]/15 text-[#e8cfa6] transition group-hover:bg-[#c5a880] group-hover:text-[#141312]">
                        <PillIcon className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-[10.5px] font-bold text-[#f7f4ed] leading-tight group-hover:text-[#e8cfa6] transition">
                        {pill.label[currentLang] ?? pill.label.fr}
                      </span>
                      <span className="mt-1 text-[8.5px] leading-snug text-white/70">
                        {pill.sub[currentLang] ?? pill.sub.fr}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none relative hidden min-h-[500px] md:block" />
      </div>

      <div className="relative z-10 flex items-center justify-end border-t border-white/12 bg-[#11100f]/80 px-5 py-3.5 sm:px-8 md:absolute md:bottom-0 md:left-0 md:right-0 md:bg-[#11100f]/60 md:backdrop-blur-md md:px-10 md:py-4 lg:px-16 xl:px-24">
        <a href="#vsl-showcase" className="group inline-flex items-center gap-2 label-mono text-[7px] tracking-[.16em] text-[#e8cfa6] transition hover:text-white sm:text-[8px]">
          {t(UI.heroScrollNotice)}<ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  );
}
