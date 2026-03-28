'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="container-main">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg
              className="w-10 h-10 md:w-12 md:h-12"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="45" fill="none" stroke="#0A5FFF" strokeWidth="3" />
              <line x1="28" y1="75" x2="50" y2="25" stroke="#0A5FFF" strokeWidth="4" strokeLinecap="round" />
              <line x1="72" y1="75" x2="50" y2="25" stroke="#0A5FFF" strokeWidth="4" strokeLinecap="round" />
              <line x1="35" y1="55" x2="65" y2="55" stroke="#0A5FFF" strokeWidth="4" strokeLinecap="round" />
              <path d="M 72 42 Q 88 35 98 52" fill="none" stroke="#0A5FFF" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="hidden sm:inline font-bold text-lg text-primary-dark">Aidan Automations</span>
          </Link>

          {/* CTA Button */}
          <Link
            href="https://tally.so/r/wA1xXd"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm md:text-base px-4 md:px-6"
          >
            Free Audit
          </Link>
        </nav>
      </div>
    </header>
  );
}
