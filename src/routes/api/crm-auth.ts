import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual, scryptSync, randomBytes } from "node:crypto";
import { getSupabaseServer } from "@/lib/saas/supabase";
import { DEFAULT_TEAM_MEMBERS } from "@/lib/crm/data";

const SESSION_COOKIE = "xr_crm_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

export function getCrmSessionSecret(): string | null {
  const secret = process.env.CRM_SESSION_SECRET;
  return secret && Buffer.byteLength(secret, "utf8") >= 32 ? secret : null;
}

function getMemberPins(): Record<string, string> {
  try {
    const parsed = JSON.parse(process.env.CRM_MEMBER_PINS || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(([id, pin]) =>
        /^[a-z0-9_-]{1,64}$/i.test(id) && typeof pin === "string" && pin.trim().length >= 6
      )
    ) as Record<string, string>;
  } catch {
    return {};
  }
}

export function hashCrmPin(pin: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(pin, salt, 64);
  return "scrypt$" + salt.toString("hex") + "$" + hash.toString("hex");
}

function verifyStoredCrmPin(pin: string, stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  try {
    const salt = Buffer.from(parts[1], "hex");
    const expected = Buffer.from(parts[2], "hex");
    if (salt.length !== 16 || expected.length !== 64) return false;
    const actual = scryptSync(pin, salt, 64);
    return timingSafeEqual(actual, expected);
  } catch { return false; }
}

async function verifyMemberPin(memberId: string, pin: string): Promise<boolean> {
  try {
    const supabase = getSupabaseServer();
    const { data: member } = await supabase.from("crm_members").select("pin_hash").eq("id", memberId).maybeSingle();
    if (member?.pin_hash && String(member.pin_hash).startsWith("scrypt$")) {
      return verifyStoredCrmPin(pin, String(member.pin_hash));
    }
  } catch { /* allow configured server environment PINs when DB is not initialized */ }
  const configured = getMemberPins()[memberId];
  return Boolean(configured && safeCompare(pin, configured));
}

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

