import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { TeamMember, PageTexts, ServicePage, CategoryInfo } from '../types/adminTypes';

export const useSupabaseDataNew = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [pageTexts, setPageTexts] = useState<PageTexts>({
    heroTitle: '',
    heroSubtitle: '',
    aboutTitle: '',
    aboutDescription: '',
    contactTitle: '',
    contactSubtitle: '',
    teamTitle: '',
    areasTitle: '',
    clientAreaTitle: '',
    clientAreaDescription: '',
    familiaTitle: '',
    familiaDescription: '',
    tributarioTitle: '',
    tributarioDescription: '',
    empresarialTitle: '',
    empresarialDescription: '',
    trabalhoTitle: '',
    trabalhoDescription: '',
    categoryTexts: [],
    contactTexts: {
      phone: '',
      email: '',
      address: '',
      whatsapp: ''
    },
    footerTexts: {
      companyName: '',
      description: ''
    }
  });
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Carregar dados do Supabase com logs detalhados
  const loadData = async () => {
    try {
      console.log('🔄 CARREGANDO DADOS DO SUPABASE - INÍCIO');
      
      // Carregar configurações do site
      const { data: siteSettings, error: siteError } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (siteError && siteError.code !== 'PGRST116') {
        console.error('❌ Erro ao carregar site settings:', siteError);
      }

      // Carregar informações de contato
      const { data: contactInfo, error: contactError } = await supabase
        .from('contact_info')
        .select('*')
        .single();

      if (contactError && contactError.code !== 'PGRST116') {
        console.error('❌ Erro ao carregar contact info:', contactError);
      }

      // Carregar informações do rodapé
      const { data: footerInfo, error: footerError } = await supabase
        .from('footer_info')
        .select('*')
        .single();

      if (footerError && footerError.code !== 'PGRST116') {
        console.error('❌ Erro ao carregar footer info:', footerError);
      }

      // Carregar membros da equipe
      const { data: teamData, error: teamError } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (teamError) {
        console.error('❌ Erro ao carregar team members:', teamError);
      } else {
        console.log('👥 Team members carregados:', teamData?.length || 0);
      }

      // CARREGAR CATEGORIAS COM LOGS DETALHADOS
      console.log('📂 CARREGANDO CATEGORIAS DO SUPABASE...');
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('law_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      console.log('📂 RESULTADO QUERY CATEGORIAS:');
      console.log('  - Dados:', categoriesData);
      console.log('  - Erro:', categoriesError);
      console.log('  - Quantidade:', categoriesData?.length || 0);

      // Carregar páginas de serviços com JOIN nas categorias
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

      // PROCESSAR E SETAR DADOS DE PÁGINA
      if (siteSettings || contactInfo || footerInfo) {
        const processedPageTexts = {
          heroTitle: siteSettings?.hero_title || '',
          heroSubtitle: siteSettings?.hero_subtitle || '',
          heroBackgroundImage: siteSettings?.hero_background_image,
          aboutTitle: siteSettings?.about_title || '',
          aboutDescription: siteSettings?.about_description || '',
          aboutImage: siteSettings?.about_image,
          areasTitle: siteSettings?.areas_title || '',
          teamTitle: siteSettings?.team_title || '',
          clientAreaTitle: siteSettings?.client_area_title || '',
          clientAreaDescription: siteSettings?.client_area_description || '',
          clientPortalLink: siteSettings?.client_portal_link,
          contactTitle: siteSettings?.contact_title || '',
          contactSubtitle: siteSettings?.contact_subtitle || '',
          familiaTitle: '',
          familiaDescription: '',
          tributarioTitle: '',
          tributarioDescription: '',
          empresarialTitle: '',
          empresarialDescription: '',
          trabalhoTitle: '',
          trabalhoDescription: '',
          categoryTexts: [],
          contactTexts: {
            phone: contactInfo?.phone || '',
            email: contactInfo?.email || '',
            address: contactInfo?.address || '',
            whatsapp: contactInfo?.whatsapp || ''
          },
          footerTexts: {
            companyName: footerInfo?.company_name || '',
            description: footerInfo?.description || ''
          }
        };
        setPageTexts(processedPageTexts);
        console.log('⚙️ Page texts processados e setados');
      }

      // PROCESSAR E SETAR MEMBROS DA EQUIPE
      if (teamData && teamData.length > 0) {
        const formattedTeamMembers: TeamMember[] = teamData.map(member => ({
          id: member.id,
          name: member.name,
          title: member.title,
          oab: member.oab,
          email: member.email,
          image: member.image || '',
          description: member.description || ''
        }));
        setTeamMembers(formattedTeamMembers);
        console.log('👥 Team members processados e setados:', formattedTeamMembers.length);
      } else {
        setTeamMembers([]);
        console.log('👥 Nenhum team member encontrado');
      }

      // PROCESSAR E SETAR CATEGORIAS
      if (categoriesData && categoriesData.length > 0) {
        console.log('📂 PROCESSANDO CATEGORIAS...');
        const formattedCategories: CategoryInfo[] = categoriesData.map(cat => {
          const categoryName = cat.name || cat.category_key || 'Categoria';
          const categoryKey = cat.category_key || cat.name?.toLowerCase().replace(/\s+/g, '-') || 'categoria';
          
          const processed = {
            id: cat.id,
            value: categoryKey,
            label: categoryName,
            name: categoryName,
            description: cat.description || '',
            icon: cat.icon || 'FileText',
            color: cat.color || 'bg-gray-500'
          };
          
          console.log(`📂 Categoria processada: ${categoryName} (${categoryKey}) -> ID: ${cat.id}`);
          return processed;
        });
        
        setCategories(formattedCategories);
        console.log('✅ CATEGORIAS SETADAS NO STATE:', formattedCategories.length);
        console.log('✅ Categorias:', formattedCategories);
      } else {
        console.log('⚠️ NENHUMA CATEGORIA ENCONTRADA - SETANDO ARRAY VAZIO');
        setCategories([]);
      }

      // PROCESSAR E SETAR PÁGINAS DE SERVIÇOS
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

      console.log('🏁 CARREGAMENTO CONCLUÍDO');

    } catch (error) {
      console.error('💥 ERRO CRÍTICO AO CARREGAR DADOS:', error);
    }
    
    setIsLoading(false);
  };

  // Salvar configurações do site com sincronização automática
  const savePageTexts = async (texts: PageTexts) => {
    try {
      console.log('💾 Salvando configurações no Supabase...');
      
      await supabase
        .from('site_settings')
        .upsert({
          hero_title: texts.heroTitle,
          hero_subtitle: texts.heroSubtitle,
          hero_background_image: texts.heroBackgroundImage,
          about_title: texts.aboutTitle,
          about_description: texts.aboutDescription,
          about_image: texts.aboutImage,
          areas_title: texts.areasTitle,
          team_title: texts.teamTitle,
          client_area_title: texts.clientAreaTitle,
          client_area_description: texts.clientAreaDescription,
          client_portal_link: texts.clientPortalLink,
          contact_title: texts.contactTitle,
          contact_subtitle: texts.contactSubtitle,
          updated_at: new Date().toISOString()
        });

      await supabase
        .from('contact_info')
        .upsert({
          phone: texts.contactTexts.phone,
          email: texts.contactTexts.email,
          address: texts.contactTexts.address,
          whatsapp: texts.contactTexts.whatsapp,
          updated_at: new Date().toISOString()
        });

      await supabase
        .from('footer_info')
        .upsert({
          company_name: texts.footerTexts.companyName,
          description: texts.footerTexts.description,
          updated_at: new Date().toISOString()
        });

      setPageTexts(texts);
      console.log('✅ Configurações salvas no Supabase');
    } catch (error) {
      console.error('❌ Erro ao salvar configurações:', error);
      throw error;
    }
  };

  // Salvar membros da equipe com sincronização automática
  const saveTeamMembers = async (members: TeamMember[]) => {
    try {
      console.log('💾 Salvando equipe no Supabase...');
      
      await supabase
        .from('team_members')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      const memberData = members.map((member, index) => ({
        id: ensureValidUUID(member.id),
        name: member.name,
        title: member.title,
        oab: member.oab,
        email: member.email,
        image: member.image,
        description: member.description,
        display_order: index,
        is_active: true,
        updated_at: new Date().toISOString()
      }));

      await supabase
        .from('team_members')
        .upsert(memberData);

      setTeamMembers(members);
      console.log('✅ Equipe salva no Supabase');
    } catch (error) {
      console.error('❌ Erro ao salvar equipe:', error);
      throw error;
    }
  };

  // Salvar páginas de serviços com sincronização automática - CORRIGIDO
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

  // Salvar categorias com sincronização automática - CORRIGIDO PARA EVITAR CONFLITOS
  const saveCategories = async (cats: CategoryInfo[]) => {
    try {
      console.log('💾 🔥 SALVANDO CATEGORIAS - VERSÃO ROBUSTA');
      console.log('📂 Categorias recebidas:', cats.length);
      console.log('📂 Dados das categorias:', cats);
      
      // 1. DELETAR TODAS CATEGORIAS EXISTENTES
      console.log('🗑️ Deletando todas as categorias existentes...');
      const { error: deleteError } = await supabase
        .from('law_categories')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (deleteError) {
        console.error('❌ Erro ao deletar categorias:', deleteError);
        throw deleteError;
      }
      console.log('✅ Categorias existentes deletadas');

      // 2. VALIDAR E PROCESSAR DADOS
      if (!cats || cats.length === 0) {
        console.log('⚠️ Nenhuma categoria para salvar');
        setCategories([]);
        return;
      }

      const categoryData = cats.map((cat, index) => {
        const validId = ensureValidUUID(cat.id || '');
        
        let categoryName = cat.name || cat.label || cat.value || `Categoria ${index + 1}`;
        let categoryKey = cat.value || cat.name?.toLowerCase().replace(/\s+/g, '-') || `categoria-${index + 1}`;
        
        console.log(`📂 Processando categoria ${index + 1}: "${categoryName}" (${categoryKey})`);
        
        return {
          id: validId,
          category_key: categoryKey,
          name: categoryName,
          description: cat.description || `Descrição da ${categoryName}`,
          icon: cat.icon || 'FileText',
          color: cat.color || 'bg-gray-500',
          display_order: index,
          is_active: true,
          updated_at: new Date().toISOString()
        };
      });

      console.log('📋 Dados finais das categorias:', categoryData);

      // 3. INSERIR CATEGORIAS NO SUPABASE
      console.log('📥 Inserindo categorias no Supabase...');
      const { data: insertedData, error: insertError } = await supabase
        .from('law_categories')
        .insert(categoryData)
        .select();

      if (insertError) {
        console.error('❌ Erro ao inserir categorias:', insertError);
        throw insertError;
      }

      console.log('✅ Categorias inseridas no Supabase:', insertedData?.length);

      // 4. ATUALIZAR STATE LOCAL
      const updatedCategories = categoryData.map(cat => ({
        id: cat.id,
        value: cat.category_key,
        label: cat.name,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        color: cat.color
      }));
      
      setCategories(updatedCategories);
      console.log('🎉 CATEGORIAS SALVAS E STATE ATUALIZADO:', updatedCategories.length);
      
      return updatedCategories;
    } catch (error) {
      console.error('💥 ERRO CRÍTICO AO SALVAR CATEGORIAS:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    teamMembers,
    pageTexts,
    servicePages,
    categories,
    isLoading,
    saveTeamMembers,
    savePageTexts,
    saveServicePages,
    saveCategories,
    refreshData: loadData
  };
};
