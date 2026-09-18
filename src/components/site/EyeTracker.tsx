import { useEffect, useRef } from "react";

/**
 * QBENIX-style portfolio gecko.
 * Full-bleed on the right, soft theme-aware fade, whole body follows the cursor.
 */
export function EyeTracker({ className = "" }: { className?: string }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || isTouch) return;

    const onMove = (e: MouseEvent) => {
      const el = container.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.58;
      const cy = rect.top + rect.height * 0.42;
      const dx = (e.clientX - cx) / Math.max(window.innerWidth * 0.38, 1);
      const dy = (e.clientY - cy) / Math.max(window.innerHeight * 0.38, 1);
      target.current.x = Math.max(-1, Math.min(1, dx));
      target.current.y = Math.max(-1, Math.min(1, dy));
    };

    const tick = () => {
      const spring = 0.08;
      current.current.x += (target.current.x - current.current.x) * spring;
      current.current.y += (target.current.y - current.current.y) * spring;

      if (bodyRef.current) {
        const x = current.current.x;
        const y = current.current.y;
        bodyRef.current.style.transform = `
          translate3d(${x * 14}px, ${y * 10}px, 0)
          rotateX(${y * -6}deg)
          rotateY(${x * 8}deg)
        `;
      }

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={container}
      className={`relative h-full w-full select-none ${className}`}
      aria-hidden
      style={{ perspective: "1200px" }}
    >
      <div
        ref={bodyRef}
        className="relative h-full w-full will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src="/gecko-portfolio.jpg"
          alt=""
          className="gecko-hero h-full w-full object-contain object-right-bottom"
          draggable={false}
        />

        {/* Fade into page background — works in light and dark */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, var(--background) 0%, transparent 28%),
              linear-gradient(180deg, var(--background) 0%, transparent 22%, transparent 78%, var(--background) 100%)
            `,
          }}
        />
      </div>

      <style>{`
        .gecko-hero {
          filter: drop-shadow(0 18px 40px color-mix(in oklab, var(--foreground) 16%, transparent));
        }
        html.dark .gecko-hero {
          filter:
            brightness(0.92) saturate(1.08) contrast(1.04)
            drop-shadow(0 18px 40px rgba(0,0,0,0.45));
        }
      `}</style>
    </div>
  );
}
