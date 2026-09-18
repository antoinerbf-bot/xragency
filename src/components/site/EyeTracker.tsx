import { useEffect, useRef, type RefObject } from "react";

/**
 * Premium photorealistic gecko portfolio signature (QBENIX quality).
 * - Eyes follow the cursor with smooth spring physics
 * - Subtle 3D body lean
 * - Theme-aware (light / dark) background + color grading
 * - Disabled on touch devices and reduced-motion
 */
export function EyeTracker({ className = "" }: { className?: string }) {
  const leftPupil = useRef<HTMLDivElement>(null);
  const rightPupil = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const bodyTarget = useRef({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const bodyCurrent = useRef({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || isTouch) return;

    const onMove = (e: MouseEvent) => {
      const el = container.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Center of the head / eyes area
      const cx = rect.left + rect.width * 0.52;
      const cy = rect.top + rect.height * 0.36;
      const dx = (e.clientX - cx) / Math.max(window.innerWidth * 0.32, 1);
      const dy = (e.clientY - cy) / Math.max(window.innerHeight * 0.32, 1);
      target.current.x = Math.max(-1, Math.min(1, dx));
      target.current.y = Math.max(-1, Math.min(1, dy));

      bodyTarget.current.rx = target.current.y * -5.5;
      bodyTarget.current.ry = target.current.x * 6.5;
      bodyTarget.current.tx = target.current.x * 10;
      bodyTarget.current.ty = target.current.y * 6;
    };

    const tick = () => {
      // Smooth spring for eyes (responsive but not jittery)
      const eyeSpring = 0.12;
      const bodySpring = 0.06;

      current.current.x += (target.current.x - current.current.x) * eyeSpring;
      current.current.y += (target.current.y - current.current.y) * eyeSpring;

      // Pupil travel range — matches real gecko eye movement
      const ox = current.current.x * 13;
      const oy = current.current.y * 9;

      for (const el of [leftPupil.current, rightPupil.current]) {
        if (el) {
          el.style.transform = `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px))`;
        }
      }

      bodyCurrent.current.rx += (bodyTarget.current.rx - bodyCurrent.current.rx) * bodySpring;
      bodyCurrent.current.ry += (bodyTarget.current.ry - bodyCurrent.current.ry) * bodySpring;
      bodyCurrent.current.tx += (bodyTarget.current.tx - bodyCurrent.current.tx) * bodySpring;
      bodyCurrent.current.ty += (bodyTarget.current.ty - bodyCurrent.current.ty) * bodySpring;

      if (bodyRef.current) {
        const { rx, ry, tx, ty } = bodyCurrent.current;
        bodyRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
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
      className={`relative select-none ${className}`}
      aria-hidden
    >
      {/* Soft ambient glow — adapts to theme via CSS variables */}
      <div
        className="pointer-events-none absolute -inset-12 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 22%, transparent) 0%, transparent 70%)",
        }}
      />

      <div
        ref={bodyRef}
        className="relative mx-auto aspect-square w-full max-w-[440px] overflow-hidden rounded-[2.25rem] will-change-transform sm:max-w-[500px] lg:max-w-[560px]"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
          background: "color-mix(in oklab, var(--muted) 40%, var(--background))",
          boxShadow:
            "0 25px 60px -20px color-mix(in oklab, var(--foreground) 18%, transparent), 0 0 0 1px color-mix(in oklab, var(--border) 60%, transparent)",
        }}
      >
        {/* Background plate — light/dark adaptive */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 75% at 55% 45%, color-mix(in oklab, var(--muted) 55%, var(--background)) 0%, var(--background) 100%)",
          }}
        />

        <img
          src="/gecko-portfolio.jpg"
          alt=""
          className="relative z-[1] h-full w-full object-cover object-[center_28%]"
          style={{
            // Soft color grade that works in both themes
            filter:
              "contrast(1.04) saturate(1.08) brightness(var(--gecko-brightness, 1))",
          }}
          draggable={false}
        />

        {/* Theme-aware vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 55% 40%, transparent 0%, color-mix(in oklab, var(--background) 35%, transparent) 75%, color-mix(in oklab, var(--background) 70%, transparent) 100%)",
          }}
        />

        {/* Left eye */}
        <EyeOverlay
          pupilRef={leftPupil}
          className="left-[27.5%] top-[33.5%] z-[3] h-[13.5%] w-[13.5%] sm:left-[28.5%] sm:top-[32.5%]"
        />
        {/* Right eye */}
        <EyeOverlay
          pupilRef={rightPupil}
          className="left-[51.5%] top-[32.5%] z-[3] h-[13.5%] w-[13.5%] sm:left-[52.5%] sm:top-[31.5%]"
        />
      </div>
    </div>
  );
}

function EyeOverlay({
  pupilRef,
  className,
}: {
  pupilRef: RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  return (
    <div className={`absolute ${className}`}>
      {/* Soft eyelid / socket shadow */}
      <div className="absolute inset-0 rounded-full bg-black/40 mix-blend-multiply" />

      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          boxShadow:
            "inset 0 0 14px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.14)",
          background:
            "radial-gradient(circle at 38% 32%, #f0f4f2 0%, #c5cdc9 50%, #7a8580 100%)",
        }}
      >
        {/* Iris + pupil — follows cursor */}
        <div
          ref={pupilRef}
          className="absolute left-1/2 top-1/2 h-[60%] w-[60%] will-change-transform"
          style={{
            borderRadius: "50%",
            background: `
              radial-gradient(circle at 50% 50%,
                #030605 0%,
                #030605 34%,
                #0c2522 38%,
                #156b5e 50%,
                #4db8a6 66%,
                #0c2522 100%)
            `,
            boxShadow:
              "0 0 0 1.5px rgba(0,0,0,0.45), inset 0 0 8px rgba(0,0,0,0.65)",
          }}
        >
          {/* Black pupil core */}
          <div className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
          {/* Primary specular highlight */}
          <div className="absolute left-[28%] top-[22%] h-[28%] w-[28%] rounded-full bg-white/95" />
          {/* Secondary smaller highlight */}
          <div className="absolute bottom-[16%] right-[18%] h-[11%] w-[11%] rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}
