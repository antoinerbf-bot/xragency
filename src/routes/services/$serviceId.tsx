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
import { HeroSection } from "@/components/seo/HeroSection";
import { MapsSimulator } from "@/components/site/MapsSimulator";
import { AddToCartBtn } from "@/components/site/Cart";
import { cn } from "@/lib/utils";

const IMG_WEBSITES =
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=85";
const IMG_BRANDING =
  "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1600&q=85";
const IMG_SEO =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85";
const IMG_MAPS =
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=85";
const IMG_SOCIAL =
  "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1600&q=85";
const IMG_MAINTENANCE =
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85";
const IMG_AI =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85";

const SERVICE_IMAGES: Record<string, string> = {
  websites: IMG_WEBSITES,
  branding: IMG_BRANDING,
  seo: IMG_SEO,
  maps: IMG_MAPS,
  social: IMG_SOCIAL,
  maintenance: IMG_MAINTENANCE,
  ai: IMG_AI,
  ecommerce:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85",
  refonte:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85",
  ads: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1600&q=85",
  strategy:
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=85",
};

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
  
  "ecommerce": "ecommerce",
  "e-commerce": "ecommerce",
  "boutique-en-ligne": "ecommerce",
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
          content: `${s.short.fr} — Tarifs officiels, livrables et garantie de performance.`,
        },
        { property: "og:title", content: `${s.title.fr} — XR Agency` },
        {
          property: "og:description",
          content: `${s.short.fr} — Studio digital & IA de prestige.`,
        },
        { property: "og:type", content: "website" },
      ],
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

  const heroImg = SERVICE_IMAGES[service.id] ?? IMG_WEBSITES;
  const otherServices = SERVICES.filter((s) => s.id !== service.id);

  // Filter relevant FAQs
  const relevantFaqs = FAQ.slice(0, 4);

  // WhatsApp link with customized message for this service
  const planForWa = service.plans[selectedPlanIndex];
  const isInstWa = installmentSelections[selectedPlanIndex] ?? false;
  const planIsInstallmentWa = service.id === "websites" && isInstWa && planForWa?.period === "once";
  
  const waPrefilled = encodeURIComponent(
    `Bonjour XR Agency, je suis intéressé par votre service "${service.title[lang]}" (Forfait: "${planForWa?.name[lang]}"${planIsInstallmentWa ? " en mensualités sur 12 mois" : ""}). Pouvons-nous échanger ?`,
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
              {t({ fr: "Catalogue des Prestations", en: "Services Catalogue", vi: "Danh mục Dịch vụ" })}
            </Link>
            <div className="label-mono flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
              <span>/</span>
              <span className="text-foreground font-semibold">{t(service.title)}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                {service.id === 'seo' ? (
                  <HeroSection
                    title={t(service.title)}
                    description={t(service.description)}
                    ctaPrimary={{ label: t(UI.explorePacks), href: "#plans" }}
                  />
                ) : (
                  <>
                    <Reveal>
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-primary">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span className="label-mono text-xs uppercase tracking-widest">
                          {t(service.title)} · {service.num}
                        </span>
                      </div>
                    </Reveal>
                    <Reveal delay={80}>
                      <h1 className="display-serif mt-6 text-[clamp(2.5rem,6.5vw,5.2rem)] leading-[1.02]">
                        {t(service.title)}
                      </h1>
                    </Reveal>
                    <Reveal delay={160}>
                      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                        {t(service.description)}
                      </p>
                    </Reveal>
                    <Reveal delay={240}>
                      <div className="mt-8 flex flex-wrap gap-2.5">
                        {service.highlights.map((h, idx) => (
                          <span
                            key={idx}
                            className="label-mono inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs text-foreground backdrop-blur-sm"
                          >
                            <Zap className="h-3 w-3 text-primary" />
                            {t(h)}
                          </span>
                        ))}
                      </div>
                    </Reveal>
                    <Reveal delay={320}>
                      <div className="mt-10 flex flex-wrap items-center gap-4">
                        <EmberButton href="#plans">{t(UI.explorePacks)}</EmberButton>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3.5 text-xs uppercase tracking-widest text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                        >
                          <MessageCircle className="h-4 w-4 text-emerald-500" />
                          {t(UI.bookDirectWhatsapp)}
                        </a>
                        <Link
                          to="/"
                          hash="intelligence"
                          className="label-mono text-xs text-muted-foreground transition-colors hover:text-primary"
                        >
                          {t(UI.getCustomQuote)} →
                        </Link>
                      </div>
                    </Reveal>
                  </>
                )}
              </div>
              <div className="lg:col-span-5">
                <img src={heroImg} alt={t(service.title)} className="w-full rounded-lg shadow-lg" />
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

        {/* Interactive Pricing Grid */}
        <section id="plans" className="relative border-t border-border/60 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="text-center">
              <Reveal>
                <p className="label-mono text-xs uppercase tracking-widest text-primary">
                  {t(UI.navPricing)} · {t(service.title)}
                </p>
                <h2 className="display-serif mt-4 text-3xl sm:text-5xl">
                  {t({
                    fr: "Formules & Tarification Officielle",
                    en: "Plans & Official Pricing",
                    vi: "Gói & Bảng giá Chính thức",
                  })}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                  {t({
                    fr: "Choisissez la formule la plus adaptée à vos ambitions. Tarifs clairs, transparents et sans frais cachés.",
                    en: "Choose the plan best suited to your ambitions. Clear, transparent pricing with no hidden fees.",
                    vi: "Chọn gói phù hợp nhất với mục tiêu của bạn. Giá rõ ràng, minh bạch, không phí ẩn.",
                  })}
                </p>
              </Reveal>
            </div>



            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {service.plans.map((p, i) => {
                const isSelected = selectedPlanIndex === i;
                
                const isInst = installmentSelections[i] ?? false;
                const planIsInstallment = service.id === "websites" && isInst && p.period === "once";
                const displayPrice = planIsInstallment ? Math.round((p.eur * 1.4) / 12) : p.eur;
                const displayPeriod = planIsInstallment ? "month" : p.period;

                const planWaMessage = encodeURIComponent(
                  `Bonjour XR Agency, je souhaite commander la formule "${p.name[lang]}" du service "${service.title[lang]}" (${price(displayPrice)}${planIsInstallment ? " / mois sur 12 mois" : ""}). Comment démarrer ?`,
                );
                const planWaUrl = `${CONTACT.whatsapp}?text=${planWaMessage}`;

                return (
                  <Reveal key={i} delay={i * 80}>
                    <article
                      onClick={() => setSelectedPlanIndex(i)}
                      className={cn(
                        "surface-plate relative flex h-full flex-col justify-between rounded-3xl p-8 transition-all duration-300 cursor-pointer",
                        p.popular
                          ? "border-primary shadow-[0_0_30px_rgba(0,0,0,0.1)]"
                          : "hover:border-primary/50",
                        isSelected && "ring-2 ring-primary",
                      )}
                    >
                      {p.popular ? (
                        <span className="label-mono absolute -top-3.5 left-8 rounded-full bg-primary px-3.5 py-1 text-xs text-primary-foreground">
                          {t(UI.popular)}
                        </span>
                      ) : null}

                      <div>
                        <h3 className="display-serif text-2xl text-foreground">{t(p.name)}</h3>
                        {p.audience ? (
                          <p className="label-mono mt-2 text-xs text-muted-foreground">
                            {t(p.audience)}
                          </p>
                        ) : null}

                        {/* Inline Payment Selector for Websites */}
                        {service.id === "websites" && p.period === "once" && (
                          <div className="mt-4 flex rounded-lg bg-accent/30 p-1 border border-border/50">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setInstallmentSelections(prev => ({ ...prev, [i]: true }));
                              }}
                              className={cn(
                                "flex-1 rounded-md text-[10px] sm:text-[11px] font-medium transition-all py-1.5",
                                isInst ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              Mensualités
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setInstallmentSelections(prev => ({ ...prev, [i]: false }));
                              }}
                              className={cn(
                                "flex-1 rounded-md text-[10px] sm:text-[11px] font-medium transition-all py-1.5",
                                !isInst ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              Comptant
                            </button>
                          </div>
                        )}

                        <p className="mt-6 flex items-baseline gap-2 border-b border-border/60 pb-6">
                          <span className="display-serif text-4xl text-primary">
                            {price(displayPrice)}
                          </span>
                          <span className="label-mono flex flex-col items-start gap-1 text-xs text-muted-foreground">
                            <span>{t(PERIOD_LABEL[displayPeriod])}</span>
                            {planIsInstallment && (
                              <span className="text-[10px] text-primary/80 leading-tight max-w-[140px]">
                                {t({ fr: "sur 12 mois (inclus domaine & hébergement 79€/m)", en: "over 12 mo (incl. domain & hosting 79€/m)", vi: "trong 12 tháng (gồm domain & hosting 79€/m)" })}
                              </span>
                            )}
                          </span>
                        </p>

                        <ul className="mt-6 space-y-3.5">
                          {(p.features || []).map((f, k) => (
                            <li
                              key={k}
                              className="flex items-start gap-3 text-sm text-muted-foreground"
                            >
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span>{t(f)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-10 space-y-3">
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

                        <a
                          href={planWaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-full border border-border/80 bg-card/60 py-3 text-xs text-muted-foreground transition-all duration-300 hover:border-emerald-500/60 hover:text-emerald-500 hover:bg-emerald-500/5"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
                          {t({
                            fr: "Commander sur WhatsApp",
                            en: "Order on WhatsApp",
                            vi: "Đặt qua WhatsApp",
                          })}
                        </a>
                        <Link
                          to="/"
                          hash="intelligence"
                          className="block text-center text-xs text-muted-foreground hover:text-primary pt-1"
                        >
                          {t({
                            fr: "Ou calculer dans l'estimateur IA →",
                            en: "Or calculate in the AI estimator →",
                            vi: "Hoặc tính trong bộ ước tính AI →",
                          })}
                        </Link>
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
