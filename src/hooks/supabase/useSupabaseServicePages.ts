
import { useState, useEffect } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { ServicePage } from '../../types/adminTypes';

export const useSupabaseServicePages = () => {
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadServicePages = async () => {
    try {
      console.log('📄 CARREGANDO PÁGINAS DE SERVIÇOS...');
      setIsLoading(true);
      
      // Carregar páginas com todos os dados relacionados
      const { data: pagesData, error: pagesError } = await supabase
        .from('service_pages')
        .select(`
          *,
          law_categories!service_pages_category_id_fkey(id, category_key, name),
          service_benefits(*),
          service_process_steps(*),
          service_faq(*),
          service_testimonials(*)
        `)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (pagesError) {
        console.error('❌ Erro ao carregar páginas:', pagesError);
        setServicePages([]);
        return;
      }

      if (pagesData && pagesData.length > 0) {
        console.log('📄 Dados brutos das páginas:', pagesData);
        
        const formattedPages: ServicePage[] = pagesData.map((page: any) => ({
          id: page.id,
          title: page.title || '',
          description: page.description || '',
          category: page.law_categories?.category_key || 'geral',
          href: page.href || '',
          benefits: (page.service_benefits || [])
            .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
            .map((benefit: any) => ({
              title: benefit.title,
              description: benefit.description,
              icon: benefit.icon
            })),
          process: (page.service_process_steps || [])
            .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
            .map((step: any) => ({
              step: step.step_number,
              title: step.title,
              description: step.description
            })),
          faq: (page.service_faq || [])
            .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
            .map((faq: any) => ({
              question: faq.question,
              answer: faq.answer
            })),
          testimonials: (page.service_testimonials || [])
            .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
            .map((testimonial: any) => ({
              name: testimonial.name,
              text: testimonial.text,
              image: testimonial.image
            }))
        }));
        
        console.log('✅ PÁGINAS FORMATADAS:', formattedPages.length, formattedPages);
        setServicePages(formattedPages);
      } else {
        console.log('⚠️ NENHUMA PÁGINA ENCONTRADA');
        setServicePages([]);
      }
    } catch (error) {
      console.error('💥 ERRO AO CARREGAR PÁGINAS:', error);
      setServicePages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveServicePages = async (pages: ServicePage[]) => {
    try {
      console.log('💾 SALVANDO PÁGINAS:', pages.length);
      
      if (!pages || pages.length === 0) {
        console.log('⚠️ Nenhuma página para salvar');
        return;
      }

      // Primeiro, buscar as categorias para mapear category_key -> id
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('law_categories')
        .select('id, category_key');

      if (categoriesError) {
        console.error('❌ Erro ao buscar categorias:', categoriesError);
        throw categoriesError;
      }

      const categoryMap = new Map<string, string>();
      categoriesData?.forEach(cat => {
        categoryMap.set(cat.category_key, cat.id);
      });

      console.log('📂 Mapeamento de categorias:', Object.fromEntries(categoryMap));

      // Para cada página, salvar ou atualizar
      for (const page of pages) {
        const categoryId = categoryMap.get(page.category);
        
        if (!categoryId) {
          console.warn(`⚠️ Categoria '${page.category}' não encontrada para página '${page.title}'`);
          continue;
        }

        // Verificar se a página já existe
        const { data: existingPage } = await supabase
          .from('service_pages')
          .select('id')
          .eq('id', page.id)
          .maybeSingle();

        const pageData = {
          title: page.title,
          description: page.description,
          href: page.href,
          category_id: categoryId,
          is_active: true
        };

        if (existingPage) {
          // Atualizar página existente
          const { error: updateError } = await supabase
            .from('service_pages')
            .update(pageData)
            .eq('id', page.id);

          if (updateError) {
            console.error('❌ Erro ao atualizar página:', updateError);
            continue;
          }
          console.log('✅ Página atualizada:', page.title);
        } else {
          // Inserir nova página
          const { error: insertError } = await supabase
            .from('service_pages')
            .insert({
              id: page.id,
              ...pageData
            });

          if (insertError) {
            console.error('❌ Erro ao inserir página:', insertError);
            continue;
          }
          console.log('✅ Nova página inserida:', page.title);
        }

        // Limpar dados relacionados existentes
        await Promise.all([
          supabase.from('service_benefits').delete().eq('service_page_id', page.id),
          supabase.from('service_process_steps').delete().eq('service_page_id', page.id),
          supabase.from('service_faq').delete().eq('service_page_id', page.id),
          supabase.from('service_testimonials').delete().eq('service_page_id', page.id)
        ]);

        // Inserir dados relacionados
        if (page.benefits && page.benefits.length > 0) {
          const benefits = page.benefits.map((benefit, index) => ({
            service_page_id: page.id,
            title: benefit.title,
            description: benefit.description,
            icon: benefit.icon,
            display_order: index
          }));

          const { error: benefitsError } = await supabase
            .from('service_benefits')
            .insert(benefits);
          
          if (benefitsError) {
            console.error('❌ Erro ao salvar benefícios:', benefitsError);
          }
        }

        if (page.process && page.process.length > 0) {
          const processSteps = page.process.map((step, index) => ({
            service_page_id: page.id,
            step_number: step.step,
            title: step.title,
            description: step.description,
            display_order: index
          }));

          const { error: processError } = await supabase
            .from('service_process_steps')
            .insert(processSteps);
            
          if (processError) {
            console.error('❌ Erro ao salvar processo:', processError);
          }
        }

        if (page.faq && page.faq.length > 0) {
          const faqItems = page.faq.map((faq, index) => ({
            service_page_id: page.id,
            question: faq.question,
            answer: faq.answer,
            display_order: index
          }));

          const { error: faqError } = await supabase
            .from('service_faq')
            .insert(faqItems);
            
          if (faqError) {
            console.error('❌ Erro ao salvar FAQ:', faqError);
          }
        }

        if (page.testimonials && page.testimonials.length > 0) {
          const testimonials = page.testimonials.map((testimonial, index) => ({
            service_page_id: page.id,
            name: testimonial.name,
            text: testimonial.text,
            image: testimonial.image,
            display_order: index
          }));

          const { error: testimonialsError } = await supabase
            .from('service_testimonials')
            .insert(testimonials);
            
          if (testimonialsError) {
            console.error('❌ Erro ao salvar depoimentos:', testimonialsError);
          }
        }
      }

      console.log('✅ PÁGINAS SALVAS NO SUPABASE:', pages.length);
      
      // Recarregar as páginas após salvar
      await loadServicePages();
      
      // Disparar evento para atualizar outras partes da aplicação
      window.dispatchEvent(new CustomEvent('servicePagesUpdated'));
      
      return pages;
    } catch (error) {
      console.error('💥 ERRO CRÍTICO AO SALVAR PÁGINAS:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadServicePages();
  }, []);

  return {
    servicePages,
    isLoading,
    loadServicePages,
    saveServicePages,
    setServicePages
  };
};
