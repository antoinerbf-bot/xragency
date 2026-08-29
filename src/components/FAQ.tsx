import { useI18n, faqData } from '../i18n'
import { useState } from 'react'

export default function FAQ() {
  const { lang, t, translations: tr } = useI18n()
  const [activeCategory, setActiveCategory] = useState('all')
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set())
  const [showAll, setShowAll] = useState(false)

  const categoryKeys = ['all', 'websites', 'seo', 'ai', 'pricing', 'timelines', 'general'] as const
  const categoryIcons: Record<string, string> = {
    all: '📋',
    websites: '🌐',
    seo: '📊',
    ai: '🤖',
    pricing: '💰',
    timelines: '⏱️',
    general: '❓',
  }
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

  const displayed = showAll ? filtered : filtered.slice(0, 6)

  const toggleOpen = (index: number) => {
    const newSet = new Set(openIndices)
    if (newSet.has(index)) {
      newSet.delete(index)
    } else {
      newSet.add(index)
    }
    setOpenIndices(newSet)
  }

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key)
    setOpenIndices(new Set())
    setShowAll(false)
  }

  return (
    <section id="faq" className="py-16 lg:py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-4xl mx-auto px-5 lg:px-10">
        <div className="reveal text-center mb-12">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-3">
            {t(tr.faq.label)}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
            {t(tr.faq.title)}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {t('Find answers to common questions about our services, pricing, and digital strategies')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="reveal flex flex-wrap justify-center gap-2 mb-12">
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                activeCategory === key
                  ? 'bg-primary text-primary-foreground shadow-md scale-105'
                  : 'border border-border bg-white text-muted-foreground hover:border-primary/30 hover:bg-muted'
              }`}
            >
              <span>{categoryIcons[key]}</span>
              {t(categoryLabels[key])}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="reveal space-y-3">
          {displayed.map((faq, index) => {
            const isOpen = openIndices.has(index)
            return (
              <div
                key={index}
                className="group rounded-lg border border-border bg-white overflow-hidden hover:shadow-md hover:border-primary/30 transition-all duration-300"
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="accordion-button w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/20 transition-colors duration-200"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-foreground flex-1 pr-4">
                    {faq.question[lang]}
                  </span>
                  <svg
                    className={`w-6 h-6 text-primary shrink-0 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>

                {/* Animated Content */}
                <div
                  className={`accordion-content overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[500px] open' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-4 bg-muted/10 border-t border-border/50">
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                      {faq.answer[lang]}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Load More Button */}
          {filtered.length > 6 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full py-4 text-center text-sm font-medium text-primary hover:text-primary/80 transition-colors border-2 border-dashed border-border/50 rounded-lg hover:border-primary/30 hover:bg-muted/10"
            >
              {t(tr.faq.showMore)} ({filtered.length - 6} {t('more')}...)
            </button>
          )}
        </div>

        {/* Contact CTA */}
        <div className="reveal mt-16 p-8 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            {t("Didn't find what you're looking for?")}
          </p>
          <a
            href="https://wa.me/33767566783?text=Bonjour%2C%20j'ai%20une%20question..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
          >
            💬 {t('Chat with us on WhatsApp')}
          </a>
        </div>
      </div>
    </section>
  )
}
