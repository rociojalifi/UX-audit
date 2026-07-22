import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, LoaderCircle, Mail, Search } from 'lucide-react';

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function EmailUnlockStep({
  auditRequest,
  isLoading,
  error,
  onBack,
  onSubmit,
}) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setEmailError('Please enter your email to unlock your report.');
      return;
    }

    if (!isValidEmail(email.trim())) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setEmailError('');
    onSubmit(email.trim());
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-primaryDark/35 px-5 py-8 backdrop-blur-sm">
      <section
        aria-modal="true"
        role="dialog"
        aria-labelledby="email-unlock-title"
        className="relative w-full max-w-xl overflow-hidden rounded-[2.25rem] border border-border bg-surface p-5 shadow-soft sm:p-7"
      >
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accentPink/20 blur-2xl" aria-hidden="true" />
        <div className="relative">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-2 text-sm font-semibold text-muted transition hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back
          </button>

          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primarySoft text-primary ring-4 ring-accentBlueSoft/35">
            <Mail size={22} aria-hidden="true" />
          </div>

          <h2
            id="email-unlock-title"
            className="mt-5 font-heading text-3xl font-bold leading-tight text-text"
          >
            Enter your email to see your results.
          </h2>
          <p className="mt-3 leading-7 text-muted">
            Your audit is ready to run for{' '}
            <span className="font-semibold text-text">{auditRequest?.websiteUrl}</span>.
          </p>

          <form noValidate onSubmit={handleSubmit} className="mt-6">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-text">Email</span>
              <input
                ref={inputRef}
                type="email"
                value={email}
                disabled={isLoading}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError('');
                }}
                placeholder="you@example.com"
                autoComplete="email"
                className="rounded-2xl border border-border bg-surface px-4 py-3.5 text-text outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-surfaceSoft disabled:text-muted"
              />
              <span className="text-sm font-semibold leading-6 text-muted">
                Required to unlock your free mini-audit. No confirmation email yet, no spam.
              </span>
            </label>

            {(emailError || error) && (
              <div className="mt-4 rounded-2xl border border-error/25 bg-error/10 p-4 text-sm font-semibold leading-6 text-text">
                {emailError || error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin" size={18} aria-hidden="true" />
              ) : (
                <Search size={18} aria-hidden="true" />
              )}
              {isLoading ? 'Preparing your audit...' : 'See my results'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
