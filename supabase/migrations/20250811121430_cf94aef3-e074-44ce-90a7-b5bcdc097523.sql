-- Adicionar coluna flow_config na tabela step_forms para salvar posições e conexões do editor visual
ALTER TABLE public.step_forms ADD COLUMN flow_config JSONB DEFAULT '{}'::jsonb;

-- Comentário da coluna para documentação
COMMENT ON COLUMN public.step_forms.flow_config IS 'Configuração do fluxo visual incluindo posições dos nós e conexões (edges)';