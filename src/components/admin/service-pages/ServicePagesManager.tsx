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

  // Sincronizar localPages quando servicePages mudar
  useEffect(() => {
    console.log('🔄 [ServicePagesManager] Props servicePages mudaram:', {
      count: servicePages.length,
      pages: servicePages.map(p => ({ id: p.id, title: p.title, href: p.href }))
    });
    setLocalPages([...servicePages]);
  }, [servicePages]);

  const filteredPages = selectedCategory 
    ? localPages.filter(page => page.category === selectedCategory)
    : [];

  const selectedPage = selectedPageId 
    ? localPages.find(page => page.id === selectedPageId)
    : null;

  const updatePage = (pageId: string, field: keyof ServicePage, value: any) => {
    console.log('📝 [ServicePagesManager] Atualizando página:', pageId, field, value);
    
    setLocalPages(pages => pages.map(page => {
      if (page.id === pageId) {
        const updatedPage = { ...page, [field]: value };
        
        // Se estiver alterando o título, ajustar o href automaticamente
        if (field === 'title' && typeof value === 'string') {
          const slug = value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
            .replace(/\s+/g, '-') // Substitui espaços por hífens
            .replace(/-+/g, '-') // Remove hífens duplos
            .trim();
          
          updatedPage.href = slug;
          console.log('🔗 Href atualizado automaticamente:', slug);
        }
        
        return updatedPage;
      }
      return page;
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log('💾 [ServicePagesManager] Iniciando save de', localPages.length, 'páginas');
      console.log('📄 Páginas a salvar:', localPages.map(p => ({ id: p.id, title: p.title, href: p.href })));
      
      await onSave([...localPages]);
      console.log('✅ [ServicePagesManager] Save concluído com sucesso');
      
      toast.success('Páginas salvas com sucesso no Supabase!');
      
    } catch (error) {
      console.error('❌ [ServicePagesManager] Erro no save:', error);
      toast.error('Erro ao salvar páginas no Supabase');
    } finally {
      setIsSaving(false);
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
    const timestamp = Date.now();
    
    // Criar href limpo sem prefixos
    const baseHref = `novo-servico-${timestamp}`;
    
    const newServicePage: ServicePage = {
      id: newId,
      title: `Novo Serviço - ${categoryInfo?.label || selectedCategory}`,
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
    
    console.log('➕ [ServicePagesManager] Adicionando nova página:', { 
      id: newId, 
      href: baseHref,
      category: selectedCategory 
    });
    
    setLocalPages(prev => [...prev, newServicePage]);
    setSelectedPageId(newId);
  };

  const removeServicePage = (pageId: string) => {
    console.log('🗑️ [ServicePagesManager] Removendo página:', pageId);
    setLocalPages(pages => pages.filter(page => page.id !== pageId));
    if (selectedPageId === pageId) {
      setSelectedPageId(null);
    }
  };

  // Se está editando categorias
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

  // Se nenhuma categoria selecionada, mostra grid de categorias
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
              <Button onClick={handleSave} size="sm" variant="outline" disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Salvando...' : 'Salvar no Supabase'}
              </Button>
            </div>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Total de páginas: {localPages.length} | Local: {localPages.length} | Supabase: {servicePages.length}
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

  // Se categoria selecionada mas nenhuma página, mostra lista de páginas
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
              <Button onClick={handleSave} size="sm" variant="outline" disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Salvando...' : 'Salvar no Supabase'}
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

  // Se página selecionada, mostra editor completo
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
            <Button onClick={handleSave} size="sm" variant="outline" disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Salvando...' : 'Salvar no Supabase'}
            </Button>
          </div>
          <p className={`text-sm mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            URL da página: /services/{selectedPage.href || 'sem-url'}
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
