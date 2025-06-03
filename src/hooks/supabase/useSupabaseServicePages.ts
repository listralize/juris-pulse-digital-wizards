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
      
      // Primeiro, carregar as categorias para fazer o match
      const { data: categoriesData, error: catError } = await supabase
        .from('law_categories')
        .select('id, category_key, name')
        .eq('is_active', true);

      if (catError) {
        console.error('❌ Erro ao carregar categorias:', catError);
        return;
      }

      console.log('📂 Categorias carregadas:', categoriesData?.length || 0);

      // Carregar páginas de serviços
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
        return;
      }

      console.log('📄 Páginas de serviços carregadas:', servicePagesData?.length || 0);

      if (servicePagesData && servicePagesData.length > 0) {
        console.log('📄 PROCESSANDO PÁGINAS DE SERVIÇOS...');
        const formattedServicePages: ServicePage[] = [];

        // Primeiro passo: identificar páginas sem categoria vinculada
        const pagesWithoutCategory = servicePagesData.filter(page => !page.category_id);
        console.log('📄 Páginas sem categoria vinculada:', pagesWithoutCategory.length);

        // Segundo passo: vincular categorias automaticamente para páginas sem vinculação
        if (pagesWithoutCategory.length > 0 && categoriesData && categoriesData.length > 0) {
          console.log('🔗 VINCULANDO CATEGORIAS AUTOMATICAMENTE...');
          
          for (const page of pagesWithoutCategory) {
            let categoryMatch = null;
            
            // Mapear hrefs/títulos para categorias
            const hrefToCategoryMap: { [key: string]: string } = {
              // Direito de Família
              'divorcio': 'familia',
              'pensao-alimenticia': 'familia', 
              'guarda-filhos': 'familia',
              'adocao': 'familia',
              'investigacao-paternidade': 'familia',
              'casamento-uniao': 'familia',
              'inventario-partilha': 'familia',
              'testamentos-sucessoes': 'familia',
              
              // Direito Tributário
              'planejamento-tributario': 'tributario',
              'consultoria-impostos': 'tributario',
              'contencioso-tributario': 'tributario',
              'compliance-tributario': 'tributario',
              'auditoria-tributaria': 'tributario',
              'elisao-fiscal': 'tributario',
              'parcelamento-debitos': 'tributario',
              
              // Direito Empresarial
              'consultoria-empresarial': 'empresarial',
              'constituicao-empresas': 'empresarial',
              'contratos-empresariais': 'empresarial',
              'fusoes-aquisicoes': 'empresarial',
              'reestruturacao-societaria': 'empresarial',
              'governanca-corporativa': 'empresarial',
              'compliance-empresarial': 'empresarial',
              'contencioso-empresarial': 'empresarial',
              'propriedade-intelectual': 'empresarial',
              'recuperacao-creditos': 'empresarial',
              
              // Direito do Trabalho
              'assessoria-trabalhista': 'trabalho',
              'contencioso-trabalhista': 'trabalho',
              'compliance-trabalhista': 'trabalho',
              'horas-extras': 'trabalho',
              'verbas-rescissorias': 'trabalho',
              'reconhecimento-vinculo': 'trabalho',
              'defesa-justa-causa': 'trabalho',
              'assedio-moral-sexual': 'trabalho',
              'acordos-coletivos': 'trabalho',
              'saude-seguranca': 'trabalho',
              'desvio-funcao': 'trabalho',
              'adicionais-insalubridade': 'trabalho',
              'direitos-gestante': 'trabalho',
              'defesa-trabalhador': 'trabalho'
            };

            // Tentar encontrar categoria pelo href
            const href = page.href || '';
            for (const [hrefPattern, categoryKey] of Object.entries(hrefToCategoryMap)) {
              if (href.includes(hrefPattern)) {
                categoryMatch = categoriesData.find(cat => cat.category_key === categoryKey);
                if (categoryMatch) {
                  console.log(`🔗 Categoria encontrada para "${page.title}" via href: ${categoryKey}`);
                  break;
                }
              }
            }

            // Se não encontrou pelo href, tentar pelo título
            if (!categoryMatch) {
              const title = page.title?.toLowerCase() || '';
              if (title.includes('família') || title.includes('divórcio') || title.includes('pensão') || title.includes('guarda')) {
                categoryMatch = categoriesData.find(cat => cat.category_key === 'familia');
              } else if (title.includes('tributário') || title.includes('imposto') || title.includes('fiscal')) {
                categoryMatch = categoriesData.find(cat => cat.category_key === 'tributario');
              } else if (title.includes('empresarial') || title.includes('sociedade') || title.includes('contrato')) {
                categoryMatch = categoriesData.find(cat => cat.category_key === 'empresarial');
              } else if (title.includes('trabalho') || title.includes('trabalhista') || title.includes('emprego')) {
                categoryMatch = categoriesData.find(cat => cat.category_key === 'trabalho');
              }
              
              if (categoryMatch) {
                console.log(`🔗 Categoria encontrada para "${page.title}" via título: ${categoryMatch.category_key}`);
              }
            }

            // Se ainda não encontrou, usar categoria padrão
            if (!categoryMatch) {
              categoryMatch = categoriesData.find(cat => cat.category_key === 'empresarial') || categoriesData[0];
              console.log(`🔗 Usando categoria padrão para "${page.title}": ${categoryMatch?.category_key}`);
            }

            // Atualizar a página no banco de dados com a categoria correta
            if (categoryMatch) {
              console.log(`💾 Atualizando página "${page.title}" com categoria ID: ${categoryMatch.id}`);
              const { error: updateError } = await supabase
                .from('service_pages')
                .update({ category_id: categoryMatch.id })
                .eq('id', page.id);
                
              if (updateError) {
                console.error(`❌ Erro ao atualizar página ${page.title}:`, updateError);
              } else {
                console.log(`✅ Página "${page.title}" vinculada à categoria "${categoryMatch.name}"`);
                // Atualizar o objeto local também
                page.category_id = categoryMatch.id;
                page.law_categories = categoryMatch;
              }
            }
          }
        }

        // Terceiro passo: processar todas as páginas (agora com categorias vinculadas)
        for (const page of servicePagesData) {
          let categoryKey = '';
          
          // Se tem categoria vinculada, usar ela
          if (page.law_categories?.category_key) {
            categoryKey = page.law_categories.category_key;
            console.log(`📄 Página "${page.title}" vinculada à categoria: ${categoryKey}`);
          } else {
            // Fallback - usar primeira categoria disponível
            categoryKey = categoriesData?.[0]?.category_key || 'empresarial';
            console.log(`📄 Página "${page.title}" usando categoria fallback: ${categoryKey}`);
          }
          
          const formattedPage: ServicePage = {
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

          formattedServicePages.push(formattedPage);
        }
        
        setServicePages(formattedServicePages);
        console.log('✅ PÁGINAS DE SERVIÇOS PROCESSADAS E VINCULADAS:', formattedServicePages.length);
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
      console.log('💾 🔥 SALVANDO PÁGINAS DE SERVIÇOS - VERSÃO MEGA ROBUSTA');
      console.log('📄 Páginas recebidas:', pages.length);
      
      if (!pages || pages.length === 0) {
        console.log('⚠️ Nenhuma página para salvar');
        setServicePages([]);
        return;
      }

      // Buscar categorias atualizadas do Supabase
      const { data: currentCategories, error: catError } = await supabase
        .from('law_categories')
        .select('id, category_key, name')
        .eq('is_active', true);

      if (catError) {
        console.error('❌ Erro ao buscar categorias:', catError);
        throw catError;
      }

      if (!currentCategories || currentCategories.length === 0) {
        console.error('❌ NENHUMA CATEGORIA ENCONTRADA NO SUPABASE');
        throw new Error('Nenhuma categoria encontrada. Execute a migração de categorias primeiro.');
      }

      // Processar e salvar cada página
      const savedPages: ServicePage[] = [];
      
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        console.log(`📄 Processando página ${i + 1}/${pages.length}: "${page.title}"`);

        const validPageId = ensureValidUUID(page.id);
        
        // Encontrar categoria correspondente
        const matchingCategory = currentCategories.find(cat => {
          const pageCategory = page.category?.toLowerCase().trim();
          const catKey = cat.category_key?.toLowerCase().trim();
          const catName = cat.name?.toLowerCase().trim();
          
          return catKey === pageCategory || catName === pageCategory;
        });
        
        if (!matchingCategory) {
          console.warn(`⚠️ CATEGORIA NÃO ENCONTRADA PARA "${page.category}" - PÁGINA: "${page.title}"`);
          const fallbackCategory = currentCategories[0];
          console.warn(`🔄 Usando categoria fallback: "${fallbackCategory.name}"`);
          
          // Salvar com categoria fallback
          const { data: savedPage, error: pageError } = await supabase
            .from('service_pages')
            .upsert({
              id: validPageId,
              title: page.title,
              description: page.description,
              href: page.href || `servico-${validPageId.slice(0, 8)}`,
              category_id: fallbackCategory.id,
              display_order: i,
              is_active: true,
              updated_at: new Date().toISOString()
            })
            .select()
            .single();

          if (!pageError) {
            savedPages.push({
              ...page,
              id: validPageId,
              category: fallbackCategory.category_key
            });
          }
          continue;
        }

        // Salvar página com categoria vinculada
        const { data: savedPage, error: pageError } = await supabase
          .from('service_pages')
          .upsert({
            id: validPageId,
            title: page.title,
            description: page.description,
            href: page.href || `servico-${validPageId.slice(0, 8)}`,
            category_id: matchingCategory.id,
            display_order: i,
            is_active: true,
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (!pageError) {
          // Salvar dados relacionados (benefits, process, faq, testimonials)
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

          savedPages.push({
            ...page,
            id: validPageId,
            category: matchingCategory.category_key
          });
        }
      }

      setServicePages(savedPages);
      console.log('🎉 PÁGINAS SALVAS COM VINCULAÇÃO CORRETA:', savedPages.length);
      
      return savedPages;
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
