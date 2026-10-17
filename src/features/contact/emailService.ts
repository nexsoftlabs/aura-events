import emailjs from '@emailjs/browser';
import { env, isEmailJsConfigured } from '@/lib/env';
import type { ContactFormValues } from '@/features/contact/schema';
import { services } from '@/data/services';
import { budgetRanges } from '@/data/budgetRanges';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getServiceTitle(slug: string): string {
  return services.find((s) => s.slug === slug)?.title ?? slug;
}

function getBudgetLabel(value: string): string {
  if (!value) return 'Not specified';
  return budgetRanges.find((b) => b.value === value)?.label ?? value;
}

export interface ContactEmailPayload {
  values: ContactFormValues;
  submittedAt: string;
}

export interface ContactEmailService {
  send(payload: ContactEmailPayload): Promise<void>;
}

export class EmailJsContactService implements ContactEmailService {
  async send({ values, submittedAt }: ContactEmailPayload): Promise<void> {
    if (!isEmailJsConfigured()) {
      throw new Error('EMAIL_NOT_CONFIGURED');
    }

    const publicKey = env.VITE_EMAILJS_PUBLIC_KEY!;
    const serviceId = env.VITE_EMAILJS_SERVICE_ID!;
    const templateId = env.VITE_EMAILJS_TEMPLATE_ID!;

    const templateParams = {
      from_name: values.fullName,
      from_email: values.email,
      reply_to: values.email,
      phone: values.phone,
      service: getServiceTitle(values.service),
      service_slug: values.service,
      event_date: values.eventDate || 'Not specified',
      city: values.city,
      budget: getBudgetLabel(values.budget ?? ''),
      guest_count: values.guestCount || 'Not specified',
      message: values.message,
      consent: values.consent ? 'Yes' : 'No',
      submitted_at: submittedAt,
      to_email: env.VITE_CONTACT_EMAIL_DISPLAY ?? '',
      html_message: `
        <h2>New enquiry — Aura Events</h2>
        <p><strong>Name:</strong> ${escapeHtml(values.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(values.phone)}</p>
        <p><strong>Service:</strong> ${escapeHtml(getServiceTitle(values.service))}</p>
        <p><strong>Event date:</strong> ${escapeHtml(values.eventDate || 'Not specified')}</p>
        <p><strong>City:</strong> ${escapeHtml(values.city)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(getBudgetLabel(values.budget ?? ''))}</p>
        <p><strong>Guests:</strong> ${escapeHtml(values.guestCount || 'Not specified')}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(values.message).replace(/\n/g, '<br>')}</p>
        <p><strong>Privacy consent:</strong> Yes</p>
        <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
      `.trim(),
    };

    await emailjs.send(serviceId, templateId, templateParams, { publicKey });
  }
}

export const contactEmailService: ContactEmailService = new EmailJsContactService();
