import { createFileRoute } from "@tanstack/react-router";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  DEFAULT_TEAM_MEMBERS,
  canViewLead,
  type Lead,
  type TeamMember,
} from "@/lib/crm/data";
import { SERVER_DEFAULT_PINS, verifyCrmSessionCookie } from "./crm-auth";

function getServerSupabase(): { client: SupabaseClient | null; mode: "service" | "anon" | "memory" } {
  const url = (process.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL) as
    | string
    | undefined;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = (process.env.VITE_SUPABASE_ANON_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY) as string | undefined;

  if (url && serviceKey) {
    return {
      client: createClient(url, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      }),
      mode: "service",
    };
  }
  if (url && anonKey) {
    return {
      client: createClient(url, anonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      }),
      mode: "anon",
    };
  }
  return { client: null, mode: "memory" };
}

interface MemoryBank {
  leads: Lead[];
  members: TeamMember[];
  seededSupabase: boolean;
}

function getMemoryBank(): MemoryBank {
  const g = globalThis as Record<string, unknown>;
  if (!g.__xrCrmUnifiedBank) {
    g.__xrCrmUnifiedBank = {
      leads: [],
      members: [...DEFAULT_TEAM_MEMBERS],
      seededSupabase: false,
    } satisfies MemoryBank;
  }
  return g.__xrCrmUnifiedBank as MemoryBank;
}

async function ensureMembersSeeded(sb: SupabaseClient) {
  const bank = getMemoryBank();
  if (bank.seededSupabase) return;
  try {
    const rows = DEFAULT_TEAM_MEMBERS.map((m) => ({
      id: m.id,
      name: m.name,
      short_name: m.shortName,
      role_label: m.roleLabel,
      role_type: m.roleType,
      recruited_by: m.recruitedBy || null,
      setting_rate: m.settingRate,
      closing_rate: m.closingRate,
      full_cycle_rate: m.fullCycleRate,
      override_rate: m.overrideRate || 0,
      avatar_bg: m.avatarBg,
      badge: m.badge,
      pin_hash: SERVER_DEFAULT_PINS[m.id] || m.pin || "1234",
      custom_pin_set: Boolean(m.customPinSet),
    }));
    // Insert parents first (antoine, martin, lucas, sarah, studio), then recruits
    const parents = rows.filter((r) => !r.recruited_by);
    const children = rows.filter((r) => !!r.recruited_by);
    await sb.from("crm_members").upsert(parents, { onConflict: "id", ignoreDuplicates: true });
    if (children.length > 0) {
      await sb.from("crm_members").upsert(children, { onConflict: "id", ignoreDuplicates: true });
    }
    bank.seededSupabase = true;
  } catch {
    // ignore if table not yet migrated
  }
}

