import React from 'react';
import Link from 'next/link';
import { resolveMediaUrl } from '@/lib/api/helpers';
import { ImagePlaceholder } from './ImagePlaceholder';

interface BlogCardProps {
  title: string;
  summary: string;
  href: string;
  date?: string;
  imageUrl?: string;
}

export function BlogCard({ title, summary, href, date, imageUrl }: BlogCardProps) {
  return (
    <Link href={href} className="group relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[2rem] border border-brand-border/80 bg-gradient-to-br from-white via-brand-soft/60 to-white shadow-[0_10px_30px_rgba(6,31,69,0.08)] ring-1 ring-white/70 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-gold/60 hover:shadow-[0_18px_45px_rgba(6,31,69,0.14)] active:scale-[0.99] active:border-brand-gold/50 focus-within:-translate-y-1 focus-within:border-brand-gold/60 focus-within:shadow-[0_18px_45px_rgba(6,31,69,0.14)] motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-gold/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
      />
      <div className="relative m-3 overflow-hidden rounded-[1.5rem] border border-white/80 bg-brand-soft shadow-inner">
        {imageUrl ? (
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <img
              src={resolveMediaUrl(imageUrl) || ""}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl opacity-30 transition-transform duration-500 ease-out group-hover:scale-[1.16] group-focus-within:scale-[1.16] motion-reduce:transform-none motion-reduce:transition-none"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-brand-navy/5"
            />
            <img
              src={resolveMediaUrl(imageUrl) || ""}
              alt={title}
              className="relative z-10 h-full w-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
            />
          </div>
        ) : (
          <div className="relative w-full aspect-[4/3] overflow-hidden flex flex-col items-center justify-center text-brand-text/50">
             <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-brand-navy/5"
            />
             <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none">
                <svg className="w-10 h-10 mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">Blog görseli yakında eklenecek</span>
             </div>
          </div>
        )}
      </div>
      <div className="relative flex flex-1 flex-col px-7 pb-7 pt-5">
        {date && <span className="text-sm text-brand-gold mb-2 font-medium">{date}</span>}
        <h3 className="text-xl font-bold tracking-tight text-brand-navy line-clamp-2">{title}</h3>
        <p className="mt-3 text-base leading-7 text-brand-text/70 line-clamp-2">{summary}</p>
        <span
          className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-brand-border bg-white/80 px-4 py-2 text-sm font-semibold text-brand-navy transition-all duration-300 group-hover:border-brand-gold/60 group-hover:bg-brand-navy group-hover:text-white group-focus-within:border-brand-gold/60 group-focus-within:bg-brand-navy group-focus-within:text-white"
        >
          Devamını Oku
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1 motion-reduce:transform-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
