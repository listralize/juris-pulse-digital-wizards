
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AcidentesDoencasService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Acidentes e Doenças Ocupacionais"
      serviceDescription="Sua saúde não é um custo, é um direito. Se você sofreu um acidente de trabalho ou desenvolveu doença ocupacional, lutamos por sua estabilidade, indenizações por danos morais e materiais, e pensão vitalícia quando necessário. Sua recuperação e seu futuro são nossa prioridade."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Estabilidade Acidentária Garantida",
          description: "Asseguramos 12 meses de estabilidade após alta médica do INSS, protegendo seu emprego durante o período de readaptação e recuperação."
        },
        {
          title: "Indenizações Integrais por Danos",
          description: "Buscamos reparação completa: danos morais pelo sofrimento, danos materiais por gastos médicos e lucros cessantes pela incapacidade laborativa."
        },
        {
          title: "Responsabilização do Empregador",
          description: "Quando há negligência empresarial, exigimos indenização civil, além dos benefícios previdenciários, responsabilizando a empresa pelos danos causados."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Caracterização do Acidente ou Doença",
          description: "Analisamos se o evento caracteriza acidente de trabalho ou doença ocupacional, verificando nexo causal entre atividade laboral e lesão/enfermidade."
        },
        {
          step: 2,
          title: "Documentação Médica e Pericial",
          description: "Reunimos laudos médicos, exames, CAT (Comunicação de Acidente de Trabalho) e solicitamos perícias técnicas para comprovar nexo causal e sequelas."
        },
        {
          step: 3,
          title: "Investigação de Responsabilidade",
          description: "Verificamos se houve negligência empresarial: falta de EPIs, ambiente insalubre, ausência de treinamento ou descumprimento de normas de segurança."
        },
        {
          step: 4,
          title: "Ação de Indenização Civil",
          description: "Ajuizamos ação civil trabalhista com pedidos de estabilidade, danos morais, materiais e pensão vitalícia quando há incapacidade permanente."
        },
        {
          step: 5,
          title: "Acompanhamento Previdenciário",
          description: "Orientamos sobre benefícios do INSS (auxílio-doença acidentário, aposentadoria por invalidez) e acompanhamos perícias médicas oficiais."
        }
      ]}
      testimonials={[
        {
          name: "João Silva - Operário de Construção",
          quote: "Sofri acidente grave por falta de EPI adequado. Além da estabilidade, recebi R$ 150.000 de indenização e pensão vitalícia de 50% do salário."
        },
        {
          name: "Maria Santos - Operadora de Telemarketing",
          quote: "Desenvolvi LER/DORT pela repetitividade do trabalho. A ação garantiu indenização de R$ 80.000 e reabilitação em função compatível."
        },
        {
          name: "Pedro Costa - Soldador Industrial",
          quote: "A empresa sabia dos riscos de câncer ocupacional mas não me protegeu adequadamente. Consegui aposentadoria especial e indenização milionária."
        }
      ]}
      faq={[
        {
          question: "O que caracteriza um acidente de trabalho?",
          answer: "Acidente de trabalho é o que ocorre durante o exercício do trabalho, causando lesão corporal ou perturbação funcional. Inclui acidentes típicos, de trajeto (casa-trabalho-casa) e doenças ocupacionais relacionadas à atividade laboral."
        },
        {
          question: "Tenho direito a indenização além dos benefícios do INSS?",
          answer: "Sim! Quando há negligência da empresa (falta de EPIs, ambiente inseguro, descumprimento de normas), você tem direito à indenização civil por danos morais e materiais, independentemente dos benefícios previdenciários."
        },
        {
          question: "Quanto tempo tenho estabilidade após acidente de trabalho?",
          answer: "12 meses após alta médica do INSS. Durante esse período, você não pode ser demitido sem justa causa. Se isso ocorrer, tem direito à reintegração ou indenização correspondente ao período restante."
        },
        {
          question: "Posso ser demitido durante afastamento por acidente?",
          answer: "Não! Durante o afastamento por acidente de trabalho, há estabilidade provisória. A demissão só é possível por justa causa grave ou no fim da estabilidade pós-alta médica."
        }
      ]}
      relatedServices={[
        {
          name: "Adicionais e Insalubridade",
          path: "/servicos/adicionais-insalubridade"
        },
        {
          name: "Defesa do Trabalhador",
          path: "/servicos/defesa-trabalhador"
        }
      ]}
      mainAreaPath="/trabalho"
    />
  );
};

export default AcidentesDoencasService;
