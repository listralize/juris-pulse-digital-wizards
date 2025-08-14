-- 1. Secure team_members table - Remove public read access
DROP POLICY IF EXISTS "team_members_select_policy" ON public.team_members;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Allow only authenticated admin users to read team member data
CREATE POLICY "Admin users can view team members" ON public.team_members
  FOR SELECT 
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- 2. Secure admin_settings table - Remove public read access  
DROP POLICY IF EXISTS "admin_settings_select_policy" ON public.admin_settings;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Allow only authenticated admin users to read admin settings
CREATE POLICY "Admin users can view admin settings" ON public.admin_settings
  FOR SELECT 
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Allow only authenticated admin users to modify admin settings
CREATE POLICY "Admin users can modify admin settings" ON public.admin_settings
  FOR ALL
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- 3. Secure analytics and tracking tables
-- Secure form_leads table
ALTER TABLE public.form_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "form_leads_select_policy" ON public.form_leads;

CREATE POLICY "Admin users can view form leads" ON public.form_leads
  FOR SELECT 
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Secure conversion_events table if it exists
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'conversion_events') THEN
    EXECUTE 'ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "conversion_events_select_policy" ON public.conversion_events';
    EXECUTE 'CREATE POLICY "Admin users can view conversion events" ON public.conversion_events
      FOR SELECT 
      USING (
        auth.role() = ''authenticated'' AND 
        EXISTS (
          SELECT 1 FROM public.user_roles 
          WHERE user_id = auth.uid() AND role = ''admin''
        )
      )';
  END IF;
END $$;

-- Secure website_analytics table if it exists
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'website_analytics') THEN
    EXECUTE 'ALTER TABLE public.website_analytics ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "website_analytics_select_policy" ON public.website_analytics';
    EXECUTE 'CREATE POLICY "Admin users can view website analytics" ON public.website_analytics
      FOR SELECT 
      USING (
        auth.role() = ''authenticated'' AND 
        EXISTS (
          SELECT 1 FROM public.user_roles 
          WHERE user_id = auth.uid() AND role = ''admin''
        )
      )';
  END IF;
END $$;

-- Secure marketing_settings table  
ALTER TABLE public.marketing_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "marketing_settings_select_policy" ON public.marketing_settings;

CREATE POLICY "Admin users can view marketing settings" ON public.marketing_settings
  FOR SELECT 
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin users can modify marketing settings" ON public.marketing_settings
  FOR ALL
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );