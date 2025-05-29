
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PublicidadeEnganosaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Consumidor"
      serviceName="Publicidade Enganosa"
      serviceDescription="Defesa especializada contra propagandas enganosas ou abusivas que violam direitos do consumidor. Nossa atuação identifica e combate anúncios com promessas exageradas, informações falsas ou omissões que induzem o consumidor ao erro, garantindo cessação imediata das práticas ilegais e indenização devida."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Identificação Técnica de Engano Publicitário",
          description: "Análise especializada para comprovar o caráter enganoso ou abusivo da publicidade conforme artigos 36 e 37 do CDC, incluindo omissões de dados essenciais e informações capazes de induzir erro."
        },
        {
          title: "Cessação Imediata e Impacto Sistêmico",
          description: "Medidas judiciais e extrajudiciais para interromper imediatamente a veiculação de propaganda irregular, com potencial para criar precedentes que protejam outros consumidores."
        },
        {
          title: "Indenização Integral por Danos",
          description: "Busca de compensação pelos danos causados, incluindo danos morais, materiais e desvio produtivo decorrentes do engano publicitário, mesmo sem compra efetiva do produto."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Técnica da Publicidade",
          description: "Exame especializado do material publicitário para identificar elementos enganosos ou abusivos conforme artigos 36 e 37 do CDC, incluindo análise de omissões e informações capazes de induzir erro."
        },
        {
          step: 2,
          title: "Documentação Forense de Evidências",
          description: "Coleta meticulosa da propaganda através de prints com timestamp, gravações certificadas, testemunhas qualificadas e outras provas técnicas da veiculação irregular."
        },
        {
          step: 3,
          title: "Notificação Estratégica do Anunciante",
          description: "Comunicação formal técnica ao fornecedor exigindo cessação imediata da publicidade irregular e reparação pelos danos causados, estabelecendo base para medidas futuras."
        },
        {
          step: 4,
          title: "Atuação em Órgãos Especializados",
          description: "Registro estratégico no Procon, Conar (Conselho Nacional de Autorregulamentação Publicitária) e órgãos reguladores setoriais, criando histórico oficial e pressão institucional."
        },
        {
          step: 5,
          title: "Ação Judicial Especializada",
          description: "Quando necessário, ajuizamento de ação para obter tutela inibitória, indenização integral e cumprimento de obrigações de fazer, contribuindo para jurisprudência protetiva."
        }
      ]}
      testimonials={[
        {
          name: "Marina S.",
          quote: "Consegui provar que a propaganda de um produto de emagrecimento era completamente enganosa e recebi indenização pelos danos morais e pela compra inútil que fiz. O mais importante foi que a empresa teve que retirar a propaganda do ar e reformular toda sua comunicação."
        },
        {
          name: "Carlos M.",
          quote: "A publicidade de um curso prometia certificação que não existia. Com a assessoria jurídica, consegui o reembolso integral e ainda uma compensação substancial pelos transtornos. Descobri que dezenas de pessoas passaram pelo mesmo problema."
        },
        {
          name: "Associação de Consumidores",
          quote: "Nossa ação coletiva contra publicidade enganosa de uma operadora de telefonia resultou em mudanças significativas nas práticas publicitárias e indenização para milhares de consumidores. Foi uma vitória que transformou o mercado."
        },
        {
          name: "Ricardo P.",
          quote: "Um banco anunciava empréstimo com juros baixíssimos, mas na hora da contratação as condições eram completamente diferentes. Além de cancelar o contrato sem custo, recebi indenização por ter perdido tempo e sido enganado. A propaganda foi retirada do ar."
        },
        {
          name: "Juliana F.",
          quote: "A propaganda de um plano de saúde omitia informações essenciais sobre carências e coberturas. Mesmo sem ter contratado, consegui indenização por danos morais, pois perdi tempo pesquisando com base em informações falsas. O processo obrigou a empresa a ser mais transparente."
        }
      ]}
      faq={[
        {
          question: "O que caracteriza publicidade enganosa segundo o CDC?",
          answer: "O artigo 37 do CDC define como enganosa qualquer modalidade de informação ou comunicação de caráter publicitário que seja capaz de induzir em erro o consumidor sobre a natureza, características, qualidade, quantidade, propriedades, origem, preço e outros dados sobre produtos e serviços. Inclui também a omissão de dados essenciais sobre o produto ou serviço (publicidade enganosa por omissão)."
        },
        {
          question: "Qual a diferença entre publicidade enganosa e abusiva?",
          answer: "A publicidade enganosa induz o consumidor ao erro através de informações falsas ou omissões importantes. Já a publicidade abusiva é discriminatória, incita violência, explora medo ou superstição, desrespeita valores ambientais, ou é capaz de induzir comportamentos prejudiciais à saúde ou segurança, mesmo que as informações sejam verdadeiras. Nossa expertise permite identificar ambas as modalidades."
        },
        {
          question: "Posso pedir indenização por publicidade enganosa mesmo se não comprei o produto?",
          answer: "Sim, o dano moral por publicidade enganosa pode ocorrer independentemente da compra, especialmente quando há violação à dignidade, discriminação, perda de tempo significativa (desvio produtivo) ou ofensa a valores fundamentais. A jurisprudência reconhece que o simples fato de ser enganado por propaganda irregular já constitui dano indenizável."
        },
        {
          question: "Como vocês provam que uma publicidade é sistemática e não um erro pontual?",
          answer: "Utilizamos análise de veiculação em múltiplas mídias, duração da campanha, número de consumidores atingidos, histórico da empresa em órgãos de proteção ao consumidor e padrões de reclamações similares. Quando comprovamos sistematicidade, isso aumenta significativamente o valor das indenizações e pode gerar ações coletivas com maior impacto social."
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
