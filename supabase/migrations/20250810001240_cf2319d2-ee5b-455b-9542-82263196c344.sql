-- Criar tabela para formulários step by step
CREATE TABLE public.step_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  logo_url TEXT,
  webhook_url TEXT NOT NULL,
  steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  styles JSONB NOT NULL DEFAULT '{
    "primary_color": "#4CAF50",
    "background_color": "#ffffff", 
    "text_color": "#000000",
    "button_style": "rounded"
  }'::jsonb,
  seo JSONB NOT NULL DEFAULT '{
    "meta_title": "",
    "meta_description": ""
  }'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.step_forms ENABLE ROW LEVEL SECURITY;

-- Políticas para admins
CREATE POLICY "Admins can manage step forms" 
ON public.step_forms 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Política para visualização pública de formulários ativos
CREATE POLICY "Public can read active step forms" 
ON public.step_forms 
FOR SELECT 
USING (is_active = true);

-- Trigger para updated_at
CREATE TRIGGER update_step_forms_updated_at
BEFORE UPDATE ON public.step_forms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir dados de exemplo baseado no HTML fornecido
INSERT INTO public.step_forms (
  name, 
  slug, 
  title, 
  subtitle,
  logo_url,
  webhook_url,
  steps,
  styles,
  seo
) VALUES (
  'Formulário Jurídico Completo',
  'juridico-completo',
  'Garanta seus direitos de forma 100% online',
  'Sem burocracia e com acompanhamento especializado. Mais praticidade e economia para você!',
  'https://stadv.com.br/wp-content/uploads/2024/02/244-1024x1024.png',
  'https://hook.us1.make.com/puhido7e1zdydoavtwi6gq5swttrnmy6',
  '[
    {
      "id": "inicio",
      "title": "Garanta seus direitos de forma 100% online",
      "description": "Sem burocracia e com acompanhamento especializado.<br>Mais praticidade e economia para você!",
      "type": "question",
      "options": [
        {"text": "Quero me divorciar", "value": "Divórcio", "nextStep": "regime"},
        {"text": "Garantir a pensão alimentícia do meu filho(a)", "value": "Pensão", "nextStep": "p1"},
        {"text": "Regulamentar guarda do meu filho", "value": "Guarda", "nextStep": "g1"}
      ]
    },
    {
      "id": "regime",
      "title": "Qual o regime de casamento?",
      "type": "question",
      "backStep": "inicio",
      "options": [
        {"text": "União estável", "value": "União estável", "nextStep": "partilha"},
        {"text": "Comunhão parcial", "value": "Comunhão parcial", "nextStep": "partilha"},
        {"text": "Comunhão universal", "value": "Comunhão universal", "nextStep": "partilha"},
        {"text": "Separação total", "value": "Separação total", "nextStep": "partilha"},
        {"text": "Não sei", "value": "Não sei", "nextStep": "partilha"}
      ]
    },
    {
      "id": "partilha",
      "title": "Existem bens a serem partilhados?",
      "type": "question",
      "backStep": "regime",
      "options": [
        {"text": "Sim", "value": "Sim", "nextStep": "divida"},
        {"text": "Não", "value": "Não", "nextStep": "divida"}
      ]
    },
    {
      "id": "form-divorcio",
      "title": "Complete para entrar em contato:",
      "type": "form",
      "backStep": "inicio",
      "formFields": [
        {"name": "nome", "type": "text", "placeholder": "Digite seu nome", "required": true},
        {"name": "telefone", "type": "tel", "placeholder": "Digite seu telefone", "required": true}
      ]
    }
  ]'::jsonb,
  '{
    "primary_color": "#4CAF50",
    "background_color": "#ffffff",
    "text_color": "#000000", 
    "button_style": "rounded"
  }'::jsonb,
  '{
    "meta_title": "Formulário Jurídico - Garanta seus direitos online",
    "meta_description": "Resolva questões de divórcio, pensão e guarda de forma 100% online. Sem burocracia e com acompanhamento especializado."
  }'::jsonb
);