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
  Globe,
  AlertTriangle,
  Award,
  Video,
  Languages,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import type { Lead, TeamMember, LeadServiceItem, ClientMilestone } from "@/lib/crm/data";
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
import {
  SUPPORTED_COUNTRIES,
  calculateQuoteTva,
  detectCountryFromText,
  type TaxIssuerEntity,
  type TaxCalculationResult,
} from "@/lib/crm/taxEngine";

interface QuoteContractConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead;
  closer?: TeamMember;
  currentUser?: TeamMember;
  theme: CrmThemeTokens;
  onSaveLead: (updated: Lead) => void;
  onNotification?: (msg: string) => void;
}

// 1. Offres Principales de Sites Web
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
    label: "E-Commerce & Boutique en Ligne",
    price: 1499,
    description: "Boutique en ligne, paiements CB / Stripe, catalogue produits ou click & collect.",
    icon: "🛍️",
  },
];

// Langues disponibles (100 € par langue supplémentaire traduite)
const AVAILABLE_LANGUAGES = [
  { code: "en", label: "Anglais", flag: "🇬🇧" },
  { code: "es", label: "Espagnol", flag: "🇪🇸" },
  { code: "ar", label: "Arabe", flag: "🇦🇪" },
  { code: "de", label: "Allemand", flag: "🇩🇪" },
  { code: "it", label: "Italien", flag: "🇮🇹" },
  { code: "ru", label: "Russe", flag: "🇷🇺" },
  { code: "zh", label: "Chinois", flag: "🇨🇳" },
  { code: "nl", label: "Néerlandais", flag: "🇳🇱" },
  { code: "pt", label: "Portugais", flag: "🇵🇹" },
];

// Zones exclusives Drone & Vidéo 4K
const ELIGIBLE_VIDEO_ZONES = [
  { id: "south_fr", label: "Sud de la France (Côte d'Azur / Monaco / Provence)", flag: "🇫🇷" },
  { id: "nyc", label: "New York", flag: "🇺🇸" },
  { id: "dubai", label: "Dubaï", flag: "🇦🇪" },
  { id: "bali", label: "Bali", flag: "🇮🇩" },
];

// 3 Offres Réseaux Sociaux officielles
const SOCIAL_MEDIA_OFFERS = [
  {
    id: "mrr-social-1",
    label: "Social Media · Présence Essentielle",
    sub: "1 réseau · 8 posts/mois · Calendrier éditorial & graphisme pro",
    price: 299,
    icon: "📱",
  },
  {
    id: "mrr-social-2",
    label: "Social Media · Croissance Active",
    sub: "2 réseaux · 20 posts/mois + Stories + Reels captivants",
    price: 499,
    icon: "🔥",
  },
  {
    id: "mrr-social-3",
    label: "Social Media · Domination Sociale",
    sub: "3 réseaux · 30 posts/mois + Reels Studio + Modération réactive",
    price: 699,
    icon: "👑",
  },
];

// 3 Offres SEO officielles
const SEO_OFFERS = [
  {
    id: "mrr-seo-grow",
    label: "Pack SEO Croissance & Local",
    sub: "Audit sémantique, optimisation on-page & netlinking local",
    price: 299,
    icon: "📈",
  },
  {
    id: "mrr-seo-perf",
    label: "Pack SEO Performance Dominante",
    sub: "Netlinking premium d'autorité & conquête de positions fortes",
    price: 499,
    icon: "🚀",
  },
  {
    id: "mrr-seo-elite",
    label: "Pack SEO National & Stratégique",
    sub: "Domination de marché sur requêtes ultra-concurrentielles",
    price: 799,
    icon: "🏆",
  },
];

// 3 Offres WebCare & Maintenance officielles
const WEBCARE_OFFERS = [
  {
    id: "mrr-wc-essentiel",
    label: "WebCare Essentiel",
    sub: "Sauvegardes quotidiennes, patchs de sécurité & 4 modifs/mois",
    price: 29,
    icon: "🛡️",
  },
  {
    id: "mrr-wc-business",
    label: "WebCare Business Prioritaire",
    sub: "Monitoring 24/7, mises à jour critiques & 10 modifs/mois",
    price: 49,
    icon: "⚡",
  },
  {
    id: "mrr-wc-elite",
    label: "WebCare Élite VIP 24/7",
    sub: "Support illimité, évolutions continues & astreinte dédiée",
    price: 99,
    icon: "💎",
  },
];

