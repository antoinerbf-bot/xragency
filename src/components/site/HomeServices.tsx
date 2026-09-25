import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { Parallax, Reveal } from "./primitives";
import { ServiceIllustration } from "./ServiceIllustration";
import { XR_JOURNEY_PHOTO } from "@/lib/photography";

const FEATURED_IDS = ["websites", "branding", "seo", "maps", "social", "maintenance", "ecommerce"];
const DISPLAY_NUM: Record<string, string> = {
  websites: "01",
  branding: "02",
  seo: "03",
  maps: "04",
  social: "05",
  maintenance: "06",
  ecommerce: "07",
};
const DISPLAY_PRICE: Record<string, number | null> = {
  websites: 499,
  branding: 199,
  seo: 299,
  maps: 990,
  social: 299,
  maintenance: 29,
  ecommerce: 1490,
};


export function HomeServices() {
  const { t, price, lang } = useLang();
  const copy = {
    fr: { expertise: "07 EXPERTISES", title: "Des solutions sur mesure", titleAccent: "pour chaque ambition.", lead: "Sept offres pensées comme un seul écosystème : stratégie, création, visibilité et performance. Faites défiler pour voir chaque univers.", discover: "Découvrir", from: "À partir de", ecommerce: "E-commerce & réservation", scroll: "PARALLAX / SCROLL", kicker: "UNE AGENCE · UNE VISION", partner: "Plus qu’un prestataire,", partnerAccent: "un partenaire de croissance.", paragraph: "Une direction créative forte, une technologie solide et des expériences digitales conçues pour durer." },
    en: { expertise: "07 DISCIPLINES", title: "Bespoke digital solutions", titleAccent: "for every ambition.", lead: "Seven offers designed as one ecosystem: strategy, creation, visibility and performance. Scroll to explore each discipline.", discover: "Discover", from: "From", ecommerce: "E-commerce & booking", scroll: "PARALLAX / SCROLL", kicker: "ONE AGENCY · ONE VISION", partner: "More than a provider,", partnerAccent: "a growth partner.", paragraph: "Strong creative direction, solid technology and digital experiences built to last." },
    vi: { expertise: "07 CHUYÊN MÔN", title: "Giải pháp số theo yêu cầu", titleAccent: "cho mọi tham vọng.", lead: "Bảy dịch vụ trong một hệ sinh thái: chiến lược, sáng tạo, hiển thị và hiệu suất. Cuộn để khám phá từng chuyên môn.", discover: "Khám phá", from: "Từ", ecommerce: "E-commerce & đặt chỗ", scroll: "PARALLAX / SCROLL", kicker: "MỘT AGENCY · MỘT TẦM NHÌN", partner: "Hơn cả một nhà cung cấp,", partnerAccent: "một đối tác tăng trưởng.", paragraph: "Định hướng sáng tạo mạnh, công nghệ vững và trải nghiệm số được xây dựng để bền lâu." },
  }[lang];
  const featured = FEATURED_IDS.map((id) =>
    SERVICES.find((service) => service.id === id),
  ).filter(Boolean) as typeof SERVICES;

  const hrefFor = (id: string) =>
    id === "maintenance" ? "/services/webcare" : `/services/${id}`;

  return (
    <section
      id="homepage-services"
      aria-label={lang === "fr" ? "Les sept offres XR Agency" : lang === "en" ? "XR Agency seven services" : "Bảy dịch vụ của XR Agency"}
      className="relative overflow-hidden bg-[#07090b] py-20 text-white sm:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,.07),transparent_35%),radial-gradient(circle_at_90%_45%,rgba(255,180,90,.07),transparent_32%)]" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <Parallax speed={-0.035}>
          <div className="mb-12 flex flex-col justify-between gap-8 border-b border-white/10 pb-10 lg:mb-16 lg:flex-row lg:items-end">
            <div>
              <span className="label-mono text-[9px] tracking-[0.32em] text-white/45">
                XR AGENCY · {copy.expertise}
              </span>
              <h2 className="display-serif mt-4 max-w-4xl text-5xl leading-[0.88] text-white sm:text-7xl lg:text-[6.6rem]">
                {copy.title}
                <br />
                {copy.titleAccent}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/50 lg:pb-2">
              {copy.lead}
            </p>
          </div>
        </Parallax>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {featured.map((service, index) => {
            const startingPrice = DISPLAY_PRICE[service.id];
            const featuredLarge = index < 2;

            return (
              <Reveal key={service.id} delay={index * 70} className={featuredLarge ? "sm:col-span-1" : ""}>
                <article className="group relative isolate min-h-[500px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0b0e11] shadow-[0_30px_90px_-45px_rgba(0,0,0,.95)] sm:min-h-[560px]">
                  <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-5">
                    <ServiceIllustration service={service.id} title={t(service.title)} />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />

                  <div className="relative z-10 flex min-h-[500px] flex-col justify-between p-6 sm:min-h-[560px] sm:p-9 lg:p-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 label-mono text-[9px] tracking-[0.22em] text-white/45">
                        <span className="text-white">{DISPLAY_NUM[service.id]}</span>
                        <span className="h-px w-8 bg-white/20" />
                        <span>XR AGENCY</span>
                      </div>
                      <span className="rounded-full border border-white/15 bg-black/20 px-3 py-2 label-mono text-[8px] tracking-[0.15em] text-white/50 backdrop-blur-md">
                        {String(index + 1).padStart(2, "0")} / 07
                      </span>
                    </div>

                    <Parallax speed={-0.028}>
                      <div className="max-w-2xl">
                        <div className="mb-4 flex items-center gap-2">
                          <Sparkles className="h-3.5 w-3.5 text-white/70" />
                          <span className="label-mono text-[8px] tracking-[0.2em] text-white/55">
                            {t(service.short)}
                          </span>
                        </div>

                        <h3 className="display-serif text-4xl leading-[0.9] text-white sm:text-6xl lg:text-[5.2rem]">
                          {t(service.title)}
                        </h3>

                        <p className="mt-5 max-w-xl text-sm leading-6 text-white/60 sm:text-[15px]">
                          {t(service.description)}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-2.5">
                          <Link
                            to={hrefFor(service.id)}
                            className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 label-mono text-[9px] font-semibold tracking-[0.12em] text-black transition hover:-translate-y-0.5 hover:bg-white/90"
                          >
                            {copy.discover} <ArrowUpRight className="h-4 w-4" />
                          </Link>

                          {startingPrice && (
                            <span className="rounded-full border border-white/15 bg-black/20 px-4 py-3 label-mono text-[9px] tracking-[0.12em] text-white/65 backdrop-blur-md">
                              {copy.from} {price(startingPrice)}
                              {service.fromPeriod === "month" ? (lang === "fr" ? " / mois" : lang === "en" ? " / month" : " / tháng") : service.fromPeriod === "year" ? (lang === "fr" ? " / an" : lang === "en" ? " / year" : " / năm") : ""}
                            </span>
                          )}

                          {service.id === "websites" && (
                            <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-3 label-mono text-[9px] tracking-[0.1em] text-white/70 backdrop-blur-md">
                              <Check className="h-3 w-3" />
                              {copy.ecommerce}
                            </span>
                          )}
                        </div>
                      </div>
                    </Parallax>

                    <div className="flex items-center justify-between border-t border-white/15 pt-4">
                      <div className="flex gap-1.5">
                        {featured.map((_, dot) => (
                          <span
                            key={dot}
                            className={`h-1 rounded-full transition-all ${dot === index ? "w-10 bg-white" : "w-2 bg-white/25"}`}
                          />
                        ))}
                      </div>
                      <span className="label-mono text-[8px] tracking-[0.18em] text-white/35">
                        {copy.scroll}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Parallax speed={0.035} className="mt-16 sm:mt-24">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-black">
            <div className="absolute inset-0 opacity-85"><img src={XR_JOURNEY_PHOTO} alt="" aria-hidden="true" className="h-full w-full object-cover object-center transition-transform duration-[1800ms] hover:scale-[1.04]" /></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#050708] via-[#050708]/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050708]/90 via-transparent to-[#050708]/10" />

            <div className="relative z-10 flex min-h-[360px] items-end p-7 sm:p-10 lg:p-14">
              <div className="max-w-xl">
                <span className="label-mono text-[9px] tracking-[0.3em] text-white/45">
                  {copy.kicker}
                </span>
                <h3 className="display-serif mt-4 text-4xl leading-[0.9] sm:text-6xl">
                  {copy.partner}
                  <br />
                  <em className="text-white/55">{copy.partnerAccent}</em>
                </h3>
                <p className="mt-5 max-w-lg text-sm leading-6 text-white/55">
                  {copy.paragraph}
                </p>
              </div>
            </div>

            <div className="pointer-events-none absolute right-[-8%] top-[-14%] hidden h-[125%] w-[55%] rounded-full border border-white/10 lg:block" />
            <div className="pointer-events-none absolute right-[7%] top-[22%] hidden h-3 w-3 rounded-full bg-white/70 shadow-[0_0_30px_rgba(255,255,255,.7)] lg:block" />
          </div>
        </Parallax>
      </div>
    </section>
  );
}
