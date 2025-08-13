-- Enable automatic location enrichment for leads and conversion events
-- Drop existing triggers to avoid duplicates
DROP TRIGGER IF EXISTS trg_update_lead_location ON public.conversion_events;
DROP TRIGGER IF EXISTS trg_update_step_form_lead_location ON public.form_leads;

-- Create triggers to populate ddd/state/capital/region from phone
CREATE TRIGGER trg_update_lead_location
BEFORE INSERT OR UPDATE ON public.conversion_events
FOR EACH ROW
EXECUTE FUNCTION public.update_lead_location();

CREATE TRIGGER trg_update_step_form_lead_location
BEFORE INSERT OR UPDATE ON public.form_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_step_form_lead_location();

-- Backfill existing data for conversion_events
WITH extracted AS (
  SELECT id,
         public.extract_ddd_from_phone(lead_data->>'phone') AS ddd_extracted
  FROM public.conversion_events
)
UPDATE public.conversion_events ce
SET ddd = d.ddd,
    state = d.state_name,
    capital = d.capital,
    region = d.region
FROM extracted e
JOIN public.ddd_locations d ON d.ddd = e.ddd_extracted
WHERE ce.id = e.id
  AND e.ddd_extracted IS NOT NULL;

-- Backfill existing data for form_leads
WITH extracted AS (
  SELECT id,
         public.extract_ddd_from_phone(lead_data->>'phone') AS ddd_extracted
  FROM public.form_leads
)
UPDATE public.form_leads fl
SET ddd = d.ddd,
    state = d.state_name,
    capital = d.capital,
    region = d.region
FROM extracted e
JOIN public.ddd_locations d ON d.ddd = e.ddd_extracted
WHERE fl.id = e.id
  AND e.ddd_extracted IS NOT NULL;