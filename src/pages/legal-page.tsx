import type { ReactNode } from 'react';
import { PageSeoHead } from '@/lib/seo';
import { Container, Section } from '@/components/ui/container';
import { PageHero } from '@/components/layout/page-hero';
import { siteConfig } from '@/data/siteConfig';

interface LegalPageProps {
  title: string;
  path: string;
  children: ReactNode;
}

export function LegalPage({ title, path, children }: LegalPageProps) {
  return (
    <>
      <PageSeoHead title={title} path={path} noIndex />
      <PageHero
        eyebrow="Legal"
        title={title}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: title }]}
        description="Draft starter copy for owner and legal review before launch."
      />
      <Section className="bg-ivory">
        <Container className="max-w-3xl space-y-5 text-[0.9875rem] leading-relaxed text-mist [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:text-midnight">
          {children}
        </Container>
      </Section>
    </>
  );
}

export function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy">
      <p>
        {siteConfig.legalName} (&quot;we&quot;, &quot;us&quot;) respects your privacy. This draft policy describes how we
        collect and use information when you submit an enquiry through our website.
      </p>
      <h2>Information we collect</h2>
      <p>
        When you complete the contact form, we collect the details you provide (such as name, email,
        phone number, event information and message) solely to respond to your enquiry.
      </p>
      <h2>How we use information</h2>
      <p>
        We use your information to communicate about your event, provide quotations and deliver our
        services if you engage us. We do not sell your personal information.
      </p>
      <h2>Third-party services</h2>
      <p>
        Enquiries may be processed via EmailJS or similar providers. Please review their privacy
        policies and configure domain restrictions in your EmailJS dashboard.
      </p>
      <h2>Your rights</h2>
      <p>
        You may request access, correction or deletion of your personal data by contacting us using the
        details on our contact page.
      </p>
      <h2>Contact</h2>
      <p>Questions about this policy should be directed to the contact email listed on our website.</p>
    </LegalPage>
  );
}

export function TermsPage() {
  return (
    <LegalPage title="Terms of Service" path="/terms">
      <p>
        These draft terms govern use of the {siteConfig.name} website. By accessing this site, you agree
        to these terms. Have counsel review before launch.
      </p>
      <h2>Website content</h2>
      <p>
        Content is provided for general information. Service descriptions, imagery and metrics may be
        updated. We strive for accuracy but do not warrant that all content is complete or current.
      </p>
      <h2>Enquiries</h2>
      <p>
        Submitting a contact form does not create a binding contract. Proposals and agreements are
        subject to separate written confirmation.
      </p>
      <h2>Intellectual property</h2>
      <p>
        Site design, text and branded materials are owned by {siteConfig.legalName} or licensors.
        Unauthorised reproduction is prohibited.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, we are not liable for indirect damages arising from use of
        this website.
      </p>
    </LegalPage>
  );
}
