
-- Table to track step form events (views, clicks, abandonment)
CREATE TABLE public.step_form_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_slug text NOT NULL,
  session_id text NOT NULL,
  visitor_id text,
  step_id text NOT NULL,
  event_type text NOT NULL, -- 'step_view', 'option_click', 'form_start', 'form_abandon', 'form_submit'
  option_value text, -- which option was clicked (for question steps)
  partial_data jsonb DEFAULT '{}'::jsonb, -- partial form data at abandonment
  device_type text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Index for fast queries by form
CREATE INDEX idx_step_form_events_form_slug ON public.step_form_events(form_slug);
CREATE INDEX idx_step_form_events_created ON public.step_form_events(created_at);
CREATE INDEX idx_step_form_events_session ON public.step_form_events(session_id);

-- RLS
ALTER TABLE public.step_form_events ENABLE ROW LEVEL SECURITY;

-- Public can insert events (anonymous tracking)
CREATE POLICY "Public can insert step form events"
  ON public.step_form_events FOR INSERT
  WITH CHECK (true);

-- Admins can read events
CREATE POLICY "Admins can read step form events"
  ON public.step_form_events FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can manage events
CREATE POLICY "Admins can manage step form events"
  ON public.step_form_events FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));
