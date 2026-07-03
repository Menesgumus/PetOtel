import React from 'react';
import Link from 'next/link';

interface BreadcrumbsProps {
  items: { name: string; href: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="text-sm mb-8" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-2">
        <li>
          <Link href="/" className="text-brand-text/60 hover:text-brand-navy transition-colors">
            Anasayfa
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            <span className="text-brand-text/40">/</span>
            {index === items.length - 1 ? (
              <span className="text-brand-navy font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.href} className="text-brand-text/60 hover:text-brand-navy transition-colors">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
