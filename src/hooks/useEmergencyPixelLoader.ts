import { useEffect } from 'react';

/**
 * Hook de emergência para carregar o pixel diretamente na inicialização
 * Este hook força o carregamento do pixel 1024100955860841 sem depender de configurações
 */
export const useEmergencyPixelLoader = () => {
  useEffect(() => {
    console.log('🚨 [EMERGENCY PIXEL] Iniciando carregamento de emergência...');
    
    // Verificar se já existe
    if ((window as any).fbq) {
      console.log('✅ [EMERGENCY PIXEL] Pixel já existe');
      return;
    }
    
    // Script direto sem depender de nada
    const pixelScript = document.createElement('script');
    pixelScript.innerHTML = `
      (function() {
        console.log('🚨 [EMERGENCY PIXEL] Executando script direto...');
        
        // Facebook Pixel Code
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        // Inicializar o pixel com o ID correto
        fbq('init', '1024100955860841');
        fbq('track', 'PageView');
        
        console.log('✅ [EMERGENCY PIXEL] Pixel carregado com sucesso: 1024100955860841');
        console.log('✅ [EMERGENCY PIXEL] fbq disponível:', typeof window.fbq);
        
        // Marcar como carregado
        window.__emergencyPixelLoaded = true;
        
        // Testar o pixel
        setTimeout(() => {
          if (window.fbq) {
            console.log('🎉 [EMERGENCY PIXEL] Teste final - Pixel ativo!');
            fbq('track', 'InitiateCheckout', { content_name: 'Emergency Test' });
          }
        }, 1000);
      })();
    `;
    
    pixelScript.setAttribute('data-emergency-pixel', 'true');
    document.head.appendChild(pixelScript);
    
    console.log('📌 [EMERGENCY PIXEL] Script de emergência inserido');
    
    // Verificação adicional
    setTimeout(() => {
      if ((window as any).fbq) {
        console.log('🎯 [EMERGENCY PIXEL] SUCESSO - Pixel ativo após 2 segundos');
      } else {
        console.error('💥 [EMERGENCY PIXEL] FALHA - Pixel ainda não ativo');
      }
    }, 2000);
    
  }, []); // Executar apenas uma vez
};