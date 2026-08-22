import { useState, useEffect } from "react";
import { MessageCircle, X, ArrowUpRight, Clock, ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";

export function WhatsAppWidget() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const titles = {
    fr: "Besoin d'un devis sous 24 h ?",
    en: "Need a quote within 24h?",
    vi: "Cần báo giá trong 24 giờ?",
  };

  const texts = {
    fr: "Échangez directement avec notre équipe senior sur WhatsApp. Audit et estimations sans engagement.",
    en: "Chat directly with our senior team on WhatsApp. No-obligation audit & estimates.",
    vi: "Trao đổi trực tiếp với đội ngũ chuyên gia trên WhatsApp. Báo giá & tư vấn miễn phí.",
  };

  const ctas = {
    fr: "Démarrer la conversation",
    en: "Start conversation",
    vi: "Bắt đầu cuộc trò chuyện",
  };

  const onlineText = {
    fr: "En ligne · Réponse sous 2 h",
    en: "Online · Reply in under 2h",
    vi: "Trực tuyến · Phản hồi dưới 2h",
  };

  const waPrefill = encodeURIComponent(
    `Bonjour XR Agency, je souhaite échanger sur un projet digital.`,
  );
  const waUrl = `${CONTACT.whatsapp}?text=${waPrefill}`;

  if (!scrolled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Card */}
      {open ? (
        <div className="mb-3 w-80 animate-in fade-in slide-in-from-bottom-3 duration-300 rounded-3xl border border-border bg-card p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="label-mono text-[11px] text-muted-foreground">{t(onlineText)}</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <h4 className="display-serif mt-4 text-lg text-foreground">{t(titles)}</h4>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t(texts)}</p>

          <div className="mt-5 space-y-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-emerald-500 hover:shadow-emerald-600/20"
            >
              <MessageCircle className="h-4 w-4" />
              {t(ctas)}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <div className="flex items-center justify-center gap-2 pt-1 text-[10px] text-muted-foreground">
              <ShieldCheck className="h-3 w-3 text-primary" />
              <span>Confidentialité & devis gratuit</span>
            </div>
          </div>
        </div>
      ) : null}

      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="group relative flex items-center gap-3 rounded-full border border-border/80 bg-card/90 px-4 py-3 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:scale-105"
        aria-label="Contacter sur WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
        </span>
        <span className="label-mono hidden text-xs font-medium text-foreground sm:inline-block">
          WhatsApp 24/7
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white">
          <MessageCircle className="h-4 w-4" />
        </div>
      </button>
    </div>
  );
}
