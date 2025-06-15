
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
        console.error('❌ Erro ao carregar textos:', error);
        setPageTexts(defaultPageTexts);
      } else if (settings) {
        const loadedTexts: PageTexts = {
          heroTitle: settings.hero_title || defaultPageTexts.heroTitle,
          heroSubtitle: settings.hero_subtitle || defaultPageTexts.heroSubtitle,
          aboutTitle: settings.about_title || defaultPageTexts.aboutTitle,
          aboutDescription: settings.about_description || defaultPageTexts.aboutDescription,
          areasTitle: settings.areas_title || defaultPageTexts.areasTitle,
          teamTitle: settings.team_title || defaultPageTexts.teamTitle,
          clientAreaTitle: settings.client_area_title || defaultPageTexts.clientAreaTitle,
          clientAreaDescription: settings.client_area_description || defaultPageTexts.clientAreaDescription,
          contactTitle: settings.contact_title || defaultPageTexts.contactTitle,
          contactSubtitle: settings.contact_subtitle || defaultPageTexts.contactSubtitle
        };
        
        setPageTexts(loadedTexts);
        console.log('✅ [useSupabasePageTexts] Textos carregados com sucesso!');
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
    console.log('💾 [useSupabasePageTexts] Salvando textos das páginas...');
    
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          hero_title: texts.heroTitle,
          hero_subtitle: texts.heroSubtitle,
          about_title: texts.aboutTitle,
          about_description: texts.aboutDescription,
          areas_title: texts.areasTitle,
          team_title: texts.teamTitle,
          client_area_title: texts.clientAreaTitle,
          client_area_description: texts.clientAreaDescription,
          contact_title: texts.contactTitle,
          contact_subtitle: texts.contactSubtitle
        });

      if (error) {
        console.error('❌ Erro ao salvar textos:', error);
        throw error;
      }

      setPageTexts({ ...texts });
      console.log('✅ [useSupabasePageTexts] Textos salvos com sucesso!');
      
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
