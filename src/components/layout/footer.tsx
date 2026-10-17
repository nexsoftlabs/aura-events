import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { footerNav } from '@/data/navigation';
import { serviceCategories, getServicesByCategory } from '@/data/services';
import { Container } from '@/components/ui/container';
import { Logo } from '@/components/layout/logo';
import { getContactEmail, getWhatsAppLink } from '@/lib/contact-links';

export function Footer() {
  const year = new Date().getFullYear();
  const email = getContactEmail();
  const whatsapp = getWhatsAppLink('Hello Aura Events, I would like to enquire about an event.');
  const primaryCategories = serviceCategories.filter((c) => c.primary);
  const business = serviceCategories.find((c) => !c.primary);

  return (
    <footer className="relative overflow-hidden bg-midnight text-ivory/70">
      <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-[0.04]" />
      <Container className="relative">
        <div className="flex flex-col gap-10 border-b border-white/10 py-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-champagne">Begin your story</p>
            <p className="mt-5 font-display text-[2.75rem] leading-[1.02] text-ivory sm:text-6xl lg:text-7xl">
              Let&rsquo;s create something <em className="text-champagne-light">unforgettable.</em>
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-4 self-start rounded-full border border-champagne/40 py-2 pl-7 pr-2 text-ivory transition-colors hover:border-champagne lg:self-auto"
          >
            <span className="text-sm font-semibold tracking-wide">Plan Your Event</span>
            <span className="flex size-12 items-center justify-center rounded-full bg-champagne text-midnight transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight aria-hidden className="size-5" />
            </span>
          </Link>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/55">{siteConfig.description}</p>
            <ul className="mt-8 space-y-3 text-sm">
              {email ? (
                <li>
                  <a href={`mailto:${email}`} className="inline-flex items-center gap-3 hover:text-champagne-light">
                    <Mail aria-hidden className="size-4 text-champagne" />
                    {email}
                  </a>
                </li>
              ) : null}
              {whatsapp ? (
                <li>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 hover:text-champagne-light"
                  >
                    <MessageCircle aria-hidden className="size-4 text-champagne" />
                    Chat on WhatsApp
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h2 className="eyebrow text-ivory/40">Services</h2>
            <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2">
              {primaryCategories.flatMap((cat) => getServicesByCategory(cat.id)).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="link-underline hover:text-ivory">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
            {business ? (
              <>
                <h3 className="eyebrow mt-8 text-ivory/40">{business.label}</h3>
                <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2.5 text-sm">
                  {getServicesByCategory(business.id).map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`} className="link-underline hover:text-ivory">
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-ivory/40">Company</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="link-underline hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="eyebrow mt-8 text-ivory/40">Service area</h2>
            <p className="mt-4 text-sm">{siteConfig.contact.serviceAreas.join(' · ')}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {footerNav.legal.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
