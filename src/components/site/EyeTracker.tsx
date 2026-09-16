import { useEffect, useRef, type RefObject } from "react";

/**
 * Portfolio signature — gecko-inspired character whose eyes track the cursor.
 * Polished to feel closer to the qbenix interaction: smooth lerp, depth, specular.
 */
export function EyeTracker({ className = "" }: { className?: string }) {
  const leftPupil = useRef<HTMLDivElement>(null);
  const rightPupil = useRef<HTMLDivElement>(null);
  const leftShine = useRef<HTMLDivElement>(null);
  const rightShine = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      const el = container.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.52;
      const cy = rect.top + rect.height * 0.42;
      const dx = (e.clientX - cx) / Math.max(window.innerWidth * 0.45, 1);
      const dy = (e.clientY - cy) / Math.max(window.innerHeight * 0.45, 1);
      target.current.x = Math.max(-1, Math.min(1, dx));
      target.current.y = Math.max(-1, Math.min(1, dy));
    };

    const tick = () => {
      // Smooth follow (lerp)
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;

      const ox = current.current.x * 11;
      const oy = current.current.y * 8;
      const sx = current.current.x * 3;
      const sy = current.current.y * 2;

      const apply = (pupil: HTMLDivElement | null, shine: HTMLDivElement | null) => {
        if (pupil) pupil.style.transform = `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px))`;
        if (shine) shine.style.transform = `translate(calc(-50% + ${sx}px), calc(-50% + ${sy}px))`;
      };
      apply(leftPupil.current, leftShine.current);
      apply(rightPupil.current, rightShine.current);

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
    <div ref={container} className={`relative select-none ${className}`} aria-hidden>
      <div className="relative mx-auto h-[240px] w-[240px] sm:h-[300px] sm:w-[300px] lg:h-[360px] lg:w-[360px]">
        {/* Ambient glow behind gecko */}
        <div className="absolute inset-[10%] rounded-full bg-primary/10 blur-3xl" />

        {/* Head base — scaled gecko silhouette */}
        <div className="absolute inset-0 overflow-hidden rounded-[42%_42%_48%_48%]">
          {/* Skin / scale gradient (teal-grey like premium 3D) */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 70% 60% at 50% 35%, rgba(180, 210, 205, 0.35) 0%, transparent 55%),
                radial-gradient(ellipse 90% 80% at 50% 55%, #3d5a5c 0%, #1a2a2c 45%, #0d1516 100%)
              `,
            }}
          />
          {/* Scale texture suggestion */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `repeating-radial-gradient(
                circle at 50% 40%,
                transparent 0,
                transparent 6px,
                rgba(125, 211, 192, 0.08) 6px,
                rgba(125, 211, 192, 0.08) 7px
              )`,
            }}
          />
          {/* Rim light */}
          <div className="absolute inset-0 rounded-[42%_42%_48%_48%] ring-1 ring-inset ring-white/10" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, transparent 40%, transparent 70%, rgba(0,0,0,0.35) 100%)",
            }}
          />
        </div>

        {/* Snout suggestion */}
        <div
          className="absolute bottom-[18%] left-1/2 h-[18%] w-[38%] -translate-x-1/2 rounded-[40%]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(90, 120, 118, 0.5) 0%, rgba(20, 30, 32, 0.8) 100%)",
            boxShadow: "inset 0 8px 20px rgba(0,0,0,0.35)",
          }}
        />

        {/* Eyes pair */}
        <div className="absolute left-[18%] top-[32%] flex w-[64%] justify-between sm:left-[17%] sm:top-[30%]">
          <Eye
            pupilRef={leftPupil}
            shineRef={leftShine}
          />
          <Eye
            pupilRef={rightPupil}
            shineRef={rightShine}
          />
        </div>

        {/* Subtle nostril dots */}
        <div className="absolute bottom-[26%] left-[42%] h-1.5 w-1.5 rounded-full bg-black/40" />
        <div className="absolute bottom-[26%] right-[42%] h-1.5 w-1.5 rounded-full bg-black/40" />
      </div>
    </div>
  );
}

function Eye({
  pupilRef,
  shineRef,
}: {
  pupilRef: RefObject<HTMLDivElement | null>;
  shineRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="relative h-[72px] w-[72px] sm:h-[88px] sm:w-[88px] lg:h-[100px] lg:w-[100px]">
      {/* Eyelid / socket shadow */}
      <div className="absolute -inset-1 rounded-full bg-black/25 blur-sm" />

      {/* Sclera */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, #f5f7f6 0%, #e8ecea 50%, #c5cdc9 100%)",
          boxShadow:
            "inset 0 2px 8px rgba(255,255,255,0.7), inset 0 -4px 12px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.25)",
        }}
      >
        {/* Iris ring */}
        <div
          ref={pupilRef}
          className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, #0a0f0e 0%, #0a0f0e 38%, #1a3d38 42%, #2d6b5f 55%, #7dd3c0 70%, #1a3d38 100%)
            `,
            boxShadow: "0 0 0 2px rgba(15, 30, 28, 0.4), inset 0 0 8px rgba(0,0,0,0.5)",
          }}
        >
          {/* Pupil core */}
          <div className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
          {/* Specular highlight */}
          <div
            ref={shineRef}
            className="absolute left-[28%] top-[22%] h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 will-change-transform"
            style={{ filter: "blur(0.5px)" }}
          />
          <div className="absolute bottom-[20%] right-[22%] h-[12%] w-[12%] rounded-full bg-white/40" />
        </div>
      </div>

      {/* Upper lid curve */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[22%] rounded-t-full"
        style={{
          background: "linear-gradient(180deg, rgba(15,25,26,0.55) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
