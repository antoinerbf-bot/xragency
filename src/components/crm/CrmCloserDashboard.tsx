import { useState, useEffect } from "react";
import {
  Swords,
  PhoneCall,
  Coins,
  Trophy,
  Flame,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  LogOut,
  Volume2,
  VolumeX,
  Target,
  Clock,
  ThumbsUp,
  XCircle,
  HelpCircle,
  PartyPopper,
  Palette,
  ExternalLink,
  MapPin,
  Instagram,
  Facebook,
  Globe,
  Plus,
  Send,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CrmLead } from "@/routes/api/crm";
import {
  type MaquetteRequest,
  getSavedMaquettes,
  saveMaquettes,
  getSavedEgoStats,
  saveEgoStats,
} from "@/lib/crm-gamified-state";
import { CrmEgoLeaderboard } from "./CrmEgoLeaderboard";

interface CrmCloserDashboardProps {
  user: {
    fullName: string;
    email: string;
    commissionPct: number;
  };
  leads: CrmLead[];
  onLogout: () => void;
}

// Objections RPG Cards
const RPG_OBJECTIONS = [
  {
    id: "obj-1",
    monster: "Le Restaurateur Pressé",
    quote: "« 2 000 € pour votre logiciel caisse et vos robots ? C'est beaucoup trop cher ! »",
    difficulty: "Moyen · 150 XP",
    options: [
      {
        text: "« Vous avez raison, c'est un investissement important. » (Défensif)",
        correct: false,
        feedback: "Mauvaise réponse ! Vous validez sa peur sans recadrer la rentabilité.",
      },
      {
        text: "« Monsieur, sur 10 000 € de commandes Uber Eats par mois, vous perdez 3 000 € de commission chaque mois. Notre caisse est amortie en seulement 20 jours. Vous préférez continuer à donner 36 000 € par an aux plateformes ? » (Frappe Critique)",
        correct: true,
        feedback: "COUP CRITIQUE ! Le prospect comprend instantanément qu'il économise 36 000 € par an !",
      },
      {
        text: "« On peut vous faire une petite remise de 10% si vous signez aujourd'hui. » (Peur)",
        correct: false,
        feedback: "Erreur ! Ne bradez jamais le high-ticket. Démontrez le ROI avant tout.",
      },
    ],
  },
  {
    id: "obj-2",
    monster: "Le Gérant Méfiant",
    quote: "« J'ai déjà une vieille caisse enregistreuse qui marche, pourquoi changer ? »",
    difficulty: "Difficile · 200 XP",
    options: [
      {
        text: "« Parce que la vôtre est vieille et ringarde. » (Agressif)",
        correct: false,
        feedback: "Mauvaise réponse ! Ne froissez jamais le prospect.",
      },
      {
        text: "« Votre caisse actuelle ne synchronise ni vos stocks en direct, ni votre site de commande, ni vos livreurs. Avec notre système, vous gagnez 2h de gestion par jour et 0% de commission sur vos commandes en ligne. » (Impact Pro)",
        correct: true,
        feedback: "PARFAIT ! Vous touchez à la fois le gain de temps et l'augmentation des marges nettes.",
      },
    ],
  },
];

