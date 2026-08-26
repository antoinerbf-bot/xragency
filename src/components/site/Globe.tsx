import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────
   City coordinates mapped to a 2-D orthographic
   projection (simple equirectangular → x/y).
   ────────────────────────────────────────────── */
const CITIES: { lat: number; lng: number; label: string }[] = [
  { lat: 48.86, lng: 2.35, label: "Paris" },
  { lat: 40.71, lng: -74.01, label: "New York" },
  { lat: 35.68, lng: 139.65, label: "Tokyo" },
  { lat: 25.2, lng: 55.27, label: "Dubai" },
  { lat: 1.35, lng: 103.82, label: "Singapore" },
  { lat: 16.05, lng: 108.2, label: "Da Nang" },
  { lat: 51.51, lng: -0.13, label: "London" },
  { lat: -33.87, lng: 151.21, label: "Sydney" },
];

/* project lat/lng → x/y on an equirectangular canvas */
function project(
  lat: number,
  lng: number,
  cx: number,
  cy: number,
  r: number,
  rotation: number,
): { x: number; y: number; visible: boolean } {
  const phi = ((lng + rotation) * Math.PI) / 180;
  const theta = (lat * Math.PI) / 180;
  const x = cx + r * Math.cos(theta) * Math.sin(phi);
  const y = cy - r * Math.sin(theta);
  const visible = Math.cos(theta) * Math.cos(phi) > 0;
  return { x, y, visible };
}

/* ──────────────────────────────────────────────
   Floating particles (ambient background)
   ────────────────────────────────────────────── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
}

function createParticles(count: number, w: number, h: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 1.6 + 0.4,
    alpha: Math.random() * 0.35 + 0.08,
  }));
}

/* ──────────────────────────────────────────────
   Main component
   ────────────────────────────────────────────── */
export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let rotation = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    /* ---- sizing ---- */
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.getBoundingClientRect().width;
    const h = () => canvas.getBoundingClientRect().height;

    /* ---- particles ---- */
    let particles = createParticles(60, w(), h());

    /* ---- animation loop ---- */
    const draw = () => {
      const W = w();
      const H = h();
      ctx.clearRect(0, 0, W, H);

      rotation += 0.12;

      /* ── ambient particles ── */
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.18 0 0 / ${p.alpha})`;
        ctx.fill();
      }

      /* connect nearby particles */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `oklch(0.18 0 0 / ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      /* ── globe sphere ── */
      const cx = W / 2;
      const cy = H / 2;
      const radius = Math.min(W, H) * 0.34;

      /* outer glow */
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.6, cx, cy, radius * 1.8);
      glow.addColorStop(0, "oklch(0.18 0 0 / 0.04)");
      glow.addColorStop(0.5, "oklch(0.18 0 0 / 0.015)");
      glow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      /* sphere fill */
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.3,
        0,
        cx,
        cy,
        radius,
      );
      sphereGrad.addColorStop(0, "oklch(0.97 0 0 / 0.9)");
      sphereGrad.addColorStop(0.6, "oklch(0.93 0 0 / 0.7)");
      sphereGrad.addColorStop(1, "oklch(0.88 0 0 / 0.5)");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      /* sphere edge */
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "oklch(0.18 0 0 / 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      /* ── latitude lines ── */
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lng = -180; lng <= 180; lng += 2) {
          const p = project(lat, lng, cx, cy, radius, rotation);
          if (p.visible) {
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle = "oklch(0.18 0 0 / 0.06)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      /* ── longitude lines ── */
      for (let lng = -180; lng < 180; lng += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 2) {
          const p = project(lat, lng, cx, cy, radius, rotation);
          if (p.visible) {
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle = "oklch(0.18 0 0 / 0.06)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      /* ── city dots & labels ── */
      for (const city of CITIES) {
        const p = project(city.lat, city.lng, cx, cy, radius, rotation);
        if (!p.visible) continue;

        /* pulsing ring */
        const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.003 + city.lat);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5 + pulse * 3, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.18 0 0 / ${0.08 + pulse * 0.06})`;
        ctx.fill();

        /* dot */
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "oklch(0.18 0 0 / 0.85)";
        ctx.fill();

        /* label */
        ctx.font = "500 9px 'JetBrains Mono', monospace";
        ctx.fillStyle = "oklch(0.18 0 0 / 0.55)";
        ctx.textAlign = "center";
        ctx.fillText(city.label.toUpperCase(), p.x, p.y - 10);
      }

      /* ── connection arcs between cities ── */
      const connections = [
        [0, 1], // Paris → New York
        [0, 3], // Paris → Dubai
        [3, 2], // Dubai → Tokyo
        [2, 4], // Tokyo → Singapore
        [4, 5], // Singapore → Da Nang
        [0, 6], // Paris → London
        [2, 7], // Tokyo → Sydney
      ];
      for (const [a, b] of connections) {
        const pa = project(CITIES[a].lat, CITIES[a].lng, cx, cy, radius, rotation);
        const pb = project(CITIES[b].lat, CITIES[b].lng, cx, cy, radius, rotation);
        if (!pa.visible || !pb.visible) continue;

        /* bezier arc */
        const mx = (pa.x + pb.x) / 2;
        const my = (pa.y + pb.y) / 2;
        const dx = pb.x - pa.x;
        const dy = pb.y - pa.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const bulge = Math.min(dist * 0.3, 40);
        const cpx = mx - (dy / dist) * bulge;
        const cpy = my + (dx / dist) * bulge;

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.quadraticCurveTo(cpx, cpy, pb.x, pb.y);
        ctx.strokeStyle = "oklch(0.18 0 0 / 0.1)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        /* animated dot along the arc */
        const t = ((Date.now() * 0.0004 + a * 0.3) % 1);
        const bx = (1 - t) * (1 - t) * pa.x + 2 * (1 - t) * t * cpx + t * t * pb.x;
        const by = (1 - t) * (1 - t) * pa.y + 2 * (1 - t) * t * cpy + t * t * pb.y;
        ctx.beginPath();
        ctx.arc(bx, by, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "oklch(0.18 0 0 / 0.5)";
        ctx.fill();
      }

      /* ── orbital rings ── */
      const orbitAngle = Date.now() * 0.0003;
      for (let i = 0; i < 2; i++) {
        const tilt = 0.3 + i * 0.35;
        const orbitR = radius * (1.15 + i * 0.12);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(orbitAngle + i * 1.2);
        ctx.scale(1, tilt);
        ctx.beginPath();
        ctx.arc(0, 0, orbitR, 0, Math.PI * 2);
        ctx.strokeStyle = `oklch(0.18 0 0 / ${0.06 - i * 0.015})`;
        ctx.lineWidth = 0.6;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={cn("pointer-events-auto relative flex items-center justify-center", className)}>
      <canvas
        ref={canvasRef}
        className="h-full w-full [contain:layout_paint_size]"
        style={{ opacity: 0, animation: "fadeIn 1.2s ease-out 0.3s forwards" }}
      />
      <style>{`@keyframes fadeIn { to { opacity: 1 } }`}</style>
    </div>
  );
}
