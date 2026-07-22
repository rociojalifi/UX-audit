import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';

const serviceOptions = [
  'PDF clarity checklist',
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
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!selectedService) return;

    setFormData((current) => ({
      ...current,
      serviceInterest: serviceOptions.includes(selectedService)
        ? selectedService
        : 'Not sure yet',
    }));
    setStatus({ type: '', message: '' });
  }, [selectedService]);

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (event) => {
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

    setIsSending(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          name: formData.name.trim(),
          email: formData.email.trim(),
          websiteUrl: formData.websiteUrl.trim(),
          message: formData.message.trim(),
        }),
      });

      const payload = await safeJson(response);

      if (!response.ok) {
        if (response.status === 501 || response.status === 404) {
          window.location.href = buildMailtoUrl(formData);
          setStatus({
            type: 'success',
            message:
              'Your email app opened with the request details. Send that email to finish the request.',
          });
          return;
        }

        throw new Error(payload?.error?.message || 'The request could not be sent. Please try again.');
      }

      setStatus({
        type: 'success',
        message: 'Thanks — your request was sent to Clerify. I’ll get back to you soon.',
      });
      setFormData(initialFormData);
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error.message ||
          'The request could not be sent. Please email clerifyinfo@gmail.com directly.',
      });
    } finally {
      setIsSending(false);
    }
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
            Your request is sent to Clerify so Rocio can follow up with the right
            next step.
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

          {status.message && (
            <div
              className={`mt-5 rounded-2xl border p-4 text-sm font-semibold leading-6 text-text ${
                status.type === 'error'
                  ? 'border-error/25 bg-error/10'
                  : 'border-success/25 bg-success/10'
              }`}
            >
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSending}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            <Send size={18} aria-hidden="true" />
            {isSending ? 'Sending request...' : 'Send request'}
          </button>
        </form>
      </div>
    </section>
  );
}

async function safeJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function buildMailtoUrl(formData) {
  const subject = `Clerify request: ${formData.serviceInterest}`;
  const body = [
    `Name: ${formData.name.trim()}`,
    `Email: ${formData.email.trim()}`,
    `Website: ${formData.websiteUrl.trim() || 'Not provided'}`,
    `Service interest: ${formData.serviceInterest}`,
    '',
    'Message / goals:',
    formData.message.trim(),
  ].join('\n');

  return `mailto:clerifyinfo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
