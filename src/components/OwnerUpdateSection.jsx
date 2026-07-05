import OwnerUpdateStep from './OwnerUpdateStep';

const steps = [
  {
    title: 'What I reviewed',
    example: 'Homepage hero, navigation, CTA flow, mobile first impression.',
  },
  {
    title: 'What I found',
    example: 'The offer is clear after scrolling, but not in the first 5 seconds.',
  },
  {
    title: 'Why it matters',
    example: 'Users may leave before understanding what you do or why they should trust you.',
  },
  {
    title: 'What I recommend',
    example: 'Rewrite the hero around one clear promise and one primary action.',
  },
  {
    title: 'Before/after example',
    example: 'Screenshot, wireframe, or rewritten section.',
  },
  {
    title: 'What happens next',
    example: 'Next I’ll review your service page and booking/contact flow.',
  },
];

export default function OwnerUpdateSection() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              The Clerify Owner Update
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-text sm:text-5xl">
              No mystery redesigns
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              You won’t just receive a generic report and wonder what to do next.
              Every paid Clerify review includes a structured owner update, so you
              always know what was reviewed, what I found, why it matters, and what
              I recommend next.
            </p>
            <p className="mt-6 rounded-[1.75rem] border border-primary/15 bg-primarySoft/60 p-5 font-heading text-xl font-semibold leading-8 text-primaryDark">
              No vague feedback. No mystery redesigns. Just clear findings,
              decisions, and next steps.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <OwnerUpdateStep key={step.title} number={index + 1} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
