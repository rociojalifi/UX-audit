import { useRef, useState } from 'react';
import {
  ClipboardCheck,
  MousePointerClick,
  PanelsTopLeft,
  Rocket,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureCard from './components/FeatureCard';
import AuditForm from './components/AuditForm';
import AuditReport from './components/AuditReport';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const checks = [
  {
    icon: PanelsTopLeft,
    title: 'First-screen clarity',
    description:
      'Checks whether visitors can quickly understand what you offer, who it is for, and what to do next.',
  },
  {
    icon: MousePointerClick,
    title: 'Conversion flow',
    description:
      'Looks at calls-to-action, navigation, and page structure through a practical UX lens.',
  },
  {
    icon: Sparkles,
    title: 'Visual polish',
    description:
      'Reviews typography, spacing, consistency, and hierarchy so the site feels more intentional.',
  },
];

const audiences = [
  {
    icon: UsersRound,
    title: 'Founders and service providers',
    description:
      'For people who know their website could work harder but need a clear place to start.',
  },
  {
    icon: ClipboardCheck,
    title: 'Small teams before a redesign',
    description:
      'Useful before investing in a full redesign, landing page refresh, or conversion sprint.',
  },
  {
    icon: Rocket,
    title: 'Creators launching offers',
    description:
      'A quick way to spot confusing moments before sending more traffic to the page.',
  },
];

export default function App() {
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const reportRef = useRef(null);

  const handleAuditSubmit = (formData) => {
    setIsLoading(true);
    setSubmittedUrl('');

    window.setTimeout(() => {
      setSubmittedUrl(formData.websiteUrl);
      setIsLoading(false);
      window.setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-mist font-sans text-ink">
      <Navbar />
      <main>
        <HeroSection />

        <section id="checks" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
                What the tool checks
              </p>
              <h2 className="mt-3 text-3xl font-black text-ink sm:text-5xl">
                A mini-audit with the eyes of a UX/UI designer.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {checks.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-mist py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
                Who it is for
              </p>
              <h2 className="mt-3 text-3xl font-black text-ink sm:text-5xl">
                For websites that are almost there, but not quite converting.
              </h2>
              <p className="mt-5 text-lg leading-8 text-ink/65">
                This MVP gives visitors a fast taste of expert UX/UI thinking, then
                makes it easy to ask for hands-on help.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">
              {audiences.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <CTASection />
        <AuditForm onSubmit={handleAuditSubmit} isLoading={isLoading} />

        <div ref={reportRef}>
          {submittedUrl && <AuditReport submittedUrl={submittedUrl} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