export function QuoteContractConfiguratorModal({
  isOpen,
  onClose,
  lead,
  closer,
  currentUser,
  theme,
  onSaveLead,
  onNotification,
}: QuoteContractConfiguratorModalProps) {
  const isDirector = currentUser?.roleType === "direction" || currentUser?.shortName === "Antoine";

  // 1. Offre Site Web principale
  const initialSitePreset = WEBSITE_PRESETS.find((w) => w.price === lead.value) || WEBSITE_PRESETS[0];
  const [selectedSiteId, setSelectedSiteId] = useState<string>(initialSitePreset.id);
  const [customPrice, setCustomPrice] = useState<number>(lead.value || 499);
  const isCustomSite = selectedSiteId === "custom";

  // 2. Options de Site Web
  // A. Caisse POS & CRM sur mesure (à partir de 2 000 €)
  const [hasPosCrm, setHasPosCrm] = useState<boolean>(() => {
    return Boolean(lead.extraItems?.some((i) => i.id === "opt-pos-crm"));
  });
  const [posCrmPrice, setPosCrmPrice] = useState<number>(2000);

  // B. Pack Multilingue (100 € par langue choisie)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(() => {
    const multiItem = lead.extraItems?.find((i) => i.id.startsWith("opt-multilang"));
    if (multiItem && multiItem.price) {
      const count = Math.round(multiItem.price / 100);
      return AVAILABLE_LANGUAGES.slice(0, count).map((l) => l.code);
    }
    return [];
  });

  // C. Pack Visuel Studio & Drone Vidéo 4K (490 €, localisations exclusives)
  const [hasVideoStudio, setHasVideoStudio] = useState<boolean>(() => {
    return Boolean(lead.extraItems?.some((i) => i.id === "opt-video-studio"));
  });
  const [videoZone, setVideoZone] = useState<string>("south_fr");

  // D. Brand Identity Kit & Logo Vectoriel (229 €)
  const [hasBrandKit, setHasBrandKit] = useState<boolean>(() => {
    return Boolean(lead.extraItems?.some((i) => i.id === "opt-brand"));
  });

  // 3. Abonnements Mensuels Sélectionnés (Social Media, SEO, WebCare)
  const [selectedMrrIds, setSelectedMrrIds] = useState<string[]>(() => {
    const existing = lead.extraItems || [];
    return existing.map((i) => i.id).filter((id) =>
      SOCIAL_MEDIA_OFFERS.some((s) => s.id === id) ||
      SEO_OFFERS.some((s) => s.id === id) ||
      WEBCARE_OFFERS.some((w) => w.id === id)
    );
  });

  // 4. Google Maps Pack Top 3 (Sur-mesure & Contrat d'Engagement)
  const initialMaps = lead.mapsContract || {
    enabled: lead.serviceId === "maps" || false,
    price: 999,
    keywords: `${lead.name}, service local`,
    targetZone: lead.city || "Zone locale prioritaire",
    currentPosition: "Hors Top 20 Google Maps",
    competitionLevel: "forte",
    deliveryDelayDays: 90,
    guaranteeClause: "Positionnement garanti dans le Top 3 Google Maps sous le délai fixé par la Direction, ou remboursement intégral immédiat sans frais.",
    validatedBy: "Antoine Rebuffé-Rousseau (Direction XR Agency)",
    directorApproved: isDirector,
  };
  const [mapsContract, setMapsContract] = useState<MapsContractDetails>(initialMaps);

  // 5. Modalités de paiement
  const [paymentMode, setPaymentMode] = useState<"50_50" | "3x">(lead.installments?.plan === "3x" ? "3x" : "50_50");

  // 6. Workflow de Devis (Demande commercial -> Validation Antoine -> Client)
  const [quoteWorkflowStatus, setQuoteWorkflowStatus] = useState<Lead["quoteWorkflowStatus"]>(
    lead.quoteWorkflowStatus || (lead.invoiceStatus === "paid" ? "signed" : "draft")
  );
  const [quoteDirectorNotes, setQuoteDirectorNotes] = useState<string>(lead.quoteDirectorNotes || "");

  // Étape 2 : Encaissement de l'Acompte 50%
  const [depositReceivedStep, setDepositReceivedStep] = useState<boolean>(lead.invoiceStatus === "paid");
  const [currentQuoteRef, setCurrentQuoteRef] = useState<string>(lead.quoteRef || generateQuoteNumber());
  const [currentInvoiceRef, setCurrentInvoiceRef] = useState<string>(lead.invoiceRef || generateInvoiceNumber(lead.quoteRef));

  // Fiscalité & Calcul de TVA
  const [issuerEntity, setIssuerEntity] = useState<TaxIssuerEntity>("FR_SASU");
  const [clientCountryCode, setClientCountryCode] = useState<string>(
    () => lead.countryCode || detectCountryFromText(`${lead.city || ""} ${lead.phone || ""}`)
  );
  const [clientType, setClientType] = useState<"b2b" | "b2c">(lead.clientType || "b2b");
  const [clientVatNumber, setClientVatNumber] = useState<string>(lead.clientVatNumber || "");

  if (!isOpen) return null;

  // Calculs financiers
  const currentSite = WEBSITE_PRESETS.find((w) => w.id === selectedSiteId);
  const mainPrice = isCustomSite ? customPrice : currentSite ? currentSite.price : 499;
  const mainPlanLabel = isCustomSite ? "Prestation Web Sur-Mesure" : currentSite ? currentSite.label : "Site Vitrine Pro";

  // Construction des Add-ons
  const selectedAddonsItems: LeadServiceItem[] = [];
  if (hasPosCrm) {
    selectedAddonsItems.push({
      id: "opt-pos-crm",
      serviceId: "crm_pos",
      planLabel: "Module Caisse POS connectée & CRM Métier Sur-Mesure",
      billing: "once",
      price: Math.max(2000, posCrmPrice),
    });
  }
  if (selectedLanguages.length > 0) {
    const langNames = selectedLanguages
      .map((code) => AVAILABLE_LANGUAGES.find((l) => l.code === code)?.label)
      .filter(Boolean)
      .join(", ");
    selectedAddonsItems.push({
      id: "opt-multilang",
      serviceId: "websites",
      planLabel: `Pack Multilingue (${selectedLanguages.length} langue${selectedLanguages.length > 1 ? "s" : ""} : ${langNames})`,
      billing: "once",
      price: selectedLanguages.length * 100,
    });
  }
  if (hasVideoStudio) {
    const zoneObj = ELIGIBLE_VIDEO_ZONES.find((z) => z.id === videoZone);
    selectedAddonsItems.push({
      id: "opt-video-studio",
      serviceId: "websites",
      planLabel: `Pack Visuels Studio & Drone Vidéo 4K (${zoneObj?.label || "Sud de la France"})`,
      billing: "once",
      price: 490,
    });
  }
  if (hasBrandKit) {
    selectedAddonsItems.push({
      id: "opt-brand",
      serviceId: "branding",
      planLabel: "Brand Identity Kit & Logo Vectoriel",
      billing: "once",
      price: 229,
    });
  }

  // Construction des MRR
  const allMrrAvailable = [...SOCIAL_MEDIA_OFFERS, ...SEO_OFFERS, ...WEBCARE_OFFERS];
  const selectedMrrItems: LeadServiceItem[] = selectedMrrIds
    .map((id) => allMrrAvailable.find((m) => m.id === id))
    .filter(Boolean)
    .map((m) => ({
      id: m!.id,
      serviceId: m!.id.includes("social") ? "social" : m!.id.includes("seo") ? "seo" : "maintenance",
      planLabel: m!.label,
      billing: "month",
      price: m!.price,
    }));

  const addonsTotal = selectedAddonsItems.reduce((acc, curr) => acc + curr.price, 0);
  const mrrTotal = selectedMrrItems.reduce((acc, curr) => acc + curr.price, 0);
  const mapsAnnualTotal = mapsContract.enabled ? Math.max(999, mapsContract.price) : 0;
  const grandOneShotTotal = mainPrice + addonsTotal + mapsAnnualTotal;

  // Calcul TVA
  const tax = calculateQuoteTva({
    issuerEntity,
    clientCountryCode,
    clientType,
    clientVatNumber,
    oneShotHt: grandOneShotTotal,
    mrrHt: mrrTotal,
    paymentMode,
  });

  const depositAmount = tax.depositTtc;
  const balanceRemaining = tax.balanceTtc;

  const currentConfig: QuoteConfiguratorData = {
    issuerEntity,
    clientCountryCode,
    clientType,
    clientVatNumber,
    mainServiceId: "websites",
    mainPlanId: selectedSiteId,
    mainPlanLabel,
    mainPrice,
    mainBilling: "once",
    selectedAddons: selectedAddonsItems,
    selectedMrr: selectedMrrItems,
    mapsContract: {
      ...mapsContract,
      price: mapsAnnualTotal,
      validatedBy: "Antoine Rebuffé-Rousseau (Direction XR Agency)",
    },
    paymentMode,
  };

  const toggleLanguage = (code: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const toggleMrr = (id: string) => {
    setSelectedMrrIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Recommandation d'upsell automatique selon ce qui n'a PAS encore été souscrit
  const computeNextUpsellPlan = () => {
    const suggestions: string[] = [];
    if (!selectedMrrIds.some((id) => id.includes("wc"))) {
      suggestions.push("Abonnement WebCare Maintenance & Sécurité (dès 29 €/m)");
    }
    if (!mapsContract.enabled) {
      suggestions.push("Pack Google Maps Top 3 Garanti (dès 999 €/an)");
    }
    if (!selectedMrrIds.some((id) => id.includes("social"))) {
      suggestions.push("Social Media Présence Essentielle ou Croissance (dès 299 €/m)");
    }
    if (!selectedMrrIds.some((id) => id.includes("seo"))) {
      suggestions.push("Pack SEO Croissance & Local (dès 299 €/m)");
    }
    return suggestions.length > 0 ? suggestions.join(" · ") : "Pack Fidélité & Scaling Digital";
  };

  // Action A : Soumettre pour validation à Antoine (Par le Commercial)
  const handleSubmitToDirector = () => {
    const nowIso = new Date().toISOString();
    const updatedLead: Lead = {
      ...lead,
      countryCode: clientCountryCode,
      clientType,
      clientVatNumber: clientVatNumber || undefined,
      value: mainPrice,
      planLabel: mainPlanLabel,
      billing: "once",
      quoteRef: currentQuoteRef,
      extraItems: [...selectedAddonsItems, ...selectedMrrItems],
      mapsContract: { ...mapsContract, price: mapsAnnualTotal },
      quoteWorkflowStatus: "pending_director_approval",
      quoteRequestedAt: nowIso,
      stage: "proposal",
      depositAmount: tax.depositTtc,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          text: `Demande de devis soumise à Antoine (Direction) par ${closer?.shortName || "le commercial"}. Total : ${tax.oneShotHt} € HT (${tax.oneShotTtc} € TTC).`,
        },
        ...(lead.timeline || []),
      ],
    };

    onSaveLead(updatedLead);
    setQuoteWorkflowStatus("pending_director_approval");
    onNotification?.(`📩 Demande de devis transmise à Antoine Rebuffé-Rousseau pour validation !`);
  };

  // Action B : Validation par Antoine (Direction) & Génération du Devis Officiel
  const handleDirectorApprove = () => {
    const nowIso = new Date().toISOString();
    const updatedLead: Lead = {
      ...lead,
      countryCode: clientCountryCode,
      clientType,
      clientVatNumber: clientVatNumber || undefined,
      value: mainPrice,
      planLabel: mainPlanLabel,
      billing: "once",
      quoteRef: currentQuoteRef,
      extraItems: [...selectedAddonsItems, ...selectedMrrItems],
      mapsContract: { ...mapsContract, price: mapsAnnualTotal, directorApproved: true },
      quoteWorkflowStatus: "approved",
      quoteApprovedAt: nowIso,
      quoteApprovedBy: "Antoine Rebuffé-Rousseau",
      quoteDirectorNotes: quoteDirectorNotes || undefined,
      stage: "proposal",
      depositAmount: tax.depositTtc,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          text: `✓ Devis Officiel validé par Antoine Rebuffé-Rousseau (${currentQuoteRef}). Prêt pour envoi client par ${closer?.shortName || "le commercial"}.`,
        },
        ...(lead.timeline || []),
      ],
    };

    onSaveLead(updatedLead);
    setQuoteWorkflowStatus("approved");
    onNotification?.(`⭐ Devis ${currentQuoteRef} approuvé par Antoine ! Déblocage de l'envoi client.`);
  };

  // Action C : Télécharger le Devis & Contrat PDF
  const handleDownloadQuotePdf = () => {
    const { doc, quoteNum } = generateQuoteAndContractPdf(lead, closer, currentConfig, currentQuoteRef);
    setCurrentQuoteRef(quoteNum);
    doc.save(`DEVIS-CONTRAT-XRAGENCY-${lead.name.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`);
    onNotification?.(`📄 Devis & Contrat PDF (${quoteNum}) téléchargé !`);
  };

  // Action D : Confirmation Signature & Encaissement Acompte (50%) -> Date d'Entrée Client
  const handleConfirmDepositAndOnboarding = () => {
    const invoiceNum = generateInvoiceNumber(currentQuoteRef);
    setCurrentInvoiceRef(invoiceNum);
    setDepositReceivedStep(true);

    const todayDate = new Date().toISOString().slice(0, 10);
    const nowIso = new Date().toISOString();
    const nowTime = Date.now();

    // Construction du calendrier de vie client & upsells
    const activeServices = [
      mainPlanLabel,
      ...selectedAddonsItems.map((a) => a.planLabel),
      ...selectedMrrItems.map((m) => m.planLabel),
      ...(mapsContract.enabled ? [`Google Maps Top 3 Garanti (${mapsContract.deliveryDelayDays}j)`] : []),
    ];

    const milestones: ClientMilestone[] = [
      {
        id: `ms-${lead.id}-onboarding`,
        targetDate: todayDate,
        title: `🎉 Date d'Entrée Client chez XR Agency · Acompte 50% Encaissé (${lead.name})`,
        serviceCategory: "onboarding",
        type: "onboarding",
        status: "done",
        notes: `Acompte net de ${tax.depositTtc.toLocaleString("fr-FR")} € TTC reçu par virement. Lancement de la production. Commercial référent : ${closer?.shortName || "XR Agency"}.`,
      },
      {
        id: `ms-${lead.id}-delivery`,
        targetDate: new Date(nowTime + 10 * 24 * 3600 * 1000).toISOString().slice(0, 10),
        title: `🚀 Échéance Livraison Prestation & Solde Final 50% (${lead.name})`,
        serviceCategory: "delivery",
        type: "delivery",
        status: "pending",
        notes: `Solde restant dû : ${tax.balanceTtc.toLocaleString("fr-FR")} € TTC. Recette finale du site web.`,
      },
      {
        id: `ms-${lead.id}-upsell-30`,
        targetDate: new Date(nowTime + 30 * 24 * 3600 * 1000).toISOString().slice(0, 10),
        title: `💡 Bilan M+1 & Première Proposition d'Upsell (${lead.name})`,
        serviceCategory: "upsell_check",
        type: "upsell_check",
        status: "pending",
        notes: `Offres recommandées à proposer : ${computeNextUpsellPlan()}.`,
      },
      {
        id: `ms-${lead.id}-upsell-60`,
        targetDate: new Date(nowTime + 60 * 24 * 3600 * 1000).toISOString().slice(0, 10),
        title: `📈 Point d'Étape Performance M+2 (${lead.name})`,
        serviceCategory: "upsell_check",
        type: "upsell_check",
        status: "pending",
        notes: `Analyse des conversions et proposition d'extension de visibilité.`,
      },
    ];

    if (mapsContract.enabled) {
      milestones.push({
        id: `ms-${lead.id}-maps-guarantee`,
        targetDate: new Date(nowTime + (mapsContract.deliveryDelayDays || 90) * 24 * 3600 * 1000).toISOString().slice(0, 10),
        title: `📍 Échéance Garantie Top 3 Google Maps (${lead.name})`,
        serviceCategory: "maps",
        type: "followup",
        status: "pending",
        notes: `Vérification du positionnement Top 3 garanti sur la zone : ${mapsContract.targetZone}.`,
      });
    }

    milestones.push({
      id: `ms-${lead.id}-annual-renewal`,
      targetDate: new Date(nowTime + 330 * 24 * 3600 * 1000).toISOString().slice(0, 10),
      title: `🔄 Anticipation Renouvellement Annuel (${lead.name})`,
      serviceCategory: "annual_renewal",
      type: "annual_renewal",
      status: "pending",
      notes: `Renouvellement annuel du contrat et des hébergements.`,
    });

    const updatedLead: Lead = {
      ...lead,
      countryCode: clientCountryCode,
      clientType,
      clientVatNumber: clientVatNumber || undefined,
      value: mainPrice,
      planLabel: mainPlanLabel,
      billing: "once",
      quoteRef: currentQuoteRef,
      invoiceRef: invoiceNum,
      invoiceStatus: "paid",
      depositAmount: tax.depositTtc,
      depositPaidAt: nowIso,
      depositMethod: "Virement Bancaire Qonto",
      stage: "won",
      wonAt: nowIso,
      wonMonth: nowIso.slice(0, 7),
      commissionStatus: "unlocked",
      studioStatus: "in_production",
      quoteWorkflowStatus: "signed",
      onboardingDate: todayDate,
      activeServicesList: activeServices,
      clientMilestones: milestones,
      extraItems: [...selectedAddonsItems, ...selectedMrrItems],
      mapsContract: { ...mapsContract, price: mapsAnnualTotal, directorApproved: true },
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          text: `✓ Date d'entrée enregistrée (${todayDate}). Acompte 50% (${tax.depositTtc.toLocaleString("fr-FR")} € TTC) reçu. Facture ${invoiceNum} acquittée émise. Calendrier d'accompagnement & upsell synchronisé.`,
        },
        ...(lead.timeline || []),
      ],
    };

    // Synchronisation avec les rappels & le calendrier partagé
    try {
      const existingReminders = JSON.parse(localStorage.getItem("xr_crm_custom_reminders_v2") || "[]");
      const newReminders = [
        {
          id: `rem-onboarding-${lead.id}`,
          date: todayDate,
          time: "10:00",
          title: `🎉 Client Entré : ${lead.name} (${activeServices[0]}) · Acompte reçu`,
          memberId: "all",
          category: "pro",
        },
        {
          id: `rem-delivery-${lead.id}`,
          date: milestones[1].targetDate,
          time: "14:00",
          title: `🚀 Livraison & Solde Client : ${lead.name} (${tax.balanceTtc} €)`,
          memberId: closer?.id || "all",
          category: "pro",
        },
        {
          id: `rem-upsell-${lead.id}`,
          date: milestones[2].targetDate,
          time: "11:00",
          title: `💡 Point Upsell M+1 Client : ${lead.name} (${computeNextUpsellPlan().slice(0, 30)}...)`,
          memberId: closer?.id || "all",
          category: "pro",
        },
      ];
      localStorage.setItem("xr_crm_custom_reminders_v2", JSON.stringify([...newReminders, ...existingReminders]));
    } catch {
      // LocalStorage fallback
    }

    // Téléchargement de la facture d'acompte acquittée
    const { doc } = generateAcquittedInvoicePdf(updatedLead, closer, currentQuoteRef, invoiceNum, tax.depositTtc);
    doc.save(`FACTURE-ACOMPTE-${invoiceNum}-${lead.name.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`);

    onSaveLead(updatedLead);
    onNotification?.(`🎉 Client officiellement entré chez XR Agency ! Facture ${invoiceNum} acquittée émise.`);
  };

  // WhatsApp Message
  const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
  const waPhone = cleanPhone.startsWith("0") ? `33${cleanPhone.slice(1)}` : cleanPhone;
  const waMessage = `Bonjour ${lead.contact || ""},

Nous accusons bonne réception de votre virement d'acompte de ${tax.depositTtc.toLocaleString("fr-FR")} € TTC pour votre projet auprès de XR Agency ! 🎉

Votre date d'entrée officielle chez nous est enregistrée ce jour. Votre facture acquittée n° ${currentInvoiceRef} est validée.
Antoine Rebuffé-Rousseau (Direction) et l'équipe Studio démarrent immédiatement la phase de production de vos livrables.

Prestations engagées :
• ${mainPlanLabel}
${selectedAddonsItems.map((a) => `• ${a.planLabel}`).join("\n")}
${selectedMrrItems.map((m) => `• ${m.planLabel} (${m.price} €/mois HT)`).join("\n")}
${mapsContract.enabled ? `• Google Maps Pack Top 3 Garanti (${mapsAnnualTotal} €/an HT · Délai ${mapsContract.deliveryDelayDays}j)` : ""}

Réf Devis : ${currentQuoteRef}
Total commande : ${tax.oneShotTtc.toLocaleString("fr-FR")} € TTC (${tax.oneShotHt.toLocaleString("fr-FR")} € HT · ${tax.regimeName})
Acompte acquitté : ${tax.depositTtc.toLocaleString("fr-FR")} € TTC
Solde restant dû à la livraison : ${tax.balanceTtc.toLocaleString("fr-FR")} € TTC

Un premier point d'étape vous sera partagé très prochainement. Merci pour votre confiance !

Bien cordialement,
${closer?.name || "Antoine Rebuffé-Rousseau"} · XR Agency`;

  const waUrl = waPhone.length >= 8 ? `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}` : null;

  // Email Mailto
  const emailSubject = `XR AGENCY · Facture d'acompte acquittée & Entrée Client [${currentInvoiceRef}] - ${lead.name}`;
  const emailBody = `Bonjour ${lead.contact || "Madame, Monsieur"},

Nous avons le plaisir de vous confirmer la bonne réception de votre virement bancaire correspondant à l'acompte de 50 % (${tax.depositTtc.toLocaleString("fr-FR")} € TTC) pour votre commande auprès de XR Agency.

Votre projet est officiellement entré en production ce jour.

Vos références officielles :
• Facture officielle acquittée : ${currentInvoiceRef}
• Référence Devis & Contrat d'Engagement : ${currentQuoteRef}
• Régime fiscal : ${tax.regimeName} (${tax.legalNotice})
• Montant total HT : ${tax.oneShotHt.toLocaleString("fr-FR")} €
• TVA (${tax.taxRateLabel}) : ${tax.oneShotTax.toLocaleString("fr-FR")} €
• Montant total TTC : ${tax.oneShotTtc.toLocaleString("fr-FR")} €
• Acompte 50% acquitté : ${tax.depositTtc.toLocaleString("fr-FR")} € TTC
• Solde restant dû à la livraison : ${tax.balanceTtc.toLocaleString("fr-FR")} € TTC

Prestations commandées :
• ${mainPlanLabel}
${selectedAddonsItems.map((a) => `  + ${a.planLabel} (${a.price} € HT)`).join("\n")}
${selectedMrrItems.map((m) => `  + ${m.planLabel} (${m.price} €/mois HT)`).join("\n")}
${mapsContract.enabled ? `• Google Maps Pack Top 3 Garanti (${mapsAnnualTotal} €/an HT) - Délai contractuel garanti : ${mapsContract.deliveryDelayDays} jours sur ${mapsContract.targetZone}` : ""}

Antoine Rebuffé-Rousseau et l'équipe Studio sont mobilisés sur votre projet.

Nous restons à votre disposition au 07 67 56 67 83 ou par retour de mail.

Très chaleureusement,
${closer?.name || "Antoine Rebuffé-Rousseau"}
XR Agency · Studio Digital Haute Couture
78 Avenue des Champs-Élysées, 75008 Paris
https://xragencyai.com`;

  const mailtoUrl = lead.email
    ? `mailto:${encodeURIComponent(lead.email)}?cc=contact.xragency@gmail.com&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    : `mailto:contact.xragency@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl p-5 sm:p-6 space-y-6 ${theme.modalBg} ${theme.border} text-left`}
      >
        {/* En-tête Modale */}
        <div className="flex items-start justify-between gap-4 border-b pb-4 border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                <FileText className="w-5 h-5" />
              </span>
              <div>
                <h3 className={`text-lg sm:text-xl font-extrabold tracking-tight ${theme.textMain}`}>
                  Configurateur Devis & Contrat d'Engagement Officiel
                </h3>
                <p className={`text-xs ${theme.textMuted}`}>
                  Prospect : <span className="font-bold text-indigo-500 dark:text-indigo-300">{lead.name}</span> ({lead.contact}) · Tél : {lead.phone} · Ville : {lead.city || "Non spécifiée"}
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

        {/* BANDEAU DE STATUT WORKFLOW DU DEVIS */}
        <div className="p-3.5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="font-extrabold uppercase tracking-wider text-zinc-500 text-[10px]">Statut Workflow :</span>
            {quoteWorkflowStatus === "pending_director_approval" && (
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold flex items-center gap-1 border border-amber-500/30">
                <Clock className="w-3.5 h-3.5 animate-spin" /> En attente validation Antoine (Direction)
              </span>
            )}
            {quoteWorkflowStatus === "approved" && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Devis Validé par Antoine (Prêt pour Envoi)
              </span>
            )}
            {quoteWorkflowStatus === "signed" && (
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center gap-1 border border-indigo-500/30">
                <Award className="w-3.5 h-3.5 text-indigo-500" /> Client Actif & Signé
              </span>
            )}
            {(!quoteWorkflowStatus || quoteWorkflowStatus === "draft" || quoteWorkflowStatus === "none") && (
              <span className="px-2.5 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold">
                Brouillon en cours de configuration
              </span>
            )}
          </div>

          <div className="text-[11px] font-mono text-zinc-500">
            Réf Devis : <strong className="text-indigo-600 dark:text-indigo-400">{currentQuoteRef}</strong>
          </div>
        </div>

        {/* ETAPE 2 : SI ENCAISSEMENT D'ACOMPTE EN COURS */}
        {depositReceivedStep ? (
          <div className="space-y-6 animate-in zoom-in-95 duration-200">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 space-y-2">
              <div className="flex items-center gap-2 font-black text-base sm:text-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                Virement Bancaire d'Acompte Confirmé · Date d'Entrée Client Enregistrée !
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                L'acompte de <strong>50 % ({depositAmount.toLocaleString("fr-FR")} € TTC)</strong> a été validé.
                La <strong>Facture d'acompte acquittée ({currentInvoiceRef})</strong> a été générée.
                Le client a été automatiquement intégré dans le <strong>calendrier partagé</strong> avec ses échéances de livraison et d'upsell à J+30.
              </p>
            </div>

            {/* Actions 1-Clic Post Encaissement */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

              {waUrl ? (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-200 flex flex-col items-center justify-center gap-2 font-bold text-xs transition-all shadow-sm text-center"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                  <span>Envoyer via WhatsApp</span>
                  <span className="text-[10px] opacity-80">Message accusé réception 1-clic</span>
                </a>
              ) : (
                <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 flex flex-col items-center justify-center gap-2 text-xs text-center">
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp non dispo</span>
                  <span className="text-[10px]">Numéro invalide</span>
                </div>
              )}

              <a
                href={mailtoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-200 flex flex-col items-center justify-center gap-2 font-bold text-xs transition-all shadow-sm text-center"
              >
                <Mail className="w-5 h-5 text-amber-500" />
                <span>Envoyer par Email</span>
                <span className="text-[10px] opacity-80">Facture & références prêtes</span>
              </a>
            </div>

            {/* Récapitulatif projet engagé */}
            <div className={`p-4 rounded-2xl border ${theme.subCard} ${theme.border} space-y-2`}>
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Planning d'accompagnement & Upsell synchronisé :</div>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                  ✓ Statut : Client Actif en Production
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold">
                  Solde à la livraison : {balanceRemaining.toLocaleString("fr-FR")} € TTC
                </span>
                <span className="px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-extrabold">
                  Prochain jalon : J+10 (Livraison) & J+30 (Upsell {computeNextUpsellPlan().slice(0, 24)}...)
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDepositReceivedStep(false)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold ${theme.subCard} ${theme.textMuted}`}
              >
                Modifier le devis
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

            {/* 2. OPTIONS DE SITES WEB & MODULES MÉTIER */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> 2. Options Sites Web & Modules Studio
              </label>

              <div className="grid grid-cols-1 gap-3">
                {/* A. Caisse POS connectée & CRM Métier Sur-Mesure (≥ 2000 €) */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    hasPosCrm
                      ? "border-amber-500 ring-1 ring-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10"
                      : `${theme.subCard} ${theme.border}`
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasPosCrm}
                        onChange={(e) => setHasPosCrm(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-amber-500 focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base">💳</span>
                          <h4 className={`text-xs font-extrabold ${theme.textMain}`}>
                            Caisse POS connectée, ERP & CRM Métier Sur-Mesure
                          </h4>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                            Sur-mesure dès 2 000 €
                          </span>
                        </div>
                        <p className={`text-[11px] mt-0.5 ${theme.textMuted}`}>
                          Module caisse tactile, gestion des réservations, synchronisation des stocks, fichiers clients et exports comptables.
                        </p>
                      </div>
                    </label>

                    {hasPosCrm && (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <input
                          type="number"
                          value={posCrmPrice}
                          min={2000}
                          step={100}
                          onChange={(e) => setPosCrmPrice(Math.max(2000, Number(e.target.value) || 2000))}
                          className={`w-28 px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold ${theme.inputBg} ${theme.border} text-amber-600 dark:text-amber-400 text-right`}
                        />
                        <span className="text-xs font-bold text-zinc-500">€ HT</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* B. Pack Multilingue (100 € par langue choisie) */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    selectedLanguages.length > 0
                      ? "border-indigo-500 ring-1 ring-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-500/10"
                      : `${theme.subCard} ${theme.border}`
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🌍</span>
                      <div>
                        <h4 className={`text-xs font-extrabold ${theme.textMain}`}>
                          Pack Multilingue · 100 € par langue choisie en plus
                        </h4>
                        <p className={`text-[11px] ${theme.textMuted}`}>
                          Traduction intégrale du site et adaptation des balises SEO par langue supplémentaire sélectionnée.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-black font-mono text-indigo-600 dark:text-indigo-400 shrink-0">
                      +{selectedLanguages.length * 100} € HT
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {AVAILABLE_LANGUAGES.map((lang) => {
                      const isLangSelected = selectedLanguages.includes(lang.code);
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => toggleLanguage(lang.code)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                            isLangSelected
                              ? "border-indigo-500 bg-indigo-500/20 text-indigo-700 dark:text-indigo-200 shadow-sm"
                              : `${theme.subCard} ${theme.border} ${theme.textMuted} hover:border-indigo-500/40`
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                          <span className="text-[10px] opacity-70">(+100 €)</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* C. Pack Visuel Studio & Drone Vidéo 4K (490 €, localisations exclusives) */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    hasVideoStudio
                      ? "border-rose-500 ring-1 ring-rose-500/30 bg-rose-500/5 dark:bg-rose-500/10"
                      : `${theme.subCard} ${theme.border}`
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasVideoStudio}
                        onChange={(e) => setHasVideoStudio(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-rose-500 focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base">🎥</span>
                          <h4 className={`text-xs font-extrabold ${theme.textMain}`}>
                            Pack Visuels Studio & Drone Vidéo 4K
                          </h4>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                            Localisations Exclusives
                          </span>
                        </div>
                        <p className={`text-[11px] mt-0.5 ${theme.textMuted}`}>
                          Tournage drone 4K & shooting studio réservé exclusivement aux zones : New York, Dubaï, Bali, Sud de la France.
                        </p>
                      </div>
                    </label>

                    <span className="text-xs font-black font-mono text-rose-600 dark:text-rose-400 shrink-0">
                      +490 € HT
                    </span>
                  </div>

                  {hasVideoStudio && (
                    <div className="mt-3 pt-3 border-t border-rose-500/20 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase">Zone de tournage sélectionnée :</span>
                      {ELIGIBLE_VIDEO_ZONES.map((zone) => (
                        <button
                          key={zone.id}
                          type="button"
                          onClick={() => setVideoZone(zone.id)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                            videoZone === zone.id
                              ? "bg-rose-500 text-white border-rose-600 shadow-sm"
                              : `${theme.subCard} ${theme.border} text-zinc-600 dark:text-zinc-300`
                          }`}
                        >
                          {zone.flag} {zone.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* D. Brand Identity Kit & Logo Vectoriel (229 €) */}
                <div
                  className={`p-3.5 rounded-2xl border transition-all ${
                    hasBrandKit
                      ? "border-amber-500 ring-1 ring-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10"
                      : `${theme.subCard} ${theme.border}`
                  }`}
                >
                  <label className="flex items-center justify-between gap-3 cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={hasBrandKit}
                        onChange={(e) => setHasBrandKit(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-0 cursor-pointer"
                      />
                      <span className="text-base">✨</span>
                      <div>
                        <h4 className={`text-xs font-bold ${theme.textMain}`}>
                          Brand Identity Kit & Logo Vectoriel
                        </h4>
                        <p className={`text-[10px] ${theme.textMuted}`}>
                          Logo vectoriel (AI/SVG/PNG/PDF), palette colorimétrique et Brand Book complet.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-black font-mono text-amber-600 dark:text-amber-400 shrink-0">
                      +229 € HT
                    </span>
                  </label>
                </div>
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
                        Dès 999 €/an · Garantie ou Remboursé
                      </span>
                    </div>
                    <p className={`text-[11px] mt-0.5 ${theme.textMuted}`}>
                      Audit d'emplacement, diagnostic concurrence et contrat stipulant délai garanti fixé et validé par Direction.
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
                  {/* Diagnostic préalable d'emplacement & concurrence */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">Tarif Annuel Fixé par Direction (€)</label>
                      <div className="relative mt-1">
                        <input
                          type="number"
                          value={mapsContract.price}
                          min={999}
                          step={50}
                          onChange={(e) => setMapsContract({ ...mapsContract, price: Math.max(999, Number(e.target.value) || 999) })}
                          className={`w-full px-3 py-2 rounded-xl border text-xs font-mono font-bold ${theme.inputBg} ${theme.border} text-amber-600 dark:text-amber-400`}
                        />
                        <span className="absolute right-3 top-2 text-xs text-zinc-400">€/an HT</span>
                      </div>
                      <p className="text-[9px] text-zinc-400 mt-1">Plancher minimum : 999 €/an</p>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">Position Actuelle Analysée</label>
                      <input
                        type="text"
                        value={mapsContract.currentPosition || "Hors Top 20 Google Maps"}
                        onChange={(e) => setMapsContract({ ...mapsContract, currentPosition: e.target.value })}
                        placeholder="Ex: #7, #14 ou Hors Top 20"
                        className={`w-full mt-1 px-3 py-2 rounded-xl border text-xs ${theme.inputBg} ${theme.border} ${theme.textMain}`}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">Délai Contractuel Fixé par Nous</label>
                      <select
                        value={mapsContract.deliveryDelayDays}
                        onChange={(e) => setMapsContract({ ...mapsContract, deliveryDelayDays: Number(e.target.value) })}
                        className={`w-full mt-1 px-3 py-2 rounded-xl border text-xs ${theme.inputBg} ${theme.border} ${theme.textMain}`}
                      >
                        <option value={30}>30 jours (1 mois - Faible concurrence)</option>
                        <option value={60}>60 jours (2 mois - Secteur modéré)</option>
                        <option value={90}>90 jours (3 mois - Standard recommandé)</option>
                        <option value={180}>180 jours (6 mois - Concurrence élevée)</option>
                        <option value={365}>365 jours (1 an - Marché ultra-concurrentiel)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">Zone Géographique Ciblée</label>
                      <input
                        type="text"
                        value={mapsContract.targetZone}
                        onChange={(e) => setMapsContract({ ...mapsContract, targetZone: e.target.value })}
                        placeholder="Ex: Cannes & Côte d'Azur / Paris 8e"
                        className={`w-full mt-1 px-3 py-2 rounded-xl border text-xs ${theme.inputBg} ${theme.border} ${theme.textMain}`}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">Mots-clés Stratégiques Validés</label>
                      <input
                        type="text"
                        value={mapsContract.keywords}
                        onChange={(e) => setMapsContract({ ...mapsContract, keywords: e.target.value })}
                        placeholder="Ex: Restaurant gastronomique, Traiteur événementiel"
                        className={`w-full mt-1 px-3 py-2 rounded-xl border text-xs ${theme.inputBg} ${theme.border} ${theme.textMain}`}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300">
                      <ShieldCheck className="w-4 h-4 text-amber-500" />
                      Clause Contractuelle d'Engagement & Garantie :
                    </div>
                    <p className="text-[10px] text-zinc-600 dark:text-zinc-300 italic">
                      "Positionnement garanti dans le Top 3 Google Maps sous {mapsContract.deliveryDelayDays} jours sur la zone {mapsContract.targetZone || "ciblée"}, ou remboursement intégral immédiat sans frais."
                    </p>
                    <div className="text-[9px] font-bold text-amber-600 dark:text-amber-400 mt-1">
                      ✓ Validation requise : Antoine Rebuffé-Rousseau (Direction XR Agency)
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. OFFRES MENSUELLES RÉCURRENTES (MRR - 3 OFFRES PAR DOMAINE) */}
            <div className="space-y-4">
              <label className="text-xs font-extrabold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 4. Abonnements Mensuels Récurrents (MRR - Sans Engagement)
              </label>

              {/* A. Les 3 Offres Réseaux Sociaux */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-sm">📱</span> Pôle Réseaux Sociaux (3 Formules) :
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {SOCIAL_MEDIA_OFFERS.map((soc) => {
                    const isChecked = selectedMrrIds.includes(soc.id);
                    return (
                      <div
                        key={soc.id}
                        onClick={() => toggleMrr(soc.id)}
                        className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-between gap-2 transition-all ${
                          isChecked
                            ? "border-emerald-500 ring-1 ring-emerald-500/30 bg-emerald-500/10"
                            : `${theme.subCard} ${theme.border} hover:border-emerald-500/40`
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="w-4 h-4 rounded text-emerald-500 focus:ring-0 cursor-pointer"
                            />
                            <span className="text-xs font-black font-mono text-emerald-600 dark:text-emerald-400">
                              {soc.price} €/m
                            </span>
                          </div>
                          <h5 className={`text-xs font-bold mt-1.5 ${theme.textMain}`}>{soc.label}</h5>
                          <p className={`text-[10px] mt-0.5 ${theme.textMuted}`}>{soc.sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* B. Les 3 Offres SEO */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-sm">📈</span> Pôle Référencement SEO (3 Formules) :
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {SEO_OFFERS.map((seo) => {
                    const isChecked = selectedMrrIds.includes(seo.id);
                    return (
                      <div
                        key={seo.id}
                        onClick={() => toggleMrr(seo.id)}
                        className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-between gap-2 transition-all ${
                          isChecked
                            ? "border-emerald-500 ring-1 ring-emerald-500/30 bg-emerald-500/10"
                            : `${theme.subCard} ${theme.border} hover:border-emerald-500/40`
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="w-4 h-4 rounded text-emerald-500 focus:ring-0 cursor-pointer"
                            />
                            <span className="text-xs font-black font-mono text-emerald-600 dark:text-emerald-400">
                              {seo.price} €/m
                            </span>
                          </div>
                          <h5 className={`text-xs font-bold mt-1.5 ${theme.textMain}`}>{seo.label}</h5>
                          <p className={`text-[10px] mt-0.5 ${theme.textMuted}`}>{seo.sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* C. Les 3 Offres WebCare & Maintenance */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-sm">🛡️</span> Pôle WebCare Maintenance & Sérénité (3 Formules) :
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {WEBCARE_OFFERS.map((wc) => {
                    const isChecked = selectedMrrIds.includes(wc.id);
                    return (
                      <div
                        key={wc.id}
                        onClick={() => toggleMrr(wc.id)}
                        className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-between gap-2 transition-all ${
                          isChecked
                            ? "border-emerald-500 ring-1 ring-emerald-500/30 bg-emerald-500/10"
                            : `${theme.subCard} ${theme.border} hover:border-emerald-500/40`
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="w-4 h-4 rounded text-emerald-500 focus:ring-0 cursor-pointer"
                            />
                            <span className="text-xs font-black font-mono text-emerald-600 dark:text-emerald-400">
                              {wc.price} €/m
                            </span>
                          </div>
                          <h5 className={`text-xs font-bold mt-1.5 ${theme.textMain}`}>{wc.label}</h5>
                          <p className={`text-[10px] mt-0.5 ${theme.textMuted}`}>{wc.sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 5. LOCALISATION DU CLIENT & CALCUL AUTOMATIQUE DE LA TVA */}
            <div className={`p-4 sm:p-5 rounded-2xl border space-y-3.5 ${theme.subCard} ${theme.border}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> 5. Localisation Client & Calcul Automatique de TVA
                </label>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                  {tax.regimeName}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase">Pays du client</label>
                  <select
                    value={clientCountryCode}
                    onChange={(e) => setClientCountryCode(e.target.value)}
                    className={`w-full mt-1 px-3 py-2 rounded-xl border text-xs font-semibold ${theme.inputBg} ${theme.border} ${theme.textMain}`}
                  >
                    {SUPPORTED_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name} {c.isEU ? "(UE)" : "(Hors UE)"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase">Typologie client</label>
                  <select
                    value={clientType}
                    onChange={(e) => setClientType(e.target.value as "b2b" | "b2c")}
                    className={`w-full mt-1 px-3 py-2 rounded-xl border text-xs font-semibold ${theme.inputBg} ${theme.border} ${theme.textMain}`}
                  >
                    <option value="b2b">Entreprise / Professionnel (B2B)</option>
                    <option value="b2c">Particulier (B2C)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase">Société émettrice prestataire</label>
                  <select
                    value={issuerEntity}
                    onChange={(e) => setIssuerEntity(e.target.value as TaxIssuerEntity)}
                    className={`w-full mt-1 px-3 py-2 rounded-xl border text-xs font-semibold ${theme.inputBg} ${theme.border} ${theme.textMain}`}
                  >
                    <option value="FR_SASU">KARMA SASU (France · Paris 8e) [Actif]</option>
                    <option value="US_LLC">XR AGENCY LLC (USA · Delaware/Wyoming)</option>
                    <option value="HK_LTD">XR AGENCY LIMITED (Hong Kong)</option>
                  </select>
                </div>
              </div>

              {clientCountryCode !== "FR" && clientCountryCode !== "MC" && SUPPORTED_COUNTRIES.find((c) => c.code === clientCountryCode)?.isEU && clientType === "b2b" && (
                <div className="pt-1">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase">
                    N° de TVA Intracommunautaire du Client (requis pour autoliquidation)
                  </label>
                  <input
                    type="text"
                    value={clientVatNumber}
                    onChange={(e) => setClientVatNumber(e.target.value)}
                    placeholder="Ex: BE0123456789, LU12345678, DE123456789..."
                    className={`w-full mt-1 px-3 py-2 rounded-xl border text-xs font-mono font-bold ${theme.inputBg} ${theme.border} ${theme.textMain}`}
                  />
                </div>
              )}

              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Régime : {tax.regimeName} — Taux TVA : <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">{tax.taxRateLabel}</strong>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {tax.legalNotice}
                  </p>
                </div>

                <div className="text-right shrink-0 font-mono text-xs font-bold text-zinc-700 dark:text-zinc-200">
                  <div>HT : {tax.oneShotHt.toLocaleString("fr-FR")} €</div>
                  <div>TVA : {tax.oneShotTax.toLocaleString("fr-FR")} €</div>
                  <div className="text-indigo-600 dark:text-indigo-400">TTC : {tax.oneShotTtc.toLocaleString("fr-FR")} €</div>
                </div>
              </div>
            </div>

            {/* 6. MODALITÉS DE PAIEMENT & COORDONNÉES BANCAIRES */}
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
                    ? `Acompte net de ${tax.depositTtc.toLocaleString("fr-FR")} € TTC par virement, solde à la livraison.`
                    : `3 règlements égaux de ${tax.installment3xTtc.toLocaleString("fr-FR")} € TTC.`}
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${theme.subCard} ${theme.border} space-y-1.5`}>
                <label className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-amber-500" /> RIB Agence (Compte Qonto)
                </label>
                <p className="text-[11px] font-bold text-zinc-700 dark:text-zinc-200">
                  {tax.issuerEntity === "FR_SASU" ? "KARMA SASU · XR AGENCY" : tax.issuerEntity === "US_LLC" ? "XR AGENCY LLC" : "XR AGENCY LIMITED"}
                </p>
                <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                  IBAN : FR76 1695 8000 0112 3456 7890 123
                </p>
                <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                  Motif virement : {currentQuoteRef} - {lead.name.slice(0, 14)}
                </p>
              </div>
            </div>

            {/* 7. BANDEAU DES TOTAUX EN DIRECT */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-zinc-900 to-indigo-950 text-white flex flex-wrap items-center justify-between gap-4 shadow-xl">
              <div>
                <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                  Total Devis ({tax.clientCountryLabel} · {tax.taxRateLabel}) :
                </div>
                <div className="flex flex-wrap items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black font-mono text-amber-400">
                    {tax.oneShotTtc.toLocaleString("fr-FR")} € TTC
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    ({tax.oneShotHt.toLocaleString("fr-FR")} € HT + {tax.oneShotTax.toLocaleString("fr-FR")} € TVA)
                  </span>
                  {tax.mrrHt > 0 && (
                    <span className="text-xs font-mono font-bold text-emerald-400 ml-2">
                      + {tax.mrrTtc.toLocaleString("fr-FR")} € TTC/mois
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Acompte 50 % exigible (TTC) :</div>
                <div className="text-xl font-black font-mono text-emerald-400">
                  {tax.depositTtc.toLocaleString("fr-FR")} € TTC
                </div>
              </div>
            </div>

            {/* SECTION ACTIONS DU WORKFLOW */}
            <div className="space-y-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              {/* Note d'ajustement si direction */}
              {isDirector && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
                  <label className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">
                    Directeur · Notes & Ajustements d'Antoine pour le commercial :
                  </label>
                  <input
                    type="text"
                    value={quoteDirectorNotes}
                    onChange={(e) => setQuoteDirectorNotes(e.target.value)}
                    placeholder="Ex: Tarif Maps ajusté à 1 490 €/an compte tenu de la forte concurrence locale..."
                    className={`w-full px-3 py-1.5 rounded-xl border text-xs ${theme.inputBg} ${theme.border} ${theme.textMain}`}
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Bouton Téléchargement Devis */}
                <button
                  type="button"
                  onClick={handleDownloadQuotePdf}
                  className="px-4 py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Download className="w-4 h-4 text-amber-500" />
                  Télécharger Devis & Contrat PDF
                </button>

                <div className="flex flex-wrap items-center gap-2.5 ml-auto">
                  {/* SI COMMERCIAL : SOUMETTRE À ANTOINE */}
                  {!isDirector && quoteWorkflowStatus !== "approved" && (
                    <button
                      type="button"
                      onClick={handleSubmitToDirector}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <Send className="w-4 h-4 text-white" />
                      Soumettre pour validation à Antoine (Direction)
                    </button>
                  )}

                  {/* SI ANTOINE (OU DIRECTEUR) : VALIDER LE DEVIS */}
                  {isDirector && (
                    <button
                      type="button"
                      onClick={handleDirectorApprove}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <Award className="w-4 h-4 text-white" />
                      ✓ Valider & Générer Devis Officiel (Antoine)
                    </button>
                  )}

                  {/* BOUTON ENCAISSEMENT ACOMPTE & DATE D'ENTREE CLIENT */}
                  <button
                    type="button"
                    onClick={handleConfirmDepositAndOnboarding}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md"
                    title="Confirme la réception de l'acompte 50%, enregistre la date d'entrée client et génère la facture acquittée"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    ✓ Acompte 50% Reçu (Date d'Entrée Client & Facture)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}