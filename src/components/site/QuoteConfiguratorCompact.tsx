import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { ArrowRight, Check, ChevronRight, Globe2, Layers3, MessageCircle, RotateCcw, Sparkles } from "lucide-react";

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
  { id: "other", label: "Autre activité", detail: "Votre activité ne figure pas ici ? XR Quote Studio s'adapte.", goals: ["Développer mon activité", "Professionnaliser mon image", "Construire une présence forte"] },
];
const SERVICES: Choice[] = [
  { id: "website", label: "Site web", detail: "Vitrine, Business, e-commerce ou réservation" }, { id: "branding", label: "Branding", detail: "Logo, identité, direction artistique et univers" }, { id: "seo", label: "SEO", detail: "Positionnement organique et acquisition Google" }, { id: "maps", label: "Google Maps", detail: "Fiche locale, visibilité et optimisation locale" }, { id: "ads", label: "Google Ads", detail: "Campagnes sponsorisées et acquisition payante" }, { id: "social", label: "Social Media", detail: "Stratégie, contenus et animation des réseaux" }, { id: "content", label: "Contenu · photo · vidéo", detail: "Direction de contenu, visuels et formats de campagne" }, { id: "conversion", label: "Conversion & parcours", detail: "UX, landing pages, CTA et optimisation commerciale" }, { id: "maintenance", label: "WebCare", detail: "Corrections, évolutions et suivi du site" }, { id: "robotics", label: "Robotique & IA", detail: "Robots de service, location, achat et intégration" },
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
const SERVICE_ORDER: Record<string, string[]> = { restaurant: ["website","maps","social","seo","branding","maintenance","robotics"], hospitality: ["website","maps","seo","social","branding","maintenance","robotics"], realestate: ["website","maps","branding","seo","social","maintenance","robotics"], automotive: ["website","maps","conversion","seo","content","maintenance","robotics"], fashion: ["website","branding","social","content","seo","maintenance","robotics"], jewelry: ["website","branding","content","seo","social","maintenance","robotics"], beauty: ["website","maps","social","seo","branding","maintenance","robotics"], health: ["website","maps","seo","branding","content","maintenance","robotics"], architecture: ["website","branding","content","seo","maps","maintenance","robotics"], construction: ["website","maps","seo","branding","content","maintenance","robotics"], legal: ["website","seo","branding","maps","content","maintenance","robotics"], finance: ["website","seo","branding","content","maps","maintenance","robotics"], commerce: ["website","social","seo","branding","conversion","maintenance","robotics"], tourism: ["website","maps","seo","social","content","maintenance","robotics"], agency: ["website","branding","conversion","seo","content","maintenance","robotics"], other: ["website","branding","seo","maps","social","maintenance","robotics"] };

const BASE_PRICES: Record<string, number> = { website: 499, branding: 179, seo: 299, maps: 990, ads: 299, social: 299, content: 399, conversion: 299, maintenance: 29, robotics: 499 };
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
  starter: { price: 179, label: "Logo Signature", detail: "Logo, déclinaisons essentielles et fichiers maîtres" },
  premium: { price: 349, label: "Full Brand Suite", detail: "Système de marque étendu, direction artistique et Brand Book" },
} as const;

