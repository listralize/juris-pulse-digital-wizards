
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DireitosConsumidorService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Consumidor"
      serviceName="Direitos do Consumidor"
      serviceDescription="A paisagem das relações de consumo contemporâneas é marcada por uma complexidade crescente, impulsionada pela inovação tecnológica e pela expansão do comércio digital. Nossa atuação transcende a mera aplicação de leis existentes, oferecendo uma estratégia robusta e adaptável para enfrentar os desafios emergentes do ambiente de consumo moderno."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Proteção Integral e Proativa",
          description: "Defesa de todos os seus direitos como consumidor, desde produtos defeituosos até práticas comerciais abusivas, com abordagem não apenas reativa, mas estrategicamente proativa."
        },
        {
          title: "Reparação Completa e Dignidade",
          description: "Busca por indenizações justas que vão além da compensação financeira, incluindo a restauração da dignidade do consumidor e o 'desvio produtivo do consumo'."
        },
        {
          title: "Expertise em Litígios Complexos",
          description: "Atuação especializada que vai desde negociações administrativas até ações coletivas, moldando o futuro das relações de consumo com soluções estratégicas."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Avaliação Estratégica do Caso",
          description: "Análise detalhada da situação, incluindo evidências, documentos e histórico da relação de consumo, com foco na identificação de falhas sistêmicas e oportunidades de reparação integral."
        },
        {
          step: 2,
          title: "Estratégia de Intervenção",
          description: "Desenvolvimento de abordagem personalizada, desde notificação extrajudicial até preparação para litígio, priorizando a via mais eficaz para cada caso específico."
        },
        {
          step: 3,
          title: "Atuação Administrativa Estratégica",
          description: "Representação junto a órgãos de proteção ao consumidor como Procon, Ministério Público e agências reguladoras, buscando resoluções rápidas e eficazes."
        },
        {
          step: 4,
          title: "Litígio Judicial Especializado",
          description: "Quando necessário, condução de ações judiciais em Juizados Especiais ou Justiça Comum, com expertise em ações coletivas para casos de impacto sistêmico."
        },
        {
          step: 5,
          title: "Execução e Transformação",
          description: "Acompanhamento até a resolução definitiva, incluindo execução da sentença e, quando aplicável, contribuição para transformações no mercado através de precedentes."
        }
      ]}
      testimonials={[
        {
          name: "Renata C.",
          quote: "Após meses tentando resolver sozinha um problema com uma compra online, consegui a devolução integral do valor e indenização por danos morais em apenas semanas. Além disso, recebi compensação pelo tempo que perdi tentando resolver o problema por conta própria - algo que eu nem sabia que tinha direito."
        },
        {
          name: "Felipe M.",
          quote: "A assessoria foi fundamental para cancelar um contrato abusivo de serviços continuados que me cobrava taxas indevidas há anos. O diferencial foi a abordagem estratégica - não apenas cancelaram o contrato, mas conseguiram a devolução em dobro de todos os valores pagos indevidamente."
        },
        {
          name: "Família Rodrigues",
          quote: "Conseguimos compensação por danos causados em nossa residência por um serviço mal executado, incluindo o refazimento completo do trabalho. A equipe entendeu que nosso prejuízo ia além do financeiro - incluía o transtorno, o tempo perdido e o estresse familiar."
        },
        {
          name: "Carlos Eduardo S.",
          quote: "Meu caso de fraude bancária foi resolvido de forma surpreendente. Além de recuperar o valor clonado do meu cartão, recebi indenização por danos morais e a empresa teve que revisar seus protocolos de segurança. Foi uma vitória que protegeu outros consumidores também."
        },
        {
          name: "Marina L.",
          quote: "O plano de saúde negava minha cirurgia há meses. Com a intervenção jurídica, não só consegui a autorização em questão de semanas, como também uma indenização pelos meses de sofrimento e pela deterioração da minha condição devido ao atraso."
        }
      ]}
      faq={[
        {
          question: "Quais são os principais direitos garantidos pelo Código de Defesa do Consumidor?",
          answer: "Entre os principais direitos estão: proteção contra produtos e serviços defeituosos, informação clara e adequada sobre produtos e serviços, proteção contra publicidade enganosa e abusiva, prevenção e reparação de danos patrimoniais e morais, acesso à justiça e inversão do ônus da prova, proteção contra práticas e cláusulas abusivas, e garantia de serviços públicos adequados. Nossa atuação garante que esses direitos sejam não apenas conhecidos, mas efetivamente exercidos."
        },
        {
          question: "O que é o 'desvio produtivo do consumo' e como isso afeta minha indenização?",
          answer: "O desvio produtivo do consumo é o tempo e esforço que você perdeu tentando resolver um problema de consumo. Isso inclui ligações, deslocamentos, reuniões e toda a energia gasta para solucionar a questão. A jurisprudência moderna reconhece isso como dano indenizável, permitindo uma reparação que vai além do prejuízo financeiro direto, contemplando também o dano temporal e psicológico."
        },
        {
          question: "Como vocês atuam em casos de fraudes digitais e crimes cibernéticos?",
          answer: "Nossa expertise combina conhecimento jurídico com compreensão de cibersegurança e forense digital. Atuamos em casos de clonagem de cartão, fraudes bancárias, golpes online e vazamento de dados pessoais (LGPD). Nosso diferencial é tratar esses casos não apenas como questões de consumo, mas como violações que exigem reparação integral e medidas preventivas sistêmicas."
        },
        {
          question: "Qual a diferença entre ação individual e ação coletiva em direito do consumidor?",
          answer: "Ações individuais buscam a reparação de danos específicos de um consumidor, enquanto ações coletivas defendem grupos de consumidores ou a coletividade contra abusos sistêmicos. Temos expertise em ambas as modalidades e capacidade de identificar quando um caso individual pode ter impacto coletivo, contribuindo para transformações positivas no mercado e proteção de outros consumidores."
        }
      ]}
      relatedServices={[
        {
          name: "Práticas Abusivas",
          path: "/servicos/praticas-abusivas"
        },
        {
          name: "Publicidade Enganosa",
          path: "/servicos/publicidade-enganosa"
        }
      ]}
      mainAreaPath="/consumidor"
    />
  );
};

export default DireitosConsumidorService;
