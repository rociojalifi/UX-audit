export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      {Icon && (
        <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-coral/12 text-coral">
          <Icon size={24} aria-hidden="true" />
        </div>
      )}
      <h3 className="text-xl font-bold text-ink">{title}</h3>
      <p className="mt-3 leading-7 text-ink/65">{description}</p>
    </article>
  );
}
