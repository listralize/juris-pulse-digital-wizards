
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DireitosConsumidorService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Consumidor"
      serviceName="Direitos do Consumidor"
      serviceDescription="Assessoria completa na defesa dos direitos previstos no Código de Defesa do Consumidor, garantindo proteção efetiva contra práticas abusivas e compensação adequada em caso de danos."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Proteção Integral",
          description: "Defesa de todos os seus direitos como consumidor, desde produtos defeituosos até práticas comerciais abusivas."
        },
        {
          title: "Reparação de Danos",
          description: "Busca por indenizações justas por danos materiais e morais sofridos em relações de consumo."
        },
        {
          title: "Resolução Rápida",
          description: "Estratégias para solução de conflitos de forma célere, utilizando canais administrativos e judiciais adequados."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Avaliação do Caso",
          description: "Análise detalhada da situação, incluindo evidências, documentos e histórico da relação de consumo."
        },
        {
          step: 2,
          title: "Notificação Extrajudicial",
          description: "Quando apropriado, envio de notificação formal ao fornecedor para tentativa de resolução amigável do conflito."
        },
        {
          step: 3,
          title: "Reclamação Administrativa",
          description: "Representação junto a órgãos de proteção ao consumidor como Procon, plataformas de reclamação e agências reguladoras."
        },
        {
          step: 4,
          title: "Ação Judicial",
          description: "Se necessário, ajuizamento de ação judicial para garantir seus direitos, com possibilidade de tramitação em juizados especiais."
        },
        {
          step: 5,
          title: "Acompanhamento até Resolução",
          description: "Monitoramento de todo o processo até a resolução definitiva, com execução da sentença quando aplicável."
        }
      ]}
      testimonials={[
        {
          name: "Renata C.",
          quote: "Após meses tentando resolver sozinha um problema com uma compra online, consegui a devolução integral do valor e indenização por danos morais em apenas semanas com o suporte jurídico adequado."
        },
        {
          name: "Felipe M.",
          quote: "A assessoria foi fundamental para cancelar um contrato abusivo de serviços continuados que me cobrava taxas indevidas há anos."
        },
        {
          name: "Família Rodrigues",
          quote: "Conseguimos compensação por danos causados em nossa residência por um serviço mal executado, incluindo o refazimento completo do trabalho."
        }
      ]}
      faq={[
        {
          question: "Quais são os principais direitos garantidos pelo Código de Defesa do Consumidor?",
          answer: "Entre os principais direitos estão: proteção contra produtos e serviços defeituosos, informação clara e adequada sobre produtos e serviços, proteção contra publicidade enganosa e abusiva, prevenção e reparação de danos patrimoniais e morais, acesso à justiça e inversão do ônus da prova, proteção contra práticas e cláusulas abusivas, e garantia de serviços públicos adequados."
        },
        {
          question: "Qual o prazo para reclamar de um produto ou serviço defeituoso?",
          answer: "Para produtos ou serviços não duráveis (alimentos, serviços), o prazo é de 30 dias. Para produtos ou serviços duráveis (eletrodomésticos, reformas), o prazo é de 90 dias. Estes prazos contam a partir do momento em que se evidencia o defeito. Para vícios ocultos, o prazo começa a contar a partir do momento em que o defeito se torna aparente."
        },
        {
          question: "É possível receber indenização por dano moral em questões de consumo?",
          answer: "Sim. O dano moral é cabível quando a situação ultrapassa o mero aborrecimento e causa sofrimento, humilhação ou ofensa significativa à dignidade do consumidor. Exemplos incluem negativação indevida, cobrança vexatória, interrupção injustificada de serviços essenciais, ou situações que causem transtornos significativos como cancelamentos de voos sem assistência adequada."
        }
      ]}
      relatedServices={[
        {
          name: "Práticas Abusivas",
          path: "/servicos/praticas-abusivas"
        },
        {
          name: "Responsabilidade por Produtos",
          path: "/servicos/responsabilidade-produtos"
        }
      ]}
      mainAreaPath="/consumidor"
    />
  );
};

export default DireitosConsumidorService;
