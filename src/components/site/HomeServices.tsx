import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useOptionalFunnel } from "@/lib/funnel";

const SERVICE_IMAGES: Record<string, string> = {
  websites: "/showcase/svc-web-real.jpg",
  branding: "/showcase/svc-branding-real.jpg",
  seo: "/showcase/svc-seo-real.jpg",
  maps: "/showcase/svc-maps-real.jpg",
  social: "/showcase/svc-social-real.jpg",
  maintenance: "/showcase/svc-webcare-real.jpg",
  crm: "/showcase/svc-crm-real.jpg",
  robotics: "/showcase/robotics_futuristic_sleek.jpg",
};

export const ORDERED_SERVICES = [
  {
    id: "websites",
    funnelId: "website",
    num: "01",
    priceTag: "Dès 499 € (Paiement unique)",
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
    priceTag: "Dès 199 € (Logo & Charte)",
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
    priceTag: "Dès 299 € / mois",
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
    priceTag: "999 € (Conquête 1 an garanti) + dès 99 €/m",
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
    priceTag: "Dès 399 € / mois",
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
    priceTag: "Dès 29 € / mois (ou 79 € / an)",
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
    priceTag: "Sur-mesure · Déploiement clé en main",
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
    priceTag: "Sur devis & audit d'intégration",
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
  const { t, lang } = useLang();
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
      { rootMargin: "-20% 0px -20% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      data-section="homepage-services"
      className="relative bg-[#FAF8F5] py-20 sm:py-28 lg:py-32 text-[#1A1815]"
    >
      <div className="mx-auto max-w-[1540px] px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 grid gap-6 border-b border-[#1A1815]/10 pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-2.5 inline-flex items-center gap-2.5">
              <span className="h-px w-8 bg-[#A67C40]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67C40]">
                NOS 8 PÔLES D'EXCELLENCE & TARIFS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.6rem] font-medium leading-[1.05] tracking-[-0.03em] text-[#1A1815]">
              Chaque service, pensé pour faire grandir votre activité.
            </h2>
            <p className="mt-3.5 max-w-2xl text-sm leading-relaxed text-[#5C554B] sm:text-base">
              Explorez nos pôles digitaux en scrollant librement : design sur-mesure, acquisition locale garantie, automatisation et accompagnement continu.
            </p>
          </div>
          <div className="hidden lg:block font-mono text-right text-xs uppercase tracking-[0.2em] text-[#A67C40] font-semibold">
            {String(active + 1).padStart(2, "0")} / {String(ORDERED_SERVICES.length).padStart(2, "0")}
          </div>
        </div>

        {/* ── FLUID SERVICES SEQUENCE WITH SIDEBAR NAV ── */}
        <div className="grid gap-8 lg:grid-cols-[56px_minmax(0,1fr)]">
          {/* Vertical Sticky Dash Indicator */}
          <aside className="hidden lg:flex flex-col items-center gap-3 pt-6 sticky top-28 h-fit">
            {ORDERED_SERVICES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  document
                    .getElementById(`home-service-${item.id}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
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

          {/* ── LUXURY STACKED PARALLAX CARDS SEQUENCE ── */}
          <div className="relative pb-16">
            {ORDERED_SERVICES.map((item, index) => {
              const service = SERVICES.find((s) => s.id === item.id) ?? SERVICES[0];
              const image = SERVICE_IMAGES[item.id] || "/showcase/web-luxury-showcase.jpg";
              const isSelected = funnel?.selectedServices.includes(item.funnelId) ?? false;
              const isLast = index === ORDERED_SERVICES.length - 1;

              return (
                <div
                  key={item.id}
                  className="sticky"
                  style={{
                    top: `clamp(68px, calc(64px + ${index * 14}px), 180px)`,
                    zIndex: index + 10,
                    marginBottom: isLast ? "0px" : "clamp(3.5rem, 8vh, 6rem)",
                  }}
                >
                  <article
                    id={`home-service-${item.id}`}
                    className="group relative overflow-hidden rounded-[2rem] border border-[#D8B788]/25 bg-[#12100D] text-white shadow-[0_-10px_35px_rgba(0,0,0,0.5),0_25px_60px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#A67C40]/60"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] lg:min-h-[500px]">
                      {/* Content Column */}
                      <div className="relative z-10 lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-gradient-to-t lg:bg-gradient-to-r from-[#12100D] via-[#12100D]/95 to-[#12100D]/80">
                        {/* Top Bar inside card */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1 backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#E5C696] animate-pulse" />
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5C696]">
                              {item.tag[locale] ?? item.tag.fr}
                            </span>
                          </div>

                          <span className="font-mono rounded-full border border-[#E5C696]/40 bg-[#E5C696]/15 px-3 py-1 text-xs font-semibold text-[#E5C696] whitespace-nowrap">
                            {item.priceTag}
                          </span>
                        </div>

                        {/* Main Information */}
                        <div className="py-4 sm:py-5">
                          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#E5C696]/80">
                            {t(service.short)}
                          </p>
                          <h3 className="mt-2 font-serif text-2xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.08] tracking-[-0.02em] text-white">
                            {t(service.title)}
                          </h3>
                          <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-white/80">
                            {t(service.description)}
                          </p>

                          {/* 3 Key Deliverables */}
                          <div className="mt-5 flex flex-wrap gap-2">
                            {(service.deliverables ?? []).slice(0, 3).map((deliv) => (
                              <div
                                key={deliv.title.fr}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur-xs text-[11px] text-white/90"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-[#E5C696]" />
                                <span className="font-medium">{t(deliv.title)}</span>
                              </div>
                            ))}
                          </div>

                          {/* Conversion CTAs */}
                          <div className="mt-6 flex flex-wrap items-center gap-2.5">
                            <ServiceLink
                              id={item.id}
                              className="inline-flex items-center gap-2 rounded-full bg-[#E5C696] px-5 py-2.5 text-xs font-bold text-[#14110E] shadow-sm transition hover:bg-[#F2D7B0] active:scale-[0.98]"
                            >
                              <span>Découvrir l'offre</span>
                              <ArrowUpRight className="h-4 w-4" />
                            </ServiceLink>

                            <a
                              href={`https://wa.me/33649219808?text=Bonjour%20XRAGENCY%2C%20je%20souhaite%20des%20renseignements%20sur%20l'offre%20${encodeURIComponent(t(service.title))}.`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/15"
                            >
                              <span>📞 Échanger (15 min)</span>
                            </a>

                            <button
                              type="button"
                              onClick={() => funnel?.toggleService(item.funnelId)}
                              className={cn(
                                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 font-mono text-[11px] font-semibold transition",
                                isSelected
                                  ? "border-[#E5C696] bg-[#E5C696]/20 text-[#F2D7B0]"
                                  : "border-white/20 bg-white/5 text-white/90 hover:border-white/40",
                              )}
                            >
                              {isSelected ? "✓ Dans votre sélection" : "+ Ajouter au projet"}
                            </button>
                          </div>
                        </div>

                        {/* Bottom Indicator */}
                        <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] text-white/50 uppercase tracking-widest">
                          <span>
                            0{index + 1} / 0{ORDERED_SERVICES.length} · {item.id.toUpperCase()}
                          </span>
                          <span className="text-white/40">XRAGENCY HAUTE COUTURE</span>
                        </div>
                      </div>

                      {/* Image Column: 16:9 Aspect Ratio Container */}
                      <div className="relative min-h-[240px] lg:min-h-full lg:col-span-5 overflow-hidden">
                        <img
                          src={image}
                          alt={t(service.title)}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent via-transparent to-[#12100D]/80" />
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
