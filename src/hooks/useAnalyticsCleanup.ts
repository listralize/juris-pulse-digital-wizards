
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useAnalyticsCleanup = () => {
  useEffect(() => {
    const runCleanup = async () => {
      try {
        console.log('🧹 Iniciando limpeza automática de analytics...');
        
        const { error } = await supabase.rpc('cleanup_old_analytics');
        
        if (error) {
          console.error('❌ Erro na limpeza de analytics:', error);
        } else {
          console.log('✅ Limpeza de analytics concluída com sucesso');
        }
      } catch (error) {
        console.error('❌ Erro inesperado na limpeza:', error);
      }
    };

    // Executar limpeza na inicialização (se necessário)
    const lastCleanup = localStorage.getItem('last_analytics_cleanup');
    const now = new Date().getTime();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    if (!lastCleanup || (now - parseInt(lastCleanup)) > dayInMs) {
      runCleanup();
      localStorage.setItem('last_analytics_cleanup', now.toString());
    }

    // Configurar limpeza automática diária
    const interval = setInterval(() => {
      runCleanup();
      localStorage.setItem('last_analytics_cleanup', new Date().getTime().toString());
    }, dayInMs);

    return () => clearInterval(interval);
  }, []);
};
