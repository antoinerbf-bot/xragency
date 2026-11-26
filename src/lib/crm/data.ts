// ── XR AGENCY CRM — Modèle Unifié (v3002 + extensions ERP v3004), RBAC strict, 8 Services Officiels & Commissions ──

export type UserRoleType =
  | "direction"
  | "manager"
  | "setter"
  | "closer"
  | "full_cycle"
  | "student"
  | "studio";

export interface TeamMember {
  id: string;
  name: string;
  shortName: string;
  roleLabel: string;
  roleType: UserRoleType;
  email?: string;
  recruitedBy?: string; // ex: "martin" -> Martin voit ce membre et touche son override 10%
  settingRate: number; // % si agit en tant que Setter
  closingRate: number; // % si agit en tant que Closer
  fullCycleRate: number; // % si fait Setting + Closing
  overrideRate?: number; // % Manager sur les ventes des candidats qu'il ramène
  avatarBg: string;
  badge: string; // JAMAIS de % affiché dans le badge public pour préserver la confidentialité
  pin: string; // Vide pour la Direction côté client (vérifié côté serveur sur /api/crm-auth)
  customPinSet?: boolean;
}

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "antoine",
    name: "Antoine Rousseau",
    shortName: "Antoine",
    roleLabel: "Directeur Général & Fondateur",
    roleType: "direction",
    email: "contact.xragency@gmail.com",
    settingRate: 1,
    closingRate: 1,
    fullCycleRate: 1,
    avatarBg: "from-amber-400 via-amber-500 to-orange-600",
    badge: "👑 Direction",
    pin: "", // Vérifié exclusivement côté serveur (/api/crm-auth)
    customPinSet: true,
  },
  {
    id: "martin",
    name: "Martin",
    shortName: "Martin",
    roleLabel: "Manager RH & Closer Senior",
    roleType: "manager",
    email: "martin.leclipteur@gmail.com",
    settingRate: 0.1,
    closingRate: 0.2,
    fullCycleRate: 0.2,
    overrideRate: 0.1,
    avatarBg: "from-blue-500 to-indigo-600",
    badge: "👥 Manager RH",
    pin: "2026",
  },
  {
    id: "lucas",
    name: "Lucas Mercier",
    shortName: "Lucas",
    roleLabel: "Commercial Full-Cycle",
    roleType: "full_cycle",
    settingRate: 0.1,
    closingRate: 0.2,
    fullCycleRate: 0.3,
    avatarBg: "from-emerald-500 to-teal-700",
    badge: "⚡ Full-Cycle",
    pin: "1010",
  },
  {
    id: "sarah",
    name: "Sarah Benali",
    shortName: "Sarah",
    roleLabel: "Commerciale Full-Cycle",
    roleType: "full_cycle",
    settingRate: 0.1,
    closingRate: 0.2,
    fullCycleRate: 0.3,
    avatarBg: "from-pink-500 to-rose-700",
    badge: "⚡ Full-Cycle",
    pin: "2020",
  },
  {
    id: "christel",
    name: "Christel Thirion",
    shortName: "Christel",
    roleLabel: "Closer B2B",
    roleType: "closer",
    email: "christelthirion@msn.com",
    recruitedBy: "martin",
    settingRate: 0.1,
    closingRate: 0.2,
    fullCycleRate: 0.2,
    avatarBg: "from-purple-500 to-violet-700",
    badge: "🎯 Closer",
    pin: "3030",
  },
  {
    id: "camille",
    name: "Camille Bernard",
    shortName: "Camille",
    roleLabel: "Setter / Prospection B2B",
    roleType: "setter",
    recruitedBy: "martin",
    settingRate: 0.1,
    closingRate: 0.15,
    fullCycleRate: 0.2,
    avatarBg: "from-cyan-500 to-blue-700",
    badge: "📞 Setter",
    pin: "4040",
  },
  {
    id: "karim",
    name: "Karim",
    shortName: "Karim",
    roleLabel: "Élève XR School · Commercial",
    roleType: "student",
    recruitedBy: "martin",
    settingRate: 0.1,
    closingRate: 0.15,
    fullCycleRate: 0.15,
    avatarBg: "from-amber-600 to-orange-700",
    badge: "🎓 Élève XR School",
    pin: "5050",
  },
  {
    id: "emma",
    name: "Emma",
    shortName: "Emma",
    roleLabel: "Élève XR School · Commerciale",
    roleType: "student",
    recruitedBy: "martin",
    settingRate: 0.1,
    closingRate: 0.15,
    fullCycleRate: 0.15,
    avatarBg: "from-fuchsia-500 to-purple-700",
    badge: "🎓 Élève XR School",
    pin: "6060",
  },
  {
    id: "studio",
    name: "Studio Créatif & Dév",
    shortName: "Studio",
    roleLabel: "Pôle Production, Maquettes & Déploiement",
    roleType: "studio",
    settingRate: 0,
    closingRate: 0,
    fullCycleRate: 0,
    avatarBg: "from-zinc-700 to-zinc-950",
    badge: "🎨 Studio",
    pin: "0000",
  },
];

