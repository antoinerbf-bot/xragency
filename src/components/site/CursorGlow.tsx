import { useEffect, useRef } from "react";

export function CursorGlow() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;
    let isHovering = false;
    let isVisible = false;
    let animationFrameId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        if (outerRef.current) outerRef.current.style.opacity = "1";
        if (innerRef.current) innerRef.current.style.opacity = "1";
      }

      // Check if mouse is hovering over an interactive element
      const target = e.target as HTMLElement | null;
      isHovering = !!target?.closest("a, button, input, select, textarea, [role='button']");
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (outerRef.current) outerRef.current.style.opacity = "0";
      if (innerRef.current) innerRef.current.style.opacity = "0";
    };

    // Smooth lerp render loop
    const render = () => {
      // Linear interpolation for smooth trailing physics
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      const scale = isHovering ? 1.35 : 1;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Outer Ethereal Halo */}
      <div
        ref={outerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 h-[360px] w-[360px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(56,189,248,0.12) 35%, rgba(212,175,55,0.06) 60%, transparent 75%)",
          filter: "blur(45px)",
        }}
      />
      {/* Inner Precision Diamond Spot */}
      <div
        ref={innerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 h-10 w-10 rounded-full opacity-0 transition-opacity duration-300 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(56,189,248,0.3) 50%, transparent 80%)",
          filter: "blur(6px)",
        }}
      />
    </>
  );
}

