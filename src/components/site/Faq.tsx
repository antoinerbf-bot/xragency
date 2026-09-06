import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { FAQ, type FaqCategory } from "@/lib/content";
import { Reveal, SectionHeading } from "./primitives";

const CATEGORIES: { key: FaqCategory | "all"; labelKey: keyof typeof UI }[] = [
  { key: "all", labelKey: "faqCatAll" },
  { key: "sites", labelKey: "faqCatSites" },
  { key: "seo", labelKey: "faqCatSeo" },
  { key: "ia", labelKey: "faqCatIa" },
  { key: "tarifs", labelKey: "faqCatTarifs" },
  { key: "delais", labelKey: "faqCatDelais" },
  { key: "general", labelKey: "faqCatGeneral" },
];

const INITIAL_VISIBLE = 6;

export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const [activeCat, setActiveCat] = useState<FaqCategory | "all">("all");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(
    () => (activeCat === "all" ? FAQ : FAQ.filter((f) => f.category === activeCat)),
    [activeCat],
  );

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE;

  return (
    <section id="faq" className="relative py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading label={UI.faqLabel} line1={UI.faqTitle1} line2={UI.faqTitle2} />

        {/* Conversational intro */}
        <Reveal delay={60}>
          <p className="mt-6 text-sm italic text-muted-foreground/70 max-w-xl">
            {t({
              fr: "Une question ? Elle est sûrement là. Sinon, posez-la nous directement — on répond en moins de 2h.",
              en: "A question? It's probably here. Otherwise, ask us directly — we reply in under 2h.",
              vi: "Có câu hỏi? Chắc chắn có ở đây. Nếu không, hãy hỏi chúng tôi trực tiếp.",
            })}
          </p>
        </Reveal>

        {/* Category filter pills */}
        <Reveal delay={80}>
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map(({ key, labelKey }) => (
              <button
                key={key}
                onClick={() => {
                  setActiveCat(key);
                  setOpen(null);
                  setShowAll(false);
                }}
                className={cn(
                  "label-mono rounded-full border px-3.5 py-1.5 text-xs transition-all duration-300",
                  activeCat === key
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {t(UI[labelKey])}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Accordion */}
        <div className="mt-8 divide-y divide-border/60 border-t border-border/60">
          {visible.map((item, i) => {
            const globalIdx = FAQ.indexOf(item);
            const active = open === globalIdx;

            return (
              <Reveal key={globalIdx} delay={Math.min(i, 5) * 35}>
                <div
                  className={cn(
                    "transition-colors duration-300",
                    active && "bg-accent/25",
                  )}
                >
                  <button
                    onClick={() => setOpen(active ? null : globalIdx)}
                    className={cn(
                      "flex w-full items-start gap-5 py-5 text-left transition-colors duration-200",
                      active && "text-primary",
                    )}
                    aria-expanded={active}
                  >
                    {/* Number */}
                    <span
                      className={cn(
                        "label-mono mt-0.5 shrink-0 text-xs transition-colors duration-300",
                        active ? "text-primary" : "text-muted-foreground/50",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}
                    <span className="display-serif flex-1 text-lg leading-snug sm:text-xl">
                      {t(item.q)}
                    </span>

                    {/* Animated +/× icon */}
                    <span
                      className={cn(
                        "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-350",
                        active
                          ? "border-primary bg-primary text-primary-foreground rotate-45"
                          : "border-border text-muted-foreground hover:border-primary/40",
                      )}
                      style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
                      aria-hidden
                    >
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        className="h-3 w-3"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                      >
                        <line x1="6" y1="1" x2="6" y2="11" />
                        <line x1="1" y1="6" x2="11" y2="6" />
                      </svg>
                    </span>
                  </button>

                  {/* Answer — grid animation */}
                  <div
                    className="grid transition-all duration-350 ease-out"
                    style={{
                      gridTemplateRows: active ? "1fr" : "0fr",
                      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={cn(
                          "border-l-2 ml-11 mb-5 pl-4 transition-colors duration-300",
                          active ? "border-primary/40" : "border-transparent",
                        )}
                      >
                        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                          {t(item.a)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Show all / Show less toggle */}
        {hasMore ? (
          <Reveal delay={180}>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowAll((v) => !v)}
                className="label-mono inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-5 py-2.5 text-xs text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                {showAll ? t(UI.faqShowLess) : t(UI.faqShowAll)}
                <span>{showAll ? "↑" : "↓"}</span>
              </button>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
