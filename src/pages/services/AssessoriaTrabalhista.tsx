
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AssessoriaTrabalhista = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Assessoria em Relações Trabalhistas"
      serviceDescription="Orientação jurídica preventiva para empregadores sobre questões trabalhistas cotidianas e estratégicas, evitando conflitos e minimizando riscos em todas as etapas da relação laboral."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Prevenção de Conflitos",
          description: "Antecipação de problemas potenciais e implementação de medidas preventivas para evitar litígios trabalhistas."
        },
        {
          title: "Redução de Passivos",
          description: "Identificação e correção de práticas que podem gerar passivos trabalhistas futuros, protegendo o patrimônio da empresa."
        },
        {
          title: "Segurança nas Decisões",
          description: "Suporte jurídico para tomada de decisões estratégicas em recursos humanos, com foco na conformidade legal."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico Inicial",
          description: "Avaliação completa das práticas trabalhistas atuais da empresa, identificando pontos fortes e vulnerabilidades."
        },
        {
          step: 2,
          title: "Plano de Conformidade",
          description: "Elaboração de um plano personalizado para adequação às normas trabalhistas e mitigação de riscos identificados."
        },
        {
          step: 3,
          title: "Implementação de Políticas",
          description: "Desenvolvimento e implementação de políticas internas, contratos, acordos e documentação adequada."
        },
        {
          step: 4,
          title: "Treinamento e Capacitação",
          description: "Capacitação da equipe de RH e gestores sobre práticas corretas e conformes à legislação trabalhista."
        },
        {
          step: 5,
          title: "Monitoramento Contínuo",
          description: "Acompanhamento permanente das mudanças legislativas e jurisprudenciais, com adaptação das práticas quando necessário."
        }
      ]}
      testimonials={[
        {
          name: "Supermercados Estrela",
          quote: "A assessoria preventiva reduziu em 70% o número de reclamações trabalhistas em apenas um ano, com grande economia para nossa rede."
        },
        {
          name: "Ana P., Diretora de RH",
          quote: "O suporte constante nas decisões do dia a dia nos trouxe segurança jurídica e melhorou significativamente nossa relação com os colaboradores."
        },
        {
          name: "Construtora Horizonte",
          quote: "A implementação das políticas recomendadas transformou nossa gestão de pessoal, tornando-a mais profissional e segura juridicamente."
        }
      ]}
      faq={[
        {
          question: "Como a assessoria preventiva pode reduzir custos trabalhistas?",
          answer: "A assessoria preventiva identifica e corrige práticas incorretas antes que gerem litígios, evitando condenações judiciais, multas administrativas e custos com honorários advocatícios. Além disso, orienta na adoção de procedimentos que garantem segurança jurídica e transparência nas relações de trabalho."
        },
        {
          question: "Com que frequência as empresas devem revisar suas políticas trabalhistas?",
          answer: "Recomendamos revisões completas ao menos uma vez por ano e sempre que houver mudanças significativas na legislação ou na jurisprudência. Além disso, é importante realizar revisões pontuais quando há alterações na estrutura da empresa, como fusões, aquisições ou reestruturações."
        },
        {
          question: "Quais documentos trabalhistas são essenciais para evitar problemas futuros?",
          answer: "Entre os principais estão: contratos de trabalho detalhados, políticas internas claras e por escrito, registro preciso de ponto, comprovantes de pagamento de salários e benefícios, termos de compensação de horas, avaliações de desempenho e advertências formalizadas, além de documentação de saúde e segurança do trabalho."
        }
      ]}
      relatedServices={[
        {
          name: "Contencioso Trabalhista",
          path: "/servicos/contencioso-trabalhista"
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

export default AssessoriaTrabalhista;
