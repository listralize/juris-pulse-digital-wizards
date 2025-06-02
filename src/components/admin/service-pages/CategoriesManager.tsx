
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { CategoryInfo } from '../../../types/adminTypes';
import { Plus, Trash2, Save } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';

interface CategoriesManagerProps {
  categories: CategoryInfo[];
  onSave: (categories: CategoryInfo[]) => void;
}

const colorOptions = [
  'bg-pink-500',
  'bg-green-500', 
  'bg-blue-500',
  'bg-purple-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-indigo-500',
  'bg-yellow-500',
  'bg-gray-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-emerald-500'
];

export const CategoriesManager: React.FC<CategoriesManagerProps> = ({ 
  categories, 
  onSave 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [localCategories, setLocalCategories] = useState<CategoryInfo[]>([...categories]);

  const addCategory = () => {
    const newCategory: CategoryInfo = {
      id: `categoria-${Date.now()}`,
      value: `categoria-${Date.now()}`,
      label: 'Nova Categoria',
      name: 'Nova Categoria',
      description: 'Descrição da nova categoria',
      icon: 'FileText',
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)]
    };
    setLocalCategories([...localCategories, newCategory]);
  };

  const updateCategory = (index: number, field: keyof CategoryInfo, value: string) => {
    const updated = [...localCategories];
    updated[index] = { ...updated[index], [field]: value };
    setLocalCategories(updated);
  };

  const removeCategory = (index: number) => {
    const updated = localCategories.filter((_, i) => i !== index);
    setLocalCategories(updated);
  };

  const handleSave = () => {
    onSave(localCategories);
  };

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Gerenciar Categorias
          </CardTitle>
          <div className="flex gap-2">
            <Button onClick={addCategory} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nova Categoria
            </Button>
            <Button onClick={handleSave} size="sm" variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {localCategories.map((category, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${category.color}`}></div>
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                  {category.label}
                </h4>
              </div>
              <Button
                onClick={() => removeCategory(index)}
                size="sm"
                variant="destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Valor (ID)</Label>
                <Input
                  value={category.value}
                  onChange={(e) => updateCategory(index, 'value', e.target.value)}
                  placeholder="Ex: familia"
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label>Nome</Label>
                <Input
                  value={category.label}
                  onChange={(e) => updateCategory(index, 'label', e.target.value)}
                  placeholder="Ex: Direito de Família"
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label>Cor</Label>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => updateCategory(index, 'color', color)}
                      className={`w-8 h-8 rounded-full ${color} ${
                        category.color === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {localCategories.length === 0 && (
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
