import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ApiContactService } from '@/features/contact/emailService';
import type { ContactFormValues } from '@/features/contact/schema';

vi.mock('@/lib/contact-api', () => ({
  contactSubmitUrl: () => '/api/contact',
}));

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

describe('ApiContactService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('sends JSON to contact API', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    const service = new ApiContactService();
    await service.send({ values, submittedAt: '2026-01-01T00:00:00.000Z' });
    expect(fetch).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('throws EMAIL_NOT_CONFIGURED on 503', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ error: 'EMAIL_NOT_CONFIGURED' }), { status: 503 }),
    );
    const service = new ApiContactService();
    await expect(
      service.send({ values, submittedAt: '2026-01-01T00:00:00.000Z' }),
    ).rejects.toThrow('EMAIL_NOT_CONFIGURED');
  });
});
