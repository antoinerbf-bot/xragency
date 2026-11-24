import React, { useState, useEffect } from "react";
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
  Shield,
  Zap,
  ChevronLeft,
  ChevronRight,
  Crown,
  MessageCircle,
  HelpCircle,
  DollarSign,
  TrendingUp,
  X,
  Send,
  PartyPopper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CrmLead } from "@/routes/api/crm";

interface CrmUltraLudiqueArenaProps {
  user: {
    fullName: string;
    email: string;
    commissionPct: number;
  };
  leads: CrmLead[];
  onLogout: () => void;
  onOpenCallModal?: (lead: CrmLead) => void;
  onOpenWhatsappModal?: (lead: CrmLead) => void;
  onSignDeal?: (leadId: string) => void;
}

// Objections magiques prêtes à l'emploi
const QUICK_OBJECTIONS = [
  {
    objection: "« C'est trop cher ! »",
    reponse:
      "« Monsieur, sur 10 000 € de chiffre d'affaires, vous perdez 2 500 € en commissions tierces chaque mois. Notre solution est amortie en seulement 15 jours. Est-ce que vous préférez continuer à donner 30 000 € par an aux plateformes ou garder votre marge ? »",
    tag: "Frappe Chirurgicale ROI",
  },
  {
    objection: "« Je n'ai pas le temps en ce moment ! »",
    reponse:
      "« C'est justement pour ça que je vous appelle : notre système vous fait gagner 2h par jour sur vos stocks et réservations. Ça prend 45 secondes sur votre WhatsApp pour voir la maquette gratuite. Je vous l'envoie ? »",
    tag: "Gain de Temps Immédiat",
  },
  {
    objection: "« J'ai déjà quelqu'un qui gère mon site ! »",
    reponse:
      "« Parfait ! Est-ce qu'il vous garantit d'être dans le Top 3 Google Maps de votre ville sous 30 jours avec avis 5★ automatisés ? Regardez notre maquette démo gratuite, comparez et jugez sur pièces ! »",
    tag: "Démarquage Qualité",
  },
];

