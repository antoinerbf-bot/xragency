import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  FileCheck,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
  Clock,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

interface Step {
  num: string;
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Compass;
  duration: string;
  deliverables: string[];
  summary: string;
  details: string;
  kpi: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    id: "decouverte",
    title: "Découverte & Analyse du besoin",
    subtitle: "Cadrage stratégique & audit des opportunités",
    icon: Compass,
    duration: "24h - 48h",
    kpi: "Audit 360° offert",
    deliverables: [
      "Audit de votre écosystème actuel & concurrentiel",
      "Définition précise de votre clientèle cible",
      "Identification des leviers SEO local & conversion",
      "Choix du format : vitrine, e-commerce, branding ou écosystème complet",
    ],
    summary:
      "Nous commençons par écouter et analyser vos objectifs réels. Pas de jargon ni de fonctionnalités superflues : nous isolons ce qui génère des prises de contact qualifiées pour votre secteur.",
    details:
      "Chaque projet débute par un échange approfondi et une analyse technique de votre positionnement. Nous examinons vos concurrents directs, vos requêtes Google prioritaires et l'ergonomie attendue par vos clients.",
  },
  {
    num: "02",
    id: "proposition",
    title: "Proposition stratégique & Devis",
    subtitle: "Cahier des charges limpide & tarification contractuelle",
    icon: FileCheck,
    duration: "24h après cadrage",
    kpi: "Prix ferme sans surprise",
    deliverables: [
      "Devis officiel détaillé ligne par ligne",
      "Spécification des technologies & hébergement",
      "Planning de production jalonné avec date de livraison ferme",
      "Conditions claires (acompte / virement pro / engagements transparents)",
    ],
    summary:
      "Une proposition claire, transparente et contractuelle. Les tarifs appliqués sont ceux de notre catalogue officiel, sans coût caché ni abonnement forcé.",
    details:
      "Vous recevez un document complet avec les livrables exacts, la date de livraison garantie et les modalités de paiement. Si le projet nécessite du sur-mesure (e-commerce, CRM, robotique), le chiffrage est validé avant le moindre engagement.",
  },
  {
    num: "03",
    id: "production",
    title: "Production & Validation",
    subtitle: "Direction artistique haute fidélité & code sur-mesure",
    icon: Layers,
    duration: "5 à 7 jours ouvrés (Vitrine)",
    kpi: "Performance mesurée et optimisée",
    deliverables: [
      "Design d'exception adapté à votre identité de marque",
      "Développement Next-Gen (React 19 / TanStack) ultra-rapide",
      "Optimisation mobile irréprochable & accessibilité",
      "Espace de prévisualisation privé pour vos retours en temps réel",
    ],
    summary:
      "Notre studio conçoit une expérience sur-mesure, élégante et fluide. Vous suivez l'avancement sur une URL de prévisualisation dédiée et validez chaque étape clé.",
    details:
      "Nous combinons une direction artistique d'inspiration studio de luxe avec une rigueur d'ingénierie moderne : code propre, zéro template générique, micro-animations discrètes et vitesse de chargement optimisée et mesurée.",
  },
  {
    num: "04",
    id: "livraison",
    title: "Livraison, Accompagnement & Optimisation",
    subtitle: "Mise en ligne, référencement Google & suivi pérenne",
    icon: Rocket,
    duration: "Jour J & accompagnement continu",
    kpi: "Propriété 100% exclusive",
    deliverables: [
      "Mise en production sécurisée & configuration DNS / SSL",
      "Indexation immédiate Google Search Console & balises Schema.org",
      "Formation express à la prise en main de vos outils",
      "Maintenance réactive WebCare & mises à jour de sécurité",
    ],
    summary:
      "Votre plateforme est propulsée en ligne avec tous ses accès. Vous êtes propriétaire à 100% de votre code, de vos noms de domaine et de vos contenus.",
    details:
      "La livraison n'est pas la fin de la collaboration : nous surveillons les premiers signaux de trafic, vérifions l'indexation de chaque page et vous accompagnons pour convertir vos premiers visiteurs en clients réguliers.",
  },
];

