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

  // Função para gerar UUID válido
  const generateValidUUID = () => {
    return crypto.randomUUID();
  };

  // Função para validar se uma string é um UUID válido
  const isValidUUID = (str: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  };

  // Função para transformar ID local em UUID válido
  const ensureValidUUID = (id: string) => {
    if (!id || !isValidUUID(id)) {
      return generateValidUUID();
    }
    return id;
  };

  // Carregar dados do Supabase
  const loadData = async () => {
    try {
      console.log('🔄 Carregando dados do Supabase...');
      
      // Carregar configurações do site
      const { data: siteSettings } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      // Carregar informações de contato
      const { data: contactInfo } = await supabase
        .from('contact_info')
        .select('*')
        .single();

      // Carregar informações do rodapé
      const { data: footerInfo } = await supabase
        .from('footer_info')
        .select('*')
        .single();

      // Carregar membros da equipe
      const { data: teamData } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      // Carregar categorias - COM LOG DETALHADO
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('law_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      console.log('📊 Query de categorias - dados brutos:', categoriesData);
      console.log('📊 Query de categorias - erro:', categoriesError);
      console.log('📊 Categorias carregadas do Supabase:', categoriesData?.length || 0);

      // Carregar páginas de serviços com relacionamentos CORRIGIDOS
      const { data: servicePagesData } = await supabase
        .from('service_pages')
        .select(`
          *,
          law_categories!service_pages_category_id_fkey(category_key, name),
          service_benefits(*),
          service_process_steps(*),
          service_faq(*),
          service_testimonials(*)
        `)
        .eq('is_active', true)
        .order('display_order');

      console.log('📄 Páginas de serviços carregadas:', servicePagesData?.length || 0);
      console.log('📄 Dados das páginas:', servicePagesData);

      // Montar dados das páginas de texto
      if (siteSettings && contactInfo && footerInfo) {
        setPageTexts({
          heroTitle: siteSettings.hero_title || '',
          heroSubtitle: siteSettings.hero_subtitle || '',
          heroBackgroundImage: siteSettings.hero_background_image,
          aboutTitle: siteSettings.about_title || '',
          aboutDescription: siteSettings.about_description || '',
          aboutImage: siteSettings.about_image,
          areasTitle: siteSettings.areas_title || '',
          teamTitle: siteSettings.team_title || '',
          clientAreaTitle: siteSettings.client_area_title || '',
          clientAreaDescription: siteSettings.client_area_description || '',
          clientPortalLink: siteSettings.client_portal_link,
          contactTitle: siteSettings.contact_title || '',
          contactSubtitle: siteSettings.contact_subtitle || '',
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
            phone: contactInfo.phone || '',
            email: contactInfo.email || '',
            address: contactInfo.address || '',
            whatsapp: contactInfo.whatsapp || ''
          },
          footerTexts: {
            companyName: footerInfo.company_name || '',
            description: footerInfo.description || ''
          }
        });
      }

      // Montar dados dos membros da equipe
      if (teamData) {
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
      }

      // PROCESSAMENTO DE CATEGORIAS - COMPLETAMENTE CORRIGIDO
      if (categoriesData && categoriesData.length > 0) {
        const formattedCategories: CategoryInfo[] = categoriesData.map(cat => {
          const categoryName = cat.name || cat.category_key || 'Categoria';
          const categoryKey = cat.category_key || cat.name?.toLowerCase().replace(/\s+/g, '-') || 'categoria';
          
          return {
            id: cat.id,
            value: categoryKey,
            label: categoryName,
            name: categoryName,
            description: cat.description || '',
            icon: cat.icon || 'FileText',
            color: cat.color || 'bg-gray-500'
          };
        });
        setCategories(formattedCategories);
        console.log('✅ Categorias processadas e setadas:', formattedCategories.length);
        console.log('✅ Categorias:', formattedCategories);
      } else {
        console.log('⚠️ Nenhuma categoria encontrada no Supabase - array vazio');
        setCategories([]);
      }

      // Montar dados das páginas de serviços COM CORREÇÃO DA VINCULAÇÃO
      if (servicePagesData && servicePagesData.length > 0) {
        const formattedServicePages: ServicePage[] = servicePagesData.map(page => {
          const categoryKey = page.law_categories?.category_key || '';
          console.log(`📄 Página "${page.title}" vinculada à categoria: ${categoryKey}`);
          
          return {
            id: page.id,
            title: page.title,
            description: page.description || '',
            category: categoryKey, // Usar o category_key da categoria vinculada
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
        console.log('✅ Páginas de serviços processadas:', formattedServicePages.length);
        console.log('✅ Páginas:', formattedServicePages);
      } else {
        console.log('⚠️ Nenhuma página de serviço encontrada');
        setServicePages([]);
      }

    } catch (error) {
      console.error('❌ Erro ao carregar dados do Supabase:', error);
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
      console.log('💾 Salvando', pages.length, 'páginas de serviços no Supabase...');
      
      // Primeiro, carregar categorias atualizadas para garantir vinculação correta
      const { data: currentCategories } = await supabase
        .from('law_categories')
        .select('id, category_key')
        .eq('is_active', true);

      console.log('📂 Categorias disponíveis para vinculação:', currentCategories);
      
      await supabase
        .from('service_pages')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        console.log(`📄 Processando página ${i + 1}/${pages.length}: ${page.title}`);

        const validPageId = ensureValidUUID(page.id);
        
        // CORREÇÃO: Encontrar categoria pelo category_key, não pelo value
        const category = currentCategories?.find(cat => cat.category_key === page.category);
        
        if (!category) {
          console.warn(`⚠️ Categoria não encontrada para: ${page.category}`);
          continue;
        }

        console.log(`🔗 Vinculando página "${page.title}" à categoria ID: ${category.id}`);
        
        const { data: savedPage, error: pageError } = await supabase
          .from('service_pages')
          .upsert({
            id: validPageId,
            title: page.title,
            description: page.description,
            href: page.href,
            category_id: category.id, // Usar o ID da categoria
            display_order: i,
            is_active: true,
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (pageError) {
          console.error('❌ Erro ao salvar página:', pageError);
          continue;
        }

        console.log('✅ Página salva com sucesso:', savedPage);

        await Promise.all([
          supabase.from('service_benefits').delete().eq('service_page_id', validPageId),
          supabase.from('service_process_steps').delete().eq('service_page_id', validPageId),
          supabase.from('service_faq').delete().eq('service_page_id', validPageId),
          supabase.from('service_testimonials').delete().eq('service_page_id', validPageId)
        ]);

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
      console.log('✅ Todas as páginas salvas no Supabase');
    } catch (error) {
      console.error('❌ Erro ao salvar páginas de serviços:', error);
      throw error;
    }
  };

  // Salvar categorias com sincronização automática - CORRIGIDO PARA EVITAR CONFLITOS
  const saveCategories = async (cats: CategoryInfo[]) => {
    try {
      console.log('💾 🔥 SALVANDO CATEGORIAS - VERSÃO ANTI-CONFLITO:', cats.length);
      
      // 1. DELETAR TODAS as categorias existentes primeiro
      console.log('🗑️ Deletando todas as categorias existentes...');
      const { error: deleteError } = await supabase
        .from('law_categories')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (deleteError) {
        console.error('❌ Erro ao deletar categorias:', deleteError);
        throw deleteError;
      }

      console.log('✅ Todas as categorias deletadas');

      // 2. Processar e validar cada categoria
      const categoryData = cats.map((cat, index) => {
        const validId = ensureValidUUID(cat.id || '');
        
        let categoryName = cat.name || cat.label || cat.value;
        let categoryKey = cat.value || cat.name?.toLowerCase().replace(/\s+/g, '-');
        
        if (!categoryName || categoryName.trim() === '') {
          categoryName = `Categoria ${index + 1}`;
        }
        if (!categoryKey || categoryKey.trim() === '') {
          categoryKey = `categoria-${index + 1}`;
        }
        
        console.log(`📂 Categoria ${index + 1}: "${categoryName}" (${categoryKey}) -> UUID: ${validId}`);
        
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

      console.log('📋 Dados das categorias processados:', categoryData);

      // 3. Inserir todas as categorias de uma vez
      console.log('📥 Inserindo todas as categorias...');
      const { data: insertedData, error: insertError } = await supabase
        .from('law_categories')
        .insert(categoryData)
        .select();

      if (insertError) {
        console.error('❌ Erro ao inserir categorias:', insertError);
        throw insertError;
      }

      console.log('✅ Todas as categorias inseridas:', insertedData?.length);

      // 4. Atualizar estado local com dados corretos
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
      console.log('🎉 CATEGORIAS SALVAS COM SUCESSO:', updatedCategories.length);
      
      return updatedCategories;
    } catch (error) {
      console.error('💥 ERRO CRÍTICO ao salvar categorias:', error);
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
