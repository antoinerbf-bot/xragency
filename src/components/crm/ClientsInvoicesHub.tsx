import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import {
  Building2,
  Receipt,
  Download,
  Copy,
  Check,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Landmark,
  Settings2,
} from "lucide-react";
import {
  DEFAULT_BANK_CONFIG,
  XR_OFFICIAL_SERVICES,
  getLeadTotals,
  type CrmBankConfig,
  type InvoiceStatus,
  type Lead,
  type TeamMember,
} from "@/lib/crm/data";
import type { CrmThemeTokens } from "@/lib/crm/theme";

interface ClientsInvoicesHubProps {
  visibleLeads: Lead[];
  members: TeamMember[];
  currentUser: TeamMember;
  theme: CrmThemeTokens;
  onUpdateLead: (updated: Lead) => void;
  onUnlockCommission?: (leadId: string) => void;
  onSound?: () => void;
}

const INVOICE_STATUS_LABELS: Record<InvoiceStatus, { label: string; pill: string }> = {
  none: { label: "Non émise", pill: "bg-slate-500/15 text-slate-600 dark:text-slate-300" },
  quote_sent: { label: "Devis envoyé", pill: "bg-sky-500/15 text-sky-700 dark:text-sky-300" },
  pending_transfer: {
    label: "⏳ Attente virement RIB",
    pill: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  },
  deposit_paid: {
    label: "💳 Acompte reçu",
    pill: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
  },
  paid_full: {
    label: "✅ Soldée intégralement",
    pill: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  },
};

