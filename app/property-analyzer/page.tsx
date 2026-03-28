'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PropertyAnalyzerComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary text-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="Aidan Automation logo"
            width={96}
            height={96}
            className="w-20 h-20 md:w-24 md:h-24"
            priority
          />
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6">PropertyAnalyzer Pro</h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-cyan mb-8">Coming Soon</p>

        {/* Description */}
        <p className="text-lg text-gray-200 mb-12 max-w-xl mx-auto leading-relaxed">
          We're building a powerful tool to analyze real estate investments and identify automation opportunities. 
          <br />
          <br />
          <strong>Launch Date: April 7, 2026</strong>
        </p>

        {/* Features */}
        <div className="bg-white bg-opacity-10 rounded-lg p-8 mb-12 backdrop-blur">
          <h2 className="text-2xl font-bold mb-6">What You'll Get</h2>
          <ul className="space-y-4 text-left max-w-md mx-auto">
            <li className="flex items-start gap-3">
              <span className="text-cyan text-xl font-bold">✓</span>
              <span>Instant property analysis (ROI, Cap Rate, Cash Flow)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan text-xl font-bold">✓</span>
              <span>Detailed investment recommendations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan text-xl font-bold">✓</span>
              <span>Automation opportunity identification</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan text-xl font-bold">✓</span>
              <span>Professional PDF reports</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mb-12">
          <p className="text-gray-300 mb-6">Get notified when it launches</p>
          <Link
            href="/#audit-form"
            className="inline-block bg-cyan text-primary font-bold px-8 py-4 rounded-md hover:bg-white transition-all duration-200 transform hover:scale-105"
          >
            Request Early Access
          </Link>
        </div>

        {/* Footer Link */}
        <Link
          href="/"
          className="text-cyan hover:text-white transition-colors underline"
        >
          ← Back to Aidan Automations
        </Link>
      </div>
    </div>
  );
}
