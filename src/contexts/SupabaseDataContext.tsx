import React, { createContext, useEffect, useState } from 'react';
import { useSupabaseDataNew } from '../hooks/useSupabaseDataNew';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

interface SiteSettings {
  hero_title: string;
  hero_subtitle: string;
  hero_primary_button_text: string;
  hero_primary_button_link: string;
  hero_secondary_button_text: string;
  hero_secondary_button_link: string;
  about_title: string;
  about_description: string;
  about_image: string;
  about_media_type: string;
  about_video_storage_url: string;
  areas_title: string;
  team_title: string;
  team_video_enabled: boolean;
  team_background_video: string;
  client_area_title: string;
  client_area_description: string;
  client_portal_link: string;
  contact_title: string;
  contact_subtitle: string;
  hero_background_image: string;
}

interface FooterInfo {
  companyName: string;
  description: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  map_embed_url: string;
  instagram: string;
  instagram_url: string;
}

export interface SupabaseDataContextType {
  // From useSupabaseDataNew
  servicePages: ReturnType<typeof useSupabaseDataNew>['servicePages'];
  categories: ReturnType<typeof useSupabaseDataNew>['categories'];
  teamMembers: ReturnType<typeof useSupabaseDataNew>['teamMembers'];
  pageTexts: ReturnType<typeof useSupabaseDataNew>['pageTexts'];
  isLoading: boolean;
  saveServicePages: ReturnType<typeof useSupabaseDataNew>['saveServicePages'];
  saveCategories: ReturnType<typeof useSupabaseDataNew>['saveCategories'];
  saveTeamMembers: ReturnType<typeof useSupabaseDataNew>['saveTeamMembers'];
  savePageTexts: ReturnType<typeof useSupabaseDataNew>['savePageTexts'];
  setServicePages: ReturnType<typeof useSupabaseDataNew>['setServicePages'];
  setTeamMembers: ReturnType<typeof useSupabaseDataNew>['setTeamMembers'];
  setPageTexts: ReturnType<typeof useSupabaseDataNew>['setPageTexts'];
  refreshData: ReturnType<typeof useSupabaseDataNew>['refreshData'];
  refetchServicePages: ReturnType<typeof useSupabaseDataNew>['refetchServicePages'];
  refetchCategories: ReturnType<typeof useSupabaseDataNew>['refetchCategories'];
  refetchTeam: ReturnType<typeof useSupabaseDataNew>['refetchTeam'];
  refetchPageTexts: ReturnType<typeof useSupabaseDataNew>['refetchPageTexts'];
  // Centralized data
  siteSettings: SiteSettings | null;
  contactInfo: ContactInfo | null;
  footerInfo: FooterInfo | null;
  siteSettingsLoading: boolean;
  contactInfoLoading: boolean;
  footerInfoLoading: boolean;
}

const defaultSiteSettings: SiteSettings = {
  hero_title: 'Excelência em Advocacia',
  hero_subtitle: 'Defendemos seus direitos com dedicação e expertise',
  hero_primary_button_text: 'Fale Conosco',
  hero_primary_button_link: 'https://api.whatsapp.com/send?phone=5562994594496',
  hero_secondary_button_text: 'Conheça Nossas Áreas de Atuação',
  hero_secondary_button_link: '#areas',
  about_title: 'Quem Somos',
  about_description: 'Uma equipe dedicada à excelência jurídica',
  about_image: '/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png',
  about_media_type: 'image',
  about_video_storage_url: '',
  areas_title: 'Áreas de Atuação',
  team_title: 'Nossa Equipe',
  team_video_enabled: false,
  team_background_video: '',
  client_area_title: 'Área do Cliente',
  client_area_description: 'Acesse sua área restrita para acompanhar seus processos',
  client_portal_link: '#',
  contact_title: 'Fale Conosco',
  contact_subtitle: 'Estamos prontos para ajudá-lo',
  hero_background_image: '',
};

const defaultContactInfo: ContactInfo = {
  phone: '',
  email: '',
  address: '',
  whatsapp: '5562994594496',
  map_embed_url: '',
  instagram: '',
  instagram_url: '',
};

const defaultFooterInfo: FooterInfo = {
  companyName: 'Serafim & Trombela Advocacia',
  description: 'A história do Serafim & Trombela Advocacia é moldada pelo compromisso com a excelência jurídica e o sucesso de nossos clientes.',
};

export const SupabaseDataContext = createContext<SupabaseDataContextType | null>(null);

