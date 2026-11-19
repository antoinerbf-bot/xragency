import { ArrowRight, Check, Star } from "lucide-react";
import { SERVICES, PERIOD_LABEL } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const FEATURED_IDS = ["websites", "branding", "seo", "maps", "social", "maintenance", "robotics"];

export function NexProPricingGrid() {
  const { t, price } = useLang();
  const services = FEATURED_IDS
    .map((id) => SERVICES.find((service) => service.id === id))
    .filter((service): service is (typeof SERVICES)[number] => Boolean(service));

  return (
    <section id="formules" className="relative overflow-hidden border-y border-[#ded6ca] bg-[#f5f1e9] py-20 text-[#191916] sm:py-28 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#c7a47a]/15 blur-[120px]" />
      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.25em] text-[#8b7052]">
            <span className="h-px w-8 bg-[#b9976d]" /> Nos services & tarifs
          </p>
          <h2 className="font-display text-[clamp(2.6rem,5vw,5rem)] leading-[.94] tracking-[-.045em]">
            Le bon accompagnement, <span className="font-serif italic text-[#9b7956]">au bon niveau.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5f5b53] sm:text-base">
            Des prestations clairement présentées, avec leurs tarifs de départ et leur périmètre détaillé. Chaque page vous permet de comparer les formules et de choisir la suite adaptée à votre projet.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const period = t(PERIOD_LABEL[service.fromPeriod]);
            const popular = service.id === "social";
            const href = service.id === "maintenance" ? "/services/webcare" : service.id === "robotics" ? "/services/robotique" : "/services/" + service.id;
            return (
              <article key={service.id} className={`group relative flex min-h-[300px] flex-col rounded-[1.5rem] border p-6 transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(40,30,20,.10)] sm:p-7 ${popular ? "border-[#b9976d] bg-[#211f1a] text-[#fff8ee]" : "border-[#ded6ca] bg-white/75 text-[#191916]"}`}>
                {popular && <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-[#d9bd98] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.14em] text-[#211f1a]"><Star className="h-3 w-3 fill-current" /> Social Media</span>}
                <p className={`text-[9px] font-semibold uppercase tracking-[.22em] ${popular ? "text-[#d9bd98]" : "text-[#9a7956]"}`}>0{index + 1} / XR Agency</p>
                <h3 className="mt-4 font-display text-2xl leading-tight sm:text-[1.75rem]">{t(service.title)}</h3>
                <p className={`mt-3 text-sm leading-6 ${popular ? "text-white/65" : "text-[#625d54]"}`}>{t(service.short)}</p>
                <div className={`mt-6 border-t pt-5 ${popular ? "border-white/15" : "border-[#e7dfd4]"}`}>
                  <p className={`text-[9px] font-semibold uppercase tracking-[.18em] ${popular ? "text-[#d9bd98]" : "text-[#8b7052]"}`}>À partir de</p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-2">
                    <span className="font-display text-4xl tracking-tight">{price(service.fromEur)}</span>
                    <span className={`text-xs ${popular ? "text-white/55" : "text-[#777168]"}`}>{period}</span>
                  </div>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {service.highlights.slice(0, 3).map((feature, i) => <li key={i} className={`flex gap-2.5 text-xs leading-5 ${popular ? "text-white/75" : "text-[#57534c]"}`}><Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${popular ? "text-[#d9bd98]" : "text-[#9a7956]"}`} /><span>{t(feature)}</span></li>)}
                </ul>
                <Link to={href} className={`mt-auto inline-flex min-h-11 items-center justify-between gap-3 pt-7 text-xs font-semibold transition ${popular ? "text-[#e7caa5]" : "text-[#745b40]"}`}>
                  Découvrir les formules <span className="grid h-8 w-8 place-items-center rounded-full border border-current/25 transition group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span>
                </Link>
              </article>
            );
          })}
        </div>
        <p className="mt-7 text-center text-[11px] leading-5 text-[#777168]">
          Les prix affichés sont les tarifs de départ du catalogue officiel. Le détail, les conditions et les options sont précisés sur chaque page de service.
        </p>
      </div>
    </section>
  );
}
