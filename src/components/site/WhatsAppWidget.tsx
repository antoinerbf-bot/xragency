import { useState, useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
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
  const location = useLocation();
  const currentLang = (lang in NOTIFICATIONS ? lang : "fr") as Lang;
  const copy = NOTIFICATIONS[currentLang];

  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [altMessage, setAltMessage] = useState(false);
  const [overQuote, setOverQuote] = useState(false);

  const isInternalApp =
    location.pathname.startsWith("/crm") || location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280 && !dismissed) {
        setVisible(true);
      }
      const quoteEl = document.getElementById("quote");
      if (quoteEl) {
        const rect = quoteEl.getBoundingClientRect();
        setOverQuote(rect.top < window.innerHeight && rect.bottom > 100);
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

  if (isInternalApp || !visible || dismissed || overQuote) return null;

  const waPrefill = encodeURIComponent(WA_MESSAGES[currentLang] ?? WA_MESSAGES.fr);
  const waUrl = `${CONTACT.whatsapp}?text=${waPrefill}`;

  return (
    <aside
      aria-label="WhatsApp XR Agency"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 transition-all duration-300 ease-out rtl:right-auto rtl:left-4"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center gap-2 rounded-full border border-[#E5E5E0] bg-white p-2 sm:py-2 sm:pl-2.5 sm:pr-4 text-[#12110E] shadow-[0_14px_34px_rgba(18,17,14,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#12110E] hover:bg-[#FAF9F5]"
        aria-label={`${copy.title} · ${copy.role}`}
        title={`${copy.title} · ${copy.role}`}
      >
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E5E5E0] bg-[#FAF9F5] text-[#12110E]">
          <span className="font-serif text-[11px] font-semibold tracking-tight text-[#12110E]">
            XR
          </span>
          <span
            aria-hidden
            className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500"
          />
        </div>

        <div className="hidden sm:flex min-w-[132px] flex-col overflow-hidden text-start">
          {!altMessage ? (
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold tracking-tight text-[#12110E]">
                  {copy.title}
                </span>
                <span className="text-[9px] text-[#706A61]">·</span>
                <span className="text-[10px] font-semibold text-emerald-600">WhatsApp</span>
              </div>
              <span className="block truncate font-mono text-[9px] tracking-wide text-[#706A61]">
                {copy.role}
              </span>
            </div>
          ) : (
            <div>
              <span className="block text-[11px] font-semibold tracking-tight text-[#12110E]">
                {copy.prompt}
              </span>
              <span className="block truncate font-mono text-[9px] tracking-wide text-[#706A61]">
                {copy.subprompt}
              </span>
            </div>
          )}
        </div>

        <div className="ms-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 transition-transform group-hover:scale-105">
          <MessageCircle className="h-3.5 w-3.5" />
        </div>
      </a>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        title="Masquer"
        aria-label="Fermer le raccourci WhatsApp"
        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#171613]/15 bg-[#F7F4EE]/95 text-[#57534B] shadow-sm backdrop-blur-md transition hover:border-[#171613]/30 hover:text-[#171613]"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </aside>
  );
}
