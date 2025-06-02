
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AssessoriaTrabalhistaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Assessoria Trabalhista"
      serviceDescription="Consultoria preventiva completa em direito do trabalho, auxiliando empresas a manterem conformidade legal e evitarem passivos trabalhistas."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Prevenção de Passivos",
          description: "Identificação e correção proativa de irregularidades antes que se tornem processos judiciais."
        },
        {
          title: "Atualização Legislativa",
          description: "Acompanhamento constante das mudanças na legislação trabalhista e orientação sobre impactos."
        },
        {
          title: "Políticas Internas",
          description: "Elaboração e revisão de políticas de RH alinhadas com as melhores práticas trabalhistas."
        },
        {
          title: "Capacitação de Equipes",
          description: "Treinamento de gestores e equipes de RH sobre procedimentos e obrigações trabalhistas."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico Inicial",
          description: "Auditoria completa dos processos trabalhistas da empresa para identificar pontos de melhoria."
        },
        {
          step: 2,
          title: "Plano de Adequação",
          description: "Elaboração de plano estruturado para correção de não conformidades identificadas."
        },
        {
          step: 3,
          title: "Implementação de Melhorias",
          description: "Acompanhamento da implementação das medidas corretivas e preventivas."
        },
        {
          step: 4,
          title: "Monitoramento Contínuo",
          description: "Acompanhamento periódico para manutenção da conformidade e atualizações legais."
        },
        {
          step: 5,
          title: "Suporte Especializado",
          description: "Disponibilidade para esclarecimento de dúvidas e orientações pontuais conforme necessário."
        }
      ]}
      testimonials={[
        {
          name: "Startup de Tecnologia",
          quote: "A assessoria nos ajudou a estruturar nossos processos de RH desde o início, evitando problemas futuros."
        },
        {
          name: "Empresa Familiar",
          quote: "O acompanhamento mensal nos trouxe segurança jurídica e redução significativa de riscos trabalhistas."
        },
        {
          name: "Indústria Regional",
          quote: "Excelente orientação preventiva que nos permitiu adequar práticas e evitar multas trabalhistas."
        }
      ]}
      faq={[
        {
          question: "Com que frequência deve ser feita assessoria trabalhista?",
          answer: "Recomenda-se acompanhamento mensal para empresas em crescimento e trimestral para empresas estabelecidas, com disponibilidade para consultas pontuais."
        },
        {
          question: "Quais documentos trabalhistas são obrigatórios?",
          answer: "Registro de empregados, controle de ponto, CAGED, RAIS, DIRF, GFIP, entre outros, variando conforme o porte e atividade da empresa."
        },
        {
          question: "Como funciona o eSocial?",
          answer: "Sistema unificado de envio de informações trabalhistas, previdenciárias e fiscais que substituiu várias obrigações acessórias."
        },
        {
          question: "Qual a importância da assessoria preventiva?",
          answer: "Evita multas, processos trabalhistas e passivos ocultos, além de otimizar processos e garantir conformidade com a legislação."
        }
      ]}
      relatedServices={[
        {
          name: "Compliance Trabalhista",
          path: "/servicos/compliance-trabalhista"
        },
        {
          name: "Contencioso Trabalhista",
          path: "/servicos/contencioso-trabalhista"
        },
        {
          name: "Rescisões Contratuais",
          path: "/servicos/rescisoes-contratuais"
        }
      ]}
      mainAreaPath="/areas/trabalho"
    />
  );
};

export default AssessoriaTrabalhistaService;
