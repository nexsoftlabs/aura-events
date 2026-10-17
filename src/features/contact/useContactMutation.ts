import { useMutation } from '@tanstack/react-query';
import { contactEmailService } from '@/features/contact/emailService';
import type { ContactFormValues } from '@/features/contact/schema';

const THROTTLE_MS = 5000;
let lastSubmitAt = 0;

export function useContactMutation() {
  return useMutation({
    mutationFn: async (values: ContactFormValues) => {
      const now = Date.now();
      if (now - lastSubmitAt < THROTTLE_MS) {
        throw new Error('THROTTLED');
      }
      lastSubmitAt = now;

      if (values.website) {
        throw new Error('SPAM');
      }

      await contactEmailService.send({
        values,
        submittedAt: new Date().toISOString(),
      });
    },
  });
}
