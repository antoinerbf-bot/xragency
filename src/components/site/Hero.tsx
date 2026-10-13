import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Search } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { XR_HERO_PHOTO } from "@/lib/photography";
import { UI } from "@/lib/copy";
import { Reveal } from "./primitives";

function useCountUp(target: number, duration = 1000, delay = 180) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setValue(0);
    const timeout = window.setTimeout(() => {
      const start = performance.now();
      let frame = 0;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
      return () => window.cancelAnimationFrame(frame);
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [target, duration, delay]);

  return value;
}

function Stat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  return (
    <div className="min-w-0 border-l border-white/20 pl-3 first:border-l-0 first:pl-0 sm:pl-5">
      <strong className="display-serif block text-2xl tracking-[-.045em] text-white sm:text-3xl lg:text-4xl">
        {useCountUp(value)}{suffix}
      </strong>
      <span className="mt-1 block text-[8px] leading-4 tracking-[.12em] text-white/60 sm:text-[9px] sm:tracking-[.16em]">
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    setMotionAllowed(!reducedMotion && !saveData);
    if (reducedMotion || saveData) return;

    const section = sectionRef.current;
    const scene = sceneRef.current;
    const image = imageRef.current;
    if (!section || !scene || !image) return;

    let frame = 0;
    const updateDepth = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      const offset = (progress - 0.5) * 42;
      scene.style.setProperty("--scene-shift", `${offset.toFixed(2)}px`);
      image.style.transform = `scale(1.07) translate3d(0, ${(-offset * 0.45).toFixed(2)}px, 0)`;
      scene.querySelectorAll<HTMLElement>("[data-depth]").forEach((layer) => {
        const depth = Number(layer.dataset.depth || 0);
        layer.style.transform = `translate3d(0, ${(offset * depth).toFixed(2)}px, 0)`;
      });
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDepth);
    };

    updateDepth();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="xr-hero relative isolate overflow-hidden border-b border-white/10 bg-[#090a0d] text-white"
    >
      {/* La scène reste indépendante du bloc de texte : aucun titre n'est posé sur la photo. */}
      <div
        ref={sceneRef}
        aria-hidden="true"
        className="xr-immersive-scene relative order-1 h-[39svh] min-h-[290px] max-h-[440px] overflow-hidden md:absolute md:inset-y-0 md:right-0 md:order-none md:h-full md:min-h-0 md:max-h-none md:w-[59%]"
      >
        <img
          ref={imageRef}
          src={XR_HERO_PHOTO}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[58%_center] md:object-center"
        />
        {motionAllowed ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={XR_HERO_PHOTO}
            className="absolute inset-0 h-full w-full object-cover object-[58%_center] opacity-55 mix-blend-screen md:object-center"
            onError={(event) => { event.currentTarget.style.display = "none"; }}
          >
            <source src="https://videos.pexels.com/video-files/1350205/1350205-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090a0d]/10 via-transparent to-[#090a0d]/45 md:bg-gradient-to-r md:from-[#090a0d]/0 md:via-[#090a0d]/10 md:to-[#090a0d]/20" />
        <div className="absolute inset-y-0 left-0 hidden w-[38%] bg-gradient-to-r from-[#090a0d] to-transparent md:block" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090a0d]/55 to-transparent md:hidden" />

        <div data-depth="0.55" className="absolute right-[9%] top-[19%] hidden md:block">
          <div className="relative grid h-48 w-48 place-items-center rounded-full border border-white/20">
            <div className="absolute inset-4 rounded-full border border-white/10" />
            <div className="absolute inset-9 rounded-full border border-white/10" />
            <span className="absolute right-[16%] top-[22%] h-2.5 w-2.5 rounded-full bg-[#f0a45d] shadow-[0_0_24px_rgba(240,164,93,.8)]" />
            <span className="label-mono text-[8px] tracking-[.28em] text-white/70">IDEAS IN MOTION</span>
          </div>
        </div>

        <div data-depth="-0.35" className="absolute bottom-[17%] right-[12%] hidden max-w-[245px] border-l border-[#f0a45d]/80 pl-4 md:block">
          <p className="label-mono text-[8px] tracking-[.22em] text-[#f0b57a]">STRATEGY / DESIGN / DIGITAL</p>
          <p className="mt-2 display-serif text-2xl leading-tight text-white">Built to move<br />your brand forward.</p>
        </div>
        <div data-depth="0.9" className="absolute bottom-[13%] left-[17%] hidden items-center gap-2 md:flex">
          <span className="h-px w-10 bg-[#f0a45d]" />
          <span className="label-mono text-[8px] tracking-[.2em] text-white/65">01 — DIGITAL CRAFT</span>
        </div>
        <div className="absolute bottom-5 left-5 flex items-center gap-2 md:hidden">
          <span className="h-px w-7 bg-[#f0a45d]" />
          <span className="label-mono text-[8px] tracking-[.2em] text-white/75">XR CREATIVE STUDIO</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-1 md:min-h-[100svh] md:grid-cols-[minmax(0,1fr)_minmax(300px,.82fr)] md:items-center">
        <div className="order-2 min-w-0 px-5 pb-8 pt-7 sm:px-8 sm:pb-10 md:order-none md:px-10 md:py-32 lg:px-14 xl:px-20">
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mb-7">
              <span className="h-px w-8 bg-[#f0a45d]" />
              <span className="label-mono text-[9px] tracking-[.22em] text-white/75 sm:text-[10px]">{t(UI.heroKicker)}</span>
              <span className="label-mono text-[8px] tracking-[.15em] text-[#f0b57a]">FRANCE · DUBAÏ · ASIE</span>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="display-serif max-w-[760px] text-left text-[clamp(2.8rem,6.3vw,6.8rem)] leading-[.94] tracking-[-.06em] text-white [text-wrap:balance]">
              <span className="block">{t(UI.heroTitle1)}</span>
              <span className="mt-1 block text-white/70"><em className="font-normal not-italic">{t(UI.heroTitleAccent)}</em></span>
              <span className="mt-1 block text-[#f0b57a]">{t(UI.heroTitle2)}</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/75 sm:mt-7 sm:text-base sm:leading-8 lg:text-lg">
              {t(UI.heroLead)}
            </p>
          </Reveal>

          <Reveal delay={210}>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#quote"
                className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#f0a45d] px-6 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-[#17110b] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffc184] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0a45d] sm:w-auto sm:min-w-[220px]"
              >
                {t(UI.heroCtaMockup)}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#quote"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-[10px] font-semibold uppercase tracking-[.12em] text-white/85 transition duration-300 hover:border-[#f0a45d]/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0a45d] sm:w-auto"
              >
                {t(UI.heroCtaAudit)} <Search className="h-3.5 w-3.5 text-[#f0b57a]" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={270}>
            <div className="mt-7 flex flex-wrap gap-2 sm:mt-9" aria-label="Domaines d'expertise">
              {[
                { label: "Sites & e-commerce", target: "#quote" },
                { label: "Branding", target: "#quote" },
                { label: "SEO & Google Maps", target: "#quote" },
                { label: "Social media", target: "#quote" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.target}
                  className="inline-flex min-h-10 items-center rounded-full border border-white/15 bg-white/[.035] px-3.5 py-2 text-[10px] tracking-[.04em] text-white/65 transition hover:border-[#f0a45d]/55 hover:bg-white/[.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0a45d]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={330}>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-3 border-t border-white/15 pt-5 sm:mt-10 sm:gap-6 sm:pt-6">
              <Stat value={500} suffix="+" label={t(UI.statProjects)} />
              <Stat value={98} suffix="%" label={t(UI.statSatisfaction)} />
              <Stat value={8} suffix="+" label={t(UI.statYears)} />
            </div>
          </Reveal>

          <Reveal delay={390}>
            <a href="#homepage-services" className="mt-8 inline-flex min-h-11 items-center gap-3 text-white/55 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0a45d]">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20"><ArrowDown className="h-4 w-4" /></span>
              <span className="label-mono text-[8px] tracking-[.2em]">{t(UI.heroScrollNotice)}</span>
            </a>
          </Reveal>
        </div>
        <div aria-hidden="true" className="hidden md:block" />
      </div>
    </section>
  );
}
