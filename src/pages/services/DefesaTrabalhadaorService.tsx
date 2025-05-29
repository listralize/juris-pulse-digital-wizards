
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DefesaTrabalhadorService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Defesa do Trabalhador"
      serviceDescription="Quando a relação de trabalho falha em reconhecer seu esforço e dedicação, a ação se torna inevitável. Transformamos sua insatisfação em uma reivindicação poderosa, garantindo que cada direito seja respeitado e cada centavo seja quitado."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Reivindicação Poderosa de Direitos",
          description: "Não deixamos um centavo do que é seu na mesa. Analisamos cada detalhe e agimos com a força necessária para garantir todos os seus direitos trabalhistas."
        },
        {
          title: "Estratégia Personalizada de Defesa",
          description: "Cada caso é único e merece uma abordagem sob medida. Desenvolvemos estratégias específicas que maximizam suas chances de vitória e recuperação de valores."
        },
        {
          title: "Acompanhamento Integral do Processo",
          description: "Do primeiro atendimento até a execução final, estamos ao seu lado em cada etapa, garantindo transparência e resultados efetivos."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Estratégica do Caso",
          description: "Avaliação detalhada de toda a relação de trabalho, identificando todos os direitos violados e oportunidades de reivindicação com base na documentação e relatos."
        },
        {
          step: 2,
          title: "Cálculo Preciso de Valores",
          description: "Levantamento completo de todos os valores devidos - verbas rescisórias, horas extras, adicionais, FGTS, multas e indenizações, garantindo que nada seja esquecido."
        },
        {
          step: 3,
          title: "Negociação Estratégica Inicial",
          description: "Tentativa de acordo extrajudicial quando vantajoso, utilizando a força da fundamentação jurídica para pressionar por uma solução rápida e favorável."
        },
        {
          step: 4,
          title: "Ação Judicial Implacável",
          description: "Quando necessário, ingresso com ação trabalhista robusta, com petição técnica impecável e estratégia processual agressiva para garantir a vitória."
        },
        {
          step: 5,
          title: "Execução e Recuperação Total",
          description: "Não paramos na sentença. Executamos integralmente a decisão, utilizando todos os meios legais para garantir o recebimento efetivo dos valores."
        }
      ]}
      testimonials={[
        {
          name: "Maria Silva - Ex-funcionária do Setor Bancário",
          quote: "Recuperei mais de R$ 80.000 em verbas que nem sabia que tinha direito. A equipe foi implacável na defesa dos meus direitos e não deixou nada passar."
        },
        {
          name: "João Santos - Trabalhador da Construção",
          quote: "Depois de anos trabalhando em condições precárias, finalmente tive meus direitos reconhecidos. Recebi indenização por insalubridade e acidente de trabalho."
        },
        {
          name: "Ana Costa - Gestante Demitida",
          quote: "Quando fui demitida grávida achei que não tinha saída. Não só fui reintegrada como recebi indenização por danos morais. Minha dignidade foi restaurada."
        }
      ]}
      faq={[
        {
          question: "Quais situações justificam uma ação trabalhista?",
          answer: "Qualquer violação dos seus direitos trabalhistas justifica ação: demissão sem pagamento correto, horas extras não pagas, assédio moral ou sexual, acidente de trabalho, discriminação, justa causa injusta, trabalho em condições insalubres sem adicional, entre outras. Se você suspeita que seus direitos foram violados, vale a pena uma consulta para análise do caso."
        },
        {
          question: "Quanto tempo demora um processo trabalhista?",
          answer: "O tempo varia conforme a complexidade do caso e a região, mas a Justiça do Trabalho é mais ágil que outras esferas. Processos simples podem ser resolvidos em 6 a 12 meses, enquanto casos complexos podem levar de 1 a 2 anos. Buscamos sempre acordos quando vantajosos para acelerar a solução."
        },
        {
          question: "Preciso pagar para entrar com ação trabalhista?",
          answer: "Trabalhadores com renda até 40% do teto do RGPS têm direito à justiça gratuita. Além disso, oferecemos diferentes modalidades de pagamento, incluindo honorários de êxito (só pagamos se ganharmos). Não deixe questões financeiras impedirem a defesa dos seus direitos."
        },
        {
          question: "O que acontece se eu perder o processo?",
          answer: "Com nossa análise criteriosa, as chances de derrota são mínimas. Mas caso isso ocorra, você pode ter que pagar custas processuais e honorários advocatícios da parte contrária, valores que podem ser parcelados. Por isso nossa análise prévia é rigorosa - só entramos com ações com alta probabilidade de sucesso."
        }
      ]}
      relatedServices={[
        {
          name: "Verbas Rescisórias",
          path: "/servicos/verbas-rescissorias"
        },
        {
          name: "Assédio Moral e Sexual",
          path: "/servicos/assedio-moral-sexual"
        }
      ]}
      mainAreaPath="/trabalho"
    />
  );
};

export default DefesaTrabalhadorService;
