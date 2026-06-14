import { ArrowRight, CheckCircle2, FileSearch, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-bg">
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_left,_rgba(30,64,175,0.12),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(20,184,166,0.11),_transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pb-24 lg:pt-20">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-bold text-primary shadow-sm">
            <ShieldCheck size={17} aria-hidden="true" />
            AI-powered UX/UI clarity
          </p>
          <h1 className="max-w-4xl font-heading text-4xl font-extrabold leading-[1.04] text-text sm:text-6xl lg:text-7xl">
            Find out why your website feels unclear — and what to fix first
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Paste your website and get a practical UX/UI report with what’s working,
            what’s confusing, and which improvements matter most.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#audit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-primaryDark"
            >
              Audit my website
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="#example-report"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 font-bold text-text transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
            >
              <FileSearch size={18} aria-hidden="true" />
              See example report
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-muted">
            <span className="rounded-full bg-surfaceSoft px-4 py-2">No signup needed</span>
            <span className="rounded-full bg-surfaceSoft px-4 py-2">Grounded in page content</span>
            <span className="rounded-full bg-surfaceSoft px-4 py-2">Built for practical fixes</span>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-border bg-surface p-4 shadow-soft">
            <div className="rounded-[1.5rem] bg-primaryDark p-5 text-white">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Clerify report preview</p>
                  <p className="font-heading text-xl font-bold">Homepage clarity</p>
                </div>
                <span className="rounded-full bg-accent px-3 py-1 text-sm font-bold text-primaryDark">
                  AI audit
                </span>
              </div>
              <div className="space-y-3">
                {[
                  'Offer clarity needs to arrive before the first CTA',
                  'Navigation should support one clear decision path',
                  'Trust signals can work harder near conversion points',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-white/8 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 text-accent" size={20} />
                    <p className="text-sm leading-6 text-white/82">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/6 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                  Priority fix
                </p>
                <p className="mt-2 text-sm leading-6 text-white/78">
                  Rewrite the hero around one clear promise and one primary action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
