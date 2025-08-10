-- Adicionar campos para melhorar o sistema de step forms
ALTER TABLE step_forms 
ADD COLUMN footer_config JSONB DEFAULT '{"enabled": false, "text": "", "background_color": "#1a1a1a", "text_color": "#ffffff", "font_size": "text-sm"}'::jsonb,
ADD COLUMN seo_config JSONB DEFAULT '{"meta_title": "", "meta_description": "", "meta_keywords": ""}'::jsonb;

-- Adicionar novos campos para melhor rastreamento de leads
ALTER TABLE form_leads 
ADD COLUMN form_step_data JSONB DEFAULT '{}'::jsonb,
ADD COLUMN completion_percentage NUMERIC DEFAULT 0,
ADD COLUMN referrer TEXT,
ADD COLUMN ddd INTEGER,
ADD COLUMN state TEXT,
ADD COLUMN capital TEXT,
ADD COLUMN region TEXT;

-- Criar trigger para extrair localização dos leads step forms
CREATE OR REPLACE FUNCTION update_step_form_lead_location()
RETURNS TRIGGER AS $$
DECLARE
  extracted_ddd INTEGER;
  location_data RECORD;
  phone_number TEXT;
BEGIN
  -- Extract phone from lead_data
  phone_number := NEW.lead_data->>'phone';
  
  IF phone_number IS NOT NULL THEN
    -- Extract DDD from phone number
    extracted_ddd := extract_ddd_from_phone(phone_number);
    
    IF extracted_ddd IS NOT NULL THEN
      -- Get location data from ddd_locations table
      SELECT state_name, capital, region 
      INTO location_data
      FROM ddd_locations 
      WHERE ddd = extracted_ddd 
      LIMIT 1;
      
      IF FOUND THEN
        -- Update the record with location data
        NEW.ddd := extracted_ddd;
        NEW.state := location_data.state_name;
        NEW.capital := location_data.capital;
        NEW.region := location_data.region;
      END IF;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para form_leads
DROP TRIGGER IF EXISTS update_step_form_lead_location_trigger ON form_leads;
CREATE TRIGGER update_step_form_lead_location_trigger
  BEFORE INSERT OR UPDATE ON form_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_step_form_lead_location();