
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ImprobidadeAdministrativaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Improbidade Administrativa"
      serviceDescription="Alegações de improbidade administrativa podem devastar carreiras e reputações. Fornecemos uma defesa agressiva e estratégica para agentes públicos e indivíduos privados implicados em tais ações, utilizando nosso profundo conhecimento da legislação anticorrupção para proteger sua integridade e assegurar a exoneração."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Defesa Agressiva e Estratégica",
          description: "Defesa técnica robusta em ações de improbidade administrativa, protegendo reputação e patrimônio contra alegações infundadas."
        },
        {
          title: "Conhecimento da Lei Anticorrupção",
          description: "Expertise profunda na Lei nº 12.846/2013 e demais normas anticorrupção, garantindo defesa fundamentada e eficaz."
        },
        {
          title: "Gestão de Reputação",
          description: "Estratégias para preservação da imagem e reputação durante processos de improbidade administrativa."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise das Alegações",
          description: "Avaliação detalhada das imputações de improbidade, identificando inconsistências e vícios na investigação."
        },
        {
          step: 2,
          title: "Estratégia de Defesa",
          description: "Desenvolvimento de estratégia defensiva personalizada, considerando as especificidades do caso e perfil do cliente."
        },
        {
          step: 3,
          title: "Produção de Provas",
          description: "Coleta e produção de provas documentais e testemunhais para demonstrar inexistência de ato ímprobo."
        },
        {
          step: 4,
          title: "Defesa Técnica",
          description: "Elaboração de defesa prévia e contestação fundamentadas, contestando elementos caracterizadores da improbidade."
        },
        {
          step: 5,
          title: "Recursos e Execução",
          description: "Interposição de recursos e acompanhamento até decisão final, buscando absolvição ou redução de sanções."
        }
      ]}
      testimonials={[
        {
          name: "Ex-Prefeito Municipal",
          quote: "A defesa técnica conseguiu demonstrar a inexistência de dolo e má-fé, resultando na absolvição completa em ação de improbidade de R$ 10 milhões."
        },
        {
          name: "Servidor Público Federal",
          quote: "Minha reputação foi preservada após defesa que comprovou que os atos praticados estavam dentro da legalidade e não configuravam improbidade."
        },
        {
          name: "Empresário do Setor Público",
          quote: "A estratégia defensiva evitou a aplicação de sanções que poderiam inviabilizar minha empresa, garantindo continuidade dos negócios."
        }
      ]}
      faq={[
        {
          question: "O que caracteriza improbidade administrativa?",
          answer: "Improbidade administrativa é configurada por atos que importem enriquecimento ilícito, causem prejuízo ao erário ou atentem contra princípios da administração pública, praticados com dolo ou culpa grave."
        },
        {
          question: "Quais são as sanções por improbidade administrativa?",
          answer: "As sanções incluem ressarcimento do dano, perda da função pública, suspensão dos direitos políticos, proibição de contratar com o poder público e multa civil, variando conforme a modalidade de improbidade."
        },
        {
          question: "Empresas privadas podem responder por improbidade?",
          answer: "Sim, pessoas físicas e jurídicas que se beneficiem direta ou indiretamente de atos de improbidade ou participem de sua prática podem ser responsabilizadas, conforme Lei 8.429/92."
        },
        {
          question: "É possível fazer acordo em ação de improbidade?",
          answer: "Sim, a Lei 13.964/2019 permitiu acordos de não persecução cível em casos de improbidade que não envolvam enriquecimento ilícito, mediante ressarcimento e outras condições."
        }
      ]}
      relatedServices={[
        {
          name: "Atos Administrativos",
          path: "/servicos/atos-administrativos"
        },
        {
          name: "PAD e Sindicâncias",
          path: "/servicos/pad-sindicancia"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default ImprobidadeAdministrativaService;
