
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DireitoUrbanisticoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Direito Urbanístico Administrativo"
      serviceDescription="Do zoneamento e uso do solo a licenças de construção e intervenções urbanas, a navegação no direito urbanístico exige conhecimento especializado. Fornecemos assessoria abrangente para projetos imobiliários, garantindo a conformidade com a legislação urbanística e assegurando todas as licenças administrativas necessárias."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Licenciamento de Obras Completo",
          description: "Assessoria para obtenção de alvarás de construção, habite-se e demais licenças urbanísticas necessárias para projetos imobiliários."
        },
        {
          title: "Análise de Viabilidade Urbanística",
          description: "Avaliação detalhada da viabilidade urbanística de empreendimentos, considerando zoneamento, coeficientes e restrições aplicáveis."
        },
        {
          title: "Regularização Imobiliária",
          description: "Assessoria em processos de regularização de edificações e parcelamentos, adequando imóveis à legislação urbanística vigente."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Legislação Local",
          description: "Estudo detalhado do Plano Diretor, Lei de Zoneamento e demais normas urbanísticas aplicáveis ao empreendimento."
        },
        {
          step: 2,
          title: "Viabilidade do Projeto",
          description: "Análise da viabilidade urbanística considerando índices construtivos, recuos, gabaritos e demais limitações legais."
        },
        {
          step: 3,
          title: "Estratégia de Aprovação",
          description: "Desenvolvimento de estratégia para aprovação do projeto, incluindo eventuais solicitações de exceções ou flexibilizações."
        },
        {
          step: 4,
          title: "Tramitação dos Processos",
          description: "Acompanhamento de todos os processos de licenciamento junto às secretarias municipais competentes."
        },
        {
          step: 5,
          title: "Regularização e Adequações",
          description: "Assessoria para adequações necessárias e regularização de situações urbanísticas irregulares."
        }
      ]}
      testimonials={[
        {
          name: "Incorporadora Metropolitana",
          quote: "A análise urbanística prévia evitou problemas no licenciamento de nosso empreendimento de 20 andares, garantindo aprovação sem intercorrências."
        },
        {
          name: "Construtora Familiar",
          quote: "A regularização da nossa obra irregular foi conduzida com eficiência, evitando embargo e garantindo a conclusão do projeto."
        },
        {
          name: "Desenvolvedor Imobiliário",
          quote: "A assessoria urbanística foi fundamental para viabilizar nosso projeto em área de preservação, obtendo todas as licenças necessárias."
        }
      ]}
      faq={[
        {
          question: "O que é necessário para obter alvará de construção?",
          answer: "Projeto arquitetônico aprovado, documentação do terreno, ART/RRT dos responsáveis técnicos, comprovação do cumprimento de recuos e índices urbanísticos, além de taxas municipais."
        },
        {
          question: "Como regularizar construção sem alvará?",
          answer: "Através de processo de regularização junto à prefeitura, apresentando projeto 'as built', documentação técnica, pagamento de multas e adequações necessárias conforme legislação."
        },
        {
          question: "O que fazer quando o projeto não se enquadra no zoneamento?",
          answer: "Pode-se pleitear exceções previstas em lei, solicitar flexibilizações ao Conselho Municipal, ou adequar o projeto aos parâmetros permitidos para a zona."
        },
        {
          question: "Quais são os principais documentos urbanísticos?",
          answer: "Plano Diretor Municipal, Lei de Zoneamento, Código de Obras, Lei de Parcelamento do Solo, Código de Posturas e normas específicas para áreas especiais."
        }
      ]}
      relatedServices={[
        {
          name: "Regularização Imobiliária",
          path: "/servicos/desapropriacao"
        },
        {
          name: "Licenciamento Ambiental",
          path: "/servicos/direito-ambiental-administrativo"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default DireitoUrbanisticoService;
