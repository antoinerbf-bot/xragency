import { useMemo, useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { CONTACT } from "@/lib/content";

type Choice = { id: string; label: string; detail?: string };
type Sector = Choice & { goals: string[] };

const SECTORS: Sector[] = [
  { id: "hospitality", label: "Restaurant / Hôtel", detail: "Hospitality, café, rooftop", goals: ["Augmenter les réservations", "Monter en gamme", "Être trouvé localement"] },
  { id: "realestate", label: "Immobilier", detail: "Agence, location, gestion", goals: ["Générer plus de demandes", "Mieux présenter les biens", "Convertir davantage"] },
  { id: "luxury", label: "Luxe / Lifestyle", detail: "Mode, joaillerie, conciergerie", goals: ["Renforcer l'image premium", "Attirer une clientèle internationale", "Créer une expérience de marque"] },
  { id: "professional", label: "Cabinet / Services", detail: "Avocat, finance, conseil, architecture", goals: ["Gagner en crédibilité", "Obtenir des prospects qualifiés", "Être mieux trouvé sur Google"] },
  { id: "commerce", label: "Commerce", detail: "Retail, marque, boutique", goals: ["Vendre davantage", "Améliorer la conversion", "Développer la marque"] },
  { id: "beauty", label: "Beauté / Bien-être", detail: "Clinique, spa, salon", goals: ["Obtenir plus de rendez-vous", "Construire la confiance", "Développer la visibilité locale"] },
  { id: "automotive", label: "Automobile", detail: "Location, detailing, véhicules", goals: ["Recevoir plus de demandes", "Valoriser l'offre", "Développer une clientèle premium"] },
  { id: "other", label: "Autre activité", detail: "Nous adaptons l'analyse", goals: ["Définir ma priorité", "Développer mon activité", "Construire une présence forte"] },
];

const SERVICES: Choice[] = [
  { id: "website", label: "Création de site web", detail: "Vitrine, Business, e-commerce, réservation" },
  { id: "branding", label: "Branding", detail: "Identité, direction artistique, image" },
  { id: "seo", label: "SEO", detail: "Visibilité organique sur Google" },
  { id: "maps", label: "Google Maps", detail: "Visibilité locale et présence Google" },
  { id: "social", label: "Social Media", detail: "Contenu, publication et communauté" },
  { id: "maintenance", label: "WebCare Maintenance", detail: "Modifications, corrections et suivi" },
];

const BUDGETS: Choice[] = [
  { id: "under500", label: "Moins de 500 €", detail: "Une priorité ciblée" },
  { id: "500_1000", label: "500 – 1 000 €", detail: "Une présence solide" },
  { id: "1000_2500", label: "1 000 – 2 500 €", detail: "Un dispositif complet" },
  { id: "2500_5000", label: "2 500 – 5 000 €", detail: "Une vraie stratégie" },
  { id: "5000_plus", label: "5 000 € +", detail: "Un projet premium sur mesure" },
];

const SITUATIONS: Choice[] = [
  { id: "launch", label: "Je lance mon activité", detail: "Je pars de zéro ou presque" },
  { id: "site", label: "J'ai déjà un site", detail: "Je veux l'améliorer ou le refaire" },
  { id: "growth", label: "Mon site existe, mais il ne convertit pas assez", detail: "Je veux plus de demandes, ventes ou réservations" },
  { id: "no_site", label: "Je n'ai pas encore de site", detail: "Je veux une présence professionnelle" },
];

const DISCOVERY: Choice[] = [
  { id: "google", label: "Google / recherche", detail: "Ils me cherchent déjà" },
  { id: "maps", label: "Google Maps / proximité", detail: "Ils cherchent autour d'eux" },
  { id: "social", label: "Instagram / Facebook / TikTok / LinkedIn", detail: "Ils découvrent la marque sur les réseaux" },
  { id: "referral", label: "Bouche-à-oreille / réseau", detail: "La recommandation reste centrale" },
  { id: "mixed", label: "Un peu partout", detail: "Je veux mieux maîtriser mon acquisition" },
];

const WAIT = 360;

function getRecommendation(sector: Sector, goal: string, service: Choice, situation: Choice, budget: Choice, discovery: Choice) {
  const goalText = goal.toLowerCase();
  const isWebsite = service.id === "website";
  const isLocal = service.id === "maps" || discovery.id === "maps" || goalText.includes("localement");
  const isPremium = sector.id === "luxury" || goalText.includes("gamme") || goalText.includes("premium");
  const isExisting = situation.id === "site" || situation.id === "growth";
  if (isWebsite && isExisting) return `Nous recommandons une refonte orientée conversion : architecture plus claire, expérience premium et parcours pensé pour ${goal.toLowerCase()}.`;
  if (isWebsite && budget.id === "under500") return "Le meilleur point de départ est un site vitrine ciblé, puis une évolution progressive lorsque les premiers résultats sont là.";
  if (isLocal) return "Votre priorité appelle un duo visibilité locale + conversion : Google Maps pour capter la demande proche, puis une présence web solide pour transformer cette demande.";
  if (isPremium) return "Votre enjeu est autant la perception que l'acquisition. Nous recommandons une direction artistique forte, un parcours digital premium et des points de contact cohérents.";
  if (service.id === "social") return "Nous recommandons une présence sociale structurée autour de votre objectif commercial, avec un niveau de délégation adapté à votre rythme.";
  if (service.id === "seo") return "Nous recommandons un travail SEO construit autour des recherches réellement utiles à votre activité, avec une progression mesurable dans le temps.";
  if (service.id === "branding") return "Nous recommandons de clarifier votre identité avant d'accélérer l'acquisition : positionnement, univers visuel et cohérence de marque.";
  if (service.id === "maintenance") return "WebCare devient pertinent lorsque votre site est déjà en place et doit évoluer régulièrement sans lancer un nouveau projet à chaque modification.";
  return `Au vu de votre activité, de votre objectif et de votre situation, nous construirons une recommandation sur mesure autour de ${service.label.toLowerCase()}.`;
}

export function QuoteConfigurator() {
  const [step, setStep] = useState(0);
  const [sectorId, setSectorId] = useState("");
  const [goal, setGoal] = useState("");
  const [situationId, setSituationId] = useState("");
  const [budgetId, setBudgetId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [discoveryId, setDiscoveryId] = useState("");
  const sector = SECTORS.find((x) => x.id === sectorId);
  const situation = SITUATIONS.find((x) => x.id === situationId);
  const budget = BUDGETS.find((x) => x.id === budgetId);
  const service = SERVICES.find((x) => x.id === serviceId);
  const discovery = DISCOVERY.find((x) => x.id === discoveryId);
  const choose = (fn: () => void, next: number) => { fn(); window.setTimeout(() => setStep(next), WAIT); };
  const progress = ((step + 1) / 7) * 100;
  const recommendation = useMemo(() => sector && situation && budget && service && discovery ? getRecommendation(sector, goal, service, situation, budget, discovery) : "", [sector, goal, service, situation, budget, discovery]);
  const reset = () => { setStep(0); setSectorId(""); setGoal(""); setSituationId(""); setBudgetId(""); setServiceId(""); setDiscoveryId(""); };
  const whatsappUrl = `${CONTACT.whatsapp}?text=${encodeURIComponent(`Bonjour XRAGENCY, je souhaite un devis personnalisé. Secteur : ${sector?.label ?? ""}. Objectif : ${goal}. Situation : ${situation?.label ?? ""}. Budget : ${budget?.label ?? ""}. Expertise : ${service?.label ?? ""}. Acquisition : ${discovery?.label ?? ""}.`)}`;
  const titles = ["Pour commencer : quel est votre univers ?", "Très bien. Quel est votre objectif principal ?", "Et aujourd'hui, où en êtes-vous ?", "Quel budget souhaitez-vous consacrer à ce projet ?", "Quelle expertise voulez-vous activer ?", "Comment vos clients vous trouvent-ils aujourd'hui ?", "Votre recommandation XR Intelligence est prête."];
  return <section id="quote" className="relative border-y border-border/50 bg-background py-10 sm:py-14"><div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="mb-4 flex items-center justify-between gap-3"><div className="flex items-center gap-2.5"><span className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary"><Sparkles className="h-3 w-3" /></span><div><div className="label-mono text-[9px] uppercase tracking-[0.22em] text-primary">XR INTELLIGENCE</div><div className="text-[10px] text-muted-foreground">Alexandre est là pour vous servir · {step + 1}/7</div></div></div><div className="h-1 w-24 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} /></div></div><div className="rounded-2xl border border-border bg-card/70 p-4 shadow-[0_20px_60px_-45px_rgba(0,0,0,.5)] sm:p-6"><div className="mb-5"><div className="label-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">Question {String(step + 1).padStart(2, "0")}</div><h2 className="mt-1.5 text-xl font-medium tracking-[-0.025em] sm:text-2xl">{titles[step]}</h2><p className="mt-1 text-[10px] text-muted-foreground">Une réponse suffit · la suite s'ouvre automatiquement.</p></div><div key={step} className="animate-in fade-in slide-in-from-right-1 duration-300">
    {step === 0 && <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{SECTORS.map((item) => <button key={item.id} type="button" onClick={() => choose(() => { setSectorId(item.id); setGoal(""); }, 1)} className="group rounded-xl border border-border bg-background/70 p-3 text-left transition-all hover:border-primary/50 hover:bg-primary/[0.04]"><span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">{item.label}</span><span className="mt-1 block text-[9px] leading-4 text-muted-foreground">{item.detail}</span></button>)}</div>}
    {step === 1 && sector && <div className="grid gap-2 sm:grid-cols-3">{sector.goals.map((item) => <button key={item} type="button" onClick={() => choose(() => setGoal(item), 2)} className="rounded-xl border border-border bg-background/70 p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/[0.04]"><span className="text-primary">✦</span><span className="mt-3 block text-sm font-medium">{item}</span></button>)}</div>}
    {step === 2 && <div className="grid gap-2 sm:grid-cols-2">{SITUATIONS.map((item) => <button key={item.id} type="button" onClick={() => choose(() => setSituationId(item.id), 3)} className="rounded-xl border border-border bg-background/70 p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/[0.04]"><span className="text-sm font-medium">{item.label}</span><span className="mt-1 block text-[10px] leading-4 text-muted-foreground">{item.detail}</span></button>)}</div>}
    {step === 3 && <div className="grid gap-2 sm:grid-cols-3">{BUDGETS.map((item) => <button key={item.id} type="button" onClick={() => choose(() => setBudgetId(item.id), 4)} className="rounded-xl border border-border bg-background/70 p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/[0.04]"><span className="text-sm font-medium">{item.label}</span><span className="mt-1 block text-[10px] leading-4 text-muted-foreground">{item.detail}</span></button>)}</div>}
    {step === 4 && <div className="grid gap-2 sm:grid-cols-2">{SERVICES.map((item) => <button key={item.id} type="button" onClick={() => choose(() => setServiceId(item.id), 5)} className="group rounded-xl border border-border bg-background/70 p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/[0.04]"><div className="flex items-center justify-between"><span className="text-sm font-medium">{item.label}</span><ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-1" /></div><span className="mt-1 block text-[10px] leading-4 text-muted-foreground">{item.detail}</span></button>)}</div>}
    {step === 5 && <div className="grid gap-2 sm:grid-cols-2">{DISCOVERY.map((item) => <button key={item.id} type="button" onClick={() => choose(() => setDiscoveryId(item.id), 6)} className="rounded-xl border border-border bg-background/70 p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/[0.04]"><span className="text-sm font-medium">{item.label}</span><span className="mt-1 block text-[10px] leading-4 text-muted-foreground">{item.detail}</span></button>)}</div>}
    {step === 6 && sector && situation && budget && service && discovery && <div className="grid gap-3 sm:grid-cols-[1fr_220px]"><div className="rounded-xl border border-border bg-background/70 p-5"><div className="flex items-center gap-2 text-[11px] font-medium"><Check className="h-3.5 w-3.5 text-primary" /> Analyse personnalisée</div><p className="mt-3 text-base leading-6 sm:text-lg">{recommendation}</p><div className="mt-5 grid grid-cols-2 gap-3 border-t border-border/60 pt-4">{[["SECTEUR", sector.label],["OBJECTIF", goal],["SITUATION", situation.label],["BUDGET", budget.label],["EXPERTISE", service.label],["ACQUISITION", discovery.label]].map(([label,value]) => <div key={label}><span className="label-mono text-[8px] text-muted-foreground">{label}</span><p className="mt-1 text-[10px]">{value}</p></div>)}</div></div><div className="rounded-xl bg-foreground p-5 text-background"><span className="label-mono text-[8px] uppercase tracking-[0.16em] text-background/50">Prochaine étape</span><h3 className="mt-2 text-xl">Parlons de votre projet.</h3><p className="mt-2 text-[10px] leading-4 text-background/60">Nous affinons le périmètre et vous envoyons une proposition cohérente avec votre besoin.</p><a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground">Recevoir mon devis <ArrowRight className="h-3.5 w-3.5" /></a><button type="button" onClick={reset} className="mt-2 w-full rounded-full border border-background/15 px-4 py-2.5 text-[9px] text-background/60 hover:text-background">Recommencer</button></div></div>}
  </div></div></div></section>;
}