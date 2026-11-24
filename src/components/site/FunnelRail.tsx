import { useEffect, useState } from "react";
import { useLang, type Lang } from "@/lib/i18n";
import { FUNNEL_UI } from "@/lib/funnel-i18n";
import { useFunnel } from "@/lib/funnel";

interface Step {
  id: string;
  key: keyof typeof FUNNEL_UI.rail;
}

const STEPS: Step[] = [
  { id: "hero", key: "hero" },
  { id: "services", key: "solutions" },
  { id: "quote", key: "quote" },
  { id: "audit", key: "audit" },
  { id: "maps", key: "maps" },
];

export function FunnelRail() {
  const { lang } = useLang();
  const currentLang = (lang in FUNNEL_UI.rail.hero ? lang : "fr") as Lang;
  const { scrollToSection } = useFunnel();
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      for (let i = STEPS.length - 1; i >= 0; i--) {
        const el = document.getElementById(STEPS[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveId(STEPS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progressLabel = (
    {
      fr: "Progression du parcours",
      en: "Journey progress",
      vi: "Tiến trình hành trình",
      ar: "تقدم الرحلة",
      ru: "Прогресс пути",
    } as const
  )[currentLang];
  const stepPrefix = (
    { fr: "Étape", en: "Step", vi: "Bước", ar: "الخطوة", ru: "Шаг" } as const
  )[currentLang];

  return (
    <aside
      aria-label={progressLabel}
      className="pointer-events-none fixed end-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 2xl:flex"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-2.5 rounded-full border border-[#171613]/12 bg-[#FAF8F4]/90 p-2 shadow-lg backdrop-blur-xl">
        {STEPS.map((step, idx) => {
          const isActive = activeId === step.id;
          const label = FUNNEL_UI.rail[step.key][currentLang] ?? FUNNEL_UI.rail[step.key].fr;
          const stepNumber = String(idx + 1).padStart(2, "0");

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => scrollToSection(step.id)}
              className="group relative flex items-center justify-center p-1.5"
              aria-label={`${stepPrefix} ${stepNumber}: ${label}`}
            >
              <span className="pointer-events-none absolute end-9 whitespace-nowrap rounded-lg border border-[#171613]/12 bg-[#171613] px-3 py-1.5 font-mono text-[10px] font-medium text-[#F7F4EE] opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
                <span className="me-1.5 text-white/60">{stepNumber}</span>
                {label}
              </span>

              <span
                className={
                  "relative block rounded-full transition-all duration-300 " +
                  (isActive
                    ? "h-5 w-2 bg-[#12110E]"
                    : "h-2 w-2 bg-[#171613]/25 group-hover:scale-125 group-hover:bg-[#12110E]")
                }
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
