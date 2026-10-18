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
import { XR_PHOTOS } from "@/lib/photography";

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


function FlagIcon({ code }: { code: string }) {
  const common = { width: 24, height: 16, viewBox: "0 0 30 20", role: "img" as const, focusable: "false" as const, className: "block shrink-0 overflow-hidden rounded-[2px] shadow-[0_1px_3px_rgba(0,0,0,.22)]" };
  if (code === "fr") return <svg {...common} aria-label="Français"><rect width="10" height="20" fill="#1b3f8b" /><rect x="10" width="10" height="20" fill="#fff" /><rect x="20" width="10" height="20" fill="#ed2939" /></svg>;
  if (code === "en") return <svg {...common} aria-label="English"><rect width="30" height="20" fill="#17336b" /><path d="M0 0 30 20 M30 0 0 20" stroke="#fff" strokeWidth="4.5" /><path d="M0 0 30 20 M30 0 0 20" stroke="#c8102e" strokeWidth="1.8" /><path d="M15 0 V20 M0 10 H30" stroke="#fff" strokeWidth="7" /><path d="M15 0 V20 M0 10 H30" stroke="#c8102e" strokeWidth="3.5" /></svg>;
  if (code === "vi") return <svg {...common} aria-label="Tiếng Việt"><rect width="30" height="20" fill="#da251d" /><path d="m15 3 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7Z" fill="#ffdf00" /></svg>;
  if (code === "ar") return <svg {...common} aria-label="العربية"><rect width="30" height="20" fill="#006c35" /><path d="M6 12.4 H21.5" stroke="#fff" strokeWidth="1.25" strokeLinecap="round" /><path d="M8 10.7 H21.5" stroke="#fff" strokeWidth=".8" strokeLinecap="round" /><path d="M7 13.8 H22" stroke="#fff" strokeWidth=".65" strokeLinecap="round" /></svg>;
  if (code === "ru") return <svg {...common} aria-label="Русский"><rect width="30" height="6.67" fill="#fff" /><rect y="6.67" width="30" height="6.66" fill="#2457a7" /><rect y="13.33" width="30" height="6.67" fill="#d52b1e" /></svg>;
  return <svg {...common} aria-label="Language"><rect width="30" height="20" fill="#e5e7eb" /></svg>;
}

