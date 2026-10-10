import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { XR_JOURNEY_PHOTO } from "@/lib/photography";
import { FAQ } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — XR Agency" },
      { name: "description", content: "Questions fréquentes sur les sites web, SEO, Google Maps, WebCare, branding et accompagnement XR Agency." },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/faq" }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { t, lang } = useLang();
  const [query, setQuery] = useState("");

  const placeholder = lang === "en" ? "Search a question..." : lang === "vi" ? "Tìm kiếm câu hỏi..." : "Rechercher une question...";

  const items = useMemo(() => FAQ.filter(x => {
    const q = query.toLowerCase();
    const questionText = t(x.q).toLowerCase();
    const answerText = t(x.a).toLowerCase();
    return !q || questionText.includes(q) || answerText.includes(q);
  }), [query, t]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(item => ({
      "@type": "Question",
      name: t(item.q),
      acceptedAnswer: { "@type": "Answer", text: t(item.a) },
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <main className="pt-28">
        <section className="border-b border-border/60 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 lg:px-10">
            <figure className="mb-10 overflow-hidden rounded-[2rem] border border-border/70">
              <img src={XR_JOURNEY_PHOTO} alt="XR Agency FAQ" className="h-[280px] w-full object-cover object-center sm:h-[380px]" loading="eager" decoding="async" />
            </figure>
            <p className="label-mono text-[10px] uppercase tracking-[.25em] text-primary">XR AGENCY · FAQ</p>
            <h1 className="display-serif mt-5 text-[clamp(3.5rem,8vw,7rem)] leading-[.86]">
              {lang === "en" ? "Common questions" : lang === "vi" ? "Câu hỏi thường gặp" : "Les questions"}
              <br />
              <em className="not-italic italic text-primary">
                {lang === "en" ? "we are asked." : lang === "vi" ? "khách hàng quan tâm." : "que l'on nous pose."}
              </em>
            </h1>
            <div className="relative mt-10 max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder={placeholder} className="w-full rounded-2xl border border-border bg-card px-11 py-4 text-sm outline-none focus:border-primary" />
            </div>
          </div>
        </section>
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 lg:px-10">
            <div className="space-y-3">
              {items.map((item, i) => (
                <details key={i} className="group rounded-2xl border border-border bg-card/50 p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                    <span>{t(item.q)}</span>
                    <Plus className="h-4 w-4 shrink-0 text-primary transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{t(item.a)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Contact />
    </div>
  );
}
