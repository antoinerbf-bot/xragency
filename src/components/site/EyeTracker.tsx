import { useEffect, useRef, useState } from "react";

/**
 * Same gecko as the reference video.
 * The face looks at the cursor by cross-fading real frames.
 * No fake eyes on top of the photo.
 */
export function EyeTracker({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const [look, setLook] = useState({ up: 0, left: 0 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width * 0.55;
      const cy = r.top + r.height * 0.38;
      target.current.x = Math.max(
        -1,
        Math.min(1, (e.clientX - cx) / Math.max(window.innerWidth * 0.32, 1)),
      );
      target.current.y = Math.max(
        -1,
        Math.min(1, (e.clientY - cy) / Math.max(window.innerHeight * 0.32, 1)),
      );
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      setLook({
        up: Math.max(0, -current.current.y),
        left: Math.max(0, -current.current.x),
      });
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
    <div ref={root} className={`relative h-full w-full select-none ${className}`} aria-hidden>
      <div className="relative mx-auto h-full w-full max-w-[560px]">
        <img
          src="/gecko-look-center.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-contain object-bottom"
          draggable={false}
        />
        <img
          src="/gecko-look-up.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-contain object-bottom"
          style={{ opacity: look.up }}
          draggable={false}
        />
        <img
          src="/gecko-look-left.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-contain object-bottom"
          style={{ opacity: look.left * (1 - look.up * 0.35) }}
          draggable={false}
        />
      </div>
    </div>
  );
}
