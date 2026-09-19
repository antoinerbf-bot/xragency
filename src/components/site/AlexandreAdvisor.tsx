import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";

function BotFace() {\n  const [look, setLook] = useState({ x: 0, y: 0 });
  return (
    <div className="relative h-[118px] w-[118px]" onMouseMove={(e) => { const r=e.currentTarget.getBoundingClientRect(); setLook({ x: Math.max(-1, Math.min(1, ((e.clientX-r.left)/r.width-.5)*2)), y: Math.max(-1, Math.min(1, ((e.clientY-r.top)/r.height-.5)*2)) }); }} onMouseLeave={() => setLook({x:0,y:0})}>
      <div className="absolute inset-[15px] rounded-[35%] border border-primary/35 bg-gradient-to-br from-card via-background to-primary/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,.8)] transition-transform duration-500 group-hover:rotate-[-3deg]">
        <div className="absolute left-1/2 top-[-10px] h-5 w-px -translate-x-1/2 bg-primary/50"><span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_16px_rgba(255,255,255,.6)]" /></div>
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-5" style={{ transform: `translate(-50%, -50%) translate(${look.x*4}px, ${look.y*3}px)` }}>
          <span className="h-3.5 w-3.5 rounded-full bg-foreground shadow-[0_0_14px_rgba(255,255,255,.18)] transition-transform duration-300 group-hover:translate-x-1" />
          <span className="h-3.5 w-3.5 rounded-full bg-foreground shadow-[0_0_14px_rgba(255,255,255,.18)] transition-transform duration-300 group-hover:translate-x-1" />
        </div>
        <div className="absolute bottom-5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-primary/60" /><div className="absolute bottom-[-1px] left-1/2 h-3 w-8 -translate-x-1/2 rounded-full bg-primary/10 blur-sm" />
        <div className="absolute -bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-primary/20 blur-md" />
      </div>
      <span className="absolute left-0 top-1/2 h-7 w-2 -translate-y-1/2 rounded-full border border-border bg-card" />
      <span className="absolute right-0 top-1/2 h-7 w-2 -translate-y-1/2 rounded-full border border-border bg-card" />
    </div>
  );
}

export function AlexandreAdvisor() {
  return (
    <div className="group relative mx-auto flex h-[150px] w-[150px] items-center justify-center">
      <div className="absolute inset-5 rounded-full bg-primary/[0.08] blur-2xl transition duration-700 group-hover:scale-125" />
      <div className="absolute inset-2 rounded-full border border-primary/10 [animation:spin_18s_linear_infinite]" />
      <BotFace />
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-background/90 px-2.5 py-1 backdrop-blur">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
        <span className="label-mono text-[7px] uppercase tracking-[.16em] text-muted-foreground">Alexandre · en ligne</span>
      </div>
    </div>
  );
}

export function AlexandreIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="group grid items-center gap-5 rounded-[1.75rem] border border-primary/20 bg-primary/[0.035] p-5 sm:p-7 lg:grid-cols-[155px_1fr_auto] lg:p-8">
      <AlexandreAdvisor />
      <div>
        <div className="mb-2 flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[.22em] text-primary"><Sparkles className="h-3 w-3" /> XR Intelligence</div>
        <h2 className="display-serif text-3xl leading-[.92] tracking-tight sm:text-4xl">Parlez avec Alexandre.</h2>
        <p className="mt-3 max-w-xl text-xs leading-5 text-muted-foreground sm:text-sm">Votre stratège digital vous accompagne, pose les bonnes questions et construit votre recommandation.</p>
      </div>
      <button type="button" onClick={onStart} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-[9px] font-semibold uppercase tracking-[.14em] text-primary-foreground shadow-lg transition hover:-translate-y-0.5"><MessageCircle className="h-3.5 w-3.5" /> Discuter avec Alexandre <ArrowRight className="h-3 w-3" /></button>
    </div>
  );
}
