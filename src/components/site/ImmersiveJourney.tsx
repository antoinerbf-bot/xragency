import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Parallax } from "./primitives";
import { XR_JOURNEY_PHOTO } from "@/lib/photography";

export function ImmersiveJourney() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#050607] text-white"
      aria-label="Parcours immersif XR Agency"
    >
      <div className="relative min-h-[760px] sm:min-h-[820px] lg:min-h-[900px]">
        <img src={XR_JOURNEY_PHOTO} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,5,6,.96)_0%,rgba(3,5,6,.76)_42%,rgba(3,5,6,.28)_100%)]" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,6,7,.96)_0%,transparent_38%,rgba(5,6,7,.22)_100%)]" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(242,163,58,.20),transparent_26%)]" />

        <div className="relative mx-auto flex min-h-[760px] max-w-[1500px] items-center px-5 py-24 sm:min-h-[820px] sm:px-8 lg:min-h-[900px] lg:px-12">
          <Parallax speed={-0.03}>
            <div className="max-w-3xl">
              <span className="label-mono text-[9px] tracking-[.28em] text-white/45 sm:text-[10px] sm:tracking-[.34em]">
                XR AGENCY · THE DIGITAL JOURNEY
              </span>
              <h2 className="display-serif mt-5 max-w-[900px] text-[clamp(3rem,10vw,7.8rem)] leading-[.84] tracking-[-.04em]">
                Entrez dans
                <br />
                <em className="text-white/55">l’expérience.</em>
              </h2>
              <p className="mt-7 max-w-xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
                Ici, vous ne consultez pas une agence. Vous traversez un parcours :
                votre activité, vos objectifs, vos leviers — puis une recommandation
                construite autour de vous.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/#quote"
                  className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3.5 label-mono text-[9px] font-semibold tracking-[.12em] text-black transition hover:-translate-y-1"
                >
                  Commencer l’aventure
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-3 label-mono text-[8px] tracking-[.16em] text-white/50 backdrop-blur-xl">
                  <ArrowDown className="h-3 w-3" />
                  Faites défiler
                </span>
              </div>
            </div>
          </Parallax>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
          <span className="label-mono text-[8px] tracking-[.28em] text-white/30">
            SCROLL TO BUILD YOUR DIGITAL SYSTEM
          </span>
        </div>
      </div>
    </section>
  );
}
