import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Reveal } from '@/components/ui/reveal';

vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => true),
}));

describe('Reveal with reduced motion', () => {
  it('renders content statically without animation styles', () => {
    render(<Reveal className="target">Content</Reveal>);
    const el = screen.getByText('Content');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('target');
    expect(el.getAttribute('style')).toBeNull();
  });
});
