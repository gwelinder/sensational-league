'use client';

import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

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
  value?: PortableTextBlock[] | null;
  className?: string;
}

export default function StyledTextRenderer({ value, className }: StyledTextRendererProps) {
  // Handle null, undefined, or empty arrays
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }

  // Validate that we have proper Portable Text blocks
  const hasValidBlocks = value.every(
    (block) => block && typeof block === 'object' && '_type' in block
  );

  if (!hasValidBlocks) {
    console.warn('StyledTextRenderer received invalid Portable Text data:', value);
    return null;
  }

	const content = <PortableText value={value} components={components} />;

	if (className) {
		return <div className={className}>{content}</div>;
	}

	return content;
}
