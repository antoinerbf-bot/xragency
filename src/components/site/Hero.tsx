import { useEffect, useState } from "react";
import { ArrowRight, BarChart3, Layers3, Play, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang, type Lang } from "@/lib/i18n";

interface CityHub {
  id: string;
  name: Record<Lang, string>;
  country: Record<Lang, string>;
  timezone: string;
  image: string;
  position?: string;
  video?: string;
  tagline: Record<Lang, string>;
  status: Record<Lang, string>;
}

const HUBS: CityHub[] = [
  {
    id: "paris",
    name: { fr: "Paris", en: "Paris", vi: "Paris", ar: "باريس", ru: "Париж" },
    country: { fr: "France", en: "France", vi: "Pháp", ar: "فرنسا", ru: "Франция" },
    timezone: "Europe/Paris",
    image: "/showcase/home-v3/hub-paris.jpg",
    position: "object-[center_40%]",
    tagline: {
      fr: "Direction artistique, stratégie de marque & production haute couture.",
      en: "Art direction, brand strategy & haute couture digital production.",
      vi: "Định hướng nghệ thuật, chiến lược thương hiệu & sản xuất số cao cấp.",
      ar: "الإدارة الفنية، استراتيجية العلامة التجارية والإنتاج الرقمي الراقي.",
      ru: "Арт-дирекшн, стратегия бренда и премиальное digital-производство.",
    },
    status: {
      fr: "Studio actif · Équipe en production",
      en: "Active studio · Production running",
      vi: "Studio đang hoạt động",
      ar: "استوديو نشط",
      ru: "Студия активна",
    },
  },
  {
    id: "dubai",
    name: { fr: "Dubaï", en: "Dubai", vi: "Dubai", ar: "دبي", ru: "Дубай" },
    country: {
      fr: "Émirats arabes unis",
      en: "United Arab Emirates",
      vi: "Các Tiểu vương quốc Ả Rập Thống nhất",
      ar: "الإمارات العربية المتحدة",
      ru: "Объединённые Арабские Эмираты",
    },
    timezone: "Asia/Dubai",
    image: "/showcase/home-v3/hub-dubai.jpg",
    position: "object-center",
    tagline: {
      fr: "Solutions IA avancées, automatisation & expériences immersives de luxe.",
      en: "Advanced AI solutions, automation & luxury immersive experiences.",
      vi: "Giải pháp AI tiên tiến, tự động hóa & trải nghiệm nhập vai cao cấp.",
      ar: "حلول الذكاء الاصطناعي المتقدمة والأتمتة والتجارب الغامرة الفاخرة.",
      ru: "Передовые ИИ-решения, автоматизация и иммерсивный премиум-опыт.",
    },
    status: {
      fr: "Pôle IA & Croissance · En direct",
      en: "AI & Growth Hub · Live",
      vi: "Trung tâm AI & Tăng trưởng",
      ar: "مركز الذكاء والنمو",
      ru: "ИИ-хаб · В эфире",
    },
  },
  {
    id: "newyork",
    name: { fr: "New York", en: "New York", vi: "New York", ar: "نيويورك", ru: "Нью-Йорк" },
    country: {
      fr: "États-Unis",
      en: "United States",
      vi: "Hoa Kỳ",
      ar: "الولايات المتحدة",
      ru: "США",
    },
    timezone: "America/New_York",
    image: "/showcase/home-v3/hub-newyork.jpg",
    position: "object-center",
    tagline: {
      fr: "Direction artistique transatlantique, e-commerce d'envergure & créativité avant-gardiste.",
      en: "Transatlantic creative direction, high-scale digital commerce & avant-garde design.",
      vi: "Chỉ đạo nghệ thuật toàn cầu, thương mại điện tử quy mô lớn & thiết kế tiên phong.",
      ar: "الإشراف الفني العالمي، التجارة الرقمية الكبرى والتصميم الريادي.",
      ru: "Трансатлантический арт-дирекшн, масштабный e-commerce и передовой дизайн.",
    },
    status: {
      fr: "Studio Créatif Amériques · Connecté",
      en: "Americas Creative Hub · Connected",
      vi: "Studio Châu Mỹ · Trực tuyến",
      ar: "استوديو الأمريكتين",
      ru: "Американский хаб · На связи",
    },
  },
  {
    id: "danang",
    name: { fr: "Da Nang", en: "Da Nang", vi: "Đà Nẵng", ar: "دا نانغ", ru: "Дананг" },
    country: { fr: "Vietnam", en: "Vietnam", vi: "Việt Nam", ar: "فيتنام", ru: "Вьетнам" },
    timezone: "Asia/Ho_Chi_Minh",
    image: "/showcase/home-v3/hub-danang.jpg",
    position: "object-[center_28%]",
    tagline: {
      fr: "Ingénierie web réactive, montage vidéo cinématographique & support 24/7.",
      en: "Responsive web engineering, cinematic video editing & 24/7 delivery.",
      vi: "Kỹ thuật web tối ưu, dựng video điện ảnh & hỗ trợ 24/7.",
      ar: "هندسة الويب السريعة، المونتاج السينمائي والدعم المتواصل.",
      ru: "Веб-инженерия, кинематографичный монтаж и круглосуточная поддержка.",
    },
    status: {
      fr: "Coastal Studio · 24/7 Hub",
      en: "Coastal Studio · 24/7 Hub",
      vi: "Studio ven biển · Vận hành 24/7",
      ar: "استوديو ساحلي",
      ru: "Прибрежная студия",
    },
  },
];

