
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

        for (const page of servicePagesData) {
          let categoryKey = '';
          
          // Se já tem categoria vinculada, usar ela
          if (page.law_categories?.category_key) {
            categoryKey = page.law_categories.category_key;
            console.log(`📄 Página "${page.title}" já vinculada à categoria: ${categoryKey}`);
          } else {
            // Se não tem categoria vinculada, tentar deduzir pelo href
            console.log(`📄 Página "${page.title}" sem categoria - tentando deduzir pelo href: ${page.href}`);
            
            // Mapear hrefs para categorias
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
            for (const [hrefPattern, category] of Object.entries(hrefToCategoryMap)) {
              if (href.includes(hrefPattern)) {
                categoryKey = category;
                console.log(`📄 Categoria deduzida para "${page.title}": ${categoryKey} (baseado no href: ${href})`);
                break;
              }
            }

            // Se ainda não encontrou, tentar pelo título
            if (!categoryKey) {
              const title = page.title?.toLowerCase() || '';
              if (title.includes('família') || title.includes('divórcio') || title.includes('pensão') || title.includes('guarda')) {
                categoryKey = 'familia';
              } else if (title.includes('tributário') || title.includes('imposto') || title.includes('fiscal')) {
                categoryKey = 'tributario';
              } else if (title.includes('empresarial') || title.includes('sociedade') || title.includes('contrato')) {
                categoryKey = 'empresarial';
              } else if (title.includes('trabalho') || title.includes('trabalhista') || title.includes('emprego')) {
                categoryKey = 'trabalho';
              }
              
              if (categoryKey) {
                console.log(`📄 Categoria deduzida pelo título para "${page.title}": ${categoryKey}`);
              }
            }

            // Se ainda não encontrou, usar categoria padrão
            if (!categoryKey) {
              categoryKey = 'empresarial'; // categoria padrão
              console.log(`📄 Usando categoria padrão para "${page.title}": ${categoryKey}`);
            }

            // Atualizar a página no banco de dados com a categoria correta
            const matchingCategory = categoriesData?.find(cat => cat.category_key === categoryKey);
            if (matchingCategory) {
              console.log(`📄 Atualizando página "${page.title}" com categoria ID: ${matchingCategory.id}`);
              await supabase
                .from('service_pages')
                .update({ category_id: matchingCategory.id })
                .eq('id', page.id);
            }
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

      // 2. LIMPAR DADOS EXISTENTES COMPLETAMENTE
      console.log('🗑️ Limpando TODOS os dados existentes...');
      
      // Desativar páginas existentes
      await supabase
        .from('service_pages')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      // Deletar dados relacionados existentes
      await Promise.all([
        supabase.from('service_benefits').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('service_process_steps').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('service_faq').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('service_testimonials').delete().neq('id', '00000000-0000-0000-0000-000000000000')
      ]);

      // 3. PROCESSAR E SALVAR CADA PÁGINA COM MÁXIMA COMPATIBILIDADE
      const savedPages: ServicePage[] = [];
      
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        console.log(`📄 Processando página ${i + 1}/${pages.length}: "${page.title}"`);
        console.log(`📄 Categoria da página: "${page.category}"`);

        const validPageId = ensureValidUUID(page.id);
        
        // ENCONTRAR CATEGORIA CORRESPONDENTE COM MÁXIMA FLEXIBILIDADE
        const matchingCategory = currentCategories.find(cat => {
          const pageCategory = page.category?.toLowerCase().trim();
          const catKey = cat.category_key?.toLowerCase().trim();
          const catName = cat.name?.toLowerCase().trim();
          
          // Múltiplos tipos de match
          const directMatch = catKey === pageCategory || catName === pageCategory;
          const slugMatch = catKey === pageCategory?.replace(/\s+/g, '-') || 
                           catName?.replace(/\s+/g, '-') === pageCategory;
          const partialMatch = catKey?.includes(pageCategory) || 
                              catName?.includes(pageCategory) ||
                              pageCategory?.includes(catKey) ||
                              pageCategory?.includes(catName);
          
          const isMatch = directMatch || slugMatch || partialMatch;
          
          if (isMatch) {
            console.log(`✅ MATCH encontrado: "${cat.name}" (${cat.category_key}) para "${page.category}"`);
          }
          
          return isMatch;
        });
        
        if (!matchingCategory) {
          console.warn(`⚠️ CATEGORIA NÃO ENCONTRADA PARA "${page.category}" - PÁGINA: "${page.title}"`);
          console.warn('📂 Categorias disponíveis:', currentCategories.map(c => `${c.name} (${c.category_key})`));
          
          // Tentar usar a primeira categoria como fallback
          const fallbackCategory = currentCategories[0];
          console.warn(`🔄 Usando categoria fallback: "${fallbackCategory.name}"`);
          
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

          if (pageError) {
            console.error(`❌ Erro ao salvar página "${page.title}":`, pageError);
            continue;
          }

          savedPages.push({
            ...page,
            id: validPageId,
            category: fallbackCategory.category_key
          });
          
          continue;
        }

        console.log(`✅ CATEGORIA VINCULADA: "${matchingCategory.name}" (ID: ${matchingCategory.id})`);
        
        // SALVAR PÁGINA COM CATEGORIA VINCULADA
        console.log(`💾 Salvando página "${page.title}" com categoria ID: ${matchingCategory.id}`);
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

        if (pageError) {
          console.error(`❌ Erro ao salvar página "${page.title}":`, pageError);
          continue;
        }

        console.log(`✅ Página "${page.title}" salva com sucesso`);

        // SALVAR DADOS RELACIONADOS
        if (page.benefits && page.benefits.length > 0) {
          const benefitsData = page.benefits.map((benefit, index) => ({
            service_page_id: validPageId,
            title: benefit.title,
            description: benefit.description || '',
            icon: benefit.icon,
            display_order: index
          }));
          const { error: benefitsError } = await supabase.from('service_benefits').insert(benefitsData);
          if (benefitsError) console.error('❌ Erro ao salvar benefits:', benefitsError);
        }

        if (page.process && page.process.length > 0) {
          const processData = page.process.map((step, index) => ({
            service_page_id: validPageId,
            step_number: step.step,
            title: step.title,
            description: step.description || '',
            display_order: index
          }));
          const { error: processError } = await supabase.from('service_process_steps').insert(processData);
          if (processError) console.error('❌ Erro ao salvar process:', processError);
        }

        if (page.faq && page.faq.length > 0) {
          const faqData = page.faq.map((faq, index) => ({
            service_page_id: validPageId,
            question: faq.question,
            answer: faq.answer,
            display_order: index
          }));
          const { error: faqError } = await supabase.from('service_faq').insert(faqData);
          if (faqError) console.error('❌ Erro ao salvar FAQ:', faqError);
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
          const { error: testimonialsError } = await supabase.from('service_testimonials').insert(testimonialsData);
          if (testimonialsError) console.error('❌ Erro ao salvar testimonials:', testimonialsError);
        }

        // Adicionar à lista de páginas salvas com a categoria correta
        savedPages.push({
          ...page,
          id: validPageId,
          category: matchingCategory.category_key
        });
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
