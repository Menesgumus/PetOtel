import React from 'react';

interface ContactActionCardProps {
  title: string;
  description: string;
  actionText: string;
  href: string;
  icon: React.ReactNode;
  primary?: boolean;
}

export function ContactActionCard({ title, description, actionText, href, icon, primary = false }: ContactActionCardProps) {
  const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');
  
  const content = (
    <div className={`h-full p-8 rounded-2xl border transition-all duration-300 ease-out flex flex-col items-center text-center motion-reduce:transform-none motion-reduce:transition-none group-focus-within:-translate-y-1 group-focus-within:shadow-xl group-active:scale-[0.99] ${
      primary 
        ? 'bg-brand-navy border-brand-navy text-white shadow-lg group-hover:shadow-xl group-hover:-translate-y-1 group-focus-within:border-brand-gold/50 group-active:border-brand-gold/50' 
        : 'bg-white border-brand-border text-brand-navy group-hover:-translate-y-1 group-hover:border-brand-gold/50 group-hover:shadow-xl group-focus-within:border-brand-gold/50 group-active:border-brand-gold/50'
    }`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
        primary ? 'bg-white/10 text-white' : 'bg-brand-soft text-brand-navy'
      }`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className={`mb-8 flex-grow ${primary ? 'text-white/80' : 'text-brand-text/80'}`}>
        {description}
      </p>
      <div className={`w-full py-3 px-6 rounded-lg font-bold transition-colors ${
        primary 
          ? 'bg-brand-gold text-white hover:bg-white hover:text-brand-navy' 
          : 'bg-brand-soft text-brand-navy group-hover:bg-brand-navy group-hover:text-white'
      }`}>
        {actionText}
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={href} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2" target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {content}
      </a>
    );
  }

  return (
    <a href={href} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2">
      {content}
    </a>
  );
}
