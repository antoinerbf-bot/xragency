import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { FAQ } from "@/lib/content";
import { Parallax, Reveal, SectionHeading } from "./primitives";

export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading label={UI.faqLabel} line1={UI.faqTitle1} line2={UI.faqTitle2} />

        <Parallax speed={0.03} className="mt-14 border-t border-border">
          {FAQ.map((item, i) => {
            const active = open === i;
            return (
              <Reveal key={i} delay={Math.min(i, 6) * 40}>
                <div className="border-b border-border">
                  <button
                    onClick={() => setOpen(active ? null : i)}
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
      </div>
    </section>
  );
}