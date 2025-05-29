
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ComplianceTributarioService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Compliance Tributário"
      serviceDescription="Implementação de rotinas e controles para garantir conformidade com as obrigações fiscais, incluindo procedimentos internos, treinamentos e monitoramento contínuo da legislação tributária."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Prevenção de Riscos",
          description: "Identificação e mitigação proativa de riscos fiscais através de controles internos e procedimentos estruturados."
        },
        {
          title: "Conformidade Contínua",
          description: "Manutenção permanente da regularidade fiscal através de monitoramento das obrigações e mudanças legislativas."
        },
        {
          title: "Eficiência Operacional",
          description: "Otimização dos processos tributários internos, reduzindo retrabalho e aumentando a produtividade da área fiscal."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico dos Processos",
          description: "Avaliação dos procedimentos tributários atuais e identificação de gaps e oportunidades de melhoria."
        },
        {
          step: 2,
          title: "Mapeamento de Obrigações",
          description: "Levantamento completo de todas as obrigações tributárias aplicáveis ao negócio e seus respectivos prazos."
        },
        {
          step: 3,
          title: "Desenvolvimento de Controles",
          description: "Criação de procedimentos, check-lists e controles internos para garantir cumprimento das obrigações."
        },
        {
          step: 4,
          title: "Treinamento das Equipes",
          description: "Capacitação dos colaboradores nos novos procedimentos e na legislação tributária aplicável."
        },
        {
          step: 5,
          title: "Monitoramento e Atualização",
          description: "Acompanhamento contínuo da efetividade dos controles e atualização conforme mudanças legislativas."
        }
      ]}
      testimonials={[
        {
          name: "Grupo Alimentício Regional",
          quote: "O programa de compliance tributário eliminou 100% das multas por atraso e nos deu total controle sobre nossas obrigações fiscais."
        },
        {
          name: "Rede de Varejo Fashion",
          quote: "Implementamos controles que nos permitiram identificar oportunidades de créditos tributários que antes passavam despercebidas."
        },
        {
          name: "Prestadora de Serviços TI",
          quote: "O compliance tributário trouxe segurança jurídica e reduziu significativamente o tempo gasto com questões fiscais operacionais."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre compliance tributário e contabilidade fiscal?",
          answer: "A contabilidade fiscal foca na apuração e cumprimento das obrigações tributárias, enquanto o compliance tributário é mais abrangente, incluindo governança, controles internos, gestão de riscos, treinamentos e monitoramento contínuo. O compliance vai além do operacional, criando uma cultura de conformidade e prevenção de riscos na organização."
        },
        {
          question: "Como o compliance tributário pode reduzir custos da empresa?",
          answer: "O compliance reduz custos através da prevenção de multas e juros por atraso, identificação de créditos e benefícios não aproveitados, otimização de processos internos, redução de contingências fiscais e melhoria na gestão de prazos e obrigações. O investimento em compliance é rapidamente recuperado através dessas economias."
        },
        {
          question: "Qual o papel da tecnologia no compliance tributário?",
          answer: "A tecnologia é fundamental para automatizar controles, gerar alertas de vencimentos, consolidar informações de múltiplas fontes, monitorar mudanças legislativas e produzir relatórios gerenciais. Sistemas de compliance tributário podem integrar com ERPs e sistemas contábeis, criando workflows automáticos e reduzindo drasticamente o risco de erros humanos."
        }
      ]}
      relatedServices={[
        {
          name: "Auditoria Tributária",
          path: "/servicos/auditoria-tributaria"
        },
        {
          name: "Planejamento Tributário",
          path: "/servicos/planejamento-tributario"
        }
      ]}
      mainAreaPath="/tributario"
    />
  );
};

export default ComplianceTributarioService;
