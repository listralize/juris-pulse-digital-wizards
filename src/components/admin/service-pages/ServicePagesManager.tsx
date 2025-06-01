
import React, { useState, useEffect } from 'react';
import { ServicePage, PageTexts } from '../../../types/adminTypes';
import { categories } from '../../../types/adminTypes';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Plus, ArrowLeft, Save, Settings } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';
import { PagesList } from './PagesList';
import { PageEditor } from './PageEditor';
import { CategoryTextsManagement } from '../CategoryTextsManagement';
import { NewLawAreaModal } from './NewLawAreaModal';
import { NewCategoryModal } from './NewCategoryModal';
import { lawAreaCategories } from './lawAreaCategories';
import { filterPagesByLawArea, filterPagesByCategory } from './pageFilterUtils';

interface ServicePagesManagerProps {
  servicePages: ServicePage[];
  pageTexts: PageTexts;
  onSave: (pages: ServicePage[]) => void;
  onSavePageTexts: () => void;
  onUpdatePageTexts: (texts: PageTexts) => void;
}

export const ServicePagesManager: React.FC<ServicePagesManagerProps> = ({ 
  servicePages, 
  pageTexts,
  onSave, 
  onSavePageTexts,
  onUpdatePageTexts 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [selectedLawArea, setSelectedLawArea] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [showCategoryEditor, setShowCategoryEditor] = useState(false);
  const [showNewLawAreaModal, setShowNewLawAreaModal] = useState(false);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [localPages, setLocalPages] = useState<ServicePage[]>([]);
  const [localLawAreaCategories, setLocalLawAreaCategories] = useState(lawAreaCategories);

  useEffect(() => {
    if (servicePages && servicePages.length > 0) {
      console.log('ServicePagesManager: Sincronizando páginas recebidas:', servicePages.length);
      setLocalPages([...servicePages]);
    }
  }, [servicePages]);

  const filteredPagesByLawArea = filterPagesByLawArea(localPages, selectedLawArea);
  const filteredPagesByCategory = filterPagesByCategory(localPages, selectedLawArea, selectedCategory);

  const selectedPage = selectedPageId 
    ? localPages.find(page => page.id === selectedPageId)
    : null;

  const updatePage = (pageId: string, field: keyof ServicePage, value: any) => {
    setLocalPages(pages => pages.map(page => 
      page.id === pageId ? { ...page, [field]: value } : page
    ));
  };

  const handleSave = () => {
    console.log('Salvando páginas locais:', localPages.length);
    onSave([...localPages]);
  };

  const addNewServicePage = () => {
    if (!selectedLawArea || !selectedCategory) return;
    
    const categoryInfo = lawAreaCategories[selectedLawArea as keyof typeof lawAreaCategories]?.find(
      cat => cat.id === selectedCategory
    );
    
    const newId = `${selectedLawArea}-${selectedCategory}-${Date.now()}`;
    const newServicePage: ServicePage = {
      id: newId,
      title: categoryInfo?.title || '',
      description: categoryInfo?.description || '',
      category: selectedLawArea,
      href: `/servicos/${selectedCategory}`,
      benefits: [],
      process: [],
      faq: [],
      testimonials: []
    };
    
    console.log('Adicionando nova página:', newId);
    setLocalPages(prev => [...prev, newServicePage]);
    setSelectedPageId(newId);
  };

  const removeServicePage = (pageId: string) => {
    console.log('Removendo página:', pageId);
    setLocalPages(pages => pages.filter(page => page.id !== pageId));
    if (selectedPageId === pageId) {
      setSelectedPageId(null);
    }
  };

  // Handlers para navegação
  const handleBackToLawAreas = () => {
    setSelectedLawArea(null);
    setSelectedCategory(null);
    setSelectedPageId(null);
    setShowCategoryEditor(false);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedPageId(null);
  };

  const handleBackToPages = () => {
    setSelectedPageId(null);
  };

  const addNewLawArea = (newArea: { id: string; title: string; description: string; color: string }) => {
    setLocalLawAreaCategories(prev => ({
      ...prev,
      [newArea.id]: []
    }));
    
    console.log('Nova área de direito criada:', newArea);
  };

  const addNewCategory = (categoryData: { id: string; title: string; description: string }) => {
    if (!selectedLawArea) return;
    
    setLocalLawAreaCategories(prev => ({
      ...prev,
      [selectedLawArea]: [
        ...(prev[selectedLawArea as keyof typeof prev] || []),
        categoryData
      ]
    }));
    
    console.log('Nova categoria criada para', selectedLawArea, ':', categoryData);
  };

  // Se está editando categorias
  if (showCategoryEditor) {
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setShowCategoryEditor(false)}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
                Editar Categorias de Serviços
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CategoryTextsManagement
            pageTexts={pageTexts}
            onUpdatePageTexts={onUpdatePageTexts}
            onSave={onSavePageTexts}
          />
        </CardContent>
      </Card>
    );
  }

  // Nível 1: Seleção da Área do Direito
  if (!selectedLawArea) {
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              Selecione a Área do Direito
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={() => setShowNewLawAreaModal(true)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Área
              </Button>
              <Button onClick={() => setShowCategoryEditor(true)} size="sm" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Editar Categorias
              </Button>
              <Button onClick={handleSave} size="sm" variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Salvar Tudo
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((lawArea) => {
              const areaPages = localPages.filter(page => page.category === lawArea.value);
              
              return (
                <Card 
                  key={lawArea.value}
                  className={`cursor-pointer transition-all hover:scale-105 ${isDark ? 'bg-black/50 border-white/10 hover:border-white/30' : 'bg-gray-50 border-gray-200 hover:border-gray-400'}`}
                  onClick={() => setSelectedLawArea(lawArea.value)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-full ${lawArea.color} mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                      {areaPages.length}
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                      {lawArea.label}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {areaPages.length} página{areaPages.length !== 1 ? 's' : ''} disponível{areaPages.length !== 1 ? 'eis' : ''}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>

        <NewLawAreaModal
          isOpen={showNewLawAreaModal}
          onClose={() => setShowNewLawAreaModal(false)}
          onSave={addNewLawArea}
        />
      </Card>
    );
  }

  // Nível 2: Seleção da Categoria de Serviço dentro da Área
  if (selectedLawArea && !selectedCategory) {
    const lawAreaInfo = categories.find(c => c.value === selectedLawArea);
    const availableCategories = localLawAreaCategories[selectedLawArea as keyof typeof localLawAreaCategories] || [];
    
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleBackToLawAreas}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
                {lawAreaInfo?.label} - Categorias de Serviços
              </CardTitle>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowNewCategoryModal(true)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Categoria
              </Button>
              <Button onClick={handleSave} size="sm" variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Salvar Tudo
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableCategories.map((category) => {
              const categoryPageCount = filterPagesByCategory(
                localPages, 
                selectedLawArea, 
                category.id
              ).length;
              
              return (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${isDark ? 'bg-black/50 border-white/10 hover:border-white/30' : 'bg-gray-50 border-gray-200 hover:border-gray-400'}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-full ${lawAreaInfo?.color} mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                      {categoryPageCount}
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                      {category.title}
                    </h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {category.description}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {categoryPageCount} página{categoryPageCount !== 1 ? 's' : ''}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>

        <NewCategoryModal
          isOpen={showNewCategoryModal}
          onClose={() => setShowNewCategoryModal(false)}
          onSave={addNewCategory}
        />
      </Card>
    );
  }

  // Nível 3: Lista de Páginas dentro da Categoria
  if (selectedLawArea && selectedCategory && !selectedPageId) {
    const lawAreaInfo = categories.find(c => c.value === selectedLawArea);
    const categoryInfo = lawAreaCategories[selectedLawArea as keyof typeof lawAreaCategories]?.find(cat => cat.id === selectedCategory);
    
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
                {lawAreaInfo?.label} › {categoryInfo?.title}
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
          <PagesList
            pages={filteredPagesByCategory}
            onPageSelect={setSelectedPageId}
            onNewPage={addNewServicePage}
            onDeletePage={removeServicePage}
          />
        </CardContent>
      </Card>
    );
  }

  // Nível 4: Editor da Página
  if (selectedPage) {
    const lawAreaInfo = categories.find(c => c.value === selectedLawArea);
    const categoryInfo = lawAreaCategories[selectedLawArea as keyof typeof lawAreaCategories]?.find(cat => cat.id === selectedCategory);
    
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
                {lawAreaInfo?.label} › {categoryInfo?.title} › {selectedPage.title || 'Nova Página'}
              </CardTitle>
            </div>
            <Button onClick={handleSave} size="sm" variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <PageEditor page={selectedPage} onUpdatePage={updatePage} />
        </CardContent>
      </Card>
    );
  }

  return null;
};
