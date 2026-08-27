import { useState } from 'react'
import { useI18n } from '../i18n'

export default function Intelligence() {
  const { lang, t, translations: tr } = useI18n()
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState<{role: 'bot' | 'user', text: string}[]>([
    { role: 'bot', text: t(tr.intelligence.greeting) }
  ])

  const industryKeys = Object.keys(tr.intelligence.industries) as (keyof typeof tr.intelligence.industries)[]

  const handleIndustrySelect = (key: string) => {
    const label = t(tr.intelligence.industries[key as keyof typeof tr.intelligence.industries])
    setSelectedIndustry(label)
    setChatMessages(prev => [
      ...prev,
      { role: 'user', text: label },
      { role: 'bot', text: `Great! For ${label} businesses, I recommend focusing on local SEO, Google Maps optimization, and a premium showcase website. Would you like me to prepare a custom strategy?` }
    ])
  }

  const handleSend = () => {
    if (!message.trim()) return
    setChatMessages(prev => [
      ...prev,
      { role: 'user', text: message },
      { role: 'bot', text: `Thank you for sharing. Based on what you've described, I'd recommend starting with a comprehensive digital audit. Would you like to schedule a call or continue via WhatsApp?` }
    ])
    setMessage('')
  }

  return (
    <section id="intelligence" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="reveal mb-12">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-4">
            {t(tr.intelligence.label)}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">
            {t(tr.intelligence.title)}
          </h2>
        </div>

        <div className="reveal max-w-2xl mx-auto">
          <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-mono font-bold">XR</div>
              <div>
                <p className="text-sm font-semibold">{t(tr.intelligence.strategistName)}</p>
                <p className="text-xs text-muted-foreground">{t(tr.intelligence.strategistRole)}</p>
              </div>
              <span className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>

            <div className="p-6 space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                    msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {!selectedIndustry && chatMessages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {industryKeys.map((key) => (
                    <button key={key} onClick={() => handleIndustrySelect(key)}
                      className="px-3 py-1.5 rounded-full text-xs border border-border hover:bg-muted hover:shadow-sm transition-all duration-200">
                      {t(tr.intelligence.industries[key])}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-border">
              <div className="flex gap-3">
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t(tr.intelligence.placeholder)}
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <button onClick={handleSend}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 hover:shadow-sm transition-all duration-200">
                  {t(tr.intelligence.send)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
