import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

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

  const trackPageView = async (pageUrl?: string, pageTitle?: string) => {
    try {
      const { deviceType, browser } = getDeviceInfo();
      
      const analyticsData = {
        session_id: sessionId.current,
        visitor_id: visitorId.current,
        page_url: pageUrl || window.location.href,
        page_title: pageTitle || document.title,
        timestamp: new Date().toISOString(),
        session_start: pageLoadTime.current.toISOString(),
        country: 'Unknown',
        city: 'Unknown',
        device_type: deviceType,
        browser: browser,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
        ip_address: null,
        screen_resolution: `${screen.width}x${screen.height}`,
        time_on_page: 0,
        scroll_depth: 0,
        session_duration: 0,
        bounce: false
      };

      const { error } = await supabase
        .from('website_analytics')
        .insert([analyticsData]);

      if (error) {
        console.error('Erro ao salvar analytics:', error);
      }
    } catch (error) {
      console.error('Erro no tracking de page view:', error);
    }
  };

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
        conversion_value: 100,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        campaign_source: campaignData?.source || 'direct',
        campaign_medium: campaignData?.medium || 'none',
        campaign_name: campaignData?.campaign || 'organic'
      };

      const { error } = await supabase
        .from('conversion_events')
        .insert([conversionData]);

      if (error) {
        console.error('Erro ao salvar conversão:', error);
      }
    } catch (error) {
      console.error('Erro no tracking de conversão:', error);
    }
  };

  useEffect(() => {
    if (!hasTrackedPageView.current) {
      trackPageView();
      hasTrackedPageView.current = true;
    }
  }, []);

  return {
    trackPageView,
    trackConversion,
    sessionId: sessionId.current,
    visitorId: visitorId.current
  };
};
