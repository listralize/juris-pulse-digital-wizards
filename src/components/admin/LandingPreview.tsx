import React from 'react';
import { ChevronUp, ChevronDown, Copy, Trash2 } from 'lucide-react';
import type { LandingSection } from '@/types/stepFormTypes';
import { renderLandingSection } from '@/components/landing/renderLandingSection';

const LABELS: Record<string, string> = {
  hero: 'Hero', trust_badges: 'Badges', problems_grid: 'Problemas', cta_banner: 'CTA',
  embedded_form: 'Formulário', embedded_stepform: 'Quiz Integrado', benefits: 'Benefícios', team: 'Equipe', faq: 'FAQ',
  testimonials: 'Depoimentos', text_image: 'Texto+Imagem', custom_html: 'HTML',
  countdown: 'Contador', video: 'Vídeo', numbers: 'Números',
  whatsapp_cta: 'WhatsApp', logo_carousel: 'Logos',
  price_table: 'Preços', process_steps: 'Etapas', guarantee: 'Garantia',
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
  if (sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 rounded-xl border-2 border-dashed border-muted-foreground/20 gap-3">
        <div className="text-4xl">🚀</div>
        <p className="text-muted-foreground font-medium">Adicione seções para construir sua página</p>
        <p className="text-xs text-muted-foreground">Use o botão "+ Seção" ou um template pronto</p>
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
            <div className={`absolute inset-0 z-10 pointer-events-none transition-all ${
              isSelected
                ? 'ring-2 ring-primary ring-inset'
                : 'group-hover:ring-1 group-hover:ring-primary/40 group-hover:ring-inset'
            }`} />

            <div className={`absolute top-2 left-2 z-20 text-xs font-medium px-2 py-0.5 rounded-md transition-opacity ${
              isSelected
                ? 'bg-primary text-primary-foreground opacity-100'
                : 'bg-foreground/80 text-background opacity-0 group-hover:opacity-100'
            }`}>
              {LABELS[section.type] || section.type}
            </div>

            <div className={`absolute top-2 right-2 z-20 flex gap-1 transition-opacity ${
              isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}>
              {[
                { icon: ChevronUp, action: () => onMove(section.id, 'up'), destructive: false },
                { icon: ChevronDown, action: () => onMove(section.id, 'down'), destructive: false },
                { icon: Copy, action: () => onDuplicate(section.id), destructive: false },
                { icon: Trash2, action: () => onDelete(section.id), destructive: true },
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

            <div className="pointer-events-none">
              {renderLandingSection(section, { primaryColor })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