const COPY = {
  fr: {
    eyebrow: "★ STUDIO DIGITAL HAUTE COUTURE · LIVRAISON EN 10 JOURS",
    titlePart1: "L’art du ",
    titleItalic: "digital",
    titlePart2: "qui fait vendre.",
    sub: "Sites d'exception, domination Google & automatisation IA. Conçus pour convertir immédiatement vos visiteurs en clients fidèles, sans abonnement forcé.",
    ctaPrimary: "🚀 Configurer mon projet en 30s",
    ctaWhatsapp: "💬 WhatsApp Direct (15 min)",
    ctaSecondary: "Nos réalisations",
    modalTitle: "XR AGENCY — SHOWREEL OFFICIEL",
    modalClose: "Fermer",
    scroll: "Découvrir nos offres & simulateur",
  },
  en: {
    eyebrow: "★ BESPOKE DIGITAL STUDIO · 10-DAY TURNKEY DELIVERY",
    titlePart1: "The art of ",
    titleItalic: "digital",
    titlePart2: "that drives revenue.",
    sub: "Prestige websites, Google dominance & AI automation. Engineered to convert visitors into loyal clients, with 0% third-party fees.",
    ctaPrimary: "🚀 Configure my project (30s)",
    ctaWhatsapp: "💬 WhatsApp VIP (15 min)",
    ctaSecondary: "Selected work",
    modalTitle: "XR AGENCY — OFFICIAL SHOWREEL",
    modalClose: "Close",
    scroll: "Explore packages & simulator",
  },
  vi: {
    eyebrow: "★ STUDIO KỸ THUẬT SỐ CAO CẤP · BÀN GIAO TRONG 10 NGÀY",
    titlePart1: "Nghệ thuật ",
    titleItalic: "số",
    titlePart2: "tạo ra doanh thu.",
    sub: "Website đẳng cấp, thống lĩnh Google & tự động hóa AI. Thiết kế để chuyển đổi khách hàng ngay lập tức mà không mất hoa hồng trung gian.",
    ctaPrimary: "🚀 Bắt đầu mô phỏng (30s)",
    ctaWhatsapp: "💬 Chat WhatsApp ngay",
    ctaSecondary: "Dự án tiêu biểu",
    modalTitle: "XR AGENCY — SHOWREEL CHÍNH THỨC",
    modalClose: "Đóng",
    scroll: "Khám phá chuyên môn",
  },
  ar: {
    eyebrow: "وكالة رقمية دولية",
    titlePart1: "فن الحلول ",
    titleItalic: "الرقمية",
    titlePart2: "المصممة خصيصًا.",
    sub: "نجمع الاستراتيجية والتصميم والتطوير والظهور الرقمي لبناء حضور متناسق يخدم نشاطك التجاري.",
    ctaPrimary: "ناقش مشروعك",
    ctaBadge: "",
    ctaSecondary: "منهجيتنا",
    ctaAgency: "أعمال مختارة",
    modalTitle: "XR AGENCY — الفيديو التعريفي",
    modalClose: "إغلاق",
    scroll: "استكشف خدماتنا",
  },
  ru: {
    eyebrow: "МЕЖДУНАРОДНОЕ DIGITAL-АГЕНТСТВО",
    titlePart1: "Искусство ",
    titleItalic: "digital",
    titlePart2: "под ваши задачи.",
    sub: "Стратегия, дизайн, разработка и видимость в сети объединяются в целостное цифровое присутствие для вашего бизнеса.",
    ctaPrimary: "Обсудить проект",
    ctaBadge: "",
    ctaSecondary: "Наш подход",
    ctaAgency: "Избранные проекты",
    modalTitle: "XR AGENCY — ОФИЦИАЛЬНЫЙ ШОУРИЛ",
    modalClose: "Закрыть",
    scroll: "Смотреть услуги",
  },
};

