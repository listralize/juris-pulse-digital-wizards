-- Create function to update location data based on DDD
CREATE OR REPLACE FUNCTION update_lead_location()
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

-- Create trigger for conversion_events
DROP TRIGGER IF EXISTS trigger_update_lead_location ON conversion_events;
CREATE TRIGGER trigger_update_lead_location
  BEFORE INSERT OR UPDATE ON conversion_events
  FOR EACH ROW
  EXECUTE FUNCTION update_lead_location();

-- Update existing records that don't have location data
UPDATE conversion_events 
SET 
  ddd = CASE 
    WHEN lead_data->>'phone' IS NOT NULL 
    THEN extract_ddd_from_phone(lead_data->>'phone')
    ELSE NULL 
  END
WHERE ddd IS NULL AND lead_data->>'phone' IS NOT NULL;

-- Update state, capital, region for records that have DDD but missing location data
UPDATE conversion_events 
SET 
  state = dl.state_name,
  capital = dl.capital,
  region = dl.region
FROM ddd_locations dl
WHERE conversion_events.ddd = dl.ddd 
  AND (conversion_events.state IS NULL OR conversion_events.capital IS NULL OR conversion_events.region IS NULL);