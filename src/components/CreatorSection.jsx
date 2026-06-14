import { ArrowRight, BadgeCheck, Code2, Layers3, Palette, Sparkles } from 'lucide-react';
import rocioPhoto from '../assets/rocio-jalifi.jpeg';

const credibilityPoints = [
  'Software developer with real product experience',
  'UX/UI designer focused on clarity, usability, and visual polish',
  'Combines technical understanding with design thinking',
  'Helps small businesses improve trust, clarity, and conversion',
];

const tags = ['UX/UI', 'Frontend', 'Website audits', 'Redesigns'];

export default function CreatorSection() {
  return (
    <section id="creator" className="bg-bg py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
            Who’s behind Clerify?
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold text-text sm:text-5xl">
            A first AI direction, backed by human UX/UI judgment
          </h2>

          <div className="mt-6 space-y-5 text-lg leading-8 text-muted">
            <p className="font-semibold text-text">
              Hi, I’m Rocio — a software developer and UX/UI designer
            </p>
            <p>
              I created Clerify to help small businesses understand why their website
              feels confusing, unclear, or outdated. AI can give you a first
              direction, but real UX/UI improvement needs human judgment: understanding
              your audience, your offer, your goals, and how people actually experience
              your website.
            </p>
            <p>
              I can help you turn the audit into practical improvements: clearer
              structure, stronger visual hierarchy, better calls-to-action, cleaner UI,
              and a website that feels more trustworthy and easier to use.
            </p>
          </div>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {credibilityPoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 rounded-2xl border border-border bg-surface p-4 text-sm font-semibold leading-6 text-text"
              >
                <BadgeCheck className="mt-0.5 shrink-0 text-success" size={19} aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:hello@example.com?subject=Work%20with%20Rocio"
              aria-label="Work with Rocio"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-primaryDark"
            >
              Work with Rocio
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="mailto:hello@example.com?subject=Deeper%20UX/UI%20audit"
              aria-label="Request a deeper audit"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3.5 font-bold text-text transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
            >
              Request a deeper audit
            </a>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-border bg-surface p-6 shadow-card sm:p-8">
          <div className="rounded-[1.5rem] bg-primaryDark p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-card">
                <img
                  src={rocioPhoto}
                  alt="Rocio Jalifi"
                  className="h-full w-full scale-125 object-cover object-[73%_34%]"
                />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold">Rocio Jalifi</h3>
                <p className="mt-1 text-sm font-semibold text-white/70">
                  Software Developer · UX/UI Designer
                </p>
              </div>
            </div>

            <p className="mt-6 text-lg leading-8 text-white/78">
              I help websites feel clearer, more polished, and easier to use.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <MiniMetric icon={Code2} label="Builds" value="Frontend" />
            <MiniMetric icon={Palette} label="Improves" value="UX/UI" />
            <MiniMetric icon={Layers3} label="Focus" value="Clarity" />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accentSoft px-3 py-1.5 text-sm font-bold text-primaryDark"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-surfaceSoft p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-primary">
              <Sparkles size={16} aria-hidden="true" />
              Human review adds context
            </div>
            <p className="leading-7 text-muted">
              Clerify starts the conversation. A deeper review connects the findings
              to your brand, users, offer, and actual business goals.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function MiniMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-bg p-4">
      <Icon className="mb-3 text-primary" size={20} aria-hidden="true" />
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-1 font-heading text-sm font-bold text-text">{value}</p>
    </div>
  );
}
