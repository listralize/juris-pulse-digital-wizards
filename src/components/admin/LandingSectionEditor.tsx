import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import type { LandingSection } from '@/types/stepFormTypes';

interface LandingSectionEditorProps {
  section: LandingSection;
  onUpdate: (config: Record<string, any>) => void;
}

export const LandingSectionEditor: React.FC<LandingSectionEditorProps> = ({ section, onUpdate }) => {
  const c = section.config;
  const set = (key: string, value: any) => onUpdate({ ...c, [key]: value });

  const renderArrayEditor = (
    key: string,
    items: any[],
    fields: Array<{ name: string; label: string; type?: string; options?: string[] }>,
  ) => (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="p-3 border rounded-lg space-y-2 relative">
          <Button
            variant="ghost" size="sm"
            className="absolute top-1 right-1 h-6 w-6 p-0 text-destructive"
            onClick={() => set(key, items.filter((_, j) => j !== i))}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
          {fields.map(f => (
            <div key={f.name}>
              <Label className="text-xs">{f.label}</Label>
              {f.type === 'select' && f.options ? (
                <Select value={item[f.name] || ''} onValueChange={v => {
                  const updated = [...items]; updated[i] = { ...item, [f.name]: v }; set(key, updated);
                }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{f.options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                </Select>
              ) : f.type === 'textarea' ? (
                <Textarea value={item[f.name] || ''} onChange={e => {
                  const updated = [...items]; updated[i] = { ...item, [f.name]: e.target.value }; set(key, updated);
                }} rows={2} />
              ) : (
                <Input value={item[f.name] || ''} onChange={e => {
                  const updated = [...items]; updated[i] = { ...item, [f.name]: e.target.value }; set(key, updated);
                }} />
              )}
            </div>
          ))}
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => {
        const empty: Record<string, string> = {};
        fields.forEach(f => empty[f.name] = '');
        set(key, [...items, empty]);
      }}>
        <Plus className="w-3 h-3 mr-1" /> Adicionar
      </Button>
    </div>
  );

  switch (section.type) {
    case 'hero':
      return (
        <div className="space-y-4">
          <div><Label>Headline</Label><Input value={c.headline || ''} onChange={e => set('headline', e.target.value)} /></div>
          <div><Label>Subheadline</Label><Input value={c.subheadline || ''} onChange={e => set('subheadline', e.target.value)} /></div>
          <div><Label>Texto do corpo</Label><Textarea value={c.body_text || ''} onChange={e => set('body_text', e.target.value)} rows={3} /></div>
          <div><Label>URL da Imagem</Label><Input value={c.image_url || ''} onChange={e => set('image_url', e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Texto do CTA</Label><Input value={c.cta_text || ''} onChange={e => set('cta_text', e.target.value)} /></div>
            <div><Label>URL do CTA</Label><Input value={c.cta_url || ''} onChange={e => set('cta_url', e.target.value)} placeholder="#formulario" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Cor de Fundo</Label><Input type="color" value={c.background_color || '#ffffff'} onChange={e => set('background_color', e.target.value)} /></div>
            <div><Label>Cor do Texto</Label><Input type="color" value={c.text_color || '#000000'} onChange={e => set('text_color', e.target.value)} /></div>
          </div>
        </div>
      );

    case 'trust_badges':
      return (
        <div className="space-y-4">
          <Label className="font-semibold">Badges</Label>
          {renderArrayEditor('items', c.items || [], [
            { name: 'icon', label: 'Ícone', type: 'select', options: ['shield', 'clock', 'lock', 'check', 'award', 'users'] },
            { name: 'text', label: 'Texto' },
          ])}
        </div>
      );

    case 'problems_grid':
      return (
        <div className="space-y-4">
          <div><Label>Título</Label><Input value={c.title || ''} onChange={e => set('title', e.target.value)} /></div>
          <div><Label>Subtítulo</Label><Input value={c.subtitle || ''} onChange={e => set('subtitle', e.target.value)} /></div>
          <Label className="font-semibold">Itens</Label>
          {renderArrayEditor('items', c.items || [], [
            { name: 'title', label: 'Título' },
            { name: 'description', label: 'Descrição', type: 'textarea' },
            { name: 'icon', label: 'Ícone', type: 'select', options: ['alert', 'x', 'ban', 'shield'] },
          ])}
        </div>
      );

    case 'cta_banner':
      return (
        <div className="space-y-4">
          <div><Label>Título</Label><Input value={c.title || ''} onChange={e => set('title', e.target.value)} /></div>
          <div><Label>Subtítulo</Label><Input value={c.subtitle || ''} onChange={e => set('subtitle', e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Texto do Botão</Label><Input value={c.button_text || ''} onChange={e => set('button_text', e.target.value)} /></div>
            <div><Label>URL do Botão</Label><Input value={c.button_url || ''} onChange={e => set('button_url', e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Cor de Fundo</Label><Input type="color" value={c.background_color || '#4CAF50'} onChange={e => set('background_color', e.target.value)} /></div>
            <div><Label>Cor do Texto</Label><Input type="color" value={c.text_color || '#ffffff'} onChange={e => set('text_color', e.target.value)} /></div>
          </div>
        </div>
      );

    case 'embedded_form':
      return (
        <div className="space-y-4">
          <div><Label>Título</Label><Input value={c.title || ''} onChange={e => set('title', e.target.value)} /></div>
          <div><Label>Subtítulo</Label><Input value={c.subtitle || ''} onChange={e => set('subtitle', e.target.value)} /></div>
          <div><Label>Texto do Botão</Label><Input value={c.cta_text || ''} onChange={e => set('cta_text', e.target.value)} /></div>
          <Label className="font-semibold">Campos do Formulário</Label>
          {renderArrayEditor('form_fields', c.form_fields || [], [
            { name: 'name', label: 'Nome do campo (chave)' },
            { name: 'label', label: 'Label' },
            { name: 'type', label: 'Tipo', type: 'select', options: ['text', 'email', 'tel', 'textarea', 'select'] },
            { name: 'placeholder', label: 'Placeholder' },
          ])}
        </div>
      );

    case 'benefits':
      return (
        <div className="space-y-4">
          <div><Label>Título</Label><Input value={c.title || ''} onChange={e => set('title', e.target.value)} /></div>
          <Label className="font-semibold">Itens</Label>
          {renderArrayEditor('items', c.items || [], [
            { name: 'title', label: 'Título' },
            { name: 'description', label: 'Descrição', type: 'textarea' },
            { name: 'icon', label: 'Ícone', type: 'select', options: ['check', 'star', 'zap', 'heart'] },
          ])}
        </div>
      );

    case 'team':
      return (
        <div className="space-y-4">
          <div><Label>Título</Label><Input value={c.title || ''} onChange={e => set('title', e.target.value)} /></div>
          <div><Label>Descrição</Label><Textarea value={c.description || ''} onChange={e => set('description', e.target.value)} rows={2} /></div>
          <Label className="font-semibold">Membros</Label>
          {renderArrayEditor('members', c.members || [], [
            { name: 'name', label: 'Nome' },
            { name: 'role', label: 'Cargo' },
            { name: 'image', label: 'URL da Foto' },
            { name: 'credentials', label: 'Credenciais (OAB, etc.)' },
          ])}
        </div>
      );

    case 'faq':
      return (
        <div className="space-y-4">
          <div><Label>Título</Label><Input value={c.title || ''} onChange={e => set('title', e.target.value)} /></div>
          <Label className="font-semibold">Perguntas</Label>
          {renderArrayEditor('items', c.items || [], [
            { name: 'question', label: 'Pergunta' },
            { name: 'answer', label: 'Resposta', type: 'textarea' },
          ])}
        </div>
      );

    case 'testimonials':
      return (
        <div className="space-y-4">
          <div><Label>Título</Label><Input value={c.title || ''} onChange={e => set('title', e.target.value)} /></div>
          <Label className="font-semibold">Depoimentos</Label>
          {renderArrayEditor('items', c.items || [], [
            { name: 'name', label: 'Nome' },
            { name: 'text', label: 'Depoimento', type: 'textarea' },
            { name: 'image', label: 'URL da Foto' },
          ])}
        </div>
      );

    case 'text_image':
      return (
        <div className="space-y-4">
          <div><Label>Título</Label><Input value={c.title || ''} onChange={e => set('title', e.target.value)} /></div>
          <div><Label>Texto</Label><Textarea value={c.text || ''} onChange={e => set('text', e.target.value)} rows={4} /></div>
          <div><Label>URL da Imagem</Label><Input value={c.image_url || ''} onChange={e => set('image_url', e.target.value)} /></div>
          <div>
            <Label>Posição da Imagem</Label>
            <Select value={c.image_position || 'right'} onValueChange={v => set('image_position', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Esquerda</SelectItem>
                <SelectItem value="right">Direita</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>Cor de Fundo</Label><Input type="color" value={c.background_color || '#ffffff'} onChange={e => set('background_color', e.target.value)} /></div>
        </div>
      );

    case 'custom_html':
      return (
        <div className="space-y-4">
          <div><Label>HTML Personalizado</Label><Textarea value={c.html_content || ''} onChange={e => set('html_content', e.target.value)} rows={10} className="font-mono text-sm" /></div>
        </div>
      );

    default:
      return <p className="text-muted-foreground">Editor não disponível para este tipo.</p>;
  }
};
