-- Criar tabela para configurações de webhook
CREATE TABLE IF NOT EXISTS public.webhook_configs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    endpoint_url TEXT,
    mappings JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    test_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar RLS
ALTER TABLE public.webhook_configs ENABLE ROW LEVEL SECURITY;

-- Políticas para webhook_configs
CREATE POLICY "Admins can manage webhook configs" 
ON public.webhook_configs 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger para updated_at
CREATE TRIGGER update_webhook_configs_updated_at
    BEFORE UPDATE ON public.webhook_configs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();