export function rowToLead(r: Record<string, unknown>): Lead {
  const rawInst = (r.installments as Record<string, unknown> | null) || {};
  const meta = (rawInst.meta as Record<string, unknown> | undefined) || {};
  const createdIso = r.created_at ? String(r.created_at) : new Date().toISOString();

  return {
    id: String(r.id),
    name: String(r.name || ""),
    contact: String(r.contact || ""),
    phone: String(r.phone || ""),
    email: r.email ? String(r.email) : undefined,
    websiteUrl: r.website_url ? String(r.website_url) : undefined,
    city: meta.city ? String(meta.city) : undefined,
    source: meta.source ? String(meta.source) : undefined,
    priority: (meta.priority as Lead["priority"]) || "normal",
    callsCount: typeof meta.callsCount === "number" ? meta.callsCount : 0,
    sectorId: String(r.sector_id || "restaurant"),
    serviceId: String(r.service_id || "websites"),
    planLabel: String(r.plan_label || ""),
    billing: (r.billing as Lead["billing"]) || "once",
    value: Number(r.value) || 0,
    extraItems: Array.isArray(r.extra_items) ? (r.extra_items as Lead["extraItems"]) : [],
    stage: (r.stage as Lead["stage"]) || "new",
    setterId: String(r.setter_id || "antoine"),
    closerId: String(r.closer_id || "antoine"),
    issue: String(r.issue || ""),
    notes: String(r.notes || ""),
    followUpDate: r.follow_up_date ? String(r.follow_up_date).slice(0, 10) : undefined,
    wonAt: r.won_at ? String(r.won_at) : undefined,
    wonMonth: r.won_at
      ? String(r.won_at).slice(0, 7)
      : meta.wonMonth
        ? String(meta.wonMonth)
        : undefined,
    installments: {
      plan: rawInst.plan === "3x" ? "3x" : "1x",
      paidCount: Number(rawInst.paidCount) || 0,
    },
    commissionStatus: (r.commission_status as Lead["commissionStatus"]) || "estimated",
    mockupReady: Boolean(r.mockup_ready),
    mockupUrl: meta.mockupUrl ? String(meta.mockupUrl) : undefined,
    studioStatus: (r.studio_status as Lead["studioStatus"]) || undefined,
    projectMilestone: (meta.projectMilestone as Lead["projectMilestone"]) || undefined,
    providerId: meta.providerId ? String(meta.providerId) : undefined,
    providerCost: typeof meta.providerCost === "number" ? meta.providerCost : undefined,
    invoiceStatus: (meta.invoiceStatus as Lead["invoiceStatus"]) || "none",
    invoiceRef: meta.invoiceRef ? String(meta.invoiceRef) : undefined,
    timeline: Array.isArray(r.timeline) ? (r.timeline as Lead["timeline"]) : [],
    createdAt: new Date(createdIso).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export function leadToRow(lead: Lead) {
  return {
    id: lead.id,
    name: lead.name,
    contact: lead.contact,
    phone: lead.phone || "Non renseigné",
    email: lead.email || null,
    website_url: lead.websiteUrl || null,
    sector_id: lead.sectorId || "restaurant",
    service_id: lead.serviceId || "websites",
    plan_label: lead.planLabel || "Sur mesure",
    billing: lead.billing || "once",
    value: lead.value || 0,
    extra_items: lead.extraItems || [],
    stage: lead.stage || "new",
    setter_id: lead.setterId || "antoine",
    closer_id: lead.closerId || "antoine",
    issue: lead.issue || "",
    notes: lead.notes || "",
    follow_up_date: lead.followUpDate || null,
    won_at: lead.wonAt || null,
    installments: {
      plan: lead.installments?.plan || "1x",
      paidCount: lead.installments?.paidCount || 0,
      meta: {
        city: lead.city,
        source: lead.source,
        priority: lead.priority || "normal",
        callsCount: lead.callsCount || 0,
        mockupUrl: lead.mockupUrl,
        projectMilestone: lead.projectMilestone,
        providerId: lead.providerId,
        providerCost: lead.providerCost,
        invoiceStatus: lead.invoiceStatus || "none",
        invoiceRef: lead.invoiceRef,
        wonMonth: lead.wonMonth,
      },
    },
    commission_status: lead.commissionStatus || "estimated",
    mockup_ready: Boolean(lead.mockupReady),
    studio_status: lead.studioStatus || null,
    timeline: lead.timeline || [],
    updated_at: new Date().toISOString(),
  };
}

/**
 * Pont automatique Site Vitrine -> CRM Supabase + Mémoire
 */
export async function pushWebsiteLeadToCrm(params: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  need?: string;
  message?: string;
  source?: string;
  valueEur?: number;
  serviceId?: string;
  sectorId?: string;
}) {
  const lead: Lead = {
    id: `web-${Date.now().toString(36)}`,
    name: params.company?.trim() || params.name.trim(),
    contact: params.name.trim(),
    phone: params.phone?.trim() || "Via email",
    email: params.email.trim(),
    websiteUrl: params.website?.trim() || undefined,
    source: params.source || "Site Web xragencyai.com",
    priority: "high",
    callsCount: 0,
    sectorId: params.sectorId || "entreprise",
    serviceId: params.serviceId || "websites",
    planLabel: params.need || "Demande entrante site web",
    billing: "once",
    value: params.valueEur || 799,
    stage: "new",
    setterId: "antoine",
    closerId: "antoine",
    issue: params.need || "Demande entrante qualifiée depuis xragencyai.com",
    notes: params.message || "",
    followUpDate: new Date().toISOString().slice(0, 10),
    createdAt: new Date().toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
    commissionStatus: "estimated",
    invoiceStatus: "none",
    timeline: [
      {
        id: `tl-${Date.now()}`,
        date: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        text: `Prospect entrant capturé depuis ${params.source || "xragencyai.com"}`,
      },
    ],
  };

  const bank = getMemoryBank();
  bank.leads = [lead, ...bank.leads];

  const { client } = getServerSupabase();
  if (client) {
    try {
      await ensureMembersSeeded(client);
      await client.from("crm_leads").upsert(leadToRow(lead));
    } catch {
      // memory bank already updated
    }
  }
  return lead.id;
}

export const Route = createFileRoute("/api/crm-sync")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const sessionMemberId = verifyCrmSessionCookie(request.headers.get("cookie"));
        if (!sessionMemberId) {
          return Response.json({ ok: false, error: "Non authentifié." }, { status: 401 });
        }

        const bank = getMemoryBank();
        const { client, mode } = getServerSupabase();

        let members = bank.members;
        let allLeads = bank.leads;

        if (client) {
          await ensureMembersSeeded(client);
          try {
            const { data: mRows } = await client.from("crm_members").select("*");
            if (mRows && mRows.length > 0) {
              members = mRows.map((m: Record<string, unknown>) => ({
                id: String(m.id),
                name: String(m.name),
                shortName: String(m.short_name),
                roleLabel: String(m.role_label),
                roleType: m.role_type as TeamMember["roleType"],
                recruitedBy: m.recruited_by ? String(m.recruited_by) : undefined,
                settingRate: Number(m.setting_rate) || 0.1,
                closingRate: Number(m.closing_rate) || 0.2,
                fullCycleRate: Number(m.full_cycle_rate) || 0.2,
                overrideRate: Number(m.override_rate) || 0,
                avatarBg: String(m.avatar_bg || "from-indigo-500 to-violet-600"),
                badge: String(m.badge || "⚡ Équipe"),
                // Never expose Antoine's or customized PINs over the wire
                pin:
                  m.id === "antoine" || m.custom_pin_set
                    ? ""
                    : String(m.pin_hash || "1234"),
                customPinSet: Boolean(m.custom_pin_set),
              }));
              bank.members = members;
            }

            const { data: lRows, error: lErr } = await client
              .from("crm_leads")
              .select("*")
              .order("created_at", { ascending: false });
            if (!lErr && lRows) {
              allLeads = lRows.map((r: Record<string, unknown>) => rowToLead(r));
              bank.leads = allLeads;
            }
          } catch {
            // fallback to memory bank
          }
        }

        const viewer =
          members.find((m) => m.id === sessionMemberId) ||
          DEFAULT_TEAM_MEMBERS.find((m) => m.id === sessionMemberId);

        if (!viewer) {
          return Response.json({ ok: false, error: "Membre introuvable." }, { status: 403 });
        }

        // Pour le classement Arena public interne, on renvoie aussi un résumé anonymisé des compteurs,
        // mais les fiches complètes de leads respectent strictement canViewLead !
        const visibleLeads = allLeads.filter((l) => canViewLead(viewer, l, members));

        return Response.json({
          ok: true,
          mode,
          leads: visibleLeads,
          allLeadsForArena:
            viewer.roleType === "direction"
              ? allLeads
              : allLeads.map((l) => ({
                  ...l,
                  phone: canViewLead(viewer, l, members) ? l.phone : "Confidentiel",
                  email: canViewLead(viewer, l, members) ? l.email : undefined,
                  notes: canViewLead(viewer, l, members) ? l.notes : "",
                })),
          members,
        });
      },

      POST: async ({ request }) => {
        const sessionMemberId = verifyCrmSessionCookie(request.headers.get("cookie"));
        if (!sessionMemberId) {
          return Response.json({ ok: false, error: "Non authentifié." }, { status: 401 });
        }

        const body = (await request.json().catch(() => ({}))) as {
          action?: "upsert_lead" | "delete_lead" | "upsert_member";
          lead?: Lead;
          leadId?: string;
          member?: TeamMember;
        };

        const bank = getMemoryBank();
        const { client } = getServerSupabase();
        if (client) await ensureMembersSeeded(client);

        if (body.action === "upsert_lead" && body.lead) {
          const lead = body.lead;
          const idx = bank.leads.findIndex((x) => x.id === lead.id);
          if (idx >= 0) bank.leads[idx] = lead;
          else bank.leads.unshift(lead);

          if (client) {
            try {
              await client.from("crm_leads").upsert(leadToRow(lead));
            } catch {
              // memory updated
            }
          }
          return Response.json({ ok: true });
        }

        if (body.action === "delete_lead" && body.leadId) {
          bank.leads = bank.leads.filter((x) => x.id !== body.leadId);
          if (client) {
            try {
              await client.from("crm_leads").delete().eq("id", body.leadId);
            } catch {
              // memory updated
            }
          }
          return Response.json({ ok: true });
        }

        if (body.action === "upsert_member" && body.member) {
          // Seul Direction ou Manager RH peut créer un membre
          if (sessionMemberId !== "antoine" && sessionMemberId !== "martin") {
            return Response.json({ ok: false, error: "Réservé Direction / RH." }, { status: 403 });
          }
          const m = body.member;
          const idx = bank.members.findIndex((x) => x.id === m.id);
          if (idx >= 0) bank.members[idx] = m;
          else bank.members.push(m);

          if (client) {
            try {
              await client.from("crm_members").upsert({
                id: m.id,
                name: m.name,
                short_name: m.shortName,
                role_label: m.roleLabel,
                role_type: m.roleType,
                recruited_by: m.recruitedBy || null,
                setting_rate: m.settingRate,
                closing_rate: m.closingRate,
                full_cycle_rate: m.fullCycleRate,
                override_rate: m.overrideRate || 0,
                avatar_bg: m.avatarBg,
                badge: m.badge,
                pin_hash: m.pin || "1234",
                custom_pin_set: Boolean(m.customPinSet),
              });
            } catch {
              // memory updated
            }
          }
          return Response.json({ ok: true });
        }

        return Response.json({ ok: false, error: "Action inconnue." }, { status: 400 });
      },
    },
  },
});
