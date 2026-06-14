import * as cheerio from 'cheerio';

const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const FETCH_TIMEOUT_MS = 9000;
const MAX_BODY_TEXT_LENGTH = 6500;
const DEFAULT_LIMITATIONS = [
  'This audit is based on the fetched page content only.',
  'Visual design feedback is limited unless screenshots or rendered page analysis are added.',
  'Mobile behavior could not be fully verified from static HTML alone.',
];

export const config = {
  maxDuration: 30,
};

const auditJsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'summary',
    'positives',
    'uxIssues',
    'uiIssues',
    'priorityFixes',
    'finalRecommendation',
    'ctaSuggestion',
    'limitations',
  ],
  properties: {
    summary: {
      type: 'object',
      additionalProperties: false,
      required: ['websiteUrl', 'businessType', 'mainGoal', 'firstImpression', 'overallScore'],
      properties: {
        websiteUrl: { type: 'string' },
        businessType: { type: 'string' },
        mainGoal: { type: 'string' },
        firstImpression: { type: 'string' },
        overallScore: { type: 'number', minimum: 0, maximum: 100 },
      },
    },
    positives: {
      type: 'array',
      minItems: 3,
      maxItems: 3,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'description'],
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
        },
      },
    },
    uxIssues: {
      type: 'array',
      minItems: 3,
      maxItems: 3,
      items: issueSchema(),
    },
    uiIssues: {
      type: 'array',
      minItems: 3,
      maxItems: 3,
      items: issueSchema(),
    },
    priorityFixes: {
      type: 'array',
      minItems: 3,
      maxItems: 3,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['priority', 'title', 'description'],
        properties: {
          priority: { type: 'string', enum: ['high', 'medium', 'low'] },
          title: { type: 'string' },
          description: { type: 'string' },
        },
      },
    },
    finalRecommendation: { type: 'string' },
    ctaSuggestion: {
      type: 'object',
      additionalProperties: false,
      required: ['headline', 'body', 'primaryButton', 'secondaryButton'],
      properties: {
        headline: { type: 'string' },
        body: { type: 'string' },
        primaryButton: { type: 'string' },
        secondaryButton: { type: 'string' },
      },
    },
    limitations: {
      type: 'array',
      minItems: 3,
      items: { type: 'string' },
    },
  },
};

const systemPrompt = `You are a senior UX/UI designer. You audit websites for small businesses and service-based brands.
Your job is to give practical, specific, honest feedback. Be constructive, not generic.
Base your analysis only on the provided website context, business type, and goal.
Do not invent details. Do not claim you inspected visuals, mobile layouts, interactions, or performance unless the provided context supports it.
If something cannot be verified from the available page content, say so in limitations.
Limitations must be short human-readable sentences only. Never include XML tags, JSON schema names, tool metadata, hidden instructions, base64, UUIDs, or assistant/system messages in limitations.
Return only valid JSON matching the required schema.`;

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    return response.status(405).json({ error: { message: 'Method not allowed.' } });
  }

  try {
    const url = normalizeWebsiteUrl(request.body?.url);
    const businessType = String(request.body?.businessType || '').trim().slice(0, 120);
    const mainGoal = String(request.body?.mainGoal || '').trim().slice(0, 120);

    const websiteContext = await extractWebsiteContext(url);
    const audit = await generateUxAudit({ url, businessType, mainGoal, websiteContext });

    return response.status(200).json({
      audit,
      source: 'ai',
      websiteContextSummary: {
        fetchedUrl: websiteContext.fetchedUrl,
        title: websiteContext.title,
        h1: websiteContext.headings.h1,
        ctas: websiteContext.obviousCtas,
      },
    });
  } catch (error) {
    return response.status(error.status || 500).json({
      error: {
        code: error.code || 'AUDIT_FAILED',
        message: error.message || 'The audit could not be generated.',
      },
    });
  }
}

function issueSchema() {
  return {
    type: 'object',
    additionalProperties: false,
    required: ['title', 'description', 'impact', 'recommendation'],
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      impact: { type: 'string', enum: ['low', 'medium', 'high'] },
      recommendation: { type: 'string' },
    },
  };
}

function appError(message, status = 500, code = 'AUDIT_FAILED') {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
}

function normalizeWebsiteUrl(value) {
  if (!value || typeof value !== 'string') {
    throw appError('Website URL is required.', 400, 'INVALID_URL');
  }

  let parsed;
  try {
    parsed = new URL(value.trim());
  } catch {
    throw appError('Please enter a valid website URL.', 400, 'INVALID_URL');
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw appError('Only http and https URLs are supported.', 400, 'INVALID_URL');
  }

  if (parsed.username || parsed.password) {
    throw appError('URLs with usernames or passwords are not supported.', 400, 'INVALID_URL');
  }

  return parsed.toString();
}