export const SupabaseDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const supabaseData = useSupabaseDataNew();
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [footerInfo, setFooterInfo] = useState<FooterInfo | null>(null);
  const [siteSettingsLoading, setSiteSettingsLoading] = useState(true);
  const [contactInfoLoading, setContactInfoLoading] = useState(true);
  const [footerInfoLoading, setFooterInfoLoading] = useState(true);

  // Load site_settings once
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await supabase
          .from('site_settings')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (data) {
          setSiteSettings({
            hero_title: data.hero_title || defaultSiteSettings.hero_title,
            hero_subtitle: data.hero_subtitle || defaultSiteSettings.hero_subtitle,
            hero_primary_button_text: data.hero_primary_button_text || defaultSiteSettings.hero_primary_button_text,
            hero_primary_button_link: data.hero_primary_button_link || defaultSiteSettings.hero_primary_button_link,
            hero_secondary_button_text: data.hero_secondary_button_text || defaultSiteSettings.hero_secondary_button_text,
            hero_secondary_button_link: data.hero_secondary_button_link || defaultSiteSettings.hero_secondary_button_link,
            about_title: data.about_title || defaultSiteSettings.about_title,
            about_description: data.about_description || defaultSiteSettings.about_description,
            about_image: data.about_image || defaultSiteSettings.about_image,
            about_media_type: data.about_media_type || defaultSiteSettings.about_media_type,
            about_video_storage_url: data.about_video_storage_url || defaultSiteSettings.about_video_storage_url,
            areas_title: data.areas_title || defaultSiteSettings.areas_title,
            team_title: data.team_title || defaultSiteSettings.team_title,
            team_video_enabled: data.team_video_enabled ?? defaultSiteSettings.team_video_enabled,
            team_background_video: data.team_background_video || defaultSiteSettings.team_background_video,
            client_area_title: data.client_area_title || defaultSiteSettings.client_area_title,
            client_area_description: data.client_area_description || defaultSiteSettings.client_area_description,
            client_portal_link: data.client_portal_link || defaultSiteSettings.client_portal_link,
            contact_title: data.contact_title || defaultSiteSettings.contact_title,
            contact_subtitle: data.contact_subtitle || defaultSiteSettings.contact_subtitle,
            hero_background_image: data.hero_background_image || defaultSiteSettings.hero_background_image,
          });
        } else {
          setSiteSettings(defaultSiteSettings);
        }
      } catch (error) {
        logger.error('❌ Error loading site_settings:', error);
        setSiteSettings(defaultSiteSettings);
      } finally {
        setSiteSettingsLoading(false);
      }
    };
    load();
  }, []);

  // Load contact_info once
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await supabase
          .from('contact_info')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (data) {
          setContactInfo({
            phone: data.phone || '',
            email: data.email || '',
            address: data.address || '',
            whatsapp: data.whatsapp || defaultContactInfo.whatsapp,
            map_embed_url: data.map_embed_url || '',
            instagram: data.instagram || '',
            instagram_url: data.instagram_url || '',
          });
        } else {
          setContactInfo(defaultContactInfo);
        }
      } catch (error) {
        logger.error('Error loading contact_info:', error);
        setContactInfo(defaultContactInfo);
      } finally {
        setContactInfoLoading(false);
      }
    };
    load();
  }, []);

  // Load footer_info once
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await supabase
          .from('footer_info')
          .select('company_name, description')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (data) {
          setFooterInfo({
            companyName: data.company_name || defaultFooterInfo.companyName,
            description: data.description || defaultFooterInfo.description,
          });
        } else {
          setFooterInfo(defaultFooterInfo);
        }
      } catch (error) {
        logger.error('Error loading footer_info:', error);
        setFooterInfo(defaultFooterInfo);
      } finally {
        setFooterInfoLoading(false);
      }
    };
    load();
  }, []);

  // Listen for admin updates to site_settings
  useEffect(() => {
    const handleSiteSettingsUpdate = (event: CustomEvent) => {
      const data = event.detail;
      setSiteSettings(prev => prev ? { ...prev, ...data } : { ...defaultSiteSettings, ...data });
    };

    window.addEventListener('pageTextsUpdated', handleSiteSettingsUpdate as EventListener);
    window.addEventListener('teamVideoSettingsUpdated', ((event: CustomEvent) => {
      setSiteSettings(prev => prev ? {
        ...prev,
        team_video_enabled: event.detail?.team_video_enabled ?? prev.team_video_enabled,
        team_background_video: event.detail?.team_background_video ?? prev.team_background_video,
      } : null);
    }) as EventListener);
    window.addEventListener('heroVideoSettingsUpdated', ((event: CustomEvent) => {
      setSiteSettings(prev => prev ? {
        ...prev,
        team_video_enabled: Boolean(event.detail?.team_video_enabled),
        team_background_video: event.detail?.team_background_video || '',
      } : null);
    }) as EventListener);

    return () => {
      window.removeEventListener('pageTextsUpdated', handleSiteSettingsUpdate as EventListener);
    };
  }, []);

  const value: SupabaseDataContextType = {
    ...supabaseData,
    siteSettings,
    contactInfo,
    footerInfo,
    siteSettingsLoading,
    contactInfoLoading,
    footerInfoLoading,
  };

  return (
    <SupabaseDataContext.Provider value={value}>
      {children}
    </SupabaseDataContext.Provider>
  );
};
