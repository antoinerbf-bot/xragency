import { useState, useMemo } from "react";
import {
  Wrench,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  DollarSign,
  Building2,
  Mail,
  Phone,
  Sparkles,
  Shield,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CrmProviderRecord } from "@/lib/crm-store";

interface CrmProvidersTabProps {
  providers: CrmProviderRecord[];
  isAdmin: boolean;
  onCreateProvider: (provider: {
    name: string;
    company?: string;
    email: string;
    phone: string;
    specialties: string[];
    hourlyRateEur: number;
    notes?: string;
  }) => Promise<void>;
}

export function CrmProvidersTab({
  providers,
  isAdmin,
  onCreateProvider,
}: CrmProvidersTabProps) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(providers[0]?.id || null);

  // Form state
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialties, setSpecialties] = useState("Développement Web, React 19");
  const [rate, setRate] = useState(65);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.company && p.company.toLowerCase().includes(search.toLowerCase())) ||
        p.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      return matchSearch;
    });
  }, [providers, search]);

  const selectedProvider = useMemo(
    () => providers.find((p) => p.id === selectedProviderId) || filteredProviders[0],
    [providers, selectedProviderId, filteredProviders]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSaving(true);
    try {
      await onCreateProvider({
        name: name.trim(),
        company: company.trim() || undefined,
        email: email.trim(),
        phone: phone.trim(),
        specialties: specialties.split(",").map((s) => s.trim()).filter(Boolean),
        hourlyRateEur: Number(rate) || 60,
        notes,
      });
      setShowModal(false);
      setName("");
      setEmail("");
      setCompany("");
      setNotes("");
    } finally {
      setSaving(false);
    }
  };

  const totalPaidOut = providers.reduce((s, p) => s + (p.totalPaidEur || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl">
          <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8]">Partenaires Actifs</span>
          <p className="mt-2 text-3xl font-extrabold text-white font-serif">{providers.length}</p>
          <span className="mt-1 block font-mono text-[10px] text-emerald-400">Réseau d'experts certifiés XR</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl">
          <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">Coûts Sous-Traitance Versés</span>
          <p className="mt-2 text-3xl font-extrabold text-[#d4af37] font-serif">
            {totalPaidOut.toLocaleString("fr-FR")} €
          </p>
          <span className="mt-1 block font-mono text-[10px] text-[#94a3b8]">Total des missions rémunérées</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8]">Nouveau Prestataire</span>
            <p className="mt-1 text-xs text-[#cbd5e1]">Ajouter un profil freelance ou studio</p>
          </div>
          {isAdmin && (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#d4af37] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-white transition shadow-lg"
            >
              <Plus className="h-4 w-4" />
              <span>Ajouter</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0a0d14]/90 p-3.5 backdrop-blur-xl">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Rechercher par nom, spécialité (3D, Copywriting, React...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-xs text-white placeholder-[#64748b] focus:border-[#d4af37] focus:outline-none"
          />
        </div>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredProviders.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#080a10] p-8 text-center text-[#94a3b8]">
              Aucun prestataire enregistré.
            </div>
          ) : (
            filteredProviders.map((prov) => {
              const isSelected = selectedProvider?.id === prov.id;
              return (
                <div
                  key={prov.id}
                  onClick={() => setSelectedProviderId(prov.id)}
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
                        <Wrench className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white tracking-tight">{prov.name}</h4>
                        <p className="text-[11px] text-[#94a3b8]">{prov.company || "Indépendant"}</p>
                      </div>
                    </div>

                    <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-400 px-2.5 py-0.5 font-mono text-[9px] font-bold">
                      {prov.availability}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-[#94a3b8] font-mono">
                    <span>{prov.specialties.slice(0, 2).join(", ")}</span>
                    <span className="font-bold text-[#d4af37]">{prov.hourlyRateEur} € / h</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail Dossier */}
        <div className="lg:col-span-7">
          {selectedProvider ? (
            <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c0e14]/90 via-[#07090e]/90 to-[#030406]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                    FICHE PARTENAIRE SOUS-TRAITANCE
                  </span>
                  <h3 className="text-2xl font-black text-white font-serif mt-1">{selectedProvider.name}</h3>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    Structure : <span className="text-white font-semibold">{selectedProvider.company || "Indépendant"}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-mono text-[10px] uppercase text-[#94a3b8] block">Tarif Négocié</span>
                  <span className="font-serif text-2xl font-black text-[#d4af37]">
                    {selectedProvider.hourlyRateEur} € / h
                  </span>
                </div>
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 space-y-2">
                  <div className="flex items-center gap-2 text-[#94a3b8]">
                    <Mail className="h-3.5 w-3.5 text-[#d4af37]" />
                    <a href={`mailto:${selectedProvider.email}`} className="text-white hover:underline truncate">
                      {selectedProvider.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[#94a3b8]">
                    <Phone className="h-3.5 w-3.5 text-[#d4af37]" />
                    <a href={`tel:${selectedProvider.phone}`} className="text-white hover:underline">
                      {selectedProvider.phone || "Non renseigné"}
                    </a>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 space-y-2 font-mono">
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>Missions Réalisées</span>
                    <span className="text-white font-bold">{selectedProvider.missionsCount}</span>
                  </div>
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>Total Rémunéré</span>
                    <span className="text-emerald-400 font-bold">{selectedProvider.totalPaidEur.toLocaleString("fr-FR")} €</span>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37] block">
                  Compétences & Domaines d'Intervention
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProvider.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProvider.notes && (
                <div className="space-y-1 border-t border-white/10 pt-4 text-xs text-[#94a3b8]">
                  <span className="font-mono uppercase text-[10px] text-[#94a3b8] block">Notes d'évaluation</span>
                  <p className="whitespace-pre-wrap">{selectedProvider.notes}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-[#080a10] p-12 text-center text-[#94a3b8]">
              Sélectionnez un sous-traitant pour consulter sa fiche.
            </div>
          )}
        </div>
      </div>

      {/* Modal Créer Nouveau Prestataire */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-white/20 bg-[#0c0e14] p-6 sm:p-8 shadow-2xl text-white space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-serif">Nouveau Prestataire / Sous-traitant</h3>
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
                  <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Nom Complet *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ex. Alexandre Dumas"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Société / Studio</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Studio Vertex, Freelance..."
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
                    placeholder="contact@studio.com"
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
                <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Spécialités (séparées par virgules)</label>
                <input
                  type="text"
                  value={specialties}
                  onChange={(e) => setSpecialties(e.target.value)}
                  placeholder="Three.js, GLSL, Copywriting de Luxe..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Taux Horaire (€ / h)</label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Notes d'évaluation</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Expérience, disponibilité..."
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
                  {saving ? "Enregistrement..." : "Ajouter le partenaire"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
