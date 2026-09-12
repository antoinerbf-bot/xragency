import { useMemo, useState } from "react";
import { ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { CONTACT } from "@/lib/content";

type Choice = { id: string; label: string; detail: string };
type Sector = Choice & { goals: string[] };

const SECTORS: Sector[] = [
  { id: "hospitality", label: "Restaurant & hôtellerie", detail: "Restaurant, hôtel, café, rooftop", goals: ["Augmenter les réservations", "Monter en gamme", "Être trouvé localement"] },
  { id: "realestate", label: "Immobilier & luxe", detail: "Agence, location, conciergerie", goals: ["Générer plus de demandes", "Valoriser les biens", "Attirer une clientèle premium"] },
  { id: "professional", label: "Cabinet & services", detail: "Avocat, conseil, architecture, finance", goals: ["Gagner en crédibilité", "Obtenir des prospects qualifiés", "Être visible sur Google"] },
  { id: "commerce", label: "Commerce & marque", detail: "Boutique, retail, e-commerce", goals: ["Vendre davantage", "Améliorer la conversion", "Développer la marque"] },
  { id: "other", label: "Autre activité", detail: "Alexandre adapte le diagnostic à votre métier", goals: ["Développer mon activité", "Professionnaliser mon image", "Construire une présence forte"] },
];

const SERVICES: Choice[] = [
  { id: "website", label: "Création de site web", detail: "Vitrine, Business, e-commerce, réservation" },
  { id: "branding", label: "Branding", detail: "Identité, direction artistique, image" },
  { id: "seo", label: "SEO", detail: "Visibilité organique et acquisition Google" },
  { id: "maps", label: "Google Maps", detail: "Visibilité locale et recherches de proximité" },
  { id: "social", label: "Social Media", detail: "Contenu, animation et présence sociale" },
  { id: "maintenance", label: "WebCare", detail: "Corrections, évolutions et suivi du site" },
];

const SITUATIONS: Choice[] = [
  { id: "none", label: "Pas encore de site", detail: "Créer une base solide dès le départ" },
  { id: "existing", label: "J'ai déjà un site", detail: "Le conserver et le faire évoluer" },
  { id: "redesign", label: "Mon site doit être refait", detail: "Design, structure ou conversion à revoir" },
  { id: "selling", label: "Je vends / prends des réservations", detail: "Paiement, catalogue ou réservation en ligne" },
];

const BUDGETS: Choice[] = [
  { id: "under500", label: "Moins de 500 €", detail: "Un levier prioritaire" },
  { id: "500_1000", label: "500 – 1 000 €", detail: "Une présence solide" },
  { id: "1000_2500", label: "1 000 – 2 500 €", detail: "Un dispositif complet" },
  { id: "2500_5000", label: "2 500 – 5 000 €", detail: "Une stratégie structurée" },
  { id: "5000_plus", label: "5 000 € +", detail: "Un projet premium sur mesure" },
];

const DISCOVERY: Choice[] = [
  { id: "google", label: "Google / Maps", detail: "Recherche, SEO ou visibilité locale" },
  { id: "social", label: "Instagram / Facebook / TikTok", detail: "Réseaux sociaux et recommandations" },
  { id: "referral", label: "Bouche-à-oreille", detail: "Recommandations et réseau" },
  { id: "mixed", label: "Un peu de tout", detail: "Acquisition déjà diversifiée" },
];

const WAIT = 220;

const SERVICE_ORDER: Record<string, string[]> = {
  hospitality: ["website", "maps", "social", "seo", "branding", "maintenance"],
  realestate: ["website", "maps", "branding", "seo", "social", "maintenance"],
  professional: ["website", "seo", "branding", "maps", "social", "maintenance"],
  commerce: ["website", "social", "seo", "branding", "maps", "maintenance"],
  other: ["website", "branding", "seo", "maps", "social", "maintenance"],
};

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
  const orderedServices = (SERVICE_ORDER[sectorId] ?? SERVICE_ORDER.other).map((id) => SERVICES.find((x) => x.id === id)).filter(Boolean) as Choice[];

  const choose = (setter: (value: string) => void, value: string, next: number) => {
    setter(value);
    window.setTimeout(() => setStep(next), WAIT);
  };

  const reset = () => {
    setStep(0); setSectorId(""); setGoal(""); setSituation(""); setServiceId(""); setBudget(""); setDiscovery("");
  };

  const recommendation = useMemo(() => {
    if (!sector || !service || !situationChoice || !budgetChoice || !discoveryChoice) return "";
    const serviceText: Record<string, string> = {
      website: situation === "none" ? "Une création web pensée pour votre activité et votre objectif." : situation === "selling" ? "Un site orienté conversion, avec vente, paiement ou réservation selon votre besoin." : "Une refonte web orientée conversion, expérience utilisateur et image de marque.",
      branding: "Une identité premium cohérente avec votre positionnement et votre clientèle.",
      seo: "Un plan SEO construit autour des recherches qui peuvent réellement générer des clients.",
      maps: "Une stratégie de visibilité locale pour apparaître au bon moment dans Google Maps et la recherche.",
      social: "Une présence sociale structurée pour renforcer votre image, votre communauté et votre acquisition.",
      maintenance: "Un accompagnement WebCare dimensionné selon votre rythme d'évolution.",
    };
    const goalText = goal.toLowerCase();
    const priority = goalText.includes("réservation") || goalText.includes("rendez-vous") ? "La priorité sera le parcours de réservation et la conversion." : goalText.includes("google") || goalText.includes("local") || goalText.includes("visible") ? "La priorité sera la visibilité sur les points de recherche les plus rentables." : goalText.includes("vente") || goalText.includes("vendre") ? "La priorité sera le parcours commercial et la conversion." : goalText.includes("premium") || goalText.includes("gamme") ? "La priorité sera la perception de marque et l'expérience proposée." : "La stratégie sera calibrée selon votre situation, votre budget et votre objectif.";
    const acquisition = discovery === "google" ? "Comme vos clients passent déjà par Google, nous privilégierons les points de visibilité qui captent cette demande." : discovery === "social" ? "Comme la découverte se fait déjà sur les réseaux, nous renforcerons le lien entre contenu, image de marque et conversion." : discovery === "referral" ? "Comme la recommandation est centrale, le site et le branding devront surtout transformer cette confiance en prise de contact." : "Nous chercherons à mieux relier vos différents points d'acquisition pour éviter de dépendre d'un seul canal.";
    const budgetNote = budget === "under500" ? "Nous commencerons par le levier le plus prioritaire." : budget === "500_1000" ? "Nous privilégierons une base solide et évolutive." : "Nous pouvons envisager un dispositif plus complet et progressif.";
    return `${serviceText[service.id]} Pour ${sector.label.toLowerCase()}, ${priority.toLowerCase()} ${acquisition} ${budgetNote}`;
  }, [sector, service, situationChoice, budgetChoice, discoveryChoice, situation, goal, budget, discovery]);

  const titles = ["D'abord, votre activité.", "Votre priorité ?", "Votre situation aujourd'hui ?", "Quel investissement envisagez-vous ?", "Quelle expertise activer ?", "Comment vos clients vous trouvent-ils ?", "Votre recommandation est prête."];
  const progress = ((step + 1) / 7) * 100;

  const card = (item: Choice, onClick: () => void, compact = false) => (
    <button key={item.id} type="button" onClick={onClick} className={`group w-full rounded-lg border border-border bg-background text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md active:scale-[.99] ${compact ? "px-2.5 py-2" : "p-3"}`}>
      <div className="flex items-center justify-between gap-2"><span className="text-[11px] font-medium leading-tight sm:text-sm">{item.label}</span><ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" /></div>
      <div className="mt-0.5 hidden text-[9px] leading-4 text-muted-foreground sm:block">{item.detail}</div>
    </button>
  );

  return (
    <section id="quote" className="relative border-y border-border/50 bg-background py-3 sm:py-5">
      <div className="mx-auto max-w-xl px-3.5 sm:px-5">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary"><Sparkles className="h-3 w-3" /></span><div className="min-w-0"><div className="label-mono text-[7px] uppercase tracking-[0.2em] text-primary">XR INTELLIGENCE</div><div className="truncate text-[9px] text-muted-foreground">Alexandre est là pour vous servir · devis personnalisé</div></div></div><div className="flex shrink-0 items-center gap-1.5"><div className="h-1 w-9 overflow-hidden rounded-full bg-muted sm:w-12"><div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} /></div><span className="label-mono text-[7px] text-muted-foreground">{String(step + 1).padStart(2, "0")}/07</span></div>
        </div>

        <div className="rounded-xl border border-border bg-card/70 p-2.5 shadow-[0_12px_40px_-32px_rgba(0,0,0,.5)] sm:p-3.5">
          <div className="mb-2 flex items-end justify-between gap-2"><div><p className="label-mono text-[7px] uppercase tracking-[0.18em] text-muted-foreground">{step === 6 ? "Analyse terminée" : `Question ${step + 1} sur 7`}</p><h2 className="mt-0.5 text-base font-medium tracking-[-0.03em] sm:text-xl">{titles[step]}</h2></div>{step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="rounded-full border border-border px-2 py-1 text-[10px] text-muted-foreground hover:text-foreground" aria-label="Question précédente">←</button>}</div>

          <div key={step} className="animate-in fade-in slide-in-from-right-1 duration-200">
            {step === 0 && <div><p className="mb-1.5 text-[9px] text-muted-foreground">Choisissez votre univers. Alexandre adaptera les questions suivantes.</p><div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">{SECTORS.map((x) => card(x, () => choose(setSectorId, x.id, 1), true))}</div></div>}
            {step === 1 && sector && <div><p className="mb-1.5 text-[9px] text-muted-foreground">Votre objectif principal permet de prioriser les bonnes prestations.</p><div className="grid gap-1.5 sm:grid-cols-3">{sector.goals.map((x) => card({ id: x, label: x, detail: "Priorité adaptée à votre secteur" }, () => choose(setGoal, x, 2)))}</div></div>}
            {step === 2 && <div><p className="mb-1.5 text-[9px] text-muted-foreground">Votre point de départ change directement la recommandation.</p><div className="grid grid-cols-2 gap-1.5">{SITUATIONS.map((x) => card(x, () => choose(setSituation, x.id, 3)))}</div></div>}
            {step === 3 && <div><p className="mb-1.5 text-[9px] text-muted-foreground">Le budget sert à calibrer le projet, pas à vous enfermer dans une formule.</p><div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5">{BUDGETS.map((x) => card(x, () => choose(setBudget, x.id, 4)))}</div></div>}
            {step === 4 && <div><p className="mb-1.5 text-[9px] text-muted-foreground">Alexandre vous propose ensuite les expertises les plus pertinentes pour votre activité.</p><div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">{orderedServices.map((x) => card(x, () => choose(setServiceId, x.id, 5)))}</div></div>}
            {step === 5 && <div><p className="mb-1.5 text-[9px] text-muted-foreground">Dernière question : où vos clients vous trouvent-ils aujourd'hui ?</p><div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">{DISCOVERY.map((x) => card(x, () => choose(setDiscovery, x.id, 6)) )}</div></div>}
            {step === 6 && sector && service && situationChoice && budgetChoice && discoveryChoice && <div className="space-y-2.5"><div className="rounded-lg border border-primary/30 bg-primary/[0.06] p-3"><div className="flex items-center gap-1.5 text-[11px] font-medium"><Check className="h-3.5 w-3.5 text-primary" /> Recommandation XR Intelligence</div><p className="mt-1.5 text-xs leading-5 sm:text-sm">{recommendation}</p></div><div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">{[["Secteur", sector.label], ["Objectif", goal], ["Situation", situationChoice.label], ["Budget", budgetChoice.label], ["Expertise", service.label], ["Acquisition", discoveryChoice.label]].map(([label, value]) => <div key={label} className="rounded-lg border border-border bg-background p-2"><div className="label-mono text-[6px] uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-0.5 text-[9px] leading-4">{value}</div></div>)}</div><div className="flex flex-wrap gap-1.5"><a href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`Bonjour XR Agency, je souhaite un devis sur mesure. Secteur : ${sector.label}. Objectif : ${goal}. Situation : ${situationChoice.label}. Expertise : ${service.label}. Budget : ${budgetChoice.label}. Acquisition : ${discoveryChoice.label}.`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-[8px] font-semibold uppercase tracking-wider text-primary-foreground">Recevoir mon devis <ArrowRight className="h-3 w-3" /></a><button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-[8px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"><RotateCcw className="h-3 w-3" /> Recommencer</button></div></div>}
          </div>
        </div>
      </div>
    </section>
  );
}
