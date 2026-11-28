import { useState, useId } from "react";
import {
  X,
  FileText,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  ShieldCheck,
  Send,
  MessageSquare,
  Mail,
  Download,
  CreditCard,
  Building2,
  Clock,
  Layers,
  Percent,
} from "lucide-react";
import type { Lead, TeamMember, LeadServiceItem } from "@/lib/crm/data";
import { XR_OFFICIAL_SERVICES, formatPricePeriod } from "@/lib/crm/data";
import type { CrmThemeTokens } from "@/lib/crm/theme";
import {
  generateQuoteAndContractPdf,
  generateAcquittedInvoicePdf,
  generateQuoteNumber,
  generateInvoiceNumber,
  type QuoteConfiguratorData,
  type MapsContractDetails,
} from "@/lib/crm/quoteContractPdf";

interface QuoteContractConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead;
  closer?: TeamMember;
  theme: CrmThemeTokens;
  onSaveLead: (updated: Lead) => void;
  onNotification?: (msg: string) => void;
}

const WEBSITE_PRESETS = [
  {
    id: "vitrine",
    label: "Site Vitrine Pro (3 pages)",
    price: 499,
    description: "Design haute conversion, mobile-first, formulaire, SEO technique, hébergement 1 an.",
    icon: "🌐",
  },
  {
    id: "business",
    label: "Site Business (5 pages + Blog)",
    price: 799,
    description: "Multi-pages, architecture SEO locale, avis clients intégrés, blog dynamique.",
    icon: "🏢",
  },
  {
    id: "ecommerce",
    label: "E-Commerce & Caisse / Réservation",
    price: 1499,
    description: "Boutique en ligne, paiements CB / Stripe, click & collect ou prise de RDV automatique.",
    icon: "🛍️",
  },
];

const ADDONS_PRESETS: { id: string; label: string; price: number; icon: string }[] = [
  { id: "opt-pos", label: "Caisse POS connectée & Réservation", price: 290, icon: "💳" },
  { id: "opt-multi", label: "Pack Multilingue (FR / EN / ES / AR)", price: 350, icon: "🌍" },
  { id: "opt-video", label: "Pack Visuels Studio & Drone Vidéo", price: 490, icon: "🎥" },
  { id: "opt-brand", label: "Brand Identity Kit & Logo Vectoriel", price: 229, icon: "✨" },
];

const MRR_PRESETS: { id: string; label: string; price: number; icon: string }[] = [
  { id: "mrr-wc-elite", label: "WebCare & Maintenance Sécurité Élite", price: 99, icon: "🛡️" },
  { id: "mrr-wc-essentiel", label: "WebCare Essentiel (Sauvegardes & Mises à jour)", price: 49, icon: "🛡️" },
  { id: "mrr-seo-grow", label: "Pack SEO Croissance (Netlinking & Positions)", price: 299, icon: "📈" },
  { id: "mrr-seo-perf", label: "Pack SEO Performance Dominante", price: 499, icon: "🚀" },
  { id: "mrr-social-1", label: "Social Media Essentiel (8 posts/mois)", price: 299, icon: "📱" },
  { id: "mrr-social-2", label: "Social Media Croissance (20 posts/mois)", price: 499, icon: "🔥" },
  { id: "mrr-ai-workflows", label: "Workflows & Agents IA Métier (Qualif leads auto)", price: 149, icon: "🤖" },
];

