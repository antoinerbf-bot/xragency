import { useMemo, useState } from "react";
import { ArrowRight, Check, Download, FileText, Sparkles } from "lucide-react";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";

const SECTORS = [
  "Restaurant / Hospitality",
  "Real estate / Rentals",
  "Luxury / Lifestyle",
  "Professional services",
  "Retail / E-commerce",
  "Beauty / Wellness",
  "Automotive",
  "Other",
];

const NEEDS = [
  { id: "website", label: "Site web", price: 499 },
  { id: "branding", label: "Branding", price: 200 },
  { id: "seo", label: "SEO", price: 299 },
  { id: "maps", label: "Google Maps", price: 199 },
  { id: "social", label: "Social Media", price: 499 },
  { id: "maintenance", label: "Maintenance", price: 99 },
  { id: "ecommerce", label: "E-commerce", price: 1499 },
] as const;

export function QuoteConfigurator() {
  const [sector, setSector] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);

  const estimate = useMemo(() => {
    const website = needs.includes("website");
    const ecommerce = needs.includes("ecommerce");
    const selected = NEEDS.filter((item) => needs.includes(item.id));
    let total = selected.reduce((sum, item) => sum + item.price, 0);
    if (website && ecommerce) total -= 499;
    return Math.max(total, 0);
  }, [needs]);

  const toggleNeed = (id: string) => {
    setGenerated(false);
    setNeeds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const generatePdf = () => {
    if (!sector || needs.length === 0) return;
    setGenerated(true);
    window.setTimeout(() => window.print(), 120);
  };

  return (
    <section id="quote" className="relative border-y border-border/50 bg-background py-20 md:py-28 print:bg-white print:text-black">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 max-w-4xl">
          <div className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" /> XR INTELLIGENCE · VOTRE DEVIS
          </div>
          <h2 className="text-4xl font-medium tracking-[-0.05em] md:text-6xl">Dites-nous ce dont votre entreprise a besoin.</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            Choisissez votre secteur et vos besoins. XR Intelligence construit une première estimation claire, que vous pouvez générer en PDF.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr_.8fr]">
          <div className="rounded-3xl border border-border p-6 md:p-7">
            <div className="mb-5 flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs text-background">01</span><span className="font-medium">Votre secteur</span></div>
            <div className="space-y-2">
              {SECTORS.map((item) => (
                <button key={item} type="button" onClick={() => { setSector(item); setGenerated(false); }} className={cn("w-full rounded-xl border px-4 py-3 text-left text-sm transition", sector === item ? "border-foreground bg-foreground/[0.06]" : "border-border hover:border-foreground/30")}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border p-6 md:p-7">
            <div className="mb-5 flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs text-background">02</span><span className="font-medium">Ce dont vous avez besoin</span></div>
            <div className="grid gap-2 sm:grid-cols-2">
              {NEEDS.map((item) => {
                const selected = needs.includes(item.id);
                return (
                  <button key={item.id} type="button" onClick={() => toggleNeed(item.id)} className={cn("flex min-h-16 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition", selected ? "border-foreground bg-foreground/[0.06]" : "border-border hover:border-foreground/30")}>
                    <span className="text-sm font-medium">{item.label}</span>
                    {selected ? <Check className="h-4 w-4" /> : <span className="text-xs text-muted-foreground">+{item.price} €</span>}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 rounded-2xl bg-muted/40 p-4 text-sm text-muted-foreground">Vous pouvez sélectionner plusieurs expertises. Le montant affiché est une première estimation, pas un prix contractuel.</div>
          </div>

          <div className="flex flex-col rounded-3xl border border-foreground bg-foreground p-6 text-background md:p-7 print:border-black print:bg-white print:text-black">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] opacity-60"><FileText className="h-4 w-4" /> Votre estimation</div>
            <div className="mt-8 text-sm opacity-60">{sector || "Secteur à sélectionner"}</div>
            <div className="mt-2 text-5xl font-medium tracking-tight">{estimate.toLocaleString("fr-FR")} €</div>
            <div className="mt-2 text-xs opacity-60">Estimation initiale</div>
            <div className="my-6 h-px bg-current opacity-15" />
            <div className="flex-1 space-y-2">
              {needs.length === 0 ? <p className="text-sm opacity-60">Sélectionnez une ou plusieurs expertises.</p> : NEEDS.filter((item) => needs.includes(item.id)).map((item) => <div key={item.id} className="flex justify-between gap-3 text-sm"><span>{item.label}</span><span className="opacity-60">{item.price} €</span></div>)}
            </div>
            <button type="button" disabled={!sector || needs.length === 0} onClick={generatePdf} className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30 print:hidden">
              <Download className="h-4 w-4" /> Générer mon devis PDF <ArrowRight className="h-4 w-4" />
            </button>
            {generated && <div className="mt-3 text-center text-[11px] opacity-60 print:hidden">Dans la fenêtre d'impression, choisissez « Enregistrer au format PDF ».</div>}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between print:hidden">
          <span>Pas d'engagement · estimation personnalisée · validation finale après échange</span>
          <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-foreground">Parler à XRAGENCY <ArrowRight className="h-3.5 w-3.5" /></a>
        </div>
      </div>
    </section>
  );
}
