import type { LucideIcon } from 'lucide-react';
import { BadgeCheck, Clock3, Gem, Handshake, Headset, Palette, Sparkles } from 'lucide-react';

export interface ValueProposition {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

/** Owner-supplied positioning — keep wording truthful and confirm absolute claims before launch. */
export const valuePropositions: ValueProposition[] = [
  {
    id: 'personalized',
    title: 'Personalised planning',
    description:
      'Every brief is different. Concepts, timelines and vendor choices are shaped around your vision, your culture and your guests.',
    icon: Sparkles,
  },
  {
    id: 'creative',
    title: 'Creative branding & marketing',
    description:
      'Identity, campaigns and on-ground activations designed as one story, so your brand looks and feels consistent everywhere.',
    icon: Palette,
  },
  {
    id: 'experience',
    title: 'An experienced team',
    description:
      'Planners, producers and creatives who have delivered events across industries, from boardrooms to banquet halls.',
    icon: BadgeCheck,
  },
  {
    id: 'vendors',
    title: 'Premium vendor network',
    description:
      'Trusted partners for décor, staging, AV, catering, entertainment and media, chosen for quality and reliability.',
    icon: Gem,
  },
  {
    id: 'pricing',
    title: 'Transparent pricing',
    description:
      'Clear, itemised proposals with no surprise additions. Every change is discussed and approved with you first.',
    icon: Handshake,
  },
  {
    id: 'execution',
    title: 'On-time execution',
    description:
      'Detailed run-of-show documents, rehearsals and proactive problem-solving, so the day runs to the minute.',
    icon: Clock3,
  },
  {
    id: 'support',
    title: 'A dedicated event manager',
    description:
      'One accountable point of contact from first call to final applause, available when it matters most.',
    icon: Headset,
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    description: 'We listen first — goals, audience, culture, constraints and the feeling you want guests to leave with.',
  },
  {
    step: '02',
    title: 'Conceptualise',
    description: 'Mood boards, themes and creative routes that balance brand, emotion and practical logistics.',
  },
  {
    step: '03',
    title: 'Plan',
    description: 'Budgets, timelines, venues, vendors and technical specifications — documented and agreed together.',
  },
  {
    step: '04',
    title: 'Produce',
    description: 'Fabrication, content, rehearsals and on-site build, with quality checks at every stage.',
  },
  {
    step: '05',
    title: 'Celebrate & measure',
    description: 'Seamless event-day coordination, followed by wrap reports for brands and keepsakes for families.',
  },
];

export const commitments = [
  {
    title: 'Honest scope',
    text: 'We flag risks early and only promise what we can deliver beautifully.',
  },
  {
    title: 'Respect for tradition',
    text: 'Rituals, regional customs and family preferences are planned with care.',
  },
  {
    title: 'Confidentiality',
    text: 'Corporate launches and private celebrations are handled with discretion.',
  },
  {
    title: 'Clear communication',
    text: 'Regular updates, shared timelines and a single accountable contact.',
  },
];
