
import React, { useState } from 'react';
import { ServicePage } from '../../types/adminTypes';
import { categories } from '../../types/adminTypes';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Trash2, ArrowLeft, Save } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

interface ServicePagesManagerProps {
  servicePages: ServicePage[];
  onSave: (pages: ServicePage[]) => void;
}

export const ServicePagesManager: React.FC<ServicePagesManagerProps> = ({ servicePages, onSave }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [localPages, setLocalPages] = useState<ServicePage[]>(servicePages);

  const filteredPages = selectedCategory 
    ? localPages.filter(page => page.category === selectedCategory)
    : [];

  const selectedPage = selectedPageId 
    ? localPages.find(page => page.id === selectedPageId)
    : null;

  const updatePage = (pageId: string, field: keyof ServicePage, value: any) => {
    setLocalPages(pages => pages.map(page => 
      page.id === pageId ? { ...page, [field]: value } : page
    ));
  };

  const addBenefit = (pageId: string) => {
    const newBenefit = { title: '', description: '', icon: '' };
    setLocalPages(pages => pages.map(page => 
      page.id === pageId ? { ...page, benefits: [...page.benefits, newBenefit] } : page
    ));
  };

  const removeBenefit = (pageId: string, index: number) => {
    setLocalPages(pages => pages.map(page => 
      page.id === pageId ? { 
        ...page, 
        benefits: page.benefits.filter((_, i) => i !== index) 
      } : page
    ));
  };

  const updateBenefit = (pageId: string, index: number, field: string, value: string) => {
    setLocalPages(pages => pages.map(page => 
      page.id === pageId ? {
        ...page,
        benefits: page.benefits.map((benefit, i) => 
          i === index ? { ...benefit, [field]: value } : benefit
        )
      } : page
    ));
  };

  const addProcess = (pageId: string) => {
    const currentPage = localPages.find(p => p.id === pageId);
    const nextStep = currentPage ? currentPage.process.length + 1 : 1;
    const newProcess = { step: nextStep, title: '', description: '' };
    setLocalPages(pages => pages.map(page => 
      page.id === pageId ? { ...page, process: [...page.process, newProcess] } : page
    ));
  };

  const removeProcess = (pageId: string, index: number) => {
    setLocalPages(pages => pages.map(page => 
      page.id === pageId ? { 
        ...page, 
        process: page.process.filter((_, i) => i !== index).map((proc, i) => ({ ...proc, step: i + 1 }))
      } : page
    ));
  };

  const updateProcess = (pageId: string, index: number, field: string, value: string) => {
    setLocalPages(pages => pages.map(page => 
      page.id === pageId ? {
        ...page,
        process: page.process.map((proc, i) => 
          i === index ? { ...proc, [field]: value } : proc
        )
      } : page
    ));
  };

  const addFaq = (pageId: string) => {
    const newFaq = { question: '', answer: '' };
    setLocalPages(pages => pages.map(page => 
      page.id === pageId ? { ...page, faq: [...page.faq, newFaq] } : page
    ));
  };

  const removeFaq = (pageId: string, index: number) => {
    setLocalPages(pages => pages.map(page => 
      page.id === pageId ? { 
        ...page, 
        faq: page.faq.filter((_, i) => i !== index) 
      } : page
    ));
  };

  const updateFaq = (pageId: string, index: number, field: string, value: string) => {
    setLocalPages(pages => pages.map(page => 
      page.id === pageId ? {
        ...page,
        faq: page.faq.map((faq, i) => 
          i === index ? { ...faq, [field]: value } : faq
        )
      } : page
    ));
  };

  const addTestimonial = (pageId: string) => {
    const newTestimonial = { name: '', quote: '', image: '' };
    setLocalPages(pages => pages.map(page => 
      page.id === pageId ? { ...page, testimonials: [...page.testimonials, newTestimonial] } : page
    ));
  };

  const removeTestimonial = (pageId: string, index: number) => {
    setLocalPages(pages => pages.map(page => 
      page.id === pageId ? { 
        ...page, 
        testimonials: page.testimonials.filter((_, i) => i !== index) 
      } : page
    ));
  };

  const updateTestimonial = (pageId: string, index: number, field: string, value: string) => {
    setLocalPages(pages => pages.map(page => 
      page.id === pageId ? {
        ...page,
        testimonials: page.testimonials.map((testimonial, i) => 
          i === index ? { ...testimonial, [field]: value } : testimonial
        )
      } : page
    ));
  };

  const handleSave = () => {
    onSave(localPages);
  };

  const addNewServicePage = () => {
    if (!selectedCategory) return;
    
    const newServicePage: ServicePage = {
      id: `${selectedCategory}-${Date.now()}`,
      title: '',
      description: '',
      category: selectedCategory,
      href: '',
      benefits: [],
      process: [],
      faq: [],
      testimonials: []
    };
    setLocalPages([...localPages, newServicePage]);
  };

  const removeServicePage = (pageId: string) => {
    setLocalPages(pages => pages.filter(page => page.id !== pageId));
    if (selectedPageId === pageId) {
      setSelectedPageId(null);
    }
  };

  // Se nenhuma categoria selecionada, mostra grid de categorias
  if (!selectedCategory) {
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Gerenciar Páginas por Área do Direito
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const categoryPages = localPages.filter(page => page.category === category.value);
              return (
                <Card 
                  key={category.value}
                  className={`cursor-pointer transition-all hover:scale-105 ${isDark ? 'bg-black/50 border-white/10 hover:border-white/30' : 'bg-gray-50 border-gray-200 hover:border-gray-400'}`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-full ${category.color} mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                      {categoryPages.length}
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                      {category.label}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {categoryPages.length} página{categoryPages.length !== 1 ? 's' : ''}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Se categoria selecionada mas nenhuma página, mostra lista de páginas
  if (selectedCategory && !selectedPageId) {
    const categoryInfo = categories.find(c => c.value === selectedCategory);
    
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setSelectedCategory(null)}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
                {categoryInfo?.label}
              </CardTitle>
            </div>
            <div className="flex gap-2">
              <Button onClick={addNewServicePage} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Página
              </Button>
              <Button onClick={handleSave} size="sm" variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Salvar Tudo
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredPages.length === 0 ? (
              <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Nenhuma página encontrada para esta categoria.
                <br />
                <Button onClick={addNewServicePage} className="mt-4" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar primeira página
                </Button>
              </div>
            ) : (
              filteredPages.map((page) => (
                <Card 
                  key={page.id}
                  className={`cursor-pointer transition-all hover:scale-[1.02] ${isDark ? 'bg-black/50 border-white/10 hover:border-white/30' : 'bg-gray-50 border-gray-200 hover:border-gray-400'}`}
                  onClick={() => setSelectedPageId(page.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                          {page.title || 'Título não definido'}
                        </h3>
                        <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {page.description || 'Descrição não definida'}
                        </p>
                        <div className="flex gap-2 text-xs">
                          <span className={`px-2 py-1 rounded ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                            {page.benefits.length} benefício{page.benefits.length !== 1 ? 's' : ''}
                          </span>
                          <span className={`px-2 py-1 rounded ${isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                            {page.process.length} etapa{page.process.length !== 1 ? 's' : ''}
                          </span>
                          <span className={`px-2 py-1 rounded ${isDark ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
                            {page.faq.length} FAQ{page.faq.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeServicePage(page.id);
                        }}
                        size="sm"
                        variant="destructive"
                        className="ml-4"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Se página selecionada, mostra editor completo
  if (selectedPage) {
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setSelectedPageId(null)}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
                Editando: {selectedPage.title || 'Nova Página'}
              </CardTitle>
            </div>
            <Button onClick={handleSave} size="sm" variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Informações Básicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Título</Label>
                <Input
                  value={selectedPage.title}
                  onChange={(e) => updatePage(selectedPage.id, 'title', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label>Link (href)</Label>
                <Input
                  value={selectedPage.href}
                  onChange={(e) => updatePage(selectedPage.id, 'href', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Descrição</Label>
                <Textarea
                  value={selectedPage.description}
                  onChange={(e) => updatePage(selectedPage.id, 'description', e.target.value)}
                  rows={3}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
            </div>
          </div>

          {/* Benefícios */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                Benefícios ({selectedPage.benefits.length})
              </h3>
              <Button onClick={() => addBenefit(selectedPage.id)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {selectedPage.benefits.map((benefit, index) => (
                <div key={index} className={`p-4 border rounded ${isDark ? 'border-white/20 bg-black/30' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Benefício {index + 1}</span>
                    <Button onClick={() => removeBenefit(selectedPage.id, index)} size="sm" variant="destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label className="text-xs">Título</Label>
                      <Input
                        value={benefit.title}
                        onChange={(e) => updateBenefit(selectedPage.id, index, 'title', e.target.value)}
                        className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Ícone</Label>
                      <Input
                        value={benefit.icon || ''}
                        onChange={(e) => updateBenefit(selectedPage.id, index, 'icon', e.target.value)}
                        placeholder="Ex: ⚖️"
                        className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Descrição</Label>
                      <Textarea
                        value={benefit.description}
                        onChange={(e) => updateBenefit(selectedPage.id, index, 'description', e.target.value)}
                        rows={2}
                        className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Processo */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                Processo ({selectedPage.process.length} etapas)
              </h3>
              <Button onClick={() => addProcess(selectedPage.id)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {selectedPage.process.map((proc, index) => (
                <div key={index} className={`p-4 border rounded ${isDark ? 'border-white/20 bg-black/30' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Etapa {proc.step}</span>
                    <Button onClick={() => removeProcess(selectedPage.id, index)} size="sm" variant="destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Título</Label>
                      <Input
                        value={proc.title}
                        onChange={(e) => updateProcess(selectedPage.id, index, 'title', e.target.value)}
                        className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Descrição</Label>
                      <Textarea
                        value={proc.description}
                        onChange={(e) => updateProcess(selectedPage.id, index, 'description', e.target.value)}
                        rows={2}
                        className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                FAQ ({selectedPage.faq.length} perguntas)
              </h3>
              <Button onClick={() => addFaq(selectedPage.id)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {selectedPage.faq.map((faq, index) => (
                <div key={index} className={`p-4 border rounded ${isDark ? 'border-white/20 bg-black/30' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">FAQ {index + 1}</span>
                    <Button onClick={() => removeFaq(selectedPage.id, index)} size="sm" variant="destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Pergunta</Label>
                      <Input
                        value={faq.question}
                        onChange={(e) => updateFaq(selectedPage.id, index, 'question', e.target.value)}
                        className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Resposta</Label>
                      <Textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(selectedPage.id, index, 'answer', e.target.value)}
                        rows={3}
                        className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Depoimentos */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                Depoimentos ({selectedPage.testimonials.length})
              </h3>
              <Button onClick={() => addTestimonial(selectedPage.id)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {selectedPage.testimonials.map((testimonial, index) => (
                <div key={index} className={`p-4 border rounded ${isDark ? 'border-white/20 bg-black/30' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Depoimento {index + 1}</span>
                    <Button onClick={() => removeTestimonial(selectedPage.id, index)} size="sm" variant="destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label className="text-xs">Nome</Label>
                      <Input
                        value={testimonial.name}
                        onChange={(e) => updateTestimonial(selectedPage.id, index, 'name', e.target.value)}
                        className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Foto (URL)</Label>
                      <Input
                        value={testimonial.image || ''}
                        onChange={(e) => updateTestimonial(selectedPage.id, index, 'image', e.target.value)}
                        className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Depoimento</Label>
                      <Textarea
                        value={testimonial.quote}
                        onChange={(e) => updateTestimonial(selectedPage.id, index, 'quote', e.target.value)}
                        rows={2}
                        className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};
