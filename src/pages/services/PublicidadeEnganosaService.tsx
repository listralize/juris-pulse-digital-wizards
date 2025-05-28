
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PublicidadeEnganosaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Consumidor"
      serviceName="Publicidade Enganosa"
      serviceDescription="Defesa contra propagandas enganosas ou abusivas que violam direitos do consumidor, garantindo indenização e cessação das práticas ilegais."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Identificação de Engano",
          description: "Análise técnica para comprovar o caráter enganoso ou abusivo da publicidade conforme CDC e legislação específica."
        },
        {
          title: "Cessação Imediata",
          description: "Medidas judiciais e extrajudiciais para interromper imediatamente a veiculação de propaganda irregular."
        },
        {
          title: "Indenização Devida",
          description: "Busca de compensação pelos danos causados, incluindo danos morais e materiais decorrentes do engano publicitário."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Publicidade",
          description: "Exame detalhado do material publicitário para identificar elementos enganosos ou abusivos conforme artigos 36 e 37 do CDC."
        },
        {
          step: 2,
          title: "Coleta de Evidências",
          description: "Documentação da propaganda através de prints, gravações, testemunhas e outras provas da veiculação irregular."
        },
        {
          step: 3,
          title: "Notificação do Anunciante",
          description: "Comunicação formal ao fornecedor exigindo cessação da publicidade e reparação pelos danos causados."
        },
        {
          step: 4,
          title: "Reclamação nos Órgãos Competentes",
          description: "Registro no Procon, Conar (Conselho Nacional de Autorregulamentação Publicitária) e órgãos reguladores do setor."
        },
        {
          step: 5,
          title: "Ação Judicial",
          description: "Quando necessário, ajuizamento de ação para obter tutela inibitória, indenização e cumprimento das obrigações de fazer."
        }
      ]}
      testimonials={[
        {
          name: "Marina S.",
          quote: "Consegui provar que a propaganda de um produto de emagrecimento era completamente enganosa e recebi indenização pelos danos morais e pela compra inútil que fiz."
        },
        {
          name: "Carlos M.",
          quote: "A publicidade de um curso prometia certificação que não existia. Com a assessoria jurídica, consegui o reembolso integral e ainda uma compensação pelos transtornos."
        },
        {
          name: "Associação de Consumidores",
          quote: "Nossa ação coletiva contra publicidade enganosa de uma operadora de telefonia resultou em mudanças nas práticas publicitárias e indenização para milhares de consumidores."
        }
      ]}
      faq={[
        {
          question: "O que caracteriza publicidade enganosa segundo o CDC?",
          answer: "O artigo 37 do CDC define como enganosa qualquer modalidade de informação ou comunicação de caráter publicitário que seja capaz de induzir em erro o consumidor sobre a natureza, características, qualidade, quantidade, propriedades, origem, preço e outros dados sobre produtos e serviços. Inclui também a omissão de dados essenciais sobre o produto ou serviço."
        },
        {
          question: "Qual a diferença entre publicidade enganosa e abusiva?",
          answer: "A publicidade enganosa induz o consumidor ao erro através de informações falsas ou omissões. Já a publicidade abusiva é discriminatória, incita violência, explora medo ou superstição, desrespeita valores ambientais, ou é capaz de induzir comportamentos prejudiciais à saúde ou segurança, mesmo que as informações sejam verdadeiras."
        },
        {
          question: "Posso pedir indenização por publicidade enganosa mesmo se não comprei o produto?",
          answer: "Sim, o dano moral por publicidade enganosa pode ocorrer independentemente da compra, especialmente quando há violação à dignidade, discriminação ou ofensa a valores fundamentais. Contudo, o dano material depende de efetivo prejuízo patrimonial comprovado."
        }
      ]}
      relatedServices={[
        {
          name: "Práticas Abusivas",
          path: "/servicos/praticas-abusivas"
        },
        {
          name: "Direitos do Consumidor",
          path: "/servicos/direitos-consumidor"
        }
      ]}
      mainAreaPath="/consumidor"
    />
  );
};

export default PublicidadeEnganosaService;
