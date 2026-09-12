import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SERVICES } from "@/lib/content";
import { Logo, EmberButton } from "./primitives";
import { CartFloatingButton } from "./Cart";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

interface NavItem { labelKey: "navServices" | "navPricing" | "navWork" | "navIntelligence" | "navFaq"; href: string; section: string; hasDropdown?: boolean; }
const SERVICE_IDS = ["websites", "branding", "seo", "maps", "social", "maintenance"];
const NAV_ITEMS: NavItem[] = [
  { labelKey: "navServices", href: "/services", section: "services", hasDropdown: true },
  { labelKey: "navIntelligence", href: "/#quote", section: "quote" },
  { labelKey: "navWork", href: "/#work", section: "work" },
  { labelKey: "navFaq", href: "/#faq", section: "faq" },
  { labelKey: "navPricing", href: "/#contact", section: "contact" },
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
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 30);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) setProgress(Math.min(scrollY / docHeight, 1));
    if (isHome) {
      const sections = ["quote", "google-simulation", "homepage-services", "work", "faq", "contact"];
      let current: string | null = null;
      for (const id of sections) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 140) current = id; }
      setActiveSection(current);
    } else if (location.pathname.startsWith("/services")) setActiveSection("services");
    else setActiveSection(null);
  }, [isHome, location.pathname]);

  useEffect(() => { onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, [onScroll]);
  const handleDropdownEnter = () => { if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current); setServicesDropdownOpen(true); };
  const handleDropdownLeave = () => { dropdownTimeoutRef.current = setTimeout(() => setServicesDropdownOpen(false), 150); };
  const handleNavClick = (section: string, href: string) => { setOpen(false); setServicesDropdownOpen(false); if (isHome && href.startsWith("/#")) document.getElementById(href.replace("/#", ""))?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "border-b border-border/70 bg-background/92 py-2 shadow-sm backdrop-blur-xl sm:py-3" : "border-b border-transparent bg-background/60 py-3 backdrop-blur-md sm:py-4.5")}>
      <div aria-hidden className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-primary/80 via-primary to-primary/40 transition-[width] duration-150" style={{ width: `${(progress * 100).toFixed(1)}%` }} />
      <nav className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 lg:gap-4 lg:px-8">
        <Logo />

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
          <div className="flex items-center rounded-full border border-border/70 bg-card/70 p-1 shadow-sm backdrop-blur-xl">
            {SERVICE_IDS.map((id) => {
              const service = SERVICES.find((s) => s.id === id); if (!service) return null;
              return <Link key={id} to="/services/$serviceId" params={{ serviceId: id }} className="group rounded-full px-2.5 py-2 transition hover:bg-accent/70 xl:px-3"><span className="label-mono text-[8px] uppercase tracking-[0.08em] text-muted-foreground group-hover:text-primary">{service.num} · {t(service.title)}</span></Link>;
            })}
          </div>
          <a href="/#quote" onClick={(e) => { e.preventDefault(); handleNavClick("quote", "/#quote"); }} className={cn("ml-1 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] transition-all", activeSection === "quote" ? "border-primary bg-primary text-primary-foreground shadow-lg" : "border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground")}><Sparkles className="h-3 w-3"/> Intelligence · Devis sur mesure</a>
        </div>

        <div className="ml-auto flex items-center justify-end gap-2">
          <ThemeSwitcher className="static h-9 w-9 shrink-0 rounded-full shadow-none" />
          <div className="hidden items-center gap-1 rounded-full border border-border bg-card/60 px-1 py-1 sm:flex">{LANGS.map((l) => <button key={l.code} onClick={() => setLang(l.code)} className={cn("label-mono cursor-pointer rounded-full px-2.5 py-0.5 text-xs transition-colors", lang === l.code ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>{l.label}</button>)}</div>
          <CartFloatingButton />
          <EmberButton href="/#contact" className="hidden text-xs md:inline-flex">{t(UI.bookCall)}</EmberButton>
          <button aria-label="Menu" onClick={() => setOpen((v) => !v)} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card/80 lg:hidden">{open ? <X className="h-4 w-4" /> : <span className="relative block h-[9px] w-4"><span className="absolute inset-x-0 top-0 h-px bg-foreground" /><span className="absolute inset-x-0 bottom-0 h-px bg-foreground" /></span>}</button>
        </div>
      </nav>

      {servicesDropdownOpen && <div className="hidden border-t border-border/60 bg-background/95 px-6 py-3 backdrop-blur-2xl lg:block" onMouseEnter={handleDropdownEnter} onMouseLeave={handleDropdownLeave}><div className="mx-auto flex max-w-[1600px] items-center justify-center gap-2">{SERVICE_IDS.map((id) => { const s = SERVICES.find((x) => x.id === id); return s ? <Link key={id} to="/services/$serviceId" params={{ serviceId: id }} onClick={() => setServicesDropdownOpen(false)} className="rounded-xl border border-border/70 px-4 py-2 text-center hover:border-primary/40 hover:bg-accent/40"><span className="label-mono block text-[8px] text-primary">{s.num}</span><span className="text-xs">{t(s.title)}</span></Link> : null; })}</div></div>}

      {open && <div className="border-t border-border bg-background/98 px-5 py-5 backdrop-blur-2xl lg:hidden"><div className="mb-3 rounded-2xl border border-primary/30 bg-primary/5 p-4"><Link to="/" hash="quote" onClick={() => setOpen(false)} className="flex items-center justify-between"><span><span className="label-mono block text-[9px] uppercase tracking-[0.18em] text-primary">XR Intelligence</span><span className="mt-1 block text-sm font-medium">Faire mon devis sur mesure</span></span><Sparkles className="h-4 w-4 text-primary" /></Link></div><div className="grid grid-cols-2 gap-2">{SERVICE_IDS.map((id) => { const s = SERVICES.find((x) => x.id === id); return s ? <Link key={id} to="/services/$serviceId" params={{ serviceId: id }} onClick={() => setOpen(false)} className="rounded-xl border border-border px-3 py-3"><span className="label-mono text-[8px] text-primary">{s.num}</span><span className="ml-2 text-xs">{t(s.title)}</span></Link> : null; })}</div><div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4"><span className="label-mono text-xs text-muted-foreground">Langue</span><div className="flex gap-1.5">{LANGS.map((l) => <button key={l.code} onClick={() => setLang(l.code)} className={cn("label-mono rounded-full border px-2.5 py-1 text-xs", lang === l.code ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground")}>{l.label}</button>)}</div></div></div>}
    </header>
  );
}
