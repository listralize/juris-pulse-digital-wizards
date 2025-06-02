
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ContenciosoTributarioService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Contencioso Tributário"
      serviceDescription="Defesa especializada em processos administrativos e judiciais tributários, contestação de autuações fiscais e recuperação de tributos pagos indevidamente."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Defesa em Autuações Fiscais",
          description: "Contestação técnica de autos de infração, notificações fiscais e lançamentos tributários com fundamentos jurídicos sólidos e jurisprudência atualizada.",
          icon: "🛡️"
        },
        {
          title: "Processos Administrativos Especializados",
          description: "Condução estratégica de processos no CARF, TIT, tribunais estaduais e municipais com conhecimento específico de cada esfera administrativa.",
          icon: "⚖️"
        },
        {
          title: "Ações Judiciais Tributárias",
          description: "Propositura e defesa em ações anulatórias, mandados de segurança, execuções fiscais e embargos com estratégias processuais eficazes.",
          icon: "🏛️"
        },
        {
          title: "Recuperação de Tributos",
          description: "Identificação e recuperação de tributos pagos indevidamente através de ações de repetição de indébito e compensação tributária.",
          icon: "💰"
        },
        {
          title: "Parcelamentos e Transações",
          description: "Negociação de parcelamentos especiais, programas de refinanciamento e transações tributárias com condições mais favoráveis.",
          icon: "🤝"
        },
        {
          title: "Recursos aos Tribunais Superiores",
          description: "Interposição de recursos especiais ao STJ e extraordinários ao STF em questões tributárias de grande relevância e repercussão geral.",
          icon: "📚"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Técnica da Autuação",
          description: "Exame detalhado do auto de infração, legislação aplicada, procedimento fiscal adotado e identificação de vícios formais e materiais."
        },
        {
          step: 2,
          title: "Elaboração de Estratégia Defensiva",
          description: "Desenvolvimento de teses jurídicas específicas, pesquisa de jurisprudência favorável e definição da melhor estratégia processual."
        },
        {
          step: 3,
          title: "Defesa Administrativa Primeira Instância",
          description: "Apresentação de impugnação fundamentada na primeira instância administrativa com toda documentação probatória necessária."
        },
        {
          step: 4,
          title: "Recursos Administrativos Superiores",
          description: "Interposição de recursos ao CARF ou tribunais estaduais/municipais, sustentação oral quando necessária e acompanhamento do julgamento."
        },
        {
          step: 5,
          title: "Ação Judicial Estratégica",
          description: "Propositura de ação judicial quando esgotada via administrativa ou quando há urgência que justifique a tutela jurisdicional."
        },
        {
          step: 6,
          title: "Execução de Decisões Favoráveis",
          description: "Implementação prática das decisões favoráveis, seja através de compensação, restituição ou cancelamento de débitos."
        }
      ]}
      testimonials={[
        {
          name: "Empresa ABC Ltda.",
          quote: "Conseguimos reverter uma autuação de R$ 2,5 milhões no CARF. A defesa técnica foi impecável e salvou nossa empresa de uma crise financeira."
        },
        {
          name: "Grupo Industrial XYZ",
          quote: "A recuperação de ICMS pago indevidamente nos últimos 5 anos resultou em crédito de R$ 800 mil para reinvestimento na empresa."
        },
        {
          name: "Maria S., Empresária",
          quote: "A ação anulatória de débito fiscal foi julgada procedente, cancelando uma cobrança indevida de R$ 350 mil em minha empresa."
        },
        {
          name: "Construtora Sigma",
          quote: "O parcelamento especial negociado reduziu em 70% as multas e permitiu quitação do débito sem comprometer o fluxo de caixa."
        },
        {
          name: "Comércio Beta",
          quote: "A defesa no processo de execução fiscal resultou na redução do débito de R$ 500 mil para R$ 150 mil através de transação."
        }
      ]}
      faq={[
        {
          question: "O que fazer quando recebo um auto de infração?",
          answer: "Não ignore o auto de infração. Procure orientação jurídica imediatamente, pois há prazos legais para contestação (geralmente 30 dias). A defesa tempestiva pode resultar no cancelamento total da autuação."
        },
        {
          question: "É possível contestar qualquer autuação fiscal?",
          answer: "Sim, qualquer autuação pode ser contestada se houver fundamentos legais. Mesmo quando o débito é devido, é possível questionar multas excessivas, juros ou vícios no procedimento fiscal."
        },
        {
          question: "Quanto tempo demora um processo tributário administrativo?",
          answer: "Processos administrativos demoram em média 2 a 4 anos na primeira instância e mais 2 a 3 anos no CARF. Tribunais estaduais e municipais têm prazos variáveis, geralmente menores."
        },
        {
          question: "Posso parcelar um débito fiscal em discussão?",
          answer: "Sim, é possível aderir a parcelamentos mesmo com débito em discussão administrativa ou judicial. Isso evita a inscrição em dívida ativa e execução fiscal, mas implica confissão do débito."
        },
        {
          question: "Como recuperar tributos pagos indevidamente?",
          answer: "Através de ação de repetição de indébito no prazo de 5 anos, pedido de compensação na Receita Federal ou restituição direta quando possível. É necessário comprovar o pagamento indevido."
        },
        {
          question: "O que é o CARF e como funciona?",
          answer: "O CARF (Conselho Administrativo de Recursos Fiscais) é o tribunal administrativo federal que julga recursos contra decisões da Receita Federal. É composto por conselheiros representantes do governo e contribuintes."
        },
        {
          question: "Posso recorrer ao Judiciário se perder no administrativo?",
          answer: "Sim, o Brasil adota o sistema de jurisdição única. Sempre é possível recorrer ao Poder Judiciário, mesmo após decisão administrativa desfavorável, respeitando os prazos prescricionais."
        },
        {
          question: "Vale a pena fazer transação tributária?",
          answer: "A transação pode ser vantajosa quando há riscos processuais ou quando oferece redução significativa de multas e juros. Deve ser avaliada caso a caso, considerando as chances de sucesso na defesa."
        }
      ]}
      relatedServices={[
        {
          name: "Planejamento Tributário",
          path: "/servicos/planejamento-tributario"
        },
        {
          name: "Auditoria Tributária",
          path: "/servicos/auditoria-tributaria"
        },
        {
          name: "Elisão Fiscal",
          path: "/servicos/elisao-fiscal"
        },
        {
          name: "Parcelamento de Débitos",
          path: "/servicos/parcelamento-debitos"
        }
      ]}
      mainAreaPath="/areas/tributario"
    />
  );
};

export default ContenciosoTributarioService;
