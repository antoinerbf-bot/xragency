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
    <section id="services" className="py-16 lg:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="reveal mb-12">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-3">
            {t(tr.services.label)}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">
            {t(tr.services.title)}
          </h2>
        </div>

        <div className="space-y-3">
          {tr.services.items.map((service, idx) => (
            <div
              key={service.num}
              className="reveal group service-card relative p-4 md:p-6 rounded-xl border border-border bg-white hover:shadow-md hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                {/* Number */}
                <span className="text-xs font-mono text-muted-foreground flex-shrink-0">{service.num}</span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold mb-0.5 truncate">{t(service.name)}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{t(service.desc)}</p>
                </div>

                {/* Metric & Price */}
                <div className="text-right flex flex-col items-end gap-0.5 flex-shrink-0">
                  <p className="text-xs font-mono text-muted-foreground">{t(service.metric)}</p>
                  <p className="text-base font-serif font-semibold">
                    {formatPrice(service.price, lang)}
                    {service.period && <span className="text-[10px] text-muted-foreground font-sans ml-1">{service.period}</span>}
                  </p>
                </div>

                {/* Image preview - reduced size */}
                <div className="hidden md:block w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <img
                    src={serviceImages[idx]}
                    alt={t(service.name)}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Arrow */}
                <svg className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 flex-shrink-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
