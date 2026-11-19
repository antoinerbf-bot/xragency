import { ArrowUpRight, ExternalLink } from "lucide-react";
import { SHOWCASE } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./primitives";

export function NexProWorkShowcase() {
  const { lang } = useLang();
  const projects = SHOWCASE.filter((item) => item.url && item.image);

  return (
    <section id="realisations" className="relative overflow-hidden bg-[#f5f1e9] py-20 text-[#191916] sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-[#d9d0c3] pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.25em] text-[#8b7052]"><span className="h-px w-8 bg-[#b9976d]" /> Projets & réalisations</p>
              <h2 className="font-display text-[clamp(2.6rem,5vw,5rem)] leading-[.94] tracking-[-.045em]">Du concret, <span className="font-serif italic text-[#9b7956]">pas de promesses creuses.</span></h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#625d54]">Découvrez les projets effectivement documentés par XR Agency. De nouvelles études de cas seront ajoutées au fil des réalisations publiables.</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
          {projects.map((project, index) => (
            <Reveal key={project.id}>
              <article className="group overflow-hidden rounded-[1.7rem] border border-[#ded6ca] bg-white shadow-[0_18px_55px_rgba(40,30,20,.06)]">
                <a href={project.url} target="_blank" rel="noreferrer" className="relative block aspect-[16/9] overflow-hidden bg-[#e9e3d9]">
                  <img src={project.image} alt={project.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" />
                  <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-black/35 text-white backdrop-blur"><ArrowUpRight className="h-5 w-5" /></span>
                </a>
                <div className="p-6 sm:p-8">
                  <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-[#987858]">Projet XR Agency · {project.type[lang] ?? project.type.fr}</p>
                  <h3 className="mt-3 font-display text-3xl sm:text-4xl">{project.name}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#625d54]">{project.desc[lang] ?? project.desc.fr}</p>
                  <a href={project.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#795d40]">Voir le projet <ExternalLink className="h-3.5 w-3.5" /></a>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="flex flex-col justify-between rounded-[1.7rem] bg-[#211f1a] p-7 text-[#fff8ee] sm:p-9">
            <div><p className="text-[9px] font-semibold uppercase tracking-[.22em] text-[#d9bd98]">Notre approche</p><h3 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">Chaque projet mérite une réponse pensée pour lui.</h3><p className="mt-5 text-sm leading-6 text-white/65">Stratégie, création et déploiement : nous construisons une expérience cohérente autour de vos objectifs et de votre réalité métier.</p></div>
            <a href="/contact" className="mt-8 inline-flex min-h-12 items-center justify-between gap-4 border-t border-white/15 pt-5 text-xs font-semibold text-[#e7caa5]">Parler de votre projet <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
