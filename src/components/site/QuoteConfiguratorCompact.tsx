import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { ArrowRight, Check, Mail, MessageCircle, RotateCcw, Sparkles } from "lucide-react";
import { Alexandre3D } from "./Alexandre3D";

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
const SERVICE_ORDER: Record<string, string[]> = {
  hospitality: ["websites", "maps", "social", "seo", "branding", "maintenance"],
  realestate: ["websites", "maps", "branding", "seo", "social", "maintenance"],
  professional: ["websites", "seo", "branding", "maps", "strategy", "maintenance"],
  commerce: ["websites", "social", "seo", "branding", "maps", "maintenance"],
  other: ["websites", "branding", "seo", "maps", "strategy", "maintenance"],
};
const BASE_PRICES: Record<string, number> = {
  websites: 499,
  ecommerce: 799,
  refonte: 499,
  branding: 199,
  seo: 299,
  maps: 999,
  social: 299,
  ads: 499,
  strategy: 799,
  maintenance: 29,
};

export function QuoteConfiguratorCompact() {
  const [step, setStep] = useState(0); const [sectorId, setSectorId] = useState(""); const [goal, setGoal] = useState(""); const [situation, setSituation] = useState(""); const [budget, setBudget] = useState(""); const [discovery, setDiscovery] = useState(""); const [selectedServices, setSelectedServices] = useState<string[]>([]); const [client, setClient] = useState({ name: "", email: "", whatsapp: "" }); const [generated, setGenerated] = useState(false); const [sending, setSending] = useState(false); const [sendMessage, setSendMessage] = useState("");
  const sector = SECTORS.find((x) => x.id === sectorId); const situationChoice = SITUATIONS.find((x) => x.id === situation); const budgetChoice = BUDGETS.find((x) => x.id === budget); const discoveryChoice = DISCOVERY.find((x) => x.id === discovery); const orderedServices = (SERVICE_ORDER[sectorId] ?? SERVICE_ORDER.other).map((id) => SERVICES.find((x) => x.id === id)).filter(Boolean) as Choice[];
  const proposals = useMemo<Proposal[]>(() => {
    const priority = situation === "selling"
      ? ["ecommerce", "maps", "social", "seo"]
      : situation === "redesign"
        ? ["refonte", "seo", "branding", "maps"]
        : situation === "existing"
          ? ["seo", "maps", "social", "maintenance"]
          : ["websites", "branding", "seo", "maps"];
    const ids = [...priority, ...orderedServices.map((service) => service.id)].filter((id, index, arr) => arr.indexOf(id) === index).slice(0, 5);
    return ids.map((id) => {
      const service = SERVICES.find((x) => x.id === id);
      if (!service) return null;
      const price = BASE_PRICES[id] ?? service.fromEur;
      const period = service.fromPeriod === "month" ? "month" : "once";
      return {
        id,
        label: service.title,
        detail: service.description,
        price,
        period,
      };
    }).filter(Boolean) as Proposal[];
  }, [orderedServices, situation]);
  const total = selectedServices.reduce((sum, id) => sum + (proposals.find((x) => x.id === id)?.price ?? 0), 0); const monthly = selectedServices.reduce((sum, id) => { const p = proposals.find((x) => x.id === id); return sum + (p?.period === "month" ? p.price : 0); }, 0); const once = total - monthly;
  const choose = (setter: (value: string) => void, value: string, next: number) => { setter(value); window.setTimeout(() => setStep(next), 180); }; const toggleService = (id: string) => setSelectedServices((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  const reset = () => { setStep(0); setSectorId(""); setGoal(""); setSituation(""); setBudget(""); setDiscovery(""); setSelectedServices([]); setClient({ name: "", email: "", whatsapp: "" }); setGenerated(false); setSendMessage(""); };
  const recommendation = useMemo(() => { if (!sector || !discoveryChoice) return ""; const channel = discovery === "google" ? "la recherche Google et la visibilité locale" : discovery === "social" ? "les réseaux sociaux et leur capacité à convertir" : discovery === "referral" ? "la transformation du bouche-à-oreille en demandes qualifiées" : "la complémentarité de vos canaux d'acquisition"; const objective = goal.toLowerCase().includes("réservation") ? "le parcours de réservation et la conversion" : goal.toLowerCase().includes("vente") || goal.toLowerCase().includes("vendre") ? "le parcours commercial et la conversion" : goal.toLowerCase().includes("local") || goal.toLowerCase().includes("google") ? "la visibilité sur les recherches à forte intention" : goal.toLowerCase().includes("gamme") || goal.toLowerCase().includes("premium") ? "la perception premium et l'expérience de marque" : "la crédibilité et l'acquisition"; return `Pour ${sector.label.toLowerCase()}, Alexandre recommande de travailler en priorité ${objective}, tout en renforçant ${channel}.`; }, [sector, discovery, discoveryChoice, goal]);

  const generatePdf = async () => {
    if (!client.name || !client.email || !client.whatsapp || !selectedServices.length || sending) return;
    setSending(true); setSendMessage("");
    const doc = new jsPDF({ unit: "mm", format: "a4" }); const quoteNumber = `XR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`; let y = 22;
    doc.setFont("helvetica", "bold"); doc.setFontSize(22); doc.text("XRAGENCY", 20, y); doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.text("Studio digital premium · Devis personnalisé avec Alexandre", 20, y + 7); doc.setDrawColor(210); doc.line(20, y + 12, 190, y + 12); y += 25;
    doc.setFont("helvetica", "bold"); doc.setFontSize(15); doc.text("DEVIS PERSONNALISÉ", 20, y); y += 9; doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.text(`Référence : ${quoteNumber}`, 20, y); doc.text(`Date : ${new Date().toLocaleDateString("fr-FR")}`, 145, y); y += 14;
    doc.setFont("helvetica", "bold"); doc.text("Votre entreprise", 20, y); doc.setFont("helvetica", "normal"); y += 6; doc.text(`Nom : ${client.name}`, 20, y); doc.text(`Email : ${client.email}`, 20, y + 5); doc.text(`WhatsApp : ${client.whatsapp}`, 20, y + 10); y += 20;
    doc.setFont("helvetica", "bold"); doc.text("Contexte analysé avec Alexandre", 20, y); doc.setFont("helvetica", "normal"); y += 6; const contextLines = doc.splitTextToSize(`Secteur : ${sector?.label ?? "—"} · Objectif : ${goal || "—"} · Situation : ${situationChoice?.label ?? "—"} · Budget : ${budgetChoice?.label ?? "—"} · Acquisition : ${discoveryChoice?.label ?? "—"}`, 170); doc.text(contextLines, 20, y); y += contextLines.length * 5 + 8;
    doc.setFont("helvetica", "bold"); doc.text("Prestations proposées", 20, y); y += 8; selectedServices.forEach((id) => { const p = proposals.find((x) => x.id === id); if (!p) return; doc.setFont("helvetica", "bold"); doc.text(p.label, 20, y); doc.setFont("helvetica", "normal"); doc.text(`${p.detail} · ${p.price.toLocaleString("fr-FR")} €${p.period === "month" ? " / mois" : ""}`, 20, y + 5); y += 13; if (y > 255) { doc.addPage(); y = 22; } });
    doc.line(20, y, 190, y); y += 9; doc.setFont("helvetica", "bold"); doc.text(`Total prestations ponctuelles : ${once.toLocaleString("fr-FR")} €`, 20, y); y += 6; doc.text(`Abonnements mensuels : ${monthly.toLocaleString("fr-FR")} € / mois`, 20, y); y += 12; doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.text("KARMA SASU · SIREN 889 178 141 · 78 Avenue des Champs-Élysées, Bureau 562, 75008 Paris", 20, 276); doc.text("contact.xragency@gmail.com · +33 7 67 56 67 83", 20, 281);
    const blob = doc.output("blob"); const base64 = doc.output("datauristring").split(",")[1]; const file = new File([blob], `${quoteNumber}-XRAGENCY.pdf`, { type: "application/pdf" }); doc.save(file.name); setGenerated(true);
    try { const response = await fetch("/api/send-quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: client.email, name: client.name, pdfBase64: base64, quoteNumber }) }); const result = await response.json(); if (response.ok) setSendMessage(`Devis envoyé à ${client.email}.`); else setSendMessage("Le PDF est généré. L'envoi automatique par e-mail nécessite la configuration de l'adresse d'envoi XRAGENCY."); } catch { setSendMessage("Le PDF est généré. Utilisez le bouton Partager pour l'envoyer par WhatsApp ou e-mail."); }
    if (navigator.share && navigator.canShare?.({ files: [file] })) { try { await navigator.share({ title: "Votre devis XRAGENCY", text: "Votre devis personnalisé réalisé avec Alexandre.", files: [file] }); } catch { /* user cancelled */ } }
    setSending(false);
  };

  const titles = ["D'abord, votre activité.", "Votre priorité ?", "Votre situation aujourd'hui ?", "Quel investissement envisagez-vous ?", "Quelles expertises activer ?", "Comment vos clients vous trouvent-ils ?", "Votre sélection est prête.", "Vos coordonnées"]; const progress = ((step + 1) / 8) * 100; const card = (item: Choice, onClick: () => void, selected = false) => <button key={item.id} type="button" onClick={onClick} className={`group w-full rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg ${selected ? "border-primary bg-primary/[0.07] shadow-md" : "border-border bg-background"}`}><div className="flex items-center justify-between gap-2"><span className="text-[11px] font-medium leading-tight sm:text-sm">{item.label}</span>{selected ? <Check className="h-3.5 w-3.5 text-primary" /> : <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary" />}</div><div className="mt-1 hidden text-[9px] leading-4 text-muted-foreground sm:block">{item.detail}</div></button>;

  return <section id="intelligence" className="relative overflow-hidden border-y border-border/50 bg-background py-10 sm:py-16"><div className="relative mx-auto max-w-5xl px-4 sm:px-6"><div className="mb-7 grid gap-7 lg:grid-cols-[auto_1fr] lg:items-end"><div className="flex items-center gap-3"><div className="rounded-2xl border border-primary/20 bg-card/60 shadow-[0_0_60px_-25px_var(--primary)]"><Alexandre3D /></div><div><div className="label-mono text-[9px] uppercase tracking-[0.22em] text-primary">XR INTELLIGENCE</div><div className="mt-1 text-sm text-muted-foreground sm:text-base">Alexandre — votre intelligence digitale</div></div></div><div><p className="label-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">01 · Diagnostic intelligent</p><h2 className="mt-2 text-3xl font-medium tracking-[-0.045em] sm:text-5xl">Parlez à <em className="text-primary not-italic italic">Alexandre.</em></h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Quelques questions. Une lecture de votre activité. Un plan d’action digital construit autour de vos priorités.</p></div><div className="flex items-center gap-1.5"><div className="h-1 w-10 overflow-hidden rounded-full bg-muted sm:w-16"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div><span className="label-mono text-[7px] text-muted-foreground">{String(step + 1).padStart(2, "0")}/08</span></div></div>
    <div className="rounded-[1.5rem] border border-primary/15 bg-card/80 p-3 shadow-[0_30px_90px_-55px_var(--primary)] backdrop-blur-sm sm:p-6"><div className="mb-3 flex items-end justify-between gap-2"><div><p className="label-mono text-[7px] uppercase tracking-[0.18em] text-muted-foreground">{step >= 7 ? "Finalisation" : `Question ${step + 1} sur 8`}</p><h2 className="mt-1 text-base font-medium tracking-[-0.03em] sm:text-2xl">{titles[step]}</h2></div>{step > 0 && step < 7 && <button type="button" onClick={() => setStep(step - 1)} className="rounded-full border border-border px-2.5 py-1 text-[10px] text-muted-foreground hover:text-foreground">←</button>}</div>
      {step === 0 && <div><p className="mb-2 text-[9px] text-muted-foreground">Alexandre adapte la suite du diagnostic à votre métier.</p><div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">{SECTORS.map((x) => card(x, () => choose(setSectorId, x.id, 1)))}</div></div>}
      {step === 1 && sector && <div className="grid gap-1.5 sm:grid-cols-3">{sector.goals.map((x) => card({ id: x, label: x, detail: "Priorité adaptée à votre secteur" }, () => choose(setGoal, x, 2)))}</div>}
      {step === 2 && <div className="grid grid-cols-2 gap-1.5">{SITUATIONS.map((x) => card(x, () => choose(setSituation, x.id, 3)))}</div>}
      {step === 3 && <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">{BUDGETS.map((x) => card(x, () => choose(setBudget, x.id, 4)))}</div>}
      {step === 4 && <div><p className="mb-2 text-[9px] text-muted-foreground">Alexandre priorise les expertises les plus pertinentes. Vous pouvez en sélectionner plusieurs.</p><div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">{orderedServices.map((x) => card(x, () => toggleService(x.id), selectedServices.includes(x.id)))}</div><button type="button" disabled={!selectedServices.length} onClick={() => setStep(5)} className="mt-3 w-full rounded-full bg-primary px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground disabled:opacity-40">Continuer avec ma sélection →</button></div>}
      {step === 5 && <div><p className="mb-2 text-[9px] text-muted-foreground">Dernière question d'acquisition.</p><div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">{DISCOVERY.map((x) => card(x, () => choose(setDiscovery, x.id, 6)))}</div></div>}
      {step === 6 && sector && <div className="space-y-3"><div className="rounded-2xl border border-primary/30 bg-primary/[0.06] p-4"><div className="flex items-center gap-2 text-xs font-semibold"><Sparkles className="h-4 w-4 text-primary" /> Recommandation d'Alexandre</div><p className="mt-2 text-xs leading-5 sm:text-sm">{recommendation}</p></div><div className="grid gap-2 sm:grid-cols-2">{selectedServices.map((id) => { const p = proposals.find((x) => x.id === id); return p ? <div key={id} className="flex items-center justify-between rounded-xl border border-border bg-background p-3"><div><div className="text-xs font-medium">{p.label}</div><div className="text-[9px] text-muted-foreground">{p.detail}</div></div><div className="text-right text-xs font-semibold text-primary">À partir de {p.price.toLocaleString("fr-FR")} €{p.period === "month" ? " / mois" : ""}</div></div> : null; })}</div><div className="rounded-xl border border-border bg-background p-3 text-xs"><div className="flex justify-between"><span>Prestations ponctuelles</span><strong>{once.toLocaleString("fr-FR")} €</strong></div><div className="mt-1 flex justify-between"><span>Abonnements mensuels</span><strong>{monthly.toLocaleString("fr-FR")} € / mois</strong></div></div><button type="button" onClick={() => setStep(7)} className="w-full rounded-full bg-primary px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">Recevoir mon devis PDF →</button></div>}
      {step === 7 && <div className="space-y-2.5"><p className="text-[9px] text-muted-foreground">Entrez vos coordonnées. Alexandre prépare le PDF avec le contexte, les prestations sélectionnées et les montants.</p><input value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} placeholder="Nom / entreprise" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" /><input value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} type="email" placeholder="Votre e-mail" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" /><input value={client.whatsapp} onChange={(e) => setClient({ ...client, whatsapp: e.target.value })} placeholder="Votre WhatsApp / téléphone" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" /><button type="button" disabled={!client.name || !client.email || !client.whatsapp || sending} onClick={generatePdf} className="w-full rounded-full bg-primary px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground disabled:opacity-40">{sending ? "Génération et envoi…" : generated ? "Générer / renvoyer le devis PDF →" : "Générer mon devis PDF →"}</button>{sendMessage && <div className="rounded-xl border border-primary/25 bg-primary/[0.05] p-3 text-center text-[10px] leading-5 text-muted-foreground">{sendMessage}</div>}<div className="grid grid-cols-2 gap-2"><a href={`https://wa.me/33767566783?text=${encodeURIComponent(`Bonjour XR Agency, je viens de préparer un devis avec Alexandre. Nom : ${client.name}. Email : ${client.email}. WhatsApp : ${client.whatsapp}. Total estimé : ${once.toLocaleString("fr-FR")} € + ${monthly.toLocaleString("fr-FR")} €/mois.`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 text-[10px] font-semibold uppercase tracking-wider"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</a><a href={`mailto:${client.email}?subject=${encodeURIComponent("Votre devis XRAGENCY")}&body=${encodeURIComponent("Votre devis PDF a été généré avec Alexandre. Si l'envoi automatique n'est pas disponible, vous pouvez partager le PDF généré depuis votre appareil.")}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 text-[10px] font-semibold uppercase tracking-wider"><Mail className="h-3.5 w-3.5" /> E-mail</a></div><button type="button" onClick={reset} className="mx-auto flex items-center gap-1 text-[9px] text-muted-foreground hover:text-foreground"><RotateCcw className="h-3 w-3" /> Recommencer</button></div>}
    </div></div></section>;
}
