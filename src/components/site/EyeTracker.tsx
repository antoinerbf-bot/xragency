import { useEffect, useRef } from "react";

/**
 * Interactive gecko like the reference video:
 * the whole character turns toward the cursor.
 * No fake eyes drawn on top of the photo.
 */
export function EyeTracker({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const face = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onMove = (e: PointerEvent) => {
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width * 0.52;
      const cy = r.top + r.height * 0.36;
      target.current.x = Math.max(-1, Math.min(1, (e.clientX - cx) / Math.max(window.innerWidth * 0.38, 1)));
      target.current.y = Math.max(-1, Math.min(1, (e.clientY - cy) / Math.max(window.innerHeight * 0.38, 1)));
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.14;
      current.current.y += (target.current.y - current.current.y) * 0.14;
      const node = face.current;
      if (node) {
        const x = current.current.x;
        const y = current.current.y;
        node.style.transform =
          `translate3d(${x * 18}px, ${y * 10}px, 0) rotateY(${x * 16}deg) rotateX(${-y * 10}deg)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={root}
      className={`relative h-full w-full select-none [perspective:1200px] ${className}`}
      aria-hidden
    >
      <div
        ref={face}
        className="absolute inset-0 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <picture>
          <source srcSet="/gecko-look-center.jpg" />
          <img
            src="/gecko-portfolio.jpg"
            alt=""
            draggable={false}
            className="h-full w-full object-contain object-bottom drop-shadow-[0_24px_40px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_24px_50px_rgba(0,0,0,0.45)]"
          />
        </picture>
      </div>
    </div>
  );
}
