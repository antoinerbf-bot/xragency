import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { UI } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { useOptionalFunnel } from "@/lib/funnel";

const SERVICE_IMAGES: Record<string, string> = {
  websites: "/showcase/web-luxury-showcase.jpg",
  branding: "/showcase/svc-branding-editorial.jpg",
  seo: "/showcase/svc-seo-editorial.jpg",
  maps: "/showcase/svc-maps-editorial.jpg",
  social: "/showcase/agency-social-studio-hero.jpg",
  maintenance: "/showcase/svc-webcare-editorial.jpg",
  crm: "/showcase/lot5_crm_leads_pro.png",
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
    href: "/services/websites",
  },
  {
    id: "branding",
    funnelId: "branding",
    num: "02",
    tag: {
      fr: "02 · BRANDING & IDENTITÉ DE PRESTIGE",
      en: "02 · BRANDING & PRESTIGE IDENTITY",
      vi: "02 · THƯƠNG HIỆU & DẤU ẤN VÀNG",
      ar: "02 · الهوية البصرية والعلامة الراقية",
      ru: "02 · БРЕНДИНГ И ПРЕМИАЛЬНЫЙ СТИЛЬ",
    },
    href: "/services/branding",
  },
  {
    id: "seo",
    funnelId: "seo",
    num: "03",
    tag: {
      fr: "03 · SEO GOOGLE & AUTORITÉ ORGANIQUE",
      en: "03 · GOOGLE SEO & ORGANIC AUTHORITY",
      vi: "03 · SEO GOOGLE & UY TÍN TỰ NHIÊN",
      ar: "03 · سيو جوجل والظهور العضوي",
      ru: "03 · SEO GOOGLE И АВТОРИТЕТ В ПОИСКЕ",
    },
    href: "/services/seo",
  },
  {
    id: "maps",
    funnelId: "maps",
    num: "04",
    tag: {
      fr: "04 · GOOGLE MAPS · VISIBILITÉ PACK LOCAL TOP 3",
      en: "04 · GOOGLE MAPS · LOCAL 3-PACK VISIBILITY",
      vi: "04 · GOOGLE MAPS · TOP 3 ĐỊA PHƯƠNG",
      ar: "04 · خرائط GOOGLE · حزمة TOP 3 محلياً",
      ru: "04 · GOOGLE MAPS · ТОП-3 НА ЛОКАЛЬНЫХ КАРТАХ",
    },
    href: "/services/maps",
  },
  {
    id: "social",
    funnelId: "social",
    num: "05",
    tag: {
      fr: "05 · SOCIAL MEDIA & PRODUCTION VIDÉO 4K",
      en: "05 · SOCIAL MEDIA & 4K VIDEO STUDIO",
      vi: "05 · MẠNG XÃ HỘI & SẢN XUẤT VIDEO 4K",
      ar: "05 · إدارة التواصل والإنتاج السينمائي 4K",
      ru: "05 · СОЦСЕТИ И 4K-ВИДЕОПРОДАКШН",
    },
    href: "/services/social",
  },
  {
    id: "maintenance",
    funnelId: "maintenance",
    num: "06",
    tag: {
      fr: "06 · WEBCARE & CYBER SÉCURITÉ 24/7",
      en: "06 · WEBCARE & 24/7 CLOUD SECURITY",
      vi: "06 · BẢO TRÌ & BẢO MẬT 24/7",
      ar: "06 · صيانة المواقع والأمان السحابي 24/7",
      ru: "06 · ПОДДЕРЖКА WEBCARE И БЕЗОПАСНОСТЬ 24/7",
    },
    href: "/services/webcare",
  },
  {
    id: "crm",
    funnelId: "crm",
    num: "07",
    tag: {
      fr: "07 · CRM SUR-MESURE & LOGICIELS MÉTIER",
      en: "07 · BESPOKE CRM & OPERATIONS SOFTWARE",
      vi: "07 · CRM MAY ĐO & PHẦN MỀM QUẢN TRỊ",
      ar: "07 · أنظمة CRM المخصصة وبرمجيات الأعمال",
      ru: "07 · ЗАКАЗНЫЕ CRM И УПРАВЛЕНЧЕСКИЙ СОФТ",
    },
    href: "/services/crm",
  },
  {
    id: "robotics",
    funnelId: "robotics",
    num: "08",
    tag: {
      fr: "08 · ROBOTIQUE AUTONOME & IA PHYSIQUE KORBEN",
      en: "08 · AUTONOMOUS ROBOTICS & KORBEN PHYSICAL AI",
      vi: "08 · ROBOT TỰ HÀNH & AI VẬT LÝ KORBEN",
      ar: "08 · الروبوتات الذاتية والذكاء الاصطناعي KORBEN",
      ru: "08 · АВТОНОМНАЯ РОБОТОТЕХНИКА KORBEN",
    },
    href: "/services/robotique",
  },
] as const;

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
  const funnel = useOptionalFunnel();
  const [active, setActive] = useState(0);
  const locale = (lang || "fr") as Lang;

  useEffect(() => {
    const nodes = ORDERED_SERVICES.map((item) =>
      document.getElementById(`home-service-${item.id}`),
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = ORDERED_SERVICES.findIndex(
          (item) => `home-service-${item.id}` === visible.target.id,
        );
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      data-section="homepage-services"
      className="relative bg-[#FAF8F5] py-20 sm:py-28 lg:py-36 text-[#1A1815]"
    >
      <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-14 grid gap-8 border-b border-[#1A1815]/10 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2.5">
              <span className="h-px w-8 bg-[#A67C40]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67C40]">
                NOS 8 PÔLES D'EXCELLENCE · PARCOURS STRATÉGIQUE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.8rem] font-medium leading-[1.04] tracking-[-0.03em] text-[#1A1815]">
              Choisissez votre levier, découvrez le dispositif complet.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#5C554B] sm:text-base">
              Chaque discipline est pensée pour s’intégrer avec rigueur à votre écosystème : livrables documentés, garanties claires et exécution sans compromis.
            </p>
          </div>
          <div className="hidden lg:block font-mono text-right text-xs uppercase tracking-[0.2em] text-[#A67C40] font-semibold">
            {String(active + 1).padStart(2, "0")} / {String(ORDERED_SERVICES.length).padStart(2, "0")}
          </div>
        </div>

        {/* ── PARALLAX CARDS SEQUENCE WITH LATERAL TIMELINE ── */}
        <div className="grid gap-8 lg:grid-cols-[64px_minmax(0,1fr)]">
          {/* Vertical Dash Indicator */}
          <aside className="hidden lg:flex flex-col items-center gap-3 pt-6 sticky top-36 h-fit">
            {ORDERED_SERVICES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  document
                    .getElementById(`home-service-${item.id}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "center" })
                }
                aria-label={item.num}
                className="group flex w-full items-center justify-center py-1.5 transition-all"
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === active
                      ? "w-9 bg-[#A67C40]"
                      : "w-2.5 bg-[#D5D0C5] hover:w-5 hover:bg-[#8C8274]",
                  )}
                />
              </button>
            ))}
          </aside>

          {/* Large Parallax Cards */}
          <div className="relative space-y-8 sm:space-y-12">
            {ORDERED_SERVICES.map((item, index) => {
              const service = SERVICES.find((s) => s.id === item.id) ?? SERVICES[0];
              const image = SERVICE_IMAGES[item.id] || "/showcase/web-luxury-showcase.jpg";
              const plans = service.plans.slice(0, 3);
              const isSelected = funnel?.selectedServices.includes(item.funnelId) ?? false;

              return (
                <article
                  id={`home-service-${item.id}`}
                  key={item.id}
                  className="group relative min-h-[68vh] overflow-hidden rounded-[2.2rem] border border-[#1A1815]/12 bg-[#12100D] text-white shadow-2xl transition duration-500 hover:border-[#A67C40]/50 lg:min-h-[76vh]"
                >
                  {/* Background photo with subtle parallax scale */}
                  <img
                    src={image}
                    alt={t(service.title)}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-45 brightness-[0.85] transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35" />

                  {/* Card Content Overlay */}
                  <div className="relative z-10 flex min-h-[68vh] flex-col justify-between p-7 sm:p-10 lg:min-h-[76vh] lg:p-14">
                    {/* Top Bar inside card */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#E5C696] animate-pulse" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5C696]">
                          {item.tag[locale] ?? item.tag.fr}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono rounded-full border border-[#E5C696]/30 bg-black/50 px-3 py-1 text-xs font-semibold text-[#E5C696] backdrop-blur-md">
                          Dès {item.id === "maps" ? "999 €" : price(service.fromEur)}
                          {service.fromPeriod === "month"
                            ? " / mois"
                            : service.fromPeriod === "year"
                              ? " / an"
                              : ""}
                        </span>
                      </div>
                    </div>

                    {/* Main Information */}
                    <div className="max-w-4xl py-6">
                      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#E5C696]/80">
                        {t(service.short)}
                      </p>
                      <h3 className="mt-2 font-serif text-3xl sm:text-5xl lg:text-[4.2rem] font-medium leading-[1.02] tracking-[-0.03em] text-white">
                        {t(service.title)}
                      </h3>
                      <p className="mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-white/80">
                        {t(service.description)}
                      </p>

                      {/* Display the 3 Key Plans / Offers directly in the case */}
                      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {plans.map((plan) => (
                          <div
                            key={plan.name.fr}
                            className="rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur-md transition hover:border-[#E5C696]/50 hover:bg-black/60"
                          >
                            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#E5C696]">
                              {t(plan.name)}
                            </span>
                            <p className="font-serif mt-1.5 text-2xl font-bold text-white">
                              {price(plan.eur)}
                            </p>
                            <span className="font-mono mt-0.5 block text-[10px] text-white/60">
                              {plan.period === "month"
                                ? "/ mois"
                                : plan.period === "year"
                                  ? "/ an"
                                  : "paiement unique"}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTAs */}
                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <ServiceLink
                          id={item.id}
                          className="inline-flex items-center gap-2 rounded-full bg-[#E5C696] px-6 py-3 text-xs font-bold text-[#14110E] shadow-md transition hover:bg-[#F2D7B0]"
                        >
                          <span>Explorer la prestation</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </ServiceLink>

                        <button
                          type="button"
                          onClick={() => funnel?.toggleService(item.funnelId)}
                          className={cn(
                            "inline-flex items-center gap-2 rounded-full border px-5 py-3 font-mono text-[11px] font-semibold backdrop-blur-md transition",
                            isSelected
                              ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                              : "border-white/25 bg-black/30 text-white hover:border-white/60 hover:bg-black/50",
                          )}
                        >
                          {isSelected ? "✓ Dans votre devis" : "+ Ajouter au devis"}
                        </button>
                      </div>
                    </div>

                    {/* Bottom Indicator */}
                    <div className="flex items-center justify-between border-t border-white/15 pt-4 font-mono text-[10px] text-white/50 uppercase tracking-widest">
                      <span>
                        0{index + 1} / 0{ORDERED_SERVICES.length}
                      </span>
                      <span className="hidden sm:inline">
                        Faites défiler pour le service suivant ↓
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── PANORAMIC CARDS OVERVIEW (Épuré, Grand Format & Équilibré) ── */}
        <div className="mt-20 pt-16 border-t border-[#1A1815]/10">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#A67C40]">
                VUE D'ENSEMBLE · 8 PILIERS D'EXPERTISE
              </span>
              <h3 className="mt-2 font-serif text-2xl sm:text-4xl font-medium text-[#1A1815]">
                Tous nos services en un coup d'œil.
              </h3>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-[#5C554B] leading-relaxed">
              Activez un levier spécifique ou orchestrez un dispositif digital global pour votre marque.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ORDERED_SERVICES.map((s) => {
              const service = SERVICES.find((item) => item.id === s.id) ?? SERVICES[0];
              const photo = SERVICE_IMAGES[s.id] || "/showcase/web-luxury-showcase.jpg";
              return (
                <ServiceLink
                  key={s.id}
                  id={s.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#1A1815]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#A67C40] hover:shadow-xl"
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

                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#A67C40]">
                      {s.id === "crm"
                        ? "CRM & LOGICIEL"
                        : s.id === "maps"
                          ? "LOCAL SEO"
                          : s.id.toUpperCase()}
                    </span>
                    <h4 className="mt-1 font-serif text-lg font-bold text-[#1A1815] leading-snug group-hover:text-[#A67C40] transition-colors">
                      {t(service.title)}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#5C554B] line-clamp-2">
                      {t(service.description)}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#1A1815]/10 pt-4">
                    <div>
                      <span className="font-mono text-[9px] text-[#8C8274] uppercase">Dès</span>
                      <p className="font-serif text-lg font-bold text-[#1A1815]">
                        {s.id === "maps" ? "999 €" : price(service.fromEur)}
                      </p>
                    </div>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FAF8F5] border border-[#1A1815]/10 text-[#1A1815] transition-all group-hover:bg-[#1A1815] group-hover:text-white">
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
