import { useEffect } from 'react';

export const ProductionDebugger = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log('🔍 Production Debugger ativo');
      
      // Log de erros não capturados
      window.addEventListener('error', (event) => {
        console.error('🚨 Erro não capturado:', {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error: event.error
        });
      });

      // Log de promises rejeitadas
      window.addEventListener('unhandledrejection', (event) => {
        console.error('🚨 Promise rejeitada:', event.reason);
      });

      // Log do estado do DOM
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            const hasContent = Array.from(mutation.addedNodes).some(
              node => node.nodeType === Node.ELEMENT_NODE && 
              (node as Element).textContent?.trim()
            );
            if (hasContent) {
              console.log('✅ Conteúdo adicionado ao DOM');
            }
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      return () => observer.disconnect();
    }
  }, []);

  return null;
};