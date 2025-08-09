-- Add missing DDDs to ddd_locations table
INSERT INTO ddd_locations (ddd, state_name, capital, region, state_code) VALUES
-- Goiás missing DDDs
(61, 'Goiás', 'Goiânia', 'Centro-Oeste', 'GO'), -- Note: DDD 61 is shared with DF but for GO region
(64, 'Goiás', 'Goiânia', 'Centro-Oeste', 'GO'),

-- Mato Grosso missing DDD
(66, 'Mato Grosso', 'Cuiabá', 'Centro-Oeste', 'MT'),

-- Espírito Santo missing DDD
(28, 'Espírito Santo', 'Vitória', 'Sudeste', 'ES'),

-- Minas Gerais missing DDDs
(32, 'Minas Gerais', 'Belo Horizonte', 'Sudeste', 'MG'),
(33, 'Minas Gerais', 'Belo Horizonte', 'Sudeste', 'MG'),
(34, 'Minas Gerais', 'Belo Horizonte', 'Sudeste', 'MG'),
(35, 'Minas Gerais', 'Belo Horizonte', 'Sudeste', 'MG'),
(37, 'Minas Gerais', 'Belo Horizonte', 'Sudeste', 'MG'),
(38, 'Minas Gerais', 'Belo Horizonte', 'Sudeste', 'MG')

ON CONFLICT (ddd) DO NOTHING;

-- Update existing records that now have location data available
UPDATE conversion_events 
SET 
  state = dl.state_name,
  capital = dl.capital,
  region = dl.region
FROM ddd_locations dl
WHERE conversion_events.ddd = dl.ddd 
  AND (conversion_events.state IS NULL OR conversion_events.capital IS NULL OR conversion_events.region IS NULL);