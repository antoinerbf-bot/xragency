// ── Auth helpers — wraps Supabase auth for the SaaS ──

import { getSupabase, isSupabaseConfigured } from "./supabase";
import type { Profile } from "./types";

export interface AuthUser {
  id: string;
  email: string;
  profile: Profile | null;
}

// ── Get current session (browser) ──
export async function getSession(): Promise<AuthUser | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) return null;

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  return {
    id: session.user.id,
    email: session.user.email ?? "",
    profile: profile as Profile | null,
  };
}

// ── Sign up with email + password ──
export async function signUp(email: string, password: string, fullName: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role: "agency" },
    },
  });
  return { data, error };
}

// ── Sign in with email + password ──
export async function signIn(email: string, password: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

// ── Sign out ──
export async function signOut() {
  const supabase = getSupabase();
  await supabase.auth.signOut();
}

// ── Check if user is agency/admin ──
export function isAgency(user: AuthUser | null): boolean {
  return user?.profile?.role === "agency";
}
