-- Adicionar campo webhook_configs ao admin_settings se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='admin_settings' AND column_name='webhook_configs') THEN
        ALTER TABLE public.admin_settings ADD COLUMN webhook_configs TEXT;
    END IF;
END $$;