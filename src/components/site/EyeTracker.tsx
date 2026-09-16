import { useEffect, useRef } from "react";

/**
 * Signature interaction inspired by qbenix portfolio hero:
 * a character whose eyes follow the cursor.
 * Premium, playful, memorable.
 */
export function EyeTracker({ className = "" }: { className?: string }) {
  const leftPupil = useRef<HTMLDivElement>(null);
  const rightPupil = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      const el = container.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth * 0.5);
      const dy = (e.clientY - cy) / (window.innerHeight * 0.5);
      const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
      const ox = clamp(dx * 10, 9);
      const oy = clamp(dy * 8, 7);

      if (leftPupil.current) {
        leftPupil.current.style.transform = `translate(${ox}px, ${oy}px)`;
      }
      if (rightPupil.current) {
        rightPupil.current.style.transform = `translate(${ox}px, ${oy}px)`;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={container}
      className={`relative select-none ${className}`}
      aria-hidden
    >
      {/* Soft face plate */}
      <div className="relative mx-auto h-[220px] w-[220px] sm:h-[280px] sm:w-[280px] lg:h-[340px] lg:w-[340px]">
        <div className="absolute inset-0 rounded-[40%] bg-gradient-to-br from-zinc-300/20 via-zinc-500/10 to-zinc-800/30 blur-[1px]" />
        <div className="absolute inset-[8%] rounded-[38%] border border-white/10 bg-gradient-to-b from-zinc-200/15 to-zinc-900/40 backdrop-blur-sm" />

        {/* Eyes */}
        <div className="absolute left-[22%] top-[38%] flex gap-[18%] sm:gap-[20%]">
          {/* Left eye */}
          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/20 bg-white/90 shadow-inner sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]">
            <div
              ref={leftPupil}
              className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 transition-transform duration-75 ease-out sm:h-7 sm:w-7"
            >
              <div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-white/80" />
            </div>
          </div>
          {/* Right eye */}
          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/20 bg-white/90 shadow-inner sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]">
            <div
              ref={rightPupil}
              className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 transition-transform duration-75 ease-out sm:h-7 sm:w-7"
            >
              <div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-white/80" />
            </div>
          </div>
        </div>

        {/* Subtle smile line */}
        <div className="absolute bottom-[28%] left-1/2 h-[2px] w-[28%] -translate-x-1/2 rounded-full bg-white/20" />
      </div>
    </div>
  );
}
