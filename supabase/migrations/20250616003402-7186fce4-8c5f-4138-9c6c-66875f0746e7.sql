
-- Conteúdo para Auditoria Tributária Especializada
INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Identificação de Riscos Fiscais', 'Detecção precoce de irregularidades e exposições fiscais que podem gerar autuações futuras, permitindo correção preventiva.', '🚨', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'auditoria-tributaria';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Oportunidades de Economia', 'Descoberta de créditos não aproveitados, benefícios não utilizados e possibilidades de otimização tributária não identificadas anteriormente.', '💰', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'auditoria-tributaria';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Conformidade Legal Completa', 'Verificação do cumprimento de todas as obrigações tributárias e adequação às normas vigentes em todas as esferas.', '✅', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'auditoria-tributaria';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 1, 'Planejamento da Auditoria', 'Definição do escopo, período a ser analisado, metodologia a ser aplicada e cronograma de execução da auditoria tributária.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'auditoria-tributaria';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 2, 'Coleta e Análise de Dados', 'Levantamento de documentos fiscais, contratos, demonstrações financeiras, obrigações acessórias e demais informações relevantes.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'auditoria-tributaria';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 3, 'Relatório de Achados', 'Elaboração de relatório detalhado com identificação de riscos, oportunidades, não conformidades e recomendações de melhorias.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'auditoria-tributaria';

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'Com que frequência deve ser realizada uma auditoria tributária?', 'Recomenda-se auditoria tributária anual para empresas de grande porte, a cada 2-3 anos para médias empresas, e ao menos uma vez durante o prazo decadencial (5 anos) para pequenas empresas.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'auditoria-tributaria';

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'A auditoria tributária pode ser feita durante uma fiscalização?', 'Sim, e é altamente recomendável. Durante uma fiscalização, a auditoria pode identificar pontos de defesa, verificar a correção dos questionamentos do fisco e preparar estratégias para minimizar eventuais autuações.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'auditoria-tributaria';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Grupo Empresarial Delta, Diretor Fiscal', 'A auditoria tributária identificou riscos de R$ 800 mil em contingências e oportunidades de economia de R$ 400 mil anuais. O retorno do investimento foi imediato e o relatório excepcional.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'auditoria-tributaria';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Indústria Química Omega, CFO', 'Descobrimos através da auditoria créditos de ICMS não aproveitados no valor de R$ 1,2 milhão dos últimos 3 anos. Uma descoberta que transformou nosso fluxo de caixa.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'auditoria-tributaria';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Holding de Investimentos, Controller', 'A auditoria nos deu a segurança de que estávamos em conformidade e ainda identificou formas de otimizar nossa estrutura tributária. Processo muito profissional e detalhado.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'auditoria-tributaria';

-- Conteúdo para Parcelamento de Débitos Fiscais
INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Redução de Multas e Juros', 'Negociação de descontos significativos em multas e juros através de programas de parcelamento especiais e transações tributárias.', '💰', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'parcelamento-debitos';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Regularização Rápida', 'Solução ágil para saída da dívida ativa e regularização da situação fiscal, permitindo participar de licitações e obter certidões negativas.', '⚡', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'parcelamento-debitos';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Proteção Patrimonial', 'Suspensão de medidas constritivas como penhoras, bloqueios e protestos durante o período de pagamento do parcelamento.', '🛡️', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'parcelamento-debitos';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 1, 'Análise do Passivo', 'Levantamento completo das dívidas fiscais, análise das modalidades de parcelamento disponíveis e viabilidade financeira.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'parcelamento-debitos';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 2, 'Negociação com Órgãos', 'Tratativas junto à PGFN, Receita Federal e demais órgãos para obter as melhores condições de parcelamento.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'parcelamento-debitos';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 3, 'Formalização e Acompanhamento', 'Assinatura do termo de parcelamento e acompanhamento do cumprimento das obrigações para evitar rescisão.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'parcelamento-debitos';

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'Quais são as principais modalidades de parcelamento?', 'Parcelamento ordinário, transação por adesão, transação individual, programas especiais como Refis e Pert. Cada modalidade tem regras específicas de desconto e prazo.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'parcelamento-debitos';

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'O que acontece se eu perder uma parcela?', 'A perda de 3 parcelas consecutivas ou 6 alternadas pode levar à rescisão do parcelamento. É importante manter o pagamento em dia ou renegociar antes do vencimento.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'parcelamento-debitos';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Construtora Regional, CEO', 'O parcelamento de R$ 3,2 milhões em débitos federais nos salvou da falência. Conseguimos 60% de desconto em multas e 120 meses para pagar.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'parcelamento-debitos';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Distribuidora Nacional, CFO', 'A negociação do parcelamento foi estratégica. Reduzimos uma dívida de R$ 1,8 milhão para R$ 680 mil através da transação tributária.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'parcelamento-debitos';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Grupo Varejista, Diretor Jurídico', 'Conseguimos suspender todas as execuções fiscais e regularizar nossa situação. Agora podemos participar de licitações novamente.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'parcelamento-debitos';

