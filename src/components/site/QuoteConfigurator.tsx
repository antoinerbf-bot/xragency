import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Download, Sparkles } from "lucide-react";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";

type Sector = { id: string; label: string; detail: string; emoji: string; goals: string[] };

type Choice = { id: string; label: string; detail?: string };

const SECTORS: Sector[] = [
  { id: "hospitality", label: "Hôtellerie & restauration", detail: "Hôtel, restaurant, café, rooftop, hospitality", emoji: "✦", goals: ["Augmenter les réservations", "Monter en gamme", "Être trouvé localement"] },
  { id: "realestate", label: "Immobilier & locations", detail: "Agence, location saisonnière, property management", emoji: "⌂", goals: ["Générer plus de demandes", "Présenter les biens premium", "Convertir les visiteurs"] },
  { id: "luxury", label: "Luxe & lifestyle", detail: "Conciergerie, mode, joaillerie, services premium", emoji: "◇", goals: ["Renforcer l'image premium", "Attirer une clientèle internationale", "Créer une expérience de marque"] },
  { id: "professional", label: "Professions & cabinets", detail: "Avocat, consultant, architecte, finance, conseil", emoji: "◈", goals: ["Gagner en crédibilité", "Obtenir des prospects qualifiés", "Dominer les recherches stratégiques"] },
  { id: "commerce", label: "Commerce & e-commerce", detail: "Retail, marque, boutique, vente en ligne", emoji: "＋", goals: ["Vendre davantage", "Améliorer la conversion", "Développer la marque"] },
  { id: "beauty", label: "Beauté & bien-être", detail: "Clinique, esthétique, spa, salon, wellness", emoji: "○", goals: ["Obtenir plus de rendez-vous", "Construire la confiance", "Développer la visibilité locale"] },
  { id: "automotive", label: "Automobile & mobilité", detail: "Concession, location, detailing, premium cars", emoji: "↗", goals: ["Recevoir plus de demandes", "Valoriser les véhicules", "Développer la clientèle premium"] },
  { id: "creative", label: "Créatif & événementiel", detail: "Studio, photographe, événement, production", emoji: "✧", goals: ["Montrer le savoir-faire", "Obtenir des demandes", "Construire une signature"] },
  { id: "startup", label: "Startup & technologie", detail: "SaaS, application, innovation, tech", emoji: "⌁", goals: ["Lancer le produit", "Convertir les utilisateurs", "Structurer la marque"] },
  { id: "local", label: "Entreprise locale", detail: "Artisan, service, commerce de proximité", emoji: "⌖", goals: ["Être trouvé près de moi", "Recevoir des appels", "Professionnaliser l'image"] },
  { id: "health", label: "Santé & médical", detail: "Cabinet, clinique, praticien, santé", emoji: "+", goals: ["Rassurer les patients", "Obtenir des rendez-vous", "Améliorer la visibilité"] },
  { id: "other", label: "Autre activité", detail: "Une activité spécifique ? XR Intelligence s'adapte.", emoji: "∞", goals: ["Définir ma priorité", "Développer mon activité", "Construire une présence forte"] },
];

const SERVICES: Choice[] = [
  { id: "website", label: "Site web", detail: "Vitrine premium, conversion, mobile" },
  { id: "ecommerce", label: "E-commerce / réservation", detail: "Vente, paiement, réservation, catalogue" },
  { id: "branding", label: "Branding", detail: "Logo, identité, direction artistique" },
  { id: "seo", label: "SEO", detail: "Visibilité organique sur Google" },
  { id: "maps", label: "Google Maps", detail: "Visibilité locale et fiche établissement" },
  { id: "social", label: "Social Media", detail: "Présence, contenu, animation" },
  { id: "maintenance", label: "Maintenance", detail: "Suivi, évolutions, tranquillité" },
];

const BUDGETS: Choice[] = [
  { id: "under500", label: "Moins de 500 €", detail: "Une priorité, très ciblée" },
  { id: "500_1000", label: "500 – 1 000 €", detail: "Une présence digitale solide" },
  { id: "1000_2500", label: "1 000 – 2 500 €", detail: "Un dispositif plus complet" },
  { id: "2500_5000", label: "2 500 – 5 000 €", detail: "Une vraie stratégie digitale" },
  { id: "5000_plus", label: "5 000 € +", detail: "Projet premium / sur mesure" },
];

const SITUATIONS: Choice[] = [
  { id: "launch", label: "Je lance mon activité", detail: "Créer une présence crédible dès le départ" },
  { id: "redesign", label: "J'ai déjà un site", detail: "Le moderniser et mieux convertir" },
  { id: "growth", label: "Je veux accélérer", detail: "Plus de visibilité, demandes ou ventes" },
  { id: "premium", label: "Je veux monter en gamme", detail: "Image, expérience et clientèle premium" },
];

const PRICES: Record<string, number> = { website: 499, ecommerce: 1499, branding: 499, seo: 299, maps: 199, social: 499, maintenance: 99 };

