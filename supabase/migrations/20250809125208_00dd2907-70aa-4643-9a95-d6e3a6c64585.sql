-- Criar tabela de perfis de leads/contatos sincronizada com ReplyAgent
CREATE TABLE public.lead_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  replyagent_contact_id TEXT UNIQUE, -- ID do contato no ReplyAgent
  first_name TEXT NOT NULL,
  last_name TEXT,
  full_name TEXT GENERATED ALWAYS AS (TRIM(CONCAT(first_name, ' ', COALESCE(last_name, '')))) STORED,
  email TEXT,
  phone TEXT,
  primary_phone_number TEXT,
  whatsapp_number TEXT,
  company_name TEXT,
  title TEXT,
  locale TEXT DEFAULT 'pt-BR',
  opt_in_sms BOOLEAN DEFAULT true,
  opt_in_call BOOLEAN DEFAULT true,
  opt_in_email BOOLEAN DEFAULT true,
  service_interest TEXT, -- Serviço de interesse
  urgency_level TEXT DEFAULT 'normal', -- normal, urgent
  lead_source TEXT, -- website, referral, etc
  lead_status TEXT DEFAULT 'novo', -- novo, contato, qualificado, convertido, perdido
  notes TEXT,
  custom_fields JSONB DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  last_contact_date TIMESTAMP WITH TIME ZONE,
  conversion_date TIMESTAMP WITH TIME ZONE,
  is_synced_with_replyagent BOOLEAN DEFAULT false,
  sync_error TEXT,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.lead_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas RLS - apenas usuários autenticados podem ver/editar
CREATE POLICY "Authenticated users can view all lead profiles" 
ON public.lead_profiles 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert lead profiles" 
ON public.lead_profiles 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update lead profiles" 
ON public.lead_profiles 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete lead profiles" 
ON public.lead_profiles 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Índices para performance
CREATE INDEX idx_lead_profiles_replyagent_id ON public.lead_profiles(replyagent_contact_id);
CREATE INDEX idx_lead_profiles_phone ON public.lead_profiles(phone);
CREATE INDEX idx_lead_profiles_email ON public.lead_profiles(email);
CREATE INDEX idx_lead_profiles_status ON public.lead_profiles(lead_status);
CREATE INDEX idx_lead_profiles_created_at ON public.lead_profiles(created_at);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_lead_profiles_updated_at
BEFORE UPDATE ON public.lead_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();