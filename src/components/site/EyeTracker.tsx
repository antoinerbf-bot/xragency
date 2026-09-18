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
      const cx = r.left + r.width * 0.52;
      const cy = r.top + r.height * 0.36;
      const nx = window.innerWidth < 768 ? Math.max(r.width * 0.45, 1) : Math.max(window.innerWidth * 0.38, 1);
      const ny = window.innerWidth < 768 ? Math.max(r.height * 0.45, 1) : Math.max(window.innerHeight * 0.38, 1);
      target.current.x = Math.max(-1, Math.min(1, (clientX - cx) / nx));
      target.current.y = Math.max(-1, Math.min(1, (clientY - cy) / ny));
    };

    const onPointer = (e: PointerEvent) => point(e.clientX, e.clientY);

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.14;
      current.current.y += (target.current.y - current.current.y) * 0.14;
      const node = face.current;
      if (node) {
        const mobile = window.innerWidth < 768;
        const x = current.current.x;
        const y = current.current.y;
        const tx = mobile ? 8 : 18;
        const ty = mobile ? 5 : 10;
        const ry = mobile ? 8 : 16;
        const rx = mobile ? 5 : 10;
        node.style.transform =
          `translate3d(${x * tx}px, ${y * ty}px, 0) rotateY(${x * ry}deg) rotateX(${-y * rx}deg)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
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
      className={`relative h-full w-full select-none [perspective:900px] sm:[perspective:1200px] ${className}`}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-background/40" />
      <div
        ref={face}
        className="absolute inset-0 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src="/gecko-portfolio.jpg"
          alt=""
          draggable={false}
          className="h-full w-full object-contain object-bottom drop-shadow-[0_16px_28px_hsl(var(--foreground)/0.08)] dark:drop-shadow-[0_24px_50px_hsl(var(--foreground)/0.18)]"
        />
      </div>
    </div>
  );
}
