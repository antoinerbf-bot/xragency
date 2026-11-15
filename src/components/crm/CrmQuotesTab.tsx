import { useState, useMemo } from "react";
import {
  FileText,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  DollarSign,
  Download,
  Building2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CrmQuoteRecord, QuoteItem } from "@/lib/crm-store";
import { CHECKOUT_PRODUCTS } from "@/lib/checkout-catalog";

interface CrmQuotesTabProps {
  quotes: CrmQuoteRecord[];
  isAdmin: boolean;
  onCreateQuote: (quote: {
    clientCompany: string;
    clientName: string;
    clientEmail: string;
    items: QuoteItem[];
    paymentTerms?: string;
    notes?: string;
  }) => Promise<void>;
  onUpdateQuoteStatus: (quoteId: string, status: CrmQuoteRecord["status"]) => Promise<void>;
}

export function CrmQuotesTab({
  quotes,
  isAdmin,
  onCreateQuote,
  onUpdateQuoteStatus,
}: CrmQuotesTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(quotes[0]?.id || null);

  // New quote state
  const [clientCompany, setClientCompany] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [selectedProductKey, setSelectedProductKey] = useState<string>("website_showcase");
  const [items, setItems] = useState<QuoteItem[]>([
    { label: "Site Vitrine Pro", detail: "Livraison 7 jours ouvrés · Code propriétaire", priceEur: 499, period: "once", quantity: 1 },
  ]);
  const [paymentTerms, setPaymentTerms] = useState("Virement bancaire professionnel à la commande.");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      const matchSearch =
        !search ||
        q.id.toLowerCase().includes(search.toLowerCase()) ||
        q.clientCompany.toLowerCase().includes(search.toLowerCase()) ||
        q.clientName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || q.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [quotes, search, statusFilter]);

  const selectedQuote = useMemo(
    () => quotes.find((q) => q.id === selectedQuoteId) || filteredQuotes[0],
    [quotes, selectedQuoteId, filteredQuotes]
  );

  const handleAddProduct = () => {
    const prod = CHECKOUT_PRODUCTS[selectedProductKey as keyof typeof CHECKOUT_PRODUCTS];
    if (!prod) return;
    setItems((prev) => [
      ...prev,
      { label: prod.label, detail: "Prestation standard officielle XR Agency", priceEur: prod.amountEur, period: prod.interval, quantity: 1 },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientCompany.trim() || !clientEmail.trim() || !items.length) return;
    setSaving(true);
    try {
      await onCreateQuote({
        clientCompany: clientCompany.trim(),
        clientName: clientName.trim() || clientCompany.trim(),
        clientEmail: clientEmail.trim(),
        items,
        paymentTerms,
        notes,
      });
      setShowModal(false);
      setClientCompany("");
      setClientName("");
      setClientEmail("");
      setNotes("");
    } finally {
      setSaving(false);
    }
  };

  const totalVolume = quotes.reduce((sum, q) => sum + q.totalOnceEur + q.totalMonthlyEur, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl">
          <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8]">Volume Devis Émis</span>
          <p className="mt-2 text-3xl font-extrabold text-[#d4af37] font-serif">
            {totalVolume.toLocaleString("fr-FR")} €
          </p>
          <span className="mt-1 block font-mono text-[10px] text-[#94a3b8]">{quotes.length} devis enregistrés</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl">
          <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">Devis Acceptés</span>
          <p className="mt-2 text-3xl font-extrabold text-emerald-400 font-serif">
            {quotes.filter((q) => q.status === "accepted").length}
          </p>
          <span className="mt-1 block font-mono text-[10px] text-[#94a3b8]">Contrats confirmés</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8]">Nouveau Devis</span>
            <p className="mt-1 text-xs text-[#cbd5e1]">Émettre un devis contractuel</p>
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#d4af37] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-white transition shadow-lg"
          >
            <Plus className="h-4 w-4" />
            <span>Créer</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0a0d14]/90 p-3.5 backdrop-blur-xl">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Rechercher par référence, entreprise ou contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-xs text-white placeholder-[#64748b] focus:border-[#d4af37] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {["all", "sent", "accepted", "rejected", "draft"].map((st) => (
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
              {st === "all" ? "Tous" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Split Layout: List + Quote Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredQuotes.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#080a10] p-8 text-center text-[#94a3b8]">
              Aucun devis trouvé.
            </div>
          ) : (
            filteredQuotes.map((quote) => {
              const isSelected = selectedQuote?.id === quote.id;
              const total = quote.totalOnceEur + quote.totalMonthlyEur;
              return (
                <div
                  key={quote.id}
                  onClick={() => setSelectedQuoteId(quote.id)}
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
                        <span className="font-mono text-xs font-bold text-[#d4af37]">{quote.id}</span>
                        <span className="text-[10px] text-[#94a3b8] font-mono">
                          {quote.createdAt.slice(0, 10)}
                        </span>
                      </div>
                      <h4 className="mt-1 font-bold text-sm text-white tracking-tight">{quote.clientCompany}</h4>
                      <p className="text-[11px] text-[#94a3b8]">{quote.clientName}</p>
                    </div>

                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase border",
                        quote.status === "accepted"
                          ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
                          : quote.status === "sent"
                            ? "border-blue-400/40 bg-blue-400/10 text-blue-300"
                            : quote.status === "rejected"
                              ? "border-red-400/40 bg-red-400/10 text-red-400"
                              : "border-white/20 bg-white/5 text-[#94a3b8]"
                      )}
                    >
                      {quote.status}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] font-mono">
                    <span className="text-[#94a3b8]">{quote.items.length} prestation(s)</span>
                    <span className="font-bold text-[#d4af37]">{total.toLocaleString("fr-FR")} €</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail / Proforma Devis Display */}
        <div className="lg:col-span-7">
          {selectedQuote ? (
            <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c0e14]/90 via-[#07090e]/90 to-[#030406]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
              {/* Document Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="font-mono text-xs font-bold text-[#d4af37] tracking-widest block">
                    DEVIS OFFICIEL XR AGENCY
                  </span>
                  <h3 className="text-2xl font-black text-white font-mono mt-1">{selectedQuote.id}</h3>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    Émis le {selectedQuote.createdAt.slice(0, 10)} · Valable jusqu'au {selectedQuote.validUntil.slice(0, 10)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {selectedQuote.status !== "accepted" && (
                    <button
                      type="button"
                      onClick={() => onUpdateQuoteStatus(selectedQuote.id, "accepted")}
                      className="rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 px-3 py-1.5 text-xs font-bold text-emerald-400 transition"
                    >
                      Marquer Accepté
                    </button>
                  )}
                  {selectedQuote.status !== "rejected" && selectedQuote.status !== "accepted" && (
                    <button
                      type="button"
                      onClick={() => onUpdateQuoteStatus(selectedQuote.id, "rejected")}
                      className="rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 px-3 py-1.5 text-xs font-bold text-red-400 transition"
                    >
                      Refusé
                    </button>
                  )}
                </div>
              </div>

              {/* Client Info */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs space-y-1">
                <span className="font-mono text-[10px] text-[#94a3b8] uppercase">Destinataire</span>
                <p className="text-sm font-bold text-white">{selectedQuote.clientCompany}</p>
                <p className="text-[#cbd5e1]">{selectedQuote.clientName} · {selectedQuote.clientEmail}</p>
              </div>

              {/* Items Table */}
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37] block">
                  Lignes de Prestations
                </span>
                <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#080a10]/60 overflow-hidden">
                  {selectedQuote.items.map((item, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between gap-4 text-xs">
                      <div>
                        <p className="font-bold text-white">{item.label}</p>
                        <p className="text-[11px] text-[#94a3b8] mt-0.5">{item.detail}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono font-bold text-white">
                          {(item.priceEur * (item.quantity || 1)).toLocaleString("fr-FR")} €
                        </span>
                        <span className="block text-[10px] text-[#94a3b8] font-mono">
                          {item.period === "month" ? "/ mois" : item.period === "year" ? "/ an" : "ponctuel"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals Summary */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-[#cbd5e1]">
                  <span>Total Ponctuel (HT/TTC selon statut)</span>
                  <span className="font-bold text-white">{selectedQuote.totalOnceEur.toLocaleString("fr-FR")} €</span>
                </div>
                {selectedQuote.totalMonthlyEur > 0 && (
                  <div className="flex justify-between text-[#cbd5e1]">
                    <span>Total Récurrent Mensuel</span>
                    <span className="font-bold text-[#d4af37]">{selectedQuote.totalMonthlyEur.toLocaleString("fr-FR")} € / mois</span>
                  </div>
                )}
                {selectedQuote.totalAnnualEur > 0 && (
                  <div className="flex justify-between text-[#cbd5e1]">
                    <span>Frais Annuels (Hébergement / Domaine)</span>
                    <span className="font-bold text-white">{selectedQuote.totalAnnualEur.toLocaleString("fr-FR")} € / an</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-bold text-white">
                  <span>Conditions de règlement</span>
                  <span className="text-[11px] text-[#94a3b8] font-sans text-right max-w-xs">{selectedQuote.paymentTerms}</span>
                </div>
              </div>

              {selectedQuote.notes && (
                <p className="text-xs text-[#94a3b8] italic">Note : {selectedQuote.notes}</p>
              )}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-[#080a10] p-12 text-center text-[#94a3b8]">
              Sélectionnez un devis pour afficher le récapitulatif formel.
            </div>
          )}
        </div>
      </div>

      {/* Modal Créer Nouveau Devis */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl border border-white/20 bg-[#0c0e14] p-6 sm:p-8 shadow-2xl text-white space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-serif">Créer un Devis Officiel</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-[#94a3b8] hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Entreprise Client *</label>
                  <input
                    type="text"
                    required
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="Nom de l'entreprise"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Contact</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Nom du responsable"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Email de Facturation *</label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="contact@client.fr"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              {/* Prestations Selector from Official Catalog */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                <span className="font-mono text-[10px] text-[#d4af37] uppercase font-bold block">
                  Catalogue Officiel XR Agency
                </span>
                <div className="flex gap-2">
                  <select
                    value={selectedProductKey}
                    onChange={(e) => setSelectedProductKey(e.target.value)}
                    className="flex-1 rounded-xl border border-white/10 bg-[#080a10] p-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                  >
                    {Object.entries(CHECKOUT_PRODUCTS).map(([k, prod]) => (
                      <option key={k} value={k}>
                        {prod.label} — {prod.amountEur} € ({prod.interval === "month" ? "/mois" : prod.interval === "year" ? "/an" : "unique"})
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddProduct}
                    className="rounded-xl bg-[#d4af37] px-3.5 py-2 text-xs font-bold text-black uppercase hover:bg-white transition"
                  >
                    Ajouter
                  </button>
                </div>

                {/* Added items list */}
                <div className="space-y-2 mt-3">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/5 text-xs">
                      <div>
                        <span className="font-semibold text-white">{item.label}</span>
                        <span className="block text-[10px] text-[#94a3b8]">{item.priceEur} € · {item.period}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="text-red-400 hover:text-red-300 font-mono text-xs px-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Conditions de règlement</label>
                <input
                  type="text"
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Notes internes / Remarques</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Spécifications particulières..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#94a3b8] hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving || !items.length}
                  className="rounded-xl bg-[#d4af37] px-5 py-2 text-xs font-bold text-black uppercase tracking-wider hover:bg-white transition disabled:opacity-50"
                >
                  {saving ? "Génération..." : "Émettre le devis"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
