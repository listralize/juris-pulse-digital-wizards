-- Sincronização automática Centralize (Reply Agent) via pg_cron
-- Roda a cada hora, verificando apenas leads novos sem replyagent_contact_id

-- Habilitar extensão pg_cron (se ainda não estiver habilitada)
-- Nota: pg_cron requer permissão de superusuário no Supabase
-- A configuração via Dashboard é recomendada para projetos Supabase

-- Criar função que chama a edge function centralize-bulk-sync
CREATE OR REPLACE FUNCTION public.trigger_centralize_auto_sync()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_url text;
  v_key text;
  v_response text;
BEGIN
  -- URL da edge function
  v_url := current_setting('app.supabase_url', true) || '/functions/v1/centralize-bulk-sync';
  v_key := current_setting('app.service_role_key', true);
  
  -- Chamar via pg_net (extensão de HTTP do Supabase)
  PERFORM net.http_post(
    url := v_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || v_key
    ),
    body := '{"limit": 50, "auto_sync": true}'::jsonb
  );
  
  RAISE LOG '[centralize_auto_sync] Sincronização automática disparada em %', now();
END;
$$;

-- Comentário explicativo
COMMENT ON FUNCTION public.trigger_centralize_auto_sync() IS 
'Função chamada pelo pg_cron a cada hora para sincronizar leads com a Reply Agent (Centralize). 
Verifica apenas leads sem replyagent_contact_id. Não cria contatos nem envia mensagens.';

-- Nota: Para ativar o cron job, execute no Dashboard do Supabase (SQL Editor):
-- SELECT cron.schedule('centralize-hourly-sync', '0 * * * *', 'SELECT public.trigger_centralize_auto_sync()');
-- Para verificar: SELECT * FROM cron.job;
-- Para remover: SELECT cron.unschedule('centralize-hourly-sync');
