import ServiceCard from './ServiceCard';

const services = [
  {
    title: 'Free mini-audit',
    price: 'Free',
    description:
      'Get a quick AI-assisted UX/UI report with what is working, what feels unclear, and what to improve first.',
    includes: [
      'Website URL audit',
      'First impression',
      'UX/UI issues',
      'Priority fixes',
      'Limitations',
    ],
    cta: 'Start free audit',
    action: 'audit',
  },
  {
    title: 'PDF clarity checklist',
    price: '€19',
    description:
      'A downloadable checklist version of your audit findings so you can review priorities and work through fixes yourself.',
    includes: [
      'One-page clarity checklist',
      'Summary of priority fixes',
      'CTA and offer clarity prompts',
      'No live human review',
    ],
    cta: 'Request checklist',
    action: 'PDF clarity checklist',
  },
  {
    title: 'Human homepage review',
    price: 'From €149',
    description:
      'A focused review by Rocio of your homepage, clarity, CTA, visual hierarchy, and trust signals.',
    includes: [
      'Desktop and mobile review',
      '5–7 priority issues',
      'Loom video explanation',
      'Practical action checklist',
      '3 quick wins',
    ],
    cta: 'Request human review',
    action: 'Human homepage review',
    featured: true,
  },
  {
    title: 'Redesign support',
    price: 'Custom',
    description:
      'Turn the audit into improved design, deeper UX/UI clarity work, or implementation support for your key pages.',
    includes: [
      'Deeper UX/UI clarity audit',
      'Homepage redesign direction',
      'Key page review',
      'Copy hierarchy improvements',
      'Mobile layout suggestions',
      'Optional frontend implementation',
    ],
    cta: 'Request human review',
    action: 'Redesign sprint',
  },
];

export default function ServiceLadderSection({ onRequestService }) {
  const handleAction = (service) => {
    if (service.action === 'audit') {
      document.querySelector('#audit')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    onRequestService(service.action);
  };

  return (
    <section id="services" className="bg-bg py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
            Service options
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-text sm:text-5xl">
            Choose how deep you want to go
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Start free, then choose a deeper human review or redesign support when
            you want practical improvements and clearer next steps.
          </p>
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              {...service}
              onRequest={() => handleAction(service)}
            />
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm font-semibold leading-6 text-muted">
          Prices can vary depending on page count, complexity, and whether you need
          implementation support.
        </p>

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 rounded-[2rem] border border-border bg-surface p-5 shadow-card md:grid-cols-[0.9fr_1.1fr] md:items-center sm:p-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              No mystery redesigns
            </p>
            <h3 className="mt-2 font-heading text-2xl font-bold text-text">
              Every paid review includes a clear owner update
            </h3>
            <p className="mt-3 leading-7 text-muted">
              You’ll know what I reviewed, what I found, why it matters, and what I
              recommend next.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {['What I reviewed', 'What I found', 'Why it matters', 'What happens next'].map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-border bg-bg px-4 py-3 text-sm font-semibold text-text"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
