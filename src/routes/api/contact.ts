import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            name?: string;
            email?: string;
            company?: string;
            website?: string;
            need?: string;
            message?: string;
          };

          const name = body.name?.trim();
          const email = body.email?.trim();
          const message = body.message?.trim();

          if (!name || !email || !message) {
            return Response.json(
              { error: "Veuillez renseigner votre nom, email et message." },
              { status: 400 },
            );
          }

          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return Response.json({ error: "Adresse email invalide." }, { status: 400 });
          }

          if (process.env.RESEND_API_KEY) {
            try {
              const resend = new Resend(process.env.RESEND_API_KEY);
              const from = process.env.RESEND_FROM_EMAIL || "XR Agency <contact.xragency@gmail.com>";

              await resend.emails.send({
                from,
                to: ["contact.xragency@gmail.com"],
                replyTo: email,
                subject: `[Nouveau Contact] ${name} ${body.company ? `(${body.company})` : ""}`,
                html: `
                  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
                    <h2 style="border-bottom: 2px solid #111; padding-bottom: 8px;">Nouvelle demande de contact — XR Agency</h2>
                    <p><strong>Nom :</strong> ${name}</p>
                    <p><strong>Email :</strong> ${email}</p>
                    <p><strong>Entreprise :</strong> ${body.company || "Non renseignée"}</p>
                    <p><strong>Site web :</strong> ${body.website || "Non renseigné"}</p>
                    <p><strong>Besoin :</strong> ${body.need || "Non précisé"}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Message :</strong></p>
                    <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</p>
                  </div>
                `,
              });
            } catch (err) {
              console.error("Resend error:", err);
            }
          }

          return Response.json({
            ok: true,
            message: "Votre message a été transmis avec succès. Notre équipe vous répond sous 2h.",
          });
        } catch (error) {
          return Response.json(
            { error: error instanceof Error ? error.message : "Erreur de traitement." },
            { status: 500 },
          );
        }
      },
    },
  },
});
