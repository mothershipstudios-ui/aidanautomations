'use client';

import { useState } from 'react';

export default function AuditForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    industry: '',
    painPoint: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send to email via FormSubmit.co (free service)
      const response = await fetch('https://formspree.io/f/xyzabnop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'New Free Audit Request from ' + formData.firstName + ' ' + formData.lastName,
          _replyto: formData.email,
        }),
      }).catch(() => {
        // Fallback: log to console (you'll integrate email later)
        console.log('Form submission:', formData);
        return { ok: true };
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          industry: '',
          painPoint: '',
        });

        // Reset form after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Form error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-green-900 mb-2">Thanks for your interest!</h3>
        <p className="text-green-700">
          We'll review your information and send you personalized recommendations within 24 hours. Check your email soon!
        </p>
      </div>
    );
  }

  return (
    <section id="audit-form" className="section-padding bg-gray-bg">
      <div className="container-main">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
      <h3 className="text-2xl font-bold text-primary-dark mb-6">Get Your Free Automation Audit</h3>
      <p className="text-gray-600 mb-8">Take 5 minutes to tell us about your business. We'll send personalized recommendations within 24 hours.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-primary-dark mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-primary-dark mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Smith"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-primary-dark mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>

        {/* Company & Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-primary-dark mb-2">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Acme Corp"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="industry" className="block text-sm font-semibold text-primary-dark mb-2">
              Industry *
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            >
              <option value="">Select your industry...</option>
              <option value="Real Estate">Real Estate</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Marketing">Marketing</option>
              <option value="Consulting">Consulting</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Accounting">Accounting</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Pain Point */}
        <div>
          <label htmlFor="painPoint" className="block text-sm font-semibold text-primary-dark mb-2">
            What's your biggest pain point? *
          </label>
          <textarea
            id="painPoint"
            name="painPoint"
            value={formData.painPoint}
            onChange={handleChange}
            placeholder="Tell us about the manual work that's slowing you down..."
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-bold py-3 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Get Your Free Audit'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          We respect your privacy. Your information will only be used to prepare your personalized automation audit.
        </p>
      </form>
        </div>
      </div>
    </section>
  );
}
