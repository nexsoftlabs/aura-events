import emailjs from '@emailjs/browser';
import { env, isEmailJsConfigured } from '@/lib/env';
import { contactSubmitUrl } from '@/lib/contact-api';
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

export class ApiContactService implements ContactEmailService {
  async send({ values }: ContactEmailPayload): Promise<void> {
    const res = await fetch(contactSubmitUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const body = (await res.json().catch(() => ({}))) as { error?: string; message?: string };

    if (res.status === 503 || body.error === 'EMAIL_NOT_CONFIGURED') {
      throw new Error('EMAIL_NOT_CONFIGURED');
    }
    if (res.status === 429 || body.error === 'THROTTLED') {
      throw new Error('THROTTLED');
    }
    if (!res.ok) {
      throw new Error(body.message || 'SEND_FAILED');
    }
  }
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

class CompositeContactService implements ContactEmailService {
  private api = new ApiContactService();
  private emailJs = new EmailJsContactService();

  async send(payload: ContactEmailPayload): Promise<void> {
    try {
      await this.api.send(payload);
    } catch (error) {
      if (error instanceof Error && error.message === 'EMAIL_NOT_CONFIGURED' && isEmailJsConfigured()) {
        await this.emailJs.send(payload);
        return;
      }
      throw error;
    }
  }
}

export const contactEmailService: ContactEmailService = new CompositeContactService();
