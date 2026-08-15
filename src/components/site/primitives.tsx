import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import type { L } from "@/lib/i18n";

export function Logo({ className, subtitle = true }: { className?: string; subtitle?: boolean }) {
  return (
    <a
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 transition-opacity hover:opacity-95",
        className,
      )}
    >
      <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-border/80 bg-card/80 backdrop-blur-md transition-all duration-500 group-hover:border-primary/60 group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.08)]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative h-5 w-5 text-foreground transition-transform duration-500 group-hover:scale-105"
        >
          {/* Stylized X & R interconnected geometric paths */}
          <path
            d="M6 8L15 18M15 18L24 8M15 18L6 24"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-300 group-hover:stroke-primary"
          />
          <path
            d="M17 10H23C24.6569 10 26 11.3431 26 13C26 14.6569 24.6569 16 23 16H17V24"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 16L26 24"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-300 group-hover:stroke-primary"
          />
          <circle cx="15" cy="18" r="1.5" className="fill-primary" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="label-mono flex items-center text-sm font-semibold tracking-[0.28em] text-foreground transition-colors group-hover:text-primary sm:text-base sm:tracking-[0.32em]">
          XR
          <span className="font-light text-muted-foreground group-hover:text-foreground">
            AGENCY
          </span>
          <span className="ml-0.5 text-primary">2030</span>
        </span>
        {subtitle ? (
          <span className="label-mono text-[8.5px] uppercase tracking-[0.24em] text-muted-foreground/70 transition-colors group-hover:text-muted-foreground">
            Studio Digital & IA
          </span>
        ) : null}
      </div>
    </a>
  );
}

/** Lightweight scroll parallax: translates children as the viewport moves. */
export function Parallax({
  children,
  speed = 0.12,
  className,
}: {
  children: ReactNode;
  speed?: number;
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
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-center * speed).toFixed(2)}px, 0)`;
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
  }, [speed]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
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
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
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
    <Parallax speed={-0.04} className="max-w-3xl">
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
    "label-mono inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40";
  const styles = {
    solid:
      "bg-primary text-primary-foreground hover:brightness-110 hover:shadow-[var(--shadow-ember)]",
    outline: "border border-primary/60 text-primary hover:bg-primary/10",
    ghost: "border border-border text-foreground hover:border-primary/60 hover:text-primary",
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
