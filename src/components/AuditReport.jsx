import { CalendarCheck, LayoutTemplate } from 'lucide-react';
import ReportSection from './ReportSection';

const impactClasses = {
  high: 'bg-error/10 text-error border-error/20',
  medium: 'bg-warning/12 text-primaryDark border-warning/25',
  low: 'bg-success/10 text-success border-success/20',
};

export default function AuditReport({ audit, source }) {
  const { summary } = audit;

  return (
    <section id="report" className="bg-bg py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              Your report
            </p>
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-primary shadow-sm">
              {source === 'ai' ? 'AI generated' : 'Development fallback'}
            </span>
          </div>
          <h2 className="mt-3 font-heading text-3xl font-extrabold text-text sm:text-4xl">
            UX/UI mini-audit for: <span className="break-all">{summary.websiteUrl}</span>
          </h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-muted">
            <span className="rounded-full bg-surfaceSoft px-4 py-2">Goal: {summary.mainGoal}</span>
            <span className="rounded-full bg-surfaceSoft px-4 py-2">Business: {summary.businessType}</span>
            <span className="rounded-full bg-primarySoft px-4 py-2 text-primary">Score: {Math.round(summary.overallScore)}/100</span>
          </div>
        </div>

        <div className="grid gap-5">
          <ReportSection title="First impression" accent="ink">
            <p className="leading-8 text-muted">{summary.firstImpression}</p>
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
                <article key={`${fix.priority}-${fix.title}`} className="rounded-2xl border border-border bg-bg p-5">
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-primary">
                    {fix.priority} priority
                  </p>
                  <h4 className="mt-3 font-heading text-lg font-bold text-text">{formatTitle(fix.title)}</h4>
                  <p className="mt-2 leading-7 text-muted">{fix.description}</p>
                </article>
              ))}
            </div>
          </ReportSection>

          <ReportSection title="Final recommendation" accent="ink">
            <p className="leading-8 text-muted">{audit.finalRecommendation}</p>
          </ReportSection>

          <ReportSection title="Limitations" accent="sky">
            <ul className="grid gap-3 sm:grid-cols-3">
              {audit.limitations.map((limitation, index) => (
                <li
                  key={`${limitation}-${index}`}
                  className="rounded-2xl border border-border bg-bg p-4 text-sm font-semibold leading-6 text-muted"
                >
                  {limitation}
                </li>
              ))}
            </ul>
          </ReportSection>

          <div className="rounded-[2rem] bg-primaryDark p-6 text-white shadow-card sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                  Human UX/UI review
                </p>
                <h3 className="mt-3 font-heading text-3xl font-extrabold">
                  Want to turn these insights into a better website
                </h3>
                <p className="mt-3 max-w-2xl leading-8 text-white/70">
                  Clerify gives you the first direction. Rocio can help you go deeper
                  with a human UX/UI review, clearer structure, stronger visuals, and
                  practical redesign recommendations.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="mailto:hello@example.com?subject=Work%20with%20Rocio"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-primaryDark transition hover:-translate-y-0.5 hover:bg-accentSoft"
                >
                  <CalendarCheck size={18} aria-hidden="true" />
                  Work with Rocio
                </a>
                <a
                  href="mailto:hello@example.com?subject=Full%20UX/UI%20audit"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-primaryDark"
                >
                  <LayoutTemplate size={18} aria-hidden="true" />
                  Request a full UX/UI audit
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
        <li key={`${item.title}-${index}`} className="leading-7 text-muted">
          <div className="mb-1 flex items-center gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-black text-white">
              {index + 1}
            </span>
            <strong className="text-text">{formatTitle(item.title)}</strong>
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
        <li key={`${item.title}-${index}`} className="leading-7 text-muted">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-black text-white">
              {index + 1}
            </span>
            <strong className="text-text">{formatTitle(item.title)}</strong>
            <span
              className={`rounded-full border px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] ${
                impactClasses[item.impact] || impactClasses.medium
              }`}
            >
              {item.impact}
            </span>
          </div>
          <p>{item.description}</p>
          <p className="mt-2 font-semibold text-text">{item.recommendation}</p>
        </li>
      ))}
    </ol>
  );
}

function formatTitle(value) {
  return String(value || '').replace(/\.+$/, '');
}
