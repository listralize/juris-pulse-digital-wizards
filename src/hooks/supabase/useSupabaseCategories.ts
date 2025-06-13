
import { useState } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { CategoryInfo } from '../../types/adminTypes';

export const useSupabaseCategories = () => {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);

  const loadCategories = async () => {
    try {
      console.log('📂 CARREGANDO CATEGORIAS...');
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('law_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      console.log('📂 Categorias carregadas:', categoriesData);

      if (categoriesError) throw categoriesError;

      if (categoriesData && categoriesData.length > 0) {
        const formattedCategories: CategoryInfo[] = categoriesData.map(cat => ({
          id: cat.id,
          value: cat.category_key,
          label: cat.name,
          name: cat.name,
          description: cat.description || '',
          icon: cat.icon || 'FileText',
          color: cat.color || 'bg-gray-500'
        }));
        
        setCategories(formattedCategories);
        console.log('✅ Categorias formatadas:', formattedCategories);
      } else {
        console.log('⚠️ Criando categorias padrão...');
        await createDefaultCategories();
      }
    } catch (error) {
      console.error('❌ Erro ao carregar categorias:', error);
      await createDefaultCategories();
    }
  };

  const createDefaultCategories = async () => {
    const defaultCategories = [
      {
        category_key: 'familia',
        name: 'Direito de Família',
        description: 'Proteção e orientação em questões familiares',
        icon: 'Heart',
        color: 'bg-rose-500',
        display_order: 0,
        is_active: true
      },
      {
        category_key: 'tributario',
        name: 'Direito Tributário',
        description: 'Consultoria e planejamento tributário',
        icon: 'Calculator',
        color: 'bg-blue-500',
        display_order: 1,
        is_active: true
      },
      {
        category_key: 'empresarial',
        name: 'Direito Empresarial',
        description: 'Suporte jurídico para empresas',
        icon: 'Building2',
        color: 'bg-green-500',
        display_order: 2,
        is_active: true
      }
    ];

    try {
      const { error } = await supabase
        .from('law_categories')
        .insert(defaultCategories);

      if (!error) {
        await loadCategories();
      }
    } catch (error) {
      console.error('Erro ao criar categorias padrão:', error);
    }
  };

  const saveCategories = async (cats: CategoryInfo[]) => {
    try {
      console.log('💾 SALVANDO CATEGORIAS:', cats);
      
      if (!cats || cats.length === 0) return;

      for (const cat of cats) {
        const categoryData = {
          id: cat.id.startsWith('categoria-') ? crypto.randomUUID() : cat.id,
          category_key: cat.value,
          name: cat.name || cat.label,
          description: cat.description || '',
          icon: cat.icon || 'FileText',
          color: cat.color || 'bg-gray-500',
          display_order: 0,
          is_active: true
        };

        const { error } = await supabase
          .from('law_categories')
          .upsert(categoryData, { onConflict: 'id' });

        if (error) {
          console.error('❌ Erro ao salvar categoria:', error);
        } else {
          console.log('✅ Categoria salva:', categoryData.name);
        }
      }

      await loadCategories();
      return categories;
    } catch (error) {
      console.error('💥 ERRO ao salvar categorias:', error);
      throw error;
    }
  };

  return {
    categories,
    loadCategories,
    saveCategories,
    setCategories
  };
};
