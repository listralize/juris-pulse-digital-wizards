import React, { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Plus, Trash2, ChevronUp, ChevronDown, Eye, EyeOff, Copy,
  Undo2, Redo2, Monitor, Smartphone, Layout, Shield, Grid3X3,
  Megaphone, FormInput, Star, Users, HelpCircle, MessageSquare,
  Image, Code, Timer, Play, Hash, MessageCircle, ImageIcon,
  DollarSign, ListOrdered, ShieldCheck, Zap, Minus, GitCompareArrows, TextCursorInput
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { LandingSection } from '@/types/stepFormTypes';
import { getDefaultSectionConfig } from '@/components/landing/landingSectionTypes';
import { LandingPreview } from './LandingPreview';
import { SectionConfigPanel } from './SectionConfigPanel';

const SECTION_TYPES: Array<{
  type: LandingSection['type'];
  label: string;
  icon: React.FC<{ className?: string }>;
  description: string;
  category: 'content' | 'conversion' | 'social_proof';
}> = [
  { type: 'hero', label: 'Hero', icon: Layout, description: 'Banner principal', category: 'content' },
  { type: 'text_image', label: 'Texto + Imagem', icon: Image, description: 'Texto com imagem lateral', category: 'content' },
  { type: 'video', label: 'Vídeo', icon: Play, description: 'YouTube, Vimeo ou direto', category: 'content' },
  { type: 'custom_html', label: 'HTML Custom', icon: Code, description: 'HTML personalizado', category: 'content' },
  { type: 'team', label: 'Equipe', icon: Users, description: 'Membros da equipe', category: 'content' },
  { type: 'process_steps', label: 'Etapas', icon: ListOrdered, description: 'Como funciona', category: 'content' },
  { type: 'faq', label: 'FAQ', icon: HelpCircle, description: 'Perguntas frequentes', category: 'content' },
  { type: 'embedded_form', label: 'Formulário', icon: FormInput, description: 'Captação de leads', category: 'conversion' },
  { type: 'cta_banner', label: 'CTA Banner', icon: Megaphone, description: 'Chamada para ação', category: 'conversion' },
  { type: 'whatsapp_cta', label: 'WhatsApp CTA', icon: MessageCircle, description: 'Botão de WhatsApp', category: 'conversion' },
  { type: 'countdown', label: 'Contador', icon: Timer, description: 'Timer de urgência', category: 'conversion' },
  { type: 'price_table', label: 'Tabela de Preços', icon: DollarSign, description: 'Planos e valores', category: 'conversion' },
  { type: 'trust_badges', label: 'Badges', icon: Shield, description: 'Selos de confiança', category: 'social_proof' },
  { type: 'benefits', label: 'Benefícios', icon: Star, description: 'Lista de benefícios', category: 'social_proof' },
  { type: 'problems_grid', label: 'Problemas', icon: Grid3X3, description: 'Dores do cliente', category: 'social_proof' },
  { type: 'testimonials', label: 'Depoimentos', icon: MessageSquare, description: 'Social proof', category: 'social_proof' },
  { type: 'numbers', label: 'Números', icon: Hash, description: 'Estatísticas', category: 'social_proof' },
  { type: 'guarantee', label: 'Garantia', icon: ShieldCheck, description: 'Seção de confiança', category: 'social_proof' },
  { type: 'logo_carousel', label: 'Logos', icon: ImageIcon, description: 'Parceiros/mídia', category: 'social_proof' },
  { type: 'divider', label: 'Divisor', icon: Minus, description: 'Espaçador ou linha', category: 'content' },
  { type: 'comparison', label: 'Comparação', icon: GitCompareArrows, description: 'Antes vs Depois', category: 'social_proof' },
  { type: 'banner_marquee', label: 'Marquee', icon: Marquee, description: 'Texto rotativo', category: 'conversion' },
];

const STARTER_TEMPLATES: Array<{
  name: string;
  emoji: string;
  description: string;
  sections: Array<{ type: LandingSection['type'] }>;
}> = [
  {
    name: 'Landing Simples',
    emoji: '🚀',
    description: 'Hero + Form + CTA',
    sections: [{ type: 'hero' }, { type: 'trust_badges' }, { type: 'embedded_form' }, { type: 'cta_banner' }],
  },
  {
    name: 'Landing Completa',
    emoji: '⭐',
    description: 'Tudo para converter',
    sections: [
      { type: 'hero' }, { type: 'trust_badges' }, { type: 'problems_grid' },
      { type: 'benefits' }, { type: 'process_steps' }, { type: 'testimonials' },
      { type: 'embedded_form' }, { type: 'faq' }, { type: 'cta_banner' },
    ],
  },
  {
    name: 'Página de Vendas',
    emoji: '💰',
    description: 'Preços + Garantia',
    sections: [
      { type: 'hero' }, { type: 'problems_grid' }, { type: 'benefits' },
      { type: 'price_table' }, { type: 'guarantee' }, { type: 'testimonials' },
      { type: 'faq' }, { type: 'whatsapp_cta' },
    ],
  },
];

const getDefaultConfig = getDefaultSectionConfig;

interface LandingVisualEditorProps {
  sections: LandingSection[];
  onUpdate: (sections: LandingSection[]) => void;
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const LandingVisualEditor: React.FC<LandingVisualEditorProps> = ({
  sections, onUpdate, primaryColor = '#4CAF50', backgroundColor = '#ffffff', textColor = '#000000',
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [history, setHistory] = useState<LandingSection[][]>([sections]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pushHistory = useCallback((newSections: LandingSection[], immediate = false) => {
    // Debounce history pushes to avoid flooding on every keystroke
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const commit = () => {
      setHistory(prev => {
        const sliced = prev.slice(0, historyIdx + 1);
        sliced.push(newSections);
        if (sliced.length > 30) sliced.shift();
        return sliced;
      });
      setHistoryIdx(prev => {
        const maxIdx = Math.min(prev + 1, 29);
        return maxIdx;
      });
    };

    onUpdate(newSections); // Always update immediately

    if (immediate) {
      commit();
    } else {
      debounceRef.current = setTimeout(commit, 500);
    }
  }, [historyIdx, onUpdate]);

  const undo = () => {
    if (historyIdx > 0) {
      const idx = historyIdx - 1;
      setHistoryIdx(idx);
      onUpdate(history[idx]);
    }
  };

  const redo = () => {
    if (historyIdx < history.length - 1) {
      const idx = historyIdx + 1;
      setHistoryIdx(idx);
      onUpdate(history[idx]);
    }
  };

  const addSection = (type: LandingSection['type']) => {
    const newSection: LandingSection = {
      id: `s_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      type,
      config: getDefaultConfig(type),
      display_order: sections.length,
    };
    pushHistory([...sections, newSection], true);
    setSelectedId(newSection.id);
    setAddDialogOpen(false);
  };

  const applyTemplate = (template: typeof STARTER_TEMPLATES[0]) => {
    const newSections = template.sections.map((s, i) => ({
      id: `s_${Date.now()}_${Math.random().toString(36).substr(2, 5)}_${i}`,
      type: s.type,
      config: getDefaultConfig(s.type),
      display_order: i,
    }));
    pushHistory(newSections, true);
    setSelectedId(null);
    setAddDialogOpen(false);
  };

  const removeSection = (id: string) => {
    pushHistory(sections.filter(s => s.id !== id).map((s, i) => ({ ...s, display_order: i })), true);
    if (selectedId === id) setSelectedId(null);
  };

  const moveSection = (id: string, dir: 'up' | 'down') => {
    const idx = sections.findIndex(s => s.id === id);
    if ((dir === 'up' && idx === 0) || (dir === 'down' && idx === sections.length - 1)) return;
    const arr = [...sections];
    const swap = dir === 'up' ? idx - 1 : idx + 1;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    pushHistory(arr.map((s, i) => ({ ...s, display_order: i })), true);
  };

  const duplicateSection = (id: string) => {
    const orig = sections.find(s => s.id === id);
    if (!orig) return;
    const dup: LandingSection = {
      ...orig,
      id: `s_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      config: JSON.parse(JSON.stringify(orig.config)),
      display_order: sections.length,
    };
    pushHistory([...sections, dup], true);
    setSelectedId(dup.id);
  };

  const toggleVisibility = (id: string) => {
    pushHistory(sections.map(s => s.id === id ? { ...s, hidden: !s.hidden } : s), true);
  };

  const updateConfig = (id: string, config: Record<string, any>) => {
    pushHistory(sections.map(s => s.id === id ? { ...s, config } : s));
  };

  const sorted = [...sections].sort((a, b) => a.display_order - b.display_order);
  const selected = sorted.find(s => s.id === selectedId);
  const sectionMeta = (type: string) => SECTION_TYPES.find(t => t.type === type);

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] min-h-[600px] border rounded-xl overflow-hidden bg-muted/30">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b bg-background">
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <Plus className="w-4 h-4" /> Seção
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Seção</DialogTitle>
            </DialogHeader>

            {/* Starter Templates */}
            {sections.length === 0 && (
              <div className="space-y-3 pb-4 border-b">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Templates Prontos
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {STARTER_TEMPLATES.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => applyTemplate(t)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed hover:border-primary hover:bg-primary/5 transition-colors text-center"
                    >
                      <span className="text-2xl">{t.emoji}</span>
                      <div className="text-sm font-medium">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(['content', 'conversion', 'social_proof'] as const).map(cat => (
              <div key={cat} className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  {cat === 'content' ? 'Conteúdo' : cat === 'conversion' ? 'Conversão' : 'Social Proof'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {SECTION_TYPES.filter(t => t.category === cat).map(({ type, label, icon: Icon, description }) => (
                    <button key={type} onClick={() => addSection(type)}
                      className="flex items-start gap-3 p-3 rounded-xl border hover:border-primary hover:bg-primary/5 transition-colors text-left">
                      <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium">{label}</div>
                        <div className="text-xs text-muted-foreground">{description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </DialogContent>
        </Dialog>

        <div className="flex items-center gap-1 border-l pl-2 ml-1">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={undo} disabled={historyIdx <= 0}>
            <Undo2 className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={redo} disabled={historyIdx >= history.length - 1}>
            <Redo2 className="w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-1 border-l pl-2 ml-1">
          <Button variant={viewMode === 'desktop' ? 'secondary' : 'ghost'} size="sm" className="h-7 w-7 p-0"
            onClick={() => setViewMode('desktop')}>
            <Monitor className="w-3.5 h-3.5" />
          </Button>
          <Button variant={viewMode === 'mobile' ? 'secondary' : 'ghost'} size="sm" className="h-7 w-7 p-0"
            onClick={() => setViewMode('mobile')}>
            <Smartphone className="w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="ml-auto text-xs text-muted-foreground">
          {sorted.length} seções
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-[320px] flex-shrink-0 border-r bg-background flex flex-col overflow-hidden">
          {/* Section list — uses flex-1 with max-height when editing, fills all space otherwise */}
          <ScrollArea className={`${selected ? 'max-h-[240px] min-h-[120px]' : 'flex-1'} border-b`}>
            <div className="p-2 space-y-1">
              {sorted.length === 0 && (
                <div className="text-center py-8 space-y-2">
                  <div className="text-3xl">✨</div>
                  <p className="text-sm text-muted-foreground font-medium">Comece com um template</p>
                  <p className="text-xs text-muted-foreground">Clique em "+ Seção" para começar</p>
                </div>
              )}
              {sorted.map((section) => {
                const meta = sectionMeta(section.type);
                const Icon = meta?.icon || Layout;
                const isSelected = selectedId === section.id;
                return (
                  <div
                    key={section.id}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-sm transition-colors ${
                      isSelected ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted/50'
                    } ${section.hidden ? 'opacity-40' : ''}`}
                    onClick={() => setSelectedId(isSelected ? null : section.id)}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0 text-primary" />
                    <span className="flex-1 truncate font-medium">{meta?.label || section.type}</span>
                    <div className="flex items-center gap-0.5">
                      <button className="p-0.5 rounded hover:bg-muted" onClick={(e) => { e.stopPropagation(); toggleVisibility(section.id); }}>
                        {section.hidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                      <button className="p-0.5 rounded hover:bg-muted" onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'up'); }}>
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button className="p-0.5 rounded hover:bg-muted" onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'down'); }}>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <button className="p-0.5 rounded hover:bg-muted" onClick={(e) => { e.stopPropagation(); duplicateSection(section.id); }}>
                        <Copy className="w-3 h-3" />
                      </button>
                      <button className="p-0.5 rounded hover:bg-muted text-destructive" onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}>
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Config panel */}
          {selected && (
            <ScrollArea className="flex-1">
              <div className="p-3">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">{sectionMeta(selected.type)?.label}</Badge>
                  {selected.hidden && <Badge variant="outline" className="text-xs">Oculta</Badge>}
                </div>
                <SectionConfigPanel
                  section={selected}
                  onUpdate={(config) => updateConfig(selected.id, config)}
                  primaryColor={primaryColor}
                />
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-auto bg-muted/50 p-4">
          <div
            className={`mx-auto transition-all duration-300 ${
              viewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-full'
            }`}
          >
            <LandingPreview
              sections={sorted}
              selectedId={selectedId}
              onSelect={setSelectedId}
              primaryColor={primaryColor}
              backgroundColor={backgroundColor}
              textColor={textColor}
              onMove={moveSection}
              onDuplicate={duplicateSection}
              onDelete={removeSection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
