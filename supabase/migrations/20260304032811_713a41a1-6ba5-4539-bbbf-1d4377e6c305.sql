
ALTER TABLE public.marketing_settings
  ADD COLUMN IF NOT EXISTS reply_agent_enabled BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS reply_agent_flow_id TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS reply_agent_flow_id_urgente TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS reply_agent_flow_id_semanas TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS reply_agent_flow_id_pesquisando TEXT DEFAULT NULL,
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

CREATE TABLE IF NOT EXISTS public.lead_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  replyagent_contact_id TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  whatsapp_number TEXT,
  service_interest TEXT,
  urgency_level TEXT DEFAULT 'normal',
  lead_source TEXT DEFAULT 'website',
  lead_status TEXT DEFAULT 'novo',
  is_synced_with_replyagent BOOLEAN DEFAULT false,
  last_sync_at TIMESTAMPTZ,
  notes TEXT,
  gclid TEXT DEFAULT NULL,
  transaction_id TEXT DEFAULT NULL,
  custom_fields JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.lead_profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'lead_profiles'
      AND policyname = 'Service role can manage lead profiles'
  ) THEN
    CREATE POLICY "Service role can manage lead profiles"
    ON public.lead_profiles FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_lead_profiles_email_lower ON public.lead_profiles (lower(email));
