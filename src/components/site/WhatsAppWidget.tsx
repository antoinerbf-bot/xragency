import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";

const NOTIFICATIONS: Record<Lang, { title: string; role: string; cta: string }> = {
  fr: {
    title: "Alexandre",
    role: "Assistant à votre service",
    cta: "Échanger sur WhatsApp",
  },
  en: {
    title: "Alexandre",
    role: "Assistant at your service",
    cta: "Chat on WhatsApp",
  },
  vi: {
    title: "Alexandre",
    role: "Trợ lý phục vụ bạn",
    cta: "Trò chuyện qua WhatsApp",
  },
  ar: {
    title: "ألكسندر",
    role: "مساعد في خدمتكم",
    cta: "محادثة عبر واتساب",
  },
  ru: {
    title: "Александр",
    role: "Ассистент к вашим услугам",
    cta: "Написать в WhatsApp",
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280 && !dismissed) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  const waPrefill = encodeURIComponent(WA_MESSAGES[currentLang] ?? WA_MESSAGES.fr);
  const waUrl = `${CONTACT.whatsapp}?text=${waPrefill}`;

  return (
    <aside
      aria-label="Assistant à votre service - WhatsApp"
      className="fixed bottom-5 left-5 z-50 flex items-center gap-1.5 transition-all duration-300 ease-out rtl:left-auto rtl:right-5 animate-in fade-in slide-in-from-bottom-2"
    >
      {/* Sleek, Compact, Non-Intrusive Notification Pill */}
      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center gap-2.5 rounded-full border border-white/20 bg-[#090b10]/95 py-1.5 pl-2 pr-3.5 shadow-[0_10px_28px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-[#121620]"
        aria-label={`${copy.title} · ${copy.role} · ${copy.cta}`}
        title={`${copy.title} · ${copy.role}`}
      >
        <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#1e2533] to-[#0c0f16] text-white">
          <span className="font-serif text-[10px] font-bold tracking-tight">AX</span>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full border border-black bg-emerald-500">
            <span className="h-1 w-1 rounded-full bg-white animate-ping" />
          </span>
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold tracking-tight text-white group-hover:text-emerald-300 transition">
              {copy.title}
            </span>
            <span className="text-[9px] text-white/35">·</span>
            <span className="text-[10px] text-emerald-400 font-medium">WhatsApp</span>
          </div>
          <span className="label-mono text-[7.5px] text-white/65 -mt-0.5 tracking-wider">
            {copy.role}
          </span>
        </div>
        <div className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 transition-transform group-hover:scale-110">
          <MessageCircle className="h-3.5 w-3.5" />
        </div>
      </a>

      {/* Discrete close button */}
      <button
        type="button"
        onClick={() => setDismissed(true)}
        title="Fermer la notification"
        aria-label="Fermer la notification"
        className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#090b10]/80 text-white/40 hover:bg-white/15 hover:text-white transition shadow-sm backdrop-blur-md"
      >
        <X className="h-3 w-3" />
      </button>
    </aside>
  );
}
