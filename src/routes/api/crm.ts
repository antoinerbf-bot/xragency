import { createFileRoute } from "@tanstack/react-router";
import { createHash } from "node:crypto";
import { getSupabaseServer } from "@/lib/saas/supabase";
import {
  COOKIE_NAME,
  loadStore,
  saveStore,
  signSession,
  verifySession,
  verifyPassword,
  hashPassword,
  readCookie,
  buildSnapshot,
  type CrmRole,
  type LeadStatus,
  type LeadPriority,
  type CrmMemberRecord,
  type OutsourceRequest,
  type CrmCallLog,
  type CrmLead,
  type CrmClientRecord,
  type QuoteItem,
  type CrmQuoteRecord,
  type InvoiceItem,
  type CrmInvoiceRecord,
  type ProjectMilestone,
  type CrmProjectRecord,
  type CrmTaskRecord,
  type CrmProviderRecord,
  type CrmNotification,
  type CrmActivity,
  type CrmStore,
} from "@/lib/crm-store";

// Re-export for consuming components
export type {
  CrmRole,
  LeadStatus,
  LeadPriority,
  CrmMemberRecord,
  OutsourceRequest,
  CrmCallLog,
  CrmLead,
  CrmClientRecord,
  QuoteItem,
  CrmQuoteRecord,
  InvoiceItem,
  CrmInvoiceRecord,
  ProjectMilestone,
  CrmProjectRecord,
  CrmTaskRecord,
  CrmProviderRecord,
  CrmNotification,
  CrmActivity,
  CrmStore,
};

