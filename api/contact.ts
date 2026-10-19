import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { applyCors } from './lib/cors.js';
import { buildEnquiryEmail } from './lib/enquiry-email.js';
import { enquiryBodySchema } from './lib/enquiry-schema.js';
import { getServerEnv, isMailConfigured } from './lib/env.js';
import { clientKey, isRateLimited } from './lib/rate-limit.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { allowedOrigins, resendApiKey, resendFrom, contactInbox } = getServerEnv();
  if (applyCors(req, res, allowedOrigins)) return;

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!isMailConfigured() || !resendApiKey) {
    res.status(503).json({ error: 'EMAIL_NOT_CONFIGURED', message: 'Enquiry email is not configured yet.' });
    return;
  }

  if (isRateLimited(clientKey(req))) {
    res.status(429).json({ error: 'THROTTLED', message: 'Too many requests. Please wait a moment and try again.' });
    return;
  }

  const parsed = enquiryBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Please check the form and try again.',
      fields: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  if (parsed.data.website) {
    res.status(400).json({ error: 'SPAM', message: 'Invalid submission.' });
    return;
  }

  const submittedAt = new Date().toISOString();
  const { subject, text, html } = buildEnquiryEmail(parsed.data, submittedAt);

  const resend = new Resend(resendApiKey);
  const { error } = await resend.emails.send({
    from: resendFrom,
    to: [contactInbox],
    replyTo: parsed.data.email,
    subject,
    text,
    html,
    tags: [{ name: 'source', value: 'aura-events-contact' }],
  });

  if (error) {
    console.error('[contact] Resend error:', error);
    res.status(502).json({
      error: 'SEND_FAILED',
      message: 'We could not send your enquiry. Please try again or contact us by phone or email.',
    });
    return;
  }

  res.status(200).json({ ok: true });
}