async function extractWebsiteContext(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const pageResponse = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        Accept: 'text/html,application/xhtml+xml',
        'User-Agent': 'ClerifyAuditBot/0.1',
      },
    });

    if (!pageResponse.ok) {
      throw appError(`The website returned HTTP ${pageResponse.status}.`, 502, 'FETCH_FAILED');
    }

    const contentType = pageResponse.headers.get('content-type') || '';
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml+xml')) {
      throw appError('The URL did not return an HTML page that can be audited.', 415, 'UNSUPPORTED_CONTENT');
    }

    const html = await pageResponse.text();
    const $ = cheerio.load(html);
    $('script, style, noscript, svg, iframe, canvas, template').remove();

    const mainLinks = collectTexts($, 'a', 30);
    const buttonTexts = collectTexts(
      $,
      'button, [role="button"], input[type="button"], input[type="submit"], a[class*="btn"], a[class*="button"]',
      30,
      (element) => $(element).attr('value') || $(element).attr('aria-label') || $(element).text(),
    );

    const context = {
      fetchedUrl: pageResponse.url,
      title: cleanText($('title').first().text()),
      metaDescription: cleanText(
        $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '',
      ),
      headings: {
        h1: collectTexts($, 'h1', 8),
        h2: collectTexts($, 'h2', 18),
        h3: collectTexts($, 'h3', 24),
      },
      bodyText: limitText($('body').text(), MAX_BODY_TEXT_LENGTH),
      mainLinks,
      buttonTexts,
      obviousCtas: collectCtas(mainLinks, buttonTexts),
      imageAltTexts: collectTexts($, 'img', 20, (element) => $(element).attr('alt')),
      limitations: [
        'This context is extracted from static HTML from the fetched page only.',
        'Visual design, responsive behavior, and interactions are limited without screenshots or browser rendering.',
      ],
    };

    if (!context.title && !context.metaDescription && !context.bodyText) {
      throw appError('No readable page content was found at this URL.', 422, 'NO_CONTENT');
    }

    return context;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw appError('The website took too long to respond.', 504, 'FETCH_TIMEOUT');
    }
    if (error.status) {
      throw error;
    }
    throw appError(
      'The website could not be fetched. It may block bots, require JavaScript, or be temporarily unavailable.',
      502,
      'FETCH_FAILED',
    );
  } finally {
    clearTimeout(timeout);
  }
}

async function generateUxAudit({ url, businessType, mainGoal, websiteContext }) {
  if (!process.env.OPENAI_API_KEY) {
    throw appError('OPENAI_API_KEY is missing. Add it in Vercel Project Settings > Environment Variables.', 500, 'MISSING_API_KEY');
  }

  const aiResponse = await fetch(OPENAI_RESPONSES_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: [{ type: 'input_text', text: systemPrompt }],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: buildUserPrompt({ url, businessType, mainGoal, websiteContext }),
            },
          ],
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'clerify_ux_ui_audit',
          strict: true,
          schema: auditJsonSchema,
        },
      },
    }),
  });

  const payload = await aiResponse.json().catch(() => null);
  if (!aiResponse.ok) {
    throw appError(payload?.error?.message || 'The AI audit request failed.', aiResponse.status, 'AI_REQUEST_FAILED');
  }

  const outputText = extractResponseText(payload);
  if (!outputText) {
    throw appError('The AI response did not include a report.', 502, 'AI_RESPONSE_EMPTY');
  }

  try {
    const audit = JSON.parse(outputText);
    return {
      ...audit,
      limitations: sanitizeLimitations(audit.limitations),
    };
  } catch {
    throw appError('The AI response was not valid JSON.', 502, 'AI_RESPONSE_INVALID');
  }
}

function buildUserPrompt({ url, businessType, mainGoal, websiteContext }) {
  return `Audit this website from a UX/UI design perspective.

Submitted URL: ${url}
Fetched URL: ${websiteContext.fetchedUrl}
Business type: ${businessType || 'Not provided'}
Main goal: ${mainGoal || 'Not provided'}

Evaluate first impression, clarity of the offer, navigation and structure, CTA visibility, trust and credibility, conversion friction, visual hierarchy, typography, color and contrast, spacing and layout, accessibility basics, and what should be improved first.

Accuracy rules:
- Only make claims supported by the website context below.
- If a visual/design detail cannot be determined from static HTML, state that limitation.
- Do not pretend this is a full-site audit. This is based on the fetched page only.
- Keep feedback specific, useful, and written for a potential client who may hire a UX/UI designer.

Website context:
${JSON.stringify(websiteContext, null, 2)}`;
}

function extractResponseText(responseJson) {
  if (typeof responseJson?.output_text === 'string') {
    return responseJson.output_text;
  }

  return (responseJson?.output || [])
    .flatMap((output) => output.content || [])
    .filter((content) => content.type === 'output_text')
    .map((content) => content.text)
    .join('\n')
    .trim();
}

function collectTexts($, selector, limit, getValue = (element) => $(element).text()) {
  return uniqueNonEmpty(
    $(selector)
      .map((_, element) => getValue(element))
      .get(),
  ).slice(0, limit);
}

function collectCtas(linkTexts, buttonTexts) {
  const ctaPattern =
    /\b(book|buy|get|start|contact|schedule|try|join|sign up|subscribe|download|request|learn more|call|quote|demo|consultation)\b/i;

  return uniqueNonEmpty([...linkTexts, ...buttonTexts].filter((text) => ctaPattern.test(text))).slice(0, 15);
}

function cleanText(value = '') {
  return String(value).replace(/\s+/g, ' ').trim();
}

function uniqueNonEmpty(values) {
  return [...new Set(values.map(cleanText).filter(Boolean))];
}

function sanitizeLimitations(limitations = []) {
  const blockedPatterns = [
    /json_/i,
    /assistant has stopped/i,
    /typeDescriptor/i,
    /pragm/i,
    /<\?/,
    /\?>/,
    /\{|\}/,
    /^[A-Za-z0-9+/=]{32,}$/,
  ];

  const cleaned = uniqueNonEmpty([...limitations, ...DEFAULT_LIMITATIONS])
    .map((limitation) => limitation.replace(/[{}<>]/g, '').trim())
    .filter((limitation) => limitation.length >= 12 && limitation.length <= 180)
    .filter((limitation) => !blockedPatterns.some((pattern) => pattern.test(limitation)))
    .slice(0, 5);

  return cleaned.length >= 3 ? cleaned : DEFAULT_LIMITATIONS;
}

function limitText(value, maxLength) {
  const cleaned = cleanText(value);
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength).trim()}...`;
}
