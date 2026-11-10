import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Search, PhoneCall } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { XR_HERO_PHOTO } from "@/lib/photography";
import { useFunnel } from "@/lib/funnel";
import { HERO_FUNNEL_PILLS } from "@/lib/funnel-i18n";
import { HeroVslPlayer } from "./HeroVslPlayer";

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
      image.style.transform = `translate3d(0, ${((progress - 0.5) * -18).toFixed(2)}px, 0)`;
    };
    const requestUpdate = () => { if (!frame) frame = window.requestAnimationFrame(updateDepth); };
    updateDepth();

    const handleMouseMove = (e: MouseEvent) => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      if (heroSpotlightRef.current) {
        heroSpotlightRef.current.style.background = `radial-gradient(900px circle at ${x}% ${y}%, rgba(255,255,255,0.22), rgba(197,168,128,0.06) 40%, transparent 80%)`;
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
    <section
      ref={sectionRef}
      id="hero"
      className="xr-hero xr-hero-amplia-style relative isolate overflow-hidden bg-[#f8f6f0] text-[#101114] pt-24 pb-16 sm:pt-28 sm:pb-24"
    >
      {/* High-res cinematic photo backdrop: Parisian penthouse overlooking the Eiffel tower */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src={XR_HERO_PHOTO}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_22%] contrast-[1.03] brightness-[1.08] saturate-[0.88] transition-transform duration-300 ease-out will-change-transform"
        />
        {heroVideoUrl && motionAllowed && (
          <video
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[center_22%] contrast-[1.03] brightness-[1.08] saturate-[0.88]"
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
            background: "radial-gradient(900px circle at 50% 30%, rgba(255,255,255,0.18), transparent 75%)",
          }}
        />
        {/* Luminous centered radial gradient for maximum readability without washing out the view */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(248,246,240,0.94)_0%,rgba(248,246,240,0.85)_45%,rgba(248,246,240,0.45)_80%,rgba(248,246,240,0.15)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f6f0]/60 via-transparent to-[#f8f6f0]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        {/* Amplia Digital Centered Structure: Kicker -> Monumental Title -> Lead -> CTAs */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Kicker badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#8b704f]/30 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-md mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8b704f] animate-pulse" />
            <span className="label-mono text-[8px] sm:text-[9px] font-semibold tracking-[.22em] text-[#554b3e] uppercase">
              {t(UI.heroKicker)} · Direction Artistique & Acquisition
            </span>
          </div>

          {/* Monumental H1 Title */}
          <h1 className="xr-hero-heading text-[clamp(2.35rem,5.5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[#101114] [text-wrap:balance]">
            <span>{t(UI.heroTitle1)} </span>
            <span className="font-serif font-light italic text-[#8b704f]">{t(UI.heroTitleAccent)}</span>
            <span> {t(UI.heroTitle2)}</span>
            <span className="block mt-2 text-[clamp(1.4rem,3vw,2.3rem)] font-light text-[#2d2822] tracking-tight">
              Des expériences créées pour <span className="font-normal underline decoration-[#8b704f]/40 underline-offset-8">convertir</span>.
            </span>
          </h1>

          {/* Lead subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-[14.5px] leading-relaxed text-[#4e4b46] sm:text-[16px] sm:leading-7 [text-wrap:balance]">
            {t(UI.heroLead)}
          </p>

          {/* Call-to-actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-4">
            <a
              href="#quote"
              className="group inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[#111215] px-7 py-3.5 text-[10px] font-bold uppercase tracking-[.12em] text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#2e2923] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b704f]"
            >
              {t(UI.heroCtaMockup)}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#audit"
              className="group inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-[#b9ad9c] bg-white/70 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[.12em] text-[#25221e] shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[#8b704f] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b704f]"
            >
              <Search className="h-3.5 w-3.5 transition-transform group-hover:scale-110 text-[#8b704f]" />
              {t(UI.heroCtaAudit)}
            </a>
          </div>

          {/* Fast Contact Hotline Reassurance */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#6b6255]">
            <PhoneCall className="h-3 w-3 text-[#8b704f]" />
            <span>Besoin d'un échange immédiat ?</span>
            <a
              href="tel:+33767566783"
              className="font-semibold text-[#171512] hover:text-[#8b704f] underline decoration-[#8b704f]/40 underline-offset-4 transition"
            >
              +33 7 67 56 67 83
            </a>
            <span className="text-[#8b704f]">·</span>
            <a
              href="https://wa.me/33767566783"
              target="_blank"
              rel="noreferrer"
              className="text-[#171512] hover:text-[#8b704f] underline decoration-[#8b704f]/40 underline-offset-4 transition"
            >
              WhatsApp
            </a>
          </div>

          {/* 1-Click Interactive Strategic Goal Pills */}
          <div className="mt-8 pt-6 border-t border-[#101114]/10">
            <span className="block label-mono text-[7px] sm:text-[8px] tracking-[.24em] text-[#746c60] mb-3 uppercase">
              {currentLang === "fr" ? "Accès direct par objectif stratégique :" : currentLang === "vi" ? "Truy cập nhanh theo mục tiêu chiến lược :" : currentLang === "ar" ? "انطلاق سريع حسب الهدف الاستراتيجي :" : currentLang === "ru" ? "Быстрый выбор стратегической цели :" : "Direct access by strategic goal:"}
            </span>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {HERO_FUNNEL_PILLS.map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => applyGoalPreset(pill.id)}
                  className="group relative flex flex-col items-center rounded-xl border border-[#101114]/10 bg-white/75 p-3 text-center shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a88961]/70 hover:bg-white hover:shadow-md active:scale-[0.98]"
                >
                  <span className="text-base mb-1 transition-transform group-hover:scale-110">{pill.icon}</span>
                  <span className="text-[10px] font-bold text-[#171717] leading-tight group-hover:text-[#8b704f] transition">
                    {pill.label[currentLang] ?? pill.label.fr}
                  </span>
                  <span className="mt-0.5 text-[8px] text-[#6d675f] line-clamp-1">
                    {pill.sub[currentLang] ?? pill.sub.fr}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Amplia Digital Video / Showcase Component Embedded Directly Below */}
        <div className="mt-10 sm:mt-14">
          <HeroVslPlayer />
        </div>
      </div>

      {/* Subtle bottom scroll prompt */}
      <div className="mt-12 flex items-center justify-center">
        <a
          href="#homepage-services"
          className="group inline-flex items-center gap-2 label-mono text-[7.5px] tracking-[.18em] text-[#665c4e] transition hover:text-[#111215]"
        >
          {t(UI.heroScrollNotice)}
          <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  );
}
