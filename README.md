# Clerify

Clerify generates a page-level UX/UI mini-audit from a submitted website URL.

## Rendered page analysis

The audit endpoint tries to open a page in a headless Playwright browser first. After JavaScript runs, it extracts visible headings, body text, links, buttons, navigation, form labels/placeholders, image alt text, viewport details, and an in-memory screenshot capture.

If browser rendering fails, Clerify falls back to static HTML extraction. Static HTML is only scored when it contains meaningful content. Pages that look like JavaScript app shells (for example, a mostly empty `#root` or `#app`) return a **Limited audit** with no score instead of an unfair low score.

## Local setup

```bash
npm install
npx playwright install chromium
npm run dev
```

Set `OPENAI_API_KEY` in your local environment or Vercel project settings. `OPENAI_MODEL` is optional and defaults to `gpt-4.1-mini`.

## Deployment note

The `playwright` package needs a compatible Chromium binary at runtime. Standard Vercel serverless deployments may not provide one, so rendered analysis can fall back to the Limited audit state there. For production browser rendering, use `playwright-core` with a serverless Chromium package, move the audit API to a dedicated Node service, or use a hosted browser-rendering provider.

## Known limitations and next steps

The current audit is page-level. The screenshot is captured in memory but is not yet sent to a vision model or persisted. Future improvements can add screenshot analysis, Lighthouse performance data, accessibility checks, and multi-page crawling.
