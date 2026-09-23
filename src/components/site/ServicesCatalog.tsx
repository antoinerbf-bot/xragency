import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { SurfaceDigital } from "./SurfaceDigital";
import { cn } from "@/lib/utils";
import { Parallax } from "./primitives";
import { ServiceIllustration } from "./ServiceIllustration";

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

const SERVICE_KICKER: Record<string, { fr: string; en: string; vi: string }> = {
  websites: { fr: "FLAGSHIP", en: "FLAGSHIP", vi: "FLAGSHIP" },
  branding: { fr: "IDENTITÉ", en: "IDENTITY", vi: "NHẬN DIỆN" },
  seo: { fr: "VISIBILITÉ", en: "VISIBILITY", vi: "HIỂN THỊ" },
  maps: { fr: "LOCAL", en: "LOCAL", vi: "ĐỊA PHƯƠNG" },
  social: { fr: "RÉSEAUX", en: "SOCIAL", vi: "MẠNG XÃ HỘI" },
  maintenance: { fr: "CARE", en: "CARE", vi: "BẢO TRÌ" },
  ecommerce: { fr: "COMMERCE", en: "COMMERCE", vi: "THƯƠNG MẠI" },
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
      enter: "Entrer dans l’expérience",
      quote: "Faire mon devis",
      compose: "Composer cette offre",
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
      enter: "Enter the experience",
      quote: "Build my quote",
      compose: "Build this offer",
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
      enter: "Bước vào trải nghiệm",
      quote: "Tạo báo giá",
      compose: "Chọn gói này",
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
          <p className="label-mono text-[10px] uppercase tracking-[0.32em] text-primary">{copy.eyebrow}</p>
          <h1 className="display-serif mt-5 max-w-5xl text-5xl leading-[0.9] sm:text-7xl lg:text-[6.5rem]">
            {copy.title1}
            <br />
            <span className="text-foreground/90">{copy.title2}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {copy.lead}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/#quote" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 label-mono text-[10px] font-semibold uppercase tracking-[.14em] text-primary-foreground transition hover:-translate-y-0.5">{copy.enter} <ArrowUpRight className="h-4 w-4" /></a>
            <a href="/#quote" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3 label-mono text-[10px] font-semibold uppercase tracking-[.14em] text-foreground transition hover:border-primary hover:text-primary">{copy.quote}</a>
          </div>
          <p className="mt-6 label-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
            01 // {String(catalog.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* Seven service scenes — editorial bento */}
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {catalog.map((service, index) => {
            const kicker = SERVICE_KICKER[service.id] ?? { fr: "SERVICE", en: "SERVICE", vi: "DỊCH VỤ" };
            const href = HREF[service.id] ?? `/services/${service.id}`;
            const featured = index === 0;
            return (
              <article key={service.id} className={cn("group relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/50 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/45 hover:shadow-2xl", featured ? "md:col-span-2 lg:col-span-7" : "lg:col-span-5")}>
                <div className={cn("relative overflow-hidden", featured ? "min-h-[560px]" : "min-h-[460px]")}>
                  <div className="absolute inset-0 p-3 sm:p-5"><ServiceIllustration service={service.id} title={t(service.title)} /></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                  <div className="relative z-10 flex h-full min-h-[460px] flex-col justify-between p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="label-mono rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[8px] uppercase tracking-[.2em] text-white/70 backdrop-blur">{kicker[lang]}</span>
                      <span className="label-mono text-[8px] text-white/40">{String(index + 1).padStart(2, "0")} / 07</span>
                    </div>
                    <div className="max-w-2xl">
                      <h2 className={cn("display-serif leading-[.9] text-white", featured ? "text-5xl sm:text-7xl" : "text-4xl sm:text-5xl")}>{t(service.title)}</h2>
                      <p className="mt-4 max-w-xl text-sm leading-6 text-white/60">{t(service.description)}</p>
                      <div className="mt-6 flex flex-wrap items-center gap-2.5">
                        <a href={`/?service=${service.id}#quote`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 label-mono text-[9px] font-semibold uppercase tracking-[.12em] text-black transition hover:-translate-y-0.5 hover:bg-white/90">{copy.compose} <ArrowUpRight className="h-4 w-4" /></a>
                        <span className="rounded-full border border-white/15 bg-black/30 px-4 py-3 label-mono text-[9px] text-white/70 backdrop-blur">{copy.from} {price(service.fromEur)}{service.fromPeriod === "month" ? " / mois" : service.fromPeriod === "year" ? " / an" : ""}</span>
                      </div>
                    </div>
                  </div>
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
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3.5 label-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all hover:gap-3"
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