export function QuoteConfigurator() {
  const [step, setStep] = useState(0);
  const [sectorId, setSectorId] = useState("");
  const [goal, setGoal] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [situation, setSituation] = useState("");
  const [generated, setGenerated] = useState(false);

  const sector = SECTORS.find((item) => item.id === sectorId);
  const selectedBudget = BUDGETS.find((item) => item.id === budget);
  const selectedSituation = SITUATIONS.find((item) => item.id === situation);
  const estimate = useMemo(() => {
    const raw = services.reduce((sum, id) => sum + (PRICES[id] ?? 0), 0);
    return Math.max(raw - (services.includes("website") && services.includes("ecommerce") ? 499 : 0), 0);
  }, [services]);

  const next = () => setStep((value) => Math.min(value + 1, 5));
  const back = () => setStep((value) => Math.max(value - 1, 0));
  const toggleService = (id: string) => setServices((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const canContinue = [!!sectorId, !!goal, services.length > 0, !!budget, !!situation, true][step];

  const generatePdf = () => {
    if (!sector || !goal || !budget || !situation || services.length === 0) return;
    setGenerated(true);
    window.setTimeout(() => window.print(), 120);
  };

  const stepTitle = [
    "D'abord, parlons de votre activité.",
    "Parfait. Quel résultat recherchez-vous ?",
    "Qu'est-ce que XRAGENCY doit construire pour vous ?",
    "Quel niveau d'investissement avez-vous prévu ?",
    "Dernière question : où en êtes-vous aujourd'hui ?",
    "Votre recommandation XR Intelligence",
  ][step];

  const progress = ((step + 1) / 6) * 100;

  return (
    <section id="quote" className="relative overflow-hidden border-y border-border/50 bg-background py-16 md:py-24 print:bg-white print:text-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary"><Sparkles className="h-4 w-4" /></span>
            <div><div className="label-mono text-[9px] uppercase tracking-[0.24em] text-primary">XR INTELLIGENCE</div><div className="mt-1 text-xs text-muted-foreground">Votre conseiller digital · étape {step + 1}/6</div></div>
          </div>
          <div className="hidden w-44 sm:block"><div className="h-1 rounded-full bg-muted"><div className="h-1 rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} /></div></div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_30px_100px_-35px_rgba(0,0,0,.45)] print:border-black print:shadow-none">
          <div className="grid min-h-[650px] lg:grid-cols-[280px_1fr]">
            <aside className="relative overflow-hidden border-b border-border bg-foreground p-6 text-background lg:border-b-0 lg:border-r lg:p-7">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/25 blur-3xl" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-background/55"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> XR Intelligence online</div>
                <div className="mt-8 flex flex-1 flex-col justify-center">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] border border-background/15 bg-background/[0.06] shadow-2xl">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/50 bg-primary/10"><span className="absolute h-2 w-2 -translate-x-3 rounded-full bg-primary" /><span className="absolute h-2 w-2 translate-x-3 rounded-full bg-primary" /><span className="absolute bottom-4 h-px w-8 bg-background/50" /></div>
                  </div>
                  <div className="mt-6 text-center"><div className="display-serif text-3xl">XR Intelligence</div><p className="mx-auto mt-3 max-w-[210px] text-xs leading-5 text-background/55">Je vous pose quelques questions et j'adapte la recommandation à votre activité.</p></div>
                </div>
                {sector && <div className="rounded-2xl border border-background/10 bg-background/[0.05] p-4"><div className="text-[9px] uppercase tracking-[0.18em] text-background/45">Votre profil</div><div className="mt-2 text-sm">{sector.emoji} {sector.label}</div>{goal && <div className="mt-1 text-xs text-background/55">{goal}</div>}</div>}
              </div>
            </aside>

            <main className="flex flex-col p-5 sm:p-8 md:p-10">
              <div className="mb-8"><div className="label-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Question {step + 1}</div><h2 className="mt-3 max-w-3xl text-3xl font-medium tracking-[-0.04em] sm:text-5xl">{stepTitle}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{step === 0 ? "Choisissez votre univers. XR Intelligence adaptera ensuite les propositions à votre métier." : step === 1 ? "Je ne vais pas vous montrer le même parcours qu'à tout le monde : votre activité détermine les priorités proposées." : step === 2 ? "Sélectionnez ce qui vous intéresse. Vous pouvez combiner plusieurs expertises." : step === 3 ? "Le budget sert à calibrer la recommandation, pas à vous enfermer dans une offre." : step === 4 ? "Cela permet de distinguer une création, une refonte ou une accélération." : "Voici la combinaison que XR Intelligence recommande à partir de vos réponses."}</p></div>

              <div className="flex-1">
                {step === 0 && <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">{SECTORS.map((item) => <button key={item.id} type="button" onClick={() => { setSectorId(item.id); setGoal(""); }} className={cn("group rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg", sectorId === item.id ? "border-primary bg-primary/5 shadow-lg" : "border-border bg-background") }><div className="flex items-start justify-between"><span className="text-2xl text-primary">{item.emoji}</span>{sectorId === item.id && <Check className="h-4 w-4 text-primary" />}</div><div className="mt-5 font-medium">{item.label}</div><div className="mt-1 text-xs leading-5 text-muted-foreground">{item.detail}</div></button>)}</div>}

                {step === 1 && sector && <div className="grid gap-3 sm:grid-cols-3">{sector.goals.map((item) => <button key={item} type="button" onClick={() => setGoal(item)} className={cn("min-h-36 rounded-2xl border p-5 text-left transition-all hover:-translate-y-1 hover:border-primary/50", goal === item ? "border-primary bg-primary/5 shadow-lg" : "border-border") }><div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-primary">✦</div><div className="mt-6 font-medium">{item}</div><div className="mt-2 text-xs text-muted-foreground">Proposition adaptée à {sector.label.toLowerCase()}.</div></button>)}</div>}

                {step === 2 && <div className="grid gap-3 sm:grid-cols-2">{SERVICES.map((item) => { const active = services.includes(item.id); return <button key={item.id} type="button" onClick={() => toggleService(item.id)} className={cn("flex min-h-24 items-center gap-4 rounded-2xl border p-4 text-left transition-all hover:border-primary/50", active ? "border-primary bg-primary/5 shadow-md" : "border-border") }><span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full border", active ? "border-primary bg-primary text-primary-foreground" : "border-border")}>{active ? <Check className="h-4 w-4" /> : <span className="text-xs">+</span>}</span><span><span className="block font-medium">{item.label}</span><span className="mt-1 block text-xs text-muted-foreground">{item.detail}</span></span></button>})}</div>}

                {step === 3 && <div className="grid gap-3 sm:grid-cols-2">{BUDGETS.map((item) => <button key={item.id} type="button" onClick={() => setBudget(item.id)} className={cn("rounded-2xl border p-5 text-left transition-all hover:-translate-y-1 hover:border-primary/50", budget === item.id ? "border-primary bg-primary/5 shadow-lg" : "border-border") }><div className="text-xl font-medium">{item.label}</div><div className="mt-2 text-xs text-muted-foreground">{item.detail}</div></button>)}</div>}

                {step === 4 && <div className="grid gap-3 sm:grid-cols-2">{SITUATIONS.map((item) => <button key={item.id} type="button" onClick={() => setSituation(item.id)} className={cn("rounded-2xl border p-5 text-left transition-all hover:-translate-y-1 hover:border-primary/50", situation === item.id ? "border-primary bg-primary/5 shadow-lg" : "border-border") }><div className="font-medium">{item.label}</div><div className="mt-2 text-xs leading-5 text-muted-foreground">{item.detail}</div></button>)}</div>}

                {step === 5 && <div className="grid gap-4 lg:grid-cols-[1fr_300px]"><div className="space-y-3">{services.map((id) => { const item = SERVICES.find((service) => service.id === id); return item ? <div key={id} className="flex items-center justify-between rounded-2xl border border-border p-4"><div><div className="font-medium">{item.label}</div><div className="mt-1 text-xs text-muted-foreground">Recommandé pour {sector?.label.toLowerCase()}</div></div><div className="text-sm">{PRICES[id].toLocaleString("fr-FR")} €</div></div> : null; })}</div><div className="rounded-2xl bg-foreground p-6 text-background"><div className="text-[9px] uppercase tracking-[0.2em] text-background/50">Estimation personnalisée</div><div className="mt-3 text-4xl font-medium">{estimate.toLocaleString("fr-FR")} €</div><div className="mt-2 text-xs text-background/50">Première estimation · validation finale après échange</div><div className="my-6 h-px bg-background/15"/><div className="text-sm">{sector?.label}</div><div className="mt-1 text-xs text-background/50">{goal}</div><div className="mt-1 text-xs text-background/50">{selectedBudget?.label} · {selectedSituation?.label}</div></div></div>}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 print:hidden">
                <button type="button" onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs disabled:opacity-30"><ArrowLeft className="h-3.5 w-3.5"/> Retour</button>
                {step < 5 ? <button type="button" onClick={next} disabled={!canContinue} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background transition hover:gap-3 disabled:cursor-not-allowed disabled:opacity-30">Continuer <ArrowRight className="h-3.5 w-3.5"/></button> : <button type="button" onClick={generatePdf} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background"><Download className="h-3.5 w-3.5"/> Générer mon devis PDF <ArrowRight className="h-3.5 w-3.5"/></button>}
              </div>
              {generated && <div className="mt-3 text-right text-[11px] text-muted-foreground print:hidden">Dans la fenêtre d'impression, choisissez « Enregistrer au format PDF ».</div>}
            </main>
          </div>
        </div>

        <div className="mt-5 flex justify-between gap-4 text-[10px] uppercase tracking-[0.14em] text-muted-foreground print:hidden"><span>Pas d'engagement · parcours personnalisé</span><a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="text-foreground hover:text-primary">Parler à XRAGENCY →</a></div>
      </div>
    </section>
  );
}
