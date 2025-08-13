import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useFormPixel = (formId: string) => {
  useEffect(() => {
    if (!formId) return;

    const loadPixel = async () => {
      try {
        const { data: settings } = await supabase
          .from('marketing_settings')
          .select('form_tracking_config')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings?.form_tracking_config) {
          const config = typeof settings.form_tracking_config === 'string' 
            ? JSON.parse(settings.form_tracking_config) 
            : settings.form_tracking_config;
          
          const formConfig = config.systemForms?.find((f: any) => f.formId === formId && f.enabled);
          
          if (formConfig?.facebookPixel?.enabled && formConfig.facebookPixel.pixelId) {
            loadFacebookPixel(formConfig.facebookPixel.pixelId, formId);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar pixel:', error);
      }
    };

    loadPixel();
  }, [formId]);

  const loadFacebookPixel = (pixelId: string, formId: string) => {
    // Evitar duplicação
    if ((window as any)[`fbq_${pixelId}`]) return;

    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
    `;
    document.head.appendChild(script);
    (window as any)[`fbq_${pixelId}`] = true;

    // Listener para rastrear submissão
    const handleSubmit = (event: CustomEvent) => {
      if (event.detail?.formId === formId && (window as any).fbq) {
        (window as any).fbq('track', 'CompleteRegistration');
        console.log('🚀 CompleteRegistration enviado para pixel:', pixelId);
      }
    };

    document.addEventListener('formSubmitSuccess', handleSubmit as EventListener);
  };
};