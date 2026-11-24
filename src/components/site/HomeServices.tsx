import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Globe2,
  MapPinned,
  Palette,
  ShieldCheck,
  Users,
  Layers,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang, type Lang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { ServiceIllustration } from "./ServiceIllustration";
import { Parallax, Reveal } from "./primitives";
import { useOptionalFunnel } from "@/lib/funnel";

const FUNNEL_SERVICE_BTN: Record<Lang, { added: string; add: string }> = {
  fr: { added: "✓ Dans votre devis", add: "+ Ajouter au devis" },
  en: { added: "✓ In your quote", add: "+ Add to quote" },
  vi: { added: "✓ Đã thêm vào báo giá", add: "+ Thêm vào báo giá" },
  ar: { added: "✓ مضاف إلى عرض السعر", add: "+ أضف إلى العرض" },
  ru: { added: "✓ В вашей смете", add: "+ Добавить в смету" },
};

const SERVICE_IMAGES: Record<string, string> = {
  websites: "/showcase/web-luxury-showcase.jpg",
  maps: "/showcase/svc-maps-editorial.jpg",
  social: "/showcase/agency-social-studio-hero.jpg",
  branding: "/showcase/svc-branding-editorial.jpg",
  seo: "/showcase/svc-seo-editorial.jpg",
  maintenance: "/showcase/svc-webcare-editorial.jpg",
  crm: "/showcase/sc-food.jpg",
  robotics: "/showcase/atlas-o2-studio.jpg",
};

