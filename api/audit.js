import * as cheerio from 'cheerio';

const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const FETCH_TIMEOUT_MS = 9000;
const RENDER_TIMEOUT_MS = 20000;
const MAX_BODY_TEXT_LENGTH = 6500;
const MIN_MEANINGFUL_TEXT_LENGTH = 180;
const DEFAULT_LIMITATIONS = [
  'This is a page-level audit, not a full-site review.',
  'Visual design, responsive behavior, and interactions need a deeper browser-based review.',
  'Accessibility and performance require dedicated testing tools.',
];

export const config = { maxDuration: 60 };

const auditJsonSchema = {
  type: 'object', additionalProperties: false,
  required: ['summary', 'positives', 'uxIssues', 'uiIssues', 'priorityFixes', 'finalRecommendation', 'ctaSuggestion', 'limitations'],
  properties: {
    summary: {
      type: 'object', additionalProperties: false,
      required: ['websiteUrl', 'businessType', 'mainGoal', 'firstImpression', 'overallScore'],
      properties: {
        websiteUrl: { type: 'string' }, businessType: { type: 'string' }, mainGoal: { type: 'string' },
        firstImpression: { type: 'string' }, overallScore: { type: 'number', minimum: 0, maximum: 100 },
      },
    },
    positives: { type: 'array', minItems: 3, maxItems: 3, items: simpleItemSchema() },
    uxIssues: { type: 'array', minItems: 3, maxItems: 3, items: issueSchema() },
    uiIssues: { type: 'array', minItems: 3, maxItems: 3, items: issueSchema() },
    priorityFixes: {
      type: 'array', minItems: 3, maxItems: 3,
      items: { type: 'object', additionalProperties: false, required: ['priority', 'title', 'description'], properties: {
        priority: { type: 'string', enum: ['high', 'medium', 'low'] }, title: { type: 'string' }, description: { type: 'string' },
      } },
    },
    finalRecommendation: { type: 'string' },
    ctaSuggestion: { type: 'object', additionalProperties: false, required: ['headline', 'body', 'primaryButton', 'secondaryButton'], properties: {
      headline: { type: 'string' }, body: { type: 'string' }, primaryButton: { type: 'string' }, secondaryButton: { type: 'string' },
    } },
    limitations: { type: 'array', minItems: 3, items: { type: 'string' } },
  },
};

const systemPrompt = `You are a senior UX/UI designer. Give practical, specific, honest feedback based only on the supplied website context.
The context identifies whether it came from a rendered DOM, static HTML fallback, or limited extraction. Do not claim to have inspected anything the context does not support.
Do not punish a website for missing visible content if the extraction method could not access JavaScript-rendered DOM. In that case, clearly state the limitation and avoid giving a normal UX/UI score.
Limitations must be short human-readable sentences only. Return only valid JSON matching the schema.`;

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') return response.status(405).json({ error: { message: 'Method not allowed.' } });

  try {
    const url = normalizeWebsiteUrl(request.body?.url);
    const businessType = String(request.body?.businessType || '').trim().slice(0, 120);
    const mainGoal = String(request.body?.mainGoal || '').trim().slice(0, 120);
    const extraction = await extractWebsiteContext(url);

    if (extraction.analysisStatus === 'limited') {
      return response.status(200).json(buildLimitedResponse({ url, businessType, mainGoal, extraction }));
    }

    const audit = await generateUxAudit({ url, businessType, mainGoal, websiteContext: extraction.context });
    return response.status(200).json({
      audit, source: 'ai', analysisStatus: 'complete', extractionMethod: extraction.extractionMethod,
      scoreAvailable: true, score: audit.summary.overallScore, limitations: audit.limitations,
      websiteContextSummary: contextSummary(extraction.context),
    });
  } catch (error) {
    return response.status(error.status || 500).json({
      analysisStatus: 'failed', extractionMethod: 'failed', scoreAvailable: false, score: null,
      limitations: [error.message || 'The audit could not be generated.'],
      error: { code: error.code || 'AUDIT_FAILED', message: error.message || 'The audit could not be generated.' },
    });
  }
}

