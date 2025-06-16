
import { useState, useEffect } from 'react';
import { CategoryInfo } from '../../types/adminTypes';
import { supabase } from '../../integrations/supabase/client';

export const useSupabaseLawCategories = () => {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCategories = async () => {
    console.log('🔄 [useSupabaseLawCategories] Carregando categorias do Supabase...');
    setIsLoading(true);
    
    try {
      const { data: dbCategories, error } = await supabase
        .from('law_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        console.error('❌ Erro ao carregar categorias:', error);
        setCategories([]);
        setIsLoading(false);
        return;
      }

      const formattedCategories: CategoryInfo[] = (dbCategories || []).map(cat => ({
        id: cat.category_key,
        value: cat.category_key,
        label: cat.title_override || cat.name,
        name: cat.name,
        description: cat.description_override || cat.description || '',
        icon: cat.icon || '⚖️',
        color: cat.color || '#6B7280',
        bannerTitle: cat.banner_title || cat.title_override || cat.name,
        bannerSubtitle: cat.banner_subtitle || '',
        fullContent: cat.full_content || ''
      }));

      console.log('✅ [useSupabaseLawCategories] Categorias carregadas:', formattedCategories.length);
      setCategories(formattedCategories);
      
      // Disparar evento para atualizar componentes
      window.dispatchEvent(new CustomEvent('categoriesUpdated', {
        detail: formattedCategories
      }));
      
    } catch (error) {
      console.error('❌ Erro crítico ao carregar categorias:', error);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCategory = async (category: CategoryInfo) => {
    console.log('💾 [useSupabaseLawCategories] Salvando categoria:', category);
    
    try {
      const categoryData = {
        category_key: category.value,
        name: category.name,
        description: category.description,
        icon: category.icon,
        color: category.color,
        title_override: category.label !== category.name ? category.label : null,
        description_override: null,
        banner_title: category.bannerTitle || category.name,
        banner_subtitle: category.bannerSubtitle || '',
        full_content: category.fullContent || '',
        is_active: true,
        display_order: 0
      };

      const { error } = await supabase
        .from('law_categories')
        .upsert(categoryData, { onConflict: 'category_key' });

      if (error) {
        console.error('❌ Erro ao salvar categoria:', error);
        throw error;
      }

      console.log('✅ Categoria salva com sucesso');
      await loadCategories(); // Recarregar para atualizar a lista
      
      return category;
    } catch (error) {
      console.error('❌ Erro crítico ao salvar categoria:', error);
      throw error;
    }
  };

  const deleteCategory = async (categoryKey: string) => {
    console.log('🗑️ [useSupabaseLawCategories] Removendo categoria:', categoryKey);
    
    try {
      const { error } = await supabase
        .from('law_categories')
        .update({ is_active: false })
        .eq('category_key', categoryKey);

      if (error) {
        console.error('❌ Erro ao remover categoria:', error);
        throw error;
      }

      console.log('✅ Categoria removida com sucesso');
      await loadCategories(); // Recarregar para atualizar a lista
      
    } catch (error) {
      console.error('❌ Erro crítico ao remover categoria:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    isLoading,
    loadCategories,
    saveCategory,
    deleteCategory,
    setCategories,
    refetch: loadCategories
  };
};
