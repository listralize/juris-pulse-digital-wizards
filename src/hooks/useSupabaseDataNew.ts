
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

  // Carregar dados do Supabase
  const loadData = async () => {
    try {
      console.log('Carregando dados do novo esquema Supabase...');
      
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

      // Carregar categorias
      const { data: categoriesData } = await supabase
        .from('law_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      // Carregar páginas de serviços com relacionamentos
      const { data: servicePagesData } = await supabase
        .from('service_pages')
        .select(`
          *,
          law_categories(category_key, name),
          service_benefits(*),
          service_process_steps(*),
          service_faq(*),
          service_testimonials(*)
        `)
        .eq('is_active', true)
        .order('display_order');

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

      // Montar dados das categorias
      if (categoriesData) {
        const formattedCategories: CategoryInfo[] = categoriesData.map(cat => ({
          id: cat.id,
          value: cat.category_key,
          label: cat.name,
          name: cat.name,
          description: cat.description || '',
          icon: cat.icon || 'FileText',
          color: cat.color || 'bg-gray-500'
        }));
        setCategories(formattedCategories);
      }

      // Montar dados das páginas de serviços
      if (servicePagesData) {
        const formattedServicePages: ServicePage[] = servicePagesData.map(page => ({
          id: page.id,
          title: page.title,
          description: page.description || '',
          category: page.law_categories?.category_key || '',
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
        }));
        setServicePages(formattedServicePages);
      }

    } catch (error) {
      console.error('Erro ao carregar dados do Supabase:', error);
    }
    
    setIsLoading(false);
  };

  // Salvar configurações do site
  const savePageTexts = async (texts: PageTexts) => {
    try {
      // Atualizar configurações do site
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

      // Atualizar informações de contato
      await supabase
        .from('contact_info')
        .upsert({
          phone: texts.contactTexts.phone,
          email: texts.contactTexts.email,
          address: texts.contactTexts.address,
          whatsapp: texts.contactTexts.whatsapp,
          updated_at: new Date().toISOString()
        });

      // Atualizar informações do rodapé
      await supabase
        .from('footer_info')
        .upsert({
          company_name: texts.footerTexts.companyName,
          description: texts.footerTexts.description,
          updated_at: new Date().toISOString()
        });

      setPageTexts(texts);
      console.log('Configurações salvas no Supabase com sucesso');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      throw error;
    }
  };

  // Salvar membros da equipe
  const saveTeamMembers = async (members: TeamMember[]) => {
    try {
      // Primeiro, desativar todos os membros existentes
      await supabase
        .from('team_members')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      // Inserir/atualizar novos membros, garantindo UUIDs válidos
      const memberData = members.map((member, index) => ({
        id: isValidUUID(member.id) ? member.id : generateValidUUID(),
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
      console.log('Equipe salva no Supabase com sucesso');
    } catch (error) {
      console.error('Erro ao salvar equipe:', error);
      throw error;
    }
  };

  // Salvar páginas de serviços - versão corrigida com UUIDs válidos
  const saveServicePages = async (pages: ServicePage[]) => {
    try {
      console.log('Iniciando salvamento das páginas de serviços...', pages.length);
      
      // Primeiro, desativar todas as páginas existentes
      await supabase
        .from('service_pages')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      // Para cada página, salvar página principal e relacionamentos
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        console.log(`Salvando página ${i + 1}/${pages.length}: ${page.title}`);

        // Gerar UUID válido se necessário
        const validPageId = isValidUUID(page.id) ? page.id : generateValidUUID();

        // Encontrar categoria correspondente
        const category = categories.find(cat => cat.value === page.category);
        
        // Salvar página principal
        const { data: savedPage, error: pageError } = await supabase
          .from('service_pages')
          .upsert({
            id: validPageId,
            title: page.title,
            description: page.description,
            href: page.href,
            category_id: category?.id,
            display_order: i,
            is_active: true,
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (pageError) {
          console.error('Erro ao salvar página:', pageError);
          continue;
        }

        console.log('Página salva:', savedPage.title);

        // Limpar relacionamentos existentes
        await Promise.all([
          supabase.from('service_benefits').delete().eq('service_page_id', validPageId),
          supabase.from('service_process_steps').delete().eq('service_page_id', validPageId),
          supabase.from('service_faq').delete().eq('service_page_id', validPageId),
          supabase.from('service_testimonials').delete().eq('service_page_id', validPageId)
        ]);

        // Salvar benefícios
        if (page.benefits && page.benefits.length > 0) {
          const benefitsData = page.benefits.map((benefit, index) => ({
            service_page_id: validPageId,
            title: benefit.title,
            description: benefit.description || '',
            icon: benefit.icon,
            display_order: index
          }));

          await supabase.from('service_benefits').insert(benefitsData);
          console.log(`Salvos ${benefitsData.length} benefícios para ${page.title}`);
        }

        // Salvar processos
        if (page.process && page.process.length > 0) {
          const processData = page.process.map((step, index) => ({
            service_page_id: validPageId,
            step_number: step.step,
            title: step.title,
            description: step.description || '',
            display_order: index
          }));

          await supabase.from('service_process_steps').insert(processData);
          console.log(`Salvos ${processData.length} passos de processo para ${page.title}`);
        }

        // Salvar FAQ
        if (page.faq && page.faq.length > 0) {
          const faqData = page.faq.map((faq, index) => ({
            service_page_id: validPageId,
            question: faq.question,
            answer: faq.answer,
            display_order: index
          }));

          await supabase.from('service_faq').insert(faqData);
          console.log(`Salvos ${faqData.length} FAQs para ${page.title}`);
        }

        // Salvar depoimentos
        if (page.testimonials && page.testimonials.length > 0) {
          const testimonialsData = page.testimonials.map((testimonial, index) => ({
            service_page_id: validPageId,
            name: testimonial.name,
            text: testimonial.text,
            role: testimonial.role,
            image: testimonial.image,
            display_order: index
          }));

          await supabase.from('service_testimonials').insert(testimonialsData);
          console.log(`Salvos ${testimonialsData.length} depoimentos para ${page.title}`);
        }
      }

      setServicePages(pages);
      console.log('Todas as páginas de serviços foram salvas no Supabase com sucesso');
    } catch (error) {
      console.error('Erro ao salvar páginas de serviços:', error);
      throw error;
    }
  };

  // Salvar categorias
  const saveCategories = async (cats: CategoryInfo[]) => {
    try {
      // Primeiro, desativar todas as categorias existentes
      await supabase
        .from('law_categories')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      const categoryData = cats.map((cat, index) => ({
        id: isValidUUID(cat.id || '') ? cat.id : generateValidUUID(),
        category_key: cat.value,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        color: cat.color,
        display_order: index,
        is_active: true,
        updated_at: new Date().toISOString()
      }));

      await supabase
        .from('law_categories')
        .upsert(categoryData);

      setCategories(cats);
      console.log('Categorias salvas no Supabase com sucesso');
    } catch (error) {
      console.error('Erro ao salvar categorias:', error);
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
