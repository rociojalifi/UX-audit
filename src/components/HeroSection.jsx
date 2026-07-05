import { ArrowRight, CheckCircle2, FileSearch, Sparkles } from 'lucide-react';

const reassuranceItems = ['No signup needed', 'Practical priorities', 'Human help available'];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg">
      <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,_rgba(90,78,255,0.10),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(238,160,255,0.18),_transparent_34%)]" />
      <div className="absolute left-[7%] top-24 hidden h-4 w-4 rounded-full bg-accentLime md:block" aria-hidden="true" />
      <div className="absolute right-[14%] top-36 hidden h-6 w-6 rounded-full bg-accentPink/60 blur-[1px] lg:block" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:py-24">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-surface/90 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-accentLime text-primaryDark" aria-hidden="true">
              <Sparkles size={15} />
            </span>
            AI-assisted. Human-backed.
          </p>

          <h1 className="font-heading text-4xl font-bold leading-[1.06] text-text sm:text-5xl lg:text-6xl">
            Find out what’s confusing people on your website.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            Paste your website and get a practical UX/UI mini-audit with what’s
            working, what feels unclear, and what to improve first.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#audit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-primaryDark focus-visible:outline-primary"
            >
              Audit my website
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="#example-report"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 font-semibold text-text transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-accentLime/45 hover:text-primary focus-visible:outline-primary"
            >
              <FileSearch size={18} aria-hidden="true" />
              See example report
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-muted">
            {reassuranceItems.map((item) => (
              <li key={item} className="inline-flex items-center gap-2 rounded-full bg-surface/80 px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-accentPink" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:justify-self-end">
          <div className="absolute -right-8 -top-8 hidden h-28 w-28 rounded-full bg-accentPink/20 blur-2xl lg:block" aria-hidden="true" />
          <div className="absolute -bottom-6 -left-6 hidden h-20 w-20 rounded-full bg-accentLime/60 blur-xl lg:block" aria-hidden="true" />
          <article className="relative mx-auto max-w-xl rounded-[2.25rem] border border-border bg-surface/95 p-5 shadow-soft backdrop-blur sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="inline-flex rounded-full bg-accentLime px-3 py-1 text-sm font-bold uppercase tracking-[0.16em] text-primaryDark">
                  Mini-audit preview
                </p>
                <h2 className="mt-3 font-heading text-2xl font-bold text-text">
                  Homepage clarity
                </h2>
              </div>
              <div className="rounded-3xl bg-primary px-4 py-3 text-center text-white shadow-card">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-white/75">
                  Score
                </p>
                <p className="font-heading text-2xl font-bold text-white">
                  72/100
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-border bg-bg p-5">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-primary">
                Finding
              </p>
              <p className="mt-2 leading-7 text-muted">
                Your CTA is visible, but the page does not explain the offer clearly
                enough before asking users to act.
              </p>
            </div>

            <div className="mt-4 rounded-3xl border border-primary/15 bg-primarySoft/70 p-5">
              <p className="inline-flex rounded-full bg-accentPink/45 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-primaryDark">
                High priority
              </p>
              <h3 className="mt-3 font-heading text-lg font-semibold text-text">
                Suggested fix
              </h3>
              <p className="mt-2 leading-7 text-muted">
                Rewrite the hero around one clear promise and one primary action.
              </p>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-3xl border border-border bg-surfaceSoft/70 p-5">
              <CheckCircle2 className="mt-0.5 shrink-0 text-success" size={20} aria-hidden="true" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-primary">
                  What’s working
                </p>
                <p className="mt-2 leading-7 text-muted">
                  Your service is specific and the page has a focused visual direction.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
