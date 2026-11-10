import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import agentXrPortrait from "@/assets/agent-xr-portrait.jpg";

const NOTIFICATIONS: Record<Lang, { title: string; role: string; prompt: string; subprompt: string }> = {
  fr: {
    title: "Agent XR",
    role: "Conciergerie privée · WhatsApp",
    prompt: "Un projet en tête ?",
    subprompt: "Réponse directe WhatsApp",
  },
  en: {
    title: "Agent XR",
    role: "Private Concierge · WhatsApp",
    prompt: "Have a digital project?",
    subprompt: "Direct WhatsApp reply",
  },
  vi: {
    title: "Agent XR",
    role: "Tư vấn riêng · WhatsApp",
    prompt: "Bạn có dự án mới?",
    subprompt: "Hỗ trợ trực tiếp WhatsApp",
  },
  ar: {
    title: "Agent XR",
    role: "الخدمة الخاصة · واتساب",
    prompt: "هل لديك فكرة مشروع؟",
    subprompt: "رد فوري عبر واتساب",
  },
  ru: {
    title: "Agent XR",
    role: "Консьерж · WhatsApp",
    prompt: "Есть идея проекта?",
    subprompt: "Прямой ответ в WhatsApp",
  },
};

const WA_MESSAGES: Record<Lang, string> = {
  fr: "Bonjour XR Agency, je consulte votre site et je souhaite échanger sur mon projet digital.",
  en: "Hello XR Agency, I am browsing your site and would like to discuss my digital project.",
  vi: "Xin chào XR Agency, tôi đang xem trang web và muốn trao đổi về dự án.",
  ar: "مرحبا XR Agency، أود الاستفسار ومناقشة مشروعي الرقمي.",
  ru: "Здравствуйте, XR Agency! Я на вашем сайте и хочу обсудить digital-проект.",
};

export function WhatsAppWidget() {
  const { lang } = useLang();
  const currentLang = (lang in NOTIFICATIONS ? lang : "fr") as Lang;
  const copy = NOTIFICATIONS[currentLang];

  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [altMessage, setAltMessage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 360 && !dismissed) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  // Subtle charming message cycle every 6.5s
  useEffect(() => {
    if (!visible || dismissed) return;
    const interval = setInterval(() => {
      setAltMessage((prev) => !prev);
    }, 6500);
    return () => clearInterval(interval);
  }, [visible, dismissed]);

  if (!visible || dismissed) return null;

  const waPrefill = encodeURIComponent(WA_MESSAGES[currentLang] ?? WA_MESSAGES.fr);
  const waUrl = `${CONTACT.whatsapp}?text=${waPrefill}`;

  return (
    <aside
      aria-label="Conciergerie XR Agency - WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 transition-all duration-500 ease-out rtl:right-auto rtl:left-4 sm:rtl:left-6 animate-in fade-in slide-in-from-bottom-3"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center gap-2.5 rounded-full border border-[#c5a880]/40 bg-[#141312]/95 p-1.5 sm:py-1.5 sm:pl-1.5 sm:pr-3.5 shadow-[0_14px_34px_rgba(0,0,0,0.58)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a880] hover:bg-[#1c1a17]"
        aria-label={`${copy.title} · ${copy.role}`}
        title={`${copy.title} · ${copy.role}`}
      >
        <div className="relative h-9 w-9 sm:h-8 sm:w-8 shrink-0">
          <img
            src={agentXrPortrait}
            alt="Agent XR"
            className="h-full w-full rounded-full object-cover object-top border border-[#c5a880]/70"
          />
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full border border-[#141312] bg-emerald-400">
            <span className="h-1 w-1 rounded-full bg-white animate-ping" />
          </span>
        </div>

        {/* Hidden on very narrow phones so content cards remain clear; visible on sm+ */}
        <div className="hidden sm:flex flex-col text-left overflow-hidden min-w-[138px]">
          {!altMessage ? (
            <div className="animate-in fade-in slide-in-from-bottom-1 duration-300">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold tracking-tight text-[#f7f4ed] group-hover:text-[#e8cfa6] transition">
                  {copy.title}
                </span>
                <span className="text-[9px] text-white/35">·</span>
                <span className="text-[10px] text-[#c5a880] font-semibold">En ligne</span>
              </div>
              <span className="label-mono text-[7px] text-white/65 -mt-0.5 tracking-wider block truncate">
                {copy.role}
              </span>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-top-1 duration-300">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold tracking-tight text-[#e8cfa6]">
                  {copy.prompt}
                </span>
              </div>
              <span className="label-mono text-[7px] text-white/75 -mt-0.5 tracking-wider block truncate">
                {copy.subprompt}
              </span>
            </div>
          )}
        </div>

        <div className="hidden sm:flex ml-0.5 h-6 w-6 items-center justify-center rounded-full bg-[#c5a880]/15 text-[#e8cfa6] border border-[#c5a880]/35 transition-transform group-hover:scale-110">
          <MessageCircle className="h-3.5 w-3.5" />
        </div>
      </a>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        title="Masquer"
        aria-label="Fermer la notification"
        className="hidden sm:flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-[#141312]/90 text-white/45 hover:bg-[#1c1a17] hover:text-white transition shadow-sm backdrop-blur-md"
      >
        <X className="h-3 w-3" />
      </button>
    </aside>
  );
}
