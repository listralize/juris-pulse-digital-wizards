import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useGlobalPixelLoader = () => {
  useEffect(() => {
    console.log('🚀 [GLOBAL PIXEL] Iniciando carregamento global do pixel...');
    
    const loadPixelGlobally = async () => {
      try {
        console.log('🔍 [GLOBAL PIXEL] Buscando configurações no Supabase...');
        
        const { data: settings, error } = await supabase
          .from('marketing_settings')
          .select('*')
          .maybeSingle();
        
        if (error) {
          console.error('❌ [GLOBAL PIXEL] Erro ao buscar configurações:', error);
          return;
        }
        
        if (!settings || !settings.form_tracking_config) {
          console.log('⚠️ [GLOBAL PIXEL] Nenhuma configuração encontrada');
          return;
        }
        
        let trackingConfig;
        if (typeof settings.form_tracking_config === 'string') {
          trackingConfig = JSON.parse(settings.form_tracking_config);
        } else {
          trackingConfig = settings.form_tracking_config;
        }
        
        console.log('📋 [GLOBAL PIXEL] Configuração carregada:', trackingConfig);
        
        // Buscar configuração do formulário padrão
        const defaultFormConfig = trackingConfig.systemForms?.find(
          (form: any) => form.formId === 'default' && form.enabled
        );
        
        if (!defaultFormConfig) {
          console.log('⚠️ [GLOBAL PIXEL] Formulário padrão não encontrado ou desabilitado');
          return;
        }
        
        console.log('✅ [GLOBAL PIXEL] Configuração do formulário padrão:', defaultFormConfig);
        
        // Verificar se Facebook Pixel está habilitado
        if (defaultFormConfig.facebookPixel?.enabled && defaultFormConfig.facebookPixel.pixelId) {
          const pixelId = defaultFormConfig.facebookPixel.pixelId;
          console.log('🎯 [GLOBAL PIXEL] Facebook Pixel habilitado, ID:', pixelId);
          
          // Verificar se o pixel já não foi carregado
          if (!(window as any).fbq) {
            console.log('📘 [GLOBAL PIXEL] Carregando Facebook Pixel...');
            
            // Carregar o script do Facebook Pixel
            const script = document.createElement('script');
            script.innerHTML = `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
              
              console.log('✅ [GLOBAL PIXEL] Facebook Pixel carregado com sucesso:', '${pixelId}');
              console.log('✅ [GLOBAL PIXEL] fbq disponível:', typeof window.fbq);
              
              // Marcar como carregado globalmente
              window.__globalPixelLoaded = true;
              window.__globalPixelId = '${pixelId}';
            `;
            
            script.setAttribute('data-global-pixel', 'true');
            document.head.appendChild(script);
            
            console.log('📌 [GLOBAL PIXEL] Script inserido no DOM');
          } else {
            console.log('✅ [GLOBAL PIXEL] Facebook Pixel já carregado');
            (window as any).__globalPixelLoaded = true;
            (window as any).__globalPixelId = pixelId;
          }
        } else {
          console.log('❌ [GLOBAL PIXEL] Facebook Pixel desabilitado ou sem ID');
        }
        
      } catch (error) {
        console.error('❌ [GLOBAL PIXEL] Erro geral:', error);
      }
    };
    
    // Executar imediatamente
    loadPixelGlobally();
    
    // Verificar se carregou após um tempo
    setTimeout(() => {
      if ((window as any).fbq) {
        console.log('🎉 [GLOBAL PIXEL] Pixel verificado como ativo após timeout');
      } else {
        console.error('💥 [GLOBAL PIXEL] Pixel ainda não está ativo - problema crítico');
      }
    }, 3000);
    
  }, []); // Executar apenas uma vez na inicialização
};