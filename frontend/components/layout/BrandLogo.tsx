'use client';

import { useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/lib/site/config';

export function BrandLogo({ variant = 'header', showText = true }: { variant?: 'header' | 'footer', showText?: boolean }) {
  const [hasError, setHasError] = useState(false);
  const isFooter = variant === 'footer';

  if (hasError) {
    return (
      <div className="flex min-w-0 items-center space-x-3">
        <div className={`w-10 h-10 md:w-12 md:h-12 ${isFooter ? 'bg-brand-soft text-brand-navy' : 'bg-brand-navy text-white'} rounded-lg flex items-center justify-center font-bold text-sm shrink-0 shadow-sm border border-brand-navy/20`}>
          APH
        </div>
        {showText && (
          <span className={`truncate font-bold text-xl md:text-2xl leading-tight ${isFooter ? 'text-white' : 'text-brand-navy'}`}>
            {siteConfig.businessName}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-w-0 items-center space-x-3 md:space-x-4">
      {/* Logo Image */}
      <div className={`relative shrink-0 flex items-center justify-center ${
        isFooter 
          ? 'w-[48px] h-[48px] md:w-[72px] md:h-[72px]'
          : 'w-[48px] h-[48px] md:w-[72px] md:h-[72px]'
      }`}>
        <Image 
          src={isFooter ? "/brand/ankara-pet-house-icon-inverted.png" : "/brand/ankara-pet-house-icon.png"} 
          alt="Ankara Pet House Logo"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 48px, 72px"
          priority
          onError={() => setHasError(true)}
        />
      </div>
      
      {/* Brand Text */}
      {showText && (
        <span className={`truncate font-bold leading-tight ${
          isFooter ? 'text-white text-xl md:text-2xl' : 'text-brand-navy text-[22px] md:text-[28px]'
        }`}>
          {siteConfig.businessName}
        </span>
      )}
    </div>
  );
}
