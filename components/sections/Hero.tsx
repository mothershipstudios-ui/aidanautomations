'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="section-padding bg-gradient-to-b from-gray-bg to-white">
      <div className="container-main">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo Large */}
          <div className="mb-8 flex justify-center">
            <svg
              className="w-16 h-16 md:w-20 md:h-20"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="45" fill="none" stroke="#0A5FFF" strokeWidth="3" />
              <line x1="28" y1="75" x2="50" y2="25" stroke="#0A5FFF" strokeWidth="4" strokeLinecap="round" />
              <line x1="72" y1="75" x2="50" y2="25" stroke="#0A5FFF" strokeWidth="4" strokeLinecap="round" />
              <line x1="35" y1="55" x2="65" y2="55" stroke="#0A5FFF" strokeWidth="4" strokeLinecap="round" />
              <path d="M 72 42 Q 88 35 98 52" fill="none" stroke="#0A5FFF" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-4 leading-tight">
            AI Automation Consulting
            <span className="text-primary block mt-2">for Small Business</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Cut manual work. Stay competitive. Grow faster.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="https://tally.so/r/wA1xXd"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Get Free Automation Audit
            </Link>
            <a
              href="#problems"
              className="btn-secondary"
            >
              Learn More
            </a>
          </div>

          {/* Trust badge */}
          <p className="text-sm text-gray-500">
            ✓ No credit card required • ✓ Takes 15 minutes • ✓ Confidential analysis
          </p>
        </div>
      </div>
    </section>
  );
}
