export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const homeFaqs: FaqItem[] = [
  {
    id: 'locations',
    question: 'Which cities and regions do you serve?',
    answer:
      'We plan and execute events across India. Share your city and venue preferences in the enquiry form — our team will confirm feasibility, travel and logistics during the discovery call.',
  },
  {
    id: 'timeline',
    question: 'How far in advance should we book?',
    answer:
      'For weddings and large corporate events, we recommend reaching out 3–6 months ahead. Smaller activations or branded experiences may be accommodated on shorter timelines depending on scope and seasonality.',
  },
  {
    id: 'budget',
    question: 'How do you handle budgets and quotations?',
    answer:
      'We provide transparent, itemised proposals aligned to your objectives and budget range. Final costs depend on guest count, venue, production scale, creatives and vendor selections — we never promise fixed prices without understanding your brief.',
  },
  {
    id: 'vendors',
    question: 'Can we use our own vendors?',
    answer:
      'Yes, where it supports your vision and compliance requirements. We can also recommend trusted partners from our network and coordinate seamlessly with your preferred suppliers.',
  },
  {
    id: 'corporate',
    question: 'Do you manage AV, staging and delegate logistics?',
    answer:
      'Absolutely. Corporate conferences, launches and MICE programmes include technical production, run-of-show, registration, hospitality and on-site coordination as part of our end-to-end service.',
  },
  {
    id: 'payment',
    question: 'What are your payment terms?',
    answer:
      'Milestone-based schedules are typical — an advance to secure dates, followed by stage payments tied to planning milestones and final settlement post-event. Exact terms are shared in your formal proposal.',
  },
];

export const whyAuraFaqs: FaqItem[] = [
  ...homeFaqs,
  {
    id: 'consultancy',
    question: 'How do Credit Control and Healthcare Consultancy relate to events?',
    answer:
      'These are specialised business solutions offered alongside our core event and media services. They are listed separately so clients seeking event management are not confused — enquire via the contact form and we will route you to the right team.',
  },
];
