import { useState } from 'react'
import { useI18n, formatPrice } from '../i18n'
import { useServiceCart } from '../context/ServiceCartContext'

const serviceImages = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&q=85',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&auto=format&q=85',
  'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&auto=format&q=85',
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&q=85',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&auto=format&q=85',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&q=85',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&q=85',
]

const CORE_DISCIPLINES = [
  { idx: 0, num: '01' },
  { idx: 1, num: '02' },
  { idx: 2, num: '03' },
  { idx: 3, num: '04' },
  { idx: 4, num: '05' },
  { idx: 5, num: '06' },
  { idx: 6, num: '07' },
]

export default function Services() {
  const { lang, t, translations: tr } = useI18n()
  const { selectedServices, addService, removeService, isServiceSelected, cartCount } = useServiceCart()
  const [showCart, setShowCart] = useState(false)

  const coreServices = CORE_DISCIPLINES.map(({ idx, num }) => tr.services.items[idx])

  const handleAddService = (service: typeof tr.services.items[0]) => {
    if (isServiceSelected(service.num)) {
      removeService(service.num)
    } else {
      addService({
        num: service.num,
        name: service.name,
        price: service.price,
        period: service.period,
        metric: service.metric,
        desc: service.desc,
      })
    }
  }

  return (
    <section id="services" className="py-16 lg:py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="reveal mb-16">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-3">
            {t(tr.services.label)}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
            {t(tr.services.title)}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            {lang === 'fr'
              ? 'Sept disciplines, une seule maison composée à la main pour marques exigeantes.'
              : lang === 'en'
                ? 'Seven disciplines, one handcrafted house for demanding brands.'
                : 'Bảy lĩnh vực, một studio độc lập cho các thương hiệu khắt khe.'}
          </p>
        </div>

        {/* Services Grid - Editorial Layout */}
        <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-12">
          {coreServices.map((service, idx) => (
            <ServiceCard
              key={service.num}
              service={service}
              image={serviceImages[idx]}
              isSelected={isServiceSelected(service.num)}
              onAdd={() => handleAddService(service)}
              lang={lang}
              t={t}
            />
          ))}
        </div>

        {/* Floating Cart Button */}
        {cartCount > 0 && (
          <div className="reveal fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setShowCart(!showCart)}
              className="group relative px-5 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <div className="flex items-center justify-center w-5 h-5 bg-primary-foreground text-primary rounded-full text-xs font-bold">
                {cartCount}
              </div>
              <span className="hidden sm:inline">
                {lang === 'fr'
                  ? 'Votre projet'
                  : lang === 'en'
                    ? 'Your project'
                    : 'Dự án của bạn'}
              </span>
            </button>
          </div>
        )}

        {/* Cart Sidebar */}
        {showCart && cartCount > 0 && (
          <div className="reveal fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl overflow-y-auto animate-fade-in">
            <div className="p-6 sm:p-8">
              {/* Cart Header */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                <div>
                  <h3 className="font-serif text-xl font-semibold">
                    {lang === 'fr'
                      ? 'Votre projet'
                      : lang === 'en'
                        ? 'Your project'
                        : 'Dự án của bạn'}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cartCount}{' '}
                    {lang === 'fr'
                      ? 'discipline sélectionnée'
                      : lang === 'en'
                        ? 'discipline selected'
                        : 'lĩnh vực được chọn'}
                  </p>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-8">
                {selectedServices.map((service) => (
                  <CartItem
                    key={service.num}
                    service={service}
                    onRemove={() => removeService(service.num)}
                    lang={lang}
                    t={t}
                  />
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t border-border pt-6 space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {lang === 'fr'
                    ? 'Continuez votre visite ou demandez un devis personnalisé pour cette sélection.'
                    : lang === 'en'
                      ? 'Continue exploring or request a personalized quote for your selection.'
                      : 'Tiếp tục khám phá hoặc yêu cầu báo giá cho lựa chọn của bạn.'}
                </p>
                <a
                  href="#contact"
                  onClick={() => setShowCart(false)}
                  className="block w-full py-3 bg-primary text-primary-foreground text-center rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors duration-300"
                >
                  {lang === 'fr'
                    ? 'Demander un devis'
                    : lang === 'en'
                      ? 'Request a quote'
                      : 'Yêu cầu báo giá'}
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Overlay when cart is open */}
        {showCart && cartCount > 0 && (
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setShowCart(false)}
          />
        )}
      </div>
    </section>
  )
}

interface ServiceCardProps {
  service: (typeof tr.services.items)[0]
  image: string
  isSelected: boolean
  onAdd: () => void
  lang: 'fr' | 'en' | 'vi'
  t: (obj: Record<string, string>) => string
}

function ServiceCard({ service, image, isSelected, onAdd, lang, t }: ServiceCardProps) {
  return (
    <div
      className={`reveal group relative rounded-lg border transition-all duration-300 overflow-hidden h-full flex flex-col ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border bg-white hover:border-primary/30 hover:shadow-md'
      }`}
    >
      {/* Image Container */}
      <div className="relative w-full h-32 overflow-hidden bg-muted">
        <img
          src={image}
          alt={t(service.name)}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isSelected ? 'scale-105' : 'group-hover:scale-105'
          }`}
        />
        {isSelected && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Title & Metric */}
        <div className="mb-2">
          <h3 className="font-semibold text-sm leading-snug mb-1">{t(service.name)}</h3>
          <p className="text-xs text-muted-foreground font-mono">{t(service.metric)}</p>
        </div>

        {/* Price */}
        <p className="text-base font-serif font-semibold text-primary mb-3">
          {formatPrice(service.price, lang)}
          {service.period && (
            <span className="text-xs text-muted-foreground font-sans ml-1">{service.period}</span>
          )}
        </p>

        {/* Button */}
        <button
          onClick={onAdd}
          className={`mt-auto w-full py-2.5 rounded-lg font-semibold text-xs transition-all duration-300 ${
            isSelected
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-muted text-foreground hover:bg-muted/80'
          }`}
        >
          {isSelected
            ? lang === 'fr'
              ? '✓ Sélectionné'
              : lang === 'en'
                ? '✓ Selected'
                : '✓ Được chọn'
            : lang === 'fr'
              ? 'Ajouter au projet'
              : lang === 'en'
                ? 'Add to project'
                : 'Thêm vào dự án'}
        </button>
      </div>
    </div>
  )
}

interface CartItemProps {
  service: {
    num: string
    name: Record<string, string>
    price: number
    period?: string
    metric: Record<string, string>
  }
  onRemove: () => void
  lang: 'fr' | 'en' | 'vi'
  t: (obj: Record<string, string>) => string
}

function CartItem({ service, onRemove, lang, t }: CartItemProps) {
  return (
    <div className="flex items-start justify-between gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm leading-snug">{service.name[lang]}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{t(service.metric)}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-serif font-semibold text-sm">
          {formatPrice(service.price, lang)}
          {service.period && (
            <span className="text-[10px] text-muted-foreground font-sans ml-1">{service.period}</span>
          )}
        </p>
        <button
          onClick={onRemove}
          className="text-xs text-muted-foreground hover:text-foreground mt-1 transition-colors"
        >
          {lang === 'fr' ? 'Retirer' : lang === 'en' ? 'Remove' : 'Xóa'}
        </button>
      </div>
    </div>
  )
}
