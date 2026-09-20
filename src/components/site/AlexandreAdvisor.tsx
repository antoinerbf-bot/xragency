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
    <div className="group/portrait relative h-[154px] w-[118px] sm:h-[174px] sm:w-[134px]" aria-label="Julie, à votre écoute">
      <div className="absolute inset-x-3 bottom-0 h-5 rounded-full bg-black/35 blur-xl" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] border border-white/20 bg-[#d8d1c9] shadow-[0_30px_70px_-28px_rgba(0,0,0,.9)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(255,255,255,.8),transparent_30%),linear-gradient(145deg,#eee8e1,#c7cbc7_55%,#69726e)]" />
        <div className={`absolute inset-x-0 bottom-0 h-[72%] overflow-hidden transition-transform duration-700 ${motion}`}>
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=92"
            alt="Julie"
            className="h-[122%] w-full object-cover object-[50%_18%] saturate-[.9] contrast-[1.04] brightness-[.98]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1211] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,18,17,.16),transparent_45%,rgba(12,18,17,.08))]" />
        </div>

        <div className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/25 px-2 py-1 text-[7px] font-semibold uppercase tracking-[.16em] text-white backdrop-blur-md">
          Julie
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="rounded-full border border-white/20 bg-black/30 px-2 py-1 text-[6px] uppercase tracking-[.16em] text-white/85 backdrop-blur-md">
            À votre écoute
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
