import { CheckCircle2, Info } from 'lucide-react';

const limitationPoints = [
  'The mini-audit is a first diagnosis, not a full redesign strategy.',
  'Visual design feedback is stronger when screenshots are included.',
  'A human review can go deeper into layout, brand, mobile flow, and conversion details.',
];

export default function LimitationsSection() {
  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-card sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="flex flex-col gap-5 sm:flex-row lg:flex-col">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primarySoft text-primary">
              <Info size={24} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                Honest first audit
              </p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-text sm:text-3xl">
                What this first audit can and can’t do
              </h2>
              <p className="mt-4 leading-8 text-muted">
                This first audit gives you a practical starting point based on the
                website information available. For deeper visual feedback,
                screenshots, mobile testing, user behavior, and a human UX/UI review
                can provide more accurate recommendations.
              </p>
            </div>
            </div>

            <ul className="grid gap-3">
              {limitationPoints.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 rounded-2xl border border-border bg-bg p-4 text-sm font-semibold leading-6 text-text"
                >
                  <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={18} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
