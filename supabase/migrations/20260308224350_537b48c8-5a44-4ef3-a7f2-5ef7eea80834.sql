
-- =============================================
-- 1. REMOVE PERMISSIVE RLS POLICIES (USING true)
-- =============================================

-- admin_settings: remove "Allow all operations"
DROP POLICY IF EXISTS "Allow all operations on admin_settings" ON public.admin_settings;

-- contact_info: remove "Admin write access"
DROP POLICY IF EXISTS "Admin write access" ON public.contact_info;

-- footer_info: remove "Admin write access"
DROP POLICY IF EXISTS "Admin write access" ON public.footer_info;

-- law_categories: remove "Admin write access"
DROP POLICY IF EXISTS "Admin write access" ON public.law_categories;

-- service_pages: remove "Admin write access"
DROP POLICY IF EXISTS "Admin write access" ON public.service_pages;

-- service_benefits: remove "Admin write access"
DROP POLICY IF EXISTS "Admin write access" ON public.service_benefits;

-- service_faq: remove "Admin write access"
DROP POLICY IF EXISTS "Admin write access" ON public.service_faq;

-- service_process_steps: remove "Admin write access"
DROP POLICY IF EXISTS "Admin write access" ON public.service_process_steps;

-- service_testimonials: remove "Admin write access"
DROP POLICY IF EXISTS "Admin write access" ON public.service_testimonials;

-- team_members: remove "Admin write access"
DROP POLICY IF EXISTS "Admin write access" ON public.team_members;

-- site_settings: remove "Admin write access"
DROP POLICY IF EXISTS "Admin write access" ON public.site_settings;

-- Remove duplicate "Public read access" policies (already covered by named policies)
DROP POLICY IF EXISTS "Public read access" ON public.contact_info;
DROP POLICY IF EXISTS "Public read access" ON public.footer_info;
DROP POLICY IF EXISTS "Public read access" ON public.law_categories;
DROP POLICY IF EXISTS "Public read access" ON public.service_pages;
DROP POLICY IF EXISTS "Public read access" ON public.service_benefits;
DROP POLICY IF EXISTS "Public read access" ON public.service_faq;
DROP POLICY IF EXISTS "Public read access" ON public.service_process_steps;
DROP POLICY IF EXISTS "Public read access" ON public.service_testimonials;
DROP POLICY IF EXISTS "Public read access" ON public.team_members;
DROP POLICY IF EXISTS "Public read access" ON public.site_settings;

-- =============================================
-- 2. ENABLE RLS ON edge_rate_limits
-- =============================================
ALTER TABLE public.edge_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages rate limits"
ON public.edge_rate_limits FOR ALL
USING (true)
WITH CHECK (true);

-- =============================================
-- 3. CREATE MISSING DDD TRIGGERS
-- =============================================
CREATE TRIGGER trg_form_leads_location
  BEFORE INSERT ON public.form_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_step_form_lead_location();

CREATE TRIGGER trg_conversion_events_location
  BEFORE INSERT ON public.conversion_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_lead_location();
