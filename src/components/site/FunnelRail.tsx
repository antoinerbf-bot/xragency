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
  { id: "cost-of-inaction", key: "inaction" },
  { id: "services", key: "solutions" },
  { id: "simulator", key: "maps" },
  { id: "audit", key: "audit" },
  { id: "quote", key: "quote" },
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

  return (
    <aside
      aria-label="Progression du parcours"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 pointer-events-none"
    >
      <div className="flex flex-col items-center gap-3 rounded-full border border-white/10 bg-[var(--xr-surface)]/70 p-2 backdrop-blur-2xl shadow-[0_10px_35px_-10px_rgba(0,0,0,0.5)] pointer-events-auto">
        {STEPS.map((step, idx) => {
          const isActive = activeId === step.id;
          const label = FUNNEL_UI.rail[step.key][currentLang] ?? FUNNEL_UI.rail[step.key].fr;
          const stepNumber = String(idx + 1).padStart(2, "0");

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => scrollToSection(step.id)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none"
              aria-label={`Étape ${stepNumber} : ${label}`}
            >
              {/* Tooltip on hover */}
              <span
                className="pointer-events-none absolute right-8 whitespace-nowrap rounded-xl border border-white/10 bg-[var(--xr-surface-strong)] px-3 py-1.5 font-mono text-[9px] font-semibold text-[var(--xr-ink)] opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1"
              >
                <span className="text-[var(--xr-accent)] mr-1.5">{stepNumber}</span>
                {label}
              </span>

              {/* Indicator Dot */}
              <span
                className={
                  "relative block rounded-full transition-all duration-300 " +
                  (isActive
                    ? "h-5 w-2 bg-[var(--xr-accent)] shadow-[0_0_12px_var(--xr-accent)]"
                    : "h-2 w-2 bg-[var(--xr-ink)] opacity-25 group-hover:opacity-60 group-hover:scale-125")
                }
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
