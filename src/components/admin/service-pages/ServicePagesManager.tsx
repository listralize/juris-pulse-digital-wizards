import React, { useState, useEffect } from 'react';
import { ServicePage, PageTexts, CategoryInfo } from '../../../types/adminTypes';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Plus, ArrowLeft, Save, Settings } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';
import { CategoryGrid } from './CategoryGrid';
import { PagesList } from './PagesList';
import { PageEditor } from './PageEditor';
import { CategoriesManager } from './CategoriesManager';
import { toast } from 'sonner';

interface ServicePagesManagerProps {
  servicePages: ServicePage[];
  categories: CategoryInfo[];
  pageTexts: PageTexts;
  onSave: (pages: ServicePage[]) => Promise<void>;
  onSaveCategories: (categories: CategoryInfo[]) => Promise<void>;
  onSavePageTexts: () => void;
  onUpdatePageTexts: (texts: PageTexts) => void;
}

export const ServicePagesManager: React.FC<ServicePagesManagerProps> = ({
  servicePages,
  categories,
  pageTexts,
  onSave,
  onSaveCategories,
  onSavePageTexts,
  onUpdatePageTexts
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [showCategoryEditor, setShowCategoryEditor] = useState(false);
  const [localPages, setLocalPages] = useState<ServicePage[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    console.log('🔄 [ServicePagesManager] Sincronizando páginas:', {
      servicePagesCount: servicePages.length,
      localPagesCount: localPages.length
    });
    setLocalPages([...servicePages]);
  }, [servicePages]);

  const filteredPages = selectedCategory 
    ? localPages.filter(page => page.category === selectedCategory)
    : [];

  const selectedPage = selectedPageId 
    ? localPages.find(page => page.id === selectedPageId)
    : null;

  const generateSlugFromTitle = (title: string): string => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const updatePage = (pageId: string, field: keyof ServicePage, value: any) => {
    console.log('📝 [ServicePagesManager] Atualizando página:', pageId, field, value);
    
    setLocalPages(pages => pages.map(page => {
      if (page.id === pageId) {
        const updatedPage = { ...page, [field]: value };
        
        if (field === 'title' && typeof value === 'string') {
          const slug = generateSlugFromTitle(value);
          updatedPage.href = slug;
          console.log('🔗 Href atualizado para:', slug);
        }
        
        return updatedPage;
      }
      return page;
    }));
  };

  const handleSave = async () => {
    if (isSaving) {
      console.log('⏳ Salvamento já em andamento, ignorando...');
      return;
    }
    
    console.log('🚀 [ServicePagesManager] INICIANDO SALVAMENTO');
    setIsSaving(true);
    
    try {
      await onSave([...localPages]);
      console.log('✅ SUCESSO! Páginas salvas');
      toast.success('🎉 Páginas salvas com sucesso!');
      
    } catch (error) {
      console.error('❌ ERRO ao salvar páginas:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      toast.error(`❌ Erro ao salvar: ${errorMessage}`);
    } finally {
      // Garante que o estado sempre seja resetado
      setTimeout(() => {
        setIsSaving(false);
        console.log('🔄 Estado de salvamento resetado');
      }, 100);
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedPageId(null);
    setShowCategoryEditor(false);
  };

  const handleBackToPages = () => {
    setSelectedPageId(null);
  };

  const addNewServicePage = () => {
    if (!selectedCategory) return;
    const categoryInfo = categories.find(c => c.value === selectedCategory);
    const newId = crypto.randomUUID();
    
    const newTitle = `Novo Serviço - ${categoryInfo?.label || selectedCategory}`;
    const baseHref = generateSlugFromTitle(newTitle);
    
    const newServicePage: ServicePage = {
      id: newId,
      title: newTitle,
      description: 'Descrição do novo serviço',
      category: selectedCategory,
      href: baseHref,
      benefits: [{
        title: "Benefício 1",
        description: "Descrição do benefício 1",
        icon: "⚖️"
      }],
      process: [{
        step: 1,
        title: "Primeira Etapa",
        description: "Descrição da primeira etapa"
      }],
      faq: [{
        question: "Pergunta frequente?",
        answer: "Resposta à pergunta"
      }],
      testimonials: [{
        name: "Cliente Satisfeito",
        text: "Excelente atendimento"
      }]
    };
    
    console.log('➕ Adicionando nova página:', { 
      id: newId, 
      href: baseHref,
      category: selectedCategory 
    });
    
    setLocalPages(prev => [...prev, newServicePage]);
    setSelectedPageId(newId);
  };

  const removeServicePage = (pageId: string) => {
    console.log('🗑️ Removendo página:', pageId);
    setLocalPages(pages => pages.filter(page => page.id !== pageId));
    if (selectedPageId === pageId) {
      setSelectedPageId(null);
    }
  };

  if (showCategoryEditor) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setShowCategoryEditor(false)}
            variant="outline"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
            Editar Categorias
          </h2>
        </div>
        <CategoriesManager 
          categories={categories}
          onSave={onSaveCategories}
        />
      </div>
    );
  }

  if (!selectedCategory) {
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              Gerenciar Páginas por Área do Direito
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={() => setShowCategoryEditor(true)} size="sm" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Editar Categorias
              </Button>
              <Button 
                onClick={handleSave} 
                size="sm" 
                variant="outline" 
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            📊 Total de páginas: {localPages.length}
          </p>
        </CardHeader>
        <CardContent>
          <CategoryGrid 
            categories={categories}
            servicePages={localPages} 
            onCategorySelect={setSelectedCategory} 
          />
        </CardContent>
      </Card>
    );
  }

  if (selectedCategory && !selectedPageId) {  
    const categoryInfo = categories.find(c => c.value === selectedCategory);
    
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleBackToCategories}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
                {categoryInfo?.label} ({filteredPages.length} páginas)
              </CardTitle>
            </div>
            <div className="flex gap-2">
              <Button onClick={addNewServicePage} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Página
              </Button>
              <Button 
                onClick={handleSave} 
                size="sm" 
                variant="outline" 
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <PagesList
            pages={filteredPages}
            onPageSelect={setSelectedPageId}
            onNewPage={addNewServicePage}
            onDeletePage={removeServicePage}
          />
        </CardContent>
      </Card>
    );
  }

  if (selectedPage) {
    const categoryInfo = categories.find(c => c.value === selectedCategory);
    
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleBackToPages}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar à Lista
              </Button>
              <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
                {categoryInfo?.label} › {selectedPage.title || 'Nova Página'}
              </CardTitle>
            </div>
            <Button 
              onClick={handleSave} 
              size="sm" 
              variant="outline" 
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
          <p className={`text-sm mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            🌐 URL da página: /services/{selectedPage.href || 'sem-url'}
          </p>
        </CardHeader>
        <CardContent>
          <PageEditor page={selectedPage} onUpdatePage={updatePage} />
        </CardContent>
      </Card>
    );
  }

  return null;
};
