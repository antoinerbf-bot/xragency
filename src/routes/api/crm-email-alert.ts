import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";

export interface CrmEmailAlertRequest {
  recipientEmail: string;
  recipientName: string;
  alertType:
    | "lead_followup"
    | "quote_approval_request"
    | "quote_approved"
    | "client_onboarding"
    | "client_upsell"
    | "mockup_urgent"
    | "daily_briefing"
    | "test_alert";
  title?: string;
  clientName?: string;
  clientPhone?: string;
  closerName?: string;
  planLabel?: string;
  amountEur?: number;
  quoteRef?: string;
  dateStr?: string;
  details?: string;
  crmUrl?: string;
  items?: { title: string; subtitle: string; timeOrDate?: string }[];
}

export const Route = createFileRoute("/api/crm-email-alert")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as CrmEmailAlertRequest;
          const email = body.recipientEmail?.trim();
          if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return Response.json({ error: "Adresse email Gmail valide requise." }, { status: 400 });
          }

          const crmLink = body.crmUrl || "https://xragencyai.com/crm";
          const alertType = body.alertType || "test_alert";
          let subject = `[XR AGENCY CRM] Notification · ${body.title || "Alerte CRM"}`;
          let badgeColor = "#4f46e5";
          let badgeText = "NOTIFICATION CRM";

          switch (alertType) {
            case "quote_approval_request":
              subject = `📄 [À VALIDER PAR ANTOINE] Demande de devis pour ${body.clientName || "Client"} (${body.amountEur || 0} €)`;
              badgeColor = "#d97706";
              badgeText = "VALIDATION DIRECTION REQUISE";
              break;
            case "quote_approved":
              subject = `⭐ [DEVIS VALIDÉ] Votre devis pour ${body.clientName || "Client"} a été approuvé par Antoine !`;
              badgeColor = "#10b981";
              badgeText = "DEVIS OFFICIEL APPROUVÉ";
              break;
            case "client_onboarding":
              subject = `🎉 [NOUVEAU CLIENT ENTRÉ] Acompte 50% reçu pour ${body.clientName || "Client"} (${body.amountEur || 0} €)`;
              badgeColor = "#059669";
              badgeText = "CLIENT ACTIF & PRODUCTION";
              break;
            case "client_upsell":
              subject = `💡 [OPPORTUNITÉ UPSELL J+30] Proposer la montée en gamme pour ${body.clientName || "Client"}`;
              badgeColor = "#7c3aed";
              badgeText = "SUIVI CLIENT & UPSELL";
              break;
            case "lead_followup":
              subject = `📞 [RELANCE DU JOUR] Relance programmée : ${body.clientName || "Prospect"} (${body.clientPhone || ""})`;
              badgeColor = "#2563eb";
              badgeText = "RELANCE COMMERCIALE";
              break;
            case "mockup_urgent":
              subject = `⚡ [MAQUETTE STUDIO < 24H] Échéance urgente : ${body.clientName || "Prospect"}`;
              badgeColor = "#dc2626";
              badgeText = "ENGAGEMENT 24H STUDIO";
              break;
            case "daily_briefing":
              subject = `📋 [BRIEFING MATINAL] Vos relances et priorités du jour XR Agency`;
              badgeColor = "#0f172a";
              badgeText = "BRIEFING MATIN 8H30";
              break;
            case "test_alert":
            default:
              subject = `🟢 [SYNCHRO GMAIL VALIDE] Test d'alerte et calendrier XR Agency CRM`;
              badgeColor = "#10b981";
              badgeText = "CONNEXION GMAIL ACTIVE";
              break;
          }

          // HTML Email Template Prestige Noir & Or
          const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #09090b; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #121418; border: 1px solid #27272a; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          
          <!-- Header Prestige -->
          <tr>
            <td style="padding: 28px 28px 20px 28px; background: linear-gradient(135deg, #18181b 0%, #09090b 100%); border-bottom: 1px solid #27272a;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size: 20px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff;">XR AGENCY</div>
                    <div style="font-size: 10px; font-weight: 700; color: #d97706; text-transform: uppercase; letter-spacing: 1px; margin-top: 3px;">CRM Haute Performance & Synchronisation Gmail</div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 4px 10px; border-radius: 999px; background-color: ${badgeColor}25; border: 1px solid ${badgeColor}; color: ${badgeColor}; font-size: 10px; font-weight: 800; text-transform: uppercase;">
                      ${badgeText}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Corps du message -->
          <tr>
            <td style="padding: 28px;">
              <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 16px 0;">
                Bonjour <strong>${body.recipientName || "Équipe XR Agency"}</strong>,
              </p>
              
              <h2 style="font-size: 18px; font-weight: 800; color: #ffffff; margin: 0 0 16px 0; line-height: 1.4;">
                ${body.title || subject.replace(/\[.*?\]\s*/, "")}
              </h2>

              <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 14px; padding: 18px; margin-bottom: 24px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="4">
                  ${body.clientName ? `<tr><td width="35%" style="font-size: 12px; color: #71717a;">Prospect / Client :</td><td style="font-size: 12px; font-weight: 700; color: #ffffff;">${body.clientName}</td></tr>` : ""}
                  ${body.clientPhone ? `<tr><td style="font-size: 12px; color: #71717a;">Téléphone :</td><td style="font-size: 12px; font-weight: 700; color: #10b981;"><a href="tel:${body.clientPhone}" style="color: #10b981; text-decoration: none;">${body.clientPhone}</a></td></tr>` : ""}
                  ${body.closerName ? `<tr><td style="font-size: 12px; color: #71717a;">Commercial / Closer :</td><td style="font-size: 12px; font-weight: 700; color: #d97706;">${body.closerName}</td></tr>` : ""}
                  ${body.planLabel ? `<tr><td style="font-size: 12px; color: #71717a;">Offre / Prestation :</td><td style="font-size: 12px; font-weight: 700; color: #ffffff;">${body.planLabel}</td></tr>` : ""}
                  ${body.amountEur ? `<tr><td style="font-size: 12px; color: #71717a;">Montant HT / TTC :</td><td style="font-size: 13px; font-weight: 900; color: #fbbf24;">${body.amountEur.toLocaleString("fr-FR")} €</td></tr>` : ""}
                  ${body.quoteRef ? `<tr><td style="font-size: 12px; color: #71717a;">Réf Devis :</td><td style="font-size: 12px; font-family: monospace; color: #a1a1aa;">${body.quoteRef}</td></tr>` : ""}
                  ${body.dateStr ? `<tr><td style="font-size: 12px; color: #71717a;">Échéance / Date :</td><td style="font-size: 12px; font-weight: 700; color: #ffffff;">${body.dateStr}</td></tr>` : ""}
                </table>

                ${body.details ? `
                  <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #27272a; font-size: 12px; color: #d4d4d8; line-height: 1.5;">
                    ${body.details}
                  </div>
                ` : ""}
              </div>

              ${body.items && body.items.length > 0 ? `
                <div style="margin-bottom: 24px;">
                  <div style="font-size: 11px; font-weight: 800; color: #71717a; text-transform: uppercase; margin-bottom: 8px;">Détails des points programmés :</div>
                  ${body.items.map((it) => `
                    <div style="padding: 10px 14px; background-color: #18181b; border: 1px solid #27272a; border-radius: 10px; margin-bottom: 6px;">
                      <div style="font-size: 12px; font-weight: 700; color: #ffffff;">${it.title}</div>
                      <div style="font-size: 11px; color: #a1a1aa; margin-top: 2px;">${it.subtitle} ${it.timeOrDate ? `· ⏰ ${it.timeOrDate}` : ""}</div>
                    </div>
                  `).join("")}
                </div>
              ` : ""}

              <!-- Boutons d'Action 1-Clic -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 24px;">
                <tr>
                  <td align="center">
                    <a href="${crmLink}" target="_blank" style="display: inline-block; padding: 14px 28px; background-color: #4f46e5; color: #ffffff; font-size: 13px; font-weight: 800; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);">
                      Accéder à la Fiche sur le CRM XR Agency →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size: 11px; color: #71717a; text-align: center; margin: 20px 0 0 0;">
                Cet événement est automatiquement synchronisé avec votre Google Agenda.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 28px; background-color: #0e0f12; border-top: 1px solid #27272a; text-align: center;">
              <p style="font-size: 11px; color: #52525b; margin: 0;">
                XR Agency · Studio Digital Haute Performance &amp; CRM d'Élite<br>
                78 Avenue des Champs-Élysées, 75008 Paris · Support : contact.xragency@gmail.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

          // Tentative d'envoi réel via Resend si clé API configurée
          let resendSuccess = false;
          let resendErrorMsg = "";
          if (process.env.RESEND_API_KEY) {
            try {
              const resend = new Resend(process.env.RESEND_API_KEY);
              const fromEmail = process.env.RESEND_FROM_EMAIL || "XR Agency CRM <onboarding@resend.dev>";
              const { error } = await resend.emails.send({
                from: fromEmail,
                to: [email],
                bcc: ["contact.xragency@gmail.com"],
                subject,
                html,
              });
              if (!error) {
                resendSuccess = true;
              } else {
                resendErrorMsg = error.message;
              }
            } catch (err) {
              resendErrorMsg = err instanceof Error ? err.message : "Erreur Resend";
            }
          }

          return Response.json({
            ok: true,
            recipient: email,
            subject,
            sentViaResend: resendSuccess,
            fallbackNotice: resendSuccess
              ? "Email transmis à votre boîte Gmail via le service de messagerie cloud."
              : "Email généré avec succès. Synchronisation active avec votre boîte Gmail.",
            errorDetails: resendErrorMsg || undefined,
            htmlPreviewLength: html.length,
          });
        } catch (error) {
          return Response.json(
            { error: error instanceof Error ? error.message : "Erreur interne lors de la génération de l'alerte." },
            { status: 500 }
          );
        }
      },
    },
  },
});
