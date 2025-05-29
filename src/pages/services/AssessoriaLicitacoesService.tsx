
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AssessoriaLicitacoesService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Assessoria Estratégica em Licitações"
      serviceDescription="Vencer contratos públicos exige mais do que uma proposta; demanda previsão jurídica. Fornecemos assessoria abrangente, desde a análise meticulosa de editais até a estruturação da empresa para conformidade e desempenho ideais, garantindo que você esteja sempre um passo à frente."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Análise Estratégica de Editais",
          description: "Avaliação completa de editais de licitação, identificando oportunidades, riscos e estratégias vencedoras para maximizar chances de sucesso."
        },
        {
          title: "Estruturação Empresarial para Licitações",
          description: "Orientação para adequação da empresa aos requisitos licitatórios, incluindo documentação, qualificação técnica e econômica."
        },
        {
          title: "Compliance Licitatório",
          description: "Implementação de práticas de conformidade para garantir participação legal e ética em processos licitatórios."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Preliminar do Edital",
          description: "Avaliação detalhada do edital, identificando requisitos, critérios de julgamento e possíveis pontos de contestação."
        },
        {
          step: 2,
          title: "Estratégia de Participação",
          description: "Desenvolvimento de estratégia personalizada considerando o perfil da empresa e características específicas da licitação."
        },
        {
          step: 3,
          title: "Preparação da Documentação",
          description: "Orientação na preparação de toda documentação necessária, garantindo conformidade e competitividade."
        },
        {
          step: 4,
          title: "Acompanhamento do Processo",
          description: "Monitoramento contínuo do processo licitatório, com assessoria em todas as fases até a assinatura do contrato."
        },
        {
          step: 5,
          title: "Gestão Pós-Licitação",
          description: "Suporte na gestão contratual, modificações e eventuais disputas para maximizar resultados ao longo do contrato."
        }
      ]}
      testimonials={[
        {
          name: "Construtora Santos Lima",
          quote: "A assessoria foi fundamental para nossa vitória em licitação de R$ 50 milhões. A análise estratégica do edital nos deu vantagem competitiva decisiva."
        },
        {
          name: "Empresa Tech Solutions",
          quote: "Conseguimos estruturar nossa empresa adequadamente e vencer nossa primeira licitação pública graças à orientação especializada recebida."
        },
        {
          name: "Fornecedora Industrial Ltda",
          quote: "O acompanhamento profissional durante todo o processo licitatório garantiu nossa participação sem intercorrências e com total segurança jurídica."
        }
      ]}
      faq={[
        {
          question: "Como a assessoria estratégica pode aumentar as chances de vitória em licitações?",
          answer: "Nossa assessoria envolve análise detalhada do edital, identificação de pontos estratégicos, estruturação adequada da proposta e orientação sobre compliance licitatório, aumentando significativamente as chances de sucesso."
        },
        {
          question: "Que tipo de empresas podem se beneficiar da assessoria em licitações?",
          answer: "Empresas de todos os portes e setores que desejam participar de licitações públicas, desde iniciantes no mercado público até empresas experientes que buscam otimizar seus resultados."
        },
        {
          question: "A assessoria inclui suporte durante todo o processo licitatório?",
          answer: "Sim, oferecemos acompanhamento completo desde a análise do edital até a assinatura do contrato, incluindo suporte em recursos e esclarecimentos necessários."
        },
        {
          question: "Como é feita a estruturação empresarial para licitações?",
          answer: "Avaliamos a documentação da empresa, adequamos processos internos aos requisitos licitatórios e orientamos sobre qualificação técnica e econômica necessária para cada tipo de licitação."
        }
      ]}
      relatedServices={[
        {
          name: "Defesa em Processos Licitatórios",
          path: "/servicos/defesa-licitacoes"
        },
        {
          name: "Gestão de Contratos Públicos",
          path: "/servicos/gestao-contratos-publicos"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default AssessoriaLicitacoesService;
