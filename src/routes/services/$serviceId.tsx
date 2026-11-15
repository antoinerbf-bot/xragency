import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Plus, ShieldCheck, Sparkles, Star, ChevronDown, ArrowUpRight } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SERVICES, PERIOD_LABEL, CONTACT, FAQ } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { MapsSimulator } from "@/components/site/MapsSimulator";
import { SocialSimulator } from "@/components/site/SocialSimulator";
import { AddToCartBtn } from "@/components/site/Cart";
import { ServiceIllustration } from "@/components/site/ServiceIllustration";
import { SocialSalesPage } from "@/components/site/SocialSalesPage";
import { ServicePillarDeepBlocks } from "@/components/site/ServicePillarDeepBlocks";
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
  robotique: "robotics",
  robots: "robotics",
  refonte: "refonte",
  "refonte-site": "refonte",
  "refonte-de-site-web": "refonte",
  ads: "ads",
  "google-ads": "ads",
  "publicite-digitale": "ads",
  strategy: "strategy",
  "strategie-digitale": "strategy",
  conseil: "strategy",
  ai: "ai",
  ia: "ai",
  caisse: "robotics",
  pos: "robotics",
  "pos-crm": "robotics",
  crm: "robotics",
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
    const isSocial = s.id === "social";
    const title = isSocial ? "Gestion des réseaux sociaux — XR Agency" : `${s.title.fr} — XR Agency`;
    const description = isSocial
      ? "Stratégie, création de contenus et animation des réseaux sociaux. Trois formules claires dès 349 €/mois."
      : `${s.short.fr} — Tarifs, livrables et méthode XR Agency.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: "https://xragencyai.com/services/" + loaderData.canonicalId }],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service } = Route.useLoaderData();
  if (service.id === "social") return <SocialSalesPage />;
  return <GenericServiceDetailPage />;
}

function GenericServiceDetailPage() {
  const { service } = Route.useLoaderData();
  const { t, price, lang } = useLang();
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(
    Math.max(0, service.plans.findIndex((p) => p.popular)),
  );
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

  const planForWa = service.plans[selectedPlanIndex];

  const waText = ({
    fr: (title: string, plan: string) => `Bonjour XR Agency, je suis intéressé par votre service "${title}" (forfait : "${plan}"). Pouvons-nous échanger ?`,
    en: (title: string, plan: string) => `Hello XR Agency, I'm interested in your "${title}" service (plan: "${plan}"). Could we discuss it?`,
    vi: (title: string, plan: string) => `Xin chào XR Agency, tôi quan tâm đến dịch vụ "${title}" (gói: "${plan}"). Chúng ta có thể trao đổi thêm không?`,
    ar: (title: string, plan: string) => `مرحبًا XR Agency، أنا مهتم بخدمة "${title}" (الباقة: "${plan}"). هل يمكننا مناقشة التفاصيل؟`,
    ru: (title: string, plan: string) => `Здравствуйте, XR Agency! Меня интересует услуга "${title}" (пакет: "${plan}"). Можем обсудить детали?`,
  } as const)[lang](t(service.title), planForWa ? t(planForWa.name) : "");
  const waPrefilled = encodeURIComponent(waText);
  const waUrl = `${CONTACT.whatsapp}?text=${waPrefilled}`;
  const faqItems = service.serviceFaqs?.length ? service.serviceFaqs : FAQ.slice(0, 4);
  const steps = service.steps ?? [];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030406] text-white selection:bg-[#d4af37] selection:text-black">
      <Nav />

      {/* Atmospheric Specular Halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[95%] max-w-[1400px] rounded-full bg-[#d4af37]/8 blur-[160px]"
      />

      <main className="pt-28 sm:pt-32">
        {/* Breadcrumb Navigation */}
        <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 py-4 font-mono text-[9.5px]">
            <Link to="/services" className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-white transition">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{t({ fr: "TOUTES LES DISCIPLINES", en: "ALL DISCIPLINES", vi: "TẤT CẢ DỊCH VỤ", ar: "كل الخدمات", ru: "ВСЕ УСЛУГИ" })}</span>
            </Link>
            <div className="flex items-center gap-2 text-[#64748b]">
              <Link to="/" className="hover:text-white transition">{t({ fr: "ACCUEIL", en: "HOME", vi: "TRANG CHỦ", ar: "الرئيسية", ru: "ГЛАВНАЯ" })}</Link>
              <span>/</span>
              <span className="text-[#d4af37] font-bold uppercase">{t(service.title)}</span>
            </div>
          </div>
        </div>

        {/* ── HERO OF THE SERVICE ── */}
        <section className="relative overflow-hidden border-b border-white/10 py-16 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
            <div className="grid items-center gap-12 lg:grid-cols-[0.52fr_0.48fr] lg:gap-16">

              {/* Left Column: Typography & Authority */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#d4af37] mb-6 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                  <span>0{service.num} · ATELIER HAUTE COUTURE XR</span>
                </div>

                <h1 className="text-[clamp(2.9rem,5.8vw,5.8rem)] font-black uppercase leading-[0.92] tracking-[-0.045em] text-white [text-wrap:balance]">
                  {t(service.title)}
                </h1>

                <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#94a3b8] font-normal">
                  {t(service.description)}
                </p>

                {/* Highlights Pills */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {service.highlights.slice(0, 4).map((h, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 font-mono text-[9px] font-semibold text-[#cbd5e1] backdrop-blur-md"
                    >
                      {t(h)}
                    </span>
                  ))}
                </div>

                {/* Call to Actions */}
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href="#plans"
                    className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] transition hover:scale-105 hover:bg-[#d4af37]"
                  >
                    <span>{t(UI.explorePacks)}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/#quote"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-6 py-4 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white hover:border-[#d4af37] hover:text-[#d4af37] transition"
                  >
                    <span>{t({ fr: "Cadrage sur mesure", en: "Bespoke briefing", vi: "Tư vấn riêng", ar: "دراسة مخصصة", ru: "Индивидуальный расчет" })}</span>
                  </a>
                </div>

                {/* Reassurance SLA Banner */}
                <div className="mt-10 flex items-center gap-8 border-t border-white/10 pt-6">
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[#94a3b8] block">
                      {t({ fr: "À PARTIR DE", en: "STARTING FROM", vi: "TỪ", ar: "ابتداءً من", ru: "ОТ" })}
                    </span>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white font-serif mt-0.5">
                      {price(service.fromEur)}
                    </p>
                  </div>
                  <div className="border-l border-white/10 pl-8">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[#d4af37] block font-bold">
                      ENGAGEMENT QUALITÉ XR AGENCY
                    </span>
                    <p className="text-sm font-semibold text-[#cbd5e1] mt-0.5">
                      Devis détaillé · Livrables sur mesure · Propriété client
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Interactive Simulator in Titanium Frame */}
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#d4af37]/20 via-transparent to-white/5 blur-2xl"
                />
                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#090b10] p-3 sm:p-5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.98)] backdrop-blur-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 px-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                        Simulateur Interactif en Direct
                      </span>
                    </div>
                    <span className="font-mono text-[8.5px] text-[#94a3b8]">
                      60 FPS · LIVE DEMO
                    </span>
                  </div>

                  <ServiceIllustration service={service.id} title={t(service.title)} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EARLY PRICING OVERVIEW STRIP ── */}
        {service.plans.length > 0 && (
          <section className="border-b border-white/10 bg-[#06070a] py-8 text-white">
            <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <span className="font-mono text-[9px] font-bold tracking-[.24em] text-[#d4af37] uppercase">
                  {t({ fr: "APERÇU DES FORMULES OFFICIELLES & TARIFS", en: "OFFICIAL PLANS & PRICING OVERVIEW", vi: "BẢNG GIÁ DỊCH VỤ", ar: "نظرة سريعة على الأسعار", ru: "БЫСТРЫЙ ОБЗОР ТАРИФОВ" })}
                </span>
                <a href="#plans" className="font-mono text-[9px] font-bold text-white hover:text-[#d4af37] transition">
                  {t({ fr: "Comparer les formules ↓", en: "Compare plans ↓", vi: "So sánh các gói ↓", ar: "مقارنة الباقات ↓", ru: "Сравнить тарифы ↓" })}
                </a>
              </div>

              <div className={cn("grid gap-4", service.plans.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : service.plans.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
                {service.plans.map((p, idx) => (
                  <a
                    key={idx}
                    href="#plans"
                    onClick={() => setSelectedPlanIndex(idx)}
                    className={cn(
                      "flex items-center justify-between gap-4 rounded-2xl border p-5 shadow-lg transition hover:-translate-y-0.5",
                      p.popular
                        ? "border-[#d4af37] bg-[#0c0e18] shadow-[0_0_25px_rgba(212,175,55,0.15)]"
                        : "border-white/10 bg-[#090b10] hover:border-white/30"
                    )}
                  >
                    <div>
                      <span className="font-mono text-[8.5px] font-bold text-[#d4af37] block">
                        0{idx + 1} {p.popular ? "· POPULAIRE" : ""}
                      </span>
                      <p className="mt-1 text-base font-bold text-white leading-tight">{t(p.name)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-bold font-serif text-white">
                        {p.isQuoteOnly ? t({ fr: "Dès 550 €", en: "From €550", vi: "Từ 550 €", ar: "من 550 €", ru: "От 550 €" }) : price(p.eur)}
                      </p>
                      <span className="font-mono text-[8.5px] text-[#94a3b8]">
                        {t(PERIOD_LABEL[p.period])}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 01 / STRATEGIC IMPACT ── */}
        <section className="border-b border-white/10 bg-[#040508] py-20 sm:py-28">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
            <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
              <div>
                <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.24em] text-[#d4af37] block mb-3">
                  01 / IMPACT STRATÉGIQUE
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
                  {t({ fr: "Ce que cette architecture change pour votre marque.", en: "What this architecture changes for your brand.", vi: "Kiến trúc này thay đổi điều gì cho thương hiệu.", ar: "ما الذي يغيره هذا الحل لعلامتك التجارية.", ru: "Что эта архитектура меняет для бренда." })}
                </h2>
                <p className="mt-5 text-sm sm:text-base text-[#94a3b8] leading-relaxed font-normal">
                  Chaque détail est pensé pour maximiser votre autorité perçue et convertir immédiatement l'attention en chiffre d'affaires qualifié.
                </p>
              </div>

              <div className="divide-y divide-white/10 border-y border-white/10">
                {service.highlights.slice(0, 3).map((item, i) => (
                  <div key={i} className="py-7 flex items-start gap-6 group">
                    <span className="font-mono text-xl sm:text-2xl font-extrabold text-[#d4af37]">
                      0{i + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white transition group-hover:text-[#f8fafc]">
                        {t(item)}
                      </h3>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#d4af37] opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100 shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 / PRODUCTION PROCESS ── */}
        {steps.length > 0 && (
          <section className="border-b border-white/10 bg-[#050608] py-20 sm:py-28">
            <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
              <div className="max-w-2xl mb-14">
                <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.24em] text-[#d4af37] block mb-3">
                  02 / MÉTHODOLOGIE & CADRAGE
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                  {t({ fr: "Une exécution millimétrée.", en: "Flawless engineering.", vi: "Quy trình chuẩn mực.", ar: "تنفيذ دقيق.", ru: "Выверенный процесс работы." })}
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {steps.slice(0, 4).map((step, i) => (
                  <div
                    key={step.num}
                    className="relative rounded-3xl border border-white/10 bg-[#090b10] p-6 sm:p-7 shadow-xl hover:border-white/25 transition duration-300"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 font-mono text-xs font-bold text-[#d4af37]">
                        {step.num}
                      </span>
                      {i < steps.length - 1 ? (
                        <ArrowRight className="hidden lg:block h-4 w-4 text-white/30" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-[#d4af37]" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{t(step.title)}</h3>
                    <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">{t(step.desc)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 03 / DETAILED PLANS & ORDER MATRIX ── */}
        <section id="plans" className="border-b border-white/10 bg-[#030406] py-20 sm:py-32 scroll-mt-20">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
            <div className="grid gap-6 lg:grid-cols-[0.55fr_0.45fr] lg:items-end mb-16">
              <div>
                <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.24em] text-[#d4af37] block mb-3">
                  03 / CHOISIR VOTRE FORMULE
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                  {t({ fr: "Formules officielles & composition.", en: "Official plans & scope.", vi: "Bảng giá và phạm vi.", ar: "الباقات الرسمية ونطاق العمل.", ru: "Официальные тарифы." })}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed lg:justify-self-end max-w-lg">
                Tarifs transparents, sans frais cachés. Choisissez une formule pour la commander directement ou échanger avec Antoine sur WhatsApp.
              </p>
            </div>

            <div className={cn("grid gap-6 items-stretch", service.plans.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : service.plans.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3")}>
              {service.plans.map((p, i) => {
                const isSelected = selectedPlanIndex === i;
                const displayPrice = p.eur;
                const displayPeriod = p.period;

                const planWaText: Record<string, string> = {
                  fr: `Bonjour XR Agency, je souhaite commander la formule "${t(p.name)}" pour "${t(service.title)}" (${p.isQuoteOnly ? "Sur mesure dès 550 €" : price(displayPrice)}). Pouvons-nous finaliser ?`,
                  en: `Hello XR Agency, I want to book "${t(p.name)}" for "${t(service.title)}" (${p.isQuoteOnly ? "Custom from €550" : price(displayPrice)}). How do we finalize?`,
                  vi: `Xin chào XR Agency, tôi muốn đặt gói "${t(p.name)}" cho "${t(service.title)}".`,
                  ar: `مرحبا XR Agency، أود طلب باقة "${t(p.name)}" لخدمة "${t(service.title)}".`,
                  ru: `Здравствуйте XR Agency, я хочу заказать тариф "${t(p.name)}" для "${t(service.title)}".`,
                };
                const planWaMessage = encodeURIComponent(planWaText[lang] ?? planWaText.fr);
                const planWaUrl = CONTACT.whatsapp + "?text=" + planWaMessage;

                return (
                  <article
                    key={i}
                    onClick={() => setSelectedPlanIndex(i)}
                    className={cn(
                      "flex flex-col justify-between rounded-3xl border p-7 sm:p-9 transition-all duration-300 relative cursor-pointer",
                      isSelected
                        ? "border-[#d4af37] bg-[#0c0e18] shadow-[0_0_50px_rgba(212,175,55,0.22)] ring-1 ring-[#d4af37]/60"
                        : "border-white/10 bg-[#080a12] hover:border-white/30"
                    )}
                  >
                    <div>
                      {/* Top Plan Header */}
                      <div className="flex items-center justify-between gap-3 mb-6">
                        <span className={cn("font-mono text-[9px] font-bold uppercase tracking-wider", isSelected ? "text-[#d4af37]" : "text-white/60")}>
                          0{i + 1} / 0{service.plans.length}
                        </span>
                        {p.popular && (
                          <span className="rounded-full bg-[#d4af37] px-3 py-1 font-mono text-[8px] font-extrabold uppercase tracking-wider text-black shadow-md">
                            RECOMMANDÉ
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">{t(p.name)}</h3>
                      <p className="text-xs text-[#94a3b8] leading-relaxed mb-6">
                        {p.audience ? t(p.audience) : "Périmètre complet inclus dans la formule."}
                      </p>

                      {/* Price Display */}
                      <div className="border-y border-white/10 py-6 mb-6">
                        <div className="flex items-baseline gap-2">
                          {p.isQuoteOnly && <span className="font-mono text-xs text-[#94a3b8]">Dès</span>}
                          <span className="text-4xl sm:text-5xl font-black text-white font-serif">
                            {price(displayPrice)}
                          </span>
                          <span className="font-mono text-xs text-[#94a3b8]">
                            {p.isQuoteOnly ? "· sur mesure" : t(PERIOD_LABEL[displayPeriod])}
                          </span>
                        </div>
                      </div>

                      {/* Deliverables Checklist */}
                      <ul className="space-y-3 mb-8">
                        {(p.features ?? []).map((feature, k) => (
                          <li key={k} className="flex items-start gap-3 text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                            <Check className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
                            <span>{t(feature)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      {p.isQuoteOnly ? (
                        <a
                          href="/#quote"
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-black shadow-lg hover:bg-[#d4af37] transition"
                        >
                          <span>Estimer mon projet sur mesure</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <AddToCartBtn
                          item={{
                            serviceId: service.id === "maps"
                              ? p.eur === 99
                                ? "maps_essentiel"
                                : p.eur === 169
                                  ? "maps_croissance"
                                  : "maps_intensif"
                              : service.id,
                            serviceName: t(service.title),
                            planName: t(p.name),
                            priceEur: displayPrice,
                            period: displayPeriod,
                            periodLabel: t(PERIOD_LABEL[displayPeriod]),
                            commitment: p.commitmentMonths
                              ? `Engagement minimum ${p.commitmentMonths} mois`
                              : displayPeriod === "year"
                                ? "Abonnement annuel"
                                : undefined,
                          }}
                          popular={p.popular}
                        />
                      )}

                      <a
                        href={planWaUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-3 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[#cbd5e1] hover:border-[#d4af37] hover:text-white transition"
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                        <span>Échanger sur WhatsApp avec Antoine</span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PILLAR 1: HUMAN ADVISOR ATTRIBUTION & SERVICE-SPECIFIC DEEP BLOCKS ── */}
        <ServicePillarDeepBlocks serviceId={service.id} />

        {/* ── 04 / FAQ ACCORDION ── */}
        <section className="border-b border-white/10 bg-[#040508] py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="text-center mb-14">
              <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.24em] text-[#d4af37] block mb-3">
                04 / QUESTIONS FRÉQUENTES
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                Questions essentielles
              </h2>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {faqItems.map((item, i) => {
                const active = openFaq === i;
                return (
                  <div key={i} className="py-5">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(active ? null : i)}
                      className="flex w-full items-center justify-between gap-4 text-left font-bold text-base sm:text-lg text-white hover:text-[#d4af37] transition"
                    >
                      <span className="flex items-center gap-4">
                        <span className="font-mono text-xs text-[#d4af37]">0{i + 1}</span>
                        <span>{t(item.q)}</span>
                      </span>
                      <Plus className={cn("h-4 w-4 transition-transform duration-300 text-[#d4af37]", active && "rotate-45")} />
                    </button>
                    {active && (
                      <div className="mt-4 pl-8 text-xs sm:text-sm leading-relaxed text-[#94a3b8] animate-in fade-in duration-200">
                        {t(item.a)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Global Studio Contact */}
        <Contact />

        {/* ── STICKY FLOATING CAPSULE ON SCROLL ── */}
        {showSticky && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-full border border-white/15 bg-[#090b10]/95 px-5 py-3 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.95)] backdrop-blur-2xl animate-in slide-in-from-bottom-3 duration-300">
            <span className="font-mono text-[10px] font-bold text-white hidden sm:inline">
              {t(service.title)} · dès {price(service.fromEur)}
            </span>
            <a
              href="#plans"
              className="rounded-full bg-white px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-wider text-black hover:bg-[#d4af37] transition"
            >
              Commander
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-wider text-white hover:border-[#25D366] transition flex items-center gap-1.5"
            >
              <MessageCircle className="h-3 w-3 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
