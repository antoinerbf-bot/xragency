import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

export function CinematicIntro() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const seen = window.sessionStorage.getItem("xr_intro_played");
    if (seen) return;

    setVisible(true);

    // Courte séquence sobre : début du fondu à 1.35s, libération complète à 1.85s
    const fadeTimer = window.setTimeout(() => {
      setFading(true);
    }, 1350);

    const endTimer = window.setTimeout(() => {
      setVisible(false);
      window.sessionStorage.setItem("xr_intro_played", "1");
    }, 1850);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(endTimer);
    };
  }, []);

  const skipIntro = () => {
    setFading(true);
    window.setTimeout(() => {
      setVisible(false);
      window.sessionStorage.setItem("xr_intro_played", "1");
    }, 220);
  };

  if (!visible) return null;

  const taglines = {
    fr: "STRATÉGIE · DESIGN · DÉVELOPPEMENT · CROISSANCE COMMERCIALE",
    en: "STRATEGY · DESIGN · DEVELOPMENT · COMMERCIAL GROWTH",
    vi: "CHIẾN LƯỢC · THIẾT KẾ · PHÁT TRIỂN · TĂNG TRƯỞNG THƯƠNG MẠI",
    ar: "استراتيجية · تصميم · تطوير · نمو تجاري",
    ru: "СТРАТЕГИЯ · ДИЗАЙН · РАЗРАБОТКА · КОММЕРЧЕСКИЙ РОСТ",
  };

  const skipCopy = {
    fr: "Passer l'introduction",
    en: "Skip intro",
    vi: "Bỏ qua",
    ar: "تخطي",
    ru: "Пропустить",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Introduction XR Agency"
      onClick={skipIntro}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B0B0C] text-[#F8F6F0] transition-all duration-500 select-none cursor-pointer ${
        fading ? "opacity-0 pointer-events-none scale-[1.02]" : "opacity-100 scale-100"
      }`}
    >
      {/* Halo ambiant Champagne & Bronze très subtil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[460px] w-[460px] rounded-full opacity-35 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(232,220,196,0.28) 0%, rgba(197,160,89,0.18) 42%, rgba(139,112,79,0.10) 70%, transparent 100%)",
        }}
      />

      {/* Trame éditoriale fine */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(248,246,240,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(248,246,240,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Monogramme XR & Révélation Typographique */}
      <div className="relative z-10 flex flex-col items-center px-6">
        <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex items-center justify-center rounded-3xl border border-[#E8DCC4]/20 bg-[#101114]/90 shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
          <svg
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 sm:h-20 sm:w-20"
          >
            <defs>
              <linearGradient id="xr-ivory-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDFBF7" />
                <stop offset="55%" stopColor="#E8DCC4" />
                <stop offset="100%" stopColor="#8B704F" />
              </linearGradient>
              <linearGradient id="xr-bronze-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B704F" />
                <stop offset="50%" stopColor="#C5A059" />
                <stop offset="100%" stopColor="#F8F6F0" />
              </linearGradient>
            </defs>

            <path
              d="M26 26 L54 26 L134 134 L106 134 Z"
              fill="url(#xr-ivory-grad)"
            />
            <path
              d="M134 26 L106 26 L26 134 L54 134 Z"
              fill="url(#xr-bronze-grad)"
              opacity="0.92"
            />
            <polygon points="80,67 93,80 80,93 67,80" fill="#FDFBF7" />
          </svg>
        </div>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-3.5">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#C5A059]/70" />
            <span className="font-mono text-[11px] sm:text-[13px] font-bold tracking-[0.42em] text-[#F8F6F0]">
              XR AGENCY
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#C5A059]/70" />
          </div>
          <p className="mt-2.5 font-mono text-[7.5px] sm:text-[8.5px] tracking-[0.26em] text-[#E8DCC4]/75">
            {taglines[lang as keyof typeof taglines] ?? taglines.fr}
          </p>
        </div>
      </div>

      {/* Bouton d'accessibilité pour passer immédiatement */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          skipIntro();
        }}
        className="absolute bottom-7 right-7 rounded-full border border-[#E8DCC4]/20 bg-[#101114]/80 px-4 py-2 font-mono text-[8.5px] uppercase tracking-[0.2em] text-[#E8DCC4]/80 hover:border-[#C5A059] hover:text-[#F8F6F0] transition-colors"
      >
        {skipCopy[lang as keyof typeof skipCopy] ?? skipCopy.fr} ✕
      </button>
    </div>
  );
}
