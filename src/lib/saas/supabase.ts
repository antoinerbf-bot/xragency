// ── Supabase client instances ──
// Browser client uses anon key (safe — RLS protects data)
// Server client uses service role key (bypasses RLS — never expose to browser)

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ── Browser client ──
let browserClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (browserClient) return browserClient;

  const url = import.meta.env.VITE_SUPABASE_URL as string;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

  if (!url || !key) {
    throw new Error(
      "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. " +
        "Copy .env.example to .env and fill in your Supabase credentials.",
    );
  }

  browserClient = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return browserClient;
}

// ── Server client (service role — NEVER call from client code) ──
let serverClient: SupabaseClient | null = null;

export function getSupabaseServer(): SupabaseClient {
  if (serverClient) return serverClient;

  const url = (import.meta.env.VITE_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL) as string;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY on the server. " +
        "Set these in your Vercel environment variables.",
    );
  }

  serverClient = createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return serverClient;
}

// ── Check if Supabase is configured ──
export function isSupabaseConfigured(): boolean {
  return !!(
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
}
