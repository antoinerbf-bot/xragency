import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Zap,
  Plus,
  Compass,
} from "lucide-react";
import { useState, useEffect, useLayoutEffect } from "react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SERVICES, PERIOD_LABEL, CONTACT, FAQ } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { EmberButton, Reveal, Parallax } from "@/components/site/primitives";
import { MapsSimulator } from "@/components/site/MapsSimulator";
import { AddToCartBtn } from "@/components/site/Cart";
import { cn } from "@/lib/utils";
import { ServiceIllustration } from "@/components/site/ServiceIllustration";

/* ── Human-friendly slug aliases mapping ── */
const SERVICE_ALIASES: Record<string, string> = {
  "seo-domination": "seo",
  "seo-domination-system": "seo",
  "seo": "seo",
  "referencement-naturel": "seo",
  "websites": "websites",
  "site-web": "websites",
  "creation-site-web": "websites",
  "creation-de-sites-web": "websites",
  "ecommerce": "websites",
  "e-commerce": "websites",
  "e-commerce-et-reservation": "websites",
  "branding": "branding",
  "identite-visuelle": "branding",
  "maps": "maps",
  "google-maps": "maps",
  "google-maps-top-3": "maps",
  "social": "social",
  "community-management": "social",
  "social-media": "social",
  "maintenance": "maintenance",
  "webcare": "maintenance",
  "maintenance-cloud": "maintenance",
  "refonte": "refonte",
  "refonte-site": "refonte",
  "refonte-de-site-web": "refonte",
  "ads": "ads",
  "google-ads": "ads",
  "publicite-digitale": "ads",
  "strategy": "strategy",
  "strategie-digitale": "strategy",
  "conseil": "strategy",
};

