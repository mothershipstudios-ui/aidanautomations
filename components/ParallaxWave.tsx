'use client';

import { useEffect, useState } from 'react';

export default function ParallaxWave() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <img
        src="/wave-bg.png"
        alt="Wave background"
        className="w-full h-auto absolute"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          willChange: 'transform',
        }}
      />
    </div>
  );
}
