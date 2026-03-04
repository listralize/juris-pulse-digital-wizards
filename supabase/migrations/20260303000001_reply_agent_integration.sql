-- ─────────────────────────────────────────────────────────────────────────────
-- Reply Agent Integration
-- Adds configuration fields for the Reply Agent CRM integration.
-- The API key is stored as a Supabase Secret (REPLY_AGENT_API_KEY) and never
-- persisted in the database. Only the flow ID and toggle are stored here.
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Add reply_agent fields to marketing_settings
ALTER TABLE public.marketing_settings
  ADD COLUMN IF NOT EXISTS reply_agent_enabled BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS reply_agent_flow_id TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS reply_agent_flow_id_urgente TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS reply_agent_flow_id_semanas TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS reply_agent_flow_id_pesquisando TEXT DEFAULT NULL;

-- 2. Ensure lead_profiles RLS allows service-role inserts (for edge functions)
-- The existing policies only allow authenticated users; edge functions use service_role.
-- We add a permissive policy for service_role operations.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'lead_profiles'
      AND policyname = 'Service role can manage lead profiles'
  ) THEN
    CREATE POLICY "Service role can manage lead profiles"
    ON public.lead_profiles
    FOR ALL
    USING (true)
    WITH CHECK (true);
  END IF;
END $$;

-- 3. Index for faster lookup by email (deduplication)
CREATE INDEX IF NOT EXISTS idx_lead_profiles_email_lower
  ON public.lead_profiles (lower(email));

-- 4. Add google_ads_conversion_id and google_ads_conversion_label to marketing_settings
--    These are needed for the direct gtag conversion call on the /obrigado page.
ALTER TABLE public.marketing_settings
  ADD COLUMN IF NOT EXISTS google_ads_conversion_id TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS google_ads_conversion_label TEXT DEFAULT NULL;

COMMENT ON COLUMN public.marketing_settings.reply_agent_enabled IS
  'Whether to sync leads to Reply Agent CRM automatically';
COMMENT ON COLUMN public.marketing_settings.reply_agent_flow_id IS
  'Default Smart Flow ID to trigger for all new leads';
COMMENT ON COLUMN public.marketing_settings.reply_agent_flow_id_urgente IS
  'Smart Flow ID for leads with urgency = urgente';
COMMENT ON COLUMN public.marketing_settings.reply_agent_flow_id_semanas IS
  'Smart Flow ID for leads with urgency = semanas';
COMMENT ON COLUMN public.marketing_settings.reply_agent_flow_id_pesquisando IS
  'Smart Flow ID for leads with urgency = pesquisando';
COMMENT ON COLUMN public.marketing_settings.google_ads_conversion_id IS
  'Google Ads Conversion ID (AW-XXXXXXXXX) for direct gtag conversion events';
COMMENT ON COLUMN public.marketing_settings.google_ads_conversion_label IS
  'Google Ads Conversion Label for direct gtag conversion events';
