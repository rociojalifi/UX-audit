import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="bg-bg pb-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-primaryDark/10 bg-primaryDark p-7 text-white shadow-card sm:p-10">
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accentPink/20 blur-2xl" aria-hidden="true" />
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accentLime">
                Free mini-audit
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold sm:text-5xl">
                Start with a diagnosis, then decide how deep to go
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                The AI-assisted report gives you practical priorities, not vague
                design opinions. If you want help turning those findings into
                improvements, Rocio can review, redesign, or support implementation.
              </p>
            </div>
            <a
              href="#audit"
              className="relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-primaryDark shadow-card transition hover:-translate-y-0.5 hover:bg-accentLime"
            >
              Start free audit
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
