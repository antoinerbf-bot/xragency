import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

const STARS = Array.from({ length: 80 }, (_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453;
  const b = Math.sin(i * 78.233) * 12345.678;
  return {
    x: ((a - Math.floor(a)) * 100).toFixed(2),
    y: ((b - Math.floor(b)) * 100).toFixed(2),
    s: (((a - Math.floor(a)) * 1.5 + 0.5) as number).toFixed(2),
    d: (i * 137) % 4000,
  };
});

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);

  useEffect(() => {
    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0.22;
    const doublePi = Math.PI * 2;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    let globe: ReturnType<typeof createGlobe> | null = null;

    try {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.22,
        dark: 1,
        diffuse: 1.6,
        mapSamples: 24000,
        mapBrightness: 5.5,
        baseColor: [0.12, 0.12, 0.15],
        markerColor: [0.95, 0.65, 0.22],
        glowColor: [0.15, 0.18, 0.26],
        markers: [
          // Paris (HQ)
          { location: [48.8566, 2.3522], size: 0.08 },
          // New York
          { location: [40.7128, -74.006], size: 0.06 },
          // Tokyo
          { location: [35.6762, 139.6503], size: 0.06 },
          // Dubai
          { location: [25.2048, 55.2708], size: 0.06 },
          // Singapore
          { location: [1.3521, 103.8198], size: 0.06 },
          // Da Nang / Vietnam
          { location: [16.0544, 108.2022], size: 0.07 },
          // London
          { location: [51.5074, -0.1278], size: 0.06 },
          // Sydney
          { location: [-33.8688, 151.2093], size: 0.05 },
        ],
        onRender: (state) => {
          if (!pointerInteracting.current) {
            phiRef.current += 0.0035;
          }
          state.phi = phiRef.current + pointerInteractionMovement.current;
          state.theta = currentTheta;
          state.width = width * 2;
          state.height = width * 2;
        },
      });
    } catch (e) {
      console.error("WebGL Globe initialization failed:", e);
    }

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });

    return () => {
      window.removeEventListener("resize", onResize);
      if (globe) {
        globe.destroy();
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      {/* Dynamic Starfield Backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="animate-pulse-soft absolute rounded-full bg-foreground/35"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.s}px`,
              height: `${s.s}px`,
              animationDelay: `${s.d}ms`,
            }}
          />
        ))}
      </div>

      {/* Atmospheric Radial Halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[85vmin] w-[85vmin] max-w-[750px] max-h-[750px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, color-mix(in oklab, var(--primary) 25%, transparent) 40%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      {/* 3D WebGL Globe Canvas */}
      <div className="relative aspect-square w-full max-w-[650px]">
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = "grabbing";
            }
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = "grab";
            }
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = "grab";
            }
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta * 0.008;
            }
          }}
          onTouchMove={(e) => {
            if (
              pointerInteracting.current !== null &&
              e.touches[0]
            ) {
              const delta =
                e.touches[0].clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta * 0.008;
            }
          }}
          className="h-full w-full cursor-grab opacity-0 transition-opacity duration-1000 ease-in-out [contain:layout_paint_size]"
        />

        {/* Orbit Rings Accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full border border-primary/20 scale-[1.08] animate-[spin_60s_linear_infinite] opacity-40 border-dashed"
        />
      </div>
    </div>
  );
}
