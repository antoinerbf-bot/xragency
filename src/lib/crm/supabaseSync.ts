// ── XR AGENCY CRM — Couche de synchronisation Cloud (/api/crm-sync + Supabase Realtime + Fallback localStorage) ──

import { getSupabase, isSupabaseConfigured } from "@/lib/saas/supabase";
import type { Lead, TeamMember } from "./data";

export type SyncState = "supabase_live" | "local_ready" | "syncing" | "error";

export function checkSupabaseStatus(): SyncState {
  return isSupabaseConfigured() ? "supabase_live" : "local_ready";
}

export interface CrmSyncSnapshot {
  leads: Lead[];
  allLeadsForArena: Lead[];
  members: TeamMember[];
  mode: "service" | "anon" | "memory";
}

export async function fetchCrmSnapshotFromServer(): Promise<CrmSyncSnapshot | null> {
  try {
    const res = await fetch("/api/crm-sync", {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.ok) return null;
    return {
      leads: Array.isArray(data.leads) ? data.leads : [],
      allLeadsForArena: Array.isArray(data.allLeadsForArena) ? data.allLeadsForArena : [],
      members: Array.isArray(data.members) ? data.members : [],
      mode: data.mode || "memory",
    };
  } catch {
    return null;
  }
}

export async function fetchLeadsFromSupabase(): Promise<Lead[] | null> {
  const snap = await fetchCrmSnapshotFromServer();
  return snap ? snap.leads : null;
}

export async function upsertLeadToSupabase(lead: Lead): Promise<boolean> {
  try {
    const res = await fetch("/api/crm-sync", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "upsert_lead", lead }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function deleteLeadFromSupabase(leadId: string): Promise<boolean> {
  try {
    const res = await fetch("/api/crm-sync", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete_lead", leadId }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function upsertMemberToSupabase(member: TeamMember): Promise<boolean> {
  try {
    const res = await fetch("/api/crm-sync", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "upsert_member", member }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function subscribeCrmRealtime(onChange: () => void): (() => void) | null {
  let supaCleanup: (() => void) | null = null;
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabase();
      const channel = supabase
        .channel("xr_crm_realtime")
        .on("postgres_changes", { event: "*", schema: "public", table: "crm_leads" }, onChange)
        .subscribe();
      supaCleanup = () => {
        supabase.removeChannel(channel);
      };
    } catch {
      // ignore
    }
  }

  // Polling doux multi-postes toutes les 20s pour garantir la synchro même sous RLS strict
  const pollId =
    typeof window !== "undefined" ? window.setInterval(() => onChange(), 20_000) : null;

  return () => {
    supaCleanup?.();
    if (pollId !== null && typeof window !== "undefined") window.clearInterval(pollId);
  };
}
