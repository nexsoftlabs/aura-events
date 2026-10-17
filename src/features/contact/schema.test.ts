import { describe, expect, it } from 'vitest';
import { contactFormSchema } from '@/features/contact/schema';

const validBase = {
  fullName: 'Priya Sharma',
  email: 'priya@example.com',
  phone: '+91 98765 43210',
  service: 'corporate-events' as const,
  eventDate: '',
  city: 'Mumbai',
  budget: '',
  guestCount: '200',
  message: 'We are planning an annual conference for 200 delegates in Mumbai.',
  consent: true,
  website: '',
};

describe('contactFormSchema', () => {
  it('accepts valid payload', () => {
    expect(contactFormSchema.safeParse(validBase).success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = contactFormSchema.safeParse({ ...validBase, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid phone', () => {
    const result = contactFormSchema.safeParse({ ...validBase, phone: 'abc' });
    expect(result.success).toBe(false);
  });

  it('requires consent', () => {
    const result = contactFormSchema.safeParse({ ...validBase, consent: false });
    expect(result.success).toBe(false);
  });

  it('rejects past event date', () => {
    const result = contactFormSchema.safeParse({ ...validBase, eventDate: '2020-01-01' });
    expect(result.success).toBe(false);
  });

  it('rejects short message', () => {
    const result = contactFormSchema.safeParse({ ...validBase, message: 'Too short' });
    expect(result.success).toBe(false);
  });

  it('rejects honeypot', () => {
    const result = contactFormSchema.safeParse({ ...validBase, website: 'spam' });
    expect(result.success).toBe(false);
  });
});
