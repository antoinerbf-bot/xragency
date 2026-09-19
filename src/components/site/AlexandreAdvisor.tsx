import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

function AlexandrePortrait() {
  return <div className="relative h-[88px] w-[76px] sm:h-[102px] sm:w-[88px]">
    <svg viewBox="0 0 112 132" className="h-full w-full drop-shadow-[0_10px_18px_rgba(0,0,0,.18)]" aria-label="Alexandre, assistant IA">
      <defs>
        <linearGradient id="xrHelmet" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f5f7fa"/><stop offset=".5" stopColor="#aeb9c7"/><stop offset="1" stopColor="#4e5968"/></linearGradient>
        <linearGradient id="xrFace" x1=".2" y1="0" x2=".8" y2="1"><stop offset="0" stopColor="#dce5ee"/><stop offset=".55" stopColor="#9eabb9"/><stop offset="1" stopColor="#697687"/></linearGradient>
        <linearGradient id="xrGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".7"/><stop offset=".5" stopColor="#9fe8ff" stopOpacity=".2"/><stop offset="1" stopColor="#34495e" stopOpacity=".2"/></linearGradient>
        <linearGradient id="xrSuit" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#293440"/><stop offset="1" stopColor="#090e14"/></linearGradient>
      </defs>
      <ellipse cx="56" cy="124" rx="30" ry="4" fill="currentColor" opacity=".1"/>
      <path d="M21 123c3-23 17-34 35-34s32 11 35 34" fill="url(#xrSuit)" stroke="#778291" strokeOpacity=".35"/>
      <path d="M29 93c5-9 14-14 27-14s22 5 27 14l-8 5H37z" fill="#141b24"/>
      <rect x="25" y="18" width="62" height="68" rx="27" fill="url(#xrHelmet)" stroke="#d9e2ec" strokeOpacity=".55"/>
      <path d="M30 51c0-18 11-28 26-28s26 10 26 28v16c0 8-5 14-11 18H41c-6-4-11-10-11-18z" fill="url(#xrFace)"/>
      <path d="M30 51h52v16c0 8-7 15-16 18H46c-9-3-16-10-16-18z" fill="url(#xrGlass)" stroke="#d9f4ff" strokeOpacity=".3"/>
      <ellipse cx="43" cy="60" rx="5" ry="4" fill="#07101a"/><ellipse cx="69" cy="60" rx="5" ry="4" fill="#07101a"/>
      <circle cx="44" cy="59" r="1.5" fill="#d9f8ff"/><circle cx="70" cy="59" r="1.5" fill="#d9f8ff"/>
      <path d="M48 74c5 2 10 2 16 0" fill="none" stroke="#314454" strokeWidth="2" strokeLinecap="round"/>
      <path d="M37 48c4-4 10-5 15-3M61 45c5-2 11-1 15 3" fill="none" stroke="#6f7e8f" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 47c-3 2-4 7-2 10M92 47c3 2 4 7 2 10" fill="none" stroke="#9aa8b7" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="18" cy="59" r="2.5" fill="#7ee7ff"/><circle cx="94" cy="59" r="2.5" fill="#7ee7ff"/>
      <path d="M30 32c9-12 24-17 38-11 8 3 14 10 16 19" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5"/>
      <circle cx="83" cy="31" r="2.5" fill="#7ee7ff"/>
    </svg>
    <span className="absolute right-1 top-2 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.7)]"/>
  </div>;
}

export function AlexandreAdvisor() {
  return (
    <div className="group relative mx-auto flex h-[88px] w-[88px] items-center justify-center sm:h-[102px] sm:w-[102px]">
      <div className="pointer-events-none absolute inset-4 rounded-full bg-primary/[0.07] blur-2xl transition duration-700 group-hover:scale-110" />
      <AlexandrePortrait />
    </div>
  );
}

export function AlexandreIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="group grid items-center gap-4 rounded-2xl border border-primary/15 bg-card/55 p-4 shadow-[0_20px_60px_-40px_rgba(0,0,0,.9)] backdrop-blur-xl sm:grid-cols-[130px_1fr_auto] sm:p-5">
      <AlexandreAdvisor />
      <div>
        <div className="mb-1.5 flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[.2em] text-primary">
          <Sparkles className="h-3 w-3" /> XR Intelligence
        </div>
        <h2 className="display-serif text-2xl leading-none tracking-tight sm:text-3xl">Parlez avec Alexandre.</h2>
        <p className="mt-2 max-w-xl text-[11px] leading-4.5 text-muted-foreground sm:text-xs">
          Un conseiller digital vivant vous guide vers une configuration cohérente.
        </p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[.13em] text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <MessageCircle className="h-3 w-3" /> Discuter avec Alexandre <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  );
}
