import React from 'react';
import { Button } from '../ui/button';
import { CategoryText, PageTexts } from '../../types/adminTypes';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

interface CategoryTextsManagementProps {
  pageTexts: PageTexts;
  onUpdatePageTexts: (texts: PageTexts) => void;
  onSave: () => void;
}

export const CategoryTextsManagement: React.FC<CategoryTextsManagementProps> = ({
  pageTexts,
  onUpdatePageTexts,
  onSave
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const updateCategoryText = (id: string, field: keyof CategoryText, value: string) => {
    const updatedCategoryTexts = pageTexts.categoryTexts.map(category =>
      category.id === id ? { ...category, [field]: value } : category
    );
    
    onUpdatePageTexts({
      ...pageTexts,
      categoryTexts: updatedCategoryTexts
    });
  };

  const addCategoryText = () => {
    const newCategory: CategoryText = {
      id: `categoria-${Date.now()}`,
      title: '',
      description: ''
    };
    
    onUpdatePageTexts({
      ...pageTexts,
      categoryTexts: [...pageTexts.categoryTexts, newCategory]
    });
  };

  const removeCategoryText = (id: string) => {
    const updatedCategoryTexts = pageTexts.categoryTexts.filter(category => category.id !== id);
    
    onUpdatePageTexts({
      ...pageTexts,
      categoryTexts: updatedCategoryTexts
    });
  };

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Categorias de Serviços
          </CardTitle>
          <div className="flex gap-2">
            <Button onClick={addCategoryText} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nova Categoria
            </Button>
            <Button onClick={onSave} size="sm" variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {pageTexts.categoryTexts.map((category) => (
          <div 
            key={category.id}
            className={`p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                {category.title || 'Nova Categoria'}
              </h4>
              <Button
                onClick={() => removeCategoryText(category.id)}
                size="sm"
                variant="destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Título</Label>
                <Input
                  value={category.title}
                  onChange={(e) => updateCategoryText(category.id, 'title', e.target.value)}
                  placeholder="Ex: Patrimônio e Sucessões"
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label>ID da Categoria</Label>
                <Input
                  value={category.id}
                  onChange={(e) => updateCategoryText(category.id, 'id', e.target.value)}
                  placeholder="Ex: patrimonio-sucessoes"
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Descrição</Label>
                <Textarea
                  value={category.description}
                  onChange={(e) => updateCategoryText(category.id, 'description', e.target.value)}
                  placeholder="Ex: Gestão patrimonial familiar, planejamento sucessório..."
                  rows={3}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
            </div>
          </div>
        ))}
        
        {pageTexts.categoryTexts.length === 0 && (
          <div className="text-center py-8">
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Nenhuma categoria criada ainda.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
