import { useEffect } from 'react';
import { env } from '@/lib/env';
import { siteConfig } from '@/data/siteConfig';

export function AnalyticsLoader() {
  useEffect(() => {
    if (!siteConfig.featureFlags.enableAnalytics || !env.VITE_GA_MEASUREMENT_ID) return;

    const id = env.VITE_GA_MEASUREMENT_ID;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer ?? [];
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    }
    gtag('js', new Date());
    gtag('config', id, { anonymize_ip: true });

    return () => {
      script.remove();
    };
  }, []);

  return null;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}
