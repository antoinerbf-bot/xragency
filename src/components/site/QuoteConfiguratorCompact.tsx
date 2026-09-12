import { useMemo, useState } from "react";
import { ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { CONTACT } from "@/lib/content";

type Choice = { id: string; label: string; detail: string };
type Sector = Choice & { goals: string[] };

const SECTORS: Sector[] = [
  { id: "hospitality", label: "Restaurant & hôtellerie", detail: "Restaurant, hôtel, café, rooftop", goals: ["Augmenter les réservations", "Monter en gamme", "Être trouvé localement"] },
  { id: "realestate", label: "Immobilier & luxe", detail: "Agence, location, conciergerie", goals: ["Générer plus de demandes", "Valoriser les biens", "Attirer une clientèle premium"] },
  { id: "professional", label: "Cabinet & services", detail: "Avocat, conseil, architecture, finance", goals: ["Gagner en crédibilité", "Obtenir des prospects qualifiés", "Être visible sur Google"] },
  { id: "commerce", label: "Commerce & marque", detail: "Retail, boutique, e-commerce", goals: ["Vendre davantage", "Améliorer la conversion", "Développer la marque"] },
  { id: "beauty", label: "Beauté & bien-être", detail: "Clinique, spa, salon, wellness", goals: ["Obtenir plus de rendez-vous", "Construire la confiance", "Développer la visibilité locale"] },
  { id: "other", label: "Autre activité", detail: "XR Intelligence s'adapte à votre métier", goals: ["Développer mon activité", "Professionnaliser mon image", "Construire une présence forte"] },
];

const SERVICES: Choice[] = [
  { id: "website", label: "Création de site web", detail: "Vitrine, conversion, réservation, paiement" },
  { id: "branding", label: "Branding", detail: "Identité, direction artistique, image" },
  { id: "seo", label: "SEO", detail: "Visibilité organique et acquisition Google" },
  { id: "maps", label: "Google Maps", detail: "Visibilité locale et recherches de proximité" },
  { id: "social", label: "Social Media", detail: "Contenu, animation et présence sociale" },
  { id: "maintenance", label: "WebCare Maintenance", detail: "Corrections, évolutions et suivi du site" },
];

const SITUATIONS: Choice[] = [
  { id: "none", label: "Je n'ai pas encore de site", detail: "Créer une base solide dès le départ" },
  { id: "existing", label: "J'ai déjà un site", detail: "Le conserver et le faire évoluer" },
  { id: "redesign", label: "Mon site doit être refait", detail: "Design, structure ou conversion à revoir" },
  { id: "selling", label: "Je vends / prends des réservations", detail: "Paiement, catalogue ou réservation en ligne" },
];

const BUDGETS: Choice[] = [
  { id: "under500", label: "< 500 €", detail: "Une priorité ciblée" },
  { id: "500_1000", label: "500 – 1 000 €", detail: "Une présence solide" },
  { id: "1000_2500", label: "1 000 – 2 500 €", detail: "Un dispositif complet" },
  { id: "2500_5000", label: "2 500 – 5 000 €", detail: "Une stratégie structurée" },
  { id: "5000_plus", label: "5 000 € +", detail: "Un projet premium sur mesure" },
];

const DISCOVERY: Choice[] = [
  { id: "google", label: "Google / Maps", detail: "Recherche, SEO ou visibilité locale" },
  { id: "social", label: "Instagram / Facebook / TikTok", detail: "Réseaux sociaux et recommandations" },
  { id: "referral", label: "Bouche-à-oreille", detail: "Recommandations et réseau" },
  { id: "mixed", label: "Un peu de tout", detail: "Votre acquisition est déjà diversifiée" },
];

const WAIT = 380;

export function QuoteConfiguratorCompact() {
  const [step, setStep] = useState(0);
  const [sectorId, setSectorId] = useState("");
  const [goal, setGoal] = useState("");
  const [situation, setSituation] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [budget, setBudget] = useState("");
  const [discovery, setDiscovery] = useState("");

  const sector = SECTORS.find((x) => x.id === sectorId);
  const service = SERVICES.find((x) => x.id === serviceId);
  const situationChoice = SITUATIONS.find((x) => x.id === situation);
  const budgetChoice = BUDGETS.find((x) => x.id === budget);
  const discoveryChoice = DISCOVERY.find((x) => x.id === discovery);

  const choose = (setter: (value: string) => void, value: string, next: number) => {
    setter(value);
    window.setTimeout(() => setStep(next), WAIT);
  };

  const reset = () => {
    setStep(0); setSectorId(""); setGoal(""); setSituation(""); setServiceId(""); setBudget(""); setDiscovery("");
  };

  const recommendation = useMemo(() => {
    if (!sector || !service || !situationChoice || !budgetChoice || !discoveryChoice) return "";
    const opening = service.id === "website"
      ? situation === "none" ? "Une création de site pensée autour de votre activité et de votre objectif." : "Une évolution ou refonte de site orientée conversion et expérience utilisateur."
      : service.id === "seo" ? "Un plan SEO construit autour des recherches qui peuvent réellement générer des clients."
      : service.id === "maps" ? "Une stratégie de visibilité locale pour apparaître au bon moment dans Google Maps et la recherche."
      : service.id === "social" ? "Une présence sociale structurée pour renforcer votre image et votre acquisition."
      : service.id === "branding" ? "Une identité premium cohérente avec votre positionnement et votre clientèle."
      : "Un accompagnement WebCare dimensionné selon votre rythme d'évolution.";
    const context = goal.toLowerCase();
    const fit = context.includes("réservation") || context.includes("rendez-vous")
      ? "Nous mettrons l'accent sur le parcours de réservation et la conversion."
      : context.includes("google") || context.includes("local") || context.includes("visible")
        ? "Nous privilégierons les points de contact qui améliorent votre visibilité."
        : "La recommandation sera calibrée selon votre situation actuelle et votre budget.";
    return `${opening} ${fit}`;
  }, [sector, service, situationChoice, budgetChoice, discoveryChoice, situation, goal]);

  const titles = [
    "Quel est votre univers ?",
    `Votre priorité pour ${sector?.label.toLowerCase() ?? "votre activité"} ?`,
    "Où en êtes-vous aujourd'hui ?",
    "Quelle expertise voulez-vous activer ?",
    "Quel investissement envisagez-vous ?",
    "Comment vos clients vous trouvent-ils aujourd'hui ?",
    "Votre recommandation est prête.",
  ];

  const progress = ((step + 1) / 7) * 100;

  const card = (item: Choice, onClick: () => void) => (
    <button key={item.id} type="button" onClick={onClick} className="group rounded-xl border border-border bg-background p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md active:scale-[.99]">
      <div className="flex items-center justify-between gap-2"><span className="text-sm font-medium leading-tight">{item.label}</span><ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" /></div>
      <div className="mt-1 text-[10px] leading-4 text-muted-foreground">{item.detail}</div>
    </button>
  );

  return (
    <section id="quote" className="relative border-y border-border/50 bg-background py-7 sm:py-9">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary"><Sparkles className="h-3.5 w-3.5" /></span><div className="min-w-0"><div className="label-mono text-[8px] uppercase tracking-[0.2em] text-primary">XR INTELLIGENCE</div><div className="truncate text-[10px] text-muted-foreground">Alexandre est là pour vous servir · devis sur mesure</div></div></div>
          <div className="flex shrink-0 items-center gap-2"><div className="h-1 w-16 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} /></div><span className="label-mono text-[8px] text-muted-foreground">{String(step + 1).padStart(2, "0")}/07</span></div>
        </div>

        <div className="rounded-2xl border border-border bg-card/80 p-4 shadow-[0_18px_60px_-42px_rgba(0,0,0,.55)] sm:p-5">
          <div className="mb-4 flex items-end justify-between gap-3"><div><p className="label-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">{step === 6 ? "Analyse terminée" : `Question ${step + 1}`}</p><h2 className="mt-1 text-xl font-medium tracking-[-0.03em] sm:text-2xl">{titles[step]}</h2></div>{step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground" aria-label="Question précédente">←</button>}</div>

          <div key={step} className="animate-in fade-in slide-in-from-right-2 duration-250">
            {step === 0 && <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{SECTORS.map((x) => card(x, () => choose(setSectorId, x.id, 1)))}</div>}
            {step === 1 && sector && <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">{sector.goals.map((x) => card({ id: x, label: x, detail: "Priorité adaptée à votre secteur" }, () => choose(setGoal, x, 2)))}</div>}
            {step === 2 && <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{SITUATIONS.map((x) => card(x, () => choose(setSituation, x.id, 3)))}</div>}
            {step === 3 && <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">{SERVICES.map((x) => card(x, () => choose(setServiceId, x.id, 4)))}</div>}
            {step === 4 && <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">{BUDGETS.map((x) => card(x, () => choose(setBudget, x.id, 5)))}</div>}
            {step === 5 && <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{DISCOVERY.map((x) => card(x, () => choose(setDiscovery, x.id, 6)))}</div>}
            {step === 6 && sector && service && situationChoice && budgetChoice && discoveryChoice && <div className="space-y-3">
              <div className="rounded-xl border border-primary/30 bg-primary/[0.06] p-4"><div className="flex items-center gap-2 text-xs font-medium"><Check className="h-4 w-4 text-primary" /> Recommandation XR Intelligence</div><p className="mt-2 text-sm leading-6">{recommendation}</p></div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{[["Secteur", sector.label], ["Objectif", goal], ["Situation", situationChoice.label], ["Budget", budgetChoice.label]].map(([label, value]) => <div key={label} className="rounded-lg border border-border bg-background p-2.5"><div className="label-mono text-[7px] uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 text-[10px] leading-4">{value}</div></div>)}</div>
              <div className="flex flex-wrap gap-2"><a href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`Bonjour XR Agency, je souhaite un devis sur mesure. Secteur : ${sector.label}. Objectif : ${goal}. Situation : ${situationChoice.label}. Expertise : ${service.label}. Budget : ${budgetChoice.label}. Acquisition : ${discoveryChoice.label}.`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[9px] font-semibold uppercase tracking-wider text-primary-foreground">Recevoir mon devis <ArrowRight className="h-3.5 w-3.5" /></a><button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"><RotateCcw className="h-3.5 w-3.5" /> Recommencer</button></div>
            </div>}
          </div>
        </div>
      </div>
    </section>
  );
}
