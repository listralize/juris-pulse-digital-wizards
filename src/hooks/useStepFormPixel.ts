import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useStepFormPixel = (slug: string) => {
  useEffect(() => {
    if (!slug) return;

    const loadPixel = async () => {
      try {
        const { data: stepForm } = await supabase
          .from('step_forms')
          .select('tracking_config')
          .eq('slug', slug)
          .eq('is_active', true)
          .maybeSingle();

        if (stepForm?.tracking_config) {
          const config = stepForm.tracking_config as any;
          const pixelId = config?.pixel_id || config?.facebook_pixel?.pixel_id;
          
          if (pixelId) {
            loadFacebookPixel(pixelId, slug);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar pixel stepform:', error);
      }
    };

    loadPixel();
  }, [slug]);

  const loadFacebookPixel = (pixelId: string, slug: string) => {
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
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
    (window as any)[`fbq_${pixelId}`] = true;

    // Listener para rastrear submissão
    const handleSubmit = (event: CustomEvent) => {
      if (event.detail?.formSlug === slug && (window as any).fbq) {
        (window as any).fbq('track', 'Contact');
        console.log('🚀 Contact enviado para pixel:', pixelId);
      }
    };

    window.addEventListener('stepFormSubmitSuccess', handleSubmit as EventListener);
  };
};