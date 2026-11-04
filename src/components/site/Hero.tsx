import { useRef } from "react";
import { ArrowDown, ArrowRight, Play, Search } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { XR_HERO_PHOTO } from "@/lib/photography";
import { useFunnel } from "@/lib/funnel";
import { HERO_FUNNEL_PILLS } from "@/lib/funnel-i18n";

export function Hero() {
  const { t, lang } = useLang();
  const currentLang = (lang || "fr") as Lang;
  const { applyGoalPreset } = useFunnel();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="xr-hero relative isolate flex min-h-[92svh] items-end overflow-hidden bg-[#171512] text-white md:min-h-[100svh]"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <img
          src={XR_HERO_PHOTO}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="xr-hero-image absolute inset-0 h-full w-full object-cover object-[72%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,12,.88)_0%,rgba(12,12,12,.70)_35%,rgba(12,12,12,.20)_72%,rgba(12,12,12,.10)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,10,10,.88)_0%,rgba(10,10,10,.28)_35%,transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_38%,transparent_0%,rgba(0,0,0,.12)_68%,rgba(0,0,0,.28)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1700px] grid-cols-1 items-end gap-7 px-5 pb-8 pt-28 sm:gap-10 sm:px-8 sm:pb-14 md:min-h-[100svh] md:grid-cols-[minmax(0,1fr)_minmax(180px,.55fr)] md:gap-8 md:px-12 md:pb-24 lg:px-20 xl:px-24">
        <div className="max-w-[780px]">
          <div className="mb-5 flex items-center gap-3 sm:mb-6">
            <span className="h-px w-9 bg-[#c59a62]" />
            <span className="label-mono text-[8px] uppercase tracking-[.26em] text-[#e5c99f] sm:text-[9px]">
              {t(UI.heroKicker)}
            </span>
          </div>

          <h1 className="xr-hero-heading max-w-[820px] text-[clamp(2.9rem,7.3vw,7.4rem)] font-medium leading-[.88] tracking-[-.065em] text-white [text-wrap:balance]">
            <span className="block">{t(UI.heroTitle1)}</span>
            <span className="mt-1 block font-serif font-light italic tracking-[-.045em] text-[#d0a66e]">
              {t(UI.heroTitleAccent)}
            </span>
            <span className="mt-1 block">{t(UI.heroTitle2)}</span>
          </h1>

          <p className="mt-6 max-w-[570px] text-[14px] leading-relaxed text-white/85 sm:text-base sm:leading-7">
            {t(UI.heroLead)}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#quote"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#f5eee3] px-6 py-3 text-[10px] font-bold uppercase tracking-[.09em] text-[#171512] shadow-[0_12px_34px_rgba(0,0,0,.22)] transition duration-300 hover:-translate-y-1 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d0a66e]"
            >
              {t(UI.heroCtaMockup)}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#xr-showreel"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/55 bg-black/15 px-5 py-3 text-[10px] font-semibold uppercase tracking-[.09em] text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#d0a66e] hover:bg-black/35"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              {currentLang === "fr" ? "Voir le showreel" : currentLang === "vi" ? "Xem showreel" : currentLang === "ar" ? "شاهد العرض" : currentLang === "ru" ? "Смотреть showreel" : "Watch the showreel"}
            </a>
          </div>

          <div className="mt-7 border-t border-white/20 pt-4 sm:mt-8 sm:pt-5">
            <a
              href="#homepage-services"
              className="inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em] text-white/85 transition hover:text-[#e4c18e] sm:hidden"
            >
              {currentLang === "fr" ? "Explorer nos expertises" : currentLang === "vi" ? "Khám phá chuyên môn" : currentLang === "ar" ? "اكتشف خبراتنا" : currentLang === "ru" ? "Наши направления" : "Explore our expertise"}
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
            <div className="hidden sm:block">
              <span className="mb-3 block label-mono text-[8px] uppercase tracking-[.2em] text-white/60">
                {currentLang === "fr" ? "Accès direct par objectif stratégique" : currentLang === "vi" ? "Truy cập nhanh theo mục tiêu chiến lược" : currentLang === "ar" ? "الوصول حسب الهدف الاستراتيجي" : currentLang === "ru" ? "Быстрый доступ по стратегической цели" : "Quick access by strategic goal"}
              </span>
              <div className="grid grid-cols-4 gap-2">
                {HERO_FUNNEL_PILLS.map((pill) => (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => applyGoalPreset(pill.id)}
                    className="group flex min-h-[76px] flex-col items-start rounded-xl border border-white/15 bg-black/30 p-3 text-left shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#c59a62]/70 hover:bg-black/50 active:scale-[.98]"
                  >
                    <span className="mb-1 text-sm">{pill.icon}</span>
                    <span className="text-[10px] font-bold leading-tight text-white transition group-hover:text-[#e4c18e]">
                      {pill.label[currentLang] ?? pill.label.fr}
                    </span>
                    <span className="mt-1 line-clamp-1 text-[8px] text-white/60">
                      {pill.sub[currentLang] ?? pill.sub.fr}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden h-full min-h-[260px] items-end justify-end pb-5 md:flex">
          <a href="#homepage-services" className="group inline-flex items-center gap-3 text-white/75 transition hover:text-white">
            <span className="label-mono text-[8px] tracking-[.2em]">{t(UI.heroScrollNotice)}</span>
            <span className="grid h-12 w-12 place-items-center rounded-full border border-white/45 transition duration-500 group-hover:-translate-y-1 group-hover:border-[#d0a66e]">
              <ArrowDown className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c59a62]/70 to-transparent" />
    </section>
  );
}
