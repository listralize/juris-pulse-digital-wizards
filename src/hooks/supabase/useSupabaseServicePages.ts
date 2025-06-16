
import { useState, useEffect } from 'react';
import { ServicePage, CategoryInfo } from '../../types/adminTypes';
import { supabase } from '../../integrations/supabase/client';

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

  const loadServicePages = async () => {
    console.log('🔄 [useSupabaseServicePages] Carregando páginas do Supabase...');
    setIsLoading(true);
    
    try {
      // Tentar carregar das tabelas normalizadas primeiro
      const { data: normalizedPages, error: normalizedError } = await supabase
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

      if (!normalizedError && normalizedPages && normalizedPages.length > 0) {
        console.log('✅ [useSupabaseServicePages] Encontradas páginas nas tabelas normalizadas:', normalizedPages.length);
        
        const formattedPages: ServicePage[] = normalizedPages.map(page => ({
          id: page.id,
          title: page.title,
          description: page.description || '',
          category: page.category_id || '',
          href: page.href || '',
          benefits: (page.service_benefits || []).map((b: any) => ({
            title: b.title,
            description: b.description || '',
            icon: b.icon || '⚖️'
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
            role: t.role || '',
            image: t.image || ''
          }))
        }));

        setServicePages(formattedPages);
        console.log('📄 URLs das páginas normalizadas:', formattedPages.map(p => ({ 
          title: p.title, 
          href: p.href,
          fullURL: p.href ? `/services/${p.href.replace(/^\/?(services?\/)?/, '')}` : 'sem-href'
        })));
        
        window.dispatchEvent(new CustomEvent('servicePagesLoaded', { 
          detail: { pages: formattedPages } 
        }));
        
        setIsLoading(false);
        return;
      }

      // Fallback para admin_settings (dados antigos)
      console.log('📄 Tentando carregar de admin_settings como fallback...');
      const { data: adminData, error: adminError } = await supabase
        .from('admin_settings')
        .select('service_pages')
        .limit(1)
        .maybeSingle();

      let finalPages: ServicePage[] = [];

      if (!adminError && adminData?.service_pages && Array.isArray(adminData.service_pages)) {
        finalPages = sanitizeServicePages(adminData.service_pages);
        console.log('✅ [useSupabaseServicePages] Páginas carregadas de admin_settings:', finalPages.length);
      } else {
        console.log('ℹ️ [useSupabaseServicePages] Nenhuma página encontrada, iniciando vazio');
      }
      
      setServicePages([...finalPages]);
      
      console.log('📄 URLs das páginas:', finalPages.map(p => ({ 
        title: p.title, 
        href: p.href,
        fullURL: p.href ? `/services/${p.href.replace(/^\/?(services?\/)?/, '')}` : 'sem-href'
      })));
      
      window.dispatchEvent(new CustomEvent('servicePagesLoaded', { 
        detail: { pages: finalPages } 
      }));
      
    } catch (error) {
      console.error('❌ Erro ao carregar páginas:', error);
      setServicePages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveServicePages = async (pages: ServicePage[]) => {
    const cleanPages = sanitizeServicePages(pages);
    console.log('💾 [useSupabaseServicePages] Salvando', cleanPages.length, 'páginas no Supabase...');
    console.log('📝 URLs a salvar:', cleanPages.map(p => ({ 
      title: p.title, 
      href: p.href,
      fullURL: p.href ? `/services/${p.href.replace(/^\/?(services?\/)?/, '')}` : 'sem-href'
    })));
    
    try {
      // Salvar nas tabelas normalizadas
      console.log('💾 Salvando nas tabelas normalizadas...');
      
      // 1. Primeiro, inserir/atualizar as páginas principais
      for (const page of cleanPages) {
        console.log('💾 Processando página:', page.title, 'ID:', page.id);
        
        // Preparar dados da página principal
        const pageData = {
          id: page.id,
          title: page.title,
          description: page.description || '',
          category_id: page.category || '',
          href: page.href || '',
          is_active: true,
          display_order: 0
        };

        console.log('📝 Dados da página a salvar:', pageData);

        const { data: savedPage, error: pageError } = await supabase
          .from('service_pages')
          .upsert(pageData, { 
            onConflict: 'id'
          })
          .select()
          .single();

        if (pageError) {
          console.error('❌ Erro ao salvar página:', page.title, pageError);
          throw new Error(`Erro ao salvar página ${page.title}: ${pageError.message}`);
        }

        console.log('✅ Página salva com sucesso:', page.title);

        // 2. Limpar e inserir benefícios
        await supabase.from('service_benefits').delete().eq('service_page_id', page.id);
        if (page.benefits && page.benefits.length > 0) {
          const benefitsToInsert = page.benefits.map((benefit, index) => ({
            service_page_id: page.id,
            title: benefit.title || '',
            description: benefit.description || '',
            icon: benefit.icon || '⚖️',
            display_order: index
          }));
          
          console.log('💾 Salvando benefícios:', benefitsToInsert.length);
          const { error: benefitsError } = await supabase
            .from('service_benefits')
            .insert(benefitsToInsert);

          if (benefitsError) {
            console.error('❌ Erro ao salvar benefícios:', benefitsError);
            throw new Error(`Erro ao salvar benefícios: ${benefitsError.message}`);
          }
        }

        // 3. Limpar e inserir processos
        await supabase.from('service_process_steps').delete().eq('service_page_id', page.id);
        if (page.process && page.process.length > 0) {
          const processToInsert = page.process.map((step, index) => ({
            service_page_id: page.id,
            step_number: step.step || index + 1,
            title: step.title || '',
            description: step.description || '',
            display_order: index
          }));
          
          console.log('💾 Salvando processos:', processToInsert.length);
          const { error: processError } = await supabase
            .from('service_process_steps')
            .insert(processToInsert);

          if (processError) {
            console.error('❌ Erro ao salvar processos:', processError);
            throw new Error(`Erro ao salvar processos: ${processError.message}`);
          }
        }

        // 4. Limpar e inserir FAQ
        await supabase.from('service_faq').delete().eq('service_page_id', page.id);
        if (page.faq && page.faq.length > 0) {
          const faqToInsert = page.faq.map((faq, index) => ({
            service_page_id: page.id,
            question: faq.question || '',
            answer: faq.answer || '',
            display_order: index
          }));
          
          console.log('💾 Salvando FAQ:', faqToInsert.length);
          const { error: faqError } = await supabase
            .from('service_faq')
            .insert(faqToInsert);

          if (faqError) {
            console.error('❌ Erro ao salvar FAQ:', faqError);
            throw new Error(`Erro ao salvar FAQ: ${faqError.message}`);
          }
        }

        // 5. Limpar e inserir depoimentos
        await supabase.from('service_testimonials').delete().eq('service_page_id', page.id);
        if (page.testimonials && page.testimonials.length > 0) {
          const testimonialsToInsert = page.testimonials.map((testimonial, index) => ({
            service_page_id: page.id,
            name: testimonial.name || '',
            text: testimonial.text || '',
            role: testimonial.role || '',
            image: testimonial.image || '',
            display_order: index
          }));
          
          console.log('💾 Salvando depoimentos:', testimonialsToInsert.length);
          const { error: testimonialsError } = await supabase
            .from('service_testimonials')
            .insert(testimonialsToInsert);

          if (testimonialsError) {
            console.error('❌ Erro ao salvar depoimentos:', testimonialsError);
            throw new Error(`Erro ao salvar depoimentos: ${testimonialsError.message}`);
          }
        }

        console.log('✅ Página completa salva:', page.title);
      }

      console.log('✅ [useSupabaseServicePages] Todas as páginas salvas nas tabelas normalizadas!');

      // Também salvar no admin_settings como backup
      try {
        const { error: adminError } = await supabase
          .from('admin_settings')
          .upsert({
            service_pages: cleanPages as any
          });

        if (adminError) {
          console.warn('⚠️ Erro ao salvar backup em admin_settings:', adminError);
        } else {
          console.log('✅ Backup salvo em admin_settings');
        }
      } catch (backupError) {
        console.warn('⚠️ Erro no backup:', backupError);
      }
      
      // Atualizar estado local IMEDIATAMENTE
      setServicePages([...cleanPages]);
      
      // Disparar eventos globais
      window.dispatchEvent(new CustomEvent('servicePagesUpdated', { 
        detail: { pages: cleanPages } 
      }));
      
      window.dispatchEvent(new CustomEvent('routesNeedUpdate', { 
        detail: { pages: cleanPages } 
      }));

      console.log('🔄 Eventos de atualização disparados');

      return cleanPages;

    } catch (error) {
      console.error('❌ Erro crítico ao salvar service pages:', error);
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
