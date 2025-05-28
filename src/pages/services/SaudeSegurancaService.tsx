
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const SaudeSegurancaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Saúde e Segurança"
      serviceDescription="Consultoria especializada sobre normas de segurança ocupacional e prevenção de acidentes de trabalho, garantindo ambiente de trabalho seguro e conforme a legislação."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Prevenção de Acidentes",
          description: "Implementação de medidas preventivas que reduzem significativamente os riscos de acidentes de trabalho."
        },
        {
          title: "Conformidade com NRs",
          description: "Adequação completa às Normas Regulamentadoras do Ministério do Trabalho."
        },
        {
          title: "Redução de Passivos",
          description: "Diminuição de riscos de processos e indenizações relacionadas a acidentes e doenças ocupacionais."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Avaliação de Riscos",
          description: "Análise completa do ambiente de trabalho para identificação de riscos ocupacionais."
        },
        {
          step: 2,
          title: "Adequação às NRs",
          description: "Desenvolvimento de plano para adequação às Normas Regulamentadoras aplicáveis."
        },
        {
          step: 3,
          title: "Implementação de Medidas",
          description: "Execução das medidas de segurança identificadas como necessárias."
        },
        {
          step: 4,
          title: "Treinamentos",
          description: "Capacitação dos empregados sobre segurança do trabalho e uso de EPIs."
        },
        {
          step: 5,
          title: "Monitoramento",
          description: "Acompanhamento contínuo da efetividade das medidas e atualização conforme necessário."
        }
      ]}
      testimonials={[
        {
          name: "Indústria Química",
          quote: "A implementação do programa de segurança resultou em zero acidentes nos últimos dois anos, além de evitar multas do Ministério do Trabalho."
        },
        {
          name: "Construtora Regional",
          quote: "A assessoria em segurança do trabalho transformou nossa cultura organizacional e reduziu drasticamente nossos indicadores de acidentes."
        }
      ]}
      faq={[
        {
          question: "Quais são as principais Normas Regulamentadoras que as empresas devem observar?",
          answer: "As principais incluem: NR-1 (Disposições Gerais), NR-5 (CIPA), NR-6 (EPIs), NR-7 (PCMSO), NR-9 (PPRA), NR-12 (Máquinas e Equipamentos), entre outras, dependendo da atividade da empresa."
        },
        {
          question: "Qual a responsabilidade da empresa em caso de acidente de trabalho?",
          answer: "A empresa pode ser responsabilizada civil e criminalmente em caso de acidente, especialmente se houver negligência no cumprimento das normas de segurança. As penalidades incluem indenizações, multas administrativas e até responsabilização criminal dos gestores."
        }
      ]}
      relatedServices={[
        {
          name: "Assessoria Trabalhista",
          path: "/servicos/assessoria-trabalhista"
        },
        {
          name: "Compliance Trabalhista",
          path: "/servicos/compliance-trabalhista"
        }
      ]}
      mainAreaPath="/trabalho"
    />
  );
};

export default SaudeSegurancaService;