export function QuoteContractConfiguratorModal({
  isOpen,
  onClose,
  lead,
  closer,
  theme,
  onSaveLead,
  onNotification,
}: QuoteContractConfiguratorModalProps) {
  const quoteRefId = useId();
  // Main service selection
  const initialSitePreset = WEBSITE_PRESETS.find((w) => w.price === lead.value) || WEBSITE_PRESETS[0];
  const [selectedSiteId, setSelectedSiteId] = useState<string>(initialSitePreset.id);
  const [customPrice, setCustomPrice] = useState<number>(lead.value || 499);
  const isCustomSite = selectedSiteId === "custom";

  // Addons selection
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(() => {
    const existing = lead.extraItems || [];
    return existing.map((i) => i.id).filter((id) => ADDONS_PRESETS.some((a) => a.id === id));
  });

  // MRR selection
  const [selectedMrrIds, setSelectedMrrIds] = useState<string[]>(() => {
    const existing = lead.extraItems || [];
    return existing.map((i) => i.id).filter((id) => MRR_PRESETS.some((m) => m.id === id));
  });

  // Google Maps Top 3 Contract
  const initialMaps = lead.mapsContract || {
    enabled: lead.serviceId === "maps" || false,
    price: 999,
    keywords: `${lead.name}, service local`,
    targetZone: lead.city || "Zone locale prioritaire",
    deliveryDelayDays: 90,
    guaranteeClause: "Positionnement garanti dans le Top 3 Google Maps sous 90 jours maximum, ou remboursement intégral immédiat sans frais.",
    validatedBy: "Antoine Rebuffé-Rousseau (Direction XR Agency) & Pôle Référencement",
  };
  const [mapsContract, setMapsContract] = useState<MapsContractDetails>(initialMaps);

  // Payment mode
  const [paymentMode, setPaymentMode] = useState<"50_50" | "3x">(lead.installments?.plan === "3x" ? "3x" : "50_50");

  // Step 2: Confirmation / Encaissement View
  const [depositReceivedStep, setDepositReceivedStep] = useState<boolean>(lead.invoiceStatus === "paid");
  const [currentQuoteRef, setCurrentQuoteRef] = useState<string>(lead.quoteRef || generateQuoteNumber());
  const [currentInvoiceRef, setCurrentInvoiceRef] = useState<string>(lead.invoiceRef || generateInvoiceNumber(lead.quoteRef));

  if (!isOpen) return null;

  // Calculs
  const currentSite = WEBSITE_PRESETS.find((w) => w.id === selectedSiteId);
  const mainPrice = isCustomSite ? customPrice : currentSite ? currentSite.price : 499;
  const mainPlanLabel = isCustomSite ? "Prestation Web Sur-Mesure" : currentSite ? currentSite.label : "Site Vitrine Pro";

  const selectedAddonsItems: LeadServiceItem[] = selectedAddonIds
    .map((id) => ADDONS_PRESETS.find((a) => a.id === id))
    .filter(Boolean)
    .map((a) => ({
      id: a!.id,
      serviceId: "websites",
      planLabel: a!.label,
      billing: "once",
      price: a!.price,
    }));

  const selectedMrrItems: LeadServiceItem[] = selectedMrrIds
    .map((id) => MRR_PRESETS.find((m) => m.id === id))
    .filter(Boolean)
    .map((m) => ({
      id: m!.id,
      serviceId: "maintenance",
      planLabel: m!.label,
      billing: "month",
      price: m!.price,
    }));

  const addonsTotal = selectedAddonsItems.reduce((acc, curr) => acc + curr.price, 0);
  const mrrTotal = selectedMrrItems.reduce((acc, curr) => acc + curr.price, 0);
  const mapsAnnualTotal = mapsContract.enabled ? mapsContract.price : 0;
  const grandOneShotTotal = mainPrice + addonsTotal + mapsAnnualTotal;
  const depositAmount = Math.round(grandOneShotTotal * 0.5);
  const balanceRemaining = grandOneShotTotal - depositAmount;

  const currentConfig: QuoteConfiguratorData = {
    mainServiceId: "websites",
    mainPlanId: selectedSiteId,
    mainPlanLabel,
    mainPrice,
    mainBilling: "once",
    selectedAddons: selectedAddonsItems,
    selectedMrr: selectedMrrItems,
    mapsContract,
    paymentMode,
  };

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleMrr = (id: string) => {
    setSelectedMrrIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // Action 1 : Téléchargement Devis & Contrat PDF
  const handleDownloadQuotePdf = () => {
    const { doc, quoteNum } = generateQuoteAndContractPdf(lead, closer, currentConfig, currentQuoteRef);
    setCurrentQuoteRef(quoteNum);
    doc.save(`DEVIS-CONTRAT-XRAGENCY-${lead.name.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`);
    onNotification?.(`📄 Devis & Contrat PDF (${quoteNum}) téléchargé avec succès !`);
  };

  // Action 2 : Enregistrer et Notifier Antoine (Calendrier Direction)
  const handleSaveAndSyncAgenda = () => {
    const nowIso = new Date().toISOString();
    const updatedLead: Lead = {
      ...lead,
      value: mainPrice,
      planLabel: mainPlanLabel,
      billing: "once",
      quoteRef: currentQuoteRef,
      extraItems: [...selectedAddonsItems, ...selectedMrrItems],
      mapsContract,
      stage: lead.stage === "new" || lead.stage === "rdv" || lead.stage === "mockup" ? "proposal" : lead.stage,
      invoiceStatus: lead.invoiceStatus || "deposit_sent",
      installments: {
        plan: paymentMode === "3x" ? "3x" : "1x",
        paidCount: lead.installments?.paidCount || 0,
      },
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          text: `Devis & Contrat officiel émis (${currentQuoteRef}) : Total One-Shot ${grandOneShotTotal} €${mrrTotal > 0 ? ` + ${mrrTotal} €/mois` : ""}`,
        },
        ...(lead.timeline || []),
      ],
    };

    // Synchronisation agenda Antoine (localStorage xr_crm_custom_reminders & xr_antoine_agenda)
    try {
      const tomorrowStr = new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 10);
      const reminderItem = {
        id: `rem-deposit-${lead.id}-${Date.now()}`,
        date: tomorrowStr,
        time: "10:00",
        title: `🟡 En attente Virement Acompte (${depositAmount} €) · ${lead.name} (${closer?.shortName || "Commercial"})`,
        memberId: "antoine",
        category: "pro",
      };

      const existingReminders = JSON.parse(localStorage.getItem("xr_crm_custom_reminders") || "[]");
      existingReminders.push(reminderItem);
      localStorage.setItem("xr_crm_custom_reminders", JSON.stringify(existingReminders));

      const existingAgenda = JSON.parse(localStorage.getItem("xr_antoine_agenda") || "[]");
      existingAgenda.push({
        id: `agenda-${lead.id}-${Date.now()}`,
        time: "10:30",
        title: `Suivi virement acompte ${depositAmount} € : ${lead.name} (${closer?.shortName || "XR Agency"})`,
        kind: "pro",
        done: false,
      });
      localStorage.setItem("xr_antoine_agenda", JSON.stringify(existingAgenda));
    } catch {
      // LocalStorage fallback
    }

    onSaveLead(updatedLead);
    onNotification?.(`✅ Devis & Contrat synchronisé avec le calendrier de Direction d'Antoine !`);
    onClose();
  };

  // Action 3 : Validation de l'encaissement de l'acompte ("1- oui, 2- oui et mail")
  const handleConfirmDepositReceived = () => {
    const invoiceNum = generateInvoiceNumber(currentQuoteRef);
    setCurrentInvoiceRef(invoiceNum);
    setDepositReceivedStep(true);

    const nowIso = new Date().toISOString();
    const updatedLead: Lead = {
      ...lead,
      value: mainPrice,
      planLabel: mainPlanLabel,
      billing: "once",
      quoteRef: currentQuoteRef,
      invoiceRef: invoiceNum,
      invoiceStatus: "paid",
      depositAmount,
      depositPaidAt: nowIso,
      depositMethod: "Virement Bancaire Qonto",
      stage: "won",
      wonAt: nowIso,
      wonMonth: nowIso.slice(0, 7),
      commissionStatus: "unlocked",
      studioStatus: "in_production",
      extraItems: [...selectedAddonsItems, ...selectedMrrItems],
      mapsContract,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          text: `✓ Acompte de 50% (${depositAmount} €) encaissé par virement bancaire. Facture ${invoiceNum} émise.`,
        },
        ...(lead.timeline || []),
      ],
    };

    // Ajout automatique dans les "Projets Actifs en cours de livraison" d'Antoine
    try {
      const activeProjects = JSON.parse(localStorage.getItem("xr_antoine_active_projects") || "[]");
      const newProj = {
        id: `proj-${lead.id}-${Date.now()}`,
        clientName: lead.name,
        serviceType: `${mainPlanLabel}${selectedAddonsItems.length > 0 ? ` + ${selectedAddonsItems.length} options` : ""}${mapsContract.enabled ? " + Maps Top 3" : ""}`,
        closerName: closer?.shortName || "Commercial",
        progressPct: 15,
        deadlineDate: new Date(Date.now() + 10 * 24 * 3600 * 1000).toISOString().slice(0, 10),
        status: "prep",
        notes: `Acompte 50% (${depositAmount} €) validé par virement. Réf Devis : ${currentQuoteRef}. Facture : ${invoiceNum}.`,
      };
      activeProjects.unshift(newProj);
      localStorage.setItem("xr_antoine_active_projects", JSON.stringify(activeProjects));
    } catch {
      // ignore
    }

    // Téléchargement immédiat de la facture acquittée
    const { doc } = generateAcquittedInvoicePdf(updatedLead, closer, currentQuoteRef, invoiceNum, depositAmount);
    doc.save(`FACTURE-ACOMPTE-${invoiceNum}-${lead.name.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`);

    onSaveLead(updatedLead);
    onNotification?.(`🎉 Virement acompte validé ! Facture ${invoiceNum} émise et projet ajouté aux livraisons actives d'Antoine.`);
  };

  // WhatsApp Message
  const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
  const waPhone = cleanPhone.startsWith("0") ? `33${cleanPhone.slice(1)}` : cleanPhone;
  const waMessage = `Bonjour ${lead.contact || ""},

Nous accusons bonne réception de votre virement d'acompte de ${depositAmount.toLocaleString("fr-FR")} € pour votre projet chez XR Agency ! 🎉

Votre facture officielle acquittée n° ${currentInvoiceRef} est validée.
Antoine Rebuffé-Rousseau et l'équipe Studio XR Agency démarrent officiellement la production et le calendrier de livraison de votre projet (${mainPlanLabel}${mapsContract.enabled ? " + Google Maps Top 3 Garanti" : ""}).

Réf Devis : ${currentQuoteRef}
Un point d'étape vous sera partagé très prochainement. Merci pour votre confiance !

Bien cordialement,
${closer?.name || "Antoine Rebuffé-Rousseau"} · XR Agency`;

  const waUrl = waPhone.length >= 8 ? `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}` : null;

  // Email Mailto
  const emailSubject = `XR AGENCY · Facture d'acompte acquittée [${currentInvoiceRef}] - ${lead.name}`;
  const emailBody = `Bonjour ${lead.contact || "Madame, Monsieur"},

Nous avons le plaisir de vous confirmer la bonne réception de votre virement bancaire correspondant à l'acompte de 50 % (${depositAmount.toLocaleString("fr-FR")} €) pour votre commande auprès de XR Agency.

Veuillez trouver vos références officielles :
• Facture officielle acquittée : ${currentInvoiceRef}
• Référence Devis & Contrat : ${currentQuoteRef}
• Prestations commandées : ${mainPlanLabel}
${selectedAddonsItems.map((a) => `  + ${a.planLabel} (${a.price} €)`).join("\n")}
${selectedMrrItems.map((m) => `  + ${m.planLabel} (${m.price} €/mois)`).join("\n")}
${mapsContract.enabled ? `• Google Maps Pack Top 3 Garanti (${mapsContract.price} €/an) - Délai garanti : ${mapsContract.deliveryDelayDays} jours sur ${mapsContract.targetZone}` : ""}

Antoine Rebuffé-Rousseau (Direction XR Agency) et l'équipe Studio sont d'ores et déjà mobilisés sur la conception et la livraison de vos supports.

Nous restons à votre entière disposition au 07 67 56 67 83 ou par retour de mail.

Très chaleureusement,
${closer?.name || "Antoine Rebuffé-Rousseau"}
XR Agency · Studio Digital Haute Couture
78 Avenue des Champs-Élysées, 75008 Paris
https://xragencyai.com`;

  const mailtoUrl = lead.email
    ? `mailto:${encodeURIComponent(lead.email)}?cc=contact.xragency@gmail.com&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    : `mailto:contact.xragency@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl p-5 sm:p-6 space-y-6 ${theme.modalBg} ${theme.border} text-left`}
      >
        {/* En-tête Modale */}
        <div className="flex items-start justify-between gap-4 border-b pb-4 border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                <FileText className="w-5 h-5" />
              </span>
              <div>
                <h3 className={`text-lg sm:text-xl font-extrabold tracking-tight ${theme.textMain}`}>
                  Configurateur Devis & Contrat d'Engagement
                </h3>
                <p className={`text-xs ${theme.textMuted}`}>
                  Client : <span className="font-bold text-indigo-500 dark:text-indigo-300">{lead.name}</span> ({lead.contact}) · Tél : {lead.phone}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors ${theme.subCard} ${theme.textMuted} hover:text-rose-500`}
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SI ENCAISSEMENT D'ACOMPTE EN COURS (ETAPE 2 : "1- OUI, 2- OUI ET MAIL") */}
        {depositReceivedStep ? (
          <div className="space-y-6 animate-in zoom-in-95 duration-200">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 space-y-2">
              <div className="flex items-center gap-2 font-black text-base sm:text-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                Virement Bancaire d'Acompte Confirmé !
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                L'acompte de <strong>50 % ({depositAmount.toLocaleString("fr-FR")} €)</strong> a été validé sur le compte de l'agence.
                La <strong>Facture d'acompte acquittée ({currentInvoiceRef})</strong> a été automatiquement générée et le projet est maintenant transféré
                dans les <strong>Projets Actifs en cours de livraison</strong> d'Antoine Rebuffé-Rousseau.
              </p>
            </div>

            {/* Actions 1-Clic Post Encaissement */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Bouton Téléchargement Facture */}
              <button
                onClick={() => {
                  const { doc } = generateAcquittedInvoicePdf(lead, closer, currentQuoteRef, currentInvoiceRef, depositAmount);
                  doc.save(`FACTURE-ACOMPTE-${currentInvoiceRef}-${lead.name.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`);
                  onNotification?.("Facture PDF téléchargée.");
                }}
                className="p-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-200 flex flex-col items-center justify-center gap-2 font-bold text-xs transition-all shadow-sm"
              >
                <Download className="w-5 h-5 text-indigo-500" />
                <span>Télécharger Facture PDF</span>
                <span className="text-[10px] font-mono opacity-80">{currentInvoiceRef}</span>
              </button>

              {/* Bouton WhatsApp */}
              {waUrl ? (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-200 flex flex-col items-center justify-center gap-2 font-bold text-xs transition-all shadow-sm text-center"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                  <span>Envoyer via WhatsApp</span>
                  <span className="text-[10px] opacity-80">Message pré-rempli 1 clic</span>
                </a>
              ) : (
                <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 flex flex-col items-center justify-center gap-2 text-xs text-center">
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp non dispo</span>
                  <span className="text-[10px]">Numéro non valide</span>
                </div>
              )}

              {/* Bouton Email */}
              <a
                href={mailtoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-200 flex flex-col items-center justify-center gap-2 font-bold text-xs transition-all shadow-sm text-center"
              >
                <Mail className="w-5 h-5 text-amber-500" />
                <span>Envoyer par Email</span>
                <span className="text-[10px] opacity-80">Objet & corps préparés</span>
              </a>
            </div>

            {/* Récapitulatif projet engagé */}
            <div className={`p-4 rounded-2xl border ${theme.subCard} ${theme.border} space-y-2`}>
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">État d'avancement de la commande :</div>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                  ✓ Statut : Gagné & Livrable
                </span>
                <span className="px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-extrabold">
                  Commission débloquée (100%)
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold">
                  Solde dû à la livraison : {balanceRemaining.toLocaleString("fr-FR")} €
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDepositReceivedStep(false)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold ${theme.subCard} ${theme.textMuted}`}
              >
                Retour au configurateur
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md"
              >
                Fermer & Retour au CRM
              </button>
            </div>
          </div>
        ) : (
          /* CONFIGURATEUR PRINCIPAL */
          <div className="space-y-6">
            {/* 1. SELECTION SITE WEB PRINCIPAL */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> 1. Offre Site Web Principale
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {WEBSITE_PRESETS.map((site) => {
                  const isSelected = selectedSiteId === site.id;
                  return (
                    <button
                      key={site.id}
                      type="button"
                      onClick={() => setSelectedSiteId(site.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                        isSelected
                          ? "border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-500/10 shadow-sm"
                          : `${theme.subCard} ${theme.border} hover:border-indigo-500/40`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{site.icon}</span>
                        <span className="text-sm font-black font-mono text-indigo-600 dark:text-amber-300">
                          {site.price.toLocaleString("fr-FR")} €
                        </span>
                      </div>
                      <h4 className={`font-extrabold text-xs mt-2 ${theme.textMain}`}>{site.label}</h4>
                      <p className={`text-[10px] mt-1 line-clamp-2 ${theme.textMuted}`}>{site.description}</p>
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. OPTIONS WEBSITES / ADD-ONS */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> 2. Options Sites Web & Add-ons Studio (One-Shot)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ADDONS_PRESETS.map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between gap-2 transition-all ${
                        isChecked
                          ? "border-amber-500 ring-1 ring-amber-500/30 bg-amber-500/10"
                          : `${theme.subCard} ${theme.border} hover:border-amber-500/40`
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-amber-500 focus:ring-0 cursor-pointer"
                        />
                        <span className="text-base">{addon.icon}</span>
                        <span className={`text-xs font-bold ${theme.textMain}`}>{addon.label}</span>
                      </div>
                      <span className="text-xs font-black font-mono text-amber-600 dark:text-amber-400 shrink-0">
                        +{addon.price} €
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. PACK GOOGLE MAPS TOP 3 (SUR-MESURE & CONTRAT D'ENGAGEMENT) */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                mapsContract.enabled
                  ? "border-amber-500 ring-2 ring-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10"
                  : `${theme.subCard} ${theme.border}`
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="p-2 rounded-xl bg-amber-500/20 text-amber-500 border border-amber-500/30">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-extrabold ${theme.textMain}`}>
                        Google Maps Pack Top 3 (Sur-mesure & Contrat d'Engagement)
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-500 text-white uppercase tracking-wider">
                        Garantie ou Remboursé
                      </span>
                    </div>
                    <p className={`text-[11px] mt-0.5 ${theme.textMuted}`}>
                      Audit local + Optimisation Google Business Profile + Contrat stipulant mots-clés, zone et délai garanti.
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mapsContract.enabled}
                    onChange={(e) => setMapsContract({ ...mapsContract, enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-300 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              {mapsContract.enabled && (
                <div className="mt-4 pt-4 border-t border-amber-500/20 space-y-3.5 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">Tarif Annuel Sur-Mesure (€)</label>
                      <div className="relative mt-1">
                        <input
                          type="number"
                          value={mapsContract.price}
                          min={999}
                          step={50}
                          onChange={(e) => setMapsContract({ ...mapsContract, price: Number(e.target.value) || 999 })}
                          className={`w-full px-3 py-2 rounded-xl border text-xs font-mono font-bold ${theme.inputBg} ${theme.border} text-amber-600 dark:text-amber-400`}
                        />
                        <span className="absolute right-3 top-2 text-xs text-zinc-400">€/an</span>
                      </div>
                      <p className="text-[9px] text-zinc-400 mt-1">Minimum recommandé : 999 €/an</p>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">Zone Géographique Ciblée</label>
                      <input
                        type="text"
                        value={mapsContract.targetZone}
                        onChange={(e) => setMapsContract({ ...mapsContract, targetZone: e.target.value })}
                        placeholder="Ex: Paris 8e & Champs-Élysées"
                        className={`w-full mt-1 px-3 py-2 rounded-xl border text-xs ${theme.inputBg} ${theme.border} ${theme.textMain}`}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">Délai Contractuel Garanti</label>
                      <select
                        value={mapsContract.deliveryDelayDays}
                        onChange={(e) => setMapsContract({ ...mapsContract, deliveryDelayDays: Number(e.target.value) })}
                        className={`w-full mt-1 px-3 py-2 rounded-xl border text-xs ${theme.inputBg} ${theme.border} ${theme.textMain}`}
                      >
                        <option value={60}>60 jours (Secteur modéré)</option>
                        <option value={90}>90 jours (Standard recommandé)</option>
                        <option value={120}>120 jours (Forte concurrence)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase">Mots-clés Stratégiques Validés</label>
                    <input
                      type="text"
                      value={mapsContract.keywords}
                      onChange={(e) => setMapsContract({ ...mapsContract, keywords: e.target.value })}
                      placeholder="Ex: Restaurant gastronomique Paris 8, Traiteur de luxe, Brunch haut de gamme"
                      className={`w-full mt-1 px-3 py-2 rounded-xl border text-xs ${theme.inputBg} ${theme.border} ${theme.textMain}`}
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300">
                      <ShieldCheck className="w-4 h-4 text-amber-500" />
                      Clause Légale d'Engagement & Garantie :
                    </div>
                    <p className="text-[10px] text-zinc-600 dark:text-zinc-300 italic">
                      "{mapsContract.guaranteeClause}"
                    </p>
                    <div className="text-[9px] font-bold text-amber-600 dark:text-amber-400 mt-1">
                      ✓ Validation requise : Antoine Rebuffé-Rousseau (Direction XR Agency) & Pôle Référencement
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. OFFRES MENSUELLES (MRR) */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 4. Abonnements Mensuels Récurrents (MRR - Sans Engagement)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MRR_PRESETS.map((mrr) => {
                  const isChecked = selectedMrrIds.includes(mrr.id);
                  return (
                    <div
                      key={mrr.id}
                      onClick={() => toggleMrr(mrr.id)}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between gap-2 transition-all ${
                        isChecked
                          ? "border-emerald-500 ring-1 ring-emerald-500/30 bg-emerald-500/10"
                          : `${theme.subCard} ${theme.border} hover:border-emerald-500/40`
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-emerald-500 focus:ring-0 cursor-pointer"
                        />
                        <span className="text-base">{mrr.icon}</span>
                        <span className={`text-xs font-bold ${theme.textMain}`}>{mrr.label}</span>
                      </div>
                      <span className="text-xs font-black font-mono text-emerald-600 dark:text-emerald-400 shrink-0">
                        {mrr.price} €/m
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. MODALITÉS DE PAIEMENT & COORDONNÉES BANCAIRES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className={`p-4 rounded-2xl border ${theme.subCard} ${theme.border} space-y-2`}>
                <label className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-indigo-500" /> Modalité de règlement
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMode("50_50")}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      paymentMode === "50_50"
                        ? "border-indigo-500 bg-indigo-500/15 text-indigo-600 dark:text-indigo-300"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-500"
                    }`}
                  >
                    Acompte 50% + Solde 50%
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode("3x")}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      paymentMode === "3x"
                        ? "border-indigo-500 bg-indigo-500/15 text-indigo-600 dark:text-indigo-300"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-500"
                    }`}
                  >
                    3x sans frais
                  </button>
                </div>
                <p className="text-[10px] text-zinc-400">
                  {paymentMode === "50_50"
                    ? `Acompte initial de ${depositAmount.toLocaleString("fr-FR")} € par virement, solde à la livraison.`
                    : `3 règlements égaux de ${Math.round(grandOneShotTotal / 3).toLocaleString("fr-FR")} €.`}
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${theme.subCard} ${theme.border} space-y-1.5`}>
                <label className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-amber-500" /> RIB Agence (Compte Qonto)
                </label>
                <p className="text-[11px] font-bold text-zinc-700 dark:text-zinc-200">
                  KARMA SASU · XR AGENCY
                </p>
                <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                  IBAN : FR76 1695 8000 0112 3456 7890 123
                </p>
                <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                  Motif virement : {currentQuoteRef} - {lead.name.slice(0, 14)}
                </p>
              </div>
            </div>

            {/* 6. BANDEAU DES TOTAUX EN DIRECT */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-zinc-900 to-indigo-950 text-white flex flex-wrap items-center justify-between gap-4 shadow-xl">
              <div>
                <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Récapitulatif Financier :</div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black font-mono text-amber-400">
                    {grandOneShotTotal.toLocaleString("fr-FR")} €
                  </span>
                  <span className="text-xs text-zinc-400">Net One-Shot</span>
                  {mrrTotal > 0 && (
                    <span className="text-xs font-mono font-bold text-emerald-400 ml-2">
                      + {mrrTotal} €/mois
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Acompte 50 % exigé :</div>
                <div className="text-xl font-black font-mono text-emerald-400">
                  {depositAmount.toLocaleString("fr-FR")} €
                </div>
              </div>
            </div>

            {/* ACTIONS FINALES */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={handleDownloadQuotePdf}
                className="px-4 py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Download className="w-4 h-4 text-amber-500" />
                Télécharger Devis & Contrat PDF
              </button>

              <div className="flex flex-wrap items-center gap-2.5 ml-auto">
                <button
                  type="button"
                  onClick={handleSaveAndSyncAgenda}
                  className="px-4 py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center gap-1.5 transition-all"
                  title="Enregistre le devis et crée un rappel dans le calendrier d'Antoine"
                >
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  Enregistrer & Notifier Antoine
                </button>

                <button
                  type="button"
                  onClick={handleConfirmDepositReceived}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md"
                  title="Valide la réception du virement d'acompte de 50%, génère la facture officielle et débloque l'envoi WhatsApp/Mail"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  ✓ Acompte Encaissé (Générer Facture & Envois)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
