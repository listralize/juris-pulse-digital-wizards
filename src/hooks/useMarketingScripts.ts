
import { useEffect, useState } from 'react';

interface ScriptStatus {
  facebookPixel: boolean;
  googleAnalytics: boolean;
  googleTagManager: boolean;
  customScripts: boolean;
}

export const useMarketingScripts = () => {
  const [scriptStatus, setScriptStatus] = useState<ScriptStatus>({
    facebookPixel: false,
    googleAnalytics: false,
    googleTagManager: false,
    customScripts: false
  });

  const checkScriptStatus = () => {
    const status: ScriptStatus = {
      facebookPixel: typeof (window as any).fbq !== 'undefined',
      googleAnalytics: typeof (window as any).gtag !== 'undefined',
      googleTagManager: typeof (window as any).dataLayer !== 'undefined',
      customScripts: document.querySelectorAll('script[data-marketing="true"]').length > 0
    };

    console.log('📊 Status dos scripts de marketing:', status);
    setScriptStatus(status);
  };

  useEffect(() => {
    // Verificar status inicial
    checkScriptStatus();

    // Verificar periodicamente se os scripts foram carregados
    const interval = setInterval(checkScriptStatus, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const trackEvent = (eventName: string, parameters?: any) => {
    console.log('🎯 Rastreando evento:', eventName, parameters);

    // Facebook Pixel
    if (scriptStatus.facebookPixel && (window as any).fbq) {
      try {
        (window as any).fbq('track', eventName, parameters);
        console.log('📘 Evento enviado para Facebook Pixel');
      } catch (error) {
        console.error('Erro ao enviar evento para Facebook Pixel:', error);
      }
    }

    // Google Analytics
    if (scriptStatus.googleAnalytics && (window as any).gtag) {
      try {
        (window as any).gtag('event', eventName, parameters);
        console.log('📊 Evento enviado para Google Analytics');
      } catch (error) {
        console.error('Erro ao enviar evento para Google Analytics:', error);
      }
    }

    // Google Tag Manager
    if (scriptStatus.googleTagManager && (window as any).dataLayer) {
      try {
        (window as any).dataLayer.push({
          event: eventName,
          ...parameters
        });
        console.log('🏷️ Evento enviado para Google Tag Manager');
      } catch (error) {
        console.error('Erro ao enviar evento para Google Tag Manager:', error);
      }
    }
  };

  return {
    scriptStatus,
    trackEvent,
    checkScriptStatus
  };
};
