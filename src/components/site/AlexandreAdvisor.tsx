import { ArrowRight, MessageCircle, Sparkles, Activity, ShieldCheck } from "lucide-react";

function JuliePortrait() {
  return (
    <div className="relative h-[142px] w-[116px] sm:h-[158px] sm:w-[128px]" aria-label="Julie, conseillère digitale">
      <div className="absolute inset-x-3 bottom-1 h-6 rounded-full bg-black/15 blur-xl" />
      <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] border border-white/15 bg-gradient-to-b from-[#dfe9e6] via-[#b9c9c5] to-[#7c918b] shadow-[0_25px_60px_-28px_rgba(0,0,0,.7)]">
        <div className="absolute -left-8 -top-10 h-32 w-32 rounded-full bg-[#26352f] shadow-[inset_-8px_-5px_20px_rgba(0,0,0,.35)]" />
        <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[#18231f] shadow-[inset_8px_-4px_20px_rgba(0,0,0,.3)]" />
        <div className="absolute left-1/2 top-5 h-[78px] w-[68px] -translate-x-1/2 rounded-[45%_45%_42%_42%] bg-gradient-to-br from-[#f3c8a9] via-[#dca887] to-[#a96f55] shadow-[inset_-8px_-5px_14px_rgba(102,54,36,.2)]">
          <div className="absolute left-2 top-5 h-7 w-4 rounded-full bg-[#f7d4b9]/70 blur-[2px]" />
          <div className="absolute left-[13px] top-[34px] h-[5px] w-[13px] rounded-full bg-[#26302d]" />
          <div className="absolute right-[13px] top-[34px] h-[5px] w-[13px] rounded-full bg-[#26302d]" />
          <span className="absolute left-[17px] top-[34px] h-2 w-2 rounded-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,.5)]" />
          <span className="absolute right-[17px] top-[34px] h-2 w-2 rounded-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,.5)]" />
          <div className="absolute left-1/2 top-[43px] h-[9px] w-[2px] -translate-x-1/2 rounded-full bg-[#9f6653]/70" />
          <div className="absolute left-1/2 top-[55px] h-[4px] w-[18px] -translate-x-1/2 rounded-full border-b border-[#8f4f4c] opacity-80" />
          <div className="absolute -left-[5px] top-[36px] h-[12px] w-[8px] rounded-full bg-[#dca887]" />
          <div className="absolute -right-[3px] top-[36px] h-[12px] w-[8px] rounded-full bg-[#dca887]" />
        </div>
        <div className="absolute left-1/2 top-[74px] h-[26px] w-[22px] -translate-x-1/2 bg-[#c88f73]" />
        <div className="absolute left-1/2 bottom-[-10px] h-[64px] w-[96px] -translate-x-1/2 rounded-[48%_48%_0_0] bg-gradient-to-br from-[#182824] via-[#101916] to-[#070c0b]" />
        <div className="absolute left-1/2 bottom-[29px] h-9 w-[30px] -translate-x-1/2 rotate-45 rounded-br-xl border-r border-b border-primary/40 bg-[#172622]" />
        <div className="absolute left-1/2 bottom-[13px] h-px w-12 -translate-x-1/2 bg-primary/35" />
        <div className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/20 px-1.5 py-0.5 text-[6px] uppercase tracking-[.18em] text-white/70 backdrop-blur">JULIE</div>
        <div className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]" />
      </div>
    </div>
  );
}

export function JulieAdvisor({ mood = "calm" }: { mood?: "calm" | "focus" | "recommend" | "success"; expression?: "neutral" | "smile" }) {
  return (
    <div className="group relative mx-auto flex h-[154px] w-[126px] items-center justify-center sm:h-[168px] sm:w-[136px]">
      <div className="pointer-events-none absolute inset-2 rounded-full bg-primary/[0.09] blur-2xl transition duration-700 group-hover:scale-110" />
      <div className="absolute -right-1 top-1 rounded-full border border-primary/20 bg-background/85 px-2 py-1 label-mono text-[7px] text-primary shadow-sm backdrop-blur">{mood === "success" ? "PRÊTE" : mood === "recommend" ? "CONSEIL" : mood === "focus" ? "ANALYSE" : "LIVE"}</div>
      <div className={mood === "success" ? "translate-y-[-2px] transition duration-500" : mood === "recommend" ? "translate-x-[2px] transition duration-500" : mood === "focus" ? "translate-y-[1px] transition duration-500" : "transition duration-500"}><JuliePortrait /></div>
    </div>
  );
}

export function JulieIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.6rem] border border-primary/15 bg-gradient-to-br from-card/90 via-card/65 to-primary/[.035] p-4 shadow-[0_30px_80px_-55px_rgba(0,0,0,.9)] backdrop-blur-xl sm:p-5">
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative grid items-center gap-4 sm:grid-cols-[140px_1fr_auto]">
        <JulieAdvisor />
        <div>
          <div className="mb-1.5 flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[.2em] text-primary"><Sparkles className="h-3 w-3" /> XR Intelligence · Julie</div>
          <h2 className="display-serif text-2xl leading-none tracking-tight sm:text-3xl">Votre conseillère digitale.</h2>
          <p className="mt-2 max-w-xl text-[11px] leading-5 text-muted-foreground sm:text-xs">Elle analyse votre activité, vos objectifs et vos priorités pour construire un parcours clair — sans vous noyer dans une liste de services.</p>
          <div className="mt-3 flex flex-wrap gap-1.5"><span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/55 px-2 py-1 text-[8px] text-muted-foreground"><Activity className="h-3 w-3 text-primary"/> Analyse en direct</span><span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/55 px-2 py-1 text-[8px] text-muted-foreground"><ShieldCheck className="h-3 w-3 text-primary"/> Recommandation sur mesure</span></div>
        </div>
        <button type="button" onClick={onStart} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-[8px] font-semibold uppercase tracking-[.13em] text-primary-foreground shadow-[0_12px_35px_-18px_hsl(var(--primary)/.8)] transition hover:-translate-y-0.5 hover:shadow-lg"><MessageCircle className="h-3 w-3" /> Commencer <ArrowRight className="h-3 w-3" /></button>
      </div>
    </div>
  );
}
