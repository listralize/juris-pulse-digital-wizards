
import { useState } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { CategoryInfo } from '../../types/adminTypes';

export const useSupabaseCategories = () => {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);

  const generateValidUUID = () => {
    return crypto.randomUUID();
  };

  const loadCategories = async () => {
    try {
      console.log('📂 CARREGANDO CATEGORIAS DO SUPABASE...');
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('law_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      console.log('📂 RESULTADO QUERY CATEGORIAS:');
      console.log('  - Dados:', categoriesData);
      console.log('  - Erro:', categoriesError);
      console.log('  - Quantidade:', categoriesData?.length || 0);

      if (categoriesData && categoriesData.length > 0) {
        console.log('📂 PROCESSANDO CATEGORIAS...');
        const formattedCategories: CategoryInfo[] = categoriesData.map(cat => {
          const categoryName = cat.name || cat.category_key || 'Categoria';
          const categoryKey = cat.category_key || cat.name?.toLowerCase().replace(/\s+/g, '-') || 'categoria';
          
          const processed = {
            id: cat.id,
            value: categoryKey,
            label: categoryName,
            name: categoryName,
            description: cat.description || '',
            icon: cat.icon || 'FileText',
            color: cat.color || 'bg-gray-500'
          };
          
          console.log(`📂 Categoria processada: ${categoryName} (${categoryKey}) -> ID: ${cat.id}`);
          return processed;
        });
        
        setCategories(formattedCategories);
        console.log('✅ CATEGORIAS SETADAS NO STATE:', formattedCategories.length);
        console.log('✅ Categorias:', formattedCategories);
      } else {
        console.log('⚠️ NENHUMA CATEGORIA ENCONTRADA - CRIANDO CATEGORIAS PADRÃO');
        await createDefaultCategories();
      }
    } catch (error) {
      console.error('💥 ERRO AO CARREGAR CATEGORIAS:', error);
      await createDefaultCategories();
    }
  };

  const createDefaultCategories = async () => {
    const defaultCategories = [
      {
        id: generateValidUUID(),
        category_key: 'familia',
        name: 'Direito de Família',
        description: 'Proteção e orientação em questões familiares',
        icon: 'Heart',
        color: 'bg-rose-500',
        display_order: 0,
        is_active: true
      },
      {
        id: generateValidUUID(),
        category_key: 'tributario',
        name: 'Direito Tributário',
        description: 'Consultoria e planejamento tributário',
        icon: 'Calculator',
        color: 'bg-blue-500',
        display_order: 1,
        is_active: true
      },
      {
        id: generateValidUUID(),
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
      // Usar categorias em memória como fallback
      const fallbackCategories = defaultCategories.map(cat => ({
        id: cat.id,
        value: cat.category_key,
        label: cat.name,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        color: cat.color
      }));
      setCategories(fallbackCategories);
    }
  };

  const saveCategories = async (cats: CategoryInfo[]) => {
    try {
      console.log('💾 SALVANDO CATEGORIAS:', cats.length);
      
      if (!cats || cats.length === 0) {
        console.log('⚠️ Nenhuma categoria para salvar');
        return;
      }

      const categoryData = cats.map((cat, index) => {
        let validId = cat.id;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(cat.id)) {
          validId = generateValidUUID();
        }
        
        return {
          id: validId,
          category_key: cat.value || cat.name?.toLowerCase().replace(/\s+/g, '-') || `categoria-${index + 1}`,
          name: cat.name || cat.label || cat.value || `Categoria ${index + 1}`,
          description: cat.description || `Descrição da ${cat.name || cat.label}`,
          icon: cat.icon || 'FileText',
          color: cat.color || 'bg-gray-500',
          display_order: index,
          is_active: true
        };
      });

      // Usar UPSERT para inserir ou atualizar
      const { error } = await supabase
        .from('law_categories')
        .upsert(categoryData, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('❌ Erro ao salvar categorias:', error);
        throw error;
      }

      console.log('✅ CATEGORIAS SALVAS NO SUPABASE');
      await loadCategories();
      
      return categories;
    } catch (error) {
      console.error('💥 ERRO CRÍTICO AO SALVAR CATEGORIAS:', error);
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
