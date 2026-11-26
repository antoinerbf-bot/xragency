import { ArrowRight, Check, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/content";
import { useLang, type Lang } from "@/lib/i18n";
import { AddToCartBtn } from "@/components/site/Cart";

const SOCIAL = SERVICES.find((service) => service.id === "social");

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    sub: string;
    recommended: string;
    all: string;
  }
> = {
  fr: {
    eyebrow: "SOCIAL MEDIA · NOS FORMULES",
    title: "Développez votre présence en ligne et votre impact.",
    sub: "Des formules claires et transparentes, adaptées aux ambitions de chaque entreprise.",
    recommended: "Offre recommandée · Le plus choisi",
    all: "Voir le détail des offres Social Media",
  },
  en: {
    eyebrow: "SOCIAL MEDIA · OUR PLANS",
    title: "Build your online authority and real impact.",
    sub: "Transparent and scalable formulas designed around your growth goals.",
    recommended: "Recommended Plan · Most Popular",
    all: "Explore detailed Social Media plans",
  },
  vi: {
    eyebrow: "MẠNG XÃ HỘI · CÁC GÓI DỊCH VỤ",
    title: "Phát triển hiện diện trực tuyến và sức ảnh hưởng.",
    sub: "Các gói giải pháp minh bạch, phù hợp với từng giai đoạn phát triển của doanh nghiệp.",
    recommended: "Gói đề xuất · Được lựa chọn nhiều nhất",
    all: "Xem chi tiết các gói Social Media",
  },
  ar: {
    eyebrow: "وسائل التواصل · باقاتنا",
    title: "طوّر حضورك الرقمي وتأثيرك التجاري.",
    sub: "باقات واضحة وشفافة مصممة وفق أهدافك وطموحاتك.",
    recommended: "الباقة الموصى بها · الأكثر طلبًا",
    all: "عرض تفاصيل باقات وسائل التواصل",
  },
  ru: {
    eyebrow: "СОЦСЕТИ · НАШИ ТАРИФЫ",
    title: "Развивайте онлайн-присутствие и влияние бренда.",
    sub: "Понятные и прозрачные пакеты для амбициозных бизнес-целей.",
    recommended: "Рекомендуемый пакет · Чаще выбирают",
    all: "Подробнее о пакетах Social Media",
  },
};

export function HomeSocialOffers() {
  const { lang, t, price } = useLang();
  const c = COPY[lang] ?? COPY.fr;
  if (!SOCIAL) return null;

  const periodTxt =
    lang === "en"
      ? "/month"
      : lang === "vi"
        ? "/tháng"
        : lang === "ar"
          ? "/شهر"
          : lang === "ru"
            ? "/мес."
            : "/mois";

  return (
    <section
      id="offres-social-media"
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="border-b border-[#EBE5DC] bg-[#FAF8F5] py-16 text-[#1A1815] sm:py-20"
    >
      <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-[#A67C40]">
            {c.eyebrow}
          </p>
          <h2 className="mt-2.5 font-serif text-[clamp(1.9rem,3.4vw,3rem)] font-normal leading-tight tracking-[-0.02em] text-[#1A1815]">
            {c.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5C554B] sm:text-base">{c.sub}</p>
        </div>

        {/* 3 Pricing Cards (Center card highlighted in luxury obsidian & gold) */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {SOCIAL.plans.map((plan) => {
            const popular = Boolean(plan.popular);
            return (
              <article
                key={plan.name.fr}
                className={`relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 transition-all duration-300 ${
                  popular
                    ? "border-2 border-[#D1B07A] bg-[#1A1815] text-white shadow-2xl lg:-my-2"
                    : "border border-[#EBE5DC] bg-white text-[#1A1815] shadow-lg hover:border-[#D1B07A]"
                }`}
              >
                {popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#F0D5AA] via-[#E2C394] to-[#C99E65] px-4 py-1 text-[11px] font-bold text-[#14100B] shadow-lg">
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="h-3 w-3 fill-current" />
                      {c.recommended}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={`font-serif text-xl font-normal ${popular ? "text-white" : "text-[#1A1815]"}`}
                    >
                      {t(plan.name)}
                    </h3>
                  </div>

                  <div
                    className={`mt-6 flex items-baseline gap-1.5 border-b pb-6 ${popular ? "border-white/10" : "border-[#F0EBE3]"}`}
                  >
                    <span
                      className={`font-serif text-4xl font-normal ${popular ? "text-white" : "text-[#1A1815]"}`}
                    >
                      {price(plan.eur)}
                    </span>
                    <span className={`text-xs ${popular ? "text-white/60" : "text-[#5C554B]"}`}>
                      {periodTxt}
                    </span>
                  </div>

                  {/* Deliverables List (Exciting creative outputs first) */}
                  <ul className="mt-6 space-y-3">
                    {[...plan.features]
                      .sort((a, b) => {
                        const isCommitA = a.fr.toLowerCase().includes("engagement");
                        const isCommitB = b.fr.toLowerCase().includes("engagement");
                        if (isCommitA && !isCommitB) return 1;
                        if (!isCommitA && isCommitB) return -1;
                        return 0;
                      })
                      .map((feat, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2.5 text-xs ${popular ? "text-white/85" : "text-[#3A342D]"}`}
                      >
                        <Check
                          className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${popular ? "text-[#E5C696]" : "text-[#A67C40]"}`}
                          strokeWidth={2.5}
                        />
                        <span className="leading-relaxed">{t(feat)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`mt-8 pt-6 border-t ${popular ? "border-white/10" : "border-[#F0EBE3]"}`}
                >
                  <AddToCartBtn
                    item={{
                      serviceId: "social",
                      serviceName: t(SOCIAL.title),
                      planName: t(plan.name),
                      priceEur: plan.eur,
                      period: plan.period,
                      periodLabel: periodTxt,
                      commitment: plan.features[0] ? t(plan.features[0]) : undefined,
                    }}
                    popular={popular}
                    className={`w-full rounded-full py-3.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      popular
                        ? "bg-gradient-to-r from-[#F0D5AA] via-[#E2C394] to-[#C99E65] text-[#14100B] shadow-[0_8px_24px_-4px_rgba(229,198,150,0.55)] hover:brightness-110"
                        : "bg-[#1A1815] text-white hover:bg-[#332F2B]"
                    }`}
                  />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/services/$serviceId"
            params={{ serviceId: "social" }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#A67C40] transition hover:text-[#1A1815]"
          >
            <span>{c.all}</span>
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
