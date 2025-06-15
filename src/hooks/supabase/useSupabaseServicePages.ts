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
  const [adminSettingsId, setAdminSettingsId] = useState<string | null>(null);

  // Função para garantir que toda ServicePage tenha todos os campos
  const sanitizeServicePages = (pages: unknown): ServicePage[] => {
    if (!Array.isArray(pages)) return [];
    return pages
      .filter(page => page && typeof page === 'object')
      .map((page: any, idx) => ({
        id: page.id || `no-id-${idx}`,
        title: page.title || '',
        description: page.description || '',
        category: page.category || '',
        href: page.href || '',
        benefits: Array.isArray(page.benefits) ? page.benefits : [],
        process: Array.isArray(page.process) ? page.process : [],
        faq: Array.isArray(page.faq) ? page.faq : [],
        testimonials: Array.isArray(page.testimonials) ? page.testimonials : [],
        ...page
      }));
  };

  // Carrega APENAS o primeiro registro de admin_settings (fonte única)
  const loadServicePages = async () => {
    console.log('🔄 [Supabase] Carregando páginas de serviço...');
    setIsLoading(true);
    try {
      const { data: rows, error } = await supabase
        .from('admin_settings')
        .select('id,service_pages')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.warn('❌ Erro carregando admin_settings:', error);
      }

      let finalPages: ServicePage[] = [];
      let recordId = null;

      if (rows) {
        recordId = rows.id;
        if (rows.service_pages && Array.isArray(rows.service_pages)) {
          finalPages = sanitizeServicePages(rows.service_pages);
        }
      }

      setAdminSettingsId(recordId);
      setServicePages([...finalPages]);
    } catch (error) {
      console.error('❌ Erro ao carregar páginas:', error);
      setServicePages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveServicePages = async (pages: ServicePage[]) => {
    const cleanPages = sanitizeServicePages(pages);
    console.log('💾 Salvando páginas (validadas e limpas) no Supabase:', cleanPages.length, { adminSettingsId });
    try {
      let upsertObj: any;
      if (adminSettingsId) {
        upsertObj = {
          id: adminSettingsId,
          service_pages: cleanPages
        };
      } else {
        upsertObj = {
          service_pages: cleanPages
        };
      }
      const { error, data } = await supabase
        .from('admin_settings')
        .upsert(upsertObj, { onConflict: 'id' })
        .select()
        .maybeSingle();

      if (error) {
        console.error('❌ Erro ao salvar no Supabase:', error);
        throw error;
      }

      // Atualiza id se não tinha antes (primeiro insert)
      if (!adminSettingsId && data?.id) setAdminSettingsId(data.id);

      setServicePages([...cleanPages]);

      // Atualiza globalmente
      window.dispatchEvent(new CustomEvent('servicePagesUpdated', { 
        detail: { pages: [...cleanPages] } 
      }));
      window.dispatchEvent(new CustomEvent('refreshSupabaseData'));
    } catch (error) {
      console.error('❌ Erro crítico ao salvar service pages:', error);
      throw error;
    }
  };

  // Sempre observa eventos de recarregamento
  useEffect(() => {
    const handleRefresh = () => {
      console.log('🔄 Evento de refresh detectado');
      loadServicePages();
    };

    window.addEventListener('refreshSupabaseData', handleRefresh);
    return () => window.removeEventListener('refreshSupabaseData', handleRefresh);
  }, []);

  // Carrega tudo inicialmente
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
