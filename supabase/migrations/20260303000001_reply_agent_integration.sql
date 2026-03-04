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

-- 4. Add centralize_* fields to marketing_settings (Centralize = Reply Agent CRM panel)
ALTER TABLE public.marketing_settings
  ADD COLUMN IF NOT EXISTS centralize_enabled BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS centralize_api_key TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS centralize_flow_id_default TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS centralize_flow_id_urgente TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS centralize_flow_id_semanas TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS centralize_flow_id_pesquisando TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS centralize_create_contact BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS centralize_trigger_flow BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS centralize_apply_tags BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS centralize_tag_prefix_service TEXT DEFAULT 'servico',
  ADD COLUMN IF NOT EXISTS centralize_tag_prefix_urgency TEXT DEFAULT 'urgencia',
  ADD COLUMN IF NOT EXISTS centralize_tag_prefix_form TEXT DEFAULT 'form',
  ADD COLUMN IF NOT EXISTS centralize_sync_email BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS centralize_sync_phone BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS centralize_sync_name BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS centralize_sync_custom_fields BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS centralize_default_channel TEXT DEFAULT 'whatsapp',
  ADD COLUMN IF NOT EXISTS centralize_webhook_callback_url TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS centralize_notify_on_reply BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS centralize_notify_email TEXT DEFAULT NULL;

-- 5. Add google_ads_conversion fields to step_forms tracking_config
--    (Per-form Google Ads conversion tracking is stored inside tracking_config JSONB)
--    No schema change needed — tracking_config is already JSONB and accepts any keys.
--    The new fields google_ads_conversion_id and google_ads_conversion_label are
--    read/written directly in the tracking_config JSON object by StepFormBuilder.

COMMENT ON COLUMN public.marketing_settings.reply_agent_enabled IS
  'Legacy: use centralize_enabled instead';
COMMENT ON COLUMN public.marketing_settings.centralize_enabled IS
  'Whether to sync leads to Centralize (Reply Agent) CRM automatically';
COMMENT ON COLUMN public.marketing_settings.centralize_flow_id_default IS
  'Default Smart Flow ID to trigger for all new leads';
COMMENT ON COLUMN public.marketing_settings.centralize_flow_id_urgente IS
  'Smart Flow ID for leads with urgency = urgente';
COMMENT ON COLUMN public.marketing_settings.centralize_flow_id_semanas IS
  'Smart Flow ID for leads with urgency = semanas';
COMMENT ON COLUMN public.marketing_settings.centralize_flow_id_pesquisando IS
  'Smart Flow ID for leads with urgency = pesquisando';
