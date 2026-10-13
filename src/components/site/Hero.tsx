import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Search, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { XR_HERO_PHOTO } from "@/lib/photography";
import { UI } from "@/lib/copy";
import { Reveal } from "./primitives";

function useCountUp(target: number, duration = 950, delay = 180) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setValue(0);
    let frame = 0;
    const timeout = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [target, duration, delay]);

  return value;
}

function Stat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  return (
    <div className="min-w-0 border-l border-white/15 pl-3 first:border-l-0 first:pl-0 sm:pl-5">
      <strong className="display-serif block text-2xl tracking-[-.045em] text-white sm:text-3xl lg:text-4xl">
        {useCountUp(value)}{suffix}
      </strong>
      <span className="mt-1 block text-[8px] leading-4 tracking-[.12em] text-white/55 sm:text-[9px] sm:tracking-[.16em]">
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
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    setMotionAllowed(!reducedMotion && !saveData);

    const section = sectionRef.current;
    const scene = sceneRef.current;
    const image = imageRef.current;
    if (!section || !scene || !image || reducedMotion || saveData) return;

    let frame = 0;
    const updateDepth = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      const offset = (progress - 0.5) * 54;
      image.style.transform = `scale(1.09) translate3d(0, ${(-offset * 0.32).toFixed(2)}px, 0)`;
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
      className="xr-hero relative isolate overflow-hidden border-b border-white/10 bg-[#080b10] text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-[8%] h-[420px] w-[420px] rounded-full bg-cyan-400/[.07] blur-[100px]" />
        <div className="absolute bottom-[-140px] right-[22%] h-[340px] w-[340px] rounded-full bg-indigo-500/[.08] blur-[110px]" />
        <div className="absolute inset-0 opacity-[.13] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_right,black,transparent_78%)]" />
      </div>

      <div className="relative mx-auto grid min-h-0 w-full max-w-[1600px] grid-cols-1 md:min-h-[100svh] md:grid-cols-[minmax(0,1.02fr)_minmax(320px,.98fr)] md:items-center">
        <div className="relative z-20 min-w-0 px-5 pb-9 pt-28 sm:px-8 sm:pb-12 sm:pt-32 md:px-10 md:py-36 lg:px-14 xl:px-20">
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mb-7">
              <span className="h-px w-8 bg-cyan-300" />
              <span className="label-mono text-[9px] tracking-[.22em] text-white/70 sm:text-[10px]">{t(UI.heroKicker)}</span>
              <span className="rounded-full border border-cyan-200/20 bg-cyan-200/[.06] px-2.5 py-1 label-mono text-[8px] tracking-[.12em] text-cyan-100/80">FRANCE · DUBAÏ · ASIE</span>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="display-serif max-w-[760px] text-left text-[clamp(2.75rem,5.8vw,6.1rem)] leading-[.93] tracking-[-.06em] text-white [text-wrap:balance]">
              <span className="block">{t(UI.heroTitle1)}</span>
              <span className="mt-1 block text-white/75"><em className="font-normal not-italic">{t(UI.heroTitleAccent)}</em></span>
              <span className="mt-1 block text-cyan-200">{t(UI.heroTitle2)}</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/70 sm:mt-7 sm:text-base sm:leading-8 lg:text-lg">
              {t(UI.heroLead)}
            </p>
          </Reveal>

          <Reveal delay={210}>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#quote" className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-cyan-200 px-6 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-[#071116] transition duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:w-auto sm:min-w-[220px]">
                {t(UI.heroCtaMockup)}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#audit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[10px] font-semibold uppercase tracking-[.12em] text-white/85 transition duration-300 hover:border-cyan-200/70 hover:bg-white/[.04] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:w-auto">
                {t(UI.heroCtaAudit)} <Search className="h-3.5 w-3.5 text-cyan-200" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-7 flex flex-wrap gap-2 sm:mt-9" aria-label="Domaines d'expertise">
              {[
                { label: "Sites & e-commerce", target: "#quote" },
                { label: "Branding", target: "#quote" },
                { label: "SEO & Google Maps", target: "#quote" },
                { label: "Social media", target: "#quote" },
              ].map((item) => (
                <a key={item.label} href={item.target} className="inline-flex min-h-10 items-center rounded-full border border-white/12 bg-white/[.035] px-3.5 py-2 text-[10px] tracking-[.04em] text-white/60 transition hover:border-cyan-200/45 hover:bg-cyan-200/[.05] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200">
                  {item.label}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-3 border-t border-white/12 pt-5 sm:mt-10 sm:gap-6 sm:pt-6">
              <Stat value={500} suffix="+" label={t(UI.statProjects)} />
              <Stat value={98} suffix="%" label={t(UI.statSatisfaction)} />
              <Stat value={8} suffix="+" label={t(UI.statYears)} />
            </div>
          </Reveal>

          <Reveal delay={380}>
            <a href="#homepage-services" className="mt-7 inline-flex min-h-11 items-center gap-3 text-white/50 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20"><ArrowDown className="h-4 w-4" /></span>
              <span className="label-mono text-[8px] tracking-[.2em]">{t(UI.heroScrollNotice)}</span>
            </a>
          </Reveal>
        </div>

        <div ref={sceneRef} aria-hidden="true" className="xr-immersive-scene relative isolate order-2 mb-8 h-[390px] overflow-hidden sm:mx-4 sm:rounded-[2rem] md:absolute md:inset-y-0 md:right-0 md:order-none md:mb-0 md:mr-0 md:h-full md:w-[53%] md:rounded-none">
          <img ref={imageRef} src={XR_HERO_PHOTO} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[58%_center] md:object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080b10]/5 via-[#080b10]/10 to-[#080b10]/75 md:bg-gradient-to-r md:from-[#080b10]/75 md:via-[#080b10]/15 md:to-[#080b10]/15" />
          <div className="absolute inset-0 mix-blend-screen opacity-40 [background:radial-gradient(ellipse_at_70%_30%,rgba(103,232,249,.22),transparent_40%),radial-gradient(ellipse_at_30%_80%,rgba(129,140,248,.24),transparent_42%)]" />
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.22)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

          <div data-depth="0.72" className="absolute left-[9%] top-[10%] flex items-center gap-2 rounded-full border border-white/20 bg-[#080b10]/55 px-3 py-2.5 shadow-2xl backdrop-blur-xl sm:left-[12%] sm:top-[12%]">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-200 opacity-50" /><span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-200" /></span>
            <span className="label-mono text-[8px] tracking-[.18em] text-white/80">CREATIVE SYSTEM / 01</span>
          </div>

          <div data-depth="-0.4" className="absolute right-[8%] top-[26%] w-[min(70%,280px)] rotate-[3deg] rounded-2xl border border-white/25 bg-[#0c1017]/65 p-3 shadow-[0_30px_100px_-25px_rgba(0,0,0,.9)] backdrop-blur-2xl transition-transform duration-500 sm:p-4">
            <div className="flex items-center justify-between border-b border-white/12 pb-3">
              <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-white/35" /><span className="h-2 w-2 rounded-full bg-white/35" /><span className="h-2 w-2 rounded-full bg-cyan-200" /></div>
              <span className="label-mono text-[7px] tracking-[.16em] text-white/45">XR / DIGITAL EXPERIENCE</span>
            </div>
            <div className="grid grid-cols-[1.1fr_.9fr] gap-3 pt-3">
              <div className="flex flex-col justify-between py-1">
                <div><span className="label-mono text-[7px] tracking-[.18em] text-cyan-100/70">MAKE IT MATTER</span><p className="display-serif mt-2 text-2xl leading-[.95] tracking-[-.04em] text-white sm:text-3xl">Ideas into<br />experiences.</p></div>
                <div className="mt-5 flex gap-1.5"><span className="h-1 w-10 rounded-full bg-cyan-200" /><span className="h-1 w-5 rounded-full bg-white/25" /><span className="h-1 w-5 rounded-full bg-white/15" /></div>
              </div>
              <div className="relative min-h-[130px] overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-[#152d3c] via-[#263a52] to-[#10141d]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_20%,rgba(103,232,249,.65),transparent_38%),radial-gradient(ellipse_at_40%_70%,rgba(129,140,248,.65),transparent_45%)]" />
                <div className="absolute left-[18%] top-[18%] h-[64%] w-[64%] rotate-12 rounded-[35%] border border-white/55 bg-white/[.06] shadow-[0_0_50px_rgba(103,232,249,.18)] backdrop-blur-sm" />
                <div className="absolute left-[29%] top-[28%] h-[44%] w-[44%] -rotate-12 rounded-full border border-cyan-100/55" />
              </div>
            </div>
          </div>

          <div data-depth="0.95" className="absolute bottom-[13%] left-[7%] max-w-[240px] rounded-2xl border border-white/20 bg-[#0a0e14]/70 p-4 shadow-2xl backdrop-blur-xl sm:left-[12%] sm:p-5">
            <div className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-cyan-200" /><span className="label-mono text-[7px] tracking-[.2em] text-white/55">FROM STRATEGY TO IMPACT</span></div>
            <p className="mt-3 display-serif text-xl leading-tight text-white sm:text-2xl">A digital presence<br /><span className="text-cyan-200">with a point of view.</span></p>
          </div>

          <div data-depth="-0.8" className="absolute bottom-[8%] right-[8%] hidden h-24 w-24 place-items-center rounded-full border border-cyan-100/40 bg-[#101823]/30 shadow-[0_0_60px_rgba(103,232,249,.12)] backdrop-blur-sm sm:grid">
            <div className="absolute inset-3 rounded-full border border-white/15" />
            <div className="absolute inset-6 rounded-full border border-white/15" />
            <span className="h-2 w-2 rounded-full bg-cyan-100 shadow-[0_0_20px_rgba(103,232,249,.9)]" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-white/15 bg-[#080b10]/45 px-4 py-3 backdrop-blur-md sm:px-5">
            <span className="label-mono text-[7px] tracking-[.2em] text-white/60">XR CREATIVE STUDIO</span>
            <span className="label-mono text-[7px] tracking-[.2em] text-cyan-100/80">DESIGN · WEB · GROWTH</span>
          </div>
        </div>
      </div>
    </section>
  );
}