-- Conteúdo para Consultoria em Impostos
INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Expertise Especializada', 'Conhecimento profundo de todos os tributos federais, estaduais e municipais, garantindo orientação técnica de excelência.', '🎓', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'consultoria-impostos';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Otimização Fiscal', 'Identificação de oportunidades de redução legal da carga tributária através de análise personalizada de cada caso.', '⚙️', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'consultoria-impostos';

INSERT INTO service_benefits (service_page_id, title, description, icon, display_order) 
SELECT sp.id, 'Suporte Contínuo', 'Assessoria permanente para dúvidas fiscais, mudanças legislativas e tomadas de decisão estratégicas.', '🤝', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'consultoria-impostos';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 1, 'Diagnóstico Tributário', 'Análise completa da situação fiscal atual, identificação de riscos e oportunidades de otimização.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'consultoria-impostos';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 2, 'Elaboração de Estratégias', 'Desenvolvimento de plano personalizado de otimização tributária, considerando o perfil e objetivos da empresa.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'consultoria-impostos';

INSERT INTO service_process_steps (service_page_id, step_number, title, description, display_order) 
SELECT sp.id, 3, 'Implementação e Monitoramento', 'Acompanhamento na execução das estratégias e monitoramento contínuo dos resultados obtidos.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'consultoria-impostos';

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'Quais impostos são contemplados na consultoria?', 'Todos os tributos: IRPJ, CSLL, PIS, COFINS, IPI, ICMS, ISS, INSS, FGTS, IPTU, ITBI, IPVA, ITCMD e demais contribuições federais, estaduais e municipais.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'consultoria-impostos';

INSERT INTO service_faq (service_page_id, question, answer, display_order) 
SELECT sp.id, 'Como funciona o acompanhamento legislativo?', 'Monitoramos diariamente as mudanças na legislação tributária e comunicamos nossos clientes sobre impactos relevantes, com análise detalhada e recomendações práticas.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'consultoria-impostos';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Holding Empresarial, CEO', 'A consultoria tributária nos deu segurança para expandir nossos negócios. Todas as decisões são tomadas com base em análise fiscal prévia.', 1
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'consultoria-impostos';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Indústria Alimentícia, CFO', 'O acompanhamento tributário contínuo nos evitou diversos problemas fiscais. A consultoria é estratégica para nosso crescimento.', 2
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'consultoria-impostos';

INSERT INTO service_testimonials (service_page_id, name, text, display_order) 
SELECT sp.id, 'Grupo de Investimentos, Controller', 'Excelente suporte em todas as questões tributárias. A expertise técnica da equipe é diferenciada no mercado.', 3
FROM service_pages sp WHERE sp.category_id = 'tributario' AND sp.href = 'consultoria-impostos';
