import { ArrowRight, MessageCircle, Sparkles, Activity, ShieldCheck, WandSparkles } from "lucide-react";

type JulieMood = "calm" | "focus" | "recommend" | "success";
type JulieAdvisorProps = { mood?: JulieMood; sector?: string; goal?: string; selectedServices?: string[]; step?: number };

const moodCopy: Record<JulieMood, { badge: string; line: string; tone: string }> = {
  calm: { badge: "À VOTRE ÉCOUTE", line: "Dites-moi simplement où vous en êtes. Je vous guide ensuite, étape par étape.", tone: "border-white/15" },
  focus: { badge: "J'ANALYSE", line: "Je croise vos réponses pour isoler les leviers vraiment utiles.", tone: "border-primary/30" },
  recommend: { badge: "JE RECOMMANDE", line: "J'ai assez de contexte pour vous proposer un parcours cohérent.", tone: "border-primary/45" },
  success: { badge: "PRÊTE", line: "Votre première recommandation est prête. Vous pouvez encore l'ajuster.", tone: "border-emerald-400/30" },
};

function JuliePortrait({ mood }: { mood: JulieMood }) {
  const motion = mood === "recommend" ? "translate-x-[2px]" : mood === "focus" ? "-translate-x-[1px]" : "";

  return (
    <div className="group/portrait relative h-[154px] w-[118px] sm:h-[174px] sm:w-[134px]" aria-label="Julie, à votre service">
      <div className="absolute inset-x-3 bottom-0 h-5 rounded-full bg-black/35 blur-xl" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] border border-white/20 bg-[radial-gradient(circle_at_68%_18%,#fff8ef_0%,#ded8d0_38%,#9b9c99_100%)] shadow-[0_30px_70px_-28px_rgba(0,0,0,.9)] transition-transform duration-500 group-hover/portrait:-translate-y-1">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_8%,rgba(255,255,255,.9),transparent_28%),linear-gradient(145deg,rgba(255,255,255,.2),transparent_55%,rgba(10,14,13,.2))]" />

        <div className={`absolute inset-x-0 bottom-0 h-[94%] transition-transform duration-700 ${motion}`}>
          <svg viewBox="0 0 240 330" className="h-full w-full" role="img" aria-label="Julie">
            <defs>
              <linearGradient id="julieSkin" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f6d2bb" />
                <stop offset="0.58" stopColor="#e8b99f" />
                <stop offset="1" stopColor="#c98f78" />
              </linearGradient>
              <linearGradient id="julieHair" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#211b1c" />
                <stop offset="0.55" stopColor="#0e0c0d" />
                <stop offset="1" stopColor="#33272a" />
              </linearGradient>
              <linearGradient id="julieJacket" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#242829" />
                <stop offset="1" stopColor="#0c1010" />
              </linearGradient>
              <filter id="julieShadow" x="-30%" y="-30%" width="160%" height="170%">
                <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000" floodOpacity=".28" />
              </filter>
            </defs>

            <ellipse cx="120" cy="324" rx="78" ry="13" fill="rgba(0,0,0,.22)" />
            <path d="M43 326c5-56 31-86 77-86s72 30 77 86H43Z" fill="url(#julieJacket)" filter="url(#julieShadow)" />
            <path d="M91 240h58l-10 40-19 22-19-22-10-40Z" fill="#e5b39a" />
            <path d="M96 247c10 13 21 19 24 19s14-6 24-19v28c-8 12-16 17-24 17s-16-5-24-17v-28Z" fill="#d9a48c" opacity=".55" />

            <path d="M58 122c0-54 26-86 64-86 45 0 66 31 63 89l-7 61c-8 40-33 62-58 62-29 0-54-23-61-63l-1-63Z" fill="url(#julieSkin)" filter="url(#julieShadow)" />

            <path d="M55 132c-4-62 13-111 67-111 52 0 79 40 64 112-6-35-22-50-43-59-21-9-35-23-44-39-8 29-22 46-44 58Z" fill="url(#julieHair)" />
            <path d="M55 128c-12-20-8-50 3-68 7 30 4 54-3 68Zm129 3c10-24 8-51-3-71 0 30 1 50 3 71Z" fill="#151112" />

            <ellipse cx="89" cy="144" rx="18" ry="11" fill="#f7e1d4" opacity=".14" />
            <ellipse cx="151" cy="144" rx="18" ry="11" fill="#f7e1d4" opacity=".14" />

            <path d="M75 128c10-8 23-9 34-2" fill="none" stroke="#332324" strokeWidth="5" strokeLinecap="round" />
            <path d="M132 126c11-7 24-6 34 2" fill="none" stroke="#332324" strokeWidth="5" strokeLinecap="round" />

            <g className="origin-center transition-transform duration-300 group-hover/portrait:scale-y-[.15]">
              <ellipse cx="91" cy="143" rx="5.5" ry="7" fill="#211a1a" />
              <ellipse cx="149" cy="143" rx="5.5" ry="7" fill="#211a1a" />
              <circle cx="93" cy="140.5" r="1.6" fill="#fff" />
              <circle cx="151" cy="140.5" r="1.6" fill="#fff" />
            </g>

            <path d="M121 145c-2 12-5 24 2 29 4 2 8 1 10-2" fill="none" stroke="#b77c69" strokeWidth="3" strokeLinecap="round" />
            <path d="M84 174c7 5 15 7 24 5" fill="none" stroke="#d58e86" strokeWidth="4" strokeLinecap="round" opacity=".6" />
            <path d="M132 179c9 2 17 0 24-5" fill="none" stroke="#d58e86" strokeWidth="4" strokeLinecap="round" opacity=".6" />

            <path
              d="M99 184 Q120 177 141 184"
              fill="none"
              stroke="#7b3f48"
              strokeWidth="4"
              strokeLinecap="round"
              className="transition-all duration-500 group-hover/portrait:[d:path('M98 181 Q120 207 142 181')]"
            />

            <path d="M66 203c17 12 31 18 54 18s38-6 54-18c-4 25-22 42-54 42s-50-17-54-42Z" fill="#e7b79f" opacity=".7" />
            <path d="M78 260l42 43 42-43" fill="none" stroke="#444b4b" strokeWidth="4" opacity=".65" />
            <path d="M111 262l9 41 9-41" fill="none" stroke="#d7dbd7" strokeWidth="2" opacity=".45" />
          </svg>
        </div>

        <div className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/25 px-2 py-1 text-[7px] font-semibold uppercase tracking-[.16em] text-white backdrop-blur-md">
          Julie
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="rounded-full border border-white/20 bg-black/30 px-2 py-1 text-[6px] uppercase tracking-[.16em] text-white/90 backdrop-blur-md">
            À votre service
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
        </div>
      </div>
    </div>
  );
}

export function JulieAdvisor({ mood = "calm", sector, goal, selectedServices = [], step = 0 }: JulieAdvisorProps) {
  const copy = moodCopy[mood];
  const context = sector ? sector.split(" · ")[0] : "votre activité";
  return (
    <div className="group relative">
      <div className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-primary/[0.06] blur-2xl transition duration-700 group-hover:bg-primary/[0.1]" />
      <div className="relative flex items-center gap-3">
        <div className="shrink-0 transition duration-500 group-hover:-translate-y-1"><JuliePortrait mood={mood} /></div>
        <div className="hidden min-w-0 max-w-[230px] sm:block">
          <div className={`rounded-[1.25rem] rounded-bl-md border bg-background/85 p-3 shadow-[0_20px_45px_-30px_rgba(0,0,0,.9)] backdrop-blur-xl ${copy.tone}`}>
            <div className="flex items-center gap-1.5"><WandSparkles className="h-3 w-3 text-primary" /><span className="label-mono text-[7px] font-semibold tracking-[.18em] text-primary">{copy.badge}</span></div>
            <p className="mt-1.5 text-[9px] leading-4 text-foreground/80">{copy.line}</p>
            {sector && <div className="mt-2 flex flex-wrap gap-1"><span className="rounded-full bg-primary/10 px-2 py-1 text-[7px] text-primary">{context}</span>{step >= 4 && <span className="rounded-full bg-foreground/5 px-2 py-1 text-[7px] text-muted-foreground">{selectedServices.length || "sur mesure"} levier{selectedServices.length > 1 ? "s" : ""}</span>}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function JulieIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.6rem] border border-primary/15 bg-gradient-to-br from-card/95 via-card/75 to-primary/[.035] p-4 shadow-[0_30px_80px_-55px_rgba(0,0,0,.9)] backdrop-blur-xl sm:p-5">
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative grid items-center gap-4 sm:grid-cols-[260px_1fr_auto]">
        <JulieAdvisor mood="calm" />
        <div><div className="mb-1.5 flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[.2em] text-primary"><Sparkles className="h-3 w-3" /> XR Intelligence · Julie</div><h2 className="display-serif text-2xl leading-none tracking-tight sm:text-3xl">Votre conseillère digitale.</h2><p className="mt-2 max-w-xl text-[11px] leading-5 text-muted-foreground sm:text-xs">Une conversation visuelle qui évolue avec vos réponses. Julie comprend votre contexte, explique ses choix et construit une recommandation plutôt que de vous faire remplir un vieux formulaire.</p><div className="mt-3 flex flex-wrap gap-1.5"><span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/55 px-2 py-1 text-[8px] text-muted-foreground"><Activity className="h-3 w-3 text-primary"/> Analyse en direct</span><span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/55 px-2 py-1 text-[8px] text-muted-foreground"><ShieldCheck className="h-3 w-3 text-primary"/> Recommandation sur mesure</span></div></div>
        <button type="button" onClick={onStart} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-[8px] font-semibold uppercase tracking-[.13em] text-primary-foreground shadow-[0_12px_35px_-18px_hsl(var(--primary)/.8)] transition hover:-translate-y-0.5 hover:shadow-lg"><MessageCircle className="h-3 w-3" /> Commencer <ArrowRight className="h-3 w-3" /></button>
      </div>
    </div>
  );
}
