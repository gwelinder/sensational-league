'use client';

import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

const colorMap: Record<string, string> = {
  black: 'text-black',
  volt: 'text-[var(--color-volt)]',
  white: 'text-white',
  orange: 'text-[var(--color-orange)]',
  purple: 'text-[var(--color-purple)]',
  cyan: 'text-[var(--color-cyan)]',
};

const components: PortableTextComponents = {
  marks: {
    colorBlack: ({ children }) => <span className="text-black">{children}</span>,
    colorVolt: ({ children }) => <span className="text-[var(--color-volt)]">{children}</span>,
    colorWhite: ({ children }) => <span className="text-white">{children}</span>,
    colorOrange: ({ children }) => <span className="text-[var(--color-orange)]">{children}</span>,
    colorPurple: ({ children }) => <span className="text-[var(--color-purple)]">{children}</span>,
    colorCyan: ({ children }) => <span className="text-[var(--color-cyan)]">{children}</span>,
  },
  block: {
    normal: ({ children }) => <>{children}</>,
  },
};

interface StyledTextRendererProps {
  value: PortableTextBlock[];
  className?: string;
}

export default function StyledTextRenderer({ value, className }: StyledTextRendererProps) {
  if (!value || value.length === 0) return null;

  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
