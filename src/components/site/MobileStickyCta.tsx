import { useEffect, useState } from "react";
import { MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { CONTACT } from "@/lib/content";

export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);
  const [inQuote, setInQuote] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show after scrolling past hero (~420px)
      const shouldShow = scrollY > 420;

      // Check if currently viewing the #quote section
      const quoteEl = document.getElementById("quote");
      if (quoteEl) {
        const rect = quoteEl.getBoundingClientRect();
        // If quote is prominently in view, dim/hide the sticky bar so it doesn't obstruct form inputs
        const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 150;
        setInQuote(inView);
      }

      setVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible || inQuote) return null;

  return (
    <aside
      aria-label="Action rapide devis"
      className="fixed inset-x-3 bottom-3 z-40 sm:hidden animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center justify-between gap-2.5 rounded-full border border-[#D8B788]/40 bg-[#12100D]/95 px-3.5 py-2.5 text-white shadow-[0_12px_36px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="flex items-center gap-2 min-w-0">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#E5C696]/20 border border-[#E5C696]/30 text-[#E5C696]">
            <ShieldCheck className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#E5C696] truncate">
              Devis en 2 min · Sans engagement
            </span>
            <span className="block text-[10px] text-white/70 truncate">
              Garanti ou remboursé · 0 € au départ
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp direct"
            className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/10 text-emerald-400 hover:bg-white/20 transition active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
          </a>

          <a
            href="/#quote"
            onClick={(e) => {
              const el = document.getElementById("quote");
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-flex h-8 items-center gap-1 rounded-full bg-[#E5C696] px-3 text-[11px] font-bold text-[#14110E] shadow-sm transition hover:bg-[#F2D7B0] active:scale-95"
          >
            <span>Démarrer</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </aside>
  );
}
