import { useState, useMemo } from "react";
import {
  Building2,
  Mail,
  Phone,
  Globe,
  Plus,
  Search,
  CheckCircle2,
  DollarSign,
  Shield,
  Star,
  ExternalLink,
  Briefcase,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CrmClientRecord } from "@/lib/crm-store";

interface CrmClientsTabProps {
  clients: CrmClientRecord[];
  isAdmin: boolean;
  onCreateClient: (client: {
    company: string;
    contactName: string;
    email: string;
    phone: string;
    website?: string;
    city: string;
    sector: string;
    servicesPurchased: string[];
    totalRevenueEur: number;
    internalNotes?: string;
  }) => Promise<void>;
  onSelectClient?: (client: CrmClientRecord) => void;
  onOpenNewQuoteForClient?: (client: CrmClientRecord) => void;
  onOpenNewProjectForClient?: (client: CrmClientRecord) => void;
}

export function CrmClientsTab({
  clients,
  isAdmin,
  onCreateClient,
  onOpenNewQuoteForClient,
  onOpenNewProjectForClient,
}: CrmClientsTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(clients[0]?.id || null);

  // Form state
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [city, setCity] = useState("Paris");
  const [sector, setSector] = useState("Commerce / PME");
  const [services, setServices] = useState("Site Vitrine Pro (499 €)");
  const [revenue, setRevenue] = useState(499);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchSearch =
        !search ||
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.contactName.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [clients, search, statusFilter]);

  const selectedClient = useMemo(
    () => clients.find((c) => c.id === selectedClientId) || filteredClients[0],
    [clients, selectedClientId, filteredClients]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !email.trim()) return;
    setSaving(true);
    try {
      await onCreateClient({
        company: company.trim(),
        contactName: contactName.trim() || "Direction",
        email: email.trim(),
        phone: phone.trim(),
        website: website.trim() || undefined,
        city: city.trim(),
        sector: sector.trim(),
        servicesPurchased: services.split(",").map((s) => s.trim()).filter(Boolean),
        totalRevenueEur: Number(revenue) || 0,
        internalNotes: notes.trim(),
      });
      setShowModal(false);
      setCompany("");
      setEmail("");
      setPhone("");
      setNotes("");
    } finally {
      setSaving(false);
    }
  };

  const totalClientsRevenue = clients.reduce((sum, c) => sum + (c.totalRevenueEur || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl">
          <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8]">Clients Actifs</span>
          <p className="mt-2 text-3xl font-extrabold text-white font-serif">{clients.length}</p>
          <span className="mt-1 block font-mono text-[10px] text-emerald-400">
            {clients.filter((c) => c.status === "vip").length} comptes VIP
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl">
          <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">Chiffre d'Affaires Encaissé</span>
          <p className="mt-2 text-3xl font-extrabold text-[#d4af37] font-serif">
            {totalClientsRevenue.toLocaleString("fr-FR")} €
          </p>
          <span className="mt-1 block font-mono text-[10px] text-[#94a3b8]">Cumul des contrats validés</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8]">Nouveau Client</span>
            <p className="mt-1 text-xs text-[#cbd5e1]">Ajouter manuellement un compte validé</p>
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
            placeholder="Rechercher par entreprise, contact, ville ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-xs text-white placeholder-[#64748b] focus:border-[#d4af37] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {["all", "active", "vip", "archived"].map((st) => (
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

      {/* Main Split Layout: Directory List + Client Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List Column */}
        <div className="lg:col-span-5 space-y-3">
          {filteredClients.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#080a10] p-8 text-center text-[#94a3b8]">
              Aucun client ne correspond aux critères.
            </div>
          ) : (
            filteredClients.map((client) => {
              const isSelected = selectedClient?.id === client.id;
              return (
                <div
                  key={client.id}
                  onClick={() => setSelectedClientId(client.id)}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 transition-all backdrop-blur-xl",
                    isSelected
                      ? "border-[#d4af37] bg-white/[0.07] shadow-[0_0_25px_rgba(212,175,55,0.15)]"
                      : "border-white/10 bg-[#080a10]/70 hover:border-white/20 hover:bg-white/[0.03]"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white tracking-tight">{client.company}</h4>
                        <p className="text-[11px] text-[#94a3b8]">{client.contactName} · {client.city}</p>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase border",
                        client.status === "vip"
                          ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                          : "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
                      )}
                    >
                      {client.status}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-[#94a3b8] font-mono">
                    <span>{client.sector}</span>
                    <span className="font-bold text-[#d4af37]">{client.totalRevenueEur.toLocaleString("fr-FR")} €</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail Dossier */}
        <div className="lg:col-span-7">
          {selectedClient ? (
            <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c0e14]/90 via-[#07090e]/90 to-[#030406]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
              {/* Dossier Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                      FICHE CLIENT · {selectedClient.id}
                    </span>
                    {selectedClient.status === "vip" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 text-amber-300 px-2 py-0.5 text-[9px] font-mono font-bold">
                        <Star className="h-3 w-3 fill-current" /> VIP
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
                    {selectedClient.company}
                  </h3>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    Contact référent : <span className="text-white font-semibold">{selectedClient.contactName}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-mono text-[10px] uppercase text-[#94a3b8] block">Valeur Compte</span>
                  <span className="font-serif text-2xl font-black text-[#d4af37]">
                    {selectedClient.totalRevenueEur.toLocaleString("fr-FR")} €
                  </span>
                </div>
              </div>

              {/* Coordinates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#94a3b8]">
                    <Mail className="h-3.5 w-3.5 text-[#d4af37]" />
                    <a href={`mailto:${selectedClient.email}`} className="text-white hover:underline truncate">
                      {selectedClient.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[#94a3b8]">
                    <Phone className="h-3.5 w-3.5 text-[#d4af37]" />
                    <a href={`tel:${selectedClient.phone}`} className="text-white hover:underline">
                      {selectedClient.phone || "Non renseigné"}
                    </a>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#94a3b8]">
                    <Building2 className="h-3.5 w-3.5 text-[#d4af37]" />
                    <span className="text-white">{selectedClient.city}, {selectedClient.country}</span>
                  </div>
                  {selectedClient.website && (
                    <div className="flex items-center gap-2 text-[#94a3b8]">
                      <Globe className="h-3.5 w-3.5 text-[#d4af37]" />
                      <a href={selectedClient.website} target="_blank" rel="noreferrer" className="text-[#d4af37] hover:underline inline-flex items-center gap-1">
                        <span>{selectedClient.website.replace(/^https?:\/\//, "")}</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Services & Packages Acquired */}
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37] block">
                  Prestations & Forfaits Actifs
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedClient.servicesPurchased.map((svc, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#d4af37]" />
                      <span>{svc}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Internal Notes */}
              {selectedClient.internalNotes && (
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8] block">
                    Notes & Historique
                  </span>
                  <p className="rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-[#cbd5e1] leading-relaxed whitespace-pre-wrap">
                    {selectedClient.internalNotes}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                {onOpenNewQuoteForClient && (
                  <button
                    type="button"
                    onClick={() => onOpenNewQuoteForClient(selectedClient)}
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2.5 text-xs font-bold text-white transition"
                  >
                    <FileText className="h-3.5 w-3.5 text-[#d4af37]" />
                    <span>Créer un Devis</span>
                  </button>
                )}

                {onOpenNewProjectForClient && (
                  <button
                    type="button"
                    onClick={() => onOpenNewProjectForClient(selectedClient)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#d4af37] hover:bg-white text-black px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition"
                  >
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>Ouvrir un Projet de Production</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-[#080a10] p-12 text-center text-[#94a3b8]">
              Sélectionnez un client dans la liste pour afficher son dossier complet.
            </div>
          )}
        </div>
      </div>

      {/* Modal Créer Nouveau Client */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-white/20 bg-[#0c0e14] p-6 sm:p-8 shadow-2xl text-white space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-serif">Nouveau Compte Client</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-[#94a3b8] hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Entreprise *</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="ex. Maison Joaillerie Lumière"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Contact Référent</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="ex. Julie Mercier"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Ville</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Paris, Bordeaux, Da Nang..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Email Pro *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@entreprise.fr"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Téléphone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Prestations Achetées</label>
                <input
                  type="text"
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                  placeholder="Site Business (799 €), SEO Starter (299 €/m)..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Montant Total Encaissé (€)</label>
                  <input
                    type="number"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Site Internet</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Notes internes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contexte, attentes particulières, accès..."
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
                  disabled={saving}
                  className="rounded-xl bg-[#d4af37] px-5 py-2 text-xs font-bold text-black uppercase tracking-wider hover:bg-white transition"
                >
                  {saving ? "Enregistrement..." : "Créer le client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
