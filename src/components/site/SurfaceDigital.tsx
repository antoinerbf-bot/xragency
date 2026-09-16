import { useEffect, useRef } from "react";

/**
 * Surface digitale — premium abstract background
 * Symbolizes: networks, structure, visibility, digital presence
 * (no AI imagery — pure digital agency atmosphere)
 */
export function SurfaceDigital({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const NODE_COUNT = 28;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (nodes.length === 0) {
        for (let i = 0; i < NODE_COUNT; i++) {
          nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            r: 1.2 + Math.random() * 2.2,
          });
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = (e.clientY - rect.top) / rect.height;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Deep base
      const g = ctx.createRadialGradient(
        w * (0.35 + mouse.current.x * 0.15),
        h * (0.4 + mouse.current.y * 0.1),
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.85
      );
      g.addColorStop(0, "rgba(20, 40, 55, 0.35)");
      g.addColorStop(0.45, "rgba(8, 14, 22, 0.15)");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Soft architectural planes
      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = "#7dd3c0";
      ctx.lineWidth = 1;
      const tilt = (mouse.current.x - 0.5) * 12;
      for (let i = 0; i < 6; i++) {
        const y = h * (0.15 + i * 0.14) + Math.sin(t * 0.00015 + i) * 8;
        ctx.beginPath();
        ctx.moveTo(0, y + tilt * (i * 0.3));
        ctx.lineTo(w, y - tilt * (i * 0.25));
        ctx.stroke();
      }
      ctx.restore();

      // Network connections + nodes
      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }

      // Links
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.18;
            ctx.strokeStyle = `rgba(125, 211, 192, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        glow.addColorStop(0, "rgba(125, 211, 192, 0.35)");
        glow.addColorStop(1, "rgba(125, 211, 192, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(180, 230, 220, 0.7)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle vertical light beam (visibility / focus)
      const beamX = w * (0.62 + (mouse.current.x - 0.5) * 0.08);
      const beam = ctx.createLinearGradient(beamX, 0, beamX, h);
      beam.addColorStop(0, "rgba(125, 211, 192, 0)");
      beam.addColorStop(0.4, "rgba(125, 211, 192, 0.04)");
      beam.addColorStop(1, "rgba(125, 211, 192, 0)");
      ctx.fillStyle = beam;
      ctx.fillRect(beamX - 40, 0, 80, h);

      raf.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
