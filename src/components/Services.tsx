import { useI18n, formatPrice } from '../i18n'

const serviceImages = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&q=85',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&q=85',
  'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&auto=format&q=85',
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&q=85',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&q=85',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&q=85',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&q=85',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&q=85',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&q=85',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&q=85',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&q=85',
]

export default function Services() {
  const { lang, t, translations: tr } = useI18n()

  return (
    <section id="services" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="reveal mb-16">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-4">
            {t(tr.services.label)}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">
            {t(tr.services.title)}
          </h2>
        </div>

        <div className="space-y-4">
          {tr.services.items.map((service, idx) => (
            <div
              key={service.num}
              className="reveal group relative p-5 md:p-8 rounded-2xl border border-border bg-white hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                {/* Number */}
                <span className="text-xs font-mono text-muted-foreground">{service.num}</span>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{t(service.name)}</h3>
                  <p className="text-sm text-muted-foreground">{t(service.desc)}</p>
                </div>

                {/* Metric & Price */}
                <div className="text-right flex flex-col items-end gap-1">
                  <p className="text-xs font-mono text-muted-foreground">{t(service.metric)}</p>
                  <p className="text-lg font-serif font-semibold">
                    {formatPrice(service.price, lang)}
                    {service.period && <span className="text-xs text-muted-foreground font-sans">{service.period}</span>}
                  </p>
                </div>

                {/* Image preview */}
                <div className="hidden md:block w-24 h-16 rounded-lg overflow-hidden opacity-60 group-hover:opacity-100 transition-opacity">
                  <img
                    src={serviceImages[idx]}
                    alt={t(service.name)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Arrow */}
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
