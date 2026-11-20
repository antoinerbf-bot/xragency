import { useState, useEffect } from "react";
import {
  Trophy,
  Crown,
  Flame,
  Sparkles,
  TrendingUp,
  Zap,
  Swords,
  Coins,
  Shield,
  Layers,
  ArrowUpRight,
  HeartHandshake,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type SellerEgoStat,
  getSavedEgoStats,
  saveEgoStats,
} from "@/lib/crm-gamified-state";

interface CrmEgoLeaderboardProps {
  currentUserName?: string;
}

export function CrmEgoLeaderboard({ currentUserName }: CrmEgoLeaderboardProps) {
  const [stats, setStats] = useState<SellerEgoStat[]>(getSavedEgoStats());

  useEffect(() => {
    const handleUpdate = () => setStats(getSavedEgoStats());
    window.addEventListener("xr_ego_updated", handleUpdate);
    return () => window.removeEventListener("xr_ego_updated", handleUpdate);
  }, []);

  // Sort by scoreEgo descending
  const sortedStats = [...stats].sort((a, b) => b.scoreEgo - a.scoreEgo);
  const firstPlace = sortedStats[0];
  const secondPlace = sortedStats[1];
  const thirdPlace = sortedStats[2];

  // RÈGLE DE CONFIDENTIALITÉ ABSOLUE : Personne ne peut voir ce que les autres gagnent,
  // mais tout le monde sait ce qu'ils génèrent en CA ! Seul le commercial lui-même et la Direction voient les gains en €.
  const canSeeCommission = (sellerName: string) => {
    if (!currentUserName) return true;
    const normUser = currentUserName.toLowerCase();
    if (normUser.includes("direct") || normUser.includes("antoine") || normUser.includes("admin")) return true;
    return sellerName.toLowerCase().includes(normUser) || normUser.includes(sellerName.toLowerCase());
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header Concours d'Ego */}
      <div className="rounded-3xl border-2 border-yellow-500/50 bg-gradient-to-r from-purple-950/80 via-black to-red-950/80 p-5 sm:p-7 backdrop-blur-xl shadow-[0_0_50px_rgba(234,179,8,0.25)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-red-600 text-3xl shadow-xl shadow-yellow-500/40 border-2 border-yellow-200 animate-pulse">
              🏆
            </div>
            <span className="absolute -bottom-1 -right-1 rounded-full bg-red-600 px-2 py-0.5 text-[9px] font-black text-white border border-white">
              BATTLE
            </span>
          </div>
          <div>
            <span className="font-mono text-[9px] font-black uppercase tracking-widest text-yellow-400 bg-yellow-950/60 px-3 py-1 rounded-full border border-yellow-500/40">
              LEADERBOARD ÉQUIPE · CONCOURS D&apos;EGO &amp; BATTLE ROYALE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Qui a la plus grosse... <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-red-400 font-serif italic">commission du mois ?</span>
            </h2>
            <p className="text-xs text-neutral-300">
              Classement en direct des closers et élèves · Chaque vente signée propulse votre avatar au sommet !
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1.5 font-mono text-xs font-black text-emerald-300 flex items-center gap-1.5 shadow-lg">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" /> SAISON 1 · 15 000 € DE PRIME EN JEU
          </span>
        </div>
      </div>

      {/* LE PODIUM 3D DES 3 PREMIERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-4">
        {/* 2ÈME PLACE (ARGENT) */}
        {secondPlace && (
          <div className="order-2 md:order-1 rounded-3xl border-2 border-slate-300/40 bg-gradient-to-b from-slate-900/80 to-black/90 p-5 text-center space-y-3 shadow-xl hover:-translate-y-2 transition duration-300 relative group">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-300 text-black px-3 py-0.5 text-xs font-black font-mono border-2 border-white shadow-lg">
              🥈 2ÈME PLACE
            </div>
            <div className="pt-2 text-6xl group-hover:scale-110 transition duration-300">
              {secondPlace.avatar3D}
            </div>
            <div>
              <h3 className="text-lg font-black text-white">{secondPlace.name}</h3>
              <p className="text-xs text-slate-300 font-medium">{secondPlace.title}</p>
              <span className="font-mono text-[10px] text-yellow-300 font-bold block mt-0.5">
                {secondPlace.rankBadge}
              </span>
            </div>

            <div className="rounded-2xl bg-black/60 border border-white/10 p-3 space-y-1">
              <span className="text-[9px] font-black uppercase text-neutral-400 block">Commissions Encaissées</span>
              <span className="text-xl font-black text-emerald-400 font-mono">
                {canSeeCommission(secondPlace.name) ? (
                  `${secondPlace.commissionEarnedEur.toLocaleString()} € 🪙`
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-white/50 font-normal">
                    <Lock className="h-3 w-3" /> Confidentiel
                  </span>
                )}
              </span>
              <p className="text-[10px] text-neutral-400">CA Signé : {secondPlace.revenueSignedEur.toLocaleString()} €</p>
            </div>

            <p className="text-[11px] font-serif italic text-neutral-300 bg-white/5 p-2 rounded-xl">
              {secondPlace.punchline}
            </p>
          </div>
        )}

        {/* 1ÈRE PLACE (OR ABSOLU - LE ROI / LA REINE) */}
        {firstPlace && (
          <div className="order-1 md:order-2 rounded-3xl border-4 border-yellow-400 bg-gradient-to-b from-yellow-500/20 via-[#1c1404] to-black p-6 text-center space-y-3.5 shadow-[0_0_50px_rgba(250,204,21,0.4)] hover:-translate-y-3 transition duration-300 relative group md:-mt-6">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-yellow-300 to-amber-500 text-black px-4 py-1 text-xs font-black font-mono border-2 border-white shadow-xl flex items-center gap-1.5">
              <Crown className="h-4 w-4" /> 👑 NUMÉRO 1 MONDIAL
            </div>
            <div className="pt-2 text-7xl group-hover:scale-125 transition duration-300">
              {firstPlace.avatar3D}
            </div>
            <div>
              <h3 className="text-2xl font-black text-yellow-300">{firstPlace.name}</h3>
              <p className="text-xs text-neutral-200 font-bold">{firstPlace.title}</p>
              <span className="font-mono text-xs text-yellow-400 font-black block mt-0.5">
                {firstPlace.rankBadge}
              </span>
            </div>

            <div className="rounded-2xl bg-black/70 border-2 border-yellow-400/40 p-3.5 space-y-1">
              <span className="text-[9px] font-black uppercase text-yellow-400 block">Commissions Encaissées</span>
              <span className="text-2xl font-black text-yellow-300 font-mono">
                {canSeeCommission(firstPlace.name) ? (
                  `${firstPlace.commissionEarnedEur.toLocaleString()} € 🪙`
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm text-yellow-300/60 font-normal">
                    <Lock className="h-3.5 w-3.5" /> Confidentiel
                  </span>
                )}
              </span>
              <div className="flex justify-around text-[10.5px] text-neutral-300 pt-1 border-t border-white/10">
                <span>CA : {firstPlace.revenueSignedEur.toLocaleString()} €</span>
                <span>Taux : {firstPlace.closingRatePct}%</span>
              </div>
            </div>

            <p className="text-xs font-serif italic text-yellow-200 bg-yellow-950/40 border border-yellow-500/30 p-2.5 rounded-xl">
              {firstPlace.punchline}
            </p>
          </div>
        )}

        {/* 3ÈME PLACE (BRONZE) */}
        {thirdPlace && (
          <div className="order-3 rounded-3xl border-2 border-amber-700/40 bg-gradient-to-b from-amber-950/80 to-black/90 p-5 text-center space-y-3 shadow-xl hover:-translate-y-2 transition duration-300 relative group">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-amber-700 text-white px-3 py-0.5 text-xs font-black font-mono border-2 border-amber-400 shadow-lg">
              🥉 3ÈME PLACE
            </div>
            <div className="pt-2 text-6xl group-hover:scale-110 transition duration-300">
              {thirdPlace.avatar3D}
            </div>
            <div>
              <h3 className="text-lg font-black text-white">{thirdPlace.name}</h3>
              <p className="text-xs text-amber-200 font-medium">{thirdPlace.title}</p>
              <span className="font-mono text-[10px] text-cyan-300 font-bold block mt-0.5">
                {thirdPlace.rankBadge}
              </span>
            </div>

            <div className="rounded-2xl bg-black/60 border border-white/10 p-3 space-y-1">
              <span className="text-[9px] font-black uppercase text-neutral-400 block">Commissions Encaissées</span>
              <span className="text-xl font-black text-emerald-400 font-mono">
                {canSeeCommission(thirdPlace.name) ? (
                  `${thirdPlace.commissionEarnedEur.toLocaleString()} € 🪙`
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-white/50 font-normal">
                    <Lock className="h-3 w-3" /> Confidentiel
                  </span>
                )}
              </span>
              <p className="text-[10px] text-neutral-400">CA Signé : {thirdPlace.revenueSignedEur.toLocaleString()} €</p>
            </div>

            <p className="text-[11px] font-serif italic text-neutral-300 bg-white/5 p-2 rounded-xl">
              {thirdPlace.punchline}
            </p>
          </div>
        )}
      </div>

      {/* TABLEAU COMPLET DE LA BATAILLE D'EGO */}
      <div className="rounded-3xl border-2 border-white/15 bg-black/70 p-5 sm:p-6 backdrop-blur-xl shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <Swords className="h-5 w-5 text-red-400" />
            <h3 className="text-lg font-black text-white">Classement Général de la Guilde XR</h3>
          </div>
          <span className="font-mono text-xs text-neutral-400">Mis à jour après chaque vente</span>
        </div>

        <div className="space-y-3">
          {sortedStats.map((seller, index) => {
            const isMe = currentUserName && seller.name.toLowerCase().includes(currentUserName.toLowerCase());
            return (
              <div
                key={seller.id}
                className={cn(
                  "rounded-2xl border-2 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all group",
                  index === 0
                    ? "border-yellow-400/60 bg-gradient-to-r from-yellow-950/30 via-black to-black"
                    : "border-white/10 bg-white/5 hover:border-white/30",
                  isMe && "ring-2 ring-[#00f2fe]"
                )}
              >
                {/* Avatar & Identité */}
                <div className="flex items-center gap-3.5 min-w-0 w-full sm:w-auto">
                  <span className="font-mono text-xl font-black text-neutral-400 w-6 text-center">
                    #{index + 1}
                  </span>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-3xl shadow-lg group-hover:scale-110 transition">
                    {seller.avatar3D}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-black text-white truncate">{seller.name}</h4>
                      {index === 0 && <span className="text-base">👑</span>}
                    </div>
                    <p className="text-xs text-neutral-400 truncate">{seller.title}</p>
                    <span className="font-mono text-[10px] text-yellow-300 font-bold block mt-0.5">
                      {seller.rankTitle}
                    </span>
                  </div>
                </div>

                {/* Score & Punchline */}
                <div className="flex flex-wrap items-center justify-between sm:justify-end gap-5 w-full sm:w-auto">
                  <div className="text-center sm:text-right">
                    <span className="text-[9px] font-black uppercase text-neutral-400 block">Maquettes Créées</span>
                    <span className="text-sm font-black text-cyan-300 font-mono">
                      🎨 {seller.maquettesRequested} maquettes
                    </span>
                  </div>

                  <div className="text-center sm:text-right">
                    <span className="text-[9px] font-black uppercase text-neutral-400 block">CA Signé</span>
                    <span className="text-base font-black text-white font-mono">
                      {seller.revenueSignedEur.toLocaleString()} €
                    </span>
                  </div>

                  <div className="text-center sm:text-right rounded-xl bg-black/60 border border-white/10 px-3 py-1.5">
                    <span className="text-[8.5px] font-black uppercase text-yellow-400 block">Commissions</span>
                    <span className="text-lg font-black text-emerald-400 font-mono">
                      {canSeeCommission(seller.name) ? (
                        `+${seller.commissionEarnedEur.toLocaleString()} € 🪙`
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-white/50 font-normal">
                          <Lock className="h-3 w-3" /> Confidentiel
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
