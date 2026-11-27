import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  X,
  Monitor,
  Palette,
  Search,
  MapPinned,
  Share2,
  ShieldCheck,
  Bot,
  ArrowRight,
  UserRound,
  Globe2,
  Calculator,
  Sparkles,
  HelpCircle,
  Layers,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { LANGS, useLang, type Lang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SERVICES } from "@/lib/content";
import { CANONICAL_SERVICE_URLS, getPeriodShortLabel } from "@/lib/catalog";
import { Logo } from "./primitives";
import { CartFloatingButton } from "./Cart";
import { XR_PHOTOS } from "@/lib/photography";

const IDS = [
  "websites",
  "branding",
  "seo",
  "maps",
  "social",
  "maintenance",
  "robotics",
  "crm",
] as const;

const ICONS = {
  websites: Monitor,
  branding: Palette,
  seo: Search,
  maps: MapPinned,
  social: Share2,
  maintenance: ShieldCheck,
  robotics: Bot,
  crm: Layers,
};

function FlagIcon({ code }: { code: string }) {
  const common = {
    width: 18,
    height: 12,
    viewBox: "0 0 30 20",
    role: "img" as const,
    focusable: "false" as const,
    className: "block shrink-0 overflow-hidden rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,.18)]",
  };
  if (code === "fr")
    return (
      <svg {...common} aria-label="Français">
        <rect width="10" height="20" fill="#1b3f8b" />
        <rect x="10" width="10" height="20" fill="#fff" />
        <rect x="20" width="10" height="20" fill="#ed2939" />
      </svg>
    );
  if (code === "en")
    return (
      <svg {...common} aria-label="English">
        <rect width="30" height="20" fill="#17336b" />
        <path d="M0 0 30 20 M30 0 0 20" stroke="#fff" strokeWidth="4.5" />
        <path d="M0 0 30 20 M30 0 0 20" stroke="#c8102e" strokeWidth="1.8" />
        <path d="M15 0 V20 M0 10 H30" stroke="#fff" strokeWidth="7" />
        <path d="M15 0 V20 M0 10 H30" stroke="#c8102e" strokeWidth="3.5" />
      </svg>
    );
  if (code === "vi")
    return (
      <svg {...common} aria-label="Tiếng Việt">
        <rect width="30" height="20" fill="#da251d" />
        <path
          d="m15 3 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7Z"
          fill="#ffdf00"
        />
      </svg>
    );
  if (code === "ar")
    return (
      <svg {...common} aria-label="العربية">
        <rect width="30" height="20" fill="#006c35" />
        <path d="M6 12.4 H21.5" stroke="#fff" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M8 10.7 H21.5" stroke="#fff" strokeWidth=".8" strokeLinecap="round" />
        <path d="M7 13.8 H22" stroke="#fff" strokeWidth=".65" strokeLinecap="round" />
      </svg>
    );
  if (code === "ru")
    return (
      <svg {...common} aria-label="Русский">
        <rect width="30" height="6.67" fill="#fff" />
        <rect y="6.67" width="30" height="6.66" fill="#2457a7" />
        <rect y="13.33" width="30" height="6.67" fill="#d52b1e" />
      </svg>
    );
  return (
    <svg {...common} aria-label="Language">
      <rect width="30" height="20" fill="#e5e7eb" />
    </svg>
  );
}

const NAV_COPY: Record<
  Lang,
  {
    home: string;
    expertises: string;
    work: string;
    method: string;
    agency: string;
    international: string;
    resources: string;
    affiliation: string;
    recruitment: string;
    clientSpace: string;
    contact: string;
    faq: string;
    auditTool: string;
    mapsTool: string;
    quoteTool: string;
    quoteCta: string;
    catalogTag: string;
    menu: string;
    chooseLanguage: string;
    langPrefix: string;
    mobileServicesTitle: string;
    viewAll: string;
  }