// ── Les 8 Services Officiels XRAGENCY (100 % alignés avec xragencyai.com) ──

export type BillingPeriod = "once" | "month" | "year";

export interface ServicePlan {
  id: string;
  label: string;
  price: number;
  period: BillingPeriod;
}

export interface XrOfficialService {
  id: string;
  num: string;
  name: string;
  shortName: string;
  icon: string;
  category: string;
  billing: BillingPeriod;
  defaultPrice: number;
  deliverable: string;
  upsellHint?: string;
  plans: ServicePlan[];
}

export const XR_OFFICIAL_SERVICES: XrOfficialService[] = [
  {
    id: "websites",
    num: "01",
    name: "Création de Sites Web Haute Couture",
    shortName: "Site Web",
    icon: "🌐",
    category: "Web & Conversion",
    billing: "once",
    defaultPrice: 799,
    deliverable:
      "Design sur mesure responsive mobile, rapidité optimale, SEO technique, formulaires connectés et mise en ligne clé en main.",
    upsellHint: "Coupler avec Infrastructure 79 €/an + WebCare (49 €/mois) ou Google Maps (999 €/an)",
    plans: [
      { id: "vitrine", label: "Site Vitrine Pro (3 pages)", price: 499, period: "once" },
      { id: "business", label: "Site Business (5 pages + Blog)", price: 799, period: "once" },
      { id: "ecommerce", label: "E-commerce, Click & Collect & Réservation", price: 1499, period: "once" },
    ],
  },
  {
    id: "branding",
    num: "02",
    name: "Branding & Identité de Prestige",
    shortName: "Branding",
    icon: "✨",
    category: "Identité Visuelle",
    billing: "once",
    defaultPrice: 229,
    deliverable:
      "Logo vectoriel haute définition (AI, SVG, PNG, PDF), palette chromatique, typographies, Brand Book et cession des droits.",
    upsellHint: "Idéal en ouverture avant un Site Vitrine Pro (499 €) ou Business (799 €)",
    plans: [
      { id: "logo", label: "Logo Signature", price: 179, period: "once" },
      { id: "kit", label: "Brand Identity Kit", price: 229, period: "once" },
      { id: "suite", label: "Full Brand Suite + Brand Book", price: 349, period: "once" },
    ],
  },
  {
    id: "seo",
    num: "03",
    name: "Référencement SEO & Autorité Google",
    shortName: "SEO Mensuel",
    icon: "📈",
    category: "Acquisition Organique",
    billing: "month",
    defaultPrice: 299,
    deliverable:
      "Audit sémantique complet, optimisation technique et éditoriale, netlinking d'autorité et reporting mensuel des positions.",
    upsellHint: "Combiner avec la Stratégie Google Maps (999 €/an) pour verrouiller le local + national",
    plans: [
      { id: "seo-start", label: "SEO Croissance Locale", price: 299, period: "month" },
      { id: "seo-pro", label: "SEO Performance Nationale", price: 499, period: "month" },
      { id: "seo-authority", label: "SEO Autorité & Domination", price: 899, period: "month" },
    ],
  },
  {
    id: "maps",
    num: "04",
    name: "Google Maps & Pack Local Top 3",
    shortName: "Google Maps",
    icon: "📍",
    category: "Visibilité Locale",
    billing: "year",
    defaultPrice: 999,
    deliverable:
      "Audit de zone préalable, restructuration Google Business Profile, photos géotaggées, citations NAP, collecte d'avis 5★ et suivi 12 mois.",
    upsellHint: "Proposer le Pack Conquête Top 3 (1 490 €/an) sur les villes à forte concurrence",
    plans: [
      { id: "maps-strategy", label: "Stratégie Visibilité Google Maps (1 An)", price: 999, period: "year" },
      { id: "maps-conquest", label: "Pack Conquête & Domination Top 3 (1 An)", price: 1490, period: "year" },
      { id: "maps-network", label: "Pack Multi-Établissements & Réseau (jusqu'à 3 fiches)", price: 2490, period: "year" },
    ],
  },
  {
    id: "social",
    num: "05",
    name: "Social Media & Studio Vidéo 4K",
    shortName: "Social Media",
    icon: "📱",
    category: "Réseaux Sociaux",
    billing: "month",
    defaultPrice: 599,
    deliverable:
      "Ligne éditoriale, création de carrousels, Reels et Stories, rédaction des légendes, planification et reporting mensuel.",
    upsellHint: "Ajouter le Brand Identity Kit (229 €) pour harmoniser tout le feed Instagram/TikTok",
    plans: [
      { id: "social-1", label: "Présence Essentielle (1 réseau)", price: 349, period: "month" },
      { id: "social-2", label: "Croissance Active (Multi-réseaux + Reels)", price: 599, period: "month" },
      { id: "social-3", label: "Domination Studio 4K", price: 799, period: "month" },
    ],
  },
  {
    id: "maintenance",
    num: "06",
    name: "WebCare, Maintenance & Cyber-Sécurité",
    shortName: "WebCare",
    icon: "🛡️",
    category: "Infrastructure & Suivi",
    billing: "month",
    defaultPrice: 49,
    deliverable:
      "Hébergement haute disponibilité, SSL/WAF, sauvegardes quotidiennes chiffrées, mises à jour et modifications courantes rapides.",
    upsellHint: "Toujours inclure l'Infrastructure Annuelle (79 €/an) avec chaque création de site",
    plans: [
      { id: "wc-infra", label: "Infrastructure Cloud & Sécurité Annuelle", price: 79, period: "year" },
      { id: "wc-essentiel", label: "WebCare Essentiel (4 modifs/mois)", price: 29, period: "month" },
      { id: "wc-pro", label: "WebCare Pro (10 modifs/mois · Prioritaire)", price: 49, period: "month" },
      { id: "wc-business", label: "WebCare Business (Modifications illimitées)", price: 99, period: "month" },
    ],
  },
  {
    id: "crm",
    num: "07",
    name: "CRM Sur-Mesure, Caisse POS & Jumeau 3D",
    shortName: "CRM & POS",
    icon: "💻",
    category: "Logiciels Métier 0% Commission",
    billing: "once",
    defaultPrice: 2000,
    deliverable:
      "Logiciel métier 100 % propriétaire sans abonnement prédateur ni commission (Caisse POS, KDS cuisine, Click & Collect, stocks, fidélité ou Jumeau 3D).",
    upsellHint: "Présenter le Jumeau Numérique 3D Multi-Sites (5 000 €) aux groupes hôteliers, franchises et réseaux",
    plans: [
      { id: "crm-pro", label: "Pack Pro Business POS & CRM Sur-Mesure (0% commission)", price: 2000, period: "once" },
      { id: "crm-3d", label: "Jumeau Numérique 3D & Supervision Multi-Sites", price: 5000, period: "once" },
    ],
  },
  {
    id: "robotics",
    num: "08",
    name: "Robotique Autonome & IA Physique Korben",
    shortName: "Robot Korben",
    icon: "🤖",
    category: "Robotique & IA High-Ticket",
    billing: "month",
    defaultPrice: 499,
    deliverable:
      "Audit d'implantation, sélection robot autonome Korben (accueil, service salle, nettoyage, logistique), paramétrage et SAV.",
    upsellHint: "Proposer une journée Démonstration sur site (250 €) pour déclencher le leasing ou l'achat",
    plans: [
      { id: "robot-demo", label: "Démonstration Événementielle sur site", price: 250, period: "once" },
      { id: "robot-leasing", label: "Location Mensuelle Korben Clé en Main", price: 499, period: "month" },
      { id: "robot-buy", label: "Achat Professionnel Robot Korben (HT)", price: 12000, period: "once" },
    ],
  },
];

