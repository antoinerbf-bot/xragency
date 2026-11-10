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
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 360);
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

  if (!scrolledPastHero) return null;

  return (
    <aside
      aria-label="Progression du parcours"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 pointer-events-none animate-in fade-in duration-300"
    >
      <div className="flex flex-col items-center gap-3 rounded-full border border-[#c5a880]/25 bg-[#141312]/90 p-2 backdrop-blur-2xl shadow-[0_14px_38px_-10px_rgba(0,0,0,0.55)] pointer-events-auto">
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
                className="pointer-events-none absolute right-8 whitespace-nowrap rounded-xl border border-[#c5a880]/25 bg-[#141312] px-3 py-1.5 font-mono text-[9px] font-semibold text-[#f7f4ed] opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1"
              >
                <span className="text-[#c5a880] mr-1.5">{stepNumber}</span>
                {label}
              </span>

              {/* Indicator Dot */}
              <span
                className={
                  "relative block rounded-full transition-all duration-300 " +
                  (isActive
                    ? "h-5 w-2 bg-[#c5a880] shadow-[0_0_12px_rgba(197,168,128,0.65)]"
                    : "h-2 w-2 bg-[#f7f4ed] opacity-30 group-hover:opacity-75 group-hover:scale-125")
                }
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
