import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { ServicePillarDeepBlocks } from "@/components/site/ServicePillarDeepBlocks";
import { AddToCartBtn } from "@/components/site/Cart";
import { ShieldCheck, ServerCog, Clock, CheckCircle2, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/webcare")({
  head: () => ({
    meta: [
      { title: "WebCare — Maintenance, Sécurité & SLA < 4h avec Julie | XR Agency" },
      {
        name: "description",
        content:
          "Confiez la maintenance, l'hébergement haute disponibilité, les sauvegardes quotidiennes et les évolutions mensuelles de votre site à Julie chez XR Agency.",
      },
    ],
  }),
  component: WebCareDirectRoute,
});

function WebCareDirectRoute() {
  const plans = [
    {
      id: "webcare_essentiel",
      name: "WebCare Essentiel",
      price: 29,
      sla: "SLA 48h ouvrées",
      mods: "4 modifications / mois",
      features: [
        "Surveillance disponibilité 24/7 & SSL",
        "Sauvegardes cloud hebdomadaires",
        "4 mises à jour de textes ou photos / mois",
        "Suivi direct par Julie",
      ],
    },
    {
      id: "webcare_business",
      name: "WebCare Business Pro",
      price: 49,
      popular: true,
      sla: "SLA Prioritaire < 24h",
      mods: "10 modifications / mois",
      features: [
        "Sauvegardes quotidiennes externalisées",
        "Protection pare-feu WAF & anti-DDoS",
        "10 modifications mensuelles (textes, visuels, sections)",
        "Rapport mensuel Core Web Vitals par Julie",
      ],
    },
    {
      id: "webcare_unlimited",
      name: "WebCare Unlimited SLA",
      price: 99,
      sla: "SLA Critique < 4h",
      mods: "Modifications courantes illimitées",
      features: [
        "Modifications courantes illimitées dans le périmètre du site",
        "Ligne WhatsApp prioritaire avec Julie (< 4h)",
        "Optimisation continue de la vitesse mobile",
        "Petites évolutions fonctionnelles incluses",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#080B10] text-[#F8FAFC]">
      <Nav />
      <main className="pt-28 pb-20 space-y-16">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A] border border-[#D4AF37]/40 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            <ShieldCheck className="w-4 h-4" />
            PÔLE WEBCARE & FIDÉLISATION • DIRIGÉ PAR JULIE
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Votre site protégé, rapide et mis à jour{" "}
            <span className="text-[#D4AF37]">sans friction</span>.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Infrastructure Cloud Annuelle à <strong>79 € / an</strong> + accompagnement mensuel à la carte piloté par <strong>Julie</strong>. Fini les sites laissés à l'abandon après la livraison.
          </p>
        </section>

        {/* Julie's Contextual Advisor Banner */}
        <ServicePillarDeepBlocks serviceId="webcare" />

        {/* WebCare Plans */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl p-6 border flex flex-col justify-between space-y-6 ${
                p.popular
                  ? "bg-[#0F172A] border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                  : "bg-[#0F172A]/80 border-white/10"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                    {p.sla}
                  </span>
                  {p.popular && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#D4AF37] text-[#080B10]">
                      RECOMMANDÉ PAR JULIE
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white">{p.name}</h2>
                <div className="text-3xl font-mono font-bold text-[#10B981]">
                  {p.price} €{" "}
                  <span className="text-xs font-normal text-slate-400">
                    HT / mois
                  </span>
                </div>
                <div className="text-xs font-mono text-white bg-[#080B10] px-3 py-2 rounded-xl border border-white/10">
                  {p.mods}
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <AddToCartBtn
                item={{
                  serviceId: p.id,
                  serviceName: "WebCare (Julie)",
                  planName: p.name,
                  priceEur: p.price,
                  period: "month",
                  periodLabel: "/ mois",
                }}
                popular={p.popular}
              />
            </div>
          ))}
        </section>

        <Contact />
      </main>
    </div>
  );
}
