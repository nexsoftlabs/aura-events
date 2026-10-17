import { describe, expect, it } from 'vitest';
import { ORIGINAL_SERVICE_IDS, services } from '@/data/services';

describe('services catalog', () => {
  it('includes all 12 original services', () => {
    for (const id of ORIGINAL_SERVICE_IDS) {
      expect(services.some((s) => s.id === id)).toBe(true);
    }
    expect(services.length).toBeGreaterThanOrEqual(12);
  });

  it('has unique slugs', () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
