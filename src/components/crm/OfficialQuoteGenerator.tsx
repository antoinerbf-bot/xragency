import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  Download,
  CheckCircle2,
  Plus,
  Trash2,
  PenTool,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { XR_ADVISORS, type XRAdvisor } from "../../lib/xr-advisors";
import { playXpChime, triggerVictoryConfetti } from "../../lib/rpg-engine";

export interface CatalogItem {
  id: string;
  category:
    | "MAPS_NFC"
    | "WEBSITES"
    | "SEO"
    | "BRANDING"
    | "WEBCARE"
    | "AUTOMATISATION_IA"
    | "ROBOTIQUE"
    | "SOCIAL";
  title: string;
  description: string;
  unitPriceHt: number;
  billing: "ONE_SHOT" | "MONTHLY";
  advisorId: string;
}

export const XR_OFFICIAL_CATALOG: CatalogItem[] = [
  {
    id: "cat-maps-top3-guaranteed",
    category: "MAPS_NFC",
    title: "Offre Google Maps Top 3 Garanti 1 An (Ou Remboursé)",
    description:
      "Garantie contractuelle d'apparition dans le Top 3 Google Maps 24h/24 et 7j/7 pendant 1 an. Optimisation GBP complète, géocodage et citations NAP.",
    unitPriceHt: 999,
    billing: "ONE_SHOT",
    advisorId: "martin",
  },
  {
    id: "cat-maps-management-annual",
    category: "MAPS_NFC",
    title: "Gestion & Pilotage Annuel Fiche Google Maps",
    description:
      "Mise à jour hebdomadaire des photos géolocalisées, Google Posts réguliers, modération et réponses 5★, veille anti-modifications.",
    unitPriceHt: 500,
    billing: "ONE_SHOT",
    advisorId: "martin",
  },
  {
    id: "cat-web-vitrine",
    category: "WEBSITES",
    title: "Site Vitrine Pro Haute Conversion (Livré en 7 jours)",
    description:
      "Design Dark Luxury sur-mesure, score Lighthouse 99+, copywriting orienté prise de RDV, mobile-first.",
    unitPriceHt: 499,
    billing: "ONE_SHOT",
    advisorId: "romain",
  },
  {
    id: "cat-web-business",
    category: "WEBSITES",
    title: "Site Business Sur-Mesure + Tunnel Devis & SEO",
    description:
      "Architecture multi-services, simulateur de devis intégré, SEO technique natif, tracking appels/leads.",
    unitPriceHt: 799,
    billing: "ONE_SHOT",
    advisorId: "romain",
  },
  {
    id: "cat-web-flagship",
    category: "WEBSITES",
    title: "Site E-Commerce / Flagship Sur-Mesure Luxury",
    description:
      "Expérience signature complète, boutique en ligne ou catalogue avancé, intégration CRM et portail client.",
    unitPriceHt: 1499,
    billing: "ONE_SHOT",
    advisorId: "romain",
  },
  {
    id: "cat-crm-pos",
    category: "AUTOMATISATION_IA",
    title: "Logiciel CRM & Système de Caisse POS Sur-Mesure",
    description:
      "Système de caisse complet, gestion des stocks, CRM client automatisé et relances WhatsApp Business.",
    unitPriceHt: 2000,
    billing: "ONE_SHOT",
    advisorId: "romain",
  },
  {
    id: "cat-seo-protocol",
    category: "SEO",
    title: "Protocole SEO Chirurgical en 4 Étapes (Acquisition Organique)",
    description:
      "1. Audit technique profond · 2. Architecture cocons sémantiques · 3. Pages locales haute intention · 4. Netlinking d'autorité.",
    unitPriceHt: 950,
    billing: "MONTHLY",
    advisorId: "hugo",
  },
  {
    id: "cat-branding-lux",
    category: "BRANDING",
    title: "Identité Visuelle & Charte Éditoriale Dark Luxury",
    description:
      "Logotype vectoriel, système typographique, palette chromatique, Brand Book complet et papeterie.",
    unitPriceHt: 1290,
    billing: "ONE_SHOT",
    advisorId: "christelle",
  },
  {
    id: "cat-webcare-pro",
    category: "WEBCARE",
    title: "Abonnement WebCare Pro — Maintenance, Sécurité & Modifications",
    description:
      "Hébergement haute vitesse, sauvegardes quotidiennes, SLA < 4h, modifications mensuelles par Julie.",
    unitPriceHt: 149,
    billing: "MONTHLY",
    advisorId: "julie",
  },
  {
    id: "cat-ai-automation",
    category: "AUTOMATISATION_IA",
    title: "Système d'Automatisation IA & Workflows Autonomes (CRM & WhatsApp)",
    description:
      "Agents IA de qualification 24/7, relances automatisées WhatsApp Business, synchronisation Supabase & reporting Direction.",
    unitPriceHt: 1490,
    billing: "ONE_SHOT",
    advisorId: "romain",
  },
  {
    id: "cat-robotique-pos",
    category: "ROBOTIQUE",
    title: "Terminal Caisse Tactile POS + Intégration Bornes / Robotique",
    description:
      "Déploiement matériel sur site, synchronisation catalogue, formation équipe et maintenance terrain.",
    unitPriceHt: 2890,
    billing: "ONE_SHOT",
    advisorId: "damien",
  },
  {
    id: "cat-social-growth",
    category: "SOCIAL",
    title: "Direction Social Media & Campagnes Meta Ads Haute Conversion",
    description:
      "Production Reels/Carrousels, retargeting Meta Pixel et pilotage du coût par acquisition.",
    unitPriceHt: 890,
    billing: "MONTHLY",
    advisorId: "edgar",
  },
];

