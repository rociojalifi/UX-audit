const RESEND_EMAIL_URL = 'https://api.resend.com/emails';
const DEFAULT_TO_EMAIL = 'clerifyinfo@gmail.com';
const DEFAULT_FROM_EMAIL = 'Clerify <onboarding@resend.dev>';

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    return response.status(405).json({ error: { message: 'Method not allowed.' } });
  }

  try {
    const payload = validateContactPayload(request.body);
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return response.status(501).json({
        error: {
          code: 'EMAIL_PROVIDER_NOT_CONFIGURED',
          message: 'Email delivery is not configured yet.',
        },
      });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL;

    const resendResponse = await fetch(RESEND_EMAIL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: payload.email,
        subject: `New Clerify request: ${payload.serviceInterest}`,
        text: buildPlainTextEmail(payload),
        html: buildHtmlEmail(payload),
      }),
    });

    const resendPayload = await safeJson(resendResponse);

    if (!resendResponse.ok) {
      return response.status(502).json({
        error: {
          code: 'EMAIL_DELIVERY_FAILED',
          message:
            resendPayload?.message ||
            resendPayload?.error?.message ||
            'The request could not be sent. Please try again.',
        },
      });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    return response.status(error.status || 400).json({
      error: {
        code: error.code || 'CONTACT_REQUEST_INVALID',
        message: error.message || 'Please check the form and try again.',
      },
    });
  }
}

function validateContactPayload(body = {}) {
  const payload = {
    name: cleanString(body.name, 120),
    email: cleanString(body.email, 180),
    websiteUrl: cleanString(body.websiteUrl, 300),
    serviceInterest: cleanString(body.serviceInterest, 120),
    message: cleanString(body.message, 2000),
  };

  if (!payload.name) throw contactError('Please enter your name.', 'MISSING_NAME');
  if (!isValidEmail(payload.email)) throw contactError('Please enter a valid email address.', 'INVALID_EMAIL');
  if (payload.websiteUrl && !isValidUrl(payload.websiteUrl)) {
    throw contactError('Please enter a valid website URL or leave it empty.', 'INVALID_WEBSITE_URL');
  }
  if (!payload.serviceInterest) {
    throw contactError('Please choose a service interest.', 'MISSING_SERVICE_INTEREST');
  }
  if (!payload.message) {
    throw contactError('Tell me a little about what you want to improve.', 'MISSING_MESSAGE');
  }

  return payload;
}

function cleanString(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function contactError(message, code) {
  const error = new Error(message);
  error.status = 400;
  error.code = code;
  return error;
}

function buildPlainTextEmail(payload) {
  return [
    'New Clerify service request',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Website: ${payload.websiteUrl || 'Not provided'}`,
    `Service interest: ${payload.serviceInterest}`,
    '',
    'Message / goals:',
    payload.message,
  ].join('\n');
}

function buildHtmlEmail(payload) {
  const rows = [
    ['Name', payload.name],
    ['Email', payload.email],
    ['Website', payload.websiteUrl || 'Not provided'],
    ['Service interest', payload.serviceInterest],
  ];

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#151714">
      <h1 style="font-size:22px;margin:0 0 16px">New Clerify service request</h1>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <th style="text-align:left;padding:8px 12px;border:1px solid #DDE2EA;background:#F1F2F8">${escapeHtml(label)}</th>
                <td style="padding:8px 12px;border:1px solid #DDE2EA">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join('')}
      </table>
      <h2 style="font-size:16px;margin:24px 0 8px">Message / goals</h2>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(payload.message)}</p>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function safeJson(fetchResponse) {
  try {
    return await fetchResponse.json();
  } catch {
    return null;
  }
}
