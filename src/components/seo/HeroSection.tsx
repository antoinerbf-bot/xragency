import React from 'react';
import { EmberButton } from '@/components/site/primitives';
import { useLang } from '@/lib/i18n';

type HeroSectionProps = {
  title: string;
  description: string;
  subtitle?: string;
  tagline?: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
};

export function HeroSection({
  title,
  description,
  subtitle,
  tagline,
  ctaPrimary,
  ctaSecondary,
}: HeroSectionProps) {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center space-y-6">
        <h1 className="display-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-2">{title}</h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        )}
        {tagline && (
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto italic">{tagline}</p>
        )}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <EmberButton href={ctaPrimary.href} className="px-8 py-3 text-base">
            {ctaPrimary.label}
          </EmberButton>
          {ctaSecondary && (
            <EmberButton
              href={ctaSecondary.href}
              className="px-8 py-3 text-base bg-transparent border border-primary text-primary hover:bg-primary/10"
            >
              {ctaSecondary.label}
            </EmberButton>
          )}
        </div>
      </div>
    </section>
  );
}
