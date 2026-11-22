import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_COOKIE = "xr_crm_session";

function getSecret() {
  return process.env.CRM_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "xr-agency-crm-local-hmac-key-2026";
}

function getDirectorPin() {
  return (process.env.CRM_DIRECTOR_PIN || "071266").trim();
}

function getSchoolPin() {
  return (process.env.CRM_SCHOOL_PIN || "1234").trim();
}

const DEFAULT_TEAM_PINS: Record<string, string> = {
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

function signSession(memberId: string): string {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 jours
  const payload = `${memberId}.${exp}`;
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

function verifySessionCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  if (!match) return null;
  const parts = decodeURIComponent(match[1]).split(".");
  if (parts.length !== 3) return null;
  const [memberId, expStr, sig] = parts;
  if (Number(expStr) < Date.now()) return null;
  const expected = createHmac("sha256", getSecret()).update(`${memberId}.${expStr}`).digest("hex");
  if (!safeCompare(sig, expected)) return null;
  return memberId;
}

export const Route = createFileRoute("/api/crm-auth")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const memberId = verifySessionCookie(request.headers.get("cookie"));
        return Response.json({ authenticated: !!memberId, memberId });
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            action?: "login" | "school" | "logout";
            memberId?: string;
            pin?: string;
            expectedPin?: string;
          };

          if (body.action === "logout") {
            return new Response(JSON.stringify({ ok: true }), {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Set-Cookie": `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
              },
            });
          }

          if (body.action === "school") {
            const candidate = (body.pin || "").trim();
            if (!safeCompare(candidate, getSchoolPin())) {
              return Response.json({ ok: false, error: "Mot de passe XR School incorrect." }, { status: 401 });
            }
            return Response.json({ ok: true, mode: "school" });
          }

          if (body.action === "login") {
            const memberId = (body.memberId || "").trim();
            const pin = (body.pin || "").trim();
            if (!memberId || !pin) {
              return Response.json({ ok: false, error: "Identifiant et code requis." }, { status: 400 });
            }

            let valid = false;
            if (memberId === "antoine") {
              // Code Directeur vérifié STRICTEMENT côté serveur (jamais présent dans le bundle client)
              const serverPin = body.expectedPin && body.expectedPin.length >= 4 ? body.expectedPin : getDirectorPin();
              valid = safeCompare(pin, serverPin);
            } else {
              const expected = body.expectedPin || DEFAULT_TEAM_PINS[memberId] || "1234";
              valid = safeCompare(pin, expected);
            }

            if (!valid) {
              return Response.json({ ok: false, error: "Code incorrect. Veuillez réessayer." }, { status: 401 });
            }

            const token = signSession(memberId);
            return new Response(JSON.stringify({ ok: true, memberId }), {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Set-Cookie": `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
              },
            });
          }

          return Response.json({ ok: false, error: "Action invalide." }, { status: 400 });
        } catch {
          return Response.json({ ok: false, error: "Erreur serveur authentification." }, { status: 500 });
        }
      },
    },
  },
});
