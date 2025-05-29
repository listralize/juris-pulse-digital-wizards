
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DireitoAmbientalAdministrativoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Direito Ambiental Administrativo"
      serviceDescription="As regulamentações ambientais são rigorosas, e a não conformidade acarreta consequências graves. Oferecemos consultoria jurídica especializada para licenciamento ambiental, defesa estratégica em litígios ambientais administrativos e judiciais, e garantia de que seus projetos estejam alinhados com práticas sustentáveis."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Licenciamento Ambiental Completo",
          description: "Assessoria integral para obtenção de licenças ambientais prévia, de instalação e de operação junto aos órgãos competentes."
        },
        {
          title: "Defesa em Infrações Ambientais",
          description: "Defesa estratégica em processos administrativos por infrações ambientais, buscando redução ou anulação de penalidades."
        },
        {
          title: "Compliance Ambiental",
          description: "Implementação de práticas de conformidade ambiental para prevenção de riscos e garantia de sustentabilidade."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico Ambiental",
          description: "Avaliação da situação ambiental do empreendimento, identificando licenças necessárias e riscos de conformidade."
        },
        {
          step: 2,
          title: "Estratégia de Licenciamento",
          description: "Desenvolvimento de estratégia para obtenção das licenças ambientais, considerando cronograma e requisitos específicos."
        },
        {
          step: 3,
          title: "Elaboração de Documentação",
          description: "Preparação de estudos ambientais, relatórios técnicos e documentação necessária para processos de licenciamento."
        },
        {
          step: 4,
          title: "Acompanhamento dos Processos",
          description: "Monitoramento dos processos junto aos órgãos ambientais, atendimento a exigências e condicionantes."
        },
        {
          step: 5,
          title: "Gestão Ambiental Contínua",
          description: "Assessoria contínua para manutenção da conformidade ambiental e renovação de licenças quando necessário."
        }
      ]}
      testimonials={[
        {
          name: "Indústria Química Regional",
          quote: "O licenciamento ambiental foi conduzido com excelência técnica, garantindo aprovação sem atrasos em projeto de R$ 100 milhões."
        },
        {
          name: "Mineradora Nacional",
          quote: "A defesa contra autuação ambiental resultou na redução de 80% da multa aplicada e adequação sustentável das operações."
        },
        {
          name: "Construtora Sustentável",
          quote: "O compliance ambiental implementado nos diferenciou no mercado e garantiu aprovação rápida de todos os nossos projetos."
        }
      ]}
      faq={[
        {
          question: "Quais são os tipos de licenças ambientais?",
          answer: "As principais são: Licença Prévia (LP) para viabilidade ambiental, Licença de Instalação (LI) para início da obra, e Licença de Operação (LO) para funcionamento do empreendimento."
        },
        {
          question: "Quanto tempo demora um processo de licenciamento ambiental?",
          answer: "Varia conforme complexidade e órgão licenciador: pode ser de 6 meses a 2 anos. Projetos bem estruturados e com documentação completa tendem a ter tramitação mais rápida."
        },
        {
          question: "Como contestar multas ambientais?",
          answer: "Através de defesa administrativa no prazo legal (geralmente 20 dias), contestando aspectos formais ou materiais da autuação, apresentando documentos e argumentos técnicos."
        },
        {
          question: "É obrigatório fazer estudo de impacto ambiental?",
          answer: "Depende do porte e potencial poluidor da atividade. Empreendimentos de significativo impacto ambiental exigem EIA/RIMA, enquanto outros podem necessitar estudos simplificados."
        }
      ]}
      relatedServices={[
        {
          name: "Regulação e Fiscalização",
          path: "/servicos/regulacao-fiscalizacao"
        },
        {
          name: "Atos Administrativos",
          path: "/servicos/atos-administrativos"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default DireitoAmbientalAdministrativoService;
