import { Bot, ChartNoAxesCombined, Gauge } from 'lucide-react';

const comparisons = [
  {
    icon: Gauge,
    title: 'Website graders give scores.',
    description: 'Clerify explains what the issues mean.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Analytics tools show behavior.',
    description: 'Clerify helps decide what to fix first.',
  },
  {
    icon: Bot,
    title: 'AI gives a first direction.',
    description: 'Rocio adds human UX/UI judgment.',
  },
];

export default function ComparisonSection() {
  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-card sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              Different by design
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-text sm:text-5xl">
              Why not just use a website grader?
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Website graders can tell you about speed, SEO, or technical checks.
              Analytics tools can show what users do once you have traffic. Clerify
              focuses on something different: helping you understand whether your
              website feels clear, trustworthy, and easy to act on — then giving you
              a human path to improve it.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {comparisons.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-3xl border border-border bg-bg p-5">
                <Icon className="text-primary" size={24} aria-hidden="true" />
                <h3 className="mt-4 font-heading text-xl font-semibold text-text">{title}</h3>
                <p className="mt-2 leading-7 text-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
