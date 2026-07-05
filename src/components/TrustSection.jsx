import { BrainCircuit, Code2, Layers3, ShieldCheck } from 'lucide-react';

export default function TrustSection() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              AI-assisted, designer-informed
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-text sm:text-5xl">
              AI gives the first structure. UX/UI principles keep it useful
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Clerify uses AI to structure the first audit, but the criteria are
              based on real UX/UI principles: clarity, hierarchy, trust, usability,
              accessibility, and conversion flow.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TrustPoint
              icon={BrainCircuit}
              title="Structured analysis"
              description="The report turns page content into clear observations, issues, and next steps."
            />
            <TrustPoint
              icon={Layers3}
              title="UX/UI criteria"
              description="Feedback is organized around clarity, hierarchy, friction, and usability."
            />
            <TrustPoint
              icon={Code2}
              title="Built by Rocio"
              description="Created by a software developer and UX/UI designer for small business websites."
            />
            <TrustPoint
              icon={ShieldCheck}
              title="Honest limits"
              description="The audit explains what it can verify and where deeper human review helps."
            />
          </div>
        </div>

        <div className="mt-10 rounded-[2.25rem] border border-primaryDark/10 bg-primaryDark p-6 text-white shadow-card sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <h3 className="font-heading text-2xl font-semibold">
              Built by a UX/UI designer + software developer
            </h3>
            <p className="leading-8 text-white/74">
              Clerify was created by Rocio, a software developer and UX/UI designer,
              to help small businesses understand why their website feels confusing,
              outdated, or hard to use, and what to improve first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustPoint({ icon: Icon, title, description }) {
  return (
    <article className="rounded-3xl border border-border bg-bg p-5">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-accentLime text-primaryDark">
        <Icon size={22} aria-hidden="true" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-text">{title}</h3>
      <p className="mt-2 leading-7 text-muted">{description}</p>
    </article>
  );
}
