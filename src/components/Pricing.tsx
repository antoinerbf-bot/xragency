import { useState } from 'react'
import { useI18n, formatPrice } from '../i18n'

const WHATSAPP_BASE = 'https://wa.me/33767566783?text='

const PRICES = {
  showcase: 499,
  business: 800,
  ecommerce: 1100,
}

interface CartItem {
  key: string
  name: string
  price: number
  quantity: number
}

export default function Pricing() {
  const { lang, t, translations: tr } = useI18n()
  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [addingItem, setAddingItem] = useState<string | null>(null)

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

  const handleAddToCart = (plan: typeof plans[0]) => {
    setAddingItem(plan.key)
    setTimeout(() => setAddingItem(null), 600)

    const existingItem = cart.find((item) => item.key === plan.key)
    if (existingItem) {
      setCart(cart.map((item) =>
        item.key === plan.key ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([
        ...cart,
        {
          key: plan.key,
          name: t(plan.data.name),
          price: plan.price,
          quantity: 1,
        },
      ])
    }
    setShowCart(true)
  }

  const handleRemoveFromCart = (key: string) => {
    setCart(cart.filter((item) => item.key !== key))
  }

  const handleQuantityChange = (key: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(key)
    } else {
      setCart(cart.map((item) =>
        item.key === key ? { ...item, quantity } : item
      ))
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    const cartText = cart
      .map((item) => `${item.name} x${item.quantity} (${formatPrice(item.price * item.quantity, lang)})`)
      .join('\n')
    const message = `${t(tr.whatsapp.defaultMessage)}\n\n📦 ${t(tr.pricing.cart)}:\n${cartText}\n\n💰 ${t('Total')}:\n${formatPrice(cartTotal, lang)}`
    window.open(
      `${WHATSAPP_BASE}${encodeURIComponent(message)}`,
      '_blank'
    )
  }

  return (
    <section id="pricing" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="reveal mb-12">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-3">
            {t(tr.pricing.label)}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Pricing cards */}
          <div className="reveal flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.key}
                className={`relative p-6 md:p-7 rounded-xl border transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                  plan.popular
                    ? 'border-2 border-primary bg-primary text-primary-foreground shadow-lg'
                    : 'border-border bg-white'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-background text-foreground text-xs font-mono rounded-full border border-border shadow-sm">
                    {t(tr.pricing.mostPopular)}
                  </span>
                )}

                <p className={`text-xs font-mono uppercase tracking-wider mb-2 ${plan.popular ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {t(plan.data.target)}
                </p>
                <h3 className="text-lg font-semibold mb-2">{t(plan.data.name)}</h3>
                <p className="text-3xl md:text-4xl font-serif mb-0.5">{formatPrice(plan.price, lang)}</p>
                <p className={`text-xs mb-5 ${plan.popular ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {t(plan.data.period)}
                </p>

                <ul className="space-y-2 mb-6">
                  {plan.data.features[lang].slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm">
                      <svg className={`w-4 h-4 mt-0.5 shrink-0 ${plan.popular ? 'text-green-400' : 'text-green-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="space-y-2">
                  <button
                    onClick={() => handleAddToCart(plan)}
                    className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                      addingItem === plan.key
                        ? plan.popular
                          ? 'bg-green-500/20 text-green-700'
                          : 'bg-green-500/10 text-green-600'
                        : plan.popular
                          ? 'bg-background text-foreground hover:bg-muted'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                  >
                    {addingItem === plan.key ? '✓ ' : ''}{t(tr.pricing.addToCart || 'Add to Cart')}
                  </button>
                  <a
                    href={`${WHATSAPP_BASE}${encodeURIComponent(`${t(tr.whatsapp.defaultMessage)} — ${t(plan.data.name)} (${formatPrice(plan.price, lang)})`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center py-2.5 px-4 rounded-lg text-sm font-medium border transition-all duration-200 ${
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

          {/* Shopping cart - redesigned */}
          <div className="lg:w-80">
            <div
              className={`sticky top-24 reveal p-6 rounded-xl border transition-all duration-300 ${
                showCart && cart.length > 0
                  ? 'border-primary bg-white shadow-lg'
                  : 'border-border bg-muted/30'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {t(tr.pricing.cart || 'Cart')}
                  {cart.length > 0 && (
                    <span className="ml-auto text-xs font-mono bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </h3>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-xs">{t('Your cart is empty')}</p>
                </div>
              ) : (
                <div>
                  <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 bg-white rounded-lg border border-border/50">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{formatPrice(item.price, lang)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.key, item.quantity - 1)}
                            className="w-6 h-6 rounded-full border border-border hover:bg-muted transition-colors text-xs font-mono"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-mono">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.key, item.quantity + 1)}
                            className="w-6 h-6 rounded-full border border-border hover:bg-muted transition-colors text-xs font-mono"
                          >
                            +
                          </button>
                          <button
                            onClick={() => handleRemoveFromCart(item.key)}
                            className="ml-2 text-muted-foreground hover:text-red-600 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-3 mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">{t('Subtotal')}</span>
                      <span className="text-sm font-semibold">{formatPrice(cartTotal, lang)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{t('Tax calculated at checkout')}</p>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-md"
                  >
                    {t(tr.pricing.checkout || 'Proceed to Checkout')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
