-- Corrigir search_path em todas as funções para resolver warnings de segurança
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

CREATE OR REPLACE FUNCTION public.extract_ddd_from_phone(phone_number text)
 RETURNS integer
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  -- Remove todos os caracteres não numéricos
  phone_number := regexp_replace(phone_number, '[^0-9]', '', 'g');
  
  -- Se começar com 55 (código do Brasil), remove
  IF phone_number LIKE '55%' AND length(phone_number) > 11 THEN
    phone_number := substring(phone_number from 3);
  END IF;
  
  -- Extrai os primeiros 2 dígitos como DDD
  IF length(phone_number) >= 10 THEN
    RETURN substring(phone_number from 1 for 2)::INTEGER;
  END IF;
  
  RETURN NULL;
EXCEPTION WHEN OTHERS THEN
  RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_lead_location()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
DECLARE
  extracted_ddd INTEGER;
  location_data RECORD;
  phone_number TEXT;
BEGIN
  -- Extract phone from lead_data
  phone_number := NEW.lead_data->>'phone';
  
  IF phone_number IS NOT NULL THEN
    -- Extract DDD from phone number
    extracted_ddd := extract_ddd_from_phone(phone_number);
    
    IF extracted_ddd IS NOT NULL THEN
      -- Get location data from ddd_locations table
      SELECT state_name, capital, region 
      INTO location_data
      FROM ddd_locations 
      WHERE ddd = extracted_ddd 
      LIMIT 1;
      
      IF FOUND THEN
        -- Update the record with location data
        NEW.ddd := extracted_ddd;
        NEW.state := location_data.state_name;
        NEW.capital := location_data.capital;
        NEW.region := location_data.region;
      END IF;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_step_form_lead_location()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
DECLARE
  extracted_ddd INTEGER;
  location_data RECORD;
  phone_number TEXT;
BEGIN
  -- Extract phone from lead_data
  phone_number := NEW.lead_data->>'phone';
  
  IF phone_number IS NOT NULL THEN
    -- Extract DDD from phone number
    extracted_ddd := extract_ddd_from_phone(phone_number);
    
    IF extracted_ddd IS NOT NULL THEN
      -- Get location data from ddd_locations table
      SELECT state_name, capital, region 
      INTO location_data
      FROM ddd_locations 
      WHERE ddd = extracted_ddd 
      LIMIT 1;
      
      IF FOUND THEN
        -- Update the record with location data
        NEW.ddd := extracted_ddd;
        NEW.state := location_data.state_name;
        NEW.capital := location_data.capital;
        NEW.region := location_data.region;
      END IF;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.cleanup_old_analytics()
 RETURNS void
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
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
$function$;