// ── Modèle de Lead / Prospect avec Split Setter / Closer, Suivi Relance & Briques ERP v3004 ──

export type LeadStage = "new" | "rdv" | "mockup" | "negociation" | "won";
export type CommissionStatus = "estimated" | "pending_payment" | "unlocked";
export type LeadPriority = "urgent" | "high" | "normal";
export type ProjectMilestone = "cadrage" | "design" | "dev" | "recette" | "live";
export type InvoiceStatus = "none" | "quote_sent" | "pending_transfer" | "deposit_paid" | "paid_full";

export interface LeadServiceItem {
  id: string;
  serviceId: string;
  planLabel: string;
  billing: BillingPeriod;
  price: number;
}

export interface Lead {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email?: string;
  websiteUrl?: string;
  city?: string;
  source?: string;
  priority?: LeadPriority;
  callsCount?: number;
  sectorId: string;
  serviceId: string;
  planLabel: string;
  billing: BillingPeriod;
  value: number;
  extraItems?: LeadServiceItem[];
  stage: LeadStage;
  setterId: string;
  closerId: string;
  issue: string;
  notes: string;
  followUpDate?: string; // YYYY-MM-DD
  createdAt: string;
  wonAt?: string; // ISO date de signature
  wonMonth?: string; // YYYY-MM
  installments?: { plan: "1x" | "3x"; paidCount: number };
  commissionStatus: CommissionStatus;
  mockupReady?: boolean;
  mockupUrl?: string;
  studioStatus?: "pending" | "in_production" | "delivered";
  projectMilestone?: ProjectMilestone;
  providerId?: string;
  providerCost?: number;
  invoiceStatus?: InvoiceStatus;
  invoiceRef?: string;
  timeline?: { id: string; date: string; text: string }[];
}

