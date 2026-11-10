import { createFileRoute } from "@tanstack/react-router";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export type CrmRole = "admin" | "member";
export type LeadStatus =
  | "to_call"
  | "in_progress"
  | "callback"
  | "proposal_sent"
  | "signed"
  | "outsourced"
  | "lost";

export type LeadPriority = "urgent" | "high" | "normal";

export interface CrmMemberRecord {
  id: string;
  email: string;
  fullName: string;
  title: string;
  role: CrmRole;
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

export interface CrmLead {
  id: string;
  company: string;
  contactName: string;
  phone: string;
  email: string;
  city: string;
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
  outsourceRequest?: OutsourceRequest;
  createdAt: string;
  updatedAt: string;
}

export interface CrmActivity {
  id: string;
  leadId: string;
  memberId: string;
  memberName: string;
  type: "assigned" | "call" | "status" | "note" | "outsource";
  message: string;
  createdAt: string;
}

interface CrmStore {
  members: CrmMemberRecord[];
  leads: CrmLead[];
  activities: CrmActivity[];
}

const COOKIE_NAME = "xr_crm_session";
const STORE_PATH = path.resolve(process.cwd(), ".data/xr-crm.json");

function getSigningSecret(): string {
  return process.env.XR_CRM_SECRET || process.env.STRIPE_SECRET_KEY || "xr-internal-crm-session-key-v1";
}

function hashPassword(password: string): string {
  return crypto.scryptSync(password, "xr-agency-salt-2026", 32).toString("hex");
}

function verifyPassword(password: string, hash: string): boolean {
  const derived = crypto.scryptSync(password, "xr-agency-salt-2026", 32).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(derived, "hex"), Buffer.from(hash, "hex"));
}

function signSession(payload: { id: string; role: CrmRole; exp: number }): string {
  const data = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = crypto.createHmac("sha256", getSigningSecret()).update(data).digest("base64url");
  return `${data}.${sig}`;
}

function verifySession(token: string | undefined): { id: string; role: CrmRole } | null {
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
      role: CrmRole;
      exp: number;
    };
    if (!parsed.id || !parsed.exp || Date.now() > parsed.exp) return null;
    return { id: parsed.id, role: parsed.role };
  } catch {
    return null;
  }
}

function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie") || "";
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}

function createSeedStore(): CrmStore {
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
        serviceTarget: "Google Maps Top 3 (159 €/m) + Site",
        budgetEur: 1900,
        status: "to_call",
        priority: "urgent",
        assignedTo: "mem-lucas",
        sentBy: "Direction XR",
        source: "Simulateur Maps",
        notes: "Demande urgente Top 3 Paris 6e + refonte carte en ligne.",
        nextFollowUp: "Aujourd'hui · 14h30",
        callsCount: 0,
        createdAt: iso(45),
        updatedAt: iso(45),
      },
      {
        id: "lead-102",
        company: "Atelier Haussmann Rénovation",
        contactName: "Claire Moreau",
        phone: "+33 6 88 23 19 04",
        email: "c.moreau@atelierhaussmann.fr",
        city: "Lyon",
        sector: "Artisan & BTP",
        serviceTarget: "Site Business + SEO Local",
        budgetEur: 2400,
        status: "proposal_sent",
        priority: "high",
        assignedTo: "mem-lucas",
        sentBy: "Direction XR",
        source: "Configurateur Devis",
        notes: "Maquette envoyée ce matin, décision validée avec associé.",
        nextFollowUp: "Demain · 10h00",
        callsCount: 3,
        createdAt: iso(1400),
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
        notes: "Acompte encaissé. Lancement production Web & Maps.",
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
        createdAt: iso(5600),
        updatedAt: iso(900),
      },
      {
        id: "lead-106",
        company: "Clinique Dentaire Rivoli",
        contactName: "Dr. Sophie Vasseur",
        phone: "+33 6 52 18 40 22",
        email: "contact@rivolidoc.fr",
        city: "Paris 1er",
        sector: "Santé",
        serviceTarget: "Google Maps Domination + Site",
        budgetEur: 2200,
        status: "outsourced",
        priority: "normal",
        assignedTo: "mem-karim",
        sentBy: "Direction XR",
        source: "Prospection Ligne XR",
        notes: "Signé par Karim — production technique déléguée à l'équipe XR Agency.",
        nextFollowUp: "Suivi client hebdo",
        callsCount: 3,
        outsourceRequest: {
          scope: "Création site 5 pages + Optimisation Google Maps #1",
          budgetAllocated: 950,
          deadline: "Sous 7 jours",
          brief: "Client exigeant sur design sobre, photos cabinet fournies sur Drive.",
          requestedAt: iso(500),
          requestedBy: "Karim Diallo",
        },
        createdAt: iso(2900),
        updatedAt: iso(500),
      },
    ],
    activities: [
      {
        id: "act-1",
        leadId: "lead-101",
        memberId: "mem-admin",
        memberName: "Direction XR",
        type: "assigned",
        message: "Lead chaud envoyé par Direction à Lucas Martin (Bistrot Saint-Germain · 1 900 €).",
        createdAt: iso(45),
      },
      {
        id: "act-2",
        leadId: "lead-104",
        memberId: "mem-sarah",
        memberName: "Sarah Benali",
        type: "call",
        message: "Appel découverte 18 min : validation du financement 4 000 € XR School, rappel à 16h pour closing.",
        createdAt: iso(95),
      },
      {
        id: "act-3",
        leadId: "lead-106",
        memberId: "mem-karim",
        memberName: "Karim Diallo",
        type: "outsource",
        message: "Demande de sous-traitance envoyée à XR Agency pour production technique complète.",
        createdAt: iso(500),
      },
    ],
  };
}

