
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ContenciosoTributarioService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Contencioso Tributário"
      serviceDescription="Defesa especializada em processos fiscais junto aos órgãos administrativos e Poder Judiciário, protegendo contribuintes contra cobranças indevidas e garantindo seus direitos."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Defesa Técnica Especializada",
          description: "Representação por advogados com profundo conhecimento em legislação tributária e jurisprudência atualizada."
        },
        {
          title: "Estratégias Processuais Eficientes",
          description: "Utilização das melhores abordagens processuais para cada caso, maximizando as chances de êxito."
        },
        {
          title: "Prevenção de Bloqueios e Penhoras",
          description: "Atuação preventiva para evitar constrições patrimoniais e garantir a continuidade das operações."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise do Caso",
          description: "Avaliação detalhada das autuações fiscais ou cobranças, identificando fundamentos para defesa e possibilidades de êxito."
        },
        {
          step: 2,
          title: "Planejamento da Defesa",
          description: "Elaboração de estratégia jurídica personalizada, definindo as teses a serem aplicadas e os procedimentos a serem adotados."
        },
        {
          step: 3,
          title: "Defesas Administrativas",
          description: "Elaboração e apresentação de impugnações, recursos e outros instrumentos de defesa junto aos órgãos administrativos."
        },
        {
          step: 4,
          title: "Medidas Judiciais",
          description: "Quando necessário, ajuizamento de ações ou defesas em execuções fiscais, utilizando todos os recursos processuais cabíveis."
        },
        {
          step: 5,
          title: "Acompanhamento até Decisão Final",
          description: "Monitoramento contínuo do processo em todas suas fases, com participação em sustentações orais e representação em todas as instâncias."
        }
      ]}
      testimonials={[
        {
          name: "Distribuidora EastWest",
          quote: "Conseguimos anular uma autuação milionária graças à defesa técnica impecável apresentada no contencioso administrativo."
        },
        {
          name: "Marcos T., Empresário",
          quote: "A estratégia processual adotada nos permitiu suspender a exigibilidade do crédito tributário enquanto discutíamos o mérito, preservando nossa operação."
        },
        {
          name: "Farmacêutica VitaSaúde",
          quote: "Após anos de batalha judicial, conseguimos o reconhecimento definitivo de nosso direito a um crédito tributário que havia sido negado inicialmente."
        }
      ]}
      faq={[
        {
          question: "Qual é a diferença entre o contencioso administrativo e judicial tributário?",
          answer: "O contencioso administrativo ocorre dentro dos órgãos da administração pública (como Receita Federal, Conselhos de Contribuintes ou Secretarias de Fazenda), sem a participação do Poder Judiciário. Já o contencioso judicial acontece perante juízes e tribunais, permitindo uma análise mais ampla da legalidade dos atos administrativos. Cada esfera tem suas vantagens, como a não exigência de garantias na esfera administrativa e a maior imparcialidade na judicial."
        },
        {
          question: "É possível suspender a exigibilidade do tributo durante a discussão?",
          answer: "Sim, através de diversos mecanismos legais como depósito judicial do valor integral, obtenção de liminar ou tutela antecipada, ou oferecimento de garantia em execução fiscal. A suspensão da exigibilidade impede a cobrança do tributo, a inclusão em listas de devedores e permite a emissão de certidões de regularidade fiscal enquanto o mérito é discutido."
        },
        {
          question: "Qual o prazo para contestar uma autuação fiscal?",
          answer: "Os prazos variam conforme o âmbito e o tipo de processo. Na esfera federal, o prazo para impugnação administrativa é geralmente de 30 dias. Nos estados e municípios, pode variar conforme a legislação local. Na esfera judicial, o prazo para contestar uma execução fiscal é de 15 dias úteis após a citação. É fundamental observar estes prazos, pois são peremptórios."
        }
      ]}
      relatedServices={[
        {
          name: "Planejamento Tributário",
          path: "/servicos/planejamento-tributario"
        },
        {
          name: "Recuperação de Créditos Tributários",
          path: "/servicos/recuperacao-creditos"
        }
      ]}
      mainAreaPath="/tributario"
    />
  );
};

export default ContenciosoTributarioService;
