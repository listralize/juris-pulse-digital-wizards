
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ResponsabilidadeProdutosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Consumidor"
      serviceName="Responsabilidade por Produtos"
      serviceDescription="Defesa especializada contra danos causados por produtos defeituosos ou perigosos. Nossa atuação garante a responsabilização integral do fabricante, distribuidor ou comerciante pelos vícios de qualidade, quantidade ou inadequação, assegurando reparação completa por todos os prejuízos causados ao consumidor."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Identificação de Vícios e Defeitos",
          description: "Análise técnica especializada para identificar vícios de qualidade, quantidade, adequação e segurança em produtos, fundamentando juridicamente a responsabilidade do fornecedor conforme artigos 18 e 19 do CDC."
        },
        {
          title: "Responsabilização Solidária da Cadeia",
          description: "Estratégia para responsabilizar toda a cadeia produtiva - fabricante, distribuidor e comerciante - garantindo que o consumidor tenha múltiplas opções para buscar reparação integral."
        },
        {
          title: "Reparação Integral de Danos",
          description: "Busca de indenização completa incluindo danos materiais, morais, lucros cessantes e até mesmo danos estéticos quando aplicável, considerando todo o prejuízo causado pelo produto defeituoso."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Técnica do Produto",
          description: "Exame especializado do produto para identificar vícios aparentes, ocultos ou de adequação, com laudo técnico quando necessário para comprovar o defeito e sua origem."
        },
        {
          step: 2,
          title: "Documentação de Evidências",
          description: "Coleta meticulosa de provas como nota fiscal, garantia, fotos do defeito, laudos médicos (em caso de danos à saúde) e testemunhas do ocorrido."
        },
        {
          step: 3,
          title: "Notificação da Cadeia Produtiva",
          description: "Comunicação formal a fabricante, distribuidor e comerciante sobre o vício, exigindo solução no prazo legal de 30 dias conforme CDC."
        },
        {
          step: 4,
          title: "Atuação em Órgãos de Proteção",
          description: "Registro estratégico no Procon e órgãos de vigilância sanitária quando aplicável, criando histórico oficial e pressão para resolução."
        },
        {
          step: 5,
          title: "Ação Judicial Especializada",
          description: "Quando necessário, ajuizamento de ação contra a cadeia produtiva buscando substituição do produto, abatimento do preço ou restituição integral com indenização por danos."
        }
      ]}
      testimonials={[
        {
          name: "Roberto M.",
          quote: "Comprei um carro zero quilômetro que apresentou defeitos graves no motor após apenas dois meses. A assessoria jurídica conseguiu não só a troca do veículo por um novo, como também indenização pelos transtornos e tempo perdido. O processo foi conduzido de forma impecável."
        },
        {
          name: "Ana Carolina S.",
          quote: "Um eletrodoméstico que comprei causou um incêndio na minha cozinha. Além da substituição do produto, consegui indenização por todos os danos materiais e morais. A equipe demonstrou expertise tanto no direito do consumidor quanto em responsabilidade civil."
        },
        {
          name: "Família Oliveira",
          quote: "Nosso filho teve uma reação alérgica grave a um produto infantil. A atuação jurídica foi fundamental para conseguir indenização que cobriu todos os gastos médicos e ainda compensou o sofrimento da família. O fabricante teve que retirar o produto do mercado."
        },
        {
          name: "Carlos Eduardo P.",
          quote: "Um equipamento eletrônico que custou uma fortuna parou de funcionar logo após a garantia vencer, mas o defeito era claramente de fabricação. Consegui não só o conserto gratuito como também extensão da garantia e indenização por danos morais."
        },
        {
          name: "Mariana F.",
          quote: "Um produto de beleza causou sérias lesões na minha pele. O processo resultou em indenização substancial por danos morais e estéticos, além de cobertura de todo o tratamento dermatológico. A empresa reformulou o produto após nossa ação."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre vício e defeito do produto?",
          answer: "O vício (art. 18 CDC) torna o produto impróprio ou inadequado ao consumo, diminui seu valor ou não corresponde às especificações. Já o defeito (art. 12 CDC) é mais grave, pois causa danos à saúde ou segurança do consumidor. Ambos geram direito à reparação, mas o defeito pode resultar em indenizações maiores por danos à pessoa."
        },
        {
          question: "Posso processar fabricante, loja e distribuidor ao mesmo tempo?",
          answer: "Sim, o CDC estabelece responsabilidade solidária entre todos os participantes da cadeia produtiva. Isso significa que você pode escolher processar qualquer um deles ou todos simultaneamente, e cada um responde integralmente pelos danos, independentemente de sua participação específica na cadeia."
        },
        {
          question: "Como comprovar que o defeito não foi causado por mau uso?",
          answer: "Utilizamos análise técnica especializada, laudos periciais e documentação do histórico de uso do produto. O CDC estabelece que o ônus da prova sobre o mau uso é do fornecedor, ou seja, ele deve provar que você usou incorretamente o produto. Nossa expertise garante coleta adequada de evidências."
        },
        {
          question: "Produtos em liquidação ou promoção têm a mesma proteção?",
          answer: "Absolutamente sim. O CDC não faz distinção entre produtos vendidos em promoção ou preço normal. Liquidação, outlet ou black friday não eliminam a responsabilidade do fornecedor por vícios ou defeitos. Todos os direitos de garantia e reparação se mantêm integralmente."
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

export default ResponsabilidadeProdutosService;
