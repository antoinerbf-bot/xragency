import { Trophy, Palette, CheckCircle2, Flame, Sparkles, Award } from "lucide-react";
import {
  XR_OFFICIAL_SERVICES,
  type Lead,
  type TeamMember,
} from "@/lib/crm/data";

interface ContestLeaderboardProps {
  allLeads: Lead[]; // Calculs agrégés anonymisés — aucune coordonnée client ni commission exposée
  members: TeamMember[];
  currentUser: TeamMember;
}

export function ContestLeaderboard({ allLeads, members, currentUser }: ContestLeaderboardProps) {
  const competitors = members.filter((m) => m.roleType !== "studio");

  const board = competitors
    .map((member) => {
      // Un membre est crédité s'il est closer ou setter sur le dossier
      const myActiveLeads = allLeads.filter(
        (l) => l.closerId === member.id || l.setterId === member.id
      );
      const mockupsInProgress = myActiveLeads.filter((l) => l.stage === "mockup").length;
      const rdvInProgress = myActiveLeads.filter((l) => l.stage === "rdv" || l.stage === "negociation").length;
      const wonDeals = allLeads.filter(
        (l) => l.stage === "won" && (l.closerId === member.id || l.setterId === member.id)
      );

      // Comptage "qui a vendu quoi" (par service, sans jamais exposer le nom du client ni la commission)
      const soldByService: Record<string, number> = {};
      wonDeals.forEach((deal) => {
        const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === deal.serviceId);
        const key = svc ? `${svc.icon} ${svc.shortName}` : deal.serviceId;
        soldByService[key] = (soldByService[key] || 0) + 1;
      });

      // Score concours ludique
      const points = wonDeals.length * 100 + mockupsInProgress * 25 + rdvInProgress * 15;

      return {
        member,
        mockupsInProgress,
        rdvInProgress,
        wonCount: wonDeals.length,
        soldServices: Object.entries(soldByService),
        points,
      };
    })
    .sort((a, b) => b.points - a.points || b.wonCount - a.wonCount || b.mockupsInProgress - a.mockupsInProgress);

  const totalMockupsTeam = allLeads.filter((l) => l.stage === "mockup").length;
  const totalSalesTeam = allLeads.filter((l) => l.stage === "won").length;

  // Flux des dernières ventes (anonymisé : qui a vendu quel service, zéro info client/commission)
  const recentWins = allLeads
    .filter((l) => l.stage === "won")
    .slice(0, 6)
    .map((l) => {
      const closer = members.find((m) => m.id === l.closerId);
      const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === l.serviceId);
      return {
        id: l.id,
        sellerName: closer?.shortName || "Équipe",
        serviceIcon: svc?.icon || "🏆",
        serviceName: svc?.shortName || "Prestation",
        planLabel: l.planLabel,
        date: l.createdAt,
      };
    });

  return (
    <div className="mt-6 space-y-6">
      {/* Bandeau Concours */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-violet-500/10 border border-white/[0.1] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-black shadow-lg shadow-amber-500/20">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Concours d'Équipe · Statistiques Partagées
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                100 % Confidentiel sur clients & commissions
              </span>
            </h2>
            <p className="text-xs text-white/60 mt-0.5">
              Suivez en direct qui a combien de maquettes en cours et qui a vendu quels services. +100 pts par vente · +25 pts par maquette · +15 pts par RDV/négo.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-center">
            <p className="text-[10px] text-white/40 uppercase font-semibold">Maquettes Équipe</p>
            <p className="text-lg font-black text-amber-300">{totalMockupsTeam}</p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-center">
            <p className="text-[10px] text-white/40 uppercase font-semibold">Ventes Équipe</p>
            <p className="text-lg font-black text-emerald-400">{totalSalesTeam}</p>
          </div>
        </div>
      </div>

      {/* Tableau Classement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            Classement Général (Maquettes en cours & Services vendus)
          </h3>

          <div className="space-y-2.5">
            {board.map((row, index) => {
              const isMe = row.member.id === currentUser.id;
              const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`;
              return (
                <div
                  key={row.member.id}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isMe
                      ? "bg-amber-400/10 border-amber-400/40 shadow-sm"
                      : "bg-white/[0.02] border-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 text-center text-base font-black text-white/70">
                      {medal}
                    </span>
                    <div
                      className={`h-9 w-9 rounded-xl bg-gradient-to-br ${row.member.avatarBg} flex items-center justify-center text-white font-bold text-xs shrink-0`}
                    >
                      {row.member.shortName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white flex items-center gap-1.5">
                        {row.member.name}
                        {isMe && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300">
                            Vous
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-white/40">{row.member.badge}</p>
                    </div>
                  </div>

                  {/* Qui a vendu quoi */}
                  <div className="flex flex-wrap items-center gap-1.5 flex-1 sm:justify-center">
                    {row.soldServices.length > 0 ? (
                      row.soldServices.map(([label, qty]) => (
                        <span
                          key={label}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                        >
                          {qty}× {label}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-white/30 italic">Aucune vente enregistrée</span>
                    )}
                  </div>

                  {/* Stats chiffrées non financières */}
                  <div className="flex items-center gap-4 shrink-0 justify-end">
                    <div className="text-center">
                      <p className="text-[10px] text-white/40 flex items-center gap-1">
                        <Palette className="w-3 h-3 text-amber-400" /> Maquettes
                      </p>
                      <p className="text-sm font-bold text-amber-300 font-mono">
                        {row.mockupsInProgress}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-white/40 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Ventes
                      </p>
                      <p className="text-sm font-bold text-emerald-400 font-mono">
                        {row.wonCount}
                      </p>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/[0.08] text-right min-w-[68px]">
                      <p className="text-[9px] text-white/40 uppercase">Score</p>
                      <p className="text-xs font-black text-white font-mono">{row.points} pts</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mur des dernières victoires (Anonyme clients & montants) */}
        <div className="lg:col-span-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 flex flex-col">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Cloche des Victoires (En direct)
          </h3>

          {recentWins.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10 space-y-2">
              <Award className="w-8 h-8 text-white/20" />
              <p className="text-xs text-white/50">
                La cloche sonnera ici dès la première vente validée par l'équipe !
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentWins.map((w) => (
                <div
                  key={w.id}
                  className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-2.5"
                >
                  <span className="text-lg">{w.serviceIcon}</span>
                  <div className="min-w-0">
                    <p className="text-xs text-white leading-snug">
                      <strong className="text-emerald-300">{w.sellerName}</strong> a signé{" "}
                      <strong>{w.serviceName}</strong> ({w.planLabel})
                    </p>
                    <p className="text-[10px] text-white/40 mt-0.5">{w.date} · +100 pts</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
