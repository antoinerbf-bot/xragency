import { createFileRoute } from "@tanstack/react-router";
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
  buildClientPortalSnapshot,
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
  type ClientMessageRecord,
  type ClientDocumentRecord,
  type ClientSupportTicket,
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
  ClientMessageRecord,
  ClientDocumentRecord,
  ClientSupportTicket,
  CrmStore,
};

// ── Login rate-limiter (per IP + email, 5 failures / 15 min) ──
const LOGIN_ATTEMPTS = new Map<string, { count: number; resetAt: number }>();
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60_000;

function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for") || "";
  return (fwd.split(",")[0] || request.headers.get("x-real-ip") || "local").trim();
}

function checkLoginRateLimit(key: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const entry = LOGIN_ATTEMPTS.get(key);
  if (!entry || now > entry.resetAt) {
    return { allowed: true, retryAfterSec: 0 };
  }
  if (entry.count >= LOGIN_MAX_ATTEMPTS) {
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) };
  }
  return { allowed: true, retryAfterSec: 0 };
}

function recordLoginFailure(key: string) {
  const now = Date.now();
  const entry = LOGIN_ATTEMPTS.get(key);
  if (!entry || now > entry.resetAt) {
    LOGIN_ATTEMPTS.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

function clearLoginFailures(key: string) {
  LOGIN_ATTEMPTS.delete(key);
}

function buildSessionCookie(request: Request, token: string, maxAgeSec: number): string {
  const isHttps =
    request.headers.get("x-forwarded-proto") === "https" ||
    request.url.startsWith("https://");
  const secureFlag = isHttps ? "; Secure" : "";
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAgeSec}${secureFlag}`;
}

export const Route = createFileRoute("/api/crm")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = readCookie(request, COOKIE_NAME);
        const session = verifySession(token);
        const store = loadStore();

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
          const store = loadStore();
          const now = new Date().toISOString();

          // ── 1. AUTHENTICATION (STRICT EMAIL + SALTED PASSWORD VERIFICATION + RATE LIMIT) ──
          if (action === "login") {
            const email = String(body.email || "")
              .trim()
              .toLowerCase();
            const password = String(body.password || body.pin || "");

            if (!email || !password) {
              return Response.json(
                { error: "Adresse e-mail et mot de passe requis." },
                { status: 400 },
              );
            }

            const rateKey = `${getClientIp(request)}:${email}`;
            const rate = checkLoginRateLimit(rateKey);
            if (!rate.allowed) {
              return new Response(
                JSON.stringify({
                  error:
                    "Trop de tentatives de connexion. Veuillez patienter avant de réessayer.",
                  retryAfterSec: rate.retryAfterSec,
                }),
                {
                  status: 429,
                  headers: {
                    "content-type": "application/json",
                    "retry-after": String(rate.retryAfterSec),
                  },
                },
              );
            }

            const user = store.members.find(
              (m) =>
                (m.email.toLowerCase() === email ||
                  (m.id === "mem-martin" &&
                    (email === "martin.leclipteur@gmail.com" || email === "martin@xragency.fr"))) &&
                m.active,
            );
            const isValidPassword = Boolean(user && verifyPassword(password, user.passwordHash));

            if (!user || !isValidPassword) {
              recordLoginFailure(rateKey);
              return Response.json(
                { error: "Identifiants incorrects. Vérifiez votre e-mail et votre mot de passe." },
                { status: 401 },
              );
            }

            clearLoginFailures(rateKey);
            // Transparently upgrade legacy hashes to per-user salted hashes on successful login
            if (!user.passwordHash.includes(":")) {
              user.passwordHash = hashPassword(password);
              saveStore(store);
            }

            const token = signSession({
              id: user.id,
              role: user.role,
              exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
            });
            return new Response(JSON.stringify(buildSnapshot(store, user)), {
              status: 200,
              headers: {
                "content-type": "application/json",
                "set-cookie": buildSessionCookie(request, token, 604800),
              },
            });
          }

          if (action === "logout") {
            return new Response(JSON.stringify({ authenticated: false }), {
              status: 200,
              headers: {
                "content-type": "application/json",
                "set-cookie": buildSessionCookie(request, "", 0),
              },
            });
          }

          // ── SESSION GATE FOR ALL PROTECTED ACTIONS ──
          const token = readCookie(request, COOKIE_NAME);
          const session = verifySession(token);
          if (!session) {
            return Response.json(
              { error: "Session expirée. Veuillez vous reconnecter." },
              { status: 401 },
            );
          }
          const user = store.members.find((m) => m.id === session.id && m.active);
          if (!user) {
            return Response.json({ error: "Compte introuvable ou désactivé." }, { status: 401 });
          }

          // Optimistic concurrency check if caller passes expectedVersion
          if (
            typeof body.expectedVersion === "number" &&
            typeof store.version === "number" &&
            body.expectedVersion !== store.version
          ) {
            return Response.json(
              {
                error:
                  "Les données ont été modifiées entre-temps. Rechargez pour éviter tout écrasement.",
                currentVersion: store.version,
              },
              { status: 409 },
            );
          }

          // ── 1B. ESPACE CLIENT UNIFIÉ (ISOLÉ PAR CLIENT) ──
          if (action === "client_snapshot") {
            const targetClientId =
              user.role === "client"
                ? user.clientId || ""
                : user.role === "admin"
                  ? String(body.clientId || store.clients[0]?.id || "")
                  : "";
            if (!targetClientId) {
              return Response.json({ error: "Aucun dossier client associé." }, { status: 403 });
            }
            return Response.json({
              authenticated: true,
              storeVersion: store.version || 1,
              user: buildSnapshot(store, user).user,
              availableClients:
                user.role === "admin"
                  ? store.clients.map((c) => ({ id: c.id, company: c.company, email: c.email }))
                  : undefined,
              clientPortal: buildClientPortalSnapshot(store, targetClientId),
            });
          }

          if (action === "client_send_message") {
            const messageText = String(body.body || "").trim();
            if (!messageText || messageText.length > 2000) {
              return Response.json(
                { error: "Message requis (2000 caractères max)." },
                { status: 400 },
              );
            }
            const targetClientId =
              user.role === "client"
                ? user.clientId || ""
                : user.role === "admin"
                  ? String(body.clientId || "")
                  : "";
            if (!targetClientId || !store.clients.some((c) => c.id === targetClientId)) {
              return Response.json({ error: "Dossier client introuvable." }, { status: 404 });
            }
            store.clientMessages = store.clientMessages || [];
            const msg: ClientMessageRecord = {
              id: `cmsg-${Date.now().toString(36)}`,
              clientId: targetClientId,
              senderRole: user.role === "client" ? "client" : "agency",
              senderName: user.fullName,
              body: messageText,
              createdAt: now,
            };
            store.clientMessages.push(msg);
            if (user.role === "client") {
              store.notifications.unshift({
                id: `notif-${Date.now().toString(36)}`,
                targetMemberId: "mem-admin",
                type: "project_update",
                title: "Nouveau message Espace Client",
                message: `${user.fullName} : ${messageText.slice(0, 120)}`,
                read: false,
                createdAt: now,
              });
            }
            saveStore(store);
            return Response.json({
              ok: true,
              storeVersion: store.version,
              clientPortal: buildClientPortalSnapshot(store, targetClientId),
            });
          }

          if (action === "client_create_ticket") {
            const subject = String(body.subject || "").trim();
            const message = String(body.message || "").trim();
            if (!subject || !message) {
              return Response.json({ error: "Objet et description requis." }, { status: 400 });
            }
            const targetClientId =
              user.role === "client"
                ? user.clientId || ""
                : user.role === "admin"
                  ? String(body.clientId || "")
                  : "";
            if (!targetClientId || !store.clients.some((c) => c.id === targetClientId)) {
              return Response.json({ error: "Dossier client introuvable." }, { status: 404 });
            }
            store.supportTickets = store.supportTickets || [];
            const ticket: ClientSupportTicket = {
              id: `TKT-${Date.now().toString(36).toUpperCase().slice(-5)}`,
              clientId: targetClientId,
              subject: subject.slice(0, 180),
              message: message.slice(0, 2000),
              priority:
                body.priority === "urgent" || body.priority === "high" ? body.priority : "normal",
              status: "open",
              createdAt: now,
              updatedAt: now,
            };
            store.supportTickets.unshift(ticket);
            store.notifications.unshift({
              id: `notif-${Date.now().toString(36)}`,
              targetMemberId: "mem-admin",
              type: "task_due",
              title: `Ticket support ${ticket.id}`,
              message: `${subject} (${user.fullName})`,
              read: false,
              createdAt: now,
            });
            saveStore(store);
            return Response.json({
              ok: true,
              storeVersion: store.version,
              clientPortal: buildClientPortalSnapshot(store, targetClientId),
            });
          }

          if (action === "client_update_profile") {
            const targetClientId =
              user.role === "client"
                ? user.clientId || ""
                : user.role === "admin"
                  ? String(body.clientId || "")
                  : "";
            const clientRecord = store.clients.find((c) => c.id === targetClientId);
            if (!clientRecord) {
              return Response.json({ error: "Dossier client introuvable." }, { status: 404 });
            }
            if (typeof body.contactName === "string" && body.contactName.trim()) {
              clientRecord.contactName = body.contactName.trim().slice(0, 120);
            }
            if (typeof body.phone === "string") {
              clientRecord.phone = body.phone.trim().slice(0, 40);
            }
            if (typeof body.website === "string") {
              clientRecord.website = body.website.trim().slice(0, 200) || undefined;
            }
            if (typeof body.city === "string" && body.city.trim()) {
              clientRecord.city = body.city.trim().slice(0, 80);
            }
            clientRecord.updatedAt = now;
            saveStore(store);
            return Response.json({
              ok: true,
              storeVersion: store.version,
              clientPortal: buildClientPortalSnapshot(store, targetClientId),
            });
          }

          // Strict gate: client accounts cannot access any internal agency CRM action below
          if (user.role === "client") {
            return Response.json(
              { error: "Accès réservé à l’équipe XR Agency." },
              { status: 403 },
            );
          }

          // Admin-only: provision or update client portal access & upload client document
          if (action === "create_client_portal_access") {
            if (user.role !== "admin") {
              return Response.json({ error: "Action réservée à la Direction." }, { status: 403 });
            }
            const clientId = String(body.clientId || "").trim();
            const email = String(body.email || "")
              .trim()
              .toLowerCase();
            const password = String(body.password || "");
            const clientRecord = store.clients.find((c) => c.id === clientId);
            if (!clientRecord || !email || password.length < 8) {
              return Response.json(
                { error: "Client valide, e-mail et mot de passe (8 caractères min.) requis." },
                { status: 400 },
              );
            }
            const existing = store.members.find((m) => m.email.toLowerCase() === email);
            if (existing) {
              if (existing.role !== "client") {
                return Response.json(
                  { error: "Cet e-mail appartient déjà à un compte équipe." },
                  { status: 409 },
                );
              }
              existing.passwordHash = hashPassword(password);
              existing.clientId = clientRecord.id;
              existing.active = true;
            } else {
              store.members.push({
                id: `cli-user-${Date.now().toString(36)}`,
                email,
                fullName: clientRecord.contactName || clientRecord.company,
                title: `Client · ${clientRecord.company}`,
                role: "client",
                portalType: "client",
                clientId: clientRecord.id,
                phoneLine: clientRecord.phone || "",
                commissionPct: 0,
                passwordHash: hashPassword(password),
                active: true,
                createdAt: now,
              });
            }
            saveStore(store);
            return Response.json({ ok: true, email, clientId: clientRecord.id });
          }

          if (action === "add_client_document") {
            if (user.role !== "admin") {
              return Response.json({ error: "Action réservée à la Direction." }, { status: 403 });
            }
            const clientId = String(body.clientId || "").trim();
            const title = String(body.title || "").trim();
            const url = String(body.url || "").trim();
            if (!clientId || !title || !url) {
              return Response.json({ error: "Client, titre et lien requis." }, { status: 400 });
            }
            store.clientDocuments = store.clientDocuments || [];
            const docRecord: ClientDocumentRecord = {
              id: `cdoc-${Date.now().toString(36)}`,
              clientId,
              projectId: typeof body.projectId === "string" ? body.projectId : undefined,
              title: title.slice(0, 160),
              category: (["brief", "design", "contract", "deliverable", "report"].includes(
                String(body.category || ""),
              )
                ? body.category
                : "deliverable") as ClientDocumentRecord["category"],
              url,
              uploadedBy: user.fullName,
              createdAt: now,
            };
            store.clientDocuments.unshift(docRecord);
            saveStore(store);
            return Response.json({
              ok: true,
              clientPortal: buildClientPortalSnapshot(store, clientId),
            });
          }

          // ── 2. PROSPECTS / LEADS (SAISIE FLEXIBLE : SCREENSHOT, TÉLÉPHONE OU FICHE) ──
          if (action === "send_lead") {
            const rawCompany = String(body.company || "").trim();
            const phone = String(body.phone || "").trim();
            const screenshotUrl =
              typeof body.screenshotUrl === "string" ? body.screenshotUrl.trim() : undefined;
            const contactName = String(body.contactName || "").trim();
            const assignedTo = String(body.assignedTo || user.id).trim();

            if (!rawCompany && !phone && !screenshotUrl) {
              return Response.json(
                { error: "Indiquez au moins un nom, un numéro ou un screenshot." },
                { status: 400 },
              );
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
              serviceTarget: String(
                body.serviceTarget || "Site Vitrine Pro (499 €) + Google Maps",
              ).trim(),
              budgetEur: Math.max(0, Number(body.budgetEur) || 799),
              status: (typeof body.status === "string" ? body.status : "to_call") as LeadStatus,
              priority: (body.priority === "urgent" || body.priority === "high"
                ? body.priority
                : "high") as LeadPriority,
              assignedTo: targetMember.id,
              sentBy: user.fullName,
              source: String(
                body.source || (screenshotUrl ? "Capture Screenshot Direction" : "Envoi Direction"),
              ).trim(),
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
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          // ── 2B. FLUX MAQUETTES : DEMANDE PAR VENDEUR -> VALIDATION PAR LIEN DIRECTION ──
          if (action === "request_maquette") {
            const leadId = String(body.leadId || "");
            const lead = store.leads.find((l) => l.id === leadId);
            if (!lead) return Response.json({ error: "Lead introuvable." }, { status: 404 });
            lead.maquetteStatus = "pending";
            lead.maquetteBrief = String(
              body.brief || `Maquette demandée pour ${lead.company} (${lead.serviceTarget})`,
            ).trim();
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
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "validate_maquette") {
            if (user.role !== "admin") {
              return Response.json(
                { error: "Validation réservée à la Direction." },
                { status: 403 },
              );
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
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "update_lead") {
            const leadId = String(body.leadId || "");
            const lead = store.leads.find((l) => l.id === leadId);
            if (!lead) return Response.json({ error: "Lead introuvable." }, { status: 404 });
            if (user.role !== "admin" && lead.assignedTo !== user.id) {
              return Response.json(
                { error: "Accès non autorisé sur ce dossier." },
                { status: 403 },
              );
            }
            const prevStatus = lead.status;
            if (typeof body.status === "string") {
              lead.status = body.status as LeadStatus;
            }
            if (typeof body.notes === "string") lead.notes = body.notes;
            if (typeof body.nextFollowUp === "string") lead.nextFollowUp = body.nextFollowUp;
            if (typeof body.lossReason === "string") lead.lossReason = body.lossReason;
            if (body.budgetEur !== undefined)
              lead.budgetEur = Math.max(0, Number(body.budgetEur) || lead.budgetEur);
            if (
              user.role === "admin" &&
              typeof body.assignedTo === "string" &&
              store.members.some((m) => m.id === body.assignedTo)
            ) {
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

              // ── AUTOMATISATION : CRÉATION CLIENT + FACTURE À LA SIGNATURE ──
              if (lead.status === "signed") {
                // 1. Client actif
                let client = store.clients.find(
                  (c) =>
                    c.leadId === lead.id || c.company.toLowerCase() === lead.company.toLowerCase(),
                );
                if (!client) {
                  const clientId = `cli-${Date.now().toString(36)}`;
                  lead.convertedClientId = clientId;
                  client = {
                    id: clientId,
                    leadId: lead.id,
                    company: lead.company,
                    contactName: lead.contactName,
                    email:
                      lead.email ||
                      `contact@${lead.company.toLowerCase().replace(/[^a-z0-9]/g, "") || "client"}.fr`,
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

                // 2. Facture à coordonnées bancaires à confirmer (Statut: pending_transfer pour validation Direction)
                const existingInvoice = store.invoices.find(
                  (i) =>
                    i.clientCompany.toLowerCase() === lead.company.toLowerCase() &&
                    i.status !== "cancelled",
                );
                if (!existingInvoice) {
                  const invId = `inv-${Date.now().toString(36)}`;
                  const refNum = `XR-INV-2026-${String(store.invoices.length + 1).padStart(4, "0")}`;
                  const autoInvoice: CrmInvoiceRecord = {
                    id: invId,
                    clientId: client.id,
                    clientCompany: lead.company,
                    clientEmail: client.email,
                    paymentReference: refNum,
                    clientName: client.contactName,
                    items: [
                      {
                        label: lead.serviceTarget || "Prestation XR Agency",
                        detail: "Périmètre à confirmer sur le devis validé",
                        amountEur: lead.budgetEur,
                      },
                    ],
                    totalEur: lead.budgetEur,
                    taxRatePct: 0,
                    taxNotice: "Régime fiscal et TVA à confirmer avant émission définitive",
                    paymentMethod: "bank_transfer",
                    status: "pending_transfer",
                    dueDate: now.slice(0, 10),
                    bankDetails: {
                      beneficiary: "",
                      bankName: "",
                      ibanMasked: "",
                      bic: "",
                      instructions:
                        "Coordonnées bancaires à confirmer par la Direction avant envoi au client.",
                    },
                    createdAt: now,
                    updatedAt: now,
                  };
                  store.invoices.unshift(autoInvoice);
                }

                // 3. Notification d'alerte pour le QG Direction
                store.notifications.unshift({
                  id: `notif-${Date.now().toString(36)}`,
                  targetMemberId: "all",
                  type: "project_update",
                  title: "Contrat signé — facture à vérifier",
                  message: `${user.fullName} a marqué le dossier ${lead.company} comme signé (${lead.budgetEur} €). Les coordonnées de paiement restent à confirmer par la Direction.`,
                  read: false,
                  createdAt: now,
                });
              }
            }
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "delete_lead") {
            if (user.role !== "admin") {
              return Response.json({ error: "Action réservée à la Direction." }, { status: 403 });
            }
            const leadId = String(body.leadId || "");
            store.leads = store.leads.filter((l) => l.id !== leadId);
            store.activities = store.activities.filter((a) => a.leadId !== leadId);
            saveStore(store);
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
            saveStore(store);
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

            // Facture à coordonnées bancaires à confirmer (Statut: pending_transfer pour validation Direction)
            const existingInv = store.invoices.find(
              (i) =>
                i.clientCompany.toLowerCase() === lead.company.toLowerCase() &&
                i.status !== "cancelled",
            );
            if (!existingInv) {
              const invId = `inv-${Date.now().toString(36)}`;
              const refNum = `XR-INV-2026-${String(store.invoices.length + 1).padStart(4, "0")}`;
              store.invoices.unshift({
                id: invId,
                clientId: newClient.id,
                clientCompany: lead.company,
                clientEmail: newClient.email || "comptabilite@client.fr",
                paymentReference: refNum,
                clientName: newClient.contactName,
                items: [
                  {
                    label: lead.serviceTarget || "Prestation XR Agency",
                    detail: "Périmètre à confirmer sur le devis validé",
                    amountEur: lead.budgetEur,
                  },
                ],
                totalEur: lead.budgetEur,
                taxRatePct: 0,
                taxNotice: "Régime fiscal et TVA à confirmer avant émission définitive",
                paymentMethod: "bank_transfer",
                status: "pending_transfer",
                dueDate: now.slice(0, 10),
                bankDetails: {
                  beneficiary: "",
                  bankName: "",
                  ibanMasked: "",
                  bic: "",
                  instructions:
                    "Coordonnées bancaires à confirmer par la Direction avant envoi au client.",
                },
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

            saveStore(store);
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
              servicesPurchased: Array.isArray(body.servicesPurchased)
                ? (body.servicesPurchased as string[])
                : ["Sur devis"],
              totalRevenueEur: Math.max(0, Number(body.totalRevenueEur) || 0),
              status: "active",
              assignedTo: user.id,
              internalNotes: String(body.internalNotes || "").trim(),
              createdAt: now,
              updatedAt: now,
            };
            store.clients.unshift(newClient);
            saveStore(store);
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
            if (
              typeof body.status === "string" &&
              ["active", "vip", "archived"].includes(body.status)
            ) {
              client.status = body.status as "active" | "vip" | "archived";
            }
            client.updatedAt = now;
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          // ── 6. DEVIS & FACTURATION ──
          if (action === "create_quote") {
            const clientCompany = String(body.clientCompany || "").trim();
            const clientEmail = String(body.clientEmail || "").trim();
            const items = Array.isArray(body.items) ? (body.items as QuoteItem[]) : [];
            if (!clientCompany || !clientEmail || !items.length) {
              return Response.json(
                { error: "Client, e-mail et prestations requis." },
                { status: 400 },
              );
            }
            const totalOnceEur = items
              .filter((i) => i.period === "once")
              .reduce((s, i) => s + i.priceEur * (i.quantity || 1), 0);
            const totalMonthlyEur = items
              .filter((i) => i.period === "month")
              .reduce((s, i) => s + i.priceEur * (i.quantity || 1), 0);
            const totalAnnualEur = items
              .filter((i) => i.period === "year")
              .reduce((s, i) => s + i.priceEur * (i.quantity || 1), 0);

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
              validUntil: String(
                body.validUntil || new Date(Date.now() + 15 * 86_400_000).toISOString(),
              ),
              paymentTerms: String(
                body.paymentTerms ||
                  "Virement bancaire professionnel. Acompte 50% commande / 50% livraison.",
              ).trim(),
              notes: typeof body.notes === "string" ? body.notes : undefined,
              createdAt: now,
              updatedAt: now,
            };
            store.quotes.unshift(newQuote);

            // Création automatique de la Facture / Proforma avec coordonnées bancaires à confirmer
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
              taxNotice: "TVA non applicable, art. 293 B du CGI.",
              paymentMethod: "bank_transfer",
              paymentReference,
              bankDetails: {
                beneficiary: "",
                bankName: "",
                ibanMasked: "",
                bic: "",
                instructions: `Mentionner impérativement la référence ${paymentReference} dans le libellé du virement bancaire.`,
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
              title: "📄 Nouveau Devis & RIB généré",
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

            saveStore(store);
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
              saveStore(store);
            }
            return Response.json(buildSnapshot(store, user));
          }

          // ── VALIDATION MANUELLE DE PAIEMENT PAR VIREMENT (ADMIN) ──
          if (action === "validate_payment") {
            if (user.role !== "admin") {
              return Response.json(
                { error: "Validation des fonds réservée à la Direction." },
                { status: 403 },
              );
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

            saveStore(store);
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
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "update_project") {
            const projectId = String(body.projectId || "");
            const project = store.projects.find((p) => p.id === projectId);
            if (!project) return Response.json({ error: "Projet introuvable." }, { status: 404 });
            if (
              typeof body.stage === "string" &&
              ["prep", "waiting", "production", "review", "delivered", "suspended"].includes(
                body.stage,
              )
            ) {
              project.stage = body.stage as CrmProjectRecord["stage"];
            }
            if (body.progressPct !== undefined) {
              project.progressPct = Math.min(100, Math.max(0, Number(body.progressPct) || 0));
            }
            if (typeof body.notes === "string") project.notes = body.notes;
            if (typeof body.liveUrl === "string") project.liveUrl = body.liveUrl;
            if (Array.isArray(body.milestones))
              project.milestones = body.milestones as ProjectMilestone[];
            project.updatedAt = now;
            saveStore(store);
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
              priority: (body.priority === "urgent" || body.priority === "high"
                ? body.priority
                : "normal") as LeadPriority,
              status: "todo",
              category: body.category === "perso" ? "perso" : "pro",
              tag: String(body.tag || "Agence").trim(),
              linkedEntityType:
                typeof body.linkedEntityType === "string"
                  ? (body.linkedEntityType as CrmTaskRecord["linkedEntityType"])
                  : undefined,
              linkedEntityId:
                typeof body.linkedEntityId === "string" ? body.linkedEntityId : undefined,
              dueDate: String(body.dueDate || "Aujourd'hui").trim(),
              createdAt: now,
            };
            store.tasks.unshift(newTask);
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "toggle_task") {
            const taskId = String(body.taskId || "");
            const task = store.tasks.find((t) => t.id === taskId);
            if (!task) return Response.json({ error: "Tâche introuvable." }, { status: 404 });
            task.status = task.status === "done" ? "todo" : "done";
            if (task.status === "done") task.doneAt = now;
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          if (action === "delete_task") {
            const taskId = String(body.taskId || "");
            store.tasks = store.tasks.filter((t) => t.id !== taskId);
            saveStore(store);
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
              budgetAllocated: Math.max(
                0,
                Number(body.budgetAllocated) || Math.round(lead.budgetEur * 0.45),
              ),
              deadline: String(body.deadline || "Sous 7 jours").trim(),
              brief: String(
                body.brief || lead.notes || "Prise en charge complète studio XR.",
              ).trim(),
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
            saveStore(store);
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
              specialties: Array.isArray(body.specialties)
                ? (body.specialties as string[])
                : ["Développement Web"],
              hourlyRateEur: Math.max(0, Number(body.hourlyRateEur) || 60),
              availability: "available",
              missionsCount: 0,
              totalPaidEur: 0,
              notes: String(body.notes || "").trim(),
              createdAt: now,
            };
            store.providers.unshift(newProvider);
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          // ── 10. NOTIFICATIONS ──
          if (action === "mark_notifications_read") {
            store.notifications.forEach((n) => {
              if (n.targetMemberId === "all" || n.targetMemberId === user.id) {
                n.read = true;
              }
            });
            saveStore(store);
            return Response.json(buildSnapshot(store, user));
          }

          // ── 11. GESTION DES MEMBRES ──
          if (action === "create_member") {
            if (user.role !== "admin") {
              return Response.json({ error: "Action réservée à la Direction." }, { status: 403 });
            }
            const email = String(body.email || "")
              .trim()
              .toLowerCase();
            const fullName = String(body.fullName || "").trim();
            const password = String(body.password || "");
            if (!email || !fullName || password.length < 8) {
              return Response.json(
                { error: "Nom complet, e-mail et mot de passe (8 caractères min.) requis." },
                { status: 400 },
              );
            }
            if (store.members.some((m) => m.email.toLowerCase() === email)) {
              return Response.json(
                { error: "Un compte existe déjà avec cet e-mail." },
                { status: 409 },
              );
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
            saveStore(store);
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
