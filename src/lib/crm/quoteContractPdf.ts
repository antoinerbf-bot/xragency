import { jsPDF } from "jspdf";
import type { Lead, TeamMember, LeadServiceItem } from "./data";
import { XR_OFFICIAL_SERVICES, formatPricePeriod } from "./data";

export interface MapsContractDetails {
  enabled: boolean;
  price: number;
  keywords: string;
  targetZone: string;
  deliveryDelayDays: number;
  guaranteeClause: string;
  validatedBy: string;
}

export interface QuoteConfiguratorData {
  mainServiceId: string;
  mainPlanId: string;
  mainPlanLabel: string;
  mainPrice: number;
  mainBilling: "once" | "month" | "year";
  selectedAddons: LeadServiceItem[];
  selectedMrr: LeadServiceItem[];
  mapsContract: MapsContractDetails;
  paymentMode: "50_50" | "3x";
  notes?: string;
}

export function generateQuoteNumber(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `XR-DEVIS-${year}-${rand}`;
}

export function generateInvoiceNumber(quoteRef?: string): string {
  const year = new Date().getFullYear();
  if (quoteRef && quoteRef.includes("-")) {
    const parts = quoteRef.split("-");
    const lastPart = parts[parts.length - 1];
    return `FAC-${year}-${lastPart}`;
  }
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `FAC-${year}-${rand}`;
}

