import { useQuery } from '@tanstack/react-query';
import { contactHealthUrl } from '@/lib/contact-api';

async function fetchMailConfigured(): Promise<boolean> {
  try {
    const res = await fetch(contactHealthUrl());
    if (!res.ok) return false;
    const data = (await res.json()) as { mailConfigured?: boolean };
    return data.mailConfigured === true;
  } catch {
    return false;
  }
}

export function useContactHealth() {
  return useQuery({
    queryKey: ['contact-health', contactHealthUrl()],
    queryFn: fetchMailConfigured,
    staleTime: 60_000,
    retry: 1,
  });
}
