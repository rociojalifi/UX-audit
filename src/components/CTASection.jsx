import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="bg-bg pb-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-border bg-surface p-7 text-text shadow-card sm:p-10">
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accentPink/20 blur-2xl" aria-hidden="true" />
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                Free mini-audit
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold sm:text-5xl">
                Ready to see what your website needs first?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
                Start with a free mini-audit. If the report shows bigger clarity or
                trust issues, you can request a human review afterwards.
              </p>
            </div>
            <a
              href="#audit"
              className="relative inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-primaryDark"
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
