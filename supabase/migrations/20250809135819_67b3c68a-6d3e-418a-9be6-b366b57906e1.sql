-- Criar tabela para mapeamento de DDDs
CREATE TABLE public.ddd_locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ddd INTEGER NOT NULL UNIQUE,
  state_code VARCHAR(2) NOT NULL,
  state_name TEXT NOT NULL,
  capital TEXT NOT NULL,
  region TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.ddd_locations ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública
CREATE POLICY "Public can read DDD locations" 
ON public.ddd_locations 
FOR SELECT 
USING (true);

-- Política para admins gerenciarem
CREATE POLICY "Admins can manage DDD locations" 
ON public.ddd_locations 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Inserir dados dos DDDs
INSERT INTO public.ddd_locations (ddd, state_code, state_name, capital, region) VALUES
-- Região Norte
(68, 'AC', 'Acre', 'Rio Branco', 'Norte'),
(96, 'AP', 'Amapá', 'Macapá', 'Norte'),
(92, 'AM', 'Amazonas', 'Manaus', 'Norte'),
(91, 'PA', 'Pará', 'Belém', 'Norte'),
(69, 'RO', 'Rondônia', 'Porto Velho', 'Norte'),
(95, 'RR', 'Roraima', 'Boa Vista', 'Norte'),
(63, 'TO', 'Tocantins', 'Palmas', 'Norte'),

-- Região Nordeste
(82, 'AL', 'Alagoas', 'Maceió', 'Nordeste'),
(71, 'BA', 'Bahia', 'Salvador', 'Nordeste'),
(85, 'CE', 'Ceará', 'Fortaleza', 'Nordeste'),
(98, 'MA', 'Maranhão', 'São Luís', 'Nordeste'),
(83, 'PB', 'Paraíba', 'João Pessoa', 'Nordeste'),
(81, 'PE', 'Pernambuco', 'Recife', 'Nordeste'),
(86, 'PI', 'Piauí', 'Teresina', 'Nordeste'),
(84, 'RN', 'Rio Grande do Norte', 'Natal', 'Nordeste'),
(79, 'SE', 'Sergipe', 'Aracaju', 'Nordeste'),

-- Região Centro-Oeste
(61, 'DF', 'Distrito Federal', 'Brasília', 'Centro-Oeste'),
(62, 'GO', 'Goiás', 'Goiânia', 'Centro-Oeste'),
(65, 'MT', 'Mato Grosso', 'Cuiabá', 'Centro-Oeste'),
(67, 'MS', 'Mato Grosso do Sul', 'Campo Grande', 'Centro-Oeste'),

-- Região Sudeste
(27, 'ES', 'Espírito Santo', 'Vitória', 'Sudeste'),
(31, 'MG', 'Minas Gerais', 'Belo Horizonte', 'Sudeste'),
(21, 'RJ', 'Rio de Janeiro', 'Rio de Janeiro', 'Sudeste'),
(11, 'SP', 'São Paulo', 'São Paulo', 'Sudeste'),

-- Região Sul
(41, 'PR', 'Paraná', 'Curitiba', 'Sul'),
(51, 'RS', 'Rio Grande do Sul', 'Porto Alegre', 'Sul'),
(48, 'SC', 'Santa Catarina', 'Florianópolis', 'Sul');

-- Adicionar colunas de localização na tabela conversion_events
ALTER TABLE public.conversion_events 
ADD COLUMN state TEXT,
ADD COLUMN capital TEXT,
ADD COLUMN region TEXT,
ADD COLUMN ddd INTEGER;

-- Função para extrair DDD do telefone
CREATE OR REPLACE FUNCTION public.extract_ddd_from_phone(phone_number TEXT)
RETURNS INTEGER AS $$
BEGIN
  -- Remove todos os caracteres não numéricos
  phone_number := regexp_replace(phone_number, '[^0-9]', '', 'g');
  
  -- Se começar com 55 (código do Brasil), remove
  IF phone_number LIKE '55%' AND length(phone_number) > 11 THEN
    phone_number := substring(phone_number from 3);
  END IF;
  
  -- Extrai os primeiros 2 dígitos como DDD
  IF length(phone_number) >= 10 THEN
    RETURN substring(phone_number from 1 for 2)::INTEGER;
  END IF;
  
  RETURN NULL;
EXCEPTION WHEN OTHERS THEN
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;