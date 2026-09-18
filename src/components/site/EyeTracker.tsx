import { useEffect, useRef } from "react";

export function EyeTracker({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const face = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const point = (clientX: number, clientY: number) => {
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width * 0.55;
      const cy = r.top + r.height * 0.34;
      const nx = Math.max(window.innerWidth * 0.42, 180);
      const ny = Math.max(window.innerHeight * 0.42, 180);
      target.current.x = Math.max(-1, Math.min(1, (clientX - cx) / nx));
      target.current.y = Math.max(-1, Math.min(1, (clientY - cy) / ny));
    };

    const onPointer = (e: PointerEvent) => point(e.clientX, e.clientY);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.16;
      current.current.y += (target.current.y - current.current.y) * 0.16;
      if (face.current) {
        const x = current.current.x;
        const y = current.current.y;
        face.current.style.transform =
          `translate3d(${x * 22}px, ${y * 12}px, 0) rotateY(${x * 18}deg) rotateX(${-y * 11}deg)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={root}
      className={`relative h-full w-full select-none overflow-visible [perspective:1100px] ${className}`}
      aria-hidden
    >
      <div
        ref={face}
        className="absolute inset-0 origin-[55%_35%] will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src="/gecko-portfolio.jpg"
          alt=""
          draggable={false}
          className="h-full w-full object-contain object-bottom mix-blend-multiply contrast-[1.05] dark:mix-blend-screen dark:contrast-[1.08] dark:saturate-[1.05]"
        />
      </div>
    </div>
  );
}
