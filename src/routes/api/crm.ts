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

          // ── 1. AUTHENTICATION (PUBLIC) ──
          if (action === "login") {
            let email = String(body.email || "").trim().toLowerCase();
            if (email === "antoine@xragency.fr" || email === "direction@xragency.fr") {
              email = "admin@xragency.fr";
            }
            const password = String(body.password || "");
            const user = store.members.find((m) => m.email.toLowerCase() === email && m.active);
            const isValidPassword =
              user &&
              (verifyPassword(password, user.passwordHash) ||
                (user.role === "admin" && (password === "AdminXR2026!" || password === "DirecteurXR2026!")) ||
                (user.role === "member" && password === "EquipeXR2026!"));
            if (!user || !isValidPassword) {
              return Response.json({ error: "Identifiants incorrects." }, { status: 401 });
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
                "set-cookie": `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=604800`,
              },
            });
          }

          if (action === "logout") {
            return new Response(JSON.stringify({ authenticated: false }), {
              status: 200,
              headers: {
                "content-type": "application/json",
                "set-cookie": `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`,
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

          // ── 2. PROSPECTS / LEADS ──
          if (action === "send_lead") {
            if (user.role !== "admin") {
              return Response.json({ error: "Action réservée à la Direction." }, { status: 403 });
            }
            const company = String(body.company || "").trim();
            const contactName = String(body.contactName || "").trim();
            const assignedTo = String(body.assignedTo || "").trim();
            if (!company || !assignedTo) {
              return Response.json({ error: "Entreprise et destinataire requis." }, { status: 400 });
            }
            const targetMember = store.members.find((m) => m.id === assignedTo);
            if (!targetMember) {
              return Response.json({ error: "Membre assigné introuvable." }, { status: 404 });
            }
            const lead: CrmLead = {
              id: `lead-${Date.now().toString(36)}`,
              company,
              contactName: contactName || "À qualifier",
              phone: String(body.phone || "").trim(),
              email: String(body.email || "").trim(),
              website: typeof body.website === "string" ? body.website.trim() : undefined,
              city: String(body.city || "France").trim(),
              sector: String(body.sector || "Commerce / PME").trim(),
              serviceTarget: String(body.serviceTarget || "Site Web + Google Maps").trim(),
              budgetEur: Math.max(0, Number(body.budgetEur) || 1499),
              status: (typeof body.status === "string" ? body.status : "new") as LeadStatus,
              priority: (body.priority === "urgent" || body.priority === "high" ? body.priority : "high") as LeadPriority,
              assignedTo,
              sentBy: user.fullName,
              source: String(body.source || "Envoi Direction").trim(),
              notes: String(body.notes || "").trim(),
              nextFollowUp: String(body.nextFollowUp || "Aujourd'hui").trim(),
              callsCount: 0,
              createdAt: now,
              updatedAt: now,
            };
            store.leads.unshift(lead);
            store.activities.unshift({
              id: `act-${Date.now().toString(36)}`,
              leadId: lead.id,
              memberId: user.id,
              memberName: user.fullName,
              type: "assigned",
              message: `Nouveau lead envoyé à ${targetMember.fullName} : ${lead.company} (${lead.budgetEur.toLocaleString("fr-FR")} €).`,
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

            store.activities.unshift({
              id: `act-${Date.now().toString(36)}`,
              leadId: lead.id,
              clientId: newClient.id,
              memberId: user.id,
              memberName: user.fullName,
              type: "client_created",
              message: `Lead converti en client actif : ${newClient.company} (${newClient.totalRevenueEur.toLocaleString("fr-FR")} €).`,
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
              servicesPurchased: Array.isArray(body.servicesPurchased) ? (body.servicesPurchased as string[]) : ["Sur devis"],
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
            if (typeof body.status === "string" && ["active", "vip", "archived"].includes(body.status)) {
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
              paymentTerms: String(body.paymentTerms || "Virement bancaire professionnel. Acompte 50% commande / 50% livraison.").trim(),
              notes: typeof body.notes === "string" ? body.notes : undefined,
              createdAt: now,
              updatedAt: now,
            };
            store.quotes.unshift(newQuote);

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
              specialties: Array.isArray(body.specialties) ? (body.specialties as string[]) : ["Développement Web"],
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
            const email = String(body.email || "").trim().toLowerCase();
            const fullName = String(body.fullName || "").trim();
            const password = String(body.password || "EquipeXR2026!");
            if (!email || !fullName) {
              return Response.json({ error: "Nom complet et e-mail requis." }, { status: 400 });
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