declare global {
  var __xrCrmMemoryStore: CrmStore | undefined;
}

function loadStore(): CrmStore {
  if (globalThis.__xrCrmMemoryStore) return globalThis.__xrCrmMemoryStore;
  try {
    if (fs.existsSync(STORE_PATH)) {
      const parsed = JSON.parse(fs.readFileSync(STORE_PATH, "utf8")) as CrmStore;
      if (parsed && Array.isArray(parsed.members) && Array.isArray(parsed.leads)) {
        globalThis.__xrCrmMemoryStore = parsed;
        return parsed;
      }
    }
  } catch {}
  const seeded = createSeedStore();
  saveStore(seeded);
  return seeded;
}

function saveStore(store: CrmStore) {
  globalThis.__xrCrmMemoryStore = store;
  try {
    fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
  } catch {
    // Graceful fallback to in-memory store when filesystem is read-only
  }
}

function sanitizeMember(m: CrmMemberRecord) {
  return {
    id: m.id,
    email: m.email,
    fullName: m.fullName,
    title: m.title,
    role: m.role,
    phoneLine: m.phoneLine,
    commissionPct: m.commissionPct,
    active: m.active,
    createdAt: m.createdAt,
  };
}

function buildSnapshot(store: CrmStore, user: CrmMemberRecord) {
  const isAdmin = user.role === "admin";
  const visibleLeads = isAdmin
    ? store.leads
    : store.leads.filter((l) => l.assignedTo === user.id);

  const visibleLeadIds = new Set(visibleLeads.map((l) => l.id));
  const visibleActivities = store.activities
    .filter((a) => isAdmin || visibleLeadIds.has(a.leadId))
    .slice(0, 60);

  const totalLeads = visibleLeads.length;
  const signedLeads = visibleLeads.filter((l) => l.status === "signed" || l.status === "outsourced");
  const signedCount = signedLeads.length;
  const revenueEur = signedLeads.reduce((acc, l) => acc + (Number(l.budgetEur) || 0), 0);
  const pipelineEur = visibleLeads
    .filter((l) => ["to_call", "in_progress", "callback", "proposal_sent"].includes(l.status))
    .reduce((acc, l) => acc + (Number(l.budgetEur) || 0), 0);
  const totalCalls = visibleLeads.reduce((acc, l) => acc + (Number(l.callsCount) || 0), 0);
  const closingRate = totalLeads > 0 ? Math.round((signedCount / totalLeads) * 100) : 0;
  const outsourcedCount = visibleLeads.filter((l) => l.status === "outsourced").length;

  const teamBreakdown = store.members
    .filter((m) => m.role === "member")
    .map((m) => {
      const mLeads = store.leads.filter((l) => l.assignedTo === m.id);
      const mSigned = mLeads.filter((l) => l.status === "signed" || l.status === "outsourced");
      const mRevenue = mSigned.reduce((acc, l) => acc + (Number(l.budgetEur) || 0), 0);
      const mCalls = mLeads.reduce((acc, l) => acc + (Number(l.callsCount) || 0), 0);
      return {
        ...sanitizeMember(m),
        assignedCount: mLeads.length,
        toCallCount: mLeads.filter((l) => l.status === "to_call").length,
        signedCount: mSigned.length,
        revenueEur: mRevenue,
        estimatedCommissionEur: Math.round((mRevenue * m.commissionPct) / 100),
        callsCount: mCalls,
        closingRate: mLeads.length > 0 ? Math.round((mSigned.length / mLeads.length) * 100) : 0,
      };
    });

  return {
    authenticated: true,
    user: sanitizeMember(user),
    members: store.members.map(sanitizeMember),
    leads: [...visibleLeads].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    activities: [...visibleActivities].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    stats: {
      totalLeads,
      toCallCount: visibleLeads.filter((l) => l.status === "to_call").length,
      inProgressCount: visibleLeads.filter((l) => ["in_progress", "callback", "proposal_sent"].includes(l.status)).length,
      signedCount,
      outsourcedCount,
      revenueEur,
      pipelineEur,
      totalCalls,
      closingRate,
    },
    teamBreakdown: isAdmin ? teamBreakdown : teamBreakdown.filter((t) => t.id === user.id),
  };
}

