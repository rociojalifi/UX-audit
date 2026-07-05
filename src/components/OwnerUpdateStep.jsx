export default function OwnerUpdateStep({ number, title, example }) {
  return (
    <article className="rounded-3xl border border-border bg-surface p-5 shadow-card">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-sm font-black text-white ring-4 ring-accentLime/55">
        {number}
      </span>
      <h3 className="mt-4 font-heading text-xl font-semibold text-text">{title}</h3>
      <p className="mt-3 text-sm font-semibold leading-6 text-muted">{example}</p>
    </article>
  );
}
