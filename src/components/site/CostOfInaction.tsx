import { useState, useEffect, useMemo } from "react";
import { ArrowRight, TrendingDown, TrendingUp, AlertTriangle, Sparkles, ShieldAlert } from "lucide-react";
import { Parallax, Reveal } from "./primitives";
import { useLang, type Lang } from "@/lib/i18n";
import { useFunnel } from "@/lib/funnel";
import { FUNNEL_UI, SECTOR_COST_PROFILES } from "@/lib/funnel-i18n";

export function CostOfInaction() {
  const { lang } = useLang();
  const currentLang = (lang in FUNNEL_UI.inaction.title ? lang : "fr") as Lang;
  const t = FUNNEL_UI.inaction;
  const { sector, setSector, scrollToSection } = useFunnel();

  const currentProfile = useMemo(() => {
    return (
      SECTOR_COST_PROFILES.find((p) => p.id === sector) ||
      SECTOR_COST_PROFILES[0]
    );
  }, [sector]);

  const [ticket, setTicket] = useState<number>(currentProfile.avgTicket);
  const [lostClients, setLostClients] = useState<number>(currentProfile.monthlyLostClients);

  // When sector changes, update defaults
  useEffect(() => {
    setTicket(currentProfile.avgTicket);
    setLostClients(currentProfile.monthlyLostClients);
  }, [currentProfile]);

  const monthlyLoss = useMemo(() => ticket * lostClients, [ticket, lostClients]);
  const annualLoss = useMemo(() => monthlyLoss * 12, [monthlyLoss]);

  return (
    <section
      id="cost-of-inaction"
      className="xr-section relative overflow-hidden border-b xr-line py-20 sm:py-28 lg:py-36 bg-[var(--xr-bg)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-rose-500/5 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-[var(--xr-accent)]/5 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Parallax speed={-0.02}>
          <Reveal>
            <div className="max-w-4xl">
              <span className="label-mono xr-accent text-[8px] tracking-[.28em] inline-flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                {t.eyebrow[currentLang] ?? t.eyebrow.fr}
              </span>
              <h2 className="display-serif mt-5 text-[clamp(2.5rem,5.2vw,5.5rem)] leading-[.88] tracking-[-.055em]">
                {t.title[currentLang] ?? t.title.fr}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 xr-muted sm:text-base">
                {t.subtitle[currentLang] ?? t.subtitle.fr}
              </p>
            </div>
          </Reveal>
        </Parallax>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-[2.2rem] border xr-line bg-[var(--xr-surface)] p-6 sm:p-8 backdrop-blur-xl">
            <div>
              <span className="label-mono text-[7px] xr-muted-2">01 · PARAMÈTRES DU SECTEUR</span>

              {/* Sector selector */}
              <div className="mt-4">
                <label className="text-[11px] font-semibold block mb-2">
                  {t.sectorSelectLabel[currentLang] ?? t.sectorSelectLabel.fr}
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-3.5 text-xs font-medium outline-none focus:border-[var(--xr-accent)] transition"
                >
                  {SECTOR_COST_PROFILES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name[currentLang] ?? p.name.fr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Average Ticket Slider */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[11px]">
                    {t.ticketLabel[currentLang] ?? t.ticketLabel.fr}
                  </span>
                  <span className="font-mono text-sm font-bold text-[var(--xr-ink)] bg-[var(--xr-surface-strong)] px-3 py-1 rounded-xl border xr-line">
                    {ticket.toLocaleString()} €
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={sector === "realestate" ? 10000 : 800}
                  step={sector === "realestate" ? 100 : 5}
                  value={ticket}
                  onChange={(e) => setTicket(Number(e.target.value))}
                  className="mt-3 w-full accent-[var(--xr-ink)] cursor-pointer"
                />
              </div>

              {/* Monthly lost clients Slider */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[11px]">
                    {t.clientsLabel[currentLang] ?? t.clientsLabel.fr}
                  </span>
                  <span className="font-mono text-sm font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-xl border border-rose-500/20">
                    {lostClients.toLocaleString()} / mois
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={sector === "realestate" ? 15 : 400}
                  step={1}
                  value={lostClients}
                  onChange={(e) => setLostClients(Number(e.target.value))}
                  className="mt-3 w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t xr-line">
              <p className="text-[9px] leading-5 xr-muted-2">
                {t.trustNotice[currentLang] ?? t.trustNotice.fr}
              </p>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Monthly loss card */}
              <div className="rounded-[2rem] border border-rose-500/20 bg-rose-500/[0.03] p-6 sm:p-7 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="label-mono text-[7px] tracking-[.2em] text-rose-400">
                    {t.monthlyCardTitle[currentLang] ?? t.monthlyCardTitle.fr}
                  </span>
                  <TrendingDown className="h-4 w-4 text-rose-400 shrink-0" />
                </div>
                <div className="my-5">
                  <p className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-rose-500">
                    -{monthlyLoss.toLocaleString("fr-FR")} €
                  </p>
                  <span className="label-mono text-[8px] xr-muted-2 mt-1 block">/ MOIS</span>
                </div>
                <p className="text-[10px] xr-muted leading-4">
                  Perte directe causée par des prospects locaux captés par vos 3 concurrents immédiats.
                </p>
              </div>

              {/* Opportunity vs Action */}
              <div className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/[0.03] p-6 sm:p-7 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="label-mono text-[7px] tracking-[.2em] text-emerald-400">
                    POTENTIEL RÉCUPÉRABLE
                  </span>
                  <TrendingUp className="h-4 w-4 text-emerald-400 shrink-0" />
                </div>
                <div className="my-5">
                  <p className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-emerald-400">
                    +{monthlyLoss.toLocaleString("fr-FR")} €
                  </p>
                  <span className="label-mono text-[8px] xr-muted-2 mt-1 block">/ MOIS AVEC XR</span>
                </div>
                <p className="text-[10px] xr-muted leading-4">
                  Avec une fiche Google Maps #1, un site premium à fort taux de conversion et du SEO ciblé.
                </p>
              </div>
            </div>

            {/* Huge Annual Loss Banner */}
            <div className="rounded-[2.2rem] border xr-line bg-gradient-to-br from-[var(--xr-surface)] via-[var(--xr-surface-strong)] to-[var(--xr-surface)] p-7 sm:p-10 shadow-[0_30px_90px_-35px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b xr-line pb-6">
                <div>
                  <span className="label-mono text-[7px] tracking-[.24em] text-rose-400 inline-flex items-center gap-1.5">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    {t.annualCardTitle[currentLang] ?? t.annualCardTitle.fr}
                  </span>
                  <h3 className="mt-2 display-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--xr-ink)]">
                    -{annualLoss.toLocaleString("fr-FR")} € / an
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection("#quote")}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--xr-ink)] px-6 py-4 text-xs font-semibold text-[var(--xr-bg)] shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shrink-0"
                >
                  <Sparkles className="h-4 w-4 xr-accent" />
                  <span>{t.ctaButton[currentLang] ?? t.ctaButton.fr}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs xr-muted">
                <p className="max-w-xl text-[11px] leading-5">
                  {t.annualCardSub[currentLang] ?? t.annualCardSub.fr}
                </p>
                <div className="flex items-center gap-2 shrink-0 label-mono text-[8px] text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Audit & Stratégie offerts
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
