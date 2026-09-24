import { Sparkles, ShieldCheck, FileImage, Search, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import earthTexture from "@/assets/earth_texture.jpg";
import { EmberButton, Parallax } from "./primitives";

function GlobalPresence() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[520px] select-none"
      aria-label="Présence internationale : France, Dubaï, Asie et Amérique du Nord"
    >
      <div className="absolute inset-[7%] rounded-full border border-primary/25 bg-black/20 shadow-[0_0_90px_-25px_rgba(242,163,58,.45)]" />
      <div className="absolute inset-[10%] overflow-hidden rounded-full border border-white/10 bg-black">
        <img
          src={earthTexture}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-75 mix-blend-screen animate-[spin_42s_linear_infinite]"
        />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,.12),transparent_28%),radial-gradient(circle_at_65%_70%,rgba(242,163,58,.16),transparent_42%)]" />
      </div>
      <div className="absolute inset-[3%] rounded-full border border-primary/20 [transform:rotateX(68deg)]" />
      <div className="absolute inset-[16%] rounded-full border border-white/10 [transform:rotateY(62deg)]" />
      {[
        ["PARIS", "18%", "31%"],
        ["DUBAI", "67%", "48%"],
        ["DA NANG", "75%", "62%"],
        ["NEW YORK", "7%", "43%"],
      ].map(([name, left, top]) => (
        <span
          key={name}
          className="absolute flex items-center gap-1.5 label-mono text-[8px] uppercase tracking-[.16em] text-white/70"
          style={{ left, top }}
        >
          <i className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_rgba(242,163,58,.9)]" />
          {name}
        </span>
      ))}
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/55 px-4 py-2 backdrop-blur-md">
        <span className="label-mono text-[8px] tracking-[.2em] text-white/45">
          FRANCE · ASIE · INTERNATIONAL
        </span>
      </div>
    </div>
  );
}

