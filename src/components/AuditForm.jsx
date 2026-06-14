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

export default function AuditForm({ onSubmit, isLoading }) {
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
    <section id="audit" className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
            Free mini-audit
          </p>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
            Paste your website and get focused UX/UI feedback.
          </h2>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-ink/10 bg-mist p-5 shadow-soft sm:p-8"
        >
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-ink">Website URL</span>
              <input
                type="text"
                value={formData.websiteUrl}
                onChange={(event) => updateField('websiteUrl', event.target.value)}
                placeholder="https://example.com"
                className="rounded-2xl border border-ink/10 bg-white px-4 py-3.5 text-ink outline-none transition focus:border-coral focus:ring-4 focus:ring-coral/15"
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-ink">Business type</span>
                <input
                  type="text"
                  value={formData.businessType}
                  onChange={(event) =>
                    updateField('businessType', event.target.value)
                  }
                  placeholder="Studio, coach, SaaS, shop..."
                  className="rounded-2xl border border-ink/10 bg-white px-4 py-3.5 text-ink outline-none transition focus:border-coral focus:ring-4 focus:ring-coral/15"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-ink">Main goal</span>
                <select
                  value={formData.mainGoal}
                  onChange={(event) => updateField('mainGoal', event.target.value)}
                  className="rounded-2xl border border-ink/10 bg-white px-4 py-3.5 text-ink outline-none transition focus:border-coral focus:ring-4 focus:ring-coral/15"
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

          {error && <p className="mt-4 text-sm font-semibold text-coral">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-coral disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            <Search size={18} aria-hidden="true" />
            {isLoading ? 'Auditing your website...' : 'Generate mini-audit'}
          </button>
        </form>
      </div>
    </section>
  );
}
