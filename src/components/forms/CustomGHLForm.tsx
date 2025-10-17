import React, { useState } from 'react';
import { ghlClient } from '@/lib/api/ghl';

interface CustomFormProps {
  formType?: 'contact' | 'leadgen' | 'consultation';
  className?: string;
}

export function CustomGHLForm({ formType = 'contact', className = '' }: CustomFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    source: 'Website Form',
    // Business specific fields
    businessName: '',
    monthlyBudget: '',
    services: [] as string[],
    currentWebsite: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Create or update contact in GoHighLevel
      const contactData = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        source: formData.source,
        customField: {
          message: formData.message,
          businessName: formData.businessName,
          monthlyBudget: formData.monthlyBudget,
          services: formData.services.join(', '),
          currentWebsite: formData.currentWebsite,
        },
        tags: [formType, 'website-lead', new Date().toISOString().split('T')[0]],
      };

      const result = await ghlClient.createOrUpdateContact(contactData);

      if (result.contact) {
        setStatus('success');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          source: 'Website Form',
          businessName: '',
          monthlyBudget: '',
          services: [],
          currentWebsite: '',
        });

        // Optional: Redirect or show success message
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setErrorMessage('There was an error submitting your form. Please try again.');
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Business Name (for lead gen forms) */}
        {formType !== 'contact' && (
          <div className="md:col-span-2">
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        )}

        {/* Current Website (for lead gen forms) */}
        {formType === 'leadgen' && (
          <div className="md:col-span-2">
            <label htmlFor="currentWebsite" className="block text-sm font-medium text-gray-700 mb-2">
              Current Website
            </label>
            <input
              type="url"
              id="currentWebsite"
              value={formData.currentWebsite}
              onChange={(e) => setFormData({ ...formData, currentWebsite: e.target.value })}
              placeholder="https://"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        )}

        {/* Services Interested In */}
        {formType === 'consultation' && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Services You're Interested In
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Geofencing/Programmatic Ads',
                'Social Media Management',
                'Website Development',
                'SEO Optimization',
                'Content Creation',
                'Email Marketing',
              ].map((service) => (
                <label key={service} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Monthly Budget (for consultation forms) */}
        {formType === 'consultation' && (
          <div className="md:col-span-2">
            <label htmlFor="monthlyBudget" className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Marketing Budget
            </label>
            <select
              id="monthlyBudget"
              value={formData.monthlyBudget}
              onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              <option value="">Select Budget Range</option>
              <option value="$1,000 - $2,500">$1,000 - $2,500</option>
              <option value="$2,500 - $5,000">$2,500 - $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000+">$10,000+</option>
            </select>
          </div>
        )}

        {/* Message */}
        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message {formType === 'contact' && '*'}
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            required={formType === 'contact'}
            placeholder={
              formType === 'consultation'
                ? 'Tell us about your business goals and challenges...'
                : 'How can we help you?'
            }
          />
        </div>
      </div>

      {/* Status Messages */}
      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {errorMessage}
        </div>
      )}

      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Thank you for your submission! We'll be in touch within 24 hours.
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`
          w-full py-4 px-6 rounded-lg font-semibold text-white transition-all
          ${status === 'loading'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary hover:bg-primary-dark focus:ring-4 focus:ring-primary/20'
          }
        `}
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        ) : (
          formType === 'consultation' ? 'Request Free Consultation' : 'Send Message'
        )}
      </button>

      {/* Privacy Notice */}
      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our Privacy Policy and Terms of Service.
      </p>
    </form>
  );
}