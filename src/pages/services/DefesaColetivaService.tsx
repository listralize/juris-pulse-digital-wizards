
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DefesaColetivaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Consumidor"
      serviceName="Defesa Coletiva"
      serviceDescription="Atuação especializada em ações coletivas para proteção de grupos de consumidores lesados por práticas abusivas sistêmicas. Nossa expertise em litígios coletivos garante defesa eficaz de direitos difusos, coletivos e individuais homogêneos, promovendo transformações significativas no mercado e reparação para milhares de consumidores simultaneamente."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Impacto Sistêmico no Mercado",
          description: "Ações coletivas que não apenas resolvem casos individuais, mas promovem mudanças estruturais nas práticas empresariais, protegendo toda a coletividade de consumidores contra abusos recorrentes."
        },
        {
          title: "Expertise em Litígios Complexos",
          description: "Capacidade técnica para conduzir ações de alta complexidade envolvendo grandes corporações, com conhecimento aprofundado dos procedimentos específicos das ações coletivas e class actions."
        },
        {
          title: "Eficiência e Economia Processual",
          description: "Resolução de múltiplos casos similares em uma única ação, garantindo celeridade, redução de custos e uniformidade nas decisões, beneficiando todos os consumidores afetados."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Identificação de Práticas Sistêmicas",
          description: "Análise para identificar práticas abusivas que afetam coletividade de consumidores, mapeando padrões de conduta irregular e dimensionando o universo de pessoas prejudicadas."
        },
        {
          step: 2,
          title: "Legitimação e Representatividade",
          description: "Verificação de legitimidade ativa para propositura da ação coletiva, seja através de associações de consumidores, Ministério Público ou outros entes legitimados."
        },
        {
          step: 3,
          title: "Instrução Probatória Robusta",
          description: "Coleta de evidências que comprovem a sistematicidade da prática abusiva, incluindo documentos internos da empresa, estatísticas de reclamações e depoimentos de consumidores afetados."
        },
        {
          step: 4,
          title: "Propositura de Ação Coletiva",
          description: "Ajuizamento de ação coletiva com pedidos que incluem cessação da prática abusiva, reparação de danos e medidas para evitar repetição da conduta irregular."
        },
        {
          step: 5,
          title: "Execução e Cumprimento da Sentença",
          description: "Acompanhamento da execução da sentença coletiva, garantindo que todos os consumidores beneficiados recebam suas indenizações e que as práticas abusivas sejam efetivamente cessadas."
        }
      ]}
      testimonials={[
        {
          name: "Associação de Usuários de Telefonia",
          quote: "Nossa ação coletiva contra cobranças indevidas de uma grande operadora resultou na devolução de valores para mais de 50 mil consumidores e mudanças significativas nas práticas da empresa. Foi uma vitória histórica para todo o setor."
        },
        {
          name: "Grupo de Investidores Lesados",
          quote: "A ação coletiva que movemos contra um banco por venda de produtos inadequados resultou em indenização milionária dividida entre todos os prejudicados. Além disso, o banco teve que revisar completamente seus procedimentos de venda."
        },
        {
          name: "Condomínio Residencial",
          quote: "Conseguimos através de ação coletiva que uma construtora reparasse vícios de construção em todo o empreendimento. Além dos reparos, todos os condôminos receberam indenização pelos transtornos. A união fez a diferença."
        },
        {
          name: "Usuários de Plano de Saúde",
          quote: "Nossa ação coletiva contra negativas sistemáticas de cobertura resultou em mudança completa na política da operadora e indenização para milhares de usuários. O impacto foi muito além do nosso caso específico."
        },
        {
          name: "Consumidores de E-commerce",
          quote: "A ação coletiva contra uma grande plataforma de vendas online por entregas atrasadas resultou em melhorias significativas no serviço e compensação para todos os afetados. Foi gratificante ver a mudança acontecer."
        }
      ]}
      faq={[
        {
          question: "Quando uma questão de consumo pode virar ação coletiva?",
          answer: "Quando há lesão a direitos difusos (como publicidade enganosa que afeta a coletividade), coletivos (grupo determinado de pessoas) ou individuais homogêneos (origem comum do dano). Práticas sistêmicas de grandes empresas que afetam múltiplos consumidores são candidatas ideais para ações coletivas."
        },
        {
          question: "Quem pode propor uma ação coletiva de consumo?",
          answer: "Ministério Público, Defensoria Pública, associações de defesa do consumidor constituídas há mais de um ano, e entes federativos. Em casos específicos, sindicatos e outros órgãos também podem ter legitimidade. Nossa expertise inclui articulação com esses entes legitimados."
        },
        {
          question: "Como funciona a reparação em ações coletivas?",
          answer: "Pode haver condenação genérica (princípio da responsabilidade) seguida de liquidação individual, ou já fixação de valores específicos. Os beneficiados podem ser identificados por cadastros, listas ou critérios objetivos estabelecidos na sentença."
        },
        {
          question: "Qual a vantagem da ação coletiva sobre ações individuais?",
          answer: "Além da economia processual, as ações coletivas têm maior poder de pressão sobre grandes empresas, podem gerar mudanças sistêmicas, evitam decisões contraditórias e garantem que consumidores sem recursos também sejam beneficiados. O impacto social é muito maior."
        }
      ]}
      relatedServices={[
        {
          name: "Direitos do Consumidor",
          path: "/servicos/direitos-consumidor"
        },
        {
          name: "Práticas Abusivas",
          path: "/servicos/praticas-abusivas"
        }
      ]}
      mainAreaPath="/consumidor"
    />
  );
};

export default DefesaColetivaService;
