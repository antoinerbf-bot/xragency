import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Search } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { XR_HERO_PHOTO } from "@/lib/photography";

export function Hero() {
  const { t } = useLang();
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
      image.style.transform = `scale(1.04) translate3d(0, ${((progress - 0.5) * -28).toFixed(2)}px, 0)`;
    };
    const requestUpdate = () => { if (!frame) frame = window.requestAnimationFrame(updateDepth); };
    updateDepth();

    const handleMouseMove = (e: MouseEvent) => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      if (heroSpotlightRef.current) {
        heroSpotlightRef.current.style.background = `radial-gradient(800px circle at ${x}% ${y}%, rgba(255,255,255,0.11), rgba(56,189,248,0.04) 40%, transparent 80%)`;
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
    <section ref={sectionRef} id="top" className="xr-hero xr-hero-refined relative isolate overflow-hidden bg-[#080808] text-white">
      {/* High-res cinematic photo backdrop - crisp, luminous, Parisian penthouse & Eiffel tower */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src={XR_HERO_PHOTO}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_32%] md:object-[center_36%] contrast-[1.05] brightness-[1.03] saturate-[1.06] transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: "scale(1.04)" }}
        />
        {/* Dynamic interactive mouse follow spotlight */}
        <div
          ref={heroSpotlightRef}
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none mix-blend-screen"
          style={{
            background: "radial-gradient(800px circle at 65% 45%, rgba(255,255,255,0.08), transparent 80%)",
          }}
        />
        {/* Desktop vignette: deep readable dark on left for text, crystalline view on right for penthouse & Eiffel tower */}
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(90deg,#080808_0%,rgba(8,8,8,0.80)_26%,rgba(8,8,8,0.28)_55%,rgba(8,8,8,0.02)_82%,transparent_100%)]" />
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(0deg,#080808_0%,transparent_18%)]" />
        {/* Mobile vignette: atmospheric view at top, smooth fade for high readability over text */}
        <div className="block md:hidden absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.18)_0%,rgba(8,8,8,0.60)_35%,rgba(8,8,8,0.92)_70%,#080808_100%)]" />
        <div className="hidden md:block absolute right-[8%] top-[14%] h-[min(55vw,600px)] w-[min(55vw,600px)] rounded-full border border-white/10" />
        <div className="hidden md:block absolute right-[17%] top-[28%] h-2 w-2 rounded-full bg-white shadow-[0_0_24px_6px_rgba(255,255,255,.35)]" />
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1800px] md:grid-cols-[minmax(0,1.15fr)_minmax(220px,.85fr)]">
        <div className="relative z-10 flex items-center px-5 pb-16 pt-24 sm:px-8 md:px-10 md:pb-32 md:pt-36 lg:px-16 xl:px-24">
          <div className="max-w-[850px]">
            <div className="mb-6 flex items-center gap-3 sm:mb-8">
              <span className="h-px w-10 bg-white/75" />
              <span className="label-mono text-[8px] tracking-[.24em] text-white/75 sm:text-[9px]">{t(UI.heroKicker)}</span>
            </div>
            <h1 className="xr-hero-heading max-w-[920px] text-[clamp(3.45rem,7.2vw,7.9rem)] font-medium leading-[.86] tracking-[-.075em] text-white [text-wrap:balance]">
              <span className="block">{t(UI.heroTitle1)}</span>
              <span className="mt-1 block font-serif font-normal italic tracking-[-.065em] text-white/80">{t(UI.heroTitleAccent)}</span>
              <span className="mt-1 block">{t(UI.heroTitle2)}</span>
            </h1>
            <p className="mt-6 max-w-[590px] text-[14px] leading-6 text-white/80 sm:mt-8 sm:text-base sm:leading-7 lg:text-[17px]">{t(UI.heroLead)}</p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#quote" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-[.1em] text-[#090909] transition duration-300 hover:-translate-y-1 hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-w-[245px]">
                {t(UI.heroCtaMockup)}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#audit" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/45 px-5 py-3 text-[10px] font-semibold uppercase tracking-[.1em] text-white transition duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-w-[190px]">
                {t(UI.heroCtaAudit)}<Search className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none relative hidden min-h-[500px] md:block">
          <div className="absolute bottom-[16%] right-[8%] flex items-center gap-3 text-white/75">
            <span className="label-mono text-[7px] tracking-[.2em]">{t(UI.heroScrollNotice)}</span>
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/45 transition-transform duration-500"><ArrowDown className={motionAllowed ? "h-4 w-4 animate-bounce" : "h-4 w-4"} /></span>
          </div>
          <div className="absolute bottom-[18%] left-[7%] h-32 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-end border-t border-white/15 bg-[#080808]/90 px-5 py-4 sm:px-8 md:absolute md:bottom-0 md:left-0 md:right-0 md:bg-black/30 md:px-10 md:py-5 lg:px-16 xl:px-24">
        <a href="#homepage-services" className="group inline-flex items-center gap-2 label-mono text-[7px] tracking-[.16em] text-white/75 transition hover:text-white sm:text-[8px]">
          {t(UI.heroScrollNotice)}<ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  );
}
