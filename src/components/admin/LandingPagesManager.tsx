
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Plus, Edit, Trash2, Save, ArrowLeft, Move } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { LandingPage, LandingPageSection, FormStep, FormField } from '../../types/adminTypes';

interface LandingPagesManagerProps {
  onSave: (pages: LandingPage[]) => void;
}

export const LandingPagesManager: React.FC<LandingPagesManagerProps> = ({ onSave }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<LandingPage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'sections' | 'form'>('basic');

  useEffect(() => {
    // Carregar páginas salvas
    const savedPages = localStorage.getItem('landingPages');
    if (savedPages) {
      try {
        const parsed = JSON.parse(savedPages);
        setLandingPages(parsed);
      } catch (error) {
        console.error('Erro ao carregar landing pages:', error);
      }
    }
  }, []);

  const createNewPage = () => {
    const newPage: LandingPage = {
      id: Date.now().toString(),
      title: 'Nova Landing Page',
      slug: 'nova-landing-page',
      heroTitle: 'Título Principal',
      heroSubtitle: 'Subtítulo da página',
      heroImage: '',
      ctaButtonText: 'Entre em Contato',
      ctaButtonLink: 'https://api.whatsapp.com/send?phone=5562994594496',
      sections: [],
      hasForm: false,
      formSteps: [],
      webhookUrl: '',
      redirectUrl: '',
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    setLandingPages(prev => [...prev, newPage]);
    setSelectedPage(newPage);
    setIsEditing(true);
  };

  const updatePage = (field: keyof LandingPage, value: any) => {
    if (!selectedPage) return;
    
    const updatedPage = { ...selectedPage, [field]: value };
    setSelectedPage(updatedPage);
    
    setLandingPages(prev => 
      prev.map(page => page.id === selectedPage.id ? updatedPage : page)
    );
  };

  const addSection = (type: LandingPageSection['type']) => {
    if (!selectedPage) return;
    
    const newSection: LandingPageSection = {
      id: Date.now().toString(),
      type,
      title: 'Título da Seção',
      content: 'Conteúdo da seção...'
    };
    
    const updatedSections = [...selectedPage.sections, newSection];
    updatePage('sections', updatedSections);
  };

  const updateSection = (sectionId: string, field: keyof LandingPageSection, value: any) => {
    if (!selectedPage) return;
    
    const updatedSections = selectedPage.sections.map(section =>
      section.id === sectionId ? { ...section, [field]: value } : section
    );
    
    updatePage('sections', updatedSections);
  };

  const removeSection = (sectionId: string) => {
    if (!selectedPage) return;
    
    const updatedSections = selectedPage.sections.filter(section => section.id !== sectionId);
    updatePage('sections', updatedSections);
  };

  const removePage = (pageId: string) => {
    setLandingPages(prev => prev.filter(page => page.id !== pageId));
    if (selectedPage?.id === pageId) {
      setSelectedPage(null);
      setIsEditing(false);
    }
  };

  // Gerenciamento de formulários por steps
  const addFormStep = () => {
    if (!selectedPage) return;
    
    const newStep: FormStep = {
      id: Date.now().toString(),
      title: 'Nova Etapa',
      description: 'Descrição da etapa',
      fields: []
    };
    
    const updatedSteps = [...selectedPage.formSteps, newStep];
    updatePage('formSteps', updatedSteps);
  };

  const updateFormStep = (stepId: string, field: keyof FormStep, value: any) => {
    if (!selectedPage) return;
    
    const updatedSteps = selectedPage.formSteps.map(step =>
      step.id === stepId ? { ...step, [field]: value } : step
    );
    
    updatePage('formSteps', updatedSteps);
  };

  const removeFormStep = (stepId: string) => {
    if (!selectedPage) return;
    
    const updatedSteps = selectedPage.formSteps.filter(step => step.id !== stepId);
    updatePage('formSteps', updatedSteps);
  };

  const addFormField = (stepId: string) => {
    if (!selectedPage) return;
    
    const newField: FormField = {
      id: Date.now().toString(),
      type: 'text',
      label: 'Novo Campo',
      placeholder: 'Digite aqui...',
      required: false,
      options: []
    };
    
    const updatedSteps = selectedPage.formSteps.map(step => {
      if (step.id === stepId) {
        return { ...step, fields: [...step.fields, newField] };
      }
      return step;
    });
    
    updatePage('formSteps', updatedSteps);
  };

  const updateFormField = (stepId: string, fieldId: string, field: keyof FormField, value: any) => {
    if (!selectedPage) return;
    
    const updatedSteps = selectedPage.formSteps.map(step => {
      if (step.id === stepId) {
        const updatedFields = step.fields.map(formField =>
          formField.id === fieldId ? { ...formField, [field]: value } : formField
        );
        return { ...step, fields: updatedFields };
      }
      return step;
    });
    
    updatePage('formSteps', updatedSteps);
  };

  const removeFormField = (stepId: string, fieldId: string) => {
    if (!selectedPage) return;
    
    const updatedSteps = selectedPage.formSteps.map(step => {
      if (step.id === stepId) {
        const updatedFields = step.fields.filter(field => field.id !== fieldId);
        return { ...step, fields: updatedFields };
      }
      return step;
    });
    
    updatePage('formSteps', updatedSteps);
  };

  const handleSave = () => {
    // Salvar no localStorage e notificar componente pai
    localStorage.setItem('landingPages', JSON.stringify(landingPages));
    onSave(landingPages);
    
    // Criar rota dinâmica no localStorage para o roteador
    const routes = landingPages.map(page => ({
      path: `/${page.slug}`,
      pageData: page
    }));
    localStorage.setItem('dynamicLandingRoutes', JSON.stringify(routes));
    
    setIsEditing(false);
  };

  // Lista de páginas
  if (!selectedPage) {
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              Landing Pages de Marketing
            </CardTitle>
            <Button onClick={createNewPage}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Landing Page
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {landingPages.length === 0 ? (
            <div className="text-center py-8">
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Nenhuma landing page criada ainda. Clique em "Nova Landing Page" para começar.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {landingPages.map((page) => (
                <Card 
                  key={page.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${isDark ? 'bg-black/50 border-white/10 hover:border-white/30' : 'bg-gray-50 border-gray-200 hover:border-gray-400'}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                        {page.title}
                      </h3>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedPage(page)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => removePage(page.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      /{page.slug}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                        {page.sections.length} seções
                      </span>
                      {page.hasForm && (
                        <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                          {page.formSteps.length} etapas
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded ${page.isActive ? (isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') : (isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')}`}>
                        {page.isActive ? 'Ativa' : 'Inativa'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Editor da página
  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => { setSelectedPage(null); setIsEditing(false); }}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              Editando: {selectedPage.title}
            </CardTitle>
          </div>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Tabs de navegação */}
        <div className="flex gap-4 mb-6 border-b">
          <Button 
            variant={activeTab === 'basic' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('basic')}
          >
            Básico
          </Button>
          <Button 
            variant={activeTab === 'sections' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('sections')}
          >
            Seções
          </Button>
          <Button 
            variant={activeTab === 'form' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('form')}
          >
            Formulário
          </Button>
        </div>

        {/* Conteúdo das tabs */}
        {activeTab === 'basic' && (
          <div className="space-y-6">
            {/* Configurações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle className={`text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                  Configurações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Título da Página</Label>
                    <Input
                      value={selectedPage.title}
                      onChange={(e) => updatePage('title', e.target.value)}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>URL (slug)</Label>
                    <Input
                      value={selectedPage.slug}
                      onChange={(e) => updatePage('slug', e.target.value)}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isActive"
                    checked={selectedPage.isActive}
                    onCheckedChange={(checked) => updatePage('isActive', checked)}
                  />
                  <Label htmlFor="isActive">Página ativa</Label>
                </div>
              </CardContent>
            </Card>

            {/* Hero Section */}
            <Card>
              <CardHeader>
                <CardTitle className={`text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                  Seção Hero
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Título Principal</Label>
                  <Input
                    value={selectedPage.heroTitle}
                    onChange={(e) => updatePage('heroTitle', e.target.value)}
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  />
                </div>
                <div>
                  <Label>Subtítulo</Label>
                  <Textarea
                    value={selectedPage.heroSubtitle}
                    onChange={(e) => updatePage('heroSubtitle', e.target.value)}
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>URL da Imagem Hero</Label>
                  <Input
                    value={selectedPage.heroImage}
                    onChange={(e) => updatePage('heroImage', e.target.value)}
                    placeholder="URL da imagem"
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Texto do Botão CTA</Label>
                    <Input
                      value={selectedPage.ctaButtonText}
                      onChange={(e) => updatePage('ctaButtonText', e.target.value)}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Link do Botão CTA</Label>
                    <Input
                      value={selectedPage.ctaButtonLink}
                      onChange={(e) => updatePage('ctaButtonLink', e.target.value)}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'sections' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className={`text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                  Seções da Página
                </CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => addSection('text')}>Texto</Button>
                  <Button size="sm" onClick={() => addSection('image')}>Imagem</Button>
                  <Button size="sm" onClick={() => addSection('cta')}>CTA</Button>
                  <Button size="sm" onClick={() => addSection('testimonial')}>Depoimento</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {selectedPage.sections.length === 0 ? (
                <p className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Nenhuma seção adicionada. Use os botões acima para adicionar seções.
                </p>
              ) : (
                <div className="space-y-4">
                  {selectedPage.sections.map((section) => (
                    <Card key={section.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                            Seção: {section.type}
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => removeSection(section.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Label>Título</Label>
                            <Input
                              value={section.title}
                              onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                            />
                          </div>
                          <div>
                            <Label>Conteúdo</Label>
                            <Textarea
                              value={section.content}
                              onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                              rows={3}
                            />
                          </div>
                          {(section.type === 'image' || section.type === 'cta') && (
                            <div>
                              <Label>URL da Imagem</Label>
                              <Input
                                value={section.image || ''}
                                onChange={(e) => updateSection(section.id, 'image', e.target.value)}
                                placeholder="URL da imagem"
                                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                              />
                            </div>
                          )}
                          {section.type === 'cta' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <Label>Texto do Botão</Label>
                                <Input
                                  value={section.buttonText || ''}
                                  onChange={(e) => updateSection(section.id, 'buttonText', e.target.value)}
                                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                                />
                              </div>
                              <div>
                                <Label>Link do Botão</Label>
                                <Input
                                  value={section.buttonLink || ''}
                                  onChange={(e) => updateSection(section.id, 'buttonLink', e.target.value)}
                                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'form' && (
          <div className="space-y-6">
            {/* Configurações do formulário */}
            <Card>
              <CardHeader>
                <CardTitle className={`text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                  Configurações do Formulário
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasForm"
                    checked={selectedPage.hasForm}
                    onCheckedChange={(checked) => updatePage('hasForm', checked)}
                  />
                  <Label htmlFor="hasForm">Incluir formulário na página</Label>
                </div>
                
                {selectedPage.hasForm && (
                  <>
                    <div>
                      <Label>URL do Webhook (opcional)</Label>
                      <Input
                        value={selectedPage.webhookUrl || ''}
                        onChange={(e) => updatePage('webhookUrl', e.target.value)}
                        placeholder="https://hooks.zapier.com/..."
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label>URL de Redirecionamento após envio</Label>
                      <Input
                        value={selectedPage.redirectUrl || ''}
                        onChange={(e) => updatePage('redirectUrl', e.target.value)}
                        placeholder="/obrigado"
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Etapas do formulário */}
            {selectedPage.hasForm && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                      Etapas do Formulário
                    </CardTitle>
                    <Button onClick={addFormStep} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Etapa
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedPage.formSteps.length === 0 ? (
                    <p className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Nenhuma etapa criada. Clique em "Nova Etapa" para começar.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {selectedPage.formSteps.map((step, stepIndex) => (
                        <Card key={step.id}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className={`text-base ${isDark ? 'text-white' : 'text-black'}`}>
                                Etapa {stepIndex + 1}
                              </CardTitle>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => removeFormStep(step.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label>Título da Etapa</Label>
                                <Input
                                  value={step.title}
                                  onChange={(e) => updateFormStep(step.id, 'title', e.target.value)}
                                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                                />
                              </div>
                              <div>
                                <Label>Descrição</Label>
                                <Input
                                  value={step.description}
                                  onChange={(e) => updateFormStep(step.id, 'description', e.target.value)}
                                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                                />
                              </div>
                            </div>
                            
                            {/* Campos da etapa */}
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <Label>Campos</Label>
                                <Button 
                                  size="sm" 
                                  onClick={() => addFormField(step.id)}
                                >
                                  <Plus className="w-3 h-3 mr-1" />
                                  Campo
                                </Button>
                              </div>
                              
                              {step.fields.map((field) => (
                                <Card key={field.id} className="mb-3">
                                  <CardContent className="p-3">
                                    <div className="flex items-center justify-between mb-3">
                                      <span className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
                                        Campo: {field.type}
                                      </span>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => removeFormField(step.id, field.id)}
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                      <div>
                                        <Label>Tipo</Label>
                                        <Select
                                          value={field.type}
                                          onValueChange={(value) => updateFormField(step.id, field.id, 'type', value)}
                                        >
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="text">Texto</SelectItem>
                                            <SelectItem value="email">Email</SelectItem>
                                            <SelectItem value="phone">Telefone</SelectItem>
                                            <SelectItem value="select">Seleção</SelectItem>
                                            <SelectItem value="textarea">Texto Longo</SelectItem>
                                            <SelectItem value="checkbox">Checkbox</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label>Label</Label>
                                        <Input
                                          value={field.label}
                                          onChange={(e) => updateFormField(step.id, field.id, 'label', e.target.value)}
                                          className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                                        />
                                      </div>
                                      <div>
                                        <Label>Placeholder</Label>
                                        <Input
                                          value={field.placeholder || ''}
                                          onChange={(e) => updateFormField(step.id, field.id, 'placeholder', e.target.value)}
                                          className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-3">
                                      <Checkbox
                                        id={`required-${field.id}`}
                                        checked={field.required}
                                        onCheckedChange={(checked) => updateFormField(step.id, field.id, 'required', checked)}
                                      />
                                      <Label htmlFor={`required-${field.id}`}>Campo obrigatório</Label>
                                    </div>
                                    {field.type === 'select' && (
                                      <div className="mt-3">
                                        <Label>Opções (uma por linha)</Label>
                                        <Textarea
                                          value={(field.options || []).join('\n')}
                                          onChange={(e) => updateFormField(step.id, field.id, 'options', e.target.value.split('\n').filter(Boolean))}
                                          placeholder="Opção 1&#10;Opção 2&#10;Opção 3"
                                          className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                                          rows={3}
                                        />
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
