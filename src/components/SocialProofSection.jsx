import { ExternalLink, Linkedin, ShieldCheck, Sparkles } from 'lucide-react';

const testimonials = [
  {
    name: 'Marieke V.',
    role: 'Life Coach',
    quote:
      "I knew my homepage wasn't converting but I couldn't figure out why. Clerify pointed out that my whole first screen was about me instead of what I could do for my clients. Fixed it in an afternoon and bookings went up.",
  },
  {
    name: 'Louisa R.',
    role: 'Freelance Photographer',
    quote:
      "I've paid for 'professional' audits before that gave me a generic checklist. This actually looked at my specific page and told me exactly where people were probably getting confused. The CTA feedback alone was worth it.",
  },
  {
    name: 'Jessica K.',
    role: 'Online Course Creator',
    quote:
      "As someone who isn't a designer, I never knew why my site felt off — just that it did. Clerify explained it in plain language and gave me one thing to fix first instead of overwhelming me with 20 tasks.",
  },
];

const proofCards = [
  {
    icon: Sparkles,
    title: 'Example audit insight included',
    description:
      'Visitors can see the kind of practical clarity feedback Clerify gives before submitting their own site.',
  },
  {
    icon: ShieldCheck,
    title: 'Built by a real UX/UI practitioner',
    description:
      'Clerify is created by Rocio Jalifi, combining frontend development with UX/UI design judgment.',
  },
];

export default function SocialProofSection() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
            Proof, not mystery
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-text sm:text-5xl">
            Clearer websites, faster decisions
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Clerify is built for business owners who know something feels unclear,
            but need practical direction on what to fix first.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.slice(0, 4).map((testimonial) => (
              <TestimonialCard key={`${testimonial.name}-${testimonial.role}`} {...testimonial} />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-5 sm:grid-cols-2">
              {proofCards.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-[2rem] border border-border bg-bg p-6 shadow-sm"
                >
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-primarySoft text-primary ring-4 ring-accentBlueSoft/35">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-text">
                    {title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted">{description}</p>
                </article>
              ))}
            </div>

            <aside className="rounded-[2rem] border border-primary/10 bg-primarySoft/55 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                Curious about Rocio?
              </p>
              <p className="mt-3 leading-7 text-muted">
                Review the portfolio and LinkedIn profile behind Clerify before
                pasting your website URL.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://rociojalifi.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:text-primaryDark"
                >
                  Portfolio
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/jalifirocio/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:text-primaryDark"
                >
                  LinkedIn
                  <Linkedin size={15} aria-hidden="true" />
                </a>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

function TestimonialCard({ name, role, quote, avatar }) {
  return (
    <article className="rounded-[2rem] border border-border bg-bg p-6 shadow-sm">
      <div className="flex items-center gap-3">
        {avatar && (
          <img
            src={avatar}
            alt=""
            className="h-11 w-11 rounded-full object-cover"
            aria-hidden="true"
          />
        )}
        <div>
          <h3 className="font-heading text-base font-semibold text-text">{name}</h3>
          <p className="text-sm font-semibold text-muted">{role}</p>
        </div>
      </div>
      <blockquote className="mt-5 leading-7 text-muted">“{quote}”</blockquote>
    </article>
  );
}
