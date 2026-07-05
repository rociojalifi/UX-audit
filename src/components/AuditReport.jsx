import ReportSection from './ReportSection';
import PostAuditCTA from './PostAuditCTA';

const impactClasses = {
  high: 'bg-error/10 text-error border-error/20',
  medium: 'bg-warning/12 text-primaryDark border-warning/25',
  low: 'bg-success/10 text-success border-success/20',
};

export default function AuditReport({
  audit,
  source,
  analysisStatus,
  extractionMethod,
  scoreAvailable,
  onRequestService = () => {},
}) {
  const { summary } = audit;
  const isLimited = analysisStatus === 'limited';

  return (
    <section id="report" className="bg-bg py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              Your report
            </p>
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-primary shadow-sm">
              {source === 'ai' ? 'AI generated' : source === 'limited' ? 'Limited extraction' : 'Development fallback'}
            </span>
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold text-text sm:text-4xl">
            UX/UI mini-audit for: <span className="break-all">{summary.websiteUrl}</span>
          </h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-muted">
            <span className="rounded-full bg-surfaceSoft px-4 py-2">Goal: {summary.mainGoal}</span>
            <span className="rounded-full bg-surfaceSoft px-4 py-2">Business: {summary.businessType}</span>
            <span className="rounded-full bg-primarySoft px-4 py-2 text-primary">
              {scoreAvailable === false || summary.overallScore == null
                ? 'Score unavailable'
                : `Score: ${Math.round(summary.overallScore)}/100`}
            </span>
            {extractionMethod && (
              <span className="rounded-full bg-surfaceSoft px-4 py-2 capitalize">
                Source: {extractionMethod.replace('-', ' ')}
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-5">
          {isLimited && (
            <div className="rounded-[2.25rem] border border-warning/30 bg-warning/10 p-6 text-primaryDark shadow-sm">
              <p className="text-sm font-black uppercase tracking-[0.14em]">Limited audit</p>
              <p className="mt-2 max-w-3xl leading-7">
                This website appears to rely on JavaScript rendering, and Clerify could not fully access the rendered page content. The results below may be incomplete.
              </p>
            </div>
          )}

          <ReportSection title="First impression" accent="ink">
            <p className="leading-8 text-muted">{summary.firstImpression}</p>
          </ReportSection>

          {!isLimited && <>
            <div className="grid gap-5 lg:grid-cols-3">
              <ReportSection title="What you are doing well" accent="leaf"><TitledList items={audit.positives} /></ReportSection>
              <ReportSection title="UX issues" accent="coral"><IssueList items={audit.uxIssues} /></ReportSection>
              <ReportSection title="UI issues" accent="sky"><IssueList items={audit.uiIssues} /></ReportSection>
            </div>

            <ReportSection title="Priority fixes" accent="coral">
            <div className="grid gap-4 md:grid-cols-3">
              {audit.priorityFixes.map((fix) => (
                  <article key={`${fix.priority}-${fix.title}`} className="rounded-3xl border border-border bg-bg p-5">
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-primary">
                    {fix.priority} priority
                  </p>
                  <h4 className="mt-3 font-heading text-lg font-semibold text-text">{formatTitle(fix.title)}</h4>
                  <p className="mt-2 leading-7 text-muted">{fix.description}</p>
                </article>
              ))}
            </div>
          </ReportSection>

          <ReportSection title="Final recommendation" accent="ink">
            <p className="leading-8 text-muted">{audit.finalRecommendation}</p>
          </ReportSection>
          </>}

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

          <PostAuditCTA onRequestService={onRequestService} />
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
