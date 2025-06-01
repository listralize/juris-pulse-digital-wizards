
import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, Save, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { BlogCategory } from '../../types/blogTypes';

interface BlogCategoriesManagementProps {
  categories: BlogCategory[];
  onSave: (categories: BlogCategory[]) => void;
  onBack: () => void;
}

export const BlogCategoriesManagement: React.FC<BlogCategoriesManagementProps> = ({
  categories,
  onSave,
  onBack
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [localCategories, setLocalCategories] = useState<BlogCategory[]>(categories);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);

  const createNewCategory = () => {
    const newCategory: BlogCategory = {
      id: Date.now().toString(),
      name: '',
      description: '',
      color: '#3B82F6'
    };
    setEditingCategory(newCategory);
  };

  const saveCategory = () => {
    if (!editingCategory) return;
    
    const isNew = !localCategories.find(c => c.id === editingCategory.id);
    let updatedCategories;
    
    if (isNew) {
      updatedCategories = [...localCategories, editingCategory];
    } else {
      updatedCategories = localCategories.map(c => 
        c.id === editingCategory.id ? editingCategory : c
      );
    }
    
    setLocalCategories(updatedCategories);
    setEditingCategory(null);
  };

  const deleteCategory = (categoryId: string) => {
    const updatedCategories = localCategories.filter(c => c.id !== categoryId);
    setLocalCategories(updatedCategories);
  };

  const saveAllCategories = () => {
    onSave(localCategories);
  };

  const updateEditingCategory = (field: keyof BlogCategory, value: string) => {
    if (!editingCategory) return;
    setEditingCategory({ ...editingCategory, [field]: value });
  };

  // Se está editando uma categoria
  if (editingCategory) {
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setEditingCategory(null)}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              {editingCategory.name || 'Nova Categoria'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome da Categoria</Label>
                <Input
                  id="name"
                  value={editingCategory.name}
                  onChange={(e) => updateEditingCategory('name', e.target.value)}
                  placeholder="Ex: Direito Tributário, E-commerce, etc."
                />
              </div>
              
              <div>
                <Label htmlFor="color">Cor da Categoria</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="color"
                    type="color"
                    value={editingCategory.color}
                    onChange={(e) => updateEditingCategory('color', e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={editingCategory.color}
                    onChange={(e) => updateEditingCategory('color', e.target.value)}
                    placeholder="#3B82F6"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Descrição</Label>
              <textarea
                id="description"
                value={editingCategory.description}
                onChange={(e) => updateEditingCategory('description', e.target.value)}
                placeholder="Breve descrição da categoria"
                rows={4}
                className={`w-full p-3 rounded-md border ${isDark 
                  ? 'bg-white/5 border-white/20 text-white' 
                  : 'bg-white border-gray-300 text-black'
                } resize-none`}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={saveCategory}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Categoria
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Lista de categorias
  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              onClick={onBack}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              Categorias do Blog
            </CardTitle>
          </div>
          <div className="flex gap-2">
            <Button onClick={createNewCategory} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nova Categoria
            </Button>
            <Button onClick={saveAllCategories} variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Salvar Todas
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {localCategories.map((category) => (
            <Card 
              key={category.id}
              className={`${isDark ? 'bg-black/50 border-white/10' : 'bg-gray-50 border-gray-200'}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: category.color }}
                    />
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                        {category.name || 'Sem nome'}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {category.description || 'Sem descrição'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingCategory(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {localCategories.length === 0 && (
            <div className="text-center py-8">
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Nenhuma categoria criada ainda. Clique em "Nova Categoria" para começar.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
