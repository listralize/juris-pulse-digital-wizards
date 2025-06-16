
import { useState, useEffect } from 'react';
import { PageTexts } from '../../types/adminTypes';
import { supabase } from '../../integrations/supabase/client';
import { defaultPageTexts } from '../../data/defaultPageTexts';

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
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('❌ [useSupabasePageTexts] Erro ao carregar textos:', error);
        setPageTexts(defaultPageTexts);
      } else if (settings) {
        const loadedTexts: PageTexts = {
          ...defaultPageTexts,
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
          contactTexts: defaultPageTexts.contactTexts
        };
        
        setPageTexts(loadedTexts);
        console.log('✅ [useSupabasePageTexts] Textos carregados com sucesso!', loadedTexts);
      } else {
        console.log('ℹ️ [useSupabasePageTexts] Nenhuma configuração encontrada, usando defaults');
        setPageTexts(defaultPageTexts);
      }
    } catch (error) {
      console.error('❌ [useSupabasePageTexts] Erro crítico ao carregar textos:', error);
      setPageTexts(defaultPageTexts);
    } finally {
      setIsLoading(false);
    }
  };

  const savePageTexts = async (texts: PageTexts) => {
    console.log('💾 [useSupabasePageTexts] Salvando textos das páginas...', texts);
    
    try {
      // Check if record exists
      const { data: existing, error: selectError } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (selectError) {
        console.error('❌ [useSupabasePageTexts] Erro ao verificar registros existentes:', selectError);
      }

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
        contact_subtitle: texts.contactSubtitle
      };

      let result;
      if (existing?.id) {
        // Update existing record
        result = await supabase
          .from('site_settings')
          .update(dataToSave)
          .eq('id', existing.id);
      } else {
        // Insert new record
        result = await supabase
          .from('site_settings')
          .insert([dataToSave]);
      }

      if (result.error) {
        console.error('❌ [useSupabasePageTexts] Erro ao salvar textos:', result.error);
        throw result.error;
      }

      setPageTexts({ ...texts });
      console.log('✅ [useSupabasePageTexts] Textos salvos com sucesso!');
      
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('pageTextsUpdated', { detail: texts }));
      
    } catch (error) {
      console.error('❌ [useSupabasePageTexts] Erro crítico ao salvar textos:', error);
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
