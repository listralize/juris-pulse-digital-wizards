
-- 1. Recreate cleanup_old_analytics WITHOUT deleting conversion_events
CREATE OR REPLACE FUNCTION public.cleanup_old_analytics()
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
DECLARE
  cutoff_date TIMESTAMP WITH TIME ZONE;
  month_year_val TEXT;
BEGIN
  cutoff_date := NOW() - INTERVAL '30 days';
  month_year_val := TO_CHAR(cutoff_date, 'YYYY-MM');
  
  -- Create monthly summary
  INSERT INTO analytics_monthly_summary (
    month_year, total_visitors, unique_visitors, total_page_views,
    avg_session_duration, bounce_rate, top_pages, top_sources,
    device_breakdown, browser_breakdown, location_breakdown
  )
  SELECT 
    month_year_val,
    COUNT(*),
    COUNT(DISTINCT visitor_id),
    COUNT(*),
    AVG(COALESCE(session_duration, 0)),
    AVG(CASE WHEN bounce THEN 1 ELSE 0 END) * 100,
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('page', page_url, 'count', cnt))
       FROM (SELECT page_url, COUNT(*) as cnt FROM website_analytics 
             WHERE created_at < cutoff_date 
             GROUP BY page_url ORDER BY cnt DESC LIMIT 10) top_p), 
      '[]'::jsonb
    ),
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('source', referrer, 'count', cnt))
       FROM (SELECT referrer, COUNT(*) as cnt FROM website_analytics 
             WHERE created_at < cutoff_date AND referrer IS NOT NULL
             GROUP BY referrer ORDER BY cnt DESC LIMIT 10) top_s), 
      '[]'::jsonb
    ),
    COALESCE(
      (SELECT jsonb_object_agg(device_type, cnt)
       FROM (SELECT device_type, COUNT(*) as cnt FROM website_analytics 
             WHERE created_at < cutoff_date AND device_type IS NOT NULL
             GROUP BY device_type) dev), 
      '{}'::jsonb
    ),
    COALESCE(
      (SELECT jsonb_object_agg(browser, cnt)
       FROM (SELECT browser, COUNT(*) as cnt FROM website_analytics 
             WHERE created_at < cutoff_date AND browser IS NOT NULL
             GROUP BY browser) brow), 
      '{}'::jsonb
    ),
    COALESCE(
      (SELECT jsonb_object_agg(country, cnt)
       FROM (SELECT country, COUNT(*) as cnt FROM website_analytics 
             WHERE created_at < cutoff_date AND country IS NOT NULL
             GROUP BY country) loc), 
      '{}'::jsonb
    )
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
  
  -- Delete old website_analytics only (NOT conversion_events)
  DELETE FROM website_analytics WHERE created_at < cutoff_date;
  
  -- Also clean expired edge_rate_limits
  DELETE FROM edge_rate_limits WHERE window_start < NOW() - INTERVAL '1 day';
  
END;
$function$;

-- 2. Drop unused tables
DROP TABLE IF EXISTS public.marketing_campaigns;
DROP TABLE IF EXISTS public.webhook_configs;
