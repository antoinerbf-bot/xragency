import { useEffect, useRef } from "react";

/**
 * Interactive gecko mascot.
 * Head turns and both eyes look at the cursor — same behaviour as the reference video.
 * Colors follow light / dark theme via CSS variables.
 */
export function EyeTracker({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const head = useRef<SVGGElement>(null);
  const leftPupil = useRef<SVGCircleElement>(null);
  const rightPupil = useRef<SVGCircleElement>(null);
  const leftShine = useRef<SVGCircleElement>(null);
  const rightShine = useRef<SVGCircleElement>(null);

  const pointer = useRef({ x: 0, y: 0 });
  const pose = useRef({ hx: 0, hy: 0, tx: 0, ty: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onMove = (e: PointerEvent | MouseEvent) => {
      pointer.current.x = "clientX" in e ? e.clientX : 0;
      pointer.current.y = "clientY" in e ? e.clientY : 0;
    };

    const aimPupil = (
      pupil: SVGCircleElement | null,
      shine: SVGCircleElement | null,
      originX: number,
      originY: number,
      max = 7.2,
    ) => {
      if (!pupil || !root.current) return;
      const svg = root.current.querySelector("svg");
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const sx = rect.left + (originX / 800) * rect.width;
      const sy = rect.top + (originY / 800) * rect.height;
      const dx = pointer.current.x - sx;
      const dy = pointer.current.y - sy;
      const dist = Math.hypot(dx, dy) || 1;
      const k = Math.min(max, dist * 0.018) / dist;
      const ox = dx * k;
      const oy = dy * k;
      pupil.setAttribute("cx", String(originX + ox));
      pupil.setAttribute("cy", String(originY + oy));
      if (shine) {
        shine.setAttribute("cx", String(originX + ox - 3.2));
        shine.setAttribute("cy", String(originY + oy - 3.6));
      }
    };

    const tick = () => {
      const el = root.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.58;
        const cy = rect.top + rect.height * 0.36;
        pose.current.tx = Math.max(-1, Math.min(1, (pointer.current.x - cx) / Math.max(window.innerWidth * 0.33, 1)));
        pose.current.ty = Math.max(-1, Math.min(1, (pointer.current.y - cy) / Math.max(window.innerHeight * 0.33, 1)));
        pose.current.hx += (pose.current.tx - pose.current.hx) * 0.1;
        pose.current.hy += (pose.current.ty - pose.current.hy) * 0.1;

        if (head.current) {
          const x = pose.current.hx;
          const y = pose.current.hy;
          head.current.setAttribute(
            "transform",
            `translate(${x * 10}, ${y * 7}) rotate(${x * 6} 430 250)`,
          );
        }
      }

      aimPupil(leftPupil.current, leftShine.current, 392, 248);
      aimPupil(rightPupil.current, rightShine.current, 468, 242);
      raf.current = requestAnimationFrame(tick);
    };

    pointer.current.x = window.innerWidth * 0.55;
    pointer.current.y = window.innerHeight * 0.4;
    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={root} className={`relative h-full w-full select-none ${className}`} aria-hidden>
      <svg
        viewBox="0 0 800 800"
        className="h-full w-full"
        role="img"
      >
        <defs>
          <linearGradient id="g-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--gecko-hi, #7fe0d2)" />
            <stop offset="45%" stopColor="var(--gecko-mid, #3cb8a8)" />
            <stop offset="100%" stopColor="var(--gecko-lo, #1a7a70)" />
          </linearGradient>
          <linearGradient id="g-belly" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gecko-belly, #f3e6d4)" />
            <stop offset="100%" stopColor="var(--gecko-belly-2, #e2c8ae)" />
          </linearGradient>
          <linearGradient id="g-leaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b7e08a" />
            <stop offset="100%" stopColor="#5fa24a" />
          </linearGradient>
          <radialGradient id="g-eye" cx="38%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#f7e7c3" />
            <stop offset="35%" stopColor="#e0a84a" />
            <stop offset="70%" stopColor="#b56a1c" />
            <stop offset="100%" stopColor="#5a3010" />
          </radialGradient>
          <filter id="g-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="currentColor" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Leaf */}
        <g filter="url(#g-soft)">
          <path
            d="M170 560 C260 430, 520 410, 690 520 C610 690, 330 740, 170 560Z"
            fill="url(#g-leaf)"
          />
          <path
            d="M190 562 C300 470, 500 455, 660 530"
            fill="none"
            stroke="#3d7a32"
            strokeWidth="4"
            opacity="0.35"
          />
        </g>

        {/* Body */}
        <g filter="url(#g-soft)">
          <ellipse cx="430" cy="470" rx="118" ry="150" fill="url(#g-body)" />
          <ellipse cx="428" cy="490" rx="70" ry="110" fill="url(#g-belly)" />
          {/* spots */}
          <circle cx="370" cy="430" r="9" fill="#1c5f58" opacity="0.35" />
          <circle cx="490" cy="450" r="11" fill="#1c5f58" opacity="0.32" />
          <circle cx="400" cy="520" r="8" fill="#1c5f58" opacity="0.28" />
          <circle cx="470" cy="540" r="10" fill="#1c5f58" opacity="0.3" />
          {/* arms */}
          <ellipse cx="330" cy="560" rx="38" ry="18" fill="url(#g-body)" />
          <ellipse cx="530" cy="562" rx="38" ry="18" fill="url(#g-body)" />
          <ellipse cx="318" cy="572" rx="16" ry="10" fill="url(#g-belly)" />
          <ellipse cx="544" cy="574" rx="16" ry="10" fill="url(#g-belly)" />
          {/* tail */}
          <path d="M520 560 C620 590, 680 640, 700 710 C640 680, 560 640, 500 600Z" fill="url(#g-body)" />
        </g>

        {/* Head + eyes — this group turns toward the cursor */}
        <g ref={head}>
          <ellipse cx="430" cy="268" rx="108" ry="96" fill="url(#g-body)" />
          <ellipse cx="428" cy="292" rx="62" ry="52" fill="url(#g-belly)" />
          <circle cx="368" cy="250" r="8" fill="#1c5f58" opacity="0.28" />
          <circle cx="490" cy="258" r="7" fill="#1c5f58" opacity="0.28" />

          {/* snout */}
          <ellipse cx="430" cy="318" rx="36" ry="20" fill="url(#g-belly)" />
          <circle cx="416" cy="316" r="3.2" fill="#2a1a12" />
          <circle cx="444" cy="316" r="3.2" fill="#2a1a12" />
          <path d="M418 332 Q430 340 442 332" fill="none" stroke="#8a5a40" strokeWidth="2.4" strokeLinecap="round" />

          {/* left eye */}
          <circle cx="392" cy="248" r="28" fill="url(#g-eye)" />
          <circle ref={leftPupil} cx="392" cy="248" r="12.5" fill="#0b0704" />
          <circle ref={leftShine} cx="388.8" cy="244.4" r="4.2" fill="white" />

          {/* right eye */}
          <circle cx="468" cy="242" r="29" fill="url(#g-eye)" />
          <circle ref={rightPupil} cx="468" cy="242" r="13" fill="#0b0704" />
          <circle ref={rightShine} cx="464.8" cy="238.4" r="4.4" fill="white" />
        </g>
      </svg>

      <style>{`
        :root {
          --gecko-hi: #8eebdc;
          --gecko-mid: #3cb8a8;
          --gecko-lo: #1a7a70;
          --gecko-belly: #f4e7d6;
          --gecko-belly-2: #e2c8ae;
        }
        html.dark {
          --gecko-hi: #5fd4c4;
          --gecko-mid: #2a9e90;
          --gecko-lo: #0e4f48;
          --gecko-belly: #d9c4ae;
          --gecko-belly-2: #b89478;
        }
      `}</style>
    </div>
  );
}
