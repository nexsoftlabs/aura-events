import { useEffect } from 'react';
import { getSiteUrl } from '@/lib/env';
import { siteConfig } from '@/data/siteConfig';

export interface PageSeo {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function PageSeoHead({ title, description, path = '', noIndex }: PageSeo) {
  const desc = description ?? siteConfig.seo.defaultDescription;
  const canonical = `${getSiteUrl()}${path.startsWith('/') ? path : `/${path}`}`;
  const fullTitle =
    title === siteConfig.seo.defaultTitle
      ? title
      : siteConfig.seo.titleTemplate.replace('%s', title);

  useEffect(() => {
    document.title = fullTitle;
    setMeta('description', desc);
    setLink('canonical', canonical);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', desc, true);
    setMeta('og:url', canonical, true);
    setMeta('og:type', 'website', true);
    setMeta('og:locale', siteConfig.seo.locale, true);
    setMeta('og:image', `${getSiteUrl()}${siteConfig.seo.ogImage}`, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', `${getSiteUrl()}${siteConfig.seo.ogImage}`);
    if (noIndex) {
      setMeta('robots', 'noindex, nofollow');
    } else {
      setMeta('robots', 'index, follow');
    }
  }, [fullTitle, desc, canonical, noIndex]);

  return null;
}

function useJsonLd(id: string, data: Record<string, unknown>) {
  const json = JSON.stringify(data);
  useEffect(() => {
    document.getElementById(id)?.remove();
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = json;
    document.head.appendChild(script);
    return () => script.remove();
  }, [id, json]);
}

export function OrganizationJsonLd() {
  useJsonLd('aura-org-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: getSiteUrl(),
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    ...(siteConfig.contact.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.contact.address,
            addressCountry: 'IN',
          },
        }
      : {}),
  });
  return null;
}

export function ServiceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  useJsonLd('aura-service-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${getSiteUrl()}${path}`,
    areaServed: { '@type': 'Country', name: 'India' },
    provider: { '@type': 'Organization', name: siteConfig.name, url: getSiteUrl() },
  });
  return null;
}
