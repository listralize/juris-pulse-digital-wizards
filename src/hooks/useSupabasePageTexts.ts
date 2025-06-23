
import { useState, useEffect } from 'react';
import { PageTexts } from '../types/adminTypes';
import { supabase } from '../integrations/supabase/client';
import { defaultPageTexts } from '../data/defaultPageTexts';

export const useSupabasePageTexts = () => {
  const [pageTexts, setPageTexts] = useState<PageTexts>(defaultPageTexts);
  const [isLoading, setIsLoading] = useState(true);

  const loadPageTexts = async () => {
    console.log('🔄 [useSupabasePageTexts] Carregando textos das páginas...');
    setIsLoading(true);
    
    try {
      const { data: settings, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('❌ Erro ao carregar configurações:', error);
        setPageTexts(defaultPageTexts);
        setIsLoading(false);
        return;
      }

      if (settings) {
        const loadedTexts: PageTexts = {
          heroTitle: settings.hero_title || defaultPageTexts.heroTitle,
          heroSubtitle: settings.hero_subtitle || defaultPageTexts.heroSubtitle,
          heroBackgroundImage: settings.hero_background_image || defaultPageTexts.heroBackgroundImage,
          heroPrimaryButtonText: settings.hero_primary_button_text || defaultPageTexts.heroPrimaryButtonText,
          heroPrimaryButtonLink: settings.hero_primary_button_link || defaultPageTexts.heroPrimaryButtonLink,
          heroSecondaryButtonText: settings.hero_secondary_button_text || defaultPageTexts.heroSecondaryButtonText,
          heroSecondaryButtonLink: settings.hero_secondary_button_link || defaultPageTexts.heroSecondaryButtonLink,
          aboutTitle: settings.about_title || defaultPageTexts.aboutTitle,
          aboutDescription: settings.about_description || defaultPageTexts.aboutDescription,
          aboutImage: settings.about_image || defaultPageTexts.aboutImage,
          aboutMediaType: settings.about_media_type || defaultPageTexts.aboutMediaType,
          areasTitle: settings.areas_title || defaultPageTexts.areasTitle,
          teamTitle: settings.team_title || defaultPageTexts.teamTitle,
          clientAreaTitle: settings.client_area_title || defaultPageTexts.clientAreaTitle,
          clientAreaDescription: settings.client_area_description || defaultPageTexts.clientAreaDescription,
          clientPortalLink: settings.client_portal_link || defaultPageTexts.clientPortalLink,
          contactTitle: settings.contact_title || defaultPageTexts.contactTitle,
          contactSubtitle: settings.contact_subtitle || defaultPageTexts.contactSubtitle,
          
          // Usar defaults para campos não mapeados
          familiaTitle: defaultPageTexts.familiaTitle,
          familiaDescription: defaultPageTexts.familiaDescription,
          tributarioTitle: defaultPageTexts.tributarioTitle,
          tributarioDescription: defaultPageTexts.tributarioDescription,
          empresarialTitle: defaultPageTexts.empresarialTitle,
          empresarialDescription: defaultPageTexts.empresarialDescription,
          trabalhoTitle: defaultPageTexts.trabalhoTitle,
          trabalhoDescription: defaultPageTexts.trabalhoDescription,
          civilTitle: defaultPageTexts.civilTitle,
          civilDescription: defaultPageTexts.civilDescription,
          previdenciarioTitle: defaultPageTexts.previdenciarioTitle,
          previdenciarioDescription: defaultPageTexts.previdenciarioDescription,
          consumidorTitle: defaultPageTexts.consumidorTitle,
          consumidorDescription: defaultPageTexts.consumidorDescription,
          constitucionalTitle: defaultPageTexts.constitucionalTitle,
          constitucionalDescription: defaultPageTexts.constitucionalDescription,
          administrativoTitle: defaultPageTexts.administrativoTitle,
          administrativoDescription: defaultPageTexts.administrativoDescription,
          
          contactTexts: defaultPageTexts.contactTexts,
          footerTexts: defaultPageTexts.footerTexts,
          categoryTexts: defaultPageTexts.categoryTexts
        };
        
        setPageTexts(loadedTexts);
        console.log('✅ [useSupabasePageTexts] Textos carregados:', loadedTexts);
      } else {
        console.log('ℹ️ [useSupabasePageTexts] Nenhuma configuração encontrada, usando defaults');
        setPageTexts(defaultPageTexts);
      }
    } catch (error) {
      console.error('❌ Erro crítico ao carregar textos:', error);
      setPageTexts(defaultPageTexts);
    } finally {
      setIsLoading(false);
    }
  };

  const savePageTexts = async (texts: PageTexts) => {
    console.log('💾 [useSupabasePageTexts] Salvando textos das páginas...', texts);
    
    try {
      // Buscar o registro único (se existe)
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      const dataToSave = {
        hero_title: texts.heroTitle,
        hero_subtitle: texts.heroSubtitle,
        hero_background_image: texts.heroBackgroundImage,
        hero_primary_button_text: texts.heroPrimaryButtonText,
        hero_primary_button_link: texts.heroPrimaryButtonLink,
        hero_secondary_button_text: texts.heroSecondaryButtonText,
        hero_secondary_button_link: texts.heroSecondaryButtonLink,
        about_title: texts.aboutTitle,
        about_description: texts.aboutDescription,
        about_image: texts.aboutImage,
        about_media_type: texts.aboutMediaType,
        areas_title: texts.areasTitle,
        team_title: texts.teamTitle,
        client_area_title: texts.clientAreaTitle,
        client_area_description: texts.clientAreaDescription,
        client_portal_link: texts.clientPortalLink,
        contact_title: texts.contactTitle,
        contact_subtitle: texts.contactSubtitle,
        updated_at: new Date().toISOString()
      };

      let result;
      if (existing) {
        console.log('📝 Atualizando registro único existente:', existing.id);
        result = await supabase
          .from('site_settings')
          .update(dataToSave)
          .eq('id', existing.id);
      } else {
        console.log('➕ Inserindo primeiro registro');
        result = await supabase
          .from('site_settings')
          .insert(dataToSave);
      }

      if (result.error) {
        console.error('❌ Erro ao salvar textos:', result.error);
        throw result.error;
      }

      // Atualizar estado local imediatamente
      setPageTexts(texts);
      console.log('✅ [useSupabasePageTexts] Textos salvos com sucesso!');
      
      // Disparar evento customizado para atualizar as seções em tempo real
      console.log('📡 Disparando evento pageTextsUpdated');
      const event = new CustomEvent('pageTextsUpdated', { 
        detail: texts 
      });
      window.dispatchEvent(event);
      
    } catch (error) {
      console.error('❌ Erro crítico ao salvar textos:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadPageTexts();
  }, []);

  return {
    pageTexts,
    isLoading,
    loadPageTexts,
    savePageTexts,
    setPageTexts,
    refetch: loadPageTexts
  };
};
