
-- Criar tabela para leads de formulários com mais detalhes
CREATE TABLE IF NOT EXISTS public.form_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  visitor_id TEXT,
  form_id TEXT,
  form_name TEXT,
  lead_data JSONB NOT NULL,
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_address TEXT,
  user_agent TEXT,
  device_type TEXT,
  browser TEXT,
  country TEXT,
  city TEXT,
  is_whatsapp_conversion BOOLEAN DEFAULT false,
  conversion_value NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para resumos mensais de analytics
CREATE TABLE IF NOT EXISTS public.analytics_monthly_summary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  month_year TEXT NOT NULL, -- formato: "2025-01"
  total_visitors INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  total_page_views INTEGER DEFAULT 0,
  avg_session_duration NUMERIC DEFAULT 0,
  bounce_rate NUMERIC DEFAULT 0,
  top_pages JSONB DEFAULT '[]'::jsonb,
  top_sources JSONB DEFAULT '[]'::jsonb,
  device_breakdown JSONB DEFAULT '{}'::jsonb,
  browser_breakdown JSONB DEFAULT '{}'::jsonb,
  location_breakdown JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(month_year)
);

-- Adicionar RLS para form_leads
ALTER TABLE public.form_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage form leads" 
ON public.form_leads 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can insert form leads" 
ON public.form_leads 
FOR INSERT 
WITH CHECK (true);

-- Adicionar RLS para analytics_monthly_summary
ALTER TABLE public.analytics_monthly_summary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage analytics summary" 
ON public.analytics_monthly_summary 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Criar função para limpeza automática de analytics
CREATE OR REPLACE FUNCTION cleanup_old_analytics()
RETURNS void AS $$
DECLARE
  cutoff_date TIMESTAMP WITH TIME ZONE;
  month_year_val TEXT;
  summary_data RECORD;
BEGIN
  -- Data de corte (30 dias atrás)
  cutoff_date := NOW() - INTERVAL '30 days';
  month_year_val := TO_CHAR(cutoff_date, 'YYYY-MM');
  
  -- Criar resumo mensal se não existir
  INSERT INTO analytics_monthly_summary (
    month_year,
    total_visitors,
    unique_visitors,
    total_page_views,
    avg_session_duration,
    bounce_rate,
    top_pages,
    top_sources,
    device_breakdown,
    browser_breakdown,
    location_breakdown
  )
  SELECT 
    month_year_val,
    COUNT(*) as total_visitors,
    COUNT(DISTINCT visitor_id) as unique_visitors,
    COUNT(*) as total_page_views,
    AVG(COALESCE(session_duration, 0)) as avg_session_duration,
    AVG(CASE WHEN bounce THEN 1 ELSE 0 END) * 100 as bounce_rate,
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('page', page_url, 'count', cnt))
       FROM (SELECT page_url, COUNT(*) as cnt FROM website_analytics 
             WHERE created_at < cutoff_date 
             GROUP BY page_url ORDER BY cnt DESC LIMIT 10) top_p), 
      '[]'::jsonb
    ) as top_pages,
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('source', referrer, 'count', cnt))
       FROM (SELECT referrer, COUNT(*) as cnt FROM website_analytics 
             WHERE created_at < cutoff_date AND referrer IS NOT NULL
             GROUP BY referrer ORDER BY cnt DESC LIMIT 10) top_s), 
      '[]'::jsonb
    ) as top_sources,
    COALESCE(
      (SELECT jsonb_object_agg(device_type, cnt)
       FROM (SELECT device_type, COUNT(*) as cnt FROM website_analytics 
             WHERE created_at < cutoff_date AND device_type IS NOT NULL
             GROUP BY device_type) dev), 
      '{}'::jsonb
    ) as device_breakdown,
    COALESCE(
      (SELECT jsonb_object_agg(browser, cnt)
       FROM (SELECT browser, COUNT(*) as cnt FROM website_analytics 
             WHERE created_at < cutoff_date AND browser IS NOT NULL
             GROUP BY browser) brow), 
      '{}'::jsonb
    ) as browser_breakdown,
    COALESCE(
      (SELECT jsonb_object_agg(country, cnt)
       FROM (SELECT country, COUNT(*) as cnt FROM website_analytics 
             WHERE created_at < cutoff_date AND country IS NOT NULL
             GROUP BY country) loc), 
      '{}'::jsonb
    ) as location_breakdown
  FROM website_analytics 
  WHERE created_at < cutoff_date
  ON CONFLICT (month_year) DO UPDATE SET
    total_visitors = EXCLUDED.total_visitors,
    unique_visitors = EXCLUDED.unique_visitors,
    total_page_views = EXCLUDED.total_page_views,
    avg_session_duration = EXCLUDED.avg_session_duration,
    bounce_rate = EXCLUDED.bounce_rate,
    top_pages = EXCLUDED.top_pages,
    top_sources = EXCLUDED.top_sources,
    device_breakdown = EXCLUDED.device_breakdown,
    browser_breakdown = EXCLUDED.browser_breakdown,
    location_breakdown = EXCLUDED.location_breakdown,
    updated_at = NOW();
  
  -- Deletar dados antigos de analytics
  DELETE FROM website_analytics WHERE created_at < cutoff_date;
  
  -- Deletar dados antigos de conversion_events
  DELETE FROM conversion_events WHERE created_at < cutoff_date;
  
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE OR REPLACE TRIGGER update_form_leads_updated_at
  BEFORE UPDATE ON public.form_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_analytics_summary_updated_at
  BEFORE UPDATE ON public.analytics_monthly_summary
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
