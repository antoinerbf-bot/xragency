import React from "react";
import { ArrowRight, CheckCircle2, Clock, FileCode, Rocket, ShieldCheck, Sparkles, UserCheck } from "lucide-react";

interface Step {
  num: string;
  days: string;
  title: string;
  desc: string;
  deliverable: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  {
    num: "01",
    days: "Jours 1 – 2",
    title: "Échange & Maquette démo 24h",
    desc: "Nous échangeons 15 minutes sur votre activité, vos clients cibles et vos concurrents. Sous 24 à 48 heures, vous recevez un lien privé pour tester votre future maquette interactive sans engagement.",
    deliverable: "Maquette interactive sur smartphone & PC",
    icon: <Sparkles className="h-5 w-5 text-[#c5a880]" />,
  },
  {
    num: "02",
    days: "Jours 3 – 7",
    title: "Développement haute couture",
    desc: "Nous intégrons votre identité visuelle, rédigeons des textes persuasifs axés sur le closing et optimisons chaque ligne de code pour garantir un score de vitesse supérieur à 95/100 sur Google PageSpeed.",
    deliverable: "Design responsive & Vitesse ultra-rapide (<1s)",
    icon: <FileCode className="h-5 w-5 text-[#dfc39d]" />,
  },
  {
    num: "03",
    days: "Jours 8 – 11",
    title: "Domination Google Maps & SEO",
    desc: "Configuration chirurgicale de votre fiche Google Business Profile, ciblage des requêtes locales les plus rentables de votre ville et mise en place des boutons d'appel et WhatsApp directs.",
    deliverable: "Pack Local 3-Pack & Avis automatisés",
    icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
  },
  {
    num: "04",
    days: "Jour 14",
    title: "Lancement officiel & Accompagnement",
    desc: "Mise en ligne sur votre nom de domaine sécurisé (HTTPS), formation de 30 minutes en visio pour prendre en main vos outils et remise de la propriété intégrale de votre code. Support garanti 7j/7.",
    deliverable: "Site en ligne & Accompagnement dédié",
    icon: <Rocket className="h-5 w-5 text-[#c5a880]" />,
  },
];

export function NexProProcessSection() {
  return (
    <section id="processus" className="relative bg-[#06080e] text-[#f8f6f0] py-20 sm:py-28 lg:py-36 border-t border-white/10 overflow-hidden">
      {/* Halo d'ambiance */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full opacity-10 blur-[150px]"
        style={{
          background: "radial-gradient(circle, #c5a880 0%, #2e5fff 60%, transparent 80%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        {/* En-tête style NexPro */}
        <div className="sec-head max-w-4xl">
          <div className="sec-head-line">
            <div className="sec-head-dash" />
            <span className="mono-nex text-white/70">
              <b className="text-[#c5a880] font-bold">04</b> / DÉROULEMENT DU PROJET · 14 JOURS CHRONO
            </span>
          </div>

          <h2 className="h-nex text-3xl sm:text-5xl lg:text-[3.8rem] text-white">
            Un processus clair,{" "}
            <span className="text-[#dfc39d] font-serif font-light italic">
              sans mauvaise surprise.
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
            De votre première prise de contact à la mise en ligne officielle, chaque jalon est planifié avec transparence. Vous restez maître de chaque décision.
          </p>
        </div>

        {/* Grille des 4 Étapes */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, idx) => (
            <div
              key={step.num}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0d1018]/70 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-[#c5a880]/40 hover:-translate-y-1 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)]"
            >
              <div>
                {/* En-tête de carte avec Numéro et Délai */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="h-nex text-3xl font-black text-[#c5a880]">
                      {step.num}
                    </span>
                    <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-300">
                      {step.days}
                    </span>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 border border-white/10">
                    {step.icon}
                  </div>
                </div>

                {/* Titre & Description */}
                <h3 className="h-nex mt-5 text-xl text-white group-hover:text-[#dfc39d] transition">
                  {step.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-neutral-300">
                  {step.desc}
                </p>
              </div>

              {/* Livrable Contractuel */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-[#c5a880] mb-1">
                  Livrable garanti :
                </span>
                <p className="text-[11px] font-medium text-white flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                  {step.deliverable}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bandeau d'Action Rapide */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-r from-[#14120e] via-[#0e111a] to-[#0a0c12] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Prêt à lancer l'étape 01 pour votre établissement ?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              La maquette démo est totalement gratuite et sans aucun engagement.
            </p>
          </div>

          <a
            href="#quote"
            className="btn-nex text-xs uppercase tracking-wider shrink-0"
          >
            <span>Démarrer mon projet maintenant</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
