'use client';

import Header from '@/components/Header';
import Hero from '@/components/sections/Hero';
import Problems from '@/components/sections/Problems';
import Solutions from '@/components/sections/Solutions';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <Solutions />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