// ── Modèle Prestataire Externe (Sous-traitance & Marge Nette Direction — récupéré de v3004) ──

export interface ExternalProvider {
  id: string;
  name: string;
  specialty: string;
  city: string;
  contact: string;
  avgRateEur: number;
  rating: number;
  notes?: string;
}

export const DEFAULT_PROVIDERS: ExternalProvider[] = [
  {
    id: "prov-web",
    name: "Atelier Front & UI (Da Nang)",
    specialty: "Sites Web Haute Couture & E-commerce",
    city: "Da Nang · UTC+7",
    contact: "studio.vn@xragencyai.com",
    avgRateEur: 220,
    rating: 5,
    notes: "Intégration React/Tailwind ultra-rapide en 72h.",
  },
  {
    id: "prov-maps",
    name: "Pôle Local SEO & Citations",
    specialty: "Google Maps Pack Local & Netlinking",
    city: "Paris · UTC+1",
    contact: "seo@xragencyai.com",
    avgRateEur: 180,
    rating: 5,
    notes: "Restructuration GBP, photos géotaggées et citations NAP.",
  },
  {
    id: "prov-video",
    name: "Collectif Reels & Motion 4K",
    specialty: "Montage Reels, TikTok & Direction Artistique",
    city: "Paris / Dubaï",
    contact: "social@xragencyai.com",
    avgRateEur: 150,
    rating: 5,
    notes: "Pack mensuel Reels sous-titrés dynamiques.",
  },
  {
    id: "prov-crm",
    name: "Ingénierie Full-Stack POS & 3D",
    specialty: "CRM Sur-Mesure, KDS & Jumeau Numérique 3D",
    city: "Da Nang / Paris",
    contact: "dev-crm@xragencyai.com",
    avgRateEur: 550,
    rating: 5,
    notes: "Déploiement POS, Supabase et vue 3D isométrique.",
  },
];

// ── Modèle Événement Calendrier Commercial (récupéré de v3004) ──

export interface CrmAppointment {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  leadId?: string;
  leadName?: string;
  ownerId: string;
  kind: "call" | "demo_mockup" | "closing" | "kickoff";
  done: boolean;
}

// ── Coordonnées Bancaires Facturation & RIB XRAGENCY (configurables Direction) ──

export interface CrmBankConfig {
  companyLegal: string;
  siret: string;
  address: string;
  bankName: string;
  iban: string;
  bic: string;
  taxNotice: string;
}

export const DEFAULT_BANK_CONFIG: CrmBankConfig = {
  companyLegal: "KARMA SASU · XR AGENCY",
  siret: "SIREN 889 178 141 · SIRET 889 178 141 00012",
  address: "78 Avenue des Champs-Élysées, 75008 Paris",
  bankName: "Qonto / Banque Professionnelle France",
  iban: "FR76 1695 8000 0100 0000 0000 042",
  bic: "QNTOFRP1XXX",
  taxNotice: "TVA non applicable, art. 293 B du CGI (ou autoliquidation internationale selon juridiction).",
};

