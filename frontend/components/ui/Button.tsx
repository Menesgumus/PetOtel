import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold';
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({ variant = 'primary', href, children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-brand-navy text-white hover:bg-brand-navy/90 focus:ring-brand-navy',
    secondary: 'bg-brand-soft text-brand-navy hover:bg-brand-border focus:ring-brand-border',
    outline: 'border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white focus:ring-brand-navy',
    gold: 'bg-brand-gold text-white hover:bg-[#b8955a] focus:ring-brand-gold',
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    // If it's an external link or tel/mailto link
    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return (
        <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
          {children}
        </a>
      );
    }
    // Internal link
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
