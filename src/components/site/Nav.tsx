import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, X, Monitor, Palette, Search, MapPinned, Share2, ShieldCheck, Bot, ArrowRight, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SERVICES } from "@/lib/content";
import { Logo, EmberButton } from "./primitives";
import { CartFloatingButton } from "./Cart";
import { useTheme } from "@/components/theme/ThemeProvider";

const IDS=["websites","branding","seo","maps","social","maintenance","robotics"] as const;
const ICONS={websites:Monitor,branding:Palette,seo:Search,maps:MapPinned,social:Share2,maintenance:ShieldCheck,robotics:Bot};

const BASE_PRICES: Record<string, { eur: number; period?: string }> = {
  websites: { eur: 499 },
  branding: { eur: 199 },
  seo: { eur: 299, period: "/m" },
  maps: { eur: 990, period: "/an" },
  social: { eur: 299, period: "/m" },
  maintenance: { eur: 29, period: "/m" },
  robotics: { eur: 499 },
};

export function Nav() {
  const { t, lang, setLang, price } = useLang();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 24);
    const total = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(total > 0 ? Math.min(window.scrollY / total, 1) : 0);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const href = (id: string) =>
    id === "maintenance" ? "/services/webcare" : id === "robotics" ? "/services/robotique" : "/services/" + id;

  const heroTop = isHome && !scrolled;

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "py-2 sm:py-3" : "py-3 sm:py-5")}>
      <div className="mx-auto max-w-[1640px] px-4 sm:px-6 lg:px-10">
        <nav
          className={cn(
            "relative flex items-center gap-2 rounded-full border px-2.5 py-2.5 transition-all duration-500 sm:px-3",
            scrolled
              ? "xr-panel-strong shadow-[var(--xr-shadow)] text-[var(--xr-ink)]"
              : heroTop
                ? "border-neutral-300/80 bg-white/80 text-neutral-900 shadow-sm backdrop-blur-xl dark:border-white/15 dark:bg-black/35 dark:text-white"
                : "bg-[var(--xr-surface)] border-[var(--xr-line)] text-[var(--xr-ink)] backdrop-blur-xl"
          )}
        >
          <Logo className="min-w-0 px-2 sm:px-1 text-current hover:opacity-85" />

          <div className="hidden min-w-0 flex-1 justify-center lg:flex">
            <div className="flex items-center rounded-full border xr-line bg-[var(--xr-surface)] p-1 text-[var(--xr-ink)]">
              <div
                className="relative"
                onMouseEnter={() => {
                  if (timer.current) clearTimeout(timer.current);
                  setServicesOpen(true);
                }}
                onMouseLeave={() => {
                  timer.current = setTimeout(() => setServicesOpen(false), 200);
                }}
              >
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[.16em] transition hover:bg-[var(--xr-accent-soft)]"
                >
                  {t(UI.navServices)}
                  <ChevronDown className={cn("h-3 w-3 transition-transform", servicesOpen && "rotate-180")} />
                </button>

                {servicesOpen && (
                  <div className="absolute left-1/2 top-full mt-2 w-[820px] -translate-x-1/2 rounded-[1.75rem] border xr-line bg-[var(--xr-bg-elev)] p-4 shadow-2xl text-[var(--xr-ink)] backdrop-blur-2xl">
                    <div className="mb-3 flex items-center justify-between border-b xr-line px-2 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="label-mono text-[7px] tracking-[.22em] xr-muted-2">
                          XRAGENCY · 07 EXPERTISES DIGITALES
                        </span>
                      </div>
                      <Link
                        to="/services"
                        onClick={() => setServicesOpen(false)}
                        className="inline-flex items-center gap-1.5 label-mono text-[7px] xr-accent hover:underline"
                      >
                        Catalogue complet <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-2.5">
                      {IDS.map((id, i) => {
                        const s = SERVICES.find((x) => x.id === id);
                        const I = ICONS[id];
                        if (!s) return null;
                        return (
                          <a
                            key={id}
                            href={href(id)}
                            onClick={() => setServicesOpen(false)}
                            className="group flex flex-col justify-between rounded-2xl border xr-line bg-[var(--xr-surface)] p-3.5 transition duration-300 hover:-translate-y-1 hover:border-neutral-400 dark:hover:border-white/30 hover:bg-[var(--xr-surface-strong)] hover:shadow-md"
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="label-mono text-[6px] xr-muted-2">0{i + 1}</span>
                                <I className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <span className="mt-2.5 block text-[9.5px] font-semibold leading-tight">{t(s.title)}</span>
                              <span className="mt-1 block text-[7px] leading-3.5 xr-muted line-clamp-2">{t(s.short)}</span>
                            </div>
                            <div className="mt-3 pt-2 border-t xr-line flex items-center justify-between">
                              <span className="label-mono text-[6px] xr-muted-2">dès</span>
                              <span className="label-mono text-[7px] font-bold xr-accent">
                                {price(BASE_PRICES[id].eur)}{BASE_PRICES[id].period ?? ""}
                              </span>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/realisations"
                className="rounded-full px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[.16em] xr-muted hover:bg-[var(--xr-accent-soft)] hover:text-[var(--xr-ink)] transition"
              >
                {t(UI.navWork)}
              </Link>
              <Link
                to="/recrutement"
                className="rounded-full px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[.16em] text-emerald-500 hover:bg-[var(--xr-accent-soft)] transition"
              >
                Affiliation & Recrutement
              </Link>
              <button
                type="button"
                onClick={() =>
                  isHome
                    ? document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })
                    : window.location.assign("/#faq")
                }
                className="rounded-full px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[.16em] xr-muted hover:bg-[var(--xr-accent-soft)] hover:text-[var(--xr-ink)] transition"
              >
                {t(UI.navFaq)}
              </button>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <div className="hidden items-center gap-1 rounded-full border xr-line bg-[var(--xr-surface)] p-1 sm:flex" aria-label="Langues">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={cn(
                    "label-mono rounded-full px-2.5 py-1.5 text-[7px] transition",
                    lang === l.code ? "bg-[var(--xr-ink)] text-[var(--xr-bg)]" : "xr-muted hover:text-[var(--xr-ink)]"
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
              title={theme === "dark" ? "Mode clair" : "Mode sombre"}
              onClick={toggleTheme}
              className="group grid h-10 w-10 shrink-0 place-items-center rounded-full border xr-line bg-[var(--xr-surface)] text-[var(--xr-ink)] shadow-[0_8px_28px_-18px_rgba(0,0,0,.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--xr-accent-soft)]"
            >
              <span className="relative grid place-items-center">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="sr-only">{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
              </span>
            </button>

            <CartFloatingButton />

            <EmberButton
              href="/#quote"
              className="hidden min-h-9 px-4 py-2 text-[8px] md:inline-flex"
            >
              Lancer mon analyse
            </EmberButton>

            <button
              type="button"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border xr-line bg-[var(--xr-surface)] text-[var(--xr-ink)] lg:hidden"
            >
              {open ? (
                <X className="h-4 w-4" />
              ) : (
                <span className="space-y-1">
                  <span className="block h-px w-4 bg-current" />
                  <span className="block h-px w-4 bg-current" />
                  <span className="block h-px w-3 bg-current" />
                </span>
              )}
            </button>
          </div>

          <div aria-hidden className="absolute bottom-0 left-3 right-3 h-px bg-[var(--xr-line)]">
            <div
              className="h-full origin-left bg-[var(--xr-accent)] transition-transform duration-200"
              style={{ transform: "scaleX(" + progress + ")" }}
            />
          </div>
        </nav>

        {open && (
          <div className="mt-2 overflow-hidden rounded-[1.75rem] border xr-line bg-[var(--xr-bg-elev)] p-4 shadow-2xl text-[var(--xr-ink)] lg:hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b xr-line pb-3">
              <span className="label-mono text-[7px] tracking-[.2em] xr-muted-2">NOS SERVICES & TARIFS</span>
              <Link
                to="/services"
                onClick={() => setOpen(false)}
                className="label-mono text-[7px] font-semibold xr-accent underline"
              >
                Tout voir
              </Link>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {IDS.map((id, i) => {
                const s = SERVICES.find((x) => x.id === id);
                const I = ICONS[id];
                if (!s) return null;
                return (
                  <a
                    key={id}
                    href={href(id)}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl border xr-line bg-[var(--xr-surface)] px-3.5 py-2.5 text-[10px] text-[var(--xr-ink)] transition active:scale-[.98]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="label-mono text-[6px] xr-muted-2">0{i + 1}</span>
                      <I className="h-3.5 w-3.5 opacity-60" />
                      <span className="font-semibold">{t(s.title)}</span>
                    </div>
                    <span className="label-mono text-[7px] font-bold xr-muted-2">
                      {price(BASE_PRICES[id].eur)}{BASE_PRICES[id].period ?? ""}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 border-t xr-line pt-3 sm:grid-cols-4">
              <a
                href="/realisations"
                onClick={() => setOpen(false)}
                className="rounded-xl border xr-line bg-[var(--xr-surface)] p-2.5 text-center text-[9px] font-semibold text-[var(--xr-ink)]"
              >
                Réalisations
              </a>
              <a
                href="/recrutement"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-2.5 text-center text-[9px] font-bold text-emerald-500"
              >
                Affiliation 10-20%
              </a>
              <a
                href="/#audit"
                onClick={() => setOpen(false)}
                className="rounded-xl border xr-line bg-[var(--xr-surface)] p-2.5 text-center text-[9px] font-semibold text-[var(--xr-ink)]"
              >
                Audit gratuit
              </a>
              <a
                href="/#faq"
                onClick={() => setOpen(false)}
                className="rounded-xl border xr-line bg-[var(--xr-surface)] p-2.5 text-center text-[9px] font-semibold text-[var(--xr-ink)]"
              >
                FAQ
              </a>
            </div>

            <div className="mt-3 flex items-center justify-between border-t xr-line pt-3">
              <div>
                <span className="label-mono block text-[6px] xr-muted-2 mb-1.5">LANGUE</span>
                <div className="flex flex-wrap gap-1">
                  {LANGS.map((l) => (
                    <button
                      type="button"
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className={cn(
                        "rounded-full border px-2 py-1 text-[7px] font-medium",
                        lang === l.code ? "bg-[var(--xr-ink)] text-[var(--xr-bg)]" : "xr-line xr-muted text-[var(--xr-ink)]"
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="label-mono block text-[6px] xr-muted-2 mb-1.5">THÈME</span>
                <button
                  type="button"
                  aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
                  onClick={toggleTheme}
                  className="grid h-9 w-9 place-items-center rounded-full border xr-line bg-[var(--xr-surface-strong)] text-[var(--xr-ink)]"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
