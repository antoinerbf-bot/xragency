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
    image: "/showcase/hero-editorial-concept01.jpg",
    position: "object-center",
    tagline: {
      fr: "Direction artistique, stratégie de marque & production web haute couture.",
      en: "Creative direction, brand strategy & haute couture web production.",
      vi: "Định hướng nghệ thuật, chiến lược thương hiệu & sản xuất số cao cấp.",
      ar: "الإدارة الفنية، استراتيجية العلامة التجارية والإنتاج الرقمي الراقي.",
      ru: "Арт-дирекшн, стратегия бренда и премиальное digital-производство.",
    },
    status: {
      fr: "Atelier Paris · Direction Créative",
      en: "Paris Atelier · Creative Direction",
      vi: "Studio Paris · Đang hoạt động",
      ar: "استوديو باريس · نشط",
      ru: "Студия Париж · В работе",
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
    image: "/showcase/hub-dubai-consultants.jpg",
    position: "object-center",
    tagline: {
      fr: "Consultants en stratégie digitale, plateformes e-commerce & automatisation.",
      en: "Digital strategy consultants, bespoke e-commerce & AI automation.",
      vi: "Tư vấn chiến lược số, thương mại điện tử & tự động hóa.",
      ar: "استشارات استراتيجية رقمية، منصات تجارة إلكترونية وأتمتة متقدمة.",
      ru: "Консалтинг по digital-стратегии, e-commerce и автоматизация.",
    },
    status: {
      fr: "Studio Dubaï · Pôle Croissance & Tech",
      en: "Dubai Studio · Growth & Tech",
      vi: "Studio Dubai · Tăng trưởng",
      ar: "استوديو دبي · النمو والتقنية",
      ru: "Студия Дубай · Развитие и технологии",
    },
  },
  {
    id: "singapour",
    name: { fr: "Singapour", en: "Singapore", vi: "Singapore", ar: "سنغافورة", ru: "Сингапур" },
    country: {
      fr: "Singapour",
      en: "Singapore",
      vi: "Singapore",
      ar: "سنغافورة",
      ru: "Сингапур",
    },
    timezone: "Asia/Singapore",
    image: "/showcase/hub-singapore-consultants.jpg",
    position: "object-center",
    tagline: {
      fr: "Pôle Asie-Pacifique, campagnes d'acquisition d'envergure & design biophilique.",
      en: "Asia-Pacific hub, high-scale acquisition campaigns & refined branding.",
      vi: "Trung tâm Châu Á - Thái Bình Dương, chiến dịch mở rộng & thương hiệu.",
      ar: "مركز آسيا والمحيط الهادئ، حملات استقطاب كبرى وتصميم متميز.",
      ru: "Азиатско-Тихоокеанский хаб, масштабирование и брендинг.",
    },
    status: {
      fr: "Studio Singapour · Pôle Asie",
      en: "Singapore Studio · Asia Hub",
      vi: "Studio Singapore · Châu Á",
      ar: "استوديو سنغافورة · آسيا",
      ru: "Студия Сингапур · Азия",
    },
  },
  {
    id: "geneve",
    name: { fr: "Genève", en: "Geneva", vi: "Geneva", ar: "جنيف", ru: "Женева" },
    country: { fr: "Suisse", en: "Switzerland", vi: "Thụy Sĩ", ar: "سويسرا", ru: "Швейцария" },
    timezone: "Europe/Zurich",
    image: "/showcase/hub-meeting-consultants.jpg",
    position: "object-center",
    tagline: {
      fr: "Conseil stratégique de direction, gouvernance numérique & accompagnement de marque.",
      en: "Executive strategy consulting, digital governance & premium brand advisory.",
      vi: "Tư vấn chiến lược cấp cao, quản trị số & định vị thương hiệu.",
      ar: "استشارات استراتيجية تنفيذية، حوكمة رقمية ودعم العلامات التجارية.",
      ru: "Стратегический консалтинг, digital-трансформация и управление брендами.",
    },
    status: {
      fr: "Pôle Suisse · Conseil & Gouvernance",
      en: "Swiss Hub · Strategy & Governance",
      vi: "Studio Thụy Sĩ · Chiến lược",
      ar: "استوديو سويسرا · الاستشارات",
      ru: "Студия Швейцария · Стратегия",
    },
  },
];

