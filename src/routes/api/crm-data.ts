import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getSupabaseServer } from "@/lib/saas/supabase";
import { DEFAULT_TEAM_MEMBERS, canViewLead, type Lead, type TeamMember } from "@/lib/crm/data";
import { getCrmSessionSecret, verifyCrmSessionCookie } from "./crm-auth";

async function authenticate(request: Request): Promise<TeamMember | null> {
  const secret = getCrmSessionSecret();
  if (!secret) return null;
  const memberId = verifyCrmSessionCookie(request.headers.get("cookie"), secret);
  if (!memberId) return null;
  const known = DEFAULT_TEAM_MEMBERS.find((member) => member.id === memberId);
  if (known) return known;
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase.from("crm_members").select("*").eq("id", memberId).maybeSingle();
    if (error || !data) return null;
    return {
      id: data.id, name: data.name, shortName: data.short_name, roleLabel: data.role_label,
      roleType: data.role_type, recruitedBy: data.recruited_by || undefined,
      settingRate: Number(data.setting_rate), closingRate: Number(data.closing_rate),
      fullCycleRate: Number(data.full_cycle_rate), overrideRate: Number(data.override_rate || 0),
      avatarBg: data.avatar_bg, badge: data.badge, pin: "", customPinSet: Boolean(data.custom_pin_set),
    } as TeamMember;
  } catch { return null; }
}

function toTeamMember(row: any): TeamMember {
  return {
    id: row.id, name: row.name, shortName: row.short_name, roleLabel: row.role_label,
    roleType: row.role_type, recruitedBy: row.recruited_by || undefined,
    settingRate: Number(row.setting_rate), closingRate: Number(row.closing_rate),
    fullCycleRate: Number(row.full_cycle_rate), overrideRate: Number(row.override_rate || 0),
    avatarBg: row.avatar_bg, badge: row.badge, pin: "", customPinSet: Boolean(row.custom_pin_set),
  } as TeamMember;
}

async function loadCrmMembers(supabase: ReturnType<typeof getSupabaseServer>): Promise<TeamMember[] | null> {
  const { data, error } = await supabase.from("crm_members").select("id,name,short_name,role_label,role_type,recruited_by,setting_rate,closing_rate,full_cycle_rate,override_rate,avatar_bg,badge,custom_pin_set");
  if (error || !data) return null;
  return data.map(toTeamMember);
}

function toLeadAccessShape(row: any): Lead {
  return {
    id: String(row.id),
    name: String(row.name || ""),
    contact: String(row.contact || ""),
    phone: String(row.phone || ""),
    sectorId: String(row.sector_id || ""),
    serviceId: String(row.service_id || ""),
    planLabel: String(row.plan_label || ""),
    billing: row.billing,
    value: Number(row.value || 0),
    stage: row.stage,
    setterId: String(row.setter_id || ""),
    closerId: String(row.closer_id || ""),
    issue: String(row.issue || ""),
    notes: String(row.notes || ""),
    createdAt: String(row.created_at || ""),
    commissionStatus: row.commission_status || "estimated",
  } as Lead;
}

const leadSchema = z.object({
  id: z.string().min(1).max(128),
  name: z.string().min(1).max(250),
  contact: z.string().max(250),
  phone: z.string().max(100),
  email: z.string().max(250).optional(),
  websiteUrl: z.string().max(2000).optional(),
  sectorId: z.string().max(100),
  serviceId: z.string().max(100),
  planLabel: z.string().max(250),
  billing: z.enum(["once", "month", "year"]),
  value: z.number().finite().min(0).max(100000000),
  extraItems: z.array(z.object({
    id: z.string().max(128),
    serviceId: z.string().max(100),
    planLabel: z.string().max(250),
    billing: z.enum(["once", "month", "year"]),
    price: z.number().finite().min(0).max(100000000),
  })).max(50).optional(),
  stage: z.enum(["new", "rdv", "mockup", "negociation", "won"]),
  setterId: z.string().min(1).max(64),
  closerId: z.string().min(1).max(64),
  issue: z.string().max(5000),
  notes: z.string().max(20000),
  followUpDate: z.string().max(30).optional(),
  createdAt: z.string().max(100).optional(),
  wonAt: z.string().max(50).optional(),
  wonMonth: z.string().max(20).optional(),
  installments: z.object({ plan: z.enum(["1x", "3x"]), paidCount: z.number().int().min(0).max(3) }).optional(),
  commissionStatus: z.enum(["estimated", "pending_payment", "unlocked"]),
  mockupReady: z.boolean().optional(),
  studioStatus: z.enum(["pending", "in_production", "delivered"]).optional(),
  timeline: z.array(z.object({ id: z.string().max(128), date: z.string().max(50), text: z.string().max(2000) })).max(500).optional(),
}).strict();

