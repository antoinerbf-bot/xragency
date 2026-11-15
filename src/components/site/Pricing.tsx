import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MessageSquare, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT, PERIOD_LABEL, SERVICES } from "@/lib/content";
import { Reveal, SectionHeading } from "./primitives";
import { AddToCartBtn } from "./Cart";

const CATEGORIES = [
  {
    id: "all",
    label: { fr: "Tous les services (7)", en: "All Services (7)", vi: "Tất cả dịch vụ (7)", ar: "جميع الخدمات (7)", ru: "Все услуги (7)" },
  },
  {
    id: "web",
    label: { fr: "Sites Web", en: "Websites", vi: "Website", ar: "المواقع", ru: "Сайты" },
    ids: ["websites"],
  },
  {
    id: "visibility",
    label: { fr: "Visibilité Google", en: "Google Visibility", vi: "Hiển thị Google", ar: "الظهور على Google", ru: "Видимость в Google" },
    ids: ["maps", "seo"],
  },
  {
    id: "brand",
    label: { fr: "Branding & Réseaux sociaux", en: "Branding & Social Media", vi: "Thương hiệu & Mạng xã hội", ar: "الهوية ووسائل التواصل", ru: "Брендинг и соцсети" },
    ids: ["branding", "social"],
  },
  {
    id: "operations",
    label: { fr: "Maintenance & Solutions métier", en: "Maintenance & Business Solutions", vi: "Bảo trì & Giải pháp doanh nghiệp", ar: "الصيانة وحلول الأعمال", ru: "Поддержка и бизнес-решения" },
    ids: ["maintenance", "robotics"],
  },
];

