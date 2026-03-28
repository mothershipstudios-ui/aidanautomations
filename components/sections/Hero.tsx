'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="section-padding bg-gradient-to-b from-gray-bg to-white">
      <div className="container-main">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo Large */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo.png"
              alt="Aidan Automation logo"
              width={200}
              height={200}
              className="w-32 h-32 md:w-48 md:h-48"
              priority
            />
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
            <a
              href="#audit-form"
              className="btn-primary"
            >
              Get Free Automation Audit
            </a>
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
