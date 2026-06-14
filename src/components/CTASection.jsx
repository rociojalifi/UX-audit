import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <h2 className="text-3xl font-black text-ink sm:text-5xl">
          Good design is not decoration. It is direction.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink/65">
          A focused UX/UI review helps you see what your visitors see: unclear
          messages, missed trust cues, weak calls-to-action, and simple fixes that
          can make the whole website feel easier to choose.
        </p>
        <a
          href="#audit"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-3.5 font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-ink"
        >
          Start the mini-audit
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
