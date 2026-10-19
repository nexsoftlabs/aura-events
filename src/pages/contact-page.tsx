import { useSearchParams } from 'react-router-dom';
import { Building2, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { PageSeoHead } from '@/lib/seo';
import { siteConfig } from '@/data/siteConfig';
import { images } from '@/data/images';
import { ContactForm } from '@/features/contact/contact-form';
import { PageHero } from '@/components/layout/page-hero';
import { Container, Section } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import {
  getContactEmail,
  getContactPhone,
  getMapsSearchUrl,
  getOfficeAddress,
  getTelHref,
  getWhatsAppLink,
} from '@/lib/contact-links';

export function ContactPage() {
  const [params] = useSearchParams();
  const service = params.get('service') ?? undefined;
  const email = getContactEmail();
  const phone = getContactPhone();
  const address = getOfficeAddress();
  const whatsapp = getWhatsAppLink('Hello Aura Events, I would like to enquire about an event.');

  const channels = [
    email ? { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` } : null,
    phone ? { icon: Phone, label: 'Phone', value: phone, href: getTelHref(phone) } : null,
    address
      ? {
          icon: Building2,
          label: 'Office',
          value: address,
          href: getMapsSearchUrl(address),
          external: true,
        }
      : null,
    whatsapp ? { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with our team', href: whatsapp, external: true } : null,
    { icon: MapPin, label: 'Service area', value: siteConfig.contact.serviceAreas.join(', ') },
    siteConfig.contact.businessHours ? { icon: Clock, label: 'Hours', value: siteConfig.contact.businessHours } : null,
  ].filter((c) => c !== null);

  return (
    <>
      <PageSeoHead
        title="Contact"
        description="Plan your event with Aura Events. Enquire about corporate events, weddings, branding, film and media production."
        path="/contact"
      />
      <PageHero
        eyebrow="Plan your event"
        photo={images.contact}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        title={
          <>
            Let&rsquo;s begin <em className="text-champagne-light">your story.</em>
          </>
        }
        description="Tell us about your occasion, your city and your vision. We usually reply within one to two business days."
      />

      <Section className="bg-ivory pt-0 md:pt-0">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="relative z-10 -mt-12 rounded-[2rem] bg-white p-6 shadow-[0_40px_80px_-40px_rgba(16,20,29,0.35)] sm:p-10 md:-mt-16 lg:col-span-8 lg:p-14">
            <ContactForm preselectedService={service} />
          </Reveal>

          <aside className="space-y-8 lg:col-span-4 lg:pt-16">
            <Reveal>
              <h2 className="text-3xl text-midnight">Other ways to reach us</h2>
              <ul className="mt-8 divide-y divide-sand border-y border-sand">
                {channels.map((c) => {
                  const Icon = c.icon;
                  const body = (
                    <>
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-midnight text-champagne">
                        <Icon aria-hidden className="size-4" />
                      </span>
                      <span>
                        <span className="eyebrow block text-bronze">{c.label}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-midnight">{c.value}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={c.label}>
                      {'href' in c && c.href ? (
                        <a
                          href={c.href}
                          {...('external' in c && c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="flex items-center gap-4 py-5 transition-colors hover:text-bronze"
                        >
                          {body}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 py-5">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="rounded-[1.5rem] bg-midnight p-8 text-ivory">
              <p className="eyebrow text-champagne">What happens next</p>
              <ol className="mt-6 space-y-5 text-sm text-ivory/75">
                {[
                  'We review your brief and match you with a planner.',
                  'A discovery call to understand your goals and budget.',
                  'A tailored proposal with transparent, itemised pricing.',
                ].map((t, i) => (
                  <li key={t} className="flex gap-4">
                    <span className="font-display text-lg text-champagne">0{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
            </Reveal>
          </aside>
        </Container>
      </Section>
    </>
  );
}
