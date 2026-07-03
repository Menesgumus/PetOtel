import React from 'react';
import Link from 'next/link';
import { resolveMediaUrl } from '@/lib/api/helpers';
import { ImagePlaceholder } from './ImagePlaceholder';
import { siteConfig } from '@/lib/site/config';

interface RoomCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

export function RoomCard({ title, description, imageUrl }: RoomCardProps) {
  return (
    <div className="
      group relative flex h-full flex-col overflow-hidden rounded-[2rem]
      border border-brand-border/80
      bg-gradient-to-br from-white via-brand-cream/60 to-white
      shadow-[0_10px_30px_rgba(6,31,69,0.08)]
      ring-1 ring-white/70
      transition-all duration-300 ease-out
      hover:-translate-y-1 hover:border-brand-gold/60 hover:shadow-[0_18px_45px_rgba(6,31,69,0.14)]
      focus-within:-translate-y-1 focus-within:border-brand-gold/60 focus-within:shadow-[0_18px_45px_rgba(6,31,69,0.14)]
      active:scale-[0.99]
      motion-reduce:transform-none motion-reduce:transition-none
    ">
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full
          bg-brand-gold/10 blur-3xl opacity-0
          transition-opacity duration-300
          group-hover:opacity-100 group-focus-within:opacity-100
        "
      />
      <div className="relative m-3 overflow-hidden rounded-[1.5rem] border border-white/80 bg-brand-cream shadow-inner">
        {imageUrl ? (
          <div className="relative w-full aspect-[4/3]">
            <img
              src={resolveMediaUrl(imageUrl) || ""}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover blur-xl opacity-30 scale-110 transition-transform duration-500 ease-out group-hover:scale-[1.16] motion-reduce:transform-none motion-reduce:transition-none"
            />
            <img
              src={resolveMediaUrl(imageUrl) || ""}
              alt={title}
              className="relative z-10 h-full w-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
            />
          </div>
        ) : (
          <ImagePlaceholder aspectRatio="4/3" text="Fotoğraf yüklenecek" className="transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none group-hover:opacity-90" />
        )}
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
        <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-3">{title}</h3>
        <p className="text-brand-text/80 mb-6 flex-grow">{description}</p>
        <a 
          href={`https://wa.me/${siteConfig.whatsapp.replace(/\s+/g, '')}`} 
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-auto inline-flex w-fit items-center gap-2 rounded-full
            bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white
            shadow-[0_10px_24px_rgba(6,31,69,0.18)]
            transition-all duration-300
            hover:bg-brand-gold hover:text-brand-navy
            group-hover:bg-brand-gold group-hover:text-brand-navy
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2
          "
        >
          Bilgi Al
        </a>
      </div>
    </div>
  );
}
