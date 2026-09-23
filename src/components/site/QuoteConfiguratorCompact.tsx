import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Globe2, MessageCircle, RotateCcw, Sparkles } from "lucide-react";

type Choice = { id: string; label: string; detail: string };
type Sector = Choice & { goals: string[] };
type Proposal = { id: string; label: string; detail: string; price: number; period: "once" | "month"; custom?: boolean };
const SECTORS: Sector[] = [
  { id: "restaurant", label: "Restaurant · café · bar", detail: "Restaurants, cafés, rooftops, bars et concepts food", goals: ["Augmenter les réservations", "Être trouvé localement", "Monter en gamme"] },
  { id: "hospitality", label: "Hôtel · villa · resort", detail: "Hôtels, resorts, villas, maisons d'hôtes et hospitality", goals: ["Augmenter les réservations", "Attirer une clientèle internationale", "Améliorer la visibilité"] },
  { id: "realestate", label: "Immobilier · location", detail: "Agences, promoteurs, biens premium et location", goals: ["Générer plus de demandes", "Valoriser les biens", "Attirer une clientèle premium"] },
  { id: "automotive", label: "Automobile · mobilité", detail: "Concessions, garages premium, location et mobilité", goals: ["Générer des demandes qualifiées", "Valoriser les véhicules", "Développer la visibilité locale"] },
  { id: "fashion", label: "Mode · accessoires", detail: "Mode, prêt-à-porter, maroquinerie et accessoires", goals: ["Renforcer l'image de marque", "Vendre davantage", "Développer une audience internationale"] },
  { id: "jewelry", label: "Joaillerie · horlogerie", detail: "Bijoux, montres, maisons et pièces d'exception", goals: ["Renforcer le positionnement premium", "Générer des demandes", "Créer une présence internationale"] },
  { id: "beauty", label: "Beauté · esthétique · spa", detail: "Instituts, spas, cliniques esthétiques et bien-être", goals: ["Générer des rendez-vous", "Être trouvé localement", "Professionnaliser l'image"] },
  { id: "health", label: "Santé · médical", detail: "Cliniques, cabinets, spécialistes et santé privée", goals: ["Générer des prises de rendez-vous", "Gagner en confiance", "Être visible sur Google"] },
  { id: "architecture", label: "Architecture · intérieur", detail: "Architectes, architecture intérieure et design d'espace", goals: ["Montrer les réalisations", "Attirer des projets premium", "Développer la visibilité"] },
  { id: "construction", label: "Construction · rénovation", detail: "Bâtiment, rénovation, artisans et entreprises techniques", goals: ["Générer des demandes", "Présenter le savoir-faire", "Être trouvé localement"] },
  { id: "legal", label: "Avocat · droit · expertise", detail: "Cabinets juridiques, droit des affaires et professions réglementées", goals: ["Gagner en crédibilité", "Obtenir des prospects qualifiés", "Être visible sur Google"] },
  { id: "finance", label: "Finance · patrimoine · assurance", detail: "Finance, gestion de patrimoine, assurance et conseil", goals: ["Gagner en confiance", "Générer des leads", "Structurer l'image de marque"] },
  { id: "commerce", label: "Commerce · e-commerce", detail: "Boutiques, marques, retail, catalogues et vente en ligne", goals: ["Vendre davantage", "Améliorer la conversion", "Développer la marque"] },
  { id: "tourism", label: "Voyage · tourisme · expériences", detail: "Agences, excursions, activités, loisirs et expériences", goals: ["Augmenter les réservations", "Être trouvé par les touristes", "Convertir davantage"] },
  { id: "agency", label: "Agence · studio · freelance", detail: "Créatifs, marketing, tech, conseil et production", goals: ["Présenter l'expertise", "Générer des leads", "Monter en gamme"] },
  { id: "other", label: "Autre activité", detail: "Votre activité ne figure pas ici ? XR Intelligence s'adapte.", goals: ["Développer mon activité", "Professionnaliser mon image", "Construire une présence forte"] },
];
const SERVICES: Choice[] = [
  { id: "website", label: "Site web", detail: "Vitrine, Business, e-commerce ou réservation" }, { id: "branding", label: "Branding", detail: "Logo, identité, direction artistique et univers" }, { id: "seo", label: "SEO", detail: "Positionnement organique et acquisition Google" }, { id: "maps", label: "Google Maps", detail: "Fiche locale, visibilité et optimisation locale" }, { id: "ads", label: "Google Ads", detail: "Campagnes sponsorisées et acquisition payante" }, { id: "social", label: "Social Media", detail: "Stratégie, contenus et animation des réseaux" }, { id: "content", label: "Contenu · photo · vidéo", detail: "Direction de contenu, visuels et formats de campagne" }, { id: "conversion", label: "Conversion & parcours", detail: "UX, landing pages, CTA et optimisation commerciale" }, { id: "maintenance", label: "WebCare", detail: "Corrections, évolutions et suivi du site" },
];
const SITUATIONS: Choice[] = [
  { id: "none", label: "Pas encore de site", detail: "Créer un socle digital propre dès le départ" }, { id: "existing", label: "J'ai déjà un site", detail: "Le conserver et l'améliorer" }, { id: "redesign", label: "Mon site doit être refait", detail: "Design, structure, mobile ou conversion à revoir" }, { id: "outdated", label: "Il fonctionne mais il est daté", detail: "Moderniser sans repartir de zéro" }, { id: "invisible", label: "J'ai peu de visibilité", detail: "Le problème est surtout l'acquisition" }, { id: "selling", label: "Je vends / prends des réservations", detail: "Catalogue, paiement, réservation ou rendez-vous" }, { id: "international", label: "Je vise l'international", detail: "Langues, image premium et acquisition internationale" }, { id: "launch", label: "Je lance une nouvelle activité", detail: "Construire l'offre et la présence dès le départ" },
];
const BUDGETS: Choice[] = [
  { id: "under500", label: "Moins de 500 €", detail: "Un levier prioritaire" }, { id: "500_1000", label: "500 – 1 000 €", detail: "Une présence solide" }, { id: "1000_2500", label: "1 000 – 2 500 €", detail: "Un dispositif complet" }, { id: "2500_5000", label: "2 500 – 5 000 €", detail: "Une stratégie structurée" }, { id: "5000_plus", label: "5 000 € +", detail: "Un projet premium sur mesure" },
];
const DISCOVERY: Choice[] = [
  { id: "google", label: "Google / Maps", detail: "Recherche, SEO ou visibilité locale" }, { id: "social", label: "Instagram / Facebook / TikTok", detail: "Réseaux sociaux et recommandations" }, { id: "referral", label: "Bouche-à-oreille", detail: "Recommandations et réseau" }, { id: "mixed", label: "Un peu de tout", detail: "Acquisition déjà diversifiée" },
];
const SERVICE_ORDER: Record<string, string[]> = { restaurant: ["website","maps","social","seo","branding","maintenance"], hospitality: ["website","maps","seo","social","branding","maintenance"], realestate: ["website","maps","branding","seo","social","maintenance"], automotive: ["website","maps","conversion","seo","content","maintenance"], fashion: ["website","branding","social","content","seo","maintenance"], jewelry: ["website","branding","content","seo","social","maintenance"], beauty: ["website","maps","social","seo","branding","maintenance"], health: ["website","maps","seo","branding","content","maintenance"], architecture: ["website","branding","content","seo","maps","maintenance"], construction: ["website","maps","seo","branding","content","maintenance"], legal: ["website","seo","branding","maps","content","maintenance"], finance: ["website","seo","branding","content","maps","maintenance"], commerce: ["website","social","seo","branding","conversion","maintenance"], tourism: ["website","maps","seo","social","content","maintenance"], agency: ["website","branding","conversion","seo","content","maintenance"], other: ["website","branding","seo","maps","social","maintenance"] };

