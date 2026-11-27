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
  video?: string;
  position?: string;
  filterClass?: string;
  tagline: Record<Lang, string>;
  status: Record<Lang, string>;
}

const HUBS: CityHub[] = [
  {
    id: "paris",
    name: { fr: "Paris", en: "Paris", vi: "Paris", ar: "باريس", ru: "Париж" },
    country: { fr: "France", en: "France", vi: "Pháp", ar: "فرنسا", ru: "Франция" },
    timezone: "Europe/Paris",
    image: "/showcase/hub-paris-real-team.jpg",
    position: "object-[center_40%]",
    filterClass: "brightness-[1.02] contrast-[1.03]",
    tagline: {
      fr: "Studio Haussmann lumineux, direction artistique & production web haute couture.",
      en: "Sunlit Haussmann studio, creative direction & haute couture web production.",
      vi: "Studio Haussmann chan hòa ánh sáng, định hướng nghệ thuật & sản xuất web cao cấp.",
      ar: "استوديو هوسمان مشرق، إدارة فنية وإنتاج رقمي راقٍ.",
      ru: "Светлая студия в стиле Османа, арт-дирекшн и премиальный веб-продакшн.",
    },
    status: {
      fr: "Studio Paris · Direction Artistique",
      en: "Paris Studio · Creative Direction",
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
    image: "/showcase/hub-dubai-real-team.jpg",
    position: "object-[center_45%]",
    filterClass: "brightness-[1.02] contrast-[1.02]",
    tagline: {
      fr: "Penthouse lumineux en plein jour, plateformes e-commerce d'envergure & tech.",
      en: "Sunlit penthouse workspace, high-scale e-commerce & advanced tech.",
      vi: "Penthouse sáng tạo ngập tràn ánh sáng, thương mại điện tử quy mô lớn & công nghệ.",
      ar: "بنتهاوس مضيء بأشعة الشمس، منصات تجارة إلكترونية كبرى وتقنيات متقدمة.",
      ru: "Светлый пентхаус, масштабный e-commerce и передовые технологии.",
    },
    status: {
      fr: "Studio Dubaï · Pôle Croissance & Tech",
      en: "Dubai Studio · Growth & Tech",
      vi: "Studio Dubai · Tăng trưởng",
      ar: "استوديو دبي · النمو والتقنية",
      ru: "Студия Dubaï · Развитие и технологии",
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
    image: "/showcase/hub-singapore-real-team.jpg",
    position: "object-[center_40%]",
    filterClass: "brightness-[1.02] contrast-[1.02]",
    tagline: {
      fr: "Échange complice & dynamique d'équipe, conception digitale & acquisition Asie-Pacifique.",
      en: "Candid creative collaboration, digital design & Asia-Pacific acquisition.",
      vi: "Hợp tác sáng tạo năng động, thiết kế kỹ thuật số & mở rộng Châu Á.",
      ar: "تعاون إبداعي وتواصل حيوي، تصميم رقمي ونمو في آسيا والمحيط الهادئ.",
      ru: "Живое творческое общение, цифровой дизайн и масштабирование в Азии.",
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
    image: "/showcase/hub-newyork-real-team.jpg",
    position: "object-[center_45%]",
    filterClass: "brightness-[1.02] contrast-[1.02]",
    tagline: {
      fr: "Studio Manhattan, stratégie de marque globale & plateformes digitales d'élite.",
      en: "Manhattan studio, global brand strategy & elite digital platforms.",
      vi: "Studio Manhattan, chiến lược thương hiệu toàn cầu & nền tảng số.",
      ar: "استوديو مانهاتن، استراتيجية علامة تجارية عالمية ومنصات رقمية متقدمة.",
      ru: "Студия на Манхэттене, глобальная стратегия бренда и цифровые платформы.",
    },
    status: {
      fr: "Studio New York · Pôle Amériques",
      en: "New York Studio · Americas Hub",
      vi: "Studio New York · Châu Mỹ",
      ar: "استوديو نيويورك · الأمريكتان",
      ru: "Студия Нью-Йорк · Америка",
    },
  },
  {
    id: "tokyo",
    name: { fr: "Tokyo", en: "Tokyo", vi: "Tokyo", ar: "طوكيو", ru: "Токио" },
    country: {
      fr: "Japon",
      en: "Japan",
      vi: "Nhật Bản",
      ar: "اليابان",
      ru: "Япония",
    },
    timezone: "Asia/Tokyo",
    image: "/showcase/hub-tokyo-real-team.jpg",
    position: "object-[center_40%]",
    filterClass: "brightness-[1.02] contrast-[1.02]",
    tagline: {
      fr: "Studio Ginza & Shibuya, technologies immersives & design minimaliste d'avant-garde.",
      en: "Ginza & Shibuya studio, immersive technologies & avant-garde minimalism.",
      vi: "Studio Ginza & Shibuya, công nghệ nhập vai & thiết kế tối giản.",
      ar: "استوديو غينزا وشيبويا، تقنيات تفاعلية وتصميم بسيط رائد.",
      ru: "Студия в Гиндзе и Сибуе, иммерсивные технологии и минималистичный дизайн.",
    },
    status: {
      fr: "Studio Tokyo · Pôle Asie de l'Est",
      en: "Tokyo Studio · East Asia Hub",
      vi: "Studio Tokyo · Nhật Bản",
      ar: "استوديو طوكيو · اليابان",
      ru: "Студия Токио · Япония",
    },
  },
];

const COPY = {
  fr: {
    eyebrow: "AGENCE DIGITALE INTERNATIONALE",
    hubsTitle: "PARIS · DUBAÏ · SINGAPOUR · NEW YORK · TOKYO",
    titlePart1: "L’art du ",
    titleItalic: "digital",
    titlePart2: "sur mesure.",
    sub: "Architecture web haute performance, stratégie de marque et acquisition ciblée. Nous concevons votre écosystème digital pour convertir durablement vos prospects en clients.",
    ctaPrimary: "Demander ma maquette gratuite",
    ctaPrimarySub: "Sous 24-48h · Sans engagement",
    ctaSecondary: "Audit digital offert",
    ctaAgency: "Nos réalisations",
    guarantee: "Maquette interactive sur-mesure · Analyse SEO & performance incluse",
    scroll: "Découvrir nos expertises",
  },
  en: {
    eyebrow: "INTERNATIONAL DIGITAL AGENCY",
    hubsTitle: "PARIS · DUBAI · SINGAPORE · NEW YORK · TOKYO",
    titlePart1: "The art of ",
    titleItalic: "bespoke",
    titlePart2: "digital craft.",
    sub: "High-performance web architecture, brand strategy and targeted acquisition. We sculpt your digital presence to convert high-value prospects into clients.",
    ctaPrimary: "Request my free mockup",
    ctaPrimarySub: "Within 24-48h · No commitment",
    ctaSecondary: "Free digital audit",
    ctaAgency: "Selected work",
    guarantee: "Bespoke interactive mockup · SEO & performance audit included",
    scroll: "Discover our services",
  },
  vi: {
    eyebrow: "AGENCY KỸ THUẬT SỐ QUỐC TẾ",
    hubsTitle: "PARIS · DUBAI · SINGAPORE · NEW YORK · TOKYO",
    titlePart1: "Nghệ thuật ",
    titleItalic: "số",
    titlePart2: "đo ni đóng giày.",
    sub: "Kiến trúc web hiệu năng cao, chiến lược thương hiệu và tăng trưởng. Chúng tôi xây dựng sự hiện diện số để chuyển đổi khách hàng bền vững.",
    ctaPrimary: "Yêu cầu bản demo miễn phí",
    ctaPrimarySub: "Trong 24-48h · Không ràng buộc",
    ctaSecondary: "Đánh giá digital miễn phí",
    ctaAgency: "Dự án tiêu biểu",
    guarantee: "Demo tương tác riêng · Đánh giá SEO & chuyển đổi",
    scroll: "Khám phá chuyên môn",
  },
  ar: {
    eyebrow: "وكالة رقمية دولية",
    hubsTitle: "باريس · دبي · سنغافورة · نيويورك · طوكيو",
    titlePart1: "فن الحلول ",
    titleItalic: "الرقمية",
    titlePart2: "المصممة خصيصًا.",
    sub: "بنية ويب عالية الأداء، استراتيجية العلامة التجارية والنمو الرقمي لبناء حضور يحول الزوار إلى عملاء دائمين.",
    ctaPrimary: "طلب نموذج أولي مجاني",
    ctaPrimarySub: "خلال 24-48 ساعة · بدون التزام",
    ctaSecondary: "تدقيق رقمي مجاني",
    ctaAgency: "أعمال مختارة",
    guarantee: "نموذج تفاعلي مخصص · تدقيق شامل لتحسين محركات البحث والأداء",
    scroll: "استكشف خدماتنا",
  },
  ru: {
    eyebrow: "МЕЖДУНАРОДНОЕ DIGITAL-АГЕНТСТВО",
    hubsTitle: "ПАРИЖ · ДУБАЙ · СИНГАПУР · НЬЮ-ЙОРК · ТОКИО",
    titlePart1: "Искусство ",
    titleItalic: "digital",
    titlePart2: "под ваши задачи.",
    sub: "Высокопроизводительная веб-архитектура, стратегия бренда и целевой трафик для стабильной конверсии клиентов.",
    ctaPrimary: "Запросить бесплатный макет",
    ctaPrimarySub: "За 24-48ч · Без обязательств",
    ctaSecondary: "Бесплатный digital-аудит",
    ctaAgency: "Избранные проекты",
    guarantee: "Интерактивный макет · SEO и аудит производительности",
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
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeHub = HUBS[activeHubIndex];
  const activeTime = useCityTime(activeHub.timezone);

  return (
    <>
      <section
        id="hero"
        aria-label="XR Agency Hero"
        className="xr-hero-refined relative isolate min-h-[100svh] w-full overflow-hidden bg-[#181512] pt-20 text-[#FAF7F2]"
      >
        {/* ── Background: Cinematic Multi-Hub Studio & Iconic Skyline Flow (Paris, Dubaï, Singapour, New York, Tokyo) ── */}
        <div className="absolute inset-0 -z-10 overflow-hidden bg-[#14110E]">
          {HUBS.map((hub, idx) => (
            <div
              key={hub.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                idx === activeHubIndex ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none",
              )}
            >
              <img
                src={hub.image}
                alt={`${hub.name.fr} - ${hub.tagline.fr}`}
                className={cn(
                  "h-full w-full object-cover transform transition-transform duration-[7000ms] ease-out",
                  hub.position ?? "object-center",
                  hub.filterClass ?? "brightness-[1.05] contrast-[1.02]",
                  idx === activeHubIndex ? "scale-105" : "scale-100",
                )}
              />
            </div>
          ))}

          {/* Cinematic Scrim: Soft, luminous edges to protect text while keeping the skylines bright and sunlit */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#120F0D]/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ── Top-Left: Architectural Branding & Headline ── */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-8 lg:left-12 z-30 pointer-events-auto max-w-[280px] sm:max-w-xl">
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.24em] text-white/95">
              <span className="inline sm:hidden">AGENCE DIGITALE INTERNATIONALE</span>
              <span className="hidden sm:inline">{c.eyebrow}</span>
            </span>
          </div>
          <h1 className="mt-2 font-serif text-2xl sm:text-4xl lg:text-[3.2rem] font-light leading-[1.08] tracking-[-0.03em] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
            <span>{c.titlePart1}</span>
            <span className="font-serif italic font-normal text-white underline decoration-[#E5C696]/60 decoration-1 underline-offset-4">
              {c.titleItalic}
            </span>{" "}
            <span>{c.titlePart2}</span>
          </h1>
        </div>

        {/* ── Top-Right: Discreet Live Hub Indicator (City & Time only) ── */}
        <div className="absolute top-20 sm:top-24 right-4 sm:right-8 lg:right-12 z-30 pointer-events-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md text-white shadow-lg">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-[10px] font-semibold tracking-wider text-white uppercase">
              {activeHub.name[lang] ?? activeHub.name.fr}
            </span>
            <span className="font-mono text-[10px] text-zinc-300">{activeTime}</span>
          </div>
        </div>

        {/* ── Bottom Center Dock: Subtitle, CTAs & Guarantee ── */}
        <div className="relative z-20 pointer-events-none mx-auto flex min-h-[calc(100svh-5rem)] max-w-3xl flex-col items-center justify-end px-5 pb-6 sm:pb-10 text-center">
          <div className="pointer-events-auto max-w-2xl">
            {/* Subtitle: High-clarity, elegant description */}
            <p className="text-xs sm:text-[14px] leading-relaxed text-white/90 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {c.sub}
            </p>

            {/* CTA Row: Dynamic, glowing luxury pills (Zero yellow!) */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {/* Primary Action: Free Mockup (Dynamic luxury white with glowing aura) */}
              <a
                href="#quote"
                className="group relative inline-flex h-11 items-center gap-2.5 rounded-full bg-white px-6 text-xs sm:text-[13px] font-semibold text-black shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/95 hover:shadow-[0_0_35px_rgba(255,255,255,0.55)] hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>{c.ctaPrimary}</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 text-black" />
              </a>

              {/* Secondary Action: Free Audit (Dynamic frosted glass) */}
              <a
                href="#audit"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 text-xs sm:text-[13px] font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/70 hover:scale-[1.03] active:scale-[0.98] shadow-sm"
              >
                <Sparkles className="h-4 w-4 text-white" />
                <span>{c.ctaSecondary}</span>
              </a>

              {/* Tertiary Action: Selected Work */}
              <a
                href="#work"
                className="inline-flex h-11 items-center gap-1.5 px-3 text-xs sm:text-[13px] font-medium text-white/80 transition-all duration-300 hover:text-white"
              >
                <span>{c.ctaAgency}</span>
                <ArrowRight className="h-3.5 w-3.5 text-white/80" />
              </a>
            </div>

            {/* Reassurance Guarantee Footnote */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] sm:text-[11px] font-mono text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              <span className="text-white">✦</span>
              <span>{c.ctaPrimarySub}</span>
              <span className="text-white/40">·</span>
              <span>{c.guarantee}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars Ribbon (Moved below Hero to keep Hero 100% focused on immersion) ── */}
      <div className="relative z-30 border-y border-white/10 bg-[#120F0D]/95 backdrop-blur-md py-4 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1540px] flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8 flex-1">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.label.fr} className="flex items-center gap-3 text-white/90">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/20 bg-white/10 text-white shadow-sm">
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
            className="hidden items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/70 transition hover:text-white lg:inline-flex shrink-0"
          >
            <span>{c.scroll}</span>
            <span className="inline-block animate-bounce">↓</span>
          </a>
        </div>
      </div>
    </>
  );
}
