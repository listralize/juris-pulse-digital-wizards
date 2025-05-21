
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const GuardaFilhosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito da Família"
      serviceName="Guarda de Filhos"
      serviceDescription="Assessoria jurídica especializada em questões de guarda compartilhada, unilateral, direito de visitas e convivência parental, priorizando sempre o melhor interesse da criança."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Priorização do Bem-Estar",
          description: "Estratégias que priorizam o bem-estar psicológico e emocional das crianças durante todo o processo."
        },
        {
          title: "Acordos Equilibrados",
          description: "Mediação para estabelecer acordos equilibrados de guarda e convivência que respeitem os direitos de ambos os pais."
        },
        {
          title: "Resolução de Conflitos",
          description: "Abordagem focada na resolução de conflitos e na construção de um ambiente saudável de coparentalidade."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta Inicial Gratuita",
          description: "Realizamos uma análise preliminar do seu caso, entendemos suas necessidades e explicamos as opções disponíveis. Esta primeira consulta é sem compromisso e gratuita."
        },
        {
          step: 2,
          title: "Planejamento Estratégico",
          description: "Desenvolvemos uma estratégia personalizada para seu caso, considerando aspectos como a rotina das crianças, condições de ambos os pais e o melhor interesse dos filhos."
        },
        {
          step: 3,
          title: "Documentação e Preparação",
          description: "Preparamos toda a documentação necessária para dar entrada no processo, reunindo provas e elementos que fortaleçam sua posição."
        },
        {
          step: 4,
          title: "Negociação ou Litígio",
          description: "Dependendo do seu caso, podemos optar pela via consensual (mais rápida e menos desgastante) ou litigiosa (quando não há acordo possível)."
        },
        {
          step: 5,
          title: "Finalização e Homologação",
          description: "Cuidamos de todos os detalhes para a conclusão do processo, incluindo a homologação judicial e registros necessários."
        }
      ]}
      testimonials={[
        {
          name: "Ricardo M.",
          quote: "A guarda compartilhada parecia complexa no início, mas com a orientação correta conseguimos um acordo que realmente prioriza o bem-estar da nossa filha."
        },
        {
          name: "Patrícia L.",
          quote: "Em um momento tão delicado, encontrar profissionais que realmente se importam com o aspecto emocional das crianças fez toda a diferença."
        },
        {
          name: "Fernando S.",
          quote: "Conseguimos estabelecer uma rotina de convivência que respeita meus direitos como pai e mantém a estabilidade na vida do meu filho."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre guarda compartilhada e guarda alternada?",
          answer: "Na guarda compartilhada, ambos os pais compartilham as decisões e responsabilidades sobre a vida dos filhos, independentemente de com quem a criança resida. Já na guarda alternada, a criança passa períodos alternados na casa de cada genitor, com alternância também da responsabilidade exclusiva durante aquele período. A legislação brasileira privilegia a guarda compartilhada."
        },
        {
          question: "Como é definido o tempo de convivência de cada genitor com os filhos?",
          answer: "O tempo de convivência é definido considerando a rotina prévia da criança, proximidade das residências, atividades escolares e extracurriculares, e disponibilidade dos pais. O objetivo é garantir uma convivência equilibrada que cause o mínimo de impacto na vida da criança."
        },
        {
          question: "É possível alterar um acordo de guarda já homologado?",
          answer: "Sim, é possível alterar acordos de guarda quando houver mudança significativa nas circunstâncias ou quando o arranjo atual não estiver atendendo ao melhor interesse da criança. Nossos advogados podem auxiliar no processo de revisão do acordo."
        }
      ]}
      relatedServices={[
        {
          name: "Pensão Alimentícia",
          path: "/servicos/pensao-alimenticia"
        },
        {
          name: "Divórcio e Separação",
          path: "/servicos/divorcio-separacao"
        }
      ]}
      mainAreaPath="/familia"
    />
  );
};

export default GuardaFilhosService;
