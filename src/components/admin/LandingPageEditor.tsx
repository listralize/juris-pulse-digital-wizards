import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plus, Trash2, GripVertical, ChevronDown, ChevronUp,
  Layout, Shield, Grid3X3, Megaphone, FormInput, Star,
  Users, HelpCircle, MessageSquare, Image, Code
} from 'lucide-react';
import type { LandingSection } from '@/types/stepFormTypes';
import { LandingSectionEditor } from './LandingSectionEditor';

const SECTION_TYPES: Array<{
  type: LandingSection['type'];
  label: string;
  icon: React.FC<{ className?: string }>;
  description: string;
}> = [
  { type: 'hero', label: 'Hero', icon: Layout, description: 'Banner principal com headline e CTA' },
  { type: 'trust_badges', label: 'Badges de Confiança', icon: Shield, description: 'Selos e garantias' },
  { type: 'problems_grid', label: 'Grid de Problemas', icon: Grid3X3, description: 'Dores do cliente em grid' },
  { type: 'cta_banner', label: 'CTA Banner', icon: Megaphone, description: 'Faixa de chamada para ação' },
  { type: 'embedded_form', label: 'Formulário', icon: FormInput, description: 'Formulário de captação' },
  { type: 'benefits', label: 'Benefícios', icon: Star, description: 'Lista de benefícios' },
  { type: 'team', label: 'Equipe', icon: Users, description: 'Membros da equipe' },
  { type: 'faq', label: 'FAQ', icon: HelpCircle, description: 'Perguntas frequentes' },
  { type: 'testimonials', label: 'Depoimentos', icon: MessageSquare, description: 'Depoimentos de clientes' },
  { type: 'text_image', label: 'Texto + Imagem', icon: Image, description: 'Seção de texto com imagem' },
  { type: 'custom_html', label: 'HTML Custom', icon: Code, description: 'HTML personalizado' },
];

const getDefaultConfig = (type: LandingSection['type']): Record<string, any> => {
  switch (type) {
    case 'hero': return { headline: 'Precisa de Ajuda Jurídica?', subheadline: 'Conte com especialistas', cta_text: 'Fale Conosco', cta_url: '#formulario' };
    case 'trust_badges': return { items: [{ icon: 'shield', text: 'Sigilo Total' }, { icon: 'clock', text: 'Resposta Rápida' }] };
    case 'problems_grid': return { title: 'Situações que Podemos Resolver', items: [{ title: 'Problema 1', description: 'Descrição do problema', icon: 'alert' }] };
    case 'cta_banner': return { title: 'Não espere mais', button_text: 'Falar com Advogado', button_url: '#formulario' };
    case 'embedded_form': return { title: 'Fale Conosco', form_fields: [{ name: 'nome', type: 'text', placeholder: 'Seu nome', required: true, label: 'Nome' }, { name: 'telefone', type: 'tel', placeholder: '(00) 00000-0000', required: true, label: 'Telefone' }], cta_text: 'Enviar' };
    case 'benefits': return { title: 'Por que nos escolher?', items: [{ title: 'Experiência', description: 'Anos de atuação', icon: 'check' }] };
    case 'team': return { title: 'Nossa Equipe', members: [{ name: 'Dr. Exemplo', role: 'Advogado', credentials: 'OAB/XX 00000' }] };
    case 'faq': return { title: 'Perguntas Frequentes', items: [{ question: 'Como funciona?', answer: 'Explicação aqui.' }] };
    case 'testimonials': return { title: 'O que nossos clientes dizem', items: [{ name: 'Cliente', text: 'Excelente atendimento!', rating: 5 }] };
    case 'text_image': return { title: 'Sobre Nós', text: 'Texto descritivo', image_position: 'right' };
    case 'custom_html': return { html_content: '<div>Conteúdo personalizado</div>' };
    default: return {};
  }
};

interface LandingPageEditorProps {
  sections: LandingSection[];
  onUpdate: (sections: LandingSection[]) => void;
}

export const LandingPageEditor: React.FC<LandingPageEditorProps> = ({ sections, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addSection = (type: LandingSection['type']) => {
    const newSection: LandingSection = {
      id: `section_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      type,
      config: getDefaultConfig(type),
      display_order: sections.length,
    };
    onUpdate([...sections, newSection]);
    setEditingId(newSection.id);
  };

  const removeSection = (id: string) => {
    onUpdate(sections.filter(s => s.id !== id).map((s, i) => ({ ...s, display_order: i })));
    if (editingId === id) setEditingId(null);
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const idx = sections.findIndex(s => s.id === id);
    if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === sections.length - 1)) return;
    const newSections = [...sections];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    [newSections[idx], newSections[swapIdx]] = [newSections[swapIdx], newSections[idx]];
    onUpdate(newSections.map((s, i) => ({ ...s, display_order: i })));
  };

  const updateSectionConfig = (id: string, config: Record<string, any>) => {
    onUpdate(sections.map(s => s.id === id ? { ...s, config } : s));
  };

  const editingSection = sections.find(s => s.id === editingId);
  const sectionMeta = (type: string) => SECTION_TYPES.find(t => t.type === type);

  return (
    <div className="space-y-6">
      {/* Section list */}
      <Card>
        <CardHeader>
          <CardTitle>Seções da Landing Page</CardTitle>
          <p className="text-sm text-muted-foreground">Adicione e reordene as seções da sua página de conversão</p>
        </CardHeader>
        <CardContent className="space-y-2">
          {sections.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">Nenhuma seção adicionada. Adicione seções abaixo.</p>
          )}
          {sections.sort((a, b) => a.display_order - b.display_order).map((section, idx) => {
            const meta = sectionMeta(section.type);
            const Icon = meta?.icon || Layout;
            return (
              <div
                key={section.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  editingId === section.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
                onClick={() => setEditingId(editingId === section.id ? null : section.id)}
              >
                <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <Icon className="w-5 h-5 flex-shrink-0 text-primary" />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-sm">{meta?.label || section.type}</span>
                  <Badge variant="secondary" className="ml-2 text-xs">{idx + 1}</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'up'); }}>
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'down'); }}>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive" onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Add section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Adicionar Seção</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SECTION_TYPES.map(({ type, label, icon: Icon, description }) => (
              <button
                key={type}
                onClick={() => addSection(type)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border hover:border-primary hover:bg-primary/5 transition-colors text-center"
              >
                <Icon className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium">{label}</span>
                <span className="text-xs text-muted-foreground">{description}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section editor */}
      {editingSection && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Editando: {sectionMeta(editingSection.type)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LandingSectionEditor
              section={editingSection}
              onUpdate={(config) => updateSectionConfig(editingSection.id, config)}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
