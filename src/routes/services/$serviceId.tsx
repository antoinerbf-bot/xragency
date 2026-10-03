import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Plus, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SERVICES, PERIOD_LABEL, CONTACT, FAQ } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { EmberButton, Parallax, Reveal } from "@/components/site/primitives";
import { MapsSimulator } from "@/components/site/MapsSimulator";
import { AddToCartBtn } from "@/components/site/Cart";
import { ServiceIllustration } from "@/components/site/ServiceIllustration";
import { cn } from "@/lib/utils";

const SERVICE_ALIASES: Record<string, string> = {
  "seo-domination": "seo",
  "seo-domination-system": "seo",
  seo: "seo",
  "referencement-naturel": "seo",
  websites: "websites",
  "site-web": "websites",
  "creation-site-web": "websites",
  "creation-de-sites-web": "websites",
  ecommerce: "websites",
  "e-commerce": "websites",
  "e-commerce-et-reservation": "websites",
  branding: "branding",
  "identite-visuelle": "branding",
  maps: "maps",
  "google-maps": "maps",
  "google-maps-top-3": "maps",
  social: "social",
  "community-management": "social",
  "social-media": "social",
  maintenance: "maintenance",
  webcare: "maintenance",
  "maintenance-cloud": "maintenance",
  refonte: "refonte",
  "refonte-site": "refonte",
  "refonte-de-site-web": "refonte",
  ads: "ads",
  "google-ads": "ads",
  "publicite-digitale": "ads",
  strategy: "strategy",
  "strategie-digitale": "strategy",
  conseil: "strategy",
};

