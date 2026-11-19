import { useState, useMemo } from "react";
import {
  CreditCard,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CrmInvoiceRecord } from "@/lib/crm-store";

interface CrmInvoicesTabProps {
  invoices: CrmInvoiceRecord[];
  isAdmin: boolean;
  onValidatePayment: (invoiceId: string) => Promise<void>;
}

export function CrmInvoicesTab({
  invoices,
  isAdmin,
  onValidatePayment,
}: CrmInvoicesTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(invoices[0]?.id || null);
  const [validatingId, setValidatingId] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((i) => {
      const matchSearch =
        !search ||
        i.id.toLowerCase().includes(search.toLowerCase()) ||
        i.paymentReference.toLowerCase().includes(search.toLowerCase()) ||
        i.clientCompany.toLowerCase().includes(search.toLowerCase()) ||
        i.clientName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || i.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [invoices, search, statusFilter]);

  const selectedInvoice = useMemo(
    () => invoices.find((i) => i.id === selectedInvoiceId) || filteredInvoices[0],
    [invoices, selectedInvoiceId, filteredInvoices]
  );

  const handleValidate = async (invoiceId: string) => {
    if (!isAdmin) return;
    setValidatingId(invoiceId);
    try {
      await onValidatePayment(invoiceId);
    } finally {
      setValidatingId(null);
    }
  };

  const copyPaymentRef = (ref: string) => {
    void navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const totalPaid = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.totalEur, 0);
  const totalPending = invoices.filter((i) => i.status === "pending_transfer").reduce((s, i) => s + i.totalEur, 0);

  const exportAccountingCsv = () => {
    const headers = [
      "Numéro Facture",
      "Date d'émission",
      "Entreprise",
      "Contact",
      "Email",
      "Statut",
      "Montant Total EUR",
      "Référence Virement",
      "Bénéficiaire",
      "IBAN",
      "BIC",
      "Détail des Prestations",
    ];

    const rows = invoices.map((inv) => {
      const itemsDetail = (inv.items || []).map((it) => `${it.label} (${it.amountEur}€)`).join(" + ");
      return [
        `"${inv.id}"`,
        `"${new Date(inv.createdAt).toLocaleDateString("fr-FR")}"`,
        `"${(inv.clientCompany || "").replace(/"/g, '""')}"`,
        `"${(inv.clientName || "").replace(/"/g, '""')}"`,
        `"${inv.clientEmail || ""}"`,
        `"${inv.status === "paid" ? "Encaissé / Réglé" : inv.status === "pending_transfer" ? "En attente virement" : "Annulé"}"`,
        inv.totalEur,
        `"${inv.paymentReference}"`,
        `"${inv.bankDetails?.beneficiary || "Entité contractante à confirmer"}"`,
        `"${inv.bankDetails?.ibanMasked || ""}"`,
        `"${inv.bankDetails?.bic || ""}"`,
        `"${itemsDetail.replace(/"/g, '""')}"`,
      ];
    });

    const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `export-comptable-xr-agency-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl">
          <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">Total Encaissé Validé</span>
          <p className="mt-2 text-3xl font-extrabold text-emerald-400 font-serif">
            {totalPaid.toLocaleString("fr-FR")} €
          </p>
          <span className="mt-1 block font-mono text-[10px] text-[#94a3b8]">
            {invoices.filter((i) => i.status === "paid").length} factures réglées
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl">
          <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">En Attente de Virement</span>
          <p className="mt-2 text-3xl font-extrabold text-[#d4af37] font-serif">
            {totalPending.toLocaleString("fr-FR")} €
          </p>
          <span className="mt-1 block font-mono text-[10px] text-[#94a3b8]">
            {invoices.filter((i) => i.status === "pending_transfer").length} ordres en cours
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl flex flex-col justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8]">Protocole Virement</span>
          <div className="mt-1 flex items-center gap-2 text-xs text-[#cbd5e1]">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Validation manuelle par la Direction obligatoire avant lancement de production</span>
          </div>
        </div>
      </div>

      {/* ── SUIVI DES ABONNEMENTS MENSUELS RÉCURRENTS (MRR & COMMISSIONS 10%/MOIS) ── */}
      <div className="rounded-3xl border border-sky-400/30 bg-[#0c101c] p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-sky-500/20 text-sky-300">
              <Clock className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">🔄 Abonnements Mensuels Récurrents & MRR</h3>
              <p className="text-[11px] text-white/60">
                Suivi des échéances mensuelles (Webcare, Community Management, SEO) · Commission closer : 10 % par mois
              </p>
            </div>
          </div>
          <span className="rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 font-mono text-[10px] font-bold text-sky-300">
            COORDONNÉES BANCAIRES : À CONFIGURER
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              client: "Villa Azur Palace",
              service: "Webcare & Maintenance Pro",
              amount: 199,
              closerComm: 19.9,
              nextDue: "5 Décembre 2026",
              status: "active",
            },
            {
              client: "Le Comptoir Gourmand",
              service: "Community Management (Reels + Posts)",
              amount: 499,
              closerComm: 49.9,
              nextDue: "1er Décembre 2026",
              status: "active",
            },
            {
              client: "Cabinet Haussmann Avocats",
              service: "SEO & Référencement Mensuel",
              amount: 349,
              closerComm: 34.9,
              nextDue: "10 Décembre 2026",
              status: "active",
            },
          ].map((sub) => (
            <div
              key={sub.client}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-4 transition hover:border-sky-400/30"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{sub.client}</span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-300">
                    Actif ✓
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-white/70">{sub.service}</p>
                <div className="mt-2 flex items-baseline justify-between border-t border-white/5 pt-2">
                  <span className="font-mono text-sm font-black text-white">{sub.amount} € / mois</span>
                  <span className="font-mono text-[10px] text-emerald-400 font-bold">
                    +{sub.closerComm} € / m closer (10%)
                  </span>
                </div>
                <p className="mt-1 font-mono text-[10px] text-white/50">Prochaine échéance : {sub.nextDue}</p>
              </div>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Bonjour ${sub.client}, voici le rappel pour le renouvellement mensuel de votre abonnement ${sub.service} (${sub.amount} € TTC).\nLes coordonnées bancaires officielles figurent sur votre facture validée par la Direction.\nMerci pour votre confiance, l'équipe XR Agency.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 py-1.5 text-[10px] font-bold text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <span>Relancer par WhatsApp</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0a0d14]/90 p-3.5 backdrop-blur-xl">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Rechercher par référence, n° facture ou entreprise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-xs text-white placeholder-[#64748b] focus:border-[#d4af37] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {["all", "pending_transfer", "paid", "cancelled"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={cn(
                "rounded-xl px-3 py-1.5 font-mono text-[10px] font-bold uppercase transition",
                statusFilter === st
                  ? "bg-[#d4af37] text-black"
                  : "bg-white/5 text-[#94a3b8] hover:bg-white/10 hover:text-white"
              )}
            >
              {st === "all" ? "Tous" : st === "pending_transfer" ? "En attente" : st === "paid" ? "Payé" : "Annulé"}
            </button>
          ))}

          {isAdmin && (
            <button
              type="button"
              onClick={exportAccountingCsv}
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-emerald-300 transition hover:bg-emerald-500/25"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV Comptable
            </button>
          )}
        </div>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredInvoices.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#080a10] p-8 text-center text-[#94a3b8]">
              Aucun document comptable trouvé.
            </div>
          ) : (
            filteredInvoices.map((inv) => {
              const isSelected = selectedInvoice?.id === inv.id;
              const isPending = inv.status === "pending_transfer";
              return (
                <div
                  key={inv.id}
                  onClick={() => setSelectedInvoiceId(inv.id)}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 transition-all backdrop-blur-xl",
                    isSelected
                      ? "border-[#d4af37] bg-white/[0.07] shadow-[0_0_25px_rgba(212,175,55,0.15)]"
                      : "border-white/10 bg-[#080a10]/70 hover:border-white/20 hover:bg-white/[0.03]"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white">{inv.id}</span>
                        <span className="font-mono text-[9px] text-[#d4af37] bg-[#d4af37]/10 px-1.5 py-0.5 rounded border border-[#d4af37]/30">
                          {inv.paymentReference}
                        </span>
                      </div>
                      <h4 className="mt-1 font-bold text-sm text-white tracking-tight">{inv.clientCompany}</h4>
                      <p className="text-[11px] text-[#94a3b8]">{inv.clientName}</p>
                    </div>

                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase border",
                        inv.status === "paid"
                          ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
                          : isPending
                            ? "border-amber-400/40 bg-amber-400/10 text-amber-300 animate-pulse"
                            : "border-red-400/30 bg-red-400/10 text-red-400"
                      )}
                    >
                      {inv.status === "paid" ? "Payé" : isPending ? "En attente" : inv.status}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] font-mono">
                    <span className="text-[#94a3b8]">{inv.items.length} prestation(s)</span>
                    <span className="font-bold text-lg text-white">{inv.totalEur.toLocaleString("fr-FR")} €</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail / Reconciliation Card */}
        <div className="lg:col-span-7">
          {selectedInvoice ? (
            <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c0e14]/90 via-[#07090e]/90 to-[#030406]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="font-mono text-xs font-bold text-[#d4af37] tracking-widest block">
                    BORDEREAU DE PAIEMENT & FACTURATION
                  </span>
                  <h3 className="text-2xl font-black text-white font-mono mt-1">{selectedInvoice.id}</h3>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    Échéance : {selectedInvoice.dueDate.slice(0, 10)} · Créé le {selectedInvoice.createdAt.slice(0, 10)}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-mono text-[10px] uppercase text-[#94a3b8] block">Montant Facturé</span>
                  <span className="font-serif text-3xl font-black text-white">
                    {selectedInvoice.totalEur.toLocaleString("fr-FR")} €
                  </span>
                </div>
              </div>

              {/* Status and Reconciliation Alert */}
              {selectedInvoice.status === "pending_transfer" ? (
                <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase font-mono tracking-wider">
                    <Clock className="h-4 w-4" />
                    <span>En attente de réception sur le compte bancaire</span>
                  </div>
                  <p className="text-xs text-[#e2e8f0]">
                    Le client doit émettre un virement avec le libellé ci-dessous. Dès réception sur votre relevé bancaire professionnel, cliquez sur le bouton de validation.
                  </p>

                  <div className="flex items-center justify-between bg-black/50 p-3 rounded-xl border border-white/10">
                    <div className="font-mono text-xs">
                      <span className="text-[#94a3b8] block text-[9px] uppercase">Référence à rapprocher</span>
                      <span className="text-[#d4af37] font-bold text-sm tracking-wider">{selectedInvoice.paymentReference}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyPaymentRef(selectedInvoice.paymentReference)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs text-white transition font-mono"
                    >
                      {copiedRef ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedRef ? "Copié !" : "Copier"}</span>
                    </button>
                  </div>

                  {isAdmin && (
                    <div className="pt-2">
                      <button
                        type="button"
                        disabled={validatingId === selectedInvoice.id}
                        onClick={() => handleValidate(selectedInvoice.id)}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black hover:opacity-95 transition shadow-lg"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        <span>
                          {validatingId === selectedInvoice.id
                            ? "Validation en cours..."
                            : "Valider la réception des fonds (Admin Direction)"}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 flex items-center justify-between text-xs text-emerald-300 font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Fonds reçus et validés le {selectedInvoice.paidAt?.slice(0, 10)}</span>
                  </div>
                  <span className="text-[10px] text-[#94a3b8]">Réf: {selectedInvoice.paymentReference}</span>
                </div>
              )}

              {/* Bank Details Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3 text-xs">
                <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37] block">
                  Instructions & Coordonnées Bancaires
                </span>
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div>
                    <span className="text-[#94a3b8] block text-[10px]">Bénéficiaire</span>
                    <span className="text-white font-semibold">{selectedInvoice.bankDetails.beneficiary}</span>
                  </div>
                  <div>
                    <span className="text-[#94a3b8] block text-[10px]">Établissement</span>
                    <span className="text-white font-semibold">{selectedInvoice.bankDetails.bankName}</span>
                  </div>
                  <div>
                    <span className="text-[#94a3b8] block text-[10px]">IBAN (Compte Professionnel)</span>
                    <span className="text-white font-semibold">{selectedInvoice.bankDetails.ibanMasked}</span>
                  </div>
                  <div>
                    <span className="text-[#94a3b8] block text-[10px]">Code BIC / SWIFT</span>
                    <span className="text-white font-semibold">{selectedInvoice.bankDetails.bic}</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#94a3b8] italic pt-1 border-t border-white/5">
                  {selectedInvoice.bankDetails.instructions}
                </p>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8] block">
                  Détail de la Facture
                </span>
                <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-[#080a10]/60 overflow-hidden text-xs">
                  {selectedInvoice.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white">{item.label}</p>
                        <p className="text-[11px] text-[#94a3b8]">{item.detail}</p>
                      </div>
                      <span className="font-mono font-bold text-white">{item.amountEur.toLocaleString("fr-FR")} €</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-[#94a3b8] font-mono text-right">{selectedInvoice.taxNotice}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-[#080a10] p-12 text-center text-[#94a3b8]">
              Sélectionnez une facture pour afficher les instructions de paiement.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

[executed on device: MacBook-Air-de-rousseau.local (0e45da18-76cf-43a9-8d87-a4dcd1ea626d)]