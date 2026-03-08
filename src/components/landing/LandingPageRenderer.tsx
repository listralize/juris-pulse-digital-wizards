import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';
import type { StepFormData, LandingSection } from '@/types/stepFormTypes';
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
import { StepFormFooter } from '@/components/stepform/StepFormFooter';

interface LandingPageRendererProps {
  form: StepFormData;
}

export const LandingPageRenderer: React.FC<LandingPageRendererProps> = ({ form }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const primaryColor = form.styles.primary_color || '#4CAF50';

  const sections = ((form.sections || []) as LandingSection[])
    .sort((a, b) => a.display_order - b.display_order);

  const handleFormSubmit = async (data: Record<string, string>) => {
    setIsSubmitting(true);
    try {
      const sessionId = `lp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const leadData = {
        ...data,
        form_name: form.name,
        form_slug: form.slug,
        page_type: 'landing_page',
      };

      // Save to form_leads
      await supabase.from('form_leads').insert({
        session_id: sessionId,
        lead_data: leadData,
        form_id: form.slug,
        form_name: form.name,
        source_page: window.location.href,
        referrer: document.referrer || null,
      });

      // Save to conversion_events
      await supabase.from('conversion_events').insert({
        session_id: sessionId,
        event_type: 'form_submission',
        event_action: 'landing_page_submit',
        page_url: window.location.href,
        form_id: form.slug,
        form_name: form.name,
        lead_data: leadData,
      });

      // Webhook
      if (form.webhook_url) {
        try {
          await fetch(form.webhook_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...leadData, timestamp: new Date().toISOString() }),
          });
        } catch (e) {
          logger.error('Webhook error:', e);
        }
      }

      toast({ title: 'Enviado com sucesso!', description: 'Entraremos em contato em breve.' });

      // Redirect
      const redirectUrl = form.redirect_url || '/obrigado';
      if (redirectUrl.startsWith('http')) {
        window.location.href = redirectUrl;
      } else {
        navigate(redirectUrl);
      }
    } catch (error) {
      logger.error('Landing page submit error:', error);
      toast({ title: 'Erro', description: 'Erro ao enviar. Tente novamente.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = (section: LandingSection) => {
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
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      );
      case 'benefits': return <LandingBenefits key={section.id} {...props} />;
      case 'team': return <LandingTeam key={section.id} {...props} />;
      case 'faq': return <LandingFaq key={section.id} {...props} />;
      case 'testimonials': return <LandingTestimonials key={section.id} {...props} />;
      case 'text_image': return <LandingTextImage key={section.id} {...props} />;
      case 'custom_html': return <LandingCustomHtml key={section.id} config={section.config} />;
      default: return null;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: form.styles.background_color || '#ffffff', color: form.styles.text_color || '#000000' }}
    >
      {sections.map(renderSection)}
      <StepFormFooter footerConfig={form.footer_config} />
    </div>
  );
};
