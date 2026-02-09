
import { useState, useEffect } from 'react';
import { PageTexts } from '../../types/adminTypes';
import { supabase } from '../../integrations/supabase/client';
import { defaultPageTexts } from '../../data/defaultPageTexts';
import { logger } from '../../utils/logger';

export const useSupabasePageTexts = () => {
  const [pageTexts, setPageTexts] = useState<PageTexts>(defaultPageTexts);
  const [isLoading, setIsLoading] = useState(true);

  const loadPageTexts = async () => {
    logger.log('[useSupabasePageTexts] Carregando textos...');
    setIsLoading(true);
    
    try {
      const { data: allSettings, error: fetchError } = await supabase
        .from('site_settings')
        .select('*')
        .order('updated_at', { ascending: false });

      if (fetchError) {
        console.error('Erro ao carregar configurações:', fetchError);
        setPageTexts(defaultPageTexts);
        setIsLoading(false);
        return;
      }

      if (allSettings && allSettings.length > 1) {
        logger.log(`Limpando ${allSettings.length - 1} registros duplicados...`);
        const [latestSetting, ...duplicates] = allSettings;
        
        const duplicateIds = duplicates.map(d => d.id);
        if (duplicateIds.length > 0) {
          const { error: deleteError } = await supabase
            .from('site_settings')
            .delete()
            .in('id', duplicateIds);
            
          if (deleteError) {
            console.error('Erro ao deletar duplicados:', deleteError);
          }
        }
        
        const settings = latestSetting;
        const loadedTexts: PageTexts = {
          heroTitle: settings.hero_title || defaultPageTexts.heroTitle,
          heroSubtitle: settings.hero_subtitle || defaultPageTexts.heroSubtitle,
          heroBackgroundImage: settings.hero_background_image || defaultPageTexts.heroBackgroundImage,
          aboutTitle: settings.about_title || defaultPageTexts.aboutTitle,
          aboutDescription: settings.about_description || defaultPageTexts.aboutDescription,
          aboutImage: settings.about_image || defaultPageTexts.aboutImage,
          areasTitle: settings.areas_title || defaultPageTexts.areasTitle,
          teamTitle: settings.team_title || defaultPageTexts.teamTitle,
          clientAreaTitle: settings.client_area_title || defaultPageTexts.clientAreaTitle,
          clientAreaDescription: settings.client_area_description || defaultPageTexts.clientAreaDescription,
          clientPortalLink: settings.client_portal_link || defaultPageTexts.clientPortalLink,
          contactTitle: settings.contact_title || defaultPageTexts.contactTitle,
          contactSubtitle: settings.contact_subtitle || defaultPageTexts.contactSubtitle,
          
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
      } else if (allSettings && allSettings.length === 1) {
        const settings = allSettings[0];
        const loadedTexts: PageTexts = {
          heroTitle: settings.hero_title || defaultPageTexts.heroTitle,
          heroSubtitle: settings.hero_subtitle || defaultPageTexts.heroSubtitle,
          heroBackgroundImage: settings.hero_background_image || defaultPageTexts.heroBackgroundImage,
          aboutTitle: settings.about_title || defaultPageTexts.aboutTitle,
          aboutDescription: settings.about_description || defaultPageTexts.aboutDescription,
          aboutImage: settings.about_image || defaultPageTexts.aboutImage,
          areasTitle: settings.areas_title || defaultPageTexts.areasTitle,
          teamTitle: settings.team_title || defaultPageTexts.teamTitle,
          clientAreaTitle: settings.client_area_title || defaultPageTexts.clientAreaTitle,
          clientAreaDescription: settings.client_area_description || defaultPageTexts.clientAreaDescription,
          clientPortalLink: settings.client_portal_link || defaultPageTexts.clientPortalLink,
          contactTitle: settings.contact_title || defaultPageTexts.contactTitle,
          contactSubtitle: settings.contact_subtitle || defaultPageTexts.contactSubtitle,
          
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
      } else {
        logger.log('[useSupabasePageTexts] Nenhuma configuração encontrada, usando defaults');
        setPageTexts(defaultPageTexts);
      }
    } catch (error) {
      console.error('Erro crítico ao carregar textos:', error);
      setPageTexts(defaultPageTexts);
    } finally {
      setIsLoading(false);
    }
  };

  const savePageTexts = async (texts: PageTexts) => {
    logger.log('[useSupabasePageTexts] Salvando textos...');
    
    try {
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
      };

      let result;
      if (existing) {
        result = await supabase
          .from('site_settings')
          .update(dataToSave)
          .eq('id', existing.id);
      } else {
        result = await supabase
          .from('site_settings')
          .insert(dataToSave);
      }

      if (result.error) {
        console.error('Erro ao salvar textos:', result.error);
        throw result.error;
      }

      setPageTexts(texts);
      
      const event = new CustomEvent('pageTextsUpdated', { 
        detail: texts 
      });
      window.dispatchEvent(event);
      
    } catch (error) {
      console.error('Erro crítico ao salvar textos:', error);
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