export function MethodSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeStep = STEPS[activeIdx];

  return (
    <section
      id="notre-methode"
      className="relative isolate overflow-hidden bg-[#030406] py-24 sm:py-32 text-white border-t border-white/[0.08]"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[90%] max-w-[1200px] rounded-full bg-gradient-to-b from-[#d4af37]/[0.035] via-transparent to-transparent blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1560px] px-4 sm:px-8 lg:px-14">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3.5 py-1 text-[9px] font-mono uppercase tracking-[0.22em] text-[#d4af37] backdrop-blur-md">
            <Sparkles className="h-3 w-3" />
            <span>MÉTHODE COMMERCIALE & OPÉRATIONNELLE</span>
          </div>

          <h2 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.04em] text-white">
            Une méthode en 4 étapes,{" "}
            <span className="font-serif font-light italic text-[#d4af37]">zéro imprévu.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#94a3b8] leading-relaxed">
            De la première conversation jusqu'à la mise en ligne et au suivi de vos conversions,
            notre processus élimine les hésitations techniques pour livrer dans les délais convenus.
          </p>
        </div>

        {/* Desktop / Tablet Step Progress Navigation */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeIdx;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  "relative flex flex-col text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 backdrop-blur-xl group",
                  isActive
                    ? "border-[#d4af37] bg-white/[0.06] shadow-[0_0_35px_rgba(212,175,55,0.18)]"
                    : "border-white/[0.08] bg-[#080a10]/60 hover:border-white/20 hover:bg-white/[0.03]",
                )}
              >
                {/* Active Indicator Top Line */}
                {isActive && (
                  <span className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                )}

                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "font-mono text-xs font-bold tracking-widest",
                      isActive ? "text-[#d4af37]" : "text-[#64748b] group-hover:text-[#94a3b8]",
                    )}
                  >
                    ÉTAPE {step.num}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] text-[#94a3b8]">
                    <Clock className="h-3 w-3 text-[#d4af37]" />
                    {step.duration}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div
                    className={cn(
                      "h-9 w-9 rounded-xl flex items-center justify-center border transition-all",
                      isActive
                        ? "border-[#d4af37]/60 bg-[#d4af37]/20 text-[#d4af37]"
                        : "border-white/10 bg-white/5 text-[#94a3b8] group-hover:text-white",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3
                    className={cn(
                      "text-sm sm:text-base font-bold tracking-tight transition-colors",
                      isActive ? "text-white" : "text-[#cbd5e1] group-hover:text-white",
                    )}
                  >
                    {step.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="mt-6 rounded-3xl border border-white/[0.12] bg-gradient-to-br from-[#0c0e14]/90 via-[#07090e]/90 to-[#030406]/90 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#d4af37] tracking-widest">
                  ÉTAPE {activeStep.num} / 04
                </span>
                <span className="h-1 w-1 rounded-full bg-[#d4af37]" />
                <span className="text-xs text-[#94a3b8] font-mono">{activeStep.subtitle}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-serif">
                {activeStep.title}
              </h3>

              <p className="text-base sm:text-lg text-[#e2e8f0] leading-relaxed">
                {activeStep.summary}
              </p>

              <p className="text-sm text-[#94a3b8] leading-relaxed">{activeStep.details}</p>

              {/* Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#quote"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#d4af37] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#080a10] transition hover:bg-white hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                >
                  <span>Démarrer par l'étape 1</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="https://wa.me/33767566783"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-medium text-white transition hover:bg-white/10"
                >
                  <span>Échanger avec la direction (WhatsApp)</span>
                </a>
              </div>
            </div>

            {/* Right Deliverables Column */}
            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#06080d]/80 p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                  Livrables & Garanties
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#22c55e] bg-[#22c55e]/10 px-2.5 py-0.5 rounded-full border border-[#22c55e]/20">
                  <CheckCircle2 className="h-3 w-3" />
                  {activeStep.kpi}
                </span>
              </div>

              <ul className="space-y-3.5">
                {activeStep.deliverables.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-[#cbd5e1] leading-snug"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-white/10 text-xs text-[#94a3b8] flex items-center justify-between">
                <span>Délai indicatif pour cette étape</span>
                <span className="font-mono text-white font-semibold">{activeStep.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
