
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const RecallsSegurancaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Consumidor"
      serviceName="Recalls e Segurança"
      serviceDescription="Orientação especializada sobre direitos em casos de recall e problemas de segurança em produtos. Nossa atuação garante que o consumidor seja adequadamente informado, compensado e protegido quando produtos apresentam riscos à saúde ou segurança, assegurando cumprimento integral das obrigações do fornecedor."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Direitos Integrais em Recall",
          description: "Assessoria completa sobre direitos do consumidor em processos de recall, incluindo troca gratuita, reparo, indenização por transtornos e acompanhamento do cumprimento das obrigações do fornecedor."
        },
        {
          title: "Compensação por Riscos e Danos",
          description: "Busca de indenização por exposição a produtos perigosos, mesmo quando não houve dano efetivo, considerando o risco à saúde e segurança e o descumprimento do dever de informação adequada."
        },
        {
          title: "Responsabilização por Falhas na Comunicação",
          description: "Atuação contra fornecedores que não comunicam adequadamente recalls ou que dificultam o processo de troca/reparo, garantindo que o consumidor seja prontamente informado e atendido."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Verificação de Recall Ativo",
          description: "Consulta especializada em bases de dados oficiais (INMETRO, ANVISA, fabricantes) para verificar recalls ativos que possam afetar produtos do consumidor, incluindo recalls não comunicados adequadamente."
        },
        {
          step: 2,
          title: "Análise de Direitos e Obrigações",
          description: "Avaliação detalhada dos direitos do consumidor no processo de recall e das obrigações do fornecedor, identificando falhas na comunicação ou no processo de reparo/troca."
        },
        {
          step: 3,
          title: "Documentação de Evidências",
          description: "Coleta de evidências sobre a falha de segurança, problemas no produto, comunicação inadequada do recall e todos os transtornos causados ao consumidor."
        },
        {
          step: 4,
          title: "Negociação com Fornecedor",
          description: "Atuação para garantir cumprimento integral das obrigações de recall, incluindo troca gratuita, coleta do produto e indenização por transtornos causados."
        },
        {
          step: 5,
          title: "Medidas Judiciais e Regulatórias",
          description: "Quando necessário, acionamento de órgãos reguladores (INMETRO, ANVISA) e ajuizamento de ações para garantir direitos e indenização por danos causados por produtos perigosos."
        }
      ]}
      testimonials={[
        {
          name: "Patricia L.",
          quote: "Descobri que meu carro estava em recall há meses, mas a montadora nunca me comunicou. Além de conseguir o reparo gratuito, recebi indenização pela falha na comunicação e pelo risco a que fui exposta. O processo foi resolvido rapidamente."
        },
        {
          name: "Fernando R.",
          quote: "Um eletrodoméstico que eu tinha foi chamado para recall por risco de incêndio. A empresa demorou meses para fazer a troca e ainda tentou me cobrar pelo transporte. Com a assessoria jurídica, consegui não só a troca imediata como compensação pelos transtornos."
        },
        {
          name: "Família Santos",
          quote: "Nosso filho usou um brinquedo que depois descobrimos estar em recall por conter substâncias tóxicas. Mesmo sem ter havido intoxicação, conseguimos indenização pelos riscos e pelo estresse de descobrir que expusemos nosso filho ao perigo."
        },
        {
          name: "Ricardo M.",
          quote: "Comprei um celular que explodiu durante o carregamento. Descobri depois que havia recall para esse modelo. Além da troca do aparelho, consegui indenização por danos morais e materiais. A empresa foi obrigada a melhorar sua comunicação de recalls."
        },
        {
          name: "Angela C.",
          quote: "Um produto de higiene que eu usava foi recolhido por recall, mas a empresa se recusava a reembolsar o valor. Com a intervenção jurídica, não só recebi o reembolso como também indenização por ter usado um produto potencialmente perigoso sem saber."
        }
      ]}
      faq={[
        {
          question: "O que é recall e quais são meus direitos quando um produto é chamado?",
          answer: "Recall é o chamamento de produtos que apresentam riscos à saúde ou segurança do consumidor. Seus direitos incluem: comunicação clara sobre o problema, troca gratuita ou reparo sem custo, coleta do produto em sua residência quando necessário, e indenização por transtornos. O fornecedor deve arcar com todos os custos do processo."
        },
        {
          question: "Tenho direito a indenização mesmo se o produto não me causou danos diretos?",
          answer: "Sim, a exposição a produtos perigosos, mesmo sem dano efetivo, pode gerar direito à indenização por danos morais. A jurisprudência reconhece que a simples exposição ao risco, especialmente quando não há comunicação adequada do recall, constitui violação ao direito de segurança do consumidor."
        },
        {
          question: "E se eu não fui comunicado sobre o recall do meu produto?",
          answer: "A falta de comunicação adequada sobre recall constitui falha grave do fornecedor. Você tem direito não apenas ao reparo/troca gratuita, mas também à indenização pela falha na comunicação. O fornecedor deve utilizar todos os meios possíveis para localizar e comunicar os consumidores afetados."
        },
        {
          question: "Como saber se um produto que tenho está em recall?",
          answer: "Mantemos monitoramento constante de recalls através de consultas aos órgãos oficiais (INMETRO, ANVISA), sites de fabricantes e bases de dados especializadas. Oferecemos orientação para verificação de recalls ativos e acompanhamento de novos chamamentos que possam afetar seus produtos."
        }
      ]}
      relatedServices={[
        {
          name: "Responsabilidade por Produtos",
          path: "/servicos/responsabilidade-produtos"
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

export default RecallsSegurancaService;
