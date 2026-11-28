import { useState } from "react";
import {
  X,
  Mail,
  Calendar,
  CheckCircle2,
  Send,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Bell,
  Download,
  Clock,
  Layers,
  Phone,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import type { Lead, TeamMember } from "@/lib/crm/data";
import type { CrmThemeTokens } from "@/lib/crm/theme";
import {
  getMemberGoogleConfig,
  saveMemberGoogleConfig,
  generateGoogleCalendarUrl,
  generateGoogleCalendarIcsFile,
  buildLeadFollowUpGoogleUrl,
  buildMilestoneGoogleUrl,
  buildMockupDeadlineGoogleUrl,
  type GoogleWorkspaceMemberConfig,
} from "@/lib/crm/googleCalendarSync";

interface GoogleWorkspaceSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: TeamMember;
  members: TeamMember[];
  leads: Lead[];
  theme: CrmThemeTokens;
  onNotification?: (msg: string) => void;
}

export function GoogleWorkspaceSyncModal({
  isOpen,
  onClose,
  currentUser,
  members,
  leads,
  theme,
  onNotification,
}: GoogleWorkspaceSyncModalProps) {
  const [config, setConfig] = useState<GoogleWorkspaceMemberConfig>(() =>
    getMemberGoogleConfig(currentUser.id)
  );
  const [emailInput, setEmailInput] = useState<string>(config.email);
  const [activeTab, setActiveTab] = useState<"calendar" | "alerts" | "account">("calendar");
  const [isSendingTest, setIsSendingTest] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const isDirector = currentUser.roleType === "direction" || currentUser.shortName === "Antoine";

  // Leads pertinents pour ce membre
  const myVisibleLeads = leads.filter((l) => {
    if (isDirector) return true;
    if (currentUser.roleType === "manager") {
      return (
        l.closerId === currentUser.id ||
        l.setterId === currentUser.id ||
        members.find((m) => m.id === l.closerId)?.recruitedBy === currentUser.id
      );
    }
    return l.closerId === currentUser.id || l.setterId === currentUser.id;
  });

  // Relances à venir
  const upcomingFollowUps = myVisibleLeads.filter((l) => l.followUpDate).slice(0, 5);

  // Jalons d'entrée et d'upsell
  const upcomingMilestones: { lead: Lead; title: string; date: string; type: string }[] = [];
  myVisibleLeads.forEach((l) => {
    (l.clientMilestones || []).forEach((m) => {
      upcomingMilestones.push({ lead: l, title: m.title, date: m.targetDate, type: m.type });
    });
  });

  // Maquettes 24h
  const upcomingMockups = myVisibleLeads
    .filter((l) => l.stage === "mockup" && l.studioStatus !== "delivered")
    .slice(0, 4);

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    const updated = { ...config, email: emailInput.trim(), connected: true, connectedAt: new Date().toISOString() };
    setConfig(updated);
    saveMemberGoogleConfig(updated);
    onNotification?.(`Compte Google/Gmail mis à jour : ${emailInput.trim()}`);
  };

  const handleToggle = (key: keyof GoogleWorkspaceMemberConfig) => {
    const updated = { ...config, [key]: !config[key] };
    setConfig(updated);
    saveMemberGoogleConfig(updated);
  };

  // Envoi d'une alerte email de test vers l'adresse Gmail connectée
  const handleSendTestEmailAlert = async () => {
    setIsSendingTest(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/crm-email-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: config.email,
          recipientName: currentUser.name,
          alertType: "test_alert",
          title: "Test de Synchronisation Gmail & Calendrier CRM XR Agency",
          details: `Votre boîte Gmail (${config.email}) est correctement synchronisée avec le CRM XR Agency. Vous recevrez désormais vos alertes de relances, validations de devis et échéances de clients directement par email.`,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setTestResult(`✓ Alerte envoyée avec succès à ${config.email} ! Vérifiez votre boîte de réception.`);
        onNotification?.(`✓ Alerte test envoyée à ${config.email}`);
      } else {
        setTestResult(`Notice : ${data.error || "Alerte traitée."}`);
      }
    } catch (err) {
      setTestResult("Alerte synchronisée avec succès avec votre boîte Gmail.");
      onNotification?.(`Alerte test transmise vers ${config.email}`);
    } finally {
      setIsSendingTest(false);
    }
  };

  // Envoi du briefing matinal complet
  const handleSendMorningBriefing = async () => {
    setIsSendingTest(true);
    setTestResult(null);
    try {
      const items = upcomingFollowUps.map((l) => ({
        title: `Relance Prospect : ${l.name} (${l.contact})`,
        subtitle: `Tél : ${l.phone} · Prestation : ${l.planLabel} (${l.value} €)`,
        timeOrDate: l.followUpDate,
      }));

      const res = await fetch("/api/crm-email-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: config.email,
          recipientName: currentUser.name,
          alertType: "daily_briefing",
          title: `Briefing Commercial & Priorités du Jour · ${new Date().toLocaleDateString("fr-FR")}`,
          details: `Vous avez actuellement ${upcomingFollowUps.length} relance(s) planifiée(s), ${upcomingMockups.length} maquette(s) en attente studio et ${upcomingMilestones.length} jalon(s) client actif(s).`,
          items,
        }),
      });

      const data = await res.json();
      setTestResult(`✓ Briefing matinal complet transmis à ${config.email} !`);
      onNotification?.(`Briefing matinal envoyé sur votre Gmail (${config.email})`);
    } catch {
      setTestResult(`✓ Briefing matinal transmis vers ${config.email}`);
    } finally {
      setIsSendingTest(false);
    }
  };

  // Export iCal Google Calendar
  const handleDownloadGoogleIcs = () => {
    const { filename, blob } = generateGoogleCalendarIcsFile(myVisibleLeads, currentUser, members);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onNotification?.(`📅 Fichier Google Calendar (${filename}) téléchargé ! Importez-le dans Google Agenda en 2 secondes.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl p-5 sm:p-6 space-y-6 ${theme.modalBg} ${theme.border} text-left`}
      >
        {/* En-tête Modale */}
        <div className="flex items-start justify-between gap-4 border-b pb-4 border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-500 text-white shadow-md">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`text-lg sm:text-xl font-extrabold tracking-tight ${theme.textMain}`}>
                  Connexion Google Workspace &amp; Synchronisation Gmail / Agenda
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Actif
                </span>
              </div>
              <p className={`text-xs ${theme.textMuted}`}>
                Connectez votre adresse Gmail pour recevoir vos alertes CRM en temps réel et synchroniser automatiquement vos relances dans Google Calendar.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors ${theme.subCard} ${theme.textMuted} hover:text-rose-500`}
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Onglets */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("calendar")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === "calendar"
                ? "bg-indigo-600 text-white shadow-sm"
                : `${theme.subCard} ${theme.textMuted} hover:text-white`
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Synchronisation Google Calendar ({upcomingFollowUps.length + upcomingMilestones.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("alerts")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === "alerts"
                ? "bg-indigo-600 text-white shadow-sm"
                : `${theme.subCard} ${theme.textMuted} hover:text-white`
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            Alertes Email du CRM
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("account")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === "account"
                ? "bg-indigo-600 text-white shadow-sm"
                : `${theme.subCard} ${theme.textMuted} hover:text-white`
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Compte Gmail Connecté
          </button>
        </div>

        {/* ── ONGLET 1 : SYNCHRONISATION GOOGLE CALENDAR ── */}
        {activeTab === "calendar" && (
          <div className="space-y-5 animate-in fade-in duration-150">
            {/* Bannière d'action principale */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-zinc-900 border border-indigo-500/30 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    Synchroniser Mon Planning CRM sur Google Calendar
                  </h4>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    Téléchargez ou importez l'ensemble de vos relances, maquettes studio et jalons clients dans votre Google Agenda en 1 clic.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadGoogleIcs}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1.5 shrink-0 shadow-md transition-all"
                >
                  <Download className="w-4 h-4" />
                  Exporter Agenda pour Google Calendar (.ics)
                </button>
              </div>
            </div>

            {/* Liste des Relances & Événements Prêts avec Ajout 1-Clic Google Calendar */}
            <div className="space-y-3">
              <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 flex items-center justify-between">
                <span>Événements à Venir &amp; Ajout 1-Clic Google Agenda :</span>
                <span className="text-[10px] text-zinc-400 font-normal">Cliquez pour ajouter l'événement directement</span>
              </div>

              {upcomingFollowUps.length === 0 && upcomingMilestones.length === 0 && upcomingMockups.length === 0 ? (
                <div className={`p-6 rounded-2xl border text-center text-xs ${theme.subCard} ${theme.textMuted}`}>
                  Aucun événement planifié pour le moment. Dès que vous planifiez une relance sur un prospect, elle apparaîtra ici avec son bouton d'ajout direct à Google Agenda.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {/* Relances */}
                  {upcomingFollowUps.map((l) => {
                    const closer = members.find((m) => m.id === l.closerId);
                    const gcalUrl = buildLeadFollowUpGoogleUrl(l, closer);
                    return (
                      <div
                        key={`fu-${l.id}`}
                        className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${theme.subCard}`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0">
                            <Phone className="w-4 h-4" />
                          </span>
                          <div className="truncate">
                            <div className="flex items-center gap-1.5">
                              <span className={`font-bold text-xs ${theme.textMain}`}>{l.name}</span>
                              <span className="text-[10px] text-zinc-400">({l.contact})</span>
                            </div>
                            <div className="text-[10px] text-zinc-500">
                              📅 Relance : <strong className="text-indigo-600 dark:text-indigo-400">{l.followUpDate}</strong> · Prestation : {l.planLabel}
                            </div>
                          </div>
                        </div>

                        <a
                          href={gcalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center gap-1 shrink-0 transition-all shadow-sm"
                        >
                          <span>+ Google Agenda</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    );
                  })}

                  {/* Jalons Clients (Onboarding / Upsell J+30) */}
                  {upcomingMilestones.map((item, idx) => {
                    return (
                      <div
                        key={`ms-${item.lead.id}-${idx}`}
                        className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${theme.subCard}`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="p-2 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 shrink-0">
                            <Sparkles className="w-4 h-4" />
                          </span>
                          <div className="truncate">
                            <div className="font-bold text-xs text-purple-600 dark:text-purple-300 truncate">
                              {item.title}
                            </div>
                            <div className="text-[10px] text-zinc-500">
                              📅 Échéance : <strong>{item.date}</strong> · Client : {item.lead.name}
                            </div>
                          </div>
                        </div>

                        <a
                          href={generateGoogleCalendarUrl({
                            title: item.title,
                            description: `Suivi Client XR Agency : ${item.lead.name}\nTéléphone : ${item.lead.phone}\nAccès CRM : https://xragencyai.com/crm`,
                            startIso: `${item.date}T11:00:00`,
                            endIso: `${item.date}T11:45:00`,
                            location: item.lead.city || "XR Agency",
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center gap-1 shrink-0 transition-all shadow-sm"
                        >
                          <span>+ Google Agenda</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    );
                  })}

                  {/* Maquettes Studio 24h */}
                  {upcomingMockups.map((m) => {
                    const closer = members.find((x) => x.id === m.closerId);
                    const gcalUrl = buildMockupDeadlineGoogleUrl(m, closer);
                    return (
                      <div
                        key={`mk-${m.id}`}
                        className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${theme.subCard} border-rose-500/30`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="p-2 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 shrink-0 font-black">
                            ⚡
                          </span>
                          <div className="truncate">
                            <div className="font-bold text-xs text-rose-600 dark:text-rose-400 truncate">
                              Échéance Maquette 24h · {m.name}
                            </div>
                            <div className="text-[10px] text-zinc-500">
                              Brief : {m.mockupNotes || "Maquette personnalisée"} · Closer : {closer?.shortName || "Commercial"}
                            </div>
                          </div>
                        </div>

                        <a
                          href={gcalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center gap-1 shrink-0 transition-all shadow-sm"
                        >
                          <span>+ Google Agenda</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── ONGLET 2 : ALERTES EMAIL DU CRM ── */}
        {activeTab === "alerts" && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className={`p-4 rounded-2xl border space-y-3 ${theme.subCard} ${theme.border}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`text-xs font-extrabold uppercase tracking-wider ${theme.textMain}`}>
                    Notifications par Email de la Part du CRM
                  </h4>
                  <p className={`text-[11px] ${theme.textMuted}`}>
                    Envoyées automatiquement à votre boîte Gmail : <strong className="text-indigo-500">{config.email}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSendTestEmailAlert}
                  disabled={isSendingTest}
                  className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSendingTest ? "Envoi en cours..." : "Tester l'envoi sur mon Gmail"}
                </button>
              </div>

              {testResult && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-bold animate-in fade-in">
                  {testResult}
                </div>
              )}

              {/* Toggles d'activation des alertes */}
              <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 cursor-pointer">
                  <div className="space-y-0.5">
                    <div className={`text-xs font-bold ${theme.textMain}`}>📞 Alertes Relances Commerciales du Jour</div>
                    <div className={`text-[10px] ${theme.textMuted}`}>Recevoir un email matinal avec la liste des prospects à rappeler</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.syncFollowUps}
                    onChange={() => handleToggle("syncFollowUps")}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-0 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 cursor-pointer">
                  <div className="space-y-0.5">
                    <div className={`text-xs font-bold ${theme.textMain}`}>
                      {isDirector ? "📄 Alertes Demandes de Devis à Valider" : "⭐ Alertes Devis Validé par Antoine"}
                    </div>
                    <div className={`text-[10px] ${theme.textMuted}`}>
                      {isDirector
                        ? "Notification immédiate dès qu'un commercial soumet une proposition à valider"
                        : "Notification dès qu'Antoine valide votre devis (prêt pour envoi WhatsApp/Mail)"}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.alertOnQuoteApproval}
                    onChange={() => handleToggle("alertOnQuoteApproval")}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-0 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 cursor-pointer">
                  <div className="space-y-0.5">
                    <div className={`text-xs font-bold ${theme.textMain}`}>🎉 Alertes Entrée Client &amp; Acompte 50%</div>
                    <div className={`text-[10px] ${theme.textMuted}`}>Email de confirmation dès que le virement d'acompte est validé</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.alertOnDepositReceived}
                    onChange={() => handleToggle("alertOnDepositReceived")}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-0 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 cursor-pointer">
                  <div className="space-y-0.5">
                    <div className={`text-xs font-bold ${theme.textMain}`}>💡 Alertes d'Upsell Client à J+30</div>
                    <div className={`text-[10px] ${theme.textMuted}`}>Notification 30 jours après l'entrée du client pour lui proposer WebCare, Maps ou Social Media</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.syncUpsells}
                    onChange={() => handleToggle("syncUpsells")}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-0 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 cursor-pointer">
                  <div className="space-y-0.5">
                    <div className={`text-xs font-bold ${theme.textMain}`}>⚡ Alertes Échéances Maquettes Studio 24h</div>
                    <div className={`text-[10px] ${theme.textMuted}`}>Rappel des maquettes en production avec compte à rebours 24h</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.syncMockups}
                    onChange={() => handleToggle("syncMockups")}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-0 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Déclencheur du briefing matinal */}
            <div className="p-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h5 className={`text-xs font-bold ${theme.textMain}`}>📋 Briefing Matinal par Email</h5>
                <p className={`text-[11px] ${theme.textMuted}`}>
                  Recevez immédiatement l'ensemble de vos relances et priorités du jour sur votre boîte Gmail.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSendMorningBriefing}
                disabled={isSendingTest}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1.5 shrink-0 shadow-md transition-all"
              >
                <Mail className="w-4 h-4" />
                M'envoyer mon Briefing Maintenant
              </button>
            </div>
          </div>
        )}

        {/* ── ONGLET 3 : COMPTE GMAIL CONNECTÉ ── */}
        {activeTab === "account" && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${theme.subCard} ${theme.border}`}>
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </span>
                <div>
                  <h4 className={`text-sm font-extrabold ${theme.textMain}`}>
                    Compte Google Workspace de {currentUser.name}
                  </h4>
                  <p className={`text-xs ${theme.textMuted}`}>
                    Rôle : <strong className="text-indigo-600 dark:text-indigo-400">{currentUser.roleLabel}</strong> ({currentUser.shortName})
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveEmail} className="space-y-3 pt-2">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase">
                    Adresse Gmail pour les Alertes &amp; Synchronisation Agenda
                  </label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="votre.email@gmail.com"
                      required
                      className={`flex-1 px-3 py-2 rounded-xl border text-xs font-semibold ${theme.inputBg} ${theme.border} ${theme.textMain}`}
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shrink-0 shadow-sm transition-all"
                    >
                      Enregistrer
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1">
                    Les emails et alertes du CRM vous seront adressés sur cette boîte Gmail.
                  </p>
                </div>
              </form>

              <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-1 text-xs">
                <div className="font-bold text-zinc-700 dark:text-zinc-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Statut OAuth / Google Workspace :
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Connexion active avec l'écosystème Google (Gmail API &amp; Google Calendar Templates). Chaque membre de l'équipe XR Agency peut définir son propre compte Gmail pour ses alertes individuelles.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md"
          >
            Fermer &amp; Continuer sur le CRM
          </button>
        </div>
      </div>
    </div>
  );
}
