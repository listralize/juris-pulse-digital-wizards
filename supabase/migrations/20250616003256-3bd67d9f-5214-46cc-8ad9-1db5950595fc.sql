
-- Conteúdo para Contencioso Tributário
INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Defesa Administrativa Especializada', 'Atuação em CARF, TIT e órgãos fiscais com estratégias para cancelar ou reduzir autuações através de recursos administrativos eficazes.', '🏛️', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Defesa Judicial Robusta', 'Propositura de ações declaratórias, anulatórias e mandados de segurança para proteger seus direitos contra cobranças indevidas.', '⚖️', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Suspensão de Exigibilidade', 'Garantimos a suspensão da cobrança de tributos durante o processo, evitando penhoras e bloqueios de bens.', '🛡️', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 1, 'Análise da Autuação', 'Estudo detalhado do auto de infração, identificação de vícios e elaboração da estratégia de defesa mais adequada.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 2, 'Defesa Administrativa', 'Apresentação de impugnação e recursos nos órgãos competentes, com fundamentação jurídica robusta.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 3, 'Ação Judicial Estratégica', 'Se necessário, ajuizamento de ação judicial para anular a cobrança e garantir a proteção definitiva.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario';

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'Qual a diferença entre defesa administrativa e judicial?', 'A defesa administrativa é mais rápida e econômica, realizada nos próprios órgãos fiscais. A defesa judicial oferece maior proteção e argumentação ampla, mas demanda mais tempo.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario';

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'Posso suspender a cobrança durante o processo?', 'Sim, através de depósito judicial, penhora de bens ou outras garantias previstas em lei, é possível suspender a exigibilidade do crédito tributário.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Indústria Metalúrgica SA, Diretor Fiscal', 'A defesa contra autuação de R$ 2,3 milhões foi exitosa. O escritório conseguiu anular completamente a cobrança no CARF, evitando um grande impacto no nosso caixa.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Grupo Comercial Delta, CFO', 'A estratégia de mandado de segurança foi perfeita. Conseguimos suspender a cobrança imediatamente e depois anular definitivamente a autuação indevida.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Transportadora Regional, Gerente Jurídico', 'Excelente trabalho no contencioso. Reduzimos uma multa de R$ 800 mil para apenas R$ 120 mil através da defesa administrativa qualificada.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'contencioso-tributario';

-- Conteúdo para Recuperação de Créditos Tributários
INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Recuperação de PIS/COFINS', 'Identificação e recuperação de créditos não aproveitados, incluindo a exclusão do ICMS da base de cálculo (Tema 69 STF).', '💰', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Ressarcimento de ICMS/IPI', 'Recuperação de tributos pagos indevidamente em operações interestaduais e industriais, com correção monetária.', '📈', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Compensação Tributária', 'Utilização de créditos para quitar débitos futuros, otimizando o fluxo de caixa da empresa.', '🔄', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 1, 'Auditoria de Créditos', 'Revisão minuciosa de 5 anos de operações para identificar tributos pagos indevidamente ou créditos não aproveitados.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 2, 'Quantificação e Documentação', 'Cálculo preciso dos valores a recuperar e organização de toda documentação comprobatória necessária.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 3, 'Pedido de Restituição', 'Protocolo do pedido junto aos órgãos competentes e acompanhamento até a efetiva recuperação dos valores.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos';

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'Qual o prazo para recuperar créditos tributários?', 'O prazo é de 5 anos contados do pagamento indevido (prazo decadencial). É importante agir rapidamente para não perder o direito aos créditos.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos';

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'Como funciona a exclusão do ICMS do PIS/COFINS?', 'O STF decidiu que o ICMS não compõe a receita bruta para cálculo de PIS/COFINS. Empresas podem recuperar valores pagos indevidamente nos últimos 5 anos.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Indústria Química Omega, CFO', 'Recuperamos R$ 1,8 milhão em créditos de PIS/COFINS com a exclusão do ICMS. O trabalho foi impecável e transformou nosso fluxo de caixa.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Distribuidora Nacional, Diretor Financeiro', 'A recuperação de créditos de ICMS nos trouxe R$ 920 mil que nem sabíamos que tínhamos direito. Excelente trabalho técnico da equipe.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Grupo Varejista Sul, Controller', 'Conseguimos compensar R$ 650 mil em créditos com débitos futuros, melhorando significativamente nossa gestão de caixa.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'recuperacao-creditos';

-- Conteúdo para Elisão Fiscal Estratégica
INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Redução Legal de Impostos', 'Diminuição significativa da carga tributária através de métodos legais e estruturados, respeitando integralmente a legislação vigente.', '💰', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'elisao-fiscal';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Aproveitamento de Incentivos', 'Utilização estratégica de benefícios fiscais, isenções e incentivos disponíveis para diferentes setores e regiões do país.', '🎁', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'elisao-fiscal';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Segurança Jurídica', 'Estratégias fundamentadas em lei, jurisprudência consolidada e doutrina, garantindo proteção contra questionamentos fiscais.', '🛡️', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'elisao-fiscal';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 1, 'Análise da Estrutura Atual', 'Estudo detalhado da situação tributária atual e identificação de oportunidades de elisão fiscal baseadas na operação específica da empresa.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'elisao-fiscal';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 2, 'Mapeamento de Benefícios', 'Identificação de incentivos fiscais, regimes especiais e benefícios aplicáveis ao seu negócio, considerando atividade e localização.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'elisao-fiscal';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 3, 'Implementação Controlada', 'Execução das medidas planejadas, incluindo alterações societárias ou operacionais necessárias, com acompanhamento rigoroso.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'elisao-fiscal';

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'A elisão fiscal pode ser questionada pela Receita Federal?', 'Sim, especialmente se não houver propósito negocial válido ou se configurar abuso de direito. Por isso é fundamental que as estratégias tenham substância econômica e sejam adequadamente documentadas.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'elisao-fiscal';

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'Quais são os principais métodos de elisão fiscal?', 'Os métodos incluem: aproveitamento de incentivos fiscais regionais, mudança de regime tributário, reestruturação societária, planejamento de operações comerciais e aproveitamento de créditos tributários.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'elisao-fiscal';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Indústria Metalúrgica Premier, CFO', 'A elisão fiscal implementada reduziu nossa carga tributária em 18% no primeiro ano, mantendo total conformidade legal. A fundamentação jurídica nos deu segurança para operar sem receios.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'elisao-fiscal';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Comércio Varejista Nacional, Diretor Financeiro', 'Descobrimos benefícios fiscais regionais que não conhecíamos, resultando em economia de R$ 420 mil anuais sem qualquer risco legal. A expertise da equipe foi fundamental.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'elisao-fiscal';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Prestadora de Serviços Tech, CEO', 'O planejamento de elisão fiscal nos permitiu reinvestir recursos em P&D, mantendo nossa competitividade no mercado internacional. Economia que fez toda diferença no crescimento.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'elisao-fiscal';
