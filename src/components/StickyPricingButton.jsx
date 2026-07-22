import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export default function StickyPricingButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('#audit');
      const threshold = hero ? hero.getBoundingClientRect().bottom + window.scrollY : window.innerHeight * 0.85;
      setIsVisible(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="#services"
      className="fixed bottom-5 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-x-1/2 hover:-translate-y-0.5 hover:bg-primaryDark focus-visible:outline-primary sm:left-auto sm:right-5 sm:translate-x-0 sm:hover:translate-x-0"
    >
      Jump to pricing
      <ArrowDown size={16} aria-hidden="true" />
    </a>
  );
}
