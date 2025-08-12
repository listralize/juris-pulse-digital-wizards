import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Palette, Layout, Type, Image as ImageIcon, Star } from 'lucide-react';
import { StepFormSocialProofManager } from './StepFormSocialProofManager';

interface PageCustomizerProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export const StepFormPageCustomizer: React.FC<PageCustomizerProps> = ({ 
  formData, 
  onUpdate 
}) => {
  const handleStyleUpdate = (field: string, value: any) => {
    const currentStyles = formData.styles || {};
    onUpdate('styles', {
      ...currentStyles,
      [field]: value
    });
  };

  const styles = formData.styles || {};

  return (
    <Tabs defaultValue="layout" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="layout">Layout</TabsTrigger>
        <TabsTrigger value="style">Estilos</TabsTrigger>
        <TabsTrigger value="social-proof">Depoimentos</TabsTrigger>
      </TabsList>

      <TabsContent value="layout" className="space-y-6 mt-6">
      {/* Configurações Gerais da Página */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="w-5 h-5" />
            Layout da Página
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Largura Máxima</Label>
              <Select
                value={styles.max_width || 'lg'}
                onValueChange={(value) => handleStyleUpdate('max_width', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Pequena (640px)</SelectItem>
                  <SelectItem value="md">Média (768px)</SelectItem>
                  <SelectItem value="lg">Grande (1024px)</SelectItem>
                  <SelectItem value="xl">Extra Grande (1280px)</SelectItem>
                  <SelectItem value="2xl">2X Grande (1536px)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Alinhamento do Conteúdo</Label>
              <Select
                value={styles.content_alignment || 'center'}
                onValueChange={(value) => handleStyleUpdate('content_alignment', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Esquerda</SelectItem>
                  <SelectItem value="center">Centro</SelectItem>
                  <SelectItem value="right">Direita</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Espaçamento Interno</Label>
            <Select
              value={styles.padding || 'normal'}
              onValueChange={(value) => handleStyleUpdate('padding', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nenhum</SelectItem>
                <SelectItem value="small">Pequeno</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
                <SelectItem value="xl">Extra Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Cores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Cores da Página
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Cor Primária</Label>
              <Input
                type="color"
                value={styles.primary_color || '#4CAF50'}
                onChange={(e) => handleStyleUpdate('primary_color', e.target.value)}
              />
            </div>
            <div>
              <Label>Cor Secundária</Label>
              <Input
                type="color"
                value={styles.secondary_color || '#2196F3'}
                onChange={(e) => handleStyleUpdate('secondary_color', e.target.value)}
              />
            </div>
            <div>
              <Label>Cor de Fundo</Label>
              <Input
                type="color"
                value={styles.background_color || '#ffffff'}
                onChange={(e) => handleStyleUpdate('background_color', e.target.value)}
              />
            </div>
            <div>
              <Label>Cor do Texto</Label>
              <Input
                type="color"
                value={styles.text_color || '#000000'}
                onChange={(e) => handleStyleUpdate('text_color', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Gradiente de Fundo</Label>
            <div className="flex items-center space-x-2">
              <Switch
                checked={styles.use_gradient || false}
                onCheckedChange={(checked) => handleStyleUpdate('use_gradient', checked)}
              />
              <span className="text-sm">Usar gradiente de fundo</span>
            </div>
            {styles.use_gradient && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Cor Inicial</Label>
                  <Input
                    type="color"
                    value={styles.gradient_start || '#4CAF50'}
                    onChange={(e) => handleStyleUpdate('gradient_start', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Cor Final</Label>
                  <Input
                    type="color"
                    value={styles.gradient_end || '#2196F3'}
                    onChange={(e) => handleStyleUpdate('gradient_end', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Tipografia */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            Tipografia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Família da Fonte</Label>
              <Select
                value={styles.font_family || 'inter'}
                onValueChange={(value) => handleStyleUpdate('font_family', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="opensans">Open Sans</SelectItem>
                  <SelectItem value="poppins">Poppins</SelectItem>
                  <SelectItem value="lato">Lato</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tamanho Base da Fonte</Label>
              <Select
                value={styles.base_font_size || 'base'}
                onValueChange={(value) => handleStyleUpdate('base_font_size', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Pequeno (14px)</SelectItem>
                  <SelectItem value="base">Base (16px)</SelectItem>
                  <SelectItem value="lg">Grande (18px)</SelectItem>
                  <SelectItem value="xl">Extra Grande (20px)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Peso da Fonte do Título</Label>
              <Select
                value={styles.title_font_weight || 'bold'}
                onValueChange={(value) => handleStyleUpdate('title_font_weight', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="semibold">Semi-negrito</SelectItem>
                  <SelectItem value="bold">Negrito</SelectItem>
                  <SelectItem value="extrabold">Extra Negrito</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Espaçamento de Linha</Label>
              <Select
                value={styles.line_height || 'normal'}
                onValueChange={(value) => handleStyleUpdate('line_height', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tight">Compacto</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="relaxed">Relaxado</SelectItem>
                  <SelectItem value="loose">Solto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Botões */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Button className="w-5 h-5 p-0" variant="ghost">
              <div className="w-3 h-3 bg-current rounded" />
            </Button>
            Estilo dos Botões
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Estilo do Botão</Label>
              <Select
                value={styles.button_style || 'rounded'}
                onValueChange={(value) => handleStyleUpdate('button_style', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">Quadrado</SelectItem>
                  <SelectItem value="rounded">Arredondado</SelectItem>
                  <SelectItem value="pill">Pílula</SelectItem>
                  <SelectItem value="circle">Circular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tamanho do Botão</Label>
              <Select
                value={styles.button_size || 'md'}
                onValueChange={(value) => handleStyleUpdate('button_size', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Pequeno</SelectItem>
                  <SelectItem value="md">Médio</SelectItem>
                  <SelectItem value="lg">Grande</SelectItem>
                  <SelectItem value="xl">Extra Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Efeito Hover</Label>
              <Select
                value={styles.button_hover || 'scale'}
                onValueChange={(value) => handleStyleUpdate('button_hover', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhum</SelectItem>
                  <SelectItem value="scale">Escala</SelectItem>
                  <SelectItem value="shadow">Sombra</SelectItem>
                  <SelectItem value="glow">Brilho</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Imagem de Fundo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Imagem de Fundo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>URL da Imagem de Fundo</Label>
            <Input
              placeholder="https://..."
              value={styles.background_image || ''}
              onChange={(e) => handleStyleUpdate('background_image', e.target.value)}
            />
          </div>
          
          {styles.background_image && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Posição da Imagem</Label>
                <Select
                  value={styles.background_position || 'center'}
                  onValueChange={(value) => handleStyleUpdate('background_position', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="center">Centro</SelectItem>
                    <SelectItem value="top">Topo</SelectItem>
                    <SelectItem value="bottom">Fundo</SelectItem>
                    <SelectItem value="left">Esquerda</SelectItem>
                    <SelectItem value="right">Direita</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tamanho da Imagem</Label>
                <Select
                  value={styles.background_size || 'cover'}
                  onValueChange={(value) => handleStyleUpdate('background_size', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cover">Cobrir</SelectItem>
                    <SelectItem value="contain">Conter</SelectItem>
                    <SelectItem value="auto">Automático</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label>Opacidade da Sobreposição</Label>
            <Input
              type="range"
              min="0"
              max="100"
              value={styles.overlay_opacity || 50}
              onChange={(e) => handleStyleUpdate('overlay_opacity', parseInt(e.target.value))}
            />
            <div className="text-sm text-muted-foreground">
              {styles.overlay_opacity || 50}%
            </div>
          </div>
        </CardContent>
      </Card>
      </TabsContent>

      <TabsContent value="style" className="space-y-6 mt-6">
        {/* Conteúdo dos estilos será movido para cá */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Estilo</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configurações de estilo serão implementadas aqui</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="social-proof" className="space-y-6 mt-6">
        <StepFormSocialProofManager 
          formData={formData}
          onUpdate={onUpdate}
        />
      </TabsContent>

    </Tabs>
  );
};