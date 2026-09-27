import { ArrowUpRight, FileImage, Search, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { SERVICES, CONTACT } from "@/lib/content";
import { Parallax, Reveal } from "./primitives";
import { ServiceIllustration } from "./ServiceIllustration";

const FEATURED_IDS = ["websites", "branding", "seo", "maps", "social", "maintenance"];
const DISPLAY_NUM: Record<string, string> = { websites: "01", branding: "02", seo: "03", maps: "04", social: "05", maintenance: "06" };
const DISPLAY_PRICE: Record<string, number | null> = { websites: 499, branding: 179, seo: 299, maps: 990, social: 299, maintenance: 29 };

export function HomeServices() {
  const { t, price, lang } = useLang();
  const copy = {
    fr: { expertise: "06 EXPERTISES", title: "Des images qui montrent", titleAccent: "ce que nous construisons.", lead: "Chaque expertise possède son propre univers visuel. Pas d'illustrations génériques : des scènes, des matières et des détails qui racontent le métier.", discover: "Voir le service", from: "À partir de", cta: "Recevoir une maquette gratuite", audit: "Lancer mon audit", proof: "DIRECTION ARTISTIQUE · PHOTOGRAPHIE · DIGITAL" },
    en: { expertise: "06 DISCIPLINES", title: "Visuals that show", titleAccent: "what we build.", lead: "Every discipline has its own visual universe. No generic illustrations: scenes, materials and details that make the work tangible.", discover: "View service", from: "From", cta: "Get a free mockup", audit: "Start my audit", proof: "ART DIRECTION · PHOTOGRAPHY · DIGITAL" },
    vi: { expertise: "06 CHUYÊN MÔN", title: "Hình ảnh cho thấy", titleAccent: "những gì chúng tôi xây dựng.", lead: "Mỗi chuyên môn có một ngôn ngữ hình ảnh riêng. Không minh họa chung chung: cảnh, chất liệu và chi tiết đúng với ngành.", discover: "Xem dịch vụ", from: "Từ", cta: "Nhận mockup miễn phí", audit: "Bắt đầu audit", proof: "ART DIRECTION · PHOTOGRAPHY · DIGITAL" },
    ar: { expertise: "06 تخصصات", title: "صور تُظهر", titleAccent: "ما نبنيه.", lead: "لكل تخصص عالم بصري خاص. لا رسومات عامة: مشاهد وتفاصيل ومواد مرتبطة بالعمل الحقيقي.", discover: "عرض الخدمة", from: "ابتداءً من", cta: "احصل على نموذج مجاني", audit: "ابدأ التدقيق", proof: "ART DIRECTION · PHOTOGRAPHY · DIGITAL" },
    ru: { expertise: "06 НАПРАВЛЕНИЙ", title: "Визуал, который показывает", titleAccent: "что мы создаём.", lead: "У каждого направления свой визуальный язык. Никаких шаблонных иллюстраций — только сцены и детали по делу.", discover: "Открыть услугу", from: "От", cta: "Получить бесплатный макет", audit: "Запустить аудит", proof: "ART DIRECTION · PHOTOGRAPHY · DIGITAL" },
  }[lang] ?? { expertise: "06 DISCIPLINES", title: "Visuals that show", titleAccent: "what we build.", lead: "Every discipline has its own visual universe.", discover: "View service", from: "From", cta: "Get a free mockup", audit: "Start my audit", proof: "ART DIRECTION · PHOTOGRAPHY · DIGITAL" };

  const featured = FEATURED_IDS.map((id) => SERVICES.find((service) => service.id === id)).filter(Boolean) as typeof SERVICES;
  const hrefFor = (id: string) => id === "maintenance" ? "/services/webcare" : `/services/${id}`;
  const mockupUrl = CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €).");

  return (
    <section id="homepage-services" className="relative overflow-hidden bg-background py-20 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,hsl(var(--primary)/.08),transparent_28%),radial-gradient(circle_at_85%_75%,hsl(var(--primary)/.05),transparent_30%)]" />
      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Parallax speed={-0.025}>
          <div className="mb-12 grid gap-8 border-b border-border/70 pb-10 lg:grid-cols-[1fr_.55fr] lg:items-end lg:mb-16">
            <div>
              <span className="label-mono text-[9px] tracking-[.3em] text-primary">XR AGENCY · {copy.expertise}</span>
              <h2 className="display-serif mt-5 max-w-5xl text-5xl leading-[.86] tracking-[-.05em] sm:text-7xl lg:text-[6.2rem]">
                {copy.title}<br /><em className="text-primary not-italic">{copy.titleAccent}</em>
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-muted-foreground lg:pb-2">{copy.lead}</p>
          </div>
        </Parallax>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, index) => {
            const startingPrice = DISPLAY_PRICE[service.id];
            return (
              <Reveal key={service.id} delay={index * 70}>
                <article className="group relative h-full overflow-hidden rounded-[2rem] border border-border/80 bg-card/55 p-2 shadow-[0_35px_90px_-60px_rgba(0,0,0,.8)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_45px_110px_-55px_hsl(var(--primary)/.18)]">
                  <Parallax speed={index % 2 === 0 ? 0.018 : -0.018}>
                    <ServiceIllustration service={service.id} title={t(service.title)} />
                  </Parallax>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="label-mono text-[8px] tracking-[.2em] text-primary">{DISPLAY_NUM[service.id]}</span>
                        <span className="h-px w-6 bg-border" />
                        <span className="label-mono text-[8px] tracking-[.18em] text-muted-foreground">XR AGENCY</span>
                      </div>
                      <span className="label-mono text-[8px] text-muted-foreground/60">{String(index + 1).padStart(2,"0")} / 06</span>
                    </div>
                    <h3 className="display-serif mt-4 text-3xl leading-none sm:text-4xl">{t(service.title)}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{t(service.description)}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <Link to={hrefFor(service.id)} className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-3 label-mono text-[8px] font-semibold tracking-[.1em] text-background transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground">
                        {copy.discover}<ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                      {startingPrice && <span className="rounded-full border border-border bg-background/70 px-3.5 py-3 label-mono text-[8px] tracking-[.08em] text-muted-foreground">{copy.from} {price(startingPrice)}{service.fromPeriod === "month" ? (lang === "fr" ? " / mois" : " / month") : service.fromPeriod === "year" ? (lang === "fr" ? " / an" : " / year") : ""}</span>}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-card/60 p-6 shadow-[0_35px_100px_-65px_rgba(0,0,0,.75)] sm:p-8 lg:mt-12 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
              <div>
                <p className="label-mono text-[8px] tracking-[.2em] text-primary">{copy.proof}</p>
                <h3 className="mt-2 text-lg font-semibold sm:text-xl">Une direction visuelle cohérente sur tout le parcours.</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">Du premier écran à la page service, la même exigence : photographie, profondeur, mouvement et conversion.</p>
              </div>
            </div>
            <div className="mt-5 flex shrink-0 flex-col gap-2 sm:flex-row lg:mt-0">
              <a href={mockupUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 label-mono text-[9px] font-semibold tracking-[.1em] text-primary-foreground transition hover:-translate-y-0.5"><FileImage className="h-4 w-4" />{copy.cta}</a>
              <a href="#audit" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3.5 label-mono text-[9px] font-semibold tracking-[.1em] transition hover:-translate-y-0.5 hover:border-primary/40"><Search className="h-4 w-4 text-primary" />{copy.audit}</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
