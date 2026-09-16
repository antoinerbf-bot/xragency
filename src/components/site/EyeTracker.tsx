import { useEffect, useRef, type RefObject } from "react";

/**
 * Photorealistic gecko portfolio signature (qbenix-inspired).
 * Real photo base + tracking pupils + subtle body lean with spring inertia.
 * Gracefully disabled on touch / reduced-motion.
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
      const cx = rect.left + rect.width * 0.55;
      const cy = rect.top + rect.height * 0.38;
      const dx = (e.clientX - cx) / Math.max(window.innerWidth * 0.35, 1);
      const dy = (e.clientY - cy) / Math.max(window.innerHeight * 0.35, 1);
      target.current.x = Math.max(-1, Math.min(1, dx));
      target.current.y = Math.max(-1, Math.min(1, dy));

      bodyTarget.current.rx = target.current.y * -4;
      bodyTarget.current.ry = target.current.x * 5;
      bodyTarget.current.tx = target.current.x * 8;
      bodyTarget.current.ty = target.current.y * 5;
    };

    const tick = () => {
      const eyeSpring = 0.09;
      const bodySpring = 0.055;
      current.current.x += (target.current.x - current.current.x) * eyeSpring;
      current.current.y += (target.current.y - current.current.y) * eyeSpring;
      const ox = current.current.x * 11;
      const oy = current.current.y * 8;

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
    <div ref={container} className={`relative select-none ${className}`} aria-hidden>
      <div
        ref={bodyRef}
        className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-[2rem] will-change-transform sm:max-w-[480px] lg:max-w-[520px]"
        style={{ transformStyle: "preserve-3d", perspective: "900px" }}
      >
        <div className="pointer-events-none absolute -inset-8 rounded-full bg-primary/15 blur-3xl" />

        <img
          src="/gecko-portfolio.jpg"
          alt=""
          className="relative z-[1] h-full w-full object-cover object-[center_30%] contrast-[1.05] saturate-[1.05]"
          draggable={false}
        />

        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 55% 40%, transparent 0%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        <EyeOverlay
          pupilRef={leftPupil}
          className="left-[28%] top-[34%] z-[3] h-[14%] w-[14%] sm:left-[29%] sm:top-[33%]"
        />
        <EyeOverlay
          pupilRef={rightPupil}
          className="left-[52%] top-[33%] z-[3] h-[14%] w-[14%] sm:left-[53%] sm:top-[32%]"
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
      <div className="absolute inset-0 rounded-full bg-black/50 mix-blend-multiply" />
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          boxShadow:
            "inset 0 0 12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.12)",
          background:
            "radial-gradient(circle at 40% 35%, #eef2f0 0%, #c8d0cc 55%, #8a9490 100%)",
        }}
      >
        <div
          ref={pupilRef}
          className="absolute left-1/2 top-1/2 h-[58%] w-[58%] will-change-transform"
          style={{
            borderRadius: "50%",
            background: `
              radial-gradient(circle at 50% 50%,
                #050807 0%,
                #050807 36%,
                #0f2e2a 40%,
                #1a5c52 52%,
                #5ec4b0 68%,
                #0f2e2a 100%)
            `,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.4), inset 0 0 6px rgba(0,0,0,0.6)",
          }}
        >
          <div className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
          <div className="absolute left-[30%] top-[24%] h-[26%] w-[26%] rounded-full bg-white/90" />
          <div className="absolute bottom-[18%] right-[20%] h-[10%] w-[10%] rounded-full bg-white/35" />
        </div>
      </div>
    </div>
  );
}
