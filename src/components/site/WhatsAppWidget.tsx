import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";

const NOTIFICATIONS: Record<Lang, { title: string; role: string; prompt: string; subprompt: string }> = {
  fr: {
    title: "Alexandre",
    role: "Assistant à votre service",
    prompt: "Un projet en tête ?",
    subprompt: "Réponse directe WhatsApp",
  },
  en: {
    title: "Alexandre",
    role: "Assistant at your service",
    prompt: "Have a digital project?",
    subprompt: "Direct WhatsApp reply",
  },
  vi: {
    title: "Alexandre",
    role: "Trợ lý phục vụ bạn",
    prompt: "Bạn có dự án mới?",
    subprompt: "Hỗ trợ trực tiếp WhatsApp",
  },
  ar: {
    title: "ألكسندر",
    role: "مساعد في خدمتكم",
    prompt: "هل لديك فكرة مشروع؟",
    subprompt: "رد فوري عبر واتساب",
  },
  ru: {
    title: "Александр",
    role: "Ассистент к вашим услугам",
    prompt: "Есть идея проекта?",
    subprompt: "Прямой ответ в WhatsApp",
  },
};

const WA_MESSAGES: Record<Lang, string> = {
  fr: "Bonjour Alexandre, je consulte le site XR Agency et je souhaite échanger sur mon projet digital.",
  en: "Hello Alexandre, I am browsing XR Agency and would like to discuss my digital project.",
  vi: "Xin chào Alexandre, tôi đang xem trang web XR Agency và muốn trao đổi về dự án.",
  ar: "مرحبا ألكسندر، أود الاستفسار ومناقشة مشروع رقمي مع XR Agency.",
  ru: "Здравствуйте, Александр! Я на сайте XR Agency и хочу обсудить digital-проект.",
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
      if (window.scrollY > 280 && !dismissed) {
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
      aria-label="Assistant à votre service - WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 transition-all duration-500 ease-out rtl:right-auto rtl:left-6 animate-in fade-in slide-in-from-bottom-3"
    >
      {/* Dynamic Floating Charming Notification Pill */}
      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center gap-2.5 rounded-full border border-white/20 bg-[#090b10]/95 py-1.5 pl-2 pr-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/60 hover:bg-[#111622] hover:shadow-[0_16px_40px_rgba(16,185,129,0.25)]"
        aria-label={`${copy.title} · ${copy.role}`}
        title={`${copy.title} · ${copy.role}`}
      >
        {/* Subtle breathing glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-0.5 rounded-full bg-emerald-500/10 blur-sm opacity-50 group-hover:opacity-100 transition duration-500"
        />

        {/* Alexandre bespoke avatar badge */}
        <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-gradient-to-br from-[#1e2533] to-[#0c0f16] text-white shrink-0">
          <span className="font-serif text-[10px] font-bold tracking-tight">AX</span>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full border border-black bg-emerald-500">
            <span className="h-1 w-1 rounded-full bg-white animate-ping" />
          </span>
        </div>

        {/* Dynamic Charming Text Transition */}
        <div className="flex flex-col text-left overflow-hidden min-w-[130px]">
          {!altMessage ? (
            <div className="animate-in fade-in slide-in-from-bottom-1 duration-300">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold tracking-tight text-white group-hover:text-emerald-300 transition">
                  {copy.title}
                </span>
                <span className="text-[9px] text-white/35">·</span>
                <span className="text-[10px] text-emerald-400 font-medium">WhatsApp</span>
              </div>
              <span className="label-mono text-[7px] text-white/65 -mt-0.5 tracking-wider block truncate">
                {copy.role}
              </span>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-top-1 duration-300">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold tracking-tight text-emerald-300">
                  {copy.prompt}
                </span>
              </div>
              <span className="label-mono text-[7px] text-emerald-400/80 -mt-0.5 tracking-wider block truncate">
                {copy.subprompt}
              </span>
            </div>
          )}
        </div>

        {/* Official WhatsApp Icon Badge with micro-bounce on hover */}
        <div className="ml-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 transition-transform group-hover:scale-115">
          <MessageCircle className="h-3.5 w-3.5 fill-emerald-500/20" />
        </div>
      </a>

      {/* Discrete close button */}
      <button
        type="button"
        onClick={() => setDismissed(true)}
        title="Masquer"
        aria-label="Fermer la notification"
        className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#090b10]/85 text-white/40 hover:bg-white/20 hover:text-white transition shadow-sm backdrop-blur-md"
      >
        <X className="h-3 w-3" />
      </button>
    </aside>
  );
}
