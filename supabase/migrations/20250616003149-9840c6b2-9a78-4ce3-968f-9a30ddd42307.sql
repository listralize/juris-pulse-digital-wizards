
-- Atualizar as páginas de Direito Tributário com conteúdo completo
UPDATE service_pages 
SET 
  title = 'Planejamento Tributário Estratégico',
  description = 'Reduza legalmente sua carga tributária com estratégias personalizadas. Analisamos detalhadamente suas operações para identificar oportunidades de economia fiscal, garantindo maior competitividade e conformidade.'
WHERE category_id = 'tributario' AND href = 'planejamento-tributario';

UPDATE service_pages 
SET 
  title = 'Contencioso Tributário',
  description = 'Defesa especializada em processos administrativos e judiciais tributários. Protegemos seus direitos contra autuações fiscais e buscamos a anulação ou redução de cobranças indevidas.'
WHERE category_id = 'tributario' AND href = 'contencioso-tributario';

UPDATE service_pages 
SET 
  title = 'Recuperação de Créditos Tributários',
  description = 'Identificamos e recuperamos tributos pagos indevidamente nos últimos 5 anos. Atuamos estrategicamente para restituição, ressarcimento ou compensação, melhorando seu fluxo de caixa.'
WHERE category_id = 'tributario' AND href = 'recuperacao-creditos';

UPDATE service_pages 
SET 
  title = 'Elisão Fiscal Estratégica',
  description = 'Estratégias legais avançadas para redução da carga tributária através de planejamento estruturado, utilizando brechas legais e benefícios fiscais disponíveis na legislação brasileira.'
WHERE category_id = 'tributario' AND href = 'elisao-fiscal';

UPDATE service_pages 
SET 
  title = 'Auditoria Tributária Especializada',
  description = 'Revisão completa e estratégica da situação fiscal da empresa para identificar riscos, oportunidades de otimização e garantir conformidade com a legislação tributária vigente.'
WHERE category_id = 'tributario' AND href = 'auditoria-tributaria';

UPDATE service_pages 
SET 
  title = 'Parcelamento de Débitos Fiscais',
  description = 'Negociação e adesão a programas de parcelamento de débitos fiscais, visando reduzir multas, juros e encargos. Regularização estratégica da situação fiscal.'
WHERE category_id = 'tributario' AND href = 'parcelamento-debitos';

UPDATE service_pages 
SET 
  title = 'Consultoria em Impostos',
  description = 'Consultoria especializada em todos os tipos de impostos federais, estaduais e municipais. Orientação estratégica para otimização fiscal e conformidade tributária.'
WHERE category_id = 'tributario' AND href = 'consultoria-impostos';

UPDATE service_pages 
SET 
  title = 'Compliance Tributário e Consultas Especializadas',
  description = 'Programa completo de conformidade fiscal e consultas estratégicas. Oferecemos assessoria preventiva através de pareceres especializados, consultas formais e programas de compliance tributário estruturados.'
WHERE category_id = 'tributario' AND href = 'compliance-tributario';

-- Inserir benefícios para Planejamento Tributário
INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Redução Legal da Carga Tributária', 'Implementação de estratégias lícitas para redução significativa da carga tributária, utilizando benefícios fiscais, incentivos e regimes especiais disponíveis.', '💰', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'planejamento-tributario';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Escolha do Regime Tributário Ideal', 'Avaliamos qual o melhor enquadramento para sua empresa (Simples Nacional, Lucro Presumido ou Lucro Real), considerando faturamento, margens e atividade econômica.', '📊', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'planejamento-tributario';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Reorganização Societária Tributária', 'Estruturamos fusões, cisões, incorporações com base na Lei das S.A., visando otimizar tributação, segregar riscos e aproveitar benefícios fiscais.', '🏢', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'planejamento-tributario';

-- Inserir processo para Planejamento Tributário
INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 1, 'Diagnóstico Tributário Completo', 'Análise detalhada da situação tributária atual, identificação de oportunidades de economia fiscal e mapeamento de riscos existentes na operação.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'planejamento-tributario';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 2, 'Análise de Viabilidade Legal', 'Estudo aprofundado da legislação aplicável, jurisprudência dos tribunais superiores e posicionamento dos órgãos fiscalizadores sobre as estratégias propostas.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'planejamento-tributario';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 3, 'Elaboração de Estratégias Customizadas', 'Desenvolvimento de estratégias específicas para cada cliente, considerando atividade, porte, objetivos e perfil de risco tributário da empresa.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'planejamento-tributario';

-- Inserir FAQ para Planejamento Tributário
INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'Qual a diferença entre elisão e evasão fiscal?', 'Elisão fiscal é a redução lícita de tributos através de planejamento legal antes da ocorrência do fato gerador, utilizando lacunas e benefícios previstos em lei. Evasão fiscal é a sonegação ilegal de tributos após o fato gerador, constituindo crime contra a ordem tributária.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'planejamento-tributario';

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'O planejamento tributário é legal e seguro?', 'Sim, o planejamento tributário é totalmente legal quando utiliza meios lícitos previstos na legislação. É direito fundamental do contribuinte organizar seus negócios da forma menos onerosa possível, desde que haja propósito negocial válido.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'planejamento-tributario';

-- Inserir depoimentos para Planejamento Tributário
INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'João Paulo Silva, CEO Grupo Empresarial Delta', 'O planejamento tributário implementado pelo escritório reduziu nossa carga fiscal em 35% no primeiro ano, mantendo total conformidade legal. O ROI do investimento em consultoria foi excepcional.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'planejamento-tributario';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Marina Santos, Médica e Empresária', 'A reestruturação da minha clínica através de holding reduziu significativamente meus impostos pessoais e empresariais. A economia anual de R$ 180 mil me permitiu investir em novos equipamentos.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'planejamento-tributario';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Carlos Roberto Oliveira, Diretor Comercial', 'A migração para o Simples Nacional foi estratégica e trouxe economia de R$ 240 mil anuais em tributos para nossa empresa. O acompanhamento contínuo garante que estamos sempre no regime mais vantajoso.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'planejamento-tributario';
