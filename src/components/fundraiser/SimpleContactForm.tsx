import React, { useState } from 'react'

export interface SimpleContactFormProps {
  contactEmail?: string
  onSuccess?: () => void
}

export function SimpleContactForm({ contactEmail, onSuccess }: SimpleContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    // For now, this creates a mailto link
    // You can replace this with a form submission service like:
    // - Formspree (free)
    // - Netlify Forms (free with Netlify)
    // - Web3Forms (free)
    
    try {
      const subject = encodeURIComponent(`Fundraiser Contact from ${formData.name}`)
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
      const mailto = `mailto:${contactEmail || 'contact@example.com'}?subject=${subject}&body=${body}`
      
      window.location.href = mailto
      
      setTimeout(() => {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        onSuccess?.()
      }, 1000)
    } catch (error) {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-brand-white/90 mb-2">
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={status === 'submitting'}
          className="luxury-input"
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-white/90 mb-2">
          Your Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={status === 'submitting'}
          className="luxury-input"
          placeholder="john@example.com"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-white/90 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={status === 'submitting'}
          rows={6}
          className="luxury-input resize-none"
          placeholder="Your message..."
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="luxury-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
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
              Sending...
            </span>
          ) : (
            <>
              <span className="i-heroicons-paper-airplane mr-2"></span>
              Send Message
            </>
          )}
        </button>
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
          <span className="i-heroicons-check-circle text-green-500 text-xl mr-2"></span>
          <span className="text-green-500">Message sent successfully!</span>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
          <span className="i-heroicons-x-circle text-red-500 text-xl mr-2"></span>
          <span className="text-red-500">{errorMessage}</span>
        </div>
      )}

      {/* Note about mailto */}
      <p className="text-xs text-brand-white/40 text-center">
        Note: This will open your default email client. For a better experience, consider using a service like Formspree or Netlify Forms.
      </p>
    </form>
  )
}

