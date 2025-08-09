-- Atualizar leads existentes com dados de localização baseados no telefone
UPDATE conversion_events 
SET 
  ddd = CASE 
    WHEN extract_ddd_from_phone(lead_data->>'phone') IS NOT NULL 
    THEN extract_ddd_from_phone(lead_data->>'phone')
    WHEN extract_ddd_from_phone(lead_data->>'telefone') IS NOT NULL 
    THEN extract_ddd_from_phone(lead_data->>'telefone')
    ELSE NULL
  END,
  state = loc.state_name,
  capital = loc.capital,
  region = loc.region
FROM ddd_locations loc
WHERE 
  (conversion_events.ddd IS NULL OR conversion_events.state IS NULL)
  AND (
    extract_ddd_from_phone(lead_data->>'phone') = loc.ddd
    OR extract_ddd_from_phone(lead_data->>'telefone') = loc.ddd
  );