export const ORDERED_SERVICES = [
  {
    id: "websites",
    funnelId: "website",
    num: "01",
    tag: {
      fr: "01 · UNIVERS WEB · HAUTE COUTURE",
      en: "01 · WEB UNIVERSE · HAUTE COUTURE",
      vi: "01 · VŨ TRỤ WEB · ĐỈNH CAO",
      ar: "01 · عالم الويب · راقٍ ومميز",
      ru: "01 · WEB-ВСЕЛЕННАЯ · ПРЕМИУМ",
    },
    accent: "#c5a880",
    halo: "rgba(197, 168, 128, 0.12)",
    icon: Globe2,
    href: "/services/websites",
    price: 499,
    period: "once",
  },
  {
    id: "maps",
    funnelId: "maps",
    num: "02",
    tag: {
      fr: "02 · VISIBILITÉ LOCALE GOOGLE MAPS",
      en: "02 · GOOGLE MAPS · LOCAL VISIBILITY",
      vi: "02 · VŨ TRỤ MAPS · TOP 3 ĐỊA PHƯƠNG",
      ar: "02 · عالم MAPS · حزمة TOP 3 محلياً",
      ru: "02 · MAPS-ВСЕЛЕННАЯ · ТОП-3 НА КАРТАХ",
    },
    accent: "#ea4335",
    halo: "rgba(234, 67, 53, 0.12)",
    icon: MapPinned,
    href: "/services/maps",
    price: 999,
    period: "year",
  },
  {
    id: "social",
    funnelId: "social",
    num: "03",
    tag: {
      fr: "03 · UNIVERS SOCIAL · TOURNAGES & REELS 4K",
      en: "03 · SOCIAL UNIVERSE · 4K VIDEO PRODUCTION",
      vi: "03 · VŨ TRỤ SOCIAL · SẢN XUẤT REELS 4K",
      ar: "03 · عالم التواصل · إنتاج ريلز 4K",
      ru: "03 · SOCIAL-ВСЕЛЕННАЯ · 4K-ПРОДАКШН",
    },
    accent: "#f43f5e",
    halo: "rgba(244, 63, 94, 0.12)",
    icon: Users,
    href: "/services/social",
    price: 349,
    period: "month",
  },
  {
    id: "branding",
    funnelId: "branding",
    num: "04",
    tag: {
      fr: "04 · UNIVERS BRANDING · IDENTITÉ DE PRESTIGE",
      en: "04 · BRANDING UNIVERSE · PRESTIGE IDENTITY",
      vi: "04 · VŨ TRỤ THƯƠNG HIỆU · DẤU ẤN VÀNG",
      ar: "04 · عالم الهوية · توقيع مميز وراقي",
      ru: "04 · БРЕНДИНГ · ПРЕМИАЛЬНЫЙ СТИЛЬ",
    },
    accent: "#f59e0b",
    halo: "rgba(245, 158, 11, 0.12)",
    icon: Palette,
    href: "/services/branding",
    price: 199,
    period: "once",
  },
  {
    id: "seo",
    funnelId: "seo",
    num: "05",
    tag: {
      fr: "05 · UNIVERS SEO · AUTORITÉ & TOP POSITIONS",
      en: "05 · SEO UNIVERSE · AUTHORITY & TOP RANKINGS",
      vi: "05 · VŨ TRỤ SEO · UY TÍN & TOP 1",
      ar: "05 · عالم SEO · سلطة ومراكز أولى",
      ru: "05 · SEO-ВСЕЛЕННАЯ · ТОП-ПОЗИЦИИ",
    },
    accent: "#8b5cf6",
    halo: "rgba(139, 92, 246, 0.12)",
    icon: BarChart3,
    href: "/services/seo",
    price: 299,
    period: "month",
  },
  {
    id: "maintenance",
    funnelId: "maintenance",
    num: "06",
    tag: {
      fr: "06 · UNIVERS WEBCARE · CYBER SÉCURITÉ 24/7",
      en: "06 · WEBCARE UNIVERSE · 24/7 CYBER SECURITY",
      vi: "06 · VŨ TRỤ WEBCARE · BẢO MẬT 24/7",
      ar: "06 · عالم الرعاية · أمان سيبراني 24/7",
      ru: "06 · WEBCARE · БЕЗОПАСНОСТЬ 24/7",
    },
    accent: "#0ea5e9",
    halo: "rgba(14, 165, 233, 0.12)",
    icon: ShieldCheck,
    href: "/services/webcare",
    price: 29,
    period: "month",
  },
  {
    id: "crm",
    funnelId: "crm",
    num: "07",
    tag: {
      fr: "07 · UNIVERS CRM SUR-MESURE & LOGICIELS MÉTIER",
      en: "07 · BESPOKE CRM & OPERATIONS SOFTWARE",
      vi: "07 · VŨ TRỤ CRM MAY ĐO & PHẦN MỀM QUẢN TRỊ",
      ar: "07 · عالم الـ CRM المخصص وبرمجيات الأعمال",
      ru: "07 · ЗАКАЗНЫЕ CRM И СИСТЕМЫ УПРАВЛЕНИЯ",
    },
    accent: "#c5a880",
    halo: "rgba(197, 168, 128, 0.14)",
    icon: Layers,
    href: "/services/crm",
    price: 2000,
    period: "once",
  },
  {
    id: "robotics",
    funnelId: "robotics",
    num: "08",
    tag: {
      fr: "08 · UNIVERS ROBOTIQUE AUTONOME & IA PHYSIQUE",
      en: "08 · AUTONOMOUS ROBOTICS & PHYSICAL AI",
      vi: "08 · VŨ TRỤ ROBOT TỰ HÀNH & AI VẬT LÝ",
      ar: "08 · عالم الروبوتات الذاتية والذكاء الاصطناعي",
      ru: "08 · АВТОНОМНЫЕ РОБОТЫ И ФИЗИЧЕСКИЙ ИИ",
    },
    accent: "#d4af37",
    halo: "rgba(212, 175, 55, 0.12)",
    icon: Bot,
    href: "/services/robotique",
    price: 499,
    period: "month",
  },
] as const;

