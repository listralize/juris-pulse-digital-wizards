
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const InvestigacaoPaternidadeService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Investigação de Paternidade"
      serviceDescription="Assessoria especializada em ações de investigação e negatória de paternidade, reconhecimento voluntário e todas as questões relacionadas à filiação e direitos decorrentes."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Investigação de Paternidade Completa",
          description: "Condução de ações judiciais para reconhecimento de paternidade com exame de DNA, estabelecendo vínculo jurídico e todos os direitos decorrentes da filiação.",
          icon: "🔍"
        },
        {
          title: "Reconhecimento Voluntário Orientado",
          description: "Assessoria em procedimentos extrajudiciais de reconhecimento de paternidade em cartório, mais ágil e econômico quando há concordância do suposto pai.",
          icon: "✍️"
        },
        {
          title: "Negatória de Paternidade Técnica",
          description: "Defesa em ações que questionam paternidade já estabelecida, utilizando exames genéticos e argumentação jurídica para desconstituir registro indevido.",
          icon: "⚖️"
        },
        {
          title: "Direitos Patrimoniais e Sucessórios",
          description: "Garantia de todos os direitos decorrentes do reconhecimento: pensão alimentícia, herança, inclusão em plano de saúde, uso do nome paterno.",
          icon: "💰"
        },
        {
          title: "Paternidade Post Mortem",
          description: "Investigação de paternidade após morte do suposto pai, incluindo exumação para coleta de material genético e reconhecimento de direitos sucessórios.",
          icon: "⚰️"
        },
        {
          title: "Paternidade Socioafetiva",
          description: "Reconhecimento judicial da paternidade baseada em vínculo afetivo, independente de laço biológico, quando há convivência familiar consolidada.",
          icon: "❤️"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Preliminar da Situação",
          description: "Avaliação dos indícios de paternidade, documentos disponíveis, possibilidades probatórias e definição da estratégia mais adequada para o caso específico."
        },
        {
          step: 2,
          title: "Coleta de Provas Iniciais",
          description: "Reunião de documentos, fotografias, testemunhas, registros médicos, correspondências e outras evidências que sustentem a alegação de paternidade."
        },
        {
          step: 3,
          title: "Propositura da Ação Judicial",
          description: "Ajuizamento fundamentado da ação de investigação de paternidade com pedido de exame de DNA, antecipação de alimentos e demais direitos."
        },
        {
          step: 4,
          title: "Citação e Resposta do Réu",
          description: "Citação do suposto pai, acompanhamento da defesa apresentada, tréplica e preparação para fase probatória do processo."
        },
        {
          step: 5,
          title: "Realização do Exame de DNA",
          description: "Determinação judicial e acompanhamento da coleta de material genético, análise laboratorial e apresentação do resultado pericial definitivo."
        },
        {
          step: 6,
          title: "Audiência de Instrução e Julgamento",
          description: "Oitiva de testemunhas, sustentação oral, análise das provas produzidas e acompanhamento da decisão judicial sobre o reconhecimento da paternidade."
        },
        {
          step: 7,
          title: "Execução dos Direitos Reconhecidos",
          description: "Retificação do registro civil, cobrança de alimentos retroativos, inclusão em herança e implementação de todos os direitos do filho reconhecido."
        }
      ]}
      testimonials={[
        {
          name: "Marina S., Mãe",
          quote: "Após 15 anos, consegui o reconhecimento da paternidade da minha filha. O DNA comprovou e ela finalmente tem todos os direitos que sempre mereceu, inclusive a pensão retroativa."
        },
        {
          name: "João Paulo, Pai Biológico",
          quote: "Descobri que era pai através de ação judicial. Apesar do susto inicial, hoje tenho uma filha maravilhosa e assumo com alegria minhas responsabilidades paternas."
        },
        {
          name: "Carlos R., Contestação",
          quote: "Fui registrado como pai sem ser. A ação negatória de paternidade com DNA me livrou de uma responsabilidade que não era minha, após anos de pagamento indevido."
        },
        {
          name: "Ana Clara, Filha Adulta",
          quote: "Mesmo adulta, consegui investigar minha paternidade. O reconhecimento me trouxe identidade, família paterna e direitos sucessórios que nem imaginava ter."
        },
        {
          name: "Família Lima, Post Mortem",
          quote: "Investigamos a paternidade após a morte do suposto pai. Foi complexo, mas conseguimos comprovação e nossa filha teve direitos sucessórios reconhecidos."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre investigação e negatória de paternidade?",
          answer: "Investigação busca estabelecer paternidade não reconhecida. Negatória visa desconstituir paternidade já registrada quando há dúvidas sobre a filiação biológica. Ambas utilizam exame de DNA como prova principal."
        },
        {
          question: "É possível investigar paternidade após a morte do suposto pai?",
          answer: "Sim, através de ação post mortem contra os herdeiros. Pode ser necessário exumação para coleta de material genético ou exame em parentes próximos (avós, irmãos). Os direitos sucessórios são preservados."
        },
        {
          question: "Existe prazo para investigar paternidade?",
          answer: "Não há prazo para investigação de paternidade - é direito imprescritível. Pode ser exercido a qualquer tempo pelo filho, durante toda sua vida, ou por sua mãe enquanto ele for menor."
        },
        {
          question: "O suposto pai pode se recusar a fazer DNA?",
          answer: "O suposto pai pode se recusar, mas a recusa é interpretada como indício de paternidade. O juiz pode presumir a paternidade pela recusa injustificada, especialmente quando há outros indícios."
        },
        {
          question: "Quais direitos decorrem do reconhecimento de paternidade?",
          answer: "Direito ao nome paterno, pensão alimentícia (inclusive retroativa), herança, inclusão em plano de saúde, previdência privada, convivência familiar e todos os direitos de filho legítimo."
        },
        {
          question: "Como funciona a paternidade socioafetiva?",
          answer: "É baseada no vínculo afetivo, não biológico. Quando há convivência familiar duradoura, tratamento como filho e reconhecimento público da relação paterno-filial, pode ser judicialmente declarada mesmo sem laço sanguíneo."
        },
        {
          question: "Posso ter dois pais registrados (biológico e socioafetivo)?",
          answer: "Sim, desde 2016 o STF reconhece a multiparentalidade. É possível registro de paternidade biológica e socioafetiva simultaneamente, com todos os direitos e deveres decorrentes de ambas as filiações."
        },
        {
          question: "Quanto custa um exame de DNA judicial?",
          answer: "O custo varia, mas geralmente fica entre R$ 800 a R$ 1.500. Se o requerente for beneficiário da justiça gratuita, o Estado custeia o exame. Em caso de resultado positivo, o réu pode ser condenado a ressarcir."
        }
      ]}
      relatedServices={[
        {
          name: "Pensão Alimentícia",
          path: "/servicos/pensao-alimenticia"
        },
        {
          name: "Guarda de Filhos",
          path: "/servicos/guarda-filhos"
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
