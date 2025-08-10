import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Palette, Type, Layers, Sparkles } from 'lucide-react';

interface StepStyleEditorProps {
  step: any;
  stepIndex: number;
  updateStep: (stepIndex: number, field: string, value: any) => void;
  onClose: () => void;
}

export const StepStyleEditor: React.FC<StepStyleEditorProps> = ({
  step,
  stepIndex,
  updateStep,
  onClose
}) => {
  const handleStyleUpdate = (category: string, property: string, value: string) => {
    const currentStyles = step.stepStyles || {};
    const updatedStyles = {
      ...currentStyles,
      [category]: {
        ...currentStyles[category],
        [property]: value
      }
    };
    updateStep(stepIndex, 'stepStyles', updatedStyles);
  };

  const getStyleValue = (category: string, property: string, defaultValue: string = '') => {
    return step.stepStyles?.[category]?.[property] || defaultValue;
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Personalização da Etapa: {step.title}
          </CardTitle>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="background" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="background">
              <Layers className="w-4 h-4 mr-2" />
              Fundo
            </TabsTrigger>
            <TabsTrigger value="buttons">
              <Sparkles className="w-4 h-4 mr-2" />
              Botões
            </TabsTrigger>
            <TabsTrigger value="text">
              <Type className="w-4 h-4 mr-2" />
              Textos
            </TabsTrigger>
            <TabsTrigger value="media">
              <Layers className="w-4 h-4 mr-2" />
              Mídia
            </TabsTrigger>
          </TabsList>

          <TabsContent value="background" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tipo de Fundo</Label>
                <Select
                  value={getStyleValue('background', 'type', 'solid')}
                  onValueChange={(value) => handleStyleUpdate('background', 'type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solid">Cor Sólida</SelectItem>
                    <SelectItem value="gradient">Gradiente</SelectItem>
                    <SelectItem value="image">Imagem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Cor Principal</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={getStyleValue('background', 'color', '#ffffff')}
                    onChange={(e) => handleStyleUpdate('background', 'color', e.target.value)}
                    className="w-16"
                  />
                  <Input
                    value={getStyleValue('background', 'color', '#ffffff')}
                    onChange={(e) => handleStyleUpdate('background', 'color', e.target.value)}
                    placeholder="#ffffff"
                  />
                </div>
              </div>
              {getStyleValue('background', 'type') === 'gradient' && (
                <div>
                  <Label>Cor Secundária</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={getStyleValue('background', 'gradientColor', '#f0f0f0')}
                      onChange={(e) => handleStyleUpdate('background', 'gradientColor', e.target.value)}
                      className="w-16"
                    />
                    <Input
                      value={getStyleValue('background', 'gradientColor', '#f0f0f0')}
                      onChange={(e) => handleStyleUpdate('background', 'gradientColor', e.target.value)}
                      placeholder="#f0f0f0"
                    />
                  </div>
                </div>
              )}
              {getStyleValue('background', 'type') === 'gradient' && (
                <div>
                  <Label>Direção do Gradiente</Label>
                  <Select
                    value={getStyleValue('background', 'gradientDirection', 'to bottom')}
                    onValueChange={(value) => handleStyleUpdate('background', 'gradientDirection', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="to bottom">Vertical (Top → Bottom)</SelectItem>
                      <SelectItem value="to top">Vertical (Bottom → Top)</SelectItem>
                      <SelectItem value="to right">Horizontal (Left → Right)</SelectItem>
                      <SelectItem value="to left">Horizontal (Right → Left)</SelectItem>
                      <SelectItem value="45deg">Diagonal ↗</SelectItem>
                      <SelectItem value="-45deg">Diagonal ↙</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {getStyleValue('background', 'type') === 'image' && (
                <div className="col-span-2">
                  <Label>URL da Imagem de Fundo</Label>
                  <Input
                    value={getStyleValue('background', 'imageUrl', '')}
                    onChange={(e) => handleStyleUpdate('background', 'imageUrl', e.target.value)}
                    placeholder="https://example.com/background.jpg"
                  />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="buttons" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Cor do Botão</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={getStyleValue('button', 'backgroundColor', '#4CAF50')}
                    onChange={(e) => handleStyleUpdate('button', 'backgroundColor', e.target.value)}
                    className="w-16"
                  />
                  <Input
                    value={getStyleValue('button', 'backgroundColor', '#4CAF50')}
                    onChange={(e) => handleStyleUpdate('button', 'backgroundColor', e.target.value)}
                    placeholder="#4CAF50"
                  />
                </div>
              </div>
              <div>
                <Label>Cor do Texto</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={getStyleValue('button', 'color', '#ffffff')}
                    onChange={(e) => handleStyleUpdate('button', 'color', e.target.value)}
                    className="w-16"
                  />
                  <Input
                    value={getStyleValue('button', 'color', '#ffffff')}
                    onChange={(e) => handleStyleUpdate('button', 'color', e.target.value)}
                    placeholder="#ffffff"
                  />
                </div>
              </div>
              <div>
                <Label>Estilo do Botão</Label>
                <Select
                  value={getStyleValue('button', 'style', 'solid')}
                  onValueChange={(value) => handleStyleUpdate('button', 'style', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solid">Sólido</SelectItem>
                    <SelectItem value="outline">Contorno</SelectItem>
                    <SelectItem value="ghost">Fantasma</SelectItem>
                    <SelectItem value="neon">Neon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Formato</Label>
                <Select
                  value={getStyleValue('button', 'borderRadius', 'rounded')}
                  onValueChange={(value) => handleStyleUpdate('button', 'borderRadius', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Quadrado</SelectItem>
                    <SelectItem value="sm">Levemente Arredondado</SelectItem>
                    <SelectItem value="rounded">Arredondado</SelectItem>
                    <SelectItem value="full">Totalmente Arredondado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Efeito Hover</Label>
                <Select
                  value={getStyleValue('button', 'hoverEffect', 'scale')}
                  onValueChange={(value) => handleStyleUpdate('button', 'hoverEffect', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum</SelectItem>
                    <SelectItem value="scale">Escalar</SelectItem>
                    <SelectItem value="glow">Brilho</SelectItem>
                    <SelectItem value="bounce">Bounce</SelectItem>
                    <SelectItem value="pulse">Pulse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Sombra</Label>
                <Select
                  value={getStyleValue('button', 'shadow', 'md')}
                  onValueChange={(value) => handleStyleUpdate('button', 'shadow', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sem Sombra</SelectItem>
                    <SelectItem value="sm">Pequena</SelectItem>
                    <SelectItem value="md">Média</SelectItem>
                    <SelectItem value="lg">Grande</SelectItem>
                    <SelectItem value="xl">Extra Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="text" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Cor do Título</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={getStyleValue('text', 'titleColor', '#000000')}
                    onChange={(e) => handleStyleUpdate('text', 'titleColor', e.target.value)}
                    className="w-16"
                  />
                  <Input
                    value={getStyleValue('text', 'titleColor', '#000000')}
                    onChange={(e) => handleStyleUpdate('text', 'titleColor', e.target.value)}
                    placeholder="#000000"
                  />
                </div>
              </div>
              <div>
                <Label>Cor da Descrição</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={getStyleValue('text', 'descriptionColor', '#666666')}
                    onChange={(e) => handleStyleUpdate('text', 'descriptionColor', e.target.value)}
                    className="w-16"
                  />
                  <Input
                    value={getStyleValue('text', 'descriptionColor', '#666666')}
                    onChange={(e) => handleStyleUpdate('text', 'descriptionColor', e.target.value)}
                    placeholder="#666666"
                  />
                </div>
              </div>
              <div>
                <Label>Tamanho do Título</Label>
                <Select
                  value={getStyleValue('text', 'titleSize', 'text-2xl')}
                  onValueChange={(value) => handleStyleUpdate('text', 'titleSize', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-lg">Pequeno</SelectItem>
                    <SelectItem value="text-xl">Médio</SelectItem>
                    <SelectItem value="text-2xl">Grande</SelectItem>
                    <SelectItem value="text-3xl">Extra Grande</SelectItem>
                    <SelectItem value="text-4xl">Gigante</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Peso da Fonte</Label>
                <Select
                  value={getStyleValue('text', 'fontWeight', 'font-bold')}
                  onValueChange={(value) => handleStyleUpdate('text', 'fontWeight', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="font-normal">Normal</SelectItem>
                    <SelectItem value="font-medium">Médio</SelectItem>
                    <SelectItem value="font-semibold">Semi-Bold</SelectItem>
                    <SelectItem value="font-bold">Bold</SelectItem>
                    <SelectItem value="font-extrabold">Extra Bold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Alinhamento</Label>
                <Select
                  value={getStyleValue('text', 'textAlign', 'text-center')}
                  onValueChange={(value) => handleStyleUpdate('text', 'textAlign', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-left">Esquerda</SelectItem>
                    <SelectItem value="text-center">Centro</SelectItem>
                    <SelectItem value="text-right">Direita</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Espaçamento</Label>
                <Select
                  value={getStyleValue('text', 'spacing', 'space-y-4')}
                  onValueChange={(value) => handleStyleUpdate('text', 'spacing', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="space-y-2">Pequeno</SelectItem>
                    <SelectItem value="space-y-4">Médio</SelectItem>
                    <SelectItem value="space-y-6">Grande</SelectItem>
                    <SelectItem value="space-y-8">Extra Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Largura Máxima</Label>
                <Select
                  value={getStyleValue('media', 'maxWidth', 'max-w-2xl')}
                  onValueChange={(value) => handleStyleUpdate('media', 'maxWidth', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="max-w-sm">Pequeno</SelectItem>
                    <SelectItem value="max-w-md">Médio</SelectItem>
                    <SelectItem value="max-w-lg">Grande</SelectItem>
                    <SelectItem value="max-w-xl">Extra Grande</SelectItem>
                    <SelectItem value="max-w-2xl">2XL</SelectItem>
                    <SelectItem value="max-w-full">Largura Total</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Arredondamento</Label>
                <Select
                  value={getStyleValue('media', 'borderRadius', 'rounded-lg')}
                  onValueChange={(value) => handleStyleUpdate('media', 'borderRadius', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rounded-none">Nenhum</SelectItem>
                    <SelectItem value="rounded-sm">Pequeno</SelectItem>
                    <SelectItem value="rounded-md">Médio</SelectItem>
                    <SelectItem value="rounded-lg">Grande</SelectItem>
                    <SelectItem value="rounded-xl">Extra Grande</SelectItem>
                    <SelectItem value="rounded-full">Circular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Sombra</Label>
                <Select
                  value={getStyleValue('media', 'shadow', 'shadow-lg')}
                  onValueChange={(value) => handleStyleUpdate('media', 'shadow', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shadow-none">Sem Sombra</SelectItem>
                    <SelectItem value="shadow-sm">Pequena</SelectItem>
                    <SelectItem value="shadow-md">Média</SelectItem>
                    <SelectItem value="shadow-lg">Grande</SelectItem>
                    <SelectItem value="shadow-xl">Extra Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Proporção</Label>
                <Select
                  value={getStyleValue('media', 'aspectRatio', 'auto')}
                  onValueChange={(value) => handleStyleUpdate('media', 'aspectRatio', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Automático</SelectItem>
                    <SelectItem value="aspect-square">Quadrado (1:1)</SelectItem>
                    <SelectItem value="aspect-video">Vídeo (16:9)</SelectItem>
                    <SelectItem value="aspect-[4/3]">Clássico (4:3)</SelectItem>
                    <SelectItem value="aspect-[3/2]">Foto (3:2)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => {
              updateStep(stepIndex, 'stepStyles', {});
            }}
          >
            Resetar Estilos
          </Button>
          <Button onClick={onClose}>
            Aplicar Mudanças
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};