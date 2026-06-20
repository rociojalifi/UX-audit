import { useRef, useState } from 'react';
import {
  Accessibility,
  BadgeCheck,
  Eye,
  ClipboardCheck,
  MousePointerClick,
  Navigation,
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
import ExampleInsightCard from './components/ExampleInsightCard';
import TrustSection from './components/TrustSection';
import CreatorSection from './components/CreatorSection';
import LimitationsSection from './components/LimitationsSection';
import Footer from './components/Footer';

const checks = [
  {
    icon: PanelsTopLeft,
    title: 'Clarity of your offer',
    description:
      'Can visitors quickly understand what you do, who it is for, and why it matters?',
  },
  {
    icon: MousePointerClick,
    title: 'CTA visibility',
    description:
      'Checks whether the main action is easy to find, understand, and repeat at the right moments.',
  },
  {
    icon: Navigation,
    title: 'Navigation flow',
    description:
      'Looks for confusing paths, unnecessary choices, or menus that slow people down.',
  },
  {
    icon: BadgeCheck,
    title: 'Trust signals',
    description:
      'Reviews whether proof, expertise, reviews, and credibility cues support the decision to act.',
  },
  {
    icon: Eye,
    title: 'Visual hierarchy',
    description:
      'Checks whether headings, sections, spacing, and emphasis guide attention clearly.',
  },
  {
    icon: Accessibility,
    title: 'Accessibility basics',
    description:
      'Flags basic readability, contrast, labeling, and content clarity concerns when inferable.',
  },
  {
    icon: Sparkles,
    title: 'Conversion friction',
    description:
      'Identifies unclear steps, weak messaging, or missing context that may reduce enquiries.',
  },
  {
    icon: Rocket,
    title: 'Mobile experience',
    description:
      'Notes mobile and responsive concerns when they can be inferred from the available page structure.',
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
  const [auditResult, setAuditResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const reportRef = useRef(null);

  const handleAuditSubmit = async (formData) => {
    setIsLoading(true);
    setError('');
    setAuditResult(null);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: formData.websiteUrl,
          businessType: formData.businessType,
          mainGoal: formData.mainGoal,
        }),
      });
      const responseText = await response.text();
      const payload = parseApiResponse(responseText);

      if (!response.ok) {
        throw new Error(
          payload?.error?.message ||
            `The audit could not be generated. Server returned status ${response.status}.`,
        );
      }

      if (!payload?.audit) {
        throw new Error('The audit response was empty. Please try again in a moment.');
      }

      setAuditResult(payload);
      window.setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      <Navbar />
      <main>
        <HeroSection />

        <section id="checks" className="bg-surface py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                What Clerify checks
              </p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold text-text sm:text-5xl">
                A practical audit of the moments that make websites feel clear or confusing
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                Clerify looks at the page through a UX/UI lens so the report feels
                actionable, not like a generic AI summary.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {checks.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <TrustSection />
        <CreatorSection />
        <ExampleInsightCard />

        <section className="bg-surface py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                Who it is for
              </p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold text-text sm:text-5xl">
                For websites that are almost there, but not quite converting
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                Clerify helps small business owners, founders, and service providers
                understand what to improve before investing in a redesign or deeper audit.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">
              {audiences.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <LimitationsSection />
        <CTASection />
        <AuditForm onSubmit={handleAuditSubmit} isLoading={isLoading} apiError={error} />

        <div ref={reportRef}>
          {auditResult?.audit && (
            <AuditReport
              audit={auditResult.audit}
              source={auditResult.source}
              analysisStatus={auditResult.analysisStatus}
              extractionMethod={auditResult.extractionMethod}
              scoreAvailable={auditResult.scoreAvailable}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function parseApiResponse(responseText) {
  if (!responseText) return null;

  try {
    return JSON.parse(responseText);
  } catch {
    return {
      error: {
        message:
          'The audit service returned an unexpected response. Please try again, or check the Vercel function logs.',
      },
    };
  }
}
