import { Star } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SERVICES } from "@/lib/content";
import { EmberButton, Reveal } from "./primitives";

export function Feature() {
  const { t, price } = useLang();
  const maps = SERVICES.find((s) => s.id === "maps")!;
  const ai = SERVICES.find((s) => s.id === "ai")!;

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Google Maps TOP 3 */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <p className="label-mono text-primary">{t(UI.mapsLabel)}</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display-serif mt-6 text-4xl sm:text-5xl">
                Google Maps <em className="italic text-primary">TOP 3.</em>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                {t(maps.description)}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {maps.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-primary">·</span>
                    {t(h)}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <EmberButton href="#intelligence">{t(UI.customQuote)}</EmberButton>
                <p className="label-mono text-muted-foreground">
                  {t(UI.from)} {price(maps.fromEur)} / {t({ fr: "an", en: "year", vi: "năm" })}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="surface-plate rounded-3xl p-6 sm:p-8">
              <p className="label-mono text-muted-foreground">{t(UI.mapsLocalPack)}</p>
              <div className="mt-6 space-y-3">
                {[
                  { rank: "1", name: t(UI.mapsYourBusiness), score: "4.9 (127)", you: true },
                  { rank: "2", name: `${t(UI.mapsCompetitor)} A`, score: "4.2 (45)" },
                  { rank: "3", name: `${t(UI.mapsCompetitor)} B`, score: "4.0 (32)" },
                ].map((r) => (
                  <div
                    key={r.rank}
                    className={`flex items-center gap-4 rounded-2xl border p-4 transition-colors ${
                      r.you ? "border-primary/60 bg-primary/10" : "border-border bg-background/40"
                    }`}
                  >
                    <span className="label-mono text-primary">{r.rank}</span>
                    <div className="flex-1">
                      <p className="text-sm">{r.name}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        {r.score}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-baseline gap-3 border-t border-border pt-6">
                <span className="display-serif text-4xl text-primary">+340%</span>
                <span className="label-mono text-muted-foreground">{t(UI.mapsVisibility)}</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* AI assistants */}
        <div className="mt-28 grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="surface-plate order-2 rounded-3xl p-6 sm:p-8">
              <p className="label-mono text-muted-foreground">{t(UI.aiCompare)}</p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-b border-border pb-3">
                <span className="label-mono text-muted-foreground">{t(UI.aiFeature)}</span>
                <span className="label-mono text-muted-foreground">{t(UI.aiHuman)}</span>
                <span className="label-mono text-primary">{t(UI.aiAi)}</span>
              </div>
              {[
                [t(UI.aiAvailability), t(UI.aiHours), "24/7"],
                [t(UI.aiResponse), t(UI.aiResponseHuman), t(UI.aiResponseAi)],
                [t(UI.aiLanguages), "1 — 2", t(UI.aiUnlimited)],
                [t(UI.aiCost), price(2500), `${t(UI.from)} ${price(499)}`],
              ].map((row) => (
                <div key={row[0]} className="grid grid-cols-3 gap-4 border-b border-border/60 py-4">
                  <span className="text-sm text-muted-foreground">{row[0]}</span>
                  <span className="text-sm text-muted-foreground/70 line-through">{row[1]}</span>
                  <span className="text-sm text-primary">{row[2]}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <div>
            <Reveal delay={80}>
              <p className="label-mono text-primary">{t(UI.aiLabel)}</p>
            </Reveal>
            <Reveal delay={140}>
              <h2 className="display-serif mt-6 text-4xl sm:text-5xl">
                {t({ fr: "Un service client", en: "Customer service", vi: "Chăm sóc khách hàng" })}{" "}
                <em className="italic text-primary">
                  {t({ fr: "qui ne dort jamais.", en: "that never sleeps.", vi: "không bao giờ ngủ." })}
                </em>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                {t(ai.description)}
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-9">
                <EmberButton href="#intelligence">{t(UI.ctaAnalysis)}</EmberButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}