async function ensureCrmMembers(supabase: ReturnType<typeof getSupabaseServer>): Promise<boolean> {
  // Seed uniquement les membres absents : ne jamais écraser les taux personnalisés déjà en base.
  for (const member of DEFAULT_TEAM_MEMBERS) {
    const { error } = await supabase.from("crm_members").upsert({
      id: member.id,
      name: member.name,
      short_name: member.shortName,
      role_label: member.roleLabel,
      role_type: member.roleType,
      recruited_by: member.recruitedBy || null,
      setting_rate: member.settingRate,
      closing_rate: member.closingRate,
      full_cycle_rate: member.fullCycleRate,
      override_rate: member.overrideRate || 0,
      avatar_bg: member.avatarBg,
      badge: member.badge,
      pin_hash: "server-managed",
      custom_pin_set: false,
    }, { onConflict: "id", ignoreDuplicates: true });
    if (error) return false;
  }
  return true;
}

function canEditLead(member: TeamMember, lead: Lead, members: TeamMember[]): boolean {
  if (!canViewLead(member, lead, members)) return false;
  if (member.roleType === "direction") return true;
  if (member.roleType === "studio") return lead.stage === "mockup" || lead.stage === "won";
  return lead.setterId === member.id || lead.closerId === member.id ||
    (member.roleType === "manager" && members.some((m) => m.recruitedBy === member.id && (m.id === lead.setterId || m.id === lead.closerId)));
}

