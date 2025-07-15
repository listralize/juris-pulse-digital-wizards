
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
      customScripts: document.querySelectorAll('script[data-marketing="custom"]').length > 0
    };

    console.log('📊 Status dos scripts:', status);
    setScriptStatus(status);
  };

  useEffect(() => {
    // Verificar status inicial
    checkScriptStatus();

    // Observar mudanças no DOM
    const observer = new MutationObserver(() => {
      checkScriptStatus();
    });

    observer.observe(document.head, { childList: true, subtree: true });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const trackEvent = (eventName: string, parameters?: any) => {
    console.log('🎯 Rastreando evento:', eventName, parameters);

    // Facebook Pixel
    if (scriptStatus.facebookPixel && (window as any).fbq) {
      (window as any).fbq('track', eventName, parameters);
      console.log('📘 Evento enviado para Facebook Pixel');
    }

    // Google Analytics
    if (scriptStatus.googleAnalytics && (window as any).gtag) {
      (window as any).gtag('event', eventName, parameters);
      console.log('📊 Evento enviado para Google Analytics');
    }

    // Google Tag Manager
    if (scriptStatus.googleTagManager && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        ...parameters
      });
      console.log('🏷️ Evento enviado para Google Tag Manager');
    }
  };

  return {
    scriptStatus,
    trackEvent,
    checkScriptStatus
  };
};
