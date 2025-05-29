
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ConsultoriaEmpresarialTrabalhistaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Consultoria e Compliance Trabalhista para Empresas"
      serviceDescription="Em um cenário trabalhista volátil, a prevenção é o seu maior ativo. Construímos a blindagem jurídica que sua empresa precisa, transformando risco em segurança e garantindo conformidade longe de passivos desnecessários."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Blindagem Jurídica Preventiva",
          description: "Identificamos e neutralizamos riscos trabalhistas antes que se tornem problemas, protegendo sua empresa de litígios custosos e passivos desnecessários."
        },
        {
          title: "Conformidade Estratégica Total",
          description: "Implementamos programas de compliance que não apenas atendem à lei, mas criam vantagem competitiva através de operações éticas e transparentes."
        },
        {
          title: "Defesa Empresarial Implacável",
          description: "Quando o litígio é inevitável, atuamos com agressividade e inteligência para proteger seus interesses e minimizar perdas em todas as instâncias."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Auditoria Trabalhista Completa",
          description: "Análise abrangente de todas as práticas trabalhistas da empresa, identificando vulnerabilidades em contratos, jornadas, verbas e políticas internas."
        },
        {
          step: 2,
          title: "Assessoria Jurídica Preventiva",
          description: "Implementação de protocolos e procedimentos que blindam a empresa contra riscos trabalhistas, desde contratação até desligamento de colaboradores."
        },
        {
          step: 3,
          title: "Elaboração de Contratos Estratégicos",
          description: "Criação e revisão de modelos contratuais - CLT, intermitente, teletrabalho - com precisão cirúrgica, alinhados às necessidades da empresa e exigências legais."
        },
        {
          step: 4,
          title: "Negociação Coletiva Estratégica",
          description: "Representação da empresa em negociações sindicais, garantindo acordos que equilibram interesses e maximizam flexibilidade operacional."
        },
        {
          step: 5,
          title: "Treinamento e Capacitação",
          description: "Desenvolvimento de programas de treinamento para gestores e colaboradores, criando cultura de compliance e prevenindo violações trabalhistas."
        }
      ]}
      testimonials={[
        {
          name: "Indústria Metalúrgica Forte SA",
          quote: "Após implementar o compliance trabalhista, reduzimos em 90% os processos trabalhistas e economizamos milhões em contingências. O investimento se pagou rapidamente."
        },
        {
          name: "Rede de Supermercados Regional",
          quote: "A auditoria trabalhista revelou riscos que nem imaginávamos. As correções preventivas nos pouparam de um passivo milionário e melhoraram nosso ambiente de trabalho."
        },
        {
          name: "Grupo de Construção Civil",
          quote: "A negociação coletiva conduzida pela equipe resultou em acordo vantajoso para ambas as partes, garantindo paz social e flexibilidade operacional para nossos projetos."
        }
      ]}
      faq={[
        {
          question: "Por que investir em compliance trabalhista preventivo?",
          answer: "Cada R$ 1 investido em prevenção economiza R$ 10 em litígios. O compliance trabalhista não é custo, é investimento que protege a empresa de processos custosos, multas, passivos contingentes e danos à reputação. Além disso, cria ambiente de trabalho mais seguro e produtivo."
        },
        {
          question: "Como a auditoria trabalhista protege minha empresa?",
          answer: "A auditoria identifica vulnerabilidades antes que se tornem processos: irregularidades em jornada, pagamentos incorretos, falhas em contratos, descumprimento de normas de segurança. Corrigimos proativamente, evitando que problemas pequenos se tornem passivos milionários."
        },
        {
          question: "Qual o diferencial na defesa empresarial em processos trabalhistas?",
          answer: "Não vamos a julgamento para tentar vencer; vamos para ganhar. Nossa estratégia combina conhecimento técnico profundo, análise criteriosa de provas e argumentação jurídica robusta. Quando possível, buscamos acordos estratégicos que minimizam custos e riscos."
        },
        {
          question: "Como funciona a negociação coletiva estratégica?",
          answer: "Entramos nas negociações preparados para vencer, não apenas participar. Estudamos as demandas sindicais, analisamos o cenário econômico e preparamos propostas que atendem interesses legítimos dos trabalhadores sem comprometer a competitividade da empresa."
        }
      ]}
      relatedServices={[
        {
          name: "Compliance Trabalhista",
          path: "/servicos/compliance-trabalhista"
        },
        {
          name: "Rescisões Contratuais",
          path: "/servicos/rescisoes-contratuais"
        }
      ]}
      mainAreaPath="/trabalho"
    />
  );
};

export default ConsultoriaEmpresarialTrabalhistaService;
