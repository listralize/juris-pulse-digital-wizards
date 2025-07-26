-- Criar tabela para status dos leads no kanban
CREATE TABLE IF NOT EXISTS public.lead_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES conversion_events(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'novo',
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(lead_id)
);

-- Criar tabela para templates de email personalizados
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT 'Obrigado pelo seu contato!',
  subject TEXT NOT NULL DEFAULT 'Obrigado pelo contato, {name}! 📧',
  content TEXT NOT NULL DEFAULT 'Agradecemos seu interesse em nossos serviços. Nossa equipe entrará em contato em breve.',
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir template padrão
INSERT INTO public.email_templates (name, title, subject, content, is_default, is_active)
VALUES (
  'Template Padrão',
  'Obrigado pelo seu contato!',
  'Obrigado pelo contato, {name}! 📧',
  'Agradecemos seu interesse em nossos serviços de {service}. Nossa equipe de advogados especializados analisará sua solicitação e retornará o contato o mais breve possível.',
  true,
  true
) ON CONFLICT DO NOTHING;

-- Configurar RLS
ALTER TABLE public.lead_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Políticas para lead_status
CREATE POLICY "Admins can manage lead status" ON public.lead_status
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read lead status" ON public.lead_status
FOR SELECT USING (true);

-- Políticas para email_templates
CREATE POLICY "Admins can manage email templates" ON public.email_templates
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read active email templates" ON public.email_templates
FOR SELECT USING (is_active = true);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_lead_status_updated_at
BEFORE UPDATE ON public.lead_status
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON public.email_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();