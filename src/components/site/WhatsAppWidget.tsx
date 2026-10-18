import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";

const NOTIFICATIONS: Record<Lang, { title: string; subtitle: string; cta: string; online: string }> = {
  fr: {
    title: "Alexandre · Concierge XR",
    subtitle: "Une question ou un projet ? Échangeons directement sur WhatsApp.",
    cta: "Échanger sur WhatsApp",
    online: "En ligne",
  },
  en: {
    title: "Alexandre · XR Concierge",
    subtitle: "Have a question or a project? Let's chat directly on WhatsApp.",
    cta: "Chat on WhatsApp",
    online: "Online",
  },
  vi: {
    title: "Alexandre · Cố vấn XR",
    subtitle: "Bạn có câu hỏi hoặc dự án? Trao đổi trực tiếp qua WhatsApp.",
    cta: "Trò chuyện qua WhatsApp",
    online: "Đang trực tuyến",
  },
  ar: {
    title: "ألكسندر · مستشار XR",
    subtitle: "هل لديك سؤال أو مشروع رقمي؟ تواصل معنا عبر واتساب.",
    cta: "محادثة عبر واتساب",
    online: "متصل الآن",
  },
  ru: {
    title: "Александр · Консьерж XR",
    subtitle: "Вопрос или идея проекта? Напишите напрямую в WhatsApp.",
    cta: "Написать в WhatsApp",
    online: "В сети",
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
  const [minimized, setMinimized] = useState(false);
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

  // Auto-minimize after 7 seconds for a charming, discreet presence
  useEffect(() => {
    if (visible && !minimized) {
      const timer = window.setTimeout(() => {
        setMinimized(true);
      }, 7000);
      return () => window.clearTimeout(timer);
    }
  }, [visible, minimized]);

  if (!visible || dismissed) return null;

  const waPrefill = encodeURIComponent(WA_MESSAGES[currentLang] ?? WA_MESSAGES.fr);
  const waUrl = `${CONTACT.whatsapp}?text=${waPrefill}`;

  return (
    <aside
      aria-label="Concierge WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start transition-all duration-500 ease-out rtl:left-auto rtl:right-6"
    >
      {!minimized ? (
        /* Expanded Charming Notification Pill */
        <div className="relative w-[310px] sm:w-[340px] animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-500 rounded-2xl border border-amber-400/25 bg-[#0b0e14]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-2xl ring-1 ring-white/10">
          {/* Subtle gold spotlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-amber-400/10 blur-2xl"
          />

          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Alexandre bespoke avatar badge */}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/35 bg-gradient-to-br from-[#1b2230] to-[#0c0f16] shadow-md">
                <span className="font-serif text-sm font-bold tracking-tight text-amber-200">AX</span>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full border border-black bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]">
                  <span className="h-1 w-1 rounded-full bg-white animate-ping" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-[13px] font-bold tracking-tight text-white">{copy.title}</h4>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="label-mono text-[8px] text-white/60 tracking-wider uppercase">{copy.online}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Minimize button */}
              <button
                type="button"
                onClick={() => setMinimized(true)}
                title="Réduire"
                aria-label="Réduire la notification"
                className="rounded-lg p-1 text-white/50 hover:bg-white/10 hover:text-white transition"
              >
                <span className="block text-xs leading-none px-1">_</span>
              </button>
              {/* Close button */}
              <button
                type="button"
                onClick={() => setDismissed(true)}
                title="Fermer"
                aria-label="Fermer la notification"
                className="rounded-lg p-1 text-white/50 hover:bg-white/10 hover:text-white transition"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <p className="mt-2.5 text-[11px] leading-relaxed text-white/75">
            {copy.subtitle}
          </p>

          <div className="mt-3.5 flex items-center gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-amber-400/40 bg-gradient-to-r from-amber-400/20 via-amber-300/15 to-transparent px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-amber-200 shadow-sm transition hover:border-amber-300 hover:bg-amber-400/25 active:scale-[0.98]"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
              {copy.cta}
            </a>
          </div>
        </div>
      ) : (
        /* Discreet, Charming Minimized Pill */
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="group relative flex items-center gap-2.5 rounded-full border border-amber-400/30 bg-[#0b0e14]/90 py-1.5 pl-2 pr-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/60 hover:bg-[#121620]"
          aria-label={copy.cta}
        >
          <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-amber-400/40 bg-gradient-to-br from-[#1c2230] to-[#0a0d13] text-amber-200">
            <span className="font-serif text-[10px] font-bold">AX</span>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full border border-black bg-emerald-500">
              <span className="h-1 w-1 rounded-full bg-white animate-ping" />
            </span>
          </div>
          <span className="label-mono text-[9px] font-semibold tracking-wider text-white/90 group-hover:text-amber-200 transition">
            Alexandre <span className="text-white/40">·</span> <span className="text-emerald-400 font-normal">WhatsApp</span>
          </span>
          <MessageCircle className="h-3.5 w-3.5 text-emerald-400 transition-transform group-hover:scale-110" />
        </button>
      )}
    </aside>
  );
}