function simpleItemSchema() { return { type: 'object', additionalProperties: false, required: ['title', 'description'], properties: { title: { type: 'string' }, description: { type: 'string' } } }; }
function issueSchema() { return { type: 'object', additionalProperties: false, required: ['title', 'description', 'impact', 'recommendation'], properties: { title: { type: 'string' }, description: { type: 'string' }, impact: { type: 'string', enum: ['low', 'medium', 'high'] }, recommendation: { type: 'string' } } }; }
function appError(message, status = 500, code = 'AUDIT_FAILED') { const error = new Error(message); error.status = status; error.code = code; return error; }

function normalizeWebsiteUrl(value) {
  if (!value || typeof value !== 'string') throw appError('Website URL is required.', 400, 'INVALID_URL');
  let parsed;
  try { parsed = new URL(value.trim()); } catch { throw appError('Please enter a valid website URL.', 400, 'INVALID_URL'); }
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) throw appError('Please enter a supported public http or https URL.', 400, 'INVALID_URL');
  return parsed.toString();
}

async function extractWebsiteContext(url) {
  let renderedError;
  try {
    const context = await extractRenderedContext(url);
    if (hasMeaningfulContent(context)) return { analysisStatus: 'complete', extractionMethod: 'rendered', context };
    renderedError = 'The rendered page did not contain enough readable content.';
  } catch (error) { renderedError = friendlyRenderError(error); }

  let staticResult;
  try { staticResult = await extractStaticContext(url); } catch (error) {
    throw appError(`${renderedError} The website could not be retrieved as static HTML either.`, error.status || 502, 'EXTRACTION_FAILED');
  }

  if (staticResult.isLikelyJavaScriptRendered || !hasMeaningfulContent(staticResult.context)) {
    return {
      analysisStatus: 'limited', extractionMethod: 'failed',
      limitation: 'This website appears to rely on JavaScript rendering, and Clerify could not fully access the rendered page content. A full audit requires rendered page analysis.',
      context: staticResult.context, renderError: renderedError,
    };
  }
  staticResult.context.limitations.push(`Rendered page analysis was unavailable: ${renderedError}`);
  return { analysisStatus: 'complete', extractionMethod: 'fallback', context: staticResult.context };
}

async function extractRenderedContext(url) {
  let browser;
  try {
    const { chromium } = await import('playwright');
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, userAgent: 'ClerifyAuditBot/0.2' });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: RENDER_TIMEOUT_MS });
    await page.waitForLoadState('networkidle', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(500);
    const data = await page.evaluate(() => {
      const visible = (element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) > 0 && rect.width > 0 && rect.height > 0;
      };
      const text = (element) => (element.getAttribute('aria-label') || element.innerText || element.value || '').replace(/\s+/g, ' ').trim();
      const texts = (selector, limit, mapper = text) => [...document.querySelectorAll(selector)].filter(visible).map(mapper).filter(Boolean).filter((value, index, values) => values.indexOf(value) === index).slice(0, limit);
      const allText = [...document.body.querySelectorAll('h1,h2,h3,h4,p,li,blockquote')].filter(visible).map(text).join(' ');
      return {
        title: document.title, metaDescription: document.querySelector('meta[name="description"], meta[property="og:description"]')?.content || '',
        headings: { h1: texts('h1', 8), h2: texts('h2', 18), h3: texts('h3', 24) },
        bodyText: allText, mainLinks: texts('a', 30),
        buttonTexts: texts('button,[role="button"],input[type="button"],input[type="submit"]', 30),
        navigationLinks: texts('nav a,[role="navigation"] a', 30),
        formFields: texts('label', 20).concat(texts('input[placeholder],textarea[placeholder]', 20, (element) => element.placeholder)),
        imageAltTexts: texts('img[alt]', 20, (element) => element.alt),
        viewport: { width: window.innerWidth, height: window.innerHeight },
      };
    });
    // Keep a capture in memory for future vision analysis without exposing server file paths.
    const screenshot = await page.screenshot({ type: 'png', fullPage: false }).catch(() => null);
    return finalizeContext({ ...data, fetchedUrl: page.url(), screenshotCaptured: Boolean(screenshot), extractionSource: 'rendered DOM', limitations: ['Content was extracted after JavaScript ran in a headless browser.'] });
  } finally { await browser?.close(); }
}

