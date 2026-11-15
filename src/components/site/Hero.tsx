import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Search } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { XR_HERO_PHOTO } from "@/lib/photography";
import { useFunnel } from "@/lib/funnel";
import { HERO_FUNNEL_PILLS } from "@/lib/funnel-i18n";

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
        {/* Desktop vignette: deep readable dark on left for text, crystalline luminous view on right for penthouse & Eiffel tower */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#f8f6f0_0%,rgba(248,246,240,0.98)_24%,rgba(248,246,240,0.88)_42%,rgba(248,246,240,0.34)_65%,rgba(248,246,240,0.04)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#f8f6f0_0%,rgba(248,246,240,0.12)_18%,transparent_38%)]" />
        {/* Mobile vignette: atmospheric view at top, smooth fade for high readability over text */}
        <div className="block md:hidden absolute inset-0 bg-[linear-gradient(180deg,rgba(248,246,240,0.16)_0%,rgba(248,246,240,0.72)_32%,rgba(248,246,240,0.96)_68%,#f8f6f0_100%)]" />
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1700px] md:grid-cols-[minmax(0,1.18fr)_minmax(200px,.82fr)] items-center">
        <div className="relative z-10 flex items-center px-5 pb-8 pt-20 sm:px-8 md:px-10 md:pb-10 md:pt-28 lg:px-14 xl:px-20">
          <div className="max-w-[760px]">
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <span className="h-px w-8 bg-[#a88961]" />
              <span className="label-mono text-[7.5px] tracking-[.24em] text-[#665c4e] sm:text-[8.5px]">{t(UI.heroKicker)}</span>
            </div>
            <h1 className="xr-hero-heading max-w-[760px] text-[clamp(2.15rem,4.2vw,4.1rem)] font-medium leading-[0.98] tracking-[-0.05em] text-[#101114] [text-wrap:balance]">
              <span className="block">{t(UI.heroTitle1)}</span>
              <span className="mt-1 block font-serif font-light italic tracking-tight text-[#8b704f]">{t(UI.heroTitleAccent)}</span>
              <span className="mt-1 block">{t(UI.heroTitle2)}</span>
            </h1>
            <p className="mt-4 max-w-[540px] text-[13px] leading-relaxed text-[#4e4b46] sm:mt-5 sm:text-[14px] sm:leading-6">{t(UI.heroLead)}</p>
            <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#quote" className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#111215] px-5 py-3 text-[9.5px] font-bold uppercase tracking-[.1em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#302a23] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b704f] sm:min-w-[210px]">
                {t(UI.heroCtaMockup)}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#audit" className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#b9ad9c] px-4 py-2.5 text-[9.5px] font-semibold uppercase tracking-[.1em] text-[#25221e] transition duration-300 hover:-translate-y-0.5 hover:border-[#8b704f] hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b704f] sm:min-w-[175px]">
                {t(UI.heroCtaAudit)}<Search className="h-3 w-3 transition-transform group-hover:scale-110" />
              </a>
            </div>

            {/* 1-Click Interactive Funnel Qualification Pills */}
            <div className="mt-6 pt-4 border-t border-[#101114]/12">
              <span className="block label-mono text-[6.5px] tracking-[.22em] text-[#746c60] mb-2.5 uppercase">
                {currentLang === "fr" ? "Accès direct par objectif stratégique :" : currentLang === "vi" ? "Truy cập nhanh theo mục tiêu chiến lược :" : currentLang === "ar" ? "انطلاق سريع حسب الهدف الاستراتيجي :" : currentLang === "ru" ? "Быстрый выбор стратегической цели :" : "Direct access by strategic goal:"}
              </span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {HERO_FUNNEL_PILLS.map((pill) => (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => applyGoalPreset(pill.id)}
                    className="group relative flex flex-col items-start rounded-xl border border-[#101114]/10 bg-white/65 p-2.5 text-left shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a88961]/60 hover:bg-white/90 active:scale-[0.98]"
                  >
                    <span className="text-sm mb-1">{pill.icon}</span>
                    <span className="text-[9.5px] font-bold text-[#171717] leading-tight group-hover:text-[#8b704f] transition">
                      {pill.label[currentLang] ?? pill.label.fr}
                    </span>
                    <span className="mt-0.5 text-[7.5px] text-[#6d675f] line-clamp-1">
                      {pill.sub[currentLang] ?? pill.sub.fr}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none relative hidden min-h-[500px] md:block">
          <div className="absolute bottom-[16%] right-[8%] flex items-center gap-3 text-[#3f3932]/75">
            <span className="label-mono text-[7px] tracking-[.2em]">{t(UI.heroScrollNotice)}</span>
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[#8b704f]/55 transition-transform duration-500"><ArrowDown className={motionAllowed ? "h-4 w-4 animate-bounce" : "h-4 w-4"} /></span>
          </div>
          <div className="absolute bottom-[18%] left-[7%] h-32 w-px bg-gradient-to-b from-transparent via-[#8b704f]/50 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-end border-t border-[#101114]/10 bg-[#f8f6f0]/90 px-5 py-4 sm:px-8 md:absolute md:bottom-0 md:left-0 md:right-0 md:bg-[#f8f6f0]/55 md:px-10 md:py-5 lg:px-16 xl:px-24">
        <a href="#homepage-services" className="group inline-flex items-center gap-2 label-mono text-[7px] tracking-[.16em] text-[#665c4e] transition hover:text-[#111215] sm:text-[8px]">
          {t(UI.heroScrollNotice)}<ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  );
}
