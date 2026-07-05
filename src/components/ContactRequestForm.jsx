import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';

const serviceOptions = [
  'Human homepage review',
  'Full UX/UI clarity audit',
  'Redesign sprint',
  'Not sure yet',
];

const initialFormData = {
  name: '',
  email: '',
  websiteUrl: '',
  serviceInterest: 'Human homepage review',
  message: '',
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidOptionalUrl(value) {
  if (!value.trim()) return true;

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function ContactRequestForm({ selectedService }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!selectedService) return;

    setFormData((current) => ({
      ...current,
      serviceInterest: serviceOptions.includes(selectedService)
        ? selectedService
        : 'Not sure yet',
    }));
    setIsSubmitted(false);
  }, [selectedService]);

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    setIsSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email.';
    } else if (!isValidEmail(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!isValidOptionalUrl(formData.websiteUrl.trim())) {
      nextErrors.websiteUrl = 'Please enter a valid URL including https:// or leave it empty.';
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Tell me a little about what you want to improve.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    // TODO: Connect this request form to email, CRM, or a backend endpoint.
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="bg-surface py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
            Request human support
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-text sm:text-5xl">
            Turn the audit into practical UX/UI improvements
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Share your website, goal, and the kind of help you are considering.
            This frontend form is ready for the next step: connecting it to email
            or a CRM when you choose the workflow.
          </p>
          <div className="mt-6 rounded-[1.5rem] border border-border bg-bg p-5">
            <p className="font-heading text-xl font-semibold text-text">
              A starting point, not a full redesign strategy
            </p>
            <p className="mt-2 leading-7 text-muted">
              The free AI-assisted mini-audit helps surface first priorities.
              A paid review adds human UX/UI judgment, mobile context, clearer
              decisions, and owner updates.
            </p>
          </div>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="rounded-[2.25rem] border border-border bg-bg p-5 shadow-card sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" error={errors.name}>
              <input
                type="text"
                value={formData.name}
                onChange={(event) => updateField('name', event.target.value)}
                className="rounded-2xl border border-border bg-surface px-4 py-3.5 text-text outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                autoComplete="name"
              />
            </Field>

            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={formData.email}
                onChange={(event) => updateField('email', event.target.value)}
                className="rounded-2xl border border-border bg-surface px-4 py-3.5 text-text outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                autoComplete="email"
              />
            </Field>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Website URL" error={errors.websiteUrl}>
              <input
                type="text"
                value={formData.websiteUrl}
                onChange={(event) => updateField('websiteUrl', event.target.value)}
                placeholder="https://example.com"
                className="rounded-2xl border border-border bg-surface px-4 py-3.5 text-text outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </Field>

            <Field label="Service interest">
              <select
                value={formData.serviceInterest}
                onChange={(event) => updateField('serviceInterest', event.target.value)}
                className="rounded-2xl border border-border bg-surface px-4 py-3.5 text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              >
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Message / goals" error={errors.message} className="mt-5">
            <textarea
              value={formData.message}
              onChange={(event) => updateField('message', event.target.value)}
              rows={5}
              placeholder="What feels unclear, what do you want visitors to do, or what would you like reviewed?"
              className="resize-y rounded-2xl border border-border bg-surface px-4 py-3.5 text-text outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </Field>

          {isSubmitted && (
            <div className="mt-5 rounded-2xl border border-success/25 bg-success/10 p-4 text-sm font-semibold leading-6 text-text">
              Thanks — your request is captured in the UI. Email/CRM delivery still needs to be connected.
            </div>
          )}

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-primaryDark sm:w-auto"
          >
            <Send size={18} aria-hidden="true" />
            Send request
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, error, className = '', children }) {
  return (
    <label className={`grid gap-2 ${className}`}>
      <span className="text-sm font-bold text-text">{label}</span>
      {children}
      {error && <span className="text-sm font-semibold text-error">{error}</span>}
    </label>
  );
}
