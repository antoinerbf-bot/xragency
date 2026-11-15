import { useState } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";

const WHATSAPP_PHONE = "33767566783";
const DEFAULT_MSG =
  "Bonjour Antoine, je découvre le site XR Agency et je souhaite faire le point sur un projet digital pour mon entreprise.";

export function WhatsAppFloatingBtn() {
  const [open, setOpen] = useState(true);
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(DEFAULT_MSG)}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 pointer-events-auto">
      {open && (
        <div className="relative rounded-2xl border border-emerald-500/40 bg-[#090b10]/95 p-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl max-w-[280px] text-left animate-in slide-in-from-bottom-3 duration-300">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer l'infobulle WhatsApp"
            className="absolute top-2 right-2 text-neutral-400 hover:text-white transition"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-300">
              DIRECTION XR EN LIGNE
            </span>
          </div>

          <p className="text-xs text-white font-medium leading-snug">
            Un projet ou une question sur nos 3 Packs ? Échangez directement avec Antoine.
          </p>
          <span className="mt-1 block text-[9.5px] text-neutral-400">
            ⚡ Temps de réponse moyen : &lt; 5 minutes
          </span>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black py-2 px-3 text-[11px] font-black uppercase tracking-wider transition shadow-md"
          >
            <MessageCircle className="h-3.5 w-3.5 fill-current" />
            <span>Ouvrir WhatsApp</span>
          </a>
        </div>
      )}

      {/* Floating Circle Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter Antoine sur WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-black shadow-[0_4px_24px_rgba(16,185,129,0.45)] hover:scale-105 active:scale-95 transition duration-300"
      >
        <MessageCircle className="h-7 w-7 fill-current" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-black" />
        </span>
      </a>
    </div>
  );
}
