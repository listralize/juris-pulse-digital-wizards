
import { useState, useEffect } from 'react';
import { ServicePage, CategoryInfo } from '../../types/adminTypes';
import { supabase } from '../../integrations/supabase/client';
import { createFamiliaServicePages } from './servicePagesData/familiaServicePages';
import { createTributarioServicePages } from './servicePagesData/tributarioServicePages';
import { createEmpresarialServicePages } from './servicePagesData/empresarialServicePages';
import { createTrabalhoServicePages } from './servicePagesData/trabalhoServicePages';
import { createCivilServicePages } from './servicePagesData/civilServicePages';
import { createPrevidenciarioServicePages } from './servicePagesData/previdenciarioServicePages';
import { createConsumidorServicePages } from './servicePagesData/consumidorServicePages';
import { createConstitucionalServicePages } from './servicePagesData/constitucionalServicePages';
import { createAdministrativoServicePages } from './servicePagesData/administrativoServicePages';

const STORAGE_KEY = 'lovable_service_pages';

const categories: CategoryInfo[] = [
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

export const useSupabaseServicePages = () => {
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getDefaultPages = (): ServicePage[] => {
    console.log('📦 Gerando páginas padrão...');
    
    const defaultPages = [
      ...createFamiliaServicePages().map(page => ({ ...page, category: 'familia' })),
      ...createTributarioServicePages().map(page => ({ ...page, category: 'tributario' })),
      ...createEmpresarialServicePages().map(page => ({ ...page, category: 'empresarial' })),
      ...createTrabalhoServicePages().map(page => ({ ...page, category: 'trabalho' })),
      ...createCivilServicePages().map(page => ({ ...page, category: 'civil' })),
      ...createPrevidenciarioServicePages().map(page => ({ ...page, category: 'previdenciario' })),
      ...createConsumidorServicePages().map(page => ({ ...page, category: 'consumidor' })),
      ...createConstitucionalServicePages().map(page => ({ ...page, category: 'constitucional' })),
      ...createAdministrativoServicePages().map(page => ({ ...page, category: 'administrativo' }))
    ];
    
    console.log('✅ Páginas padrão geradas:', defaultPages.length);
    return defaultPages;
  };

  const loadServicePages = async () => {
    console.log('🔄 Carregando páginas de serviço do Supabase...');
    setIsLoading(true);
    
    try {
      // Primeiro tentar carregar do Supabase
      const { data: supabaseData, error } = await supabase
        .from('admin_settings')
        .select('service_pages')
        .single();

      if (error) {
        console.log('ℹ️ Nenhum dado no Supabase ainda, usando dados padrão');
      }

      let finalPages: ServicePage[] = [];

      if (supabaseData?.service_pages && Array.isArray(supabaseData.service_pages)) {
        console.log('📊 Páginas carregadas do Supabase:', supabaseData.service_pages.length);
        // Converter de Json para ServicePage[]
        finalPages = supabaseData.service_pages as ServicePage[];
      } else {
        // Se não há dados no Supabase, verificar localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const parsedPages = JSON.parse(stored);
            if (Array.isArray(parsedPages) && parsedPages.length > 0) {
              console.log('📋 Páginas carregadas do localStorage:', parsedPages.length);
              finalPages = parsedPages;
            }
          } catch (error) {
            console.error('❌ Erro ao parsear localStorage:', error);
          }
        }

        // Se ainda não temos dados, usar páginas padrão
        if (finalPages.length === 0) {
          finalPages = getDefaultPages();
          console.log('✅ Usando páginas padrão:', finalPages.length);
        }
      }

      setServicePages(finalPages);
      
      // Salvar no localStorage como cache
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalPages));
      
    } catch (error) {
      console.error('❌ Erro ao carregar páginas do Supabase:', error);
      // Fallback para páginas padrão
      const fallbackPages = getDefaultPages();
      setServicePages(fallbackPages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackPages));
    } finally {
      setIsLoading(false);
    }
  };

  const saveServicePages = async (pages: ServicePage[]) => {
    console.log('💾 Salvando páginas no Supabase:', pages.length);
    
    try {
      // Converter ServicePage[] para Json antes de salvar
      const pagesAsJson = JSON.parse(JSON.stringify(pages));
      
      // Salvar no Supabase
      const { error } = await supabase
        .from('admin_settings')
        .upsert({ 
          service_pages: pagesAsJson 
        });

      if (error) {
        console.error('❌ Erro ao salvar no Supabase:', error);
        throw error;
      }

      console.log('✅ Páginas salvas no Supabase com sucesso');
      
      // Salvar no localStorage como cache
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
      
      // Atualizar estado local
      setServicePages([...pages]);
      
      // Disparar evento para notificar outros componentes
      window.dispatchEvent(new CustomEvent('servicePagesUpdated', { 
        detail: { pages: [...pages] } 
      }));
      
    } catch (error) {
      console.error('❌ Erro ao salvar páginas:', error);
      throw error;
    }
  };

  // Escutar eventos de refresh
  useEffect(() => {
    const handleRefresh = () => {
      console.log('🔄 Evento de refresh detectado');
      loadServicePages();
    };

    window.addEventListener('refreshSupabaseData', handleRefresh);
    return () => window.removeEventListener('refreshSupabaseData', handleRefresh);
  }, []);

  useEffect(() => {
    loadServicePages();
  }, []);

  return {
    servicePages,
    categories,
    isLoading,
    loadServicePages,
    saveServicePages,
    setServicePages,
    refetch: loadServicePages
  };
};
