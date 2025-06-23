
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { PageTexts } from '../types/adminTypes';

export const useSupabasePageTexts = () => {
  const [pageTexts, setPageTexts] = useState<PageTexts>({
    heroTitle: 'Excelência em Advocacia',
    heroSubtitle: 'Defendemos seus direitos com dedicação e expertise',
    heroBackgroundImage: '',
    heroPrimaryButtonText: 'Fale Conosco no WhatsApp',
    heroPrimaryButtonLink: 'https://api.whatsapp.com/send?phone=5562994594496',
    heroSecondaryButtonText: 'Conheça Nossas Áreas de Atuação',
    heroSecondaryButtonLink: '#areas',
    aboutTitle: 'Sobre Nós',
    aboutDescription: 'Somos um escritório de advocacia com mais de 20 anos de experiência, oferecendo serviços jurídicos de excelência em diversas áreas do direito.',
    aboutImage: '/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png',
    aboutMediaType: 'image' as 'image' | 'video',
    areasTitle: 'Áreas de Atuação',
    teamTitle: 'Nossa Equipe',
    clientAreaTitle: 'Área do Cliente',
    clientAreaDescription: 'Acesse informações exclusivas e acompanhe seus processos',
    clientPortalLink: '',
    contactTitle: 'Entre em Contato',
    contactSubtitle: 'Estamos prontos para ajudá-lo',
    familiaTitle: 'Direito de Família',
    familiaDescription: 'Assessoria completa em questões familiares',
    tributarioTitle: 'Direito Tributário',
    tributarioDescription: 'Consultoria e defesa em questões fiscais',
    empresarialTitle: 'Direito Empresarial',
    empresarialDescription: 'Soluções jurídicas para empresas',
    trabalhoTitle: 'Direito do Trabalho',
    trabalhoDescription: 'Defesa dos direitos trabalhistas',
    civilTitle: 'Direito Civil',
    civilDescription: 'Questões cíveis em geral',
    previdenciarioTitle: 'Direito Previdenciário',
    previdenciarioDescription: 'Benefícios e aposentadorias',
    consumidorTitle: 'Direito do Consumidor',
    consumidorDescription: 'Defesa dos direitos do consumidor',
    constitucionalTitle: 'Direito Constitucional',
    constitucionalDescription: 'Proteção dos direitos fundamentais',
    administrativoTitle: 'Direito Administrativo',
    administrativoDescription: 'Atuação junto ao poder público',
    contactTexts: {
      phone: '(62) 99459-4496',
      email: 'contato@stadv.com',
      address: 'World Trade Center, Torre Office e Corporate, Av. D, Av. 85 - St. Marista, Goiânia - GO, 74150-040',
      whatsapp: '5562994594496',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.8377!2d-49.2647!3d-16.6869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef1b5d8b00001%3A0x1234567890abcdef!2sWorld%20Trade%20Center%20Goi%C3%A2nia!5e0!3m2!1spt!2sbr!4v1234567890123'
    },
    footerTexts: {
      companyName: 'Serafim & Trombela Advocacia',
      description: 'A história do Serafim & Trombela Advocacia é moldada pelo compromisso com a excelência jurídica e o sucesso de nossos clientes.'
    },
    categoryTexts: []
  });

  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados iniciais
  useEffect(() => {
    const loadPageTexts = async () => {
      try {
        console.log('📝 [useSupabasePageTexts] INÍCIO - Carregando textos das páginas...');
        setIsLoading(true);
        
        // Carregar configurações do site
        const { data: settings, error: settingsError } = await supabase
          .from('site_settings')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Carregar dados de contato
        const { data: contactInfo, error: contactError } = await supabase
          .from('contact_info')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Carregar dados do footer
        const { data: footerInfo, error: footerError } = await supabase
          .from('footer_info')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settingsError) {
          console.error('❌ Erro ao carregar settings:', settingsError);
        }

        if (contactError) {
          console.error('❌ Erro ao carregar contact info:', contactError);
        }

        if (footerError) {
          console.error('❌ Erro ao carregar footer info:', footerError);
        }

        console.log('📊 Dados carregados:', { settings, contactInfo, footerInfo });

        // Montar objeto de dados completo
        const loadedData: PageTexts = {
          ...pageTexts,
          ...(settings && {
            heroTitle: settings.hero_title || pageTexts.heroTitle,
            heroSubtitle: settings.hero_subtitle || pageTexts.heroSubtitle,
            heroBackgroundImage: settings.hero_background_image || pageTexts.heroBackgroundImage,
            aboutTitle: settings.about_title || pageTexts.aboutTitle,
            aboutDescription: settings.about_description || pageTexts.aboutDescription,
            aboutImage: settings.about_image || pageTexts.aboutImage,
            aboutMediaType: (settings.about_media_type === 'video' ? 'video' : 'image') as 'image' | 'video',
            areasTitle: settings.areas_title || pageTexts.areasTitle,
            teamTitle: settings.team_title || pageTexts.teamTitle,
            clientAreaTitle: settings.client_area_title || pageTexts.clientAreaTitle,
            clientAreaDescription: settings.client_area_description || pageTexts.clientAreaDescription,
            clientPortalLink: settings.client_portal_link || pageTexts.clientPortalLink,
            contactTitle: settings.contact_title || pageTexts.contactTitle,
            contactSubtitle: settings.contact_subtitle || pageTexts.contactSubtitle
          }),
          contactTexts: {
            ...pageTexts.contactTexts,
            ...(contactInfo && {
              phone: contactInfo.phone || pageTexts.contactTexts.phone,
              email: contactInfo.email || pageTexts.contactTexts.email,
              address: contactInfo.address || pageTexts.contactTexts.address,
              whatsapp: contactInfo.whatsapp || pageTexts.contactTexts.whatsapp,
              mapEmbedUrl: contactInfo.map_embed_url || pageTexts.contactTexts.mapEmbedUrl
            })
          },
          footerTexts: {
            ...pageTexts.footerTexts,
            ...(footerInfo && {
              companyName: footerInfo.company_name || pageTexts.footerTexts.companyName,
              description: footerInfo.description || pageTexts.footerTexts.description
            })
          }
        };

        console.log('✅ [useSupabasePageTexts] Dados consolidados:', loadedData);
        setPageTexts(loadedData);
        
      } catch (error) {
        console.error('❌ [useSupabasePageTexts] Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPageTexts();
  }, []);

  const savePageTexts = async (newTexts: PageTexts) => {
    try {
      console.log('💾 [useSupabasePageTexts] INÍCIO - Salvando textos das páginas...', newTexts);

      // 1. Salvar dados principais do site
      const { data: existingSiteSettings, error: selectSiteError } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (selectSiteError && selectSiteError.code !== 'PGRST116') {
        throw selectSiteError;
      }

      const siteData = {
        hero_title: newTexts.heroTitle,
        hero_subtitle: newTexts.heroSubtitle,
        hero_background_image: newTexts.heroBackgroundImage,
        about_title: newTexts.aboutTitle,
        about_description: newTexts.aboutDescription,
        about_image: newTexts.aboutImage,
        about_media_type: newTexts.aboutMediaType || 'image',
        areas_title: newTexts.areasTitle,
        team_title: newTexts.teamTitle,
        client_area_title: newTexts.clientAreaTitle,
        client_area_description: newTexts.clientAreaDescription,
        client_portal_link: newTexts.clientPortalLink,
        contact_title: newTexts.contactTitle,
        contact_subtitle: newTexts.contactSubtitle,
        updated_at: new Date().toISOString()
      };

      if (existingSiteSettings) {
        console.log('📝 Atualizando site settings:', existingSiteSettings.id);
        const { error: updateSiteError } = await supabase
          .from('site_settings')
          .update(siteData)
          .eq('id', existingSiteSettings.id);

        if (updateSiteError) throw updateSiteError;
      } else {
        console.log('➕ Criando novo site settings');
        const { error: insertSiteError } = await supabase
          .from('site_settings')
          .insert(siteData);

        if (insertSiteError) throw insertSiteError;
      }

      // 2. Salvar dados de contato
      if (newTexts.contactTexts) {
        const { data: existingContactInfo, error: selectContactError } = await supabase
          .from('contact_info')
          .select('id')
          .limit(1)
          .maybeSingle();

        if (selectContactError && selectContactError.code !== 'PGRST116') {
          throw selectContactError;
        }

        const contactData = {
          phone: newTexts.contactTexts.phone,
          email: newTexts.contactTexts.email,
          address: newTexts.contactTexts.address,
          whatsapp: newTexts.contactTexts.whatsapp,
          map_embed_url: newTexts.contactTexts.mapEmbedUrl,
          updated_at: new Date().toISOString()
        };

        if (existingContactInfo) {
          console.log('📞 Atualizando contact info:', existingContactInfo.id);
          const { error: updateContactError } = await supabase
            .from('contact_info')
            .update(contactData)
            .eq('id', existingContactInfo.id);

          if (updateContactError) throw updateContactError;
        } else {
          console.log('➕ Criando novo contact info');
          const { error: insertContactError } = await supabase
            .from('contact_info')
            .insert(contactData);

          if (insertContactError) throw insertContactError;
        }
      }

      // 3. Salvar dados do footer
      if (newTexts.footerTexts) {
        const { data: existingFooterInfo, error: selectFooterError } = await supabase
          .from('footer_info')
          .select('id')
          .limit(1)
          .maybeSingle();

        if (selectFooterError && selectFooterError.code !== 'PGRST116') {
          throw selectFooterError;
        }

        const footerData = {
          company_name: newTexts.footerTexts.companyName,
          description: newTexts.footerTexts.description,
          updated_at: new Date().toISOString()
        };

        if (existingFooterInfo) {
          console.log('👣 Atualizando footer info:', existingFooterInfo.id);
          const { error: updateFooterError } = await supabase
            .from('footer_info')
            .update(footerData)
            .eq('id', existingFooterInfo.id);

          if (updateFooterError) throw updateFooterError;
        } else {
          console.log('➕ Criando novo footer info');
          const { error: insertFooterError } = await supabase
            .from('footer_info')
            .insert(footerData);

          if (insertFooterError) throw insertFooterError;
        }
      }

      console.log('✅ [useSupabasePageTexts] Dados salvos no Supabase com sucesso!');
      
      // 4. Atualizar estado local imediatamente
      setPageTexts(newTexts);
      
      // 5. Disparar eventos personalizados para atualização em tempo real
      console.log('📡 Disparando eventos de atualização...');
      
      // Evento geral para todas as atualizações
      window.dispatchEvent(new CustomEvent('pageTextsUpdated', {
        detail: newTexts
      }));

      console.log('📡 Eventos disparados com sucesso!');

    } catch (error) {
      console.error('❌ [useSupabasePageTexts] Erro ao salvar textos:', error);
      throw error;
    }
  };

  return { pageTexts, setPageTexts, savePageTexts, isLoading };
};
