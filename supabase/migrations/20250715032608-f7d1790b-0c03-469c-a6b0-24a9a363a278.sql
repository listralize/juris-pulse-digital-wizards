-- Criar tabela para armazenar dados de analytics de website
CREATE TABLE public.website_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Identificação da sessão/visitante
  session_id TEXT NOT NULL,
  visitor_id TEXT,
  user_agent TEXT,
  ip_address TEXT,
  
  -- Dados da página
  page_url TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  
  -- Dados temporais
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  session_start TIMESTAMP WITH TIME ZONE,
  session_duration INTEGER, -- em segundos
  
  -- Dados geográficos
  country TEXT,
  city TEXT,
  
  -- Dados do dispositivo
  device_type TEXT, -- mobile, tablet, desktop
  browser TEXT,
  os TEXT,
  screen_resolution TEXT,
  
  -- Métricas de engajamento
  time_on_page INTEGER, -- em segundos
  scroll_depth INTEGER, -- porcentagem
  bounce BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para conversões/eventos
CREATE TABLE public.conversion_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Identificação
  session_id TEXT NOT NULL,
  visitor_id TEXT,
  
  -- Dados do evento
  event_type TEXT NOT NULL, -- form_submit, button_click, page_view, etc
  event_category TEXT, -- conversion, engagement, navigation
  event_action TEXT NOT NULL, -- submit, click, view
  event_label TEXT,
  
  -- Dados específicos do formulário/conversão
  form_id TEXT,
  form_name TEXT,
  campaign_source TEXT,
  campaign_medium TEXT,
  campaign_name TEXT,
  
  -- Dados do lead/conversão
  lead_data JSONB, -- dados do formulário enviado
  conversion_value DECIMAL,
  
  -- Dados contextuais
  page_url TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  
  -- Dados temporais
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para campanhas de marketing
CREATE TABLE public.marketing_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Identificação da campanha
  campaign_name TEXT NOT NULL,
  campaign_source TEXT, -- google, facebook, instagram, email, etc
  campaign_medium TEXT, -- cpc, social, email, organic
  campaign_type TEXT, -- lead_generation, brand_awareness, conversion
  
  -- UTM parameters
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  
  -- Configurações
  budget DECIMAL,
  target_audience TEXT,
  goals TEXT,
  
  -- Status
  status TEXT DEFAULT 'active', -- active, paused, completed
  start_date DATE,
  end_date DATE,
  
  -- Métricas
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  cost DECIMAL DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para armazenar configurações de marketing
CREATE TABLE public.marketing_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Scripts de rastreamento
  facebook_pixel_enabled BOOLEAN DEFAULT false,
  facebook_pixel_id TEXT,
  facebook_custom_code TEXT,
  
  google_analytics_enabled BOOLEAN DEFAULT false,
  google_analytics_id TEXT,
  google_analytics_custom_code TEXT,
  
  google_tag_manager_enabled BOOLEAN DEFAULT false,
  google_tag_manager_id TEXT,
  
  -- Scripts personalizados
  custom_head_scripts TEXT,
  custom_body_scripts TEXT,
  
  -- Configurações de formulários
  form_tracking_config JSONB DEFAULT '{}',
  
  -- Configurações de eventos
  event_tracking_config JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar índices para performance
CREATE INDEX idx_website_analytics_session_id ON public.website_analytics(session_id);
CREATE INDEX idx_website_analytics_timestamp ON public.website_analytics(timestamp);
CREATE INDEX idx_website_analytics_page_url ON public.website_analytics(page_url);

CREATE INDEX idx_conversion_events_session_id ON public.conversion_events(session_id);
CREATE INDEX idx_conversion_events_timestamp ON public.conversion_events(timestamp);
CREATE INDEX idx_conversion_events_event_type ON public.conversion_events(event_type);
CREATE INDEX idx_conversion_events_form_id ON public.conversion_events(form_id);

CREATE INDEX idx_marketing_campaigns_status ON public.marketing_campaigns(status);
CREATE INDEX idx_marketing_campaigns_dates ON public.marketing_campaigns(start_date, end_date);

-- Habilitar RLS
ALTER TABLE public.website_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_settings ENABLE ROW LEVEL SECURITY;

-- Políticas RLS - Public pode inserir dados de analytics (para rastreamento)
CREATE POLICY "Public can insert analytics data" ON public.website_analytics
FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert conversion events" ON public.conversion_events
FOR INSERT WITH CHECK (true);

-- Admins podem visualizar e gerenciar tudo
CREATE POLICY "Admins can manage website analytics" ON public.website_analytics
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage conversion events" ON public.conversion_events
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage marketing campaigns" ON public.marketing_campaigns
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage marketing settings" ON public.marketing_settings
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger para atualizar timestamp
CREATE TRIGGER update_website_analytics_updated_at
  BEFORE UPDATE ON public.website_analytics
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marketing_campaigns_updated_at
  BEFORE UPDATE ON public.marketing_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marketing_settings_updated_at
  BEFORE UPDATE ON public.marketing_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();