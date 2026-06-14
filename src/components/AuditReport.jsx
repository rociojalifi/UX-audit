import { ArrowRight, CalendarCheck, LayoutTemplate } from 'lucide-react';
import { mockAudit } from '../data/mockAudit';
import ReportSection from './ReportSection';

export default function AuditReport({ submittedUrl }) {
  return (
    <section id="report" className="bg-mist py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
            Your report
          </p>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
            UX/UI mini-audit for: <span className="break-all">{submittedUrl}</span>
          </h2>
        </div>

        <div className="grid gap-5">
          <ReportSection title="First impression" accent="ink">
            <p className="leading-8 text-ink/70">{mockAudit.firstImpression}</p>
          </ReportSection>

          <div className="grid gap-5 lg:grid-cols-3">
            <ReportSection title="What you are doing well" accent="leaf">
              <NumberedList items={mockAudit.positives} />
            </ReportSection>
            <ReportSection title="UX issues" accent="coral">
              <NumberedList items={mockAudit.uxIssues} />
            </ReportSection>
            <ReportSection title="UI issues" accent="sky">
              <NumberedList items={mockAudit.uiIssues} />
            </ReportSection>
          </div>

          <ReportSection title="Priority fixes" accent="coral">
            <div className="grid gap-4 md:grid-cols-3">
              {mockAudit.priorityFixes.map((fix) => (
                <article key={fix.priority} className="rounded-2xl bg-mist p-5">
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-coral">
                    {fix.priority}
                  </p>
                  <h4 className="mt-3 text-lg font-black text-ink">{fix.title}</h4>
                  <p className="mt-2 leading-7 text-ink/65">{fix.description}</p>
                </article>
              ))}
            </div>
          </ReportSection>

          <ReportSection title="Final recommendation" accent="ink">
            <p className="leading-8 text-ink/70">{mockAudit.finalRecommendation}</p>
          </ReportSection>

          <div className="rounded-[2rem] bg-ink p-6 text-white shadow-soft sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
                  Next step
                </p>
                <h3 className="mt-3 text-3xl font-black">Want me to improve this for you?</h3>
                <p className="mt-3 max-w-2xl leading-8 text-white/70">
                  Turn the audit into a clearer homepage, stronger CTA, and a user
                  journey that feels intentional from the first click.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="mailto:hello@example.com?subject=UX/UI%20review"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-ink"
                >
                  <CalendarCheck size={18} aria-hidden="true" />
                  Book a UX/UI review
                </a>
                <a
                  href="mailto:hello@example.com?subject=Homepage%20redesign"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-ink"
                >
                  <LayoutTemplate size={18} aria-hidden="true" />
                  Get a homepage redesign
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NumberedList({ items }) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={item} className="flex gap-3 leading-7 text-ink/70">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-sm font-black text-white">
            {index + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}
