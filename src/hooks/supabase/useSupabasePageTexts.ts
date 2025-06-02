
import { useState } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { PageTexts } from '../../types/adminTypes';

export const useSupabasePageTexts = () => {
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

  const loadPageTexts = async () => {
    try {
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
    } catch (error) {
      console.error('💥 ERRO AO CARREGAR PAGE TEXTS:', error);
    }
  };

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

  return {
    pageTexts,
    loadPageTexts,
    savePageTexts,
    setPageTexts
  };
};