function signSession(memberId: string, secret: string): string {
  const exp = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = `${memberId}.${exp}`;
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyCrmSessionCookie(cookieHeader: string | null, secret: string): string | null {
  if (! cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  if (!match) return null;
  try {
    const parts = decodeURIComponent(match[1]).split(".");
    if (parts.length !== 3) return null;
    const [memberId, expStr, sig] = parts;
    const exp = Number(expStr);
    if (!Number.isSafeInteger(exp) || exp <= Date.now()) return null;
    const expected = createHmac("sha256", secret).update(`${memberId}.${expStr}`).digest("hex");
    return safeCompare(sig, expected) ? memberId : null;
  } catch {
    return null;
  }
}

export const Route = createFileRoute("/api/crm-auth")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (new URL(request.url).searchParams.get("profiles") === "1") {
          const safeProfile = (m: any) => ({
            id: m.id, name: m.name, shortName: m.shortName || m.short_name,
            roleLabel: m.roleLabel || m.role_label, roleType: m.roleType || m.role_type,
            avatarBg: m.avatarBg || m.avatar_bg, badge: m.badge,
          });
          const profiles = new Map(DEFAULT_TEAM_MEMBERS.map((m) => [m.id, safeProfile(m)]));
          try {
            const supabase = getSupabaseServer();
            const { data } = await supabase.from("crm_members").select("id,name,short_name,role_label,role_type,avatar_bg,badge");
            for (const row of data || []) profiles.set(row.id, safeProfile(row));
          } catch { /* default profiles remain available */ }
          return Response.json({ profiles: Array.from(profiles.values()) });
        }
        const secret = getCrmSessionSecret();
        if (!secret) return Response.json({ authenticated: false, error: "CRM_SESSION_SECRET absent ou trop court." }, { status: 503 });
        const memberId = verifyCrmSessionCookie(request.headers.get("cookie"), secret);
        return Response.json({ authenticated: !!memberId, memberId });
      },
      POST: async ({ request }) => {
        const secret = getCrmSessionSecret();
        if (!secret) return Response.json({ ok: false, error: "Authentification CRM non configurée côté serveur." }, { status: 503 });

        const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim().slice(0, 80);
        const now = Date.now();
        const store = (globalThis as any).__crmAuthRateLimit || ((globalThis as any).__crmAuthRateLimit = new Map<string, { start: number; count: number }>());
        const current = store.get(ip);
        if (!current || now - current.start >= RATE_LIMIT_WINDOW_MS) store.set(ip, { start: now, count: 1 });
        else if (current.count >= RATE_LIMIT_MAX) return Response.json({ ok: false, error: "Trop de tentatives. Réessayez dans une minute." }, { status: 429 });
        else current.count++;

        let body: unknown;
        try { body = await request.json(); } catch { return Response.json({ ok: false, error: "JSON invalide." }, { status: 400 }); }
        const { z } = await import("zod");
        const schema = z.object({
          action: z.enum(["login", "school", "logout", "change-pin"]),
          memberId: z.string().min(1).max(64).optional(),
          pin: z.string().min(1).max(128).optional(),
          currentPin: z.string().min(1).max(128).optional(),
          newPin: z.string().min(1).max(128).optional(),
        }).strict();
        const parsed = schema.safeParse(body);
        if (!parsed.success) return Response.json({ ok: false, error: "Payload invalide." }, { status: 400 });
        const payload = parsed.data;

        if (payload.action === "logout") {
          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json", "Set-Cookie": `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; ${process.env.NODE_ENV === "production" ? "Secure; " : ""}Max-Age=0` },
          });
        }

        if (payload.action === "school") {
          const schoolPin = process.env.CRM_SCHOOL_PIN;
          if (!schoolPin || schoolPin.trim().length < 6) return Response.json({ ok: false, error: "Accès XR School non configuré." }, { status: 503 });
          if (!payload.pin || !safeCompare(payload.pin.trim(), schoolPin.trim())) return Response.json({ ok: false, error: "Code XR School incorrect." }, { status: 401 });
          return Response.json({ ok: true, mode: "school" });
        }

        if (payload.action === "change-pin") {
          const memberId = verifyCrmSessionCookie(request.headers.get("cookie"), secret);
          const currentPin = payload.currentPin?.trim();
          const newPin = payload.newPin?.trim();
          if (!memberId) return Response.json({ ok: false, error: "Session expirée. Reconnectez-vous." }, { status: 401 });
          if (!currentPin || !newPin || newPin.length < 6) return Response.json({ ok: false, error: "Le nouveau code doit contenir au moins 6 caractères." }, { status: 400 });
          if (!(await verifyMemberPin(memberId, currentPin))) return Response.json({ ok: false, error: "Code actuel incorrect." }, { status: 401 });
          try {
            const supabase = getSupabaseServer();
            const { data: updatedMember, error } = await supabase.from("crm_members").update({ pin_hash: hashCrmPin(newPin), custom_pin_set: true }).eq("id", memberId).select("id").maybeSingle();
            if (error || !updatedMember) return Response.json({ ok: false, error: "Modification du code impossible." }, { status: 503 });
            return Response.json({ ok: true });
          } catch {
            return Response.json({ ok: false, error: "Stockage CRM serveur non configuré." }, { status: 503 });
          }
        }

        const memberId = payload.memberId?.trim();
        const pin = payload.pin?.trim();
        if (!memberId || !pin || !(await verifyMemberPin(memberId, pin))) {
          return Response.json({ ok: false, error: "Identifiant ou code incorrect." }, { status: 401 });
        }

        const token = signSession(memberId, secret);
        return new Response(JSON.stringify({ ok: true, memberId }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; ${process.env.NODE_ENV === "production" ? "Secure; " : ""}Max-Age=${SESSION_TTL_SECONDS}`,
          },
        });
      },
    },
  },
});
