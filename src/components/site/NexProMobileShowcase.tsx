import React from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Smartphone, Sparkles, Zap } from "lucide-react";
import mobileMockupA from "@/assets/pf-02-villa-azur.jpg";
import mobileMockupB from "@/assets/pf-03-noir-or.jpg";

export function NexProMobileShowcase() {
  return (
    <section className="relative bg-[#05070c] text-[#f8f6f0] py-20 sm:py-28 lg:py-36 border-t border-white/10 overflow-hidden">
      {/* Halo immersif de fond */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-10 h-[550px] w-[550px] rounded-full opacity-15 blur-[130px]"
        style={{
          background: "radial-gradient(circle, #c5a880 0%, #2e5fff 60%, transparent 80%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Colonne Gauche : Pitch & Arguments */}
          <div className="lg:col-span-6">
            <div className="sec-head max-w-xl">
              <div className="sec-head-line">
                <div className="sec-head-dash" />
                <span className="mono-nex text-white/70">
                  <b className="text-[#c5a880] font-bold">03.B</b> / EXPÉRIENCE MOBILE-FIRST
                </span>
              </div>

              <h2 className="h-nex text-3xl sm:text-5xl lg:text-[3.6rem] text-white">
                Votre marque dans la{" "}
                <span className="text-[#dfc39d] font-serif font-light italic">
                  poche de vos clients.
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
                Plus de 78% des recherches locales et des commandes se font aujourd'hui sur smartphone. Nos architectures sont pensées pour convertir instantanément au doigt.
              </p>
            </div>

            {/* Liste de Bénéfices Clés */}
            <div className="mt-8 space-y-4">
              {[
                {
                  title: "Temps de chargement inférieur à 1 seconde",
                  desc: "Chaque milliseconde gagnée augmente vos réservations. Score PageSpeed 95+ garanti.",
                },
                {
                  title: "Action directe en 1 tap (WhatsApp, Téléphone, Devis)",
                  desc: "Zéro formulaire interminable : vos prospects vous contactent directement sans barrière.",
                },
                {
                  title: "Navigation fluide comme une application native",
                  desc: "Gestuelles naturelles, animations 60 FPS et affichage parfait sur iPhone et Android.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-[#c5a880]/30">
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#c5a880]/15 text-[#c5a880] shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="mt-1 text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Boutons d'Action */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#quote"
                className="btn-nex text-xs uppercase tracking-wider"
              >
                <span>Demander ma maquette mobile</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#tunnel-secteurs"
                className="inline-flex items-center gap-2 px-5 py-3 font-mono text-[11px] font-bold text-neutral-300 hover:text-white transition"
              >
                <span>Tester notre simulateur</span>
                <Zap className="h-4 w-4 text-[#c5a880]" />
              </a>
            </div>
          </div>

          {/* Colonne Droite : Scène 3D Double Smartphone (Style NexPro .app__stage) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[500px] h-[520px] sm:h-[580px] perspective-[1600px] flex items-center justify-center">
              
              {/* Halo d'ambiance derrière les téléphones */}
              <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-[#2e5fff]/30 via-[#c5a880]/20 to-transparent blur-3xl" />

              {/* Téléphone B (Arrière, incliné à droite) */}
              <div
                className="absolute w-[240px] sm:w-[260px] aspect-[9/19] rounded-[36px] overflow-hidden bg-[#0a0e18] border-[6px] border-[#151c2e] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] transition-transform duration-700 hover:scale-105"
                style={{
                  transform: "translate(45px, 20px) rotateY(-16deg) rotate(8deg)",
                }}
              >
                <div className="h-full w-full relative">
                  <img
                    src={mobileMockupB}
                    alt="Mobile Showcase Luxe"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-3 right-3 text-center">
                    <span className="rounded-full bg-black/70 px-3 py-1 font-mono text-[9px] font-bold text-[#c5a880] backdrop-blur-md">
                      Maison Noir & Or · Joaillerie
                    </span>
                  </div>
                </div>
              </div>

              {/* Téléphone A (Premier plan, incliné à gauche) */}
              <div
                className="absolute w-[245px] sm:w-[265px] aspect-[9/19] rounded-[38px] overflow-hidden bg-[#0a0e18] border-[6px] border-[#090d16] shadow-[0_50px_100px_-25px_rgba(0,0,0,0.95)] z-10 transition-transform duration-700 hover:scale-105"
                style={{
                  transform: "translate(-45px, -20px) rotateY(16deg) rotate(-6deg)",
                }}
              >
                <div className="h-full w-full relative">
                  <img
                    src={mobileMockupA}
                    alt="Mobile Showcase Villa Azur"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 font-mono text-[8px] font-bold text-emerald-300 backdrop-blur-md">
                      ● RÉSERVATION DIRECTE
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-3 right-3 text-center">
                    <span className="rounded-full bg-black/80 px-3 py-1 font-mono text-[9px] font-bold text-white backdrop-blur-md">
                      Villa Azur · Cannes
                    </span>
                  </div>
                </div>
              </div>

              {/* Badge Flottant Interactif Style NexPro */}
              <div className="absolute left-2 bottom-6 z-20 rounded-full border border-white/20 bg-black/80 px-4 py-2 text-xs font-bold text-white shadow-2xl backdrop-blur-xl flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-[#c5a880]" />
                <span>100% Tactile & Ultra-Rapide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
