import type { ReactNode } from 'react';

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  lede?: string;
};

/** Consistent section opener: mono index + label, then a headline and optional lede. */
export default function SectionHead({ index, label, title, lede }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="flex items-baseline gap-4 lg:col-span-3" data-reveal>
        <span className="font-mono text-micro text-faint">{index}</span>
        <span className="eyebrow">{label}</span>
      </div>
      <div className="lg:col-span-9">
        <h2
          className="max-w-[22ch] text-headline font-medium text-balance"
          data-reveal
          style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
        >
          {title}
        </h2>
        {lede && (
          <p
            className="mt-6 max-w-prose text-lede text-muted text-pretty"
            data-reveal
            style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
          >
            {lede}
          </p>
        )}
      </div>
    </div>
  );
}
