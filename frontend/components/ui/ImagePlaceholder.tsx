import React from 'react';

interface ImagePlaceholderProps {
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide' | '4/3' | '5/4';
  className?: string;
  text?: string;
}

export function ImagePlaceholder({ 
  aspectRatio = 'video', 
  className = '', 
  text = 'Gerçek fotoğraf yüklenecek' 
}: ImagePlaceholderProps) {
  const ratios = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
    '4/3': 'aspect-[4/3]',
    '5/4': 'aspect-[5/4]'
  };

  return (
    <div className={`bg-brand-soft border border-brand-border flex flex-col items-center justify-center text-brand-text/50 w-full rounded-lg overflow-hidden shadow-sm ${ratios[aspectRatio]} ${className}`}>
      <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