export function CrmUltraLudiqueArena({
  user,
  leads,
  onLogout,
  onOpenCallModal,
  onOpenWhatsappModal,
  onSignDeal,
}: CrmUltraLudiqueArenaProps) {
  const [activeTab, setActiveTab] = useState<"arena" | "vault" | "training" | "leaderboard">(
    "arena",
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showObjectionModal, setShowObjectionModal] = useState(false);
  const [selectedObjection, setSelectedObjection] = useState<number | null>(null);
  const [celebration, setCelebration] = useState<string | null>(null);
  const [signedLeads, setSignedLeads] = useState<string[]>([]);
  const [dailyCalls, setDailyCalls] = useState(2);
  const [dailyMaquettes, setDailyMaquettes] = useState(1);
  const [vaultCommissionEur, setVaultCommissionEur] = useState(1450);
  const [xp, setXp] = useState(4250);

  // Moteur Audio Synthétiseur Rétro Arcade
  const playSound = (type: "coin" | "win" | "click" | "powerup") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      if (type === "coin") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === "win") {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = "triangle";
          o.frequency.setValueAtTime(freq, now + i * 0.06);
          g.gain.setValueAtTime(0.1, now + i * 0.06);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.3);
          o.start(now + i * 0.06);
          o.stop(now + i * 0.06 + 0.32);
        });
      } else {
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch {
      // Audio fallback
    }
  };

  const safeLeads: CrmLead[] =
    leads && leads.length > 0
      ? leads
      : [
          {
            id: "lead-demo-1",
            company: "Brasserie de la Mer",
            contactName: "Marc Vasseur (Gérant)",
            phone: "06 22 33 44 55",
            email: "",
            sector: "Restauration",
            assignedTo: "demo",
            sentBy: "demo",
            source: "Exemple de démonstration",
            notes: "Données fictives de démonstration",
            nextFollowUp: "",
            callsCount: 0,
            city: "Marseille",
            serviceTarget: "Site Vitrine & Google Maps Top 3 (999 €)",
            budgetEur: 999,
            status: "to_call" as const,
            priority: "urgent" as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "lead-demo-2",
            company: "Boutique Hôtel Les Palmiers",
            contactName: "Claire Dujardin",
            phone: "06 88 99 00 11",
            email: "",
            sector: "Hôtellerie",
            assignedTo: "demo",
            sentBy: "demo",
            source: "Exemple de démonstration",
            notes: "Données fictives de démonstration",
            nextFollowUp: "",
            callsCount: 0,
            city: "Cannes",
            serviceTarget: "Site Web Immersif & Réservation (1 499 €)",
            budgetEur: 1499,
            status: "to_call" as const,
            priority: "high" as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];

  const currentLead = safeLeads[currentIndex % safeLeads.length];
  const isLeadSigned = signedLeads.includes(currentLead.id);

  // Calcul commission
  const commissionAmount = Math.round(
    (currentLead.budgetEur || 999) * (user.commissionPct ? user.commissionPct / 100 : 0.2),
  );

  const handleNextLead = () => {
    playSound("click");
    setCurrentIndex((prev) => (prev + 1) % safeLeads.length);
  };

  const handlePrevLead = () => {
    playSound("click");
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : safeLeads.length - 1));
  };

  const handleSignVictory = () => {
    playSound("win");
    setSignedLeads([...signedLeads, currentLead.id]);
    setVaultCommissionEur((v) => v + commissionAmount);
    setXp((x) => x + 500);
    setCelebration(`👑 VICTOIRE ÉPIQUE ! +${commissionAmount} € ENCAISSÉS DANS TON COFFRE !`);

    if (onSignDeal) {
      onSignDeal(currentLead.id);
    }

    setTimeout(() => {
      setCelebration(null);
      handleNextLead();
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-[#F8FAFC] pb-24 sm:pb-12 select-none">
      {/* ── BANNIÈRE DE CÉLÉBRATION VICTOIRE ── */}
      {celebration && (
        <div className="fixed inset-x-4 top-6 z-50 mx-auto max-w-lg rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-r from-amber-950/95 via-black to-emerald-950/95 p-5 shadow-[0_0_60px_rgba(212,175,55,0.7)] backdrop-blur-2xl animate-bounce flex items-center gap-4">
          <PartyPopper className="h-8 w-8 text-yellow-300 animate-spin" />
          <div>
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#E2D5BC] block">
              COUP CRITIQUE CLOSER
            </span>
            <p className="text-sm font-extrabold text-white">{celebration}</p>
          </div>
        </div>
      )}

      {/* ── TOPBAR DU HÉROS DE VENTE ── */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0D14]/90 backdrop-blur-2xl px-4 py-3 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
          {/* Avatar et stats du Closer */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-[#D4AF37] to-amber-700 text-2xl shadow-lg border border-amber-300">
                ⚔️
              </div>
              <span className="absolute -bottom-1 -right-1 rounded-full bg-emerald-400 px-1.5 py-0.2 font-mono text-[9px] font-black text-black">
                NIV. 4
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  APEX CLOSER
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[9px] text-amber-300">
                  <Flame className="h-3 w-3 text-amber-400 fill-amber-400 animate-pulse" />
                  SÉRIE 5D
                </span>
              </div>
              <h1 className="text-lg font-extrabold text-white leading-tight">{user.fullName}</h1>
            </div>
          </div>

          {/* Cagnotte Tirelire en Direct */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 rounded-2xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-4 py-1.5 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <Coins className="h-5 w-5 text-[#D4AF37] animate-pulse" />
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                  Mon Coffre Cash
                </span>
                <span className="font-mono text-base sm:text-lg font-black text-[#E2D5BC]">
                  {vaultCommissionEur.toLocaleString()} €
                </span>
              </div>
            </div>

            {/* Contrôles Audio & Déconnexion */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 hover:text-white"
                title="Sons d'arcade"
              >
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </button>

              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-1.5 font-mono text-xs font-bold text-red-300 hover:bg-red-500/20"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Quitter</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── CONTENU PRINCIPAL ── */}
      <main className="mx-auto max-w-5xl px-4 pt-6 space-y-6">
        {/* ── BATTLE PASS DU JOUR : 3 OBJECTIFS ULTRA LISIBLES ── */}
        <section className="rounded-3xl border border-white/15 bg-gradient-to-r from-[#0F1420] via-[#151B2B] to-[#0F1420] p-4 sm:p-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#D4AF37]" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#E2D5BC]">
                BATTLE PASS DU JOUR · OBJECTIF : 450 € DE COMMISSIONS
              </h2>
            </div>
            <span className="font-mono text-[10px] text-neutral-400">XP TOTAL : {xp} / 5 000</span>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Quête 1 */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-300 font-semibold">📞 3 Appels lancés</span>
                <span className="font-mono font-bold text-amber-400">{dailyCalls}/3</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-300"
                  style={{ width: `${Math.min((dailyCalls / 3) * 100, 100)}%` }}
                />
              </div>
              <span className="mt-1.5 block font-mono text-[9px] text-neutral-400">
                +50 XP · Entraînement voix
              </span>
            </div>

            {/* Quête 2 */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-300 font-semibold">🎨 1 Maquette offerte</span>
                <span className="font-mono font-bold text-purple-400">{dailyMaquettes}/1 ✓</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-purple-400 transition-all duration-300"
                  style={{ width: `${Math.min((dailyMaquettes / 1) * 100, 100)}%` }}
                />
              </div>
              <span className="mt-1.5 block font-mono text-[9px] text-emerald-400">
                +100 XP · Débloqué !
              </span>
            </div>

            {/* Quête 3 */}
            <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#E2D5BC]">👑 1 Deal closé</span>
                <span className="font-mono font-bold text-[#D4AF37]">
                  {signedLeads.length > 0 ? `${signedLeads.length}/1 ✓` : "0/1"}
                </span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#D4AF37] transition-all duration-300"
                  style={{ width: signedLeads.length > 0 ? "100%" : "25%" }}
                />
              </div>
              <span className="mt-1.5 block font-mono text-[9px] text-emerald-400 font-bold">
                +250 XP &amp; commission selon barème
              </span>
            </div>
          </div>
        </section>

        {/* ── ARÈNE DE CHASSE : LA CARTE CIBLE UNIQUE (100% INTUITIVE) ── */}
        {activeTab === "arena" && (
          <div className="space-y-4">
            {/* Contrôles Suivant / Précédent */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                  {currentIndex + 1}
                </span>
                <span className="font-mono text-xs text-neutral-300">
                  SUR {safeLeads.length} PROSPECTS ASSIGNÉS
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevLead}
                  className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-xs text-neutral-300 hover:text-white hover:bg-white/10 transition"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Précédent</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextLead}
                  className="flex items-center gap-1.5 rounded-xl border border-emerald-400/50 bg-emerald-500/20 px-3.5 py-1.5 font-mono text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 transition shadow-[0_0_15px_rgba(52,211,153,0.25)]"
                >
                  <span>Suivant</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* FICHE DE COMBAT DU PROSPECT (GRAND FORMAT ARCADE) */}
            <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-emerald-400/50 bg-gradient-to-b from-[#0F1422] to-[#0A0D14] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
              {/* Badge Gains & Statut */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-4 py-1.5 font-mono text-xs font-black text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                  <Coins className="h-4 w-4 text-[#D4AF37]" />
                  <span>GAIN NET POUR TOI : +{commissionAmount} € CASH</span>
                </div>

                {isLeadSigned ? (
                  <span className="rounded-full bg-emerald-500 px-3 py-1 font-mono text-xs font-black text-black">
                    🏆 DEAL CLOSÉ &amp; ENCAISSÉ
                  </span>
                ) : (
                  <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 font-mono text-[10px] font-bold text-amber-300">
                    🎯 CIBLE EN COURS
                  </span>
                )}
              </div>

              {/* Titre et détails de l'entreprise */}
              <div className="mt-5">
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {currentLead.company}
                </h2>
                <p className="mt-1 text-sm sm:text-base text-neutral-300 font-light">
                  {currentLead.contactName} · {currentLead.city} · Offre :{" "}
                  <strong className="text-[#E2D5BC]">{currentLead.serviceTarget}</strong> (
                  {currentLead.budgetEur} €)
                </p>
              </div>

              {/* Faiblesse détectée chez le prospect */}
              <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-950/20 p-3.5 flex items-start gap-3">
                <Target className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-red-300">
                    🎯 FAIBLESSE DÉTECTÉE (TON ANGLE D&apos;ATTAQUE) :
                  </span>
                  <p className="mt-0.5 text-xs sm:text-sm text-neutral-200">
                    Perd en moyenne 25 à 40 réservations par mois au profit de ses concurrents
                    locaux à cause d&apos;une fiche Maps mal positionnée et d&apos;un site non
                    responsive.
                  </p>
                </div>
              </div>

              {/* SCRIPT MOT-À-MOT SOUS LES YEUX (LE GRIMOIRE CLOSER) */}
              <div className="mt-4 rounded-2xl border border-cyan-500/40 bg-cyan-950/25 p-4 sm:p-5 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest text-cyan-300 flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-cyan-400" />
                    LIS CE PITCH MOT-POUR-MOT AU TÉLÉPHONE (IMPOSSIBLE D&apos;ÉCHOUER) :
                  </span>
                </div>
                <p className="text-sm sm:text-base italic text-white font-medium leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">
                  « Bonjour {currentLead.contactName?.split(" ")[0] || "Monsieur"} ! Je suis{" "}
                  {user.fullName.split(" ")[0]} de l&apos;agence XR Agency. J&apos;ai vu votre
                  établissement {currentLead.company} à {currentLead.city}. On vous a préparé une
                  maquette sur-mesure 100% offerte pour vous montrer comment doubler vos demandes
                  directes sans payer de commissions. Est-ce que vous avez 1 minute ou un numéro
                  WhatsApp pour que je vous l&apos;envoie tout de suite ? »
                </p>
              </div>

              {/* ── LES 4 BOUTONS D'ATTAQUE GÉANTS DU COMBAT ── */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* 1. Lancer l'Appel Gagnant */}
                <button
                  type="button"
                  onClick={() => {
                    playSound("click");
                    setDailyCalls((c) => c + 1);
                    if (onOpenCallModal) {
                      onOpenCallModal(currentLead);
                    } else {
                      window.location.href = `tel:${currentLead.phone}`;
                    }
                  }}
                  className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-4 px-6 text-sm font-black uppercase tracking-wider text-black shadow-[0_10px_30px_rgba(16,185,129,0.4)] transition hover:scale-[1.02] active:scale-95"
                >
                  <PhoneCall className="h-5 w-5" />
                  <span>1. Lancer l&apos;Appel ({currentLead.phone})</span>
                </button>

                {/* 2. Envoyer la Maquette par WhatsApp */}
                <button
                  type="button"
                  onClick={() => {
                    playSound("coin");
                    setDailyMaquettes((m) => m + 1);
                    if (onOpenWhatsappModal) {
                      onOpenWhatsappModal(currentLead);
                    } else {
                      const text = encodeURIComponent(
                        `Bonjour ${currentLead.contactName || ""}, voici la maquette sur-mesure conçue pour ${currentLead.company} par XR Agency : https://xragencyai.com/`,
                      );
                      window.open(
                        `https://wa.me/${currentLead.phone.replace(/[^0-9]/g, "")}?text=${text}`,
                        "_blank",
                      );
                    }
                  }}
                  className="flex items-center justify-center gap-2.5 rounded-2xl border border-emerald-400/50 bg-[#0F172A] py-4 px-6 text-sm font-bold text-emerald-300 hover:bg-emerald-500/15 transition active:scale-95"
                >
                  <MessageCircle className="h-5 w-5 text-emerald-400" />
                  <span>2. Envoyer Maquette WhatsApp</span>
                </button>

                {/* 3. Parer les Objections */}
                <button
                  type="button"
                  onClick={() => {
                    playSound("click");
                    setShowObjectionModal(true);
                  }}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-purple-500/40 bg-purple-950/20 py-3.5 px-6 text-xs font-bold text-purple-300 hover:bg-purple-500/25 transition active:scale-95"
                >
                  <Shield className="h-4 w-4 text-purple-400" />
                  <span>3. Parer les Objections (Anti-Sèche)</span>
                </button>

                {/* 4. Coup de Grâce : Deal Signé ! */}
                <button
                  type="button"
                  onClick={handleSignVictory}
                  disabled={isLeadSigned}
                  className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-r from-amber-500/20 via-[#D4AF37]/30 to-amber-500/20 py-3.5 px-6 text-xs font-black uppercase tracking-wider text-[#E2D5BC] hover:bg-[#D4AF37] hover:text-black transition shadow-[0_0_30px_rgba(212,175,55,0.3)] active:scale-95 disabled:opacity-50"
                >
                  <Crown className="h-4 w-4" />
                  <span>4. C&apos;est Signé ! (+{commissionAmount} €)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── ONGLET 2 : MON COFFRE-FORT & TIRELIRE ANIMÉE ── */}
        {activeTab === "vault" && (
          <div className="space-y-6">
            <div className="rounded-[2.5rem] border-2 border-[#D4AF37]/50 bg-gradient-to-br from-[#121622] via-[#0A0D14] to-[#121622] p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-[#D4AF37]/20 border-2 border-[#D4AF37] text-5xl shadow-[0_0_40px_rgba(212,175,55,0.4)] animate-bounce">
                🪙
              </div>

              <span className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-[#D4AF37]">
                SOLDE TOTAL DE MON COFFRE
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-white font-mono mt-2">
                {vaultCommissionEur.toLocaleString()} €
              </h2>
              <p className="mt-2 text-sm text-neutral-300">
                Les commissions affichées sont indicatives ; leur versement dépend du contrat et des
                règlements confirmés.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-left">
                  <span className="font-mono text-[10px] text-neutral-400">
                    🔒 En Coffre (Validation)
                  </span>
                  <p className="font-mono text-xl font-bold text-amber-300 mt-1">450 €</p>
                </div>
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-left">
                  <span className="font-mono text-[10px] text-emerald-400">
                    💸 Viré &amp; Débloqué
                  </span>
                  <p className="font-mono text-xl font-bold text-emerald-300 mt-1">1 000 €</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ONGLET 3 : ENTRAÎNEMENT RPG OBJECTIONS ── */}
        {activeTab === "training" && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-purple-500/40 bg-[#0F1422] p-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Swords className="h-6 w-6 text-purple-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Arène d&apos;Entraînement aux Objections Clients
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Apprenez les répliques qui désarment 100% des clients hésitants.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {QUICK_OBJECTIONS.map((obj, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300 text-sm">{obj.objection}</span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 border border-white/10 px-2 py-0.5 rounded-full">
                        {obj.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-neutral-200 leading-relaxed italic bg-purple-950/20 p-3 rounded-xl border border-purple-500/20">
                      {obj.reponse}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ONGLET 4 : CLASSEMENT GUILDE ── */}
        {activeTab === "leaderboard" && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-[#D4AF37]/40 bg-[#0F1422] p-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Trophy className="h-6 w-6 text-[#D4AF37]" />
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Classement des Closers · Hall of Fame
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Série de victoires et commissions débloquées ce mois-ci.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  {
                    name: "Lucas Martin",
                    role: "Apex Closer",
                    deals: 8,
                    cash: "2 450 €",
                    badge: "🥇 1er",
                  },
                  {
                    name: "Karim Meziane",
                    role: "Closer Senior",
                    deals: 6,
                    cash: "1 800 €",
                    badge: "🥈 2ème",
                  },
                  {
                    name: "Sarah Benali",
                    role: "Chasseuse d'Élite",
                    deals: 5,
                    cash: "1 500 €",
                    badge: "🥉 3ème",
                  },
                ].map((closer, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-black">{closer.badge}</span>
                      <div>
                        <h4 className="font-bold text-white text-sm">{closer.name}</h4>
                        <span className="font-mono text-[10px] text-neutral-400">
                          {closer.role} · {closer.deals} signatures
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-base font-black text-[#D4AF37]">
                      {closer.cash}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── NAVIGATION STICKY AU POUCE (SMARTPHONE ET PC) ── */}
      <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-[#0A0D14]/95 backdrop-blur-2xl p-2 sm:p-3">
        <div className="mx-auto max-w-md flex items-center justify-around gap-1">
          {[
            { id: "arena", label: "🎯 Chasse", icon: <Target className="h-4 w-4" /> },
            { id: "vault", label: "💰 Coffre", icon: <Coins className="h-4 w-4" /> },
            { id: "training", label: "⚔️ Objections", icon: <Shield className="h-4 w-4" /> },
            { id: "leaderboard", label: "🏆 Guilde", icon: <Trophy className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                playSound("click");
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl px-4 py-1.5 transition text-[11px] font-bold",
                activeTab === tab.id
                  ? "bg-emerald-400 text-black shadow-[0_0_15px_rgba(52,211,153,0.4)]"
                  : "text-neutral-400 hover:text-white",
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ── MODAL ANTI-SÈCHE OBJECTIONS ── */}
      {showObjectionModal && (
        <div
          role="dialog"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-2xl animate-in fade-in"
          onClick={() => setShowObjectionModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-purple-500/50 bg-[#0F1424] p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">
                  Parades d&apos;Objections Magiques
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowObjectionModal(false)}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-neutral-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-300">
              Cliquez sur l&apos;objection prononcée par le client pour lire immédiatement la
              réplique exacte :
            </p>

            <div className="space-y-3">
              {QUICK_OBJECTIONS.map((obj, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedObjection(selectedObjection === i ? null : i)}
                  className="rounded-2xl border border-white/10 bg-black/40 p-4 cursor-pointer hover:border-purple-400/50 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{obj.objection}</span>
                    <span className="text-[10px] font-mono text-purple-300">
                      Afficher la réplique
                    </span>
                  </div>
                  {selectedObjection === i && (
                    <p className="mt-3 text-xs sm:text-sm text-emerald-300 italic bg-purple-950/40 p-3 rounded-xl border border-purple-500/30 animate-in fade-in">
                      {obj.reponse}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
