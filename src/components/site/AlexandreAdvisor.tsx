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
    <div className="group/portrait relative h-[190px] w-[150px] sm:h-[226px] sm:w-[178px]" aria-label="Julie, conseillère digitale">
      <div className="absolute -left-5 top-6 h-20 w-20 rounded-full bg-fuchsia-400/30 blur-2xl transition duration-700 group-hover/portrait:scale-125" />
      <div className="absolute -right-4 bottom-5 h-24 w-24 rounded-full bg-cyan-400/25 blur-2xl transition duration-700 group-hover/portrait:scale-125" />
      <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-white/20 bg-[linear-gradient(145deg,#f8f2e8,#dfe8e8_48%,#c8d2ec)] shadow-[0_35px_80px_-30px_rgba(0,0,0,.8)] transition-transform duration-500 group-hover/portrait:-translate-y-2">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-yellow-300/70 blur-[1px]" />
        <div className="absolute -left-8 bottom-12 h-24 w-24 rounded-full bg-fuchsia-300/55 rotate-12" />
        <div className="absolute right-5 bottom-8 h-16 w-16 rounded-[1.5rem] bg-cyan-300/50 rotate-12" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,.95),transparent_34%),linear-gradient(125deg,rgba(255,255,255,.18),transparent_45%,rgba(14,20,30,.14))]" />

        <div className={`absolute inset-x-0 bottom-0 h-[97%] transition-transform duration-700 ${motion}`}>
          <svg viewBox="0 0 260 360" className="h-full w-full" role="img" aria-label="Julie">
            <defs>
              <linearGradient id="julieSkinEditorial" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffe5d4" />
                <stop offset="0.55" stopColor="#efbea6" />
                <stop offset="1" stopColor="#c78370" />
              </linearGradient>
              <linearGradient id="julieHairEditorial" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#542f38" />
                <stop offset="0.5" stopColor="#1d1720" />
                <stop offset="1" stopColor="#8a4f55" />
              </linearGradient>
              <linearGradient id="julieJacketEditorial" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#392c55" />
                <stop offset="0.5" stopColor="#17172a" />
                <stop offset="1" stopColor="#0a1020" />
              </linearGradient>
            </defs>

            <ellipse cx="130" cy="354" rx="82" ry="10" fill="rgba(0,0,0,.16)" />
            <path d="M36 358c5-67 35-100 94-106 59 6 89 39 94 106H36Z" fill="url(#julieJacketEditorial)" />
            <path d="M91 253h78l-15 42-24 42-24-42-15-42Z" fill="#f8f1e8" />
            <path d="M91 253l39 84 39-84" fill="none" stroke="#e4b8b1" strokeWidth="3" />
            <circle cx="172" cy="285" r="4" fill="#f3c96b" />

            <path d="M67 113c0-56 27-91 65-91 45 0 73 34 69 92l-8 74c-6 39-30 65-61 65-32 0-56-27-62-66l-3-74Z" fill="url(#julieSkinEditorial)" />
            <path d="M61 126C50 80 65 30 115 18c45-11 88 18 91 76 2 35-4 60-14 75l-12-8c8-33 2-62-20-81-17-15-36-22-51-39-7 28-25 48-47 61l-1 34-0 0Z" fill="url(#julieHairEditorial)" />
            <path d="M69 132c-13 22-11 50 2 68l12-10c-5-18-5-38 1-58H69Zm123 0c12 22 10 49-2 68l-11-10c5-19 5-39-1-58h14Z" fill="#321c28" opacity=".9" />
            <path d="M86 91c18-19 39-28 64-25 19 2 35 10 49 25" fill="none" stroke="#a66b70" strokeWidth="5" strokeLinecap="round" opacity=".45" />

            <path d="M84 141c12-8 25-8 38-1M141 139c12-7 25-5 36 4" fill="none" stroke="#56353b" strokeWidth="5" strokeLinecap="round" />
            <g className="origin-center transition-transform duration-300 group-hover/portrait:scale-y-[.08]">
              <ellipse cx="103" cy="155" rx="6.5" ry="5.5" fill="#30242d" />
              <ellipse cx="160" cy="153" rx="6.5" ry="5.5" fill="#30242d" />
              <circle cx="105" cy="153" r="1.8" fill="#fff" />
              <circle cx="162" cy="151" r="1.8" fill="#fff" />
            </g>
            <path d="M130 155c-2 14-7 26 2 31 4 2 8 1 10-2" fill="none" stroke="#bd806e" strokeWidth="3" strokeLinecap="round" />
            <path d="M103 197Q130 189 157 197" fill="none" stroke="#8d4d5d" strokeWidth="4" strokeLinecap="round" className="transition-opacity duration-300 group-hover/portrait:opacity-0" />
            <path d="M103 194Q130 214 157 194" fill="none" stroke="#8d4d5d" strokeWidth="4" strokeLinecap="round" className="opacity-0 transition-opacity duration-500 group-hover/portrait:opacity-100" />

            <path d="M75 219c15 15 34 22 55 22s41-7 56-22c-6 30-25 49-56 49s-49-19-55-49Z" fill="#e2aa9b" opacity=".35" />
            <path d="M83 297c14 10 31 15 47 15s34-5 48-15" fill="none" stroke="#a58bd1" strokeWidth="2" opacity=".7" />
          </svg>
        </div>

        <div className="absolute left-3 top-3 rounded-full border border-white/35 bg-white/45 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[.16em] text-slate-900 backdrop-blur-md">
          Julie
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="rounded-full border border-white/35 bg-white/45 px-3 py-1.5 text-[8px] font-semibold tracking-[.06em] text-slate-900 backdrop-blur-md">
            À votre service
          </span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.95)]" />
        </div>
        <div className="pointer-events-none absolute inset-x-3 bottom-14 rounded-2xl border border-white/35 bg-slate-950/70 px-3 py-2.5 opacity-0 translate-y-2 backdrop-blur-md transition-all duration-500 group-hover/portrait:translate-y-0 group-hover/portrait:opacity-100">
          <p className="text-[9px] font-medium leading-4 text-white">Je vous aide à choisir le bon projet.</p>
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
