import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SERVICES, PERIOD_LABEL, CONTACT } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { EmberButton, Reveal } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

import imgBranding from "@/assets/svc-branding.jpg";
import imgSeo from "@/assets/svc-seo.jpg";
import imgMaps from "@/assets/svc-maps.jpg";
import imgSocial from "@/assets/svc-social.jpg";
import imgMaintenance from "@/assets/svc-maintenance.jpg";
import imgAi from "@/assets/svc-ai.jpg";

const WEBSITES_IMG =
  "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&w=1400&q=85";

const SERVICE_IMAGES: Record<string, string> = {
  websites: WEBSITES_IMG,
  branding: imgBranding,
  seo: imgSeo,
  maps: imgMaps,
  social: imgSocial,
  maintenance: imgMaintenance,
  ai: imgAi,
};

export const Route = createFileRoute("/services/$serviceId")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.id === params.serviceId);
    if (!service) {
      throw notFound();
    }
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Service — XR Agency 2030" }] };
    return {
      meta: [
        { title: `${s.title.fr} — XR Agency 2030` },
        {
          name: "description",
          content: `${s.short.fr} — Tarifs officiels, livrables et garantie de performance.`,
        },
        { property: "og:title", content: `${s.title.fr} — XR Agency 2030` },
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

  const heroImg = SERVICE_IMAGES[service.id] ?? WEBSITES_IMG;
  const otherServices = SERVICES.filter((s) => s.id !== service.id);

  // WhatsApp link with customized message for this service
  const waPrefilled = encodeURIComponent(
    `Bonjour XR Agency, je suis intéressé par votre service "${service.title[lang]}" (Forfait: "${service.plans[selectedPlanIndex]?.name[lang]}"). Pouvons-nous échanger ?`,
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
              to="/"
              className="label-mono inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              {t(UI.backToServices)}
            </Link>
            <div className="label-mono flex items-center gap-2 text-xs text-muted-foreground">
              <span>{service.num}</span>
              <span>/</span>
              <span className="text-foreground">{t(service.title)}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
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

                {/* Key Metric Highlights */}
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

                {/* Direct CTA Buttons */}
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
              </div>

              {/* Visual Presentation Card */}
              <div className="lg:col-span-5">
                <Reveal delay={200}>
                  <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={heroImg}
                        alt={t(service.title)}
                        className="h-full w-full object-cover grayscale-[0.35] transition-transform duration-700 hover:scale-105 hover:grayscale-0"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--background) 70%, transparent) 100%)",
                        }}
                      />
                    </div>

                    <div className="relative p-7">
                      <div className="flex items-center justify-between border-b border-border pb-4">
                        <span className="label-mono text-xs text-muted-foreground">
                          {t(UI.from)}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="display-serif text-3xl text-primary">
                            {price(service.fromEur)}
                          </span>
                          <span className="label-mono text-xs text-muted-foreground">
                            {t(PERIOD_LABEL[service.fromPeriod])}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="label-mono flex items-center gap-1.5 text-xs text-muted-foreground">
                          <ShieldCheck className="h-4 w-4 text-primary" />
                          {t(UI.resultsGuaranteed)}
                        </span>
                        <span className="label-mono text-xs text-muted-foreground">
                          {service.plans.length} formules
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
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
                  Notre méthode de réalisation
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
                          Étape {st.num} sur 04
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
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
                  Formules & Tarification Officielle
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                  Choisissez la formule la plus adaptée à vos ambitions. Tarifs clairs, transparents
                  et sans frais cachés.
                </p>
              </Reveal>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {service.plans.map((p, i) => {
                const isSelected = selectedPlanIndex === i;
                const planWaMessage = encodeURIComponent(
                  `Bonjour XR Agency, je souhaite commander la formule "${p.name[lang]}" du service "${service.title[lang]}" (${price(p.eur)}). Comment démarrer ?`,
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

                        <p className="mt-6 flex items-baseline gap-2 border-b border-border/60 pb-6">
                          <span className="display-serif text-4xl text-primary">
                            {price(p.eur)}
                          </span>
                          <span className="label-mono text-xs text-muted-foreground">
                            {t(PERIOD_LABEL[p.period])}
                          </span>
                        </p>

                        <ul className="mt-6 space-y-3.5">
                          {p.features.map((f, k) => (
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
                        <a
                          href={planWaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            "flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-medium uppercase tracking-wider transition-all duration-300",
                            p.popular
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : "border border-border bg-card hover:border-primary hover:text-primary",
                          )}
                        >
                          <MessageCircle className="h-4 w-4" />
                          Commander cette formule
                        </a>
                        <Link
                          to="/"
                          hash="intelligence"
                          className="block text-center text-xs text-muted-foreground hover:text-primary"
                        >
                          Ou calculer dans l'estimateur IA →
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
        {service.comparisons && service.comparisons.length > 0 && (
          <section className="border-t border-border/60 py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <Reveal>
                <div className="text-center">
                  <p className="label-mono text-xs uppercase tracking-widest text-primary">
                    {t(UI.serviceCompareTitle)}
                  </p>
                  <h2 className="display-serif mt-4 text-3xl sm:text-5xl">
                    L'Excellence XR Agency vs Les Standards
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
                      {service.comparisons.map((c, idx) => (
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

        {/* Other Services Discovery Bar */}
        <section className="border-t border-border/60 bg-accent/10 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="label-mono text-xs uppercase tracking-widest text-primary">
                  {t(UI.otherServices)}
                </p>
                <h3 className="display-serif mt-2 text-2xl sm:text-3xl">
                  Complétez votre écosystème
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
      </main>
    </div>
  );
}
