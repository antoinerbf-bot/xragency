import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";

function AlexandrePortrait() {
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [talking, setTalking] = useState(false);

  return (
    <div
      className="relative h-[88px] w-[76px] cursor-pointer sm:h-[102px] sm:w-[88px]"
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
      <div className="absolute inset-0 rounded-full bg-primary/[0.08] blur-2xl" />

      <svg viewBox="0 0 112 132" className="relative h-full w-full overflow-visible drop-shadow-[0_10px_18px_rgba(0,0,0,.18)]">
        <defs>
          <linearGradient id="jacket" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="hsl(var(--foreground) / .22)" />
            <stop offset=".5" stopColor="hsl(var(--card) / .92)" />
            <stop offset="1" stopColor="hsl(var(--primary) / .16)" />
          </linearGradient>
          <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f0c5a4" />
            <stop offset=".55" stopColor="#d99d7d" />
            <stop offset="1" stopColor="#b9785e" />
          </linearGradient>
          <linearGradient id="hair" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22242a" />
            <stop offset=".7" stopColor="#090a0d" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <linearGradient id="shirt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f5f3ee" />
            <stop offset="1" stopColor="#c8c5bd" />
          </linearGradient>
          <radialGradient id="faceLight" cx=".38" cy=".28" r=".8">
            <stop offset="0" stopColor="#fff" stopOpacity=".28" />
            <stop offset=".55" stopColor="#fff" stopOpacity=".04" />
            <stop offset="1" stopColor="#000" stopOpacity=".16" />
          </radialGradient>
          <filter id="soft">
            <feGaussianBlur stdDeviation="1.8" />
          </filter>
        </defs>

        {/* shoulders / tailored jacket */}
        <path d="M18 128c2-22 13-31 30-35h16c17 4 28 13 30 35Z" fill="url(#jacket)" stroke="hsl(var(--foreground) / .12)" strokeWidth="1" />
        <path d="M44 96l12 17 12-17-5-7H49Z" fill="url(#shirt)" opacity=".95" />
        <path d="M56 111l-6-13 6-6 6 6Z" fill="hsl(var(--primary) / .7)" opacity=".9" />
        <path d="M27 105c8-7 13-9 19-10M85 105c-8-7-13-9-19-10" fill="none" stroke="hsl(var(--foreground) / .1)" strokeWidth="1" />

        {/* neck */}
        <path d="M47 87v12c2 5 7 8 9 8s7-3 9-8V87Z" fill="url(#skin)" />
        <path d="M47 88c3 5 6 7 9 7s7-2 9-7c-1 9-5 13-9 13s-8-4-9-13Z" fill="#8d5b4a" opacity=".18" />

        {/* ears */}
        <ellipse cx="39.5" cy="57" rx="5.5" ry="8.5" fill="url(#skin)" />
        <ellipse cx="72.5" cy="57" rx="5.5" ry="8.5" fill="url(#skin)" />
        <path d="M38 56c3-3 4 1 1 4M74 56c-3-3-4 1-1 4" fill="none" stroke="#8c5a4e" strokeWidth=".7" opacity=".5" />

        {/* face */}
        <path d="M40 32c5-12 28-13 34 0v28c0 17-8 28-17 31-9-3-17-14-17-31Z" fill="url(#skin)" stroke="#8b5d50" strokeOpacity=".18" />
        <path d="M40 32c6-14 30-15 35 2l-2 8c-5-6-10-8-17-8-6 0-11 2-16 6Z" fill="url(#hair)" />
        <path d="M44 34c5-7 18-11 27-2" fill="none" stroke="#363840" strokeWidth="2" strokeLinecap="round" opacity=".7" />

        {/* subtle facial planes */}
        <path d="M56 43c-2 7-3 11-2 15 1 2 3 3 5 2" fill="none" stroke="#8e5d51" strokeWidth=".8" opacity=".45" />
        <path d="M48 67c5 3 11 3 16 0" fill="none" stroke="#865448" strokeWidth=".9" opacity=".55" />
        <path d="M45 54c3-2 7-2 10 0M59 54c3-2 7-2 10 0" fill="none" stroke="#68463f" strokeWidth=".9" opacity=".5" />

        {/* eyes with cursor-following pupils */}
        <ellipse cx="50.5" cy="56" rx="4.3" ry="2.6" fill="#f7f5ef" />
        <ellipse cx="61.5" cy="56" rx="4.3" ry="2.6" fill="#f7f5ef" />
        <circle cx={50.5 + look.x * 1.5} cy={56 + look.y * .8} r="1.7" fill="#16181d" />
        <circle cx={61.5 + look.x * 1.5} cy={56 + look.y * .8} r="1.7" fill="#16181d" />
        <circle cx={50.9 + look.x * 1.5} cy={55.4 + look.y * .8} r=".45" fill="white" />
        <circle cx={61.9 + look.x * 1.5} cy={55.4 + look.y * .8} r=".45" fill="white" />

        {/* eyebrows */}
        <path d="M46 50c3-2 6-2 9-.5M58 49.5c3-1.5 6-1.5 9 .5" fill="none" stroke="#25252a" strokeWidth="1.5" strokeLinecap="round" />

        {/* mouth / speech reaction */}
        <path
          d={talking ? "M52 72c3 3 7 3 10 0" : "M52 72c3 1.2 7 1.2 10 0"}
          fill="none"
          stroke={talking ? "hsl(var(--primary))" : "#774a40"}
          strokeWidth={talking ? "2" : "1.4"}
          strokeLinecap="round"
        />

        {/* ear device / AI detail */}
        <circle cx="74" cy="61" r="2.2" fill="hsl(var(--primary))" opacity=".85" />
        <circle cx="74" cy="61" r="4.2" fill="none" stroke="hsl(var(--primary) / .25)" strokeWidth=".7" />
        <path d="M76 62c4 2 5 4 5 7" fill="none" stroke="hsl(var(--primary) / .35)" strokeWidth=".8" />

        {/* soft rim light */}
        <path d="M42 39c-4 9-4 26 1 37" fill="none" stroke="white" strokeOpacity=".14" strokeWidth="1.5" filter="url(#soft)" />
      </svg>

      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-white/10 bg-background/85 px-2 py-0.5 backdrop-blur-md">
        <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
        <span className="text-[6px] uppercase tracking-[.14em] text-muted-foreground">Alexandre · IA</span>
      </div>
    </div>
  );
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
