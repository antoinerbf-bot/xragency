import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { ArrowRight, Check, Mail, MessageCircle, RotateCcw, Sparkles, UserRound, Zap } from "lucide-react";
import { AlexandreAdvisor } from "./AlexandreAdvisor";

type Choice = { id: string; label: string; detail: string };
type Sector = Choice & { goals: string[] };
type Proposal = { id: string; label: string; detail: string; price: number; period: "once" | "month" };
const SECTORS: Sector[] = [
  { id: "hospitality", label: "Restaurant & hôtellerie", detail: "Restaurant, hôtel, café, rooftop", goals: ["Augmenter les réservations", "Monter en gamme", "Être trouvé localement"] },
  { id: "realestate", label: "Immobilier & luxe", detail: "Agence, location, conciergerie", goals: ["Générer plus de demandes", "Valoriser les biens", "Attirer une clientèle premium"] },
  { id: "professional", label: "Cabinet & services", detail: "Avocat, conseil, architecture, finance", goals: ["Gagner en crédibilité", "Obtenir des prospects qualifiés", "Être visible sur Google"] },
  { id: "commerce", label: "Commerce & marque", detail: "Boutique, retail, e-commerce", goals: ["Vendre davantage", "Améliorer la conversion", "Développer la marque"] },
  { id: "other", label: "Autre activité", detail: "Alexandre adapte le diagnostic à votre métier", goals: ["Développer mon activité", "Professionnaliser mon image", "Construire une présence forte"] },
];
const SERVICES: Choice[] = [
  { id: "website", label: "Création de site web", detail: "Vitrine, Business, e-commerce, réservation" }, { id: "branding", label: "Branding", detail: "Identité, direction artistique, image" }, { id: "seo", label: "SEO", detail: "Visibilité organique et acquisition Google" }, { id: "maps", label: "Google Maps", detail: "Visibilité locale et recherches de proximité" }, { id: "social", label: "Social Media", detail: "Contenu, animation et présence sociale" }, { id: "maintenance", label: "WebCare", detail: "Corrections, évolutions et suivi du site" },
];
const SITUATIONS: Choice[] = [
  { id: "none", label: "Pas encore de site", detail: "Créer une base solide dès le départ" }, { id: "existing", label: "J'ai déjà un site", detail: "Le conserver et le faire évoluer" }, { id: "redesign", label: "Mon site doit être refait", detail: "Design, structure ou conversion à revoir" }, { id: "selling", label: "Je vends / prends des réservations", detail: "Paiement, catalogue ou réservation en ligne" },
];
const BUDGETS: Choice[] = [
  { id: "under500", label: "Moins de 500 €", detail: "Un levier prioritaire" }, { id: "500_1000", label: "500 – 1 000 €", detail: "Une présence solide" }, { id: "1000_2500", label: "1 000 – 2 500 €", detail: "Un dispositif complet" }, { id: "2500_5000", label: "2 500 – 5 000 €", detail: "Une stratégie structurée" }, { id: "5000_plus", label: "5 000 € +", detail: "Un projet premium sur mesure" },
];
const DISCOVERY: Choice[] = [
  { id: "google", label: "Google / Maps", detail: "Recherche, SEO ou visibilité locale" }, { id: "social", label: "Instagram / Facebook / TikTok", detail: "Réseaux sociaux et recommandations" }, { id: "referral", label: "Bouche-à-oreille", detail: "Recommandations et réseau" }, { id: "mixed", label: "Un peu de tout", detail: "Acquisition déjà diversifiée" },
];
const SERVICE_ORDER: Record<string, string[]> = { hospitality: ["website", "maps", "social", "seo", "branding", "maintenance"], realestate: ["website", "maps", "branding", "seo", "social", "maintenance"], professional: ["website", "seo", "branding", "maps", "social", "maintenance"], commerce: ["website", "social", "seo", "branding", "maps", "maintenance"], other: ["website", "branding", "seo", "maps", "social", "maintenance"] };
const BASE_PRICES: Record<string, number> = { website: 499, branding: 199, seo: 299, maps: 199, social: 499, maintenance: 29 };