const COPY = {
  fr: {
    eyebrow: "08 SERVICES D'ÉLITE · LE PARCOURS STRATÉGIQUE",
    title: "Nos 8 Pôles d'Excellence : Choisissez votre levier, découvrez le dispositif complet.",
    lead: "Des livrables transparents, des garanties contractuelles et une exécution de prestige pour chaque pilier de votre croissance.",
    from: "À partir de",
    open: "Découvrir la prestation",
    quote: "Configurer avec Alexandre",
    perMonth: "/ MOIS",
    perYear: "/ AN",
  },
  en: {
    eyebrow: "08 ELITE SERVICES · STRATEGIC JOURNEY",
    title: "8 Centres of Excellence: Select your growth lever, explore the complete system.",
    lead: "Transparent deliverables, contractual guarantees and prestige execution for every pillar of your digital growth.",
    from: "From",
    open: "Explore service",
    quote: "Configure with Alexandre",
    perMonth: "/ MONTH",
    perYear: "/ YEAR",
  },
  vi: {
    eyebrow: "08 DỊCH VỤ CAO CẤP · LỘ TRÌNH CHIẾN LƯỢC",
    title: "8 Trụ cột Chuyên môn: Chọn đòn bẩy phát triển, khám phá giải pháp toàn diện.",
    lead: "Hạng mục bàn giao minh bạch, cam kết chuẩn mực và chất lượng thi công đỉnh cao cho doanh nghiệp.",
    from: "Từ",
    open: "Khám phá dịch vụ",
    quote: "Cấu hình cùng Alexandre",
    perMonth: "/ THÁNG",
    perYear: "/ NĂM",
  },
  ar: {
    eyebrow: "08 خدمات متميزة · المسار الاستراتيجي المتكامل",
    title: "8 أقطاب تميز: اختر محور نموك واكتشف المنظومة المتكاملة.",
    lead: "مخرجات واضحة وشفافة، ضمانات موثقة وتنفيذ رفيع المستوى لكل ركيزة من ركائز نموك الرقمي.",
    from: "ابتداءً من",
    open: "استكشف الخدمة",
    quote: "تكوين العرض مع ألكسندر",
    perMonth: "/ شهريًا",
    perYear: "/ سنويًا",
  },
  ru: {
    eyebrow: "08 ПРЕМИАЛЬНЫХ УСЛУГ · СТРАТЕГИЧЕСКИЙ МАРШРУТ",
    title: "8 направлений экспертизы: выберите точку роста и откройте готовую систему.",
    lead: "Прозрачные результаты, договорные гарантии и безупречное исполнение для каждого направления вашего бизнеса.",
    from: "От",
    open: "Подробнее об услуге",
    quote: "Настроить с Александром",
    perMonth: "/ МЕСЯЦ",
    perYear: "/ ГОД",
  },
} as const;

