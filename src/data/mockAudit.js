export const mockAudit = {
  summary: {
    websiteUrl: 'https://example.com',
    businessType: 'Demo business',
    mainGoal: 'Improve clarity',
    firstImpression:
      'This development fallback is based on sample content, not a live AI result. The page appears credible, but the offer and primary next step should become easier to understand within the first few seconds.',
    overallScore: 72,
  },
  positives: [
    {
      title: 'Trustworthy foundation',
      description: 'The brand already has enough structure to feel credible to a new visitor.',
    },
    {
      title: 'Clear service potential',
      description: 'The page has content that could support a stronger conversion path.',
    },
    {
      title: 'Room for focused improvements',
      description: 'Most opportunities are practical messaging, hierarchy, and CTA fixes.',
    },
  ],
  uxIssues: [
    {
      title: 'Primary CTA needs more clarity',
      description: 'The main action is not repeated or framed strongly enough.',
      impact: 'high',
      recommendation: 'Make the primary CTA specific and place it near key decision points.',
    },
    {
      title: 'Offer explanation is slow',
      description: 'Visitors may need to read too much before understanding the value.',
      impact: 'high',
      recommendation: 'Clarify the offer, audience, and outcome in the hero section.',
    },
    {
      title: 'Page flow could be tighter',
      description: 'The content order can better guide visitors from problem to proof to action.',
      impact: 'medium',
      recommendation: 'Reorder sections around visitor decision-making.',
    },
  ],
  uiIssues: [
    {
      title: 'Typography hierarchy is weak',
      description: 'Important messages do not stand apart enough from supporting text.',
      impact: 'medium',
      recommendation: 'Use clearer heading sizes, weights, and spacing.',
    },
    {
      title: 'Button styles feel inconsistent',
      description: 'CTA treatment should feel more intentional and recognizable.',
      impact: 'medium',
      recommendation: 'Create one primary button style and use it consistently.',
    },
    {
      title: 'Section spacing feels uneven',
      description: 'Visual rhythm can be improved to make the page feel more premium.',
      impact: 'low',
      recommendation: 'Standardize section padding and content width.',
    },
  ],
  priorityFixes: [
    {
      priority: 'high',
      title: 'Rewrite the hero for instant clarity',
      description: 'Make the offer, audience, benefit, and CTA obvious above the fold.',
    },
    {
      priority: 'medium',
      title: 'Simplify the conversion path',
      description: 'Guide visitors through proof, benefits, and action in a cleaner order.',
    },
    {
      priority: 'low',
      title: 'Polish the visual system',
      description: 'Tighten typography, buttons, spacing, and section rhythm.',
    },
  ],
  finalRecommendation:
    'Start with clarity above the fold. A sharper headline and stronger CTA will make every later section work harder.',
  ctaSuggestion: {
    headline: 'Want me to improve this for you?',
    body: 'Turn the audit into a clearer homepage, stronger CTA, and a more confident user journey.',
    primaryButton: 'Book a UX/UI review',
    secondaryButton: 'Get a homepage redesign',
  },
  limitations: [
    'This is development fallback data, not a live AI audit.',
    'A real audit requires fetched website context and an OpenAI API key.',
    'Visual and mobile feedback is limited until screenshot analysis is added.',
  ],
};
