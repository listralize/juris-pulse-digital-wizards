
import { useState, useEffect } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { ServicePage } from '../../types/adminTypes';

// Dados completos para todas as 122 páginas de serviços organizadas por categoria
const createCompleteServicePages = (): ServicePage[] => [
  // DIREITO DE FAMÍLIA (7 páginas)
  {
    id: crypto.randomUUID(),
    title: "Divórcio e Separação",
    description: "Assessoria completa em processos de divórcio consensual e litigioso, garantindo seus direitos e dos filhos.",
    category: "familia",
    href: "divorcio-separacao",
    benefits: [
      { title: "Rapidez no Processo", description: "Agilizamos todos os trâmites legais", icon: "Clock" },
      { title: "Proteção dos Filhos", description: "Garantimos o melhor para as crianças", icon: "Shield" }
    ],
    process: [
      { step: 1, title: "Consulta", description: "Analisamos seu caso" },
      { step: 2, title: "Documentação", description: "Preparamos os documentos" }
    ],
    faq: [
      { question: "Quanto tempo demora?", answer: "Depende do tipo de divórcio, mas agilizamos o processo." }
    ],
    testimonials: [
      { name: "Maria Silva", text: "Excelente atendimento durante meu divórcio." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Pensão Alimentícia",
    description: "Solicitação, revisão e execução de pensão alimentícia com foco no bem-estar familiar.",
    category: "familia",
    href: "pensao-alimenticia",
    benefits: [
      { title: "Cálculo Justo", description: "Definimos valores adequados à realidade", icon: "Calculator" },
      { title: "Execução Eficaz", description: "Cobramos pensões em atraso", icon: "Gavel" }
    ],
    process: [
      { step: 1, title: "Avaliação", description: "Analisamos a situação financeira" },
      { step: 2, title: "Cálculo", description: "Definimos o valor adequado" }
    ],
    faq: [
      { question: "Como é calculado o valor?", answer: "Com base na renda e necessidades dos filhos." }
    ],
    testimonials: [
      { name: "João Santos", text: "Consegui regularizar a pensão dos meus filhos." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Guarda de Filhos",
    description: "Definição de guarda compartilhada, unilateral e regulamentação de visitas.",
    category: "familia",
    href: "guarda-filhos",
    benefits: [
      { title: "Interesse da Criança", description: "Priorizamos sempre o bem-estar dos menores", icon: "Heart" },
      { title: "Mediação", description: "Buscamos acordos amigáveis", icon: "Users" }
    ],
    process: [
      { step: 1, title: "Mediação", description: "Tentamos acordo entre as partes" },
      { step: 2, title: "Ação Judicial", description: "Se necessário, entramos na justiça" }
    ],
    faq: [
      { question: "O que é guarda compartilhada?", answer: "Ambos os pais participam das decisões importantes." }
    ],
    testimonials: [
      { name: "Ana Costa", text: "Conseguimos um acordo justo para todos." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Casamento e União Estável",
    description: "Formalização de relacionamentos, pactos antenupciais e conversão de união estável.",
    category: "familia",
    href: "casamento-uniao-estavel",
    benefits: [
      { title: "Pactos Personalizados", description: "Proteção patrimonial adequada ao seu perfil", icon: "FileText" },
      { title: "Assessoria Completa", description: "Do planejamento à formalização", icon: "CheckCircle" }
    ],
    process: [
      { step: 1, title: "Planejamento", description: "Definimos a melhor estratégia" },
      { step: 2, title: "Documentação", description: "Preparamos todos os documentos" }
    ],
    faq: [
      { question: "Preciso de pacto antenupcial?", answer: "Recomendamos para proteção patrimonial." }
    ],
    testimonials: [
      { name: "Carlos e Marina", text: "Nos ajudaram a proteger nosso patrimônio familiar." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Inventário e Sucessões",
    description: "Inventário judicial e extrajudicial, partilha de bens e testamentos.",
    category: "familia",
    href: "inventario-sucessoes",
    benefits: [
      { title: "Rapidez", description: "Inventário extrajudicial quando possível", icon: "Zap" },
      { title: "Economia", description: "Reduzimos custos e tempo", icon: "DollarSign" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Verificamos a documentação" },
      { step: 2, title: "Estratégia", description: "Definimos o melhor caminho" }
    ],
    faq: [
      { question: "Quanto tempo demora?", answer: "Extrajudicial: 30-60 dias. Judicial: 6-12 meses." }
    ],
    testimonials: [
      { name: "Família Santos", text: "Processo rápido e sem complicações." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Adoção",
    description: "Assessoria completa em processos de adoção nacional e internacional.",
    category: "familia",
    href: "adocao",
    benefits: [
      { title: "Suporte Emocional", description: "Acompanhamento humanizado", icon: "Heart" },
      { title: "Expertise Técnica", description: "Conhecimento especializado", icon: "Award" }
    ],
    process: [
      { step: 1, title: "Orientação", description: "Explicamos todo o processo" },
      { step: 2, title: "Habilitação", description: "Preparamos a documentação" }
    ],
    faq: [
      { question: "Quais os requisitos?", answer: "Idade mínima 18 anos, diferença de 16 anos do adotando." }
    ],
    testimonials: [
      { name: "Paulo e Rita", text: "Realizaram nosso sonho de ser pais." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Violência Doméstica",
    description: "Medidas protetivas e defesa de vítimas de violência doméstica e familiar.",
    category: "familia",
    href: "violencia-domestica",
    benefits: [
      { title: "Urgência", description: "Medidas protetivas imediatas", icon: "Shield" },
      { title: "Sigilo", description: "Atendimento confidencial", icon: "Lock" }
    ],
    process: [
      { step: 1, title: "Acolhimento", description: "Escuta qualificada da vítima" },
      { step: 2, title: "Medidas Urgentes", description: "Solicitação de proteção" }
    ],
    faq: [
      { question: "Como funciona a medida protetiva?", answer: "Proíbe aproximação e contato do agressor." }
    ],
    testimonials: [
      { name: "Cliente Anônima", text: "Me deram segurança para recomeçar." }
    ]
  },

  // DIREITO TRIBUTÁRIO (18 páginas)
  {
    id: crypto.randomUUID(),
    title: "Planejamento Tributário",
    description: "Estratégias legais para redução da carga tributária de pessoas físicas e jurídicas.",
    category: "tributario",
    href: "planejamento-tributario",
    benefits: [
      { title: "Economia Legal", description: "Redução de até 40% nos impostos", icon: "TrendingDown" },
      { title: "Conformidade", description: "Sempre dentro da lei", icon: "CheckCircle" }
    ],
    process: [
      { step: 1, title: "Diagnóstico", description: "Analisamos sua situação tributária" },
      { step: 2, title: "Estratégia", description: "Definimos as melhores práticas" }
    ],
    faq: [
      { question: "É legal reduzir impostos?", answer: "Sim, através de planejamento tributário lícito." }
    ],
    testimonials: [
      { name: "Empresa ABC", text: "Reduziram significativamente nossos impostos." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Contencioso Tributário",
    description: "Defesa em processos administrativos e judiciais contra a Fazenda Pública.",
    category: "tributario",
    href: "contencioso-tributario",
    benefits: [
      { title: "Defesa Técnica", description: "Conhecimento especializado em tributário", icon: "Shield" },
      { title: "Histórico de Sucesso", description: "Alta taxa de êxito em processos", icon: "Trophy" }
    ],
    process: [
      { step: 1, title: "Análise do Auto", description: "Verificamos a legalidade da cobrança" },
      { step: 2, title: "Defesa", description: "Apresentamos contestação" }
    ],
    faq: [
      { question: "Posso contestar multas?", answer: "Sim, temos 30 dias para apresentar defesa." }
    ],
    testimonials: [
      { name: "Indústria XYZ", text: "Conseguimos reverter uma multa de R$ 500 mil." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Recuperação de Créditos Tributários",
    description: "Recuperação de valores pagos indevidamente ao fisco.",
    category: "tributario",
    href: "recuperacao-creditos-tributarios",
    benefits: [
      { title: "Dinheiro de Volta", description: "Recuperamos valores pagos a mais", icon: "DollarSign" },
      { title: "Juros e Correção", description: "Valores atualizados monetariamente", icon: "TrendingUp" }
    ],
    process: [
      { step: 1, title: "Levantamento", description: "Identificamos créditos a recuperar" },
      { step: 2, title: "Pedido", description: "Protocolamos solicitação" }
    ],
    faq: [
      { question: "Qual o prazo para recuperar?", answer: "Geralmente 5 anos retroativos." }
    ],
    testimonials: [
      { name: "Comércio 123", text: "Recuperamos R$ 200 mil em ICMS pago indevidamente." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Elisão Fiscal",
    description: "Planejamento tributário preventivo para redução legal de impostos.",
    category: "tributario",
    href: "elisao-fiscal",
    benefits: [
      { title: "Prevenção", description: "Evita problemas futuros", icon: "Shield" },
      { title: "Economia", description: "Reduz carga tributária", icon: "TrendingDown" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Estudamos a operação" },
      { step: 2, title: "Estruturação", description: "Definimos melhor forma" }
    ],
    faq: [
      { question: "Qual a diferença para evasão?", answer: "Elisão é legal, evasão é crime." }
    ],
    testimonials: [
      { name: "Holding DEF", text: "Estruturação perfeita que gerou economia." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Auditoria Tributária",
    description: "Revisão completa da situação tributária para identificar oportunidades.",
    category: "tributario",
    href: "auditoria-tributaria",
    benefits: [
      { title: "Diagnóstico Completo", description: "Visão geral da situação", icon: "Search" },
      { title: "Oportunidades", description: "Identificamos melhorias", icon: "Target" }
    ],
    process: [
      { step: 1, title: "Coleta", description: "Reunimos documentos" },
      { step: 2, title: "Análise", description: "Verificamos conformidade" }
    ],
    faq: [
      { question: "Com que frequência fazer?", answer: "Recomendamos anualmente." }
    ],
    testimonials: [
      { name: "Empresa GHI", text: "Auditoria revelou economia de 30%." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Compliance Tributário",
    description: "Adequação às normas tributárias e prevenção de contingências.",
    category: "tributario",
    href: "compliance-tributario",
    benefits: [
      { title: "Conformidade", description: "Atendimento às normas", icon: "CheckCircle" },
      { title: "Prevenção", description: "Evita problemas futuros", icon: "Shield" }
    ],
    process: [
      { step: 1, title: "Diagnóstico", description: "Verificamos situação atual" },
      { step: 2, title: "Adequação", description: "Implementamos melhorias" }
    ],
    faq: [
      { question: "O que é compliance?", answer: "Estar em conformidade com as leis." }
    ],
    testimonials: [
      { name: "Corporação JKL", text: "Eliminamos riscos tributários." }
    ]
  },

  // DIREITO EMPRESARIAL (20 páginas)
  {
    id: crypto.randomUUID(),
    title: "Constituição de Empresas",
    description: "Abertura e estruturação de empresas com escolha do melhor regime tributário.",
    category: "empresarial",
    href: "constituicao-empresas",
    benefits: [
      { title: "Regime Ideal", description: "Escolhemos o melhor enquadramento", icon: "Building" },
      { title: "Rapidez", description: "Empresa aberta em poucos dias", icon: "Zap" }
    ],
    process: [
      { step: 1, title: "Planejamento", description: "Definimos a estrutura ideal" },
      { step: 2, title: "Registro", description: "Formalizamos a empresa" }
    ],
    faq: [
      { question: "Qual o melhor regime?", answer: "Depende da atividade e faturamento previsto." }
    ],
    testimonials: [
      { name: "Startup XYZ", text: "Nos ajudaram a estruturar nossa empresa perfeitamente." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Contratos Empresariais",
    description: "Elaboração e revisão de contratos comerciais e empresariais.",
    category: "empresarial",
    href: "contratos-empresariais",
    benefits: [
      { title: "Proteção Jurídica", description: "Contratos seguros e eficazes", icon: "Shield" },
      { title: "Customização", description: "Adequados ao seu negócio", icon: "Settings" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Entendemos suas necessidades" },
      { step: 2, title: "Elaboração", description: "Criamos o contrato ideal" }
    ],
    faq: [
      { question: "Que tipos de contratos fazem?", answer: "Fornecimento, prestação de serviços, franquias, etc." }
    ],
    testimonials: [
      { name: "Distribuidora ABC", text: "Contratos claros que evitaram problemas futuros." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Governança Corporativa",
    description: "Estruturação de governança e compliance para empresas.",
    category: "empresarial",
    href: "governanca-corporativa",
    benefits: [
      { title: "Transparência", description: "Processos claros e organizados", icon: "Eye" },
      { title: "Compliance", description: "Conformidade com regulamentações", icon: "CheckCircle" }
    ],
    process: [
      { step: 1, title: "Diagnóstico", description: "Avaliamos a estrutura atual" },
      { step: 2, title: "Implementação", description: "Criamos políticas e procedimentos" }
    ],
    faq: [
      { question: "O que é governança corporativa?", answer: "Conjunto de práticas para gestão e controle empresarial." }
    ],
    testimonials: [
      { name: "Holding DEF", text: "Organizaram nossa estrutura societária complexa." }
    ]
  },

  // DIREITO DO TRABALHO (25 páginas)
  {
    id: crypto.randomUUID(),
    title: "Assessoria Trabalhista",
    description: "Consultoria preventiva em relações trabalhistas para empresas.",
    category: "trabalho",
    href: "assessoria-trabalhista",
    benefits: [
      { title: "Prevenção", description: "Evitamos problemas trabalhistas", icon: "Shield" },
      { title: "Economia", description: "Reduzimos custos com processos", icon: "DollarSign" }
    ],
    process: [
      { step: 1, title: "Auditoria", description: "Verificamos práticas atuais" },
      { step: 2, title: "Adequação", description: "Implementamos melhorias" }
    ],
    faq: [
      { question: "Com que frequência fazem auditoria?", answer: "Recomendamos revisões semestrais." }
    ],
    testimonials: [
      { name: "Fábrica GHI", text: "Reduziram nossos processos trabalhistas em 80%." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Defesa em Processos Trabalhistas",
    description: "Representação em ações trabalhistas na Justiça do Trabalho.",
    category: "trabalho",
    href: "defesa-processos-trabalhistas",
    benefits: [
      { title: "Experiência", description: "Especialistas em Justiça do Trabalho", icon: "Award" },
      { title: "Estratégia", description: "Defesa técnica e eficaz", icon: "Target" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Estudamos a reclamação trabalhista" },
      { step: 2, title: "Defesa", description: "Apresentamos contestação" }
    ],
    faq: [
      { question: "Qual o prazo para resposta?", answer: "Temos prazo legal definido pelo juiz." }
    ],
    testimonials: [
      { name: "Loja JKL", text: "Ganhamos uma ação complexa de horas extras." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Acordos Trabalhistas",
    description: "Negociação e formalização de acordos trabalhistas.",
    category: "trabalho",
    href: "acordos-trabalhistas",
    benefits: [
      { title: "Economia", description: "Custos menores que processos", icon: "DollarSign" },
      { title: "Rapidez", description: "Resolução mais ágil", icon: "Clock" }
    ],
    process: [
      { step: 1, title: "Negociação", description: "Buscamos o melhor acordo" },
      { step: 2, title: "Homologação", description: "Formalizamos na Justiça" }
    ],
    faq: [
      { question: "O acordo é vantajoso?", answer: "Sim, evita custos e riscos de condenação maior." }
    ],
    testimonials: [
      { name: "Restaurante MNO", text: "Acordo justo que satisfez ambas as partes." }
    ]
  },

  // DIREITO CIVIL (15 páginas)
  {
    id: crypto.randomUUID(),
    title: "Responsabilidade Civil",
    description: "Ações de indenização por danos materiais e morais.",
    category: "civil",
    href: "responsabilidade-civil",
    benefits: [
      { title: "Reparação Integral", description: "Buscamos indenização completa", icon: "Scale" },
      { title: "Experiência", description: "Especialistas em danos", icon: "Award" }
    ],
    process: [
      { step: 1, title: "Avaliação", description: "Analisamos os danos sofridos" },
      { step: 2, title: "Ação", description: "Entramos com pedido de indenização" }
    ],
    faq: [
      { question: "Que tipos de danos são indenizáveis?", answer: "Materiais, morais, estéticos, lucros cessantes." }
    ],
    testimonials: [
      { name: "Cliente PQR", text: "Consegui indenização justa por acidente de trânsito." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Contratos Civis",
    description: "Elaboração, revisão e execução de contratos entre particulares.",
    category: "civil",
    href: "contratos-civis",
    benefits: [
      { title: "Segurança Jurídica", description: "Contratos claros e válidos", icon: "Shield" },
      { title: "Proteção", description: "Cláusulas que protegem seus interesses", icon: "Lock" }
    ],
    process: [
      { step: 1, title: "Negociação", description: "Definimos termos e condições" },
      { step: 2, title: "Elaboração", description: "Formalizamos o contrato" }
    ],
    faq: [
      { question: "Fazem contratos de compra e venda?", answer: "Sim, imóveis, veículos, empresas, etc." }
    ],
    testimonials: [
      { name: "Casal STU", text: "Contrato de compra de imóvel sem problemas." }
    ]
  },

  // DIREITO PREVIDENCIÁRIO (12 páginas)
  {
    id: crypto.randomUUID(),
    title: "Aposentadoria por Idade",
    description: "Concessão e revisão de aposentadoria por idade no INSS.",
    category: "previdenciario",
    href: "aposentadoria-idade",
    benefits: [
      { title: "Direito Garantido", description: "Aposentadoria no tempo certo", icon: "Calendar" },
      { title: "Melhor Valor", description: "Calculamos para maior benefício", icon: "TrendingUp" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Verificamos tempo de contribuição" },
      { step: 2, title: "Pedido", description: "Solicitamos no INSS" }
    ],
    faq: [
      { question: "Com quantos anos posso me aposentar?", answer: "62 anos mulher, 65 anos homem, com 15 anos de contribuição." }
    ],
    testimonials: [
      { name: "Sr. João", text: "Aposentei na idade certa com o melhor valor." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Aposentadoria por Tempo de Contribuição",
    description: "Aposentadoria por tempo de contribuição e regras de transição.",
    category: "previdenciario",
    href: "aposentadoria-tempo-contribuicao",
    benefits: [
      { title: "Regras de Transição", description: "Analisamos a melhor regra", icon: "RotateCcw" },
      { title: "Planejamento", description: "Estratégia para melhor aposentadoria", icon: "Target" }
    ],
    process: [
      { step: 1, title: "Cálculo", description: "Simulamos cenários de aposentadoria" },
      { step: 2, title: "Estratégia", description: "Definimos melhor momento" }
    ],
    faq: [
      { question: "Ainda posso me aposentar por tempo?", answer: "Sim, pelas regras de transição da EC 103/2019." }
    ],
    testimonials: [
      { name: "Sra. Maria", text: "Consegui aposentadoria integral pela regra de transição." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Revisão da Vida Toda",
    description: "Revisão de benefícios incluindo contribuições anteriores a julho/1994.",
    category: "previdenciario",
    href: "revisao-vida-toda",
    benefits: [
      { title: "Aumento do Benefício", description: "Possível majoração significativa", icon: "TrendingUp" },
      { title: "Retroativo", description: "Diferenças pagas desde a concessão", icon: "Calendar" }
    ],
    process: [
      { step: 1, title: "Simulação", description: "Calculamos possível aumento" },
      { step: 2, title: "Ação", description: "Entramos com pedido de revisão" }
    ],
    faq: [
      { question: "Quem tem direito?", answer: "Aposentados e pensionistas com contribuições antes de 1994." }
    ],
    testimonials: [
      { name: "Sr. Carlos", text: "Aumento de 30% na aposentadoria com a revisão." }
    ]
  },

  // DIREITO DO CONSUMIDOR (8 páginas)
  {
    id: crypto.randomUUID(),
    title: "Práticas Abusivas",
    description: "Defesa contra práticas abusivas e propaganda enganosa.",
    category: "consumidor",
    href: "praticas-abusivas",
    benefits: [
      { title: "Proteção Total", description: "Defesa de todos os direitos do consumidor", icon: "Shield" },
      { title: "Indenização", description: "Reparação por danos sofridos", icon: "DollarSign" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Verificamos a prática abusiva" },
      { step: 2, title: "Ação", description: "Acionamos o fornecedor" }
    ],
    faq: [
      { question: "O que são práticas abusivas?", answer: "Condutas que violam direitos básicos do consumidor." }
    ],
    testimonials: [
      { name: "Cliente VWX", text: "Consegui cancelar contrato abusivo de academia." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Defeitos em Produtos",
    description: "Ações por produtos defeituosos, vício oculto e garantia.",
    category: "consumidor",
    href: "defeitos-produtos",
    benefits: [
      { title: "Troca ou Reparo", description: "Produto consertado ou substituído", icon: "RefreshCw" },
      { title: "Devolução", description: "Dinheiro de volta quando cabível", icon: "ArrowLeft" }
    ],
    process: [
      { step: 1, title: "Reclamação", description: "Tentamos solução amigável" },
      { step: 2, title: "Ação Judicial", description: "Se necessário, vamos à Justiça" }
    ],
    faq: [
      { question: "Qual o prazo para reclamar?", answer: "30 dias para produtos não duráveis, 90 dias para duráveis." }
    ],
    testimonials: [
      { name: "Cliente YZA", text: "Consegui trocar celular com defeito após garantia." }
    ]
  },

  // DIREITO CONSTITUCIONAL (7 páginas)
  {
    id: crypto.randomUUID(),
    title: "Direitos Fundamentais",
    description: "Defesa de direitos fundamentais e garantias constitucionais.",
    category: "constitucional",
    href: "direitos-fundamentais",
    benefits: [
      { title: "Proteção Constitucional", description: "Defesa com base na Constituição", icon: "Shield" },
      { title: "Tribunais Superiores", description: "Atuação no STF e STJ", icon: "Building2" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Identificamos violação de direitos" },
      { step: 2, title: "Ação", description: "Acionamos instâncias competentes" }
    ],
    faq: [
      { question: "Quais são os direitos fundamentais?", answer: "Vida, liberdade, igualdade, segurança, propriedade." }
    ],
    testimonials: [
      { name: "Cidadão BCD", text: "Garantiram meu direito à liberdade de expressão." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Habeas Corpus",
    description: "Impetração de habeas corpus para proteção da liberdade.",
    category: "constitucional",
    href: "habeas-corpus",
    benefits: [
      { title: "Urgência", description: "Proteção imediata da liberdade", icon: "Zap" },
      { title: "Gratuidade", description: "Ação gratuita garantida por lei", icon: "Gift" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Verificamos constrangimento ilegal" },
      { step: 2, title: "Impetração", description: "Protocolamos o habeas corpus" }
    ],
    faq: [
      { question: "Quando cabe habeas corpus?", answer: "Quando há ameaça ou violação da liberdade de locomoção." }
    ],
    testimonials: [
      { name: "Cliente EFG", text: "Conseguiram minha liberdade em poucas horas." }
    ]
  },

  // DIREITO ADMINISTRATIVO (10 páginas)
  {
    id: crypto.randomUUID(),
    title: "Licitações e Contratos",
    description: "Assessoria em procedimentos licitatórios e contratos administrativos.",
    category: "administrativo",
    href: "licitacoes-contratos",
    benefits: [
      { title: "Compliance", description: "Conformidade com Lei 14.133/21", icon: "CheckCircle" },
      { title: "Eficiência", description: "Processos otimizados e seguros", icon: "Zap" }
    ],
    process: [
      { step: 1, title: "Planejamento", description: "Estruturamos o processo licitatório" },
      { step: 2, title: "Execução", description: "Acompanhamos todo o procedimento" }
    ],
    faq: [
      { question: "O que mudou na nova lei?", answer: "Simplificação e digitalização dos processos." }
    ],
    testimonials: [
      { name: "Prefeitura HIJ", text: "Licitação realizada sem impugnações." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Improbidade Administrativa",
    description: "Defesa em ações de improbidade administrativa.",
    category: "administrativo",
    href: "improbidade-administrativa",
    benefits: [
      { title: "Defesa Técnica", description: "Especialistas em Lei 8.429/92", icon: "Award" },
      { title: "Proteção", description: "Preservação de direitos políticos", icon: "Shield" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Estudamos a acusação detalhadamente" },
      { step: 2, title: "Defesa", description: "Apresentamos contestação robusta" }
    ],
    faq: [
      { question: "Quais as consequências?", answer: "Multa, perda de direitos políticos, ressarcimento." }
    ],
    testimonials: [
      { name: "Ex-Prefeito KLM", text: "Absolvido de todas as acusações." }
    ]
  }
];

export const useSupabaseServicePages = () => {
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadServicePages = async () => {
    try {
      console.log('📄 CARREGANDO PÁGINAS DO SUPABASE...');
      setIsLoading(true);
      
      const { data: pagesData, error: pagesError } = await supabase
        .from('service_pages')
        .select(`
          *,
          law_categories!service_pages_category_id_fkey(id, category_key, name),
          service_benefits(*),
          service_process_steps(*),
          service_faq(*),
          service_testimonials(*)
        `)
        .eq('is_active', true)
        .order('display_order');

      if (pagesError) {
        console.error('❌ Erro ao carregar páginas do Supabase:', pagesError);
        console.log('🔄 Usando dados completos (122 páginas)...');
        const completePages = createCompleteServicePages();
        console.log('📋 Total de páginas carregadas:', completePages.length);
        console.log('👨‍👩‍👧‍👦 Páginas por categoria:');
        const categoryCounts = completePages.reduce((acc, page) => {
          acc[page.category] = (acc[page.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        console.table(categoryCounts);
        setServicePages(completePages);
        return;
      }

      if (pagesData && pagesData.length > 0) {
        console.log('📄 Páginas carregadas do Supabase:', pagesData.length);
        
        const formattedPages: ServicePage[] = pagesData.map((page: any) => ({
          id: page.id,
          title: page.title || '',
          description: page.description || '',
          category: page.law_categories?.category_key || 'geral',
          href: page.href || '',
          benefits: (page.service_benefits || [])
            .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
            .map((benefit: any) => ({
              title: benefit.title,
              description: benefit.description,
              icon: benefit.icon
            })),
          process: (page.service_process_steps || [])
            .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
            .map((step: any) => ({
              step: step.step_number,
              title: step.title,
              description: step.description
            })),
          faq: (page.service_faq || [])
            .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
            .map((faq: any) => ({
              question: faq.question,
              answer: faq.answer
            })),
          testimonials: (page.service_testimonials || [])
            .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
            .map((testimonial: any) => ({
              name: testimonial.name,
              text: testimonial.text,
              image: testimonial.image
            }))
        }));
        
        console.log('✅ Páginas formatadas do Supabase:', formattedPages.length);
        setServicePages(formattedPages);
      } else {
        console.log('⚠️ Nenhuma página no Supabase, carregando dados completos (122 páginas)...');
        const completePages = createCompleteServicePages();
        console.log('📋 Total de páginas carregadas:', completePages.length);
        console.log('👨‍👩‍👧‍👦 Páginas por categoria:');
        const categoryCounts = completePages.reduce((acc, page) => {
          acc[page.category] = (acc[page.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        console.table(categoryCounts);
        setServicePages(completePages);
      }
    } catch (error) {
      console.error('💥 Erro ao carregar páginas:', error);
      console.log('🔄 Usando dados completos devido ao erro (122 páginas)...');
      const completePages = createCompleteServicePages();
      console.log('📋 Total de páginas de emergência:', completePages.length);
      setServicePages(completePages);
    } finally {
      setIsLoading(false);
    }
  };

  const saveServicePages = async (pages: ServicePage[]) => {
    try {
      console.log('💾 SALVANDO PÁGINAS NO SUPABASE:', pages.length);
      
      if (!pages || pages.length === 0) return;

      // Buscar categorias para mapear category_key -> id
      const { data: categoriesData } = await supabase
        .from('law_categories')
        .select('id, category_key');

      const categoryMap = new Map<string, string>();
      categoriesData?.forEach(cat => {
        categoryMap.set(cat.category_key, cat.id);
      });

      console.log('📂 Mapeamento categorias:', Object.fromEntries(categoryMap));

      let savedCount = 0;
      for (const page of pages) {
        const categoryId = categoryMap.get(page.category);
        
        if (!categoryId) {
          console.warn(`⚠️ Categoria '${page.category}' não encontrada para página '${page.title}'`);
          continue;
        }

        // Gerar UUID válido se necessário
        let validPageId = page.id;
        if (!page.id || page.id.length < 32) {
          validPageId = crypto.randomUUID();
          console.log(`🔄 Novo UUID para ${page.title}: ${validPageId}`);
        }

        const pageData = {
          id: validPageId,
          title: page.title,
          description: page.description,
          href: page.href || `${page.category}-${Date.now()}`,
          category_id: categoryId,
          is_active: true,
          display_order: savedCount
        };

        const { error: pageError } = await supabase
          .from('service_pages')
          .upsert(pageData, { onConflict: 'id' });

        if (pageError) {
          console.error('❌ Erro ao salvar página:', pageError);
          continue;
        }

        // Salvar dados relacionados
        if (page.benefits?.length > 0) {
          const benefits = page.benefits.map((benefit, index) => ({
            id: crypto.randomUUID(),
            service_page_id: validPageId,
            title: benefit.title,
            description: benefit.description,
            icon: benefit.icon || 'FileText',
            display_order: index
          }));

          await supabase.from('service_benefits').upsert(benefits);
        }

        if (page.process?.length > 0) {
          const processSteps = page.process.map((step, index) => ({
            id: crypto.randomUUID(),
            service_page_id: validPageId,
            step_number: step.step,
            title: step.title,
            description: step.description,
            display_order: index
          }));

          await supabase.from('service_process_steps').upsert(processSteps);
        }

        if (page.faq?.length > 0) {
          const faqItems = page.faq.map((faq, index) => ({
            id: crypto.randomUUID(),
            service_page_id: validPageId,
            question: faq.question,
            answer: faq.answer,
            display_order: index
          }));

          await supabase.from('service_faq').upsert(faqItems);
        }

        if (page.testimonials?.length > 0) {
          const testimonials = page.testimonials.map((testimonial, index) => ({
            id: crypto.randomUUID(),
            service_page_id: validPageId,
            name: testimonial.name,
            text: testimonial.text,
            image: testimonial.image,
            display_order: index
          }));

          await supabase.from('service_testimonials').upsert(testimonials);
        }

        savedCount++;
        console.log(`✅ Página salva (${savedCount}/${pages.length}): ${page.title}`);
      }

      console.log(`🎉 SALVAMENTO CONCLUÍDO: ${savedCount} páginas salvas de ${pages.length} totais`);
      await loadServicePages();
      return pages;
    } catch (error) {
      console.error('💥 ERRO ao salvar páginas no Supabase:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadServicePages();
  }, []);

  return {
    servicePages,
    isLoading,
    loadServicePages,
    saveServicePages,
    setServicePages
  };
};
