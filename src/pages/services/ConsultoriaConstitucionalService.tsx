
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ConsultoriaConstitucionalService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Consultoria Constitucional Preventiva"
      serviceDescription="O melhor ataque é uma defesa impecável. Nossa consultoria constitucional não é reativa; é preditiva. Oferecemos inteligência jurídica para antecipar riscos, garantir conformidade com a Constituição Federal e evitar litígios futuros. Analisamos cada detalhe, cada risco potencial, garantindo que suas decisões estejam blindadas pela Constituição."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Inteligência Jurídica Preventiva",
          description: "Antecipamos riscos constitucionais antes que se materiializem em problemas, oferecendo análise preditiva que protege suas operações e decisões."
        },
        {
          title: "Blindagem Constitucional Completa",
          description: "Garantimos que todos os atos, normas e decisões estejam em perfeita conformidade com a Constituição Federal, eliminando vulnerabilidades jurídicas."
        },
        {
          title: "Economia de Recursos e Tempo",
          description: "A prevenção é infinitamente mais econômica que o litígio. Evitamos custos, tempo e desgaste de processos judiciais complexos e demorados."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico Constitucional Completo",
          description: "Realizamos auditoria constitucional abrangente, identificando todas as áreas de risco e vulnerabilidades jurídicas em suas operações."
        },
        {
          step: 2,
          title: "Análise de Constitucionalidade Preventiva",
          description: "Examinamos projetos, normas e atos antes de sua implementação, garantindo conformidade constitucional desde a concepção."
        },
        {
          step: 3,
          title: "Elaboração de Pareceres Estratégicos",
          description: "Produzimos pareceres jurídicos robustos que servem como blindagem legal e orientação segura para tomada de decisões."
        },
        {
          step: 4,
          title: "Implementação de Compliance Constitucional",
          description: "Desenvolvemos protocolos e procedimentos internos que garantem conformidade constitucional permanente em suas atividades."
        },
        {
          step: 5,
          title: "Monitoramento Jurisprudencial Contínuo",
          description: "Acompanhamos mudanças na jurisprudência constitucional, atualizando estratégias e orientações conforme evolução do direito."
        }
      ]}
      testimonials={[
        {
          name: "Município de Campinas",
          quote: "A consultoria preventiva evitou que nossa lei municipal fosse questionada no STF. A análise prévia identificou vícios que corrigimos antes da promulgação."
        },
        {
          name: "Corporação XYZ S.A.",
          quote: "Os pareceres constitucionais preventivos nos deram segurança jurídica para expandir negócios sem riscos regulatórios. Investimento que se pagou rapidamente."
        },
        {
          name: "Assembleia Legislativa do Estado",
          quote: "A assessoria constitucional permanente garantiu que 100% dos projetos aprovados resistissem a contestações judiciais. Eficiência legislativa comprovada."
        }
      ]}
      faq={[
        {
          question: "Quando devo buscar consultoria constitucional preventiva?",
          answer: "Sempre que for criar normas, implementar políticas públicas, tomar decisões estratégicas ou atuar em áreas reguladas. A prevenção é essencial antes que problemas se materializem em litígios caros e demorados."
        },
        {
          question: "Qual a diferença entre parecer constitucional e opinião legal comum?",
          answer: "O parecer constitucional analisa especificamente a conformidade com a Constituição Federal, considerando princípios fundamentais, direitos e garantias constitucionais, federalismo e separação de poderes, oferecendo análise mais profunda e especializada."
        },
        {
          question: "A consultoria preventiva é válida para empresas privadas?",
          answer: "Absolutamente. Empresas que atuam em setores regulados, prestam serviços públicos, participam de licitações ou têm impacto social significativo se beneficiam enormemente da consultoria constitucional preventiva."
        },
        {
          question: "Como a consultoria preventiva pode evitar problemas futuros?",
          answer: "Identificamos antecipadamente vícios de constitucionalidade, riscos de questionamento judicial, incompatibilidades normativas e vulnerabilidades jurídicas, permitindo correções antes que gerem litígios ou nulidades."
        }
      ]}
      relatedServices={[
        {
          name: "Ações de Inconstitucionalidade",
          path: "/servicos/acoes-inconstitucionalidade"
        },
        {
          name: "Direitos Fundamentais",
          path: "/servicos/direitos-fundamentais"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default ConsultoriaConstitucionalService;
