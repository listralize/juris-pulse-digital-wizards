import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

// Função para obter localização aproximada via IP (não-bloqueante)
const getLocationInfo = async () => {
  try {
    // Timeout de 3 segundos para não travar o carregamento
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error('Response not ok');
    
    const data = await response.json();
    return {
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown',
      ip: data.ip || 'Unknown'
    };
  } catch (error) {
    console.log('Erro ao obter localização (não crítico):', error);
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

  // Função para rastrear visualização de página (não-bloqueante)
  const trackPageView = async (pageUrl?: string, pageTitle?: string) => {
    // Executar de forma assíncrona sem bloquear o carregamento
    setTimeout(async () => {
      try {
        const { deviceType, browser } = getDeviceInfo();
        // Obter localização de forma não-bloqueante
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
          // Não é crítico se falhar
          console.log('Analytics error (não crítico):', error.message);
        } else {
          console.log('✅ Analytics salvos com sucesso');
        }
      } catch (error) {
        console.log('Erro no tracking de page view (não crítico):', error);
      }
    }, 1000); // Delay de 1 segundo para não afetar o carregamento inicial
  };

  // Função para rastrear conversão (envio de formulário)
  const trackConversion = async (formId: string, formName: string, formData: any, campaignData?: any) => {
    // Executar de forma assíncrona
    setTimeout(async () => {
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
          conversion_value: 100, // Valor estimado do lead
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
          console.log('Erro ao salvar conversão (não crítico):', error.message);
        } else {
          console.log('✅ Conversão salva com sucesso');
        }
      } catch (error) {
        console.log('Erro no tracking de conversão (não crítico):', error);
      }
    }, 500);
  };

  // Rastrear automaticamente a visualização da página quando o hook é usado
  useEffect(() => {
    // Executar de forma não-bloqueante
    if (!hasTrackedPageView.current) {
      trackPageView();
      hasTrackedPageView.current = true;
    }

    // Rastrear tempo na página e scroll quando o usuário sair
    const handleBeforeUnload = () => {
      try {
        const timeOnPage = Math.floor((Date.now() - pageLoadTime.current.getTime()) / 1000);
        const scrollDepth = Math.floor((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        // Tentar enviar dados de sessão finalizada sem bloquear
        const sessionData = {
          session_id: sessionId.current,
          time_on_page: timeOnPage,
          scroll_depth: Math.min(scrollDepth, 100),
          session_duration: timeOnPage
        };

        // Remover beacon para endpoint inexistente - apenas log local
        console.log('📊 Sessão finalizada:', sessionData);
      } catch (error) {
        console.log('Erro no beforeunload (não crítico):', error);
      }
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