import { useEffect } from 'react';

/**
 * Hook que carrega APENAS o Facebook Pixel base sem qualquer evento automático
 * Compatível com useFormMarketingScripts que gerencia eventos específicos
 */
export const useFormOnlyPixel = () => {
  useEffect(() => {
    console.log('🎯 Carregando Facebook Pixel base para formulários...');
    
    // Verificar se já existe
    if ((window as any).fbq) {
      console.log('ℹ️ Facebook Pixel já disponível');
      return;
    }
    
    // Aguardar DOM estar pronto
    const timer = setTimeout(() => {
      loadBasePixel();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const loadBasePixel = () => {
    const pixelId = '1024100955860841';
    
    console.log('📘 Carregando Facebook Pixel BASE APENAS (sem eventos):', pixelId);
    
    // Script externo oficial
    const fbScript = document.createElement('script');
    fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
    fbScript.async = true;
    fbScript.setAttribute('data-pixel', 'base-only');
    document.head.appendChild(fbScript);
    
    // Inicialização mínima sem eventos
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[]}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      
      // Inicializar APENAS - sem eventos automáticos
      fbq('init', '${pixelId}', {}, { 
        autoConfig: false,
        debug: false
      });
      
      // Configurações para evitar tracking automático
      fbq('set', 'autoConfig', false, '${pixelId}');
      fbq('set', 'agent', 'form-only', '${pixelId}');
      
      // SEM PageView ou outros eventos automáticos!
      console.log('✅ Facebook Pixel base carregado (sem eventos):', typeof window.fbq);
    `;
    script.setAttribute('data-pixel', 'base-config');
    document.head.appendChild(script);
  };
};