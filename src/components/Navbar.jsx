import clerifyIcon from '../assets/clerify-icon-transparent.png';
import clerifyLockup from '../assets/clerify-lockup-transparent.png';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/88 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#" className="flex items-center gap-3" aria-label="Clerify home">
          <img
            src={clerifyIcon}
            alt=""
            className="h-10 w-10 rounded-2xl object-cover shadow-card ring-4 ring-accentLime/70 sm:hidden"
            aria-hidden="true"
          />
          <img
            src={clerifyLockup}
            alt="Clerify"
            className="hidden h-10 w-auto object-contain sm:block"
          />
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