export const Route = createFileRoute("/services/$serviceId")({
  loader: ({ params }) => {
    const raw = params.serviceId.toLowerCase();
    const resolvedId = SERVICE_ALIASES[raw] ?? raw;
    const service = SERVICES.find((s) => s.id === resolvedId);
    if (!service) throw notFound();
    return { service, canonicalId: resolvedId };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Service — XR Agency" }] };
    return {
      meta: [
        { title: `${s.title.fr} — XR Agency` },
        { name: "description", content: `${s.short.fr} — Tarifs, livrables et méthode XR Agency.` },
        { property: "og:title", content: `${s.title.fr} — XR Agency` },
        { property: "og:description", content: `${s.short.fr} — Studio digital & IA.` },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: "https://xragencyai.com/services/" + loaderData.canonicalId }],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service } = Route.useLoaderData();
  const { t, price, lang } = useLang();
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(
    Math.max(0, service.plans.findIndex((p) => p.popular)),
  );
  const [installmentSelections, setInstallmentSelections] = useState<Record<number, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showSticky, setShowSticky] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [service.id]);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 620);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isCustomMaps = service.id === "maps";
  const planForWa = service.plans[selectedPlanIndex];
  const planIsInstallmentWa =
    service.id === "websites" &&
    installmentSelections[selectedPlanIndex] === true &&
    planForWa?.period === "once";

  const waPrefilled = encodeURIComponent(
    `Bonjour XR Agency, je suis intéressé par votre service "${t(service.title)}" (Forfait: "${planForWa ? t(planForWa.name) : ""}"${planIsInstallmentWa ? " en mensualités sur 12 mois" : ""}). Pouvons-nous échanger ?`,
  );
  const waUrl = `${CONTACT.whatsapp}?text=${waPrefilled}`;
  const faqItems = service.serviceFaqs?.length ? service.serviceFaqs : FAQ.slice(0, 4);
  const steps = service.steps ?? [];

  const copy = {
    overview: {
      fr: "Une page. Une expertise. Tout ce qu’il faut pour comprendre et agir.",
      en: "One page. One expertise. Everything needed to understand and act.",
      vi: "Một trang. Một chuyên môn. Mọi thứ cần để hiểu và hành động.",
      ar: "صفحة واحدة. خبرة واحدة. كل ما يلزم للفهم واتخاذ الخطوة التالية.",
      ru: "Одна страница. Одна экспертиза. Всё необходимое для решения.",
    },
    included: {
      fr: "Ce que vous obtenez",
      en: "What you get",
      vi: "Bạn nhận được gì",
      ar: "ما تحصل عليه",
      ru: "Что вы получаете",
    },
    process: {
      fr: "Comment on le fait",
      en: "How we do it",
      vi: "Cách chúng tôi thực hiện",
      ar: "كيف ننفذ",
      ru: "Как мы работаем",
    },
    pricing: {
      fr: "Choisir la bonne formule",
      en: "Choose the right plan",
      vi: "Chọn gói phù hợp",
      ar: "اختر الباقة المناسبة",
      ru: "Выберите подходящий пакет",
    },
    pricingLead: {
      fr: "Les prix et le périmètre restent exactement ceux de votre offre officielle. Choisissez une formule pour la commander ou nous écrire directement.",
      en: "Pricing and scope stay exactly as in the official offer. Select a plan to order or contact us directly.",
      vi: "Giá và phạm vi giữ nguyên theo gói chính thức. Chọn gói để đặt hoặc liên hệ trực tiếp.",
      ar: "تبقى الأسعار والنطاق كما هو في العرض الرسمي. اختر باقة للطلب أو تواصل معنا مباشرة.",
      ru: "Цены и состав полностью соответствуют официальному предложению. Выберите пакет для заказа или связи.",
    },
    faq: {
      fr: "Questions essentielles",
      en: "Essential questions",
      vi: "Câu hỏi quan trọng",
      ar: "الأسئلة الأساسية",
      ru: "Главные вопросы",
    },
  };

  return (
    <div className="xr-section min-h-screen overflow-x-hidden">
      <Nav />

      <main className="pt-28">
        <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b xr-line py-4">
            <Link to="/services" className="label-mono inline-flex items-center gap-2 xr-muted hover:xr-accent">
              <ArrowLeft className="h-3.5 w-3.5" />
              {t({ fr: "Tous les services", en: "All services", vi: "Tất cả dịch vụ", ar: "كل الخدمات", ru: "Все услуги" })}
            </Link>
            <div className="label-mono flex items-center gap-2 text-[7px] xr-muted-2">
              <Link to="/" className="hover:xr-accent">Accueil</Link>
              <span>/</span>
              <span>{t(service.title)}</span>
            </div>
          </div>
        </div>

        <section className="xr-section relative overflow-hidden border-b xr-line py-12 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
            <div className="grid items-center gap-10 lg:grid-cols-[.83fr_1.17fr] lg:gap-16">
              <div>
                <Reveal>
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--xr-ink)] text-[var(--xr-bg)]">
                      <span className="label-mono text-[7px]">{service.num}</span>
                    </span>
                    <span className="label-mono text-[7px] tracking-[.24em] xr-muted-2">XR AGENCY / SERVICE</span>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <h1 className="display-serif mt-7 max-w-4xl text-[clamp(3.2rem,7vw,7.4rem)] leading-[.78] tracking-[-.07em]">
                    {t(service.title)}
                  </h1>
                </Reveal>
                <Reveal delay={140}>
                  <p className="mt-7 max-w-2xl text-base leading-7 xr-muted sm:text-lg">{t(service.description)}</p>
                </Reveal>
                <Reveal delay={200}>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {service.highlights.slice(0, 4).map((h, i) => (
                      <span key={i} className="rounded-full border xr-line bg-[var(--xr-surface)] px-3 py-2 label-mono text-[7px] xr-muted">
                        {t(h)}
                      </span>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={260}>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <EmberButton href="#plans">{t(UI.explorePacks)}</EmberButton>
                    <EmberButton href={`/?service=${service.id}#quote`} variant="outline">
                      {t({ fr: "Composer mon projet", en: "Build my project", vi: "Tạo dự án", ar: "تكوين مشروعي", ru: "Собрать проект" })}
                    </EmberButton>
                  </div>
                </Reveal>
                <Reveal delay={320}>
                  <div className="mt-9 flex items-end gap-6 border-t xr-line pt-5">
                    <div>
                      <span className="label-mono text-[6px] xr-muted-2">À PARTIR DE</span>
                      <p className="display-serif mt-1 text-4xl sm:text-5xl">{isCustomMaps ? "990 €" : price(service.fromEur)}</p>
                    </div>
                    <span className="label-mono pb-1 text-[7px] xr-muted-2">
                      {isCustomMaps ? "/ AN" : t(PERIOD_LABEL[service.fromPeriod])}
                    </span>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={100}>
                <Parallax speed={-0.035}>
                  <ServiceIllustration service={service.id} title={t(service.title)} />
                </Parallax>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-b xr-line py-12 sm:py-16">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <p className="label-mono text-[7px] tracking-[.24em] xr-accent">01 / OVERVIEW</p>
              <h2 className="display-serif mt-3 max-w-4xl text-3xl sm:text-5xl">{t(copy.overview)}</h2>
            </Reveal>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {service.highlights.slice(0, 3).map((item, i) => (
                <Reveal key={i} delay={i * 70}>
                  <article className="group h-full rounded-[1.5rem] border xr-line bg-[var(--xr-surface)] p-5 transition hover:-translate-y-1 sm:p-6">
                    <span className="label-mono text-[6px] xr-muted-2">0{i + 1}</span>
                    <h3 className="display-serif mt-7 text-2xl">{t(copy.included)}</h3>
                    <p className="mt-3 text-sm leading-6 xr-muted">{t(item)}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {service.id === "maps" ? (
          <section className="border-b xr-line py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
              <Reveal>
                <div className="mb-6 flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="label-mono text-[7px] tracking-[.2em]">GOOGLE MAPS / REAL SEARCH</span>
                </div>
              </Reveal>
              <MapsSimulator />
            </div>
          </section>
        ) : null}

        {steps.length > 0 ? (
          <section className="border-b xr-line py-14 sm:py-18 lg:py-24">
            <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
              <Reveal>
                <p className="label-mono text-[7px] tracking-[.24em] xr-accent">02 / PROCESS</p>
                <h2 className="display-serif mt-3 text-4xl sm:text-6xl">{t(copy.process)}</h2>
              </Reveal>
              <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {steps.slice(0, 4).map((step, i) => (
                  <Reveal key={step.num} delay={i * 70}>
                    <article className="relative h-full rounded-[1.6rem] border xr-line bg-[var(--xr-surface)] p-5 sm:p-6">
                      <div className="flex items-center justify-between">
                        <span className="label-mono grid h-8 w-8 place-items-center rounded-full border xr-line">{step.num}</span>
                        {i < steps.length - 1 ? <ArrowRight className="hidden h-4 w-4 xr-muted-2 lg:block" /> : <Sparkles className="h-4 w-4" />}
                      </div>
                      <h3 className="display-serif mt-8 text-2xl">{t(step.title)}</h3>
                      <p className="mt-3 text-sm leading-6 xr-muted">{t(step.desc)}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section id="plans" className="border-b xr-line py-14 sm:py-18 lg:py-24">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
                <div>
                  <p className="label-mono text-[7px] tracking-[.24em] xr-accent">03 / PRICING</p>
                  <h2 className="display-serif mt-3 text-4xl leading-[.85] sm:text-6xl">{t(copy.pricing)}</h2>
                </div>
                <p className="max-w-2xl text-sm leading-6 xr-muted lg:justify-self-end">{t(copy.pricingLead)}</p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {service.plans.map((p, i) => {
                const isSelected = selectedPlanIndex === i;
                const isInst = installmentSelections[i] ?? false;
                const planIsInstallment = service.id === "websites" && isInst && p.period === "once";
                const displayPrice = planIsInstallment ? Math.round((p.eur * 1.4) / 12) : p.eur;
                const displayPeriod = planIsInstallment ? "month" : p.period;
                const planWaMessage = encodeURIComponent(
                  `Bonjour XR Agency, je souhaite commander la formule "${t(p.name)}" du service "${t(service.title)}" (${isCustomMaps ? "Sur mesure" : price(displayPrice)}${planIsInstallment ? " / mois sur 12 mois" : ""}). Comment démarrer ?`,
                );
                const planWaUrl = CONTACT.whatsapp + "?text=" + planWaMessage;

                return (
                  <Reveal key={i} delay={i * 70}>
                    <article
                      onClick={() => setSelectedPlanIndex(i)}
                      className={cn(
                        "group flex h-full cursor-pointer flex-col rounded-[1.8rem] border p-6 transition-all duration-400 sm:p-7",
                        isSelected
                          ? "border-[var(--xr-ink)] bg-[var(--xr-ink)] text-[var(--xr-bg)] shadow-[var(--xr-shadow)]"
                          : "xr-line bg-[var(--xr-surface)] hover:-translate-y-1",
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className={cn("label-mono text-[7px]", isSelected ? "text-white/45" : "xr-muted-2")}>
                          {String(i + 1).padStart(2, "0")} / {String(service.plans.length).padStart(2, "0")}
                        </span>
                        {p.popular ? (
                          <span className={cn("rounded-full border px-3 py-1 label-mono text-[6px]", isSelected ? "border-white/15 bg-white/10 text-white/70" : "xr-line")}>
                            {t(UI.popular)}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="display-serif mt-8 text-3xl leading-none sm:text-4xl">{t(p.name)}</h3>
                      <p className={cn("mt-3 text-xs leading-5", isSelected ? "text-white/52" : "xr-muted")}>
                        {p.audience ? t(p.audience) : t({ fr: "Formule définie par les éléments inclus.", en: "Plan defined by the items included.", vi: "Gói được xác định bởi các hạng mục.", ar: "باقة محددة بالعناصر المشمولة.", ru: "Состав пакета определён включёнными элементами." })}
                      </p>

                      <div className={cn("mt-7 border-y py-5", isSelected ? "border-white/12" : "xr-line")}>
                        {service.id === "websites" && p.period === "once" ? (
                          <div className={cn("mb-4 flex rounded-xl border p-1", isSelected ? "border-white/12 bg-white/5" : "xr-line bg-[var(--xr-bg)]")}>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setInstallmentSelections((prev) => ({ ...prev, [i]: false }));
                              }}
                              className={cn("flex-1 rounded-lg py-2 text-[8px] font-semibold uppercase tracking-[.12em]", !isInst ? "bg-[var(--xr-bg)] text-[var(--xr-ink)]" : isSelected ? "text-white/45" : "xr-muted")}
                            >
                              Comptant
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setInstallmentSelections((prev) => ({ ...prev, [i]: true }));
                              }}
                              className={cn("flex-1 rounded-lg py-2 text-[8px] font-semibold uppercase tracking-[.12em]", isInst ? "bg-[var(--xr-bg)] text-[var(--xr-ink)]" : isSelected ? "text-white/45" : "xr-muted")}
                            >
                              Mensualités
                            </button>
                          </div>
                        ) : null}

                        <div className="flex items-end gap-2">
                          <span className="display-serif text-5xl">{price(displayPrice)}</span>
                          <span className={cn("label-mono pb-1 text-[8px]", isSelected ? "text-white/45" : "xr-muted-2")}>
                            {isCustomMaps
                              ? t({ fr: "à partir de 990 € / an", en: "from €990 / year", vi: "từ 990 € / năm", ar: "ابتداءً من 990 € / سنة", ru: "от 990 € / год" })
                              : t(PERIOD_LABEL[displayPeriod])}
                          </span>
                        </div>
                        {planIsInstallment ? (
                          <p className={cn("mt-2 text-[10px] leading-4", isSelected ? "text-white/50" : "xr-muted")}>
                            {t({ fr: "Mensualités calculées sur 12 mois.", en: "Monthly instalments calculated over 12 months.", vi: "Thanh toán hàng tháng tính trên 12 tháng.", ar: "أقساط شهرية على 12 شهراً.", ru: "Ежемесячный платёж рассчитан на 12 месяцев." })}
                          </p>
                        ) : null}
                      </div>

                      <ul className="mt-5 space-y-3">
                        {(p.features ?? []).map((feature, k) => (
                          <li key={k} className={cn("flex items-start gap-3 text-sm leading-5", isSelected ? "text-white/68" : "xr-muted")}>
                            <Check className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>{t(feature)}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        {!isCustomMaps ? (
                          <AddToCartBtn
                            item={{
                              serviceId: service.id,
                              serviceName: t(service.title),
                              planName: t(p.name) + (planIsInstallment ? " (12 mois)" : ""),
                              priceEur: displayPrice,
                              period: displayPeriod,
                              periodLabel: t(PERIOD_LABEL[displayPeriod]),
                            }}
                            popular={p.popular}
                          />
                        ) : null}
                        <a
                          href={planWaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            "mt-3 flex w-full items-center justify-center gap-2 rounded-full border py-3 text-[9px] font-semibold uppercase tracking-[.12em] transition",
                            isSelected
                              ? "border-white/15 bg-white/8 text-white/75 hover:bg-white/12"
                              : "xr-line bg-[var(--xr-bg)] xr-muted hover:bg-[var(--xr-surface-strong)]",
                          )}
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          {t({ fr: "Parler de cette formule", en: "Discuss this plan", vi: "Trao đổi về gói này", ar: "ناقش هذه الباقة", ru: "Обсудить пакет" })}
                        </a>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b xr-line py-14 sm:py-18 lg:py-24">
          <div className="mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="label-mono text-[7px] tracking-[.24em] xr-accent">04 / FAQ</p>
                  <h2 className="display-serif mt-3 text-4xl sm:text-6xl">{t(copy.faq)}</h2>
                </div>
                <span className="hidden label-mono text-[7px] xr-muted-2 sm:block">{String(faqItems.length).padStart(2, "0")} QUESTIONS</span>
              </div>
            </Reveal>

            <div className="mt-8 border-t xr-line">
              {faqItems.map((item, i) => {
                const active = openFaq === i;
                return (
                  <div key={i} className="border-b xr-line">
                    <button type="button" onClick={() => setOpenFaq(active ? null : i)} className="flex w-full items-start justify-between gap-5 py-6 text-left">
                      <div className="flex items-start gap-4">
                        <span className="label-mono mt-1 text-[7px] xr-muted-2">{String(i + 1).padStart(2, "0")}</span>
                        <span className="display-serif text-xl sm:text-2xl">{t(item.q)}</span>
                      </div>
                      <Plus className={cn("mt-1 h-5 w-5 shrink-0 transition-transform duration-300", active && "rotate-45")} />
                    </button>
                    <div className="grid transition-all duration-500" style={{ gridTemplateRows: active ? "1fr" : "0fr" }}>
                      <div className="overflow-hidden">
                        <p className="max-w-3xl pb-7 pl-9 text-sm leading-6 xr-muted">{t(item.a)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Contact />

        {showSticky ? (
          <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border xr-line bg-[var(--xr-surface-strong)] px-3 py-2 shadow-[var(--xr-shadow)] backdrop-blur-xl sm:bottom-7 sm:gap-3 sm:px-4">
            <span className="hidden label-mono text-[7px] xr-muted-2 sm:block">
              {t(service.title)} · {price(service.fromEur)}
            </span>
            <a href="#plans" className="rounded-full bg-[var(--xr-ink)] px-4 py-2 label-mono text-[7px] font-semibold text-[var(--xr-bg)]">
              {t({ fr: "Voir les formules", en: "View plans", vi: "Xem các gói", ar: "عرض الباقات", ru: "Смотреть пакеты" })}
            </a>
            <a href={waUrl} target="_blank" rel="noreferrer" className="rounded-full border xr-line px-4 py-2 label-mono text-[7px] xr-muted">
              WhatsApp
            </a>
          </div>
        ) : null}
      </main>
    </div>
  );
}
