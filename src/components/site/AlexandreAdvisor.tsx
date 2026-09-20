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
      <div className="absolute inset-x-5 bottom-0 h-4 rounded-full bg-black/40 blur-xl" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] border border-white/15 bg-[linear-gradient(145deg,#efe9e1_0%,#d4cec7_45%,#a9aaa7_100%)] shadow-[0_30px_70px_-28px_rgba(0,0,0,.9)] transition-transform duration-500 group-hover/portrait:-translate-y-1">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(255,255,255,.92),transparent_25%),linear-gradient(115deg,rgba(255,255,255,.18),transparent_42%,rgba(8,11,11,.18))]" />

        <div className={`absolute inset-x-0 bottom-0 h-[96%] transition-transform duration-700 ${motion}`}>
          <svg viewBox="0 0 240 330" className="h-full w-full" role="img" aria-label="Julie">
            <defs>
              <linearGradient id="julieSkin2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f8ddca" />
                <stop offset="0.5" stopColor="#edc2ac" />
                <stop offset="1" stopColor="#c98f78" />
              </linearGradient>
              <linearGradient id="julieHair2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#3a2a28" />
                <stop offset="0.45" stopColor="#171112" />
                <stop offset="1" stopColor="#4b3432" />
              </linearGradient>
              <linearGradient id="julieBlazer" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#34393a" />
                <stop offset="0.55" stopColor="#161b1b" />
                <stop offset="1" stopColor="#090d0d" />
              </linearGradient>
              <radialGradient id="julieCheek">
                <stop offset="0" stopColor="#d98f83" stopOpacity=".34" />
                <stop offset="1" stopColor="#d98f83" stopOpacity="0" />
              </radialGradient>
              <filter id="julieSoftShadow" x="-30%" y="-30%" width="160%" height="180%">
                <feDropShadow dx="0" dy="11" stdDeviation="10" floodColor="#000" floodOpacity=".25" />
              </filter>
            </defs>

            <ellipse cx="120" cy="324" rx="76" ry="12" fill="rgba(0,0,0,.18)" />

            {/* Tailored blazer and neckline: editorial human silhouette, not a robot/avatar. */}
            <path d="M40 326c4-55 29-84 72-89l8 17 8-17c44 5 68 34 72 89H40Z" fill="url(#julieBlazer)" filter="url(#julieSoftShadow)" />
            <path d="M112 238h16l8 26-16 28-16-28 8-26Z" fill="#f5d2bf" />
            <path d="M88 248l32 43 32-43 25 78H63l25-78Z" fill="#f2eee8" opacity=".92" />
            <path d="M88 248l32 43 32-43" fill="none" stroke="#d5cec5" strokeWidth="2" />
            <path d="M120 291v33" stroke="#6d7270" strokeWidth="2" opacity=".35" />

            {/* Face: asymmetric, softly shaded features for a human/editorial feel. */}
            <path d="M60 119c0-51 26-82 60-82 43 0 67 30 64 84l-7 62c-7 39-31 62-57 62-29 0-53-24-60-63l0-63Z" fill="url(#julieSkin2)" filter="url(#julieSoftShadow)" />
            <ellipse cx="82" cy="175" rx="27" ry="22" fill="url(#julieCheek)" />
            <ellipse cx="158" cy="175" rx="25" ry="22" fill="url(#julieCheek)" />

            {/* Natural shoulder-length hair. */}
            <path d="M57 130c-6-54 8-100 54-113 45-12 80 17 82 74 1 22-3 43-8 58l-12-4c4-28-1-54-18-70-16-15-34-21-50-38-8 29-25 48-47 59l-1 34Z" fill="url(#julieHair2)" />
            <path d="M62 117c-11 17-10 48 1 66l10-9c-4-19-4-38 1-57l-12 0Zm116 0c9 18 9 46-1 66l-9-9c4-20 4-39-1-57l11 0Z" fill="#241719" opacity=".94" />
            <path d="M75 72c18-17 38-24 60-22 18 2 34 10 46 24" fill="none" stroke="#5b403d" strokeWidth="5" strokeLinecap="round" opacity=".5" />

            {/* Brows and eyes. */}
            <path d="M75 132c11-8 24-9 36-2" fill="none" stroke="#4a302e" strokeWidth="5" strokeLinecap="round" />
            <path d="M130 130c11-7 25-6 35 3" fill="none" stroke="#4a302e" strokeWidth="5" strokeLinecap="round" />
            <g className="origin-center transition-transform duration-300 group-hover/portrait:scale-y-[.08]">
              <ellipse cx="91" cy="146" rx="6" ry="5" fill="#3a2928" />
              <ellipse cx="150" cy="145" rx="6" ry="5" fill="#3a2928" />
              <circle cx="93" cy="144" r="1.7" fill="#fff" />
              <circle cx="152" cy="143" r="1.7" fill="#fff" />
            </g>

            {/* Nose, lips and restrained professional smile on hover. */}
            <path d="M119 145c-2 12-6 25 2 30 4 3 8 1 10-2" fill="none" stroke="#bd806c" strokeWidth="3" strokeLinecap="round" />
            <path d="M84 176c7 5 15 7 23 5M133 181c9 2 17 0 24-5" fill="none" stroke="#d89084" strokeWidth="4" strokeLinecap="round" opacity=".5" />
            <path d="M99 188 Q120 181 141 188" fill="none" stroke="#8b4a50" strokeWidth="3.5" strokeLinecap="round" className="transition-opacity duration-300 group-hover/portrait:opacity-0" />
            <path d="M99 186 Q120 201 141 186" fill="none" stroke="#8b4a50" strokeWidth="3.5" strokeLinecap="round" className="opacity-0 transition-opacity duration-500 group-hover/portrait:opacity-100" />

            {/* Small natural highlights and clothing detail. */}
            <path d="M70 211c13 13 29 20 50 20s38-7 51-20c-4 26-22 43-51 43s-46-17-50-43Z" fill="#e5b5a0" opacity=".45" />
            <path d="M102 260l18 31 18-31" fill="none" stroke="#fff" strokeWidth="2" opacity=".42" />
            <circle cx="151" cy="236" r="2.4" fill="#c9a46b" />
          </svg>
        </div>

        <div className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/25 px-2 py-1 text-[7px] font-semibold uppercase tracking-[.16em] text-white backdrop-blur-md">
          Julie
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="rounded-full border border-white/20 bg-black/30 px-2 py-1 text-[6px] uppercase tracking-[.16em] text-white/90 backdrop-blur-md">
            À votre service
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
        </div>

        <div className="pointer-events-none absolute inset-x-3 bottom-12 rounded-xl border border-white/15 bg-black/15 px-2.5 py-2 opacity-0 translate-y-2 backdrop-blur-md transition-all duration-500 group-hover/portrait:translate-y-0 group-hover/portrait:opacity-100">
          <p className="text-[7px] font-medium leading-3 text-white/90">Je vous aide à trouver le bon levier pour votre activité.</p>
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