const COPY = {
  fr: {
    eyebrow: "AGENCE DIGITALE INTERNATIONALE",
    titlePart1: "L’art du ",
    titleItalic: "digital",
    titlePart2: "sur mesure.",
    sub: "Nous réunissons stratégie, design, développement et visibilité pour construire une présence digitale cohérente et utile à votre activité.",
    ctaPrimary: "Parler de mon projet",
    ctaBadge: "",
    ctaSecondary: "Notre méthode",
    ctaAgency: "Nos réalisations",
    modalTitle: "XR AGENCY — SHOWREEL OFFICIEL",
    modalClose: "Fermer",
    scroll: "Découvrir nos expertises",
  },
  en: {
    eyebrow: "INTERNATIONAL DIGITAL AGENCY",
    titlePart1: "The art of ",
    titleItalic: "digital",
    titlePart2: "made to measure.",
    sub: "Strategy, design, development and visibility—combined to build a coherent digital presence that serves your business.",
    ctaPrimary: "Discuss my project",
    ctaBadge: "",
    ctaSecondary: "Our approach",
    ctaAgency: "Selected work",
    modalTitle: "XR AGENCY — OFFICIAL SHOWREEL",
    modalClose: "Close",
    scroll: "Discover our services",
  },
  vi: {
    eyebrow: "AGENCY KỸ THUẬT SỐ QUỐC TẾ",
    titlePart1: "Nghệ thuật ",
    titleItalic: "số",
    titlePart2: "đo ni đóng giày.",
    sub: "Chiến lược, thiết kế, phát triển và khả năng hiển thị được kết hợp để xây dựng sự hiện diện số phù hợp với doanh nghiệp của bạn.",
    ctaPrimary: "Trao đổi dự án",
    ctaBadge: "",
    ctaSecondary: "Phương pháp",
    ctaAgency: "Dự án tiêu biểu",
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
  const [bgMode, setBgMode] = useState<"photo" | "video">("photo");

  useEffect(() => {
    if (bgMode === "video") return;
    const timer = setInterval(() => {
      setActiveHubIndex((prev) => (prev + 1) % HUBS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [bgMode]);

  const activeHub = HUBS[activeHubIndex];

  return (
    <section
      id="hero"
      aria-label="XR Agency Hero"
      className="xr-hero-refined relative isolate min-h-[100svh] w-full overflow-hidden bg-[#181512] pt-20 text-[#FAF7F2]"
    >
      {/* ── Background: Multi-Country Photo Sequence or 4K Video Loop ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[#181512]">
        {bgMode === "video" ? (
          <div className="absolute inset-0">
            <video
              src="/videos/hero-ambient-loop.mp4"
              poster="/showcase/hero-editorial-concept01.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover contrast-[1.12] brightness-[0.84] saturate-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14110E]/60 via-transparent to-black/20 pointer-events-none" />
          </div>
        ) : (
          HUBS.map((hub, idx) => {
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
                    "h-full w-full object-cover brightness-[1.06] contrast-[1.04] saturate-[1.05] transition-transform duration-[7000ms] ease-out",
                    hub.position ?? "object-center",
                    isActive ? "scale-105" : "scale-100",
                  )}
                />

                {/* Radiant daylight & studio gradient: airy, bright and crystal clear */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110E]/50 via-transparent to-black/15 pointer-events-none" />
              </div>
            );
          })
        )}
      </div>

      {/* Top-Right: Discreet Live Hub Indicator & Mode Switcher */}
      <div className="absolute top-24 right-5 sm:right-8 lg:right-12 z-30 pointer-events-auto flex flex-wrap items-center gap-2.5">
        {/* Toggle between Photos Studios & Video */}
        <button
          type="button"
          onClick={() => setBgMode((prev) => (prev === "photo" ? "video" : "photo"))}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#E5C696]/35 bg-black/60 px-3 py-1.5 text-[10px] sm:text-[11px] font-mono font-medium text-[#E5C696] backdrop-blur-md transition hover:bg-black/80 hover:border-[#E5C696]/60 cursor-pointer shadow-md"
        >
          {bgMode === "video" ? "📸 Mode Studios Photos" : "🎬 Mode Vidéo Immersive"}
        </button>

        {bgMode === "photo" && (
          <>
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
          </>
        )}
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

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {/* Primary Action: Sleek Luxury White Pill */}
            <a
              href="#quote"
              className="inline-flex min-h-11 items-center gap-3 rounded-full bg-[#E5C696] px-6 text-xs sm:text-sm font-semibold text-[#17130e] shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-all duration-300 hover:bg-[#F0D7B1] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{c.ctaPrimary}</span>
              <ArrowRight className="h-3.5 w-3.5 text-black" />
            </a>

            {/* Secondary Action: Minimalist Translucent Method Link */}
            <a
              href="/methode"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/45 bg-white/8 px-5 text-xs sm:text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:border-white/70"
            >
              <span>{c.ctaSecondary}</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#E5C696]" />
            </a>

            {/* Third Action: Selected Work */}
            <a
              href="#work"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-black/40 px-5 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-black/60 hover:border-white/50"
            >
              <span>{c.ctaAgency}</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#E5C696]" />
            </a>
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