const BASE_PRICES: Record<string, number> = { website: 499, branding: 199, seo: 199, maps: 990, ads: 299, social: 299, content: 399, conversion: 299, maintenance: 29 };
// Keep recommendation rules defined before the configurator render so SSR bundles always include them.
const PROFILE_SERVICE_RULES: Record<string, string[]> = Object.fromEntries(
  Object.entries(SERVICE_ORDER).map(([sectorId, services]) => [sectorId, services.slice(0, 4)])
);

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
  const journeyRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0); const [sectorId, setSectorId] = useState(""); const [showAllSectors, setShowAllSectors] = useState(false); const [goal, setGoal] = useState(""); const [situation, setSituation] = useState(""); const [budget, setBudget] = useState(""); const [discovery, setDiscovery] = useState(""); const [selectedServices, setSelectedServices] = useState<string[]>([]); const [client, setClient] = useState({ company: "", name: "", email: "", whatsapp: "", website: "" }); const [generated, setGenerated] = useState(false); const [sending, setSending] = useState(false); const [sendMessage, setSendMessage] = useState("");
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
      if (service.id === "maps") { price = 990; label = "Google Maps Top 3"; detail = "SUR MESURE · à partir de 990 € / an · selon positionnement, zone, concurrence et mots-clés"; }
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
      return { id: service.id, label, detail, price, period: service.id === "seo" || service.id === "social" || service.id === "maintenance" ? "month" : "once", custom: service.id === "maps" };
    });
  }, [orderedServices, situation, budget, sectorId]);

  const recommendedIds = profileRecommendation;
  const activeRecommended = recommendedIds.filter((id) => proposals.some((p) => p.id === id));
  useEffect(() => {
    if (step === 4 && selectedServices.length === 0 && activeRecommended.length) {
      setSelectedServices(activeRecommended);
    }
  }, [step, activeRecommended.join(",")]);
  const total = selectedServices.reduce((sum, id) => { const p = proposals.find((x) => x.id === id); return sum + (p?.custom ? 0 : (p?.price ?? 0)); }, 0);
  const monthly = selectedServices.reduce((sum, id) => { const p = proposals.find((x) => x.id === id); return sum + (p?.custom ? 0 : (p?.period === "month" ? p.price : 0)); }, 0);
  const once = total - monthly;

  const generatePdf = async () => {
    setSending(true);
    setSendMessage("");
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.text("XRAGENCY · DEVIS DIGITAL", 20, 22);
      doc.setFontSize(10);

      let y = 52;
      doc.setFontSize(12);
      doc.text("Informations société", 20, y);
      y += 8;
      doc.setFontSize(10);

      [
        `E-mail : ${client.email}`,
        `Activité : ${sector?.label || ""}`,
        `Priorité : ${goal}`,
        `Situation : ${SITUATIONS.find(x => x.id === situation)?.label || ""}`,
        `Budget : ${budgetChoice?.label || ""}`,
        `Acquisition : ${discoveryChoice?.label || ""}`,
      ].forEach((line) => {
        doc.text(line, 20, y);
        y += 6;
      });

      y += 6;
      doc.setFontSize(12);
      doc.text("Prestations sélectionnées", 20, y);
      y += 8;
      doc.setFontSize(10);

      selectedServices.forEach((id) => {
        const p = proposals.find((x) => x.id === id);
        if (p) {
          doc.text(`${p.label} · ${p.custom ? "SUR MESURE — Nous contacter" : `${p.price} €${p.period === "month" ? "/mois" : ""}`}`, 20, y);
          y += 6;
        }
      });

      y += 6;
      doc.text(`Total ponctuel estimé : ${once.toLocaleString("fr-FR")} €`, 20, y);
      y += 6;
      doc.text(`Total mensuel estimé : ${monthly.toLocaleString("fr-FR")} € / mois`, 20, y);

      // The PDF is always delivered locally. No email/API call can block the download.
      doc.save("devis-xragency.pdf");
      setGenerated(true);
      setSendMessage("Votre devis PDF a été téléchargé sur votre appareil.");
    } catch (error) {
      setSendMessage(error instanceof Error ? error.message : "Impossible de générer le devis PDF.");
    } finally {
      setSending(false);
    }
  };

  const choose = (setter: (value: string) => void, value: string, next: number) => {
    setter(value);
    window.setTimeout(() => setStep(next), 180);
  };
  const toggleService = (id: string) => setSelectedServices((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  useEffect(() => {
    if (step > 0) journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [step]);

  const reset = () => { setStep(0); setSectorId(""); setGoal(""); setSituation(""); setBudget(""); setDiscovery(""); setSelectedServices([]); setClient({ company: "", name: "", email: "", whatsapp: "", website: "" }); setGenerated(false); setSendMessage(""); };

  const recommendation = useMemo(() => {
    if (!sector || !discoveryChoice) return "";
    const channel = discovery === "google" ? "Google et la visibilité locale" : discovery === "social" ? "les réseaux sociaux" : discovery === "referral" ? "la conversion du bouche-à-oreille" : "la complémentarité de vos canaux";
    const budgetText = budget === "under500" ? "un premier levier ciblé" : budget === "500_1000" ? "une présence solide sans disperser le budget" : budget === "1000_2500" ? "un dispositif cohérent qui couvre votre socle digital et votre acquisition" : "un dispositif plus complet, sans ajouter des prestations qui ne servent pas votre objectif";
    return `Pour ${sector.label.toLowerCase()}, XR Intelligence recommande ${budgetText}, en donnant la priorité à ${activeRecommended.map((id) => SERVICES.find((x) => x.id === id)?.label).filter(Boolean).join(", ")}. Votre choix de ${channel} renforce cette recommandation.`;
  }, [sector, discoveryChoice, discovery, budget, activeRecommended]);

  const titles = ["Votre activité", "Votre priorité", "Votre situation aujourd'hui", "L'investissement envisagé", "Les prestations à activer", "Comment vos clients vous trouvent", "Votre recommandation", "Vos informations"]; const progress = ((step + 1) / 8) * 100; const card = (item: Choice, onClick: () => void, selected = false) => <button key={item.id} type="button" onClick={onClick} className={`group relative w-full overflow-hidden rounded-[1.35rem] border p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/55 hover:shadow-[0_22px_45px_-25px_rgba(0,0,0,.85)] ${selected ? "border-primary bg-primary/[0.09] shadow-[0_18px_45px_-25px_hsl(var(--primary)/.45)]" : "border-border/80 bg-background/70"}`}><span className="pointer-events-none absolute -right-5 -top-5 h-16 w-16 rounded-full bg-primary/[0.05] blur-xl transition-transform duration-500 group-hover:scale-150" /><div className="relative flex items-start justify-between gap-3"><div><span className="mb-2 inline-flex rounded-full border border-border/70 bg-background/70 px-2 py-1 label-mono text-[7px] uppercase tracking-[.14em] text-muted-foreground">XR Intelligence · {selected ? "retenu" : "option"}</span><span className="block text-[11px] font-medium leading-tight sm:text-sm">{item.label}</span><span className="mt-1.5 block text-[9px] leading-4 text-muted-foreground">{item.detail}</span></div><span className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-primary"}`}>{selected ? <Check className="h-3 w-3" /> : <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />}</span></div></button>;

  return <section id="quote" className="relative overflow-hidden border-y border-border/50 bg-background py-12 sm:py-16 lg:py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6"><div className="mb-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.06] px-3 py-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          <span className="label-mono text-[8px] uppercase tracking-[0.2em] text-primary">XR Intelligence · devis sur mesure</span>
        </div>
        <h2 className="display-serif max-w-3xl text-4xl leading-[.92] sm:text-5xl lg:text-6xl">Construisons votre <em className="text-primary not-italic italic">propre</em> dispositif.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Quelques questions, une recommandation claire, puis un devis personnalisé. Vous gardez toujours la main sur les prestations.</p>
      </div>
      <div className="hidden rounded-2xl border border-border/70 bg-card/70 px-5 py-4 text-right backdrop-blur lg:block">
        <p className="label-mono text-[8px] uppercase tracking-[.18em] text-muted-foreground">Estimation en direct</p>
        <p className="mt-1 display-serif text-2xl text-primary">{once.toLocaleString("fr-FR")} € <span className="text-sm text-muted-foreground">+ {monthly.toLocaleString("fr-FR")} €/mois</span></p>
      </div>
    </div><div className="mb-3 flex items-center justify-between gap-2"><div className="flex min-w-0 items-center gap-2.5"><div><div className="flex items-center gap-2 label-mono text-[8px] uppercase tracking-[0.2em] text-primary"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> XR INTELLIGENCE</div><div className="truncate text-[9px] text-muted-foreground sm:text-xs">Je construis votre recommandation étape par étape.</div></div></div><div className="flex items-center gap-1.5"><div className="h-1 w-10 overflow-hidden rounded-full bg-muted sm:w-16"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div><span className="label-mono text-[7px] text-muted-foreground">{String(step + 1).padStart(2, "0")}/08</span></div></div>
    <div ref={journeyRef} className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card/65 p-4 shadow-[0_35px_100px_-55px_rgba(0,0,0,.95)] backdrop-blur-2xl sm:p-6 lg:p-7"><div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" /><div className="mb-4 flex items-end justify-between gap-2 border-b border-border/70 pb-3"><div><p className="label-mono text-[7px] uppercase tracking-[0.18em] text-muted-foreground">{step >= 7 ? "Finalisation" : `Question ${step + 1} sur 8`}</p><h2 className="mt-1 text-base font-medium tracking-[-0.03em] sm:text-2xl">{titles[step]}</h2></div>{step > 0 && step < 7 && <button type="button" onClick={() => setStep(step - 1)} className="rounded-full border border-border px-2.5 py-1 text-[10px] text-muted-foreground hover:text-foreground">←</button>}</div>
      {step === 0 && <div><div className="mb-4 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[.08] via-background to-transparent p-4"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.14em]"><Globe2 className="h-3.5 w-3.5 text-primary"/>Votre univers</div><p className="mt-1.5 max-w-xl text-[10px] leading-4 text-muted-foreground">XR Intelligence adapte son analyse à votre activité. Choisissez une famille — elle affinera ensuite la recommandation avec vos objectifs.</p></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{(showAllSectors ? SECTORS : SECTORS.slice(0,6)).map((x,i) => <button key={x.id} type="button" onClick={() => { setSectorId(x.id); window.setTimeout(() => setStep(1), 180); }} className="group relative min-h-[92px] overflow-hidden rounded-2xl border border-border bg-background/70 p-3 text-left transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/[.045]"><span className="absolute right-2 top-2 text-[8px] text-muted-foreground/50">0{String(i+1)}</span><span className="block pr-5 text-[10px] font-semibold leading-4 group-hover:text-primary">{x.label}</span><span className="mt-1.5 block text-[8px] leading-3.5 text-muted-foreground line-clamp-2">{x.detail}</span><span className="absolute bottom-2.5 right-3 h-1.5 w-1.5 rounded-full bg-primary/30 transition group-hover:scale-150 group-hover:bg-primary"/></button>)}</div><button type="button" onClick={() => setShowAllSectors(v=>!v)} className="mt-2 w-full rounded-xl border border-dashed border-border py-2.5 text-[9px] uppercase tracking-[.14em] text-muted-foreground transition hover:border-primary/35 hover:text-primary">{showAllSectors ? "Réduire les activités" : "Voir toutes les activités · XR Intelligence affine ensuite avec vous"}</button></div>}
      {step === 1 && sector && <div className="grid gap-2 sm:grid-cols-3">{sector.goals.map((x) => card({ id: x, label: x, detail: "Priorité adaptée à votre secteur" }, () => choose(setGoal, x, 2)))}</div>}
      {step === 2 && <div className="grid grid-cols-2 gap-2">{SITUATIONS.map((x) => card(x, () => choose(setSituation, x.id, 3)))}</div>}
      {step === 3 && <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{BUDGETS.map((x) => card(x, () => { setBudget(x.id); setSelectedServices([]); window.setTimeout(() => setStep(4), 180); }, x.id === budget))}</div>}
      {step === 4 && <div><div className="mb-3 rounded-xl border border-primary/15 bg-primary/[0.035] p-3"><div className="text-[10px] font-medium text-primary">XR Intelligence a déjà fait le premier tri</div><p className="mt-1 text-[9px] leading-4 text-muted-foreground">Voici les leviers qui ont du sens pour votre activité. Ajustez-les librement avant de valider.</p></div><div className="relative mb-3 overflow-hidden rounded-[1.25rem] border border-primary/20 bg-gradient-to-br from-primary/[0.10] via-primary/[0.025] to-transparent p-3 shadow-sm sm:p-4"><div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/15 blur-2xl" /><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-primary"><Sparkles className="h-3.5 w-3.5" /> Sélection préparée par XR Intelligence <span className="ml-1 rounded-full border border-primary/20 px-1.5 py-0.5 text-[8px]">profil + budget + objectif</span></div><p className="mt-2 text-[10px] leading-4 text-muted-foreground">XR Intelligence croise votre activité, votre objectif, votre situation, votre budget et votre acquisition pour éviter les prestations inutiles.</p></div><div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">{orderedServices.map((x) => card(x, () => toggleService(x.id), selectedServices.includes(x.id)))}</div><button type="button" disabled={!selectedServices.length} onClick={() => setStep(5)} className="mt-3 w-full rounded-full bg-primary px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground disabled:opacity-40">Valider ma sélection →</button></div>}
      {step === 5 && <div><p className="mb-2 text-[9px] text-muted-foreground">Dernière question d'acquisition.</p><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{DISCOVERY.map((x) => card(x, () => choose(setDiscovery, x.id, 6)))}</div></div>}
      {step === 6 && sector && <div className="space-y-3"><div className="relative overflow-hidden rounded-[1.5rem] border border-primary/30 bg-gradient-to-br from-primary/[0.10] to-transparent p-4 shadow-sm"><div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl" /><div className="flex items-center gap-2 text-xs font-semibold"><Sparkles className="h-4 w-4 text-primary" /> Le conseil de XR Intelligence</div><p className="mt-2 text-xs leading-5 sm:text-sm">{recommendation}</p></div><div className="mb-2 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Le parcours que XR Intelligence vous conseille</div><div className="grid gap-2 sm:grid-cols-2">{selectedServices.map((id) => { const p = proposals.find((x) => x.id === id); return p ? <div key={id} className="flex items-center justify-between rounded-xl border border-border bg-background p-3"><div><div className="text-xs font-medium">{p.label}</div><div className="text-[9px] text-muted-foreground">{p.detail}</div></div><div className="text-right text-xs font-semibold text-primary">{p.custom ? "SUR MESURE — Nous contacter" : <>À partir de {p.price.toLocaleString("fr-FR")} €{p.period === "month" ? " / mois" : ""}</>}</div></div> : null; })}</div><div className="rounded-2xl border border-primary/15 bg-primary/[0.035] p-4 text-xs shadow-sm"><div className="flex justify-between"><span>Prestations ponctuelles</span><strong>{once.toLocaleString("fr-FR")} €</strong></div><div className="mt-1 flex justify-between"><span>Abonnements mensuels</span><strong>{monthly.toLocaleString("fr-FR")} € / mois</strong></div></div><div className="grid gap-2 sm:grid-cols-2"><button type="button" onClick={() => setStep(7)} className="w-full rounded-full bg-primary px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">Recevoir mon devis PDF →</button><a href={`https://wa.me/33767566783?text=${encodeURIComponent(`Bonjour XRAGENCY, j'ai terminé mon diagnostic XR Intelligence. Secteur : ${sector.label}. Budget : ${budgetChoice?.label}. Prestations recommandées : ${selectedServices.map((id) => proposals.find((p) => p.id === id)?.label).filter(Boolean).join(", ")}. Total : ${once.toLocaleString("fr-FR")} € + ${monthly.toLocaleString("fr-FR")} €/mois.`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider"><MessageCircle className="h-3.5 w-3.5" /> Continuer sur WhatsApp</a></div></div>}
      {step === 7 && <div className="space-y-3"><div className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-4"><p className="text-sm font-medium">Votre devis est prêt.</p><p className="mt-1 text-[10px] leading-4 text-muted-foreground">Entrez simplement votre adresse e-mail. Le PDF complet sera généré immédiatement et téléchargé sur votre appareil.</p></div><form onSubmit={(e) => { e.preventDefault(); if (!client.email || sending) return; void generatePdf(); }} className="space-y-3"><label htmlFor="quote-email" className="sr-only">Adresse e-mail</label><input id="quote-email" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} type="email" placeholder="Votre adresse e-mail *" autoComplete="email" autoFocus className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:border-primary" required /><button type="submit" disabled={!client.email || sending} className="w-full rounded-full bg-primary px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground disabled:opacity-40">{sending ? "Génération du PDF…" : generated ? "Télécharger à nouveau →" : "Télécharger mon devis PDF →"}</button></form>{sendMessage && <div aria-live="polite" className="rounded-xl border border-primary/25 bg-primary/[0.05] p-3 text-center text-[10px] leading-5 text-muted-foreground">{sendMessage}</div>}<button type="button" onClick={reset} className="mx-auto flex items-center gap-1 text-[9px] text-muted-foreground hover:text-foreground"><RotateCcw className="h-3 w-3" /> Recommencer</button></div>}
    </div></div></section>;
}