const PROFILE_SERVICE_RULES: Record<string, string[]> = {
  hospitality: ["website", "maps", "seo", "social"],
  realestate: ["website", "maps", "branding", "seo"],
  professional: ["website", "seo", "branding", "maps"],
  commerce: ["website", "social", "seo", "branding"],
  other: ["website", "seo", "branding", "maps"],
};

const WEBSITE_TIERS = {
  showcase: { price: 499, label: "Site Vitrine Pro", detail: "Site premium jusqu'à 3 pages, responsive, contact et SEO de base" },
  business: { price: 799, label: "Site Business", detail: "Site jusqu'à 5 pages, blog, galerie, chat et analytics avancés" },
  ecommerce: { price: 1499, label: "E-commerce & Réservation", detail: "Catalogue, paiement sécurisé, gestion des stocks et parcours de réservation" },
} as const;

const BRANDING_TIERS = {
  starter: { price: 199, label: "Branding essentiel", detail: "Logo, palette, typographie et fichiers maîtres" },
  premium: { price: 399, label: "Identité de marque complète", detail: "Système de marque étendu, direction artistique et Brand Book" },
} as const;

export function QuoteConfiguratorCompact() {
  const [step, setStep] = useState(0); const [sectorId, setSectorId] = useState(""); const [goal, setGoal] = useState(""); const [situation, setSituation] = useState(""); const [budget, setBudget] = useState(""); const [discovery, setDiscovery] = useState(""); const [selectedServices, setSelectedServices] = useState<string[]>([]); const [client, setClient] = useState({ name: "", email: "", whatsapp: "" }); const [generated, setGenerated] = useState(false); const [sending, setSending] = useState(false); const [sendMessage, setSendMessage] = useState("");
  const sector = SECTORS.find((x) => x.id === sectorId);
  const situationChoice = SITUATIONS.find((x) => x.id === situation);
  const budgetChoice = BUDGETS.find((x) => x.id === budget);
  const discoveryChoice = DISCOVERY.find((x) => x.id === discovery);
  const orderedServices = (SERVICE_ORDER[sectorId] ?? SERVICE_ORDER.other)
    .map((id) => SERVICES.find((x) => x.id === id))
    .filter(Boolean) as Choice[];

  const profileRecommendation = useMemo(() => {
    const base = PROFILE_SERVICE_RULES[sectorId] ?? PROFILE_SERVICE_RULES.other;
    const services = new Set<string>(base);

    // The budget changes the scope, not just the displayed price.
    if (budget === "under500") {
      services.clear();
      services.add(situation === "selling" ? "website" : base[0]);
    } else if (budget === "500_1000") {
      services.delete("social");
      services.delete("branding");
    } else if (budget === "1000_2500") {
      services.add("website");
      if (situation === "selling") services.add("maps");
    } else if (budget === "2500_5000" || budget === "5000_plus") {
      services.add("website");
      if (goal.toLowerCase().includes("premium") || sectorId === "realestate") services.add("branding");
      if (discovery !== "social") services.add("seo");
    }

    if (situation === "none" || situation === "redesign") services.add("website");
    if (situation === "selling") {
      services.add("website");
      services.add("seo");
    }
    if (discovery === "google") {
      services.add("seo");
      if (sectorId === "hospitality" || sectorId === "realestate") services.add("maps");
    }
    if (discovery === "social") services.add("social");
    if (goal.toLowerCase().includes("crédibilité") || goal.toLowerCase().includes("premium")) services.add("branding");

    const order = SERVICE_ORDER[sectorId] ?? SERVICE_ORDER.other;
    return order.filter((id) => services.has(id)).slice(0, budget === "under500" ? 1 : budget === "500_1000" ? 2 : budget === "1000_2500" ? 3 : 4);
  }, [sectorId, budget, situation, discovery, goal]);

  const proposals = useMemo<Proposal[]>(() => {
    return orderedServices.map((service) => {
      let price = BASE_PRICES[service.id];
      let label = service.label;
      let detail = service.detail;
      if (service.id === "website") {
        if (situation === "selling") {
          price = WEBSITE_TIERS.ecommerce.price; label = WEBSITE_TIERS.ecommerce.label; detail = WEBSITE_TIERS.ecommerce.detail;
        } else if (budget === "1000_2500" || budget === "2500_5000" || budget === "5000_plus" || situation === "redesign") {
          price = WEBSITE_TIERS.business.price; label = WEBSITE_TIERS.business.label; detail = WEBSITE_TIERS.business.detail;
        } else {
          price = WEBSITE_TIERS.showcase.price; label = WEBSITE_TIERS.showcase.label; detail = WEBSITE_TIERS.showcase.detail;
        }
      }
      if (service.id === "branding" && (budget === "2500_5000" || budget === "5000_plus" || sectorId === "realestate")) {
        price = BRANDING_TIERS.premium.price; label = BRANDING_TIERS.premium.label; detail = BRANDING_TIERS.premium.detail;
      }
      return { id: service.id, label, detail, price, period: service.id === "seo" || service.id === "social" || service.id === "maintenance" ? "month" : "once" };
    });
  }, [orderedServices, situation, budget, sectorId]);

  const recommendedIds = profileRecommendation;
  const activeRecommended = recommendedIds.filter((id) => proposals.some((p) => p.id === id));
  useEffect(() => {
    if (step === 4 && selectedServices.length === 0 && activeRecommended.length) {
      setSelectedServices(activeRecommended);
    }
  }, [step, activeRecommended.join(",")]);
  const total = selectedServices.reduce((sum, id) => sum + (proposals.find((x) => x.id === id)?.price ?? 0), 0);
  const monthly = selectedServices.reduce((sum, id) => { const p = proposals.find((x) => x.id === id); return sum + (p?.period === "month" ? p.price : 0); }, 0);
  const once = total - monthly;

  const choose = (setter: (value: string) => void, value: string, next: number) => { setter(value); window.setTimeout(() => setStep(next), 180); };
  const toggleService = (id: string) => setSelectedServices((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  const reset = () => { setStep(0); setSectorId(""); setGoal(""); setSituation(""); setBudget(""); setDiscovery(""); setSelectedServices([]); setClient({ name: "", email: "", whatsapp: "" }); setGenerated(false); setSendMessage(""); };

  const recommendation = useMemo(() => {
    if (!sector || !discoveryChoice) return "";
    const channel = discovery === "google" ? "Google et la visibilité locale" : discovery === "social" ? "les réseaux sociaux" : discovery === "referral" ? "la conversion du bouche-à-oreille" : "la complémentarité de vos canaux";
    const budgetText = budget === "under500" ? "un premier levier ciblé" : budget === "500_1000" ? "une présence solide sans disperser le budget" : budget === "1000_2500" ? "un dispositif cohérent qui couvre votre socle digital et votre acquisition" : "un dispositif plus complet, sans ajouter des prestations qui ne servent pas votre objectif";
    return `Pour ${sector.label.toLowerCase()}, Alexandre recommande ${budgetText}, en donnant la priorité à ${activeRecommended.map((id) => SERVICES.find((x) => x.id === id)?.label).filter(Boolean).join(", ")}. Votre choix de ${channel} renforce cette recommandation.`;
  }, [sector, discoveryChoice, discovery, budget, activeRecommended]);

  const titles = ["D'abord, votre activité.", "Votre priorité ?", "Votre situation aujourd'hui ?", "Quel investissement envisagez-vous ?", "Quelles expertises activer ?", "Comment vos clients vous trouvent-ils ?", "Votre sélection est prête.", "Vos coordonnées"]; const progress = ((step + 1) / 8) * 100; const card = (item: Choice, onClick: () => void, selected = false) => <button key={item.id} type="button" onClick={onClick} className={`group w-full rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg ${selected ? "border-primary bg-primary/[0.07] shadow-md" : "border-border bg-background"}`}><div className="flex items-center justify-between gap-2"><span className="text-[11px] font-medium leading-tight sm:text-sm">{item.label}</span>{selected ? <Check className="h-3.5 w-3.5 text-primary" /> : <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary" />}</div><div className="mt-1 hidden text-[9px] leading-4 text-muted-foreground sm:block">{item.detail}</div></button>;

  return <section id="quote" className="relative border-y border-border/50 bg-background py-4 sm:py-6"><div className="mx-auto max-w-2xl px-3.5 sm:px-5"><div className="mb-3 flex items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="hidden scale-[0.58] sm:block -ml-4 -my-8"><AlexandreAdvisor /></div><div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/[0.08] text-primary shadow-sm sm:hidden"><span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary" /><span className="text-sm font-bold">A</span></div><div><div className="flex items-center gap-2 label-mono text-[8px] uppercase tracking-[0.2em] text-primary"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> XR INTELLIGENCE · ALEXANDRE</div><div className="text-[10px] text-muted-foreground sm:text-xs">Votre assistant analyse vos réponses et construit une proposition.</div></div></div><div className="flex items-center gap-1.5"><div className="h-1 w-10 overflow-hidden rounded-full bg-muted sm:w-16"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div><span className="label-mono text-[7px] text-muted-foreground">{String(step + 1).padStart(2, "0")}/08</span></div></div>
    <div className="rounded-[1.5rem] border border-border/80 bg-card/85 p-3 shadow-[0_28px_80px_-48px_rgba(0,0,0,.75)] backdrop-blur-xl sm:p-5"><div className="mb-4 flex items-end justify-between gap-2 border-b border-border/70 pb-3"><div><p className="label-mono text-[7px] uppercase tracking-[0.18em] text-muted-foreground">{step >= 7 ? "Finalisation" : `Question ${step + 1} sur 8`}</p><h2 className="mt-1 text-base font-medium tracking-[-0.03em] sm:text-2xl">{titles[step]}</h2></div>{step > 0 && step < 7 && <button type="button" onClick={() => setStep(step - 1)} className="rounded-full border border-border px-2.5 py-1 text-[10px] text-muted-foreground hover:text-foreground">←</button>}</div>
      {step === 0 && <div><p className="mb-2 text-[9px] text-muted-foreground">Alexandre adapte la suite du diagnostic à votre métier.</p><div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">{SECTORS.map((x) => card(x, () => choose(setSectorId, x.id, 1)))}</div></div>}
      {step === 1 && sector && <div className="grid gap-1.5 sm:grid-cols-3">{sector.goals.map((x) => card({ id: x, label: x, detail: "Priorité adaptée à votre secteur" }, () => choose(setGoal, x, 2)))}</div>}
      {step === 2 && <div className="grid grid-cols-2 gap-1.5">{SITUATIONS.map((x) => card(x, () => choose(setSituation, x.id, 3)))}</div>}
      {step === 3 && <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">{BUDGETS.map((x) => card(x, () => { setBudget(x.id); setSelectedServices([]); window.setTimeout(() => setStep(4), 180); }, x.id === budget))}</div>}
      {step === 4 && <div><div className="mb-3 rounded-[1.25rem] border border-primary/25 bg-gradient-to-br from-primary/[0.09] to-transparent p-4 shadow-sm"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-primary"><Sparkles className="h-3.5 w-3.5" /> Sélection recommandée par Alexandre <span className="ml-1 rounded-full border border-primary/20 px-1.5 py-0.5 text-[8px]">profil + budget + objectif</span></div><p className="mt-2 text-[10px] leading-4 text-muted-foreground">La sélection tient compte de votre secteur, objectif, situation, budget et canal d'acquisition. Elle n'est pas automatiquement poussée vers l'offre la plus chère.</p></div><div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">{orderedServices.map((x) => card(x, () => toggleService(x.id), selectedServices.includes(x.id)))}</div><button type="button" disabled={!selectedServices.length} onClick={() => setStep(5)} className="mt-3 w-full rounded-full bg-primary px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground disabled:opacity-40">Valider ma sélection →</button></div>}
      {step === 5 && <div><p className="mb-2 text-[9px] text-muted-foreground">Dernière question d'acquisition.</p><div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">{DISCOVERY.map((x) => card(x, () => choose(setDiscovery, x.id, 6)))}</div></div>}
      {step === 6 && sector && <div className="space-y-3"><div className="rounded-2xl border border-primary/30 bg-primary/[0.06] p-4"><div className="flex items-center gap-2 text-xs font-semibold"><Sparkles className="h-4 w-4 text-primary" /> Recommandation d'Alexandre</div><p className="mt-2 text-xs leading-5 sm:text-sm">{recommendation}</p></div><div className="mb-2 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Proposition cohérente avec votre profil</div><div className="grid gap-2 sm:grid-cols-2">{selectedServices.map((id) => { const p = proposals.find((x) => x.id === id); return p ? <div key={id} className="flex items-center justify-between rounded-xl border border-border bg-background p-3"><div><div className="text-xs font-medium">{p.label}</div><div className="text-[9px] text-muted-foreground">{p.detail}</div></div><div className="text-right text-xs font-semibold text-primary">À partir de {p.price.toLocaleString("fr-FR")} €{p.period === "month" ? " / mois" : ""}</div></div> : null; })}</div><div className="rounded-xl border border-border bg-background p-3 text-xs"><div className="flex justify-between"><span>Prestations ponctuelles</span><strong>{once.toLocaleString("fr-FR")} €</strong></div><div className="mt-1 flex justify-between"><span>Abonnements mensuels</span><strong>{monthly.toLocaleString("fr-FR")} € / mois</strong></div></div><div className="grid gap-2 sm:grid-cols-2"><button type="button" onClick={() => setStep(7)} className="w-full rounded-full bg-primary px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">Recevoir mon devis PDF →</button><a href={`https://wa.me/33767566783?text=${encodeURIComponent(`Bonjour XRAGENCY, j'ai terminé mon diagnostic XR Intelligence. Secteur : ${sector.label}. Budget : ${budgetChoice?.label}. Prestations recommandées : ${selectedServices.map((id) => proposals.find((p) => p.id === id)?.label).filter(Boolean).join(", ")}. Total : ${once.toLocaleString("fr-FR")} € + ${monthly.toLocaleString("fr-FR")} €/mois.`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider"><MessageCircle className="h-3.5 w-3.5" /> Continuer sur WhatsApp</a></div></div>}
      {step === 7 && <div className="space-y-2.5"><p className="text-[9px] text-muted-foreground">Entrez vos coordonnées. Alexandre prépare le PDF avec le contexte, les prestations sélectionnées et les montants.</p><input value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} placeholder="Nom / entreprise" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" /><input value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} type="email" placeholder="Votre e-mail" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" /><input value={client.whatsapp} onChange={(e) => setClient({ ...client, whatsapp: e.target.value })} placeholder="Votre WhatsApp / téléphone" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" /><button type="button" disabled={!client.name || !client.email || !client.whatsapp || sending} onClick={generatePdf} className="w-full rounded-full bg-primary px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground disabled:opacity-40">{sending ? "Génération et envoi…" : generated ? "Générer / renvoyer le devis PDF →" : "Générer mon devis PDF →"}</button>{sendMessage && <div className="rounded-xl border border-primary/25 bg-primary/[0.05] p-3 text-center text-[10px] leading-5 text-muted-foreground">{sendMessage}</div>}<div className="grid grid-cols-2 gap-2"><a href={`https://wa.me/33767566783?text=${encodeURIComponent(`Bonjour XR Agency, je viens de préparer un devis avec Alexandre. Nom : ${client.name}. Email : ${client.email}. WhatsApp : ${client.whatsapp}. Total estimé : ${once.toLocaleString("fr-FR")} € + ${monthly.toLocaleString("fr-FR")} €/mois.`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 text-[10px] font-semibold uppercase tracking-wider"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</a><a href={`mailto:${client.email}?subject=${encodeURIComponent("Votre devis XRAGENCY")}&body=${encodeURIComponent("Votre devis PDF a été généré avec Alexandre. Si l'envoi automatique n'est pas disponible, vous pouvez partager le PDF généré depuis votre appareil.")}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 text-[10px] font-semibold uppercase tracking-wider"><Mail className="h-3.5 w-3.5" /> E-mail</a></div><button type="button" onClick={reset} className="mx-auto flex items-center gap-1 text-[9px] text-muted-foreground hover:text-foreground"><RotateCcw className="h-3 w-3" /> Recommencer</button></div>}
    </div></div></section>;
}
