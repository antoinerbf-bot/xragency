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
    <section ref={sectionRef} id="hero" className="xr-hero xr-hero-refined relative isolate overflow-hidden bg-[#f8f6f0] text-[#101114]">
      {/* High-res cinematic photo backdrop - crisp, luminous, Parisian penthouse & Eiffel tower */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src={XR_HERO_PHOTO}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_18%] md:object-[center_20%] contrast-[1.02] brightness-[1.12] saturate-[0.88] transition-transform duration-300 ease-out will-change-transform"
        />
        {heroVideoUrl && motionAllowed && (
          <video
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[center_18%] md:object-[center_20%] contrast-[1.02] brightness-[1.12] saturate-[0.88]"
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
        {/* Dynamic interactive mouse follow spotlight */}
        <div
          ref={heroSpotlightRef}
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none mix-blend-screen"
          style={{
            background: "radial-gradient(800px circle at 65% 45%, rgba(255,255,255,0.14), transparent 80%)",
          }}
        />
        {/* Desktop vignette: tight editorial fade on left so Eiffel Tower & agency team pop crisp and vivid on right */}
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(90deg,#f7f4ed_0%,rgba(247,244,237,0.96)_24%,rgba(247,244,237,0.74)_39%,rgba(247,244,237,0.16)_56%,rgba(247,244,237,0.02)_76%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#f7f4ed_0%,rgba(247,244,237,0.1)_14%,transparent_34%)]" />
        {/* Mobile vignette: atmospheric view at top, smooth fade for high readability over text */}
        <div className="block md:hidden absolute inset-0 bg-[linear-gradient(180deg,rgba(247,244,237,0.14)_0%,rgba(247,244,237,0.76)_32%,rgba(247,244,237,0.96)_66%,#f7f4ed_100%)]" />
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1700px] md:grid-cols-[minmax(0,1.18fr)_minmax(200px,.82fr)] items-center">
        <div className="relative z-10 flex items-center px-5 pb-10 pt-22 sm:px-8 md:px-10 md:pb-12 md:pt-28 lg:px-14 xl:px-20">
          <div className="max-w-[760px]">
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <span className="h-px w-8 bg-[#b48f5a]" />
              <span className="label-mono text-[7.5px] tracking-[.24em] text-[#665c4e] sm:text-[8.5px]">{t(UI.heroKicker)}</span>
            </div>
            <h1 className="xr-hero-heading max-w-[760px] text-[clamp(2.15rem,4.2vw,4.1rem)] font-medium leading-[0.98] tracking-[-0.05em] text-[#141312] [text-wrap:balance]">
              <span className="block">{t(UI.heroTitle1)}</span>
              <span className="mt-1 block font-serif font-light italic tracking-tight text-[#8b704f]">{t(UI.heroTitleAccent)}</span>
              <span className="mt-1 block">{t(UI.heroTitle2)}</span>
            </h1>
            <p className="mt-4 max-w-[540px] text-[13px] leading-relaxed text-[#4e4b46] sm:mt-5 sm:text-[14px] sm:leading-6">{t(UI.heroLead)}</p>
            <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#quote" className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#141312] px-5 py-3 text-[9.5px] font-bold uppercase tracking-[.1em] text-[#f7f4ed] shadow-[0_12px_28px_-12px_rgba(20,19,18,0.5)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2a2621] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b48f5a] sm:min-w-[210px]">
                {t(UI.heroCtaMockup)}
                <ArrowRight className="h-3.5 w-3.5 text-[#e8cfa6] transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#audit" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#b48f5a]/50 bg-white/75 px-4 py-3 text-[9.5px] font-semibold uppercase tracking-[.1em] text-[#141312] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[#b48f5a] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b48f5a] sm:min-w-[175px]">
                {t(UI.heroCtaAudit)}<Search className="h-3.5 w-3.5 text-[#9b7b4b] transition-transform group-hover:scale-110" />
              </a>
              <a href="#vsl-showcase" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#141312]/12 bg-white/60 px-4 py-3 text-[9.5px] font-semibold uppercase tracking-[.1em] text-[#141312] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[#b48f5a] hover:bg-white">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#141312] text-[#e8cfa6]">
                  <Play className="h-2.5 w-2.5 fill-current ml-0.5" />
                </span>
                <span>{currentLang === "fr" ? "Vidéo · 1 min 40" : "Video · 1m40"}</span>
              </a>
            </div>

            {/* Instant Above-the-Fold Proof Strip */}
            <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-medium text-[#4e483f]">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#9b7b4b]" />
                {currentLang === "fr" ? "+50 entreprises accompagnées" : "+50 companies supported"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#9b7b4b]" />
                {currentLang === "fr" ? "Maquette offerte sous 48h" : "Free mockup in 48h"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#9b7b4b]" />
                {currentLang === "fr" ? "Sans engagement" : "No commitment"}
              </span>
            </div>

            {/* 1-Click Interactive Funnel Qualification Pills */}
            <div className="mt-5 pt-4 border-t border-[#141312]/12">
              <span className="block label-mono text-[6.5px] tracking-[.22em] text-[#6f675b] mb-2.5 uppercase">
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
                      className="group relative flex flex-col items-start rounded-2xl border border-[#141312]/10 bg-white/85 p-3 text-left shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b48f5a]/70 hover:bg-white hover:shadow-md active:scale-[0.98]"
                    >
                      <span className="mb-2 grid h-7 w-7 place-items-center rounded-lg border border-[#b48f5a]/25 bg-[#f3ead9] text-[#9b7b4b] transition group-hover:bg-[#141312] group-hover:text-[#e8cfa6]">
                        <PillIcon className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-[10.5px] font-bold text-[#141312] leading-tight group-hover:text-[#8c6c3c] transition">
                        {pill.label[currentLang] ?? pill.label.fr}
                      </span>
                      <span className="mt-1 text-[8.5px] leading-snug text-[#5d564c]">
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

      <div className="relative z-10 flex items-center justify-end border-t border-[#141312]/10 bg-[#f7f4ed]/90 px-5 py-3.5 sm:px-8 md:absolute md:bottom-0 md:left-0 md:right-0 md:bg-[#f7f4ed]/70 md:backdrop-blur-sm md:px-10 md:py-4 lg:px-16 xl:px-24">
        <a href="#vsl-showcase" className="group inline-flex items-center gap-2 label-mono text-[7px] tracking-[.16em] text-[#5d564c] transition hover:text-[#141312] sm:text-[8px]">
          {t(UI.heroScrollNotice)}<ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  );
}
