import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { Code, Eye, Save, Palette, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StepFormPageEditorProps {
  stepForm: any;
  onUpdateStepForm: (id: string, updates: any) => void;
  onSave: () => void;
}

export const StepFormPageEditor: React.FC<StepFormPageEditorProps> = ({
  stepForm,
  onUpdateStepForm,
  onSave
}) => {
  const { toast } = useToast();
  const [customHtml, setCustomHtml] = useState(stepForm?.custom_html || '');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleUpdate = (field: string, value: any) => {
    onUpdateStepForm(stepForm.id, { [field]: value });
  };

  const handleSaveHtml = () => {
    handleUpdate('custom_html', customHtml);
    toast({
      title: "HTML Personalizado Salvo",
      description: "O código HTML foi atualizado com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Editor de Página: {stepForm?.name}</h2>
          <p className="text-muted-foreground">Configure a aparência e funcionamento da página</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Salvar Tudo
          </Button>
        </div>
      </div>

      <Tabs defaultValue="design" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="design" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Design
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configurações
          </TabsTrigger>
          <TabsTrigger value="html" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            HTML Personalizado
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estilo Visual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Cor Primária</Label>
                  <Input
                    type="color"
                    value={stepForm?.styles?.primary_color || '#4CAF50'}
                    onChange={(e) => handleUpdate('styles', {
                      ...stepForm.styles,
                      primary_color: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label>Cor de Fundo</Label>
                  <Input
                    type="color"
                    value={stepForm?.styles?.background_color || '#ffffff'}
                    onChange={(e) => handleUpdate('styles', {
                      ...stepForm.styles,
                      background_color: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label>Cor do Texto</Label>
                  <Input
                    type="color"
                    value={stepForm?.styles?.text_color || '#000000'}
                    onChange={(e) => handleUpdate('styles', {
                      ...stepForm.styles,
                      text_color: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label>Estilo do Botão</Label>
                  <select
                    className="w-full p-2 border rounded"
                    value={stepForm?.styles?.button_style || 'rounded'}
                    onChange={(e) => handleUpdate('styles', {
                      ...stepForm.styles,
                      button_style: e.target.value
                    })}
                  >
                    <option value="rounded">Arredondado</option>
                    <option value="square">Quadrado</option>
                    <option value="pill">Pill</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Nome do Formulário</Label>
                <Input
                  value={stepForm?.name || ''}
                  onChange={(e) => handleUpdate('name', e.target.value)}
                  placeholder="Nome do formulário"
                />
              </div>
              <div>
                <Label>Slug da URL</Label>
                <Input
                  value={stepForm?.slug || ''}
                  onChange={(e) => handleUpdate('slug', e.target.value)}
                  placeholder="meu-formulario"
                />
              </div>
              <div>
                <Label>Título da Página</Label>
                <Input
                  value={stepForm?.title || ''}
                  onChange={(e) => handleUpdate('title', e.target.value)}
                  placeholder="Título da página"
                />
              </div>
              <div>
                <Label>Subtítulo</Label>
                <Input
                  value={stepForm?.subtitle || ''}
                  onChange={(e) => handleUpdate('subtitle', e.target.value)}
                  placeholder="Subtítulo da página"
                />
              </div>
              <div>
                <Label>URL do Logo</Label>
                <Input
                  value={stepForm?.logo_url || ''}
                  onChange={(e) => handleUpdate('logo_url', e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Meta Título</Label>
                <Input
                  value={stepForm?.seo_config?.meta_title || ''}
                  onChange={(e) => handleUpdate('seo_config', {
                    ...stepForm.seo_config,
                    meta_title: e.target.value
                  })}
                  placeholder="Título para mecanismos de busca"
                />
              </div>
              <div>
                <Label>Meta Descrição</Label>
                <Textarea
                  value={stepForm?.seo_config?.meta_description || ''}
                  onChange={(e) => handleUpdate('seo_config', {
                    ...stepForm.seo_config,
                    meta_description: e.target.value
                  })}
                  placeholder="Descrição para mecanismos de busca"
                  rows={3}
                />
              </div>
              <div>
                <Label>Palavras-chave</Label>
                <Input
                  value={stepForm?.seo_config?.meta_keywords || ''}
                  onChange={(e) => handleUpdate('seo_config', {
                    ...stepForm.seo_config,
                    meta_keywords: e.target.value
                  })}
                  placeholder="palavra1, palavra2, palavra3"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="html" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Editor HTML Personalizado
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Substitua completamente o HTML da página. Use variáveis como {'{steps}'}, {'{currentStep}'}, {'{progress}'} para dados dinâmicos.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>HTML Personalizado</Label>
                <Textarea
                  value={customHtml}
                  onChange={(e) => setCustomHtml(e.target.value)}
                  placeholder={`<!DOCTYPE html>
<html>
<head>
  <title>{title}</title>
  <style>
    /* Seus estilos personalizados */
  </style>
</head>
<body>
  <div class="container">
    <h1>{title}</h1>
    <div class="progress">{progress}%</div>
    <div class="current-step">{currentStep}</div>
    <!-- Seus elementos personalizados -->
  </div>
  
  <script>
    // Seus scripts personalizados
  </script>
</body>
</html>`}
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSaveHtml} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Salvar HTML
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCustomHtml('')}
                >
                  Limpar
                </Button>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Variáveis Disponíveis:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Badge variant="secondary">{'{title}'}</Badge>
                  <Badge variant="secondary">{'{subtitle}'}</Badge>
                  <Badge variant="secondary">{'{progress}'}</Badge>
                  <Badge variant="secondary">{'{currentStep}'}</Badge>
                  <Badge variant="secondary">{'{steps}'}</Badge>
                  <Badge variant="secondary">{'{logoUrl}'}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview da Página</CardTitle>
              <p className="text-sm text-muted-foreground">
                Visualização aproximada de como a página será exibida
              </p>
            </CardHeader>
            <CardContent>
              <div 
                className="border rounded-lg p-6 min-h-[400px]"
                style={{
                  backgroundColor: stepForm?.styles?.background_color || '#ffffff',
                  color: stepForm?.styles?.text_color || '#000000'
                }}
              >
                {stepForm?.logo_url && (
                  <img 
                    src={stepForm.logo_url} 
                    alt="Logo"
                    className="h-16 mx-auto mb-6"
                  />
                )}
                
                <h1 className="text-3xl font-bold text-center mb-4">
                  {stepForm?.title || 'Título do Formulário'}
                </h1>
                
                {stepForm?.subtitle && (
                  <p className="text-center mb-6 opacity-80">
                    {stepForm.subtitle}
                  </p>
                )}
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      backgroundColor: stepForm?.styles?.primary_color || '#4CAF50',
                      width: '25%'
                    }}
                  ></div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Pergunta de Exemplo</h2>
                  <p className="opacity-80">Esta é uma pergunta de exemplo do seu formulário.</p>
                  
                  <div className="space-y-2">
                    {['Opção 1', 'Opção 2', 'Opção 3'].map((option, index) => (
                      <button
                        key={index}
                        className={`w-full p-3 border-2 rounded text-left transition-colors`}
                        style={{
                          borderColor: stepForm?.styles?.primary_color || '#4CAF50',
                          borderRadius: stepForm?.styles?.button_style === 'pill' ? '25px' : 
                                       stepForm?.styles?.button_style === 'square' ? '4px' : '8px'
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};