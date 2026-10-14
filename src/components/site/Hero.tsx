import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, Search } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { XR_HERO_PHOTO } from "@/lib/photography";

export function Hero() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image || reducedMotion || saveData) return;
    let frame = 0;
    const updateDepth = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      image.style.transform = `scale(1) translate3d(0, ${((progress - 0.5) * -12).toFixed(2)}px, 0)`;
    };
    const requestUpdate = () => { if (!frame) frame = window.requestAnimationFrame(updateDepth); };
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
    <section ref={sectionRef} id="top" className="xr-hero xr-hero-refined relative isolate overflow-hidden bg-[#080808] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        <img ref={imageRef} src={XR_HERO_PHOTO} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[center_42%]" style={{ transform: "scale(1)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.60)_0%,rgba(5,5,5,.36)_32%,rgba(5,5,5,.06)_62%,rgba(5,5,5,0)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,5,5,.38)_0%,transparent_24%,rgba(5,5,5,.04)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_73%_38%,transparent_0%,rgba(0,0,0,.02)_54%,rgba(0,0,0,.08)_100%)]" />
        <div className="xr-hero-grain absolute inset-0 opacity-[.14]" />
        <div className="xr-hero-orbit absolute right-[8%] top-[14%] h-[min(62vw,680px)] w-[min(62vw,680px)] rounded-full border border-white/20" />
        <div className="xr-hero-orbit xr-hero-orbit-delayed absolute right-[14%] top-[21%] h-[min(48vw,530px)] w-[min(48vw,530px)] rounded-full border border-white/15" />
        <div className="absolute right-[18%] top-[29%] h-[min(34vw,370px)] w-[min(34vw,370px)] rounded-full border border-white/10 bg-white/[.025] backdrop-blur-[1px]" />
        <div className="absolute right-[17%] top-[28%] h-2 w-2 rounded-full bg-white shadow-[0_0_26px_8px_rgba(255,255,255,.28)]" />
        <div className="absolute right-[10%] bottom-[23%] h-px w-[23%] bg-gradient-to-r from-transparent via-white/65 to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-0 max-w-[1800px] md:min-h-[100svh] md:grid-cols-[minmax(0,1.05fr)_minmax(220px,.95fr)]">
        <div className="relative h-[42svh] min-h-[290px] max-h-[470px] overflow-hidden md:hidden">
          <img src={XR_HERO_PHOTO} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[center_42%]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.06)_0%,rgba(0,0,0,.02)_48%,#080808_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.18),transparent_65%)]" />
          <div aria-hidden className="xr-hero-grain absolute inset-0 opacity-[.08]" />
        </div>

        <div className="relative z-10 flex items-center px-5 pb-12 pt-5 sm:px-8 md:px-10 md:pb-32 md:pt-36 lg:px-16 xl:px-24">
          <div className="max-w-[850px]">
            <div className="mb-6 flex items-center gap-3 sm:mb-8">
              <span className="h-px w-10 bg-white/75" />
              <span className="label-mono text-[8px] tracking-[.24em] text-white/75 sm:text-[9px]">{t(UI.heroKicker)}</span>
            </div>
            <h1 className="xr-hero-heading max-w-[920px] text-[clamp(3.45rem,7.2vw,7.9rem)] font-medium leading-[.86] tracking-[-.075em] text-white [text-wrap:balance]">
              <span className="block">{t(UI.heroTitle1)}</span>
              <span className="mt-1 block font-serif font-normal italic tracking-[-.055em] text-white/95 [text-shadow:0_2px_28px_rgba(0,0,0,.16)]">{t(UI.heroTitleAccent)}</span>
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
            <div className="mt-8 grid max-w-[620px] grid-cols-2 gap-x-6 gap-y-4 border-t border-white/25 pt-5 sm:grid-cols-4">
              <div><p className="font-serif text-2xl leading-none sm:text-3xl">7</p><p className="mt-2 label-mono text-[6px] tracking-[.12em] text-white/70 sm:text-[7px]">{t({fr:"EXPERTISES",en:"EXPERTISES",vi:"CHUYÊN MÔN",ar:"تخصصات",ru:"НАПРАВЛЕНИЙ"})}</p></div>
              <div><p className="font-serif text-2xl leading-none sm:text-3xl">5</p><p className="mt-2 label-mono text-[6px] tracking-[.12em] text-white/70 sm:text-[7px]">{t({fr:"LANGUES",en:"LANGUAGES",vi:"NGÔN NGỮ",ar:"لغات",ru:"ЯЗЫКОВ"})}</p></div>
              <div><p className="font-serif text-2xl leading-none sm:text-3xl">6</p><p className="mt-2 label-mono text-[6px] tracking-[.12em] text-white/70 sm:text-[7px]">{t({fr:"FUSEAUX HORAIRES",en:"TIME ZONES",vi:"MÚI GIỜ",ar:"مناطق زمنية",ru:"ЧАСОВЫХ ПОЯСОВ"})}</p></div>
              <div><p className="font-serif text-lg leading-none sm:text-xl">{t({fr:"Satisfaction",en:"Satisfaction",vi:"Hài lòng",ar:"رضا العملاء",ru:"Удовлетворённость"})}</p><p className="mt-2 label-mono text-[6px] tracking-[.12em] text-white/70 sm:text-[7px]">{t({fr:"SUIVIE À CHAQUE PROJET",en:"TRACKED PER PROJECT",vi:"THEO DÕI TỪNG DỰ ÁN",ar:"تُتابَع في كل مشروع",ru:"ОТСЛЕЖИВАЕТСЯ ПО ПРОЕКТАМ"})}</p></div>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none relative hidden min-h-[500px] md:block">

          <div className="absolute bottom-[16%] right-[8%] flex items-center gap-3 text-white/75">
            <span className="label-mono text-[7px] tracking-[.2em]">{t(UI.heroScrollNotice)}</span>
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/45 transition-transform duration-500"><ArrowDown className="h-4 w-4" /></span>
          </div>
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
