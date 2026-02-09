
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { CategoryInfo } from '../../../types/adminTypes';
import { Plus, Trash2, Save } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';
import { useSupabaseLawCategories } from '../../../hooks/supabase/useSupabaseLawCategories';
import { toast } from 'sonner';

const colorOptions = [
  '#E11D48', '#059669', '#0EA5E9', '#7C3AED', '#DC2626', '#EA580C', 
  '#8B5CF6', '#F59E0B', '#6B7280', '#14B8A6', '#06B6D4', '#10B981'
];

const iconOptions = [
  '👨‍👩‍👧‍👦', '💰', '🏢', '👷', '📄', '👴', '🛡️', '⚖️', '🏛️', 
  '⚗️', '🌍', '🏥', '🎓', '🏠', '📋', '💼', '🔒', '📊'
];

export const CategoryManagerNew: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { categories, isLoading, saveCategory, deleteCategory } = useSupabaseLawCategories();
  const [localCategories, setLocalCategories] = useState<CategoryInfo[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (!isLoading && categories.length > 0) {
      setLocalCategories([...categories]);
    }
  }, [categories, isLoading]);

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const addCategory = () => {
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    const randomIcon = iconOptions[Math.floor(Math.random() * iconOptions.length)];
    
    const newCategory: CategoryInfo = {
      id: `categoria-${Date.now()}`,
      value: 'nova-categoria',
      label: 'Nova Categoria',
      name: 'Nova Categoria',
      description: 'Descrição da nova categoria de direito',
      icon: randomIcon,
      color: randomColor,
      bannerTitle: 'Nova Categoria',
      bannerSubtitle: 'Assessoria completa e humanizada em questões jurídicas.',
      fullContent: 'Conteúdo completo da nova categoria de direito.\n\nAqui você pode descrever detalhadamente os serviços oferecidos, a experiência da equipe e como podem ajudar os clientes nesta área específica do direito.\n\nEste texto aparecerá na página principal da categoria, permitindo que os visitantes entendam melhor como o escritório pode ajudá-los em suas necessidades jurídicas específicas.'
    };
    
    setLocalCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (index: number, field: keyof CategoryInfo, value: string) => {
    const updated = [...localCategories];
    updated[index] = { ...updated[index], [field]: value };
    
    if (field === 'name' || field === 'label') {
      const slug = generateSlug(value);
      updated[index].value = slug;
      updated[index].id = slug;
      if (field === 'name') {
        updated[index].label = value;
        if (!updated[index].bannerTitle || updated[index].bannerTitle === updated[index].name) {
          updated[index].bannerTitle = value;
        }
      }
    }
    
    setLocalCategories(updated);
  };

  const removeCategory = async (index: number) => {
    const category = localCategories[index];
    
    
    try {
      await deleteCategory(category.value);
      toast.success('Categoria removida com sucesso!');
    } catch (error) {
      console.error('Erro ao remover categoria:', error);
      toast.error('Erro ao remover categoria');
    }
  };

  const handleSaveCategory = async (category: CategoryInfo) => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      await saveCategory(category);
      toast.success('Categoria salva com sucesso!');
      
      // Disparar evento para atualizar o menu
      window.dispatchEvent(new CustomEvent('categoriesUpdated', {
        detail: localCategories
      }));
      
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      toast.error('Erro ao salvar categoria');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Gerenciar Áreas do Direito ({localCategories.length})
          </CardTitle>
          <Button onClick={addCategory} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nova Área
          </Button>
        </div>
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          💡 Configure banner, título, descrição e conteúdo completo para cada categoria. Clique em "Salvar" em cada categoria para persistir as alterações.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {localCategories.map((category, index) => (
          <div 
            key={`category-${category.id}-${index}`}
            className={`p-6 rounded-lg border ${isDark ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'}`}
          >
            <div className="flex items-center justify-between mb-6">
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
                <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                  /{category.value}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleSaveCategory(category)}
                  size="sm"
                  disabled={isSaving}
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => removeCategory(index)}
                  size="sm"
                  variant="destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div>
                <h5 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                  📋 Informações Básicas
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nome da Área</Label>
                    <Input
                      value={category.name}
                      onChange={(e) => updateCategory(index, 'name', e.target.value)}
                      placeholder="Ex: Direito de Família"
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Slug/URL (Gerado automaticamente)</Label>
                    <Input
                      value={category.value}
                      onChange={(e) => updateCategory(index, 'value', e.target.value)}
                      placeholder="Ex: familia"
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Descrição Curta (Para cards e menu)</Label>
                    <Textarea
                      value={category.description || ''}
                      onChange={(e) => updateCategory(index, 'description', e.target.value)}
                      placeholder="Ex: Proteção e orientação em questões familiares"
                      rows={2}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                </div>
              </div>

              {/* Banner da Página */}
              <div>
                <h5 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                  🖼️ Banner da Página
                </h5>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label>Título do Banner</Label>
                    <Input
                      value={category.bannerTitle || category.name}
                      onChange={(e) => updateCategory(index, 'bannerTitle', e.target.value)}
                      placeholder="Ex: Direito de Família"
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Subtítulo do Banner</Label>
                    <Textarea
                      value={category.bannerSubtitle || ''}
                      onChange={(e) => updateCategory(index, 'bannerSubtitle', e.target.value)}
                      placeholder="Ex: Assessoria completa e humanizada em todas as questões que envolvem as relações familiares."
                      rows={2}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                </div>
              </div>

              {/* Conteúdo da Página */}
              <div>
                <h5 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                  📝 Conteúdo Completo da Página
                </h5>
                <div>
                  <Label>Texto Completo</Label>
                  <Textarea
                    value={category.fullContent || ''}
                    onChange={(e) => updateCategory(index, 'fullContent', e.target.value)}
                    placeholder="Escreva o conteúdo completo da página aqui. Use duas quebras de linha para separar parágrafos..."
                    rows={8}
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  />
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Este texto aparecerá na seção principal da página da categoria. Use duas quebras de linha para separar parágrafos.
                  </p>
                </div>
              </div>

              {/* Aparência */}
              <div>
                <h5 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                  🎨 Aparência
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          </div>
        ))}
        
        {localCategories.length === 0 && (
          <div className="text-center py-8">
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Nenhuma área do direito criada ainda.
            </p>
            <Button onClick={addCategory} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeira Categoria
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
