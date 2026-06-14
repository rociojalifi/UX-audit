import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-mist">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-24 lg:pt-20">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm">
            UX/UI audit tool for sharper websites
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-normal text-ink sm:text-6xl lg:text-7xl">
            Find out why your website feels off — and how to fix it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">
            Paste your website link and get a UX/UI mini-audit with what’s working,
            what’s confusing, and what to improve first.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#audit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-3.5 font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-ink"
            >
              Audit my website
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="#checks"
              className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-white px-6 py-3.5 font-bold text-ink transition hover:-translate-y-0.5 hover:border-ink/30"
            >
              See what it checks
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-ink/10 bg-white p-4 shadow-soft">
            <div className="rounded-[1.5rem] bg-ink p-5 text-white">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Mini-audit preview</p>
                  <p className="text-xl font-bold">Homepage clarity</p>
                </div>
                <span className="rounded-full bg-leaf px-3 py-1 text-sm font-bold">
                  72/100
                </span>
              </div>
              <div className="space-y-3">
                {[
                  'Offer clarity needs a stronger first line',
                  'CTA should be more visible on mobile',
                  'Visual hierarchy can feel more premium',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-white/8 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 text-leaf" size={20} />
                    <p className="text-sm leading-6 text-white/82">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
