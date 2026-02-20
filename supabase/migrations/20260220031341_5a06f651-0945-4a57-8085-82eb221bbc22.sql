
-- Fix trigger functions to search phone in multiple fields

CREATE OR REPLACE FUNCTION public.update_lead_location()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
DECLARE
  extracted_ddd INTEGER;
  location_data RECORD;
  phone_number TEXT;
BEGIN
  phone_number := COALESCE(
    NEW.lead_data->>'phone',
    NEW.lead_data->>'Telefone',
    NEW.lead_data->>'telefone',
    NEW.lead_data->>'whatsapp',
    NEW.lead_data->>'Telefone/WhatsApp',
    NEW.lead_data->'respostas_mapeadas'->>'Telefone',
    NEW.lead_data->'respostas_mapeadas'->>'telefone',
    NEW.lead_data->'respostas_mapeadas'->>'Telefone/WhatsApp'
  );

  IF phone_number IS NOT NULL THEN
    extracted_ddd := extract_ddd_from_phone(phone_number);
    IF extracted_ddd IS NOT NULL THEN
      SELECT state_name, capital, region
      INTO location_data
      FROM ddd_locations
      WHERE ddd = extracted_ddd
      LIMIT 1;

      IF FOUND THEN
        NEW.ddd := extracted_ddd;
        NEW.state := location_data.state_name;
        NEW.capital := location_data.capital;
        NEW.region := location_data.region;
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_step_form_lead_location()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
DECLARE
  extracted_ddd INTEGER;
  location_data RECORD;
  phone_number TEXT;
BEGIN
  phone_number := COALESCE(
    NEW.lead_data->>'phone',
    NEW.lead_data->>'Telefone',
    NEW.lead_data->>'telefone',
    NEW.lead_data->>'whatsapp',
    NEW.lead_data->>'Telefone/WhatsApp',
    NEW.lead_data->'respostas_mapeadas'->>'Telefone',
    NEW.lead_data->'respostas_mapeadas'->>'telefone',
    NEW.lead_data->'respostas_mapeadas'->>'Telefone/WhatsApp'
  );

  IF phone_number IS NOT NULL THEN
    extracted_ddd := extract_ddd_from_phone(phone_number);
    IF extracted_ddd IS NOT NULL THEN
      SELECT state_name, capital, region
      INTO location_data
      FROM ddd_locations
      WHERE ddd = extracted_ddd
      LIMIT 1;

      IF FOUND THEN
        NEW.ddd := extracted_ddd;
        NEW.state := location_data.state_name;
        NEW.capital := location_data.capital;
        NEW.region := location_data.region;
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;

-- Drop existing triggers if any, then recreate
DROP TRIGGER IF EXISTS trigger_update_lead_location ON public.conversion_events;
DROP TRIGGER IF EXISTS trigger_update_step_form_lead_location ON public.form_leads;

CREATE TRIGGER trigger_update_lead_location
  BEFORE INSERT OR UPDATE ON public.conversion_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_lead_location();

CREATE TRIGGER trigger_update_step_form_lead_location
  BEFORE INSERT OR UPDATE ON public.form_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_step_form_lead_location();
