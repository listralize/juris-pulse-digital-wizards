import React from 'react';
import { ChevronUp, ChevronDown, Copy, Trash2 } from 'lucide-react';
import type { LandingSection } from '@/types/stepFormTypes';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingTrustBadges } from '@/components/landing/LandingTrustBadges';
import { LandingProblemsGrid } from '@/components/landing/LandingProblemsGrid';
import { LandingCtaBanner } from '@/components/landing/LandingCtaBanner';
import { LandingEmbeddedForm } from '@/components/landing/LandingEmbeddedForm';
import { LandingBenefits } from '@/components/landing/LandingBenefits';
import { LandingTeam } from '@/components/landing/LandingTeam';
import { LandingFaq } from '@/components/landing/LandingFaq';
import { LandingTestimonials } from '@/components/landing/LandingTestimonials';
import { LandingTextImage } from '@/components/landing/LandingTextImage';
import { LandingCustomHtml } from '@/components/landing/LandingCustomHtml';
import { LandingCountdown } from '@/components/landing/LandingCountdown';
import { LandingVideo } from '@/components/landing/LandingVideo';
import { LandingNumbers } from '@/components/landing/LandingNumbers';
import { LandingWhatsappCta } from '@/components/landing/LandingWhatsappCta';
import { LandingLogoCarousel } from '@/components/landing/LandingLogoCarousel';

const LABELS: Record<string, string> = {
  hero: 'Hero', trust_badges: 'Badges', problems_grid: 'Problemas', cta_banner: 'CTA',
  embedded_form: 'Formulário', benefits: 'Benefícios', team: 'Equipe', faq: 'FAQ',
  testimonials: 'Depoimentos', text_image: 'Texto+Imagem', custom_html: 'HTML',
  countdown: 'Contador', video: 'Vídeo', numbers: 'Números',
  whatsapp_cta: 'WhatsApp', logo_carousel: 'Logos',
};

interface LandingPreviewProps {
  sections: LandingSection[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  onMove: (id: string, dir: 'up' | 'down') => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export const LandingPreview: React.FC<LandingPreviewProps> = ({
  sections, selectedId, onSelect, primaryColor, backgroundColor, textColor,
  onMove, onDuplicate, onDelete,
}) => {
  const renderSection = (section: LandingSection) => {
    const props = { config: section.config, primaryColor };
    switch (section.type) {
      case 'hero': return <LandingHero {...props} />;
      case 'trust_badges': return <LandingTrustBadges {...props} />;
      case 'problems_grid': return <LandingProblemsGrid {...props} />;
      case 'cta_banner': return <LandingCtaBanner {...props} />;
      case 'embedded_form': return <LandingEmbeddedForm {...props} onSubmit={async () => {}} isSubmitting={false} />;
      case 'benefits': return <LandingBenefits {...props} />;
      case 'team': return <LandingTeam {...props} />;
      case 'faq': return <LandingFaq {...props} />;
      case 'testimonials': return <LandingTestimonials {...props} />;
      case 'text_image': return <LandingTextImage {...props} />;
      case 'custom_html': return <LandingCustomHtml config={section.config} />;
      case 'countdown': return <LandingCountdown {...props} />;
      case 'video': return <LandingVideo {...props} />;
      case 'numbers': return <LandingNumbers {...props} />;
      case 'whatsapp_cta': return <LandingWhatsappCta {...props} />;
      case 'logo_carousel': return <LandingLogoCarousel {...props} />;
      default: return <div className="p-8 text-center text-muted-foreground">Seção: {section.type}</div>;
    }
  };

  if (sections.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 rounded-xl border-2 border-dashed border-muted-foreground/20">
        <p className="text-muted-foreground">Adicione seções para visualizar a página</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border" style={{ backgroundColor, color: textColor }}>
      {sections.map((section) => {
        const isSelected = selectedId === section.id;
        const isHidden = section.hidden;

        return (
          <div
            key={section.id}
            className={`relative group cursor-pointer transition-all ${
              isHidden ? 'opacity-30 grayscale' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(isSelected ? null : section.id);
            }}
          >
            {/* Hover/selected overlay */}
            <div className={`absolute inset-0 z-10 pointer-events-none transition-all ${
              isSelected
                ? 'ring-2 ring-primary ring-inset'
                : 'group-hover:ring-1 group-hover:ring-primary/40 group-hover:ring-inset'
            }`} />

            {/* Label */}
            <div className={`absolute top-2 left-2 z-20 text-xs font-medium px-2 py-0.5 rounded-md transition-opacity ${
              isSelected
                ? 'bg-primary text-primary-foreground opacity-100'
                : 'bg-foreground/80 text-background opacity-0 group-hover:opacity-100'
            }`}>
              {LABELS[section.type] || section.type}
            </div>

            {/* Action buttons */}
            <div className={`absolute top-2 right-2 z-20 flex gap-1 transition-opacity ${
              isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}>
              {[
                { icon: ChevronUp, action: () => onMove(section.id, 'up'), label: 'Mover para cima' },
                { icon: ChevronDown, action: () => onMove(section.id, 'down'), label: 'Mover para baixo' },
                { icon: Copy, action: () => onDuplicate(section.id), label: 'Duplicar' },
                { icon: Trash2, action: () => onDelete(section.id), label: 'Excluir', destructive: true },
              ].map(({ icon: Icon, action, destructive }, i) => (
                <button
                  key={i}
                  className={`p-1 rounded-md shadow-sm transition-colors ${
                    destructive
                      ? 'bg-destructive/90 text-destructive-foreground hover:bg-destructive'
                      : 'bg-background/90 text-foreground hover:bg-background'
                  }`}
                  onClick={(e) => { e.stopPropagation(); action(); }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>

            {/* Actual section content */}
            <div className="pointer-events-none">
              {renderSection(section)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
