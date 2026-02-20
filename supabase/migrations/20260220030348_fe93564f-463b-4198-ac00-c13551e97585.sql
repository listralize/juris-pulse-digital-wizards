
-- Create webhook_queue table for anti-ban timing system
CREATE TABLE public.webhook_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id TEXT,
  webhook_url TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  urgency TEXT DEFAULT 'default',
  send_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sent_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending',
  attempts INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.webhook_queue ENABLE ROW LEVEL SECURITY;

-- Public can insert (from frontend)
CREATE POLICY "Public can insert webhook queue items"
ON public.webhook_queue FOR INSERT
WITH CHECK (true);

-- Admins can manage
CREATE POLICY "Admins can manage webhook queue"
ON public.webhook_queue FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Edge functions need to read/update (service role handles this)
-- Public SELECT for edge function processing
CREATE POLICY "Public can read pending webhooks"
ON public.webhook_queue FOR SELECT
USING (true);

-- Public UPDATE for edge function processing
CREATE POLICY "Public can update webhook status"
ON public.webhook_queue FOR UPDATE
USING (true);

-- Index for efficient queue processing
CREATE INDEX idx_webhook_queue_pending ON public.webhook_queue (status, send_at) WHERE status IN ('pending', 'retrying');
CREATE INDEX idx_webhook_queue_url_sent ON public.webhook_queue (webhook_url, sent_at DESC);
