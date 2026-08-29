import { useState } from 'react'
import { useI18n, formatPrice } from '../i18n'

export default function Intelligence() {
  const { lang, t, translations: tr } = useI18n()
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState<{role: 'bot' | 'user', text: string}[]>([
    { role: 'bot', text: t(tr.intelligence.greeting) }
  ])

  const industryKeys = Object.keys(tr.intelligence.industries) as (keyof typeof tr.intelligence.industries)[]

  const features = [
    {
      icon: '🤖',
      title: t('AI-Powered Strategy'),
      desc: t('Real-time market analysis & personalized recommendations')
    },
    {
      icon: '⏰',
      title: t('24/7 Availability'),
      desc: t('Instant responses to your strategic questions anytime')
    },
    {
      icon: '📊',
      title: t('Real-Time Analytics'),
      desc: t('Deep insights on your competitors & market opportunities')
    },
    {
      icon: '🎯',
      title: t('Personalized Roadmap'),
      desc: t('Custom growth strategy tailored to your business')
    },
  ]

  const handleIndustrySelect = (key: string) => {
    const label = t(tr.intelligence.industries[key as keyof typeof tr.intelligence.industries])
    setSelectedIndustry(label)
    setChatMessages(prev => [
      ...prev,
      { role: 'user', text: label },
      { role: 'bot', text: `Excellent! For ${label} businesses, I recommend a comprehensive strategy combining Google Maps optimization, premium web presence, and 24/7 AI support. Ready to discuss your specific goals?` }
    ])
  }

  const handleSend = () => {
    if (!message.trim()) return
    setChatMessages(prev => [
      ...prev,
      { role: 'user', text: message },
      { role: 'bot', text: `Great question! Based on your needs, I can help you optimize your digital presence immediately. Let's schedule a strategic call to detail your custom growth plan.` }
    ])
    setMessage('')
  }

  return (
    <section id="intelligence" className="py-16 lg:py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="reveal mb-12">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-3">
            {t(tr.intelligence.label)}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
            {t(tr.intelligence.title)}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl">
            {t('Harness AI-driven insights to build your digital empire. Get instant strategic guidance, market analysis, and personalized roadmaps—anytime, anywhere.')}
          </p>
        </div>

        <div className="reveal grid lg:grid-cols-2 gap-8 items-start">
          {/* Features Grid */}
          <div className="space-y-4">
            {features.map((feature, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-border bg-white hover:shadow-md hover:border-primary/30 transition-all duration-300">
                <div className="flex gap-3">
                  <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Price Box */}
            <div className="mt-6 p-6 rounded-xl bg-primary text-primary-foreground border-2 border-primary space-y-3">
              <p className="text-xs font-mono tracking-widest opacity-80">MONTHLY INVESTMENT</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold">{formatPrice(1499, lang)}</span>
                <span className="text-sm opacity-80">/month</span>
              </div>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Unlimited AI consultations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Priority response (under 1h)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Monthly strategy reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Competitor intelligence</span>
                </li>
              </ul>
              <button className="w-full mt-4 py-3 px-4 bg-primary-foreground text-primary rounded-lg text-sm font-semibold hover:shadow-md transition-all duration-300">
                {t('Start Free Trial')}
              </button>
            </div>
          </div>

          {/* Chat Interface - Enhanced */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-xl border-2 border-primary bg-white overflow-hidden shadow-lg hover-lift">
              {/* Chat Header - Premium */}
              <div className="px-6 py-5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center text-lg font-bold">
                    🧠
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t(tr.intelligence.strategistName)}</p>
                    <p className="text-xs opacity-80">{t(tr.intelligence.strategistRole)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs">{t('Online')}</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-5 space-y-4 min-h-[350px] max-h-[450px] overflow-y-auto bg-gradient-to-b from-background to-muted/10">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none shadow-sm'
                        : 'bg-muted/60 text-foreground rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {!selectedIndustry && chatMessages.length === 1 && (
                  <div className="mt-6 space-y-2">
                    <p className="text-xs text-muted-foreground font-medium px-2">{t('Select your industry:')}</p>
                    <div className="flex flex-wrap gap-2">
                      {industryKeys.map((key) => (
                        <button key={key} onClick={() => handleIndustrySelect(key)}
                          className="px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-white hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200">
                          {t(tr.intelligence.industries[key])}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="px-5 py-4 border-t border-border bg-muted/30 space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t(tr.intelligence.placeholder)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                  <button
                    onClick={handleSend}
                    className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-200 hover:shadow-md"
                  >
                    {t(tr.intelligence.send)}
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground text-center">{t('Powered by advanced AI • Instant responses')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
