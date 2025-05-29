
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ContratosEmpresariaisService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Empresarial"
      serviceName="Contratos Empresariais"
      serviceDescription="No mundo dos negócios, a palavra é o contrato. Garantimos que cada palavra seja uma fortaleza, cada cláusula um escudo. A negociação não é para empatar; é para vencer. Cada contrato é forjado com precisão cirúrgica, antecipando manobras e garantindo domínio."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Contratos Como Armas Estratégicas",
          description: "Cada contrato é forjado com precisão cirúrgica, antecipando cada manobra do adversário e garantindo que seus interesses não sejam apenas protegidos, mas dominantes."
        },
        {
          title: "Negociação Para Dominar",
          description: "Controlamos a narrativa, antecipamos movimentos e garantimos que o acordo final sirva aos seus objetivos. Não é negociação se apenas uma parte dita as regras - e essa parte é você."
        },
        {
          title: "Gestão Executiva de Contratos",
          description: "Sistemas implementados para execução impecável, transformando obrigações em oportunidades e evitando surpresas. Um contrato bem feito não pode ser desperdiçado."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Estratégica da Operação",
          description: "Entendimento profundo da operação comercial e identificação dos pontos críticos que determinarão domínio ou vulnerabilidade no relacionamento."
        },
        {
          step: 2,
          title: "Arquitetura Jurídica Ofensiva",
          description: "Elaboração de minutas que são mais que documentos legais - são armas estratégicas que protegem seus interesses e antecipam cenários de conflito."
        },
        {
          step: 3,
          title: "Domínio da Mesa de Negociação",
          description: "Suporte psicologicamente astuto durante negociações, controlando narrativa e fazendo a contraparte acreditar que sua proposta é a única conclusão lógica."
        },
        {
          step: 4,
          title: "Blindagem Final do Acordo",
          description: "Análise implacável da versão final, garantindo que cada vírgula trabalhe a seu favor e que não existam brechas para arrependimento futuro."
        },
        {
          step: 5,
          title: "Execução e Domínio Contínuo",
          description: "Monitoramento ativo da execução, interpretação estratégica de cláusulas e resolução dominante de divergências que surjam no caminho."
        }
      ]}
      testimonials={[
        {
          name: "Conglomerado Industrial Apex",
          quote: "Os contratos estruturados não apenas nos protegeram em uma disputa de R$ 50 milhões, mas nos deram vantagem total. O adversário teve que aceitar nossos termos integralmente."
        },
        {
          name: "TechCorp Ventures",
          quote: "A negociação assistida foi uma masterclass. Conseguimos termos que nem sonhávamos ser possíveis. Foi domínio total da mesa de negociação."
        },
        {
          name: "Holding Estratégica Sigma",
          quote: "Cada contrato é uma fortaleza. Em cinco anos de parcerias, nunca tivemos uma disputa que não fosse resolvida a nosso favor. Isso é poder contratual real."
        }
      ]}
      faq={[
        {
          question: "Como transformam contratos em vantagem competitiva?",
          answer: "Não elaboramos contratos que apenas 'funcionam' - criamos documentos que dominam. Isso significa cláusulas que antecipam cenários adversos, criam múltiplas saídas estratégicas, estabelecem penalidades assimétricas a seu favor e incluem mecanismos que tornam o descumprimento pela contraparte mais custoso que o cumprimento."
        },
        {
          question: "Qual o diferencial na negociação contratual?",
          answer: "Aplicamos psicologia estratégica e dominamos a arte da persuasão. Controlamos o timing, a agenda e a narrativa. Estudamos a contraparte, identificamos pressure points e usamos táticas como fraqueza fingida quando vantajoso. O resultado: acordos que não apenas atendem suas necessidades, mas excedem suas expectativas."
        },
        {
          question: "Como garantem execução impecável dos contratos?",
          answer: "Implementamos sistemas de gestão contratual que transformam obrigações em oportunidades. Monitoramento ativo de prazos, alertas estratégicos para renovações vantajosas, identificação proativa de oportunidades de renegociação e protocolos que garantem que você sempre saia na frente quando surgem divergências."
        }
      ]}
      relatedServices={[
        {
          name: "Fusões e Aquisições",
          path: "/servicos/fusoes-aquisicoes"
        },
        {
          name: "Contencioso Empresarial",
          path: "/servicos/contencioso-empresarial"
        }
      ]}
      mainAreaPath="/empresarial"
    />
  );
};

export default ContratosEmpresariaisService;
