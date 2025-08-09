-- Add cities field to ddd_locations table
ALTER TABLE ddd_locations ADD COLUMN IF NOT EXISTS cities TEXT;

-- Update cities for each DDD
-- Goiás
UPDATE ddd_locations SET cities = 'Águas Lindas de Goiás, Formosa' WHERE ddd = 61 AND state_code = 'GO';
UPDATE ddd_locations SET cities = 'Goiânia, Anápolis, Rio Verde' WHERE ddd = 62;
UPDATE ddd_locations SET cities = 'Rio Verde, Itumbiara, Caldas Novas' WHERE ddd = 64;

-- Mato Grosso  
UPDATE ddd_locations SET cities = 'Cuiabá, Várzea Grande, Cáceres' WHERE ddd = 65;
UPDATE ddd_locations SET cities = 'Rondonópolis, Sinop, Primavera do Leste' WHERE ddd = 66;

-- Mato Grosso do Sul
UPDATE ddd_locations SET cities = 'Campo Grande, Dourados, Três Lagoas' WHERE ddd = 67;

-- Espírito Santo
UPDATE ddd_locations SET cities = 'Vitória, Vila Velha, Serra' WHERE ddd = 27;
UPDATE ddd_locations SET cities = 'Cachoeiro de Itapemirim, Linhares, Guarapari' WHERE ddd = 28;

-- Minas Gerais
UPDATE ddd_locations SET cities = 'Belo Horizonte, Contagem, Betim' WHERE ddd = 31;
UPDATE ddd_locations SET cities = 'Juiz de Fora, Barbacena, Muriaé' WHERE ddd = 32;
UPDATE ddd_locations SET cities = 'Governador Valadares, Teófilo Otoni, Caratinga' WHERE ddd = 33;
UPDATE ddd_locations SET cities = 'Uberlândia, Uberaba, Patos de Minas' WHERE ddd = 34;
UPDATE ddd_locations SET cities = 'Pouso Alegre, Poços de Caldas, Varginha' WHERE ddd = 35;
UPDATE ddd_locations SET cities = 'Divinópolis, Pará de Minas, Itaúna' WHERE ddd = 37;
UPDATE ddd_locations SET cities = 'Montes Claros, Sete Lagoas, Curvelo' WHERE ddd = 38;