'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white mt-20">
      <div className="container-main section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-2">Aidan Automations</h3>
            <p className="text-gray-300 text-sm">
              AI automation consulting for small business.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-cyan">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-300 hover:text-cyan transition-colors">
                  Free Audit
                </Link>
              </li>
              <li>
                <Link href="https://propertyanalyzerpro.com" target="_blank" className="text-gray-300 hover:text-cyan transition-colors">
                  PropertyAnalyzer Pro
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-cyan">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://twitter.com/AidanAutoAI" target="_blank" className="text-gray-300 hover:text-cyan transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="https://github.com" target="_blank" className="text-gray-300 hover:text-cyan transition-colors">
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-cyan">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-cyan transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-cyan transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Aidan Automations. All rights reserved.
          </p>
          <Link
            href="mailto:aidan@aidanautomations.com"
            className="text-cyan hover:text-white transition-colors font-semibold"
          >
            aidan@aidanautomations.com
          </Link>
        </div>
      </div>
    </footer>
  );
}
