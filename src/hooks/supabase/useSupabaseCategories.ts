
import { useState } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { CategoryInfo } from '../../types/adminTypes';

export const useSupabaseCategories = () => {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);

  const generateValidUUID = () => {
    return crypto.randomUUID();
  };

  const isValidUUID = (str: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  };

  const ensureValidUUID = (id: string) => {
    if (!id || !isValidUUID(id)) {
      return generateValidUUID();
    }
    return id;
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
        console.log('⚠️ NENHUMA CATEGORIA ENCONTRADA - SETANDO ARRAY VAZIO');
        setCategories([]);
      }
    } catch (error) {
      console.error('💥 ERRO AO CARREGAR CATEGORIAS:', error);
      setCategories([]);
    }
  };

  const saveCategories = async (cats: CategoryInfo[]) => {
    try {
      console.log('💾 🔥 SALVANDO CATEGORIAS - VERSÃO ROBUSTA');
      console.log('📂 Categorias recebidas:', cats.length);
      console.log('📂 Dados das categorias:', cats);
      
      // 1. DELETAR TODAS CATEGORIAS EXISTENTES
      console.log('🗑️ Deletando todas as categorias existentes...');
      const { error: deleteError } = await supabase
        .from('law_categories')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (deleteError) {
        console.error('❌ Erro ao deletar categorias:', deleteError);
        throw deleteError;
      }
      console.log('✅ Categorias existentes deletadas');

      // 2. VALIDAR E PROCESSAR DADOS
      if (!cats || cats.length === 0) {
        console.log('⚠️ Nenhuma categoria para salvar');
        setCategories([]);
        return;
      }

      const categoryData = cats.map((cat, index) => {
        const validId = ensureValidUUID(cat.id || '');
        
        let categoryName = cat.name || cat.label || cat.value || `Categoria ${index + 1}`;
        let categoryKey = cat.value || cat.name?.toLowerCase().replace(/\s+/g, '-') || `categoria-${index + 1}`;
        
        console.log(`📂 Processando categoria ${index + 1}: "${categoryName}" (${categoryKey})`);
        
        return {
          id: validId,
          category_key: categoryKey,
          name: categoryName,
          description: cat.description || `Descrição da ${categoryName}`,
          icon: cat.icon || 'FileText',
          color: cat.color || 'bg-gray-500',
          display_order: index,
          is_active: true,
          updated_at: new Date().toISOString()
        };
      });

      console.log('📋 Dados finais das categorias:', categoryData);

      // 3. INSERIR CATEGORIAS NO SUPABASE
      console.log('📥 Inserindo categorias no Supabase...');
      const { data: insertedData, error: insertError } = await supabase
        .from('law_categories')
        .insert(categoryData)
        .select();

      if (insertError) {
        console.error('❌ Erro ao inserir categorias:', insertError);
        throw insertError;
      }

      console.log('✅ Categorias inseridas no Supabase:', insertedData?.length);

      // 4. ATUALIZAR STATE LOCAL
      const updatedCategories = categoryData.map(cat => ({
        id: cat.id,
        value: cat.category_key,
        label: cat.name,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        color: cat.color
      }));
      
      setCategories(updatedCategories);
      console.log('🎉 CATEGORIAS SALVAS E STATE ATUALIZADO:', updatedCategories.length);
      
      return updatedCategories;
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