export function Nav() {
  const { t, lang, setLang, price } = useLang();
  const accessibility = ({
    fr: { language: "Choisir la langue", languagePrefix: "Langue : ", light: "Passer en mode clair", dark: "Passer en mode sombre", lightTitle: "Mode clair", darkTitle: "Mode sombre", menu: "Menu" },
    en: { language: "Choose language", languagePrefix: "Language: ", light: "Switch to light mode", dark: "Switch to dark mode", lightTitle: "Light mode", darkTitle: "Dark mode", menu: "Menu" },
    vi: { language: "Chọn ngôn ngữ", languagePrefix: "Ngôn ngữ: ", light: "Chuyển sang chế độ sáng", dark: "Chuyển sang chế độ tối", lightTitle: "Chế độ sáng", darkTitle: "Chế độ tối", menu: "Menu" },
    ar: { language: "اختيار اللغة", languagePrefix: "اللغة: ", light: "التبديل إلى الوضع الفاتح", dark: "التبديل إلى الوضع الداكن", lightTitle: "الوضع الفاتح", darkTitle: "الوضع الداكن", menu: "القائمة" },
    ru: { language: "Выбрать язык", languagePrefix: "Язык: ", light: "Переключить на светлую тему", dark: "Переключить на тёмную тему", lightTitle: "Светлая тема", darkTitle: "Тёмная тема", menu: "Меню" },
  } as const)[lang];
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
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
                  <div className="absolute left-1/2 top-full mt-2 w-[min(960px,calc(100vw-3rem))] -translate-x-1/2 rounded-[1.35rem] border xr-line bg-[var(--xr-bg-elev)]/95 p-4 shadow-[0_36px_100px_-30px_rgba(0,0,0,.65)] text-[var(--xr-ink)] backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="mb-3 flex items-center justify-between border-b xr-line px-2 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="h-px w-8 bg-current opacity-60" />
                        <span className="label-mono text-[7px] tracking-[.22em] xr-muted-2">
                          {t({ fr: "XRAGENCY · 07 EXPERTISES DIGITALES", en: "XRAGENCY · 07 DIGITAL EXPERTISES", vi: "XRAGENCY · 07 CHUYÊN MÔN KỸ THUẬT SỐ", ar: "XRAGENCY · 07 خبرات رقمية", ru: "XRAGENCY · 07 DIGITAL-КОМПЕТЕНЦИЙ" })}
                        </span>
                      </div>
                      <Link
                        to="/services"
                        onClick={() => setServicesOpen(false)}
                        className="inline-flex items-center gap-1.5 label-mono text-[7px] xr-accent hover:underline"
                      >
                        {t(UI.navFullCatalog)} <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                      {IDS.map((id, i) => {
                        const s = SERVICES.find((x) => x.id === id);
                        const I = ICONS[id];
                        if (!s) return null;
                        return (
                          <a
                            key={id}
                            href={href(id)}
                            onClick={() => setServicesOpen(false)}
                            className="group relative isolate flex min-h-[176px] flex-col justify-end overflow-hidden rounded-xl border xr-line bg-[#101010] text-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(0,0,0,.8)]"
                          >
                            <img src={XR_PHOTOS[id]} alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-[1.06] group-hover:opacity-85" />
                            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/55 to-black/5 transition-opacity duration-500 group-hover:from-black/95" />
                            <div className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/35 bg-black/25 backdrop-blur-md transition-transform duration-500 group-hover:rotate-45">
                              <I className="h-3.5 w-3.5" />
                            </div>
                            <div className="p-3.5">
                              <span className="block text-[11px] font-semibold leading-tight tracking-[-.01em]">{t(s.title)}</span>
                              <span className="mt-1.5 block text-[8px] leading-4 text-white/65 line-clamp-2">{t(s.short)}</span>
                              <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-2.5">
                                <span className="label-mono text-[6px] tracking-[.14em] text-white/55">{t(UI.navFromPrice)}</span>
                                <span className="label-mono text-[8px] font-semibold text-white">
                                  {price(BASE_PRICES[id].eur)}{BASE_PRICES[id].period ?? ""}
                                </span>
                              </div>
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
                className="rounded-full px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[.16em] xr-muted hover:bg-[var(--xr-accent-soft)] hover:text-[var(--xr-ink)] transition"
              >
                {t(UI.navAffiliation)}
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
            <div className="relative">
              <div className="hidden items-center gap-0.5 rounded-full border xr-line bg-[var(--xr-surface)] p-1 sm:flex">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    aria-label={accessibility.languagePrefix + l.label}
                    aria-pressed={lang === l.code}
                    title={l.label}
                    onClick={() => setLang(l.code)}
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-full text-xl transition hover:-translate-y-0.5 hover:bg-[var(--xr-accent-soft)]",
                      lang === l.code && "bg-[var(--xr-accent-soft)] ring-1 ring-[var(--xr-ink)]/35"
                    )}
                  >
                    <FlagIcon code={l.code} />
                  </button>
                ))}
              </div>
              <button
                type="button"
                aria-label={accessibility.language}
                aria-expanded={languageOpen}
                title={accessibility.language}
                onClick={() => setLanguageOpen((value) => !value)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border xr-line bg-[var(--xr-surface)] text-xl shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--xr-accent-soft)] sm:hidden"
              >
                <FlagIcon code={lang} />
              </button>
              {languageOpen && (
                <div className="absolute right-0 top-full z-[70] mt-2 flex gap-1.5 rounded-2xl border xr-line bg-[var(--xr-bg-elev)] p-2 shadow-xl backdrop-blur-2xl sm:hidden">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      aria-label={accessibility.languagePrefix + l.label}
                      aria-pressed={lang === l.code}
                      title={l.label}
                      onClick={() => {
                        setLang(l.code);
                        setLanguageOpen(false);
                      }}
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-xl text-xl transition hover:bg-[var(--xr-accent-soft)]",
                        lang === l.code && "bg-[var(--xr-accent-soft)] ring-1 ring-emerald-500/50"
                      )}
                    >
                      <FlagIcon code={l.code} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              aria-label={theme === "dark" ? accessibility.light : accessibility.dark}
              title={theme === "dark" ? accessibility.lightTitle : accessibility.darkTitle}
              onClick={toggleTheme}
              className="group grid h-10 w-10 shrink-0 place-items-center rounded-full border xr-line bg-[var(--xr-surface)] text-[var(--xr-ink)] shadow-[0_8px_28px_-18px_rgba(0,0,0,.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--xr-accent-soft)]"
            >
              <span className="relative grid place-items-center">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="sr-only">{theme === "dark" ? accessibility.lightTitle : accessibility.darkTitle}</span>
              </span>
            </button>

            <CartFloatingButton />

            <EmberButton
              href="/#quote"
              className="hidden min-h-9 px-4 py-2 text-[8px] md:inline-flex"
            >
              {t(UI.navLaunchAnalyze)}
            </EmberButton>

            <button
              type="button"
              aria-label={accessibility.menu}
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
              <span className="label-mono text-[7px] tracking-[.2em] xr-muted-2">
                {t({ fr: "NOS SERVICES & TARIFS", en: "OUR SERVICES & PRICING", vi: "DỊCH VỤ & BẢNG GIÁ", ar: "خدماتنا وأسعارنا", ru: "УСЛУГИ И ЦЕНЫ" })}
              </span>
              <Link
                to="/services"
                onClick={() => setOpen(false)}
                className="label-mono text-[7px] font-semibold xr-accent underline"
              >
                {t({ fr: "Tout voir", en: "View all", vi: "Xem tất cả", ar: "عرض الكل", ru: "Смотреть все" })}
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
                {t(UI.navWork)}
              </a>
              <a
                href="/recrutement"
                onClick={() => setOpen(false)}
                className="rounded-xl border xr-line bg-[var(--xr-surface)] p-2.5 text-center text-[9px] font-semibold text-[var(--xr-ink)]"
              >
                {t(UI.navAffiliation)}
              </a>
              <a
                href="/#audit"
                onClick={() => setOpen(false)}
                className="rounded-xl border xr-line bg-[var(--xr-surface)] p-2.5 text-center text-[9px] font-semibold text-[var(--xr-ink)]"
              >
                {t({ fr: "Audit gratuit", en: "Free audit", vi: "Audit miễn phí", ar: "تدقيق مجاني", ru: "Бесплатный аудит" })}
              </a>
              <a
                href="/#faq"
                onClick={() => setOpen(false)}
                className="rounded-xl border xr-line bg-[var(--xr-surface)] p-2.5 text-center text-[9px] font-semibold text-[var(--xr-ink)]"
              >
                {t(UI.navFaq)}
              </a>
            </div>

            <div className="mt-3 flex items-center justify-end border-t xr-line pt-3">
              <div className="flex flex-col items-center">
                <span className="label-mono mb-1.5 block text-[6px] xr-muted-2">{t({ fr: "THÈME", en: "THEME", vi: "GIAO DIỆN", ar: "المظهر", ru: "ТЕМА" })}</span>
                <button
                  type="button"
                  aria-label={theme === "dark" ? accessibility.light : accessibility.dark}
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