interface SelectedLine {
  item: CatalogItem;
  quantity: number;
}

interface OfficialQuoteGeneratorProps {
  initialClientName?: string;
  initialContactName?: string;
  initialClientEmail?: string;
  initialAdvisorId?: string;
  onQuoteSigned?: (quoteNumber: string, totalHt: number) => void;
}

export function OfficialQuoteGenerator({
  initialClientName = "Clinique Esthétique Vendôme",
  initialContactName = "Dr. Laurent Moreau",
  initialClientEmail = "direction@clinique-vendome.fr",
  initialAdvisorId = "romain",
  onQuoteSigned,
}: OfficialQuoteGeneratorProps) {
  const [quoteNumber] = useState(
    () => `XR-2026-${String(Math.floor(1000 + Math.random() * 9000))}`,
  );
  const [clientCompany, setClientCompany] = useState(initialClientName);
  const [clientContact, setClientContact] = useState(initialContactName);
  const [clientEmail, setClientEmail] = useState(initialClientEmail);
  const [advisorId, setAdvisorId] = useState(initialAdvisorId);
  const [vatRate, setVatRate] = useState<number>(20);
  const [depositPercent, setDepositPercent] = useState<number>(40);

  const [lines, setLines] = useState<SelectedLine[]>([
    { item: XR_OFFICIAL_CATALOG[3], quantity: 1 }, // Site Business Pro 2490€
    { item: XR_OFFICIAL_CATALOG[0], quantity: 1 }, // Maps Domination 690€
    { item: XR_OFFICIAL_CATALOG[1], quantity: 1 }, // Pack NFC 290€
    { item: XR_OFFICIAL_CATALOG[7], quantity: 1 }, // WebCare Pro 149€/mois
  ]);

  // Electronic signature pad
  const sigCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnSignature, setHasDrawnSignature] = useState(false);
  const [signatoryTitle, setSignatoryTitle] = useState(
    "Dr. Laurent Moreau — Bon pour accord",
  );
  const [isSignedOnline, setIsSignedOnline] = useState(false);

  useEffect(() => {
    if (initialClientName) setClientCompany(initialClientName);
    if (initialContactName) {
      setClientContact(initialContactName);
      setSignatoryTitle(`${initialContactName} — Bon pour accord`);
    }
    if (initialAdvisorId) setAdvisorId(initialAdvisorId);
  }, [initialClientName, initialContactName, initialAdvisorId]);

  const currentAdvisor: XRAdvisor =
    XR_ADVISORS.find((a) => a.id === advisorId) || XR_ADVISORS[1];

  const addCatalogItem = (item: CatalogItem) => {
    playXpChime();
    setLines((prev) => {
      const existing = prev.find((l) => l.item.id === item.id);
      if (existing) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, quantity: l.quantity + 1 } : l,
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      setLines((prev) => prev.filter((l) => l.item.id !== id));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.item.id === id ? { ...l, quantity: qty } : l)),
    );
  };

  const oneShotTotalHt = lines
    .filter((l) => l.item.billing === "ONE_SHOT")
    .reduce((sum, l) => sum + l.item.unitPriceHt * l.quantity, 0);

  const monthlyTotalHt = lines
    .filter((l) => l.item.billing === "MONTHLY")
    .reduce((sum, l) => sum + l.item.unitPriceHt * l.quantity, 0);

  const grandTotalHt = oneShotTotalHt + monthlyTotalHt;
  const tvaAmount = Math.round(grandTotalHt * (vatRate / 100));
  const grandTotalTtc = grandTotalHt + tvaAmount;
  const depositAmountTtc = Math.round(grandTotalTtc * (depositPercent / 100));

  // Signature canvas handlers
  const startDraw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : e.nativeEvent.clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : e.nativeEvent.clientY;
    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
    setHasDrawnSignature(true);
  };

  const moveDraw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawing) return;
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : e.nativeEvent.clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : e.nativeEvent.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawnSignature(false);
    setIsSignedOnline(false);
  };

  const handleValidateElectronicSignature = () => {
    setIsSignedOnline(true);
    triggerVictoryConfetti();
    if (onQuoteSigned) {
      onQuoteSigned(quoteNumber, grandTotalHt);
    }
  };

  const exportOfficialVectorPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    // Dark Luxury Prestigious Header
    doc.setFillColor(8, 11, 16); // #080B10
    doc.rect(0, 0, 210, 46, "F");

    doc.setDrawColor(212, 175, 55); // #D4AF37
    doc.setLineWidth(0.7);
    doc.line(15, 42, 195, 42);

    doc.setTextColor(212, 175, 55);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("XR AGENCY", 15, 20);

    doc.setTextColor(248, 250, 252);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(
      "INGÉNIERIE DIGITALE HAUTE CONVERSION • GOOGLE MAPS • IA & ROBOTIQUE",
      15,
      27,
    );
    doc.text("https://xragencyai.com • Direction Commerciale", 15, 33);

    doc.setTextColor(212, 175, 55);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`DEVIS OFFICIEL N° ${quoteNumber}`, 195, 20, { align: "right" });
    doc.setTextColor(200, 208, 220);
    doc.setFontSize(9);
    doc.text(
      `Date d'émission : ${new Date().toLocaleDateString("fr-FR")}`,
      195,
      27,
      { align: "right" },
    );
    doc.text(
      `Conseiller référent : ${currentAdvisor.firstName} (${currentAdvisor.role})`,
      195,
      33,
      { align: "right" },
    );

    // Client & Agency Box
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("DESTINATAIRE DU DEVIS :", 15, 56);
    doc.setFont("helvetica", "normal");
    doc.text(`Société : ${clientCompany}`, 15, 62);
    doc.text(`À l'attention de : ${clientContact}`, 15, 67);
    doc.text(`Email : ${clientEmail}`, 15, 72);

    // Table Header
    let y = 84;
    doc.setFillColor(15, 23, 42);
    doc.rect(15, y, 180, 9, "F");
    doc.setTextColor(212, 175, 55);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("PRESTATION & LIVRABLES XR AGENCY", 18, y + 6);
    doc.text("TYPE", 132, y + 6);
    doc.text("QTÉ", 156, y + 6);
    doc.text("TOTAL HT", 192, y + 6, { align: "right" });

    y += 14;
    doc.setTextColor(15, 23, 42);
    lines.forEach((line) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.text(line.item.title.slice(0, 64), 18, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(
        line.item.billing === "MONTHLY" ? "Mensuel" : "Forfait",
        132,
        y,
      );
      doc.text(String(line.quantity), 158, y);
      doc.setFont("helvetica", "bold");
      doc.text(
        `${(line.item.unitPriceHt * line.quantity).toLocaleString("fr-FR")} €`,
        192,
        y,
        { align: "right" },
      );

      y += 4.5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.8);
      doc.setTextColor(90, 100, 115);
      doc.text(line.item.description.slice(0, 95), 18, y);
      doc.setTextColor(15, 23, 42);
      y += 8;
    });

    // Financial Summary Box
    y = Math.max(y + 4, 175);
    doc.setFillColor(245, 247, 250);
    doc.rect(110, y, 85, 42, "F");
    doc.setDrawColor(212, 175, 55);
    doc.rect(110, y, 85, 42, "S");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text("Total Investissement Initial HT :", 114, y + 8);
    doc.text(`${oneShotTotalHt.toLocaleString("fr-FR")} € HT`, 191, y + 8, {
      align: "right",
    });

    doc.text("Total Accompagnement Mensuel HT :", 114, y + 14);
    doc.text(`${monthlyTotalHt.toLocaleString("fr-FR")} € /mois`, 191, y + 14, {
      align: "right",
    });

    doc.text(`TVA applicable (${vatRate}%) :`, 114, y + 20);
    doc.text(`${tvaAmount.toLocaleString("fr-FR")} €`, 191, y + 20, {
      align: "right",
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("TOTAL GLOBAL TTC :", 114, y + 29);
    doc.text(`${grandTotalTtc.toLocaleString("fr-FR")} € TTC`, 191, y + 29, {
      align: "right",
    });

    doc.setTextColor(16, 185, 129);
    doc.setFontSize(9.5);
    doc.text(`Acompte démarrage (${depositPercent}%) :`, 114, y + 37);
    doc.text(
      `${depositAmountTtc.toLocaleString("fr-FR")} € TTC`,
      191,
      y + 37,
      { align: "right" },
    );

    // Electronic Signature Block
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("SIGNATURE ÉLECTRONIQUE CERTIFIÉE :", 15, y + 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(signatoryTitle, 15, y + 14);
    doc.text(
      isSignedOnline
        ? `Signé électroniquement le ${new Date().toLocaleString("fr-FR")}`
        : "En attente de validation client",
      15,
      y + 20,
    );

    if (sigCanvasRef.current && hasDrawnSignature) {
      try {
        const imgData = sigCanvasRef.current.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 15, y + 23, 60, 22);
      } catch {
        // ignore canvas export issue
      }
    }

    // Mentions Légales Officielles Footer in Vector PDF
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.3);
    doc.line(15, 272, 195, 272);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 110, 125);
    doc.text(
      "MENTIONS LÉGALES & CONDITIONS DE RÈGLEMENT — XR AGENCY (https://xragencyai.com) : Devis valable 15 jours calendaires.",
      15,
      277,
    );
    doc.text(
      `Règlement : Acompte de ${depositPercent}% exigible à la signature électronique (${depositAmountTtc.toLocaleString("fr-FR")} € TTC), solde à la livraison.`,
      15,
      281.5,
    );
    doc.text(
      "Réserve de propriété intellectuelle jusqu'au paiement intégral (Loi n°80-335). Pénalités de retard : 3x taux légal + indemnité forfaitaire de 40 € (Art. L441-10 C. com.).",
      15,
      286,
    );

    doc.save(`Devis-${quoteNumber}-${clientCompany.replace(/\s+/g, "-")}.pdf`);
  };

  return (
    <div
      className="grid grid-cols-1 xl:grid-cols-12 gap-6 text-[#F8FAFC]"
      data-testid="official-quote-generator"
    >
      {/* LEFT COLUMN: CLICKABLE PRESTIGE SERVICE CATALOG */}
      <div className="xl:col-span-5 space-y-4">
        <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
                CATALOGUE STANDARDISÉ XR AGENCY
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Prestations & Options Cliquables
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
              {XR_OFFICIAL_CATALOG.length} briques
            </span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {XR_OFFICIAL_CATALOG.map((item) => {
              const isSelected = lines.some((l) => l.item.id === item.id);
              const itemAdvisor = XR_ADVISORS.find(
                (a) => a.id === item.advisorId,
              );
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => addCatalogItem(item)}
                  data-testid={`catalog-item-${item.id}`}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? "bg-[#D4AF37]/10 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.12)]"
                      : "bg-[#080B10] border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[#D4AF37] border border-[#D4AF37]/30">
                        {item.category}
                      </span>
                      {itemAdvisor && (
                        <span className="text-[11px] text-slate-400">
                          Référent :{" "}
                          <strong className="text-white">
                            {itemAdvisor.firstName}
                          </strong>
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-bold text-white">
                      {item.title}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-sm font-mono font-bold text-[#10B981]">
                      {item.unitPriceHt.toLocaleString("fr-FR")} € HT
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {item.billing === "MONTHLY" ? "/ mois" : "Forfait"}
                    </div>
                    <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-lg bg-[#0F172A] border border-white/10 text-[10px] text-[#D4AF37]">
                      <Plus className="w-3 h-3" /> Ajouter
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: PRESTIGIOUS UNIFIED QUOTE TEMPLATE + ELECTRONIC SIGNATURE */}
      <div className="xl:col-span-7 space-y-4">
        <div className="rounded-2xl bg-[#0F172A] border-2 border-[#D4AF37]/50 overflow-hidden shadow-2xl">
          {/* Prestigious Header with Official XR Agency Logo */}
          <div className="p-6 bg-[#080B10] border-b border-[#D4AF37]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#0F172A] border border-[#D4AF37] flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/logo-xr.png"
                  alt="XR Agency Logo Officiel"
                  className="w-9 h-9 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <span className="font-serif font-bold text-[#D4AF37] text-sm">
                  XR
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold tracking-wider text-white">
                    XR AGENCY
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                    DEVIS OFFICIEL CERTIFIÉ
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  xragencyai.com • Studio Haute Conversion, Domination Maps & IA
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right font-mono">
              <div className="text-sm font-bold text-[#D4AF37]">
                N° {quoteNumber}
              </div>
              <div className="text-xs text-slate-400">
                Validité : 15 jours • Référent : {currentAdvisor.firstName}
              </div>
            </div>
          </div>

          {/* Client & Advisor Metadata Inputs */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-white/10 bg-[#0F172A]/60">
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Entreprise / Établissement Client
              </label>
              <input
                type="text"
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#080B10] border border-white/15 text-sm text-white"
              />
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 pt-1">
                Dirigeant / Signataire
              </label>
              <input
                type="text"
                value={clientContact}
                onChange={(e) => {
                  setClientContact(e.target.value);
                  setSignatoryTitle(`${e.target.value} — Bon pour accord`);
                }}
                className="w-full px-3 py-2 rounded-xl bg-[#080B10] border border-white/15 text-sm text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Conseiller XR Agency Attribué
              </label>
              <select
                value={advisorId}
                onChange={(e) => setAdvisorId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#080B10] border border-white/15 text-sm text-white"
              >
                {XR_ADVISORS.map((adv) => (
                  <option key={adv.id} value={adv.id}>
                    {adv.firstName} — {adv.role} ({adv.specialtyShort})
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Taux TVA
                  </label>
                  <select
                    value={vatRate}
                    onChange={(e) => setVatRate(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#080B10] border border-white/15 text-sm text-white"
                  >
                    <option value={20}>20% (Standard)</option>
                    <option value={0}>0% (Exonéré / Export)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Acompte Signature
                  </label>
                  <select
                    value={depositPercent}
                    onChange={(e) => setDepositPercent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#080B10] border border-white/15 text-sm text-white"
                  >
                    <option value={40}>40% (Standard)</option>
                    <option value={50}>50% (Express 7j)</option>
                    <option value={100}>100% (Comptant -5%)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Prestations Table */}
          <div className="p-6 space-y-3 border-b border-white/10">
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
              Détail des Livrables & Investissement
            </div>

            {lines.length === 0 ? (
              <div className="p-6 rounded-xl bg-[#080B10] border border-white/10 text-center text-xs text-slate-400">
                Cliquez sur une prestation dans le catalogue à gauche pour l'ajouter au devis officiel.
              </div>
            ) : (
              <div className="space-y-2">
                {lines.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[#080B10] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold text-white">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400">
                        {item.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center rounded-lg bg-[#0F172A] border border-white/15">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                          className="px-2.5 py-1 text-xs text-slate-300 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-white">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, quantity + 1)}
                          className="px-2.5 py-1 text-xs text-slate-300 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      <div className="w-28 text-right font-mono">
                        <div className="text-sm font-bold text-[#10B981]">
                          {(item.unitPriceHt * quantity).toLocaleString("fr-FR")} € HT
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.billing === "MONTHLY" ? "/ mois" : "One-shot"}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 0)}
                        className="p-1.5 text-slate-500 hover:text-rose-400"
                        title="Retirer la ligne"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Automatic HT / TTC / Deposit Financial Breakdown */}
          <div className="p-6 bg-[#080B10]/90 border-b border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#0F172A] border border-white/10">
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Setup One-Shot HT
              </div>
              <div
                className="text-lg font-mono font-bold text-white mt-1"
                data-testid="quote-oneshot-ht"
              >
                {oneShotTotalHt.toLocaleString("fr-FR")} €
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#0F172A] border border-white/10">
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Récurrent MRR HT
              </div>
              <div
                className="text-lg font-mono font-bold text-[#D4AF37] mt-1"
                data-testid="quote-monthly-ht"
              >
                {monthlyTotalHt.toLocaleString("fr-FR")} € /m
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#0F172A] border border-white/10">
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Total Global TTC ({vatRate}%)
              </div>
              <div
                className="text-lg font-mono font-bold text-white mt-1"
                data-testid="quote-total-ttc"
              >
                {grandTotalTtc.toLocaleString("fr-FR")} €
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40">
              <div className="text-[10px] font-mono uppercase text-[#10B981]">
                Acompte ({depositPercent}%) TTC
              </div>
              <div
                className="text-lg font-mono font-bold text-[#10B981] mt-1"
                data-testid="quote-deposit-ttc"
              >
                {depositAmountTtc.toLocaleString("fr-FR")} €
              </div>
            </div>
          </div>

          {/* Electronic Signature Online Pad + Vector PDF Export */}
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                  Signature Électronique en Ligne (Valeur Probante)
                </span>
              </div>
              <button
                type="button"
                onClick={clearSignature}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Effacer le tracé
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="rounded-xl bg-[#080B10] border-2 border-dashed border-[#D4AF37]/50 p-2">
                <canvas
                  ref={sigCanvasRef}
                  width={320}
                  height={110}
                  onMouseDown={startDraw}
                  onMouseMove={moveDraw}
                  onMouseUp={endDraw}
                  onMouseLeave={endDraw}
                  onTouchStart={startDraw}
                  onTouchMove={moveDraw}
                  onTouchEnd={endDraw}
                  data-testid="quote-signature-canvas"
                  className="w-full h-[110px] cursor-crosshair touch-none"
                />
                <div className="text-[10px] font-mono text-center text-slate-500">
                  Signez au doigt ou à la souris dans le cadre doré ci-dessus
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={signatoryTitle}
                  onChange={(e) => setSignatoryTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#080B10] border border-white/15 text-xs text-white"
                  placeholder="Nom, qualité et mention Bon pour accord"
                />

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleValidateElectronicSignature}
                    data-testid="quote-validate-signature-btn"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#10B981] text-[#080B10] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#14d496] transition shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    {isSignedOnline
                      ? "Devis Signé & Certifié ✓"
                      : "Signer Électroniquement"}
                  </button>

                  <button
                    type="button"
                    onClick={exportOfficialVectorPdf}
                    data-testid="quote-export-pdf-btn"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#D4AF37] text-[#080B10] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#e3be42] transition"
                  >
                    <Download className="w-4 h-4" />
                    Exporter PDF Vectoriel HD
                  </button>
                </div>

                {isSignedOnline && (
                  <div className="p-2.5 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 text-[11px] text-[#10B981] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      Accord enregistré pour <strong>{clientCompany}</strong> (+1 000 XP attribués à{" "}
                      {currentAdvisor.firstName}).
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Mentions Légales Officielles Homogènes */}
            <div
              className="mt-4 pt-4 border-t border-white/10 text-[11px] text-slate-400 space-y-1 leading-relaxed font-mono"
              data-testid="quote-legal-mentions"
            >
              <div className="text-[#D4AF37] font-bold uppercase tracking-wider">
                Mentions Légales & Conditions Générales de Prestation — XR Agency
              </div>
              <p>
                • <strong>Validité & Règlement</strong> : Devis valable 15 jours. Acompte de {depositPercent}% ({depositAmountTtc.toLocaleString("fr-FR")} € TTC) payable à la signature pour blocage du sprint de production ; solde à la mise en ligne.
              </p>
              <p>
                • <strong>Propriété Intellectuelle & Conformité</strong> : Cession intégrale du code source et des actifs graphiques au règlement complet (Loi n°80-335). Pénalités de retard : 3× taux d'intérêt légal + indemnité forfaitaire de recouvrement de 40 € (Art. L441-10 du Code de commerce).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OfficialQuoteGenerator;
