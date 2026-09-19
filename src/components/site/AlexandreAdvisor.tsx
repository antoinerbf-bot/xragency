import { ArrowRight, MessageCircle, Sparkles, Activity, ShieldCheck } from "lucide-react";

function JuliePortrait() {
  return <div className="relative h-[126px] w-[104px] sm:h-[142px] sm:w-[118px]">
    <div className="absolute inset-x-2 bottom-0 h-7 rounded-full bg-primary/10 blur-xl" />
    <svg viewBox="0 0 112 150" className="relative h-full w-full drop-shadow-[0_18px_28px_rgba(0,0,0,.28)]" aria-label="Julie, conseillère digitale IA">
      <defs>
        <linearGradient id="aHelmet" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff"/><stop offset=".38" stopColor="#dbe5ee"/><stop offset=".72" stopColor="#7b8a9b"/><stop offset="1" stopColor="#263241"/></linearGradient>
        <linearGradient id="aFace" x1=".2" y1="0" x2=".8" y2="1"><stop offset="0" stopColor="#eaf3fa"/><stop offset=".48" stopColor="#a9b7c6"/><stop offset="1" stopColor="#526171"/></linearGradient>
        <linearGradient id="aGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e8fbff" stopOpacity=".75"/><stop offset=".45" stopColor="#67d9ff" stopOpacity=".18"/><stop offset="1" stopColor="#08121e" stopOpacity=".72"/></linearGradient>
        <linearGradient id="aSuit" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#364351"/><stop offset=".5" stopColor="#111923"/><stop offset="1" stopColor="#05090e"/></linearGradient>
        <filter id="aGlow"><feGaussianBlur stdDeviation="2.5"/></filter>
      </defs>
      <ellipse cx="56" cy="143" rx="32" ry="4" fill="#000" opacity=".16"/>
      <path d="M18 141c2-27 17-43 38-43s36 16 38 43" fill="url(#aSuit)" stroke="#91a0ae" strokeOpacity=".35"/>
      <path d="M31 102c6-8 14-12 25-12s19 4 25 12l-7 10H38z" fill="#0a1018"/>
      <path d="M36 107h40l4 34H32z" fill="url(#aSuit)" stroke="#6f7e8d" strokeOpacity=".28"/>
      <path d="M49 109h14v25H49z" fill="#1b2b38" stroke="#6ee7ff" strokeOpacity=".28"/>
      <path d="M52 114h8v2h-8zm0 6h5v2h-5zm0 6h8v2h-8z" fill="#7ee7ff" opacity=".8"/>
      <rect x="22" y="19" width="68" height="79" rx="31" fill="url(#aHelmet)" stroke="#eef7ff" strokeOpacity=".7"/>
      <path d="M28 54c0-21 12-31 28-31s28 10 28 31v20c0 10-8 18-18 21H46c-10-3-18-11-18-21z" fill="url(#aFace)"/>
      <path d="M28 54h56v20c0 10-8 18-18 21H46c-10-3-18-11-18-21z" fill="url(#aGlass)" stroke="#d7f7ff" strokeOpacity=".45"/>
      <path d="M33 42c7-10 16-15 28-15s21 5 28 15" fill="none" stroke="#fff" strokeOpacity=".65" strokeWidth="2"/>
      <ellipse cx="43" cy="62" rx="6" ry="4.5" fill="#050c14"/><ellipse cx="69" cy="62" rx="6" ry="4.5" fill="#050c14"/>
      <circle cx="44.5" cy="61" r="1.7" fill="#dffaff"/><circle cx="70.5" cy="61" r="1.7" fill="#dffaff"/>
      <path d="M47 78c5 3 13 3 18 0" fill="none" stroke="#263c4b" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M42 88h28" stroke="#7ee7ff" strokeOpacity=".5" strokeWidth="1"/>
      <path d="M18 52c-4 3-5 9-2 14M94 52c4 3 5 9 2 14" fill="none" stroke="#95a6b6" strokeWidth="3.5" strokeLinecap="round"/>
      <circle cx="16" cy="69" r="3" fill="#7ee7ff"/><circle cx="96" cy="69" r="3" fill="#7ee7ff"/>
      <circle cx="84" cy="31" r="2.5" fill="#7ee7ff"/><circle cx="84" cy="31" r="7" fill="#7ee7ff" opacity=".2" filter="url(#aGlow)"/>
      <path d="M39 129h34" stroke="#7ee7ff" strokeOpacity=".25" strokeWidth="1"/>
    </svg>
  </div>;
}

export function JulieAdvisor() {
  return (
    <div className="group relative mx-auto flex h-[112px] w-[112px] items-center justify-center sm:h-[132px] sm:w-[132px]">
      <div className="pointer-events-none absolute inset-2 rounded-full bg-primary/[0.09] blur-2xl transition duration-700 group-hover:scale-110" />
      <div className="absolute -right-1 top-2 rounded-full border border-primary/20 bg-background/80 px-2 py-1 label-mono text-[7px] text-primary shadow-sm backdrop-blur">LIVE</div>
      <JuliePortrait />
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
          <p className="mt-2 max-w-xl text-[11px] leading-5 text-muted-foreground sm:text-xs">Il analyse votre activité, vos objectifs et vos priorités pour construire un parcours clair — sans vous noyer dans une liste de services.</p>
          <div className="mt-3 flex flex-wrap gap-1.5"><span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/55 px-2 py-1 text-[8px] text-muted-foreground"><Activity className="h-3 w-3 text-primary"/> Analyse en direct</span><span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/55 px-2 py-1 text-[8px] text-muted-foreground"><ShieldCheck className="h-3 w-3 text-primary"/> Recommandation sur mesure</span></div>
        </div>
        <button type="button" onClick={onStart} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-[8px] font-semibold uppercase tracking-[.13em] text-primary-foreground shadow-[0_12px_35px_-18px_hsl(var(--primary)/.8)] transition hover:-translate-y-0.5 hover:shadow-lg"><MessageCircle className="h-3 w-3" /> Commencer <ArrowRight className="h-3 w-3" /></button>
      </div>
    </div>
  );
}
