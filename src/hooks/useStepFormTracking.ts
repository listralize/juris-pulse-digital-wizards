import { useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getOrCreateVisitorId } from '@/hooks/useAnalytics';

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/Mobile|Android|iPhone/.test(ua)) return 'mobile';
  if (/iPad|tablet/.test(ua)) return 'tablet';
  return 'desktop';
};

const generateSessionId = () => `sf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useStepFormTracking = (formSlug: string) => {
  const sessionId = useRef(generateSessionId());
  const visitorId = useRef(getOrCreateVisitorId());
  const trackedSteps = useRef<Set<string>>(new Set());

  const trackEvent = useCallback(async (
    stepId: string,
    eventType: string,
    optionValue?: string,
    partialData?: Record<string, any>
  ) => {
    try {
      await supabase.from('step_form_events').insert({
        form_slug: formSlug,
        session_id: sessionId.current,
        visitor_id: visitorId.current,
        step_id: stepId,
        event_type: eventType,
        option_value: optionValue || null,
        partial_data: partialData || {},
        device_type: getDeviceType(),
      });
    } catch (err) {
      console.error('Erro ao rastrear evento:', err);
    }
  }, [formSlug]);

  const trackStepView = useCallback((stepId: string) => {
    if (trackedSteps.current.has(stepId)) return;
    trackedSteps.current.add(stepId);
    trackEvent(stepId, 'step_view');
  }, [trackEvent]);

  const trackOptionClick = useCallback((stepId: string, optionValue: string) => {
    trackEvent(stepId, 'option_click', optionValue);
  }, [trackEvent]);

  const trackFormStart = useCallback((stepId: string) => {
    trackEvent(stepId, 'form_start');
  }, [trackEvent]);

  const trackFormSubmit = useCallback((stepId: string) => {
    trackEvent(stepId, 'form_submit');
  }, [trackEvent]);

  const trackAbandonment = useCallback((stepId: string, partialData: Record<string, any>) => {
    trackEvent(stepId, 'form_abandon', undefined, partialData);
  }, [trackEvent]);

  return {
    trackStepView,
    trackOptionClick,
    trackFormStart,
    trackFormSubmit,
    trackAbandonment,
    sessionId: sessionId.current,
  };
};
