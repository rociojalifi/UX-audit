import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="bg-bg pb-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="rounded-[2rem] border border-border bg-primaryDark p-7 text-white shadow-card sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                Ready for clarity?
              </p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
                Start with the fixes your visitors will feel first
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                Clerify gives you a focused starting point before you spend time or
                budget on a redesign, content rewrite, or conversion improvements.
              </p>
            </div>
            <a
              href="#audit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-primaryDark shadow-card transition hover:-translate-y-0.5 hover:bg-accentSoft"
            >
              Start the audit
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
