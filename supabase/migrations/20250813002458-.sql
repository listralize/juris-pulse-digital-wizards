-- Ensure triggers to populate DDD and location on new leads
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_update_lead_location'
  ) THEN
    CREATE TRIGGER trg_update_lead_location
    BEFORE INSERT OR UPDATE ON public.conversion_events
    FOR EACH ROW EXECUTE FUNCTION public.update_lead_location();
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_update_step_form_lead_location'
  ) THEN
    CREATE TRIGGER trg_update_step_form_lead_location
    BEFORE INSERT OR UPDATE ON public.form_leads
    FOR EACH ROW EXECUTE FUNCTION public.update_step_form_lead_location();
  END IF;
END $$;

-- Backfill location data for existing conversion_events
WITH base AS (
  SELECT id,
    COALESCE(
      lead_data->>'phone',
      lead_data->>'telefone',
      lead_data->>'Telefone',
      lead_data->>'whatsapp',
      lead_data->>'Whatsapp'
    ) AS phone
  FROM public.conversion_events
),
calc AS (
  SELECT b.id, public.extract_ddd_from_phone(b.phone) AS ddd
  FROM base b
)
UPDATE public.conversion_events ce
SET ddd = c.ddd,
    state = dl.state_name,
    capital = dl.capital,
    region = dl.region
FROM calc c
LEFT JOIN public.ddd_locations dl ON dl.ddd = c.ddd
WHERE ce.id = c.id AND c.ddd IS NOT NULL;

-- Backfill location data for existing form_leads
WITH base2 AS (
  SELECT id,
    COALESCE(
      lead_data->>'phone',
      lead_data->>'telefone',
      lead_data->>'Telefone',
      lead_data->>'whatsapp',
      lead_data->>'Whatsapp'
    ) AS phone
  FROM public.form_leads
),
calc2 AS (
  SELECT b.id, public.extract_ddd_from_phone(b.phone) AS ddd
  FROM base2 b
)
UPDATE public.form_leads fl
SET ddd = c.ddd,
    state = dl.state_name,
    capital = dl.capital,
    region = dl.region
FROM calc2 c
LEFT JOIN public.ddd_locations dl ON dl.ddd = c.ddd
WHERE fl.id = c.id AND c.ddd IS NOT NULL;