// ── Somme Multi-Services (One-Shot + MRR + Annuel + Base de commission) ──

export function getLeadTotals(lead: Lead): {
  oneShotTotal: number;
  mrrTotal: number;
  annualTotal: number;
  commissionBase: number;
  itemsCount: number;
} {
  let oneShotTotal = 0;
  let mrrTotal = 0;
  let annualTotal = 0;

  if (lead.billing === "month") mrrTotal += lead.value;
  else if (lead.billing === "year") {
    oneShotTotal += lead.value;
    annualTotal += lead.value;
  } else {
    oneShotTotal += lead.value;
  }

  (lead.extraItems || []).forEach((item) => {
    if (item.billing === "month") mrrTotal += item.price;
    else if (item.billing === "year") {
      oneShotTotal += item.price;
      annualTotal += item.price;
    } else {
      oneShotTotal += item.price;
    }
  });

  return {
    oneShotTotal,
    mrrTotal,
    annualTotal,
    commissionBase: oneShotTotal + mrrTotal, // Base 1er mois MRR + Annuel/One-Shot encaissé
    itemsCount: 1 + (lead.extraItems?.length || 0),
  };
}

// ── Règles strictes de visibilité (RBAC) ──

export function canViewLead(viewer: TeamMember, lead: Lead, members: TeamMember[]): boolean {
  if (viewer.roleType === "direction") return true;
  if (viewer.roleType === "studio") return lead.stage === "mockup" || lead.stage === "won";

  if (viewer.roleType === "manager") {
    if (lead.setterId === viewer.id || lead.closerId === viewer.id) return true;
    const setter = members.find((m) => m.id === lead.setterId);
    const closer = members.find((m) => m.id === lead.closerId);
    return setter?.recruitedBy === viewer.id || closer?.recruitedBy === viewer.id;
  }

  return lead.setterId === viewer.id || lead.closerId === viewer.id;
}

export function canViewMemberFinances(viewer: TeamMember, target: TeamMember): boolean {
  if (viewer.roleType === "direction") return true;
  if (viewer.id === target.id) return true;
  if (viewer.roleType === "manager" && target.recruitedBy === viewer.id) return true;
  return false;
}

// ── Moteur de calcul des commissions (Pack Multi-Services + Split Setter/Closer + Override Manager 10%) ──

export interface DealCommissionBreakdown {
  setterAmount: number;
  closerAmount: number;
  managerOverrideAmount: number;
  managerId: string | null;
}

export function computeDealCommissions(lead: Lead, members: TeamMember[]): DealCommissionBreakdown {
  const setter = members.find((m) => m.id === lead.setterId);
  const closer = members.find((m) => m.id === lead.closerId);
  const baseValue = getLeadTotals(lead).commissionBase;

  let setterAmount = 0;
  let closerAmount = 0;

  if (lead.setterId === lead.closerId) {
    const rate = closer?.roleType === "direction" ? 0 : (closer?.fullCycleRate ?? 0.2);
    closerAmount = Math.round(baseValue * rate);
  } else {
    const sRate = setter?.roleType === "direction" ? 0 : (setter?.settingRate ?? 0.1);
    const cRate = closer?.roleType === "direction" ? 0 : (closer?.closingRate ?? 0.15);
    setterAmount = Math.round(baseValue * sRate);
    closerAmount = Math.round(baseValue * cRate);
  }

  let managerOverrideAmount = 0;
  let managerId: string | null = null;
  const recruiterId = closer?.recruitedBy || setter?.recruitedBy;
  if (recruiterId) {
    const manager = members.find((m) => m.id === recruiterId);
    if (manager?.overrideRate) {
      managerId = manager.id;
      managerOverrideAmount = Math.round(baseValue * manager.overrideRate);
    }
  }

  return { setterAmount, closerAmount, managerOverrideAmount, managerId };
}

export function formatPricePeriod(value: number, billing: BillingPeriod): string {
  const formatted = value.toLocaleString("fr-FR") + " €";
  if (billing === "month") return `${formatted}/mois`;
  if (billing === "year") return `${formatted}/an`;
  return formatted;
}
