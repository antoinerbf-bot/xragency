import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import type { L } from "@/lib/i18n";

export function Logo({ className, subtitle = true }: { className?: string; subtitle?: boolean }) {
  const { t } = useLang();
  return (
    <Link
      to="/"
      aria-label="XR Agency — Accueil"
      className={cn("group inline-flex shrink-0 flex-col tracking-tight transition-all duration-300 hover:opacity-90", className)}
    >
      <div className="flex items-baseline gap-1.5">
        <span className="display-serif text-lg font-bold tracking-[0.22em] text-foreground transition-all duration-300 group-hover:tracking-[0.26em] sm:text-xl">XR<span className="font-light tracking-[0.22em]">AGENCY</span></span>
        <span className="h-1.5 w-1.5 rounded-full bg-primary transition-transform duration-300 group-hover:scale-125" />
      </div>
      {subtitle ? <span className="label-mono mt-0.5 text-[8px] uppercase tracking-[0.32em] text-muted-foreground transition-colors group-hover:text-foreground">{t(UI.logoSubtitle)}</span> : null}
    </Link>
  );
}

export function Parallax({ children, speed = 0.12, direction = "y", className }: { children: ReactNode; speed?: number; direction?: "y" | "x" | "both"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const isMobile = window.innerWidth < 768;
      const effectiveSpeed = isMobile ? speed * 0.35 : speed;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      if (direction === "y") el.style.transform = `translate3d(0, ${(-center * effectiveSpeed).toFixed(2)}px, 0)`;
      else if (direction === "x") el.style.transform = `translate3d(${(-center * effectiveSpeed).toFixed(2)}px, 0, 0)`;
      else el.style.transform = `translate3d(${(-center * effectiveSpeed * 0.4).toFixed(2)}px, ${(-center * effectiveSpeed).toFixed(2)}px, 0)`;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, [speed, direction]);
  return <div ref={ref} className={cn("will-change-transform", className)}>{children}</div>;
}

export function FloatingBadge({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) { return <div className={cn("animate-float", className)} style={{ animationDelay: `${delay}ms` }}>{children}</div>; }

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(true); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setTimeout(() => setShown(true), delay); observer.disconnect(); } }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={cn("transition-all duration-700", shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0", className)}>{children}</div>;
}

export function EmberButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) { return <a href={href} className={cn("inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:brightness-105", className)}>{children}</a>; }
