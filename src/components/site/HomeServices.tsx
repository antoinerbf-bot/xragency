import { useState } from "react";
import { ArrowRight, ArrowUpRight, BarChart3, Bot, Globe2, MapPinned, Palette, ShieldCheck, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { ServiceIllustration } from "./ServiceIllustration";
import { Parallax, Reveal } from "./primitives";

const IDS = ["websites", "branding", "seo", "maps", "social", "maintenance", "robotics"] as const;
const ICONS = {
  websites: Globe2,
  branding: Palette,
  seo: BarChart3,
  maps: MapPinned,
  social: Users,
  maintenance: ShieldCheck,
  robotics: Bot,
};
const PRICES: Record<string, number> = {
  websites: 499,
  branding: 179,
  seo: 299,
  maps: 990,
  social: 299,
  maintenance: 29,
  robotics: 499,
};

const COPY = {
  fr: {
    eyebrow: "07 SERVICES · 07 ENTRÉES",
    title: "Choisissez le besoin. Nous montrons le dispositif.",
    lead: "Chaque expertise dispose de sa propre image, de son prix de départ et d'un parcours clair.",
    from: "À partir de",
    open: "Voir le service",
    quote: "Ajouter au projet",
    next: "Service suivant",
  },
  en: {
    eyebrow: "07 SERVICES · 07 ENTRY POINTS",
    title: "Choose the need. See the system.",
    lead: "Each expertise has its own visual, starting price and clear path.",
    from: "From",
    open: "View service",
    quote: "Add to project",
    next: "Next service",
  },
  vi: {
    eyebrow: "07 DỊCH VỤ · 07 ĐIỂM BẮT ĐẦU",
    title: "Chọn nhu cầu. Xem toàn bộ giải pháp.",
    lead: "Mỗi chuyên môn có hình ảnh, giá khởi điểm và lộ trình rõ ràng.",
    from: "Từ",
    open: "Xem dịch vụ",
    quote: "Thêm vào dự án",
    next: "Dịch vụ tiếp theo",
  },
  ar: {
    eyebrow: "07 خدمات · 07 نقاط انطلاق",
    title: "اختر الحاجة. شاهد المنظومة.",
    lead: "لكل خبرة صورتها وسعرها الابتدائي ومسار واضح.",
    from: "ابتداءً من",
    open: "شاهد الخدمة",
    quote: "أضف للمشروع",
    next: "الخدمة التالية",
  },
  ru: {
    eyebrow: "07 УСЛУГ · 07 ТОЧЕК ВХОДА",
    title: "Выберите задачу. Увидьте систему.",
    lead: "У каждой экспертизы есть свой визуальный образ, стартовая цена и понятный путь.",
    from: "От",
    open: "Открыть услугу",
    quote: "Добавить в проект",
    next: "Следующая услуга",
  },
} as const;

function serviceHref(id: string) {
  if (id === "maintenance") return "/services/webcare";
  if (id === "robotics") return "/services/robotique";
  return "/services/" + id;
}

export function HomeServices() {
  const { t, price, lang } = useLang();
  const copy = COPY[lang as keyof typeof COPY] ?? COPY.fr;
  const [active, setActive] = useState<(typeof IDS)[number]>("websites");
  const index = IDS.indexOf(active);
  const service = SERVICES.find((s) => s.id === active) ?? SERVICES[0];
  const Icon = ICONS[active];
  const next = IDS[(index + 1) % IDS.length];

  return (
    <section id="homepage-services" className="xr-section relative overflow-hidden border-y xr-line py-16 sm:py-20 lg:py-28">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,var(--xr-accent-soft),transparent_28%)]" />

      <div className="relative mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col gap-6 border-b xr-line pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="label-mono text-[8px] tracking-[.28em] xr-accent">{copy.eyebrow}</span>
              <h2 className="display-serif mt-4 max-w-6xl text-[clamp(2.9rem,5.8vw,6.6rem)] leading-[.82] tracking-[-.065em]">
                {copy.title}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 xr-muted">{copy.lead}</p>
          </div>
        </Reveal>

        <Reveal delay={70}>
          <div className="xr-rail mt-6 flex gap-2 overflow-x-auto pb-2">
            {IDS.map((id, i) => {
              const S = SERVICES.find((s) => s.id === id);
              const I = ICONS[id];
              const selected = active === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  className={
                    "group flex min-w-[150px] items-center gap-3 rounded-full border px-4 py-3 text-left transition duration-400 sm:min-w-0 sm:flex-1 " +
                    (selected
                      ? "border-[var(--xr-ink)] bg-[var(--xr-ink)] text-[var(--xr-bg)] shadow-[var(--xr-shadow)]"
                      : "xr-line bg-[var(--xr-surface)] hover:-translate-y-0.5")
                  }
                >
                  <span className={"grid h-8 w-8 shrink-0 place-items-center rounded-full border " + (selected ? "border-white/15 bg-white/10" : "xr-line")}>
                    <I className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[9px] font-semibold">{t(S?.title ?? { fr: id, en: id, vi: id, ar: id, ru: id })}</span>
                    <span className={"mt-0.5 block label-mono text-[6px] " + (selected ? "text-white/45" : "xr-muted-2")}>
                      0{i + 1}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.32fr_.68fr]">
          <Reveal>
            <Parallax speed={-0.022}>
              <div className="overflow-hidden rounded-[2.35rem] border xr-line bg-black shadow-[var(--xr-shadow)]">
                <ServiceIllustration service={active} title={t(service.title)} />
              </div>
            </Parallax>
          </Reveal>

          <Reveal delay={90}>
            <div className="flex h-full min-h-[430px] flex-col justify-between rounded-[2.35rem] border xr-line bg-[var(--xr-surface)] p-7 sm:p-9 lg:p-10">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="label-mono text-[7px] tracking-[.22em] xr-muted-2">
                    CHAPTER {String(index + 1).padStart(2, "0")} / 07
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--xr-ink)] text-[var(--xr-bg)]">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>

                <h3 className="display-serif mt-10 text-5xl leading-[.82] tracking-[-.05em] sm:text-6xl">
                  {t(service.title)}
                </h3>
                <p className="mt-6 max-w-xl text-sm leading-6 xr-muted">{t(service.description)}</p>

                <div className="mt-7 space-y-2">
                  {(service.highlights ?? []).slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-start gap-3 border-t xr-line py-3.5">
                      <span className="label-mono mt-0.5 text-[6px] xr-muted-2">0{i + 1}</span>
                      <span className="text-[10px] leading-4">{t(item)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-end justify-between gap-5 border-y xr-line py-5">
                  <div>
                    <span className="label-mono text-[6px] xr-muted-2">{copy.from}</span>
                    <p className="display-serif mt-1 text-4xl">{active === "maps" ? "990 €" : price(PRICES[active])}</p>
                  </div>
                  <span className="label-mono pb-1 text-[6px] xr-muted-2">
                    {service.fromPeriod === "month" ? "/ MOIS" : service.fromPeriod === "year" ? "/ AN" : ""}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    to={serviceHref(active)}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--xr-ink)] px-5 py-3.5 label-mono text-[8px] font-semibold text-[var(--xr-bg)] transition hover:-translate-y-0.5"
                  >
                    {copy.open}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="#quote"
                    className="inline-flex items-center gap-2 rounded-full border xr-line px-5 py-3.5 label-mono text-[8px] xr-muted transition hover:bg-[var(--xr-bg)]"
                  >
                    {copy.quote}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <button
            type="button"
            onClick={() => setActive(next)}
            className="mt-4 flex w-full items-center justify-between rounded-[1.5rem] border xr-line bg-[var(--xr-bg)] px-5 py-4 text-left transition hover:-translate-y-0.5 sm:px-6"
          >
            <span>
              <span className="label-mono block text-[6px] tracking-[.2em] xr-muted-2">{copy.next}</span>
              <span className="mt-1 block text-sm font-semibold">{t(SERVICES.find((s) => s.id === next)?.title ?? { fr: next, en: next, vi: next, ar: next, ru: next })}</span>
            </span>
            <ArrowRight className="h-4 w-4 xr-muted-2" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
