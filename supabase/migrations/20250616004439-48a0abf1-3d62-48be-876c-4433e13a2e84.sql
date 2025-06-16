
-- Vamos verificar todas as páginas de tributário e adicionar conteúdo rico onde necessário

-- Inserir benefícios para Contencioso Tributário
INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Defesa Especializada', 'Atuação técnica em processos administrativos e judiciais, com estratégias personalizadas para cada caso.', '⚖️', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario'
AND NOT EXISTS (SELECT 1 FROM service_benefits sb WHERE sb.service_page_id = sp.id);

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Redução de Multas', 'Negociação e contestação de autuações fiscais para minimizar impactos financeiros.', '💰', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario'
AND NOT EXISTS (SELECT 1 FROM service_benefits sb WHERE sb.service_page_id = sp.id LIMIT 1);

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Acompanhamento Processual', 'Monitoramento completo dos processos até decisão final favorável.', '📋', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario'
AND NOT EXISTS (SELECT 1 FROM service_benefits sb WHERE sb.service_page_id = sp.id LIMIT 1);

-- Inserir processo para Contencioso Tributário
INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 1, 'Análise do Auto de Infração', 'Estudo detalhado da autuação e identificação de vícios e inconsistências.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario'
AND NOT EXISTS (SELECT 1 FROM service_process_steps sps WHERE sps.service_page_id = sp.id);

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 2, 'Elaboração da Defesa', 'Preparação de defesa técnica fundamentada com jurisprudência favorável.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario'
AND NOT EXISTS (SELECT 1 FROM service_process_steps sps WHERE sps.service_page_id = sp.id LIMIT 1);

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 3, 'Acompanhamento e Recursos', 'Seguimento do processo e interposição de recursos nas instâncias superiores.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario'
AND NOT EXISTS (SELECT 1 FROM service_process_steps sps WHERE sps.service_page_id = sp.id LIMIT 1);

-- Inserir FAQ para Contencioso Tributário
INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'Qual o prazo para contestar uma autuação fiscal?', 'O prazo varia conforme o órgão: 30 dias para Receita Federal, 30 dias para Receita Estadual e varia por município. É crucial não perder o prazo para manter o direito de defesa.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario'
AND NOT EXISTS (SELECT 1 FROM service_faq sf WHERE sf.service_page_id = sp.id);

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'É possível parcelar durante o processo administrativo?', 'Sim, é possível aderir a programas de parcelamento mesmo com processo em andamento, mas é importante avaliar se é mais vantajoso que a defesa técnica.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario'
AND NOT EXISTS (SELECT 1 FROM service_faq sf WHERE sf.service_page_id = sp.id LIMIT 1);

-- Inserir depoimentos para Contencioso Tributário
INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Empresa de Logística, Diretor Financeiro', 'Conseguimos anular completamente uma autuação de R$ 2,3 milhões através da defesa técnica. A expertise da equipe foi fundamental para o sucesso.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario'
AND NOT EXISTS (SELECT 1 FROM service_testimonials st WHERE st.service_page_id = sp.id);

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Indústria Química, CEO', 'Reduzimos uma multa de R$ 850 mil para R$ 180 mil através de defesa administrativa eficaz. Excelente trabalho técnico.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario'
AND NOT EXISTS (SELECT 1 FROM service_testimonials st WHERE st.service_page_id = sp.id LIMIT 1);

-- Inserir benefícios para Recuperação de Créditos
INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Análise Retroativa Completa', 'Revisão dos últimos 5 anos para identificar todos os créditos tributários disponíveis.', '🔍', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos'
AND NOT EXISTS (SELECT 1 FROM service_benefits sb WHERE sb.service_page_id = sp.id);

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Melhoria do Fluxo de Caixa', 'Recuperação de valores pagos indevidamente, proporcionando recursos imediatos para a empresa.', '💵', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos'
AND NOT EXISTS (SELECT 1 FROM service_benefits sb WHERE sb.service_page_id = sp.id LIMIT 1);

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Sem Custo Inicial', 'Trabalho com remuneração baseada no êxito, ou seja, você só paga quando recuperamos os valores.', '🎯', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos'
AND NOT EXISTS (SELECT 1 FROM service_benefits sb WHERE sb.service_page_id = sp.id LIMIT 1);

-- Inserir processo para Recuperação de Créditos
INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 1, 'Auditoria de Créditos', 'Análise minuciosa de todos os tributos pagos para identificar valores recuperáveis.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos'
AND NOT EXISTS (SELECT 1 FROM service_process_steps sps WHERE sps.service_page_id = sp.id);

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 2, 'Protocolo dos Pedidos', 'Formalização dos pedidos de restituição junto aos órgãos competentes.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos'
AND NOT EXISTS (SELECT 1 FROM service_process_steps sps WHERE sps.service_page_id = sp.id LIMIT 1);

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 3, 'Acompanhamento e Recebimento', 'Monitoramento do processo até o recebimento efetivo dos valores.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos'
AND NOT EXISTS (SELECT 1 FROM service_process_steps sps WHERE sps.service_page_id = sp.id LIMIT 1);

-- Inserir FAQ para Recuperação de Créditos
INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'Quais tributos podem ser recuperados?', 'PIS, COFINS, ICMS, IPI, CSLL, IRPJ e outros tributos pagos indevidamente ou em valor superior ao devido, dentro do prazo decadencial de 5 anos.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos'
AND NOT EXISTS (SELECT 1 FROM service_faq sf WHERE sf.service_page_id = sp.id);

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'Quanto tempo demora para receber os valores?', 'Varia de 6 meses a 2 anos, dependendo do órgão e complexidade. Acompanhamos todo o processo para acelerar ao máximo.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos'
AND NOT EXISTS (SELECT 1 FROM service_faq sf WHERE sf.service_page_id = sp.id LIMIT 1);

-- Inserir depoimentos para Recuperação de Créditos
INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Frigorífico Regional, CFO', 'Recuperamos R$ 1,8 milhão em créditos de ICMS dos últimos 4 anos. Foi fundamental para nossa expansão.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos'
AND NOT EXISTS (SELECT 1 FROM service_testimonials st WHERE st.service_page_id = sp.id);

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Distribuidora de Combustíveis, Sócio', 'A recuperação de créditos de PIS/COFINS nos trouxe R$ 920 mil que não sabíamos que tínhamos direito.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos'
AND NOT EXISTS (SELECT 1 FROM service_testimonials st WHERE st.service_page_id = sp.id LIMIT 1);

-- Inserir benefícios para Elisão Fiscal
INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Estratégias Avançadas', 'Implementação de técnicas sofisticadas de elisão fiscal dentro da legalidade.', '🧠', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'elisao-fiscal'
AND NOT EXISTS (SELECT 1 FROM service_benefits sb WHERE sb.service_page_id = sp.id);

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Aproveitamento de Incentivos', 'Utilização máxima de benefícios fiscais e incentivos disponíveis na legislação.', '🎁', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'elisao-fiscal'
AND NOT EXISTS (SELECT 1 FROM service_benefits sb WHERE sb.service_page_id = sp.id LIMIT 1);

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Segurança Jurídica', 'Estratégias fundamentadas em jurisprudência consolidada e doutrina especializada.', '🛡️', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'elisao-fiscal'
AND NOT EXISTS (SELECT 1 FROM service_benefits sb WHERE sb.service_page_id = sp.id LIMIT 1);
