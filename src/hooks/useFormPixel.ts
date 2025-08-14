import { useEffect, useRef } from 'react';

interface PixelConfig {
  pixelId: string;
  eventName: string;
  pixelScriptUrl: string;
}

// Armazenamento global para evitar conflitos entre formulários
const pixelRegistry = new Map<string, PixelConfig>();
const loadedScripts = new Set<string>();

export const useFormPixel = (
  formId: string,
  pixelId: string,
  eventName: string,
  pixelScriptUrl: string = 'https://connect.facebook.net/en_US/fbevents.js'
) => {
  const isRegistered = useRef(false);

  useEffect(() => {
    if (!formId || !pixelId || !eventName || isRegistered.current) {
      return;
    }

    console.log(`🎯 [useFormPixel] Registrando pixel para formulário: ${formId}`, {
      pixelId,
      eventName,
      pixelScriptUrl
    });

    // Registrar configuração do pixel
    pixelRegistry.set(formId, {
      pixelId,
      eventName,
      pixelScriptUrl
    });

    // Carregar script se necessário
    loadPixelScript(pixelScriptUrl, pixelId);

    // Configurar listener do formulário
    const cleanup = setupFormListener(formId);
    isRegistered.current = true;

    return () => {
      cleanup();
      pixelRegistry.delete(formId);
      isRegistered.current = false;
    };
  }, [formId, pixelId, eventName, pixelScriptUrl]);

  return {
    isPixelLoaded: loadedScripts.has(pixelScriptUrl),
    pixelConfig: pixelRegistry.get(formId)
  };
};

const loadPixelScript = async (scriptUrl: string, pixelId: string) => {
  if (loadedScripts.has(scriptUrl)) {
    console.log(`📦 [useFormPixel] Script já carregado: ${scriptUrl}`);
    return;
  }

  try {
    console.log(`📦 [useFormPixel] Carregando script: ${scriptUrl}`);
    
    // Criar e carregar script
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    
    await new Promise<void>((resolve, reject) => {
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Falha ao carregar script: ${scriptUrl}`));
      document.head.appendChild(script);
    });

    // Inicializar Facebook Pixel
    if (typeof (window as any).fbq === 'undefined') {
      (window as any).fbq = function(...args: any[]) {
        ((window as any).fbq.callMethod) ? 
          (window as any).fbq.callMethod.apply((window as any).fbq, args) : 
          (window as any).fbq.queue.push(args);
      };
      (window as any).fbq.push = (window as any).fbq;
      (window as any).fbq.loaded = true;
      (window as any).fbq.version = '2.0';
      (window as any).fbq.queue = [];
    }

    // Inicializar pixel
    (window as any).fbq('init', pixelId);
    (window as any).fbq('track', 'PageView');

    loadedScripts.add(scriptUrl);
    console.log(`✅ [useFormPixel] Script carregado e pixel inicializado: ${pixelId}`);
    
  } catch (error) {
    console.error(`❌ [useFormPixel] Erro ao carregar script:`, error);
  }
};

const setupFormListener = (formId: string): (() => void) => {
  const handleFormSubmit = async (event: Event) => {
    event.preventDefault();
    
    const config = pixelRegistry.get(formId);
    if (!config) {
      console.error(`❌ [useFormPixel] Configuração não encontrada para formulário: ${formId}`);
      return;
    }

    const form = event.target as HTMLFormElement;
    
    try {
      // Verificar se fbq está disponível
      if (typeof (window as any).fbq === 'undefined') {
        console.error(`❌ [useFormPixel] Facebook Pixel não está carregado`);
        return;
      }

      console.log(`🎯 [useFormPixel] Disparando evento: ${config.eventName} para pixel: ${config.pixelId}`);
      
      // Disparar evento do pixel
      (window as any).fbq('track', config.eventName, {
        pixelId: config.pixelId,
        formId: formId
      });

      console.log(`✅ [useFormPixel] Evento rastreado com sucesso`);
      
      // Aguardar um pequeno delay para garantir que o evento seja enviado
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Prosseguir com envio do formulário
      form.submit();
      
    } catch (error) {
      console.error(`❌ [useFormPixel] Erro ao rastrear evento:`, error);
      // Em caso de erro, prosseguir com o envio mesmo assim
      form.submit();
    }
  };

  // Adicionar listener ao formulário
  const form = document.getElementById(formId) || document.querySelector(`form[data-form-id="${formId}"]`);
  
  if (!form) {
    console.error(`❌ [useFormPixel] Formulário não encontrado: ${formId}`);
    return () => {};
  }

  form.addEventListener('submit', handleFormSubmit);
  console.log(`👂 [useFormPixel] Listener adicionado ao formulário: ${formId}`);

  // Retornar função de cleanup
  return () => {
    form.removeEventListener('submit', handleFormSubmit);
    console.log(`🧹 [useFormPixel] Listener removido do formulário: ${formId}`);
  };
};