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
    cta: 'Request review',
    action: 'Human homepage review',
    featured: true,
  },
  {
    title: 'UX/UI clarity audit',
    price: 'From €399',
    description:
      'A deeper audit for your homepage and key pages with a prioritized roadmap for better clarity, trust, and conversion.',
    includes: [
      'Homepage + key page review',
      'CTA and navigation review',
      'Trust signals review',
      'Mobile UX/UI review',
      'Prioritized improvement roadmap',
      'Loom walkthrough',
    ],
    cta: 'Request full audit',
    action: 'Full UX/UI clarity audit',
  },
  {
    title: 'Clarity redesign sprint',
    price: 'Custom',
    description:
      'Turn the audit into improved design. I can help redesign your homepage, improve the structure, and support implementation.',
    includes: [
      'UX/UI audit',
      'Homepage redesign direction',
      'Copy hierarchy improvements',
      'Mobile layout suggestions',
      'Optional frontend implementation',
    ],
    cta: 'Work with Rocio',
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
            Start with an AI-assisted first diagnosis, then bring in human UX/UI judgment
            when you want practical improvements, clearer decisions, and support turning
            findings into a stronger website.
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
      </div>
    </section>
  );
}
