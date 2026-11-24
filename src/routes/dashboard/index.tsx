import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  FolderKanban,
  HelpCircle,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  Lock,
  LogOut,
  Mail,
  MessageCircle,
  MessageSquare,
  Plus,
  Receipt,
  Send,
  Settings,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useLang, type L } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { Logo } from "@/components/site/primitives";
import type {
  CrmClientRecord,
  CrmInvoiceRecord,
  CrmProjectRecord,
  CrmQuoteRecord,
  CrmTaskRecord,
  ClientDocumentRecord,
  ClientMessageRecord,
  ClientSupportTicket,
} from "@/routes/api/crm";

export const Route = createFileRoute("/dashboard/")({
  component: ClientPortalPage,
});

const l = (fr: string, en: string, vi: string, ar: string, ru: string): L => ({
  fr,
  en,
  vi,
  ar,
  ru,
});

type PortalTab =
  | "overview"
  | "projects"
  | "progress"
  | "tasks"
  | "documents"
  | "invoices"
  | "messages"
  | "support"
  | "settings";

interface PortalData {
  client: CrmClientRecord | null;
  projects: CrmProjectRecord[];
  tasks: CrmTaskRecord[];
  quotes: CrmQuoteRecord[];
  invoices: CrmInvoiceRecord[];
  documents: ClientDocumentRecord[];
  messages: ClientMessageRecord[];
  tickets: ClientSupportTicket[];
  stats: {
    activeProjects: number;
    avgProgressPct: number;
    openTasks: number;
    pendingInvoicesEur: number;
    paidInvoicesEur: number;
    openTickets: number;
  };
}

interface PortalUser {
  id: string;
  email: string;
  fullName: string;
  role: "admin" | "member" | "client";
  clientId?: string;
}

const STAGE_LABELS: Record<string, L> = {
  prep: l("Cadrage", "Scoping", "Chuẩn bị", "التخطيط", "Подготовка"),
  waiting: l("En attente", "Waiting", "Chờ phản hồi", "قيد الانتظار", "Ожидание"),
  production: l("En production", "In production", "Đang sản xuất", "قيد التنفيذ", "В работе"),
  review: l("Validation", "In review", "Đang duyệt", "قيد المراجعة", "На проверке"),
  delivered: l("Livré", "Delivered", "Đã bàn giao", "تم التسليم", "Сдан"),
  suspended: l("En pause", "Paused", "Tạm dừng", "متوقف مؤقتاً", "На паузе"),
};

