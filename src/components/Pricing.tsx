import { useState } from 'react'
import { useI18n, formatPrice } from '../i18n'

const WHATSAPP_BASE = 'https://wa.me/33767566783?text='

const PRICES = {
  showcase: 499,
  business: 800,
  ecommerce: 1100,
}

export default function Pricing() {
  const { lang, t, translations: tr } = useI18n()
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { key: 'all', label: tr.pricing.categories.all },
    { key: 'web', label: tr.pricing.categories.web },
    { key: 'seo', label: tr.pricing.categories.seo },
    { key: 'ai', label: tr.pricing.categories.ai },
    { key: 'brand', label: tr.pricing.categories.brand },
  ]

  const plans = [
    {
      key: 'showcase' as const,
      data: tr.pricing.plans.showcase,
      price: PRICES.showcase,
      popular: false,
    },
    {
      key: 'business' as const,
      data: tr.pricing.plans.business,
      price: PRICES.business,
      popular: true,
    },
    {
      key: 'ecommerce' as const,
      data: tr.pricing.plans.ecommerce,
      price: PRICES.ecommerce,
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="reveal mb-12">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-4">
            {t(tr.pricing.label)}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-8">
            {t(tr.pricing.title)}
          </h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 ${
                  activeCategory === cat.key
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'border border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                {t(cat.label)}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing cards */}
        <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                plan.popular
                  ? 'border-2 border-primary bg-primary text-primary-foreground shadow-lg'
                  : 'border-border bg-white'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-background text-foreground text-xs font-mono rounded-full border border-border shadow-sm">
                  {t(tr.pricing.mostPopular)}
                </span>
              )}

              <p className={`text-xs font-mono uppercase tracking-wider mb-2 ${plan.popular ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                {t(plan.data.target)}
              </p>
              <h3 className="text-xl font-semibold mb-4">{t(plan.data.name)}</h3>
              <p className="text-4xl font-serif mb-1">{formatPrice(plan.price, lang)}</p>
              <p className={`text-sm mb-8 ${plan.popular ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                {t(plan.data.period)}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.data.features[lang].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg className={`w-4 h-4 mt-0.5 shrink-0 ${plan.popular ? 'text-green-400' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <a
                  href="#intelligence"
                  className={`block text-center py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-sm ${
                    plan.popular
                      ? 'bg-background text-foreground hover:bg-muted'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {t(tr.pricing.choosePlan)}
                </a>
                <a
                  href={`${WHATSAPP_BASE}${encodeURIComponent(`${t(tr.whatsapp.defaultMessage)} — ${t(plan.data.name)} (${formatPrice(plan.price, lang)})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 px-6 rounded-lg text-sm font-medium border transition-all duration-200 ${
                    plan.popular
                      ? 'border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10'
                      : 'border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {t(tr.pricing.quickRequest)}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
