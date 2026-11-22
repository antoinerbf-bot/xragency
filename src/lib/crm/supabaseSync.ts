// ── XR AGENCY CRM — Couche de synchronisation Supabase temps réel + Fallback localStorage ──

import { getSupabase, isSupabaseConfigured } from "@/lib/saas/supabase";
import type { Lead, TeamMember } from "./data";

export type SyncState = "supabase_live" | "local_ready" | "syncing" | "error";

export function checkSupabaseStatus(): SyncState {
  return isSupabaseConfigured() ? "supabase_live" : "local_ready";
}

// Charger les leads depuis Supabase si configuré, sinon null (fallback localStorage)
export async function fetchLeadsFromSupabase(): Promise<Lead[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("crm_leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data) return null;

    return data.map((r) => ({
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
      stage: r.stage,
      setterId: r.setter_id,
      closerId: r.closer_id,
      issue: r.issue || "",
      notes: r.notes || "",
      followUpDate: r.follow_up_date || undefined,
      createdAt: new Date(r.created_at).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      commissionStatus: r.commission_status || "estimated",
      mockupReady: Boolean(r.mockup_ready),
      studioStatus: r.studio_status || undefined,
      timeline: Array.isArray(r.timeline) ? r.timeline : [],
    }));
  } catch {
    return null;
  }
}

// Sauvegarder / mettre à jour un lead dans Supabase si configuré
export async function upsertLeadToSupabase(lead: Lead): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("crm_leads").upsert({
      id: lead.id,
      name: lead.name,
      contact: lead.contact,
      phone: lead.phone,
      email: lead.email || null,
      website_url: lead.websiteUrl || null,
      sector_id: lead.sectorId,
      service_id: lead.serviceId,
      plan_label: lead.planLabel,
      billing: lead.billing,
      value: lead.value,
      stage: lead.stage,
      setter_id: lead.setterId,
      closer_id: lead.closerId,
      issue: lead.issue,
      notes: lead.notes,
      follow_up_date: lead.followUpDate || null,
      commission_status: lead.commissionStatus,
      mockup_ready: Boolean(lead.mockupReady),
      studio_status: lead.studioStatus || null,
      timeline: lead.timeline || [],
      updated_at: new Date().toISOString(),
    });
    return !error;
  } catch {
    return false;
  }
}

export async function deleteLeadFromSupabase(leadId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("crm_leads").delete().eq("id", leadId);
    return !error;
  } catch {
    return false;
  }
}

export async function upsertMemberToSupabase(member: TeamMember): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const supabase = getSupabase();
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
      pin_hash: member.pin,
      custom_pin_set: Boolean(member.customPinSet),
    });
    return !error;
  } catch {
    return false;
  }
}

// Abonnement temps réel aux changements CRM
export function subscribeCrmRealtime(onChange: () => void): (() => void) | null {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = getSupabase();
    const channel = supabase
      .channel("xr_crm_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "crm_leads" }, onChange)
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  } catch {
    return null;
  }
}
