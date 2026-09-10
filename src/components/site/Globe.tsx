// src/components/site/Globe.tsx
import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
}

export function Globe({ className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.offsetWidth;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.6, 0.3, 1],
      glowColor: [0.6, 0.3, 1],
      markers: [
        { location: [48.8566, 2.3522], size: 0.05 },   // Paris
        { location: [43.2965, 5.3698], size: 0.04 },   // Marseille
        { location: [45.764, 4.8357], size: 0.04 },    // Lyon
        { location: [25.2048, 55.2708], size: 0.05 },  // Dubai
        { location: [40.7128, -74.006], size: 0.05 },  // New York
        { location: [35.6895, 139.6917], size: 0.05 }, // Tokyo
        { location: [1.3521, 103.8198], size: 0.04 },  // Singapore
      ],
      onRender: (state) => {
        phiRef.current += 0.003;
        state.phi = phiRef.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      window.removeEventListener("resize", onResize);
      globeRef.current?.destroy();
    };
  }, []);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        className
      )}
      style={{ aspectRatio: "1 / 1" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          aspectRatio: "1 / 1",
        }}
      />
    </div>
  );
}

export default Globe;
