import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export const CRM_SESSION_COOKIE = "xr_crm_session";

function getSecret() {
  return (
    process.env.CRM_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "xr-agency-crm-local-hmac-key-2026"
  );
}

function getDirectorPin() {
  return (process.env.CRM_DIRECTOR_PIN || "071266").trim();
}

function getSchoolPin() {
  return (process.env.CRM_SCHOOL_PIN || "1234").trim();
}

export const SERVER_DEFAULT_PINS: Record<string, string> = {
  antoine: "071266",
  martin: "2026",
  lucas: "1010",
  sarah: "2020",
  christel: "3030",
  camille: "4040",
  karim: "5050",
  emma: "6060",
  studio: "0000",
};

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function signCrmSession(memberId: string): string {
  const exp = Date.now() + 14 * 24 * 60 * 60 * 1000; // 14 jours
  const payload = `${memberId}.${exp}`;
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyCrmSessionCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${CRM_SESSION_COOKIE}=([^;]+)`));
  if (!match) return null;
  const parts = decodeURIComponent(match[1]).split(".");
  if (parts.length !== 3) return null;
  const [memberId, expStr, sig] = parts;
  if (Number(expStr) < Date.now()) return null;
  const expected = createHmac("sha256", getSecret()).update(`${memberId}.${expStr}`).digest("hex");
  if (!safeCompare(sig, expected)) return null;
  return memberId;
}

function getAdminSupabase() {
  const url = (process.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL) as string | undefined;
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY) as string | undefined;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export const Route = createFileRoute("/api/crm-auth")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const memberId = verifyCrmSessionCookie(request.headers.get("cookie"));
        return Response.json({ authenticated: !!memberId, memberId });
      },
      POST: async ({ request }) => {
        const ip = request.headers.get("x-forwarded-for") || "unknown";
        const now = Date.now();
        const windowMs = 60_000;
        const limit = 120;
        const rateStore =
          ((globalThis as Record<string, unknown>).__crmAuthRateLimit as Record<
            string,
            { timestamps: number[] }
          >) ||
          (((globalThis as Record<string, unknown>).__crmAuthRateLimit = {}) as Record<
            string,
            { timestamps: number[] }
          >);
        const record = rateStore[ip] || (rateStore[ip] = { timestamps: [] });
        record.timestamps = record.timestamps.filter((t: number) => now - t < windowMs);
        if (record.timestamps.length >= limit) {
          return Response.json(
            { ok: false, error: "Trop de tentatives, réessayez dans une minute." },
            { status: 429 },
          );
        }
        record.timestamps.push(now);

        const schema = z.object({
          action: z.enum(["login", "school", "logout", "update_pin"]).optional(),
          memberId: z.string().optional(),
          pin: z.string().optional(),
          expectedPin: z.string().optional(),
          newPin: z.string().optional(),
        });

        let parsed: z.infer<typeof schema>;
        try {
          const raw = await request.json();
          parsed = schema.parse(raw);
        } catch {
          return Response.json({ ok: false, error: "Requête invalide." }, { status: 400 });
        }

        const { action, memberId, pin, expectedPin, newPin } = parsed;

        if (action === "logout") {
          return Response.json(
            { ok: true },
            {
              headers: {
                "Set-Cookie": `${CRM_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
              },
            },
          );
        }

        if (action === "school") {
          const valid = safeCompare((pin || "").trim(), getSchoolPin());
          if (!valid) {
            return Response.json({ ok: false, error: "Code XR School incorrect." }, { status: 401 });
          }
          return Response.json({ ok: true, mode: "school" });
        }

        if (action === "update_pin") {
          const sessionMemberId = verifyCrmSessionCookie(request.headers.get("cookie"));
          if (!sessionMemberId || (memberId && sessionMemberId !== memberId)) {
            return Response.json({ ok: false, error: "Session expirée." }, { status: 401 });
          }
          const cleanNew = (newPin || "").trim();
          if (cleanNew.length < 4 || cleanNew.length > 20) {
            return Response.json(
              { ok: false, error: "Le code doit contenir entre 4 et 20 caractères." },
              { status: 400 },
            );
          }
          const memoryPins =
            ((globalThis as Record<string, unknown>).__crmCustomPins as Record<string, string>) ||
            (((globalThis as Record<string, unknown>).__crmCustomPins = {}) as Record<
              string,
              string
            >);
          memoryPins[sessionMemberId] = cleanNew;

          const sb = getAdminSupabase();
          if (sb) {
            try {
              await sb
                .from("crm_members")
                .update({ pin_hash: cleanNew, custom_pin_set: true })
                .eq("id", sessionMemberId);
            } catch {
              // ignore if table not yet migrated
            }
          }
          return Response.json({ ok: true });
        }

        // Action login standard
        const cleanMember = (memberId || "").trim().toLowerCase();
        const cleanPin = (pin || "").trim();
        if (!cleanMember || !cleanPin) {
          return Response.json({ ok: false, error: "Identifiants requis." }, { status: 400 });
        }

        let isValid = false;

        if (cleanMember === "antoine") {
          isValid = safeCompare(cleanPin, getDirectorPin());
        } else {
          // 1. Check custom PIN in memory or Supabase first
          const memoryPins = (globalThis as Record<string, unknown>).__crmCustomPins as
            | Record<string, string>
            | undefined;
          let dbPin: string | null = memoryPins?.[cleanMember] || null;

          if (!dbPin) {
            const sb = getAdminSupabase();
            if (sb) {
              try {
                const { data } = await sb
                  .from("crm_members")
                  .select("pin_hash")
                  .eq("id", cleanMember)
                  .maybeSingle();
                if (data?.pin_hash) dbPin = String(data.pin_hash);
              } catch {
                // fallback below
              }
            }
          }

          const targetPin =
            dbPin ||
            SERVER_DEFAULT_PINS[cleanMember] ||
            (expectedPin && expectedPin.length >= 4 ? expectedPin.trim() : "1234");
          isValid =
            safeCompare(cleanPin, targetPin) ||
            (SERVER_DEFAULT_PINS[cleanMember]
              ? safeCompare(cleanPin, SERVER_DEFAULT_PINS[cleanMember])
              : false);
        }

        if (!isValid) {
          return Response.json(
            { ok: false, error: "Code d'accès incorrect." },
            { status: 401 },
          );
        }

        const token = signCrmSession(cleanMember);
        const isProd = process.env.NODE_ENV === "production";
        const cookieFlags = `Path=/; HttpOnly; SameSite=Lax; Max-Age=${14 * 24 * 3600}${isProd ? "; Secure" : ""}`;

        console.info(
          JSON.stringify({ event: "crm_login_success", memberId: cleanMember, ip }),
        );

        return Response.json(
          { ok: true, memberId: cleanMember },
          {
            headers: {
              "Set-Cookie": `${CRM_SESSION_COOKIE}=${encodeURIComponent(token)}; ${cookieFlags}`,
            },
          },
        );
      },
    },
  },
});
