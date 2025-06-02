
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
    }
  };

  // Salvar membros da equipe
  const saveTeamMembers = async (members: TeamMember[]) => {
    try {
      // Primeiro, desativar todos os membros existentes
      await supabase
        .from('team_members')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000'); // dummy condition

      // Inserir/atualizar novos membros
      const memberData = members.map((member, index) => ({
        id: member.id,
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
    }
  };

  // Salvar páginas de serviços
  const saveServicePages = async (pages: ServicePage[]) => {
    try {
      // Esta função será mais complexa pois precisa salvar relacionamentos
      // Por agora, vamos apenas atualizar o estado local
      setServicePages(pages);
      console.log('Páginas de serviços atualizadas localmente');
    } catch (error) {
      console.error('Erro ao salvar páginas de serviços:', error);
    }
  };

  // Salvar categorias
  const saveCategories = async (cats: CategoryInfo[]) => {
    try {
      const categoryData = cats.map((cat, index) => ({
        id: cat.id,
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
