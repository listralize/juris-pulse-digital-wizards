
-- Conteúdo para Compliance Tributário e Consultas Especializadas
INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Prevenção de Riscos Fiscais', 'Implementação de controles internos e procedimentos para evitar autuações, multas e passivos tributários futuros.', '🛡️', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'compliance-tributario';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Pareceres Especializados', 'Elaboração de pareceres técnicos fundamentados para suporte a decisões estratégicas e defesa em processos fiscais.', '📋', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'compliance-tributario';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Consultas Formais', 'Protocolo de consultas junto aos órgãos fiscais para obter posicionamento oficial sobre interpretações tributárias complexas.', '❓', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'compliance-tributario';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 1, 'Diagnóstico de Compliance', 'Avaliação dos controles internos existentes, identificação de gaps e mapeamento de riscos tributários.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'compliance-tributario';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 2, 'Estruturação de Controles', 'Desenvolvimento de políticas, procedimentos e controles internos adequados ao perfil de risco da empresa.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'compliance-tributario';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 3, 'Monitoramento Contínuo', 'Acompanhamento da efetividade dos controles implementados e atualização conforme mudanças legislativas.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'compliance-tributario';

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'O que é compliance tributário?', 'É o conjunto de medidas e controles internos implementados pela empresa para garantir o cumprimento integral das obrigações tributárias e mitigar riscos fiscais.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'compliance-tributario';

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'Quando é recomendado fazer uma consulta formal?', 'Quando há dúvidas sobre interpretação de normas tributárias, operações complexas ou inovadoras, ou quando se busca segurança jurídica para determinada prática empresarial.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'compliance-tributario';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Multinacional Tech, Diretor de Compliance', 'O programa de compliance tributário implementado reduziu drasticamente nossos riscos fiscais. Agora temos total transparência e controle sobre nossas obrigações.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'compliance-tributario';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Holding de Investimentos, CEO', 'Os pareceres técnicos elaborados nos deram segurança jurídica para estruturar operações complexas de reorganização societária.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'compliance-tributario';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Grupo Industrial, CFO', 'A consulta formal protocolada esclareceu questões complexas sobre incentivos fiscais, evitando riscos de R$ 5 milhões em contingências.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'compliance-tributario';
