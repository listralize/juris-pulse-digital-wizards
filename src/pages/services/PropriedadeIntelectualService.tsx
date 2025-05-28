
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PropriedadeIntelectualService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Empresarial"
      serviceName="Propriedade Intelectual"
      serviceDescription="Proteção completa de ativos intangíveis através de registro de marcas, patentes, direitos autorais e defesa contra violações, garantindo a exclusividade e valor dos seus ativos intelectuais."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Proteção de Ativos",
          description: "Registro e proteção legal de marcas, patentes, designs e outros ativos intelectuais da empresa."
        },
        {
          title: "Vantagem Competitiva",
          description: "Exclusividade de uso de inovações e marcas, criando diferenciação no mercado e barreiras à concorrência."
        },
        {
          title: "Monetização de IP",
          description: "Estratégias para gerar receita através de licenciamento, franchising e outras formas de exploração da propriedade intelectual."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Auditoria de Ativos Intelectuais",
          description: "Identificação e catalogação de todos os ativos intelectuais da empresa, avaliando necessidades de proteção."
        },
        {
          step: 2,
          title: "Estratégia de Proteção",
          description: "Desenvolvimento de estratégia abrangente de proteção, priorizando ativos conforme importância e viabilidade."
        },
        {
          step: 3,
          title: "Registro e Depósitos",
          description: "Execução dos procedimentos de registro no INPI e órgãos internacionais, incluindo pesquisas de anterioridade."
        },
        {
          step: 4,
          title: "Monitoramento do Mercado",
          description: "Vigilância contínua para identificar potenciais violações e uso indevido dos direitos registrados."
        },
        {
          step: 5,
          title: "Defesa e Enforcement",
          description: "Ações legais contra violações, negociação de acordos e defesa dos direitos em todas as instâncias."
        }
      ]}
      testimonials={[
        {
          name: "Startup de Tecnologia",
          quote: "O registro das nossas patentes foi crucial para atrair investidores e proteger nossa inovação no mercado competitivo de tecnologia."
        },
        {
          name: "Indústria Farmacêutica",
          quote: "A proteção da marca e das fórmulas através de propriedade intelectual garantiu nossa posição de liderança no mercado."
        },
        {
          name: "Empresa de Software",
          quote: "A estratégia de PI implementada protegeu nosso software e ainda gerou receita adicional através de licenciamento."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre marca, patente e direito autoral?",
          answer: "Marca protege sinais distintivos (nomes, logos, slogans) que identificam produtos/serviços. Patente protege invenções técnicas novas e inventivas por 20 anos. Direito autoral protege obras intelectuais (textos, músicas, software) automaticamente pela criação. Cada tipo tem requisitos, prazos e proteções específicas."
        },
        {
          question: "Quanto tempo dura a proteção de propriedade intelectual?",
          answer: "Varia por tipo: marcas duram 10 anos, renováveis indefinidamente; patentes duram 20 anos (modelo de utilidade 15 anos); direitos autorais duram vida do autor + 70 anos; desenho industrial dura 10 anos, renovável por mais 15 anos. É importante acompanhar prazos para renovações e manutenções."
        },
        {
          question: "É possível proteger propriedade intelectual internacionalmente?",
          answer: "Sim, através de tratados internacionais como Protocolo de Madrid (marcas), PCT (patentes) e Convenção de Berna (direitos autorais). Também é possível fazer depósitos nacionais em países específicos. A estratégia internacional deve considerar mercados relevantes, custos e prazos de proteção em cada jurisdição."
        }
      ]}
      relatedServices={[
        {
          name: "Contratos Empresariais",
          path: "/servicos/contratos-empresariais"
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

export default PropriedadeIntelectualService;
