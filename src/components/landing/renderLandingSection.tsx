import React from 'react';
import type { LandingSection } from '@/types/stepFormTypes';
import { LandingHero } from './LandingHero';
import { LandingTrustBadges } from './LandingTrustBadges';
import { LandingProblemsGrid } from './LandingProblemsGrid';
import { LandingCtaBanner } from './LandingCtaBanner';
import { LandingEmbeddedForm } from './LandingEmbeddedForm';
import { LandingBenefits } from './LandingBenefits';
import { LandingTeam } from './LandingTeam';
import { LandingFaq } from './LandingFaq';
import { LandingTestimonials } from './LandingTestimonials';
import { LandingTextImage } from './LandingTextImage';
import { LandingCustomHtml } from './LandingCustomHtml';
import { LandingCountdown } from './LandingCountdown';
import { LandingVideo } from './LandingVideo';
import { LandingNumbers } from './LandingNumbers';
import { LandingWhatsappCta } from './LandingWhatsappCta';
import { LandingLogoCarousel } from './LandingLogoCarousel';
import { LandingPriceTable } from './LandingPriceTable';
import { LandingProcessSteps } from './LandingProcessSteps';
import { LandingGuarantee } from './LandingGuarantee';

interface RenderOptions {
  primaryColor: string;
  onFormSubmit?: (data: Record<string, string>) => Promise<void>;
  isSubmitting?: boolean;
}

const PADDING_MAP: Record<string, string> = {
  none: '0px',
  sm: '24px',
  md: '48px',
  lg: '80px',
  xl: '120px',
};

const MAX_WIDTH_MAP: Record<string, string> = {
  normal: '72rem',
  wide: '90rem',
  full: '100%',
};

const SectionWrapper: React.FC<{
  config: Record<string, any>;
  children: React.ReactNode;
  sectionKey: string;
}> = ({ config, children, sectionKey }) => {
  const bgImage = config.section_bg_image;
  const overlayColor = config.section_overlay_color;
  const overlayOpacity = config.section_overlay_opacity ?? 0.5;
  const padding = config.section_padding || 'md';
  const minHeight = config.section_min_height || '';
  const maxWidth = config.section_max_width || 'normal';
  const rounded = config.section_rounded ?? false;

  const paddingY = PADDING_MAP[padding] || PADDING_MAP.md;
  const maxW = MAX_WIDTH_MAP[maxWidth] || MAX_WIDTH_MAP.normal;

  const hasCustomStyle = bgImage || overlayColor || minHeight || padding !== 'md' || maxWidth !== 'normal' || rounded;
  if (!hasCustomStyle) return <>{children}</>;

  return (
    <div
      key={sectionKey}
      className="relative w-full"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: minHeight || undefined,
        borderRadius: rounded ? '1rem' : undefined,
        overflow: rounded ? 'hidden' : undefined,
      }}
    >
      {bgImage && overlayColor && (
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
        />
      )}
      <div
        className="relative z-10 mx-auto w-full"
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
          maxWidth: maxW,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const renderLandingSection = (
  section: LandingSection,
  options: RenderOptions,
): React.ReactNode => {
  const { primaryColor, onFormSubmit, isSubmitting } = options;
  const props = { config: section.config, primaryColor };

  let content: React.ReactNode = null;

  switch (section.type) {
    case 'hero': content = <LandingHero {...props} />; break;
    case 'trust_badges': content = <LandingTrustBadges {...props} />; break;
    case 'problems_grid': content = <LandingProblemsGrid {...props} />; break;
    case 'cta_banner': content = <LandingCtaBanner {...props} />; break;
    case 'embedded_form': content = (
      <LandingEmbeddedForm
        {...props}
        onSubmit={onFormSubmit || (async () => {})}
        isSubmitting={isSubmitting || false}
      />
    ); break;
    case 'benefits': content = <LandingBenefits {...props} />; break;
    case 'team': content = <LandingTeam {...props} />; break;
    case 'faq': content = <LandingFaq {...props} />; break;
    case 'testimonials': content = <LandingTestimonials {...props} />; break;
    case 'text_image': content = <LandingTextImage {...props} />; break;
    case 'custom_html': content = <LandingCustomHtml config={section.config} />; break;
    case 'countdown': content = <LandingCountdown {...props} />; break;
    case 'video': content = <LandingVideo {...props} />; break;
    case 'numbers': content = <LandingNumbers {...props} />; break;
    case 'whatsapp_cta': content = <LandingWhatsappCta {...props} />; break;
    case 'logo_carousel': content = <LandingLogoCarousel {...props} />; break;
    case 'price_table': content = <LandingPriceTable {...props} />; break;
    case 'process_steps': content = <LandingProcessSteps {...props} />; break;
    case 'guarantee': content = <LandingGuarantee {...props} />; break;
    default: return null;
  }

  return (
    <SectionWrapper key={section.id} config={section.config} sectionKey={section.id}>
      {content}
    </SectionWrapper>
  );
};
