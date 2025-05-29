
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ReclamacaoConstitucionalService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Reclamação Constitucional"
      serviceDescription="Quando decisões do STF são desrespeitadas ou sua competência é usurpada, a Reclamação Constitucional é nossa resposta imediata. Impetramos Reclamação para preservar a autoridade das decisões do Supremo e garantir sua competência constitucional. Não toleramos afronta à supremacia judicial constitucional."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Preservação da Autoridade do STF",
          description: "Garantia de que decisões do Supremo Tribunal Federal sejam respeitadas e cumpridas por todos os órgãos jurisdicionais."
        },
        {
          title: "Proteção da Competência Constitucional",
          description: "Defesa das competências exclusivas do STF contra usurpação por outros órgãos do Poder Judiciário."
        },
        {
          title: "Uniformização da Jurisprudência",
          description: "Asseguramento de que interpretações constitucionais do STF sejam aplicadas uniformemente em todo território nacional."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Identificação do Descumprimento",
          description: "Verificação de desrespeito a decisão do STF ou usurpação de sua competência por autoridade judicial ou administrativa."
        },
        {
          step: 2,
          title: "Análise da Competência Usurpada",
          description: "Demonstração de que órgão inferior invadiu competência constitucional exclusiva do Supremo Tribunal Federal."
        },
        {
          step: 3,
          title: "Comprovação do Nexo Causal",
          description: "Estabelecimento de relação direta entre o ato impugnado e a violação da autoridade/competência do STF."
        },
        {
          step: 4,
          title: "Protocolo da Reclamação",
          description: "Apresentação da reclamação diretamente no STF com fundamentação técnica e pedido de medida liminar quando cabível."
        },
        {
          step: 5,
          title: "Acompanhamento até Cassação",
          description: "Sustentação técnica até cassação do ato impugnado e restabelecimento da autoridade constitucional."
        }
      ]}
      testimonials={[
        {
          name: "Tribunal de Justiça",
          quote: "A reclamação constitucional corrigiu decisão que desrespeitava precedente vinculante do STF, restaurando segurança jurídica."
        },
        {
          name: "Ministério Público Federal",
          quote: "Através da reclamação, conseguimos cassar ato que usurpava competência constitucional do STF, preservando ordem jurídica."
        }
      ]}
      faq={[
        {
          question: "Quando cabe reclamação constitucional?",
          answer: "Cabe para preservar competência do STF ou garantir autoridade de suas decisões quando desrespeitadas por ato de autoridade judicial ou administrativa."
        },
        {
          question: "Quem pode propor reclamação?",
          answer: "Qualquer interessado que demonstre violação de decisão do STF ou usurpação de sua competência. Não há rol taxativo de legitimados."
        },
        {
          question: "Reclamação tem efeito suspensivo?",
          answer: "Pode ter, se deferida medida liminar. O STF pode suspender os efeitos do ato impugnado até julgamento final da reclamação."
        }
      ]}
      relatedServices={[
        {
          name: "Ações de Inconstitucionalidade",
          path: "/servicos/acoes-inconstitucionalidade"
        },
        {
          name: "Atuação no STF",
          path: "/servicos/atuacao-stf"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default ReclamacaoConstitucionalService;
