import { useState } from 'react';
import { Search } from 'lucide-react';

const goals = [
  'Get more bookings',
  'Get more leads',
  'Look more professional',
  'Improve clarity',
  'Improve conversion',
];

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function AuditForm({ onSubmit, isLoading, apiError }) {
  const [formData, setFormData] = useState({
    websiteUrl: '',
    businessType: '',
    mainGoal: goals[0],
  });
  const [error, setError] = useState('');

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.websiteUrl.trim()) {
      setError('Please enter your website URL.');
      return;
    }

    if (!isValidUrl(formData.websiteUrl.trim())) {
      setError('Please enter a valid link, including https:// or http://.');
      return;
    }

    onSubmit({
      ...formData,
      websiteUrl: formData.websiteUrl.trim(),
      businessType: formData.businessType.trim(),
    });
  };

  return (
    <section id="audit" className="bg-surface py-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
            Generate your report
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-text sm:text-4xl">
            Paste your website and get focused UX/UI feedback
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted">
            Clerify fetches the page content first, then generates an AI-assisted
            report based on UX/UI principles and the context it can verify.
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="rounded-[2.25rem] border border-border bg-bg p-5 shadow-card sm:p-8"
        >
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-text">Website URL</span>
              <input
                type="text"
                value={formData.websiteUrl}
                onChange={(event) => updateField('websiteUrl', event.target.value)}
                placeholder="https://example.com"
                className="rounded-2xl border border-border bg-surface px-4 py-3.5 text-text outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-text">Business type</span>
                <input
                  type="text"
                  value={formData.businessType}
                  onChange={(event) =>
                    updateField('businessType', event.target.value)
                  }
                  placeholder="Studio, coach, SaaS, shop..."
                  className="rounded-2xl border border-border bg-surface px-4 py-3.5 text-text outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-text">Main goal</span>
                <select
                  value={formData.mainGoal}
                  onChange={(event) => updateField('mainGoal', event.target.value)}
                  className="rounded-2xl border border-border bg-surface px-4 py-3.5 text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                >
                  {goals.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {(error || apiError) && (
            <div className="mt-5 rounded-2xl border border-error/25 bg-error/10 p-4 text-sm font-semibold leading-6 text-text">
              {error || apiError}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            <Search size={18} aria-hidden="true" />
            {isLoading ? 'Fetching context and auditing...' : 'Generate AI mini-audit'}
          </button>
        </form>
      </div>
    </section>
  );
}