const PILLARS = [
  {
    icon: BarChart3,
    label: {
      fr: "Stratégie & Conseil",
      en: "Strategy & Advisory",
      vi: "Chiến lược & Tư vấn",
      ar: "الاستراتيجية والاستشارات",
      ru: "Стратегия и консалтинг",
    },
  },
  {
    icon: Play,
    label: {
      fr: "Production Créative",
      en: "Creative Production",
      vi: "Sản xuất Sáng tạo",
      ar: "الإنتاج الإبداعي",
      ru: "Креативное производство",
    },
  },
  {
    icon: Layers3,
    label: {
      fr: "Acquisition & Visibilité",
      en: "Acquisition & SEO",
      vi: "Thu hút & Hiển thị",
      ar: "الاستحواذ والظهور",
      ru: "Привлечение и видимость",
    },
  },
  {
    icon: Sparkles,
    label: {
      fr: "Automatisation & IA",
      en: "Automation & AI",
      vi: "Tự động hóa & AI",
      ar: "الأتمتة والذكاء",
      ru: "Автоматизация и ИИ",
    },
  },
];

function useCityTime(timezone: string) {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const update = () => {
      try {
        const str = new Intl.DateTimeFormat("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: timezone,
        }).format(new Date());
        setTime(str);
      } catch {
        setTime("--:--");
      }
    };
    update();
    const interval = setInterval(update, 15000);
    return () => clearInterval(interval);
  }, [timezone]);
  return time;
}

