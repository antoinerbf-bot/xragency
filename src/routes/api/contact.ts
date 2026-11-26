import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";
import { recordLeadFromWebsite } from "@/lib/crm-store";
import { pushWebsiteLeadToCrm } from "./crm-sync";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character] ?? character;
  });

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as Record<string, unknown>;

          // Honeypot silencieux : ne jamais envoyer de message automatisé.
          if (body.hp) {
            return Response.json({ ok: true, message: "Message transmis." });
          }

          const name = typeof body.name === "string" ? body.name.trim() : "";
          const email = typeof body.email === "string" ? body.email.trim() : "";
          const company = typeof body.company === "string" ? body.company.trim() : "";
          const phone = typeof body.phone === "string" ? body.phone.trim() : "";
          const website = typeof body.website === "string" ? body.website.trim() : "";
          const need = typeof body.need === "string" ? body.need.trim() : "";
          const message = typeof body.message === "string" ? body.message.trim() : "";

          if (!name || !email || !message) {
            return Response.json(
              { error: "Veuillez renseigner votre nom, email et message." },
              { status: 400 },
            );
          }

          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
            return Response.json({ error: "Adresse email invalide." }, { status: 400 });
          }

          if (
            name.length > 160 ||
            company.length > 160 ||
            phone.length > 80 ||
            website.length > 2048 ||
            need.length > 120 ||
            message.length > 5000
          ) {
            return Response.json(
              { error: "Certains champs dépassent la longueur autorisée." },
              { status: 400 },
            );
          }

          // Enregistrement systématique et résilient dans le CRM interne + Supabase Live
          const crmResult = recordLeadFromWebsite({
            name,
            email,
            phone,
            company,
            website,
            need,
            message,
            source: "Formulaire de contact web",
          });

          const lowerNeed = need.toLowerCase();
          const detectedServiceId = lowerNeed.includes("crm") || lowerNeed.includes("caisse")
            ? "crm"
            : lowerNeed.includes("maps")
              ? "maps"
              : lowerNeed.includes("seo")
                ? "seo"
                : lowerNeed.includes("social") || lowerNeed.includes("reseau")
                  ? "social"
                  : lowerNeed.includes("robot")
                    ? "robotics"
                    : lowerNeed.includes("brand") || lowerNeed.includes("logo")
                      ? "branding"
                      : "websites";

          await pushWebsiteLeadToCrm({
            name,
            email,
            phone,
            company,
            website,
            need: need || "Demande entrante site web",
            message,
            source: "Site Web xragencyai.com",
            serviceId: detectedServiceId,
            valueEur: detectedServiceId === "crm" ? 2000 : detectedServiceId === "maps" ? 999 : 799,
          }).catch(() => {});

          // Tentative d'envoi par e-mail via Resend si configuré
          const apiKey = process.env.RESEND_API_KEY;
          if (apiKey) {
            try {
              const resend = new Resend(apiKey);
              const from = process.env.RESEND_FROM_EMAIL || "XR Agency <onboarding@resend.dev>";

              const isHrOrRecruitment =
                need.toLowerCase().includes("candidature") ||
                need.toLowerCase().includes("recrutement") ||
                need.toLowerCase().includes("rh") ||
                need.toLowerCase().includes("closer");

              const recipients = isHrOrRecruitment
                ? ["contact.xragency@gmail.com", "martin.leclipteur@gmail.com"]
                : ["contact.xragency@gmail.com"];

              await resend.emails.send({
                from,
                to: recipients,
                replyTo: email,
                subject: isHrOrRecruitment
                  ? `[Candidature RH · Martin] ${name.replace(/[\r\n]+/g, " ")}${company ? ` (${company.replace(/[\r\n]+/g, " ")})` : ""}`
                  : `[Nouveau Contact] ${name.replace(/[\r\n]+/g, " ")}${company ? ` (${company.replace(/[\r\n]+/g, " ")})` : ""}`,
                html: `
                  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
                    <h2 style="border-bottom: 2px solid #111; padding-bottom: 8px;">Nouvelle demande de contact — XR Agency</h2>
                    <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
                    <p><strong>Email :</strong> ${escapeHtml(email)}</p>
                    <p><strong>Téléphone :</strong> ${escapeHtml(phone || "Non renseigné")}</p>
                    <p><strong>Entreprise :</strong> ${escapeHtml(company || "Non renseignée")}</p>
                    <p><strong>Site web :</strong> ${escapeHtml(website || "Non renseigné")}</p>
                    <p><strong>Besoin :</strong> ${escapeHtml(need || "Non précisé")}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Message :</strong></p>
                    <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(message)}</p>
                  </div>
                `,
              });
            } catch (mailErr) {
              console.warn("Notification email non envoyée (CRM à jour) :", mailErr);
            }
          }

          return Response.json({
            ok: true,
            leadId: crmResult.leadId,
            message:
              "Votre message a été transmis avec succès. Notre équipe revient vers vous dès que possible.",
          });
        } catch (error) {
          console.error("Contact API error:", error);
          return Response.json(
            {
              error:
                "Une erreur est survenue. Merci de réessayer ou de nous contacter via WhatsApp.",
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
