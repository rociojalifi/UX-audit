import { Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-mist/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#" className="flex items-center gap-2 font-semibold text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white">
            <Sparkles size={18} aria-hidden="true" />
          </span>
          UX Pulse
        </a>
        <a
          href="#audit"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-coral"
        >
          Audit my website
        </a>
      </nav>
    </header>
  );
}
