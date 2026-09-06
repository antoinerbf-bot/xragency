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
      className={cn(
        "group inline-flex flex-col tracking-tight transition-all duration-300 hover:opacity-90",
        className,
      )}
    >
      <div className="flex items-baseline gap-1.5">
        <span className="display-serif text-lg font-bold tracking-[0.22em] text-foreground transition-all duration-300 group-hover:tracking-[0.26em] sm:text-xl">
          XR<span className="font-light tracking-[0.22em]">AGENCY</span>
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-primary transition-transform duration-300 group-hover:scale-125" />
      </div>
      {subtitle ? (
        <span className="label-mono mt-0.5 text-[8px] uppercase tracking-[0.32em] text-muted-foreground transition-colors group-hover:text-foreground">
          {t(UI.logoSubtitle)}
        </span>
      ) : null}
    </Link>
  );
}

/** Lightweight scroll parallax: translates children as the viewport moves. */
export function Parallax({
  children,
  speed = 0.12,
  direction = "y",
  className,
}: {
  children: ReactNode;
  speed?: number;
  direction?: "y" | "x" | "both";
  className?: string;
}) {
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

      if (direction === "y") {
        el.style.transform = `translate3d(0, ${(-center * effectiveSpeed).toFixed(2)}px, 0)`;
      } else if (direction === "x") {
        el.style.transform = `translate3d(${(-center * effectiveSpeed).toFixed(2)}px, 0, 0)`;
      } else {
        el.style.transform = `translate3d(${(-center * effectiveSpeed * 0.4).toFixed(2)}px, ${(-center * effectiveSpeed).toFixed(2)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [speed, direction]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

/** Ambient floating element for subtle depth accents */
export function FloatingBadge({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn("animate-float", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("transition-none", className)}
      style={
        shown
          ? { animation: `ember-rise 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` }
          : { opacity: 0 }
      }
    >
      {children}
    </div>
  );
}

export function ChapterMarker({ num, title, page }: { num: string; title: L; page: string }) {
  const { t } = useLang();
  return (
    <div className="mx-auto flex max-w-7xl items-center gap-6 border-t border-border/70 px-6 py-5 lg:px-10">
      <span className="label-mono text-primary">{num}</span>
      <span className="label-mono flex-1 text-muted-foreground">{t(title)}</span>
      <span className="label-mono text-muted-foreground/70">{page}</span>
    </div>
  );
}

export function SectionHeading({
  label,
  line1,
  line2,
  lead,
}: {
  label: L;
  line1: L;
  line2: L;
  lead?: L;
}) {
  const { t } = useLang();
  return (
    <Parallax speed={-0.03} className="max-w-3xl">
      <Reveal>
        <p className="label-mono text-primary">{t(label)}</p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="display-serif mt-6 text-4xl sm:text-5xl lg:text-6xl">
          {t(line1)} <em className="text-primary not-italic italic">{t(line2)}</em>
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={150}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">{t(lead)}</p>
        </Reveal>
      ) : null}
    </Parallax>
  );
}

export function EmberButton({
  children,
  href,
  variant = "solid",
  onClick,
  className,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "ghost" | "outline";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base =
    "label-mono inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 min-h-[44px] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer";
  const styles = {
    solid:
      "bg-primary text-primary-foreground hover:brightness-110 hover:shadow-[var(--shadow-ember)] hover:-translate-y-0.5",
    outline: "border border-primary/60 text-primary hover:bg-primary/10 hover:-translate-y-0.5",
    ghost: "border border-border text-foreground hover:border-primary/60 hover:text-primary hover:-translate-y-0.5",
  }[variant];

  if (href) {
    return (
      <a href={href} className={cn(base, styles, className)}>
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, styles, className)}
    >
      {children}
    </button>
  );
}
