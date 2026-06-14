export default function ReportSection({ title, children, accent = 'coral' }) {
  const accentClasses = {
    coral: 'bg-coral',
    leaf: 'bg-leaf',
    sky: 'bg-sky',
    ink: 'bg-ink',
  };

  return (
    <section className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span
          className={`h-3 w-3 rounded-full ${accentClasses[accent] || accentClasses.coral}`}
        />
        <h3 className="text-xl font-black text-ink">{title}</h3>
      </div>
      {children}
    </section>
  );
}
