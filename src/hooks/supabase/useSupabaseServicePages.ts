
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
      console.log('📄 CARREGANDO PÁGINAS DE SERVIÇOS COM VINCULAÇÃO MELHORADA...');
      
      // Primeiro, carregar as categorias para fazer o match correto
      const { data: categoriesData, error: catError } = await supabase
        .from('law_categories')
        .select('id, category_key, name')
        .eq('is_active', true);

      if (catError) {
        console.error('❌ Erro ao carregar categorias:', catError);
        return;
      }

      console.log('📂 Categorias carregadas:', categoriesData?.length || 0, categoriesData);

      // Carregar páginas de serviços com JOIN melhorado
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
        console.log('📄 PROCESSANDO PÁGINAS COM VINCULAÇÃO MELHORADA...');
        const formattedServicePages: ServicePage[] = [];

        for (const page of servicePagesData) {
          let categoryKey = '';
          
          // Prioridade 1: Se tem categoria vinculada via FK, usar ela
          if (page.law_categories?.category_key) {
            categoryKey = page.law_categories.category_key;
            console.log(`📄 Página "${page.title}" vinculada via FK: ${categoryKey}`);
          } 
          // Prioridade 2: Se não tem FK, tentar detectar pela URL/título e vincular automaticamente
          else {
            console.log(`⚠️ Página "${page.title}" SEM categoria vinculada - tentando detectar...`);
            
            // Mapear hrefs/títulos para categorias
            const hrefToCategoryMap: { [key: string]: string } = {
              // Direito de Família
              'divorcio': 'familia',
              'pensao': 'familia', 
              'guarda': 'familia',
              'adocao': 'familia',
              'paternidade': 'familia',
              'casamento': 'familia',
              'inventario': 'familia',
              'testamento': 'familia',
              'sucessao': 'familia',
              
              // Direito Tributário
              'tributario': 'tributario',
              'tribut': 'tributario',
              'imposto': 'tributario',
              'fiscal': 'tributario',
              'compliance-tributario': 'tributario',
              'auditoria-tributaria': 'tributario',
              'parcelamento': 'tributario',
              
              // Direito Empresarial
              'empresarial': 'empresarial',
              'empresa': 'empresarial',
              'societario': 'empresarial',
              'contrato': 'empresarial',
              'fusao': 'empresarial',
              'aquisicao': 'empresarial',
              'governanca': 'empresarial',
              'compliance-empresarial': 'empresarial',
              'propriedade': 'empresarial',
              'credito': 'empresarial',
              
              // Direito do Trabalho
              'trabalho': 'trabalho',
              'trabalhista': 'trabalho',
              'emprego': 'trabalho',
              'verbas': 'trabalho',
              'vinculo': 'trabalho',
              'justa-causa': 'trabalho',
              'assedio': 'trabalho',
              'acordo': 'trabalho',
              'saude': 'trabalho',
              'seguranca': 'trabalho',
              'desvio': 'trabalho',
              'insalubridade': 'trabalho',
              'gestante': 'trabalho',
              
              // Direito Constitucional
              'constitucional': 'constitucional',
              'adc': 'constitucional',
              'adi': 'constitucional',
              'adpf': 'constitucional',
              'stf': 'constitucional',
              'supremo': 'constitucional',
              
              // Direito Administrativo
              'administrativo': 'administrativo',
              'licitacao': 'administrativo',
              'concurso': 'administrativo',
              'servidor': 'administrativo',
              'ato': 'administrativo',
              'politica': 'administrativo',
              
              // Direito Previdenciário
              'previdenciario': 'previdenciario',
              'aposentadoria': 'previdenciario',
              'beneficio': 'previdenciario',
              'auxilio': 'previdenciario',
              'bpc': 'previdenciario',
              'revisao': 'previdenciario',
              
              // Direito do Consumidor
              'consumidor': 'consumidor',
              'defesa': 'consumidor',
              'relacao': 'consumidor',
              
              // Direito Civil
              'civil': 'civil',
              'responsabilidade': 'civil',
              'dano': 'civil',
              'moral': 'civil',
              'obrigacao': 'civil'
            };

            let categoryMatch = null;
            
            // Tentar encontrar categoria pelo href
            const href = page.href?.toLowerCase() || '';
            for (const [hrefPattern, categoryKey] of Object.entries(hrefToCategoryMap)) {
              if (href.includes(hrefPattern)) {
                categoryMatch = categoriesData?.find(cat => cat.category_key === categoryKey);
                if (categoryMatch) {
                  console.log(`🔗 Categoria encontrada para "${page.title}" via href "${href}": ${categoryKey}`);
                  break;
                }
              }
            }

            // Se não encontrou pelo href, tentar pelo título
            if (!categoryMatch) {
              const title = page.title?.toLowerCase() || '';
              for (const [pattern, categoryKey] of Object.entries(hrefToCategoryMap)) {
                if (title.includes(pattern)) {
                  categoryMatch = categoriesData?.find(cat => cat.category_key === categoryKey);
                  if (categoryMatch) {
                    console.log(`🔗 Categoria encontrada para "${page.title}" via título: ${categoryKey}`);
                    break;
                  }
                }
              }
            }

            // Se ainda não encontrou, usar categoria padrão
            if (!categoryMatch) {
              categoryMatch = categoriesData?.find(cat => cat.category_key === 'civil') || categoriesData?.[0];
              console.log(`🔗 Usando categoria padrão para "${page.title}": ${categoryMatch?.category_key}`);
            }

            if (categoryMatch) {
              categoryKey = categoryMatch.category_key;
              
              // Atualizar a página no banco de dados com a categoria detectada
              console.log(`💾 Atualizando página "${page.title}" com categoria ID: ${categoryMatch.id}`);
              const { error: updateError } = await supabase
                .from('service_pages')
                .update({ category_id: categoryMatch.id })
                .eq('id', page.id);
                
              if (updateError) {
                console.error(`❌ Erro ao atualizar página ${page.title}:`, updateError);
              } else {
                console.log(`✅ Página "${page.title}" vinculada à categoria "${categoryMatch.name}"`);
              }
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
        console.log('📊 Distribuição por categoria:', 
          formattedServicePages.reduce((acc, page) => {
            acc[page.category] = (acc[page.category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        );
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
