
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const IndenizacaoDanosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Consumidor"
      serviceName="Indenização por Danos"
      serviceDescription="Busca especializada de compensação por danos morais e materiais em relações de consumo. Nossa atuação assegura reparação integral pelos prejuízos causados por falhas na prestação de serviços, produtos defeituosos, práticas abusivas e violações aos direitos do consumidor, incluindo o revolucionário conceito de desvio produtivo do consumo."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Reparação Integral de Danos",
          description: "Busca de indenização completa por todos os tipos de danos: materiais (prejuízos econômicos diretos), morais (sofrimento e constrangimento) e temporais (desvio produtivo do consumo)."
        },
        {
          title: "Desvio Produtivo do Consumo",
          description: "Atuação pioneira na aplicação da teoria do desvio produtivo, garantindo indenização pelo tempo desperdiçado pelo consumidor na tentativa de resolver problemas causados pelo fornecedor."
        },
        {
          title: "Quantificação Estratégica de Danos",
          description: "Expertise na quantificação adequada de danos morais e materiais, considerando jurisprudência atual, capacidade econômica do ofensor e gravidade da conduta para maximizar a indenização devida."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Abrangente dos Danos",
          description: "Levantamento completo de todos os danos sofridos: materiais (gastos extras, lucros cessantes), morais (constrangimento, sofrimento) e temporais (tempo perdido tentando resolver o problema)."
        },
        {
          step: 2,
          title: "Documentação Estratégica",
          description: "Coleta meticulosa de evidências dos danos: comprovantes de gastos, laudos médicos, registros de ligações e atendimentos, testemunhas e toda documentação que comprove o prejuízo."
        },
        {
          step: 3,
          title: "Quantificação Técnica dos Prejuízos",
          description: "Cálculo especializado do valor da indenização considerando precedentes jurisprudenciais, capacidade econômica das partes e princípios da proporcionalidade e razoabilidade."
        },
        {
          step: 4,
          title: "Negociação Estratégica",
          description: "Tentativa de acordo extrajudicial com fundamentação técnica robusta sobre os danos e valores pleiteados, buscando solução rápida e satisfatória."
        },
        {
          step: 5,
          title: "Ação Indenizatória Especializada",
          description: "Quando necessário, ajuizamento de ação com pedido fundamentado de indenização por danos morais, materiais e desvio produtivo, buscando a máxima reparação possível."
        }
      ]}
      testimonials={[
        {
          name: "Claudia M.",
          quote: "Além da indenização pelos danos materiais do produto defeituoso, consegui compensação pelo tempo que perdi em ligações e indo à loja várias vezes. Foi a primeira vez que ouvi falar do 'desvio produtivo' e fiquei impressionada com essa abordagem inovadora."
        },
        {
          name: "Eduardo R.",
          quote: "O banco me causou um constrangimento enorme ao bloquear minha conta por erro. Além dos danos morais substanciais, recebi indenização por todos os transtornos e pelo tempo perdido tentando resolver a situação. A quantificação foi muito bem fundamentada."
        },
        {
          name: "Família Rodrigues",
          quote: "Nosso plano de saúde negou cobertura para cirurgia urgente, causando sofrimento indescritível. A indenização cobriu não só os gastos médicos particulares, mas também compensou adequadamente o sofrimento psicológico da família toda."
        },
        {
          name: "Patricia S.",
          quote: "Uma empresa de telecomunicações me fez perder dias de trabalho tentando resolver problemas na linha. Consegui indenização não só pelos danos morais, mas também pelo tempo produtivo perdido. O valor superou minhas expectativas."
        },
        {
          name: "Antonio L.",
          quote: "Um erro médico me causou sequelas permanentes. A assessoria jurídica conseguiu indenização que cobriu todos os tratamentos futuros, além de compensação adequada por danos morais e estéticos. Foi um processo conduzido com muito profissionalismo."
        }
      ]}
      faq={[
        {
          question: "O que é o desvio produtivo do consumo e como ele pode me beneficiar?",
          answer: "Desvio produtivo do consumo é o tempo que você perdeu tentando resolver um problema causado pelo fornecedor - ligações, deslocamentos, esperas. É uma teoria jurídica moderna que reconhece que seu tempo tem valor econômico e deve ser indenizado. Isso pode aumentar significativamente o valor da indenização."
        },
        {
          question: "Qual a diferença entre danos morais e materiais em relações de consumo?",
          answer: "Danos materiais são prejuízos econômicos diretos (gastos extras, lucros cessantes, despesas médicas). Danos morais compensam sofrimento psíquico, constrangimento, humilhação. Em relações de consumo, é comum haver ambos os tipos, e nossa expertise garante que todos sejam adequadamente quantificados e pleiteados."
        },
        {
          question: "Como é calculado o valor da indenização por danos morais?",
          answer: "Consideramos diversos fatores: gravidade da conduta do fornecedor, intensidade do sofrimento, repercussão do dano, capacidade econômica das partes e precedentes jurisprudenciais. Nossa experiência permite buscar valores condizentes com o dano efetivamente sofrido, evitando tanto a banalização quanto a subavaliação."
        },
        {
          question: "Posso pedir indenização mesmo se o problema foi resolvido depois?",
          answer: "Sim, a resolução posterior do problema não elimina o direito à indenização pelos transtornos, tempo perdido e sofrimento já causados. O dano moral se configura no momento da violação aos seus direitos, independentemente da solução posterior. É o que chamamos de 'dano consumado'."
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

export default IndenizacaoDanosService;
