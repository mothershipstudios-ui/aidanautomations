'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="container-main">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="Aidan Automation logo"
              width={96}
              height={96}
              className="w-20 h-20 md:w-24 md:h-24"
              priority
            />
          </Link>

          {/* CTA Button */}
          <a
            href="#audit-form"
            className="btn-primary text-sm md:text-base px-4 md:px-6"
          >
            Free Audit
          </a>
        </nav>
      </div>
    </header>
  );
}
