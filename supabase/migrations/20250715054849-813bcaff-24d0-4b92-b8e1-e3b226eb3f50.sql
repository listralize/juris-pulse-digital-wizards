-- Criar tabela para relatórios de campanhas
CREATE TABLE public.campaign_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Informações da campanha
  campaign_name TEXT NOT NULL,
  form_id TEXT NOT NULL,
  form_name TEXT NOT NULL,
  
  -- Dados do funil
  form_submissions INTEGER NOT NULL DEFAULT 0,
  contracts INTEGER NOT NULL DEFAULT 0,
  ad_spend NUMERIC(10,2) NOT NULL DEFAULT 0,
  revenue NUMERIC(10,2) NOT NULL DEFAULT 0,
  
  -- Métricas calculadas
  conversion_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  roi NUMERIC(10,2) NOT NULL DEFAULT 0,
  cost_per_lead NUMERIC(10,2) NOT NULL DEFAULT 0,
  cost_per_acquisition NUMERIC(10,2) NOT NULL DEFAULT 0,
  ticket_medio NUMERIC(10,2) NOT NULL DEFAULT 0,
  lucro_liquido NUMERIC(10,2) NOT NULL DEFAULT 0,
  
  -- Configurações de conversão (Facebook Pixel, etc)
  facebook_pixel_config JSONB DEFAULT '{}',
  conversion_api_config JSONB DEFAULT '{}',
  
  -- Timestamps
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela
ALTER TABLE public.campaign_reports ENABLE ROW LEVEL SECURITY;

-- Política para admins gerenciarem relatórios
CREATE POLICY "Admins can manage campaign reports" 
ON public.campaign_reports 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger para atualizar updated_at
CREATE TRIGGER update_campaign_reports_updated_at
BEFORE UPDATE ON public.campaign_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();