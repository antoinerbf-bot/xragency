import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { CustomCrmShowcase } from "@/components/site/CustomCrmShowcase";
import { Sparkles, Bot, Layers, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services/crm")({
  head: () => ({
    meta: [
      { title: "CRM Sur-Mesure & Logiciels Métier dès 2 000 € — XR Agency" },
      {
        name: "description",
        content:
          "Logiciel de caisse tactile, CRM, bornes, prise de commande directe et automatisation pour restaurants, hôtels et commerces. 100% propriétaire, zéro abonnement captif, dès 2 000 €.",
      },
      { property: "og:title", content: "CRM & Logiciels Métier Sur-Mesure — XR Agency" },
      {
        property: "og:description",
        content:
          "Reprenez le contrôle de vos marges : systèmes sur mesure pour la restauration et l'hôtellerie, intégrés à l'automatisation et à la robotique.",
      },
    ],
  }),
  component: CrmServicePage,
});

function CrmServicePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0F0D0A] text-[#FAF8F5]">
      <Nav />
      <main className="pt-20">
        {/* Intro Banner: Assimilation with Automation & Robotics */}
        <section className="relative border-b border-white/10 bg-[#14110D] py-12 px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D8B788]/30 bg-[#D8B788]/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D8B788]">
                  <Layers className="h-3.5 w-3.5" />
                  PÔLE INGÉNIERIE MÉTIER & AUTOMATISATION
                </div>
                <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-white sm:text-5xl">
                  CRM Sur-Mesure, Logiciels & Systèmes Connectés.
                </h1>
                <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-neutral-300">
                  Développé spécifiquement pour la restauration, l'hôtellerie, les cliniques privées et les enseignes de prestige. Un investissement unique à partir de 2 000 €, cession intégrale de propriété et zéro commission tierce.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to="/services/robotique"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition hover:border-[#D8B788] hover:text-[#D8B788]"
                >
                  <Bot className="h-4 w-4 text-[#D8B788]" />
                  <span>Connecter avec les Robots Korben</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href="#simulateur-pos"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D8B788] px-5 py-2.5 text-xs font-bold text-[#15120E] shadow-md transition hover:bg-[#E5CA9E]"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Tester le Simulateur de Caisse</span>
                </a>
              </div>
            </div>

            {/* Quick 3 Pillar Guarantees */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 border-t border-white/10 pt-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <ShieldCheck className="h-4 w-4 text-[#16A34A] shrink-0" />
                <span>100% Cession de Code & Base de Données</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <CheckCircle2 className="h-4 w-4 text-[#D8B788] shrink-0" />
                <span>0% de Commission sur Chiffre d'Affaires</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Sparkles className="h-4 w-4 text-[#0EA5E9] shrink-0" />
                <span>Alertes WhatsApp & KDS Cuisine Inclus</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Interactive Showcase with POS, KDS, Stock & Commission Calculator */}
        <div id="simulateur-pos">
          <CustomCrmShowcase />
        </div>

        <Contact />
      </main>
    </div>
  );
}