export function QuoteConfiguratorCompact() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0); const [sectorId, setSectorId] = useState(""); const [showAllSectors, setShowAllSectors] = useState(false); const [goal, setGoal] = useState(""); const [situation, setSituation] = useState(""); const [budget, setBudget] = useState(""); const [discovery, setDiscovery] = useState(""); const [selectedServices, setSelectedServices] = useState<string[]>([]); const [client, setClient] = useState({ company: "", name: "", email: "", whatsapp: "", website: "" }); const [generated, setGenerated] = useState(false); const [sending, setSending] = useState(false); const [sendMessage, setSendMessage] = useState("");
  const [paying, setPaying] = useState(false); const [checkoutUrl, setCheckoutUrl] = useState("");
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
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const W = 210, M = 14, R = 196;
      const ink = [18, 22, 29] as const;
      const soft = [241, 244, 247] as const;
      const lineColor = [218, 223, 229] as const;
      const muted = [92, 100, 112] as const;
      const white = [255, 255, 255] as const;
      const blue = [79, 102, 176] as const;
      const issueDate = new Date();
      const validity = new Date(issueDate);
      validity.setDate(validity.getDate() + 15);
      const stamp = issueDate.toISOString().slice(0, 10).replace(/-/g, "");
      const quoteNumber = "XR-" + stamp + "-" + String(Math.floor(1000 + Math.random() * 9000));
      const date = (d: Date) => d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

      const section = (label: string, y: number) => {
        doc.setFillColor(...soft);
        doc.roundedRect(M, y - 4, W - M * 2, 8, 1.5, 1.5, "F");
        doc.setTextColor(...ink);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.text(label.toUpperCase(), M + 3, y + 1);
        return y + 12;
      };

      const infoRow = (label: string, value: string, y: number, x = M, maxWidth = 150) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.7);
        doc.setTextColor(...muted);
        doc.text(label, x, y);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...ink);
        const lines = doc.splitTextToSize(value || "—", maxWidth);
        doc.text(lines, x + 30, y);
        return y + Math.max(5, lines.length * 4.5);
      };

      doc.setFillColor(...ink);
      doc.rect(0, 0, W, 33, "F");
      doc.setTextColor(...white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("XRAGENCY", M, 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(198, 203, 211);
      doc.text("STUDIO DIGITAL · STRATÉGIE · DESIGN · CROISSANCE", M, 21);
      doc.setTextColor(...white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("DEVIS", R - M, 13, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(198, 203, 211);
      doc.text(quoteNumber, R - M, 20, { align: "right" });
      doc.text(date(issueDate), R - M, 26, { align: "right" });

      let y = 44;
      y = section("Client", y);
      y = infoRow("Entreprise", client.company, y);
      y = infoRow("Contact", client.name, y);
      y = infoRow("E-mail", client.email, y);
      y = infoRow("WhatsApp", client.whatsapp, y);
      y = infoRow("Site", client.website || "—", y);
      y += 4;

      y = section("Projet", y);
      y = infoRow("Activité", sector?.label || "—", y);
      y = infoRow("Priorité", goal || "—", y);
      y = infoRow("Situation", situationChoice?.label || "—", y);
      y = infoRow("Budget", budgetChoice?.label || "—", y);
      y = infoRow("Acquisition", discoveryChoice?.label || "—", y);
      y += 5;

      y = section("Prestations sélectionnées", y);
      doc.setFillColor(...ink);
      doc.roundedRect(M, y - 4, W - M * 2, 8, 1.2, 1.2, "F");
      doc.setTextColor(...white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.text("PRESTATION", M + 3, y + 1);
      doc.text("MODE", 124, y + 1);
      doc.text("MONTANT", R - 3, y + 1, { align: "right" });
      y += 10;

      selectedServices.forEach((id) => {
        const p = proposals.find((x) => x.id === id);
        if (!p) return;
        const detail = p.id === "robotics"
          ? "Location robot de service dès 499 € / mois · achat selon modèle · événement dès 250 €."
          : p.detail;
        if (y > 255) {
          doc.addPage();
          y = 22;
        }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.4);
        doc.setTextColor(...ink);
        doc.text(p.label, M + 3, y);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(5.9);
        doc.setTextColor(...muted);
        doc.text(doc.splitTextToSize(detail, 86).slice(0, 2), M + 3, y + 3.5);
        doc.setFontSize(6.4);
        doc.text(p.period === "month" ? "RÉCURRENT" : p.custom ? "SUR MESURE" : "PONCTUEL", 124, y);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.2);
        doc.setTextColor(...ink);
        doc.text(
          p.custom ? "Sur devis" : p.price.toLocaleString("fr-FR") + " €" + (p.period === "month" ? " / mois" : ""),
          R - 3,
          y,
          { align: "right" }
        );
        y += 12;
        doc.setDrawColor(...lineColor);
        doc.line(M, y - 3, R, y - 3);
      });

      y += 3;
      if (y > 250) {
        doc.addPage();
        y = 22;
      }
      doc.setFillColor(...ink);
      doc.roundedRect(110, y - 4, 86, 28, 2.5, 2.5, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.7);
      doc.setTextColor(186, 192, 202);
      doc.text("TOTAL PONCTUEL", 114, y + 3);
      doc.text("TOTAL MENSUEL", 114, y + 12);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.4);
      doc.setTextColor(...white);
      doc.text(once.toLocaleString("fr-FR") + " €", 192, y + 3, { align: "right" });
      doc.text(monthly.toLocaleString("fr-FR") + " € / mois", 192, y + 12, { align: "right" });
      y += 36;

      y = section("Cadre du devis", y);
      y = infoRow("Validité", "15 jours · jusqu’au " + date(validity), y);
      y = infoRow("Démarrage", "Après validation du devis et réception des éléments nécessaires au projet.", y);
      y = infoRow("Nature", "Pré-devis généré automatiquement à partir de votre configuration XR Quote Studio.", y, M, 150);
      y += 5;

      doc.setFillColor(247, 249, 252);
      doc.roundedRect(M, y - 3, W - M * 2, 29, 2.5, 2.5, "F");
      doc.setTextColor(...ink);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.text("Validation client", M + 4, y + 5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.4);
      doc.setTextColor(...muted);
      doc.text("Ce document récapitule les prestations sélectionnées et leur modèle de facturation.", M + 4, y + 11);
      doc.text("Le périmètre définitif est confirmé avec XRAGENCY avant engagement.", M + 4, y + 16);
      doc.setDrawColor(...lineColor);
      doc.line(111, y + 8, 188, y + 8);
      doc.line(111, y + 21, 188, y + 21);
      doc.setFontSize(5.9);
      doc.text("Date / signature", 111, y + 6);
      doc.text("Nom / qualité", 111, y + 19);

      doc.setDrawColor(...lineColor);
      doc.line(M, 281, R, 281);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.3);
      doc.setTextColor(...ink);
      doc.text("KARMA SASU · XRAGENCY", M, 287);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(5.7);
      doc.setTextColor(...muted);
      doc.text("SIREN 889 178 141 · SIRET 889 178 141 00012 · RCS Paris", M, 292);
      doc.text("78 Avenue des Champs-Élysées · Bureau 562 · 75008 Paris · France", M, 296);
      doc.text("contact.xragency@gmail.com · +33 7 67 56 67 83 · xragencyai.com", M, 300);
      doc.setTextColor(...blue);
      doc.setFont("helvetica", "bold");
      doc.text(quoteNumber, R, 300, { align: "right" });

      doc.save("XRAGENCY-Devis-" + quoteNumber + ".pdf");
      setGenerated(true);
      setSendMessage("Votre devis professionnel a été généré.");
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("service");
    const normalized = requested === "ecommerce" ? "website" : requested;
    if (normalized && SERVICES.some((x) => x.id === normalized)) {
      if (requested === "ecommerce") setSituation("selling");
      setSelectedServices((current) => current.includes(normalized) ? current : [normalized]);
      setStep(4);
    }
  }, []);

  const createCheckout = async () => {
    if (!client.email || !selectedServices.length || paying) return;
    setPaying(true); setSendMessage("");
    try {
      const response = await fetch("/api/create-checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "checkout", sectorId, situation, budget, selectedServices, client }) });
      const data = await response.json() as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error || "Impossible de préparer le règlement.");
      setCheckoutUrl(data.url); window.location.href = data.url;
    } catch (error) { setSendMessage(error instanceof Error ? error.message : "Impossible de préparer le règlement."); } finally { setPaying(false); }
  };

  const reset = () => { setStep(0); setSectorId(""); setGoal(""); setSituation(""); setBudget(""); setDiscovery(""); setSelectedServices([]); setClient({ company: "", name: "", email: "", whatsapp: "", website: "" }); setGenerated(false); setSendMessage(""); };
  const quoteDownloadLabel = sending ? "Génération du PDF…" : generated ? "Télécharger à nouveau →" : "Télécharger mon devis PDF →";
  const handleQuoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!client.company || !client.name || !client.email || !client.whatsapp || sending) return;
    void generatePdf();
  };

  const recommendation = useMemo(() => {
    if (!sector || !discoveryChoice) return "";
    const channel = discovery === "google" ? "Google et la visibilité locale" : discovery === "social" ? "les réseaux sociaux" : discovery === "referral" ? "la conversion du bouche-à-oreille" : "la complémentarité de vos canaux";
    const budgetText = budget === "under500" ? "un premier levier ciblé" : budget === "500_1000" ? "une présence solide sans disperser le budget" : budget === "1000_2500" ? "un dispositif cohérent qui couvre votre socle digital et votre acquisition" : "un dispositif plus complet, sans ajouter des prestations qui ne servent pas votre objectif";
    return `Pour ${sector.label.toLowerCase()}, XR Quote Studio recommande ${budgetText}, en donnant la priorité à ${activeRecommended.map((id) => SERVICES.find((x) => x.id === id)?.label).filter(Boolean).join(", ")}. Votre choix de ${channel} renforce cette recommandation.`;
  }, [sector, discoveryChoice, discovery, budget, activeRecommended]);

  const titles = ["Votre activité", "Votre priorité", "Votre situation aujourd'hui", "L'investissement envisagé", "Les prestations à activer", "Comment vos clients vous trouvent", "Votre recommandation", "Vos informations"];
  const progress = ((step + 1) / 8) * 100;
  const card = (item: Choice, onClick: () => void, selected = false) => (
    <button
      key={item.id}
      type="button"
      onClick={onClick}
      className={"choice-card group relative w-full overflow-hidden rounded-[1.35rem] border p-4 text-left transition-all duration-300 " + (selected ? "is-active border-white/35 bg-white/[.09] text-white" : "border-white/10 bg-white/[.025] text-white/72")}
    >
      <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/[.04] blur-2xl transition-transform duration-500 group-hover:scale-150" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <span className="mb-2 inline-flex rounded-full border border-white/10 bg-black/15 px-2 py-1 label-mono text-[7px] tracking-[.14em] text-white/28">XR / OPTION</span>
          <span className="block text-[11px] font-semibold leading-4 text-white/90 sm:text-sm">{item.label}</span>
          <span className="mt-1.5 block text-[9px] leading-4 text-white/38">{item.detail}</span>
        </div>
        <span className={"mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all " + (selected ? "border-white/30 bg-white text-black" : "border-white/10 bg-white/[.03] text-white/25 group-hover:border-white/25 group-hover:text-white/70")}>{selected ? <Check className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}</span>
      </div>
    </button>
  );

  const totalLabel = once > 0 && monthly > 0
    ? once.toLocaleString("fr-FR") + " € + " + monthly.toLocaleString("fr-FR") + " €/mois"
    : once > 0
      ? once.toLocaleString("fr-FR") + " €"
      : monthly > 0
        ? monthly.toLocaleString("fr-FR") + " €/mois"
        : "Sélection en cours";

  const Parallax = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <div style={{ animationDelay: delay + "ms" }} className="animate-[xr-drift_9s_ease-in-out_infinite]">{children}</div>
  );

  const SystemStack = () => (
    <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/25 p-4 sm:p-5">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <span className="label-mono text-[7px] tracking-[.18em] text-white/25">ARCHITECTURE XR</span>
          <p className="mt-1 text-xs font-semibold text-white/82">Votre dispositif digital</p>
        </div>
        <span className="rounded-full border border-white/10 px-2.5 py-1 label-mono text-[6px] tracking-[.16em] text-white/35">{selectedServices.length} BRIQUE{selectedServices.length > 1 ? "S" : ""}</span>
      </div>
      <div className="relative mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/12 bg-white/[.06] p-4 sm:col-span-1">
          <span className="label-mono text-[6px] text-white/25">CORE</span>
          <div className="mt-3 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white text-black font-black tracking-[-.08em]">XR</div>
            <div><p className="text-[10px] font-semibold text-white/82">XRAGENCY</p><p className="mt-1 text-[7px] text-white/30">Stratégie · Design · Croissance</p></div>
          </div>
        </div>
        <div className="relative sm:col-span-2">
          <div aria-hidden className="absolute left-0 top-1/2 hidden h-px w-6 bg-white/10 sm:block" />
          <div className="grid gap-2 sm:grid-cols-2">
            {(selectedServices.length ? selectedServices : ["website", "seo", "social", "branding"]).slice(0,4).map((id, index) => {
              const service = SERVICES.find((x) => x.id === id);
              return (
                <div key={id} className="group rounded-2xl border border-white/9 bg-white/[.025] p-3 transition hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[.05]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="label-mono text-[6px] text-white/24">0{index + 1}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50 transition group-hover:scale-150" />
                  </div>
                  <p className="mt-2 text-[9px] font-semibold text-white/75">{service?.label ?? id}</p>
                  <p className="mt-1 text-[7px] leading-4 text-white/28">{service?.detail ?? "Brique sur mesure du dispositif."}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative mt-4 flex items-center justify-between border-t border-white/8 pt-3">
        <span className="label-mono text-[6px] tracking-[.14em] text-white/22">INVESTISSEMENT ESTIMÉ</span>
        <span className="text-[9px] font-semibold text-white/72">{totalLabel}</span>
      </div>
    </div>
  );

  return (
    <section id="quote" className="relative overflow-hidden border-y border-white/10 bg-[#07090d] py-20 text-white sm:py-28 lg:py-32">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(126,151,255,.08),transparent_25%),radial-gradient(circle_at_92%_72%,rgba(255,255,255,.035),transparent_26%)]" />
      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <Parallax speed={-0.02}>
          <div className="grid gap-7 border-b border-white/10 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="label-mono text-[9px] tracking-[.28em] text-white/48">XR QUOTE STUDIO · DEVIS SUR MESURE</span>
              <h2 className="display-serif mt-4 max-w-4xl text-[clamp(3rem,5.6vw,6rem)] leading-[.84] tracking-[-.055em]">Construisons votre <em className="not-italic text-white/34">propre</em> dispositif.</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/42 sm:text-base">Quelques décisions, une recommandation lisible, puis un devis professionnel généré avec vos informations. Vous gardez la main sur chaque brique.</p>
            </div>
            <div className="hidden min-w-[235px] rounded-[1.5rem] border border-white/10 bg-white/[.035] p-5 backdrop-blur-xl lg:block">
              <span className="label-mono text-[7px] tracking-[.18em] text-white/28">INVESTISSEMENT ACTUEL</span>
              <p className="mt-2 display-serif text-3xl">{totalLabel}</p>
              <p className="mt-2 text-[9px] leading-4 text-white/32">Le montant évolue avec votre sélection.</p>
            </div>
          </div>
        </Parallax>

        <div className="mt-8 grid gap-5 lg:grid-cols-[.32fr_1fr]">
          <Reveal>
            <aside className="rounded-[1.9rem] border border-white/10 bg-white/[.02] p-3 backdrop-blur-xl">
              <div className="px-3 pb-3 pt-2">
                <div className="flex items-center justify-between"><span className="label-mono text-[7px] tracking-[.2em] text-white/28">VOTRE PARCOURS</span><span className="label-mono text-[7px] text-white/22">{String(step + 1).padStart(2,"0")} / 08</span></div>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/8"><div className="h-full rounded-full bg-white/70 transition-all duration-500" style={{width: progress+"%"}} /></div>
              </div>
              <div className="grid gap-1">
                {titles.map((title, index) => (
                  <div key={title} className={"flex items-center gap-3 rounded-xl px-3 py-3 " + (step === index ? "bg-white/[.08]" : "opacity-45")}>
                    <span className={"grid h-7 w-7 place-items-center rounded-lg border text-[7px] " + (step === index ? "border-white/24 bg-white text-black" : "border-white/10 text-white/40")}>{String(index + 1).padStart(2,"0")}</span>
                    <span className="min-w-0"><span className="block truncate text-[9px] font-semibold text-white/78">{title}</span><span className="mt-0.5 block label-mono text-[6px] tracking-[.14em] text-white/25">{index < step ? "COMPLÉTÉ" : index === step ? "EN COURS" : "À VENIR"}</span></span>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-[1.4rem] border border-white/8 bg-black/20 p-4">
                <span className="label-mono text-[7px] text-white/26">SYSTÈME</span>
                <p className="mt-1 text-sm font-semibold text-white/84">{selectedServices.length || 0} brique(s) activée(s)</p>
                <p className="mt-1 text-[9px] leading-4 text-white/34">{totalLabel}</p>
                {selectedServices.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{selectedServices.map(id => <span key={id} className="rounded-full border border-white/10 bg-white/[.035] px-2 py-1 label-mono text-[6px] text-white/42">{proposals.find(p=>p.id===id)?.label ?? id}</span>)}</div>}
              </div>
            </aside>
          </Reveal>

          <Reveal delay={80}>
            <div ref={journeyRef} className="overflow-hidden rounded-[2.1rem] border border-white/10 bg-[#0a0d12] p-5 shadow-[0_60px_160px_-80px_rgba(0,0,0,.98)] sm:p-7 lg:p-9">
              <div className="flex items-end justify-between gap-3 border-b border-white/10 pb-5">
                <div><span className="label-mono text-[7px] tracking-[.2em] text-white/28">{step >= 7 ? "FINALISATION" : "QUESTION " + String(step + 1).padStart(2,"0")}</span><h3 className="mt-2 text-xl font-semibold tracking-[-.03em] sm:text-2xl">{titles[step]}</h3></div>
                {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-2 label-mono text-[7px] text-white/40 hover:border-white/20 hover:text-white/70"><ChevronRight className="h-3 w-3 rotate-180"/>Retour</button>}
              </div>

              <div className="mt-6">
                {step === 0 && <div className="space-y-5"><SystemStack/><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{(showAllSectors ? SECTORS : SECTORS.slice(0,6)).map((x,i)=><button key={x.id} type="button" onClick={()=>{setSectorId(x.id);window.setTimeout(()=>setStep(1),180)}} className="group rounded-[1.3rem] border border-white/8 bg-white/[.018] p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[.04]"><span className="label-mono text-[6px] text-white/24">0{String(i+1)}</span><span className="mt-2 block text-[10px] font-semibold text-white/84">{x.label}</span><span className="mt-1.5 block text-[8px] leading-4 text-white/34">{x.detail}</span></button>)}</div><button type="button" onClick={()=>setShowAllSectors(v=>!v)} className="w-full rounded-full border border-dashed border-white/10 py-3 label-mono text-[7px] tracking-[.14em] text-white/32 hover:border-white/24 hover:text-white/55">{showAllSectors ? "Réduire les activités" : "Voir toutes les activités"}</button></div>}

                {step === 1 && sector && <div className="space-y-5"><div className="rounded-[1.5rem] border border-white/10 bg-white/[.025] p-5"><span className="label-mono text-[7px] text-white/28">CONTEXTE</span><p className="mt-2 text-xl font-semibold text-white/88">{sector.label}</p><p className="mt-1 text-[10px] leading-5 text-white/34">{sector.detail}</p></div><div className="grid gap-2 sm:grid-cols-3">{sector.goals.map(x=>card({id:x,label:x,detail:"Priorité déclarée pour votre activité"},()=>choose(setGoal,x,2)))}</div></div>}

                {step === 2 && <div className="grid gap-2 sm:grid-cols-2">{SITUATIONS.map(x=>card(x,()=>choose(setSituation,x.id,3),x.id===situation))}</div>}

                {step === 3 && <div className="space-y-5"><div className="grid gap-2 sm:grid-cols-3">{BUDGETS.map(x=>card(x,()=>{setBudget(x.id);setSelectedServices([]);window.setTimeout(()=>setStep(4),180)},x.id===budget))}</div><SystemStack/></div>}

                {step === 4 && <div className="space-y-5"><SystemStack/><div className="rounded-[1.5rem] border border-white/10 bg-white/[.025] p-5"><div className="flex items-center justify-between gap-3"><div><span className="label-mono text-[7px] text-white/28">SÉLECTION PRÉPARÉE</span><p className="mt-1 text-sm font-semibold text-white/84">XR Quote Studio a fait un premier tri pour vous.</p></div><Sparkles className="h-4 w-4 text-white/55"/></div><p className="mt-2 text-[10px] leading-5 text-white/34">Les prestations affichées tiennent compte du profil, de la situation et du budget déclaré. Ajustez-les librement.</p></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{orderedServices.map(x=>card(x,()=>toggleService(x.id),selectedServices.includes(x.id)))}</div><button type="button" disabled={!selectedServices.length} onClick={()=>setStep(5)} className="w-full rounded-full bg-white px-5 py-3.5 label-mono text-[8px] font-semibold tracking-[.15em] text-black disabled:opacity-30">Valider ma sélection →</button></div>}

                {step === 5 && <div className="space-y-4"><div className="rounded-[1.5rem] border border-white/10 bg-white/[.025] p-5"><span className="label-mono text-[7px] text-white/28">ACQUISITION</span><p className="mt-1 text-sm font-semibold text-white/84">Par quel canal vos clients vous trouvent-ils aujourd'hui ?</p></div><div className="grid gap-2 sm:grid-cols-2">{DISCOVERY.map(x=>card(x,()=>choose(setDiscovery,x.id,6),x.id===discovery))}</div></div>}

                {step === 6 && sector && <div className="space-y-5"><SystemStack/><div className="rounded-[1.6rem] border border-white/14 bg-white/[.055] p-6"><span className="label-mono text-[7px] tracking-[.18em] text-white/30">CONSEIL XR QUOTE STUDIO</span><p className="mt-3 max-w-3xl text-lg leading-7 text-white/82 sm:text-2xl">{recommendation}</p><div className="mt-5 grid gap-2 sm:grid-cols-2">{selectedServices.map(id=>{const p=proposals.find(x=>x.id===id);return p?<div key={id} className="flex items-start justify-between gap-4 rounded-xl border border-white/8 bg-black/15 p-3"><div><span className="block text-[10px] font-semibold text-white/74">{p.label}</span><span className="mt-1 block text-[8px] leading-4 text-white/30">{p.detail}</span></div><span className="shrink-0 text-[9px] font-semibold text-white/70">{p.custom?"Sur devis":p.price.toLocaleString("fr-FR")+" €"+(p.period==="month"?" / mois":"")}</span></div>:null})}</div></div><div className="grid gap-2 sm:grid-cols-2"><div className="rounded-[1.3rem] border border-white/8 bg-white/[.02] p-4"><span className="label-mono text-[7px] text-white/25">PONCTUEL</span><p className="mt-1 display-serif text-3xl">{once.toLocaleString("fr-FR")} €</p></div><div className="rounded-[1.3rem] border border-white/8 bg-white/[.02] p-4"><span className="label-mono text-[7px] text-white/25">MENSUEL</span><p className="mt-1 display-serif text-3xl">{monthly.toLocaleString("fr-FR")} €<span className="text-sm text-white/30"> / mois</span></p></div></div><div className="grid gap-2 sm:grid-cols-2"><button type="button" onClick={()=>setStep(7)} className="rounded-full bg-white px-5 py-4 label-mono text-[8px] font-semibold tracking-[.15em] text-black">Recevoir mon devis PDF →</button><a href={"https://wa.me/33767566783?text="+encodeURIComponent("Bonjour XR Agency, j'ai terminé mon diagnostic XR Quote Studio. Secteur : "+sector.label+". Budget : "+budgetChoice?.label+". Prestations : "+selectedServices.map(id=>proposals.find(p=>p.id===id)?.label).filter(Boolean).join(", ")+". Total : "+once.toLocaleString("fr-FR")+" € + "+monthly.toLocaleString("fr-FR")+" €/mois.")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-4 label-mono text-[8px] tracking-[.15em] text-white/60 hover:border-white/22 hover:text-white"><MessageCircle className="h-3.5 w-3.5"/>Continuer sur WhatsApp</a></div></div>}

                {step === 7 && <div className="space-y-5"><div className="rounded-[1.5rem] border border-white/10 bg-white/[.025] p-5"><span className="label-mono text-[7px] tracking-[.18em] text-white/28">IDENTITÉ CLIENT</span><p className="mt-2 text-lg font-semibold text-white/86">Le devis sera généré avec vos informations et celles de XRAGENCY.</p></div><form onSubmit={handleQuoteSubmit} className="space-y-3"><div className="grid gap-3 sm:grid-cols-2"><input value={client.company} onChange={e=>setClient({...client,company:e.target.value})} placeholder="Entreprise / société *" autoComplete="organization" className="w-full rounded-2xl border border-white/10 bg-white/[.035] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30" required/><input value={client.name} onChange={e=>setClient({...client,name:e.target.value})} placeholder="Nom du représentant *" autoComplete="name" className="w-full rounded-2xl border border-white/10 bg-white/[.035] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30" required/><input value={client.email} onChange={e=>setClient({...client,email:e.target.value})} type="email" placeholder="E-mail professionnel *" autoComplete="email" className="w-full rounded-2xl border border-white/10 bg-white/[.035] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30" required/><input value={client.whatsapp} onChange={e=>setClient({...client,whatsapp:e.target.value})} type="tel" placeholder="Téléphone / WhatsApp *" autoComplete="tel" className="w-full rounded-2xl border border-white/10 bg-white/[.035] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30" required/></div><input value={client.website} onChange={e=>setClient({...client,website:e.target.value})} type="url" placeholder="Site web de l'entreprise (facultatif)" autoComplete="url" className="w-full rounded-2xl border border-white/10 bg-white/[.035] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"/><button type="submit" disabled={!client.company||!client.name||!client.email||!client.whatsapp||sending} className="w-full rounded-full bg-white px-5 py-4 label-mono text-[8px] font-semibold tracking-[.15em] text-black disabled:opacity-30">{quoteDownloadLabel}</button></form>{generated&&<div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[.05] p-4"><p className="text-sm font-medium text-white/86">Devis généré ✓</p><p className="mt-1 text-[9px] leading-5 text-white/38">Le document a été téléchargé. Vous pouvez le conserver, l'imprimer ou nous l'envoyer ensuite.</p></div>}{sendMessage&&<div aria-live="polite" className="rounded-2xl border border-white/10 bg-white/[.03] p-4 text-center text-[9px] leading-5 text-white/38">{sendMessage}</div>}<div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4"><button type="button" onClick={reset} className="inline-flex items-center gap-1.5 label-mono text-[7px] text-white/30 hover:text-white/62"><RotateCcw className="h-3 w-3"/>Recommencer</button><span className="label-mono text-[7px] tracking-[.14em] text-white/22">XRAGENCY · DEVIS PERSONNALISÉ</span></div></div>}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}