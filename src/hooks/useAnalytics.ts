import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAnalyticsCleanup } from './useAnalyticsCleanup';

// Função para obter informações do dispositivo e navegador
const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  let deviceType = 'desktop';
  
  if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
    deviceType = /iPad|tablet/.test(userAgent) ? 'tablet' : 'mobile';
  }
  
  let browser = 'Unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  
  return { deviceType, browser };
};

// Função para obter localização aproximada via IP (usando um serviço gratuito)
const getLocationInfo = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown',
      ip: data.ip || 'Unknown'
    };
  } catch (error) {
    console.log('Erro ao obter localização:', error);
    return {
      country: 'Unknown',
      city: 'Unknown',
      ip: 'Unknown'
    };
  }
};

// Gerar ID único para sessão
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Gerar ID único para visitante (persiste no localStorage)
const getOrCreateVisitorId = () => {
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
};

export const useAnalytics = () => {
  const sessionId = useRef<string>(generateSessionId());
  const visitorId = useRef<string>(getOrCreateVisitorId());
  const pageLoadTime = useRef<Date>(new Date());
  const hasTrackedPageView = useRef<boolean>(false);

  // Ativar sistema de limpeza automática
  useAnalyticsCleanup();

  // Função para rastrear visualização de página
  const trackPageView = async (pageUrl?: string, pageTitle?: string) => {
    try {
      const { deviceType, browser } = getDeviceInfo();
      const locationInfo = await getLocationInfo();
      
      const analyticsData = {
        session_id: sessionId.current,
        visitor_id: visitorId.current,
        page_url: pageUrl || window.location.href,
        page_title: pageTitle || document.title,
        timestamp: new Date().toISOString(),
        session_start: pageLoadTime.current.toISOString(),
        country: locationInfo.country,
        city: locationInfo.city,
        device_type: deviceType,
        browser: browser,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
        ip_address: locationInfo.ip,
        screen_resolution: `${screen.width}x${screen.height}`,
        time_on_page: 0,
        scroll_depth: 0,
        session_duration: 0,
        bounce: false
      };

      console.log('📊 Enviando dados de analytics:', analyticsData);

      const { error } = await supabase
        .from('website_analytics')
        .insert([analyticsData]);

      if (error) {
        console.error('Erro ao salvar analytics:', error);
      } else {
        console.log('✅ Analytics salvos com sucesso');
      }
    } catch (error) {
      console.error('Erro no tracking de page view:', error);
    }
  };

  // Função para rastrear conversão (envio de formulário)
  const trackConversion = async (formId: string, formName: string, formData: any, campaignData?: any) => {
    try {
      const conversionData = {
        session_id: sessionId.current,
        visitor_id: visitorId.current,
        event_type: 'form_submission',
        event_action: 'submit',
        event_category: 'lead_generation',
        event_label: formId,
        form_id: formId,
        form_name: formName,
        page_url: window.location.href,
        timestamp: new Date().toISOString(),
        lead_data: JSON.stringify(formData),
        conversion_value: formId === 'whatsapp_button' ? 50 : 100, // Valor baseado no tipo
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        campaign_source: campaignData?.source || 'direct',
        campaign_medium: campaignData?.medium || 'none',
        campaign_name: campaignData?.campaign || 'organic'
      };

      console.log('🎯 Enviando dados de conversão:', conversionData);

      const { error } = await supabase
        .from('conversion_events')
        .insert([conversionData]);

      if (error) {
        console.error('Erro ao salvar conversão:', error);
      } else {
        console.log('✅ Conversão salva com sucesso');
      }
    } catch (error) {
      console.error('Erro no tracking de conversão:', error);
    }
  };

  // Rastrear automaticamente a visualização da página quando o hook é usado
  useEffect(() => {
    if (!hasTrackedPageView.current) {
      trackPageView();
      hasTrackedPageView.current = true;
    }

    // Rastrear tempo na página e scroll quando o usuário sair
    const handleBeforeUnload = () => {
      const timeOnPage = Math.floor((Date.now() - pageLoadTime.current.getTime()) / 1000);
      const scrollDepth = Math.floor((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      // Enviar dados de sessão finalizada (usando navigator.sendBeacon para ser mais confiável)
      const sessionData = {
        session_id: sessionId.current,
        time_on_page: timeOnPage,
        scroll_depth: Math.min(scrollDepth, 100),
        session_duration: timeOnPage
      };

      navigator.sendBeacon('/api/analytics/session-end', JSON.stringify(sessionData));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return {
    trackPageView,
    trackConversion,
    sessionId: sessionId.current,
    visitorId: visitorId.current
  };
};
