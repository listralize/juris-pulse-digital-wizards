
ALTER TABLE public.form_leads
  ADD COLUMN IF NOT EXISTS gclid TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS transaction_id TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS offline_conversion_status TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS offline_conversion_value NUMERIC(10,2) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS offline_conversion_uploaded_at TIMESTAMPTZ DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS utm_term TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS utm_content TEXT DEFAULT NULL;

ALTER TABLE public.conversion_events
  ADD COLUMN IF NOT EXISTS gclid TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS transaction_id TEXT DEFAULT NULL;

CREATE INDEX IF NOT EXISTS idx_form_leads_gclid ON public.form_leads (gclid) WHERE gclid IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form_leads_transaction_id ON public.form_leads (transaction_id) WHERE transaction_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form_leads_offline_status ON public.form_leads (offline_conversion_status) WHERE offline_conversion_status IS NOT NULL;

CREATE TABLE IF NOT EXISTS public.offline_conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_lead_id UUID REFERENCES public.form_leads(id) ON DELETE SET NULL,
  gclid TEXT NOT NULL,
  transaction_id TEXT,
  conversion_name TEXT NOT NULL DEFAULT 'Enviar formulário de Lead',
  conversion_time TIMESTAMPTZ NOT NULL,
  conversion_value NUMERIC(10,2) DEFAULT 1.00,
  currency_code TEXT DEFAULT 'BRL',
  status TEXT NOT NULL DEFAULT 'pending',
  google_ads_response JSONB DEFAULT NULL,
  error_message TEXT DEFAULT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.offline_conversions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'offline_conversions'
      AND policyname = 'Service role manages offline conversions'
  ) THEN
    CREATE POLICY "Service role manages offline conversions"
    ON public.offline_conversions FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;
