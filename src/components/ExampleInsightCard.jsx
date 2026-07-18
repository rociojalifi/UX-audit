import { ArrowRight, CheckCircle2, Lightbulb, Sparkles } from 'lucide-react';

export default function ExampleInsightCard() {
  return (
    <section id="example-report" className="bg-bg py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
            See a real sample
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-text sm:text-5xl">
            Example audit insight
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            This is a realistic anonymized example of the kind of clarity feedback
            Clerify gives. It shows the issue, why it matters, and one practical
            direction for improvement.
          </p>
        </div>

        <article className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surface p-5 shadow-card sm:p-7 lg:p-8">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accentPink/20 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-12 left-10 h-32 w-32 rounded-full bg-accentLime/35 blur-3xl" aria-hidden="true" />

          <div className="relative grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="rounded-[2rem] bg-primaryDark p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-accentLime ring-4 ring-white/10">
                  <Lightbulb size={24} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-accentLime">
                    Example audit insight
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/70">
                    Service business homepage
                  </p>
                </div>
              </div>

              <h3 className="mt-6 font-heading text-3xl font-bold leading-tight">
                The offer is not clear in the first screen.
              </h3>
              <p className="mt-4 leading-7 text-white/75">
                Visitors may not understand what the business does before deciding
                whether to keep scrolling, trust the offer, or leave.
              </p>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/8 p-5">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-accentLime">
                  Recommended fix
                </p>
                <p className="mt-2 font-semibold leading-7 text-white">
                  Rewrite the hero around one clear promise, one audience, and one
                  primary CTA.
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-[2rem] border border-primary/10 bg-primarySoft/55 p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-primary" size={18} aria-hidden="true" />
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                    Before / after clarity example
                  </p>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
                  <QuoteCard
                    label="Before"
                    text="Welcome to our creative studio"
                  />
                  <div className="hidden items-center justify-center text-primary lg:flex" aria-hidden="true">
                    <ArrowRight size={22} />
                  </div>
                  <QuoteCard
                    label="After"
                    featured
                    text="Brand and website design for small businesses that need to look more trustworthy online"
                  />
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-3xl bg-surface p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={19} aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-muted">
                    The after version explains who it is for, what the service is,
                    and why it matters faster.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <MiniSignal label="Issue" text="Unclear promise" />
                <MiniSignal label="Impact" text="Low confidence" />
                <MiniSignal label="Priority" text="Hero rewrite" />
              </div>
            </div>
          </div>

          <a
            href="#audit"
            className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-primaryDark"
          >
            Start free audit
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  );
}

function QuoteCard({ label, text, featured = false }) {
  return (
    <div
      className={`rounded-3xl border p-5 ${
        featured
          ? 'border-primary/20 bg-surface shadow-sm'
          : 'border-border bg-surface/80'
      }`}
    >
      <p className={`text-xs font-black uppercase tracking-[0.14em] ${featured ? 'text-primary' : 'text-muted'}`}>
        {label}
      </p>
      <p className="mt-3 font-heading text-lg font-semibold leading-7 text-text">
        “{text}”
      </p>
    </div>
  );
}

function MiniSignal({ label, text }) {
  return (
    <div className="rounded-3xl border border-border bg-bg p-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-primary">
        {label}
      </p>
      <p className="mt-2 font-semibold text-text">{text}</p>
    </div>
  );
}
