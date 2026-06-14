export const mockAudit = {
  firstImpression:
    'The website has a solid foundation, but the first screen asks visitors to work too hard to understand the offer. The visual style feels credible, yet the message and main next step need more confidence and focus.',
  positives: [
    'The brand already feels trustworthy enough to make visitors pause and explore.',
    'There are clear signs of expertise, especially in the way the offer is presented.',
    'The page has enough content to support a stronger conversion path with better structure.',
  ],
  uxIssues: [
    'The main call-to-action is not clear or repeated enough for quick decision-making.',
    'The navigation could be simplified so visitors immediately know where to go next.',
    'The homepage does not explain the offer fast enough above the fold.',
  ],
  uiIssues: [
    'Typography hierarchy is weak, making important messages feel similar to secondary details.',
    'Button styles are inconsistent, which makes the primary action feel less intentional.',
    'Spacing between sections feels uneven and reduces the sense of polish.',
  ],
  priorityFixes: [
    {
      priority: 'High priority',
      title: 'Clarify the hero message and CTA',
      description:
        'Make the offer, target audience, and next step obvious within the first few seconds.',
    },
    {
      priority: 'Medium priority',
      title: 'Simplify the page flow',
      description:
        'Reorder the content so visitors move naturally from problem, to value, to proof, to action.',
    },
    {
      priority: 'Low priority',
      title: 'Polish the visual system',
      description:
        'Tighten typography, spacing, and button styles so the experience feels more premium.',
    },
  ],
  finalRecommendation:
    'Start by improving clarity above the fold. A sharper headline, stronger CTA, and cleaner hierarchy will help visitors understand the value faster and make the rest of the page work harder.',
};
