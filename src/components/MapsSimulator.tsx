import { useState } from 'react'
import { useI18n, formatPrice } from '../i18n'

const WHATSAPP_BASE = 'https://wa.me/33767566783?text='
const MAPS_PRICE = 1000

export default function MapsSimulator() {
  const { lang, t, translations: tr } = useI18n()
  const [step, setStep] = useState(1)
  const [city, setCity] = useState('')
  const [sector, setSector] = useState('')
  const [keywords, setKeywords] = useState('')
  const [visibility, setVisibility] = useState('')

  const sectorKeys = Object.keys(tr.maps.sectors) as (keyof typeof tr.maps.sectors)[]
  const visibilityOptions = [
    { key: 'noListing', label: tr.maps.visibility.noListing },
    { key: 'beyondTop10', label: tr.maps.visibility.beyondTop10 },
    { key: 'top5to10', label: tr.maps.visibility.top5to10 },
    { key: 'alreadyTop3', label: tr.maps.visibility.alreadyTop3 },
  ]

  const handleAudit = () => {
    const msg = `${t(tr.maps.title)}\n${city} / ${sector} / ${keywords} / ${visibility}`
    window.open(`${WHATSAPP_BASE}${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section id="maps" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="reveal mb-12">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-4">
            {t(tr.maps.label)}
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight">
            {t(tr.maps.title)}
          </h3>
        </div>

        <div className="reveal max-w-3xl">
          {/* Step indicators */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-primary' : 'bg-border'}`} />
            ))}
          </div>

          {step === 1 && (
            <div>
              <p className="text-sm font-mono text-muted-foreground mb-4">{t(tr.maps.step1)}</p>
              <div className="flex flex-wrap gap-2">
                {tr.maps.cities.map((c) => (
                  <button key={c} onClick={() => { setCity(c); setStep(2) }}
                    className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${city === c ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted hover:shadow-sm'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-sm font-mono text-muted-foreground mb-4">{t(tr.maps.step2)}</p>
              <div className="flex flex-wrap gap-2">
                {sectorKeys.map((key) => (
                  <button key={key} onClick={() => { setSector(t(tr.maps.sectors[key])); setStep(3) }}
                    className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${sector === t(tr.maps.sectors[key]) ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted hover:shadow-sm'}`}>
                    {t(tr.maps.sectors[key])}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="mt-4 text-xs text-muted-foreground hover:text-foreground">{t(tr.maps.back)}</button>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-sm font-mono text-muted-foreground mb-4">{t(tr.maps.step3)}</p>
              <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)}
                placeholder={t(tr.maps.keywordPlaceholder)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(2)} className="text-xs text-muted-foreground hover:text-foreground">{t(tr.maps.back)}</button>
                <button onClick={() => keywords && setStep(4)} disabled={!keywords}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-primary/90 transition-colors">
                  {t(tr.maps.continue)}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="text-sm font-mono text-muted-foreground mb-4">{t(tr.maps.step4)}</p>
              <div className="space-y-2">
                {visibilityOptions.map((v) => (
                  <button key={v.key} onClick={() => setVisibility(t(v.label))}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm border transition-all duration-200 ${visibility === t(v.label) ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'}`}>
                    {t(v.label)}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <button onClick={() => setStep(3)} className="text-xs text-muted-foreground hover:text-foreground">{t(tr.maps.back)}</button>
                {visibility && (
                  <button onClick={handleAudit}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 hover:shadow-lg transition-all duration-300">
                    {t(tr.maps.launchAudit)}
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 4 && city && sector && (
            <div className="mt-8 p-6 rounded-xl border border-border bg-white">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">{t(tr.maps.diagnostic.title)}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-serif font-semibold">+{Math.floor(Math.random() * 40 + 20)}%</p>
                  <p className="text-xs text-muted-foreground">{t(tr.maps.diagnostic.callIncrease)}</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-semibold">{Math.floor(Math.random() * 30 + 15)}</p>
                  <p className="text-xs text-muted-foreground">{t(tr.maps.diagnostic.competition)}</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-semibold">{(Math.floor(Math.random() * 5000 + 1000)).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{t(tr.maps.diagnostic.searches)}</p>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-muted text-center">
                <p className="text-sm font-medium">
                  {t(tr.maps.packPrice)}
                  <span className="font-serif text-lg">{formatPrice(MAPS_PRICE, lang)}</span>
                  <span className="text-muted-foreground text-sm">{t(tr.maps.perYear)}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
