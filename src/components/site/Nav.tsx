import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Sparkles, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SERVICES } from "@/lib/content";
import { Logo, EmberButton } from "./primitives";
import { CartFloatingButton } from "./Cart";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

interface NavItem {
  labelKey: "navServices" | "navPricing" | "navWork" | "navIntelligence" | "navFaq";
  href: string;
  section: string;
  hasDropdown?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: "navServices", href: "/services", section: "services", hasDropdown: true },
  { labelKey: "navPricing", href: "/#pricing", section: "pricing" },
  { labelKey: "navWork", href: "/#work", section: "work" },
  { labelKey: "navIntelligence", href: "/#intelligence", section: "intelligence" },
  { labelKey: "navFaq", href: "/#faq", section: "faq" },
];

export function Nav() {
  const { t, lang, setLang } = useLang();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 30);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) setProgress(Math.min(scrollY / docHeight, 1));

    if (isHome) {
      const sections = ["services", "pricing", "work", "intelligence", "faq"];
      let current: string | null = null;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) current = id;
        }
      }
      setActiveSection(current);
    } else if (location.pathname.startsWith("/services")) {
      setActiveSection("services");
    } else {
      setActiveSection(null);
    }
  }, [isHome, location.pathname]);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setServicesDropdownOpen(false), 150);
  };

  const handleNavClick = (section: string, href: string) => {
    setOpen(false);
    setServicesDropdownOpen(false);
    if (isHome && href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/70 bg-background/92 backdrop-blur-xl shadow-sm py-2 sm:py-3"
          : "border-b border-transparent py-3 sm:py-4.5",
      )}
    >
      <div
        className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-primary/80 via-primary to-primary/40 transition-[width] duration-150"
        style={{ width: `${(progress * 100).toFixed(1)}%` }}
        aria-hidden
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <Logo />

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.section;

            if (item.hasDropdown) {
              return (
                <div
                  key={item.labelKey}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    to="/services"
                    className={cn(
                      "label-mono inline-flex items-center gap-1.5 py-2 transition-colors duration-300",
                      isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    <span>{t(UI[item.labelKey])}</span>
                    <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", servicesDropdownOpen && "rotate-180 text-primary")} />
                  </Link>

                  {servicesDropdownOpen && (
                    <div className="absolute left-1/2 top-full w-[480px] -translate-x-1/2 pt-2">
                      <div className="overflow-hidden rounded-2xl border border-border bg-card/98 p-4 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between border-b border-border/60 px-2 pb-2.5">
                          <span className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground">10 Disciplines Maîtresses</span>
                          <Link to="/services" onClick={() => setServicesDropdownOpen(false)} className="label-mono inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline">
                            Catalogue complet <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>

                        <div className="mt-2 grid grid-cols-2 gap-1.5">
                          {SERVICES.slice(0, 8).map((s) => (
                            <Link key={s.id} to="/services/$serviceId" params={{ serviceId: s.id }} onClick={() => setServicesDropdownOpen(false)} className="group flex flex-col rounded-xl p-2.5 transition-colors hover:bg-accent/50">
                              <div className="flex items-center justify-between">
                                <span className="display-serif text-sm font-medium text-foreground transition-colors group-hover:text-primary">{t(s.title)}</span>
                                <span className="label-mono text-[9px] text-primary/80">{s.num}</span>
                              </div>
                              <span className="label-mono truncate text-[10px] text-muted-foreground">{t(s.short)}</span>
                            </Link>
                          ))}
                        </div>

                        <div className="mt-2.5 flex items-center justify-between rounded-xl border border-border/60 bg-accent/20 p-2.5">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-3.5 w-3.5 text-primary" />
                            <span className="label-mono text-xs font-medium text-foreground">SEO Domination System & Google Maps</span>
                          </div>
                          <Link to="/services/$serviceId" params={{ serviceId: "seo" }} onClick={() => setServicesDropdownOpen(false)} className="label-mono text-[10px] font-semibold text-primary underline">Voir SEO Domination →</Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            if (isHome) {
              return (
                <a key={item.labelKey} href={item.href} onClick={(e) => { e.preventDefault(); handleNavClick(item.section, item.href); }} className={cn("label-mono transition-colors duration-300", isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary")}>
                  {t(UI[item.labelKey])}
                </a>
              );
            }

            return (
              <Link key={item.labelKey} to="/" hash={item.section} className={cn("label-mono transition-colors duration-300", isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary")}>
                {t(UI[item.labelKey])}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeSwitcher className="static h-9 w-9 shrink-0 rounded-full shadow-none" />

          <div className="hidden items-center gap-1 rounded-full border border-border bg-card/60 px-1 py-1 sm:flex">
            {LANGS.map((l) => (
              <button key={l.code} onClick={() => setLang(l.code)} className={cn("label-mono cursor-pointer rounded-full px-2.5 py-0.5 text-xs transition-colors", lang === l.code ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                {l.label}
              </button>
            ))}
          </div>

          <CartFloatingButton />
          <EmberButton href="/#contact" className="hidden text-xs md:inline-flex">{t(UI.bookCall)}</EmberButton>

          <button aria-label="Menu" onClick={() => setOpen((v) => !v)} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card/80 lg:hidden">
            {open ? <X className="h-4 w-4 text-foreground" /> : <span className="relative block h-[9px] w-4"><span className="absolute inset-x-0 top-0 h-px bg-foreground" /><span className="absolute inset-x-0 bottom-0 h-px bg-foreground" /></span>}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background/98 px-6 py-6 backdrop-blur-2xl lg:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            <Link to="/services" onClick={() => setOpen(false)} className="label-mono flex items-center justify-between rounded-xl px-4 py-3 text-sm text-foreground hover:bg-accent/40">
              <span>{t(UI.navServices)} · Catalogue</span>
              <span className="label-mono rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">10 offres</span>
            </Link>

            <div className="grid grid-cols-2 gap-1 px-2 py-1">
              <Link to="/services/$serviceId" params={{ serviceId: "seo" }} onClick={() => setOpen(false)} className="label-mono rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-accent/30 hover:text-primary">→ SEO Domination</Link>
              <Link to="/services/$serviceId" params={{ serviceId: "websites" }} onClick={() => setOpen(false)} className="label-mono rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-accent/30 hover:text-primary">→ Sites Web</Link>
              <Link to="/services/$serviceId" params={{ serviceId: "maps" }} onClick={() => setOpen(false)} className="label-mono rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-accent/30 hover:text-primary">→ Google Maps TOP 3</Link>
            </div>

            {NAV_ITEMS.filter((i) => !i.hasDropdown).map((item) => (
              <a key={item.labelKey} href={item.href} onClick={() => handleNavClick(item.section, item.href)} className="label-mono rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground">
                {t(UI[item.labelKey])}
              </a>
            ))}

            <a href="/#contact" onClick={() => setOpen(false)} className="label-mono mt-3 rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">{t(UI.bookCall)}</a>

            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
              <span className="label-mono text-xs text-muted-foreground">Langue</span>
              <div className="flex gap-1.5">
                {LANGS.map((l) => (
                  <button key={l.code} onClick={() => setLang(l.code)} className={cn("label-mono rounded-full border px-2.5 py-1 text-xs transition-colors", lang === l.code ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground")}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