export function CrmCloserDashboard({ user, leads, onLogout }: CrmCloserDashboardProps) {
  const [activeTab, setActiveTab] = useState<"closing" | "maquettes" | "leaderboard" | "rpg">("closing");
  const [leadsFilter, setLeadsFilter] = useState<"en_cours" | "prospecte" | "maquette_demandee" | "signe">("en_cours");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(leads[0] || null);
  const [closedDeals, setClosedDeals] = useState<string[]>([]);
  const [prospecteLeads, setProspecteLeads] = useState<string[]>([]);
  const [commissionEarned, setCommissionEarned] = useState(5400);
  const [celebration, setCelebration] = useState<string | null>(null);

  // Maquettes State
  const [maquettes, setMaquettes] = useState<MaquetteRequest[]>(getSavedMaquettes());
  const [showMaquetteModal, setShowMaquetteModal] = useState(false);
  const [maquetteForm, setMaquetteForm] = useState({
    googleMapsUrl: "",
    instagramUrl: "",
    facebookUrl: "",
    websiteUrl: "",
    serviceType: "Logiciel Caisse POS & Borne" as MaquetteRequest["serviceType"],
    budgetEur: 2000,
    notes: "",
  });

  // RPG State
  const [currentObjectionIdx, setCurrentObjectionIdx] = useState(0);
  const [rpgResult, setRpgResult] = useState<{ correct: boolean; feedback: string } | null>(null);
  const [closerXp, setCloserXp] = useState(2450);

  useEffect(() => {
    const handleSync = () => setMaquettes(getSavedMaquettes());
    window.addEventListener("xr_maquettes_updated", handleSync);
    return () => window.removeEventListener("xr_maquettes_updated", handleSync);
  }, []);

  // Play Sound
  const playSound = (type: "coin" | "win" | "hit") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      if (type === "coin" || type === "win") {
        osc.frequency.setValueAtTime(987.77, now);
        osc.frequency.setValueAtTime(1318.51, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else {
        osc.frequency.setValueAtTime(220, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch {}
  };

  const handleSignDeal = (lead: CrmLead) => {
    if (closedDeals.includes(lead.id)) return;
    const comm = Math.round(lead.budgetEur * (user.commissionPct / 100));
    setClosedDeals([...closedDeals, lead.id]);
    setCommissionEarned(commissionEarned + comm);
    setCloserXp(closerXp + 500);

    // Update Ego Leaderboard
    const egoList = getSavedEgoStats();
    const updatedEgo = egoList.map((seller) => {
      if (seller.email === user.email) {
        return {
          ...seller,
          revenueSignedEur: seller.revenueSignedEur + lead.budgetEur,
          commissionEarnedEur: seller.commissionEarnedEur + comm,
          scoreEgo: seller.scoreEgo + 1000,
        };
      }
      return seller;
    });
    saveEgoStats(updatedEgo);

    playSound("win");
    setCelebration(`🏆 VENTE GAGNÉE ! +${comm} € DE COMMISSION CRÉDITÉE DANS TA TIRELIRE !`);
    setTimeout(() => setCelebration(null), 5000);
  };

  const handleMarkProspecte = (leadId: string) => {
    if (!prospecteLeads.includes(leadId)) {
      setProspecteLeads([...prospecteLeads, leadId]);
      playSound("coin");
    }
  };

  // Open Maquette Modal
  const openMaquetteModalForLead = (lead: CrmLead) => {
    setSelectedLead(lead);
    setMaquetteForm({
      googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(lead.company + " " + lead.city)}`,
      instagramUrl: `https://instagram.com/${lead.company.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
      facebookUrl: "",
      websiteUrl: "",
      serviceType: lead.serviceTarget?.includes("3D") ? "Site Web & Maquette 3D" : "Logiciel Caisse POS & Borne",
      budgetEur: lead.budgetEur || 2000,
      notes: `Prospect chaud intéressé par l'offre ${lead.serviceTarget}. Demande d'aperçu pour validation.`,
    });
    setShowMaquetteModal(true);
  };

  // Submit Maquette Request to Antoine (Directeur)
  const handleSubmitMaquette = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    const newReq: MaquetteRequest = {
      id: "maq-" + Date.now(),
      leadId: selectedLead.id,
      closerName: user.fullName,
      closerEmail: user.email,
      company: selectedLead.company,
      contactName: selectedLead.contactName,
      phone: selectedLead.phone,
      city: selectedLead.city,
      googleMapsUrl: maquetteForm.googleMapsUrl,
      instagramUrl: maquetteForm.instagramUrl,
      facebookUrl: maquetteForm.facebookUrl,
      websiteUrl: maquetteForm.websiteUrl,
      serviceType: maquetteForm.serviceType,
      budgetEur: maquetteForm.budgetEur,
      notes: maquetteForm.notes,
      status: "pending_boss",
      createdAt: new Date().toISOString(),
    };

    const nextList = [newReq, ...maquettes];
    saveMaquettes(nextList);
    setMaquettes(nextList);

    // Update Ego Leaderboard (maquettes requested count)
    const egoList = getSavedEgoStats();
    const updatedEgo = egoList.map((seller) => {
      if (seller.email === user.email) {
        return {
          ...seller,
          maquettesRequested: seller.maquettesRequested + 1,
          scoreEgo: seller.scoreEgo + 250,
        };
      }
      return seller;
    });
    saveEgoStats(updatedEgo);

    setShowMaquetteModal(false);
    playSound("win");
    setCelebration(`🎨 DEMANDE DE MAQUETTE ENVOYÉE À ANTOINE ! Le Boss a reçu la notification.`);
    setTimeout(() => setCelebration(null), 5000);
  };

  // Filter leads according to closer pipeline
  const filteredLeads = leads.filter((lead) => {
    const isSigned = closedDeals.includes(lead.id);
    const hasMaquette = maquettes.some((m) => m.leadId === lead.id);
    const isProspecte = prospecteLeads.includes(lead.id);

    if (leadsFilter === "signe") return isSigned;
    if (leadsFilter === "maquette_demandee") return hasMaquette && !isSigned;
    if (leadsFilter === "prospecte") return isProspecte && !hasMaquette && !isSigned;
    // en_cours
    return !isSigned && !hasMaquette && !isProspecte;
  });

  const activeObjection = RPG_OBJECTIONS[currentObjectionIdx];

  const handleAnswerObjection = (option: { text: string; correct: boolean; feedback: string }) => {
    setRpgResult({ correct: option.correct, feedback: option.feedback });
    if (option.correct) {
      playSound("coin");
      setCloserXp(closerXp + 150);
    } else {
      playSound("hit");
    }
  };

  return (
    <div className="min-h-screen bg-[#070308] text-white p-3 sm:p-6 lg:p-8 space-y-6 select-none">
      {/* Celebration Banner */}
      {celebration && (
        <div className="fixed top-6 right-6 z-50 rounded-3xl border-2 border-emerald-400 bg-emerald-950/95 p-5 text-sm sm:text-base font-black text-white shadow-[0_0_50px_rgba(16,185,129,0.7)] backdrop-blur-2xl animate-bounce flex items-center gap-4">
          <PartyPopper className="h-7 w-7 text-yellow-300" />
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-300 block">
              NOTIF CLOSER EN DIRECT
            </span>
            <span>{celebration}</span>
          </div>
        </div>
      )}

      {/* Top Arcade Closer HUD Bar */}
      <header className="rounded-3xl border-2 border-red-500/60 bg-gradient-to-r from-red-950/80 via-black to-pink-950/80 p-4 sm:p-6 backdrop-blur-xl shadow-[0_0_50px_rgba(239,68,68,0.3)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 via-orange-600 to-amber-700 text-3xl shadow-lg shadow-red-600/40 border-2 border-red-300 animate-pulse">
              ⚔️
            </div>
            <span className="absolute -bottom-1 -right-1 rounded-full bg-yellow-400 px-2 py-0.5 text-[9px] font-black text-black border border-white">
              NIV. 18
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-500/50">
                POSTE COMMERCIAL D&apos;ÉLITE · ARÈNE DE CLOSING
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {user.fullName} <span className="text-red-400 font-serif italic font-normal">· Chasseur de Primes</span>
            </h1>
            <p className="text-xs text-neutral-300">
              Taux personnel : <span className="text-yellow-300 font-bold">{user.commissionPct}% de commission</span> · Envoi direct des demandes de maquettes à Antoine
            </p>
          </div>
        </div>

        {/* Navigation Tabs Closer */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab("closing");
              playSound("coin");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition",
              activeTab === "closing"
                ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10"
            )}
          >
            <PhoneCall className="h-4 w-4" />
            <span>1. Pipeline &amp; Appels</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("maquettes");
              playSound("coin");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition",
              activeTab === "maquettes"
                ? "bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10"
            )}
          >
            <Palette className="h-4 w-4" />
            <span>2. Demandes de Maquette ({maquettes.filter((m) => m.closerEmail === user.email).length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("leaderboard");
              playSound("coin");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition",
              activeTab === "leaderboard"
                ? "bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.5)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10"
            )}
          >
            <Trophy className="h-4 w-4" />
            <span>3. Concours d&apos;Ego 🏆</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("rpg");
              playSound("coin");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition",
              activeTab === "rpg"
                ? "bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10"
            )}
          >
            <Swords className="h-4 w-4" />
            <span>4. Arène Objections</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-black text-white hover:bg-red-900/60 transition ml-2"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Changer</span>
          </button>
        </div>
      </header>

      {/* VUE 1 : PIPELINE D'APPELS ET GESTION PAR STATUT */}
      {activeTab === "closing" && (
        <div className="space-y-6">
          {/* BANDEAU DES 4 COMPTEURS LUDIQUES & TIRELIRE */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Ma Tirelire Personnelle */}
            <div className="rounded-3xl border-2 border-yellow-400 bg-gradient-to-br from-yellow-500/25 via-black to-black p-5 shadow-[0_0_35px_rgba(250,204,21,0.3)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-25 text-6xl group-hover:scale-110 transition">
                🪙
              </div>
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-yellow-400">
                MA TIRELIRE DE COMMISSIONS
              </span>
              <div className="mt-2 text-3xl sm:text-4xl font-black text-yellow-300 font-mono">
                {commissionEarned.toLocaleString()} €
              </div>
              <p className="mt-1 text-xs text-neutral-300 font-medium">Encaissés sur mes signatures</p>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                <Trophy className="h-3.5 w-3.5" /> Objectif palier supérieur : 7 000 €
              </div>
            </div>

            {/* En cours de contact */}
            <div
              onClick={() => setLeadsFilter("en_cours")}
              className={cn(
                "rounded-3xl border-2 p-5 cursor-pointer transition",
                leadsFilter === "en_cours"
                  ? "border-red-500 bg-red-950/40 shadow-lg"
                  : "border-white/10 bg-black/60 hover:border-white/30"
              )}
            >
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-red-400">
                1. EN COURS D&apos;APPEL
              </span>
              <div className="mt-2 text-3xl font-black text-white font-mono">
                {leads.filter((l) => !closedDeals.includes(l.id) && !prospecteLeads.includes(l.id) && !maquettes.some((m) => m.leadId === l.id)).length} Leads
              </div>
              <p className="mt-1 text-xs text-neutral-400">À contacter en priorité</p>
            </div>

            {/* Déjà prospectés */}
            <div
              onClick={() => setLeadsFilter("prospecte")}
              className={cn(
                "rounded-3xl border-2 p-5 cursor-pointer transition",
                leadsFilter === "prospecte"
                  ? "border-cyan-500 bg-cyan-950/40 shadow-lg"
                  : "border-white/10 bg-black/60 hover:border-white/30"
              )}
            >
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-cyan-400">
                2. DÉJÀ PROSPECTÉS
              </span>
              <div className="mt-2 text-3xl font-black text-cyan-300 font-mono">
                {prospecteLeads.length} Rappels
              </div>
              <p className="mt-1 text-xs text-neutral-400">Relance prévue ou second appel</p>
            </div>

            {/* Demande de Maquette */}
            <div
              onClick={() => setLeadsFilter("maquette_demandee")}
              className={cn(
                "rounded-3xl border-2 p-5 cursor-pointer transition",
                leadsFilter === "maquette_demandee"
                  ? "border-pink-500 bg-pink-950/40 shadow-lg"
                  : "border-white/10 bg-black/60 hover:border-white/30"
              )}
            >
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-pink-400">
                3. DEMANDE DE MAQUETTE
              </span>
              <div className="mt-2 text-3xl font-black text-pink-300 font-mono">
                {maquettes.filter((m) => m.closerEmail === user.email).length} Envoyées
              </div>
              <p className="mt-1 text-xs text-neutral-400">Transmises à Antoine au studio 3D</p>
            </div>
          </section>

          {/* SECTION PIPELINE : LISTE DES LEADS + POSTE D'APPEL DIRECT */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Colonne gauche (5/12) : Liste des leads filtrés */}
            <div className="lg:col-span-5 rounded-3xl border-2 border-red-500/40 bg-black/70 p-5 sm:p-6 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  <div>
                    <span className="font-mono text-[9px] font-black uppercase tracking-widest text-red-400">
                      LEADS ASSIGNÉS PAR ANTOINE
                    </span>
                    <h3 className="text-base font-black text-white">
                      {leadsFilter === "en_cours" && "Leads en cours"}
                      {leadsFilter === "prospecte" && "Leads déjà prospectés"}
                      {leadsFilter === "maquette_demandee" && "Demandes de maquette"}
                      {leadsFilter === "signe" && "Deals signés"}
                    </h3>
                  </div>
                </div>
                <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-mono font-bold text-red-300">
                  {filteredLeads.length} cibles
                </span>
              </div>

              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {filteredLeads.length === 0 ? (
                  <div className="p-8 text-center text-neutral-500 space-y-2">
                    <p className="text-xs font-bold">Aucun lead dans cette catégorie.</p>
                  </div>
                ) : (
                  filteredLeads.map((lead) => {
                    const isSelected = selectedLead?.id === lead.id;
                    const isSigned = closedDeals.includes(lead.id);

                    return (
                      <div
                        key={lead.id}
                        onClick={() => {
                          setSelectedLead(lead);
                          playSound("coin");
                        }}
                        className={cn(
                          "rounded-2xl border-2 p-3.5 transition-all cursor-pointer space-y-2 group",
                          isSelected
                            ? "border-red-500 bg-red-950/40 shadow-[0_0_25px_rgba(239,68,68,0.3)]"
                            : "border-white/10 bg-black/50 hover:border-white/40",
                          isSigned && "border-emerald-500 bg-emerald-950/20"
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-black text-white group-hover:text-red-300 transition">
                              {lead.contactName}
                            </h4>
                            <p className="text-xs text-neutral-400">{lead.company} · {lead.city}</p>
                          </div>
                          <span className="rounded-xl bg-yellow-400/20 border border-yellow-400/40 px-2 py-0.5 font-mono text-xs font-black text-yellow-300">
                            {lead.budgetEur} €
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-neutral-300">
                          <span className="font-mono text-neutral-400">{lead.phone}</span>
                          <span className="text-[11px] text-red-400 font-bold">{lead.serviceTarget}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Colonne droite (7/12) : Cockpit d'Appel + Bouton Demande de Maquette */}
            <div className="lg:col-span-7 rounded-3xl border-2 border-white/15 bg-gradient-to-b from-red-950/30 to-black/90 p-5 sm:p-6 shadow-2xl space-y-5">
              {selectedLead ? (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="font-mono text-[9px] font-black uppercase tracking-widest text-red-400">
                        FICHE DU PROSPECT ACTIF
                      </span>
                      <h3 className="text-2xl font-black text-white">{selectedLead.contactName}</h3>
                      <p className="text-xs text-neutral-300">
                        Établissement : <span className="font-bold text-white">{selectedLead.company}</span> ({selectedLead.city})
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono text-neutral-400 block">
                        MA COMMISSION ESTIMÉE
                      </span>
                      <span className="text-xl font-black text-emerald-400 font-mono">
                        +{Math.round(selectedLead.budgetEur * (user.commissionPct / 100))} € 🪙
                      </span>
                    </div>
                  </div>

                  {/* 3 ACTIONS CLÉS DU VENDEUR */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* 1. Appeler */}
                    <a
                      href={`tel:${selectedLead.phone}`}
                      onClick={() => playSound("coin")}
                      className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-3.5 text-center text-white font-black text-xs sm:text-sm shadow-lg hover:opacity-95 active:scale-95 transition flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="h-5 w-5 animate-pulse" />
                      <span>APPELER DIRECT</span>
                    </a>

                    {/* 2. Demander une Maquette (CRUCIAL) */}
                    <button
                      type="button"
                      onClick={() => openMaquetteModalForLead(selectedLead)}
                      className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 p-3.5 text-center text-white font-black text-xs sm:text-sm shadow-lg hover:opacity-95 active:scale-95 transition flex items-center justify-center gap-2"
                    >
                      <Palette className="h-5 w-5" />
                      <span>DEMANDER MAQUETTE</span>
                    </button>

                    {/* 3. Deal Signé */}
                    <button
                      type="button"
                      onClick={() => handleSignDeal(selectedLead)}
                      className="rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 p-3.5 text-center text-black font-black text-xs sm:text-sm shadow-lg hover:opacity-95 active:scale-95 transition flex items-center justify-center gap-1.5"
                    >
                      <Trophy className="h-5 w-5" />
                      <span>🏆 VENTE SIGNÉE !</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleMarkProspecte(selectedLead.id)}
                      className="rounded-xl border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white transition"
                    >
                      ⏳ Marquer comme prospecté / Rappel
                    </button>
                  </div>

                  {/* SCRIPT D'ACCROCHE IMPARABLE */}
                  <div className="rounded-2xl border border-white/15 bg-black/60 p-4 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-400" />
                      <span className="font-mono text-xs font-black uppercase text-yellow-300">
                        SCRIPT TACTIQUE IMMÉDIAT (3 MINUTES CHRONO)
                      </span>
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans bg-black/40 p-3 rounded-xl border border-white/10">
                      <p>
                        <span className="text-yellow-400 font-bold">1. L&apos;Accroche Choc :</span> « Bonjour{" "}
                        {selectedLead.contactName}, je vous appelle au sujet des 30% de commission prélevés par Uber Eats
                        sur votre établissement {selectedLead.company}. Vous avez calculé ce que vous leur laissez chaque
                        mois ? »
                      </p>
                      <p>
                        <span className="text-emerald-400 font-bold">2. La Démonstration ROI :</span> « Notre logiciel
                        caisse tactile à 2 000 € vous permet de récupérer 100% de votre marge à 0% de commission. C&apos;est
                        rentabilisé en 20 jours chrono. »
                      </p>
                      <p>
                        <span className="text-pink-400 font-bold">3. La Maquette Offerte :</span> « Mon directeur
                        Antoine et notre studio préparent votre maquette personnalisée avec vos produits. Je vous la montre
                        demain 14h ? »
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-neutral-400">
                  <Target className="mx-auto h-10 w-10 text-neutral-500 mb-2" />
                  <p className="font-bold">Sélectionnez un prospect à gauche pour lancer l&apos;action.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {/* VUE 2 : MES DEMANDES DE MAQUETTE */}
      {activeTab === "maquettes" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-pink-400">
                STUDIO 3D ANTOINE
              </span>
              <h2 className="text-2xl font-black text-white">Suivi de mes Demandes de Maquette</h2>
            </div>
            <span className="rounded-full bg-pink-500/20 px-3 py-1 font-mono text-xs font-bold text-pink-300">
              {maquettes.filter((m) => m.closerEmail === user.email).length} envoyées
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {maquettes
              .filter((m) => m.closerEmail === user.email)
              .map((maq) => (
                <div
                  key={maq.id}
                  className="rounded-3xl border-2 border-pink-500/40 bg-black/70 p-5 space-y-3 backdrop-blur-xl shadow-xl hover:border-pink-400 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-black text-white">{maq.company}</h4>
                      <p className="text-xs text-neutral-400">{maq.contactName} · {maq.city}</p>
                    </div>
                    <span className="rounded-xl bg-pink-500/20 px-2.5 py-1 text-[10px] font-mono font-black text-pink-300">
                      {maq.budgetEur} €
                    </span>
                  </div>

                  <p className="text-xs text-pink-200 font-bold">{maq.serviceType}</p>
                  <p className="text-xs text-neutral-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                    {maq.notes}
                  </p>

                  {/* Liens Réseaux Sociaux & Google Maps */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    {maq.googleMapsUrl && (
                      <a
                        href={maq.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-emerald-500/20 px-2 py-1 text-[10px] font-bold text-emerald-300 flex items-center gap-1 hover:bg-emerald-500/40"
                      >
                        <MapPin className="h-3 w-3" /> Google Maps
                      </a>
                    )}
                    {maq.instagramUrl && (
                      <a
                        href={maq.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-pink-500/20 px-2 py-1 text-[10px] font-bold text-pink-300 flex items-center gap-1 hover:bg-pink-500/40"
                      >
                        <Instagram className="h-3 w-3" /> Instagram
                      </a>
                    )}
                    {maq.facebookUrl && (
                      <a
                        href={maq.facebookUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-blue-500/20 px-2 py-1 text-[10px] font-bold text-blue-300 flex items-center gap-1 hover:bg-blue-500/40"
                      >
                        <Facebook className="h-3 w-3" /> Facebook
                      </a>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="font-mono text-neutral-500">Statut :</span>
                    <span className="font-mono font-bold text-yellow-300">
                      {maq.status === "pending_boss" && "⏳ En attente de validation Antoine"}
                      {maq.status === "in_design" && "🎨 En cours au studio 3D"}
                      {maq.status === "ready_to_close" && "✅ Prête à présenter au prospect !"}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* VUE 3 : CONCOURS D'EGO DES VENDEURS */}
      {activeTab === "leaderboard" && (
        <CrmEgoLeaderboard currentUserName={user.fullName} />
      )}

      {/* VUE 4 : MINI-JEU RPG DES OBJECTIONS */}
      {activeTab === "rpg" && (
        <section className="rounded-3xl border-2 border-purple-500/50 bg-gradient-to-r from-black via-purple-950/40 to-black p-5 sm:p-7 backdrop-blur-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🥋</span>
              <div>
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-purple-400">
                  ENTRAÎNEMENT COMBAT D&apos;OBJECTIONS
                </span>
                <h3 className="text-xl font-black text-white">L&apos;Arène du Closer · Réfutez en direct</h3>
              </div>
            </div>
            <span className="font-mono text-xs text-purple-300 font-bold">
              {activeObjection.difficulty}
            </span>
          </div>

          <div className="rounded-2xl border border-purple-500/40 bg-black/60 p-5 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-4xl">👹</span>
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase font-black">
                  {activeObjection.monster} vous défie :
                </span>
                <p className="text-base sm:text-lg font-serif italic font-bold text-white mt-1">
                  {activeObjection.quote}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-xs text-neutral-400 font-bold">Choisissez votre réplique d&apos;attaque :</p>
              {activeObjection.options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAnswerObjection(opt)}
                  className="w-full text-left rounded-xl border border-white/15 bg-white/5 p-3.5 text-xs sm:text-sm text-neutral-200 hover:border-purple-400 hover:bg-purple-950/40 transition"
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {rpgResult && (
              <div
                className={cn(
                  "rounded-xl p-4 text-xs sm:text-sm font-bold border transition-all",
                  rpgResult.correct
                    ? "border-emerald-500 bg-emerald-950/40 text-emerald-300"
                    : "border-red-500 bg-red-950/40 text-red-300"
                )}
              >
                {rpgResult.feedback}
              </div>
            )}
          </div>
        </section>
      )}

      {/* MODAL CRÉATION DE DEMANDE DE MAQUETTE */}
      {showMaquetteModal && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl border-2 border-pink-500 bg-[#0c040d] p-6 space-y-4 shadow-[0_0_60px_rgba(236,72,153,0.4)] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500 text-black font-black text-xl">
                  🎨
                </div>
                <div>
                  <span className="font-mono text-[9px] font-black uppercase tracking-widest text-pink-400">
                    TRANSMISSION AU STUDIO 3D ANTOINE
                  </span>
                  <h3 className="text-xl font-black text-white">
                    Demande de Maquette : {selectedLead.company}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMaquetteModal(false)}
                className="rounded-lg p-2 text-neutral-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitMaquette} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-neutral-300 flex items-center gap-1 mb-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" /> Lien Google Maps
                  </label>
                  <input
                    type="url"
                    value={maquetteForm.googleMapsUrl}
                    onChange={(e) => setMaquetteForm({ ...maquetteForm, googleMapsUrl: e.target.value })}
                    placeholder="https://maps.google.com/..."
                    className="w-full rounded-xl border border-white/15 bg-black/60 p-2.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-neutral-300 flex items-center gap-1 mb-1">
                    <Instagram className="h-3.5 w-3.5 text-pink-400" /> Profil Instagram
                  </label>
                  <input
                    type="text"
                    value={maquetteForm.instagramUrl}
                    onChange={(e) => setMaquetteForm({ ...maquetteForm, instagramUrl: e.target.value })}
                    placeholder="https://instagram.com/..."
                    className="w-full rounded-xl border border-white/15 bg-black/60 p-2.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-neutral-300 flex items-center gap-1 mb-1">
                    <Facebook className="h-3.5 w-3.5 text-blue-400" /> Page Facebook
                  </label>
                  <input
                    type="text"
                    value={maquetteForm.facebookUrl}
                    onChange={(e) => setMaquetteForm({ ...maquetteForm, facebookUrl: e.target.value })}
                    placeholder="https://facebook.com/..."
                    className="w-full rounded-xl border border-white/15 bg-black/60 p-2.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-neutral-300 flex items-center gap-1 mb-1">
                    <Globe className="h-3.5 w-3.5 text-cyan-400" /> Site Web Actuel (si existant)
                  </label>
                  <input
                    type="text"
                    value={maquetteForm.websiteUrl}
                    onChange={(e) => setMaquetteForm({ ...maquetteForm, websiteUrl: e.target.value })}
                    placeholder="https://site-du-client.fr"
                    className="w-full rounded-xl border border-white/15 bg-black/60 p-2.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-neutral-300 block mb-1">
                    Type de Maquette demandée
                  </label>
                  <select
                    value={maquetteForm.serviceType}
                    onChange={(e) => setMaquetteForm({ ...maquetteForm, serviceType: e.target.value as any })}
                    className="w-full rounded-xl border border-white/15 bg-black p-2.5 text-xs text-white focus:border-pink-500"
                  >
                    <option value="Logiciel Caisse POS & Borne">Logiciel Caisse POS &amp; Borne (dès 2 000 €)</option>
                    <option value="Site Web & Maquette 3D">Site Web &amp; Jumeau 3D Immersif (dès 5 000 €)</option>
                    <option value="Refonte Noir & Or">Refonte Signature Noir &amp; Or</option>
                    <option value="Pack Omnicanal Robotique">Pack Omnicanal &amp; Robotique</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-neutral-300 block mb-1">
                    Budget estimé (€)
                  </label>
                  <input
                    type="number"
                    value={maquetteForm.budgetEur}
                    onChange={(e) => setMaquetteForm({ ...maquetteForm, budgetEur: Number(e.target.value) })}
                    className="w-full rounded-xl border border-white/15 bg-black/60 p-2.5 text-xs text-white focus:border-pink-500 focus:outline-none font-mono font-bold text-yellow-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-300 block mb-1">
                  Notes &amp; Attentes du client pour le studio 3D
                </label>
                <textarea
                  rows={3}
                  value={maquetteForm.notes}
                  onChange={(e) => setMaquetteForm({ ...maquetteForm, notes: e.target.value })}
                  placeholder="Ex: Le gérant veut voir son logo sur l'écran tactile et l'imprimante cuisine..."
                  className="w-full rounded-xl border border-white/15 bg-black/60 p-2.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMaquetteModal(false)}
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-bold text-neutral-300 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2.5 text-xs font-black text-white hover:opacity-95 shadow-lg active:scale-95 transition flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Transmettre au Boss Antoine</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