export function ClientsInvoicesHub({
  visibleLeads,
  members,
  currentUser,
  theme,
  onUpdateLead,
  onUnlockCommission,
  onSound,
}: ClientsInvoicesHubProps) {
  const [subView, setSubView] = useState<"clients" | "invoices">("clients");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showBankEditor, setShowBankEditor] = useState(false);

  const [bankConfig, setBankConfig] = useState<CrmBankConfig>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("xr_crm_bank_config_v1");
        if (raw) return { ...DEFAULT_BANK_CONFIG, ...JSON.parse(raw) };
      } catch {
        // ignore
      }
    }
    return DEFAULT_BANK_CONFIG;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("xr_crm_bank_config_v1", JSON.stringify(bankConfig));
    }
  }, [bankConfig]);

  const isDirector = currentUser.roleType === "direction";
  const wonClients = visibleLeads.filter((l) => l.stage === "won");
  const billableLeads = visibleLeads.filter((l) => l.stage === "won" || l.stage === "negociation");

  const activeMrr = wonClients.reduce((s, l) => s + getLeadTotals(l).mrrTotal, 0);
  const activeAnnual = wonClients.reduce((s, l) => s + getLeadTotals(l).annualTotal, 0);
  const pendingInvoicesCount = billableLeads.filter(
    (l) => l.invoiceStatus === "pending_transfer" || l.invoiceStatus === "deposit_paid"
  ).length;

  const ensureInvoiceRef = (lead: Lead) => {
    if (lead.invoiceRef) return lead.invoiceRef;
    const year = new Date().getFullYear();
    const suffix = lead.id.replace(/[^a-zA-Z0-9]/g, "").slice(-4).toUpperCase();
    return `FAC-${year}-${suffix}`;
  };

  const generateInvoicePdf = (lead: Lead) => {
    const ref = ensureInvoiceRef(lead);
    const totals = getLeadTotals(lead);
    const mainSvc = XR_OFFICIAL_SERVICES.find((s) => s.id === lead.serviceId);
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const M = 16;
    const R = 194;

    // Header Haute Couture Noir & Or
    doc.setFillColor(20, 18, 15);
    doc.rect(0, 0, 210, 42, "F");
    doc.setTextColor(229, 198, 150);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.text("XRAGENCY", M, 18);
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text("FACTURE PROFORMA / ORDRE DE RÈGLEMENT OFFICIEL", M, 25);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 195, 188);
    doc.text(`${bankConfig.companyLegal} · ${bankConfig.siret}`, M, 31);
    doc.text(bankConfig.address, M, 36);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(229, 198, 150);
    doc.text(`N° ${ref}`, R, 18, { align: "right" });
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`Date : ${new Date().toLocaleDateString("fr-FR")}`, R, 25, { align: "right" });
    doc.text(
      `Statut : ${lead.invoiceStatus === "paid_full" ? "ACQUITTÉE" : "EN ATTENTE DE RÈGLEMENT"}`,
      R,
      32,
      { align: "right" }
    );

    // Bloc Client
    let y = 54;
    doc.setFillColor(250, 248, 245);
    doc.roundedRect(M, y, R - M, 26, 3, 3, "F");
    doc.setTextColor(140, 110, 60);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("FACTURÉ À :", M + 5, y + 7);
    doc.setTextColor(26, 24, 21);
    doc.setFontSize(11);
    doc.text(lead.name, M + 5, y + 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(
      `À l'attention de : ${lead.contact} · Tél : ${lead.phone}${lead.email ? ` · ${lead.email}` : ""}`,
      M + 5,
      y + 21
    );

    // Tableau des prestations
    y = 90;
    doc.setFillColor(26, 24, 21);
    doc.rect(M, y, R - M, 9, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("DÉSIGNATION DES PRESTATIONS", M + 4, y + 6);
    doc.text("FRÉQUENCE", 138, y + 6);
    doc.text("MONTANT HT", R - 4, y + 6, { align: "right" });

    y += 16;
    const allItems = [
      {
        title: `${mainSvc?.name || "Prestation XRAGENCY"} — ${lead.planLabel}`,
        billing: lead.billing,
        price: lead.value,
      },
      ...(lead.extraItems || []).map((ex) => {
        const s = XR_OFFICIAL_SERVICES.find((x) => x.id === ex.serviceId);
        return {
          title: `${s?.name || ex.serviceId} — ${ex.planLabel}`,
          billing: ex.billing,
          price: ex.price,
        };
      }),
    ];

    doc.setTextColor(26, 24, 21);
    allItems.forEach((it) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(it.title.slice(0, 66), M + 4, y);
      doc.setFont("helvetica", "normal");
      doc.text(
        it.billing === "month" ? "Mensuel" : it.billing === "year" ? "Annuel" : "Forfait unique",
        138,
        y
      );
      doc.setFont("helvetica", "bold");
      doc.text(`${it.price.toLocaleString("fr-FR")} €`, R - 4, y, { align: "right" });
      doc.setDrawColor(232, 228, 220);
      doc.line(M, y + 4, R, y + 4);
      y += 11;
    });

    // Totaux
    y += 4;
    doc.setFillColor(250, 248, 245);
    doc.roundedRect(112, y, R - 112, 28, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(26, 24, 21);
    doc.text("TOTAL PONCTUEL / ANNUEL :", 117, y + 9);
    doc.text(`${totals.oneShotTotal.toLocaleString("fr-FR")} €`, R - 5, y + 9, { align: "right" });
    if (totals.mrrTotal > 0) {
      doc.setFontSize(8.5);
      doc.text("ABONNEMENT MENSUEL :", 117, y + 17);
      doc.text(`${totals.mrrTotal.toLocaleString("fr-FR")} €/mois`, R - 5, y + 17, {
        align: "right",
      });
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 95, 88);
    doc.text(bankConfig.taxNotice.slice(0, 62), 117, y + 24);

    // Encadré Coordonnées Bancaires RIB
    y += 38;
    doc.setDrawColor(166, 124, 64);
    doc.setLineWidth(0.5);
    doc.roundedRect(M, y, R - M, 38, 3, 3, "S");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(166, 124, 64);
    doc.text("COORDONNÉES DE RÈGLEMENT PAR VIREMENT SEPA (RIB OFFICIEL)", M + 5, y + 8);
    doc.setTextColor(26, 24, 21);
    doc.setFontSize(8.5);
    doc.text(`Bénéficiaire : ${bankConfig.companyLegal} (${bankConfig.bankName})`, M + 5, y + 16);
    doc.text(`IBAN : ${bankConfig.iban}`, M + 5, y + 23);
    doc.text(`BIC / SWIFT : ${bankConfig.bic}`, M + 5, y + 29);
    doc.setTextColor(180, 50, 50);
    doc.text(
      `Référence obligatoire à indiquer au libellé du virement : ${ref}`,
      M + 5,
      y + 35
    );

    doc.save(`FACTURE-PROFORMA-XRAGENCY-${ref}.pdf`);

    if (!lead.invoiceStatus || lead.invoiceStatus === "none") {
      onUpdateLead({
        ...lead,
        invoiceRef: ref,
        invoiceStatus: "pending_transfer",
      });
    }
    onSound?.();
  };

  const copyRibMessage = (lead: Lead) => {
    const ref = ensureInvoiceRef(lead);
    const totals = getLeadTotals(lead);
    const amountDue =
      lead.installments?.plan === "3x" && totals.oneShotTotal > 0
        ? `${Math.round(totals.oneShotTotal / 3).toLocaleString("fr-FR")} € (1ère échéance 3x sans frais)`
        : `${totals.commissionBase.toLocaleString("fr-FR")} €`;

    const msg = [
      `Bonjour ${lead.contact.split(" ")[0]} 👋`,
      `Voici les coordonnées officielles XRAGENCY pour valider le lancement de votre projet (${lead.name}) :`,
      ``,
      `• Bénéficiaire : ${bankConfig.companyLegal}`,
      `• IBAN : ${bankConfig.iban}`,
      `• BIC : ${bankConfig.bic}`,
      `• Montant à régler : ${amountDue}`,
      `• Référence à indiquer : ${ref}`,
      ``,
      `Dès réception de l'ordre de virement, notre Studio démarre immédiatement la production !`,
    ].join("\n");

    navigator.clipboard.writeText(msg);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
    if (!lead.invoiceRef || lead.invoiceStatus === "none") {
      onUpdateLead({ ...lead, invoiceRef: ref, invoiceStatus: "pending_transfer" });
    }
    onSound?.();
  };

  return (
    <div className="mt-6 space-y-5">
      {/* KPIs Portefeuille & Facturation */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className={`p-4 rounded-3xl border ${theme.card}`}>
          <p className={`text-[10px] font-extrabold uppercase ${theme.textSoft}`}>Clients Signés</p>
          <p className={`text-2xl font-black mt-1 ${theme.textMain}`}>{wonClients.length}</p>
          <p className={`text-[11px] mt-0.5 ${theme.textMuted}`}>Portefeuille actif suivi</p>
        </div>
        <div className={`p-4 rounded-3xl border ${theme.card}`}>
          <p className={`text-[10px] font-extrabold uppercase ${theme.textSoft}`}>MRR Récurrent</p>
          <p className="text-2xl font-black font-mono mt-1 text-emerald-600 dark:text-emerald-300">
            {activeMrr.toLocaleString("fr-FR")} €/mois
          </p>
          <p className={`text-[11px] mt-0.5 ${theme.textMuted}`}>WebCare, SEO, Social & Leasing</p>
        </div>
        <div className={`p-4 rounded-3xl border ${theme.card}`}>
          <p className={`text-[10px] font-extrabold uppercase ${theme.textSoft}`}>Contrats Annuels</p>
          <p className="text-2xl font-black font-mono mt-1 text-indigo-600 dark:text-amber-300">
            {activeAnnual.toLocaleString("fr-FR")} €/an
          </p>
          <p className={`text-[11px] mt-0.5 ${theme.textMuted}`}>Google Maps & Infra Cloud</p>
        </div>
        <div className={`p-4 rounded-3xl border ${theme.card}`}>
          <p className={`text-[10px] font-extrabold uppercase ${theme.textSoft}`}>Suivi Règlements</p>
          <p className="text-2xl font-black font-mono mt-1 text-amber-600 dark:text-amber-300">
            {pendingInvoicesCount}
          </p>
          <p className={`text-[11px] mt-0.5 ${theme.textMuted}`}>En attente de solde / virement</p>
        </div>
      </div>

      {/* Sous-navigation : Clients Actifs vs Factures & RIB */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className={`inline-flex p-1.5 rounded-2xl border gap-1.5 ${theme.tabBarBg}`}>
          <button
            onClick={() => setSubView("clients")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              subView === "clients" ? theme.tabActive : theme.tabIdle
            }`}
          >
            <Building2 className="w-4 h-4" /> Clients Actifs & Abonnements ({wonClients.length})
          </button>
          <button
            onClick={() => setSubView("invoices")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              subView === "invoices" ? theme.tabActive : theme.tabIdle
            }`}
          >
            <Receipt className="w-4 h-4" /> Factures PDF & RIB Virement ({billableLeads.length})
          </button>
        </div>

        {isDirector && (
          <button
            onClick={() => setShowBankEditor(!showBankEditor)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-xs font-bold ${theme.card} ${theme.textMain}`}
          >
            <Landmark className="w-4 h-4 text-amber-500" />
            <Settings2 className="w-3.5 h-3.5" /> Paramétrer RIB Officiel
          </button>
        )}
      </div>

      {/* Éditeur RIB réservé Direction */}
      {isDirector && showBankEditor && (
        <div className={`p-5 rounded-3xl border space-y-3 ${theme.card}`}>
          <h3 className={`text-sm font-black flex items-center gap-2 ${theme.textMain}`}>
            <Landmark className="w-4 h-4 text-amber-500" /> Coordonnées Bancaires inscrites sur les Factures PDF & Messages RIB
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={`text-[10px] font-bold uppercase ${theme.textMuted}`}>Entité Légale</label>
              <input
                value={bankConfig.companyLegal}
                onChange={(e) => setBankConfig({ ...bankConfig, companyLegal: e.target.value })}
                className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
              />
            </div>
            <div>
              <label className={`text-[10px] font-bold uppercase ${theme.textMuted}`}>IBAN Officiel</label>
              <input
                value={bankConfig.iban}
                onChange={(e) => setBankConfig({ ...bankConfig, iban: e.target.value })}
                className={`w-full mt-1 rounded-xl px-3 py-2 text-xs font-mono border ${theme.inputBg}`}
              />
            </div>
            <div>
              <label className={`text-[10px] font-bold uppercase ${theme.textMuted}`}>BIC / Banque</label>
              <input
                value={bankConfig.bic}
                onChange={(e) => setBankConfig({ ...bankConfig, bic: e.target.value })}
                className={`w-full mt-1 rounded-xl px-3 py-2 text-xs font-mono border ${theme.inputBg}`}
              />
            </div>
          </div>
        </div>
      )}

      {/* VUE 1 : PORTEFEUILLE CLIENTS SIGNÉS */}
      {subView === "clients" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {wonClients.length === 0 ? (
            <div className={`col-span-full p-10 rounded-3xl border text-center space-y-2 ${theme.card}`}>
              <p className="text-3xl">🏢</p>
              <h3 className={`text-base font-black ${theme.textMain}`}>
                Vos clients signés apparaîtront automatiquement ici
              </h3>
              <p className={`text-xs ${theme.textMuted}`}>
                Dès qu'un prospect passe dans la colonne « Gagné » du Pipeline, sa fiche client, son suivi d'échéancier et ses opportunités d'upsell s'activent ici.
              </p>
            </div>
          ) : (
            wonClients.map((client) => {
              const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === client.serviceId);
              const totals = getLeadTotals(client);
              const closer = members.find((m) => m.id === client.closerId);
              const instPlan = client.installments?.plan || "1x";
              const paidCount = client.installments?.paidCount || 0;
              const maxCount = instPlan === "3x" ? 3 : 1;
              const cleanPhone = client.phone.replace(/[^0-9]/g, "");

              // Upsell intelligent
              const upsellSuggestion =
                client.serviceId === "websites"
                  ? "Stratégie Google Maps Top 3 (999 €/an) + WebCare Pro (49 €/mois)"
                  : client.serviceId === "maps"
                    ? "Site Web Business Haute Couture (799 €) ou CRM Commande Directe (2 000 €)"
                    : "Social Media Croissance Active (599 €/mois)";

              return (
                <div key={client.id} className={`p-5 rounded-3xl border flex flex-col justify-between gap-4 ${theme.card}`}>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${theme.badgeSoft}`}>
                          {svc?.icon} {svc?.shortName || client.serviceId}
                        </span>
                        <h3 className={`text-base font-black mt-1.5 ${theme.textMain}`}>{client.name}</h3>
                        <p className={`text-xs ${theme.textMuted}`}>
                          {client.contact} · {client.phone}
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[10px] font-black">
                        Client Actif ✓
                      </span>
                    </div>

                    <div className={`p-3 rounded-2xl border text-xs space-y-1 ${theme.subCard}`}>
                      <div className="flex justify-between">
                        <span className={theme.textMuted}>Contrat principal :</span>
                        <span className={`font-bold ${theme.textMain}`}>{client.planLabel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme.textMuted}>Valeur signée :</span>
                        <span className="font-mono font-black text-emerald-600 dark:text-emerald-300">
                          {totals.oneShotTotal > 0 ? `${totals.oneShotTotal.toLocaleString("fr-FR")} €` : ""}
                          {totals.oneShotTotal > 0 && totals.mrrTotal > 0 ? " + " : ""}
                          {totals.mrrTotal > 0 ? `${totals.mrrTotal} €/mois` : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme.textMuted}>Responsable :</span>
                        <span className={`font-bold ${theme.textMain}`}>{closer?.shortName || "Équipe"}</span>
                      </div>
                    </div>

                    {/* Suivi Échéancier 1x / 3x */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className={`font-bold ${theme.textMuted}`}>
                        Échéancier ({instPlan}) : {paidCount}/{maxCount} réglé(s)
                      </span>
                      <button
                        onClick={() => {
                          const nextPaid = (paidCount + 1) % (maxCount + 1);
                          onUpdateLead({
                            ...client,
                            installments: { plan: instPlan, paidCount: nextPaid },
                            invoiceStatus: nextPaid >= maxCount ? "paid_full" : "deposit_paid",
                          });
                          onSound?.();
                        }}
                        className="px-2.5 py-1 rounded-xl bg-indigo-500/15 text-indigo-700 dark:text-amber-300 font-bold text-[11px] hover:brightness-110"
                      >
                        + Pointer échéance
                      </button>
                    </div>

                    <div className={`p-2.5 rounded-xl border border-dashed border-amber-400/50 bg-amber-500/5 text-[11px] ${theme.textMuted}`}>
                      <strong className="text-amber-600 dark:text-amber-300">💡 Opportunité Upsell :</strong>{" "}
                      {upsellSuggestion}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-white/10">
                    <button
                      onClick={() => generateInvoicePdf(client)}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-bold ${theme.subCard} ${theme.textMain}`}
                    >
                      <Download className="w-3.5 h-3.5" /> Facture PDF
                    </button>
                    <a
                      href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                        `Bonjour ${client.contact.split(" ")[0]} 👋 Tout se passe bien pour ${client.name} ? J'ai identifié un levier complémentaire (${upsellSuggestion}) qui pourrait accélérer encore vos résultats ce mois-ci. On fait un point rapide de 5 minutes ?`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-extrabold shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Relancer Upsell
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* VUE 2 : FACTURES PROFORMA PDF & VIREMENTS RIB */}
      {subView === "invoices" && (
        <div className={`rounded-3xl border overflow-hidden ${theme.card}`}>
          {billableLeads.length === 0 ? (
            <div className="p-10 text-center space-y-2">
              <p className="text-3xl">🧾</p>
              <h3 className={`text-base font-black ${theme.textMain}`}>
                Aucun dossier en Négociation ou Signé pour le moment
              </h3>
              <p className={`text-xs ${theme.textMuted}`}>
                Passez un prospect en « Négociation » ou « Gagné » pour éditer sa Facture Proforma PDF et son ordre de virement RIB en 1 clic.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200/60 dark:divide-white/10">
              {billableLeads.map((lead) => {
                const ref = ensureInvoiceRef(lead);
                const totals = getLeadTotals(lead);
                const st = INVOICE_STATUS_LABELS[lead.invoiceStatus || "none"];
                return (
                  <div
                    key={lead.id}
                    className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-black text-indigo-600 dark:text-amber-300">
                          {ref}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${st.pill}`}>
                          {st.label}
                        </span>
                        {lead.stage === "negociation" && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                            En closing
                          </span>
                        )}
                      </div>
                      <h4 className={`text-sm font-black ${theme.textMain}`}>
                        {lead.name} — <span className="font-semibold">{lead.planLabel}</span>
                      </h4>
                      <p className={`text-xs ${theme.textMuted}`}>
                        👤 {lead.contact} · Total :{" "}
                        <strong className="font-mono text-emerald-600 dark:text-emerald-300">
                          {totals.commissionBase.toLocaleString("fr-FR")} €
                        </strong>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={lead.invoiceStatus || "none"}
                        onChange={(e) => {
                          const nextStatus = e.target.value as InvoiceStatus;
                          onUpdateLead({
                            ...lead,
                            invoiceRef: ref,
                            invoiceStatus: nextStatus,
                          });
                          if (nextStatus === "paid_full" && isDirector && onUnlockCommission) {
                            onUnlockCommission(lead.id);
                          }
                          onSound?.();
                        }}
                        className={`rounded-xl px-3 py-2 text-xs font-bold border ${theme.inputBg}`}
                      >
                        <option value="none">Statut : Non émise</option>
                        <option value="quote_sent">📄 Devis envoyé</option>
                        <option value="pending_transfer">⏳ Attente virement RIB</option>
                        <option value="deposit_paid">💳 Acompte reçu</option>
                        <option value="paid_full">✅ Soldée intégralement</option>
                      </select>

                      <button
                        onClick={() => copyRibMessage(lead)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold ${theme.subCard} ${theme.textMain}`}
                      >
                        {copiedId === lead.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" /> RIB Copié !
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copier Message RIB
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => generateInvoicePdf(lead)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-extrabold shadow-sm hover:brightness-110"
                      >
                        <Download className="w-3.5 h-3.5" /> Facture PDF
                      </button>

                      {isDirector &&
                        lead.stage === "won" &&
                        lead.commissionStatus !== "unlocked" &&
                        onUnlockCommission && (
                          <button
                            onClick={() => onUnlockCommission(lead.id)}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-500 text-white text-xs font-extrabold shadow-sm"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Débloquer Comm.
                          </button>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
