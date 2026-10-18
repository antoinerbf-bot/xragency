import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, Sparkles, X } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { FUNNEL_UI } from "@/lib/funnel-i18n";
import { useFunnel } from "@/lib/funnel";

export function StickyFunnelCTA() {
  const { lang } = useLang();
  const currentLang = (lang in FUNNEL_UI.sticky.prefix ? lang : "fr") as Lang;
  const t = FUNNEL_UI.sticky;
  const { selectedServices, computedPricing, scrollToSection, buildWhatsAppUrl } = useFunnel();

  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear once past hero (e.g. 500px) and hide if at very bottom
      const scrolledPastHero = window.scrollY > 450;
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      setVisible(scrolledPastHero && !nearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible || minimized) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 z-40 sm:bottom-6 sm:right-6 sm:left-auto max-w-lg pointer-events-none">
      <div className="pointer-events-auto rounded-3xl border border-white/20 bg-[var(--xr-surface)]/90 p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-300">
        <div className="flex items-center justify-between gap-3 border-b xr-line pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-[var(--xr-accent)]/15 text-[var(--xr-accent)]">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="label-mono text-[7px] text-[var(--xr-muted)]">
              {t.prefix[currentLang] ?? t.prefix.fr} {selectedServices.length} {t.services[currentLang] ?? t.services.fr}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="label-mono text-[6px] text-[var(--xr-muted-2)] block leading-none">
                {t.from[currentLang] ?? t.from.fr}
              </span>
              <span className="font-mono text-sm font-bold text-[var(--xr-ink)]">
                {computedPricing.totalOnce.toLocaleString()} €
                {computedPricing.totalMonth > 0 && (
                  <span className="text-[10px] text-[var(--xr-muted)] font-normal">
                    {" "}+ {computedPricing.totalMonth} €/m
                  </span>
                )}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMinimized(true)}
              className="grid h-5 w-5 place-items-center rounded-full hover:bg-white/10 text-[var(--xr-muted-2)] hover:text-[var(--xr-ink)] transition"
              aria-label="Fermer la barre de devis"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => scrollToSection("#quote")}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--xr-ink)] px-4 py-2.5 text-[11px] font-semibold text-[var(--xr-bg)] shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{t.ctaFinalize[currentLang] ?? t.ctaFinalize.fr}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </button>

          <a
            href={buildWhatsAppUrl(currentLang)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-[11px] font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{t.ctaWhatsapp[currentLang] ?? t.ctaWhatsapp.fr}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
