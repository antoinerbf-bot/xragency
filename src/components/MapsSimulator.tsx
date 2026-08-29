import { useState, useMemo } from 'react'
import { useI18n, formatPrice } from '../i18n'

const WHATSAPP_BASE = 'https://wa.me/33767566783?text='

// Price calculation logic
const calculatePrice = (sector: string, citySize: string, keywords: number, position: string): { min: number; max: number } => {
  let basePrice = 999

  // Sector multiplier
  const sectorMultipliers: Record<string, number> = {
    'saas': 1.5,
    'ecommerce': 1.4,
    'services': 1.0,
    'healthcare': 1.3,
    'legal': 1.2,
    'realestate': 1.3,
    'consulting': 1.1,
    'fintech': 1.6,
  }
  basePrice *= sectorMultipliers[sector] || 1.0

  // City size multiplier
  const citySizeMultipliers: Record<string, number> = {
    'small': 1.0,
    'medium': 1.2,
    'large': 1.5,
    'metropolis': 2.0,
  }
  basePrice *= citySizeMultipliers[citySize] || 1.0

  // Keywords impact
  const keywordsImpact = 1 + (keywords - 1) * 0.15

  // Position impact
  const positionMultipliers: Record<string, number> = {
    'notlisted': 2.0,
    'beyondtop10': 1.5,
    'top5to10': 1.2,
    'top3': 0.8,
  }
  const positionMult = positionMultipliers[position.toLowerCase().replace(/\s+/g, '')] || 1.0

  const min = Math.round((basePrice * keywordsImpact * positionMult) / 100) * 100
  const max = Math.round((min * 1.3) / 100) * 100

  return { min: Math.max(min, 999), max: Math.max(max, 1299) }
}

export default function MapsSimulator() {
  const { lang, t, translations: tr } = useI18n()
  const [sector, setSector] = useState('')
  const [citySize, setCitySize] = useState('')
  const [keywords, setKeywords] = useState(1)
  const [position, setPosition] = useState('')

  const sectorKeys = Object.keys(tr.maps.sectors) as (keyof typeof tr.maps.sectors)[]
  const citySizeOptions = [
    { key: 'small', label: '< 50k inhabitants' },
    { key: 'medium', label: '50k - 250k inhabitants' },
    { key: 'large', label: '250k - 1M inhabitants' },
    { key: 'metropolis', label: '> 1M inhabitants' },
  ]
  const positionOptions = [
    { key: 'notlisted', label: t(tr.maps.visibility.noListing) },
    { key: 'beyondtop10', label: t(tr.maps.visibility.beyondTop10) },
    { key: 'top5to10', label: t(tr.maps.visibility.top5to10) },
    { key: 'top3', label: t(tr.maps.visibility.alreadyTop3) },
  ]

  const priceRange = useMemo(
    () => (sector && citySize && position ? calculatePrice(sector, citySize, keywords, position) : null),
    [sector, citySize, keywords, position]
  )

  const handleRequestAudit = () => {
    const msg = `${t(tr.maps.title)}\n\n📍 ${sector}\n🏙️ ${citySize}\n🔑 ${keywords} keywords\n📊 Current Position: ${position}\n\n💰 Price Range: ${priceRange ? `${formatPrice(priceRange.min, lang)} - ${formatPrice(priceRange.max, lang)}/year` : 'To be calculated'}`
    window.open(`${WHATSAPP_BASE}${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section id="maps" className="py-16 lg:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="reveal mb-12">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-3">
            {t(tr.maps.label)}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">
            {t(tr.maps.title)}
          </h2>
        </div>

        <div className="reveal grid lg:grid-cols-2 gap-8 items-start">
          {/* Configurator */}
          <div className="space-y-6">
            {/* Sector Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                🎯 {t('Business Sector')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {sectorKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => setSector(key)}
                    className={`px-3 py-2 rounded-lg text-xs md:text-sm font-medium border transition-all duration-200 ${
                      sector === key
                        ? 'bg-primary text-primary-foreground border-primary shadow-md'
                        : 'border-border bg-white hover:border-primary/30'
                    }`}
                  >
                    {t(tr.maps.sectors[key])}
                  </button>
                ))}
              </div>
            </div>

            {/* City Size Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                🏙️ {t('City Size')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {citySizeOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setCitySize(opt.key)}
                    className={`px-3 py-2 rounded-lg text-xs md:text-sm font-medium border transition-all duration-200 ${
                      citySize === opt.key
                        ? 'bg-primary text-primary-foreground border-primary shadow-md'
                        : 'border-border bg-white hover:border-primary/30'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Keywords Slider */}
            <div>
              <label className="block text-sm font-medium mb-3">
                🔑 Main Keywords: <span className="font-serif text-lg font-bold">{keywords}</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={keywords}
                onChange={(e) => setKeywords(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            {/* Current Position Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                📊 {t('Current Position')}
              </label>
              <div className="space-y-2">
                {positionOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setPosition(opt.label)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm border transition-all duration-200 ${
                      position === opt.label
                        ? 'bg-primary text-primary-foreground border-primary shadow-md'
                        : 'border-border bg-white hover:border-primary/30'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price Display & Guarantee */}
          <div className="lg:sticky lg:top-24">
            <div className="p-8 rounded-xl border-2 border-primary bg-white shadow-lg space-y-6">
              {/* Price Range */}
              {priceRange ? (
                <div className="text-center space-y-2 py-6 border-b-2 border-muted">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    {t('Annual Investment Range')}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-3xl md:text-4xl font-serif font-bold text-primary">
                      {formatPrice(priceRange.min, lang)}
                    </span>
                    <span className="text-lg text-muted-foreground">→</span>
                    <span className="text-3xl md:text-4xl font-serif font-bold text-primary">
                      {formatPrice(priceRange.max, lang)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">{t('per year')}</p>
                </div>
              ) : (
                <div className="text-center py-6 border-b-2 border-muted">
                  <p className="text-sm text-muted-foreground">{t('Configure above to see pricing')}</p>
                </div>
              )}

              {/* Guarantee Box - VERY PROMINENT */}
              <div className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✅</div>
                  <div>
                    <p className="font-bold text-green-900 text-lg leading-tight">
                      TOP 3 Guarantee
                    </p>
                    <p className="font-bold text-green-700 text-sm mt-1">
                      or 100% Refunded
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-green-800 ml-8">
                  <li>✓ Guaranteed TOP 3 position within 6 months</li>
                  <li>✓ Full refund if not achieved</li>
                  <li>✓ No hidden fees</li>
                  <li>✓ Monthly reporting included</li>
                </ul>
              </div>

              {/* Features */}
              <div className="space-y-2 text-xs">
                <div className="flex gap-2">
                  <span className="text-primary font-bold">📍</span>
                  <span>{t('Google Maps & Business Profile optimization')}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary font-bold">📊</span>
                  <span>{t('Monthly performance reports & analytics')}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary font-bold">🔄</span>
                  <span>{t('Continuous optimization & adjustments')}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary font-bold">📱</span>
                  <span>{t('Mobile-optimized reviews management')}</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleRequestAudit}
                disabled={!sector || !citySize || !position}
                className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-lg text-base font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
              >
                {t('Request Free Audit')}
              </button>

              <p className="text-xs text-center text-muted-foreground">
                {t('No credit card required • Response within 24h')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
