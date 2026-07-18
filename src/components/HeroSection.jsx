import { CheckCircle2, Sparkles } from 'lucide-react';
import AuditForm from './AuditForm';

const reassuranceItems = ['No signup', 'Practical priorities', 'Human review available'];
const previewItems = ['First impression', 'What’s working', 'UX/UI issues', 'Priority fixes', 'Next steps'];

export default function HeroSection({ onSubmit, isLoading, apiError }) {
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
            See where visitors get stuck on your website
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            Paste your website and get a practical UX/UI mini-audit with what’s
            working, what feels unclear, and what to improve first.
          </p>

          <AuditForm
            variant="hero"
            onSubmit={onSubmit}
            isLoading={isLoading}
            apiError={apiError}
          />

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
          <article className="relative mx-auto max-w-lg rounded-[2.25rem] border border-border bg-surface/95 p-5 shadow-soft backdrop-blur sm:p-6">
            <p className="inline-flex rounded-full bg-accentLime px-3 py-1 text-sm font-bold uppercase tracking-[0.16em] text-primaryDark">
              What you’ll get
            </p>
            <h2 className="mt-4 font-heading text-2xl font-bold text-text">
              A focused UX/UI mini-audit, not a generic score.
            </h2>
            <ul className="mt-6 grid gap-3">
              {previewItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-bg px-4 py-3 font-semibold text-text"
                >
                  <CheckCircle2 className="shrink-0 text-primary" size={19} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-3xl border border-primary/10 bg-primarySoft/60 p-5">
              <p className="text-sm font-semibold leading-7 text-primaryDark">
                Built by Rocio Jalifi, Software Developer · UX/UI Designer, with a
                human review path when you want to go deeper.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
