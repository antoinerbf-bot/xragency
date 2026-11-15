import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export type CrmRole = "admin" | "manager" | "closer" | "member" | "subcontractor";

export type LeadStatus =
  | "new"
  | "to_qualify"
  | "to_call"
  | "contacted"
  | "in_progress"
  | "callback"
  | "proposal_prep"
  | "proposal_sent"
  | "negotiation"
  | "signed"
  | "outsourced"
  | "lost";

export type LeadPriority = "urgent" | "high" | "normal";

export interface CrmMemberRecord {
  id: string;
  email: string;
  fullName: string;
  title: string;
  role: "admin" | "member";
  portalType?: "director" | "closer" | "student";
  phoneLine: string;
  commissionPct: number;
  passwordHash: string;
  active: boolean;
  createdAt: string;
}

export interface OutsourceRequest {
  scope: string;
  budgetAllocated: number;
  deadline: string;
  brief: string;
  requestedAt: string;
  requestedBy: string;
}

export interface CrmCallLog {
  id: string;
  leadId: string;
  memberId: string;
  memberName: string;
  durationMinutes?: number;
  summary: string;
  outcome: string;
  nextAction?: string;
  followUpDate?: string;
  createdAt: string;
}

export interface CrmLead {
  id: string;
  company: string;
  contactName: string;
  phone: string;
  email: string;
  website?: string;
  city: string;
  country?: string;
  sector: string;
  serviceTarget: string;
  budgetEur: number;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo: string;
  sentBy: string;
  source: string;
  notes: string;
  nextFollowUp: string;
  callsCount: number;
  lossReason?: string;
  convertedClientId?: string;
  outsourceRequest?: OutsourceRequest;
  callLogs?: CrmCallLog[];
  screenshotUrl?: string;
  maquetteStatus?: "none" | "pending" | "validated";
  maquetteUrl?: string;
  maquetteBrief?: string;
  maquetteRequestedAt?: string;
  maquetteValidatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Calcule la commission exacte selon les règles officielles XR Agency :
 * - 30 % sur les Sites Internet (Vitrine, Business, E-commerce)
 * - 20 % sur la vente de CRM / Systèmes POS sur-mesure
 * - 10 % sur Google Maps (Top 3 & GBP) et toutes les offres mensuelles (SEO, Community Management, WebCare)
 */
export function computeLeadCommissionRate(serviceTarget: string): { ratePct: number; ruleLabel: string } {
  const s = (serviceTarget || "").toLowerCase();
  if (s.includes("crm") || s.includes("pos") || s.includes("caisse")) {
    return { ratePct: 20, ruleLabel: "20 % (Offre CRM / POS)" };
  }
  if (s.includes("site") || s.includes("vitrine") || s.includes("e-commerce") || s.includes("ecommerce") || s.includes("refonte") || s.includes("web")) {
    if (!s.includes("webcare")) {
      return { ratePct: 30, ruleLabel: "30 % (Site Internet)" };
    }
  }
  return { ratePct: 10, ruleLabel: "10 % (Google Maps / Mensuel)" };
}

export interface CrmClientRecord {
  id: string;
  leadId?: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  city: string;
  country: string;
  sector: string;
  servicesPurchased: string[];
  totalRevenueEur: number;
  status: "active" | "vip" | "archived";
  assignedTo: string;
  internalNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteItem {
  label: string;
  detail: string;
  priceEur: number;
  period: "once" | "month" | "year";
  quantity: number;
}

export interface CrmQuoteRecord {
  id: string; // e.g. DEV-2026-001
  clientId?: string;
  leadId?: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  items: QuoteItem[];
  totalOnceEur: number;
  totalMonthlyEur: number;
  totalAnnualEur: number;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  validUntil: string;
  paymentTerms: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  label: string;
  detail: string;
  amountEur: number;
}

export interface CrmInvoiceRecord {
  id: string; // e.g. FAC-2026-001 or VIR-2026-001
  quoteId?: string;
  clientId?: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  items: InvoiceItem[];
  totalEur: number;
  taxRatePct: number; // 0 for franchise or confirmed rate
  taxNotice: string;
  paymentMethod: "bank_transfer" | "stripe" | "other";
  paymentReference: string; // reconciliation code e.g. XR-PAY-8849
  bankDetails: {
    beneficiary: string;
    bankName: string;
    ibanMasked: string;
    bic: string;
    instructions: string;
  };
  status: "pending_transfer" | "paid" | "cancelled" | "refunded";
  paidAt?: string;
  validatedBy?: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  done: boolean;
  dueDate?: string;
}

export interface CrmProjectRecord {
  id: string; // e.g. PRJ-001
  clientId: string;
  clientName: string;
  projectName: string;
  serviceCategory: string;
  managerId: string;
  collaboratorIds: string[];
  stage: "prep" | "waiting" | "production" | "review" | "delivered" | "suspended";
  progressPct: number;
  budgetEur: number;
  startDate: string;
  deliveryDeadline: string;
  liveUrl?: string;
  stagingUrl?: string;
  milestones: ProjectMilestone[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CrmTaskRecord {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  priority: "urgent" | "high" | "normal";
  status: "todo" | "in_progress" | "done" | "overdue";
  category: "pro" | "perso";
  tag: string;
  linkedEntityType?: "lead" | "client" | "project" | "quote" | "invoice";
  linkedEntityId?: string;
  dueDate: string;
  doneAt?: string;
  createdAt: string;
}

export interface CrmProviderRecord {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  specialties: string[];
  hourlyRateEur?: number;
  availability: "available" | "busy" | "offline";
  missionsCount: number;
  totalPaidEur: number;
  notes: string;
  createdAt: string;
}

export interface CrmNotification {
  id: string;
  targetMemberId: string; // "all" or specific member ID
  type: "new_lead" | "payment_received" | "quote_accepted" | "task_due" | "project_update";
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface CrmActivity {
  id: string;
  leadId?: string;
  clientId?: string;
  projectId?: string;
  memberId: string;
  memberName: string;
  type: "assigned" | "call" | "status" | "note" | "outsource" | "client_created" | "quote_sent" | "payment_confirmed" | "task_done";
  message: string;
  createdAt: string;
}

export interface CrmStore {
  members: CrmMemberRecord[];
  leads: CrmLead[];
  clients: CrmClientRecord[];
  quotes: CrmQuoteRecord[];
  invoices: CrmInvoiceRecord[];
  projects: CrmProjectRecord[];
  tasks: CrmTaskRecord[];
  providers: CrmProviderRecord[];
  notifications: CrmNotification[];
  activities: CrmActivity[];
}

export const COOKIE_NAME = "xr_crm_session";
export const STORE_PATH = path.resolve(process.cwd(), ".data/xr-crm.json");

export function getSigningSecret(): string {
  return process.env.XR_CRM_SECRET || process.env.STRIPE_SECRET_KEY || "xr-internal-crm-session-key-v1";
}

export function hashPassword(password: string): string {
  return crypto.scryptSync(password, "xr-agency-salt-2026", 32).toString("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  try {
    const derived = crypto.scryptSync(password, "xr-agency-salt-2026", 32).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(derived, "hex"), Buffer.from(hash, "hex"));
  } catch {
    return false;
  }
}

export function signSession(payload: { id: string; role: "admin" | "member"; exp: number }): string {
  const data = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = crypto.createHmac("sha256", getSigningSecret()).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function verifySession(token: string | undefined): { id: string; role: "admin" | "member" } | null {
  if (!token || !token.includes(".")) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = crypto.createHmac("sha256", getSigningSecret()).update(data).digest("base64url");
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as {
      id: string;
      role: "admin" | "member";
      exp: number;
    };
    if (!parsed.id || !parsed.exp || Date.now() > parsed.exp) return null;
    return { id: parsed.id, role: parsed.role };
  } catch {
    return null;
  }
}

export function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie") || "";
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}

declare global {
  var __xrCrmMemoryStore: CrmStore | undefined;
}

export function createInitialSeed(): CrmStore {
  const adminPass = process.env.XR_CRM_ADMIN_PASS || "AdminXR2026!";
  const staffPass = process.env.XR_CRM_STAFF_PASS || "EquipeXR2026!";
  const now = Date.now();
  const iso = (minsAgo: number) => new Date(now - minsAgo * 60_000).toISOString();

  return {
    members: [
      {
        id: "mem-admin",
        email: "admin@xragency.fr",
        fullName: "Direction XR",
        title: "Fondateur · Dispatch & Supervision",
        role: "admin",
        phoneLine: "+33 7 67 56 67 83",
        commissionPct: 0,
        passwordHash: hashPassword(adminPass),
        active: true,
        createdAt: iso(20_000),
      },
      {
        id: "mem-lucas",
        email: "lucas@xragency.fr",
        fullName: "Lucas Martin",
        title: "Closer Senior · Sites & Google Maps",
        role: "member",
        phoneLine: "+33 1 86 95 41 12",
        commissionPct: 18,
        passwordHash: hashPassword(staffPass),
        active: true,
        createdAt: iso(15_000),
      },
      {
        id: "mem-sarah",
        email: "sarah@xragency.fr",
        fullName: "Sarah Benali",
        title: "Conseillère XR School & Closing",
        role: "member",
        phoneLine: "+33 1 86 95 41 18",
        commissionPct: 20,
        passwordHash: hashPassword(staffPass),
        active: true,
        createdAt: iso(12_000),
      },
      {
        id: "mem-karim",
        email: "karim@xragency.fr",
        fullName: "Karim Diallo",
        title: "Partenaire Agence · XR School J42",
        role: "member",
        phoneLine: "+33 1 86 95 41 24",
        commissionPct: 20,
        passwordHash: hashPassword(staffPass),
        active: true,
        createdAt: iso(8_000),
      },
    ],
    leads: [
      {
        id: "lead-101",
        company: "Bistrot Saint-Germain",
        contactName: "Marc Delacroix",
        phone: "+33 6 12 44 89 10",
        email: "contact@bistrotsg.fr",
        city: "Paris 6e",
        sector: "Restauration",
        serviceTarget: "Google Maps Top 3 (dès 550 €) + Site",
        budgetEur: 1900,
        status: "to_call",
        priority: "urgent",
        assignedTo: "mem-lucas",
        sentBy: "Direction XR",
        source: "Audit Maps Direct",
        notes: "Gérant très réactif, fiche Maps non revendiquée. RDV téléphonique prévu à 14h30.",
        nextFollowUp: "Aujourd'hui · 14h30",
        callsCount: 1,
        createdAt: iso(1440),
        updatedAt: iso(60),
      },
      {
        id: "lead-102",
        company: "Atelier Joaillerie Vendôme",
        contactName: "Hélène de Saint-Priest",
        phone: "+33 6 88 23 11 04",
        email: "h.saintpriest@atelier-vendome.fr",
        city: "Paris 1er",
        sector: "Joaillerie & Horlogerie",
        serviceTarget: "Identité Complète + Site E-commerce",
        budgetEur: 2800,
        status: "in_progress",
        priority: "high",
        assignedTo: "mem-lucas",
        sentBy: "Direction XR",
        source: "Campagne Instagram B2B",
        notes: "Première découverte validée. Souhaite une proposition formelle d'ici vendredi.",
        nextFollowUp: "Demain · 10h00",
        callsCount: 2,
        createdAt: iso(2880),
        updatedAt: iso(180),
      },
      {
        id: "lead-103",
        company: "Maison Lumière Spa",
        contactName: "Inès Laurent",
        phone: "+33 7 45 90 32 11",
        email: "ines@maisonlumiere.fr",
        city: "Cannes",
        sector: "Bien-être & Hôtellerie",
        serviceTarget: "Branding + Réservation + Maps",
        budgetEur: 3200,
        status: "signed",
        priority: "high",
        assignedTo: "mem-lucas",
        sentBy: "Direction XR",
        source: "Audit Agent XR",
        notes: "Acompte encaissé par virement. Lancement production Web & Maps.",
        nextFollowUp: "Livraison J+5",
        callsCount: 4,
        createdAt: iso(4200),
        updatedAt: iso(620),
      },
      {
        id: "lead-104",
        company: "Julien Robert (Futur Fondateur)",
        contactName: "Julien Robert",
        phone: "+33 6 77 14 56 90",
        email: "julien.r@gmail.com",
        city: "Bordeaux",
        sector: "XR School · Programme 90 Jours",
        serviceTarget: "XR School Clés-en-Main (4 000 €)",
        budgetEur: 4000,
        status: "callback",
        priority: "urgent",
        assignedTo: "mem-sarah",
        sentBy: "Direction XR",
        source: "Page /school",
        notes: "Intéressé par l'offre complète avec ligne pro, leads fournis et option sous-traitance.",
        nextFollowUp: "Aujourd'hui · 16h00",
        callsCount: 2,
        createdAt: iso(320),
        updatedAt: iso(95),
      },
      {
        id: "lead-105",
        company: "Cabinet Mercier Patrimoine",
        contactName: "Antoine Mercier",
        phone: "+33 6 31 09 77 45",
        email: "a.mercier@mercierconseil.fr",
        city: "Paris 8e",
        sector: "Finance & Juridique",
        serviceTarget: "Refonte Site + SEO + Branding",
        budgetEur: 3600,
        status: "signed",
        priority: "high",
        assignedTo: "mem-sarah",
        sentBy: "Direction XR",
        source: "Entrant Direct",
        notes: "Contrat annuel signé + SEO mensuel 299 €/m.",
        nextFollowUp: "Onboarding clos",
        callsCount: 5,
        createdAt: iso(7200),
        updatedAt: iso(1400),
      },
    ],
    clients: [
      {
        id: "cli-pokenball",
        company: "Poke-N-Ball",
        contactName: "Direction Poké-N-Ball",
        email: "contact@poke-n-ball.fr",
        phone: "+33 1 42 68 55 00",
        website: "https://poke-n-ball.fr",
        city: "Paris 11e",
        country: "France",
        sector: "Restauration Rapide Premium",
        servicesPurchased: ["Site Vitrine & E-commerce", "SEO Local", "Branding"],
        totalRevenueEur: 2498,
        status: "vip",
        assignedTo: "mem-lucas",
        internalNotes: "Référence studio active. Expérience client validée.",
        createdAt: iso(10_000),
        updatedAt: iso(500),
      },
      {
        id: "cli-mercier",
        leadId: "lead-105",
        company: "Cabinet Mercier Patrimoine",
        contactName: "Antoine Mercier",
        email: "a.mercier@mercierconseil.fr",
        phone: "+33 6 31 09 77 45",
        website: "https://mercierconseil.fr",
        city: "Paris 8e",
        country: "France",
        sector: "Finance & Conseil",
        servicesPurchased: ["Refonte Site Business (799 €)", "SEO Starter (299 €/m)", "Full Brand Suite (399 €)"],
        totalRevenueEur: 3600,
        status: "active",
        assignedTo: "mem-sarah",
        internalNotes: "Onboarding démarré. Validation des maquettes le 18 du mois.",
        createdAt: iso(1400),
        updatedAt: iso(200),
      },
    ],
    quotes: [
      {
        id: "DEV-2026-001",
        leadId: "lead-102",
        clientName: "Hélène de Saint-Priest",
        clientCompany: "Atelier Joaillerie Vendôme",
        clientEmail: "h.saintpriest@atelier-vendome.fr",
        items: [
          { label: "Site Business sur mesure", detail: "Architecture Next-Gen React 19, responsive ultra-rapide", priceEur: 799, period: "once", quantity: 1 },
          { label: "Full Brand Suite", detail: "Logo, typographies, palette et brand book 300 DPI", priceEur: 399, period: "once", quantity: 1 },
          { label: "SEO Growth", detail: "Stratégie de conquête et netlinking mensuel", priceEur: 499, period: "month", quantity: 1 },
        ],
        totalOnceEur: 1198,
        totalMonthlyEur: 499,
        totalAnnualEur: 0,
        status: "sent",
        validUntil: iso(-14_400), // Valide 15 jours
        paymentTerms: "Acompte 50% par virement bancaire pro, solde à la livraison 7 jours ouvrés.",
        notes: "Option shooting studio réservable séparément sur devis.",
        createdAt: iso(300),
        updatedAt: iso(300),
      },
      {
        id: "DEV-2026-002",
        clientId: "cli-pokenball",
        clientName: "Direction Poké-N-Ball",
        clientCompany: "Poke-N-Ball",
        clientEmail: "contact@poke-n-ball.fr",
        items: [
          { label: "Site Vitrine Pro", detail: "Design mobile-first et catalogue dynamique", priceEur: 499, period: "once", quantity: 1 },
          { label: "Gestion Google Business Profile — Croissance", detail: "Optimisation fiches et avis clients", priceEur: 169, period: "month", quantity: 1 },
        ],
        totalOnceEur: 499,
        totalMonthlyEur: 169,
        totalAnnualEur: 0,
        status: "accepted",
        validUntil: iso(-40_000),
        paymentTerms: "Règlement 100% à la commande par virement professionnel.",
        createdAt: iso(9500),
        updatedAt: iso(9000),
      },
    ],
    invoices: [
      {
        id: "FAC-2026-001",
        quoteId: "DEV-2026-002",
        clientId: "cli-pokenball",
        clientName: "Direction Poké-N-Ball",
        clientCompany: "Poke-N-Ball",
        clientEmail: "contact@poke-n-ball.fr",
        items: [
          { label: "Site Vitrine Pro (Livraison 7j)", detail: "Conception, développement et mise en ligne", amountEur: 499 },
          { label: "Gestion Google Maps M1", detail: "Premier mois formule Croissance", amountEur: 169 },
        ],
        totalEur: 668,
        taxRatePct: 0,
        taxNotice: "TVA non applicable, art. 293 B du CGI.",
        paymentMethod: "bank_transfer",
        paymentReference: "XR-PAY-PKNB-01",
        bankDetails: {
          beneficiary: "KARMA SASU (XR Agency)",
          bankName: "Banque Professionnelle France",
          ibanMasked: "FR76 1005 7000 **** **** **** 42",
          bic: "BNPAFRPPXXX",
          instructions: "Mentionner impérativement la référence XR-PAY-PKNB-01 dans le libellé de votre virement.",
        },
        status: "paid",
        paidAt: iso(8900),
        validatedBy: "mem-admin",
        dueDate: iso(8500),
        createdAt: iso(9000),
        updatedAt: iso(8900),
      },
      {
        id: "VIR-2026-002",
        clientId: "cli-mercier",
        clientName: "Antoine Mercier",
        clientCompany: "Cabinet Mercier Patrimoine",
        clientEmail: "a.mercier@mercierconseil.fr",
        items: [
          { label: "Acompte Refonte Site & Branding", detail: "50% à la commande sur forfait global", amountEur: 1800 },
        ],
        totalEur: 1800,
        taxRatePct: 0,
        taxNotice: "TVA non applicable, art. 293 B du CGI.",
        paymentMethod: "bank_transfer",
        paymentReference: "XR-PAY-MRC-1800",
        bankDetails: {
          beneficiary: "KARMA SASU (XR Agency)",
          bankName: "Banque Professionnelle France",
          ibanMasked: "FR76 1005 7000 **** **** **** 42",
          bic: "BNPAFRPPXXX",
          instructions: "Mentionner impérativement la référence XR-PAY-MRC-1800 dans le libellé de votre virement.",
        },
        status: "paid",
        paidAt: iso(1350),
        validatedBy: "mem-admin",
        dueDate: iso(1000),
        createdAt: iso(1400),
        updatedAt: iso(1350),
      },
    ],
    projects: [
      {
        id: "PRJ-PKNB-01",
        clientId: "cli-pokenball",
        clientName: "Poke-N-Ball",
        projectName: "Plateforme Digitale & Expérience Mobile Poke-N-Ball",
        serviceCategory: "Web & Branding",
        managerId: "mem-lucas",
        collaboratorIds: ["mem-admin", "mem-lucas"],
        stage: "delivered",
        progressPct: 100,
        budgetEur: 2498,
        startDate: iso(9000),
        deliveryDeadline: iso(7500),
        liveUrl: "https://poke-n-ball.fr",
        milestones: [
          { id: "m1", title: "Cadrage de marque & charte", done: true },
          { id: "m2", title: "Intégration Next-Gen & animations", done: true },
          { id: "m3", title: "Mise en ligne & indexation Google", done: true },
        ],
        notes: "Projet livré en 7 jours ouvrés. Satisfaction totale du client.",
        createdAt: iso(9000),
        updatedAt: iso(7500),
      },
      {
        id: "PRJ-MRC-02",
        clientId: "cli-mercier",
        clientName: "Cabinet Mercier Patrimoine",
        projectName: "Refonte Éditoriale Luxe Cabinet Mercier",
        serviceCategory: "Web & SEO",
        managerId: "mem-sarah",
        collaboratorIds: ["mem-admin", "mem-sarah"],
        stage: "production",
        progressPct: 60,
        budgetEur: 3600,
        startDate: iso(1300),
        deliveryDeadline: iso(-10_000), // Dans 7 jours
        milestones: [
          { id: "m1", title: "Direction artistique & typographie", done: true },
          { id: "m2", title: "Développement React 19 / TanStack", done: true },
          { id: "m3", title: "Mise en place SEO Starter & fiches Maps", done: false },
          { id: "m4", title: "Recette client & mise en production", done: false },
        ],
        notes: "Phase de validation des maquettes Figma finalisée. Code en cours d'intégration.",
        createdAt: iso(1300),
        updatedAt: iso(200),
      },
    ],
    tasks: [
      {
        id: "task-01",
        title: "Relancer Bistrot Saint-Germain (Marc)",
        description: "Appel de 14h30 pour valider le cadrage Maps Top 3",
        assignedTo: "mem-lucas",
        priority: "urgent",
        status: "todo",
        category: "pro",
        tag: "Closing",
        linkedEntityType: "lead",
        linkedEntityId: "lead-101",
        dueDate: "Aujourd'hui · 14h30",
        createdAt: iso(120),
      },
      {
        id: "task-02",
        title: "Envoyer devis Atelier Joaillerie Vendôme",
        description: "Finaliser DEV-2026-001 avec forfait Full Brand Suite",
        assignedTo: "mem-lucas",
        priority: "high",
        status: "in_progress",
        category: "pro",
        tag: "Devis",
        linkedEntityType: "quote",
        linkedEntityId: "DEV-2026-001",
        dueDate: "Demain · 10h00",
        createdAt: iso(200),
      },
      {
        id: "task-03",
        title: "Audit SEO trimestriel Poke-N-Ball",
        description: "Contrôler le maintien de la position Google Maps et les avis",
        assignedTo: "mem-lucas",
        priority: "normal",
        status: "todo",
        category: "pro",
        tag: "WebCare",
        linkedEntityType: "client",
        linkedEntityId: "cli-pokenball",
        dueDate: "Vendredi",
        createdAt: iso(500),
      },
      {
        id: "task-04",
        title: "Appeler Julien Robert (XR School)",
        description: "Répondre aux questions sur les 90 jours et la sous-traitance",
        assignedTo: "mem-sarah",
        priority: "urgent",
        status: "todo",
        category: "pro",
        tag: "School",
        linkedEntityType: "lead",
        linkedEntityId: "lead-104",
        dueDate: "Aujourd'hui · 16h00",
        createdAt: iso(80),
      },
    ],
    providers: [
      {
        id: "prov-3d-motion",
        name: "Studio Vertex 3D",
        company: "Vertex SAS",
        email: "contact@vertex3d.studio",
        phone: "+33 6 52 11 90 88",
        specialties: ["Shaders GLSL", "Three.js", "Modélisation bijoux"],
        hourlyRateEur: 75,
        availability: "available",
        missionsCount: 3,
        totalPaidEur: 1850,
        notes: "Partenaire régulier pour les scènes 3D d'orfèvrerie.",
        createdAt: iso(20_000),
      },
      {
        id: "prov-copy-luxury",
        name: "Clara V. Editorial",
        company: "Clara V.",
        email: "clara.v@luxurycopy.fr",
        phone: "+33 7 81 04 22 91",
        specialties: ["Rédaction Hôtellerie", "Storytelling Joaillerie", "Anglais / Français"],
        hourlyRateEur: 60,
        availability: "available",
        missionsCount: 5,
        totalPaidEur: 2400,
        notes: "Rédactrice chevronnée pour les marques de prestige.",
        createdAt: iso(15_000),
      },
    ],
    notifications: [
      {
        id: "notif-01",
        targetMemberId: "all",
        type: "new_lead",
        title: "Nouveau lead entrant",
        message: "Julien Robert s'est inscrit au diagnostic XR School (Bordeaux).",
        read: false,
        link: "/crm?tab=pipeline",
        createdAt: iso(320),
      },
      {
        id: "notif-02",
        targetMemberId: "mem-admin",
        type: "payment_received",
        title: "Virement confirmé",
        message: "Acompte de 1 800 € reçu de Cabinet Mercier Patrimoine.",
        read: true,
        link: "/crm?tab=invoices",
        createdAt: iso(1350),
      },
    ],
    activities: [
      {
        id: "act-01",
        leadId: "lead-101",
        memberId: "mem-lucas",
        memberName: "Lucas Martin",
        type: "call",
        message: "Premier contact avec Marc (Bistrot Saint-Germain). Fort intérêt pour le Top 3 Maps.",
        createdAt: iso(120),
      },
      {
        id: "act-02",
        leadId: "lead-105",
        memberId: "mem-sarah",
        memberName: "Sarah Benali",
        type: "payment_confirmed",
        message: "Acompte 1 800 € validé pour Cabinet Mercier. Projet PRJ-MRC-02 ouvert.",
        createdAt: iso(1350),
      },
    ],
  };
}

export function loadStore(): CrmStore {
  if (globalThis.__xrCrmMemoryStore) return globalThis.__xrCrmMemoryStore;

  try {
    if (fs.existsSync(STORE_PATH)) {
      const parsed = JSON.parse(fs.readFileSync(STORE_PATH, "utf8")) as Partial<CrmStore>;
      if (parsed && Array.isArray(parsed.members) && Array.isArray(parsed.leads)) {
        const initial = createInitialSeed();
        const store: CrmStore = {
          members: parsed.members,
          leads: parsed.leads,
          clients: Array.isArray(parsed.clients) ? parsed.clients : initial.clients,
          quotes: Array.isArray(parsed.quotes) ? parsed.quotes : initial.quotes,
          invoices: Array.isArray(parsed.invoices) ? parsed.invoices : initial.invoices,
          projects: Array.isArray(parsed.projects) ? parsed.projects : initial.projects,
          tasks: Array.isArray(parsed.tasks) ? parsed.tasks : initial.tasks,
          providers: Array.isArray(parsed.providers) ? parsed.providers : initial.providers,
          notifications: Array.isArray(parsed.notifications) ? parsed.notifications : initial.notifications,
          activities: Array.isArray(parsed.activities) ? parsed.activities : initial.activities,
        };
        globalThis.__xrCrmMemoryStore = store;
        return store;
      }
    }
  } catch {}

  const seeded = createInitialSeed();
  saveStore(seeded);
  return seeded;
}

export function saveStore(store: CrmStore) {
  globalThis.__xrCrmMemoryStore = store;
  try {
    fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
  } catch {}
}

export function sanitizeMember(m: CrmMemberRecord) {
  const isStudent =
    m.portalType === "student" ||
    m.id === "mem-karim" ||
    m.title.toLowerCase().includes("school") ||
    m.title.toLowerCase().includes("élève") ||
    m.title.toLowerCase().includes("eleve");
  const portalType: "director" | "closer" | "student" =
    m.role === "admin" ? "director" : isStudent ? "student" : "closer";
  return {
    id: m.id,
    email: m.email,
    fullName: m.fullName,
    title: m.title,
    role: m.role,
    portalType,
    phoneLine: m.phoneLine,
    commissionPct: m.commissionPct,
    active: m.active,
    createdAt: m.createdAt,
  };
}

export function buildSnapshot(store: CrmStore, user: CrmMemberRecord) {
  const isAdmin = user.role === "admin";
  const visibleLeads = isAdmin
    ? store.leads
    : store.leads.filter((l) => l.assignedTo === user.id);

  const visibleLeadIds = new Set(visibleLeads.map((l) => l.id));
  const visibleActivities = store.activities
    .filter((a) => isAdmin || (a.leadId && visibleLeadIds.has(a.leadId)))
    .slice(0, 80);

  const totalLeads = visibleLeads.length;
  const signedLeads = visibleLeads.filter((l) => l.status === "signed" || l.status === "outsourced");
  const inProgressCount = visibleLeads.filter((l) =>
    ["contacted", "in_progress", "callback", "proposal_prep", "proposal_sent", "negotiation"].includes(l.status)
  ).length;
  const signedCount = signedLeads.length;
  const revenueEur = signedLeads.reduce((acc, l) => acc + (Number(l.budgetEur) || 0), 0);
  const pipelineEur = visibleLeads
    .filter((l) => ["new", "to_qualify", "to_call", "contacted", "in_progress", "callback", "proposal_prep", "proposal_sent", "negotiation"].includes(l.status))
    .reduce((acc, l) => acc + (Number(l.budgetEur) || 0), 0);
  const totalCalls = visibleLeads.reduce((acc, l) => acc + (Number(l.callsCount) || 0), 0);
  const closingRate = totalLeads > 0 ? Math.round((signedCount / totalLeads) * 100) : 0;
  const outsourcedCount = visibleLeads.filter((l) => l.status === "outsourced").length;

  const visibleClients = isAdmin
    ? store.clients
    : store.clients.filter((c) => c.assignedTo === user.id);

  const visibleQuotes = isAdmin
    ? store.quotes
    : store.quotes.filter((q) => !q.leadId || visibleLeadIds.has(q.leadId));

  const visibleInvoices = isAdmin
    ? store.invoices
    : store.invoices.filter((i) => !i.clientId || visibleClients.some((c) => c.id === i.clientId));

  const visibleProjects = isAdmin
    ? store.projects
    : store.projects.filter((p) => p.managerId === user.id || p.collaboratorIds.includes(user.id));

  const visibleTasks = isAdmin
    ? store.tasks
    : store.tasks.filter((t) => t.assignedTo === user.id || t.assignedTo === "all");

  const visibleNotifications = store.notifications.filter(
    (n) => n.targetMemberId === "all" || n.targetMemberId === user.id
  );

  const teamBreakdown = store.members
    .filter((m) => m.active && m.role !== "admin")
    .map((m) => {
      const mLeads = store.leads.filter((l) => l.assignedTo === m.id);
      const mSigned = mLeads.filter((l) => l.status === "signed" || l.status === "outsourced");
      const mRev = mSigned.reduce((s, l) => s + (Number(l.budgetEur) || 0), 0);
      const mCom = mSigned.reduce((s, l) => {
        const { ratePct } = computeLeadCommissionRate(l.serviceTarget);
        return s + Math.round(((Number(l.budgetEur) || 0) * ratePct) / 100);
      }, 0);
      const mCalls = mLeads.reduce((s, l) => s + (Number(l.callsCount) || 0), 0);
      return {
        ...sanitizeMember(m),
        assignedCount: mLeads.length,
        toCallCount: mLeads.filter((l) => l.status === "to_call" || l.status === "new").length,
        signedCount: mSigned.length,
        revenueEur: mRev,
        estimatedCommissionEur: mCom,
        callsCount: mCalls,
        closingRate: mLeads.length > 0 ? Math.round((mSigned.length / mLeads.length) * 100) : 0,
      };
    });

  return {
    authenticated: true,
    user: sanitizeMember(user),
    members: store.members.filter((m) => m.active).map(sanitizeMember),
    leads: visibleLeads,
    clients: visibleClients,
    quotes: visibleQuotes,
    invoices: visibleInvoices,
    projects: visibleProjects,
    tasks: visibleTasks,
    providers: isAdmin ? store.providers : [],
    notifications: visibleNotifications,
    activities: visibleActivities,
    teamBreakdown,
    stats: {
      totalLeads,
      toCallCount: visibleLeads.filter((l) => l.status === "to_call" || l.status === "new" || l.status === "to_qualify").length,
      inProgressCount,
      signedCount,
      outsourcedCount,
      revenueEur,
      pipelineEur,
      totalCalls,
      closingRate,
      activeProjectsCount: visibleProjects.filter((p) => p.stage === "production" || p.stage === "prep").length,
      pendingInvoicesEur: visibleInvoices.filter((i) => i.status === "pending_transfer").reduce((sum, i) => sum + i.totalEur, 0),
    },
  };
}

/**
 * Capture automatique d'un prospect depuis le formulaire de contact public
 */
export function recordLeadFromWebsite(params: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  need?: string;
  message?: string;
  source?: string;
  city?: string;
  budgetEur?: number;
}): { ok: boolean; leadId: string } {
  const store = loadStore();
  const now = new Date().toISOString();
  const cleanEmail = params.email.trim().toLowerCase();
  const cleanPhone = (params.phone || "").trim();

  // Détection doublon par email ou téléphone
  let existing = store.leads.find(
    (l) => (cleanEmail && l.email.toLowerCase() === cleanEmail) || (cleanPhone && l.phone === cleanPhone)
  );

  if (existing) {
    existing.notes = `${existing.notes}\n[${now.slice(0, 10)}] Nouveau message web : ${params.message || params.need || "Demande de contact"}`.trim();
    existing.updatedAt = now;
    if (params.budgetEur && params.budgetEur > existing.budgetEur) {
      existing.budgetEur = params.budgetEur;
    }
    saveStore(store);
    return { ok: true, leadId: existing.id };
  }

  // Attribution intelligente : Lucas par défaut pour sites/maps, Sarah pour school/conseil
  const targetMemberId = (params.need || "").toLowerCase().includes("school") ? "mem-sarah" : "mem-lucas";
  const targetMember = store.members.find((m) => m.id === targetMemberId) || store.members[0];

  const newLead: CrmLead = {
    id: `lead-${Date.now().toString(36)}`,
    company: params.company?.trim() || `${params.name.trim()} (Projet Web)`,
    contactName: params.name.trim(),
    phone: cleanPhone || "Non renseigné",
    email: cleanEmail,
    website: params.website?.trim() || undefined,
    city: params.city?.trim() || "France / International",
    sector: "Commerce / Entreprise",
    serviceTarget: params.need?.trim() || "Création de Site Internet & Référencement",
    budgetEur: params.budgetEur || 799,
    status: "new",
    priority: "high",
    assignedTo: targetMember.id,
    sentBy: "Formulaire Web Public",
    source: params.source || "Site xragencyai.com",
    notes: `Demande de contact reçue en ligne :\nBesoin : ${params.need || "Non précisé"}\nMessage : ${params.message || "Aucun message complémentaire."}`,
    nextFollowUp: "Sous 2h ouvrées",
    callsCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  store.leads.unshift(newLead);

  // Notification interne
  store.notifications.unshift({
    id: `notif-${Date.now().toString(36)}`,
    targetMemberId: targetMember.id,
    type: "new_lead",
    title: "Nouveau prospect web qualifié",
    message: `${newLead.contactName} (${newLead.company}) a envoyé une demande de projet.`,
    read: false,
    link: `/crm?tab=pipeline`,
    createdAt: now,
  });

  store.activities.unshift({
    id: `act-${Date.now().toString(36)}`,
    leadId: newLead.id,
    memberId: "system",
    memberName: "Système XR",
    type: "assigned",
    message: `Nouveau prospect web reçu et assigné à ${targetMember.fullName} : ${newLead.company}.`,
    createdAt: now,
  });

  saveStore(store);
  return { ok: true, leadId: newLead.id };
}

/**
 * Capture automatique d'un devis ou demande de virement depuis le configurateur
 */
export function recordQuoteFromWebsite(params: {
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  phone?: string;
  website?: string;
  summary: {
    sector?: string;
    goal?: string;
    situation?: string;
    budget?: string;
    services?: Array<{ label: string; detail: string; price: number; period: "once" | "month" | "year" }>;
    once?: number;
    monthly?: number;
    annual?: number;
  };
  asBankTransfer?: boolean;
}): { ok: boolean; quoteId: string; invoiceId?: string; paymentReference?: string } {
  const store = loadStore();
  const now = new Date().toISOString();

  // 1. Enregistrement ou mise à jour du lead
  const { leadId } = recordLeadFromWebsite({
    name: params.clientName,
    email: params.clientEmail,
    phone: params.phone,
    company: params.clientCompany,
    website: params.website,
    need: (params.summary.services || []).map((s) => s.label).join(", ") || "Configuration sur-mesure",
    source: "Configurateur / Devis en ligne",
    budgetEur: (params.summary.once || 0) + (params.summary.monthly || 0) * 3,
  });

  // 2. Génération du devis formel
  const quoteId = `DEV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const validUntilDate = new Date(Date.now() + 15 * 86_400_000).toISOString();

  const items: QuoteItem[] = (params.summary.services || []).map((s) => ({
    label: s.label,
    detail: s.detail || "Prestation standard contractuelle",
    priceEur: s.price,
    period: s.period,
    quantity: 1,
  }));

  const newQuote: CrmQuoteRecord = {
    id: quoteId,
    leadId,
    clientName: params.clientName,
    clientCompany: params.clientCompany || `${params.clientName} (Entreprise)`,
    clientEmail: params.clientEmail,
    items,
    totalOnceEur: params.summary.once || 0,
    totalMonthlyEur: params.summary.monthly || 0,
    totalAnnualEur: params.summary.annual || 0,
    status: params.asBankTransfer ? "accepted" : "sent",
    validUntil: validUntilDate,
    paymentTerms: "Règlement par virement bancaire professionnel à réception de commande. Livraison sous 7 jours ouvrés.",
    notes: `Secteur : ${params.summary.sector || "Non précisé"}. Priorité : ${params.summary.goal || "Non précisé"}.`,
    createdAt: now,
    updatedAt: now,
  };

  store.quotes.unshift(newQuote);

  let invoiceId: string | undefined;
  let paymentReference: string | undefined;

  // 3. Si option virement bancaire sélectionnée, génération de la facture proforma
  if (params.asBankTransfer) {
    invoiceId = `VIR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    paymentReference = `XR-${newQuote.id.slice(-4)}-${Date.now().toString(36).toUpperCase().slice(-4)}`;

    const totalToPay = (params.summary.once || 0) > 0 ? (params.summary.once || 0) : (params.summary.monthly || 0);

    const invoiceItems: InvoiceItem[] = (params.summary.services || []).map((s) => ({
      label: s.label,
      detail: s.detail,
      amountEur: s.price,
    }));

    const newInvoice: CrmInvoiceRecord = {
      id: invoiceId,
      quoteId,
      clientName: params.clientName,
      clientCompany: newQuote.clientCompany,
      clientEmail: params.clientEmail,
      items: invoiceItems,
      totalEur: totalToPay,
      taxRatePct: 0,
      taxNotice: "TVA non applicable, art. 293 B du CGI.",
      paymentMethod: "bank_transfer",
      paymentReference,
      bankDetails: {
        beneficiary: "KARMA SASU (XR Agency)",
        bankName: "Banque Professionnelle France",
        ibanMasked: "FR76 1005 7000 **** **** **** 42",
        bic: "BNPAFRPPXXX",
        instructions: `Mentionner impérativement la référence ${paymentReference} dans le libellé de votre virement bancaire pour validation automatique de votre commande.`,
      },
      status: "pending_transfer",
      dueDate: new Date(Date.now() + 7 * 86_400_000).toISOString(),
      createdAt: now,
      updatedAt: now,
    };

    store.invoices.unshift(newInvoice);

    store.notifications.unshift({
      id: `notif-${Date.now().toString(36)}`,
      targetMemberId: "all",
      type: "payment_received",
      title: "Attente de virement bancaire",
      message: `${params.clientName} (${newQuote.clientCompany}) a généré un ordre de virement de ${totalToPay.toLocaleString("fr-FR")} € (Réf: ${paymentReference}).`,
      read: false,
      link: `/crm?tab=invoices`,
      createdAt: now,
    });
  }

  saveStore(store);
  return { ok: true, quoteId, invoiceId, paymentReference };
}
