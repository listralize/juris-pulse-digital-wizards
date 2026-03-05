
import { useState, useEffect } from 'react';
import { CategoryInfo } from '../../types/adminTypes';
import { supabase } from '../../integrations/supabase/client';
import { logger } from '../../utils/logger';

const defaultCategories: CategoryInfo[] = [
  { 
    id: 'familia',
    name: 'Direito de Família',
    label: 'Direito de Família', 
    value: 'familia',
    description: 'Proteção e orientação em questões familiares',
    icon: '👨‍👩‍👧‍👦',
    color: '#E11D48'
  },
  { 
    id: 'tributario',
    name: 'Direito Tributário',
    label: 'Direito Tributário', 
    value: 'tributario',
    description: 'Planejamento e consultoria tributária',
    icon: '💰',
    color: '#059669'
  },
  { 
    id: 'empresarial',
    name: 'Direito Empresarial',
    label: 'Direito Empresarial', 
    value: 'empresarial',
    description: 'Assessoria para empresas',
    icon: '🏢',
    color: '#0EA5E9'
  },
  { 
    id: 'trabalho',
    name: 'Direito do Trabalho',
    label: 'Direito do Trabalho', 
    value: 'trabalho',
    description: 'Relações trabalhistas',
    icon: '👷',
    color: '#DC2626'
  },
  { 
    id: 'civil',
    name: 'Direito Civil',
    label: 'Direito Civil', 
    value: 'civil',
    description: 'Questões civis diversas',
    icon: '📄',
    color: '#7C3AED'
  },
  { 
    id: 'previdenciario',
    name: 'Direito Previdenciário',
    label: 'Direito Previdenciário', 
    value: 'previdenciario',
    description: 'Benefícios previdenciários',
    icon: '👴',
    color: '#EA580C'
  },
  { 
    id: 'consumidor',
    name: 'Direito do Consumidor',
    label: 'Direito do Consumidor', 
    value: 'consumidor',
    description: 'Proteção do consumidor',
    icon: '🛡️',
    color: '#10B981'
  },
  { 
    id: 'constitucional',
    name: 'Direito Constitucional',
    label: 'Direito Constitucional', 
    value: 'constitucional',
    description: 'Direitos fundamentais',
    icon: '⚖️',
    color: '#F59E0B'
  },
  { 
    id: 'administrativo',
    name: 'Direito Administrativo',
    label: 'Direito Administrativo', 
    value: 'administrativo',
    description: 'Questões administrativas',
    icon: '🏛️',
    color: '#8B5CF6'
  }
];

const validateCategories = (data: unknown): CategoryInfo[] => {
  if (!Array.isArray(data)) return defaultCategories;
  
  return data.filter((item): item is CategoryInfo => {
    return typeof item === 'object' && 
           item !== null && 
           typeof (item as any).id === 'string' &&
           typeof (item as any).name === 'string';
  });
};

export const useSupabaseCategories = (enabled = true) => {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adminSettingsId, setAdminSettingsId] = useState<string | null>(null);

  const loadCategories = async () => {
    setIsLoading(true);
    
    try {
      const { data: rows, error } = await supabase
        .from('admin_settings')
        .select('id,categories')
        .limit(1)
        .maybeSingle();

      if (error) {
        logger.warn('Erro carregando categorias:', error);
      }

      let finalCategories = [...defaultCategories];
      let recordId = null;

      if (rows) {
        recordId = rows.id;
        if (rows.categories) {
          const validatedCategories = validateCategories(rows.categories);
          if (validatedCategories.length > 0) {
            finalCategories = validatedCategories;
          }
        }
      }
      
      setAdminSettingsId(recordId);
      setCategories([...finalCategories]);
      
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      setCategories([...defaultCategories]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCategories = async (cats: CategoryInfo[]) => {
    try {
      const upsertData: any = {
        categories: cats as any
      };

      if (adminSettingsId) {
        upsertData.id = adminSettingsId;
      }

      const { error, data } = await supabase
        .from('admin_settings')
        .upsert(upsertData, { 
          onConflict: adminSettingsId ? 'id' : undefined 
        })
        .select()
        .single();

      if (error) {
        console.error('Erro ao salvar categorias no Supabase:', error);
        throw error;
      }

      if (data?.id && !adminSettingsId) {
        setAdminSettingsId(data.id);
      }
      
      setCategories([...cats]);
      return cats;

    } catch (error) {
      console.error('Erro crítico ao salvar categorias:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (enabled) loadCategories();
  }, [enabled]);

  return {
    categories,
    isLoading,
    loadCategories,
    saveCategories,
    setCategories,
    refetch: loadCategories
  };
};
