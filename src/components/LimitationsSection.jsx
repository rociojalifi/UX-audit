import { Info } from 'lucide-react';

export default function LimitationsSection() {
  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-card sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primarySoft text-primary">
              <Info size={24} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                Honest first audit
              </p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-text sm:text-3xl">
                Useful direction, with clear limitations
              </h2>
              <p className="mt-4 leading-8 text-muted">
                This first audit is based on the website content and structure
                available from the submitted page. For deeper visual feedback,
                screenshots, mobile testing, and a human UX/UI review can provide
                more accurate recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
