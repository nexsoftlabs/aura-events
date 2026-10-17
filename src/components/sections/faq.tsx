import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { FaqItem } from '@/data/faqs';
import { homeFaqs } from '@/data/faqs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';

interface FaqSectionProps {
  items?: FaqItem[];
  title?: string;
}

export function FaqSection({ items = homeFaqs, title = 'Questions, answered.' }: FaqSectionProps) {
  return (
    <Section id="faq" className="bg-ivory">
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="FAQ"
              title={title}
              description="Practical answers for planning events in India. Can't find what you need? We'd love to hear from you."
            />
            <Reveal delay={0.1} className="mt-10">
              <Button asChild variant="dark">
                <Link to="/contact">
                  Ask us anything
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
        <Reveal className="lg:col-span-7 lg:col-start-6">
          <Accordion type="single" collapsible defaultValue={items[0]?.id} className="border-t border-sand">
            {items.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </Section>
  );
}
