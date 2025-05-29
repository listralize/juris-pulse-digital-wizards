
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const BeneficiosPrevidenciariosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Benefícios Previdenciários"
      serviceDescription="Assessoria completa para obtenção de aposentadorias, pensões, auxílios e outros benefícios previdenciários, garantindo seus direitos junto ao INSS e outros órgãos previdenciários."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Análise Especializada do Caso",
          description: "Avaliação detalhada do histórico contributivo e identificação da melhor estratégia para obtenção do benefício."
        },
        {
          title: "Maximização do Valor",
          description: "Orientação para obtenção do maior valor possível de benefício conforme sua situação específica."
        },
        {
          title: "Acompanhamento Completo",
          description: "Representação em todas as fases do processo, desde o requerimento administrativo até eventual ação judicial."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Documental",
          description: "Levantamento e análise de toda documentação previdenciária, incluindo CNIS, vínculos empregatícios e contribuições."
        },
        {
          step: 2,
          title: "Planejamento Estratégico",
          description: "Definição da melhor modalidade de aposentadoria ou benefício a ser requerido, considerando todas as variáveis."
        },
        {
          step: 3,
          title: "Requerimento Administrativo",
          description: "Protocolo do pedido junto ao INSS com toda documentação necessária e acompanhamento da análise."
        },
        {
          step: 4,
          title: "Recursos e Contestações",
          description: "Interposição de recursos em caso de indeferimento ou valor inferior ao devido, fundamentando tecnicamente a pretensão."
        },
        {
          step: 5,
          title: "Ação Judicial (se necessário)",
          description: "Ajuizamento de ação judicial quando esgotadas as vias administrativas, buscando a concessão do benefício na Justiça."
        }
      ]}
      testimonials={[
        {
          name: "Maria S., Aposentada",
          quote: "Consegui minha aposentadoria especial que havia sido negada pelo INSS. O acompanhamento jurídico foi fundamental para provar minha exposição a agentes nocivos."
        },
        {
          name: "João P., Beneficiário",
          quote: "Após anos tentando sozinho, finalmente obtive meu auxílio-doença com o valor correto e retroativo desde a data correta de início da incapacidade."
        },
        {
          name: "Ana R., Pensionista",
          quote: "A assessoria para obtenção da pensão por morte foi essencial. Recebi orientação completa e consegui o benefício sem complicações."
        }
      ]}
      faq={[
        {
          question: "Quais são os tipos de aposentadoria disponíveis?",
          answer: "Os principais tipos são: aposentadoria por idade (65 anos homens/62 anos mulheres), aposentadoria por tempo de contribuição (35 anos homens/30 anos mulheres), aposentadoria especial (para atividades insalubres/perigosas), aposentadoria por invalidez (incapacidade permanente) e aposentadoria da pessoa com deficiência. Cada modalidade tem regras específicas e pode haver regras de transição para quem já contribuía antes da reforma da previdência."
        },
        {
          question: "Como comprovar tempo de contribuição em atividade rural?",
          answer: "A comprovação pode ser feita através de: declaração do sindicato de trabalhadores rurais, contratos de arrendamento/parceria, notas fiscais de venda de produção rural, comprovantes de financiamento bancário para atividade rural, cadastro no INCRA, declarações de vizinhos (início de prova material), entre outros. É importante reunir o máximo de documentos possível para fortalecer a comprovação."
        },
        {
          question: "É possível aposentar por invalidez e depois voltar a trabalhar?",
          answer: "A aposentadoria por invalidez pressupõe incapacidade total e permanente para o trabalho. Se houver recuperação da capacidade laboral, o benefício deve ser cessado após perícia médica. Existe a possibilidade de reabilitação profissional pelo INSS. Em casos de recuperação parcial, pode haver conversão para auxílio-acidente. O retorno ao trabalho durante o recebimento de aposentadoria por invalidez pode levar ao cancelamento do benefício."
        }
      ]}
      relatedServices={[
        {
          name: "Planejamento Previdenciário",
          path: "/servicos/planejamento-previdenciario"
        },
        {
          name: "Revisão de Benefícios",
          path: "/servicos/revisao-beneficios"
        }
      ]}
      mainAreaPath="/previdenciario"
    />
  );
};

export default BeneficiosPrevidenciariosService;
