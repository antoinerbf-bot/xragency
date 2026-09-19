import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";

function BotFace() {
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [talking, setTalking] = useState(false);

  return (
    <div
      className="relative h-20 w-20 cursor-pointer sm:h-24 sm:w-24"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setLook({
          x: Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2)),
          y: Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2)),
        });
      }}
      onMouseLeave={() => setLook({ x: 0, y: 0 })}
      onClick={() => {
        setTalking(true);
        window.setTimeout(() => setTalking(false), 900);
      }}
      aria-label="Interagir avec Alexandre"
    >
      <div className="absolute inset-0 rounded-[28%] border border-white/15 bg-gradient-to-br from-white/[0.16] via-card to-primary/[0.08] shadow-[0_16px_45px_-28px_rgba(0,0,0,.95)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-0.5">
        <div className="absolute inset-x-3 top-2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute left-1/2 top-[-7px] h-3 w-px -translate-x-1/2 bg-primary/50">
          <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
        </div>
        <div
          className="absolute left-1/2 top-[43%] flex -translate-x-1/2 -translate-y-1/2 gap-3"
          style={{ transform: `translate(calc(-50% + ${look.x * 3}px), calc(-50% + ${look.y * 2}px))` }}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/90 shadow-[0_0_9px_rgba(255,255,255,.16)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/90 shadow-[0_0_9px_rgba(255,255,255,.16)]" />
        </div>
        <div className={`absolute bottom-3 left-1/2 h-px -translate-x-1/2 bg-primary/70 transition-all duration-200 ${talking ? "w-8 shadow-[0_0_12px_hsl(var(--primary))]" : "w-5"}`} />
      </div>
      <span className="absolute left-[-3px] top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-white/10" />
      <span className="absolute right-[-3px] top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-white/10" />
    </div>
  );
}

export function AlexandreAdvisor() {
  return (
    <div className="group relative mx-auto flex h-24 w-28 items-center justify-center sm:h-28 sm:w-32">
      <div className="pointer-events-none absolute inset-5 rounded-full bg-primary/[0.08] blur-2xl transition duration-700 group-hover:scale-110" />
      <div className="pointer-events-none absolute inset-2 rounded-full border border-primary/10 opacity-60 [animation:spin_24s_linear_infinite]" />
      <BotFace />
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-white/10 bg-background/80 px-2 py-0.5 backdrop-blur">
        <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
        <span className="text-[6px] uppercase tracking-[.14em] text-muted-foreground">Alexandre · IA</span>
      </div>
    </div>
  );
}

export function AlexandreIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="group grid items-center gap-4 rounded-2xl border border-primary/15 bg-card/55 p-4 shadow-[0_20px_60px_-40px_rgba(0,0,0,.9)] backdrop-blur-xl sm:grid-cols-[110px_1fr_auto] sm:p-5">
      <AlexandreAdvisor />
      <div>
        <div className="mb-1.5 flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[.2em] text-primary"><Sparkles className="h-3 w-3" /> XR Intelligence</div>
        <h2 className="display-serif text-2xl leading-none tracking-tight sm:text-3xl">Parlez avec Alexandre.</h2>
        <p className="mt-2 max-w-xl text-[11px] leading-4.5 text-muted-foreground sm:text-xs">Un assistant discret vous guide vers une configuration cohérente.</p>
      </div>
      <button type="button" onClick={onStart} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[.13em] text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"><MessageCircle className="h-3 w-3" /> Discuter avec Alexandre <ArrowRight className="h-3 w-3" /></button>
    </div>
  );
}
