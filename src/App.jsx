import { useRef, useState } from 'react';
import {
  Accessibility,
  BadgeCheck,
  Eye,
  MousePointerClick,
  Navigation,
  PanelsTopLeft,
  Rocket,
  Sparkles,
} from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureCard from './components/FeatureCard';
import AuditReport from './components/AuditReport';
import CTASection from './components/CTASection';
import ExampleInsightCard from './components/ExampleInsightCard';
import CreatorSection from './components/CreatorSection';
import ServiceLadderSection from './components/ServiceLadderSection';
import ContactRequestForm from './components/ContactRequestForm';
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

export default function App() {
  const [auditResult, setAuditResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState('Human homepage review');
  const reportRef = useRef(null);
  const contactRef = useRef(null);

  const handleRequestService = (serviceInterest = 'Human homepage review') => {
    setSelectedService(serviceInterest);
    window.setTimeout(() => {
      contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

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
        <HeroSection
          onSubmit={handleAuditSubmit}
          isLoading={isLoading}
          apiError={error}
        />

        <div ref={reportRef}>
          {auditResult?.audit && (
            <AuditReport
              audit={auditResult.audit}
              source={auditResult.source}
              analysisStatus={auditResult.analysisStatus}
              extractionMethod={auditResult.extractionMethod}
              scoreAvailable={auditResult.scoreAvailable}
              onRequestService={handleRequestService}
            />
          )}
        </div>

        <section id="checks" className="bg-surface py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                What Clerify checks
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-text sm:text-5xl">
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

        <ExampleInsightCard />
        <CreatorSection />
        <ServiceLadderSection onRequestService={handleRequestService} />
        <CTASection />

        <div ref={contactRef}>
          <ContactRequestForm selectedService={selectedService} />
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
