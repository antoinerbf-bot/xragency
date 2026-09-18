import { useEffect, useRef } from "react";

/**
 * Interactive portfolio gecko.
 * Each eye looks at the cursor (QBENIX behaviour).
 * Head leans slightly toward the pointer.
 */
export function EyeTracker({ className = "" }: { className?: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const leftPupil = useRef<HTMLDivElement>(null);
  const rightPupil = useRef<HTMLDivElement>(null);
  const leftEye = useRef<HTMLDivElement>(null);
  const rightEye = useRef<HTMLDivElement>(null);

  const pointer = useRef({ x: 0, y: 0 });
  const head = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
    };

    const look = (eyeEl: HTMLDivElement | null, pupilEl: HTMLDivElement | null) => {
      if (!eyeEl || !pupilEl) return;
      const rect = eyeEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = pointer.current.x - cx;
      const dy = pointer.current.y - cy;
      const max = rect.width * 0.22;
      const dist = Math.hypot(dx, dy) || 1;
      const k = Math.min(max, dist * 0.12) / dist;
      pupilEl.style.transform = `translate(calc(-50% + ${dx * k}px), calc(-50% + ${dy * k}px))`;
    };

    const tick = () => {
      const el = stage.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.62;
        const cy = rect.top + rect.height * 0.38;
        head.current.tx = Math.max(-1, Math.min(1, (pointer.current.x - cx) / (window.innerWidth * 0.35)));
        head.current.ty = Math.max(-1, Math.min(1, (pointer.current.y - cy) / (window.innerHeight * 0.35)));
        head.current.x += (head.current.tx - head.current.x) * 0.08;
        head.current.y += (head.current.ty - head.current.y) * 0.08;
        if (body.current) {
          body.current.style.transform = `translate3d(${head.current.x * 12}px, ${head.current.y * 8}px, 0) rotateX(${head.current.y * -5}deg) rotateY(${head.current.x * 7}deg)`;
        }
      }

      look(leftEye.current, leftPupil.current);
      look(rightEye.current, rightPupil.current);
      raf.current = requestAnimationFrame(tick);
    };

    pointer.current.x = window.innerWidth * 0.5;
    pointer.current.y = window.innerHeight * 0.4;
    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={stage}
      className={`relative h-full w-full select-none ${className}`}
      aria-hidden
      style={{ perspective: "1200px" }}
    >
      <div
        ref={body}
        className="relative ml-auto h-full w-full max-w-[760px] will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src="/gecko-portfolio.jpg"
          alt=""
          className="gecko-hero h-full w-full object-contain object-bottom"
          draggable={false}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--background) 0%, transparent 24%), linear-gradient(180deg, var(--background) 0%, transparent 18%, transparent 82%, var(--background) 100%)",
          }}
        />

        {/* Eyes look at the cursor */}
        <GeckoEye
          eyeRef={leftEye}
          pupilRef={leftPupil}
          className="left-[51%] top-[24%] h-[11%] w-[11%] sm:left-[52%] sm:top-[23%]"
        />
        <GeckoEye
          eyeRef={rightEye}
          pupilRef={rightPupil}
          className="left-[63%] top-[22%] h-[11.5%] w-[11.5%] sm:left-[64%] sm:top-[21%]"
        />
      </div>

      <style>{`
        .gecko-hero {
          filter: drop-shadow(0 18px 40px color-mix(in oklab, var(--foreground) 16%, transparent));
        }
        html.dark .gecko-hero {
          filter: brightness(0.92) saturate(1.08) contrast(1.04) drop-shadow(0 18px 40px rgba(0,0,0,.45));
        }
      `}</style>
    </div>
  );
}

function GeckoEye({
  eyeRef,
  pupilRef,
  className,
}: {
  eyeRef: React.RefObject<HTMLDivElement | null>;
  pupilRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  return (
    <div ref={eyeRef} className={`absolute z-10 ${className}`}>
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 38% 32%, #f4efe4 0%, #e0c48a 28%, #c4842a 58%, #6b3a12 100%)",
          boxShadow:
            "inset 0 0 10px rgba(0,0,0,.45), 0 0 0 2px rgba(40,28,16,.35), 0 6px 14px rgba(0,0,0,.25)",
        }}
      >
        <div
          ref={pupilRef}
          className="absolute left-1/2 top-1/2 h-[46%] w-[46%] will-change-transform"
          style={{
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 50%, #050301 0%, #050301 62%, #3a220c 100%)",
            boxShadow: "inset 0 0 6px rgba(0,0,0,.8)",
          }}
        >
          <span className="absolute left-[22%] top-[18%] h-[34%] w-[34%] rounded-full bg-white/90" />
          <span className="absolute bottom-[16%] right-[18%] h-[12%] w-[12%] rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}