/** Kinetic word-by-word title for 2026 motion */
function KineticTitle({ line1, accent, line2 }: { line1: string; accent: string; line2: string }) {
  const words1 = line1.split(" ");
  const words2 = line2.split(" ");
  let delay = 180;

  return (
    <h1 className="display-serif mt-5 text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.96] tracking-tight">
      <span className="block overflow-hidden">
        {words1.map((w, i) => {
          const d = delay + i * 55;
          return (
            <span
              key={`a-${i}`}
              className="inline-block"
              style={{
                animation: `kinetic-in 0.85s cubic-bezier(0.16,1,0.3,1) ${d}ms both`,
              }}
            >
              {w}
              {i < words1.length - 1 ? "\u00A0" : ""}
            </span>
          );
        })}
      </span>
      <span className="block overflow-hidden">
        <em
          className="not-italic italic text-primary inline-block"
          style={{
            animation: `kinetic-in 0.9s cubic-bezier(0.16,1,0.3,1) ${delay + words1.length * 55 + 40}ms both`,
          }}
        >
          {accent}
        </em>
        {" "}
        {words2.map((w, i) => {
          const d = delay + words1.length * 55 + 80 + i * 55;
          return (
            <span
              key={`b-${i}`}
              className="inline-block"
              style={{
                animation: `kinetic-in 0.85s cubic-bezier(0.16,1,0.3,1) ${d}ms both`,
              }}
            >
              {w}
              {i < words2.length - 1 ? "\u00A0" : ""}
            </span>
          );
        })}
      </span>
    </h1>
  );
}

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="grain relative min-h-[92dvh] overflow-hidden pt-20 sm:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 10% 40%, var(--background) 30%, color-mix(in oklab, var(--background) 65%, transparent) 60%, color-mix(in oklab, var(--background) 85%, transparent) 100%), linear-gradient(180deg, color-mix(in oklab, var(--background) 60%, transparent) 0%, transparent 45%, var(--background) 98%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(92dvh-6.5rem)] max-w-7xl flex-col justify-between px-6 lg:px-10">
        <div className="grid items-center gap-10 py-10 lg:grid-cols-12 lg:py-14">
          <Parallax speed={-0.03} className="relative z-10 lg:col-span-7">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-1.5"
              style={{ animation: "ember-rise 0.7s cubic-bezier(0.16,1,0.3,1) 80ms both" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span className="label-mono text-xs text-primary font-medium">{t(UI.heroKicker)}</span>
            </div>

            <KineticTitle
              line1={t(UI.heroTitle1)}
              accent={t(UI.heroTitleAccent)}
              line2={t(UI.heroTitle2)}
            />

            <div
              className="mt-6 max-w-xl"
              style={{ animation: "ember-rise 0.8s cubic-bezier(0.16,1,0.3,1) 520ms both" }}
            >
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{t(UI.heroLead)}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground/80 font-mono">{t(UI.heroMeta)}</p>
            </div>

            <div
              className="mt-8 flex flex-wrap items-center gap-3.5"
              style={{ animation: "ember-rise 0.8s cubic-bezier(0.16,1,0.3,1) 620ms both" }}
            >
              <div className="grid w-full max-w-3xl grid-cols-1 gap-2 sm:grid-cols-3 [perspective:900px]">
                <div className="group sm:-translate-y-1 sm:hover:-translate-y-2 transition-transform duration-500">
                  <EmberButton
                    href="#quote"
                    className="relative w-full justify-center overflow-hidden rounded-2xl py-3.5 shadow-[0_18px_45px_-24px_rgba(0,0,0,.8)]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <span className="relative flex items-center gap-2">
                      Faire mon devis gratuit <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </EmberButton>
                </div>
                <a
                  href={
                    CONTACT.whatsapp +
                    "?text=" +
                    encodeURIComponent(
                      "Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €). Je vais vous envoyer mon logo, les éléments que j'ai déjà et le lien de mon site si j'en ai un. Merci de me dire où les envoyer.",
                    )
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden rounded-2xl border border-primary/25 bg-card/60 px-4 py-3 text-left backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_18px_45px_-24px_rgba(0,0,0,.7)] sm:translate-y-2"
                >
                  <span className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-primary/15 blur-xl transition group-hover:scale-150" />
                  <span className="relative flex items-center gap-2">
                    <FileImage className="h-4 w-4 text-primary" />
                    <span>
                      <b className="block text-[10px] uppercase tracking-[.12em]">Maquette gratuite</b>
                      <small className="mt-0.5 block text-[9px] text-muted-foreground">
                        Valorisation 200 € · sans engagement
                      </small>
                    </span>
                  </span>
                </a>
                <a
                  href="#audit"
                  className="group relative overflow-hidden rounded-2xl border border-primary/45 bg-primary/[.07] px-4 py-3 text-left backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-primary hover:bg-primary/[.11] hover:shadow-[0_18px_45px_-24px_rgba(0,0,0,.7)] sm:translate-y-1"
                >
                  <span className="absolute -left-5 -bottom-5 h-16 w-16 rounded-full bg-primary/10 blur-xl transition group-hover:scale-150" />
                  <span className="relative flex items-center gap-2">
                    <Search className="h-4 w-4 text-primary" />
                    <span>
                      <b className="block text-[10px] uppercase tracking-[.12em]">
                        Lancer mon analyse personnalisée
                      </b>
                      <small className="mt-0.5 block text-[9px] text-muted-foreground">
                        Instantanée · multi-audits · PDF + recommandations
                      </small>
                    </span>
                  </span>
                </a>
              </div>
              <span className="label-mono hidden text-xs text-muted-foreground/80 sm:inline">
                {t(UI.intelDuration)}
              </span>
            </div>

            <div
              className="mt-4 flex items-center gap-2"
              style={{ animation: "ember-rise 0.8s cubic-bezier(0.16,1,0.3,1) 720ms both" }}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <p className="label-mono text-[11px] text-muted-foreground/70">
                {t(UI.ctaReassurance)} · Pas de reconduction tacite
              </p>
            </div>
          </Parallax>

          <Parallax speed={0.025} className="relative hidden lg:col-span-5 lg:block">
            <div style={{ animation: "ember-rise 1s cubic-bezier(0.16,1,0.3,1) 400ms both" }}>
              <GlobalPresence />
            </div>
          </Parallax>
        </div>

        <div style={{ animation: "ember-rise 0.8s cubic-bezier(0.16,1,0.3,1) 800ms both" }}>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-4 shadow-sm">
            <div className="bg-card/75 px-5 py-4">
              <dt className="display-serif text-2xl text-primary sm:text-3xl font-bold">01</dt>
              <dd className="label-mono mt-1 text-xs text-muted-foreground">Direction digitale</dd>
            </div>
            <div className="bg-card/75 px-5 py-4">
              <dt className="display-serif text-2xl text-primary sm:text-3xl font-bold">07</dt>
              <dd className="label-mono mt-1 text-xs text-muted-foreground">Offres principales</dd>
            </div>
            <div className="bg-card/75 px-5 py-4">
              <dt className="display-serif text-2xl text-primary sm:text-3xl font-bold">FR · EN · VI</dt>
              <dd className="label-mono mt-1 text-xs text-muted-foreground">Expérience multilingue</dd>
            </div>
            <div className="bg-card/75 px-5 py-4">
              <dt className="display-serif text-2xl text-primary sm:text-3xl font-bold">01→</dt>
              <dd className="label-mono mt-1 text-xs text-muted-foreground">Un seul point de contact</dd>
            </div>
          </dl>
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-border/60 py-4">
            <span className="label-mono text-xs text-muted-foreground/70">
              XR Intelligence · Analyse · Devis sur mesure
            </span>
            <span className="label-mono text-xs text-primary">01 · Analyse</span>
          </div>
        </div>
      </div>
    </section>
  );
}