> = {
  fr: {
    home: "Accueil",
    expertises: "Expertises",
    work: "Réalisations",
    method: "Méthode",
    agency: "L’Agence",
    international: "International",
    resources: "Ressources",
    affiliation: "Affiliation",
    recruitment: "Recrutement",
    clientSpace: "Espace client",
    contact: "Contact",
    faq: "FAQ",
    auditTool: "Diagnostic digital (5 piliers)",
    mapsTool: "Simulateur Google Maps",
    quoteTool: "Devis en 3 étapes",
    quoteCta: "Devis personnalisé",
    catalogTag: "XRAGENCY · NOS EXPERTISES",
    menu: "Ouvrir le menu",
    chooseLanguage: "Choisir la langue",
    langPrefix: "Langue : ",
    mobileServicesTitle: "NOS SERVICES & TARIFS",
    viewAll: "Tout voir",
  },
  en: {
    home: "Home",
    expertises: "Expertise",
    work: "Work",
    method: "Method",
    agency: "The Agency",
    international: "International",
    resources: "Resources",
    affiliation: "Partners",
    recruitment: "Careers",
    clientSpace: "Client portal",
    contact: "Contact",
    faq: "FAQ",
    auditTool: "Digital assessment (5 pillars)",
    mapsTool: "Google Maps simulator",
    quoteTool: "3-step quote configurator",
    quoteCta: "Request a quote",
    catalogTag: "XRAGENCY · OUR EXPERTISE",
    menu: "Open menu",
    chooseLanguage: "Choose language",
    langPrefix: "Language: ",
    mobileServicesTitle: "OUR SERVICES & RATES",
    viewAll: "View all",
  },
  vi: {
    home: "Trang chủ",
    expertises: "Chuyên môn",
    work: "Dự án",
    method: "Phương pháp",
    agency: "Về Agency",
    international: "Quốc tế",
    resources: "Tài nguyên",
    affiliation: "Đối tác",
    recruitment: "Tuyển dụng",
    clientSpace: "Cổng khách hàng",
    contact: "Liên hệ",
    faq: "Câu hỏi thường gặp",
    auditTool: "Đánh giá kỹ thuật số (5 trụ cột)",
    mapsTool: "Mô phỏng Google Maps",
    quoteTool: "Báo giá 3 bước",
    quoteCta: "Yêu cầu báo giá",
    catalogTag: "XRAGENCY · CHUYÊN MÔN",
    menu: "Mở menu",
    chooseLanguage: "Chọn ngôn ngữ",
    langPrefix: "Ngôn ngữ: ",
    mobileServicesTitle: "DỊCH VỤ & BẢNG GIÁ",
    viewAll: "Xem tất cả",
  },
  ar: {
    home: "الرئيسية",
    expertises: "الخبرات",
    work: "الأعمال",
    method: "المنهجية",
    agency: "الوكالة",
    international: "دولي",
    resources: "الموارد",
    affiliation: "الشركاء",
    recruitment: "التوظيف",
    clientSpace: "بوابة العميل",
    contact: "تواصل",
    faq: "الأسئلة الشائعة",
    auditTool: "التشخيص الرقمي (5 محاور)",
    mapsTool: "محاكي خرائط Google",
    quoteTool: "عرض سعر في 3 خطوات",
    quoteCta: "طلب عرض سعر",
    catalogTag: "XRAGENCY · خبراتنا",
    menu: "فتح القائمة",
    chooseLanguage: "اختيار اللغة",
    langPrefix: "اللغة: ",
    mobileServicesTitle: "خدماتنا وأسعارنا",
    viewAll: "عرض الكل",
  },
  ru: {
    home: "Главная",
    expertises: "Компетенции",
    work: "Проекты",
    method: "Метод",
    agency: "Агентство",
    international: "Международное",
    resources: "Ресурсы",
    affiliation: "Партнёры",
    recruitment: "Карьера",
    clientSpace: "Кабинет клиента",
    contact: "Контакты",
    faq: "FAQ",
    auditTool: "Цифровая диагностика (5 сфер)",
    mapsTool: "Симулятор Google Maps",
    quoteTool: "Смета за 3 шага",
    quoteCta: "Запросить смету",
    catalogTag: "XRAGENCY · КОМПЕТЕНЦИИ",
    menu: "Открыть меню",
    chooseLanguage: "Выбрать язык",
    langPrefix: "Язык: ",
    mobileServicesTitle: "УСЛУГИ И ТАРИФЫ",
    viewAll: "Смотреть все",
  },
};

