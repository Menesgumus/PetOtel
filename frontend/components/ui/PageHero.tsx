import React from 'react';
import { Container } from './Container';

interface PageHeroProps {
  title: string;
  description?: string;
}

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <div className="bg-brand-soft border-b border-brand-border py-12 md:py-16">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-brand-navy">{title}</h1>
          {description && (
            <p className="text-lg md:text-xl text-brand-text/80 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
