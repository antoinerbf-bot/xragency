import { useMemo, useState } from "react";
import { ArrowLeft, Check, Download, Sparkles } from "lucide-react";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";

type Choice = { id: string; label: string; detail: string };
type Sector = Choice & { goals: string[] };

const SECTORS: Sector[] = [
  { id: "hospitality", label: "Hôtellerie & restauration", detail: "Hôtel, restaurant, café, rooftop", goals: ["Augmenter les réservations", "Monter en gamme", "Être trouvé localement"] },
  { id: "realestate", label: "Immobilier & locations", detail: "Agence, location, property management", goals: ["Générer plus de demandes", "Présenter les biens premium", "Convertir les visiteurs"] },
  { id: "luxury", label: "Luxe & lifestyle", detail: "Conciergerie, mode, joaillerie", goals: ["Renforcer l'image premium", "Attirer une clientèle internationale", "Créer une expérience de marque"] },
  { id: "professional", label: "Professions & cabinets", detail: "Avocat, consultant, architecte, finance", goals: ["Gagner en crédibilité", "Obtenir des prospects qualifiés", "Dominer les recherches stratégiques"] },
  { id: "commerce", label: "Commerce & e-commerce", detail: "Retail, marque, boutique, vente en ligne", goals: ["Vendre davantage", "Améliorer la conversion", "Développer la marque"] },
  { id: "beauty", label: "Beauté & bien-être", detail: "Clinique, spa, salon, wellness", goals: ["Obtenir plus de rendez-vous", "Construire la confiance", "Développer la visibilité locale"] },
  { id: "automotive", label: "Automobile & mobilité", detail: "Location, detailing, véhicules premium", goals: ["Recevoir plus de demandes", "Valoriser les véhicules", "Développer la clientèle premium"] },
  { id: "creative", label: "Créatif & événementiel", detail: "Studio, photographe, événement", goals: ["Montrer le savoir-faire", "Obtenir des demandes", "Construire une signature"] },
  { id: "startup", label: "Startup & technologie", detail: "SaaS, application, innovation", goals: ["Lancer le produit", "Convertir les utilisateurs", "Structurer la marque"] },
  { id: "local", label: "Entreprise locale", detail: "Artisan, service, commerce de proximité", goals: ["Être trouvé près de moi", "Recevoir des appels", "Professionnaliser l'image"] },
  { id: "health", label: "Santé & médical", detail: "Cabinet, clinique, praticien", goals: ["Rassurer les patients", "Obtenir des rendez-vous", "Améliorer la visibilité"] },
  { id: "other", label: "Autre activité", detail: "XR Intelligence s'adapte à votre métier", goals: ["Définir ma priorité", "Développer mon activité", "Construire une présence forte"] },
];

const SERVICES: Choice[] = [
  { id: "website", label: "Site web", detail: "Vitrine premium et conversion" },
  { id: "ecommerce", label: "E-commerce / réservation", detail: "Vente, paiement ou réservation" },
  { id: "branding", label: "Branding", detail: "Identité et direction artistique" },
  { id: "seo", label: "SEO", detail: "Visibilité organique sur Google" },
  { id: "maps", label: "Google Maps", detail: "Visibilité locale" },
  { id: "social", label: "Social Media", detail: "Contenu et animation" },
  { id: "maintenance", label: "Maintenance", detail: "Suivi et évolutions" },
];

const BUDGETS: Choice[] = [
  { id: "under500", label: "Moins de 500 €", detail: "Une priorité ciblée" },
  { id: "500_1000", label: "500 – 1 000 €", detail: "Une présence solide" },
  { id: "1000_2500", label: "1 000 – 2 500 €", detail: "Un dispositif complet" },
  { id: "2500_5000", label: "2 500 – 5 000 €", detail: "Une vraie stratégie digitale" },
  { id: "5000_plus", label: "5 000 € +", detail: "Projet premium sur mesure" },
];

const SITUATIONS: Choice[] = [
  { id: "launch", label: "Je lance mon activité", detail: "Créer une présence crédible" },
  { id: "redesign", label: "J'ai déjà un site", detail: "Le moderniser et mieux convertir" },
  { id: "growth", label: "Je veux accélérer", detail: "Plus de visibilité, demandes ou ventes" },
  { id: "premium", label: "Je veux monter en gamme", detail: "Image, expérience et clientèle premium" },
];

