import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import type { L } from "@/lib/i18n";

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("group inline-flex items-center", className)}>
      <span className="label-mono text-base font-medium tracking-[0.42em] text-foreground transition-colors group-hover:text-primary sm:text-lg">
        XRAGENCY<span className="text-primary">.</span>
      </span>
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
    <button type={type} onClick={onClick} disabled={disabled} className={cn(base, styles, className)}>
      {children}
    </button>
  );
}