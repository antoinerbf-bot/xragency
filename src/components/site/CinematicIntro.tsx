import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

export function CinematicIntro() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Check if motion is reduced
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Check if intro has already been displayed in this browser session
    const seen = window.sessionStorage.getItem("xr_intro_played");
    if (seen) return;

    setVisible(true);

    // Sequence timing: start fade out at 1.9s, remove at 2.5s
    const fadeTimer = window.setTimeout(() => {
      setFading(true);
    }, 1900);

    const endTimer = window.setTimeout(() => {
      setVisible(false);
      window.sessionStorage.setItem("xr_intro_played", "1");
    }, 2500);

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
    }, 300);
  };

  if (!visible) return null;

  const taglines = {
    fr: "HAUTE CRÉATION DIGITALE & IA",
    en: "HAUTE DIGITAL CREATION & AI",
    vi: "SÁNG TẠO KỸ THUẬT SỐ ĐỈNH CAO & AI",
    ar: "إبداع رقمي رفيع وذكاء اصطناعي",
    ru: "ЦИФРОВОЕ ИСКУССТВО И ИИ",
  };

  const skipCopy = {
    fr: "Passer l'intro",
    en: "Skip intro",
    vi: "Bỏ qua",
    ar: "تخطي",
    ru: "Пропустить",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="XR Agency Cinematic Intro"
      onClick={skipIntro}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050507] text-white transition-all duration-700 select-none cursor-pointer ${
        fading ? "opacity-0 pointer-events-none scale-105 filter blur-sm" : "opacity-100 scale-100"
      }`}
    >
      {/* Background ambient radial lights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full opacity-40 blur-[120px] transition-transform duration-1000 animate-xr-aura"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(56,189,248,0.2) 40%, rgba(212,175,55,0.15) 70%, transparent 90%)",
        }}
      />

      {/* Grid overlay for tech precision feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Center Cinematic "X" Structure */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Sculpted Luxury "X" Vector */}
        <div className="relative h-28 w-28 sm:h-36 sm:w-36 flex items-center justify-center">
          <svg
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full drop-shadow-[0_0_35px_rgba(255,255,255,0.35)]"
          >
            <defs>
              <linearGradient id="xr-silver-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#e2e8f0" />
                <stop offset="70%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <linearGradient id="xr-gold-accent" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
              <filter id="xr-glow">
                <feGaussianBlur stdDeviation="3" result="glow" />
                <feComposite in="SourceGraphic" in2="glow" operator="over" />
              </filter>
            </defs>

            {/* Diagonal Blade 1: Top-Left to Bottom-Right */}
            <path
              d="M24 24 L52 24 L136 136 L108 136 Z"
              fill="url(#xr-silver-1)"
              className="transition-all duration-700"
            />
            {/* Diagonal Blade 2: Top-Right to Bottom-Left with bevel cutout */}
            <path
              d="M136 24 L108 24 L24 136 L52 136 Z"
              fill="url(#xr-gold-accent)"
              opacity="0.92"
            />
            {/* Center overlap diamond highlight */}
            <polygon
              points="80,66 94,80 80,94 66,80"
              fill="#ffffff"
              filter="url(#xr-glow)"
              className="animate-pulse"
            />
            {/* Fine outer precision hairline */}
            <path
              d="M22 22 L54 22 L138 138 L106 138 Z"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.8"
            />
            <path
              d="M138 22 L106 22 L22 138 L54 138 Z"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.8"
            />
          </svg>

          {/* Sweeping light beam reflection */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
          >
            <div className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 animate-xr-beam" />
          </div>
        </div>

        {/* Agency Typography Reveal */}
        <div className="mt-7 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-white/60" />
            <h1 className="font-mono text-[10px] sm:text-[12px] font-bold tracking-[0.42em] text-white">
              XR AGENCY
            </h1>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-white/60" />
          </div>
          <p className="mt-2 font-mono text-[7px] sm:text-[8px] tracking-[0.3em] text-white/60">
            PARIS · {taglines[lang as keyof typeof taglines] ?? taglines.fr}
          </p>
        </div>
      </div>

      {/* Subtle skip indicator in bottom corner */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          skipIntro();
        }}
        className="absolute bottom-6 right-6 font-mono text-[8px] tracking-[0.2em] text-white/40 hover:text-white transition-colors"
      >
        {skipCopy[lang as keyof typeof skipCopy] ?? skipCopy.fr} ✕
      </button>
    </div>
  );
}