export function generateQuoteAndContractPdf(
  lead: Lead,
  closer: TeamMember | undefined,
  config: QuoteConfiguratorData,
  existingQuoteNum?: string
): { doc: jsPDF; quoteNum: string } {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210, M = 16, R = 194;
  const ink = [18, 22, 29] as const;
  const gold = [217, 153, 30] as const;
  const muted = [90, 98, 110] as const;
  const soft = [245, 246, 248] as const;
  const line = [225, 228, 233] as const;

  const quoteNum = existingQuoteNum || generateQuoteNumber();
  const today = new Date();
  const dateStr = today.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
  const validityDate = new Date(today.getTime() + 30 * 24 * 3600 * 1000).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Calcul des montants
  let oneShotTotal = config.mainBilling === "once" ? config.mainPrice : 0;
  let mrrTotal = config.mainBilling === "month" ? config.mainPrice : 0;

  config.selectedAddons.forEach((a) => {
    oneShotTotal += a.price;
  });

  config.selectedMrr.forEach((m) => {
    mrrTotal += m.price;
  });

  const mapsPrice = config.mapsContract.enabled ? config.mapsContract.price : 0;
  const grandOneShotTotal = oneShotTotal + mapsPrice;
  const depositAmount = Math.round(grandOneShotTotal * 0.5);
  const balanceAmount = grandOneShotTotal - depositAmount;

  // Header sombre prestige
  doc.setFillColor(...ink);
  doc.rect(0, 0, W, 36, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("XR AGENCY", M, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(217, 180, 100);
  doc.text("STUDIO DIGITAL HAUTE COUTURE · IA & VISIBILITÉ LOCALE", M, 24);

  // Réf & Titre Devis & Contrat
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  const titleText = config.mapsContract.enabled ? "DEVIS & CONTRAT D'ENGAGEMENT" : "DEVIS VALANT BON POUR ACCORD";
  doc.text(titleText, R, 15, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(200, 205, 215);
  doc.text(`Réf : ${quoteNum}`, R, 21, { align: "right" });
  doc.text(`Date : ${dateStr} · Validité : 30 jours (au ${validityDate})`, R, 26, { align: "right" });
  doc.text(`Conseiller : ${closer?.name || closer?.shortName || "Antoine Rebuffé-Rousseau"}`, R, 31, { align: "right" });

  let y = 44;

  // Cadre Émetteur & Client côte à côte
  const colW = (W - 2 * M - 8) / 2;

  // Émetteur
  doc.setFillColor(...soft);
  doc.roundedRect(M, y, colW, 28, 2, 2, "F");
  doc.setDrawColor(...line);
  doc.roundedRect(M, y, colW, 28, 2, 2, "S");
  doc.setTextColor(...gold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("ÉMETTEUR / PRESTATAIRE", M + 4, y + 6);
  doc.setTextColor(...ink);
  doc.setFontSize(9.5);
  doc.text("KARMA SASU · XR AGENCY", M + 4, y + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...muted);
  doc.text("78 Avenue des Champs-Élysées · 75008 Paris", M + 4, y + 17);
  doc.text("SIRET : 889 178 141 00012 · NAF : 6201Z", M + 4, y + 21);
  doc.text("Directeur : Antoine Rebuffé-Rousseau · 07 67 56 67 83", M + 4, y + 25);

  // Client
  const clientX = M + colW + 8;
  doc.setFillColor(...soft);
  doc.roundedRect(clientX, y, colW, 28, 2, 2, "F");
  doc.roundedRect(clientX, y, colW, 28, 2, 2, "S");
  doc.setTextColor(...gold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("CLIENT / DESTINATAIRE", clientX + 4, y + 6);
  doc.setTextColor(...ink);
  doc.setFontSize(9.5);
  doc.text(lead.name.slice(0, 32), clientX + 4, y + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...muted);
  doc.text(`Contact : ${lead.contact || "Direction"}`, clientX + 4, y + 17);
  doc.text(`Tél : ${lead.phone}${lead.city ? ` · Ville : ${lead.city}` : ""}`, clientX + 4, y + 21);
  doc.text(`Email : ${lead.email || "Non renseigné"}`, clientX + 4, y + 25);

  y += 34;

  // Tableau des prestations - Header
  doc.setFillColor(...ink);
  doc.roundedRect(M, y, W - 2 * M, 8, 1.5, 1.5, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("DESIGNATION DE LA PRESTATION", M + 4, y + 5.5);
  doc.text("FORMULE / TYPE", 125, y + 5.5);
  doc.text("MONTANT NET", R - 4, y + 5.5, { align: "right" });

  y += 12;

  // 1. Prestation principale
  const svcDef = XR_OFFICIAL_SERVICES.find((s) => s.id === config.mainServiceId) || XR_OFFICIAL_SERVICES[0];
  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(svcDef.name, M + 4, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text(config.mainPlanLabel.slice(0, 34), 125, y);
  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(formatPricePeriod(config.mainPrice, config.mainBilling), R - 4, y, { align: "right" });

  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...muted);
  const descDeliverable = `Livrables : ${svcDef.deliverable}`;
  const splitDeliv = doc.splitTextToSize(descDeliverable, W - 2 * M - 10);
  doc.text(splitDeliv, M + 4, y);
  y += splitDeliv.length * 3.6 + 2;

  // 2. Options Web & Add-ons
  config.selectedAddons.forEach((item) => {
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(`+ Option : ${item.planLabel}`, M + 4, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    doc.text("Option Web Studio", 125, y);
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(`${item.price.toLocaleString("fr-FR")} €`, R - 4, y, { align: "right" });
    y += 5;
  });

  // 3. Abonnements Mensuels MRR
  config.selectedMrr.forEach((item) => {
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(`+ Abonnement : ${item.planLabel}`, M + 4, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    doc.text("Mensuel sans engagement", 125, y);
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(`${item.price.toLocaleString("fr-FR")} €/mois`, R - 4, y, { align: "right" });
    y += 5;
  });

  // 4. Google Maps Pack Top 3 avec section contractuelle
  if (config.mapsContract.enabled) {
    y += 2;
    doc.setFillColor(254, 252, 240); // Fond doré clair
    doc.roundedRect(M, y, W - 2 * M, 34, 2, 2, "F");
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.4);
    doc.roundedRect(M, y, W - 2 * M, 34, 2, 2, "S");

    doc.setTextColor(...gold);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("★ PACK GOOGLE MAPS TOP 3 GARANTI - CONTRAT D'ENGAGEMENT DE RÉSULTAT", M + 4, y + 6);

    doc.setTextColor(...ink);
    doc.setFontSize(9);
    doc.text(`${config.mapsContract.price.toLocaleString("fr-FR")} € / an`, R - 4, y + 6, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...ink);
    doc.text(`• Zone géographique ciblée : ${config.mapsContract.targetZone || lead.city || "Zone locale prioritaire"}`, M + 4, y + 12);
    doc.text(`• Mots-clés stratégiques : ${config.mapsContract.keywords || "Activité principale + ville"}`, M + 4, y + 17);
    doc.text(`• Délai de livraison & positionnement garanti : ${config.mapsContract.deliveryDelayDays || 90} jours`, M + 4, y + 22);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...gold);
    const splitClause = doc.splitTextToSize(
      `• CLAUSE DE GARANTIE : ${config.mapsContract.guaranteeClause || "Positionnement garanti dans le Top 3 Google Maps sous 90 jours maximum, ou remboursement intégral immédiat sans frais."}`,
      W - 2 * M - 8
    );
    doc.text(splitClause, M + 4, y + 27);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(6.5);
    doc.setTextColor(...muted);
    doc.text(`Dossier analysé et validé par : ${config.mapsContract.validatedBy || "Antoine Rebuffé-Rousseau (Direction XR Agency)"}`, M + 4, y + 32);

    y += 37;
  }

  // Totaux financiers
  y = Math.max(y + 2, 172);
  doc.setDrawColor(...line);
  doc.setLineWidth(0.2);
  doc.line(M, y, R, y);
  y += 5;

  const summaryW = 76;
  const summaryX = R - summaryW;
  doc.setFillColor(...soft);
  doc.roundedRect(summaryX, y, summaryW, 30, 2, 2, "F");
  doc.setDrawColor(...line);
  doc.roundedRect(summaryX, y, summaryW, 30, 2, 2, "S");

  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("TOTAL ONE-SHOT NET :", summaryX + 4, y + 7);
  doc.setTextColor(...gold);
  doc.text(`${grandOneShotTotal.toLocaleString("fr-FR")} €`, R - 4, y + 7, { align: "right" });

  if (mrrTotal > 0) {
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("ABONNEMENT MENSUEL :", summaryX + 4, y + 15);
    doc.setTextColor(...ink);
    doc.text(`${mrrTotal.toLocaleString("fr-FR")} € / mois`, R - 4, y + 15, { align: "right" });
  }

  doc.setTextColor(...gold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  if (config.paymentMode === "3x") {
    doc.text("PAIEMENT EN 3X SANS FRAIS :", summaryX + 4, y + 24);
    doc.text(`3 × ${Math.round(grandOneShotTotal / 3).toLocaleString("fr-FR")} €`, R - 4, y + 24, { align: "right" });
  } else {
    doc.text("ACOMPTE 50 % À LA COMMANDE :", summaryX + 4, y + 24);
    doc.text(`${depositAmount.toLocaleString("fr-FR")} €`, R - 4, y + 24, { align: "right" });
  }

  // Coordonnées bancaires pour le virement d'acompte
  const ribW = summaryX - M - 6;
  doc.setFillColor(...soft);
  doc.roundedRect(M, y, ribW, 30, 2, 2, "F");
  doc.roundedRect(M, y, ribW, 30, 2, 2, "S");

  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("COORDONNÉES BANCAIRES POUR VIREMENT DE L'ACOMPTE", M + 4, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...muted);
  doc.text("Bénéficiaire : KARMA SASU (XR AGENCY)", M + 4, y + 12);
  doc.text("Banque : Qonto · BIC : QNTOPRP1", M + 4, y + 17);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...ink);
  doc.text("IBAN : FR76 1695 8000 0112 3456 7890 123", M + 4, y + 22);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...gold);
  doc.text(`Motif obligatoire du virement : ${quoteNum} - ${lead.name.slice(0, 16)}`, M + 4, y + 27);

  y += 34;

  // Cadre "BON POUR ACCORD ET COMMANDE FERME"
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(M, y, W - 2 * M, 34, 2, 2, "F");
  doc.setDrawColor(...ink);
  doc.setLineWidth(0.4);
  doc.roundedRect(M, y, W - 2 * M, 34, 2, 2, "S");

  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("BON POUR ACCORD ET COMMANDE FERME", M + 4, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...muted);
  doc.text("Le Client déclare accepter sans réserve les prestations, montants et conditions stipulés ci-dessus.", M + 4, y + 11);
  doc.text("L'engagement devient effectif à réception du présent document signé et du virement d'acompte.", M + 4, y + 15);

  doc.text("Date d'accord : ____ / ____ / 2026", M + 4, y + 22);
  doc.text("Mention manuscrite obligatoire : « Bon pour accord et commande ferme »", M + 4, y + 27);

  doc.setFont("helvetica", "bold");
  doc.text("Signature du Client & Cachet commercial :", 125, y + 22);

  // Footer juridique
  doc.setDrawColor(...line);
  doc.line(M, 283, R, 283);
  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.text("KARMA SASU · XR AGENCY · STUDIO DIGITAL & VISIBILITÉ LOCALE", M, 287);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...muted);
  doc.text("SIREN 889 178 141 · SIRET 889 178 141 00012 · 78 Avenue des Champs-Élysées · 75008 Paris · TVA non applicable art. 293 B du CGI", M, 291);
  doc.text("contact.xragency@gmail.com · +33 7 67 56 67 83 · xragencyai.com", M, 295);

  return { doc, quoteNum };
}

export function generateAcquittedInvoicePdf(
  lead: Lead,
  closer: TeamMember | undefined,
  quoteRef: string,
  existingInvoiceNum?: string,
  customDepositAmount?: number
): { doc: jsPDF; invoiceNum: string } {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210, M = 16, R = 194;
  const ink = [18, 22, 29] as const;
  const gold = [217, 153, 30] as const;
  const emerald = [16, 185, 129] as const;
  const muted = [90, 98, 110] as const;
  const soft = [245, 246, 248] as const;
  const line = [225, 228, 233] as const;

  const invoiceNum = existingInvoiceNum || generateInvoiceNumber(quoteRef);
  const today = new Date();
  const dateStr = today.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

  let oneShotTotal = lead.billing === "month" ? 0 : lead.value;
  (lead.extraItems || []).forEach((item) => {
    if (item.billing !== "month") oneShotTotal += item.price;
  });

  const depositAmount = customDepositAmount || Math.round(oneShotTotal * 0.5);
  const balanceRemaining = oneShotTotal - depositAmount;

  // Header sombre avec sceau ACQUITTÉE
  doc.setFillColor(...ink);
  doc.rect(0, 0, W, 36, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("XR AGENCY", M, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(217, 180, 100);
  doc.text("STUDIO DIGITAL HAUTE COUTURE · COMPTABILITÉ & FACTURATION", M, 24);

  // Titre & Réf Facture
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("FACTURE D'ACOMPTE ACQUITTÉE", R, 15, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(200, 205, 215);
  doc.text(`N° Facture : ${invoiceNum}`, R, 21, { align: "right" });
  doc.text(`Réf Devis initial : ${quoteRef || "XR-DEVIS-2026"}`, R, 26, { align: "right" });
  doc.text(`Date d'émission & encaissement : ${dateStr}`, R, 31, { align: "right" });

  let y = 44;

  // Sceau vert d'encaissement officiel
  doc.setFillColor(236, 253, 245);
  doc.roundedRect(M, y, W - 2 * M, 14, 2, 2, "F");
  doc.setDrawColor(...emerald);
  doc.setLineWidth(0.4);
  doc.roundedRect(M, y, W - 2 * M, 14, 2, 2, "S");
  doc.setTextColor(...emerald);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("✓ VIREMENT BANCAIRE ENCAISSÉ AVEC SUCCÈS - FACTURE OFFICIELLE ACQUITTÉE", M + 6, y + 6.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...muted);
  doc.text("Acompte perçu sur le compte bancaire KARMA SASU (Qonto). Le projet passe en phase de livraison active.", M + 6, y + 11);

  y += 18;

  // Cadre Émetteur & Client
  const colW = (W - 2 * M - 8) / 2;

  // Émetteur
  doc.setFillColor(...soft);
  doc.roundedRect(M, y, colW, 28, 2, 2, "F");
  doc.setDrawColor(...line);
  doc.roundedRect(M, y, colW, 28, 2, 2, "S");
  doc.setTextColor(...gold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("ÉMETTEUR / PRESTATAIRE", M + 4, y + 6);
  doc.setTextColor(...ink);
  doc.setFontSize(9.5);
  doc.text("KARMA SASU · XR AGENCY", M + 4, y + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...muted);
  doc.text("78 Avenue des Champs-Élysées · 75008 Paris", M + 4, y + 17);
  doc.text("SIRET : 889 178 141 00012 · NAF : 6201Z", M + 4, y + 21);
  doc.text("Directeur : Antoine Rebuffé-Rousseau · 07 67 56 67 83", M + 4, y + 25);

  // Client
  const clientX = M + colW + 8;
  doc.setFillColor(...soft);
  doc.roundedRect(clientX, y, colW, 28, 2, 2, "F");
  doc.roundedRect(clientX, y, colW, 28, 2, 2, "S");
  doc.setTextColor(...gold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("CLIENT / FACTURÉ À", clientX + 4, y + 6);
  doc.setTextColor(...ink);
  doc.setFontSize(9.5);
  doc.text(lead.name.slice(0, 32), clientX + 4, y + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...muted);
  doc.text(`Contact : ${lead.contact || "Direction"}`, clientX + 4, y + 17);
  doc.text(`Tél : ${lead.phone}${lead.city ? ` · ${lead.city}` : ""}`, clientX + 4, y + 21);
  doc.text(`Email : ${lead.email || "Non renseigné"}`, clientX + 4, y + 25);

  y += 34;

  // Tableau récapitulatif facturation
  doc.setFillColor(...ink);
  doc.roundedRect(M, y, W - 2 * M, 8, 1.5, 1.5, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("DESCRIPTION DE LA COMMANDE", M + 4, y + 5.5);
  doc.text("TYPE", 130, y + 5.5);
  doc.text("TOTAL COMMANDE", R - 4, y + 5.5, { align: "right" });

  y += 12;

  const svcDef = XR_OFFICIAL_SERVICES.find((s) => s.id === lead.serviceId) || XR_OFFICIAL_SERVICES[0];
  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(svcDef.name, M + 4, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text(lead.planLabel.slice(0, 32), 130, y);
  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(`${lead.value.toLocaleString("fr-FR")} €`, R - 4, y, { align: "right" });

  y += 6;

  (lead.extraItems || []).forEach((item) => {
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(`+ ${item.planLabel}`, M + 4, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    doc.text("Prestation additionnelle", 130, y);
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(`${item.price.toLocaleString("fr-FR")} €`, R - 4, y, { align: "right" });
    y += 5.5;
  });

  y += 8;
  doc.setDrawColor(...line);
  doc.line(M, y, R, y);
  y += 8;

  // Cadre de règlement de l'acompte
  doc.setFillColor(...soft);
  doc.roundedRect(M, y, W - 2 * M, 42, 2, 2, "F");
  doc.setDrawColor(...line);
  doc.roundedRect(M, y, W - 2 * M, 42, 2, 2, "S");

  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("RÉCAPITULATIF FINANCIER & STATUT DU RÈGLEMENT", M + 6, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...muted);
  doc.text("Montant total de la commande :", M + 6, y + 16);
  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.text(`${oneShotTotal.toLocaleString("fr-FR")} €`, 110, y + 16);

  doc.setTextColor(...emerald);
  doc.setFont("helvetica", "bold");
  doc.text("Acompte 50 % ENCAISSÉ (Virement bancaire) :", M + 6, y + 25);
  doc.text(`${depositAmount.toLocaleString("fr-FR")} € ACQUITTÉ`, 110, y + 25);

  doc.setTextColor(...ink);
  doc.setFont("helvetica", "normal");
  doc.text("Solde restant dû à la livraison finale :", M + 6, y + 34);
  doc.setFont("helvetica", "bold");
  doc.text(`${balanceRemaining.toLocaleString("fr-FR")} €`, 110, y + 34);

  // Validation Studio & Direction
  y += 48;
  doc.setFillColor(254, 252, 240);
  doc.roundedRect(M, y, W - 2 * M, 24, 2, 2, "F");
  doc.setDrawColor(...gold);
  doc.roundedRect(M, y, W - 2 * M, 24, 2, 2, "S");

  doc.setTextColor(...gold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("ACCUSÉ DE RÉCEPTION OFFICIEL & MISE EN PRODUCTION", M + 6, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...ink);
  doc.text("Nous accusons bonne réception de votre virement d'acompte. Votre facture d'acompte est dûment acquittée.", M + 6, y + 12);
  doc.text("Antoine Rebuffé-Rousseau et l'équipe Studio XR Agency déclenchent immédiatement le calendrier de production.", M + 6, y + 16);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  doc.setTextColor(...muted);
  doc.text(`Suivi assuré par : ${closer?.name || closer?.shortName || "Antoine Rebuffé-Rousseau"} · Direction Studio XR Agency`, M + 6, y + 20);

  // Footer
  doc.setDrawColor(...line);
  doc.line(M, 283, R, 283);
  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.text("KARMA SASU · XR AGENCY · FACTURATION OFFICIELLE", M, 287);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...muted);
  doc.text("Facture d'acompte établie conformément à l'article 289 du Code Général des Impôts · TVA non applicable, art. 293 B du CGI", M, 291);
  doc.text("SIREN 889 178 141 · 78 Avenue des Champs-Élysées · 75008 Paris · contact.xragency@gmail.com", M, 295);

  return { doc, invoiceNum };
}
