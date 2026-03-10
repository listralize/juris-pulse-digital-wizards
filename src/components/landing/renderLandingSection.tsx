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

export const renderLandingSection = (
  section: LandingSection,
  options: RenderOptions,
): React.ReactNode => {
  const { primaryColor, onFormSubmit, isSubmitting } = options;
  const props = { config: section.config, primaryColor };

  switch (section.type) {
    case 'hero': return <LandingHero key={section.id} {...props} />;
    case 'trust_badges': return <LandingTrustBadges key={section.id} {...props} />;
    case 'problems_grid': return <LandingProblemsGrid key={section.id} {...props} />;
    case 'cta_banner': return <LandingCtaBanner key={section.id} {...props} />;
    case 'embedded_form': return (
      <LandingEmbeddedForm
        key={section.id}
        {...props}
        onSubmit={onFormSubmit || (async () => {})}
        isSubmitting={isSubmitting || false}
      />
    );
    case 'benefits': return <LandingBenefits key={section.id} {...props} />;
    case 'team': return <LandingTeam key={section.id} {...props} />;
    case 'faq': return <LandingFaq key={section.id} {...props} />;
    case 'testimonials': return <LandingTestimonials key={section.id} {...props} />;
    case 'text_image': return <LandingTextImage key={section.id} {...props} />;
    case 'custom_html': return <LandingCustomHtml key={section.id} config={section.config} />;
    case 'countdown': return <LandingCountdown key={section.id} {...props} />;
    case 'video': return <LandingVideo key={section.id} {...props} />;
    case 'numbers': return <LandingNumbers key={section.id} {...props} />;
    case 'whatsapp_cta': return <LandingWhatsappCta key={section.id} {...props} />;
    case 'logo_carousel': return <LandingLogoCarousel key={section.id} {...props} />;
    case 'price_table': return <LandingPriceTable key={section.id} {...props} />;
    case 'process_steps': return <LandingProcessSteps key={section.id} {...props} />;
    case 'guarantee': return <LandingGuarantee key={section.id} {...props} />;
    default: return null;
  }
};
