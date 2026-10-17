import { describe, expect, it, vi, beforeEach } from 'vitest';
import { EmailJsContactService } from '@/features/contact/emailService';
import type { ContactFormValues } from '@/features/contact/schema';

vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(),
  },
}));

vi.mock('@/lib/env', () => ({
  isEmailJsConfigured: vi.fn(() => true),
  env: {
    VITE_EMAILJS_PUBLIC_KEY: 'pk_test',
    VITE_EMAILJS_SERVICE_ID: 'svc',
    VITE_EMAILJS_TEMPLATE_ID: 'tpl',
    VITE_CONTACT_EMAIL_DISPLAY: 'owner@example.com',
  },
}));

import emailjs from '@emailjs/browser';
import { isEmailJsConfigured } from '@/lib/env';

const values: ContactFormValues = {
  fullName: 'Test User',
  email: 'test@example.com',
  phone: '+91 99999 88888',
  service: 'branding',
  city: 'Delhi',
  message: 'This is a sufficiently long enquiry message for testing.',
  consent: true,
  website: '',
};

describe('EmailJsContactService', () => {
  beforeEach(() => {
    vi.mocked(emailjs.send).mockReset();
    vi.mocked(isEmailJsConfigured).mockReturnValue(true);
  });

  it('sends email when configured', async () => {
    vi.mocked(emailjs.send).mockResolvedValue({ status: 200, text: 'OK' });
    const service = new EmailJsContactService();
    await service.send({ values, submittedAt: '2026-01-01T00:00:00.000Z' });
    expect(emailjs.send).toHaveBeenCalledOnce();
  });

  it('throws when not configured', async () => {
    vi.mocked(isEmailJsConfigured).mockReturnValue(false);
    const service = new EmailJsContactService();
    await expect(
      service.send({ values, submittedAt: '2026-01-01T00:00:00.000Z' }),
    ).rejects.toThrow('EMAIL_NOT_CONFIGURED');
  });

  it('propagates provider errors', async () => {
    vi.mocked(emailjs.send).mockRejectedValue(new Error('Network'));
    const service = new EmailJsContactService();
    await expect(
      service.send({ values, submittedAt: '2026-01-01T00:00:00.000Z' }),
    ).rejects.toThrow('Network');
  });
});
