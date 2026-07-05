const pathwaySteps = [
  {
    title: 'Free AI-assisted mini-audit',
    description: 'Get a first diagnosis of clarity, trust, CTA flow, and priority fixes.',
  },
  {
    title: 'Human UX/UI review',
    description: 'Rocio adds context, judgment, and practical recommendations the AI cannot fully see.',
  },
  {
    title: 'Redesign or implementation support',
    description: 'Turn the findings into clearer structure, stronger visuals, and practical website improvements.',
  },
];

export default function PathwaySection() {
  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 rounded-[2.25rem] border border-border bg-surface p-6 shadow-card sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              How Clerify can grow with you
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-text sm:text-4xl">
              From quick audit to clear improvements
            </h2>
            <p className="mt-5 leading-8 text-muted">
              Start with a focused mini-audit. If the findings show there is more
              to untangle, you can bring in human UX/UI support for deeper judgment,
              clearer decisions, and implementation-ready next steps.
            </p>
            <div className="mt-6 rounded-3xl bg-primaryDark p-5 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accentLime">
                Owner update included
              </p>
              <p className="mt-2 leading-7 text-white/78">
                Paid reviews explain what was reviewed, what changed, why it matters,
                and what happens next.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {pathwaySteps.map((step, index) => (
              <article
                key={step.title}
                className="grid gap-4 rounded-3xl border border-border bg-bg p-5 sm:grid-cols-[auto_1fr]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-sm font-black text-white shadow-card">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-text">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-muted">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
