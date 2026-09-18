import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/**
 * Portfolio creature interaction.
 *
 * The previous implementation only translated a flat JPG. This component now
 * treats the creature like a responsive interactive specimen:
 * - cursor/touch tracking with inertial easing
 * - subtle parallax / body tilt
 * - adaptive hue/contrast response
 * - idle breathing + eye-like micro motion
 * - close-cursor "hunt" state around ~200px
 * - short pounce state below ~80px
 * - erratic cursor detection to trigger a second hunting response
 *
 * The visual source remains the existing photorealistic portfolio asset so we
 * do not replace the approved creature artwork with a generic illustration.
 */
export function EyeTracker({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const creature = useRef<HTMLDivElement>(null);
  const tongue = useRef<HTMLSpanElement>(null);
  const glow = useRef<HTMLSpanElement>(null);

  const target = useRef<Point>({ x: 0, y: 0 });
  const current = useRef<Point>({ x: 0, y: 0 });
  const pointer = useRef<Point>({ x: 0, y: 0 });
  const previousPointer = useRef<Point>({ x: 0, y: 0 });
  const lastMove = useRef(0);
  const erraticUntil = useRef(0);
  const raf = useRef(0);
  const startedAt = useRef(performance.now());

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updatePointer = (clientX: number, clientY: number) => {
      const el = root.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.56;
      const centerY = rect.top + rect.height * 0.42;

      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const now = performance.now();

      if (lastMove.current > 0) {
        const dt = Math.max(16, now - lastMove.current);
        const vx = (clientX - previousPointer.current.x) / dt;
        const vy = (clientY - previousPointer.current.y) / dt;
        const velocity = Math.hypot(vx, vy);

        if (velocity > 1.25) {
          erraticUntil.current = now + 1500;
        }
      }

      previousPointer.current = { x: clientX, y: clientY };
      lastMove.current = now;
      pointer.current = { x: clientX, y: clientY };

      target.current.x = clamp(dx / Math.max(window.innerWidth * 0.42, 180), -1, 1);
      target.current.y = clamp(dy / Math.max(window.innerHeight * 0.42, 180), -1, 1);
    };

    const onPointer = (event: PointerEvent) =>
      updatePointer(event.clientX, event.clientY);

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });

    const tick = (time: number) => {
      const el = root.current;
      const body = creature.current;

      if (el && body) {
        const x = current.current.x +=
          (target.current.x - current.current.x) * (reduced ? 0.28 : 0.095);
        const y = current.current.y +=
          (target.current.y - current.current.y) * (reduced ? 0.28 : 0.095);

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width * 0.56;
        const centerY = rect.top + rect.height * 0.42;
        const distance = Math.hypot(
          pointer.current.x - centerX,
          pointer.current.y - centerY,
        );
        const hunting = distance < 200 || time < erraticUntil.current;
        const pouncing = distance > 0 && distance < 80;
        const idle = time - lastMove.current > 1600;
        const breathe = Math.sin((time - startedAt.current) / 720) * 0.018;
        const idleSway = idle ? Math.sin(time / 1500) * 0.018 : 0;

        const travelX = pouncing ? x * 58 : x * (hunting ? 30 : 20);
        const travelY = pouncing ? y * 38 : y * (hunting ? 17 : 11);
        const scale = pouncing ? 1.045 : 1 + breathe + idleSway;
        const rotateY = x * (pouncing ? 26 : hunting ? 20 : 14);
        const rotateX = -y * (pouncing ? 17 : hunting ? 13 : 9);
        const hue = x * 9 + y * -4;

        body.style.transform =
          `translate3d(${travelX}px, ${travelY}px, 0) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`;
        body.style.filter =
          `saturate(${1.04 + Math.abs(x) * 0.2}) contrast(${1.04 + Math.abs(y) * 0.06}) hue-rotate(${hue}deg)`;

        body.style.setProperty("--creature-x", x.toFixed(3));
        body.style.setProperty("--creature-y", y.toFixed(3));
        body.style.setProperty("--hunt-opacity", hunting ? "1" : "0");
        body.style.setProperty("--pounce-opacity", pouncing ? "1" : "0");

        if (tongue.current) {
          const tongueLength = pouncing ? 115 : hunting ? 76 : 0;
          tongue.current.style.opacity = tongueLength ? "0.72" : "0";
          tongue.current.style.width = `${tongueLength}px`;
          tongue.current.style.transform =
            `translate3d(${x * 14}px, ${y * 8}px, 0) rotate(${x * 8}deg)`;
        }

        if (glow.current) {
          glow.current.style.opacity = hunting ? "0.7" : "0.2";
          glow.current.style.transform =
            `translate3d(${x * -18}px, ${y * -10}px, 0) scale(${pouncing ? 1.35 : 1})`;
        }
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
      className={`relative h-full w-full select-none overflow-visible [perspective:1200px] [--creature-x:0] [--creature-y:0] ${className}`}
      aria-hidden
    >
      <span
        ref={glow}
        className="pointer-events-none absolute left-[45%] top-[38%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl transition-opacity duration-300"
      />

      <div
        ref={creature}
        className="absolute inset-0 origin-[56%_42%] will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transition: "filter 160ms linear",
        }}
      >
        <img
          src="/gecko-portfolio.jpg"
          alt=""
          draggable={false}
          className="h-full w-full object-contain object-bottom mix-blend-multiply contrast-[1.05] dark:mix-blend-screen dark:contrast-[1.08] dark:saturate-[1.05]"
        />

        <span
          ref={tongue}
          className="pointer-events-none absolute left-[55%] top-[47%] h-[2px] origin-left rounded-full bg-gradient-to-r from-rose-300/80 to-transparent opacity-0 shadow-[0_0_10px_rgba(251,113,133,.5)]"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [opacity:var(--hunt-opacity)]"
      >
        <span className="absolute left-[54%] top-[40%] h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_hsl(var(--primary))]" />
      </div>
    </div>
  );
}
