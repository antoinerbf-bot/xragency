import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";

export const Route = createFileRoute("/api/send-quote")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as { email?: string; name?: string; pdfBase64?: string; quoteNumber?: string; whatsapp?: string };
          const email = body.email?.trim();
          const pdfBase64 = body.pdfBase64?.trim();
          if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !pdfBase64) return Response.json({ error: "Email et PDF requis." }, { status: 400 });
          if (pdfBase64.length > 12000000) return Response.json({ error: "PDF trop volumineux." }, { status: 413 });
          if (!process.env.RESEND_API_KEY) return Response.json({ error: "RESEND_API_KEY manquante." }, { status: 503 });
          const resend = new Resend(process.env.RESEND_API_KEY);
          const from = process.env.RESEND_FROM_EMAIL || "XR Agency <contact.xragency@gmail.com>";
          const { data, error } = await resend.emails.send({
            from,
            to: [email],
            bcc: ["contact.xragency@gmail.com"],
            subject: `Votre devis XR Agency${body.quoteNumber ? ` · ${body.quoteNumber}` : ""}`,
            html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111"><h2>Votre devis XR Agency</h2><p>Bonjour ${body.name || ""},</p><p>Votre devis personnalisé XRAGENCY est joint à cet e-mail.</p><p>Contact : ${body.whatsapp || "non renseigné"}</p><p>Merci pour votre confiance.<br/>XR Agency</p></div>`,
            attachments: [{ content: pdfBase64, filename: `${body.quoteNumber || "devis-xragency"}.pdf` }],
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