async function extractStaticContext(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const pageResponse = await fetch(url, { signal: controller.signal, redirect: 'follow', headers: { Accept: 'text/html,application/xhtml+xml', 'User-Agent': 'ClerifyAuditBot/0.2' } });
    if (!pageResponse.ok) throw appError(`The website returned HTTP ${pageResponse.status}.`, 502, 'FETCH_FAILED');
    const contentType = pageResponse.headers.get('content-type') || '';
    if (!/text\/html|application\/xhtml\+xml/i.test(contentType)) throw appError('The URL did not return an HTML page that can be audited.', 415, 'UNSUPPORTED_CONTENT');
    const html = await pageResponse.text(); const $ = cheerio.load(html); const likelyJs = isLikelyJavaScriptRendered($, html);
    $('script,style,noscript,svg,iframe,canvas,template').remove();
    const mainLinks = collectTexts($, 'a', 30);
    const buttonTexts = collectTexts($, 'button,[role="button"],input[type="button"],input[type="submit"],a[class*="btn"],a[class*="button"]', 30, (element) => $(element).attr('value') || $(element).attr('aria-label') || $(element).text());
    const context = finalizeContext({
      fetchedUrl: pageResponse.url, title: cleanText($('title').first().text()), metaDescription: cleanText($('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || ''),
      headings: { h1: collectTexts($, 'h1', 8), h2: collectTexts($, 'h2', 18), h3: collectTexts($, 'h3', 24) }, bodyText: $('body').text(), mainLinks, buttonTexts,
      navigationLinks: collectTexts($, 'nav a,[role="navigation"] a', 30), formFields: collectTexts($, 'label,input[placeholder],textarea[placeholder]', 20, (element) => $(element).attr('placeholder') || $(element).text()),
      imageAltTexts: collectTexts($, 'img', 20, (element) => $(element).attr('alt')), extractionSource: 'static HTML fallback', limitations: ['This context was extracted from the page’s static HTML.'],
    });
    return { context, isLikelyJavaScriptRendered: likelyJs };
  } catch (error) {
    if (error.name === 'AbortError') throw appError('The website took too long to respond.', 504, 'FETCH_TIMEOUT');
    throw error.status ? error : appError('The website could not be fetched. It may block bots or be temporarily unavailable.', 502, 'FETCH_FAILED');
  } finally { clearTimeout(timeout); }
}

function finalizeContext(context) {
  const mainLinks = uniqueNonEmpty(context.mainLinks || []); const buttonTexts = uniqueNonEmpty(context.buttonTexts || []);
  return { ...context, title: cleanText(context.title), metaDescription: cleanText(context.metaDescription), bodyText: limitText(context.bodyText, MAX_BODY_TEXT_LENGTH), mainLinks, buttonTexts, navigationLinks: uniqueNonEmpty(context.navigationLinks || []), formFields: uniqueNonEmpty(context.formFields || []), imageAltTexts: uniqueNonEmpty(context.imageAltTexts || []), obviousCtas: collectCtas(mainLinks, buttonTexts) };
}
function isLikelyJavaScriptRendered($, html) {
  const staticText = cleanText($('body').clone().find('script,style,noscript,svg,iframe,canvas,template').remove().end().text());
  return Boolean($('#root,#app,#__next,[data-reactroot]').length && staticText.length < MIN_MEANINGFUL_TEXT_LENGTH)
    || (/<script[^>]+(?:src=|type=["']module)/i.test(html) && staticText.length < 80);
}
function hasMeaningfulContent(context) { return context.bodyText.length >= MIN_MEANINGFUL_TEXT_LENGTH || context.headings.h1.length + context.headings.h2.length >= 2 || context.mainLinks.length + context.buttonTexts.length >= 5; }
function friendlyRenderError(error) { if (/Cannot find package 'playwright'|Executable doesn't exist/i.test(error?.message || '')) return 'Rendered page analysis is not installed on this server.'; if (/Timeout/i.test(error?.message || '')) return 'Rendered page analysis timed out.'; return 'Rendered page analysis could not access this website.'; }

async function generateUxAudit({ url, businessType, mainGoal, websiteContext }) {
  if (!process.env.OPENAI_API_KEY) throw appError('OPENAI_API_KEY is missing. Add it in Vercel Project Settings > Environment Variables.', 500, 'MISSING_API_KEY');
  const aiResponse = await fetch(OPENAI_RESPONSES_URL, { method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-4.1-mini', input: [{ role: 'system', content: [{ type: 'input_text', text: systemPrompt }] }, { role: 'user', content: [{ type: 'input_text', text: buildUserPrompt({ url, businessType, mainGoal, websiteContext }) }] }], text: { format: { type: 'json_schema', name: 'clerify_ux_ui_audit', strict: true, schema: auditJsonSchema } } }) });
  const payload = await aiResponse.json().catch(() => null);
  if (!aiResponse.ok) throw appError(payload?.error?.message || 'The AI audit request failed.', aiResponse.status, 'AI_REQUEST_FAILED');
  const outputText = extractResponseText(payload); if (!outputText) throw appError('The AI response did not include a report.', 502, 'AI_RESPONSE_EMPTY');
  try { const audit = JSON.parse(outputText); return { ...audit, limitations: sanitizeLimitations(audit.limitations, websiteContext.limitations) }; } catch { throw appError('The AI response was not valid JSON.', 502, 'AI_RESPONSE_INVALID'); }
}

function buildUserPrompt({ url, businessType, mainGoal, websiteContext }) { return `Audit this website from a UX/UI perspective.\n\nSubmitted URL: ${url}\nFetched URL: ${websiteContext.fetchedUrl}\nBusiness type: ${businessType || 'Not provided'}\nMain goal: ${mainGoal || 'Not provided'}\nExtraction method: ${websiteContext.extractionSource}\n\nAccuracy rules:\n- Only make claims supported by the context.\n- Do not claim to have inspected visual design, mobile layouts, interactions, or performance unless supported.\n- Do not punish missing visible content when rendered DOM could not be accessed.\n\nWebsite context:\n${JSON.stringify(websiteContext, null, 2)}`; }

function buildLimitedResponse({ url, businessType, mainGoal, extraction }) {
  const limitation = extraction.limitation;
  return { source: 'limited', analysisStatus: 'limited', extractionMethod: 'failed', scoreAvailable: false, score: null, limitations: [limitation, 'No normal UX/UI score was generated from the static HTML shell.', 'Try again when rendered page analysis is available.'], websiteContextSummary: contextSummary(extraction.context), audit: { summary: { websiteUrl: url, businessType: businessType || 'Not provided', mainGoal: mainGoal || 'Not provided', firstImpression: limitation, overallScore: null }, positives: [], uxIssues: [], uiIssues: [], priorityFixes: [], finalRecommendation: 'Enable rendered page analysis and rerun this audit for evidence-based UX/UI feedback.', ctaSuggestion: { headline: 'Rendered analysis required', body: 'This website needs a browser-rendered audit before Clerify can make fair recommendations.', primaryButton: 'Try again later', secondaryButton: 'Request a human review' }, limitations: [limitation, 'No normal UX/UI score was generated from the static HTML shell.', 'Try again when rendered page analysis is available.'] } };
}
function contextSummary(context) { return { fetchedUrl: context.fetchedUrl, title: context.title, h1: context.headings?.h1 || [], ctas: context.obviousCtas || [], screenshotCaptured: Boolean(context.screenshotCaptured) }; }
function extractResponseText(responseJson) { if (typeof responseJson?.output_text === 'string') return responseJson.output_text; return (responseJson?.output || []).flatMap((output) => output.content || []).filter((content) => content.type === 'output_text').map((content) => content.text).join('\n').trim(); }
function collectTexts($, selector, limit, getValue = (element) => $(element).text()) { return uniqueNonEmpty($(selector).map((_, element) => getValue(element)).get()).slice(0, limit); }
function collectCtas(linkTexts, buttonTexts) { return uniqueNonEmpty([...linkTexts, ...buttonTexts].filter((text) => /\b(book|buy|get|start|contact|schedule|try|join|sign up|subscribe|download|request|learn more|call|quote|demo|consultation)\b/i.test(text))).slice(0, 15); }
function cleanText(value = '') { return String(value).replace(/\s+/g, ' ').trim(); }
function uniqueNonEmpty(values) { return [...new Set(values.map(cleanText).filter(Boolean))]; }
function sanitizeLimitations(limitations = [], contextLimitations = []) { const cleaned = uniqueNonEmpty([...limitations, ...contextLimitations, ...DEFAULT_LIMITATIONS]).map((limitation) => limitation.replace(/[{}<>]/g, '').trim()).filter((limitation) => limitation.length >= 12 && limitation.length <= 220).slice(0, 5); return cleaned.length >= 3 ? cleaned : DEFAULT_LIMITATIONS; }
function limitText(value, maxLength) { const cleaned = cleanText(value); return cleaned.length <= maxLength ? cleaned : `${cleaned.slice(0, maxLength).trim()}...`; }
