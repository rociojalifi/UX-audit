export default function ReportSection({ title, children, accent = 'coral' }) {
  const accentClasses = {
    coral: 'bg-primary',
    leaf: 'bg-success',
    sky: 'bg-accent',
    ink: 'bg-primaryDark',
  };

  return (
    <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span
          className={`h-3 w-3 rounded-full ${accentClasses[accent] || accentClasses.coral}`}
        />
        <h3 className="font-heading text-xl font-bold text-text">{title}</h3>
      </div>
      {children}
    </section>
  );
}
