import { useEffect, useRef, type RefObject } from "react";

/**
 * Photoreal gecko + gaze tracking.
 * Pupils follow the cursor; body leans slightly.
 */
export function EyeTracker({ className = "" }: { className?: string }) {
  const leftPupil = useRef<HTMLDivElement>(null);
  const rightPupil = useRef<HTMLDivElement>(null);
  const leftEye = useRef<HTMLDivElement>(null);
  const rightEye = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const lean = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
    };

    const look = (eye: HTMLDivElement | null, pupil: HTMLDivElement | null) => {
      if (!eye || !pupil) return;
      const r = eye.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = pointer.current.x - cx;
      const dy = pointer.current.y - cy;
      const max = r.width * 0.2;
      const dist = Math.hypot(dx, dy) || 1;
      const k = Math.min(max, dist * 0.14) / dist;
      pupil.style.transform = `translate(calc(-50% + ${dx * k}px), calc(-50% + ${dy * k}px))`;
    };

    const tick = () => {
      const el = container.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width * 0.55;
        const cy = r.top + r.height * 0.38;
        lean.current.tx = Math.max(-1, Math.min(1, (pointer.current.x - cx) / Math.max(window.innerWidth * 0.34, 1)));
        lean.current.ty = Math.max(-1, Math.min(1, (pointer.current.y - cy) / Math.max(window.innerHeight * 0.34, 1)));
        lean.current.x += (lean.current.tx - lean.current.x) * 0.08;
        lean.current.y += (lean.current.ty - lean.current.y) * 0.08;
        if (bodyRef.current) {
          bodyRef.current.style.transform = `translate3d(${lean.current.x * 10}px, ${lean.current.y * 6}px, 0) rotateX(${lean.current.y * -4}deg) rotateY(${lean.current.x * 6}deg)`;
        }
      }
      look(leftEye.current, leftPupil.current);
      look(rightEye.current, rightPupil.current);
      raf.current = requestAnimationFrame(tick);
    };

    pointer.current.x = window.innerWidth * 0.55;
    pointer.current.y = window.innerHeight * 0.4;
    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={container} className={`relative select-none ${className}`} aria-hidden style={{ perspective: "1000px" }}>
      <div
        ref={bodyRef}
        className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-[2rem] will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src="/gecko-portfolio.jpg"
          alt=""
          className="relative z-[1] h-full w-full object-cover object-[center_28%]"
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 55% 40%, transparent 0%, color-mix(in oklab, var(--background) 55%, transparent) 100%)",
          }}
        />
        <Eye
          eyeRef={leftEye}
          pupilRef={leftPupil}
          className="left-[28%] top-[33%] z-[3] h-[13%] w-[13%]"
        />
        <Eye
          eyeRef={rightEye}
          pupilRef={rightPupil}
          className="left-[52%] top-[32%] z-[3] h-[13%] w-[13%]"
        />
      </div>
    </div>
  );
}

function Eye({
  eyeRef,
  pupilRef,
  className,
}: {
  eyeRef: RefObject<HTMLDivElement | null>;
  pupilRef: RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  return (
    <div ref={eyeRef} className={`absolute ${className}`}>
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background: "radial-gradient(circle at 38% 32%, #f3ead8 0%, #d7a24a 42%, #8a4a14 100%)",
          boxShadow: "inset 0 0 10px rgba(0,0,0,.45), 0 0 0 2px rgba(30,20,10,.35)",
        }}
      >
        <div
          ref={pupilRef}
          className="absolute left-1/2 top-1/2 h-[48%] w-[48%] will-change-transform rounded-full bg-black"
        >
          <span className="absolute left-[24%] top-[20%] h-[30%] w-[30%] rounded-full bg-white/90" />
        </div>
      </div>
    </div>
  );
}