export const Route = createFileRoute("/api/crm-data")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const member = await authenticate(request);
        if (!member) return Response.json({ error: "Authentification requise." }, { status: 401 });
        try {
          const supabase = getSupabaseServer();
          if (!(await ensureCrmMembers(supabase))) return Response.json({ error: "Initialisation des membres CRM impossible." }, { status: 503 });
          if (new URL(request.url).searchParams.get("resource") === "members") {
            if (member.roleType !== "direction") return Response.json({ error: "Accès réservé à la direction." }, { status: 403 });
            const team = await loadCrmMembers(supabase);
            return team ? Response.json({ members: team }) : Response.json({ error: "Lecture de l'équipe impossible." }, { status: 503 });
          }
          const { data, error } = await supabase.from("crm_leads").select("*").order("created_at", { ascending: false });
          if (error) return Response.json({ error: "Lecture CRM impossible." }, { status: 503 });
          const members = await loadCrmMembers(supabase);
          if (!members) return Response.json({ error: "Lecture des permissions CRM impossible." }, { status: 503 });
          const visible = (data || []).filter((row: any) => canViewLead(member, toLeadAccessShape(row), members));
          return Response.json({ leads: visible });
        } catch {
          return Response.json({ error: "Stockage CRM serveur non configuré." }, { status: 503 });
        }
      },
      POST: async ({ request }) => {
        const member = await authenticate(request);
        if (!member) return Response.json({ error: "Authentification requise." }, { status: 401 });
        let body: unknown;
        try { body = await request.json(); } catch { return Response.json({ error: "JSON invalide." }, { status: 400 }); }
        if (new URL(request.url).searchParams.get("resource") === "members") {
          if (member.roleType !== "direction") return Response.json({ error: "Accès réservé à la direction." }, { status: 403 });
          const memberSchema = z.object({
            id: z.string().regex(/^[a-z0-9_-]{1,64}$/i),
            name: z.string().min(1).max(200),
            shortName: z.string().min(1).max(80),
            roleLabel: z.string().min(1).max(150),
            roleType: z.enum(["direction", "manager", "setter", "closer", "full_cycle", "student", "studio"]),
            recruitedBy: z.string().max(64).optional(),
            settingRate: z.number().min(0).max(1),
            closingRate: z.number().min(0).max(1),
            fullCycleRate: z.number().min(0).max(1),
            overrideRate: z.number().min(0).max(1).optional(),
            avatarBg: z.string().max(200),
            badge: z.string().max(100),
            customPinSet: z.boolean().optional(),
          }).strict();
          const memberParsed = memberSchema.safeParse(body);
          if (!memberParsed.success) return Response.json({ error: "Profil membre invalide." }, { status: 400 });
          try {
            const supabase = getSupabaseServer();
            if (!(await ensureCrmMembers(supabase))) return Response.json({ error: "Initialisation des membres CRM impossible." }, { status: 503 });
            const m = memberParsed.data;
            const { error } = await supabase.from("crm_members").upsert({
              id: m.id, name: m.name, short_name: m.shortName, role_label: m.roleLabel,
              role_type: m.roleType, recruited_by: m.recruitedBy || null,
              setting_rate: m.settingRate, closing_rate: m.closingRate, full_cycle_rate: m.fullCycleRate,
              override_rate: m.overrideRate || 0, avatar_bg: m.avatarBg, badge: m.badge,
              pin_hash: "server-managed", custom_pin_set: Boolean(m.customPinSet),
            });
            if (error) return Response.json({ error: "Enregistrement du membre impossible." }, { status: 503 });
            return Response.json({ ok: true });
          } catch { return Response.json({ error: "Stockage CRM serveur non configuré." }, { status: 503 }); }
        }

        const parsed = leadSchema.safeParse(body);
        if (!parsed.success) return Response.json({ error: "Données prospect invalides." }, { status: 400 });
        const lead = parsed.data as Lead;
        const members = DEFAULT_TEAM_MEMBERS;
        if (!canEditLead(member, lead, members)) return Response.json({ error: "Accès refusé à ce prospect." }, { status: 403 });

        try {
          const supabase = getSupabaseServer();
          if (!(await ensureCrmMembers(supabase))) return Response.json({ error: "Initialisation des membres CRM impossible." }, { status: 503 });
          const { data: existing, error: lookupError } = await supabase.from("crm_leads").select("*").eq("id", lead.id).maybeSingle();
          if (lookupError) return Response.json({ error: "Vérification du prospect impossible." }, { status: 503 });
          if (existing) {
            const oldLead = toLeadAccessShape(existing);
            if (!canEditLead(member, oldLead, members)) return Response.json({ error: "Accès refusé à ce prospect." }, { status: 403 });
            if (member.roleType !== "direction") {
              const protectedPairs: [unknown, unknown][] = [
                [lead.name, existing.name], [lead.contact, existing.contact], [lead.phone, existing.phone],
                [lead.email || null, existing.email || null], [lead.websiteUrl || null, existing.website_url || null],
                [lead.sectorId, existing.sector_id], [lead.serviceId, existing.service_id], [lead.planLabel, existing.plan_label],
                [lead.billing, existing.billing], [lead.value, Number(existing.value)], [JSON.stringify(lead.extraItems || []), JSON.stringify(existing.extra_items || [])],
                [lead.setterId, existing.setter_id], [lead.closerId, existing.closer_id],
                [lead.commissionStatus, existing.commission_status], [JSON.stringify(lead.installments || { plan: "1x", paidCount: 0 }), JSON.stringify(existing.installments || { plan: "1x", paidCount: 0 })],
                [lead.wonAt || null, existing.won_at || null],
              ];
              if (protectedPairs.some(([next, prev]) => next !== prev)) return Response.json({ error: "Seule la direction peut modifier les données commerciales ou financières." }, { status: 403 });
              if (member.roleType === "studio" && lead.stage !== existing.stage) return Response.json({ error: "Le studio ne peut pas modifier l'étape commerciale." }, { status: 403 });
            }
          } else if (member.roleType !== "direction" && lead.setterId !== member.id && lead.closerId !== member.id) {
            return Response.json({ error: "Un nouveau prospect doit vous être attribué." }, { status: 403 });
          }

          const row = {
            id: lead.id, name: lead.name, contact: lead.contact, phone: lead.phone,
            email: lead.email || null, website_url: lead.websiteUrl || null,
            sector_id: lead.sectorId, service_id: lead.serviceId, plan_label: lead.planLabel,
            billing: lead.billing, value: lead.value, extra_items: lead.extraItems || [],
            stage: lead.stage, setter_id: lead.setterId, closer_id: lead.closerId,
            issue: lead.issue, notes: lead.notes, follow_up_date: lead.followUpDate || null,
            won_at: lead.wonAt || null, installments: lead.installments || { plan: "1x", paidCount: 0 },
            commission_status: lead.commissionStatus, mockup_ready: Boolean(lead.mockupReady),
            studio_status: lead.studioStatus || null, timeline: lead.timeline || [],
            updated_at: new Date().toISOString(),
          };
          const { error } = await supabase.from("crm_leads").upsert(row);
          if (error) return Response.json({ error: "Enregistrement CRM impossible." }, { status: 503 });
          return Response.json({ ok: true });
        } catch {
          return Response.json({ error: "Stockage CRM serveur non configuré." }, { status: 503 });
        }
      },
      DELETE: async ({ request }) => {
        const member = await authenticate(request);
        if (!member) return Response.json({ error: "Authentification requise." }, { status: 401 });
        let body: unknown;
        try { body = await request.json(); } catch { return Response.json({ error: "JSON invalide." }, { status: 400 }); }
        const parsed = z.object({ id: z.string().min(1).max(128) }).safeParse(body);
        if (!parsed.success) return Response.json({ error: "Identifiant invalide." }, { status: 400 });
        try {
          const supabase = getSupabaseServer();
          const { data: existing, error: lookupError } = await supabase.from("crm_leads").select("*").eq("id", parsed.data.id).maybeSingle();
          if (lookupError) return Response.json({ error: "Vérification du prospect impossible." }, { status: 503 });
          if (!existing) return Response.json({ ok: true });
          const lead = toLeadAccessShape(existing);
          if (member.roleType !== "direction" && (lead.setterId !== member.id && lead.closerId !== member.id)) {
            return Response.json({ error: "Seule la direction ou le responsable du prospect peut le supprimer." }, { status: 403 });
          }
          const { error } = await supabase.from("crm_leads").delete().eq("id", parsed.data.id);
          if (error) return Response.json({ error: "Suppression CRM impossible." }, { status: 503 });
          return Response.json({ ok: true });
        } catch {
          return Response.json({ error: "Stockage CRM serveur non configuré." }, { status: 503 });
        }
      },
    },
  },
});
