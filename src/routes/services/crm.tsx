import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { CustomCrmShowcase } from "@/components/site/CustomCrmShowcase";
import { Sparkles, Bot, Layers, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services/crm")({
  head: () => ({
    meta: [
      { title: "CRM Sur-Mesure & Logiciels Métier dès 2 000 € — XRAGENCY" },
      {
        name: "description",
        content:
          "Logiciel de caisse tactile, CRM, bornes, prise de commande directe et automatisation pour restaurants, hôtels et commerces. 100% propriétaire, zéro abonnement captif, dès 2 000 €.",
      },
      { property: "og:title", content: "CRM & Logiciels Métier Sur-Mesure — XRAGENCY" },
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
    <div className="min-h-screen overflow-x-hidden bg-[#FAF8F5] text-[#12110E]">
      <Nav />
      <main className="pt-20">
        {/* Intro Banner: Assimilation with Automation & Robotics */}
        <section className="relative border-b border-[#E8E6E0] bg-white py-12 px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                  <Layers className="h-3.5 w-3.5" />
                  PÔLE INGÉNIERIE MÉTIER & AUTOMATISATION
                </div>
                <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#12110E] sm:text-5xl">
                  CRM Sur-Mesure, Logiciels & Systèmes Connectés.
                </h1>
                <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-[#52504A]">
                  Développé spécifiquement pour la restauration, l'hôtellerie, les cliniques privées et les enseignes de prestige. Un investissement unique à partir de 2 000 €, cession intégrale de propriété et zéro commission tierce.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to="/services/robotique"
                  className="inline-flex items-center gap-2 rounded-full border border-[#D5D5CF] bg-[#FAF8F5] px-4 py-2.5 text-xs font-semibold text-[#12110E] transition hover:border-[#12110E]"
                >
                  <Bot className="h-4 w-4 text-[#C5A880]" />
                  <span>Connecter avec les Robots Korben</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href="#simulateur-pos"
                  className="inline-flex items-center gap-2 rounded-full bg-[#12110E] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#2B2925]"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
                  <span>Tester le Simulateur de Caisse</span>
                </a>
              </div>
            </div>

            {/* Quick 3 Pillar Guarantees */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 border-t border-[#E8E6E0] pt-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#52504A]">
                <ShieldCheck className="h-4 w-4 text-[#C5A880] shrink-0" />
                <span>100% Cession de Code & Base de Données</span>
              </div>
              <div className="flex items-center gap-2 text-[#52504A]">
                <CheckCircle2 className="h-4 w-4 text-[#C5A880] shrink-0" />
                <span>0% de Commission sur Chiffre d'Affaires</span>
              </div>
              <div className="flex items-center gap-2 text-[#52504A]">
                <Sparkles className="h-4 w-4 text-[#C5A880] shrink-0" />
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
