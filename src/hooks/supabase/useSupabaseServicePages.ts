
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

  const loadServicePages = async () => {
    console.log('🔄 Carregando páginas de serviço do Supabase...');
    setIsLoading(true);
    
    try {
      // Carregar páginas do Supabase
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
        console.error('❌ Erro ao carregar do Supabase:', error);
        throw error;
      }

      // Se temos páginas no Supabase, converter formato
      if (supabasePages && supabasePages.length > 0) {
        console.log('✅ Páginas carregadas do Supabase:', supabasePages.length);
        
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
        setIsLoading(false);
        return;
      }

      // Se não há dados no Supabase, carregar dados padrão
      console.log('📦 Inicializando com dados padrão...');
      const allPages: ServicePage[] = [
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

      setServicePages(allPages);
      
      // Auto-salvar no Supabase em background
      console.log('🚀 Auto-salvando páginas iniciais no Supabase...');
      setTimeout(() => {
        saveServicePages(allPages);
      }, 1000);
      
    } catch (error) {
      console.error('❌ Erro ao carregar páginas:', error);
      
      // Em caso de erro, carregar dados locais
      console.log('🔄 Carregando dados locais como fallback...');
      const allPages: ServicePage[] = [
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
      setServicePages(allPages);
    } finally {
      setIsLoading(false);
    }
  };

  const saveServicePages = async (pages: ServicePage[]) => {
    console.log('💾 Salvando', pages.length, 'páginas no Supabase...');
    
    try {
      // Salvar páginas principais
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        
        // Upsert página principal
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
          console.error('❌ Erro ao inserir página:', pageError);
          continue;
        }

        const pageId = upsertedPage.id;

        // Limpar dados relacionados antigos
        await supabase.from('service_benefits').delete().eq('service_page_id', pageId);
        await supabase.from('service_process_steps').delete().eq('service_page_id', pageId);
        await supabase.from('service_faq').delete().eq('service_page_id', pageId);
        await supabase.from('service_testimonials').delete().eq('service_page_id', pageId);

        // Inserir benefícios
        if (page.benefits && page.benefits.length > 0) {
          const benefits = page.benefits.map((benefit, index) => ({
            service_page_id: pageId,
            title: benefit.title,
            description: benefit.description,
            icon: benefit.icon,
            display_order: index
          }));

          await supabase.from('service_benefits').insert(benefits);
        }

        // Inserir etapas do processo
        if (page.process && page.process.length > 0) {
          const processSteps = page.process.map((step, index) => ({
            service_page_id: pageId,
            step_number: step.step,
            title: step.title,
            description: step.description,
            display_order: index
          }));

          await supabase.from('service_process_steps').insert(processSteps);
        }

        // Inserir FAQ
        if (page.faq && page.faq.length > 0) {
          const faqItems = page.faq.map((faq, index) => ({
            service_page_id: pageId,
            question: faq.question,
            answer: faq.answer,
            display_order: index
          }));

          await supabase.from('service_faq').insert(faqItems);
        }

        // Inserir depoimentos
        if (page.testimonials && page.testimonials.length > 0) {
          const testimonials = page.testimonials.map((testimonial, index) => ({
            service_page_id: pageId,
            name: testimonial.name,
            text: testimonial.text,
            image: testimonial.image,
            display_order: index
          }));

          await supabase.from('service_testimonials').insert(testimonials);
        }
      }

      console.log('✅ Todas as páginas foram salvas no Supabase com sucesso!');
      
      // Recarregar dados após salvar
      await loadServicePages();
      
    } catch (error) {
      console.error('❌ Erro ao salvar páginas no Supabase:', error);
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