export const Route = createFileRoute("/api/crm")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = readCookie(request, COOKIE_NAME);
        const session = verifySession(token);
        const store = await loadStore();

        if (!session) {
          return Response.json({ authenticated: false });
        }
        const user = store.members.find((m) => m.id === session.id && m.active);
        if (!user) {
          return Response.json({ authenticated: false });
        }
        return Response.json(buildSnapshot(store, user));
      },

      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as Record<string, unknown>;
          const action = String(body.action || "");
          const store = await loadStore();
          const now = new Date().toISOString();

          // ── 1. AUTHENTICATION (EMAIL + UNIQUE PASSWORD, RATE-LIMITED) ──
          if (action === "login") {
            const email = String(body.email || "").trim().toLowerCase();
            const password = String(body.password || body.pin || "");
            if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || password.length > 256) {
              return Response.json({ error: "Adresse e-mail et mot de passe requis." }, { status: 400 });
            }
            const identifierHash = createHash("sha256").update(`${email}|${request.headers.get("x-forwarded-for") || "unknown"}`).digest("hex");
            const since = new Date(Date.now() - 15 * 60_000).toISOString();
            const supabaseConfigured = Boolean(process.env.VITE_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
            let attemptsClient: ReturnType<typeof getSupabaseServer> | undefined;
            if (supabaseConfigured) {
              attemptsClient = getSupabaseServer();
              const { count, error: countError } = await attemptsClient.from("xr_crm_login_attempts").select("id", { count: "exact", head: true }).eq("identifier_hash", identifierHash).eq("succeeded", false).gte("attempted_at", since);
              if (countError) throw new Error(`Vérification anti-bruteforce indisponible: ${countError.message}`);
              if ((count || 0) >= 8) return Response.json({ error: "Trop de tentatives. Réessayez dans 15 minutes." }, { status: 429 });
            } else {
              const attempts = (globalThis as typeof globalThis & { __xrLoginAttempts?: Map<string, number[]> }).__xrLoginAttempts ?? new Map<string, number[]>();
              (globalThis as typeof globalThis & { __xrLoginAttempts?: Map<string, number[]> }).__xrLoginAttempts = attempts;
              const recent = (attempts.get(identifierHash) || []).filter((time) => time > Date.now() - 15 * 60_000);
              if (recent.length >= 8) return Response.json({ error: "Trop de tentatives. Réessayez dans 15 minutes." }, { status: 429 });
              attempts.set(identifierHash, recent);
            }

            const user = store.members.find((m) => m.email.toLowerCase() === email && m.active);
            const isValidPassword = Boolean(user && verifyPassword(password, user.passwordHash));
            if (attemptsClient) {
              const { error: attemptError } = await attemptsClient.from("xr_crm_login_attempts").insert({ identifier_hash: identifierHash, succeeded: isValidPassword });
              if (attemptError) throw new Error(`Enregistrement anti-bruteforce impossible: ${attemptError.message}`);
            } else if (!isValidPassword) {
              const attempts = (globalThis as typeof globalThis & { __xrLoginAttempts?: Map<string, number[]> }).__xrLoginAttempts!;
              attempts.set(identifierHash, [...(attempts.get(identifierHash) || []), Date.now()]);
            }
            if (!user || !isValidPassword) return Response.json({ error: "Identifiants incorrects." }, { status: 401 });

            const token = signSession({ id: user.id, role: user.role, exp: Date.now() + 1000 * 60 * 60 * 8 });
            return new Response(JSON.stringify(buildSnapshot(store, user)), {
              status: 200,
              headers: {
                "content-type": "application/json",
                "set-cookie": `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=28800`,
                "cache-control": "no-store",
              },
            });
          }

          if (action === "logout") {
            return new Response(JSON.stringify({ authenticated: false }), {
              status: 200,
              headers: {
                "content-type": "application/json",
                "set-cookie": `${COOKIE_NAME}=; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=0`,
              },
            });
          }

          // ── SESSION GATE FOR ALL PROTECTED ACTIONS ──
          const token = readCookie(request, COOKIE_NAME);
          const session = verifySession(token);
          if (!session) {
            return Response.json({ error: "Session expirée. Veuillez vous reconnecter." }, { status: 401 });
          }
          const user = store.members.find((m) => m.id === session.id && m.active);
          if (!user) {
            return Response.json({ error: "Compte introuvable ou désactivé." }, { status: 401 });
          }

          if (action === "reset_member_password") {
            if (user.role !== "admin") return Response.json({ error: "Action réservée à la Direction." }, { status: 403 });
            const memberId = String(body.memberId || "");
            const newPassword = String(body.newPassword || "");
            if (newPassword.length < 12 || newPassword.length > 256) return Response.json({ error: "Le nouveau mot de passe doit contenir entre 12 et 256 caractères." }, { status: 400 });
            const member = store.members.find((m) => m.id === memberId);
            if (!member) return Response.json({ error: "Membre introuvable." }, { status: 404 });
            member.passwordHash = hashPassword(newPassword);
            await saveStore(store);
            return Response.json({ ok: true, message: "Mot de passe réinitialisé." });
          }

          // ── 2. PROSPECTS / LEADS (SAISIE FLEXIBLE : SCREENSHOT, TÉLÉPHONE OU FICHE) ──
          if (action === "send_lead") {
            const rawCompany = String(body.company || "").trim();
            const phone = String(body.phone || "").trim();
            const screenshotUrl = typeof body.screenshotUrl === "string" ? body.screenshotUrl.trim() : undefined;
            const contactName = String(body.contactName || "").trim();
            const assignedTo = String(body.assignedTo || user.id).trim();

            if (!rawCompany && !phone && !screenshotUrl) {
              return Response.json({ error: "Indiquez au moins un nom, un numéro ou un screenshot." }, { status: 400 });
            }

            const company =
              rawCompany ||
              (phone ? `Prospect Direct · ${phone}` : "Lead Screenshot / Photo Terrain");

            const targetMember = store.members.find((m) => m.id === assignedTo) || user;
            const lead: CrmLead = {
              id: `lead-${Date.now().toString(36)}`,
              company,
              contactName: contactName || "Contact Direct",
              phone: phone || "Voir capture / fiche",
              email: String(body.email || "").trim(),
              website: typeof body.website === "string" ? body.website.trim() : undefined,
              city: String(body.city || "France").trim(),
              sector: String(body.sector || "Commerce / Restauration").trim(),
              serviceTarget: String(body.serviceTarget || "Site Vitrine Pro (499 €) + Google Maps").trim(),
              budgetEur: Math.max(0, Number(body.budgetEur) || 799),
              status: (typeof body.status === "string" ? body.status : "to_call") as LeadStatus,
              priority: (body.priority === "urgent" || body.priority === "high" ? body.priority : "high") as LeadPriority,
              assignedTo: targetMember.id,
              sentBy: user.fullName,
              source: String(body.source || (screenshotUrl ? "Capture Screenshot Direction" : "Envoi Direction")).trim(),
              notes: String(body.notes || "").trim(),
              nextFollowUp: String(body.nextFollowUp || "Aujourd'hui").trim(),
              callsCount: 0,
              screenshotUrl,
              maquetteStatus: "none",
              createdAt: now,
              updatedAt: now,
            };
            store.leads.unshift(lead);
            if (targetMember.id !== user.id) {
              store.notifications.unshift({
                id: `notif-${Date.now().toString(36)}`,
                targetMemberId: targetMember.id,
                type: "new_lead",
                title: "🎯 Nouveau Lead attribué par la Direction !",
                message: `${lead.company} (${lead.serviceTarget})${screenshotUrl ? " avec capture jointe" : ""}.`,
                read: false,
                createdAt: now,
              });
            }
            store.activities.unshift({
              id: `act-${Date.now().toString(36)}`,
              leadId: lead.id,
              memberId: user.id,
              memberName: user.fullName,
              type: "assigned",
              message:
                targetMember.id === user.id
                  ? `Lead personnel ajouté par ${user.fullName} : ${lead.company}.`
                  : `Nouveau lead envoyé à ${targetMember.fullName} : ${lead.company} (${lead.budgetEur.toLocaleString("fr-FR")} €).`,
              createdAt: now,
            });
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          // ── 2B. FLUX MAQUETTES : DEMANDE PAR VENDEUR -> VALIDATION PAR LIEN DIRECTION ──
          if (action === "request_maquette") {
            const leadId = String(body.leadId || "");
            const lead = store.leads.find((l) => l.id === leadId);
            if (!lead) return Response.json({ error: "Lead introuvable." }, { status: 404 });
            lead.maquetteStatus = "pending";
            lead.maquetteBrief = String(body.brief || `Maquette demandée pour ${lead.company} (${lead.serviceTarget})`).trim();
            lead.maquetteRequestedAt = now;
            lead.updatedAt = now;

            store.notifications.unshift({
              id: `notif-${Date.now().toString(36)}`,
              targetMemberId: "mem-admin",
              type: "project_update",
              title: "🎨 Nouvelle demande de maquette",
              message: `${user.fullName} demande une maquette pour ${lead.company} (${lead.serviceTarget}).`,
              read: false,
              createdAt: now,
            });
            store.activities.unshift({
              id: `act-${Date.now().toString(36)}`,
              leadId: lead.id,
              memberId: user.id,
              memberName: user.fullName,
              type: "status",
              message: `Maquette demandée au QG Direction pour ${lead.company}.`,
              createdAt: now,
            });
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "validate_maquette") {
            if (user.role !== "admin") {
              return Response.json({ error: "Validation réservée à la Direction." }, { status: 403 });
            }
            const leadId = String(body.leadId || "");
            const maquetteUrl = String(body.maquetteUrl || "").trim();
            const lead = store.leads.find((l) => l.id === leadId);
            if (!lead || !maquetteUrl) {
              return Response.json({ error: "Lead et lien de maquette requis." }, { status: 400 });
            }
            lead.maquetteStatus = "validated";
            lead.maquetteUrl = maquetteUrl;
            lead.maquetteValidatedAt = now;
            lead.updatedAt = now;

            store.notifications.unshift({
              id: `notif-${Date.now().toString(36)}`,
              targetMemberId: lead.assignedTo,
              type: "project_update",
              title: "✅ Maquette validée par la Direction !",
              message: `La maquette de ${lead.company} est prête : ${maquetteUrl}`,
              read: false,
              createdAt: now,
            });
            store.activities.unshift({
              id: `act-${Date.now().toString(36)}`,
              leadId: lead.id,
              memberId: user.id,
              memberName: user.fullName,
              type: "status",
              message: `Maquette livrée & validée pour ${lead.company} (${maquetteUrl}).`,
              createdAt: now,
            });
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "update_lead") {
            const leadId = String(body.leadId || "");
            const lead = store.leads.find((l) => l.id === leadId);
            if (!lead) return Response.json({ error: "Lead introuvable." }, { status: 404 });
            if (user.role !== "admin" && lead.assignedTo !== user.id) {
              return Response.json({ error: "Accès non autorisé sur ce dossier." }, { status: 403 });
            }
            const prevStatus = lead.status;
            if (typeof body.status === "string") {
              lead.status = body.status as LeadStatus;
            }
            if (typeof body.notes === "string") lead.notes = body.notes;
            if (typeof body.nextFollowUp === "string") lead.nextFollowUp = body.nextFollowUp;
            if (typeof body.lossReason === "string") lead.lossReason = body.lossReason;
            if (body.budgetEur !== undefined) lead.budgetEur = Math.max(0, Number(body.budgetEur) || lead.budgetEur);
            if (user.role === "admin" && typeof body.assignedTo === "string" && store.members.some((m) => m.id === body.assignedTo)) {
              lead.assignedTo = body.assignedTo;
            }
            lead.updatedAt = now;
            if (prevStatus !== lead.status) {
              store.activities.unshift({
                id: `act-${Date.now().toString(36)}`,
                leadId: lead.id,
                memberId: user.id,
                memberName: user.fullName,
                type: "status",
                message: `Statut mis à jour sur ${lead.company} : ${prevStatus} → ${lead.status}.`,
                createdAt: now,
              });

              // ── AUTOMATISATION : CRÉATION CLIENT + FACTURE OFFICIELLE coordonnées bancaires de l’entité contractante À LA SIGNATURE ──
              if (lead.status === "signed") {
                // 1. Client actif
                let client = store.clients.find(
                  (c) => c.leadId === lead.id || c.company.toLowerCase() === lead.company.toLowerCase()
                );
                if (!client) {
                  const clientId = `cli-${Date.now().toString(36)}`;
                  lead.convertedClientId = clientId;
                  client = {
                    id: clientId,
                    leadId: lead.id,
                    company: lead.company,
                    contactName: lead.contactName,
                    email: lead.email || `contact@${lead.company.toLowerCase().replace(/[^a-z0-9]/g, "") || "client"}.fr`,
                    phone: lead.phone,
                    website: lead.website,
                    city: lead.city,
                    country: lead.country || "France",
                    sector: lead.sector || "Commerce",
                    servicesPurchased: [lead.serviceTarget],
                    totalRevenueEur: lead.budgetEur,
                    status: "active",
                    assignedTo: lead.assignedTo,
                    internalNotes: `Client créé automatiquement suite à la signature du lead ${lead.company}.`,
                    createdAt: now,
                    updatedAt: now,
                  };
                  store.clients.unshift(client);
                }

                // 2. Facture officielle avec coordonnées bancaires de l’entité contractante (Statut: pending_transfer pour validation Direction)
                const existingInvoice = store.invoices.find(
                  (i) => i.clientCompany.toLowerCase() === lead.company.toLowerCase() && i.status !== "cancelled"
                );
                if (!existingInvoice) {
                  const invId = `inv-${Date.now().toString(36)}`;
                  const refNum = `XR-INV-2026-${String(store.invoices.length + 1).padStart(4, "0")}`;
                  const autoInvoice: CrmInvoiceRecord = {
                    id: invId,
                    clientId: client.id,
                    clientName: client.contactName,
                    clientCompany: lead.company,
                    clientEmail: client.email,
                    paymentReference: refNum,
                    items: [{ label: lead.serviceTarget || "Prestation XR Agency", detail: "À confirmer dans le devis signé", amountEur: lead.budgetEur }],
                    totalEur: lead.budgetEur,
                    taxRatePct: 0,
                    taxNotice: "Régime de TVA à confirmer avant émission définitive.",
                    paymentMethod: "bank_transfer",
                    bankDetails: { beneficiary: "XR Agency", bankName: "À confirmer par la Direction", ibanMasked: "Non configuré", bic: "Non configuré", instructions: "Ne pas effectuer de virement avant réception des coordonnées bancaires officielles." },
                    status: "pending_transfer",
                    dueDate: new Date(Date.now() + 7 * 86_400_000).toISOString(),
                    createdAt: now,
                    updatedAt: now,
                  };
                  store.invoices.unshift(autoInvoice);
                }

                // 3. Notification d'alerte pour le QG Direction
                store.notifications.unshift({
                  id: `notif-${Date.now().toString(36)}`,
                  targetMemberId: "all",
                  type: "quote_accepted",
                  title: "🎉 Contrat signé — proforma créée",
                  message: `${user.fullName} a signé le dossier ${lead.company} (${lead.budgetEur} €). Vérifier le devis et les coordonnées bancaires avant émission définitive.`,
                  link: "/crm?tab=invoices",
                  read: false,
                  createdAt: now,
                });
              }
            }
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "delete_lead") {
            if (user.role !== "admin") {
              return Response.json({ error: "Action réservée à la Direction." }, { status: 403 });
            }
            const leadId = String(body.leadId || "");
            store.leads = store.leads.filter((l) => l.id !== leadId);
            store.activities = store.activities.filter((a) => a.leadId !== leadId);
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          // ── 3. APPELS ET COMMUNICATIONS ──
          if (action === "log_call") {
            const leadId = String(body.leadId || "");
            const outcome = String(body.outcome || "Appel passé").trim();
            const durationMinutes = Math.max(1, Number(body.durationMinutes) || 5);
            const nextAction = String(body.nextAction || "").trim();
            const followUpDate = String(body.followUpDate || "").trim();
            const lead = store.leads.find((l) => l.id === leadId);
            if (!lead) return Response.json({ error: "Lead introuvable." }, { status: 404 });
            if (user.role !== "admin" && lead.assignedTo !== user.id) {
              return Response.json({ error: "Accès non autorisé." }, { status: 403 });
            }
            lead.callsCount += 1;
            if (lead.status === "new" || lead.status === "to_call") {
              lead.status = "in_progress";
            }
            if (followUpDate) lead.nextFollowUp = followUpDate;
            lead.updatedAt = now;

            const callLog: CrmCallLog = {
              id: `call-${Date.now().toString(36)}`,
              leadId: lead.id,
              memberId: user.id,
              memberName: user.fullName,
              durationMinutes,
              summary: String(body.summary || outcome).trim(),
              outcome,
              nextAction,
              followUpDate,
              createdAt: now,
            };
            if (!lead.callLogs) lead.callLogs = [];
            lead.callLogs.unshift(callLog);

            store.activities.unshift({
              id: `act-${Date.now().toString(36)}`,
              leadId: lead.id,
              memberId: user.id,
              memberName: user.fullName,
              type: "call",
              message: `Appel #${lead.callsCount} (${lead.company}) : ${outcome} (${durationMinutes} min).`,
              createdAt: now,
            });
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          // ── 4. CONVERSION LEAD -> CLIENT ──
          if (action === "convert_lead_to_client") {
            const leadId = String(body.leadId || "");
            const lead = store.leads.find((l) => l.id === leadId);
            if (!lead) return Response.json({ error: "Lead introuvable." }, { status: 404 });

            lead.status = "signed";
            lead.updatedAt = now;

            const clientId = `cli-${Date.now().toString(36)}`;
            lead.convertedClientId = clientId;

            const newClient: CrmClientRecord = {
              id: clientId,
              leadId: lead.id,
              company: lead.company,
              contactName: lead.contactName,
              email: lead.email,
              phone: lead.phone,
              website: lead.website,
              city: lead.city,
              country: lead.country || "France",
              sector: lead.sector,
              servicesPurchased: [lead.serviceTarget],
              totalRevenueEur: lead.budgetEur,
              status: "active",
              assignedTo: lead.assignedTo,
              internalNotes: `Converti depuis le prospect ${lead.company}. Notes initiales : ${lead.notes}`,
              createdAt: now,
              updatedAt: now,
            };

            store.clients.unshift(newClient);

            // Facture officielle avec coordonnées bancaires de l’entité contractante (Statut: pending_transfer pour validation Direction)
            const existingInv = store.invoices.find(
              (i) => i.clientCompany.toLowerCase() === lead.company.toLowerCase() && i.status !== "cancelled"
            );
            if (!existingInv) {
              const invId = `inv-${Date.now().toString(36)}`;
              const refNum = `XR-INV-2026-${String(store.invoices.length + 1).padStart(4, "0")}`;
              store.invoices.unshift({
                id: invId,
                clientId: newClient.id,
                clientName: newClient.contactName,
                clientCompany: lead.company,
                clientEmail: newClient.email || "",
                paymentReference: refNum,
                items: [{ label: lead.serviceTarget || "Prestation XR Agency", detail: "À confirmer dans le devis signé", amountEur: lead.budgetEur }],
                totalEur: lead.budgetEur,
                taxRatePct: 0,
                taxNotice: "Régime de TVA à confirmer avant émission définitive.",
                paymentMethod: "bank_transfer",
                bankDetails: { beneficiary: "XR Agency", bankName: "À confirmer par la Direction", ibanMasked: "Non configuré", bic: "Non configuré", instructions: "Ne pas effectuer de virement avant réception des coordonnées bancaires officielles." },
                status: "pending_transfer",
                dueDate: new Date(Date.now() + 7 * 86_400_000).toISOString(),
                createdAt: now,
                updatedAt: now,
              });
            }

            store.activities.unshift({
              id: `act-${Date.now().toString(36)}`,
              leadId: lead.id,
              clientId: newClient.id,
              memberId: user.id,
              memberName: user.fullName,
              type: "client_created",
              message: `Lead converti en client actif : ${newClient.company} (${newClient.totalRevenueEur.toLocaleString("fr-FR")} €). Facture en attente de virement émise.`,
              createdAt: now,
            });

            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          // ── 5. CLIENTS CRUD ──
          if (action === "create_client") {
            const company = String(body.company || "").trim();
            const contactName = String(body.contactName || "").trim();
            const email = String(body.email || "").trim();
            if (!company || !email) {
              return Response.json({ error: "Entreprise et e-mail requis." }, { status: 400 });
            }
            const newClient: CrmClientRecord = {
              id: `cli-${Date.now().toString(36)}`,
              company,
              contactName: contactName || "Direction",
              email,
              phone: String(body.phone || "").trim(),
              website: typeof body.website === "string" ? body.website.trim() : undefined,
              city: String(body.city || "France").trim(),
              country: String(body.country || "France").trim(),
              sector: String(body.sector || "Entreprise").trim(),
              servicesPurchased: Array.isArray(body.servicesPurchased) ? (body.servicesPurchased as string[]) : ["Sur devis"],
              totalRevenueEur: Math.max(0, Number(body.totalRevenueEur) || 0),
              status: "active",
              assignedTo: user.id,
              internalNotes: String(body.internalNotes || "").trim(),
              createdAt: now,
              updatedAt: now,
            };
            store.clients.unshift(newClient);
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "update_client") {
            const clientId = String(body.clientId || "");
            const client = store.clients.find((c) => c.id === clientId);
            if (!client) return Response.json({ error: "Client introuvable." }, { status: 404 });
            if (typeof body.company === "string") client.company = body.company.trim();
            if (typeof body.contactName === "string") client.contactName = body.contactName.trim();
            if (typeof body.email === "string") client.email = body.email.trim();
            if (typeof body.phone === "string") client.phone = body.phone.trim();
            if (typeof body.website === "string") client.website = body.website.trim();
            if (typeof body.internalNotes === "string") client.internalNotes = body.internalNotes;
            if (typeof body.status === "string" && ["active", "vip", "archived"].includes(body.status)) {
              client.status = body.status as "active" | "vip" | "archived";
            }
            client.updatedAt = now;
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          // ── 6. DEVIS & FACTURATION ──
          if (action === "create_quote") {
            const clientCompany = String(body.clientCompany || "").trim();
            const clientEmail = String(body.clientEmail || "").trim();
            const items = Array.isArray(body.items) ? (body.items as QuoteItem[]) : [];
            if (!clientCompany || !clientEmail || !items.length) {
              return Response.json({ error: "Client, e-mail et prestations requis." }, { status: 400 });
            }
            const totalOnceEur = items.filter((i) => i.period === "once").reduce((s, i) => s + i.priceEur * (i.quantity || 1), 0);
            const totalMonthlyEur = items.filter((i) => i.period === "month").reduce((s, i) => s + i.priceEur * (i.quantity || 1), 0);
            const totalAnnualEur = items.filter((i) => i.period === "year").reduce((s, i) => s + i.priceEur * (i.quantity || 1), 0);

            const quoteId = `DEV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
            const newQuote: CrmQuoteRecord = {
              id: quoteId,
              clientId: typeof body.clientId === "string" ? body.clientId : undefined,
              leadId: typeof body.leadId === "string" ? body.leadId : undefined,
              clientName: String(body.clientName || clientCompany).trim(),
              clientCompany,
              clientEmail,
              items,
              totalOnceEur,
              totalMonthlyEur,
              totalAnnualEur,
              status: "sent",
              validUntil: String(body.validUntil || new Date(Date.now() + 15 * 86_400_000).toISOString()),
              paymentTerms: String(body.paymentTerms || "Conditions de règlement à confirmer sur le devis final.").trim(),
              notes: typeof body.notes === "string" ? body.notes : undefined,
              createdAt: now,
              updatedAt: now,
            };
            store.quotes.unshift(newQuote);

            // Création automatique de la Facture / Proforma officielle avec coordonnées bancaires de l’entité contractante intégré
            const invoiceId = `VIR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
            const paymentReference = `XR-${quoteId.slice(-4)}-${Date.now().toString(36).toUpperCase().slice(-4)}`;
            const totalToPay = totalOnceEur + totalAnnualEur + totalMonthlyEur;

            const autoInvoice: CrmInvoiceRecord = {
              id: invoiceId,
              quoteId,
              clientName: newQuote.clientName,
              clientCompany: newQuote.clientCompany,
              clientEmail: newQuote.clientEmail,
              items: items.map((i) => ({
                label: i.label,
                detail: i.detail || "Prestation officielle XR Agency",
                amountEur: i.priceEur * (i.quantity || 1),
              })),
              totalEur: totalToPay,
              taxRatePct: 0,
              taxNotice: "Régime de TVA à confirmer avant émission définitive.",
              paymentMethod: "bank_transfer",
              paymentReference,
              bankDetails: {
                beneficiary: "Entité contractante à confirmer",
                bankName: "À confirmer par la Direction",
                ibanMasked: "Non configuré",
                bic: "Non configuré",
                instructions: `Coordonnées bancaires à confirmer par la Direction avant tout virement. Référence : ${paymentReference}.`,
              },
              status: "pending_transfer",
              dueDate: new Date(Date.now() + 7 * 86_400_000).toISOString(),
              createdAt: now,
              updatedAt: now,
            };
            store.invoices.unshift(autoInvoice);

            if (typeof body.leadId === "string") {
              const linkedLead = store.leads.find((l) => l.id === body.leadId);
              if (linkedLead && linkedLead.status !== "signed") {
                linkedLead.status = "proposal_sent";
                linkedLead.updatedAt = now;
              }
            }

            store.notifications.unshift({
              id: `notif-${Date.now().toString(36)}`,
              targetMemberId: "mem-admin",
              type: "quote_accepted",
              title: "📄 Nouveau devis et proforma générés",
              message: `${user.fullName} a généré le devis ${newQuote.id} (${totalToPay.toLocaleString("fr-FR")} €) pour ${newQuote.clientCompany}.`,
              read: false,
              createdAt: now,
            });

            store.activities.unshift({
              id: `act-${Date.now().toString(36)}`,
              memberId: user.id,
              memberName: user.fullName,
              type: "quote_sent",
              message: `Devis officiel ${newQuote.id} émis pour ${newQuote.clientCompany} (${(totalOnceEur + totalMonthlyEur).toLocaleString("fr-FR")} €).`,
              createdAt: now,
            });

            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "update_quote_status") {
            const quoteId = String(body.quoteId || "");
            const quote = store.quotes.find((q) => q.id === quoteId);
            if (!quote) return Response.json({ error: "Devis introuvable." }, { status: 404 });
            const newStatus = String(body.status || "");
            if (["draft", "sent", "accepted", "rejected", "expired"].includes(newStatus)) {
              quote.status = newStatus as CrmQuoteRecord["status"];
              quote.updatedAt = now;
              await saveStore(store);
            }
            return Response.json(buildSnapshot(store, user));
          }

          // ── VALIDATION MANUELLE DE PAIEMENT PAR VIREMENT (ADMIN) ──
          if (action === "validate_payment") {
            if (user.role !== "admin") {
              return Response.json({ error: "Validation des fonds réservée à la Direction." }, { status: 403 });
            }
            const invoiceId = String(body.invoiceId || "");
            const invoice = store.invoices.find((i) => i.id === invoiceId);
            if (!invoice) return Response.json({ error: "Facture introuvable." }, { status: 404 });

            invoice.status = "paid";
            invoice.paidAt = now;
            invoice.validatedBy = user.id;
            invoice.updatedAt = now;

            store.activities.unshift({
              id: `act-${Date.now().toString(36)}`,
              memberId: user.id,
              memberName: user.fullName,
              type: "payment_confirmed",
              message: `Paiement de ${invoice.totalEur.toLocaleString("fr-FR")} € validé par la Direction pour ${invoice.clientCompany} (Réf: ${invoice.paymentReference}).`,
              createdAt: now,
            });

            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          // ── 7. PROJETS ──
          if (action === "create_project") {
            const projectName = String(body.projectName || "").trim();
            const clientName = String(body.clientName || "").trim();
            if (!projectName || !clientName) {
              return Response.json({ error: "Nom du projet et client requis." }, { status: 400 });
            }
            const newProject: CrmProjectRecord = {
              id: `PRJ-${Date.now().toString(36).toUpperCase()}`,
              clientId: String(body.clientId || `cli-temp`),
              clientName,
              projectName,
              serviceCategory: String(body.serviceCategory || "Web & SEO").trim(),
              managerId: user.id,
              collaboratorIds: [user.id],
              stage: "production",
              progressPct: 10,
              budgetEur: Math.max(0, Number(body.budgetEur) || 1499),
              startDate: now,
              deliveryDeadline: String(body.deliveryDeadline || "Sous 7 jours ouvrés").trim(),
              liveUrl: typeof body.liveUrl === "string" ? body.liveUrl.trim() : undefined,
              stagingUrl: typeof body.stagingUrl === "string" ? body.stagingUrl.trim() : undefined,
              milestones: [
                { id: "m1", title: "Cadrage & Direction Artistique", done: true },
                { id: "m2", title: "Développement TanStack Start / Next-Gen", done: false },
                { id: "m3", title: "Optimisation SEO & Recette Mobile", done: false },
                { id: "m4", title: "Mise en ligne & Indexation", done: false },
              ],
              notes: String(body.notes || "").trim(),
              createdAt: now,
              updatedAt: now,
            };
            store.projects.unshift(newProject);
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "update_project") {
            const projectId = String(body.projectId || "");
            const project = store.projects.find((p) => p.id === projectId);
            if (!project) return Response.json({ error: "Projet introuvable." }, { status: 404 });
            if (typeof body.stage === "string" && ["prep", "waiting", "production", "review", "delivered", "suspended"].includes(body.stage)) {
              project.stage = body.stage as CrmProjectRecord["stage"];
            }
            if (body.progressPct !== undefined) {
              project.progressPct = Math.min(100, Math.max(0, Number(body.progressPct) || 0));
            }
            if (typeof body.notes === "string") project.notes = body.notes;
            if (typeof body.liveUrl === "string") project.liveUrl = body.liveUrl;
            if (Array.isArray(body.milestones)) project.milestones = body.milestones as ProjectMilestone[];
            project.updatedAt = now;
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          // ── 8. TÂCHES PERSISTÉES ──
          if (action === "create_task") {
            const title = String(body.title || "").trim();
            if (!title) return Response.json({ error: "Titre de tâche requis." }, { status: 400 });
            const newTask: CrmTaskRecord = {
              id: `task-${Date.now().toString(36)}`,
              title,
              description: String(body.description || "").trim(),
              assignedTo: typeof body.assignedTo === "string" ? body.assignedTo : user.id,
              priority: (body.priority === "urgent" || body.priority === "high" ? body.priority : "normal") as LeadPriority,
              status: "todo",
              category: body.category === "perso" ? "perso" : "pro",
              tag: String(body.tag || "Agence").trim(),
              linkedEntityType: typeof body.linkedEntityType === "string" ? (body.linkedEntityType as CrmTaskRecord["linkedEntityType"]) : undefined,
              linkedEntityId: typeof body.linkedEntityId === "string" ? body.linkedEntityId : undefined,
              dueDate: String(body.dueDate || "Aujourd'hui").trim(),
              createdAt: now,
            };
            store.tasks.unshift(newTask);
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "toggle_task") {
            const taskId = String(body.taskId || "");
            const task = store.tasks.find((t) => t.id === taskId);
            if (!task) return Response.json({ error: "Tâche introuvable." }, { status: 404 });
            task.status = task.status === "done" ? "todo" : "done";
            if (task.status === "done") task.doneAt = now;
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "delete_task") {
            const taskId = String(body.taskId || "");
            store.tasks = store.tasks.filter((t) => t.id !== taskId);
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          // ── 9. SOUS-TRAITANCE & PRESTATAIRES ──
          if (action === "request_outsource") {
            const leadId = String(body.leadId || "");
            const lead = store.leads.find((l) => l.id === leadId);
            if (!lead) return Response.json({ error: "Lead introuvable." }, { status: 404 });
            lead.status = "outsourced";
            lead.outsourceRequest = {
              scope: String(body.scope || lead.serviceTarget).trim(),
              budgetAllocated: Math.max(0, Number(body.budgetAllocated) || Math.round(lead.budgetEur * 0.45)),
              deadline: String(body.deadline || "Sous 7 jours").trim(),
              brief: String(body.brief || lead.notes || "Prise en charge complète studio XR.").trim(),
              requestedAt: now,
              requestedBy: user.fullName,
            };
            lead.updatedAt = now;
            store.activities.unshift({
              id: `act-${Date.now().toString(36)}`,
              leadId: lead.id,
              memberId: user.id,
              memberName: user.fullName,
              type: "outsource",
              message: `Sous-traitance studio XR validée sur ${lead.company} (${lead.outsourceRequest.scope}).`,
              createdAt: now,
            });
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "create_provider") {
            if (user.role !== "admin") {
              return Response.json({ error: "Action réservée à la Direction." }, { status: 403 });
            }
            const name = String(body.name || "").trim();
            const email = String(body.email || "").trim();
            if (!name || !email) {
              return Response.json({ error: "Nom et e-mail requis." }, { status: 400 });
            }
            const newProvider: CrmProviderRecord = {
              id: `prov-${Date.now().toString(36)}`,
              name,
              company: typeof body.company === "string" ? body.company.trim() : undefined,
              email,
              phone: String(body.phone || "").trim(),
              specialties: Array.isArray(body.specialties) ? (body.specialties as string[]) : ["Développement Web"],
              hourlyRateEur: Math.max(0, Number(body.hourlyRateEur) || 60),
              availability: "available",
              missionsCount: 0,
              totalPaidEur: 0,
              notes: String(body.notes || "").trim(),
              createdAt: now,
            };
            store.providers.unshift(newProvider);
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          // ── 10. NOTIFICATIONS ──
          if (action === "mark_notifications_read") {
            store.notifications.forEach((n) => {
              if (n.targetMemberId === "all" || n.targetMemberId === user.id) {
                n.read = true;
              }
            });
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          // ── 11. GESTION DES MEMBRES ──
          if (action === "create_member") {
            if (user.role !== "admin") {
              return Response.json({ error: "Action réservée à la Direction." }, { status: 403 });
            }
            const email = String(body.email || "").trim().toLowerCase();
            const fullName = String(body.fullName || "").trim();
            const password = String(body.password || "");
            if (!email || !fullName || password.length < 12) {
              return Response.json({ error: "Nom, e-mail et mot de passe de 12 caractères minimum requis." }, { status: 400 });
            }
            if (store.members.some((m) => m.email.toLowerCase() === email)) {
              return Response.json({ error: "Un compte existe déjà avec cet e-mail." }, { status: 409 });
            }
            const member: CrmMemberRecord = {
              id: `mem-${Date.now().toString(36)}`,
              email,
              fullName,
              title: String(body.title || "Closer · Partenaire XR").trim(),
              role: "member",
              phoneLine: String(body.phoneLine || "+33 1 86 95 41 99").trim(),
              commissionPct: Math.min(50, Math.max(0, Number(body.commissionPct) || 15)),
              passwordHash: hashPassword(password),
              active: true,
              createdAt: now,
            };
            store.members.push(member);
            await saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          return Response.json({ error: "Action inconnue." }, { status: 400 });
        } catch (error) {
          return Response.json(
            { error: error instanceof Error ? error.message : "Erreur serveur CRM." },
            { status: 500 },
          );
        }
      },
    },
  },
});

[executed on device: MacBook-Air-de-rousseau.local (0e45da18-76cf-43a9-8d87-a4dcd1ea626d)]