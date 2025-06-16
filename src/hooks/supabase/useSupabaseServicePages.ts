
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
      console.log('🔍 Verificando tabela service_pages...');
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

      console.log('📊 service_pages resultado:', { 
        data: normalizedPages, 
        error: normalizedError,
        count: normalizedPages?.length || 0 
      });

      if (!normalizedError && normalizedPages && normalizedPages.length > 0) {
        console.log('✅ [useSupabaseServicePages] Páginas encontradas nas tabelas normalizadas:', normalizedPages.length);
        
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
        console.log('📄 Páginas carregadas e formatadas:', formattedPages.length);
        
        window.dispatchEvent(new CustomEvent('servicePagesLoaded', { 
          detail: { pages: formattedPages } 
        }));
        
        setIsLoading(false);
        return;
      }

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
    console.log('💾 [useSupabaseServicePages] SALVANDO - Total:', cleanPages.length, 'páginas');
    
    try {
      // Processar todas as páginas para garantir que novos itens sejam salvos
      const savedPages: ServicePage[] = [];
      
      for (let pageIndex = 0; pageIndex < cleanPages.length; pageIndex++) {
        const page = cleanPages[pageIndex];
        console.log(`💾 [${pageIndex + 1}/${cleanPages.length}] Salvando: "${page.title}"`);
        
        try {
          // Gerar UUID se necessário
          let finalId = page.id;
          if (!page.id || !page.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            finalId = crypto.randomUUID();
            console.log(`🔄 ID convertido para UUID "${finalId}"`);
          }

          const pageData = {
            id: finalId,
            title: page.title,
            description: page.description || '',
            category_id: page.category || '',
            href: page.href || '',
            is_active: true,
            display_order: pageIndex
          };

          const { error: pageError } = await supabase
            .from('service_pages')
            .upsert(pageData, { onConflict: 'id' });

          if (pageError) {
            console.error('❌ ERRO ao salvar página:', page.title, pageError);
            continue;
          }

          console.log('✅ Página salva:', page.title);
          
          // Limpar dados relacionados ANTES de inserir novos
          await Promise.all([
            supabase.from('service_benefits').delete().eq('service_page_id', finalId),
            supabase.from('service_process_steps').delete().eq('service_page_id', finalId),
            supabase.from('service_faq').delete().eq('service_page_id', finalId),
            supabase.from('service_testimonials').delete().eq('service_page_id', finalId)
          ]);

          // Inserir novos benefits (garantir que todos sejam salvos)
          if (page.benefits && page.benefits.length > 0) {
            const benefitsToInsert = page.benefits.map((benefit, index) => ({
              service_page_id: finalId,
              title: benefit.title || '',
              description: benefit.description || '',
              icon: benefit.icon || '⚖️',
              display_order: index
            }));
            
            const { error: benefitsError } = await supabase
              .from('service_benefits')
              .insert(benefitsToInsert);
              
            if (benefitsError) {
              console.error('❌ Erro ao salvar benefícios:', benefitsError);
            } else {
              console.log(`✅ ${benefitsToInsert.length} benefícios salvos`);
            }
          }

          // Inserir novos process steps
          if (page.process && page.process.length > 0) {
            const processToInsert = page.process.map((step, index) => ({
              service_page_id: finalId,
              step_number: step.step || index + 1,
              title: step.title || '',
              description: step.description || '',
              display_order: index
            }));
            
            const { error: processError } = await supabase
              .from('service_process_steps')
              .insert(processToInsert);
              
            if (processError) {
              console.error('❌ Erro ao salvar processo:', processError);
            } else {
              console.log(`✅ ${processToInsert.length} etapas do processo salvas`);
            }
          }

          // Inserir novas FAQs
          if (page.faq && page.faq.length > 0) {
            const faqToInsert = page.faq.map((faq, index) => ({
              service_page_id: finalId,
              question: faq.question || '',
              answer: faq.answer || '',
              display_order: index
            }));
            
            const { error: faqError } = await supabase
              .from('service_faq')
              .insert(faqToInsert);
              
            if (faqError) {
              console.error('❌ Erro ao salvar FAQ:', faqError);
            } else {
              console.log(`✅ ${faqToInsert.length} FAQs salvas`);
            }
          }

          // Inserir novos testimonials
          if (page.testimonials && page.testimonials.length > 0) {
            const testimonialsToInsert = page.testimonials.map((testimonial, index) => ({
              service_page_id: finalId,
              name: testimonial.name || '',
              text: testimonial.text || '',
              role: testimonial.role || '',
              image: testimonial.image || '',
              display_order: index
            }));
            
            const { error: testimonialsError } = await supabase
              .from('service_testimonials')
              .insert(testimonialsToInsert);
              
            if (testimonialsError) {
              console.error('❌ Erro ao salvar depoimentos:', testimonialsError);
            } else {
              console.log(`✅ ${testimonialsToInsert.length} depoimentos salvos`);
            }
          }

          savedPages.push({ ...page, id: finalId });
          console.log(`✅ Página "${page.title}" completa!`);
          
        } catch (pageError) {
          console.error(`❌ Erro ao processar página "${page.title}":`, pageError);
          continue;
        }
      }

      console.log('🎉 SALVAMENTO CONCLUÍDO! Páginas processadas:', savedPages.length);

      // Backup em admin_settings
      try {
        await supabase
          .from('admin_settings')
          .upsert({
            service_pages: savedPages as any
          });
        console.log('✅ Backup realizado');
      } catch (backupError) {
        console.warn('⚠️ Erro no backup:', backupError);
      }
      
      setServicePages(savedPages);
      
      // Disparar eventos de atualização
      window.dispatchEvent(new CustomEvent('servicePagesUpdated', { 
        detail: { pages: savedPages } 
      }));
      
      window.dispatchEvent(new CustomEvent('routesNeedUpdate', { 
        detail: { pages: savedPages } 
      }));

      console.log('🏁 PROCESSO COMPLETO!');
      return savedPages;

    } catch (error) {
      console.error('❌ ERRO CRÍTICO no salvamento:', error);
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
