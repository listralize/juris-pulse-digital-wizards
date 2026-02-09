
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { CategoryInfo } from '../../../types/adminTypes';
import { Plus, Trash2, Save } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';
import { toast } from 'sonner';

interface CategoriesManagerProps {
  categories: CategoryInfo[];
  onSave: (categories: CategoryInfo[]) => Promise<void>;
}

const colorOptions = [
  '#E11D48', // pink
  '#059669', // green
  '#0EA5E9', // blue
  '#7C3AED', // purple
  '#DC2626', // red
  '#EA580C', // orange
  '#8B5CF6', // indigo
  '#F59E0B', // yellow
  '#6B7280', // gray
  '#14B8A6', // teal
  '#06B6D4', // cyan
  '#10B981'  // emerald
];

const iconOptions = [
  '👨‍👩‍👧‍👦', '💰', '🏢', '👷', '📄', '👴', '🛡️', '⚖️', '🏛️', 
  '⚗️', '🌍', '🏥', '🎓', '🏠', '📋', '💼', '🔒', '📊'
];

export const CategoriesManager: React.FC<CategoriesManagerProps> = ({ 
  categories, 
  onSave 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [localCategories, setLocalCategories] = useState<CategoryInfo[]>([...categories]);
  const [isSaving, setIsSaving] = useState(false);

  const addCategory = () => {
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    const randomIcon = iconOptions[Math.floor(Math.random() * iconOptions.length)];
    
    const newCategory: CategoryInfo = {
      id: `categoria-${Date.now()}`,
      value: `categoria-${Date.now()}`,
      label: 'Nova Categoria',
      name: 'Nova Categoria',
      description: 'Descrição da nova categoria',
      icon: randomIcon,
      color: randomColor
    };
    
    const updatedCategories = [...localCategories, newCategory];
    setLocalCategories(updatedCategories);
  };

  const updateCategory = (index: number, field: keyof CategoryInfo, value: string) => {
    const updated = [...localCategories];
    updated[index] = { ...updated[index], [field]: value };
    
    // Se mudou o label, atualizar também o name e value
    if (field === 'label') {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      updated[index].name = value;
      updated[index].value = slug;
      updated[index].id = slug;
    }
    
    setLocalCategories(updated);
  };

  const removeCategory = (index: number) => {
    const updated = localCategories.filter((_, i) => i !== index);
    setLocalCategories(updated);
  };

  const handleSave = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      await onSave(localCategories);
      toast.success('✅ Categorias salvas com sucesso!');
      
      // Disparar evento para atualizar o menu
      window.dispatchEvent(new CustomEvent('categoriesUpdated', {
        detail: localCategories
      }));
      
    } catch (error) {
      toast.error('Erro ao salvar categorias');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Gerenciar Categorias ({localCategories.length})
          </CardTitle>
          <div className="flex gap-2">
            <Button onClick={addCategory} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nova Categoria
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
      <CardContent className="space-y-4">
        {localCategories.map((category, index) => (
          <div 
            key={`category-${index}`}
            className={`p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: category.color }}
                >
                  {category.icon}
                </div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nome da Categoria</Label>
                <Input
                  value={category.label}
                  onChange={(e) => updateCategory(index, 'label', e.target.value)}
                  placeholder="Ex: Direito de Família"
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label>Valor/ID (Gerado automaticamente)</Label>
                <Input
                  value={category.value}
                  onChange={(e) => updateCategory(index, 'value', e.target.value)}
                  placeholder="Ex: familia"
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Descrição</Label>
                <Textarea
                  value={category.description || ''}
                  onChange={(e) => updateCategory(index, 'description', e.target.value)}
                  placeholder="Ex: Proteção e orientação em questões familiares"
                  rows={2}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label>Ícone</Label>
                <div className="flex gap-2 flex-wrap mt-2">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => updateCategory(index, 'icon', icon)}
                      className={`w-8 h-8 rounded border-2 flex items-center justify-center text-lg ${
                        category.icon === icon 
                          ? 'border-blue-500 bg-blue-100' 
                          : `border-gray-300 ${isDark ? 'bg-black hover:bg-gray-800' : 'bg-white hover:bg-gray-50'}`
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Cor</Label>
                <div className="flex gap-2 flex-wrap mt-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => updateCategory(index, 'color', color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        category.color === color ? 'border-white ring-2 ring-blue-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
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
