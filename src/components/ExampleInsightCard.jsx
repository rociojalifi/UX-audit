import { ArrowRight, Flag, Lightbulb } from 'lucide-react';

export default function ExampleInsightCard() {
  return (
    <section id="example-report" className="bg-bg py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
            Example report insight
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-text sm:text-5xl">
            See the kind of feedback Clerify gives before you submit
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            The report is designed to be practical: what the issue is, why it matters,
            and what to improve first.
          </p>
        </div>

        <article className="relative overflow-hidden rounded-[2.25rem] border border-border bg-surface p-6 shadow-card sm:p-8">
          <div className="absolute right-6 top-6 h-16 w-16 rounded-full bg-accentPink/20 blur-xl" aria-hidden="true" />
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-primarySoft text-primary ring-4 ring-accentBlueSoft/40">
              <Lightbulb size={24} aria-hidden="true" />
            </div>
            <span className="relative inline-flex items-center gap-2 rounded-full bg-accentPink/35 px-4 py-2 text-sm font-bold text-primaryDark">
              <Flag size={16} aria-hidden="true" />
              High priority
            </span>
          </div>

          <h3 className="relative font-heading text-2xl font-semibold text-text">Your CTA is visible, but the offer is not clear enough</h3>
          <p className="mt-4 leading-8 text-muted">
            The page asks users to book before it explains the promise, outcome, and
            reason to trust the service. That creates friction for new visitors.
          </p>

          <div className="mt-6 rounded-3xl border border-primary/10 bg-primarySoft/65 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Suggested fix
            </p>
            <p className="mt-2 leading-7 text-text">
              Rewrite the hero section around one clear promise and one primary
              action, then repeat that action after the strongest proof points.
            </p>
          </div>

          <a
            href="#audit"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition hover:text-primaryDark"
          >
            Get your own report
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  );
}