export const Route = createFileRoute("/services/$serviceId")({
  loader: ({ params }) => {
    try {
      const raw = params.serviceId.toLowerCase();
      const resolvedId = SERVICE_ALIASES[raw] ?? raw;
      const service = SERVICES.find((s) => s.id === resolvedId);
      if (!service) {
        throw notFound();
      }
      return { service, canonicalId: resolvedId };
    } catch (err) {
      console.error('Service loader error:', err);
      throw err;
    }
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Service — XR Agency" }] };
    return {
      meta: [
        { title: `${s.title.fr} — XR Agency` },
        {
          name: "description",
          content: `${s.short.fr} — Tarifs officiels, livrables et méthode de travail.`,
        },
        { property: "og:title", content: `${s.title.fr} — XR Agency` },
        {
          property: "og:description",
          content: `${s.short.fr} — Studio digital & IA de prestige.`,
        },
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
    service.plans.findIndex((p) => p.popular) !== -1
      ? service.plans.findIndex((p) => p.popular)
      : 0,
  );

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showSticky, setShowSticky] = useState(false);
  const [installmentSelections, setInstallmentSelections] = useState<Record<number, boolean>>({});

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [service.id]);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherServices = SERVICES.filter((s) => s.id !== service.id);

  // Filter relevant FAQs
  const relevantFaqs = FAQ.slice(0, 4);

  // WhatsApp link with customized message for this service
  const planForWa = service.plans[selectedPlanIndex];
  const selectedPlan = service.plans[selectedPlanIndex] ?? service.plans[0];
  const isCustomMaps = service.id === "maps";
  const isInstWa = installmentSelections[selectedPlanIndex] ?? false;
  const planIsInstallmentWa = service.id === "websites" && isInstWa && planForWa?.period === "once";
  
  const waPrefilled = encodeURIComponent(
    `Bonjour XR Agency, je suis intéressé par votre service "${t(service.title)}" (Forfait: "${planForWa ? t(planForWa.name) : ""}"${planIsInstallmentWa ? " en mensualités sur 12 mois" : ""}). Pouvons-nous échanger ?`,
  );
  const waUrl = `${CONTACT.whatsapp}?text=${waPrefilled}`;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        style={{ background: "var(--gradient-halo)" }}
      />

      <Nav />

      <main className="relative z-10 pt-28">
        {/* Breadcrumbs / Back Bar */}
        <div className="mx-auto max-w-7xl px-6 pt-4 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
            <Link
              to="/services"
              className="label-mono inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              {t({ fr: "Catalogue des Prestations", en: "Services Catalogue", vi: "Danh mục Dịch vụ", ar: "كتالوج الخدمات", ru: "Каталог услуг" })}
            </Link>
            <div className="label-mono flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">{t({ fr: "Accueil", en: "Home", vi: "Trang chủ", ar: "الرئيسية", ru: "Главная" })}</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-primary transition-colors">{t(UI.navServices)}</Link>
              <span>/</span>
              <span className="text-foreground font-semibold">{t(service.title)}</span>
            </div>
          </div>
        </div>

        {/* Cinematic service hero */}
        <section className="xr-section relative overflow-hidden border-b xr-line py-14 lg:py-20">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_75%_22%,var(--xr-accent-soft),transparent_25%),radial-gradient(circle_at_8%_80%,rgba(20,20,24,.06),transparent_30%)]" />
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[.84fr_1.16fr] lg:items-center lg:gap-14">
              <div>
                <Reveal>
                  <Link to="/services" className="label-mono inline-flex items-center gap-2 xr-muted-2 transition hover:xr-accent"><ArrowLeft className="h-3.5 w-3.5" /> Catalogue des services</Link>
                </Reveal>
                <Reveal delay={60}>
                  <div className="mt-8 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full xr-accent-bg"><Sparkles className="h-4 w-4 xr-accent" /></span><span className="label-mono text-[7px] tracking-[.24em] xr-accent">XR / {service.num} · {t(service.title)}</span></div>
                </Reveal>
                <Reveal delay={110}>
                  <h1 className="display-serif mt-6 text-[clamp(3.2rem,6vw,6.8rem)] leading-[.8] tracking-[-.065em]">{t(service.title)}</h1>
                </Reveal>
                <Reveal delay={170}>
                  <p className="mt-7 max-w-2xl text-base leading-7 xr-muted sm:text-lg">{t(service.description)}</p>
                </Reveal>
                <Reveal delay={230}>
                  <div className="mt-7 flex flex-wrap gap-2">{service.highlights.slice(0,4).map((h,idx)=><span key={idx} className="rounded-full border xr-line bg-[var(--xr-surface)] px-3.5 py-2 label-mono text-[7px] xr-muted backdrop-blur-xl"><span className="mr-2 xr-accent">{String(idx+1).padStart(2,"0")}</span>{t(h)}</span>)}</div>
                </Reveal>
                <Reveal delay={290}>
                  <div className="mt-9 flex flex-wrap items-center gap-3">
                    <EmberButton href="#plans">{t(UI.explorePacks)}</EmberButton>
                    <EmberButton href={`/?service=${service.id}#quote`} variant="outline">{t({ fr:"Composer cette offre", en:"Build this offer", vi:"Tạo gói này", ar:"تكوين هذا العرض", ru:"Собрать это предложение" })}</EmberButton>
                    <a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border xr-line px-5 py-3.5 label-mono text-[7px] xr-muted transition hover:xr-accent hover:border-[var(--xr-accent)]"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</a>
                  </div>
                </Reveal>
                <Reveal delay={350}>
                  <div className="mt-9 flex items-end gap-5 border-t xr-line pt-5"><div><span className="label-mono text-[6px] xr-muted-2">À PARTIR DE</span><p className="display-serif mt-1 text-4xl">{isCustomMaps ? "990 €" : price(service.fromEur)}</p></div><span className="label-mono pb-1 text-[6px] xr-muted-2">{isCustomMaps ? "/ AN" : t(PERIOD_LABEL[service.fromPeriod])}</span></div>
                </Reveal>
              </div>
              <Reveal delay={120}>
                <div className="relative">
                  <Parallax speed={-0.04}>
                    <ServiceIllustration service={service.id} title={t(service.title)} />
                  </Parallax>
                  <div className="absolute -left-4 top-6 hidden rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-3 shadow-xl backdrop-blur-xl sm:block lg:-left-8"><span className="label-mono text-[6px] xr-muted-2">01</span><p className="mt-1 text-[9px] font-semibold">Voir. Comprendre. Décider.</p></div>
                  <div className="absolute -bottom-5 right-5 hidden rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-3 shadow-xl backdrop-blur-xl sm:block"><span className="label-mono text-[6px] xr-muted-2">XR SYSTEM</span><p className="mt-1 text-[9px] font-semibold">Une expertise → une action.</p></div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Conversion Architecture — turn curiosity into a concrete next step */}
        <section className="relative border-y border-border/60 bg-card/[.22] py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr] lg:items-stretch">
              <div className="rounded-[2rem] border border-border bg-background/70 p-7 shadow-[0_30px_80px_-55px_rgba(0,0,0,.9)] sm:p-9">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="label-mono text-[9px] uppercase tracking-[.22em] text-primary">{t({ fr: "L'offre en clair", en: "The offer, clearly", vi: "Tóm tắt dịch vụ", ar: "العرض بوضوح", ru: "Услуга без лишнего" })}</p>
                    <h2 className="display-serif mt-3 text-3xl sm:text-4xl">{t({ fr: "Pas juste une prestation. Un système de travail.", en: "Not just a service. A working system.", vi: "Không chỉ là dịch vụ. Một hệ thống triển khai.", ar: "ليست مجرد خدمة. بل نظام عمل.", ru: "Не просто услуга. Рабочая система." })}</h2>
                  </div>
                  <span className="hidden rounded-full border border-primary/25 bg-primary/[.06] px-3 py-1 label-mono text-[8px] text-primary sm:inline-flex">{service.num} · XR SYSTEM</span>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    { n: "01", title: { fr: "Diagnostic", en: "Diagnosis", vi: "Chẩn đoán", ar: "التشخيص", ru: "Диагностика" }, text: { fr: "Nous partons de votre situation réelle, pas d'un forfait générique.", en: "We start from your real situation, not a generic package.", vi: "Bắt đầu từ tình trạng thực tế, không phải gói chung chung.", ar: "نبدأ من وضعك الفعلي، لا من باقة عامة.", ru: "Мы начинаем с вашей реальной ситуации, а не с шаблонного пакета." } },
                    { n: "02", title: { fr: "Exécution", en: "Execution", vi: "Triển khai", ar: "التنفيذ", ru: "Реализация" }, text: { fr: "Chaque étape produit un livrable concret et mesurable.", en: "Every step produces a concrete, measurable deliverable.", vi: "Mỗi bước tạo ra một đầu ra cụ thể và đo được.", ar: "كل خطوة تنتج مخرَجًا ملموسًا وقابلًا للقياس.", ru: "Каждый этап даёт конкретный измеримый результат." } },
                    { n: "03", title: { fr: "Pilotage", en: "Steering", vi: "Điều hành", ar: "المتابعة", ru: "Управление" }, text: { fr: "Nous suivons les signaux utiles et ajustons le plan.", en: "We track useful signals and adjust the plan.", vi: "Theo dõi tín hiệu hữu ích và điều chỉnh kế hoạch.", ar: "نتابع الإشارات المهمة ونعدّل الخطة.", ru: "Мы отслеживаем ключевые сигналы и корректируем план." } },
                  ].map((item, i) => (
                    <div key={item.n} className="rounded-2xl border border-border/70 bg-card/45 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35">
                      <span className="label-mono text-[9px] text-primary">{item.n}</span>
                      <h3 className="mt-5 text-sm font-semibold">{t(item.title)}</h3>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">{t(item.text)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cn(
                "relative overflow-hidden rounded-[2rem] border p-7 sm:p-9",
                isCustomMaps ? "border-primary/40 bg-primary/[.07]" : "border-border bg-card/50"
              )}>
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    {isCustomMaps ? <ShieldCheck className="h-5 w-5 text-primary" /> : <Sparkles className="h-5 w-5 text-primary" />}
                    <span className="label-mono text-[9px] uppercase tracking-[.2em] text-primary">{isCustomMaps ? t({ fr: "Garantie commerciale", en: "Commercial guarantee", vi: "Cam kết thương mại", ar: "ضمان تجاري", ru: "Коммерческая гарантия" }) : t({ fr: "Prochaine étape", en: "Next step", vi: "Bước tiếp theo", ar: "الخطوة التالية", ru: "Следующий шаг" })}</span>
                  </div>
                  <h3 className="display-serif mt-5 text-3xl sm:text-4xl">{isCustomMaps ? t({ fr: "Top 3 ou remboursé.", en: "Top 3 or money back.", vi: "Top 3 hoặc hoàn tiền.", ar: "Top 3 أو استرداد المبلغ.", ru: "Top 3 или возврат." }) : t({ fr: "Votre projet mérite un plan précis.", en: "Your project deserves a precise plan.", vi: "Dự án của bạn cần một kế hoạch rõ ràng.", ar: "مشروعك يستحق خطة دقيقة.", ru: "Вашему проекту нужен точный план." })}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {isCustomMaps
                      ? t({ fr: "Le diagnostic fixe les requêtes, la zone, le niveau de concurrence, le délai cible et les conditions d'éligibilité avant tout engagement.", en: "The diagnosis defines searches, area, competition level, target timeframe and eligibility conditions before commitment.", vi: "Chẩn đoán xác định truy vấn, khu vực, mức cạnh tranh, thời hạn mục tiêu và điều kiện đủ điều kiện trước khi cam kết.", ar: "يحدد التشخيص الاستعلامات والمنطقة ومستوى المنافسة والمدة المستهدفة وشروط الأهلية قبل الالتزام.", ru: "Диагностика определяет запросы, зону, уровень конкуренции, целевой срок и условия участия до начала работ." })
                      : t({ fr: "Choisissez votre formule, puis laissez-nous cadrer le périmètre, les livrables et les priorités avant le démarrage.", en: "Choose your plan, then let us define scope, deliverables and priorities before work starts.", vi: "Chọn gói, sau đó chúng tôi xác định phạm vi, đầu ra và ưu tiên trước khi bắt đầu.", ar: "اختر الباقة ثم نحدد النطاق والمخرجات والأولويات قبل البدء.", ru: "Выберите пакет, после чего мы определим объём, результаты и приоритеты до старта." })}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {service.highlights.slice(0, 3).map((h, i) => <span key={i} className="rounded-full border border-border/70 bg-background/60 px-3 py-2 label-mono text-[8px] text-muted-foreground">{t(h)}</span>)}
                  </div>
                  <a href={isCustomMaps ? "#plans" : waUrl} target={isCustomMaps ? undefined : "_blank"} rel={isCustomMaps ? undefined : "noreferrer"} className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[.14em] text-primary-foreground transition-transform hover:-translate-y-0.5">
                    {isCustomMaps ? t({ fr: "Voir la garantie & le tarif", en: "See guarantee & pricing", vi: "Xem bảo đảm & giá", ar: "عرض الضمان والسعر", ru: "Гарантия и цена" }) : t({ fr: "Parler de mon projet", en: "Discuss my project", vi: "Trao đổi dự án", ar: "ناقش مشروعي", ru: "Обсудить проект" })}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proven Metrics Section */}
        {service.metrics && service.metrics.length > 0 && (
          <section className="border-y border-border/60 bg-accent/20 py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="grid gap-6 md:grid-cols-3">
                {service.metrics.map((m, idx) => (
                  <Reveal key={idx} delay={idx * 90}>
                    <div className="surface-plate rounded-2xl p-7">
                      <p className="display-serif text-4xl text-primary sm:text-5xl">{m.metric}</p>
                      <h4 className="label-mono mt-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                        {t(m.label)}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {t(m.desc)}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 4-Step Process & Deliverables */}
        {service.steps && service.steps.length > 0 && (
          <section className="py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <Reveal>
                <p className="label-mono text-xs uppercase tracking-widest text-primary">
                  {t(UI.serviceProcess)}
                </p>
                <h2 className="display-serif mt-4 text-3xl sm:text-5xl">
                  {t({
                    fr: "Notre méthode de réalisation",
                    en: "Our delivery methodology",
                    vi: "Phương pháp thực hiện",
                  })}
                </h2>
                <p className="mt-4 max-w-2xl text-base text-muted-foreground">
                  {t(UI.serviceProcessDesc)}
                </p>
              </Reveal>

              <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {service.steps.map((st, idx) => (
                  <Reveal key={idx} delay={idx * 100}>
                    <div className="surface-plate relative flex h-full flex-col justify-between rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1">
                      <div>
                        <span className="label-mono inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-sm font-semibold text-primary">
                          {st.num}
                        </span>
                        <h3 className="display-serif mt-6 text-xl text-foreground">
                          {t(st.title)}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {t(st.desc)}
                        </p>
                      </div>
                      <div className="mt-8 border-t border-border/60 pt-4">
                        <span className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                          {t({ fr: "Étape", en: "Step", vi: "Bước" })} {st.num}{" "}
                          {t({ fr: "sur 04", en: "of 04", vi: "trong 04" })}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Google Maps Dedicated Interactive Simulator & 7 Phases */}
        {service.id === "maps" && (
          <section className="border-t border-border/60 py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <MapsSimulator />
            </div>
          </section>
        )}

        {/* Detailed offers & pricing */}
        <section id="plans" className="relative border-t border-border/60 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
              <div>
                <p className="label-mono text-xs uppercase tracking-[.24em] text-primary">
                  {t(UI.navPricing)} · {t(service.title)}
                </p>
                <h2 className="display-serif mt-4 text-4xl leading-[.92] sm:text-6xl">
                  Des offres lisibles.<br />
                  <em className="not-italic text-muted-foreground">Chaque détail compte.</em>
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground lg:justify-self-end">
                {t({
                  fr: "Chaque formule reprend précisément son périmètre, son prix et les éléments inclus. Sélectionnez une offre pour afficher son contenu en détail avant de passer commande.",
                  en: "Each plan clearly shows its scope, price and included items. Select a plan to review every included element before ordering.",
                  vi: "Mỗi gói hiển thị rõ phạm vi, giá và các hạng mục bao gồm. Chọn một gói để xem chi tiết trước khi đặt.",
                })}
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {service.plans.map((p, i) => {
                const isSelected = selectedPlanIndex === i;
                const isInst = installmentSelections[i] ?? false;
                const planIsInstallment = service.id === "websites" && isInst && p.period === "once";
                const displayPrice = planIsInstallment ? Math.round((p.eur * 1.4) / 12) : p.eur;
                const displayPeriod = planIsInstallment ? "month" : p.period;
                const planWaMessage = encodeURIComponent(
                  "Bonjour XR Agency, je souhaite commander la formule \"" +
                    t(p.name) +
                    "\" du service \"" +
                    t(service.title) +
                    "\" (" +
                    (isCustomMaps ? "Sur mesure" : price(displayPrice)) +
                    (planIsInstallment ? " / mois sur 12 mois" : "") +
                    "). Comment démarrer ?",
                );
                const planWaUrl = CONTACT.whatsapp + "?text=" + planWaMessage;

                return (
                  <Reveal key={i} delay={i * 70}>
                    <article
                      onClick={() => setSelectedPlanIndex(i)}
                      className={cn(
                        "group relative flex h-full cursor-pointer flex-col rounded-[1.8rem] border p-7 transition-all duration-500 sm:p-8",
                        isSelected
                          ? "border-primary bg-primary/[.055] shadow-[0_25px_80px_-45px_rgba(0,0,0,.75)] ring-1 ring-primary/30"
                          : "border-border bg-card/50 hover:-translate-y-1 hover:border-primary/40",
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="label-mono text-[9px] tracking-[.18em] text-primary">
                          {String(i + 1).padStart(2, "0")} / {String(service.plans.length).padStart(2, "0")}
                        </span>
                        {p.popular ? (
                          <span className="label-mono rounded-full bg-primary px-3 py-1 text-[8px] text-primary-foreground">
                            {t(UI.popular)}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="display-serif mt-8 text-3xl leading-none sm:text-4xl">{t(p.name)}</h3>
                      {p.audience ? (
                        <p className="mt-3 text-xs leading-5 text-muted-foreground">{t(p.audience)}</p>
                      ) : (
                        <p className="mt-3 text-xs leading-5 text-muted-foreground">
                          {t({
                            fr: "Une formule définie par les éléments inclus ci-dessous.",
                            en: "A plan defined by the included items below.",
                            vi: "Gói được xác định bởi các hạng mục bên dưới.",
                          })}
                        </p>
                      )}

                      <div className="mt-7 border-y border-border/70 py-5">
                        {service.id === "websites" && p.period === "once" ? (
                          <div className="mb-4 flex rounded-xl border border-border/70 bg-background/50 p-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setInstallmentSelections(prev => ({ ...prev, [i]: false }));
                              }}
                              className={cn(
                                "flex-1 rounded-lg py-2 text-[9px] font-semibold uppercase tracking-[.13em] transition-all",
                                !isInst ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                              )}
                            >
                              Comptant
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setInstallmentSelections(prev => ({ ...prev, [i]: true }));
                              }}
                              className={cn(
                                "flex-1 rounded-lg py-2 text-[9px] font-semibold uppercase tracking-[.13em] transition-all",
                                isInst ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                              )}
                            >
                              Mensualités
                            </button>
                          </div>
                        ) : null}

                        <div className="flex items-end gap-2">
                          <span className="display-serif text-5xl text-primary">{price(displayPrice)}</span>
                          <span className="label-mono pb-1 text-[9px] text-muted-foreground">
                            {isCustomMaps
                              ? t({ fr: "à partir de 990 € / an", en: "from €990 / year", vi: "từ 990 € / năm", ar: "ابتداءً من 990 € / سنة", ru: "от 990 € / год" })
                              : t(PERIOD_LABEL[displayPeriod])}
                          </span>
                        </div>
                        {planIsInstallment ? (
                          <p className="mt-2 max-w-[220px] text-[10px] leading-4 text-primary/80">
                            {t({
                              fr: "Mensualités calculées sur 12 mois.",
                              en: "Monthly instalments calculated over 12 months.",
                              vi: "Thanh toán hàng tháng tính trên 12 tháng.",
                            })}
                          </p>
                        ) : null}
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <span className="label-mono text-[8px] uppercase tracking-[.16em] text-muted-foreground">
                          {p.features?.length ?? 0} {t({ fr: "éléments inclus", en: "included items", vi: "hạng mục" })}
                        </span>
                        <span className="label-mono text-[8px] text-primary transition-transform duration-300 group-hover:translate-x-1">
                          {isSelected ? t({ fr: "SÉLECTIONNÉ", en: "SELECTED", vi: "ĐÃ CHỌN", ar: "محدد", ru: "ВЫБРАНО" }) : t({ fr: "VOIR", en: "VIEW", vi: "XEM", ar: "عرض", ru: "СМОТРЕТЬ" })} →
                        </span>
                      </div>

                      <ul className="mt-5 space-y-3">
                        {(p.features || []).map((f, k) => (
                          <li key={k} className="flex items-start gap-3 text-sm leading-5 text-muted-foreground">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{t(f)}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        {!isCustomMaps && (
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
                        )}
                        <a
                          href={planWaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border/80 bg-background/50 py-3 text-[10px] font-semibold uppercase tracking-[.13em] text-muted-foreground transition hover:border-emerald-500/60 hover:text-emerald-500"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
                          {t({
                            fr: isCustomMaps ? "Parler de cette étude" : "Parler de cette formule",
                            en: isCustomMaps ? "Discuss this study" : "Discuss this plan",
                            vi: isCustomMaps ? "Trao đổi về nghiên cứu" : "Trao đổi về gói này",
                          })}
                        </a>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>

          </div>
        </section>

        {/* Comparison Matrix: XR Agency vs Market */}
        {service.comparisons?.length > 0 && (
          <section className="border-t border-border/60 py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <Reveal>
                <div className="text-center">
                  <p className="label-mono text-xs uppercase tracking-widest text-primary">
                    {t(UI.serviceCompareTitle)}
                  </p>
                  <h2 className="display-serif mt-4 text-3xl sm:text-5xl">
                    {t({
                      fr: "L'Excellence XR Agency vs Les Standards",
                      en: "XR Agency Excellence vs Market Standards",
                      vi: "Sự xuất sắc XR Agency vs Tiêu chuẩn",
                    })}
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                    {t(UI.serviceCompareDesc)}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-16 overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border bg-accent/40">
                        <th className="label-mono p-5 sm:p-6 text-xs text-muted-foreground">
                          {t(UI.featureComparison)}
                        </th>
                        <th className="label-mono p-5 sm:p-6 text-xs text-primary font-bold">
                          {t(UI.withXrAgency)}
                        </th>
                        <th className="label-mono p-5 sm:p-6 text-xs text-muted-foreground">
                          {t(UI.traditionalAgency)}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
{(service.comparisons || []).map((c, idx) => (
                        <tr key={idx} className="transition-colors hover:bg-accent/20">
                          <td className="p-5 sm:p-6 font-medium text-sm text-foreground">
                            {t(c.feature)}
                          </td>
                          <td className="p-5 sm:p-6 text-sm text-foreground">
                            <span className="inline-flex items-center gap-2 text-primary font-medium">
                              <Check className="h-4 w-4 shrink-0" />
                              {t(c.us)}
                            </span>
                          </td>
                          <td className="p-5 sm:p-6 text-sm text-muted-foreground opacity-80">
                            {t(c.them)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* Frequently Asked Questions */}
        <section className="border-t border-border/60 py-24 lg:py-32">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Reveal>
              <div className="text-center">
                <p className="label-mono text-xs uppercase tracking-widest text-primary">
                  {t(UI.faqLabel)}
                </p>
                <h2 className="display-serif mt-4 text-3xl sm:text-5xl">
                  {t(UI.faqTitle1)} <em className="italic text-primary">{t(UI.faqTitle2)}</em>
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                  {t({
                    fr: "Tout ce que vous devez savoir avant de démarrer votre collaboration avec XR Agency.",
                    en: "Everything you need to know before starting your collaboration with XR Agency.",
                    vi: "Mọi điều bạn cần biết trước khi bắt đầu hợp tác với XR Agency.",
                  })}
                </p>
              </div>
            </Reveal>

            {/* Use the service‑specific FAQs if they exist, otherwise fallback to the global FAQ list */}
            {service.serviceFaqs?.length ? (
              <div className="mt-14 border-t border-border">
                {service.serviceFaqs.map((item, i) => {
                  const active = openFaq === i;
                  return (
                    <Reveal key={i} delay={i * 50}>
                      <div className="border-b border-border">
                        <button
                          onClick={() => setOpenFaq(active ? null : i)}
                          className="flex w-full items-start justify-between gap-6 py-6 text-left"
                        >
                          <div className="flex items-start gap-4">
                            <span className="label-mono mt-1 text-primary">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="display-serif text-lg sm:text-xl font-medium text-foreground">
                              {t(item.q)}
                            </span>
                          </div>
                          <Plus
                            className={cn(
                              "mt-1 h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                              active && "rotate-45",
                            )}
                          />
                        </button>
                        <div
                          className="grid transition-all duration-500 ease-out"
                          style={{ gridTemplateRows: active ? "1fr" : "0fr" }}
                        >
                          <div className="overflow-hidden">
                            <p className="max-w-3xl pb-7 pl-10 text-sm leading-relaxed text-muted-foreground">
                              {t(item.a)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            ) : (
            <div className="mt-14 border-t border-border">
              {relevantFaqs.map((item, i) => {
                const active = openFaq === i;
                return (
                  <Reveal key={i} delay={i * 50}>
                    <div className="border-b border-border">
                      <button
                        onClick={() => setOpenFaq(active ? null : i)}
                        className="flex w-full items-start justify-between gap-6 py-6 text-left"
                      >
                        <div className="flex items-start gap-4">
                          <span className="label-mono mt-1 text-primary">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="display-serif text-lg sm:text-xl font-medium text-foreground">
                            {t(item.q)}
                          </span>
                        </div>
                        <Plus
                          className={cn(
                            "mt-1 h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                            active && "rotate-45",
                          )}
                        />
                      </button>
                      <div
                        className="grid transition-all duration-500 ease-out"
                        style={{ gridTemplateRows: active ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-3xl pb-7 pl-10 text-sm leading-relaxed text-muted-foreground">
                            {t(item.a)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            )}
          </div>
        </section>

        {/* Other Services Discovery Bar */}
        <section className="border-t border-border/60 bg-accent/10 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="label-mono text-xs uppercase tracking-widest text-primary">
                  {t(UI.otherServices)}
                </p>
                <h3 className="display-serif mt-2 text-2xl sm:text-3xl">
                  {t({
                    fr: "Complétez votre écosystème",
                    en: "Complete your ecosystem",
                    vi: "Hoàn thiện hệ sinh thái",
                  })}
                </h3>
              </div>
              <Link
                to="/"
                className="label-mono text-xs text-primary transition-colors hover:underline"
              >
                {t(UI.backToServices)}
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherServices.slice(0, 3).map((os) => (
                <Link
                  key={os.id}
                  to="/services/$serviceId"
                  params={{ serviceId: os.id }}
                  className="surface-plate group flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:border-primary hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="label-mono text-xs text-muted-foreground">{os.num}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <h4 className="display-serif mt-4 text-lg text-foreground group-hover:text-primary transition-colors">
                      {t(os.title)}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {t(os.short)}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-border/50 pt-3">
                    <span className="label-mono text-xs text-primary">
                      {t(UI.from)} {price(os.fromEur)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Global Contact Component */}
        <Contact />

        {/* Sticky Floating Bottom Conversion Bar */}
        {showSticky ? (
          <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-full border border-border bg-card/90 px-5 py-2.5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="hidden sm:block">
              <span className="label-mono text-xs text-muted-foreground">{t(service.title)}</span>
              <p className="display-serif text-sm font-bold text-primary">
                {t(UI.from)} {price(service.fromEur)}
              </p>
            </div>
            <div className="hidden h-6 w-px bg-border sm:block" />
            <a
              href="#plans"
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90"
            >
              {t({ fr: "Voir les forfaits", en: "View plans", vi: "Xem các gói" })}
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3.5 py-2 text-xs font-medium text-emerald-500 transition-all hover:bg-emerald-500/20"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        ) : null}
      </main>
    </div>
  );
}