export function Nav() {
  const { t, lang, setLang, price } = useLang();
  const c = NAV_COPY[lang] ?? NAV_COPY.fr;
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLanguageOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setResourcesOpen(false);
        setLanguageOpen(false);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const hrefFor = (id: string) => CANONICAL_SERVICE_URLS[id] ?? `/services/${id}`;

  return (
    <header
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-[#EBE5DC] bg-white/95 text-[#1A1815] shadow-sm backdrop-blur-xl transition-all duration-300",
        scrolled && "shadow-[0_4px_24px_rgba(26,24,21,0.06)]"
      )}
    >
      <div className="mx-auto max-w-[1540px] px-4 sm:px-8 lg:px-10">
        <nav
          aria-label="Navigation principale"
          className="relative flex min-h-[64px] items-center justify-between gap-3 py-2 text-[#1A1815]"
        >
          <Link
            to="/"
            aria-label="XR AGENCY. — Accueil"
            className="group inline-flex items-center py-1 transition-opacity duration-200 hover:opacity-80"
          >
            <span className="font-sans text-[12px] sm:text-[13px] font-semibold tracking-[0.24em] uppercase text-black select-none">
              XR AGENCY.
            </span>
          </Link>

          {/* Desktop Center Navigation Links */}
          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex px-2 xl:px-4">
            <div className="flex items-center gap-0.5 lg:gap-1 xl:gap-2">
              {/* 1. Accueil */}
              <Link
                to="/"
                className={cn(
                  "relative whitespace-nowrap px-2.5 py-1.5 text-xs xl:text-[13px] font-medium tracking-[0.01em] transition",
                  isHome ? "text-[#1A1815] font-semibold" : "text-[#5C554B] hover:text-[#1A1815]",
                )}
              >
                {c.home}
                {isHome && (
                  <span className="absolute inset-x-3 bottom-0.5 h-[2px] rounded-full bg-[#A67C40]" />
                )}
              </Link>

              {/* 2. Expertises v */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (timer.current) clearTimeout(timer.current);
                  setServicesOpen(true);
                }}
                onMouseLeave={() => {
                  timer.current = setTimeout(() => setServicesOpen(false), 180);
                }}
              >
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((v) => !v)}
                  className={cn(
                    "inline-flex items-center gap-1 whitespace-nowrap px-3 py-2 text-[13px] font-medium tracking-[0.01em] transition",
                    location.pathname.startsWith("/services")
                      ? "text-[#A67C40] font-semibold"
                      : "text-[#5C554B] hover:text-[#1A1815]",
                  )}
                >
                  {c.expertises}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-[#A67C40] transition-transform duration-200",
                      servicesOpen && "rotate-180",
                    )}
                  />
                </button>

                {servicesOpen && (
                  <div className="fixed left-1/2 -translate-x-1/2 top-[64px] w-[min(1040px,calc(100vw-2rem))] max-w-[1040px] rounded-2xl border border-[#E8E2D8] bg-white/98 backdrop-blur-2xl p-5 sm:p-6 text-[#1A1815] shadow-[0_24px_70px_rgba(26,24,21,0.14)] animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="mb-4 flex items-center justify-between border-b border-[#EBE5DC] pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="h-px w-7 bg-[#A67C40]" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A67C40]">
                          {c.catalogTag}
                        </span>
                      </div>
                      <Link
                        to="/services"
                        onClick={() => setServicesOpen(false)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A67C40] hover:text-[#1A1815] transition"
                      >
                        {t(UI.navFullCatalog)}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                      {IDS.map((id) => {
                        const s = SERVICES.find((x) => x.id === id);
                        const I = ICONS[id];
                        if (!s) return null;
                        const periodTxt = getPeriodShortLabel(s.fromPeriod, lang);
                        return (
                          <Link
                            key={id}
                            to={hrefFor(id) as "/services"}
                            onClick={() => setServicesOpen(false)}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#EBE5DC] bg-[#FAF8F5] p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-[#A67C40] hover:bg-white hover:shadow-md"
                          >
                            <div>
                              <div className="mb-3 flex items-center justify-between">
                                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#A67C40]/10 text-[#A67C40] transition-colors group-hover:bg-[#A67C40] group-hover:text-white">
                                  <I className="h-4 w-4" />
                                </span>
                                <img
                                  src={XR_PHOTOS[id]}
                                  alt=""
                                  loading="lazy"
                                  className="h-9 w-14 rounded-md object-cover border border-[#E8E2D8]"
                                />
                              </div>
                              <span className="block text-xs font-bold text-[#1A1815] group-hover:text-[#A67C40] transition-colors">
                                {t(s.title)}
                              </span>
                              <span className="mt-1 line-clamp-2 block text-[11px] leading-4 text-[#5C554B]">
                                {t(s.short)}
                              </span>
                            </div>
                            <div className="mt-3 flex items-center justify-between border-t border-[#EBE5DC] pt-2">
                              <span className="text-[10px] text-[#8C8274]">
                                {t(UI.navFromPrice)}
                              </span>
                              <span className="font-mono text-[11px] font-bold text-[#A67C40]">
                                {price(s.fromEur)}
                                {periodTxt ? ` ${periodTxt}` : ""}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Réalisations */}
              <Link
                to="/work"
                className={cn(
                  "whitespace-nowrap px-3 py-2 text-[13px] font-medium tracking-[0.01em] transition",
                  location.pathname === "/work"
                    ? "text-[#A67C40] font-semibold"
                    : "text-[#5C554B] hover:text-[#1A1815]",
                )}
              >
                {c.work}
              </Link>

              {/* 4. Méthode */}
              <Link
                to="/methode"
                className={cn(
                  "whitespace-nowrap px-3 py-2 text-[13px] font-medium tracking-[0.01em] transition",
                  location.pathname === "/methode"
                    ? "text-[#A67C40] font-semibold"
                    : "text-[#5C554B] hover:text-[#1A1815]",
                )}
              >
                {c.method}
              </Link>

              {/* 5. L'Agence */}
              <Link
                to="/notre-histoire"
                className={cn(
                  "whitespace-nowrap px-3 py-2 text-[13px] font-medium tracking-[0.01em] transition",
                  location.pathname === "/notre-histoire"
                    ? "text-[#A67C40] font-semibold"
                    : "text-[#5C554B] hover:text-[#1A1815]",
                )}
              >
                {c.agency}
              </Link>

              {/* 6. International */}
              <Link
                to="/international"
                className={cn(
                  "inline-flex items-center gap-1 whitespace-nowrap px-3 py-2 text-[13px] font-medium tracking-[0.01em] transition",
                  location.pathname === "/international"
                    ? "text-[#A67C40] font-semibold"
                    : "text-[#5C554B] hover:text-[#1A1815]",
                )}
              >
                {c.international}
                <ChevronDown className="h-3.5 w-3.5 text-[#A67C40]" />
              </Link>

              {/* 7. Ressources v */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (resTimer.current) clearTimeout(resTimer.current);
                  setResourcesOpen(true);
                }}
                onMouseLeave={() => {
                  resTimer.current = setTimeout(() => setResourcesOpen(false), 180);
                }}
              >
                <button
                  type="button"
                  aria-expanded={resourcesOpen}
                  onClick={() => setResourcesOpen((v) => !v)}
                  className="inline-flex items-center gap-1 whitespace-nowrap px-3 py-2 text-[13px] font-medium tracking-[0.01em] text-[#5C554B] transition hover:text-[#1A1815]"
                >
                  {c.resources}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-[#A67C40] transition-transform duration-200",
                      resourcesOpen && "rotate-180",
                    )}
                  />
                </button>

                {resourcesOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-[#D8B788]/25 bg-[#15120E] p-2.5 text-[#FAF7F2] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
                    <a
                      href="/#audit"
                      onClick={() => setResourcesOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-medium text-white/90 transition hover:bg-white/5 hover:text-[#D8B788]"
                    >
                      <Sparkles className="h-4 w-4 text-[#D8B788]" />
                      <span>{c.auditTool}</span>
                    </a>
                    <a
                      href="/#maps-simulator"
                      onClick={() => setResourcesOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-medium text-white/90 transition hover:bg-white/5 hover:text-[#D8B788]"
                    >
                      <MapPinned className="h-4 w-4 text-[#D8B788]" />
                      <span>{c.mapsTool}</span>
                    </a>
                    <a
                      href="/#quote"
                      onClick={() => setResourcesOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-medium text-white/90 transition hover:bg-white/5 hover:text-[#D8B788]"
                    >
                      <Calculator className="h-4 w-4 text-[#D8B788]" />
                      <span>{c.quoteTool}</span>
                    </a>
                    <div className="my-1.5 h-px bg-white/10" />
                    <Link
                      to="/faq"
                      onClick={() => setResourcesOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-white/80 transition hover:bg-white/5 hover:text-white"
                    >
                      <HelpCircle className="h-4 w-4 text-[#D8B788]/80" />
                      <span>{c.faq}</span>
                    </Link>
                    <Link
                      to="/affiliation"
                      onClick={() => setResourcesOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-white/80 transition hover:bg-white/5 hover:text-white"
                    >
                      <span>{c.affiliation}</span>
                    </Link>
                    <Link
                      to="/recrutement"
                      onClick={() => setResourcesOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-white/80 transition hover:bg-white/5 hover:text-white"
                    >
                      <span>{c.recruitment}</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setResourcesOpen(false)}
                      className="mt-1 flex items-center gap-2.5 rounded-xl border border-[#D8B788]/25 bg-[#D8B788]/10 px-3 py-2 text-xs font-semibold text-[#D8B788] transition hover:bg-[#D8B788]/20"
                    >
                      <UserRound className="h-4 w-4" />
                      <span>{c.clientSpace}</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Controls matching mockup: 🌐 FR v + Gold Demander un devis → */}
          <div className="flex shrink-0 items-center gap-2.5">
            {/* Language Switcher with Flag */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                aria-label={c.chooseLanguage}
                aria-expanded={languageOpen}
                onClick={() => setLanguageOpen((v) => !v)}
                className="flex h-9 items-center gap-2 rounded-full border border-[#E5E0D8] bg-[#FAF8F5] px-3 text-xs font-semibold text-[#1A1815] transition hover:border-[#D1B07A] hover:bg-white shadow-sm"
              >
                <FlagIcon code={lang} />
                <span className="uppercase text-[11px] font-mono">{lang}</span>
                <ChevronDown
                  className={cn(
                    "h-3 w-3 text-[#5C554B] transition-transform",
                    languageOpen && "rotate-180",
                  )}
                />
              </button>

              {languageOpen && (
                <div className="absolute end-0 top-full z-[80] mt-2 w-48 rounded-2xl border border-[#EBE5DC] bg-white p-2 text-[#1A1815] shadow-[0_12px_36px_rgba(20,16,11,0.12)] animate-in fade-in slide-in-from-top-2">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      aria-label={c.langPrefix + l.label}
                      aria-pressed={lang === l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLanguageOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-start text-xs font-medium transition",
                        lang === l.code
                          ? "bg-[#FAF8F5] font-semibold text-[#A67C40]"
                          : "text-[#423C34] hover:bg-[#F5F2EB] hover:text-[#1A1815]",
                      )}
                    >
                      <FlagIcon code={l.code} />
                      <span className="flex-1">{l.label}</span>
                      {lang === l.code && <span className="h-1.5 w-1.5 rounded-full bg-[#A67C40]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <CartFloatingButton />

            {/* Mobile Compact Quote CTA */}
            <a
              href="/#quote"
              onClick={(e) => {
                if (isHome && document.getElementById("quote")) {
                  e.preventDefault();
                  document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex h-8 items-center rounded-full bg-[#1A1815] px-3.5 text-[11px] font-bold text-white shadow-sm sm:hidden"
            >
              Devis
            </a>

            {/* Warm Champagne Gold CTA Button */}
            <a
              href="/#quote"
              onClick={(e) => {
                if (isHome && document.getElementById("quote")) {
                  e.preventDefault();
                  document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="hidden min-h-9 items-center gap-2 whitespace-nowrap rounded-full bg-[#1A1815] px-5 py-2 text-[12.5px] font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#332F2B] hover:scale-[1.02] active:scale-[0.98] sm:inline-flex"
            >
              <span>{c.quoteCta}</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#E5C696] rtl:rotate-180" />
            </a>

            <button
              type="button"
              aria-label={c.menu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#EBE5DC] bg-[#FAF8F5] text-[#1A1815] lg:hidden"
            >
              {open ? (
                <X className="h-4 w-4" />
              ) : (
                <span className="space-y-1.5">
                  <span className="block h-[1.5px] w-4 bg-current" />
                  <span className="block h-[1.5px] w-4 bg-current" />
                </span>
              )}
            </button>
          </div>

          {/* Reading progress hairline */}
          <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-[1.5px] overflow-hidden opacity-75">
            <div
              className="h-full origin-left bg-[#A67C40] transition-transform duration-150 rtl:origin-right"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </nav>

        {/* Mobile Drawer */}
        {open && (
          <div className="mb-4 mt-2 max-h-[calc(100svh-85px)] overflow-y-auto rounded-3xl border border-[#EBE5DC] bg-white p-5 text-[#1A1815] shadow-[0_20px_50px_rgba(20,16,11,0.18)] lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#F0EBE3] pb-3.5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A67C40]" />
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#A67C40]">
                  {c.mobileServicesTitle}
                </span>
              </div>
              <Link
                to="/services"
                onClick={() => setOpen(false)}
                className="font-mono text-[11px] font-semibold text-[#A67C40] hover:underline"
              >
                {c.viewAll} →
              </Link>
            </div>

            {/* Charming Luxury Service Cards */}
            <div className="mt-3.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {IDS.map((id, i) => {
                const s = SERVICES.find((x) => x.id === id);
                const I = ICONS[id];
                if (!s) return null;
                const periodTxt = getPeriodShortLabel(s.fromPeriod, lang);
                return (
                  <Link
                    key={id}
                    to={hrefFor(id) as "/services"}
                    onClick={() => setOpen(false)}
                    className="group flex min-h-[52px] items-center justify-between rounded-2xl border border-[#EBE5DC] bg-[#FAF8F5] px-3.5 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#A67C40] hover:bg-white hover:shadow-md active:scale-[.99]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] font-bold text-[#A67C40] rounded-md bg-[#A67C40]/10 px-1.5 py-0.5">
                        0{i + 1}
                      </span>
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-white border border-[#EBE5DC] text-[#A67C40] shadow-2xs group-hover:bg-[#1A1815] group-hover:text-[#E5C696] group-hover:border-[#1A1815] transition-colors">
                        <I className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-semibold text-xs text-[#1A1815] group-hover:text-[#A67C40] transition-colors">
                        {t(s.title)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] font-bold text-[#A67C40]">
                        {price(s.fromEur)}
                        {periodTxt ? ` ${periodTxt}` : ""}
                      </span>
                      <ArrowUpRight className="h-3 w-3 text-[#A67C40]/60 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Navigation Secondary Links */}
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#F0EBE3] pt-4">
              <Link
                to="/realisations"
                onClick={() => setOpen(false)}
                className="flex min-h-10 items-center justify-center rounded-xl border border-[#EBE5DC] bg-[#FAF8F5] px-3 text-xs font-semibold text-[#423C34] hover:bg-white hover:border-[#A67C40] hover:text-[#1A1815] transition"
              >
                {c.work}
              </Link>
              <Link
                to="/notre-histoire"
                onClick={() => setOpen(false)}
                className="flex min-h-10 items-center justify-center rounded-xl border border-[#EBE5DC] bg-[#FAF8F5] px-3 text-xs font-semibold text-[#423C34] hover:bg-white hover:border-[#A67C40] hover:text-[#1A1815] transition"
              >
                {c.agency}
              </Link>
              <Link
                to="/methode"
                onClick={() => setOpen(false)}
                className="flex min-h-10 items-center justify-center rounded-xl border border-[#EBE5DC] bg-[#FAF8F5] px-3 text-xs font-semibold text-[#423C34] hover:bg-white hover:border-[#A67C40] hover:text-[#1A1815] transition"
              >
                {c.method}
              </Link>
              <Link
                to="/international"
                onClick={() => setOpen(false)}
                className="flex min-h-10 items-center justify-center rounded-xl border border-[#EBE5DC] bg-[#FAF8F5] px-3 text-xs font-semibold text-[#423C34] hover:bg-white hover:border-[#A67C40] hover:text-[#1A1815] transition"
              >
                {c.international}
              </Link>
              <Link
                to="/affiliation"
                onClick={() => setOpen(false)}
                className="flex min-h-10 items-center justify-center rounded-xl border border-[#EBE5DC] bg-[#FAF8F5] px-3 text-xs font-semibold text-[#423C34] hover:bg-white hover:border-[#A67C40] hover:text-[#1A1815] transition"
              >
                {c.affiliation}
              </Link>
              <Link
                to="/recrutement"
                onClick={() => setOpen(false)}
                className="flex min-h-10 items-center justify-center rounded-xl border border-[#EBE5DC] bg-[#FAF8F5] px-3 text-xs font-semibold text-[#423C34] hover:bg-white hover:border-[#A67C40] hover:text-[#1A1815] transition"
              >
                {c.recruitment}
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex min-h-10 items-center justify-center rounded-xl border border-[#EBE5DC] bg-[#FAF8F5] px-3 text-xs font-semibold text-[#423C34] hover:bg-white hover:border-[#A67C40] hover:text-[#1A1815] transition"
              >
                {c.contact}
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-[#A67C40]/30 bg-[#FAF8F5] px-3 text-xs font-semibold text-[#A67C40] hover:bg-[#A67C40]/10 transition"
              >
                <UserRound className="h-3.5 w-3.5" />
                {c.clientSpace}
              </Link>
            </div>

            {/* High-Converting Action Dual Buttons */}
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 border-t border-[#F0EBE3] pt-4">
              <a
                href="https://wa.me/33649219808?text=Bonjour%20XRAGENCY%2C%20je%20souhaite%20r%C3%A9server%20un%20appel%20strat%C3%A9gique%20au%20sujet%20de%20mon%20projet."
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#1A1815] bg-white px-4 text-xs font-bold text-[#1A1815] shadow-xs hover:bg-[#FAF8F5] transition"
              >
                <Phone className="h-3.5 w-3.5 text-[#A67C40]" />
                <span>📞 Réserver un appel</span>
              </a>

              <a
                href="/#quote"
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1A1815] px-4 text-xs font-bold text-white shadow-md hover:bg-[#332F2B] transition"
              >
                <span>{c.quoteCta}</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#E5C696] rtl:rotate-180" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
