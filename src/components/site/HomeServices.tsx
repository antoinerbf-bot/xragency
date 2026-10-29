import { ArrowRight, ArrowUpRight, BarChart3, Bot, Globe2, MapPinned, Palette, ShieldCheck, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang, type Lang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { ServiceIllustration } from "./ServiceIllustration";
import { Parallax, Reveal } from "./primitives";
import { useFunnel } from "@/lib/funnel";

const FUNNEL_SERVICE_BTN: Record<Lang, { added: string; add: string }> = {
  fr: { added: "✓ Dans votre devis", add: "+ Ajouter au devis" },
  en: { added: "✓ In your quote", add: "+ Add to quote" },
  vi: { added: "✓ Đã thêm vào báo giá", add: "+ Thêm vào báo giá" },
  ar: { added: "✓ مضاف إلى عرض السعر", add: "+ أضف إلى العرض" },
  ru: { added: "✓ В вашей смете", add: "+ Добавить в смету" },
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
      fr: "02 · UNIVERS GOOGLE MAPS · PACK LOCAL #1",
      en: "02 · GOOGLE MAPS · LOCAL 3-PACK #1",
      vi: "02 · VŨ TRỤ MAPS · TOP 1 ĐỊA PHƯƠNG",
      ar: "02 · عالم MAPS · المركز الأول محلياً",
      ru: "02 · MAPS-ВСЕЛЕННАЯ · ТОП-1 НА КАРТАХ",
    },
    accent: "#ea4335",
    halo: "rgba(234, 67, 53, 0.12)",
    icon: MapPinned,
    href: "/services/maps",
    price: 990,
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
    id: "robotics",
    funnelId: "robotics",
    num: "07",
    tag: {
      fr: "07 · UNIVERS IA · ROBOTIQUE DE SERVICE KORBEN",
      en: "07 · AI UNIVERSE · KORBEN SERVICE ROBOTS",
      vi: "07 · VŨ TRỤ AI · ROBOT DỊCH VỤ KORBEN",
      ar: "07 · عالم الذكاء · روبوتات الخدمة KORBEN",
      ru: "07 · ИИ-ВСЕЛЕННАЯ · РОБОТЫ KORBEN",
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
    eyebrow: "07 SERVICES D'ÉLITE · LE PARCOURS STRATÉGIQUE",
    title: "Nos Services d'Élite : Choisissez votre levier, découvrez le dispositif complet.",
    lead: "Des livrables transparents, des garanties contractuelles et une exécution de prestige pour chaque pilier de votre croissance.",
    from: "À partir de",
    open: "Découvrir la prestation",
    quote: "Configurer avec Alexandre",
    perMonth: "/ MOIS",
    perYear: "/ AN",
  },
  en: {
    eyebrow: "07 ELITE SERVICES · STRATEGIC JOURNEY",
    title: "Elite Services: Select your growth lever, explore the complete system.",
    lead: "Transparent deliverables, contractual guarantees and prestige execution for every pillar of your digital growth.",
    from: "From",
    open: "Explore service",
    quote: "Configure with Alexandre",
    perMonth: "/ MONTH",
    perYear: "/ YEAR",
  },
  vi: {
    eyebrow: "07 DỊCH VỤ CAO CẤP · LỘ TRÌNH CHIẾN LƯỢC",
    title: "Dịch vụ Cao cấp: Chọn đòn bẩy phát triển, khám phá giải pháp toàn diện.",
    lead: "Hạng mục bàn giao minh bạch, cam kết chuẩn mực và chất lượng thi công đỉnh cao cho doanh nghiệp.",
    from: "Từ",
    open: "Khám phá dịch vụ",
    quote: "Cấu hình cùng Alexandre",
    perMonth: "/ THÁNG",
    perYear: "/ NĂM",
  },
  ar: {
    eyebrow: "07 خدمات متميزة · المسار الاستراتيجي المتكامل",
    title: "خدماتنا المتميزة: اختر محور نموك واكتشف المنظومة المتكاملة.",
    lead: "مخرجات واضحة وشفافة، ضمانات موثقة وتنفيذ رفيع المستوى لكل ركيزة من ركائز نموك الرقمي.",
    from: "ابتداءً من",
    open: "استكشف الخدمة",
    quote: "تكوين العرض مع ألكسندر",
    perMonth: "/ شهريًا",
    perYear: "/ سنويًا",
  },
  ru: {
    eyebrow: "07 ПРЕМИАЛЬНЫХ УСЛУГ · СТРАТЕГИЧЕСКИЙ МАРШРУТ",
    title: "Премиальные услуги: выберите точку роста и откройте готовую систему.",
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
  let funnel: ReturnType<typeof useFunnel> | null = null;
  try {
    funnel = useFunnel();
  } catch {
    funnel = null;
  }
  const currentLang = (lang in FUNNEL_SERVICE_BTN ? lang : "fr") as Lang;

  return (
    <section id="services" data-section="homepage-services" className="xr-section relative overflow-hidden border-y xr-line bg-[var(--xr-bg)] py-10 sm:py-14 lg:py-16">
      {/* Dynamic ambient halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(ellipse at 25% 15%, rgba(197, 168, 128, 0.08), transparent 50%), radial-gradient(ellipse at 75% 75%, rgba(6, 182, 212, 0.06), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
        {/* Section Global Header */}
        <Reveal>
          <div className="flex flex-col gap-4 border-b xr-line pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="label-mono text-[8px] tracking-[.26em] text-[var(--xr-ink)]/60 uppercase">
                {copy.eyebrow}
              </span>
              <h2 className="display-serif mt-2 max-w-4xl text-[clamp(1.85rem,3.4vw,3.2rem)] leading-tight tracking-[-.04em] text-[var(--xr-ink)]">
                {copy.title}
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm leading-relaxed xr-muted">{copy.lead}</p>
          </div>
        </Reveal>

        {/* 7 Services Unfolding Sequentially with Parallax Effect */}
        <div className="divide-y xr-line">
          {ORDERED_SERVICES.map((item, idx) => {
            const service = SERVICES.find((s) => s.id === item.id) ?? SERVICES[0];
            const isSelected = funnel?.selectedServices.includes(item.funnelId) ?? false;
            const isEven = idx % 2 === 0;

            return (
              <article
                key={item.id}
                id={item.id === "websites" ? "services-websites" : `services-${item.id}`}
                className="relative py-8 sm:py-10 lg:py-12"
              >
                {/* Subtle localized ambient glow per universe */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={{
                    background: `radial-gradient(circle at ${isEven ? "85% 50%" : "15% 50%"}, ${item.halo}, transparent 45%)`,
                  }}
                />

                <div className={`relative grid grid-cols-1 gap-8 lg:gap-12 items-center ${isEven ? "lg:grid-cols-[1fr_1.15fr]" : "lg:grid-cols-[1.15fr_1fr]"}`}>
                  
                  {/* Column 1: Editorial Value Proposition */}
                  <div className={`flex flex-col justify-between space-y-4 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div>
                      {/* Category Eyebrow Pill */}
                      <div
                        className="inline-flex items-center gap-2 rounded-full border px-3 py-1 label-mono text-[7px] tracking-[.2em] transition-all"
                        style={{
                          borderColor: `${item.accent}55`,
                          color: item.accent,
                          backgroundColor: `${item.accent}12`,
                        }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: item.accent }} />
                        {item.tag[currentLang] ?? item.tag.fr}
                      </div>

                      {/* Service Title */}
                      <h3 className="display-serif mt-3 text-2xl sm:text-3xl lg:text-[2rem] leading-snug tracking-[-.035em] text-[var(--xr-ink)]">
                        {t(service.title)}
                      </h3>

                      {/* Description */}
                      <p className="mt-4 max-w-xl text-xs sm:text-[13.5px] leading-relaxed xr-muted">
                        {t(service.description)}
                      </p>

                      {/* Highlights Deliverables */}
                      <div className="mt-6 space-y-2 border-t xr-line pt-4">
                        {(service.highlights ?? []).slice(0, 3).map((hl, i) => (
                          <div key={i} className="flex items-start gap-3 py-1 text-xs">
                            <span className="label-mono mt-0.5 text-[6.5px] font-bold text-[var(--xr-ink)]/50">
                              0{i + 1}
                            </span>
                            <span className="text-[11.5px] font-medium leading-relaxed text-[var(--xr-ink)]">
                              {t(hl)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price & Direct Actions */}
                    <div className="pt-2">
                      <div className="flex items-baseline justify-between border-y xr-line py-4 mb-5">
                        <div>
                          <span className="label-mono text-[6.5px] xr-muted-2 uppercase tracking-wider">{copy.from}</span>
                          <p className="display-serif mt-0.5 text-3xl font-bold text-[var(--xr-ink)]">
                            {item.id === "maps" ? "990 €" : price(item.price)}
                          </p>
                        </div>
                        <span className="label-mono text-[7px] font-semibold xr-muted-2">
                          {item.period === "month" ? copy.perMonth : item.period === "year" ? copy.perYear : ""}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        {/* Direct toggle into custom quote */}
                        <button
                          type="button"
                          onClick={() => funnel?.toggleService(item.funnelId)}
                          className={
                            "inline-flex items-center gap-2 rounded-full border px-4 py-3 label-mono text-[8px] font-semibold transition-all duration-300 " +
                            (isSelected
                              ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400 font-bold shadow-sm"
                              : "border-white/20 bg-[var(--xr-surface-strong)] text-[var(--xr-ink)] hover:border-white/40 hover:-translate-y-0.5")
                          }
                        >
                          {isSelected
                            ? FUNNEL_SERVICE_BTN[currentLang]?.added || "✓ Dans votre devis"
                            : FUNNEL_SERVICE_BTN[currentLang]?.add || "+ Ajouter au devis"}
                        </button>

                        {/* Link to dedicated service page */}
                        <ServiceLink
                          id={item.id}
                          className="inline-flex items-center gap-2 rounded-full bg-[var(--xr-ink)] px-5 py-3 label-mono text-[8px] font-semibold text-[var(--xr-bg)] transition hover:-translate-y-0.5 shadow-md"
                        >
                          {copy.open}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </ServiceLink>

                        {/* Configure directly with Alexandre */}
                        <a
                          href="#quote"
                          onClick={(e) => {
                            if (!isSelected) funnel?.toggleService(item.funnelId);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full border xr-line px-4 py-3 label-mono text-[8px] xr-muted transition hover:bg-[var(--xr-bg)] hover:text-[var(--xr-ink)]"
                        >
                          {copy.quote}
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Rich Interactive Illustration with Parallax */}
                  <div className={`relative ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <Parallax speed={isEven ? 0.04 : -0.04}>
                      <div className="overflow-hidden rounded-[2.2rem] border xr-line bg-[var(--xr-bg-elev)] shadow-[var(--xr-shadow)]">
                        <ServiceIllustration service={item.id} title={t(service.title)} />
                      </div>
                    </Parallax>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
