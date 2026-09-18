import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

export function EyeTracker({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const face = useRef<HTMLDivElement>(null);
  const tongue = useRef<HTMLDivElement>(null);
  const target = useRef<Point>({ x: 0, y: 0 });
  const current = useRef<Point>({ x: 0, y: 0 });
  const cursor = useRef<Point>({ x: 0, y: 0 });
  const lastMove = useRef(0);
  const erraticSince = useRef<number | null>(null);
  const lastStrike = useRef(0);
  const raf = useRef(0);
  const [tongueVisible, setTongueVisible] = useState(false);
  const [leaping, setLeaping] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const point = (clientX: number, clientY: number) => {
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mouthX = r.left + r.width * 0.56;
      const mouthY = r.top + r.height * 0.39;
      const nx = Math.max(window.innerWidth * 0.42, 180);
      const ny = Math.max(window.innerHeight * 0.42, 180);
      const x = Math.max(-1, Math.min(1, (clientX - mouthX) / nx));
      const y = Math.max(-1, Math.min(1, (clientY - mouthY) / ny));
      const previous = cursor.current;
      const speed = Math.hypot(clientX - previous.x, clientY - previous.y);

      target.current = { x, y };
      cursor.current = { x: clientX, y: clientY };
      lastMove.current = performance.now();

      if (speed > 38 && !erraticSince.current) erraticSince.current = performance.now();
      if (speed < 10) erraticSince.current = null;
    };

    const onPointer = (e: PointerEvent) => point(e.clientX, e.clientY);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });

    const tick = (now: number) => {
      const el = root.current;
      const f = face.current;
      if (el && f) {
        current.current.x += (target.current.x - current.current.x) * 0.075;
        current.current.y += (target.current.y - current.current.y) * 0.075;

        const x = current.current.x;
        const y = current.current.y;
        const idle = now - lastMove.current > 900;
        const idleSaccade = idle ? Math.sin(now * 0.0027) * 0.11 : 0;
        const idleY = idle ? Math.cos(now * 0.0019) * 0.055 : 0;

        f.style.transform =
          `translate3d(${x * 22}px, ${y * 12 + Math.sin(now * 0.002) * 2}px, 0) rotateY(${x * 18 + idleSaccade * 18}deg) rotateX(${-y * 11 + idleY * 10}deg) scale(${1 + Math.sin(now * 0.0018) * 0.008})`;

        const bodyX = (x + 1) * 50;
        const bodyY = (y + 1) * 50;
        el.style.setProperty("--cursor-x", `${bodyX}%`);
        el.style.setProperty("--cursor-y", `${bodyY}%`);
        el.style.setProperty("--chameleon-pulse", `${0.72 + Math.sin(now * 0.00135) * 0.14}`);

        const r = el.getBoundingClientRect();
        const mouth = { x: r.left + r.width * 0.56, y: r.top + r.height * 0.39 };
        const distance = Math.hypot(cursor.current.x - mouth.x, cursor.current.y - mouth.y);

        if (!reduced && distance < 200 && now - lastStrike.current > 2600) {
          lastStrike.current = now;
          setTongueVisible(true);
          window.setTimeout(() => setTongueVisible(false), 430);
        }

        if (!reduced && ((distance < 80) || (erraticSince.current && now - erraticSince.current > 1500))) {
          if (!leaping) {
            setLeaping(true);
            window.setTimeout(() => setLeaping(false), 900);
          }
          erraticSince.current = null;
        }

        if (tongue.current && tongueVisible) {
          const dx = cursor.current.x - mouth.x;
          const dy = cursor.current.y - mouth.y;
          const length = Math.min(Math.hypot(dx, dy), 230);
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;
          tongue.current.style.width = `${Math.max(28, length)}px`;
          tongue.current.style.transform = `translate3d(0,0,0) rotate(${angle}deg)`;
        }

        if (Math.floor(now / 120) % 2 === 0) setPulse(Math.sin(now * 0.002));
      }
      raf.current = requestAnimationFrame(tick);
    };

    lastMove.current = performance.now();
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      cancelAnimationFrame(raf.current);
    };
  }, [leaping, tongueVisible]);

  return (
    <div
      ref={root}
      className={`relative h-full w-full select-none overflow-visible [perspective:1100px] ${className}`}
      aria-hidden
      style={{
        ["--pulse" as string]: String(0.7 + pulse * 0.08),
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-full opacity-70 mix-blend-screen transition-opacity duration-700"
        style={{
          background: "radial-gradient(circle at var(--cursor-x,55%) var(--cursor-y,40%), rgba(71,255,220,.38), rgba(58,180,255,.16) 18%, transparent 48%)",
          filter: "blur(24px)",
        }}
      />

      <div
        ref={face}
        className={`absolute inset-0 origin-[55%_35%] will-change-transform transition-[filter] duration-700 ${leaping ? "animate-[chameleon-leap_.9s_cubic-bezier(.2,.9,.25,1)]" : ""}`}
        style={{
          transformStyle: "preserve-3d",
          filter: "saturate(calc(1.05 + var(--pulse))) hue-rotate(calc(var(--cursor-x, 50%) / 14))",
        }}
      >
        <img
          src="/gecko-portfolio.jpg"
          alt=""
          draggable={false}
          className="h-full w-full object-contain object-bottom mix-blend-multiply contrast-[1.08] dark:mix-blend-screen dark:contrast-[1.1] dark:saturate-[1.15]"
        />
      </div>

      <div
        ref={tongue}
        className={`pointer-events-none absolute left-[56%] top-[39%] h-[5px] origin-left rounded-full bg-gradient-to-r from-rose-300 via-pink-500 to-transparent shadow-[0_0_12px_rgba(244,63,94,.75)] transition-opacity duration-75 ${tongueVisible ? "opacity-100" : "opacity-0"}`}
      >
        <span className="absolute -right-1 -top-[3px] h-3 w-3 rounded-full border border-rose-200 bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,.9)]" />
      </div>

      <div className="pointer-events-none absolute bottom-[7%] left-1/2 h-px w-[58%] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-300/35 to-transparent blur-[1px]" />
    </div>
  );
}
