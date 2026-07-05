import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ServiceCard({
  title,
  price,
  description,
  includes,
  cta,
  featured = false,
  onRequest,
}) {
  return (
    <article
      className={`flex h-full flex-col rounded-[2rem] border bg-surface p-6 shadow-card transition hover:-translate-y-1 sm:p-7 ${
        featured
          ? 'border-primary/35 ring-2 ring-accentLime/80'
          : 'border-border'
      }`}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {featured && (
            <p className="inline-flex rounded-full bg-accentLime px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-primaryDark">
              Recommended
            </p>
          )}
          <span className="inline-flex rounded-full bg-primarySoft px-3.5 py-1.5 text-sm font-bold text-primary">
            {price}
          </span>
        </div>
        <h3 className="font-heading text-2xl font-bold leading-tight text-text">{title}</h3>
      </div>

      <p className="mt-4 leading-7 text-muted">{description}</p>

      <ul className="mb-7 mt-6 grid gap-3">
        {includes.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-muted">
            <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={18} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onRequest}
        className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold transition sm:text-base ${
          featured
            ? 'bg-primary text-white shadow-card hover:-translate-y-0.5 hover:bg-primaryDark'
            : 'border border-border bg-bg text-text hover:-translate-y-0.5 hover:border-primary/30 hover:bg-accentLime/35 hover:text-primary'
        }`}
      >
        {cta}
        <ArrowRight size={17} aria-hidden="true" />
      </button>
    </article>
  );
}
