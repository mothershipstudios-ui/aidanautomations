'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-main">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Automate?
          </h2>
          <p className="text-lg md:text-xl text-cyan mb-8 max-w-xl mx-auto">
            We\'ll analyze your workflow and show you exactly where you can save time and money.
          </p>

          {/* Primary CTA */}
          <div className="mb-8">
            <Link
              href="https://tally.so/r/wA1xXd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-md hover:bg-cyan hover:text-white transition-all duration-200 transform hover:scale-105 min-h-44 flex items-center justify-center"
            >
              Start Your Free Automation Audit
            </Link>
          </div>

          {/* Secondary CTA */}
          <p className="text-white mb-6">
            Or see what's possible with automation:
          </p>
          <Link
            href="https://propertyanalyzerpro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-primary transition-all duration-200 transform hover:scale-105"
          >
            Explore PropertyAnalyzer Pro →
          </Link>

          {/* Info */}
          <p className="text-gray-200 text-sm mt-8">
            Questions? Email <a href="mailto:aidan@aidanautomations.com" className="text-cyan font-semibold hover:underline">aidan@aidanautomations.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}
