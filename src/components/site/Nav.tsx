import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { Logo, EmberButton } from "./primitives";

const LINKS = [
  { href: "/#services", key: "navServices", section: "services" },
  { href: "/#pricing", key: "navPricing", section: "pricing" },
  { href: "/#work", key: "navWork", section: "work" },
  { href: "/#intelligence", key: "navIntelligence", section: "intelligence" },
  { href: "/#faq", key: "navFaq", section: "faq" },
] as const;

export function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 40);

    // Progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) setProgress(Math.min(scrollY / docHeight, 1));

    // Active section detection
    const sections = LINKS.map((l) => l.section);
    let current: string | null = null;
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/70 bg-background/90 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent",
      )}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-px bg-primary/60 transition-[width] duration-150"
        style={{ width: `${(progress * 100).toFixed(1)}%` }}
        aria-hidden
      />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:py-5 lg:px-10">
        <Logo />

        <div className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "label-mono transition-colors duration-300",
                activeSection === l.section
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              {t(UI[l.key])}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 rounded-full border border-border px-1 py-1 sm:flex">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={cn(
                  "label-mono rounded-full px-2.5 py-1 transition-colors",
                  lang === l.code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
          <EmberButton href="/#contact" className="hidden md:inline-flex">
            {t(UI.bookCall)}
          </EmberButton>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
          >
            <span className="relative block h-[9px] w-4">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-px bg-foreground transition-transform",
                  open && "top-1 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px bg-foreground transition-transform",
                  open && "bottom-1 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background/95 px-6 py-6 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="label-mono rounded-xl px-4 py-3.5 text-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
              >
                {t(UI[l.key])}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="label-mono mt-2 rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t(UI.bookCall)}
            </a>
            <div className="flex gap-2 pt-4">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={cn(
                    "label-mono rounded-full border border-border px-3 py-1.5",
                    lang === l.code && "border-primary text-primary",
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
