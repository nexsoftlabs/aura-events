import type { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RevealProps extends Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'id'> {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: 'div' | 'li';
}

export function Reveal({ children, delay = 0, y = 28, as = 'div', className, id }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} id={id}>
        {children}
      </Tag>
    );
  }

  const MotionTag = as === 'li' ? motion.li : motion.div;
  return (
    <MotionTag
      className={className}
      id={id}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
