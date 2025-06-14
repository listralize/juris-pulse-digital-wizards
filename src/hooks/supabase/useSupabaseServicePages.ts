
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
    try {
      console.log('📦 Gerando páginas padrão...');
      const defaultPages = [
        ...createFamiliaServicePages(),
        ...createTributarioServicePages(),
        ...createEmpresarialServicePages(),
        ...createTrabalhoServicePages(),
        ...createCivilServicePages(),
        ...createPrevidenciarioServicePages(),
        ...createConsumidorServicePages(),
        ...createConstitucionalServicePages(),
        ...createAdministrativoServicePages()
      ];
      console.log('✅ Páginas padrão geradas:', defaultPages.length);
      return defaultPages;
    } catch (error) {
      console.error('❌ Erro ao gerar páginas padrão:', error);
      return [];
    }
  };

  const loadServicePages = async () => {
    console.log('🔄 Iniciando carregamento de páginas...');
    setIsLoading(true);
    
    // SEMPRE inicializar com dados padrão primeiro
    const defaultPages = getDefaultPages();
    setServicePages(defaultPages);
    console.log('✅ Páginas padrão carregadas primeiro:', defaultPages.length);
    
    try {
      // Tentar carregar do Supabase em segundo plano
      const { data: supabasePages, error } = await supabase
        .from('service_pages')
        .select(`
          *,
          service_benefits(*),
          service_process_steps(*),
          service_faq(*),
          service_testimonials(*)
        `)
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        console.error('❌ Erro ao carregar do Supabase (mantendo dados padrão):', error);
        setIsLoading(false);
        return;
      }

      // Se há dados no Supabase, substituir pelos dados do Supabase
      if (supabasePages && supabasePages.length > 0) {
        console.log('✅ Páginas encontradas no Supabase:', supabasePages.length);
        
        const convertedPages: ServicePage[] = supabasePages.map(page => ({
          id: page.id,
          title: page.title,
          description: page.description || '',
          category: page.category_id || '',
          href: page.href || '',
          benefits: (page.service_benefits || []).map((b: any) => ({
            title: b.title,
            description: b.description || '',
            icon: b.icon || ''
          })),
          process: (page.service_process_steps || []).map((p: any) => ({
            step: p.step_number,
            title: p.title,
            description: p.description || ''
          })),
          faq: (page.service_faq || []).map((f: any) => ({
            question: f.question,
            answer: f.answer
          })),
          testimonials: (page.service_testimonials || []).map((t: any) => ({
            name: t.name,
            text: t.text,
            image: t.image
          }))
        }));

        setServicePages(convertedPages);
        console.log('✅ Páginas do Supabase aplicadas');
      } else {
        console.log('📦 Nenhuma página no Supabase, mantendo páginas padrão');
      }
      
    } catch (error) {
      console.error('❌ Erro ao carregar do Supabase (mantendo dados padrão):', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveServicePages = async (pages: ServicePage[]) => {
    console.log('💾 Salvando', pages.length, 'páginas no Supabase...');
    
    try {
      // Salvar cada página
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        console.log('💾 Salvando página:', page.title);
        
        const { data: upsertedPage, error: pageError } = await supabase
          .from('service_pages')
          .upsert({
            id: page.id,
            title: page.title,
            description: page.description,
            category_id: page.category,
            href: page.href,
            display_order: i,
            is_active: true
          })
          .select()
          .single();

        if (pageError) {
          console.error('❌ Erro ao salvar página:', page.title, pageError);
          continue;
        }

        const pageId = upsertedPage.id;

        // Limpar dados relacionados existentes
        await Promise.all([
          supabase.from('service_benefits').delete().eq('service_page_id', pageId),
          supabase.from('service_process_steps').delete().eq('service_page_id', pageId),
          supabase.from('service_faq').delete().eq('service_page_id', pageId),
          supabase.from('service_testimonials').delete().eq('service_page_id', pageId)
        ]);

        // Inserir novos dados relacionados
        if (page.benefits?.length) {
          const { error: benefitsError } = await supabase.from('service_benefits').insert(
            page.benefits.map((benefit, index) => ({
              service_page_id: pageId,
              title: benefit.title,
              description: benefit.description,
              icon: benefit.icon,
              display_order: index
            }))
          );
          if (benefitsError) console.error('❌ Erro ao salvar benefícios:', benefitsError);
        }

        if (page.process?.length) {
          const { error: processError } = await supabase.from('service_process_steps').insert(
            page.process.map((step, index) => ({
              service_page_id: pageId,
              step_number: step.step,
              title: step.title,
              description: step.description,
              display_order: index
            }))
          );
          if (processError) console.error('❌ Erro ao salvar processo:', processError);
        }

        if (page.faq?.length) {
          const { error: faqError } = await supabase.from('service_faq').insert(
            page.faq.map((faq, index) => ({
              service_page_id: pageId,
              question: faq.question,
              answer: faq.answer,
              display_order: index
            }))
          );
          if (faqError) console.error('❌ Erro ao salvar FAQ:', faqError);
        }

        if (page.testimonials?.length) {
          const { error: testimonialsError } = await supabase.from('service_testimonials').insert(
            page.testimonials.map((testimonial, index) => ({
              service_page_id: pageId,
              name: testimonial.name,
              text: testimonial.text,
              image: testimonial.image,
              display_order: index
            }))
          );
          if (testimonialsError) console.error('❌ Erro ao salvar depoimentos:', testimonialsError);
        }
      }

      console.log('✅ Todas as páginas foram salvas!');
      // Recarregar dados após salvar
      await loadServicePages();
      
    } catch (error) {
      console.error('❌ Erro geral ao salvar páginas:', error);
      throw error;
    }
  };

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
