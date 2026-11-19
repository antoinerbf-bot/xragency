import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";
import { CHECKOUT_PRODUCTS } from "@/lib/checkout-catalog";
import { isValidBic, isValidIban, normalizeIban, recordQuoteFromWebsite } from "@/lib/crm-store";

type CheckoutBody = {
  sectorId?: string;
  currency?: "eur" | "usd" | "vnd";
  acceptCommitmentTerms?: boolean;
  situation?: string;
  budget?: string;
  selectedServices?: string[];
  action?: "checkout" | "send_quote" | "bank_transfer";
  pdfBase64?: string;
  summary?: { sector?: string; goal?: string; situation?: string; budget?: string; discovery?: string; recommendation?: string; services?: Array<{ label: string; detail: string; price: number; period: "once" | "month" | "year" }>; once?: number; monthly?: number; annual?: number };
  client?: { company?: string; name?: string; email?: string; whatsapp?: string; website?: string };
};

export const Route = createFileRoute("/api/create-checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as CheckoutBody;

          // ── A. ACTION : VIREMENT BANCAIRE PROFESSIONNEL ──
          if (body.action === "bank_transfer") {
            const bankIban = normalizeIban(process.env.XR_BANK_IBAN || "");
            const bankBic = process.env.XR_BANK_BIC?.trim().toUpperCase() || "";
            const bankBeneficiary = process.env.XR_BANK_BENEFICIARY?.trim() || "";
            const bankName = process.env.XR_BANK_NAME?.trim() || "";
            if (!isValidIban(bankIban) || !isValidBic(bankBic) || !bankBeneficiary || !bankName) {
              return Response.json({ error: "Le virement bancaire est temporairement indisponible : les coordonnées bancaires officielles sont absentes ou invalides." }, { status: 503 });
            }
            const email = body.client?.email?.trim() || "";
            const name = body.client?.name?.trim() || "Client Pro";
            const summary = body.summary || {};

            const transferRes = await recordQuoteFromWebsite({
              clientName: name,
              clientCompany: body.client?.company?.trim() || `${name} (Société)`,
              clientEmail: email,
              phone: body.client?.whatsapp?.trim(),
              website: body.client?.website?.trim(),
              summary: {
                sector: summary.sector,
                goal: summary.goal,
                situation: summary.situation,
                budget: summary.budget,
                services: summary.services,
                once: summary.once,
                monthly: summary.monthly,
                annual: summary.annual,
              },
              asBankTransfer: true,
            });

            return Response.json({
              ok: true,
              bankTransfer: true,
              quoteId: transferRes.quoteId,
              invoiceId: transferRes.invoiceId,
              paymentReference: transferRes.paymentReference,
              bankDetails: {
                beneficiary: bankBeneficiary,
                bankName,
                ibanMasked: `${bankIban.slice(0, 4)} •••• •••• •••• ${bankIban.slice(-4)}`,
                bic: bankBic,
                reference: transferRes.paymentReference,
              },
              message: "Votre ordre de virement et votre devis ont été générés. Mentionnez impérativement la référence de paiement lors du virement.",
            });
          }

          // ── B. ACTION : ENVOI DE DEVIS ──
          if (body.action === "send_quote") {
            const email = body.client?.email?.trim();
            const pdfBase64 = body.pdfBase64?.trim();
            if (!email) return Response.json({ error: "E-mail requis." }, { status: 400 });

            const summary = body.summary || {};

            // Enregistrement garanti dans le CRM
            const quoteRes = await recordQuoteFromWebsite({
              clientName: body.client?.name?.trim() || "Client Devis",
              clientCompany: body.client?.company?.trim() || "Société",
              clientEmail: email,
              phone: body.client?.whatsapp?.trim(),
              website: body.client?.website?.trim(),
              summary: {
                sector: summary.sector,
                goal: summary.goal,
                situation: summary.situation,
                budget: summary.budget,
                services: summary.services,
                once: summary.once,
                monthly: summary.monthly,
                annual: summary.annual,
              },
            });

            // Envoi par email si Resend configuré
            if (process.env.RESEND_API_KEY && pdfBase64) {
              try {
                const resend = new Resend(process.env.RESEND_API_KEY);
                const services = (summary.services || []).map((service) => `<li><strong>${service.label}</strong> — ${service.price.toLocaleString("fr-FR")} €${service.period === "month" ? " / mois" : service.period === "year" ? " / an" : ""}<br><span style="color:#666">${service.detail}</span></li>`).join("");
                await resend.emails.send({
                  from: process.env.RESEND_FROM_EMAIL || "XR Agency <onboarding@resend.dev>",
                  to: [email],
                  replyTo: "contact.xragency@gmail.com",
                  subject: `Votre devis officiel ${quoteRes.quoteId} — XR Agency`,
                  html: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;color:#171717"><h1>Votre devis officiel ${quoteRes.quoteId}</h1><p>Bonjour ${body.client?.name || ""},</p><p>Merci d'avoir terminé votre cadrage digital XR Agency. Votre devis formel est joint à ce courriel.</p><h2>Prestations retenues</h2><ul>${services}</ul><p><strong>Total ponctuel :</strong> ${(summary.once || 0).toLocaleString("fr-FR")} €<br><strong>Total mensuel :</strong> ${(summary.monthly || 0).toLocaleString("fr-FR")} € / mois<br><strong>Total annuel :</strong> ${(summary.annual || 0).toLocaleString("fr-FR")} € / an</p></div>`,
                  attachments: [{ filename: `devis-${quoteRes.quoteId}.pdf`, content: pdfBase64 }],
                });
              } catch (mailErr) {
                console.warn("Échec Resend (devis tout de même sauvegardé dans le CRM) :", mailErr);
              }
            }

            return Response.json({ sent: true, quoteId: quoteRes.quoteId });
          }
          const stripeTaxBehavior = process.env.XR_STRIPE_TAX_BEHAVIOR;
          if (
            process.env.XR_TAX_SETTINGS_CONFIRMED !== "true" ||
            (stripeTaxBehavior !== "inclusive" && stripeTaxBehavior !== "exclusive")
          ) {
            return Response.json(
              {
                error:
                  "Le paiement en ligne est suspendu tant que le régime de TVA, l'affichage HT/TTC et Stripe Tax ne sont pas configurés. Après vérification, renseignez XR_TAX_SETTINGS_CONFIRMED=true et XR_STRIPE_TAX_BEHAVIOR=inclusive ou exclusive. Le devis en EUR reste disponible.",
              },
              { status: 503 },
            );
          }
          if (!process.env.STRIPE_SECRET_KEY) {
            return Response.json(
              { error: "Paiement en ligne temporairement indisponible. Veuillez finaliser par virement ou sur WhatsApp." },
              { status: 503 }
            );
          }

          const selectedServices = Array.isArray(body.selectedServices)
            ? [...new Set(body.selectedServices)].slice(0, 10)
            : [];

          if (!selectedServices.length) {
            return Response.json({ error: "Aucune prestation sélectionnée." }, { status: 400 });
          }
          if (selectedServices.length !== body.selectedServices?.length) {
            return Response.json({ error: "La sélection contient des doublons ou trop de prestations." }, { status: 400 });
          }
          if (body.currency && body.currency !== "eur") {
            return Response.json({
              error: "Le paiement en ligne est actuellement disponible en EUR uniquement. Les conversions internationales restent indicatives.",
            }, { status: 400 });
          }

          const invalidIds = selectedServices.filter(
            (id) => !Object.prototype.hasOwnProperty.call(CHECKOUT_PRODUCTS, id),
          );
          if (invalidIds.length) {
            return Response.json({
              error: "Une ou plusieurs prestations nécessitent un devis personnalisé et ne peuvent pas être réglées par ce parcours.",
              invalidServices: invalidIds,
            }, { status: 400 });
          }

          const lineItems: Array<{
            id: string;
            label: string;
            amountEur: number;
            interval: "once" | "month" | "year";
            commitmentMonths?: number;
          }> = selectedServices.map((serviceId) => {
            const product = CHECKOUT_PRODUCTS[serviceId as keyof typeof CHECKOUT_PRODUCTS];
            return {
              id: serviceId,
              label: product.label,
              amountEur: product.amountEur,
              interval: product.interval,
              commitmentMonths: "commitmentMonths" in product ? product.commitmentMonths : undefined,
            };
          });

          const hasMinimumCommitment = lineItems.some((item) => Boolean(item.commitmentMonths));
          if (hasMinimumCommitment && body.acceptCommitmentTerms !== true) {
            return Response.json({
              error: "Veuillez accepter la durée minimale d'engagement de la formule Social Media sélectionnée.",
            }, { status: 400 });
          }

          const hasRecurring = lineItems.some((item) => item.interval !== "once");
          const mode = hasRecurring ? "subscription" : "payment";
          const currency = "eur";

          const form = new URLSearchParams();

          form.set("mode", mode);
          form.set("success_url", `${process.env.SITE_URL || new URL(request.url).origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`);
          form.set("cancel_url", `${process.env.SITE_URL || new URL(request.url).origin}/#quote`);
          form.set("billing_address_collection", "required");
          form.set("automatic_tax[enabled]", "true");
          form.set("allow_promotion_codes", "true");
          if (mode === "payment") form.set("invoice_creation[enabled]", "true");
          form.set("locale", "auto");

          if (body.client?.email) {
            form.set("customer_email", body.client.email);
            if (mode === "payment") form.set("payment_intent_data[receipt_email]", body.client.email);
          }
          if (body.client?.name) form.set("metadata[customer_name]", body.client.name);
          if (body.client?.company) form.set("metadata[company]", body.client.company);
          if (body.client?.whatsapp) form.set("metadata[whatsapp]", body.client.whatsapp);
          if (body.client?.website) form.set("metadata[website]", body.client.website);
          form.set("metadata[sector]", body.sectorId || "");
          form.set("metadata[situation]", body.situation || "");
          form.set("metadata[budget]", body.budget || "");
          form.set("metadata[services]", selectedServices.join(","));
          form.set("metadata[currency]", currency);
          form.set("metadata[commitment_terms_accepted]", String(body.acceptCommitmentTerms === true));
          form.set(
            "metadata[minimum_commitments]",
            lineItems
              .filter((item) => Boolean(item.commitmentMonths))
              .map((item) => item.id + ":" + item.commitmentMonths + "m")
              .join(","),
          );
          form.set(
            "metadata[vat_note]",
            "EUR reference prices. VAT treatment is determined on the final quote/invoice according to the seller's tax regime and customer location.",
          );

          if (mode === "subscription") {
            form.set("subscription_data[metadata][services]", selectedServices.join(","));
            form.set(
              "subscription_data[metadata][minimum_commitments]",
              lineItems
                .filter((item) => Boolean(item.commitmentMonths))
                .map((item) => item.id + ":" + item.commitmentMonths + "m")
                .join(","),
            );
            form.set("subscription_data[metadata][commitment_terms_accepted]", String(body.acceptCommitmentTerms === true));
          }

          lineItems.forEach((item, index) => {
            form.set(`line_items[${index}][price_data][currency]`, currency);
            form.set(`line_items[${index}][price_data][unit_amount]`, String(Math.round(item.amountEur * 100)));
            form.set(`line_items[${index}][price_data][tax_behavior]`, stripeTaxBehavior);
            form.set(`line_items[${index}][price_data][product_data][name]`, item.label);
            form.set(`line_items[${index}][price_data][product_data][metadata][sku]`, item.id);
            if (item.interval !== "once") {
              form.set(`line_items[${index}][price_data][recurring][interval]`, item.interval);
            }
            if (item.commitmentMonths) {
              form.set(
                `line_items[${index}][price_data][product_data][description]`,
                "Minimum contractual commitment: " + item.commitmentMonths + " months.",
              );
            }
            form.set(`line_items[${index}][quantity]`, "1");
          });

          const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: form,
          });

          const stripeData = await stripeResponse.json() as { url?: string; error?: { message?: string } };

          if (!stripeResponse.ok || !stripeData.url) {
            return Response.json(
              { error: stripeData.error?.message || "Stripe n'a pas pu créer la session." },
              { status: 502 },
            );
          }

          return Response.json({ url: stripeData.url });
        } catch (error) {
          return Response.json(
            { error: error instanceof Error ? error.message : "Erreur lors de la création du paiement." },
            { status: 500 },
          );
        }
      },
    },
  },
});

[executed on device: MacBook-Air-de-rousseau.local (0e45da18-76cf-43a9-8d87-a4dcd1ea626d)]