export function Pricing() {
  const { t, price, lang } = useLang();
  const pricingCopy = ({
    fr: { detailed: "Formules & Tarifs détaillés", cash: "Comptant", monthly: "Mensuel", perMonth: "/mois" },
    en: { detailed: "Plans & Detailed Pricing", cash: "Pay in full", monthly: "Monthly", perMonth: "/month" },
    vi: { detailed: "Gói dịch vụ & Bảng giá chi tiết", cash: "Thanh toán một lần", monthly: "Hàng tháng", perMonth: "/tháng" },
    ar: { detailed: "الباقات والأسعار التفصيلية", cash: "دفع كامل", monthly: "شهريًا", perMonth: "/شهر" },
    ru: { detailed: "Пакеты и подробные цены", cash: "Полная оплата", monthly: "Ежемесячно", perMonth: "/мес." },
  } as const)[lang];
  const buildQuoteMessage = ({
    fr: (service: string, plan: string, amount: string, installment: boolean) => `Bonjour XR Agency, je suis intéressé par votre prestation "${service}" — Formule "${plan}" (${amount}${installment ? " / mois sur 12 mois" : ""}). Pouvons-nous échanger à ce sujet ?`,
    en: (service: string, plan: string, amount: string, installment: boolean) => `Hello XR Agency, I'm interested in your "${service}" service — "${plan}" plan (${amount}${installment ? " / month for 12 months" : ""}). Could we discuss it?`,
    vi: (service: string, plan: string, amount: string, installment: boolean) => `Xin chào XR Agency, tôi quan tâm đến dịch vụ "${service}" — gói "${plan}" (${amount}${installment ? " / tháng trong 12 tháng" : ""}). Chúng ta có thể trao đổi thêm không?`,
    ar: (service: string, plan: string, amount: string, installment: boolean) => `مرحبًا XR Agency، أنا مهتم بخدمة "${service}" — باقة "${plan}" (${amount}${installment ? " / شهريًا لمدة 12 شهرًا" : ""}). هل يمكننا مناقشة التفاصيل؟`,
    ru: (service: string, plan: string, amount: string, installment: boolean) => `Здравствуйте, XR Agency! Меня интересует услуга "${service}" — пакет "${plan}" (${amount}${installment ? " / мес. в течение 12 месяцев" : ""}). Можем обсудить детали?`,
  } as const)[lang];
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeServiceId, setActiveServiceId] = useState(SERVICES[0].id);

  const filteredServices = SERVICES.filter((s) => {
    if (activeCategory === "all") return true;
    const cat = CATEGORIES.find((c) => c.id === activeCategory);
    return cat?.ids?.includes(s.id);
  });

  const currentService =
    filteredServices.find((s) => s.id === activeServiceId) || filteredServices[0] || SERVICES[0];

  return (
    <section id="pricing" className="relative py-12 sm:py-18 lg:py-24">
      {/* Background Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{ background: "var(--gradient-halo)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          label={UI.pricingLabel}
          line1={UI.pricingTitle1}
          line2={UI.pricingTitle2}
          lead={UI.pricingLead}
        />

        {/* 1. Category Quick Filters */}
        <Reveal delay={60}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  const firstInCat = SERVICES.find(
                    (s) => cat.id === "all" || cat.ids?.includes(s.id),
                  );
                  if (firstInCat) setActiveServiceId(firstInCat.id);
                }}
                className={cn(
                  "label-mono rounded-full border px-3.5 py-1.5 text-xs transition-all duration-300",
                  activeCategory === cat.id
                    ? "border-primary bg-primary text-primary-foreground font-semibold shadow-md"
                    : "border-border bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                {t(cat.label)}
              </button>
            ))}
          </div>
        </Reveal>

        {/* 2. Service Selector Pills */}
        <Reveal delay={100}>
          <div className="mt-4 -mx-6 px-6 overflow-x-auto sm:mx-0 sm:px-0">
            <div className="flex gap-2 w-max sm:flex-wrap sm:w-auto sm:justify-center">
              {filteredServices.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveServiceId(s.id)}
                  className={cn(
                    "label-mono rounded-full border px-3.5 py-2 text-xs transition-all duration-300",
                    currentService.id === s.id
                      ? "border-primary bg-primary/15 text-primary ring-1 ring-primary font-semibold"
                      : "border-border bg-card/40 text-muted-foreground hover:border-primary/50 hover:text-foreground",
                  )}
                >
                  <span className="opacity-50 mr-1">{s.num}</span>
                  {t(s.title)}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 3. Service Header */}
        <Reveal delay={140}>
          <div className="mt-8 rounded-2xl border border-border/80 bg-accent/20 px-5 py-4 sm:px-6 text-center max-w-3xl mx-auto">
            <span className="label-mono text-xs uppercase tracking-widest text-primary">
              {pricingCopy.detailed} · {currentService.num}
            </span>
            <h3 className="display-serif mt-1.5 text-xl sm:text-2xl text-foreground">
              {t(currentService.title)}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">
              {t(currentService.description)}
            </p>
          </div>
        </Reveal>



        {/* 4. Pricing Cards */}
        <div
          key={currentService.id}
          className="mt-8 sm:mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {currentService.plans.map((p, i) => {
            const displayPrice = p.eur;
            const displayPeriod = p.period;

            const waMessage = encodeURIComponent(
              buildQuoteMessage(t(currentService.title), t(p.name), price(displayPrice), false),
            );

            return (
              <Reveal key={`${currentService.id}-${i}`} delay={i * 70}>
                <article
                  className={cn(
                    "surface-plate relative flex h-full flex-col justify-between rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:-translate-y-1",
                    p.popular ? "border-primary bg-primary/5 shadow-lg" : "border-border bg-card",
                  )}
                >
                  {p.popular ? (
                    <span className="label-mono absolute -top-3 left-7 rounded-full bg-primary px-3 py-0.5 text-xs text-primary-foreground font-semibold shadow-md">
                      {t(UI.popular)}
                    </span>
                  ) : null}

                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="display-serif text-xl text-foreground">{t(p.name)}</h4>
                    </div>

                    {p.audience ? (
                      <p className="label-mono mt-1.5 text-xs text-muted-foreground">
                        {t(p.audience)}
                      </p>
                    ) : null}

                    {/* Price display — compact */}
                    <div className="mt-5 border-y border-border/60 py-3.5">
                      <div className="flex items-baseline gap-2">
                        {p.isQuoteOnly && (
                          <span className="label-mono text-xs text-muted-foreground">
                            {t({ fr: "À partir de", en: "From", vi: "Từ", ar: "ابتداءً من", ru: "От" })}
                          </span>
                        )}
                        <span className="display-serif text-3xl font-bold text-primary">
                          {price(displayPrice)}
                        </span>
                        <span className="label-mono flex flex-col items-start gap-1 text-xs text-muted-foreground">
                          <span>{p.isQuoteOnly ? t({ fr: "· sur mesure", en: "· custom", vi: "· theo yêu cầu", ar: "· مخصص", ru: "· расчёт" }) : t(PERIOD_LABEL[displayPeriod])}</span>
                        </span>
                      </div>
                    </div>

                    {/* Feature bullet points */}
                    <ul className="mt-5 space-y-2.5">
                      {p.features.map((f, k) => (
                        <li key={k} className="flex items-start gap-2 text-xs text-foreground/90">
                          <span className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary">✓</span>
                          <span className="leading-relaxed">{t(f)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 space-y-2 pt-4 border-t border-border/50">
                    {p.isQuoteOnly ? (
                      <a
                        href={`/?service=${currentService.id === "maps" ? "maps_top3" : currentService.id}#quote`}
                        className="label-mono flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-[11px] font-semibold text-primary-foreground shadow-md transition hover:opacity-90"
                      >
                        {t({ fr: "Configurer mon estimation sur mesure", en: "Configure my custom estimate", vi: "Tính báo giá theo yêu cầu", ar: "احسب تقديرك المخصص", ru: "Рассчитать индивидуальную смету" })}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <AddToCartBtn
                        item={{
                          serviceId: currentService.id === "maps"
                            ? p.eur === 99
                              ? "maps_essentiel"
                              : p.eur === 169
                                ? "maps_croissance"
                                : "maps_intensif"
                            : currentService.id,
                          serviceName: t(currentService.title),
                          planName: t(p.name),
                          priceEur: displayPrice,
                          period: displayPeriod as "once" | "month" | "year",
                          periodLabel: t(PERIOD_LABEL[displayPeriod]),
                          commitment: p.commitmentMonths
                            ? (lang === "en" ? "Minimum " + p.commitmentMonths + " months" : lang === "vi" ? "Cam kết tối thiểu " + p.commitmentMonths + " tháng" : lang === "ar" ? "الحد الأدنى " + p.commitmentMonths + " أشهر" : lang === "ru" ? "Минимум " + p.commitmentMonths + " мес." : "Engagement minimum " + p.commitmentMonths + " mois")
                            : undefined,
                        }}
                        popular={p.popular}
                      />
                    )}

                    {/* Quick WhatsApp fallback */}
                    <a
                      href={`${CONTACT.whatsapp}?text=${waMessage}`}
                      target="_blank"
                      rel="noreferrer"
                      className="label-mono flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card/60 py-2.5 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground min-h-[38px]"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />
                      Demande rapide sur WhatsApp
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-7 max-w-3xl text-center text-[10px] leading-relaxed text-muted-foreground">
            {t({
              fr: "Prix de référence en EUR. Le traitement de la TVA est confirmé sur le devis ou la facture selon le régime fiscal du prestataire et la localisation du client. Les conversions internationales sont indicatives.",
              en: "EUR reference prices. VAT treatment is confirmed on the quote or invoice according to the provider's tax status and the client's location. International currency conversions are indicative.",
              vi: "Giá tham chiếu bằng EUR. Việc áp dụng VAT sẽ được xác nhận trên báo giá hoặc hóa đơn theo chế độ thuế của nhà cung cấp và địa điểm của khách hàng. Quy đổi ngoại tệ chỉ mang tính tham khảo.",
              ar: "الأسعار المرجعية باليورو. تتم مراجعة ضريبة القيمة المضافة في عرض السعر أو الفاتورة وفق الوضع الضريبي للمزود وموقع العميل. تحويلات العملات الدولية إرشادية.",
              ru: "Базовые цены указаны в EUR. Применение НДС подтверждается в смете или счёте с учётом налогового статуса исполнителя и местонахождения клиента. Международная конвертация носит справочный характер."
            })}
          </p>
        </Reveal>

        {/* Link to dedicated service page */}
        <Reveal delay={220}>
          <div className="mt-10 text-center">
            <Link
              to="/services/$serviceId"
              params={{ serviceId: currentService.id }}
              className="label-mono inline-flex items-center gap-2 text-xs text-primary font-semibold transition-all hover:translate-x-1"
            >
              Consulter la page complète pour « {t(currentService.title)} »
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