export function Hero() {
  const { lang } = useLang();
  const c = COPY[lang] ?? COPY.fr;
  const [activeHubIndex, setActiveHubIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHubIndex((prev) => (prev + 1) % HUBS.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const activeHub = HUBS[activeHubIndex];

  return (
    <section
      id="hero"
      aria-label="XR Agency Hero"
      className="xr-hero-refined relative isolate min-h-[100svh] w-full overflow-hidden bg-[#181512] pt-20 text-[#FAF7F2]"
    >
      {/* ── Multi-Country Photo Sequence (Paris, Dubaï, New York, Da Nang) ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[#181512]">
        {HUBS.map((hub, idx) => {
          const isActive = idx === activeHubIndex;
          return (
            <div
              key={hub.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                isActive
                  ? "opacity-100 z-10 pointer-events-auto"
                  : "opacity-0 z-0 pointer-events-none",
              )}
            >
              <img
                src={hub.image}
                alt={`Studio XRAGENCY à ${hub.name.fr}`}
                fetchPriority={isActive ? "high" : "low"}
                loading={isActive ? "eager" : "lazy"}
                className={cn(
                  "h-full w-full object-cover brightness-[1.08] contrast-[1.04] saturate-[1.05] transition-transform duration-[7000ms] ease-out",
                  hub.position ?? "object-center",
                  isActive ? "scale-105" : "scale-100",
                )}
              />

              {/* Luminous, radiant daylight: airy, bright and crystal clear */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14110E]/50 via-transparent to-black/10 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Top-Right: Discreet Live Hub Indicator (Positioned below fixed navbar) */}
      <div className="absolute top-24 right-5 sm:right-8 lg:right-12 z-30 pointer-events-auto flex items-center gap-2.5">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-3 py-1.5 backdrop-blur-md text-white shadow-lg">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E5C696] animate-pulse" />
          <span className="font-mono text-[11px] font-semibold tracking-wider text-white">
            {activeHub.name[lang] ?? activeHub.name.fr}
          </span>
          <span className="text-white/40">·</span>
          <span className="font-mono text-[10px] text-[#E5C696] uppercase tracking-wider">
            {activeHub.country[lang] ?? activeHub.country.fr}
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-2.5 py-1.5 backdrop-blur-md">
          {HUBS.map((h, i) => (
            <button
              key={h.id}
              type="button"
              onClick={() => setActiveHubIndex(i)}
              aria-label={`Afficher le studio ${h.name.fr}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer pointer-events-auto",
                i === activeHubIndex ? "w-6 bg-[#E5C696]" : "w-1.5 bg-white/40 hover:bg-white/70",
              )}
            />
          ))}
        </div>
      </div>

      {/* ── Content Container ── */}
      <div className="relative z-20 pointer-events-none mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1540px] flex-col justify-end px-5 py-8 sm:px-8 lg:min-h-[calc(100svh-5rem)] lg:px-12 lg:py-10">
        {/* Main Content Area (Compact, Sober Luxury & Discreet) */}
        <div className="max-w-3xl pb-8 sm:pb-12 lg:pb-14 pointer-events-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-3 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E5C696] animate-pulse" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E5C696]">
              {c.eyebrow}
            </span>
          </div>

          <h1 className="mt-3.5 max-w-2xl font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] font-normal leading-[1.12] tracking-[-0.02em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            <span>{c.titlePart1}</span>
            <em className="font-serif italic font-normal text-[#F2D7B0]">{c.titleItalic}</em>{" "}
            <span>{c.titlePart2}</span>
          </h1>

          <p className="mt-3.5 max-w-lg text-xs sm:text-sm leading-relaxed text-white/85 drop-shadow-md">
            {c.sub}
          </p>

          {/* Badges Ludiques & Réassurance Haute Conversion */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-black/45 px-3 py-1 text-[11px] font-bold text-amber-200 backdrop-blur-md shadow-sm">
              <span className="text-amber-400">★★★★★</span> 4.9/5 · +40 marques propulsées
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-black/45 px-3 py-1 text-[11px] font-bold text-emerald-300 backdrop-blur-md shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              ⚡ Livré clé en main en 10j
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/40 bg-black/45 px-3 py-1 text-[11px] font-bold text-rose-300 backdrop-blur-md shadow-sm">
              🔥 Plus que 3 créneaux ce mois-ci
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {/* Primary Action: Sleek Luxury Gold Pill */}
            <a
              href="#quote"
              className="inline-flex min-h-11 items-center gap-3 rounded-full bg-[#E5C696] px-6 text-xs sm:text-sm font-extrabold text-[#17130e] shadow-[0_10px_30px_rgba(229,198,150,0.3)] transition-all duration-300 hover:bg-[#F0D7B1] hover:scale-105 active:scale-95"
            >
              <span>{c.ctaPrimary}</span>
              <ArrowRight className="h-4 w-4 text-black" />
            </a>

            {/* Direct WhatsApp Callout */}
            <a
              href="https://wa.me/33649219808?text=Bonjour%20XR%20Agency%2C%20je%20souhaite%20un%20devis%20ou%20un%20audit%20pour%20mon%20projet."
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-5 text-xs sm:text-sm font-bold text-emerald-300 backdrop-blur-md transition-all duration-300 hover:bg-emerald-500/25 hover:border-emerald-400"
            >
              <span>{c.ctaWhatsapp ?? "💬 WhatsApp (15m)"}</span>
            </a>

            {/* Work Link */}
            <a
              href="#work"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 text-xs sm:text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/70"
            >
              <span>{c.ctaSecondary}</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#E5C696]" />
            </a>
          </div>

          {/* Transparent Price Anchor */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-mono text-white/75">
            <span className="text-white/45">Transparence totale :</span>
            <span className="rounded-lg bg-black/40 border border-white/10 px-2 py-0.5 text-[#E5C696] font-semibold">Sites dès 499 €</span>
            <span className="rounded-lg bg-black/40 border border-white/10 px-2 py-0.5 text-[#E5C696] font-semibold">Google Maps 999 €/an</span>
            <span className="rounded-lg bg-black/40 border border-white/10 px-2 py-0.5 text-[#E5C696] font-semibold">Social 349 €/m</span>
            <span className="rounded-lg bg-black/40 border border-white/10 px-2 py-0.5 text-emerald-300 font-semibold">0% com. tierce</span>
          </div>
        </div>

        {/* Bottom Bar: 4 Pillars */}
        <div className="flex flex-col justify-between gap-6 border-t border-white/20 pt-6 pb-14 sm:pb-0 sm:flex-row sm:items-center">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.label.fr} className="flex items-center gap-3 text-white/90">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#D8B788]/35 bg-[#201A13]/90 text-[#E5C696]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium tracking-wide sm:text-[13px]">
                    {pillar.label[lang] ?? pillar.label.fr}
                  </span>
                </div>
              );
            })}
          </div>

          <a
            href="#services"
            className="hidden items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/70 transition hover:text-[#E5C696] lg:inline-flex"
          >
            <span>{c.scroll}</span>
            <span className="inline-block animate-bounce">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
