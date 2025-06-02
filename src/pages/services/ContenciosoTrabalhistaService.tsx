
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ContenciosoTrabalhistaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Contencioso Trabalhista"
      serviceDescription="Defesa especializada em processos trabalhistas, representando empregadores e empregados com estratégia processual eficiente e conhecimento aprofundado da legislação."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Defesa Estratégica",
          description: "Representação técnica especializada em todas as instâncias da Justiça do Trabalho."
        },
        {
          title: "Negociação de Acordos",
          description: "Busca por soluções consensuais que reduzam custos e tempo do processo."
        },
        {
          title: "Análise de Riscos",
          description: "Avaliação prévia dos riscos processuais para orientar a melhor estratégia de defesa."
        },
        {
          title: "Acompanhamento Integral",
          description: "Monitoramento completo do processo desde a inicial até eventual execução."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Demanda",
          description: "Estudo detalhado dos pedidos e avaliação das chances de êxito em cada tese."
        },
        {
          step: 2,
          title: "Estratégia de Defesa",
          description: "Elaboração de linha defensiva baseada em jurisprudência e legislação específica."
        },
        {
          step: 3,
          title: "Instrução Processual",
          description: "Produção de provas, acompanhamento de audiências e oitiva de testemunhas."
        },
        {
          step: 4,
          title: "Tentativa de Acordo",
          description: "Negociação de acordo judicial quando vantajoso para reduzir riscos e custos."
        },
        {
          step: 5,
          title: "Recursos e Execução",
          description: "Interposição de recursos cabíveis e acompanhamento da fase de execução."
        }
      ]}
      testimonials={[
        {
          name: "Empresa Industrial",
          quote: "A defesa técnica resultou na redução significativa dos valores cobrados, protegendo nosso patrimônio."
        },
        {
          name: "Rede de Varejo",
          quote: "Estratégia processual eficiente que nos permitiu negociar acordos vantajosos em diversos processos."
        },
        {
          name: "Empregado CLT",
          quote: "Consegui todos os direitos devidos com uma condução profissional do processo trabalhista."
        }
      ]}
      faq={[
        {
          question: "Qual o prazo para entrar com ação trabalhista?",
          answer: "2 anos após o término do contrato de trabalho para pleitear direitos referentes aos últimos 5 anos da relação de emprego."
        },
        {
          question: "É obrigatório tentar acordo na Justiça do Trabalho?",
          answer: "Sim, o juiz deve tentar conciliação em qualquer fase do processo, sendo uma característica marcante da Justiça do Trabalho."
        },
        {
          question: "Quais são os riscos de perder um processo trabalhista?",
          answer: "Além dos valores principais, podem ser devidos honorários advocatícios, custas processuais e correção monetária sobre os valores em atraso."
        },
        {
          question: "Posso recorrer de decisão trabalhista?",
          answer: "Sim, são cabíveis recursos como recurso ordinário ao TRT, recurso de revista ao TST e outros recursos específicos conforme o caso."
        }
      ]}
      relatedServices={[
        {
          name: "Assessoria Trabalhista",
          path: "/servicos/assessoria-trabalhista"
        },
        {
          name: "Rescisões Contratuais",
          path: "/servicos/rescisoes-contratuais"
        },
        {
          name: "Compliance Trabalhista",
          path: "/servicos/compliance-trabalhista"
        }
      ]}
      mainAreaPath="/areas/trabalho"
    />
  );
};

export default ContenciosoTrabalhistaService;
