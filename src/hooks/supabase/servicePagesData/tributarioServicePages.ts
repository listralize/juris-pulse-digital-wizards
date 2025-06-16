
import { ServicePage } from '../../../types/adminTypes';

export const createTributarioServicePages = (): ServicePage[] => {
  return [
    {
      id: 'tributario-planejamento',
      title: 'Planejamento Tributário Estratégico',
      description: 'Reduza legalmente sua carga tributária com estratégias personalizadas. Analisamos detalhadamente suas operações para identificar oportunidades de economia fiscal, garantindo maior competitividade e conformidade.',
      category: 'tributario',
      href: '/servicos/planejamento-tributario',
      benefits: [
        {
          title: 'Redução Legal da Carga Tributária',
          description: 'Implementação de estratégias lícitas para redução significativa da carga tributária, utilizando benefícios fiscais, incentivos e regimes especiais disponíveis.',
          icon: '💰'
        },
        {
          title: 'Escolha do Regime Tributário Ideal',
          description: 'Avaliamos qual o melhor enquadramento para sua empresa (Simples Nacional, Lucro Presumido ou Lucro Real), considerando faturamento, margens e atividade econômica.',
          icon: '📊'
        },
        {
          title: 'Reorganização Societária Tributária',
          description: 'Estruturamos fusões, cisões, incorporações com base na Lei das S.A., visando otimizar tributação, segregar riscos e aproveitar benefícios fiscais.',
          icon: '🏢'
        },
        {
          title: 'Simulação de Cenários Fiscais',
          description: 'Projetamos o impacto tributário de diferentes decisões de negócios, permitindo escolhas mais assertivas e seguras para sua empresa.',
          icon: '🎯'
        },
        {
          title: 'Utilização de Incentivos Fiscais',
          description: 'Identificamos e aplicamos legalmente os incentivos e regimes especiais disponíveis para sua atividade e região de atuação.',
          icon: '🎁'
        },
        {
          title: 'Segurança Jurídica Completa',
          description: 'Todas as estratégias são fundamentadas em lei, jurisprudência e doutrina, garantindo proteção contra questionamentos fiscais futuros.',
          icon: '🛡️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Diagnóstico Tributário Completo',
          description: 'Análise detalhada da situação tributária atual, identificação de oportunidades de economia fiscal e mapeamento de riscos existentes na operação.'
        },
        {
          step: 2,
          title: 'Análise de Viabilidade Legal',
          description: 'Estudo aprofundado da legislação aplicável, jurisprudência dos tribunais superiores e posicionamento dos órgãos fiscalizadores sobre as estratégias propostas.'
        },
        {
          step: 3,
          title: 'Elaboração de Estratégias Customizadas',
          description: 'Desenvolvimento de estratégias específicas para cada cliente, considerando atividade, porte, objetivos e perfil de risco tributário da empresa.'
        },
        {
          step: 4,
          title: 'Implementação Estruturada',
          description: 'Execução gradual das estratégias aprovadas, com cronograma definido e acompanhamento de cada etapa de implementação do planejamento.'
        },
        {
          step: 5,
          title: 'Monitoramento e Ajustes',
          description: 'Acompanhamento contínuo dos resultados, monitoramento de mudanças legislativas e ajustes necessários nas estratégias implementadas.'
        },
        {
          step: 6,
          title: 'Relatórios de Performance',
          description: 'Elaboração de relatórios periódicos demonstrando economia fiscal obtida, riscos mitigados e oportunidades futuras identificadas.'
        }
      ],
      faq: [
        {
          question: 'Qual a diferença entre elisão e evasão fiscal?',
          answer: 'Elisão fiscal é a redução lícita de tributos através de planejamento legal antes da ocorrência do fato gerador, utilizando lacunas e benefícios previstos em lei. Evasão fiscal é a sonegação ilegal de tributos após o fato gerador, constituindo crime contra a ordem tributária. A elisão é perfeitamente legal e recomendada, enquanto a evasão é crime.'
        },
        {
          question: 'O planejamento tributário é legal e seguro?',
          answer: 'Sim, o planejamento tributário é totalmente legal quando utiliza meios lícitos previstos na legislação. É direito fundamental do contribuinte organizar seus negócios da forma menos onerosa possível, desde que haja propósito negocial válido e substância econômica nas operações.'
        },
        {
          question: 'Quanto posso economizar com planejamento tributário?',
          answer: 'A economia varia conforme o caso, mas tipicamente fica entre 15% a 40% da carga tributária atual. Empresas podem economizar ainda mais através de reorganizações societárias, mudanças de regime tributário e aproveitamento de incentivos fiscais específicos.'
        },
        {
          question: 'Como escolher o melhor regime tributário para minha empresa?',
          answer: 'A escolha depende do faturamento, atividade, margem de lucro e composição de custos. É necessária análise detalhada comparando Simples Nacional, Lucro Presumido e Lucro Real, considerando projeções de crescimento e características específicas do negócio.'
        },
        {
          question: 'O que é a norma antielisiva e como ela afeta o planejamento?',
          answer: 'É o parágrafo único do art. 116 do CTN, que permite à Receita desconsiderar atos sem propósito negocial que visem apenas economia fiscal. Por isso nosso planejamento sempre considera substância econômica, propósito comercial legítimo e documentação adequada.'
        },
        {
          question: 'Quando é indicado criar uma holding familiar?',
          answer: 'Holdings familiares são indicadas para patrimônios superiores a R$ 2 milhões, visando proteção patrimonial, planejamento sucessório, otimização fiscal na distribuição de lucros e gestão profissional de investimentos familiares.'
        }
      ],
      testimonials: [
        {
          name: 'João Paulo Silva, CEO Grupo Empresarial Delta',
          text: 'O planejamento tributário implementado pelo escritório reduziu nossa carga fiscal em 35% no primeiro ano, mantendo total conformidade legal. O ROI do investimento em consultoria foi excepcional, permitindo reinvestimento em expansão.'
        },
        {
          name: 'Marina Santos, Médica e Empresária',
          text: 'A reestruturação da minha clínica através de holding reduziu significativamente meus impostos pessoais e empresariais. A economia anual de R$ 180 mil me permitiu investir em novos equipamentos e expandir o atendimento.'
        },
        {
          name: 'Carlos Roberto Oliveira, Diretor Comercial Indústria ABC',
          text: 'A migração para o Simples Nacional foi estratégica e trouxe economia de R$ 240 mil anuais em tributos para nossa empresa. O acompanhamento contínuo garante que estamos sempre no regime mais vantajoso.'
        },
        {
          name: 'Ana Lucia Fernandes, Sócia Startup Tech',
          text: 'O planejamento fiscal desde o início da empresa evitou problemas futuros e otimizou nossa estrutura para receber investimentos. A consultoria foi fundamental para nossa credibilidade junto aos investidores.'
        }
      ]
    },
    {
      id: 'tributario-recuperacao',
      title: 'Recuperação de Tributos Pagos Indevidamente',
      description: 'Recupere valores pagos a maior nos últimos 5 anos. Realizamos revisão fiscal completa identificando tributos pagos indevidamente, atuando estrategicamente para restituição, ressarcimento ou compensação.',
      category: 'tributario',
      href: '/servicos/recuperacao-tributos',
      benefits: [
        {
          title: 'Recuperação de Tributos Diretos',
          description: 'IRPJ (Imposto de Renda Pessoa Jurídica) e CSLL (Contribuição Social sobre o Lucro Líquido) pagos indevidamente ou a maior.',
          icon: '💼'
        },
        {
          title: 'Recuperação de Tributos Indiretos',
          description: 'PIS, COFINS, ICMS e IPI. Incluindo exclusão do ICMS da base de cálculo de PIS/COFINS (Tema 69 STF) e ressarcimento de IPI.',
          icon: '🔄'
        },
        {
          title: 'Recuperação de Contribuições Previdenciárias',
          description: 'INSS e outras contribuições parafiscais pagas indevidamente, incluindo questionamentos sobre base de cálculo e alíquotas.',
          icon: '👥'
        },
        {
          title: 'Compensação Tributária Estratégica',
          description: 'Utilização de créditos tributários para quitar débitos futuros, com base na Lei nº 9.430/96, otimizando o fluxo de caixa.',
          icon: '⚖️'
        },
        {
          title: 'Aumento do Fluxo de Caixa',
          description: 'Recuperação de valores significativos que podem ser reinvestidos no negócio ou utilizados para pagamento de outras obrigações.',
          icon: '💰'
        },
        {
          title: 'Conformidade e Otimização',
          description: 'Processo conduz à conformidade fiscal completa e otimização da gestão tributária para evitar novos pagamentos indevidos.',
          icon: '📈'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Auditoria Fiscal Retrospectiva',
          description: 'Análise detalhada dos últimos 5 anos de recolhimentos tributários, identificando pagamentos indevidos ou a maior através de revisão documental completa.'
        },
        {
          step: 2,
          title: 'Quantificação dos Créditos',
          description: 'Cálculo preciso dos valores a serem recuperados, incluindo correção monetária, juros e demais encargos legais devidos pela Fazenda Pública.'
        },
        {
          step: 3,
          title: 'Fundamentação Jurídica',
          description: 'Elaboração de fundamentação legal robusta baseada em legislação, jurisprudência do STF e STJ, e precedentes administrativos favoráveis.'
        },
        {
          step: 4,
          title: 'Protocolo dos Pedidos',
          description: 'Formalização dos pedidos de restituição junto aos órgãos competentes (RFB, SEFAZ) com toda documentação comprobatória necessária.'
        },
        {
          step: 5,
          title: 'Acompanhamento Processual',
          description: 'Monitoramento dos pedidos administrativos e, se necessário, propositura de ações judiciais para garantir a recuperação dos valores.'
        },
        {
          step: 6,
          title: 'Recebimento e Compensação',
          description: 'Gestão do recebimento dos valores através de restituição direta, compensação com débitos futuros ou precatórios, conforme mais vantajoso.'
        }
      ],
      faq: [
        {
          question: 'Qual o prazo para pedir restituição de tributos?',
          answer: 'O prazo geral é de 5 anos contados do pagamento indevido (prazo decadencial). Para alguns tributos específicos ou situações especiais, pode haver prazos diferenciados. É importante agir rapidamente para não perder o direito à recuperação.'
        },
        {
          question: 'Quais tributos podem ser recuperados?',
          answer: 'Praticamente todos os tributos podem ser objeto de recuperação: IRPJ, CSLL, PIS, COFINS, ICMS, IPI, ISS, INSS, além de taxas e contribuições diversas. O mais comum são recuperações de PIS/COFINS (exclusão do ICMS) e ICMS substituição tributária.'
        },
        {
          question: 'Como funciona a compensação de tributos?',
          answer: 'A compensação permite utilizar créditos tributários para quitar débitos de mesma natureza ou, em alguns casos, de natureza diversa. É regulamentada pela Lei nº 9.430/96 e pode ser mais vantajosa que aguardar restituição em dinheiro.'
        },
        {
          question: 'É possível recuperar ICMS pago na conta de energia elétrica?',
          answer: 'Sim, existe jurisprudência consolidada permitindo a recuperação de ICMS incidente sobre demanda contratada de energia elétrica. O STF reconheceu que não há circulação de mercadoria na demanda de potência disponibilizada.'
        },
        {
          question: 'Quanto tempo demora para receber a restituição?',
          answer: 'Na via administrativa, pode levar de 6 meses a 2 anos, dependendo do órgão e complexidade. Na via judicial, o prazo é maior, mas há possibilidade de antecipação de tutela em casos bem fundamentados. A compensação é mais rápida.'
        },
        {
          question: 'Há risco de questionamento futuro pela Receita?',
          answer: 'Quando bem fundamentada juridicamente, a recuperação não gera riscos. Utilizamos apenas teses consolidadas na jurisprudência e precedentes administrativos. Fornecemos parecer jurídico completo sobre os riscos envolvidos.'
        }
      ],
      testimonials: [
        {
          name: 'Grupo Empresarial Mediterrâneo, Diretor Financeiro',
          text: 'A recuperação de créditos de PIS/COFINS dos últimos 5 anos resultou em R$ 1,2 milhão devolvidos para a empresa. O processo foi conduzido com total profissionalismo e fundamentação jurídica impecável.'
        },
        {
          name: 'Indústria Química Omega, Controller',
          text: 'Descobrimos através da auditoria créditos de ICMS substituição tributária não aproveitados no valor de R$ 850 mil. A consultoria identificou oportunidades que nossa equipe interna não havia percebido.'
        },
        {
          name: 'Rede de Supermercados Regional, CFO',
          text: 'A recuperação de ICMS sobre energia elétrica (demanda contratada) dos últimos anos trouxe R$ 320 mil para nosso caixa. Recursos fundamentais para investimento em modernização das lojas.'
        },
        {
          name: 'Transportadora Nacional, Sócio-Diretor',
          text: 'Conseguimos recuperar contribuições previdenciárias pagas indevidamente sobre valores não integrantes da folha de salários. Economia anual de R$ 180 mil que fez toda diferença no resultado da empresa.'
        }
      ]
    },
    {
      id: 'tributario-defesa-autuacao',
      title: 'Defesa em Autuações e Contencioso Administrativo',
      description: 'Expertise na defesa contra autos de infração e notificações fiscais. Protegemos seus direitos buscando anulação ou redução de cobranças indevidas em todas as esferas administrativas.',
      category: 'tributario',
      href: '/servicos/defesa-autuacao',
      benefits: [
        {
          title: 'Defesa Técnica Especializada',
          description: 'Elaboração de impugnações e recursos fundamentados perante RFB, SEFAZ, CARF, TIT seguindo procedimentos do Decreto nº 70.235/72.',
          icon: '⚖️'
        },
        {
          title: 'Redução ou Anulação de Multas',
          description: 'Contestação eficaz de penalidades fiscais, buscando cancelamento total ou redução significativa dos valores exigidos.',
          icon: '💰'
        },
        {
          title: 'Resolução Célere',
          description: 'Resolução de conflitos de forma mais rápida e menos custosa que a via judicial, mantendo relacionamento com o fisco.',
          icon: '⚡'
        },
        {
          title: 'Segurança Jurídica',
          description: 'Manutenção da segurança jurídica através de defesas bem fundamentadas e conhecimento especializado da legislação.',
          icon: '🛡️'
        },
        {
          title: 'Suspensão de Exigibilidade',
          description: 'Durante o processo administrativo, a exigibilidade do crédito fica suspensa, protegendo o patrimônio da empresa.',
          icon: '⏸️'
        },
        {
          title: 'Precedentes Favoráveis',
          description: 'Utilização de jurisprudência administrativa consolidada e precedentes do CARF para fundamentar as defesas.',
          icon: '📚'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise Técnica do Auto de Infração',
          description: 'Estudo detalhado do auto de infração, identificando vícios formais, materiais e oportunidades de defesa com base na legislação aplicável.'
        },
        {
          step: 2,
          title: 'Estratégia de Defesa',
          description: 'Definição da melhor estratégia processual, considerando jurisprudência administrativa, precedentes do CARF e peculiaridades do caso.'
        },
        {
          step: 3,
          title: 'Elaboração da Impugnação',
          description: 'Redação técnica da impugnação ou recurso com fundamentação jurídica robusta, incluindo toda documentação comprobatória necessária.'
        },
        {
          step: 4,
          title: 'Protocolo e Acompanhamento',
          description: 'Protocolo tempestivo da defesa e acompanhamento processual em todas as instâncias administrativas (primeira instância, CARF).'
        },
        {
          step: 5,
          title: 'Recursos e Instâncias Superiores',
          description: 'Interposição de recursos para instâncias superiores quando necessário, mantendo a defesa ativa até decisão definitiva.'
        },
        {
          step: 6,
          title: 'Resultado e Orientações',
          description: 'Comunicação do resultado e orientações sobre cumprimento da decisão ou necessidade de medidas judiciais complementares.'
        }
      ],
      faq: [
        {
          question: 'Qual o prazo para contestar um auto de infração?',
          answer: 'O prazo geral é de 30 dias da ciência do auto de infração para apresentar impugnação. Este prazo é improrrogável e a perda do prazo implica na perda do direito de defesa administrativa, restando apenas a via judicial.'
        },
        {
          question: 'Posso contestar qualquer tipo de multa fiscal?',
          answer: 'Sim, todo auto de infração pode ser contestado. Sempre há possibilidade de defesa administrativa, seja questionando aspectos formais, materiais, valores ou a própria aplicabilidade da norma. Mesmo em casos aparentemente sem defesa, podem existir vícios processuais.'
        },
        {
          question: 'O que acontece durante o processo administrativo?',
          answer: 'Durante a tramitação do processo administrativo, a exigibilidade do crédito tributário fica suspensa, ou seja, não há cobrança nem inscrição em dívida ativa. Isso protege a empresa de medidas executórias enquanto se discute a legalidade da autuação.'
        },
        {
          question: 'Vale a pena sempre contestar ou é melhor pagar?',
          answer: 'Cada caso deve ser analisado individualmente. Consideramos fatores como: fundamentos da autuação, valor envolvido, histórico de precedentes, custos processuais e estratégia fiscal da empresa. Em muitos casos, a contestação resulta em redução significativa ou anulação total.'
        },
        {
          question: 'Como funciona o julgamento no CARF?',
          answer: 'O CARF (Conselho Administrativo de Recursos Fiscais) é a segunda instância administrativa federal. Os julgamentos são realizados por câmaras compostas por representantes da Fazenda e contribuintes. É possível apresentar alegações finais e sustentação oral.'
        },
        {
          question: 'E se perder na esfera administrativa?',
          answer: 'Mesmo com decisão desfavorável na esfera administrativa, ainda é possível recorrer ao Poder Judiciário. Muitas vezes, argumentos não aceitos administrativamente são acolhidos pelo Judiciário. Avaliamos a viabilidade de ação judicial em cada caso.'
        }
      ],
      testimonials: [
        {
          name: 'Indústria Metalúrgica Premier, Diretor Tributário',
          text: 'A defesa contra autuação de ICMS substituição tributária resultou na anulação completa da multa de R$ 800 mil. A fundamentação jurídica foi perfeita e o resultado superou nossas expectativas.'
        },
        {
          name: 'Distribuidora Regional, Controller',
          text: 'Conseguimos reduzir em 90% uma multa de PIS/COFINS através de defesa bem fundamentada no CARF. O escritório demonstrou profundo conhecimento da jurisprudência administrativa.'
        },
        {
          name: 'Grupo Varejista, CFO',
          text: 'A contestação de auto de infração por desenquadramento do Simples Nacional foi totalmente procedente. Evitamos cobrança adicional de R$ 450 mil e mantivemos o regime simplificado.'
        },
        {
          name: 'Empresa de Logística, Sócio-Diretor',
          text: 'A defesa administrativa contra autuação trabalhista/previdenciária foi exitosa em primeira instância. A expertise em contencioso foi fundamental para demonstrar a incorreção da fiscalização.'
        }
      ]
    },
    {
      id: 'tributario-parcelamento',
      title: 'Parcelamento e Renegociação de Débitos Fiscais',
      description: 'Negociação estratégica de parcelamentos e programas de regularização fiscal. Auxiliamos na adesão a Refis e outros programas, reduzindo multas, juros e encargos significativamente.',
      category: 'tributario',
      href: '/servicos/parcelamento-debitos',
      benefits: [
        {
          title: 'Redução de Multas e Juros',
          description: 'Negociação de condições favoráveis em programas de parcelamento, com significativa redução de multas, juros e encargos legais.',
          icon: '📉'
        },
        {
          title: 'Regularização Fiscal Completa',
          description: 'Regularização da situação fiscal da empresa, permitindo obtenção de certidões negativas e participação em licitações.',
          icon: '✅'
        },
        {
          title: 'Gestão do Fluxo de Caixa',
          description: 'Parcelamento adequado à capacidade de pagamento, preservando o capital de giro e viabilidade operacional da empresa.',
          icon: '💰'
        },
        {
          title: 'Prevenção de Medidas Executórias',
          description: 'Evita penhoras, bloqueios judiciais e protestos, mantendo a saúde financeira e reputação creditícia do negócio.',
          icon: '🛡️'
        },
        {
          title: 'Análise de Modalidades',
          description: 'Avaliação das melhores modalidades: parcelamento ordinário, transação, Refis, considerando benefícios específicos de cada programa.',
          icon: '🔍'
        },
        {
          title: 'Acompanhamento Jurídico',
          description: 'Defesa contra execuções fiscais utilizando embargos e exceções, suspenção da cobrança durante negociação.',
          icon: '⚖️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Levantamento Completo de Débitos',
          description: 'Mapeamento de todos os débitos tributários federais, estaduais e municipais, incluindo valores, prazos e situação atual de cada um.'
        },
        {
          step: 2,
          title: 'Análise de Capacidade de Pagamento',
          description: 'Avaliação da situação financeira da empresa para definir a melhor estratégia de parcelamento compatível com o fluxo de caixa.'
        },
        {
          step: 3,
          title: 'Escolha da Modalidade Ideal',
          description: 'Seleção entre parcelamento comum, transação tributária, programas especiais (Refis) considerando benefícios e requisitos de cada modalidade.'
        },
        {
          step: 4,
          title: 'Negociação com a PGFN',
          description: 'Negociação direta com a Procuradoria-Geral da Fazenda Nacional e órgãos estaduais/municipais para obter melhores condições.'
        },
        {
          step: 5,
          title: 'Formalização do Acordo',
          description: 'Elaboração e protocolo de todos os documentos necessários para formalização do parcelamento ou transação tributária.'
        },
        {
          step: 6,
          title: 'Gestão e Acompanhamento',
          description: 'Acompanhamento do cumprimento do parcelamento, alertas de vencimentos e gestão de eventuais renegociações necessárias.'
        }
      ],
      faq: [
        {
          question: 'Quais tributos podem ser parcelados?',
          answer: 'Praticamente todos os tributos federais, estaduais e municipais podem ser parcelados: IRPJ, CSLL, PIS, COFINS, IPI, ICMS, ISS, INSS, FGTS, além de multas e encargos. Cada ente federativo tem suas próprias regras e programas específicos.'
        },
        {
          question: 'Qual a diferença entre parcelamento e transação tributária?',
          answer: 'Parcelamento comum apenas divide o débito em parcelas com juros e correção. Transação tributária (Lei nº 13.988/2020) permite redução de multas, juros e até principal, mediante concessões mútuas entre contribuinte e Fisco.'
        },
        {
          question: 'Como funciona o programa Refis?',
          answer: 'Refis são programas especiais de regularização com benefícios excepcionais: entrada reduzida, parcelamento em até 180 meses, redução significativa de multas e juros. São temporários e têm requisitos específicos para adesão.'
        },
        {
          question: 'O que acontece se eu não conseguir pagar as parcelas?',
          answer: 'O descumprimento do parcelamento implica rescisão automática e retomada da cobrança do valor integral. Por isso, é fundamental um parcelamento realista. Em casos excepcionais, é possível renegociar o acordo.'
        },
        {
          question: 'Posso parcelar mesmo sendo MEI ou Simples Nacional?',
          answer: 'Sim, MEI e empresas do Simples Nacional também podem aderir a parcelamentos e programas de regularização. Existem modalidades específicas e mais vantajosas para empresas de pequeno porte.'
        },
        {
          question: 'O parcelamento impede a obtenção de certidões negativas?',
          answer: 'Durante a vigência do parcelamento adimplente, a empresa obtém certidão positiva com efeitos de negativa, que serve para a maioria dos fins legais, incluindo participação em licitações e financiamentos.'
        }
      ],
      testimonials: [
        {
          name: 'Construtora Regional, Diretor Executivo',
          text: 'O parcelamento de débitos previdenciários em 120 vezes com redução de 70% das multas salvou nossa empresa. Conseguimos regularizar R$ 2,3 milhões em dívidas e voltar a participar de licitações.'
        },
        {
          name: 'Rede de Restaurantes, Sócia-Proprietária',
          text: 'A adesão ao programa de transação tributária municipal reduziu nossa dívida de ISS de R$ 180 mil para R$ 65 mil à vista. A economia foi fundamental para superarmos a crise e mantermos os empregos.'
        },
        {
          name: 'Indústria Têxtil Familiar, CFO',
          text: 'Conseguimos parcelar débitos de ICMS em 60 vezes após demonstrar nossa capacidade de pagamento. O acompanhamento jurídico evitou a penhora de nossos equipamentos industriais.'
        },
        {
          name: 'Empresa de Tecnologia, CEO',
          text: 'O parcelamento estratégico dos débitos federais permitiu preservar nosso capital de giro para investimentos em P&D. A consultoria foi essencial para escolher a modalidade mais vantajosa.'
        }
      ]
    },
    {
      id: 'tributario-compliance',
      title: 'Compliance Tributário e Consultas Especializadas',
      description: 'Programa completo de conformidade fiscal e consultas estratégicas. Garantimos adequação às normas, prevenimos riscos e fornecemos segurança jurídica através de pareceres e consultas formais.',
      category: 'tributario',
      href: '/servicos/compliance-tributario',
      benefits: [
        {
          title: 'Programa de Conformidade Estruturado',
          description: 'Implementação de compliance baseado na Lei Anticorrupção (Lei nº 12.846/2013) e princípios de governança corporativa.',
          icon: '🎯'
        },
        {
          title: 'Pareceres Jurídicos Especializados',
          description: 'Documentos técnicos com análise de fatos, normas, jurisprudência e doutrina, fornecendo segurança para decisões estratégicas.',
          icon: '📋'
        },
        {
          title: 'Consultas Formais à Legislação',
          description: 'Formalização de consultas junto à RFB e SEFAZ para obter interpretação oficial, suspendendo aplicação de multas sobre a matéria.',
          icon: '🏛️'
        },
        {
          title: 'Prevenção de Multas e Sanções',
          description: 'Identificação proativa de riscos fiscais e implementação de controles para evitar autuações e penalidades futuras.',
          icon: '🛡️'
        },
        {
          title: 'Monitoramento Legislativo',
          description: 'Acompanhamento contínuo de mudanças na legislação tributária e impactos nas operações da empresa.',
          icon: '📡'
        },
        {
          title: 'Otimização de Processos',
          description: 'Revisão e melhoria de processos internos relacionados a obrigações fiscais (SPED, DCTF, ECF, DEFIS).',
          icon: '⚙️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Diagnóstico de Conformidade',
          description: 'Avaliação completa dos processos fiscais atuais, identificação de gaps de compliance e mapeamento de riscos tributários em todas as esferas.'
        },
        {
          step: 2,
          title: 'Elaboração de Políticas e Procedimentos',
          description: 'Desenvolvimento de políticas internas, procedimentos operacionais e controles específicos para garantir conformidade fiscal permanente.'
        },
        {
          step: 3,
          title: 'Implementação de Controles',
          description: 'Instalação de sistemas de controle interno, definição de responsabilidades e estabelecimento de rotinas de verificação e auditoria.'
        },
        {
          step: 4,
          title: 'Treinamento de Equipes',
          description: 'Capacitação das equipes internas sobre obrigações fiscais, novos procedimentos e importância do compliance tributário.'
        },
        {
          step: 5,
          title: 'Monitoramento e Relatórios',
          description: 'Acompanhamento contínuo da efetividade dos controles, elaboração de relatórios gerenciais e identificação de melhorias.'
        },
        {
          step: 6,
          title: 'Atualização e Melhoria Contínua',
          description: 'Revisão periódica dos procedimentos, adequação às mudanças legislativas e implementação de melhorias nos processos.'
        }
      ],
      faq: [
        {
          question: 'O que é compliance tributário e por que é importante?',
          answer: 'Compliance tributário é o conjunto de práticas e controles para garantir conformidade com todas as obrigações fiscais. É importante para prevenir multas, reduzir riscos, facilitar fiscalizações e demonstrar boa governança para investidores e parceiros.'
        },
        {
          question: 'Qual a importância de um parecer jurídico tributário?',
          answer: 'O parecer fornece análise técnica aprofundada sobre questões complexas, oferecendo segurança jurídica para tomadas de decisão. Documenta a fundamentação legal das estratégias adotadas, protegendo contra questionamentos futuros.'
        },
        {
          question: 'Como funcionam as consultas formais à legislação?',
          answer: 'São petições dirigidas aos órgãos fiscais para obter interpretação oficial sobre casos concretos. A resposta vincula o órgão consultado e suspende aplicação de multas sobre a matéria, proporcionando segurança jurídica máxima.'
        },
        {
          question: 'Quais obrigações acessórias devem ser monitoradas?',
          answer: 'SPED Fiscal, SPED Contribuições, DCTF, ECF, DEFIS, EFD-ICMS/IPI, DIRF, RAIS, além de declarações específicas de cada atividade. O não cumprimento gera multas automáticas significativas.'
        },
        {
          question: 'Como o compliance ajuda em fiscalizações?',
          answer: 'Empresas com compliance estruturado têm fiscalizações mais tranquilas, com documentação organizada, procedimentos claros e menor probabilidade de autuações. Demonstra boa-fé e comprometimento com as obrigações legais.'
        },
        {
          question: 'Qual o retorno do investimento em compliance?',
          answer: 'O ROI é alto considerando a prevenção de multas, redução de custos com contencioso, otimização de processos e melhoria da reputação corporativa. Empresas compliance-driven atraem mais investimentos e parceiros.'
        }
      ],
      testimonials: [
        {
          name: 'Multinacional de Tecnologia, Head de Tax',
          text: 'O programa de compliance tributário estruturado eliminou 100% das penalidades por atraso e nos deu total controle sobre obrigações em 15 estados. O investimento se pagou em 8 meses.'
        },
        {
          name: 'Grupo Financeiro Regional, Diretor de Riscos',
          text: 'Os pareceres especializados nos deram segurança jurídica para implementar estratégias inovadoras de captação. A fundamentação jurídica é sempre impecável e bem documentada.'
        },
        {
          name: 'Holding de Investimentos, CFO',
          text: 'As consultas formais esclareceram questões complexas de tributação sobre fundos de investimento, evitando contingências estimadas em R$ 8 milhões. A estratégia foi perfeita.'
        },
        {
          name: 'Indústria Automobilística, Gerente Fiscal',
          text: 'O compliance implementado transformou nossa gestão fiscal. Reduzimos em 95% as inconsistências em obrigações acessórias e melhoramos significativamente nosso relacionamento com o fisco.'
        }
      ]
    },
    {
      id: 'tributario-incentivos',
      title: 'Incentivos Fiscais e Benefícios Tributários',
      description: 'Identificação e estruturação de incentivos fiscais para sua empresa. Avaliamos viabilidade e auxiliamos na obtenção de benefícios que podem gerar reduções e isenções tributárias significativas.',
      category: 'tributario',
      href: '/servicos/incentivos-fiscais',
      benefits: [
        {
          title: 'Incentivos Federais Especializados',
          description: 'Lei do Bem (Lei nº 11.196/2005) para empresas que investem em P&D, programas de inovação tecnológica e desenvolvimento sustentável.',
          icon: '🇧🇷'
        },
        {
          title: 'Incentivos Regionais Estratégicos',
          description: 'Benefícios para zonas incentivadas (Zona Franca de Manaus, SUDENE, SUDAM) e programas de desenvolvimento regional específicos.',
          icon: '🌎'
        },
        {
          title: 'Incentivos Setoriais',
          description: 'Regimes especiais para setores específicos: indústria, agronegócio, tecnologia, energia renovável, conforme atividade da empresa.',
          icon: '🏭'
        },
        {
          title: 'Patrocínios Culturais e Esportivos',
          description: 'Assessoria na utilização de leis de incentivo à cultura (Lei Rouanet) e ao esporte para abatimento fiscal estratégico.',
          icon: '🎭'
        },
        {
          title: 'Redução Direta da Carga Tributária',
          description: 'Diminuição significativa de impostos através de aproveitamento legal de benefícios e regimes especiais disponíveis.',
          icon: '📉'
        },
        {
          title: 'Aumento da Competitividade',
          description: 'Melhoria da posição competitiva através de custos tributários otimizados e fomento a investimentos em inovação.',
          icon: '🚀'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Mapeamento de Oportunidades',
          description: 'Identificação de todos os incentivos fiscais aplicáveis à atividade, localização e características específicas da empresa.'
        },
        {
          step: 2,
          title: 'Análise de Viabilidade',
          description: 'Avaliação detalhada dos requisitos, benefícios, custos de implementação e retorno esperado de cada incentivo identificado.'
        },
        {
          step: 3,
          title: 'Planejamento de Adequação',
          description: 'Elaboração de plano para adequação da empresa aos requisitos necessários para obtenção e manutenção dos benefícios.'
        },
        {
          step: 4,
          title: 'Estruturação dos Pedidos',
          description: 'Preparação de toda documentação necessária e formalização dos pedidos junto aos órgãos competentes.'
        },
        {
          step: 5,
          title: 'Acompanhamento da Concessão',
          description: 'Monitoramento do processo de análise pelos órgãos concessores e complementação de informações quando necessário.'
        },
        {
          step: 6,
          title: 'Gestão da Conformidade',
          description: 'Acompanhamento contínuo do cumprimento dos requisitos para manutenção dos benefícios e otimização dos resultados.'
        }
      ],
      faq: [
        {
          question: 'Quais empresas podem se beneficiar da Lei do Bem?',
          answer: 'Empresas tributadas pelo Lucro Real que investem em pesquisa e desenvolvimento de inovação tecnológica. Os benefícios incluem dedução fiscal de até 200% dos gastos com P&D e depreciação acelerada de equipamentos.'
        },
        {
          question: 'Como funciona a Zona Franca de Manaus?',
          answer: 'Oferece isenção de IPI, redução de IRPJ e CSLL, e benefícios de ICMS para indústrias instaladas na região. É necessário cumprir processo produtivo básico e índices de nacionalização específicos para cada produto.'
        },
        {
          question: 'Quais são os incentivos para energia renovável?',
          answer: 'Existem diversos benefícios como isenção de IPI para equipamentos, redução de ICMS em vários estados, financiamentos subsidiados pelo BNDES e possibilidade de depreciação acelerada para investimentos no setor.'
        },
        {
          question: 'Como usar a Lei Rouanet para reduzir impostos?',
          answer: 'Pessoas jurídicas podem deduzir até 4% do IRPJ devido através de patrocínio a projetos culturais aprovados. É uma forma de investimento social com benefício fiscal direto, promovendo cultura e arte.'
        },
        {
          question: 'Quais os riscos de perder incentivos concedidos?',
          answer: 'O descumprimento de requisitos pode levar à perda dos benefícios e cobrança retroativa dos tributos. Por isso fazemos acompanhamento contínuo da conformidade e alertamos sobre prazos e obrigações.'
        },
        {
          question: 'É possível combinar diferentes incentivos fiscais?',
          answer: 'Sim, em muitos casos é possível combinar incentivos federais, estaduais e municipais, desde que não haja vedação específica. Analisamos todas as possibilidades para maximizar os benefícios legalmente.'
        }
      ],
      testimonials: [
        {
          name: 'Startup de Biotecnologia, CEO',
          text: 'A estruturação para aproveitamento da Lei do Bem resultou em economia de R$ 280 mil anuais em impostos. Os recursos economizados foram reinvestidos em novos projetos de P&D, criando um ciclo virtuoso de inovação.'
        },
        {
          name: 'Indústria de Eletrônicos, Diretor Industrial',
          text: 'A instalação de nossa unidade na Zona Franca de Manaus, com assessoria completa do escritório, gerou economia fiscal de 40% nos custos tributários. O projeto se tornou viável e competitivo.'
        },
        {
          name: 'Empresa de Energia Solar, Sócia-Fundadora',
          text: 'Os incentivos fiscais para energia renovável identificados pelo escritório foram fundamentais para a viabilidade econômica de nossos projetos. Conseguimos reduzir significativamente o payback dos investimentos.'
        },
        {
          name: 'Grupo de Comunicação, VP Financeiro',
          text: 'A utilização estratégica da Lei Rouanet nos permite investir em cultura enquanto reduzimos nossa carga fiscal. É uma win-win situation que fortalece nossa responsabilidade social e competitividade.'
        }
      ]
    }
  ];
};
