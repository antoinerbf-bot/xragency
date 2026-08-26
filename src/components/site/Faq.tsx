import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { FAQ, type FaqCategory } from "@/lib/content";
import { Parallax, Reveal, SectionHeading } from "./primitives";

const CATEGORIES: { key: FaqCategory | "all"; labelKey: keyof typeof UI }[] = [
  { key: "all", labelKey: "faqCatAll" },
  { key: "sites", labelKey: "faqCatSites" },
  { key: "seo", labelKey: "faqCatSeo" },
  { key: "ia", labelKey: "faqCatIa" },
  { key: "tarifs", labelKey: "faqCatTarifs" },
  { key: "delais", labelKey: "faqCatDelais" },
  { key: "general", labelKey: "faqCatGeneral" },
];

const INITIAL_VISIBLE = 5;

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
    <section id="faq" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading label={UI.faqLabel} line1={UI.faqTitle1} line2={UI.faqTitle2} />

        {/* Category filter pills */}
        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map(({ key, labelKey }) => (
              <button
                key={key}
                onClick={() => {
                  setActiveCat(key);
                  setOpen(null);
                  setShowAll(false);
                }}
                className={cn(
                  "label-mono rounded-full border px-4 py-2 text-xs transition-all duration-300",
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

        <Parallax speed={0.03} className="mt-10 border-t border-border">
          {visible.map((item, i) => {
            const globalIdx = FAQ.indexOf(item);
            const active = open === globalIdx;
            return (
              <Reveal key={globalIdx} delay={Math.min(i, 6) * 40}>
                <div className="border-b border-border">
                  <button
                    onClick={() => setOpen(active ? null : globalIdx)}
                    className="flex w-full items-start gap-6 py-6 text-left"
                  >
                    <span className="label-mono mt-1 text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display-serif flex-1 text-xl sm:text-2xl">{t(item.q)}</span>
                    <Plus
                      className={cn(
                        "mt-1 h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                        active && "rotate-45",
                      )}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-500 ease-out"
                    style={{ gridTemplateRows: active ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-3xl pb-7 pl-12 text-sm leading-relaxed text-muted-foreground">
                        {t(item.a)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </Parallax>

        {/* Show all / Show less toggle */}
        {hasMore ? (
          <Reveal delay={200}>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowAll((v) => !v)}
                className="label-mono inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-6 py-3 text-xs text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
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
