export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-card">
      {Icon && (
        <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-primarySoft text-primary ring-4 ring-accentBlueSoft/35">
          <Icon size={23} aria-hidden="true" />
        </div>
      )}
      <h3 className="font-heading text-lg font-semibold text-text">{title}</h3>
      <p className="mt-3 leading-7 text-muted">{description}</p>
    </article>
  );
}
