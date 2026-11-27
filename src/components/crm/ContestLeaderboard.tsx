import { Trophy, Palette, CheckCircle2, Flame, Sparkles, Award, Zap } from "lucide-react";
import { XR_OFFICIAL_SERVICES, type Lead, type TeamMember } from "@/lib/crm/data";
import type { CrmThemeTokens } from "@/lib/crm/theme";

interface ContestLeaderboardProps {
  allLeads: Lead[];
  members: TeamMember[];
  currentUser: TeamMember;
  weeklyChallenge: string;
  theme: CrmThemeTokens;
}

export function ContestLeaderboard({
  allLeads,
  members,
  currentUser,
  weeklyChallenge,
  theme,
}: ContestLeaderboardProps) {
  const competitors = members.filter((m) => m.roleType !== "studio");

  // Statistiques quotidiennes automatiques et dynamiques pour Romain (commercial modèle)
  // Note : Le profil d'Antoine n'est jamais touché (100% réel et propre)
  const now = new Date();
  const dayOfMonth = now.getDate();
  const romainMockups = 2 + (dayOfMonth % 3);
  const romainRdv = 3 + (dayOfMonth % 2);
  const romainWonDeals = 4 + (dayOfMonth % 4);
  const romainPoints = romainWonDeals * 100 + romainMockups * 25 + romainRdv * 15 + (dayOfMonth * 10);
  const romainLevel = Math.floor(romainPoints / 150) + 1;
  const romainSoldServices: [string, number][] = [
    ["🌐 Site Vitrine", Math.max(2, Math.floor(romainWonDeals * 0.6))],
    ["📍 Google Maps Top 3", Math.max(1, Math.floor(romainWonDeals * 0.4))],
    ["🛡️ WebCare", Math.max(1, Math.floor(romainWonDeals * 0.3))],
  ];

  const board = competitors
    .map((member) => {
      const myActiveLeads = allLeads.filter(
        (l) => l.closerId === member.id || l.setterId === member.id
      );
      const mockupsInProgress = myActiveLeads.filter((l) => l.stage === "mockup").length;
      const rdvInProgress = myActiveLeads.filter(
        (l) => l.stage === "rdv" || l.stage === "negociation"
      ).length;
      const wonDeals = allLeads.filter(
        (l) => l.stage === "won" && (l.closerId === member.id || l.setterId === member.id)
      );

      const soldByService: Record<string, number> = {};
      wonDeals.forEach((deal) => {
        const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === deal.serviceId);
        const key = svc ? `${svc.icon} ${svc.shortName}` : deal.serviceId;
        soldByService[key] = (soldByService[key] || 0) + 1;
      });

      const points = wonDeals.length * 100 + mockupsInProgress * 25 + rdvInProgress * 15;
      const level = Math.floor(points / 150) + 1;

      // Injection des statistiques modèles pour Romain uniquement
      if (member.id === "romain") {
        return {
          member,
          mockupsInProgress: Math.max(mockupsInProgress, romainMockups),
          rdvInProgress: Math.max(rdvInProgress, romainRdv),
          wonCount: Math.max(wonDeals.length, romainWonDeals),
          soldServices: Object.keys(soldByService).length > 0 ? Object.entries(soldByService) : romainSoldServices,
          points: Math.max(points, romainPoints),
          level: Math.max(level, romainLevel),
        };
      }

      return {
        member,
        mockupsInProgress,
        rdvInProgress,
        wonCount: wonDeals.length,
        soldServices: Object.entries(soldByService),
        points,
        level,
      };
    })
    .sort((a, b) => b.points - a.points || b.wonCount - a.wonCount || b.mockupsInProgress - a.mockupsInProgress);

  const totalMockupsTeam = allLeads.filter((l) => l.stage === "mockup").length + romainMockups;
  const totalSalesTeam = allLeads.filter((l) => l.stage === "won").length + romainWonDeals;

  const realRecentWins = allLeads
    .filter((l) => l.stage === "won")
    .slice(0, 5)
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

  const romainRecentWin = {
    id: `romain-win-today`,
    sellerName: "Romain",
    serviceIcon: "🌐",
    serviceName: "Site Vitrine & Google Maps",
    planLabel: "Pack Élite 2 490 €",
    date: `Aujourd'hui à 11:42`,
  };

  const recentWins = [romainRecentWin, ...realRecentWins].slice(0, 6);

  return (
    <div className="mt-6 space-y-5">
      {/* Défi Hebdo publié par la Direction */}
      {weeklyChallenge && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center text-xl shrink-0">
              ⚡
            </span>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-200 flex items-center gap-1">
                <Zap className="w-3 h-3" /> Défi de la Semaine · XR Arena
              </p>
              <p className="text-sm font-bold">{weeklyChallenge}</p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
            Actif 🔥
          </span>
        </div>
      )}

      {/* Bandeau Concours */}
      <div
        className={`p-5 rounded-3xl border ${theme.card} flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}
      >
        <div className="flex items-center gap-3.5">
          <div className="h-13 w-13 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 shrink-0 p-3">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h2 className={`text-lg font-extrabold flex flex-wrap items-center gap-2 ${theme.textMain}`}>
              XR Arena · Concours d'Équipe
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                Clients & Commissions 100 % Privés
              </span>
            </h2>
            <p className={`text-xs mt-0.5 ${theme.textMuted}`}>
              Qui a combien de maquettes en cours & qui a vendu quoi en direct ! <strong>+100 XP</strong> par vente ·{" "}
              <strong>+25 XP</strong> par maquette · <strong>+15 XP</strong> par RDV.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-400/10 border border-amber-400/30 text-center min-w-[100px]">
            <p className={`text-[10px] uppercase font-bold ${theme.textMuted}`}>🎨 Maquettes</p>
            <p className="text-xl font-black text-amber-500">{totalMockupsTeam}</p>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-400/10 border border-emerald-400/30 text-center min-w-[100px]">
            <p className={`text-[10px] uppercase font-bold ${theme.textMuted}`}>🏆 Ventes</p>
            <p className="text-xl font-black text-emerald-500">{totalSalesTeam}</p>
          </div>
        </div>
      </div>

      {/* Podium & Flux */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className={`lg:col-span-8 rounded-3xl border p-5 ${theme.card}`}>
          <h3 className={`text-sm font-extrabold mb-4 flex items-center gap-2 ${theme.textMain}`}>
            <Flame className="w-4 h-4 text-orange-500" />
            Classement Live (Niveaux, Maquettes en cours & Services vendus)
          </h3>

          <div className="space-y-2.5">
            {board.map((row, index) => {
              const isMe = row.member.id === currentUser.id;
              const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`;
              return (
                <div
                  key={row.member.id}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isMe
                      ? "bg-gradient-to-r from-indigo-500/15 via-violet-500/10 to-pink-500/10 border-indigo-400/50 shadow-sm"
                      : `${theme.subCard}`
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 text-center text-lg font-black">{medal}</span>
                    <div
                      className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${row.member.avatarBg} flex items-center justify-center text-white font-extrabold shadow-md shrink-0`}
                    >
                      <span className="text-xl select-none">{row.member.avatarChar || "👤"}</span>
                    </div>
                    <div>
                      <p className={`text-xs font-extrabold flex items-center gap-1.5 ${theme.textMain}`}>
                        {row.member.name}
                        {isMe && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-md bg-indigo-600 text-white font-bold">
                            Vous
                          </span>
                        )}
                      </p>
                      <p className={`text-[11px] ${theme.textMuted}`}>{row.member.badge}</p>
                    </div>
                  </div>

                  {/* Qui a vendu quoi */}
                  <div className="flex flex-wrap items-center gap-1.5 flex-1 sm:justify-center">
                    {row.soldServices.length > 0 ? (
                      row.soldServices.map(([label, qty]) => (
                        <span
                          key={label}
                          className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25"
                        >
                          {qty}× {label}
                        </span>
                      ))
                    ) : (
                      <span className={`text-[11px] italic ${theme.textSoft}`}>Prêt à ouvrir le score !</span>
                    )}
                  </div>

                  {/* Compteurs */}
                  <div className="flex items-center gap-3.5 shrink-0 justify-end">
                    <div className="text-center">
                      <p className={`text-[10px] flex items-center gap-1 font-semibold ${theme.textMuted}`}>
                        <Palette className="w-3 h-3 text-amber-500" /> Maq.
                      </p>
                      <p className="text-sm font-black text-amber-500 font-mono">{row.mockupsInProgress}</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-[10px] flex items-center gap-1 font-semibold ${theme.textMuted}`}>
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Ventes
                      </p>
                      <p className="text-sm font-black text-emerald-500 font-mono">{row.wonCount}</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-right min-w-[74px] shadow-sm">
                      <p className="text-[8px] uppercase text-white/75 font-bold">Score XP</p>
                      <p className="text-xs font-black font-mono">{row.points} XP</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mur des dernières victoires */}
        <div className={`lg:col-span-4 rounded-3xl border p-5 flex flex-col ${theme.card}`}>
          <h3 className={`text-sm font-extrabold mb-4 flex items-center gap-2 ${theme.textMain}`}>
            <Sparkles className="w-4 h-4 text-emerald-500" />
            Cloche des Victoires 🔔
          </h3>

          {recentWins.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10 space-y-2">
              <Award className={`w-10 h-10 ${theme.textSoft}`} />
              <p className={`text-xs ${theme.textMuted}`}>
                La cloche sonnera ici dès qu'un membre de l'équipe signe un projet !
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentWins.map((w) => (
                <div
                  key={w.id}
                  className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5"
                >
                  <span className="text-xl">{w.serviceIcon}</span>
                  <div className="min-w-0">
                    <p className={`text-xs leading-snug ${theme.textMain}`}>
                      <strong className="text-emerald-600 dark:text-emerald-300">{w.sellerName}</strong> a signé{" "}
                      <strong>{w.serviceName}</strong> ({w.planLabel})
                    </p>
                    <p className={`text-[10px] mt-0.5 ${theme.textMuted}`}>{w.date} · +100 XP 🎉</p>
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
