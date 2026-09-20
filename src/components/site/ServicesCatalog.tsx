import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { SurfaceDigital } from "./SurfaceDigital";
import { cn } from "@/lib/utils";
import { Parallax } from "./primitives";

/** Core catalog shown on /services — coherent set, not the full internal list */
const CATALOG_IDS = [
  "websites",
  "branding",
  "seo",
  "maps",
  "social",
  "maintenance",
  "ecommerce",
] as const;

const FIG_LABEL: Record<string, { fr: string; en: string; vi: string }> = {
  websites: { fr: "FLAGSHIP", en: "FLAGSHIP", vi: "FLAGSHIP" },
  branding: { fr: "IDENTITÉ", en: "IDENTITY", vi: "NHẬN DIỆN" },
  seo: { fr: "VISIBILITÉ", en: "VISIBILITY", vi: "HIỂN THỊ" },
  maps: { fr: "LOCAL", en: "LOCAL", vi: "ĐỊA PHƯƠNG" },
  social: { fr: "RÉSEAUX", en: "SOCIAL", vi: "MẠNG XÃ HỘI" },
  maintenance: { fr: "SOIN", en: "CARE", vi: "BẢO TRÌ" },
  ecommerce: { fr: "COMMERCE", en: "COMMERCE", vi: "THƯƠNG MẠI" },
};

const SERVICE_IMG: Record<string, string> = {
  websites: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=90&w=1800",
  branding: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=90&w=1800",
  seo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=90&w=1800",
  maps: "https://images.unsplash.com/photo-1524666041070-9e3c7be7b8e0?auto=format&fit=crop&q=90&w=1800",
  social: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=90&w=1800",
  maintenance: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=90&w=1800",
  ecommerce: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=90&w=1800",
};

const HREF: Record<string, string> = {
  websites: "/services/websites",
  branding: "/services/branding",
  seo: "/services/seo",
  maps: "/services/maps",
  social: "/services/social",
  maintenance: "/services/webcare",
  ecommerce: "/services/ecommerce",
};

export function ServicesCatalog() {
  const { t, price, lang } = useLang();
  const catalog = CATALOG_IDS.map((id) => SERVICES.find((s) => s.id === id)).filter(
    Boolean,
  ) as typeof SERVICES;

  const copy = {
    fr: {
      eyebrow: "SERVICES",
      title1: "Plusieurs expertises.",
      title2: "Un seul système.",
      lead: "Sites, identité, SEO, Google Maps, réseaux et maintenance. Chaque prestation travaille seule — ensemble, elles construisent une présence digitale qui convertit.",
      learn: "En savoir plus",
      from: "À partir de",
      ctaTitle: "Pas sûr par où commencer ?",
      ctaLead: "Décrivez votre situation. On vous propose un ordre clair et une estimation.",
      cta: "Lancer mon analyse",
    },
    en: {
      eyebrow: "SERVICES",
      title1: "Multiple disciplines.",
      title2: "One system.",
      lead: "Websites, identity, SEO, Google Maps, social and maintenance. Each service works on its own — together they build a digital presence that converts.",
      learn: "Learn more",
      from: "From",
      ctaTitle: "Not sure where to start?",
      ctaLead: "Tell us about your situation. We'll suggest a sequence and a budget range.",
      cta: "Start my analysis",
    },
    vi: {
      eyebrow: "DỊCH VỤ",
      title1: "Nhiều chuyên môn.",
      title2: "Một hệ thống.",
      lead: "Website, nhận diện, SEO, Google Maps, mạng xã hội và bảo trì. Mỗi dịch vụ hoạt động riêng — cùng nhau tạo nên hiện diện số chuyển đổi.",
      learn: "Tìm hiểu thêm",
      from: "Từ",
      ctaTitle: "Chưa chắc bắt đầu từ đâu?",
      ctaLead: "Mô tả tình huống của bạn. Chúng tôi đề xuất thứ tự và khoảng ngân sách.",
      cta: "Bắt đầu phân tích",
    },
  }[lang];

  return (
    <section className="relative">
      {/* Hero — same Surface digitale universe as Home */}
      <div className="relative min-h-[70vh] overflow-hidden border-b border-border/40">
        <div className="pointer-events-none absolute inset-0 bg-background">
          <SurfaceDigital className="opacity-80" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 40%, transparent 0%, color-mix(in oklab, var(--background) 55%, transparent) 70%, var(--background) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24">
          <p className="label-mono text-xs uppercase tracking-[0.32em] text-primary">{copy.eyebrow}</p>
          <h1 className="display-serif mt-5 max-w-5xl text-5xl leading-[0.9] sm:text-7xl lg:text-[6.5rem]">
            {copy.title1}
            <br />
            <span className="text-foreground/90">{copy.title2}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {copy.lead}
          </p>
          <a href="/#quote" className="mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:-translate-y-0.5">Faire mon devis gratuit <ArrowUpRight className="h-4 w-4" /></a>
          <p className="mt-6 label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
            01 // {String(catalog.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* FIG. cards — Qbenix language */}
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-8 lg:gap-12">
          {catalog.map((service, index) => {
            const fig = FIG_LABEL[service.id] ?? { fr: "SERVICE", en: "SERVICE", vi: "DỊCH VỤ" };
            const href = HREF[service.id] ?? `/services/${service.id}`;
            return (
              <article key={service.id} className="group grid overflow-hidden rounded-[2rem] border border-border/60 bg-card/45 shadow-lg shadow-black/10 transition-all duration-500 hover:-translate-y-1 hover:border-primary/45 hover:shadow-2xl lg:grid-cols-[minmax(0,0.95fr)_1.05fr]">
                <a href={href} className="relative min-h-[300px] overflow-hidden lg:min-h-[380px]" aria-label={`${copy.learn}: ${t(service.title)}`}>
                  <img src={SERVICE_IMG[service.id]} alt={t(service.title)} loading={index < 2 ? "eager" : "lazy"} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <span className="label-mono absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">FIG. {String(index + 1).padStart(2, "0")} · {fig[lang]}</span>
                  <span className="absolute bottom-5 left-5 rounded-full border border-primary/30 bg-black/35 px-3 py-2 text-sm text-white backdrop-blur">{copy.from} {price(service.fromEur)}{service.fromPeriod === "month" ? " / mois" : service.fromPeriod === "year" ? " / an" : ""}</span>
                </a>
                <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-11">
                  <div>
                    <p className="label-mono text-sm uppercase tracking-[0.2em] text-primary">{fig[lang]}</p>
                    <h2 className="display-serif mt-4 text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">{t(service.title)}</h2>
                    <p className="mt-5 text-base leading-7 text-muted-foreground">{t(service.description)}</p>
                    <ul className="mt-6 grid gap-2 sm:grid-cols-3">{service.highlights.slice(0, 3).map((h, i) => <li key={i} className="rounded-xl border border-border/70 bg-background/50 px-3 py-3 text-sm leading-5 text-foreground">{t(h)}</li>)}</ul>
                  </div>
                  <div className="mt-8 border-t border-border/60 pt-5"><a href={href} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground">{copy.learn} <ArrowUpRight className="h-4 w-4" /></a></div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-3xl border border-primary/20 bg-primary/[0.04] px-8 py-12 sm:px-12 lg:px-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h3 className="display-serif text-3xl sm:text-4xl">{copy.ctaTitle}</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{copy.ctaLead}</p>
            </div>
            <a
              href="/#quote"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3.5 label-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all hover:gap-3"
            >
              Faire mon devis gratuit
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
