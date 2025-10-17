import React, { useState } from 'react'

export function IntentBar() {
  const [email, setEmail] = useState('')
  const [budget, setBudget] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Track analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_intent_submit', {
        event_category: 'engagement',
        event_label: budget,
      })
    }

    // Preserve UTM params
    const urlParams = new URLSearchParams(window.location.search)
    const utmParams = {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_term: urlParams.get('utm_term') || '',
      utm_content: urlParams.get('utm_content') || '',
    }

    // Submit to GoHighLevel webhook (placeholder)
    try {
      const response = await fetch('https://hooks.gohighlevel.com/v1/YOUR_WEBHOOK_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          budget,
          ...utmParams,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        // Scroll to timeline
        const timeline = document.getElementById('timeline')
        if (timeline) {
          timeline.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }

        // Reset form
        setEmail('')
        setBudget('')
      }
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="luxury-surface p-2 flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your business email"
          className="luxury-input flex-1"
          required
          disabled={loading}
        />

        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="luxury-input sm:w-48"
          required
          disabled={loading}
        >
          <option value="">Monthly budget</option>
          <option value="1000-2500">$1,000 - $2,500</option>
          <option value="2500-5000">$2,500 - $5,000</option>
          <option value="5000-10000">$5,000 - $10,000</option>
          <option value="10000+">$10,000+</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="luxury-btn-accent min-w-[160px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Start Your Runway'
          )}
        </button>
      </div>
    </form>
  )
}