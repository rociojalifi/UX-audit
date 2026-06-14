import { ArrowRight, CalendarCheck, LayoutTemplate } from 'lucide-react';
import ReportSection from './ReportSection';

const impactClasses = {
  high: 'bg-coral/12 text-coral',
  medium: 'bg-sky/12 text-sky',
  low: 'bg-leaf/12 text-leaf',
};

export default function AuditReport({ audit, source }) {
  const { summary } = audit;

  return (
    <section id="report" className="bg-mist py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
              Your report
            </p>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-ink shadow-sm">
              {source === 'ai' ? 'AI generated' : 'Development fallback'}
            </span>
          </div>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
            UX/UI mini-audit for: <span className="break-all">{summary.websiteUrl}</span>
          </h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-ink/65">
            <span>Goal: {summary.mainGoal}</span>
            <span>Business: {summary.businessType}</span>
            <span>Score: {Math.round(summary.overallScore)}/100</span>
          </div>
        </div>

        <div className="grid gap-5">
          <ReportSection title="First impression" accent="ink">
            <p className="leading-8 text-ink/70">{summary.firstImpression}</p>
          </ReportSection>

          <div className="grid gap-5 lg:grid-cols-3">
            <ReportSection title="What you are doing well" accent="leaf">
              <TitledList items={audit.positives} />
            </ReportSection>
            <ReportSection title="UX issues" accent="coral">
              <IssueList items={audit.uxIssues} />
            </ReportSection>
            <ReportSection title="UI issues" accent="sky">
              <IssueList items={audit.uiIssues} />
            </ReportSection>
          </div>

          <ReportSection title="Priority fixes" accent="coral">
            <div className="grid gap-4 md:grid-cols-3">
              {audit.priorityFixes.map((fix) => (
                <article key={`${fix.priority}-${fix.title}`} className="rounded-2xl bg-mist p-5">
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-coral">
                    {fix.priority} priority
                  </p>
                  <h4 className="mt-3 text-lg font-black text-ink">{fix.title}</h4>
                  <p className="mt-2 leading-7 text-ink/65">{fix.description}</p>
                </article>
              ))}
            </div>
          </ReportSection>

          <ReportSection title="Final recommendation" accent="ink">
            <p className="leading-8 text-ink/70">{audit.finalRecommendation}</p>
          </ReportSection>

          <ReportSection title="Limitations" accent="sky">
            <ul className="space-y-3">
              {audit.limitations.map((limitation) => (
                <li key={limitation} className="leading-7 text-ink/70">
                  {limitation}
                </li>
              ))}
            </ul>
          </ReportSection>

          <div className="rounded-[2rem] bg-ink p-6 text-white shadow-soft sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
                  Next step
                </p>
                <h3 className="mt-3 text-3xl font-black">{audit.ctaSuggestion.headline}</h3>
                <p className="mt-3 max-w-2xl leading-8 text-white/70">
                  {audit.ctaSuggestion.body}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="mailto:hello@example.com?subject=UX/UI%20review"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-ink"
                >
                  <CalendarCheck size={18} aria-hidden="true" />
                  {audit.ctaSuggestion.primaryButton}
                </a>
                <a
                  href="mailto:hello@example.com?subject=Homepage%20redesign"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-ink"
                >
                  <LayoutTemplate size={18} aria-hidden="true" />
                  {audit.ctaSuggestion.secondaryButton}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TitledList({ items }) {
  return (
    <ol className="space-y-4">
      {items.map((item, index) => (
        <li key={`${item.title}-${index}`} className="leading-7 text-ink/70">
          <div className="mb-1 flex items-center gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-sm font-black text-white">
              {index + 1}
            </span>
            <strong className="text-ink">{item.title}</strong>
          </div>
          <p>{item.description}</p>
        </li>
      ))}
    </ol>
  );
}

function IssueList({ items }) {
  return (
    <ol className="space-y-5">
      {items.map((item, index) => (
        <li key={`${item.title}-${index}`} className="leading-7 text-ink/70">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-sm font-black text-white">
              {index + 1}
            </span>
            <strong className="text-ink">{item.title}</strong>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] ${
                impactClasses[item.impact] || impactClasses.medium
              }`}
            >
              {item.impact}
            </span>
          </div>
          <p>{item.description}</p>
          <p className="mt-2 font-semibold text-ink">{item.recommendation}</p>
        </li>
      ))}
    </ol>
  );
}
