# Clerify

Clerify generates a page-level UX/UI mini-audit from a submitted website URL.

## Rendered page analysis

The audit endpoint fetches static HTML first. When that HTML is thin or looks like a JavaScript application shell (for example, an empty `#root` or `#app`), it opens the page in a managed Browserless browser session. After JavaScript runs, it extracts visible headings, body text, links, buttons, navigation, form labels/placeholders, image alt text, viewport details, and an in-memory screenshot capture.

If browser rendering fails, Clerify falls back to static HTML extraction. Static HTML is only scored when it contains meaningful content. Pages that look like JavaScript app shells (for example, a mostly empty `#root` or `#app`) return a **Limited audit** with no score instead of an unfair low score.

## Local setup

```bash
npm install
npm run dev
```

Set `OPENAI_API_KEY` and `BROWSERLESS_TOKEN` in your local environment or Vercel project settings. `OPENAI_MODEL` is optional and defaults to `gpt-4.1-mini`. You may use `BROWSERLESS_WS_ENDPOINT` instead when you need a custom Browserless region or endpoint.

## Contact form email delivery

The paid-service request form posts to `/api/contact`.

To send real emails, configure these environment variables:

```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=clerifyinfo@gmail.com
CONTACT_FROM_EMAIL="Clerify <hello@your-verified-domain.com>"
```

`CONTACT_TO_EMAIL` defaults to `clerifyinfo@gmail.com`. `CONTACT_FROM_EMAIL` should use a sender/domain verified in Resend for production. If `RESEND_API_KEY` is missing, the frontend opens a prefilled email to `clerifyinfo@gmail.com` as a fallback.

## Deployment note

The app uses `playwright-core` to connect to Browserless over WebSocket, so Vercel does not need to package or launch Chromium. Static pages do not create a Browserless session; only pages that need rendered analysis do.

## Known limitations and next steps

The current audit is page-level. The screenshot is captured in memory but is not yet sent to a vision model or persisted. Future improvements can add screenshot analysis, Lighthouse performance data, accessibility checks, and multi-page crawling.
