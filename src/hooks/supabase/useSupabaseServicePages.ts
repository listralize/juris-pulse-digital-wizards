
import { useState } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { ServicePage } from '../../types/adminTypes';

export const useSupabaseServicePages = () => {
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);

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

  const loadServicePages = async () => {
    try {
      console.log('📄 CARREGANDO PÁGINAS DE SERVIÇOS...');
      const { data: servicePagesData, error: pagesError } = await supabase
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
        .order('display_order');

      if (pagesError) {
        console.error('❌ Erro ao carregar service pages:', pagesError);
      } else {
        console.log('📄 Páginas de serviços carregadas:', servicePagesData?.length || 0);
      }

      if (servicePagesData && servicePagesData.length > 0) {
        console.log('📄 PROCESSANDO PÁGINAS DE SERVIÇOS...');
        const formattedServicePages: ServicePage[] = servicePagesData.map(page => {
          const categoryKey = page.law_categories?.category_key || '';
          console.log(`📄 Página "${page.title}" -> Categoria: ${categoryKey} (ID: ${page.law_categories?.id})`);
          
          return {
            id: page.id,
            title: page.title,
            description: page.description || '',
            category: categoryKey,
            href: page.href || '',
            benefits: page.service_benefits?.map((benefit: any) => ({
              title: benefit.title,
              description: benefit.description || '',
              icon: benefit.icon
            })) || [],
            process: page.service_process_steps?.map((step: any) => ({
              step: step.step_number,
              title: step.title,
              description: step.description || ''
            })) || [],
            faq: page.service_faq?.map((faq: any) => ({
              question: faq.question,
              answer: faq.answer
            })) || [],
            testimonials: page.service_testimonials?.map((testimonial: any) => ({
              name: testimonial.name,
              text: testimonial.text,
              role: testimonial.role,
              image: testimonial.image
            })) || []
          };
        });
        
        setServicePages(formattedServicePages);
        console.log('✅ PÁGINAS DE SERVIÇOS SETADAS:', formattedServicePages.length);
      } else {
        console.log('⚠️ NENHUMA PÁGINA DE SERVIÇO ENCONTRADA');
        setServicePages([]);
      }
    } catch (error) {
      console.error('💥 ERRO AO CARREGAR SERVICE PAGES:', error);
      setServicePages([]);
    }
  };

  const saveServicePages = async (pages: ServicePage[]) => {
    try {
      console.log('💾 🔥 SALVANDO PÁGINAS DE SERVIÇOS - VERSÃO CORRIGIDA');
      console.log('📄 Páginas recebidas:', pages.length);
      
      // 1. BUSCAR CATEGORIAS ATUALIZADAS DO SUPABASE
      console.log('📂 Buscando categorias atualizadas...');
      const { data: currentCategories, error: catError } = await supabase
        .from('law_categories')
        .select('id, category_key, name')
        .eq('is_active', true);

      if (catError) {
        console.error('❌ Erro ao buscar categorias:', catError);
        throw catError;
      }

      console.log('📂 Categorias disponíveis:', currentCategories);
      
      if (!currentCategories || currentCategories.length === 0) {
        console.error('❌ NENHUMA CATEGORIA ENCONTRADA NO SUPABASE');
        throw new Error('Nenhuma categoria encontrada. Execute a migração de categorias primeiro.');
      }

      // 2. DESATIVAR PÁGINAS EXISTENTES
      console.log('🗑️ Desativando páginas existentes...');
      await supabase
        .from('service_pages')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      // 3. PROCESSAR E SALVAR CADA PÁGINA
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        console.log(`📄 Processando página ${i + 1}/${pages.length}: "${page.title}"`);
        console.log(`📄 Categoria da página: "${page.category}"`);

        const validPageId = ensureValidUUID(page.id);
        
        // ENCONTRAR CATEGORIA CORRESPONDENTE
        const matchingCategory = currentCategories.find(cat => 
          cat.category_key === page.category || 
          cat.name === page.category ||
          cat.category_key === page.category?.toLowerCase().replace(/\s+/g, '-')
        );
        
        if (!matchingCategory) {
          console.warn(`⚠️ CATEGORIA NÃO ENCONTRADA PARA "${page.category}" - PÁGINA: "${page.title}"`);
          console.warn('📂 Categorias disponíveis:', currentCategories.map(c => c.category_key));
          continue; // Pular esta página se a categoria não for encontrada
        }

        console.log(`✅ CATEGORIA ENCONTRADA: "${matchingCategory.name}" (ID: ${matchingCategory.id})`);
        
        // SALVAR PÁGINA COM CATEGORIA VINCULADA
        console.log(`💾 Salvando página "${page.title}" com categoria ID: ${matchingCategory.id}`);
        const { data: savedPage, error: pageError } = await supabase
          .from('service_pages')
          .upsert({
            id: validPageId,
            title: page.title,
            description: page.description,
            href: page.href,
            category_id: matchingCategory.id, // USAR O ID DA CATEGORIA
            display_order: i,
            is_active: true,
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (pageError) {
          console.error(`❌ Erro ao salvar página "${page.title}":`, pageError);
          continue;
        }

        console.log(`✅ Página "${page.title}" salva com sucesso`);

        // LIMPAR DADOS RELACIONADOS EXISTENTES
        await Promise.all([
          supabase.from('service_benefits').delete().eq('service_page_id', validPageId),
          supabase.from('service_process_steps').delete().eq('service_page_id', validPageId),
          supabase.from('service_faq').delete().eq('service_page_id', validPageId),
          supabase.from('service_testimonials').delete().eq('service_page_id', validPageId)
        ]);

        // SALVAR DADOS RELACIONADOS
        if (page.benefits && page.benefits.length > 0) {
          const benefitsData = page.benefits.map((benefit, index) => ({
            service_page_id: validPageId,
            title: benefit.title,
            description: benefit.description || '',
            icon: benefit.icon,
            display_order: index
          }));
          await supabase.from('service_benefits').insert(benefitsData);
        }

        if (page.process && page.process.length > 0) {
          const processData = page.process.map((step, index) => ({
            service_page_id: validPageId,
            step_number: step.step,
            title: step.title,
            description: step.description || '',
            display_order: index
          }));
          await supabase.from('service_process_steps').insert(processData);
        }

        if (page.faq && page.faq.length > 0) {
          const faqData = page.faq.map((faq, index) => ({
            service_page_id: validPageId,
            question: faq.question,
            answer: faq.answer,
            display_order: index
          }));
          await supabase.from('service_faq').insert(faqData);
        }

        if (page.testimonials && page.testimonials.length > 0) {
          const testimonialsData = page.testimonials.map((testimonial, index) => ({
            service_page_id: validPageId,
            name: testimonial.name,
            text: testimonial.text || 'Depoimento excelente',
            role: testimonial.role,
            image: testimonial.image,
            display_order: index
          }));
          await supabase.from('service_testimonials').insert(testimonialsData);
        }
      }

      setServicePages(pages);
      console.log('🎉 TODAS AS PÁGINAS SALVAS COM SUCESSO');
    } catch (error) {
      console.error('💥 ERRO CRÍTICO AO SALVAR PÁGINAS:', error);
      throw error;
    }
  };

  return {
    servicePages,
    loadServicePages,
    saveServicePages,
    setServicePages
  };
};
