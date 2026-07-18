import { ArrowRight, LayoutTemplate } from 'lucide-react';

export default function PostAuditCTA({ onRequestService = () => {} }) {
  return (
    <div className="relative overflow-hidden rounded-[2.25rem] bg-primaryDark p-6 text-white shadow-card sm:p-8">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accentPink/20 blur-2xl" aria-hidden="true" />
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accentLime">
            Human UX/UI support
          </p>
          <h3 className="mt-3 font-heading text-3xl font-bold">
            Want help turning this into a better website?
          </h3>
          <p className="mt-3 max-w-2xl leading-8 text-white/72">
            Clerify gives you the first diagnosis. Rocio can help you go deeper
            with a human UX/UI review, clearer structure, stronger visuals, and
            practical redesign recommendations.
          </p>
          <p className="mt-3 text-sm font-semibold leading-6 text-accentLime">
            Every paid review includes a structured owner update with findings,
            priorities, and next steps.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <button
            type="button"
            onClick={() => onRequestService('Human homepage review')}
            className="relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-primaryDark transition hover:-translate-y-0.5 hover:bg-accentLime"
          >
            Request human review
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          <a
            href="#services"
            className="relative inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-primaryDark"
          >
            <LayoutTemplate size={18} aria-hidden="true" />
            See service options
          </a>
        </div>
      </div>
    </div>
  );
}