export const Route = createFileRoute("/api/crm")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const store = loadStore();
        const token = readCookie(request, COOKIE_NAME);
        const session = verifySession(token);
        if (!session) {
          return Response.json({ authenticated: false });
        }
        const user = store.members.find((m) => m.id === session.id && m.active);
        if (!user) {
          return Response.json({ authenticated: false });
        }
        return Response.json(buildSnapshot(store, user));
      },

      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as Record<string, unknown>;
          const action = String(body.action || "");
          const store = loadStore();

          if (action === "login") {
            const email = String(body.email || "").trim().toLowerCase();
            const password = String(body.password || "");
            const user = store.members.find((m) => m.email.toLowerCase() === email && m.active);
            if (!user || !verifyPassword(password, user.passwordHash)) {
              return Response.json({ error: "Identifiants incorrects." }, { status: 401 });
            }
            const token = signSession({
              id: user.id,
              role: user.role,
              exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
            });
            return new Response(JSON.stringify(buildSnapshot(store, user)), {
              status: 200,
              headers: {
                "content-type": "application/json",
                "set-cookie": `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=604800`,
              },
            });
          }

          if (action === "logout") {
            return new Response(JSON.stringify({ authenticated: false }), {
              status: 200,
              headers: {
                "content-type": "application/json",
                "set-cookie": `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`,
              },
            });
          }

          const token = readCookie(request, COOKIE_NAME);
          const session = verifySession(token);
          if (!session) {
            return Response.json({ error: "Session expirée. Veuillez vous reconnecter." }, { status: 401 });
          }
          const user = store.members.find((m) => m.id === session.id && m.active);
          if (!user) {
            return Response.json({ error: "Compte introuvable ou désactivé." }, { status: 401 });
          }

          if (action === "send_lead") {
            if (user.role !== "admin") {
              return Response.json({ error: "Action réservée à la Direction." }, { status: 403 });
            }
            const company = String(body.company || "").trim();
            const contactName = String(body.contactName || "").trim();
            const assignedTo = String(body.assignedTo || "").trim();
            if (!company || !assignedTo) {
              return Response.json({ error: "Entreprise et destinataire requis." }, { status: 400 });
            }
            const targetMember = store.members.find((m) => m.id === assignedTo);
            if (!targetMember) {
              return Response.json({ error: "Membre assigné introuvable." }, { status: 404 });
            }
            const now = new Date().toISOString();
            const lead: CrmLead = {
              id: `lead-${Date.now().toString(36)}`,
              company,
              contactName: contactName || "À qualifier",
              phone: String(body.phone || "").trim(),
              email: String(body.email || "").trim(),
              city: String(body.city || "France").trim(),
              sector: String(body.sector || "Commerce / PME").trim(),
              serviceTarget: String(body.serviceTarget || "Site Web + Google Maps").trim(),
              budgetEur: Math.max(0, Number(body.budgetEur) || 1499),
              status: "to_call",
              priority: (body.priority === "urgent" || body.priority === "high" ? body.priority : "high") as LeadPriority,
              assignedTo,
              sentBy: user.fullName,
              source: String(body.source || "Envoi Direction").trim(),
              notes: String(body.notes || "").trim(),
              nextFollowUp: String(body.nextFollowUp || "Aujourd'hui").trim(),
              callsCount: 0,
              createdAt: now,
              updatedAt: now,
            };
            store.leads.unshift(lead);
            store.activities.unshift({
              id: `act-${Date.now().toString(36)}`,
              leadId: lead.id,
              memberId: user.id,
              memberName: user.fullName,
              type: "assigned",
              message: `Nouveau lead envoyé à ${targetMember.fullName} : ${lead.company} (${lead.budgetEur.toLocaleString("fr-FR")} €).`,
              createdAt: now,
            });
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "update_lead") {
            const leadId = String(body.leadId || "");
            const lead = store.leads.find((l) => l.id === leadId);
            if (!lead) return Response.json({ error: "Lead introuvable." }, { status: 404 });
            if (user.role !== "admin" && lead.assignedTo !== user.id) {
              return Response.json({ error: "Accès non autorisé sur ce dossier." }, { status: 403 });
            }
            const now = new Date().toISOString();
            const prevStatus = lead.status;
            if (typeof body.status === "string" && ["to_call", "in_progress", "callback", "proposal_sent", "signed", "outsourced", "lost"].includes(body.status)) {
              lead.status = body.status as LeadStatus;
            }
            if (typeof body.notes === "string") lead.notes = body.notes;
            if (typeof body.nextFollowUp === "string") lead.nextFollowUp = body.nextFollowUp;
            if (body.budgetEur !== undefined) lead.budgetEur = Math.max(0, Number(body.budgetEur) || lead.budgetEur);
            if (user.role === "admin" && typeof body.assignedTo === "string" && store.members.some((m) => m.id === body.assignedTo)) {
              lead.assignedTo = body.assignedTo;
            }
            lead.updatedAt = now;
            if (prevStatus !== lead.status) {
              store.activities.unshift({
                id: `act-${Date.now().toString(36)}`,
                leadId: lead.id,
                memberId: user.id,
                memberName: user.fullName,
                type: "status",
                message: `Statut mis à jour sur ${lead.company} : ${prevStatus} → ${lead.status}.`,
                createdAt: now,
              });
            }
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "log_call") {
            const leadId = String(body.leadId || "");
            const outcome = String(body.outcome || "Appel passé").trim();
            const lead = store.leads.find((l) => l.id === leadId);
            if (!lead) return Response.json({ error: "Lead introuvable." }, { status: 404 });
            if (user.role !== "admin" && lead.assignedTo !== user.id) {
              return Response.json({ error: "Accès non autorisé." }, { status: 403 });
            }
            const now = new Date().toISOString();
            lead.callsCount += 1;
            if (lead.status === "to_call") lead.status = "in_progress";
            lead.updatedAt = now;
            store.activities.unshift({
              id: `act-${Date.now().toString(36)}`,
              leadId: lead.id,
              memberId: user.id,
              memberName: user.fullName,
              type: "call",
              message: `Appel #${lead.callsCount} (${lead.company}) : ${outcome}`,
              createdAt: now,
            });
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "request_outsource") {
            const leadId = String(body.leadId || "");
            const lead = store.leads.find((l) => l.id === leadId);
            if (!lead) return Response.json({ error: "Lead introuvable." }, { status: 404 });
            if (user.role !== "admin" && lead.assignedTo !== user.id) {
              return Response.json({ error: "Accès non autorisé." }, { status: 403 });
            }
            const now = new Date().toISOString();
            lead.status = "outsourced";
            lead.outsourceRequest = {
              scope: String(body.scope || lead.serviceTarget).trim(),
              budgetAllocated: Math.max(0, Number(body.budgetAllocated) || Math.round(lead.budgetEur * 0.45)),
              deadline: String(body.deadline || "Sous 7 jours").trim(),
              brief: String(body.brief || lead.notes || "Prise en charge complète par XR Agency.").trim(),
              requestedAt: now,
              requestedBy: user.fullName,
            };
            lead.updatedAt = now;
            store.activities.unshift({
              id: `act-${Date.now().toString(36)}`,
              leadId: lead.id,
              memberId: user.id,
              memberName: user.fullName,
              type: "outsource",
              message: `Sous-traitance XR demandée sur ${lead.company} (${lead.outsourceRequest.scope}).`,
              createdAt: now,
            });
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "create_member") {
            if (user.role !== "admin") {
              return Response.json({ error: "Action réservée à la Direction." }, { status: 403 });
            }
            const email = String(body.email || "").trim().toLowerCase();
            const fullName = String(body.fullName || "").trim();
            const password = String(body.password || "EquipeXR2026!");
            if (!email || !fullName) {
              return Response.json({ error: "Nom complet et e-mail requis." }, { status: 400 });
            }
            if (store.members.some((m) => m.email.toLowerCase() === email)) {
              return Response.json({ error: "Un compte existe déjà avec cet e-mail." }, { status: 409 });
            }
            const member: CrmMemberRecord = {
              id: `mem-${Date.now().toString(36)}`,
              email,
              fullName,
              title: String(body.title || "Closer · Partenaire XR").trim(),
              role: "member",
              phoneLine: String(body.phoneLine || "+33 1 86 95 41 99").trim(),
              commissionPct: Math.min(50, Math.max(0, Number(body.commissionPct) || 15)),
              passwordHash: hashPassword(password),
              active: true,
              createdAt: new Date().toISOString(),
            };
            store.members.push(member);
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "delete_lead") {
            if (user.role !== "admin") {
              return Response.json({ error: "Action réservée à la Direction." }, { status: 403 });
            }
            const leadId = String(body.leadId || "");
            store.leads = store.leads.filter((l) => l.id !== leadId);
            store.activities = store.activities.filter((a) => a.leadId !== leadId);
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          return Response.json({ error: "Action inconnue." }, { status: 400 });
        } catch (error) {
          return Response.json(
            { error: error instanceof Error ? error.message : "Erreur serveur CRM." },
            { status: 500 },
          );
        }
      },
    },
  },
});

