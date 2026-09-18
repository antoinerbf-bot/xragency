import { useEffect, useRef, useState } from "react";
import { ArrowRight, Eye, Sparkles } from "lucide-react";

export function AlexandreAdvisor() {
  const ref = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      setPointer({
        x: Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.42))),
        y: Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height * 0.55))),
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 130);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      ref={ref}
      className="relative mx-auto flex h-[260px] w-full max-w-[250px] items-end justify-center sm:h-[310px]"
      aria-label="Alexandre, stratège digital senior"
    >
      <div className="absolute inset-x-4 bottom-3 h-24 rounded-[50%] bg-primary/10 blur-2xl" />
      <div className="absolute left-1/2 top-3 h-32 w-32 -translate-x-1/2 rounded-full border border-primary/15 bg-primary/[0.035] shadow-[0_0_80px_-20px_hsl(var(--primary)/.35)]" />
      <div
        className="absolute bottom-8 left-1/2 h-[205px] w-[118px] -translate-x-1/2 transition-transform duration-150 ease-out"
        style={{ transform: `translateX(calc(-50% + ${pointer.x * 7}px)) translateY(${pointer.y * 4}px)` }}
      >
        <div className="absolute left-1/2 top-0 h-[74px] w-[64px] -translate-x-1/2 rounded-[48%] border border-foreground/20 bg-background shadow-xl">
          <div className="absolute -top-1 left-1/2 h-2 w-9 -translate-x-1/2 rounded-full bg-primary/80" />
          <div
            className="absolute left-[17px] top-[31px] h-1.5 w-1.5 rounded-full bg-foreground transition-transform duration-150"
            style={{ transform: `translate(${pointer.x * 4}px, ${pointer.y * 2}px) scaleY(${blink ? 0.1 : 1})` }}
          />
          <div
            className="absolute right-[17px] top-[31px] h-1.5 w-1.5 rounded-full bg-foreground transition-transform duration-150"
            style={{ transform: `translate(${pointer.x * 4}px, ${pointer.y * 2}px) scaleY(${blink ? 0.1 : 1})` }}
          />
          <div className="absolute left-1/2 top-[49px] h-px w-5 -translate-x-1/2 bg-foreground/30" />
        </div>
        <div className="absolute left-1/2 top-[69px] h-[112px] w-[88px] -translate-x-1/2 rounded-[32px_32px_22px_22px] border border-foreground/15 bg-card shadow-[0_25px_50px_-28px_rgba(0,0,0,.8)]">
          <div className="absolute left-1/2 top-5 h-1 w-12 -translate-x-1/2 rounded-full bg-primary/70" />
          <div className="absolute left-1/2 top-9 h-12 w-px -translate-x-1/2 bg-border" />
          <div className="absolute bottom-5 left-1/2 h-px w-8 -translate-x-1/2 bg-foreground/25" />
        </div>
        <div className="absolute bottom-0 left-[19px] h-[65px] w-5 rounded-full border border-foreground/15 bg-card" />
        <div className="absolute bottom-0 right-[19px] h-[65px] w-5 rounded-full border border-foreground/15 bg-card" />
        <div className="absolute left-0 top-[92px] h-5 w-[48px] origin-right -rotate-[12deg] rounded-full border border-foreground/15 bg-card" />
        <div className="absolute right-0 top-[92px] h-5 w-[48px] origin-left rotate-[12deg] rounded-full border border-foreground/15 bg-card" />
      </div>
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 backdrop-blur">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
        <span className="label-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">Alexandre · en ligne</span>
      </div>
    </div>
  );
}

export function AlexandreIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
      <AlexandreAdvisor />
      <div>
        <div className="mb-4 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          XR Intelligence
        </div>
        <h2 className="display-serif max-w-3xl text-4xl leading-[0.95] tracking-tight sm:text-6xl">
          Votre stratégie commence avec Alexandre.
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Stratège digital senior en ligne. Il analyse votre activité, vos priorités et vos canaux d'acquisition pour construire un devis personnalisé — sans formulaire froid.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="rounded-full border border-border px-3 py-2">Audit interactif</span>
          <span className="rounded-full border border-border px-3 py-2">Devis sur mesure</span>
          <span className="rounded-full border border-border px-3 py-2">Réponse immédiate</span>
        </div>
        <button type="button" onClick={onStart} className="mt-7 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-lg transition hover:-translate-y-0.5">
          Lancer mon analyse
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
