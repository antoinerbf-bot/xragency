import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";

type LeadFile = { name: string; type: string; content: string };

export const Route = createFileRoute("/api/send-free-request")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as {
            mode?: "audit" | "mockup"; name?: string; company?: string; email?: string; whatsapp?: string;
            website?: string; brief?: string; references?: string; files?: LeadFile[];
          };
          if (!body.name || !body.company || !body.email || !body.whatsapp || !body.website || !body.brief) {
            return Response.json({ error: "Merci de compléter les informations obligatoires." }, { status: 400 });
          }
          if (!process.env.RESEND_API_KEY) return Response.json({ error: "RESEND_API_KEY manquante." }, { status: 503 });
          const resend = new Resend(process.env.RESEND_API_KEY);
          const from = process.env.RESEND_FROM_EMAIL || "XRAGENCY <contact.xragency@gmail.com>";
          const modeLabel = body.mode === "mockup" ? "MAQUETTE GRATUITE · VALEUR 200 €" : "AUDIT DIGITAL GRATUIT";
          const attachments = (body.files ?? []).filter((file) => file.content && file.name).slice(0, 8).map((file) => ({
            content: file.content,
            filename: file.name,
          }));
          const html = "<div style=\"font-family:Arial,sans-serif;line-height:1.65;color:#111\">" +
            "<h2>XRAGENCY · " + modeLabel + "</h2>" +
            "<p><strong>" + body.name + "</strong> · " + body.company + "</p>" +
            "<p><strong>Email :</strong> " + body.email + "<br/><strong>WhatsApp :</strong> " + body.whatsapp +
            "<br/><strong>Site :</strong> <a href=\"" + body.website + "\">" + body.website + "</a></p>" +
            "<h3>Brief</h3><p>" + body.brief.replace(/\n/g, "<br/>") + "</p>" +
            (body.references ? "<h3>Références</h3><p>" + body.references.replace(/\n/g, "<br/>") + "</p>" : "") +
            "<p><strong>Fichiers joints :</strong> " + attachments.length + "</p></div>";
          const { data, error } = await resend.emails.send({
            from, to: ["contact.xragency@gmail.com"], replyTo: body.email,
            subject: "[" + modeLabel + "] " + body.company + " · " + body.name, html, attachments,
          });
          if (error) return Response.json({ error: error.message }, { status: 502 });
          return Response.json({ ok: true, id: data?.id });
        } catch (error) {
          return Response.json({ error: error instanceof Error ? error.message : "Erreur lors de l'envoi." }, { status: 500 });
        }
      },
    },
  },
});
