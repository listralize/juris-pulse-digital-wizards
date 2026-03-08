import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Plus, Trash2 } from 'lucide-react';
import type { LandingSection } from '@/types/stepFormTypes';

interface SectionConfigPanelProps {
  section: LandingSection;
  onUpdate: (config: Record<string, any>) => void;
  primaryColor: string;
}

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
    {children}
  </div>
);

const ColorField: React.FC<{ label: string; value?: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <Field label={label}>
    <div className="flex gap-2">
      <input type="color" value={value || '#000000'} onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded border cursor-pointer" />
      <Input value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="#000000" className="h-8 text-xs" />
    </div>
  </Field>
);

export const SectionConfigPanel: React.FC<SectionConfigPanelProps> = ({ section, onUpdate, primaryColor }) => {
  const c = section.config;
  const set = (key: string, value: any) => onUpdate({ ...c, [key]: value });
  const setItem = (key: string, idx: number, field: string, value: any) => {
    const arr = [...(c[key] || [])];
    arr[idx] = { ...arr[idx], [field]: value };
    set(key, arr);
  };
  const addItem = (key: string, item: Record<string, any>) => set(key, [...(c[key] || []), item]);
  const removeItem = (key: string, idx: number) => set(key, (c[key] || []).filter((_: any, i: number) => i !== idx));

  const renderHero = () => (
    <>
      <AccordionItem value="content">
        <AccordionTrigger className="text-xs font-semibold">Conteúdo</AccordionTrigger>
        <AccordionContent className="space-y-3">
          <Field label="Headline"><Input value={c.headline || ''} onChange={(e) => set('headline', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Sub-headline"><Input value={c.subheadline || ''} onChange={(e) => set('subheadline', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Texto"><Textarea value={c.body_text || ''} onChange={(e) => set('body_text', e.target.value)} rows={2} className="text-xs" /></Field>
          <Field label="Badge"><Input value={c.badge_text || ''} onChange={(e) => set('badge_text', e.target.value)} placeholder="Ex: Consulta Gratuita" className="h-8 text-xs" /></Field>
          <Field label="Imagem URL"><Input value={c.image_url || ''} onChange={(e) => set('image_url', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="CTA Texto"><Input value={c.cta_text || ''} onChange={(e) => set('cta_text', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="CTA URL"><Input value={c.cta_url || ''} onChange={(e) => set('cta_url', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="CTA Secundário"><Input value={c.cta_secondary_text || ''} onChange={(e) => set('cta_secondary_text', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="CTA Secundário URL"><Input value={c.cta_secondary_url || ''} onChange={(e) => set('cta_secondary_url', e.target.value)} className="h-8 text-xs" /></Field>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="style">
        <AccordionTrigger className="text-xs font-semibold">Estilo</AccordionTrigger>
        <AccordionContent className="space-y-3">
          <Field label="Layout">
            <Select value={c.layout || 'split'} onValueChange={(v) => set('layout', v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="split">Split (texto + imagem)</SelectItem>
                <SelectItem value="centered">Centralizado</SelectItem>
                <SelectItem value="full_image">Imagem de fundo</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <ColorField label="Cor do fundo" value={c.background_color} onChange={(v) => set('background_color', v)} />
          <ColorField label="Cor do texto" value={c.text_color} onChange={(v) => set('text_color', v)} />
          <ColorField label="Overlay" value={c.overlay_color} onChange={(v) => set('overlay_color', v)} />
          <Field label="Opacidade overlay"><Input type="number" min={0} max={1} step={0.1} value={c.overlay_opacity ?? 0.4}
            onChange={(e) => set('overlay_opacity', parseFloat(e.target.value))} className="h-8 text-xs" /></Field>
          <Field label="Vídeo de fundo URL"><Input value={c.video_background_url || ''} onChange={(e) => set('video_background_url', e.target.value)} className="h-8 text-xs" /></Field>
        </AccordionContent>
      </AccordionItem>
    </>
  );

  const renderListItems = (key: string, fields: Array<{ name: string; label: string; type?: string }>, defaultItem: Record<string, any>) => (
    <div className="space-y-2">
      {(c[key] || []).map((item: any, idx: number) => (
        <div key={idx} className="p-2 rounded-lg border space-y-2 bg-muted/30">
          {fields.map(f => (
            <Field key={f.name} label={f.label}>
              {f.type === 'textarea' ? (
                <Textarea value={item[f.name] || ''} onChange={(e) => setItem(key, idx, f.name, e.target.value)} rows={2} className="text-xs" />
              ) : (
                <Input value={item[f.name] || ''} onChange={(e) => setItem(key, idx, f.name, e.target.value)} className="h-7 text-xs" />
              )}
            </Field>
          ))}
          <Button variant="ghost" size="sm" className="h-6 text-xs text-destructive" onClick={() => removeItem(key, idx)}>
            <Trash2 className="w-3 h-3 mr-1" /> Remover
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full h-7 text-xs" onClick={() => addItem(key, defaultItem)}>
        <Plus className="w-3 h-3 mr-1" /> Adicionar
      </Button>
    </div>
  );

  const renderGenericSection = (contentFields: React.ReactNode, styleFields?: React.ReactNode) => (
    <>
      <AccordionItem value="content">
        <AccordionTrigger className="text-xs font-semibold">Conteúdo</AccordionTrigger>
        <AccordionContent className="space-y-3">{contentFields}</AccordionContent>
      </AccordionItem>
      {styleFields && (
        <AccordionItem value="style">
          <AccordionTrigger className="text-xs font-semibold">Estilo</AccordionTrigger>
          <AccordionContent className="space-y-3">{styleFields}</AccordionContent>
        </AccordionItem>
      )}
    </>
  );

  const renderByType = () => {
    switch (section.type) {
      case 'hero': return renderHero();

      case 'trust_badges': return renderGenericSection(
        renderListItems('items', [
          { name: 'text', label: 'Texto' },
          { name: 'icon', label: 'Ícone (shield/clock/award/check/lock/star)' },
          { name: 'description', label: 'Descrição' },
        ], { text: 'Novo badge', icon: 'shield' }),
        <>
          <Field label="Estilo">
            <Select value={c.style || 'pill'} onValueChange={(v) => set('style', v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pill">Pill</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="icon_row">Ícones</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <ColorField label="Cor do fundo" value={c.background_color} onChange={(v) => set('background_color', v)} />
        </>
      );

      case 'benefits': return renderGenericSection(
        <>
          <Field label="Título"><Input value={c.title || ''} onChange={(e) => set('title', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Subtítulo"><Input value={c.subtitle || ''} onChange={(e) => set('subtitle', e.target.value)} className="h-8 text-xs" /></Field>
          {renderListItems('items', [
            { name: 'title', label: 'Título' },
            { name: 'description', label: 'Descrição' },
            { name: 'icon', label: 'Ícone (check/star/shield/zap/heart/award)' },
          ], { title: 'Novo benefício', icon: 'check' })}
        </>,
        <>
          <Field label="Layout">
            <Select value={c.layout || 'grid'} onValueChange={(v) => set('layout', v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="list">Lista</SelectItem>
                <SelectItem value="alternating">Alternado</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Colunas"><Input type="number" min={1} max={4} value={c.columns || 3}
            onChange={(e) => set('columns', parseInt(e.target.value))} className="h-8 text-xs" /></Field>
          <ColorField label="Cor do fundo" value={c.background_color} onChange={(v) => set('background_color', v)} />
          <ColorField label="Cor dos ícones" value={c.icon_color} onChange={(v) => set('icon_color', v)} />
        </>
      );

      case 'testimonials': return renderGenericSection(
        <>
          <Field label="Título"><Input value={c.title || ''} onChange={(e) => set('title', e.target.value)} className="h-8 text-xs" /></Field>
          <div className="flex items-center gap-2">
            <Switch checked={c.show_stars !== false} onCheckedChange={(v) => set('show_stars', v)} />
            <Label className="text-xs">Mostrar estrelas</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={!!c.verified_badge} onCheckedChange={(v) => set('verified_badge', v)} />
            <Label className="text-xs">Badge verificado</Label>
          </div>
          {renderListItems('items', [
            { name: 'name', label: 'Nome' },
            { name: 'text', label: 'Texto', type: 'textarea' },
            { name: 'role', label: 'Cargo' },
            { name: 'image', label: 'Foto URL' },
          ], { name: 'Cliente', text: 'Excelente!', rating: 5 })}
        </>,
        <>
          <Field label="Layout">
            <Select value={c.layout || 'grid'} onValueChange={(v) => set('layout', v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="carousel">Carrossel</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Colunas"><Input type="number" min={1} max={4} value={c.columns || 3}
            onChange={(e) => set('columns', parseInt(e.target.value))} className="h-8 text-xs" /></Field>
          <ColorField label="Cor do fundo" value={c.background_color} onChange={(v) => set('background_color', v)} />
        </>
      );

      case 'faq': return renderGenericSection(
        <>
          <Field label="Título"><Input value={c.title || ''} onChange={(e) => set('title', e.target.value)} className="h-8 text-xs" /></Field>
          {renderListItems('items', [
            { name: 'question', label: 'Pergunta' },
            { name: 'answer', label: 'Resposta', type: 'textarea' },
          ], { question: 'Nova pergunta?', answer: 'Resposta aqui.' })}
        </>,
        <>
          <Field label="Estilo">
            <Select value={c.style || 'accordion'} onValueChange={(v) => set('style', v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="accordion">Accordion</SelectItem>
                <SelectItem value="cards">Cards</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Colunas (cards)"><Input type="number" min={1} max={2} value={c.columns || 1}
            onChange={(e) => set('columns', parseInt(e.target.value))} className="h-8 text-xs" /></Field>
          <ColorField label="Cor do fundo" value={c.background_color} onChange={(v) => set('background_color', v)} />
        </>
      );

      case 'problems_grid': return renderGenericSection(
        <>
          <Field label="Título"><Input value={c.title || ''} onChange={(e) => set('title', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Subtítulo"><Input value={c.subtitle || ''} onChange={(e) => set('subtitle', e.target.value)} className="h-8 text-xs" /></Field>
          {renderListItems('items', [
            { name: 'title', label: 'Título' },
            { name: 'description', label: 'Descrição' },
            { name: 'icon', label: 'Ícone (alert/x/help/info/ban/shield)' },
          ], { title: 'Problema', description: 'Descrição', icon: 'alert' })}
        </>,
        <>
          <Field label="Colunas"><Input type="number" min={1} max={4} value={c.columns || 3}
            onChange={(e) => set('columns', parseInt(e.target.value))} className="h-8 text-xs" /></Field>
          <ColorField label="Cor acento" value={c.accent_color} onChange={(v) => set('accent_color', v)} />
          <ColorField label="Cor do fundo" value={c.background_color} onChange={(v) => set('background_color', v)} />
        </>
      );

      case 'cta_banner': return renderGenericSection(
        <>
          <Field label="Título"><Input value={c.title || ''} onChange={(e) => set('title', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Subtítulo"><Input value={c.subtitle || ''} onChange={(e) => set('subtitle', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Texto do botão"><Input value={c.button_text || ''} onChange={(e) => set('button_text', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="URL do botão"><Input value={c.button_url || ''} onChange={(e) => set('button_url', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="URL WhatsApp"><Input value={c.whatsapp_url || ''} onChange={(e) => set('whatsapp_url', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Ícone (whatsapp/arrow/sparkles)"><Input value={c.icon || ''} onChange={(e) => set('icon', e.target.value)} className="h-8 text-xs" /></Field>
        </>,
        <>
          <Field label="Estilo">
            <Select value={c.style || 'solid'} onValueChange={(v) => set('style', v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Sólido</SelectItem>
                <SelectItem value="gradient">Gradiente</SelectItem>
                <SelectItem value="outlined">Contorno</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <ColorField label="Cor do fundo" value={c.background_color} onChange={(v) => set('background_color', v)} />
          <ColorField label="Cor do texto" value={c.text_color} onChange={(v) => set('text_color', v)} />
          <ColorField label="Cor do botão" value={c.button_color} onChange={(v) => set('button_color', v)} />
        </>
      );

      case 'embedded_form': return renderGenericSection(
        <>
          <Field label="Título"><Input value={c.title || ''} onChange={(e) => set('title', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Subtítulo"><Input value={c.subtitle || ''} onChange={(e) => set('subtitle', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Texto do botão"><Input value={c.cta_text || ''} onChange={(e) => set('cta_text', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Mensagem de sucesso"><Input value={c.success_message || ''} onChange={(e) => set('success_message', e.target.value)} className="h-8 text-xs" /></Field>
          <div className="flex items-center gap-2">
            <Switch checked={c.phone_mask !== false} onCheckedChange={(v) => set('phone_mask', v)} />
            <Label className="text-xs">Máscara de telefone</Label>
          </div>
          {renderListItems('form_fields', [
            { name: 'name', label: 'Nome do campo' },
            { name: 'label', label: 'Label' },
            { name: 'type', label: 'Tipo (text/tel/email/textarea/select)' },
            { name: 'placeholder', label: 'Placeholder' },
          ], { name: 'campo', type: 'text', placeholder: '', required: true, label: 'Novo campo' })}
        </>,
        <>
          <Field label="Layout">
            <Select value={c.layout || 'card'} onValueChange={(v) => set('layout', v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="inline">Inline</SelectItem>
                <SelectItem value="floating">Flutuante</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <ColorField label="Cor do fundo" value={c.background_color} onChange={(v) => set('background_color', v)} />
        </>
      );

      case 'team': return renderGenericSection(
        <>
          <Field label="Título"><Input value={c.title || ''} onChange={(e) => set('title', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Subtítulo"><Input value={c.subtitle || ''} onChange={(e) => set('subtitle', e.target.value)} className="h-8 text-xs" /></Field>
          <div className="flex items-center gap-2">
            <Switch checked={!!c.show_social_links} onCheckedChange={(v) => set('show_social_links', v)} />
            <Label className="text-xs">Mostrar links sociais</Label>
          </div>
          {renderListItems('members', [
            { name: 'name', label: 'Nome' },
            { name: 'role', label: 'Cargo' },
            { name: 'credentials', label: 'Credenciais' },
            { name: 'image', label: 'Foto URL' },
          ], { name: 'Membro', role: 'Cargo' })}
        </>,
        <>
          <Field label="Layout">
            <Select value={c.layout || 'grid'} onValueChange={(v) => set('layout', v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="carousel">Carrossel</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Colunas"><Input type="number" min={1} max={4} value={c.columns || 3}
            onChange={(e) => set('columns', parseInt(e.target.value))} className="h-8 text-xs" /></Field>
          <ColorField label="Cor do fundo" value={c.background_color} onChange={(v) => set('background_color', v)} />
        </>
      );

      case 'text_image': return renderGenericSection(
        <>
          <Field label="Título"><Input value={c.title || ''} onChange={(e) => set('title', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Texto"><Textarea value={c.text || ''} onChange={(e) => set('text', e.target.value)} rows={3} className="text-xs" /></Field>
          <Field label="Imagem URL"><Input value={c.image_url || ''} onChange={(e) => set('image_url', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="CTA"><Input value={c.cta_text || ''} onChange={(e) => set('cta_text', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="CTA URL"><Input value={c.cta_url || ''} onChange={(e) => set('cta_url', e.target.value)} className="h-8 text-xs" /></Field>
        </>,
        <>
          <Field label="Posição da imagem">
            <Select value={c.image_position || 'right'} onValueChange={(v) => set('image_position', v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="right">Direita</SelectItem>
                <SelectItem value="left">Esquerda</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <ColorField label="Cor do fundo" value={c.background_color} onChange={(v) => set('background_color', v)} />
        </>
      );

      case 'custom_html': return renderGenericSection(
        <Field label="HTML"><Textarea value={c.html_content || ''} onChange={(e) => set('html_content', e.target.value)}
          rows={8} className="text-xs font-mono" /></Field>
      );

      case 'countdown': return renderGenericSection(
        <>
          <Field label="Título"><Input value={c.title || ''} onChange={(e) => set('title', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Subtítulo"><Input value={c.subtitle || ''} onChange={(e) => set('subtitle', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Data alvo"><Input type="date" value={c.target_date || ''} onChange={(e) => set('target_date', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="CTA"><Input value={c.cta_text || ''} onChange={(e) => set('cta_text', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="CTA URL"><Input value={c.cta_url || ''} onChange={(e) => set('cta_url', e.target.value)} className="h-8 text-xs" /></Field>
        </>,
        <>
          <ColorField label="Cor acento" value={c.accent_color} onChange={(v) => set('accent_color', v)} />
          <ColorField label="Cor do fundo" value={c.background_color} onChange={(v) => set('background_color', v)} />
        </>
      );

      case 'video': return renderGenericSection(
        <>
          <Field label="Título"><Input value={c.title || ''} onChange={(e) => set('title', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="URL do vídeo"><Input value={c.video_url || ''} onChange={(e) => set('video_url', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Tipo">
            <Select value={c.video_type || 'youtube'} onValueChange={(v) => set('video_type', v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="vimeo">Vimeo</SelectItem>
                <SelectItem value="direct">Direto (MP4)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <div className="flex items-center gap-2">
            <Switch checked={!!c.autoplay} onCheckedChange={(v) => set('autoplay', v)} />
            <Label className="text-xs">Autoplay</Label>
          </div>
        </>,
        <ColorField label="Cor do fundo" value={c.background_color} onChange={(v) => set('background_color', v)} />
      );

      case 'numbers': return renderGenericSection(
        <>
          <Field label="Título"><Input value={c.title || ''} onChange={(e) => set('title', e.target.value)} className="h-8 text-xs" /></Field>
          {renderListItems('items', [
            { name: 'number', label: 'Número' },
            { name: 'label', label: 'Legenda' },
            { name: 'prefix', label: 'Prefixo' },
            { name: 'suffix', label: 'Sufixo (ex: +)' },
          ], { number: '100', label: 'Item', suffix: '+' })}
        </>,
        <>
          <Field label="Estilo">
            <Select value={c.style || 'cards'} onValueChange={(v) => set('style', v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="cards">Cards</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="bordered">Bordas</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Colunas"><Input type="number" min={1} max={6} value={c.columns || 4}
            onChange={(e) => set('columns', parseInt(e.target.value))} className="h-8 text-xs" /></Field>
          <ColorField label="Cor acento" value={c.accent_color} onChange={(v) => set('accent_color', v)} />
          <ColorField label="Cor do fundo" value={c.background_color} onChange={(v) => set('background_color', v)} />
        </>
      );

      case 'whatsapp_cta': return renderGenericSection(
        <>
          <Field label="Título"><Input value={c.title || ''} onChange={(e) => set('title', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Subtítulo"><Input value={c.subtitle || ''} onChange={(e) => set('subtitle', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Telefone (com DDD)"><Input value={c.phone_number || ''} onChange={(e) => set('phone_number', e.target.value)} placeholder="5511999999999" className="h-8 text-xs" /></Field>
          <Field label="Mensagem"><Input value={c.message || ''} onChange={(e) => set('message', e.target.value)} className="h-8 text-xs" /></Field>
          <Field label="Texto do botão"><Input value={c.button_text || ''} onChange={(e) => set('button_text', e.target.value)} className="h-8 text-xs" /></Field>
        </>,
        <>
          <Field label="Estilo">
            <Select value={c.style || 'banner'} onValueChange={(v) => set('style', v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="banner">Banner</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <ColorField label="Cor do botão" value={c.button_color} onChange={(v) => set('button_color', v)} />
          <ColorField label="Cor do fundo" value={c.background_color} onChange={(v) => set('background_color', v)} />
        </>
      );

      case 'logo_carousel': return renderGenericSection(
        <>
          <Field label="Título"><Input value={c.title || ''} onChange={(e) => set('title', e.target.value)} className="h-8 text-xs" /></Field>
          <div className="flex items-center gap-2">
            <Switch checked={c.grayscale !== false} onCheckedChange={(v) => set('grayscale', v)} />
            <Label className="text-xs">Escala de cinza</Label>
          </div>
          <Field label="Altura do logo"><Input value={c.logo_height || '48px'} onChange={(e) => set('logo_height', e.target.value)} className="h-8 text-xs" /></Field>
          {renderListItems('logos', [
            { name: 'image_url', label: 'URL da imagem' },
            { name: 'alt', label: 'Alt text' },
            { name: 'url', label: 'Link (opcional)' },
          ], { image_url: '', alt: 'Logo' })}
        </>,
        <ColorField label="Cor do fundo" value={c.background_color} onChange={(v) => set('background_color', v)} />
      );

      default: return (
        <div className="p-4 text-center text-sm text-muted-foreground">
          Editor não disponível para este tipo de seção.
        </div>
      );
    }
  };

  return (
    <Accordion type="multiple" defaultValue={['content', 'style']} className="w-full">
      {renderByType()}
    </Accordion>
  );
};
