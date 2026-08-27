import { useI18n, faqData } from '../i18n'
import { useState } from 'react'

export default function FAQ() {
  const { lang, t, translations: tr } = useI18n()
  const [activeCategory, setActiveCategory] = useState('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const categoryKeys = ['all', 'websites', 'seo', 'ai', 'pricing', 'timelines', 'general'] as const
  const categoryLabels: Record<string, Record<string, string>> = {
    all: tr.faq.categories.all,
    websites: tr.faq.categories.websites,
    seo: tr.faq.categories.seo,
    ai: tr.faq.categories.ai,
    pricing: tr.faq.categories.pricing,
    timelines: tr.faq.categories.timelines,
    general: tr.faq.categories.general,
  }

  const filtered = activeCategory === 'all'
    ? faqData
    : faqData.filter((f) => f.category === activeCategory)

  const displayed = showAll ? filtered : filtered.slice(0, 5)

  return (
    <section id="faq" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="reveal mb-12">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-4">
            {t(tr.faq.label)}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-8">
            {t(tr.faq.title)}
          </h2>

          <div className="flex flex-wrap gap-2">
            {categoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => { setActiveCategory(key); setOpenIndex(null); setShowAll(false) }}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 ${
                  activeCategory === key
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'border border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                {t(categoryLabels[key])}
              </button>
            ))}
          </div>
        </div>

        <div className="reveal max-w-3xl space-y-3">
          {displayed.map((faq, index) => (
            <div key={index} className="rounded-xl border border-border bg-white overflow-hidden hover:shadow-sm transition-shadow duration-200">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-sm font-medium pr-4">{faq.question[lang]}</span>
                <svg
                  className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer[lang]}
                  </p>
                </div>
              )}
            </div>
          ))}

          {filtered.length > 5 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full py-3 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(tr.faq.showMore)}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
