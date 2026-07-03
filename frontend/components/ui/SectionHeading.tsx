import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-brand-text/80 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
