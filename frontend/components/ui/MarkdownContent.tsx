import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) return null;

  return (
    <div className="break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => <h2 className="mt-12 scroll-mt-28 border-t border-brand-border/70 pt-8 text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">{children}</h2>,
          h3: ({ children }) => <h3 className="mt-8 mb-4 text-xl font-semibold text-brand-navy">{children}</h3>,
          p: ({ children }) => <p className="mb-6 text-[1.05rem] leading-8 text-brand-text/75">{children}</p>,
          ul: ({ children }) => <ul className="mb-8 grid gap-3 pl-0 [&>li]:flex [&>li]:gap-3 [&>li]:rounded-2xl [&>li]:bg-brand-cream/70 [&>li]:px-4 [&>li]:py-3 [&>li]:leading-7 [&>li]:text-brand-text/75 [&>li::before]:content-['✓'] [&>li::before]:mt-1 [&>li::before]:flex [&>li::before]:h-5 [&>li::before]:w-5 [&>li::before]:shrink-0 [&>li::before]:items-center [&>li::before]:justify-center [&>li::before]:rounded-full [&>li::before]:bg-brand-gold/15 [&>li::before]:text-xs [&>li::before]:font-bold [&>li::before]:text-brand-gold">{children}</ul>,
          ol: ({ children }) => <ol className="mb-8 list-decimal space-y-3 pl-6 text-[1.05rem] leading-8 text-brand-text/75">{children}</ol>,
          li: ({ children }) => <li className="leading-7">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-brand-navy">{children}</strong>,
          a: ({ href, children }) => (
            <a href={href} className="text-brand-gold hover:underline font-medium break-all" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
