import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Search, Sparkles } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { Reveal } from "@/components/site/primitives";
import { CONTACT, PERIOD_LABEL, SERVICES } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const SEO = SERVICES.find((service) => service.id === "seo");

if (!SEO) {
  throw new Error("SEO service configuration is missing");
}

export const Route = createFileRoute("/services/seo")({
  head: () => ({
    meta: [
      { title: "Référencement SEO — XR Agency" },
      { name: "description", content: SEO.description.fr },
      { property: "og:title", content: "Référencement SEO — XR Agency" },
      { property: "og:description", content: SEO.description.fr },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SeoPage,
});

function SeoPage() {
  const { t, lang, price } = useLang();
  const waUrl = `${CONTACT.whatsapp}?text=${encodeURIComponent("Bonjour XR Agency, je souhaite parler de votre accompagnement SEO.")}`;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-60" style={{ background: "var(--gradient-halo)" }} />
      <Nav />
      <main className="relative z-10 pt-28">
        <div className="mx-auto max-w-7xl px-6 pt-4 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
            <Link to="/services" className="label-mono inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> Catalogue des prestations
            </Link>
            <div className="label-mono text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary">Accueil</Link> / Services / SEO
            </div>
          </div>
        </div>

        <section className="py-14 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:px-10">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span className="label-mono text-xs uppercase tracking-widest">XR AGENCY · 03</span>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="display-serif mt-6 max-w-4xl text-[clamp(2.8rem,7vw,6.4rem)] leading-[.95]">{t(SEO.title)}</h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{t(SEO.description)}</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#plans" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
                    Voir les offres <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest hover:border-primary hover:text-primary">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120} className="overflow-hidden rounded-[2rem] border border-border/70 bg-card">
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/20 via-card to-background p-8 sm:p-12">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 45%, currentColor 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-xs uppercase tracking-widest text-primary">Google visibility</span>
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="rounded-2xl border border-border/70 bg-background/75 p-5 backdrop-blur">
                      <p className="label-mono text-[10px] text-muted-foreground">Recherche Google</p>
                      <p className="mt-3 text-xl font-medium">votre activité + votre ville</p>
                      <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full w-[82%] rounded-full bg-primary" /></div>
                      <p className="mt-3 text-xs text-muted-foreground">Stratégie · contenu · autorité · suivi</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/25 py-10">
          <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
            {SEO.highlights.slice(0, 4).map((item, index) => (
              <div key={index} className="rounded-2xl border border-border/70 bg-background/50 p-5">
                <span className="label-mono text-[10px] text-primary">0{index + 1}</span>
                <p className="mt-3 text-sm font-medium leading-relaxed">{t(item)}</p>
              </div>
            ))}
          </div>
        </section>

        {SEO.steps?.length ? (
          <section className="py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <Reveal>
                <p className="label-mono text-xs uppercase tracking-widest text-primary">Notre méthode</p>
                <h2 className="display-serif mt-4 max-w-4xl text-4xl sm:text-6xl">Un SEO lisible, construit pour durer.</h2>
              </Reveal>
              <div className="mt-10 divide-y divide-border/60 border-y border-border/60">
                {SEO.steps.map((step) => (
                  <div key={step.num} className="grid gap-4 py-8 md:grid-cols-[100px_280px_1fr]">
                    <span className="label-mono text-xs text-primary">{step.num}</span>
                    <h3 className="display-serif text-2xl">{t(step.title)}</h3>
                    <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{t(step.desc)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section id="plans" className="border-y border-border/60 bg-card/20 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <p className="label-mono text-xs uppercase tracking-widest text-primary">Les offres SEO</p>
              <h2 className="display-serif mt-4 max-w-4xl text-4xl sm:text-6xl">Choisissez le niveau d'accompagnement adapté à votre ambition.</h2>
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {SEO.plans.map((plan, index) => (
                <div key={index} className={`rounded-[2rem] border p-7 sm:p-8 ${plan.popular ? "border-primary bg-primary/[0.06] shadow-xl" : "border-border bg-card/70"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="label-mono text-xs text-primary">0{index + 1} / {String(SEO.plans.length).padStart(2, "0")}</span>
                    {plan.popular && <span className="label-mono rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[9px] text-primary">RECOMMANDÉ</span>}
                  </div>
                  <h3 className="display-serif mt-5 text-3xl">{t(plan.name)}</h3>
                  <div className="mt-7 flex items-end gap-2 border-y border-border/60 py-5">
                    <span className="display-serif text-4xl text-primary">{price(plan.eur)}</span>
                    <span className="label-mono mb-1 text-xs text-muted-foreground">{t(PERIOD_LABEL[plan.period])}</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex gap-3 text-sm leading-relaxed">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{t(feature)}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={`${waUrl}&plan=${encodeURIComponent(plan.name[lang])}`} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
                    Parler de ce forfait <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="rounded-[2rem] border border-primary/30 bg-primary/[0.05] p-8 sm:p-12 lg:p-16">
              <p className="label-mono text-xs uppercase tracking-widest text-primary">XRAGENCY · SEO</p>
              <h2 className="display-serif mt-4 max-w-4xl text-4xl sm:text-6xl">Votre visibilité mérite une stratégie claire.</h2>
              <p className="mt-5 max-w-2xl text-muted-foreground">Parlons de votre marché, de vos concurrents et des recherches qui peuvent réellement générer des demandes.</p>
              <a href={waUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground">Démarrer mon projet <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>
        <Contact />
      </main>
    </div>
  );
}