const PRICES: Record<string, number> = { website: 499, ecommerce: 1499, branding: 499, seo: 299, maps: 199, social: 499, maintenance: 99 };

const WAIT = 520;

export function QuoteConfigurator() {
  const [step, setStep] = useState(0);
  const [sectorId, setSectorId] = useState("");
  const [goal, setGoal] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [budget, setBudget] = useState("");
  const [situation, setSituation] = useState("");

  const sector = SECTORS.find((x) => x.id === sectorId);
  const service = SERVICES.find((x) => x.id === serviceId);
  const budgetChoice = BUDGETS.find((x) => x.id === budget);
  const situationChoice = SITUATIONS.find((x) => x.id === situation);
  const estimate = PRICES[serviceId] ?? 0;

  const advance = (fn: () => void, nextStep: number) => {
    fn();
    window.setTimeout(() => setStep(nextStep), WAIT);
  };

  const selectSector = (id: string) => advance(() => { setSectorId(id); setGoal(""); }, 1);
  const selectGoal = (value: string) => advance(() => setGoal(value), 2);
  const selectService = (id: string) => advance(() => setServiceId(id), 3);
  const selectBudget = (id: string) => advance(() => setBudget(id), 4);
  const selectSituation = (id: string) => advance(() => setSituation(id), 5);

  const reset = () => { setStep(0); setSectorId(""); setGoal(""); setServiceId(""); setBudget(""); setSituation(""); };
  const generatePdf = () => window.print();

  const progress = ((step + 1) / 6) * 100;
  const recommendation = useMemo(() => {
    if (!service) return "";
    if (service.id === "website") return "Un site premium pensé pour transformer votre trafic en demandes qualifiées.";
    if (service.id === "ecommerce") return "Une expérience de vente ou de réservation conçue autour de votre activité.";
    if (service.id === "seo") return "Un travail de visibilité construit autour des recherches réellement utiles à votre activité.";
    if (service.id === "maps") return "Une stratégie de visibilité locale pour être trouvé au moment où vos clients cherchent.";
    if (service.id === "social") return "Une présence sociale structurée pour renforcer votre image et votre acquisition.";
    if (service.id === "branding") return "Une identité cohérente et premium pour rendre votre marque immédiatement reconnaissable.";
    return "Un accompagnement continu pour faire évoluer et sécuriser votre présence digitale.";
  }, [service]);

  const titles = [
    "Quel est votre univers ?",
    `Que voulez-vous obtenir avec votre ${sector?.label.toLowerCase() ?? "activité"} ?`,
    "Quelle expertise vous serait la plus utile ?",
    "Quel investissement avez-vous prévu ?",
    "Où en êtes-vous aujourd'hui ?",
    "Votre recommandation est prête.",
  ];

  return (
    <section id="quote" className="relative border-y border-border/50 bg-background py-10 md:py-14 print:bg-white print:text-black">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary"><Sparkles className="h-3.5 w-3.5" /></span>
            <div><div className="label-mono text-[9px] uppercase tracking-[0.22em] text-primary">XR INTELLIGENCE</div><div className="text-[11px] text-muted-foreground">Conseiller digital · {step + 1}/6</div></div>
          </div>
          <div className="flex w-32 items-center gap-2 sm:w-48"><div className="h-1 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} /></div><span className="text-[9px] text-muted-foreground">{String(step + 1).padStart(2, "0")}</span></div>
        </div>

        <div className="rounded-[1.5rem] border border-border bg-card p-5 shadow-[0_20px_70px_-40px_rgba(0,0,0,.45)] sm:p-7 md:p-9">
          <div className="mb-7 flex items-start justify-between gap-5">
            <div className="min-w-0">
              <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{step === 5 ? "Analyse terminée" : `Question ${step + 1}`}</div>
              <h2 className="mt-2 max-w-3xl text-2xl font-medium tracking-[-0.035em] sm:text-4xl">{titles[step]}</h2>
              {step < 5 && <p className="mt-2 max-w-xl text-xs leading-5 text-muted-foreground">Choisissez une réponse. <span className="text-foreground/70">XR Intelligence enchaîne automatiquement.</span></p>}
            </div>
            <div className="hidden shrink-0 items-center gap-2 rounded-full border border-border px-3 py-1.5 text-[9px] text-muted-foreground sm:flex"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> LIVE</div>
          </div>

          <div key={step} className="animate-in fade-in slide-in-from-right-2 duration-300">
            {step === 0 && <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">{SECTORS.map((item) => <button key={item.id} type="button" onClick={() => selectSector(item.id)} className="group rounded-xl border border-border bg-background p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"><div className="flex items-center justify-between"><span className="text-lg text-primary">{item.label.charAt(0)}</span><span className="text-[9px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">→</span></div><div className="mt-3 text-sm font-medium leading-tight">{item.label}</div><div className="mt-1 text-[10px] leading-4 text-muted-foreground">{item.detail}</div></button>)}</div>}

            {step === 1 && sector && <div className="grid gap-2 sm:grid-cols-3">{sector.goals.map((item) => <button key={item} type="button" onClick={() => selectGoal(item)} className="group min-h-28 rounded-xl border border-border bg-background p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"><div className="text-primary">✦</div><div className="mt-5 text-sm font-medium">{item}</div><div className="mt-1 text-[10px] text-muted-foreground">Adapté à votre secteur</div></button>)}</div>}

            {step === 2 && <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{SERVICES.map((item) => <button key={item.id} type="button" onClick={() => selectService(item.id)} className="group rounded-xl border border-border bg-background p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"><div className="flex items-center justify-between"><span className="text-sm font-medium">{item.label}</span><span className="text-muted-foreground transition-transform group-hover:translate-x-1">→</span></div><div className="mt-1 text-[10px] text-muted-foreground">{item.detail}</div></button>)}</div>}

            {step === 3 && <div className="grid gap-2 sm:grid-cols-5">{BUDGETS.map((item) => <button key={item.id} type="button" onClick={() => selectBudget(item.id)} className="group rounded-xl border border-border bg-background p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md sm:min-h-28"><div className="text-sm font-medium">{item.label}</div><div className="mt-2 text-[10px] leading-4 text-muted-foreground">{item.detail}</div></button>)}</div>}

            {step === 4 && <div className="grid gap-2 sm:grid-cols-4">{SITUATIONS.map((item) => <button key={item.id} type="button" onClick={() => selectSituation(item.id)} className="group rounded-xl border border-border bg-background p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"><div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-primary">+</div><div className="mt-5 text-sm font-medium">{item.label}</div><div className="mt-1 text-[10px] leading-4 text-muted-foreground">{item.detail}</div></button>)}</div>}

            {step === 5 && sector && service && budgetChoice && situationChoice && <div className="grid gap-4 lg:grid-cols-[1fr_250px]">
              <div className="rounded-xl border border-border bg-background p-5"><div className="flex items-center gap-2 text-xs font-medium"><Check className="h-4 w-4 text-primary" /> Recommandation XR Intelligence</div><p className="mt-4 max-w-2xl text-lg leading-7">{recommendation}</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><div><div className="text-[9px] uppercase tracking-wider text-muted-foreground">Secteur</div><div className="mt-1 text-xs">{sector.label}</div></div><div><div className="text-[9px] uppercase tracking-wider text-muted-foreground">Objectif</div><div className="mt-1 text-xs">{goal}</div></div><div><div className="text-[9px] uppercase tracking-wider text-muted-foreground">Expertise</div><div className="mt-1 text-xs">{service.label}</div></div><div><div className="text-[9px] uppercase tracking-wider text-muted-foreground">Situation</div><div className="mt-1 text-xs">{situationChoice.label}</div></div></div></div>
              <div className="rounded-xl bg-foreground p-5 text-background"><div className="text-[9px] uppercase tracking-wider text-background/50">Estimation à partir de</div><div className="mt-2 text-3xl font-medium">{estimate.toLocaleString("fr-FR")} €</div><div className="mt-1 text-[10px] text-background/50">Budget indiqué : {budgetChoice.label}</div><button type="button" onClick={generatePdf} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-background px-3 py-2.5 text-xs font-medium text-foreground"><Download className="h-3.5 w-3.5" /> Générer mon devis PDF</button><a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="mt-2 block text-center text-[10px] text-background/60 hover:text-background">Parler à XRAGENCY →</a></div>
            </div>}
          </div>

          {step > 0 && step < 5 && <button type="button" onClick={() => setStep((v) => v - 1)} className="mt-6 inline-flex items-center gap-1.5 text-[10px] text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="h-3 w-3" /> Modifier la réponse précédente</button>}
          {step === 5 && <button type="button" onClick={reset} className="mt-5 text-[10px] text-muted-foreground hover:text-foreground">Recommencer l'analyse</button>}
        </div>
      </div>
    </section>
  );
}
