
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ContenciosoEmpresarialService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Empresarial"
      serviceName="Contencioso Empresarial"
      serviceDescription="Quando a negociação não é suficiente, entramos em campo. No tribunal, defendemos seus interesses com a ferocidade de um predador e precisão de um atirador. A batalha é nossa, a vitória é sua. Não aceitamos desculpas; buscamos domínio absoluto."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Representação Como Gladiador",
          description: "Atuamos transformando cada processo em oportunidade para demonstrar superioridade. Sua causa é nossa guerra, e guerra não se perde - se domina com estratégia implacável."
        },
        {
          title: "Resolução Privada Inteligente",
          description: "Às vezes a jogada mais inteligente é resolver em particular. Dominamos mediação e arbitragem quando a vitória pode ser alcançada de forma mais rápida e eficiente."
        },
        {
          title: "Recuperação Ativa de Ativos",
          description: "Dinheiro parado é dinheiro perdido. Ações tomadas com rapidez e força necessárias para recuperar ativos e créditos. O que é seu, volta para você. Nada fica na mesa."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Estratégica do Campo de Batalha",
          description: "Avaliação implacável da situação jurídica, análise psicológica do adversário e identificação de estratégias que garantem vantagem decisiva."
        },
        {
          step: 2,
          title: "Desenvolvimento de Estratégia de Dominação",
          description: "Formulação de estratégia jurídica que antecipa movimentos adversários, considerando alternativas que maximizam seus ganhos e minimizam riscos."
        },
        {
          step: 3,
          title: "Negociação Para Vitória ou Guerra",
          description: "Busca de soluções que demonstram força através de mediação dominante ou arbitragem controlada quando vantajoso para consolidar poder."
        },
        {
          step: 4,
          title: "Litígio de Aniquilação",
          description: "Representação em todas as instâncias com acompanhamento proativo e agressivo que transforma cada audiência em demonstração de superioridade."
        },
        {
          step: 5,
          title: "Execução Implacável de Vitórias",
          description: "Acompanhamento da execução de decisões e acordos com força necessária para garantir cumprimento integral das obrigações a seu favor."
        }
      ]}
      testimonials={[
        {
          name: "Conglomerado Industrial Omega",
          quote: "A disputa societária de R$ 200 milhões foi resolvida com domínio total. Não apenas ganhamos, mas o adversário teve que pagar nossas custas processuais integralmente."
        },
        {
          name: "TechCorp International",
          quote: "O litígio por propriedade intelectual terminou em acordo que nos deu 100% dos direitos disputados mais indenização. Foi demonstração pura de força legal."
        },
        {
          name: "Holding Empresarial Zeus",
          quote: "A mediação empresarial foi masterclass de negociação. Resolvemos em 30 dias o que poderia durar anos, com resultado que superou nossas expectativas."
        }
      ]}
      faq={[
        {
          question: "Como contencioso vira demonstração de dominação?",
          answer: "Não entramos em conflitos para 'resolver' - entramos para dominar. Isso significa: análise psicológica do adversário, identificação de pressure points, estratégias que forçam acordos vantajosos e, quando necessário, litígio devastador que serve de exemplo para o mercado. Cada vitória fortalece sua reputação de invencibilidade."
        },
        {
          question: "Quando escolher resolução privada versus litígio público?",
          answer: "Estratégia determina arena. Resolução privada quando: adversário tem mais a perder que você, rapidez vale mais que exemplo público, ou quando acordo pode incluir cláusulas vantajosas impossíveis judicialmente. Litígio público quando: vitória precisa ser vista pelo mercado, há necessidade de precedente ou quando demonstração de força vale mais que acordo."
        },
        {
          question: "Como garantem recuperação 'implacável' de ativos?",
          answer: "Aplicamos estratégia militar à recuperação: mapeamento completo de bens antes da ação, bloqueios estratégicos que impedem dissipação, negociação psicologicamente agressiva para acordos rápidos e, quando necessário, execução fulminante que torna resistência mais custosa que pagamento. Recuperação não é apenas legal - é inevitável."
        }
      ]}
      relatedServices={[
        {
          name: "Contratos Empresariais",
          path: "/servicos/contratos-empresariais"
        },
        {
          name: "Fusões e Aquisições",
          path: "/servicos/fusoes-aquisicoes"
        }
      ]}
      mainAreaPath="/empresarial"
    />
  );
};

export default ContenciosoEmpresarialService;
