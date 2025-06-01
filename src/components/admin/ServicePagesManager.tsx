
import React, { useState } from 'react';
import { ServicePage } from '../../types/adminTypes';
import { categories } from '../../types/adminTypes';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, ArrowLeft, Save } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { CategoryGrid } from './service-pages/CategoryGrid';
import { PagesList } from './service-pages/PagesList';
import { PageEditor } from './service-pages/PageEditor';

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
          <CategoryGrid 
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
        <CardContent>
          <PageEditor page={selectedPage} onUpdatePage={updatePage} />
        </CardContent>
      </Card>
    );
  }

  return null;
};
