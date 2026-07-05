import { ScanSearch } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/88 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#" className="flex items-center gap-2 font-heading text-lg font-bold text-text">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white shadow-card ring-4 ring-accentLime/70">
            <ScanSearch size={19} aria-hidden="true" />
          </span>
          Clerify
        </a>
        <div className="flex items-center gap-3">
          <a
            href="#checks"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-muted transition hover:bg-surfaceSoft hover:text-text sm:inline-flex"
          >
            What it checks
          </a>
          <a
            href="#services"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-muted transition hover:bg-surfaceSoft hover:text-text md:inline-flex"
          >
            Services
          </a>
          <a
            href="#contact"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-muted transition hover:bg-surfaceSoft hover:text-text lg:inline-flex"
          >
            Human review
          </a>
          <a
            href="#audit"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-primaryDark focus-visible:outline-primary"
          >
            Start free audit
          </a>
        </div>
      </nav>
    </header>
  );
}