function ServiceLink({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (id === "crm") {
    return (
      <Link to="/services/crm" className={className}>
        {children}
      </Link>
    );
  }
  if (id === "robotics") {
    return (
      <Link to="/services/robotique" className={className}>
        {children}
      </Link>
    );
  }
  if (id === "maintenance") {
    return (
      <Link to="/services/webcare" className={className}>
        {children}
      </Link>
    );
  }
  if (id === "seo") {
    return (
      <Link to="/services/seo" className={className}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/services/$serviceId" params={{ serviceId: id }} className={className}>
      {children}
    </Link>
  );
}

export function HomeServices() {
  const { t, price, lang } = useLang();
  const copy = COPY[lang as keyof typeof COPY] ?? COPY.fr;
  const funnel = useOptionalFunnel();
  const currentLang = (lang in FUNNEL_SERVICE_BTN ? lang : "fr") as Lang;

  return (
    <section
      id="services"
      data-section="homepage-services"
      className="relative overflow-hidden border-y border-[#151310]/10 bg-[#FAF8F5] py-14 sm:py-20 lg:py-24 text-[#151310]"
    >
      {/* Subtle warm champagne ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 25% 15%, rgba(197, 168, 128, 0.12), transparent 55%), radial-gradient(ellipse at 75% 75%, rgba(212, 175, 55, 0.08), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
        {/* Section Global Header Style NexPro Luminous */}
        <Reveal>
          <div className="max-w-5xl pb-10 border-b border-[#151310]/10">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#C5A880]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#8D6C42]">
                02 / NOS 8 PÔLES D'EXPERTISE & DE CONVERSION
              </span>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.4rem] font-medium leading-[1.08] tracking-[-0.02em] text-[#12110E]">
                {copy.title}
              </h2>
              <p className="max-w-md text-xs sm:text-sm leading-relaxed text-[#5C564C]">
                {copy.lead}
              </p>
            </div>
          </div>
        </Reveal>

        {/* 8 Services Unfolding Sequentially with Parallax Effect */}
        <div className="divide-y divide-[#151310]/10">
          {ORDERED_SERVICES.map((item, idx) => {
            const service = SERVICES.find((s) => s.id === item.id) ?? SERVICES[0];
            const isSelected = funnel?.selectedServices.includes(item.funnelId) ?? false;
            const isEven = idx % 2 === 0;
            const photoUrl = SERVICE_IMAGES[item.id] || "/showcase/web-luxury-showcase.jpg";

            return (
              <article
                key={item.id}
                id={item.id === "websites" ? "services-websites" : `services-${item.id}`}
                className="relative py-12 sm:py-16 lg:py-20"
              >
                <div
                  className={`relative grid grid-cols-1 gap-10 lg:gap-16 items-center ${isEven ? "lg:grid-cols-[1fr_1.18fr]" : "lg:grid-cols-[1.18fr_1fr]"}`}
                >
                  {/* Column 1: Editorial Value Proposition */}
                  <div
                    className={`flex flex-col justify-between space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <div>
                      {/* Category Eyebrow Pill */}
                      <div
                        className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-[10px] font-semibold tracking-[.2em] transition-all"
                        style={{
                          borderColor: `${item.accent}66`,
                          color: "#7D6445",
                          backgroundColor: `${item.accent}15`,
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: item.accent }}
                        />
                        {item.tag[currentLang] ?? item.tag.fr}
                      </div>

                      {/* Service Title */}
                      <h3 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-[2.4rem] font-medium leading-[1.1] text-[#12110E]">
                        {t(service.title)}
                      </h3>

                      {/* Description */}
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#524E46]">
                        {t(service.description)}
                      </p>

                      {/* Highlights Deliverables Style NexPro */}
                      <div className="mt-6 space-y-2.5 border-t border-[#151310]/10 pt-5">
                        {(service.highlights ?? []).slice(0, 3).map((hl, i) => (
                          <div key={i} className="flex items-start gap-3 py-1 text-xs">
                            <span className="font-mono text-[11px] font-bold text-[#A8824C]">
                              0{i + 1}
                            </span>
                            <span className="text-[13px] font-medium leading-relaxed text-[#2B2823]">
                              {t(hl)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price & Direct Actions */}
                    <div className="pt-2">
                      <div className="flex items-baseline justify-between border-y border-[#151310]/10 py-4 mb-6">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#7D6445]">
                            {copy.from}
                          </span>
                          <p className="font-serif mt-0.5 text-3xl sm:text-4xl font-bold text-[#12110E]">
                            {item.id === "maps" ? "999 €" : price(service.fromEur)}
                          </p>
                        </div>
                        <span className="font-mono text-[10px] font-semibold text-[#7D6445]">
                          {item.period === "month"
                            ? copy.perMonth
                            : item.period === "year"
                              ? copy.perYear
                              : ""}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        {/* Direct toggle into custom quote */}
                        <button
                          type="button"
                          onClick={() => funnel?.toggleService(item.funnelId)}
                          className={
                            "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[10px] font-bold tracking-wider transition-all duration-300 " +
                            (isSelected
                              ? "border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm"
                              : "border-[#151310]/20 bg-white text-[#151310] hover:border-[#151310] hover:bg-[#FAF8F5] shadow-xs")
                          }
                        >
                          {isSelected
                            ? FUNNEL_SERVICE_BTN[currentLang]?.added || "✓ Dans votre devis"
                            : FUNNEL_SERVICE_BTN[currentLang]?.add || "+ Ajouter au devis"}
                        </button>

                        {/* Link to dedicated service page */}
                        <ServiceLink
                          id={item.id}
                          className="inline-flex items-center gap-2 rounded-full bg-[#151310] px-5 py-2.5 font-mono text-[10px] font-bold tracking-wider text-[#FAF8F5] transition hover:bg-[#2F2B24] shadow-sm"
                        >
                          {copy.open}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </ServiceLink>

                        {/* Configure directly with Alexandre */}
                        <a
                          href="#quote"
                          onClick={() => {
                            if (!isSelected) funnel?.toggleService(item.funnelId);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#151310]/15 bg-white px-4 py-2.5 font-mono text-[10px] font-medium text-[#5C564C] transition hover:border-[#C5A880] hover:text-[#151310]"
                        >
                          {copy.quote}
                          <ArrowRight className="h-3 w-3 text-[#A8824C]" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Rich Interactive Illustration with Parallax */}
                  <div className={`relative ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <Parallax speed={isEven ? 0.05 : -0.05}>
                      <div className="group relative overflow-hidden rounded-[2.2rem] border border-[#151310]/12 bg-white shadow-[0_20px_50px_rgba(21,19,16,0.06)]">
                        {/* Subtle photo ambient backdrop */}
                        <div className="absolute inset-0 opacity-15 transition-opacity duration-700 group-hover:opacity-25">
                          <img
                            src={photoUrl}
                            alt=""
                            className="h-full w-full object-cover filter contrast-105"
                          />
                        </div>
                        <div className="relative z-10">
                          <ServiceIllustration service={item.id} title={t(service.title)} />
                        </div>
                      </div>
                    </Parallax>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── PANORAMIC CARDS OVERVIEW (Épuré, Grand Format & Équilibré) ── */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#151310]/10">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#8D6C42]">
                VUE D'ENSEMBLE · 8 PILIERS
              </span>
              <h3 className="mt-2 font-serif text-2xl sm:text-4xl font-medium text-[#12110E]">
                Tous nos services en un coup d'œil.
              </h3>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-[#5C564C]">
              Chaque discipline peut être activée individuellement ou combinée au sein d'un écosystème global.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ORDERED_SERVICES.map((s, idx) => {
              const service = SERVICES.find((item) => item.id === s.id) ?? SERVICES[0];
              const photo = SERVICE_IMAGES[s.id] || "/showcase/web-luxury-showcase.jpg";
              return (
                <ServiceLink
                  key={s.id}
                  id={s.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#151310]/12 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C5A880] hover:shadow-xl"
                >
                  <div>
                    <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#EBE7DF] relative mb-5">
                      <img
                        src={photo}
                        alt={t(service.title)}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 font-mono text-[9px] font-bold text-white">
                        {s.num}
                      </div>
                    </div>

                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#8D6C42]">
                      {s.id === "crm" ? "CRM & LOGICIEL" : s.id === "maps" ? "LOCAL SEO" : s.id.toUpperCase()}
                    </span>
                    <h4 className="mt-1 font-serif text-lg font-bold text-[#12110E] leading-snug group-hover:text-[#A8824C] transition-colors">
                      {t(service.title)}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#5C564C] line-clamp-2">
                      {t(service.description)}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#151310]/10 pt-4">
                    <div>
                      <span className="font-mono text-[9px] text-[#7D6445] uppercase">Dès</span>
                      <p className="font-serif text-lg font-bold text-[#12110E]">
                        {s.id === "maps" ? "999 €" : price(service.fromEur)}
                      </p>
                    </div>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FAF8F5] border border-[#151310]/10 text-[#12110E] transition-all group-hover:bg-[#12110E] group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </ServiceLink>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
