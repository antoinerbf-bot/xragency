import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { UI } from "@/lib/copy";
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

          {/* Sticky Parallax Cards Sequence */}
          <div className="relative space-y-16 pb-16 sm:space-y-20">
            {ORDERED_SERVICES.map((item, index) => {
              const service = SERVICES.find((s) => s.id === item.id) ?? SERVICES[0];
              const image = SERVICE_IMAGES[item.id] || "/showcase/web-luxury-showcase.jpg";
              const isSelected = funnel?.selectedServices.includes(item.funnelId) ?? false;

              return (
                <article
                  id={`home-service-${item.id}`}
                  key={item.id}
                  style={{ top: "6.5rem", zIndex: index + 10 }}
                  className="sticky group relative min-h-[60vh] overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#12100D] text-white shadow-[0_-12px_45px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-[#A67C40]/50 lg:min-h-[68vh]"
                >
                  {/* Background photo with high clarity and visible illustration */}
                  <img
                    src={image}
                    alt={t(service.title)}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-center lg:object-right-center opacity-95 brightness-[1.03] contrast-[1.03] transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                  />
                  {/* Directional gradient mask: dark backdrop on left for text readability, fully clear on right so artwork is bright */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100D0B] via-[#100D0B]/70 to-transparent lg:bg-gradient-to-r lg:from-[#100D0B] lg:via-[#100D0B]/80 lg:to-transparent lg:w-[62%] pointer-events-none" />

                  {/* Card Content Overlay */}
                  <div className="relative z-10 flex min-h-[64vh] flex-col justify-between p-7 sm:p-10 lg:min-h-[72vh] lg:p-12">
                    {/* Top Bar inside card */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#E5C696] animate-pulse" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5C696]">
                          {item.tag[locale] ?? item.tag.fr}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono rounded-full border border-[#E5C696]/30 bg-black/60 px-3.5 py-1 text-xs font-semibold text-[#E5C696] backdrop-blur-md whitespace-nowrap">
                          {item.id === "websites" ? "À partir de 499 €" : "Accompagnement Dédié"}
                        </span>
                      </div>
                    </div>

                    {/* Main Information */}
                    <div className="max-w-3xl py-4 sm:py-6">
                      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#E5C696]/80">
                        {t(service.short)}
                      </p>
                      <h3 className="mt-2 font-serif text-3xl sm:text-5xl lg:text-[3.8rem] font-medium leading-[1.04] tracking-[-0.03em] text-white">
                        {t(service.title)}
                      </h3>
                      <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-white/85">
                        {t(service.description)}
                      </p>

                      {/* 3 Key Deliverables */}
                      <div className="mt-6 flex flex-wrap gap-2.5">
                        {(service.deliverables ?? []).slice(0, 3).map((deliv) => (
                          <div
                            key={deliv.title.fr}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/50 px-3.5 py-2 backdrop-blur-md text-xs text-white/90"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#E5C696]" />
                            <span className="font-medium">{t(deliv.title)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Conversion-Driven CTAs : Call + Quote + Explore */}
                      <div className="mt-7 flex flex-wrap items-center gap-3">
                        <ServiceLink
                          id={item.id}
                          className="inline-flex items-center gap-2 rounded-full bg-[#E5C696] px-6 py-3 text-xs font-bold text-[#14110E] shadow-md transition hover:bg-[#F2D7B0] active:scale-[0.98]"
                        >
                          <span>
                            {item.id === "websites"
                              ? "Explorer l'offre · à partir de 499 €"
                              : "Explorer l'offre"}
                          </span>
                          <ArrowUpRight className="h-4 w-4" />
                        </ServiceLink>

                        <a
                          href="https://wa.me/33649219808?text=Bonjour%20XRAGENCY%2C%20je%20souhaite%20r%C3%A9server%20un%20appel%20strat%C3%A9gique%20au%20sujet%20de%20vos%20services."
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-[0.98]"
                        >
                          <span>📞 Réserver un appel</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => funnel?.toggleService(item.funnelId)}
                          className={cn(
                            "inline-flex items-center gap-2 rounded-full border px-5 py-3 font-mono text-[11px] font-semibold backdrop-blur-md transition",
                            isSelected
                              ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                              : "border-white/25 bg-black/40 text-white hover:border-white/60 hover:bg-black/60",
                          )}
                        >
                          {isSelected ? "✓ Dans votre devis" : "+ Ajouter au devis"}
                        </button>
                      </div>
                    </div>

                    {/* Bottom Indicator */}
                    <div className="flex items-center justify-between border-t border-white/15 pt-4 font-mono text-[10px] text-white/50 uppercase tracking-widest">
                      <span>
                        0{index + 1} / 0{ORDERED_SERVICES.length} · {item.id.toUpperCase()}
                      </span>
                      <span className="hidden sm:inline">
                        Défilez pour le service suivant ↓
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
