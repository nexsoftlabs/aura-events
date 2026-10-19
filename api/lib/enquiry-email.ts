import type { EnquiryBody } from './enquiry-schema.js';

const SERVICE_LABELS: Record<EnquiryBody['service'], string> = {
  branding: 'Branding',
  'atl-btl-activation': 'ATL & BTL Activation',
  'corporate-events': 'Corporate Events',
  'printing-media': 'Printing Media',
  'film-production': 'Film Production',
  'advertisement-films': 'Advertisement Films',
  'documentary-films': 'Documentary Films',
  'media-advertising': 'Media Advertising',
  'radio-campaign': 'Radio Campaign',
  'credit-control': 'Credit Control',
  'birthday-marriage-reception': 'Birthday & Marriage / Reception Events',
  'healthcare-consultancy': 'Healthcare Consultancy',
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function labelFor(field: string, value: string | undefined): string {
  if (!value) return 'Not specified';
  if (field === 'service') return SERVICE_LABELS[value as EnquiryBody['service']] ?? value;
  return value;
}

export function buildEnquiryEmail(body: EnquiryBody, submittedAt: string) {
  const serviceTitle = labelFor('service', body.service);
  const subject = `New enquiry — ${body.fullName} (${serviceTitle})`;

  const lines = [
    `Name: ${body.fullName}`,
    `Email: ${body.email}`,
    `Phone: ${body.phone}`,
    `Service: ${serviceTitle}`,
    `Event date: ${labelFor('eventDate', body.eventDate)}`,
    `City: ${body.city}`,
    `Budget: ${labelFor('budget', body.budget)}`,
    `Guests: ${labelFor('guestCount', body.guestCount)}`,
    '',
    'Message:',
    body.message,
    '',
    `Privacy consent: Yes`,
    `Submitted: ${submittedAt}`,
  ];

  const text = lines.join('\n');

  const html = `
    <h2>New enquiry — Aura Events</h2>
    <p><strong>Name:</strong> ${escapeHtml(body.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(body.phone)}</p>
    <p><strong>Service:</strong> ${escapeHtml(serviceTitle)}</p>
    <p><strong>Event date:</strong> ${escapeHtml(labelFor('eventDate', body.eventDate))}</p>
    <p><strong>City:</strong> ${escapeHtml(body.city)}</p>
    <p><strong>Budget:</strong> ${escapeHtml(labelFor('budget', body.budget))}</p>
    <p><strong>Guests:</strong> ${escapeHtml(labelFor('guestCount', body.guestCount))}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(body.message).replace(/\n/g, '<br>')}</p>
    <p><strong>Privacy consent:</strong> Yes</p>
    <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
  `.trim();

  return { subject, text, html };
}
