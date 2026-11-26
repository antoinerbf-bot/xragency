// XR AGENCY CRM — synchronisation via API serveur authentifiée.
// Le navigateur ne parle plus directement aux tables CRM ni ne reçoit la service-role key.

import type { Lead, TeamMember } from "./data";

export type SyncState = "supabase_live" | "local_ready" | "syncing" | "error";

export function checkSupabaseStatus(): SyncState {
  return "syncing";
}

function emitSyncState(state: SyncState): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("xr-crm-sync-status", { detail: state }));
  }
}

function mapDbLead(r: any): Lead {
  return {
    id: r.id,
    name: r.name,
    contact: r.contact,
    phone: r.phone,
    email: r.email || undefined,
    websiteUrl: r.website_url || undefined,
    sectorId: r.sector_id,
    serviceId: r.service_id,
    planLabel: r.plan_label,
    billing: r.billing,
    value: Number(r.value) || 0,
    extraItems: Array.isArray(r.extra_items) ? r.extra_items : [],
    stage: r.stage,
    setterId: r.setter_id,
    closerId: r.closer_id,
    issue: r.issue || "",
    notes: r.notes || "",
    followUpDate: r.follow_up_date || undefined,
    wonAt: r.won_at || undefined,
    wonMonth: r.won_at ? String(r.won_at).slice(0, 7) : undefined,
    installments: r.installments || undefined,
    createdAt: r.created_at ? new Date(r.created_at).toLocaleDateString("fr-FR", {
      day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
    }) : "",
    commissionStatus: r.commission_status || "estimated",
    mockupReady: Boolean(r.mockup_ready),
    studioStatus: r.studio_status || undefined,
    timeline: Array.isArray(r.timeline) ? r.timeline : [],
  };
}

export async function fetchLeadsFromSupabase(): Promise<Lead[] | null> {
  try {
    const response = await fetch("/api/crm-data", { credentials: "same-origin", cache: "no-store" });
    if (!response.ok) {
      emitSyncState("error");
      return null;
    }
    const body = await response.json();
    if (!Array.isArray(body?.leads)) {
      emitSyncState("error");
      return null;
    }
    emitSyncState("supabase_live");
    return body.leads.map(mapDbLead);
  } catch {
    emitSyncState("error");
    return null;
  }
}

export async function upsertLeadToSupabase(lead: Lead): Promise<boolean> {
  try {
    const response = await fetch("/api/crm-data", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    emitSyncState(response.ok ? "supabase_live" : "error");
    return response.ok;
  } catch {
    emitSyncState("error");
    return false;
  }
}

export async function deleteLeadFromSupabase(leadId: string): Promise<boolean> {
  try {
    const response = await fetch("/api/crm-data", {
      method: "DELETE",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: leadId }),
    });
    emitSyncState(response.ok ? "supabase_live" : "error");
    return response.ok;
  } catch {
    emitSyncState("error");
    return false;
  }
}

// Les membres et taux de commission seront écrits par une route Direction dédiée.
// Ne jamais écrire de PIN ni de pin_hash depuis le navigateur.
export async function fetchMembersFromSupabase(): Promise<TeamMember[] | null> {
  try {
    const response = await fetch("/api/crm-data?resource=members", { credentials: "same-origin", cache: "no-store" });
    if (!response.ok) return null;
    const body = await response.json();
    if (!Array.isArray(body?.members)) return null;
    return body.members.map((m: any) => ({
      id: m.id, name: m.name, shortName: m.shortName, roleLabel: m.roleLabel,
      roleType: m.roleType, recruitedBy: m.recruitedBy || undefined,
      settingRate: Number(m.settingRate), closingRate: Number(m.closingRate),
      fullCycleRate: Number(m.fullCycleRate), overrideRate: Number(m.overrideRate || 0),
      avatarBg: m.avatarBg, badge: m.badge, pin: "", customPinSet: Boolean(m.customPinSet),
    }));
  } catch {
    return null;
  }
}

export async function upsertMemberToSupabase(member: TeamMember): Promise<boolean> {
  try {
    const response = await fetch("/api/crm-data?resource=members", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: member.id, name: member.name, shortName: member.shortName, roleLabel: member.roleLabel,
        roleType: member.roleType, recruitedBy: member.recruitedBy,
        settingRate: member.settingRate, closingRate: member.closingRate,
        fullCycleRate: member.fullCycleRate, overrideRate: member.overrideRate || 0,
        avatarBg: member.avatarBg, badge: member.badge, customPinSet: Boolean(member.customPinSet),
      }),
    });
    emitSyncState(response.ok ? "supabase_live" : "error");
    return response.ok;
  } catch {
    emitSyncState("error");
    return false;
  }
}

// Polling léger : l'API serveur applique l'authentification et le RBAC à chaque lecture.
export function subscribeCrmRealtime(onChange: () => void): (() => void) | null {
  const timer = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(timer);
}