function ClientPortalPage() {
  const { lang, t, price } = useLang();
  const isRtl = lang === "ar";

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [user, setUser] = useState<PortalUser | null>(null);
  const [portal, setPortal] = useState<PortalData | null>(null);
  const [availableClients, setAvailableClients] = useState<
    Array<{ id: string; company: string; email: string }>
  >([]);
  const [activeClientId, setActiveClientId] = useState<string>("");
  const [tab, setTab] = useState<PortalTab>("overview");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [noticeMsg, setNoticeMsg] = useState<string | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Interactive modules state
  const [messageDraft, setMessageDraft] = useState("");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketBody, setTicketBody] = useState("");
  const [ticketPriority, setTicketPriority] = useState<"normal" | "high" | "urgent">("normal");
  const [profileForm, setProfileForm] = useState({
    contactName: "",
    phone: "",
    website: "",
    city: "",
  });

  // Admin client access provisioning form
  const [provEmail, setProvEmail] = useState("");
  const [provPass, setProvPass] = useState("");
  const [docTitle, setDocTitle] = useState("");
  const [docUrl, setDocUrl] = useState("");

  const loadPortal = useCallback(async (requestedClientId?: string) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const checkRes = await fetch("/api/crm", { credentials: "same-origin" });
      const checkData = (await checkRes.json()) as {
        authenticated?: boolean;
        user?: PortalUser;
        clientPortal?: PortalData;
      };
      if (!checkData.authenticated || !checkData.user) {
        setUser(null);
        setPortal(null);
        setLoading(false);
        return;
      }
      setUser(checkData.user);

      // Fetch client portal snapshot (client gets own dossier; admin gets selected dossier)
      if (checkData.user.role === "client" || checkData.user.role === "admin") {
        const snapRes = await fetch("/api/crm", {
          method: "POST",
          headers: { "content-type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({
            action: "client_snapshot",
            clientId: requestedClientId || undefined,
          }),
        });
        const snapData = (await snapRes.json()) as {
          error?: string;
          availableClients?: Array<{ id: string; company: string; email: string }>;
          clientPortal?: PortalData;
        };
        if (snapRes.ok && snapData.clientPortal) {
          setPortal(snapData.clientPortal);
          if (snapData.availableClients) setAvailableClients(snapData.availableClients);
          const cid = snapData.clientPortal.client?.id || "";
          setActiveClientId(cid);
          if (snapData.clientPortal.client) {
            setProfileForm({
              contactName: snapData.clientPortal.client.contactName || "",
              phone: snapData.clientPortal.client.phone || "",
              website: snapData.clientPortal.client.website || "",
              city: snapData.clientPortal.client.city || "",
            });
            setProvEmail(snapData.clientPortal.client.email || "");
          }
        }
      }
    } catch {
      setErrorMsg(t(l("Impossible de charger votre espace.", "Could not load your portal.", "Không thể tải dữ liệu.", "تعذر تحميل بوابة العملاء.", "Не удалось загрузить портал.")));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void loadPortal();
  }, [loadPortal]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          action: "login",
          email: loginEmail.trim(),
          password: loginPassword,
        }),
      });
      const data = (await res.json()) as { authenticated?: boolean; error?: string };
      if (!res.ok || !data.authenticated) {
        setErrorMsg(data.error || t(l("Identifiants incorrects.", "Invalid credentials.", "Thông tin đăng nhập không đúng.", "بيانات الدخول غير صحيحة.", "Неверные данные входа.")));
        return;
      }
      setLoginPassword("");
      await loadPortal();
    } catch {
      setErrorMsg(t(l("Erreur de connexion.", "Connection error.", "Lỗi kết nối.", "خطأ في الاتصال.", "Ошибка подключения.")));
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/crm", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ action: "logout" }),
    });
    setUser(null);
    setPortal(null);
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!messageDraft.trim()) return;
    setBusy(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          action: "client_send_message",
          clientId: activeClientId || undefined,
          body: messageDraft.trim(),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; clientPortal?: PortalData };
      if (!res.ok || !data.ok) throw new Error(data.error || "Erreur");
      if (data.clientPortal) setPortal(data.clientPortal);
      setMessageDraft("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erreur");
    } finally {
      setBusy(false);
    }
  };

  const handleCreateTicket = async (e: FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketBody.trim()) return;
    setBusy(true);
    setErrorMsg(null);
    setNoticeMsg(null);
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          action: "client_create_ticket",
          clientId: activeClientId || undefined,
          subject: ticketSubject.trim(),
          message: ticketBody.trim(),
          priority: ticketPriority,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; clientPortal?: PortalData };
      if (!res.ok || !data.ok) throw new Error(data.error || "Erreur");
      if (data.clientPortal) setPortal(data.clientPortal);
      setTicketSubject("");
      setTicketBody("");
      setNoticeMsg(t(l("Ticket support enregistré.", "Support ticket created.", "Đã tạo yêu cầu hỗ trợ.", "تم فتح تذكرة الدعم.", "Обращение в поддержку создано.")));
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erreur");
    } finally {
      setBusy(false);
    }
  };

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErrorMsg(null);
    setNoticeMsg(null);
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          action: "client_update_profile",
          clientId: activeClientId || undefined,
          ...profileForm,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; clientPortal?: PortalData };
      if (!res.ok || !data.ok) throw new Error(data.error || "Erreur");
      if (data.clientPortal) setPortal(data.clientPortal);
      setNoticeMsg(t(l("Coordonnées mises à jour.", "Profile updated.", "Đã cập nhật hồ sơ.", "تم تحديث البيانات.", "Профиль обновлён.")));
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erreur");
    } finally {
      setBusy(false);
    }
  };

  const handleProvisionClientAccess = async (e: FormEvent) => {
    e.preventDefault();
    if (!activeClientId || !provEmail.trim() || provPass.length < 8) return;
    setBusy(true);
    setErrorMsg(null);
    setNoticeMsg(null);
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          action: "create_client_portal_access",
          clientId: activeClientId,
          email: provEmail.trim(),
          password: provPass,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Erreur");
      setProvPass("");
      setNoticeMsg(
        t(l("Accès Espace Client activé pour ", "Client Portal access enabled for ", "Đã kích hoạt quyền truy cập cho ", "تم تفعيل حساب بوابة العملاء لـ ", "Доступ к порталу активирован для ")) +
          provEmail.trim(),
      );
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erreur");
    } finally {
      setBusy(false);
    }
  };

  const handleAdminAddDocument = async (e: FormEvent) => {
    e.preventDefault();
    if (!activeClientId || !docTitle.trim() || !docUrl.trim()) return;
    setBusy(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          action: "add_client_document",
          clientId: activeClientId,
          title: docTitle.trim(),
          url: docUrl.trim(),
          category: "deliverable",
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; clientPortal?: PortalData };
      if (!res.ok || !data.ok) throw new Error(data.error || "Erreur");
      if (data.clientPortal) setPortal(data.clientPortal);
      setDocTitle("");
      setDocUrl("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erreur");
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#F7F4EE] text-[#171613]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#9E7F5A] border-t-transparent" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#7D6445]">
            XR AGENCY · {t(l("ESPACE CLIENT", "CLIENT PORTAL", "CỔNG KHÁCH HÀNG", "بوابة العملاء", "КЛИЕНТСКИЙ ПОРТАЛ"))}
          </p>
        </div>
      </div>
    );
  }

  // ── UNAUTHENTICATED: EDITORIAL CLIENT LOGIN ──
  if (!user) {
    return (
      <div
        dir={isRtl ? "rtl" : "ltr"}
        className="flex min-h-screen flex-col justify-between bg-[#F7F4EE] px-4 py-8 text-[#171613] sm:px-8"
      >
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#171613]/15 bg-white px-4 py-2 text-xs font-medium text-[#171613] transition hover:border-[#9E7F5A]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t(l("Retour au site", "Back to website", "Về trang chủ", "العودة للموقع", "На сайт"))}
            </Link>
            <Link
              to="/crm"
              className="hidden rounded-full border border-[#171613]/15 px-4 py-2 text-xs font-medium text-[#57534B] transition hover:border-[#171613] hover:text-[#171613] sm:inline-flex"
            >
              {t(l("Accès Équipe CRM", "Team CRM", "CRM nội bộ", "دخول الفريق", "Вход для команды"))}
            </Link>
          </div>
        </header>

        <main className="mx-auto my-auto w-full max-w-md py-10">
          <div className="rounded-3xl border border-[#171613]/12 bg-white p-7 shadow-[0_24px_60px_rgba(23,22,19,0.08)] sm:p-9">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#9E7F5A]/30 bg-[#FAF8F4] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7D6445]">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t(l("ESPACE CLIENT SÉCURISÉ", "SECURE CLIENT PORTAL", "CỔNG KHÁCH HÀNG BẢO MẬT", "بوابة العملاء الآمنة", "КЛИЕНТСКИЙ ПОРТАЛ"))}
            </div>
            <h1 className="mt-4 font-serif text-3xl font-medium text-[#171613]">
              {t(l("Suivez vos projets en temps réel.", "Track your projects in real time.", "Theo dõi dự án trực tiếp.", "تابع مشاريعك لحظة بلحظة.", "Контролируйте проекты онлайн."))}
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-[#57534B]">
              {t(
                l(
                  "Connectez-vous avec les identifiants transmis par XR Agency pour accéder à vos livrables, étapes, factures et messagerie.",
                  "Sign in with the credentials provided by XR Agency to access your milestones, deliverables, invoices and direct messaging.",
                  "Đăng nhập bằng tài khoản XR Agency cung cấp để xem tiến độ, tài liệu, hóa đơn và trao đổi trực tiếp.",
                  "سجّل دخولك ببياناتك المعتمدة من XR Agency لمتابعة المراحل والمستندات والفواتير والرسائل.",
                  "Войдите с помощью данных от XR Agency для доступа к этапам, документам, счетам и переписке.",
                ),
              )}
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label htmlFor="client-email" className="mb-1.5 block text-xs font-medium text-[#45413A]">
                  {t(l("Adresse e-mail", "Email address", "Địa chỉ email", "البريد الإلكتروني", "Электронная почта"))}
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7D6445]" />
                  <input
                    id="client-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="contact@entreprise.com"
                    className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] py-3 pl-10 pr-4 text-sm text-[#171613] focus:border-[#9E7F5A] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="client-password" className="mb-1.5 block text-xs font-medium text-[#45413A]">
                  {t(l("Mot de passe", "Password", "Mật khẩu", "كلمة المرور", "Пароль"))}
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7D6445]" />
                  <input
                    id="client-password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] py-3 pl-10 pr-4 text-sm text-[#171613] focus:border-[#9E7F5A] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {errorMsg && (
                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#171613] py-3.5 text-xs font-semibold text-[#F7F4EE] transition hover:bg-[#2A2823] disabled:opacity-50"
              >
                {busy
                  ? t(l("Connexion...", "Signing in...", "Đang đăng nhập...", "جارٍ الدخول...", "Вход..."))
                  : t(l("Accéder à mon Espace Client", "Sign in to Client Portal", "Vào Cổng Khách Hàng", "الدخول إلى بوابة العملاء", "Войти в кабинет"))}
                <ArrowUpRight className="h-4 w-4 text-white" />
              </button>
            </form>

            <div className="mt-6 border-t border-[#171613]/10 pt-4 text-center text-xs text-[#57534B]">
              <p>
                {t(l("Pas encore d’identifiants ?", "Need portal credentials?", "Chưa có tài khoản?", "لا تملك بيانات الدخول بعد؟", "Нет данных для входа?"))}{" "}
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#7D6445] underline underline-offset-4 hover:text-[#171613]"
                >
                  {t(l("Contacter l’équipe sur WhatsApp", "Message us on WhatsApp", "Nhắn WhatsApp", "تواصل عبر واتساب", "Написать в WhatsApp"))}
                </a>
              </p>
            </div>
          </div>
        </main>

        <footer className="mx-auto w-full max-w-6xl text-center font-mono text-[10px] text-[#57534B]">
          XR AGENCY · {t(l("AUTHENTIFICATION UNIFIÉE & DONNÉES ISOLÉES PAR CLIENT", "UNIFIED AUTHENTICATION · STRICT CLIENT ISOLATION", "XÁC THỰC ĐỒNG NHẤT", "مصادقة موحدة وعزل كامل للبيانات", "ЕДИНАЯ АВТОРИЗАЦИЯ И ИЗОЛЯЦИЯ ДАННЫХ"))}
        </footer>
      </div>
    );
  }

  // Non-admin team member visiting /dashboard -> direct them to /crm cleanly
  if (user.role === "member") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F4EE] p-6 text-[#171613]">
        <div className="max-w-md rounded-3xl border border-[#171613]/12 bg-white p-8 text-center shadow-lg">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7D6445]">
            COMPTE ÉQUIPE XR AGENCY
          </p>
          <h1 className="mt-3 font-serif text-3xl font-medium">Bonjour, {user.fullName}</h1>
          <p className="mt-2 text-sm text-[#57534B]">
            Votre session équipe donne accès au CRM interne XR Agency.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              to="/crm"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#171613] px-6 py-3 text-xs font-semibold text-[#F7F4EE]"
            >
              Ouvrir le CRM Équipe <ArrowUpRight className="h-4 w-4 text-white" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-[#171613]/20 px-6 py-2.5 text-xs font-semibold text-[#57534B]"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── AUTHENTICATED CLIENT PORTAL (9 MODULES) ──
  const navTabs: Array<{ id: PortalTab; Icon: typeof LayoutDashboard; label: L }> = [
    { id: "overview", Icon: LayoutDashboard, label: l("Tableau de bord", "Dashboard", "Tổng quan", "لوحة التحكم", "Обзор") },
    { id: "projects", Icon: FolderKanban, label: l("Projets", "Projects", "Dự án", "المشاريع", "Проекты") },
    { id: "progress", Icon: TrendingUp, label: l("Progression", "Progress", "Tiến độ", "التقدم", "Прогресс") },
    { id: "tasks", Icon: ListChecks, label: l("Tâches", "Tasks", "Công việc", "المهام", "Задачи") },
    { id: "documents", Icon: FileText, label: l("Documents", "Documents", "Tài liệu", "المستندات", "Документы") },
    { id: "invoices", Icon: Receipt, label: l("Factures", "Invoices", "Hóa đơn", "الفواتير", "Счета") },
    { id: "messages", Icon: MessageSquare, label: l("Messages", "Messages", "Tin nhắn", "الرسائل", "Сообщения") },
    { id: "support", Icon: HelpCircle, label: l("Support", "Support", "Hỗ trợ", "الدعم", "Поддержка") },
    { id: "settings", Icon: Settings, label: l("Paramètres", "Settings", "Cài đặt", "الإعدادات", "Настройки") },
  ];

  const client = portal?.client;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#F7F4EE] text-[#171613]">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-[#171613]/10 bg-[#F7F4EE]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-8">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-[#171613]/25">/</span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7D6445]">
              {t(l("Espace Client", "Client Portal", "Cổng Khách Hàng", "بوابة العملاء", "Кабинет клиента"))}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {user.role === "admin" && availableClients.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="hidden font-mono text-[10px] uppercase tracking-wider text-[#7D6445] sm:inline">
                  Aperçu client :
                </span>
                <select
                  aria-label="Sélectionner un dossier client"
                  value={activeClientId}
                  onChange={(e) => void loadPortal(e.target.value)}
                  className="rounded-full border border-[#9E7F5A]/40 bg-white px-3 py-1.5 text-xs font-semibold text-[#171613] focus:outline-none"
                >
                  {availableClients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.company}
                    </option>
                  ))}
                </select>
                <Link
                  to="/crm"
                  className="rounded-full bg-[#171613] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#2A2823]"
                >
                  CRM →
                </Link>
              </div>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#171613]/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#57534B] transition hover:border-[#171613] hover:text-[#171613]"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>{t(l("Déconnexion", "Sign out", "Đăng xuất", "خروج", "Выйти"))}</span>
            </button>
          </div>
        </div>

        {/* 9-Module Responsive Tab Bar */}
        <div className="border-t border-[#171613]/10 bg-white/80">
          <nav className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 sm:px-8">
            {navTabs.map(({ id, Icon, label }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setTab(id);
                    setNoticeMsg(null);
                    setErrorMsg(null);
                  }}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                    active
                      ? "bg-[#171613] text-[#F7F4EE]"
                      : "text-[#57534B] hover:bg-[#EEE9E0] hover:text-[#171613]"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${active ? "text-emerald-400" : ""}`} />
                  <span>{t(label)}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-8">
        {/* Welcome Banner */}
        <div className="flex flex-col gap-4 rounded-3xl border border-[#171613]/12 bg-[#171613] p-6 text-[#F7F4EE] sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
              {client?.company || user.fullName}
            </p>
            <h1 className="mt-1.5 font-serif text-2xl font-medium sm:text-4xl">
              {t(l("Bienvenue dans votre espace dédié.", "Welcome to your client workspace.", "Chào mừng đến không gian khách hàng.", "مرحباً بك في مساحتك الخاصة.", "Добро пожаловать в личный кабинет."))}
            </h1>
            <p className="mt-1.5 text-xs text-[#F7F4EE]/70">
              {client
                ? `${client.contactName} · ${client.email}${client.city ? ` · ${client.city}` : ""}`
                : user.email}
            </p>
          </div>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#12110E] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2B2925]"
          >
            <MessageCircle className="h-4 w-4" />
            {t(l("Ligne directe WhatsApp", "Direct WhatsApp line", "Hỗ trợ WhatsApp", "واتساب مباشر", "Прямой WhatsApp"))}
          </a>
        </div>

        {noticeMsg && (
          <div className="rounded-2xl border border-[#9E7F5A]/40 bg-[#EEE9E0] px-4 py-3 text-xs font-medium text-[#171613]">
            {noticeMsg}
          </div>
        )}
        {errorMsg && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
            {errorMsg}
          </div>
        )}

        {/* MODULE 1: TABLEAU DE BORD */}
        {tab === "overview" && portal && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-2xl border border-[#171613]/10 bg-white p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#7D6445]">
                  {t(l("Projets actifs", "Active projects", "Dự án đang chạy", "مشاريع نشطة", "Активные проекты"))}
                </p>
                <p className="mt-2 font-serif text-4xl font-semibold text-[#171613]">
                  {portal.stats.activeProjects}
                </p>
              </div>
              <div className="rounded-2xl border border-[#171613]/10 bg-white p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#7D6445]">
                  {t(l("Progression moyenne", "Average progress", "Tiến độ trung bình", "متوسط التقدم", "Средний прогресс"))}
                </p>
                <p className="mt-2 font-serif text-4xl font-semibold text-[#9E7F5A]">
                  {portal.stats.avgProgressPct}%
                </p>
              </div>
              <div className="rounded-2xl border border-[#171613]/10 bg-white p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#7D6445]">
                  {t(l("Tâches en cours", "Open tasks", "Công việc mở", "مهام جارية", "Открытые задачи"))}
                </p>
                <p className="mt-2 font-serif text-4xl font-semibold text-[#171613]">
                  {portal.stats.openTasks}
                </p>
              </div>
              <div className="rounded-2xl border border-[#171613]/10 bg-white p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#7D6445]">
                  {t(l("Factures réglées", "Paid invoices", "Hóa đơn đã thanh toán", "فواتير مدفوعة", "Оплачено"))}
                </p>
                <p className="mt-2 font-serif text-3xl font-semibold text-[#171613]">
                  {price(portal.stats.paidInvoicesEur)}
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-[#171613]/10 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-medium">
                    {t(l("Projets en cours", "Current projects", "Dự án hiện tại", "المشاريع الحالية", "Текущие проекты"))}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setTab("projects")}
                    className="text-xs font-semibold text-[#7D6445] hover:underline"
                  >
                    {t(l("Tout voir →", "View all →", "Xem tất cả →", "عرض الكل ←", "Все проекты →"))}
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {portal.projects.length === 0 ? (
                    <p className="text-xs text-[#57534B]">Aucun projet enregistré.</p>
                  ) : (
                    portal.projects.map((p) => (
                      <div key={p.id} className="rounded-2xl border border-[#171613]/10 bg-[#FAF8F4] p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-[#171613]">{p.projectName}</span>
                          <span className="rounded-full bg-[#171613] px-2.5 py-0.5 font-mono text-[10px] text-white">
                            {p.progressPct}%
                          </span>
                        </div>
                        <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[#171613]/10">
                          <div
                            className="h-full rounded-full bg-[#9E7F5A]"
                            style={{ width: `${Math.min(100, Math.max(0, p.progressPct))}%` }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-[#171613]/10 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-medium">
                    {t(l("Derniers échanges", "Recent messages", "Tin nhắn gần đây", "أحدث الرسائل", "Последние сообщения"))}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setTab("messages")}
                    className="text-xs font-semibold text-[#7D6445] hover:underline"
                  >
                    {t(l("Ouvrir la messagerie →", "Open inbox →", "Mở hộp thư →", "فتح المحادثة ←", "Открыть чат →"))}
                  </button>
                </div>
                <div className="mt-4 space-y-2.5">
                  {portal.messages.length === 0 ? (
                    <p className="text-xs text-[#57534B]">
                      {t(l("Aucun message pour le moment. Écrivez à l’équipe depuis l’onglet Messages.", "No messages yet. Reach our team anytime from the Messages tab.", "Chưa có tin nhắn nào.", "لا توجد رسائل بعد.", "Сообщений пока нет."))}
                    </p>
                  ) : (
                    portal.messages.slice(-3).map((m) => (
                      <div key={m.id} className="rounded-2xl border border-[#171613]/10 bg-[#FAF8F4] p-3.5 text-xs">
                        <div className="flex justify-between text-[10px] font-semibold text-[#7D6445]">
                          <span>{m.senderName}</span>
                          <span>{new Date(m.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="mt-1 text-[#171613]">{m.body}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 2: PROJETS */}
        {tab === "projects" && portal && (
          <div className="grid gap-5 md:grid-cols-2">
            {portal.projects.map((p) => (
              <article key={p.id} className="rounded-3xl border border-[#171613]/12 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#7D6445]">
                    {p.id} · {p.serviceCategory}
                  </span>
                  <span className="rounded-full bg-[#EEE9E0] px-3 py-1 text-[11px] font-semibold text-[#171613]">
                    {t(STAGE_LABELS[p.stage] ?? l(p.stage, p.stage, p.stage, p.stage, p.stage))}
                  </span>
                </div>
                <h2 className="mt-3 font-serif text-2xl font-medium text-[#171613]">{p.projectName}</h2>
                <p className="mt-2 text-xs leading-relaxed text-[#57534B]">{p.notes}</p>
                <div className="mt-4 flex flex-wrap gap-4 border-t border-[#171613]/10 pt-4 text-xs text-[#57534B]">
                  <span>Budget : <strong className="text-[#171613]">{price(p.budgetEur)}</strong></span>
                  <span>Échéance : <strong className="text-[#171613]">{p.deliveryDeadline?.slice(0, 10) || "—"}</strong></span>
                </div>
                {(p.liveUrl || p.stagingUrl) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#171613] px-4 py-2 text-xs font-semibold text-[#F7F4EE]"
                      >
                        Site en ligne <ExternalLink className="h-3.5 w-3.5 text-white" />
                      </a>
                    )}
                    {p.stagingUrl && (
                      <a
                        href={p.stagingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#171613]/20 px-4 py-2 text-xs font-semibold text-[#171613]"
                      >
                        Prévisualisation <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        {/* MODULE 3: PROGRESSION */}
        {tab === "progress" && portal && (
          <div className="space-y-5">
            {portal.projects.map((p) => (
              <div key={p.id} className="rounded-3xl border border-[#171613]/12 bg-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-serif text-2xl font-medium">{p.projectName}</h2>
                  <span className="font-serif text-3xl font-semibold text-[#9E7F5A]">{p.progressPct}%</span>
                </div>
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-[#EEE9E0]">
                  <div
                    className="h-full rounded-full bg-[#171613] transition-all"
                    style={{ width: `${Math.min(100, Math.max(0, p.progressPct))}%` }}
                  />
                </div>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {p.milestones.map((m) => (
                    <li
                      key={m.id}
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-xs ${
                        m.done
                          ? "border-[#9E7F5A]/35 bg-[#FAF8F4] text-[#171613]"
                          : "border-[#171613]/10 bg-white text-[#57534B]"
                      }`}
                    >
                      {m.done ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#9E7F5A]" />
                      ) : (
                        <Clock className="h-4 w-4 shrink-0 text-[#57534B]/60" />
                      )}
                      <span className={m.done ? "font-semibold" : ""}>{m.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* MODULE 4: TÂCHES */}
        {tab === "tasks" && portal && (
          <div className="rounded-3xl border border-[#171613]/12 bg-white p-6">
            <h2 className="font-serif text-2xl font-medium">
              {t(l("Tâches liées à votre dossier", "Project tasks", "Công việc dự án", "المهام المرتبطة بملفك", "Задачи по проекту"))}
            </h2>
            {portal.tasks.length === 0 ? (
              <p className="mt-4 text-sm text-[#57534B]">
                {t(l("Aucune tâche ouverte pour le moment.", "No open tasks right now.", "Không có công việc mở.", "لا توجد مهام مفتوحة حالياً.", "Открытых задач пока нет."))}
              </p>
            ) : (
              <div className="mt-4 divide-y divide-[#171613]/10">
                {portal.tasks.map((task) => (
                  <div key={task.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                    <div>
                      <p className="text-sm font-semibold text-[#171613]">{task.title}</p>
                      <p className="text-xs text-[#57534B]">{task.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[#EEE9E0] px-3 py-1 font-mono text-[10px] font-semibold uppercase text-[#171613]">
                        {task.status}
                      </span>
                      <span className="text-xs text-[#57534B]">{task.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MODULE 5: DOCUMENTS */}
        {tab === "documents" && portal && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#171613]/12 bg-white p-6">
              <h2 className="font-serif text-2xl font-medium">
                {t(l("Devis & documents partagés", "Quotes & shared files", "Báo giá & tài liệu", "عروض الأسعار والمستندات", "Сметы и документы"))}
              </h2>
              <div className="mt-4 space-y-3">
                {portal.quotes.map((q) => (
                  <div
                    key={q.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#171613]/10 bg-[#FAF8F4] p-4"
                  >
                    <div>
                      <p className="font-mono text-xs font-semibold text-[#7D6445]">{q.id}</p>
                      <p className="text-sm font-semibold text-[#171613]">
                        {q.items.map((i) => i.label).join(" · ")}
                      </p>
                    </div>
                    <div className="text-end">
                      <p className="font-serif text-lg font-semibold text-[#171613]">
                        {price(q.totalOnceEur || q.totalMonthlyEur || q.totalAnnualEur)}
                      </p>
                      <span className="font-mono text-[10px] uppercase text-[#57534B]">{q.status}</span>
                    </div>
                  </div>
                ))}
                {portal.documents.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-2xl border border-[#171613]/10 bg-white p-4 transition hover:border-[#9E7F5A]"
                  >
                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#7D6445]">{doc.category}</p>
                      <p className="text-sm font-semibold text-[#171613]">{doc.title}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-[#7D6445]" />
                  </a>
                ))}
                {portal.quotes.length === 0 && portal.documents.length === 0 && (
                  <p className="text-sm text-[#57534B]">Aucun document disponible pour le moment.</p>
                )}
              </div>
            </div>

            {user.role === "admin" && (
              <form
                onSubmit={handleAdminAddDocument}
                className="rounded-3xl border border-[#9E7F5A]/30 bg-[#EEE9E0] p-6 space-y-3"
              >
                <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#7D6445]">
                  DIRECTION · PARTAGER UN DOCUMENT AVEC CE CLIENT
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    placeholder="Titre du livrable (ex: Maquette Figma v2)"
                    className="rounded-xl border border-[#171613]/15 bg-white px-3.5 py-2.5 text-xs"
                  />
                  <input
                    type="url"
                    required
                    value={docUrl}
                    onChange={(e) => setDocUrl(e.target.value)}
                    placeholder="https://..."
                    className="rounded-xl border border-[#171613]/15 bg-white px-3.5 py-2.5 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex items-center gap-2 rounded-full bg-[#171613] px-5 py-2.5 text-xs font-semibold text-[#F7F4EE]"
                >
                  <Plus className="h-3.5 w-3.5 text-white" /> Ajouter le document
                </button>
              </form>
            )}
          </div>
        )}

        {/* MODULE 6: FACTURES */}
        {tab === "invoices" && portal && (
          <div className="rounded-3xl border border-[#171613]/12 bg-white p-6">
            <h2 className="font-serif text-2xl font-medium">
              {t(l("Factures & suivi de règlement", "Invoices & payment status", "Hóa đơn & thanh toán", "الفواتير والمدفوعات", "Счета и статусы оплаты"))}
            </h2>
            {portal.invoices.length === 0 ? (
              <p className="mt-4 text-sm text-[#57534B]">Aucune facture enregistrée.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {portal.invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#171613]/10 bg-[#FAF8F4] p-4"
                  >
                    <div>
                      <p className="font-mono text-xs font-semibold text-[#7D6445]">
                        {inv.id} · Réf. {inv.paymentReference}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-[#171613]">
                        {inv.items.map((i) => i.label).join(", ")}
                      </p>
                      <p className="mt-1 text-[11px] text-[#57534B]">{inv.taxNotice}</p>
                    </div>
                    <div className="text-end">
                      <p className="font-serif text-2xl font-semibold text-[#171613]">
                        {price(inv.totalEur)}
                      </p>
                      <span
                        className={`inline-block rounded-full px-3 py-0.5 font-mono text-[10px] font-semibold uppercase ${
                          inv.status === "paid"
                            ? "bg-[#171613] text-emerald-400"
                            : "bg-[#EEE9E0] text-[#7D6445]"
                        }`}
                      >
                        {inv.status === "paid" ? "Réglée" : "En attente"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MODULE 7: MESSAGES */}
        {tab === "messages" && portal && (
          <div className="rounded-3xl border border-[#171613]/12 bg-white p-6">
            <h2 className="font-serif text-2xl font-medium">
              {t(l("Messagerie directe XR Agency", "Direct XR Agency messaging", "Tin nhắn trực tiếp", "المراسلة المباشرة مع XR Agency", "Прямой чат с XR Agency"))}
            </h2>
            <div className="mt-4 max-h-96 space-y-3 overflow-y-auto rounded-2xl border border-[#171613]/10 bg-[#FAF8F4] p-4">
              {portal.messages.length === 0 ? (
                <p className="py-8 text-center text-xs text-[#57534B]">
                  Démarrez une conversation avec votre interlocuteur XR Agency.
                </p>
              ) : (
                portal.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`max-w-lg rounded-2xl p-3.5 text-xs ${
                      m.senderRole === "client"
                        ? "ms-auto bg-[#171613] text-[#F7F4EE]"
                        : "bg-white border border-[#171613]/10 text-[#171613]"
                    }`}
                  >
                    <div className="flex justify-between gap-4 text-[10px] opacity-70">
                      <span className="font-semibold">{m.senderName}</span>
                      <span>{new Date(m.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="mt-1.5 leading-relaxed">{m.body}</p>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
              <input
                type="text"
                required
                value={messageDraft}
                onChange={(e) => setMessageDraft(e.target.value)}
                placeholder={t(l("Écrivez votre message...", "Write your message...", "Nhập tin nhắn...", "اكتب رسالتك...", "Напишите сообщение..."))}
                className="flex-1 rounded-full border border-[#171613]/15 bg-[#FAF8F4] px-4 py-3 text-xs text-[#171613] focus:border-[#9E7F5A] focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-full bg-[#171613] px-5 py-3 text-xs font-semibold text-[#F7F4EE] transition hover:bg-[#2A2823] disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5 text-white" />
                {t(l("Envoyer", "Send", "Gửi", "إرسال", "Отправить"))}
              </button>
            </form>
          </div>
        )}

        {/* MODULE 8: SUPPORT */}
        {tab === "support" && portal && (
          <div className="grid gap-6 lg:grid-cols-12">
            <form
              onSubmit={handleCreateTicket}
              className="space-y-4 rounded-3xl border border-[#171613]/12 bg-white p-6 lg:col-span-5"
            >
              <h2 className="font-serif text-2xl font-medium">
                {t(l("Ouvrir une demande support", "Open a support request", "Tạo yêu cầu hỗ trợ", "فتح تذكرة دعم", "Создать запрос в поддержку"))}
              </h2>
              <input
                type="text"
                required
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder={t(l("Objet de la demande *", "Subject *", "Tiêu đề *", "الموضوع *", "Тема *"))}
                className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-xs"
              />
              <select
                value={ticketPriority}
                onChange={(e) => setTicketPriority(e.target.value as "normal" | "high" | "urgent")}
                className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-xs"
              >
                <option value="normal">Priorité normale</option>
                <option value="high">Priorité élevée</option>
                <option value="urgent">Urgent</option>
              </select>
              <textarea
                rows={4}
                required
                value={ticketBody}
                onChange={(e) => setTicketBody(e.target.value)}
                placeholder={t(l("Décrivez votre besoin ou modification souhaitée *", "Describe your request *", "Mô tả yêu cầu *", "اشرح طلبك *", "Опишите задачу *"))}
                className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-xs"
              />
              <button
                type="submit"
                disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#171613] py-3 text-xs font-semibold text-[#F7F4EE]"
              >
                <Send className="h-3.5 w-3.5 text-white" />
                {t(l("Envoyer le ticket", "Submit ticket", "Gửi yêu cầu", "إرسال التذكرة", "Отправить запрос"))}
              </button>
            </form>

            <div className="rounded-3xl border border-[#171613]/12 bg-white p-6 lg:col-span-7">
              <h2 className="font-serif text-2xl font-medium">
                {t(l("Historique de vos tickets", "Your support tickets", "Lịch sử hỗ trợ", "سجل تذاكر الدعم", "История обращений"))}
              </h2>
              <div className="mt-4 space-y-3">
                {portal.tickets.length === 0 ? (
                  <p className="text-xs text-[#57534B]">Aucun ticket support ouvert.</p>
                ) : (
                  portal.tickets.map((tk) => (
                    <div key={tk.id} className="rounded-2xl border border-[#171613]/10 bg-[#FAF8F4] p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] font-semibold text-[#7D6445]">
                          {tk.id} · {tk.priority.toUpperCase()}
                        </span>
                        <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-[10px] uppercase text-[#171613]">
                          {tk.status}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm font-semibold text-[#171613]">{tk.subject}</p>
                      <p className="mt-1 text-xs text-[#57534B]">{tk.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 9: PARAMÈTRES */}
        {tab === "settings" && portal && (
          <div className="grid gap-6 lg:grid-cols-2">
            <form
              onSubmit={handleSaveProfile}
              className="space-y-4 rounded-3xl border border-[#171613]/12 bg-white p-6"
            >
              <h2 className="font-serif text-2xl font-medium">
                {t(l("Coordonnées du dossier", "Account settings", "Thông tin hồ sơ", "إعدادات الحساب", "Настройки профиля"))}
              </h2>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#45413A]">Contact principal</label>
                <input
                  type="text"
                  value={profileForm.contactName}
                  onChange={(e) => setProfileForm({ ...profileForm, contactName: e.target.value })}
                  className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-xs"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#45413A]">Téléphone / WhatsApp</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-xs"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#45413A]">Ville</label>
                <input
                  type="text"
                  value={profileForm.city}
                  onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                  className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-xs"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#45413A]">Site web</label>
                <input
                  type="text"
                  value={profileForm.website}
                  onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                  className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-xs"
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="rounded-full bg-[#171613] px-6 py-3 text-xs font-semibold text-[#F7F4EE]"
              >
                {t(l("Enregistrer les modifications", "Save changes", "Lưu thay đổi", "حفظ التغييرات", "Сохранить"))}
              </button>
            </form>

            {user.role === "admin" && (
              <form
                onSubmit={handleProvisionClientAccess}
                className="space-y-4 rounded-3xl border border-[#9E7F5A]/35 bg-[#171613] p-6 text-[#F7F4EE]"
              >
                <div className="flex items-center gap-2 text-emerald-400">
                  <KeyRound className="h-4.5 w-4.5" />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider">
                    DIRECTION · ACCÈS CLIENT DÉDIÉ
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-medium">
                  Créer ou réinitialiser l’accès de {client?.company}
                </h3>
                <p className="text-xs text-[#F7F4EE]/70">
                  Crée un compte rôle <code className="text-emerald-300">client</code> strictement
                  isolé sur ce dossier dans le CRM unifié (mot de passe haché avec sel unique).
                </p>
                <input
                  type="email"
                  required
                  value={provEmail}
                  onChange={(e) => setProvEmail(e.target.value)}
                  placeholder="client@entreprise.fr"
                  className="w-full rounded-xl border border-[#F7F4EE]/15 bg-[#23201B] px-3.5 py-2.5 text-xs text-[#F7F4EE]"
                />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={provPass}
                  onChange={(e) => setProvPass(e.target.value)}
                  placeholder="Nouveau mot de passe (8 caractères min.)"
                  className="w-full rounded-xl border border-[#F7F4EE]/15 bg-[#23201B] px-3.5 py-2.5 text-xs text-[#F7F4EE]"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="rounded-full bg-[#12110E] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#2B2925]"
                >
                  Activer l’accès Espace Client
                </button>
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
