
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const InvestigacaoPaternidadeService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Investigação de Paternidade"
      serviceDescription="Assessoria especializada em ações de investigação e contestação de paternidade, incluindo exame de DNA, reconhecimento de paternidade socioafetiva e todos os direitos decorrentes da filiação."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Exame de DNA Gratuito",
          description: "Orientação sobre como obter exame de DNA gratuito através do Judiciário em ações de investigação de paternidade.",
          icon: "🧬"
        },
        {
          title: "Paternidade Socioafetiva",
          description: "Especialização em reconhecimento de paternidade socioafetiva, baseada em vínculos afetivos e convivência familiar.",
          icon: "❤️"
        },
        {
          title: "Direitos Sucessórios",
          description: "Garantia de todos os direitos decorrentes da filiação: nome, alimentos, herança e benefícios previdenciários.",
          icon: "📜"
        },
        {
          title: "Ação Negatória",
          description: "Assessoria em ações para desconstituir paternidade registral quando não há vínculo biológico ou socioafetivo.",
          icon: "⚖️"
        },
        {
          title: "Multiparentalidade",
          description: "Orientação sobre reconhecimento de múltiplas paternidades (biológica e socioafetiva) conforme jurisprudência do STF.",
          icon: "👨‍👩‍👧‍👦"
        },
        {
          title: "Urgência e Celeridade",
          description: "Atuação em casos urgentes e acompanhamento célere dos processos para garantia rápida de direitos.",
          icon: "⚡"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta e Análise Inicial",
          description: "Avaliação da situação fática, análise de documentos existentes e orientação sobre as modalidades de ação mais adequadas ao caso."
        },
        {
          step: 2,
          title: "Coleta de Evidências",
          description: "Reunião de provas documentais, testemunhais e materiais que demonstrem a paternidade ou justifiquem sua investigação."
        },
        {
          step: 3,
          title: "Estratégia Processual",
          description: "Definição da estratégia mais adequada: investigação de paternidade, reconhecimento socioafetivo ou ação negatória."
        },
        {
          step: 4,
          title: "Ajuizamento da Ação",
          description: "Propositura da ação com pedidos de exame de DNA, alimentos provisionais e demais direitos decorrentes da filiação."
        },
        {
          step: 5,
          title: "Exame de DNA",
          description: "Acompanhamento da realização do exame de DNA e orientação sobre procedimentos técnicos e prazos."
        },
        {
          step: 6,
          title: "Instrução Processual",
          description: "Produção de provas complementares, oitiva de testemunhas e manifestação sobre laudo pericial genético."
        },
        {
          step: 7,
          title: "Execução de Direitos",
          description: "Efetivação dos direitos reconhecidos: alteração de registro civil, cobrança de alimentos e orientação sucessória."
        }
      ]}
      testimonials={[
        {
          name: "Maria J., Mãe",
          quote: "Após 15 anos consegui o reconhecimento da paternidade do meu filho. O DNA comprovou e hoje ele tem nome do pai e todos os direitos garantidos."
        },
        {
          name: "Carlos M., Pai Afetivo",
          quote: "Registrei a paternidade socioafetiva da minha enteada que criei desde bebê. Agora ela é minha filha também no papel, além do coração."
        },
        {
          name: "Ana P., Filha",
          quote: "Descobri minha verdadeira paternidade aos 25 anos. Consegui não só o reconhecimento, mas também direitos sucessórios que me pertenciam."
        },
        {
          name: "Roberto S., Contestante",
          quote: "Descobri que não era pai biológico após 10 anos. A ação negatória foi procedente, mas mantive o vínculo afetivo com a criança."
        },
        {
          name: "Família Silva",
          quote: "Conseguimos o reconhecimento da multiparentalidade. Nossa filha agora tem dois pais no registro: o biológico e o socioafetivo."
        }
      ]}
      faq={[
        {
          question: "Qual o prazo para propor ação de investigação de paternidade?",
          answer: "Não há prazo limite. A ação pode ser proposta a qualquer tempo pelo filho, durante toda sua vida. Se menor, pode ser representado pela mãe ou responsável legal."
        },
        {
          question: "O exame de DNA é obrigatório?",
          answer: "O suposto pai pode ser compelido judicialmente a fazer o exame. A recusa pode gerar presunção de paternidade. O exame é gratuito quando realizado em ação judicial."
        },
        {
          question: "O que é paternidade socioafetiva?",
          answer: "É aquela baseada no vínculo afetivo, cuidado, educação e convivência familiar, independentemente de vínculo biológico. Pode coexistir com a paternidade biológica (multiparentalidade)."
        },
        {
          question: "Posso contestar uma paternidade já registrada?",
          answer: "Sim, através de ação negatória de paternidade. Se não há vínculo biológico nem socioafetivo, é possível desconstituir o registro. O prazo varia conforme a situação."
        },
        {
          question: "Quais direitos decorrem do reconhecimento de paternidade?",
          answer: "Direito ao nome (sobrenome paterno), alimentos, herança, benefícios previdenciários, guarda/visitação e todos os direitos inerentes à filiação estabelecidos no Código Civil."
        },
        {
          question: "É possível ter dois pais no registro?",
          answer: "Sim, o STF reconhece a multiparentalidade. É possível ter registro da paternidade biológica e socioafetiva simultaneamente, com todos os direitos e deveres."
        },
        {
          question: "Como provar paternidade socioafetiva?",
          answer: "Através de documentos e testemunhas que comprovem: tratamento como filho, cuidados, educação, apresentação social como pai/filho, dependência econômica, convivência familiar."
        },
        {
          question: "O pai tem direito de visitar o filho reconhecido?",
          answer: "Sim, o reconhecimento da paternidade gera direitos e deveres mútuos. O pai tem direito à convivência, podendo pleitear regulamentação de visitas se necessário."
        }
      ]}
      relatedServices={[
        {
          name: "Guarda de Filhos",
          path: "/servicos/guarda-filhos"
        },
        {
          name: "Pensão Alimentícia",
          path: "/servicos/pensao-alimenticia"
        },
        {
          name: "Adoção",
          path: "/servicos/adocao"
        },
        {
          name: "Inventário e Partilha",
          path: "/servicos/inventario-partilha"
        }
      ]}
      mainAreaPath="/areas/familia"
    />
  );
};

export default InvestigacaoPaternidadeService;
