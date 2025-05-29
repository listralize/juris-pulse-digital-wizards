
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const HorasExtrasService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Horas Extras e Intervalos"
      serviceDescription="Seu tempo vale ouro. Exigimos o reconhecimento e pagamento de cada hora extra não remunerada e de cada intervalo suprimido. Monitoramos registros, desmascaramos fraudes e garantimos que sua jornada seja compensada conforme a lei."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Recuperação de Horas Extras Não Pagas",
          description: "Analisamos registros de ponto, câmeras e sistemas para identificar horas extras trabalhadas e não remuneradas, garantindo pagamento retroativo com adicional de 50% ou 100%."
        },
        {
          title: "Cobrança de Intervalos Suprimidos",
          description: "Quando o intervalo para alimentação é suprimido ou reduzido irregularmente, exigimos o pagamento da hora completa como extra, conforme determina a legislação."
        },
        {
          title: "Combate à Fraudes em Registro de Ponto",
          description: "Identificamos e combatemos práticas fraudulentas como pré-assinalação de cartões, pressão para não registrar horas extras e sistemas manipulados de controle de jornada."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise dos Registros de Jornada",
          description: "Examinamos cartões de ponto, sistemas eletrônicos, e-mails, mensagens e outros indícios que comprovem a jornada real trabalhada versus a registrada."
        },
        {
          step: 2,
          title: "Coleta de Provas Complementares",
          description: "Reunimos testemunhas, documentos internos, rotinas de trabalho e qualquer evidência que demonstre a extrapolação da jornada normal de trabalho."
        },
        {
          step: 3,
          title: "Cálculo Técnico Especializado",
          description: "Elaboramos planilha detalhada com todas as horas extras devidas, reflexos em 13º salário, férias, FGTS e demais verbas trabalhistas."
        },
        {
          step: 4,
          title: "Negociação Estratégica",
          description: "Buscamos acordo extrajudicial quando vantajoso, apresentando fundamentação robusta para pressionar por pagamento voluntário."
        },
        {
          step: 5,
          title: "Ação Judicial Implacável",
          description: "Quando necessário, ajuizamos reclamação trabalhista com pedidos claros e provas consistentes para garantir o reconhecimento judicial."
        }
      ]}
      testimonials={[
        {
          name: "Marina Santos - Ex-Analista Financeira",
          quote: "Recuperei mais de R$ 35.000 em horas extras que nunca foram pagas. O escritório provou que eu trabalhava rotineiramente até tarde e nos fins de semana."
        },
        {
          name: "Ricardo Oliveira - Ex-Vendedor",
          quote: "Meu cartão de ponto era pré-assinalado pelo supervisor. A equipe desmascarou essa fraude e consegui receber duas anos de horas extras retroativas."
        },
        {
          name: "Amanda Costa - Ex-Enfermeira",
          quote: "Trabalhava plantões duplos sem intervalo adequado. Além das horas extras, recebi indenização pelos intervalos suprimidos de todo o período."
        }
      ]}
      faq={[
        {
          question: "Como provar horas extras se meu cartão de ponto não registra?",
          answer: "Utilizamos diversas formas de prova: e-mails enviados fora do horário, mensagens de trabalho, testemunhas, rotinas de trabalho, localização do celular, movimentação de sistemas internos. A ausência de registro muitas vezes é prova da própria irregularidade."
        },
        {
          question: "Tenho direito a horas extras mesmo sendo CLT com salário fixo?",
          answer: "Sim! Salvo algumas exceções (cargos de confiança específicos), todo empregado CLT tem direito ao pagamento de horas extras quando trabalha além da jornada normal. Salário fixo não exclui esse direito."
        },
        {
          question: "Qual o valor das horas extras que tenho direito?",
          answer: "Horas extras têm adicional mínimo de 50% sobre a hora normal. Aos domingos e feriados, o adicional é de 100%. Além disso, as horas extras refletem em 13º salário, férias + 1/3, FGTS e outras verbas proporcionais."
        },
        {
          question: "Posso ser demitido por cobrar horas extras?",
          answer: "A cobrança de direitos trabalhistas é legítima e não pode gerar retaliação. Se isso ocorrer, caracteriza demissão discriminatória, gerando direito à reintegração ou indenização dobrada, além de danos morais."
        }
      ]}
      relatedServices={[
        {
          name: "Defesa do Trabalhador",
          path: "/servicos/defesa-trabalhador"
        },
        {
          name: "Verbas Rescisórias",
          path: "/servicos/verbas-rescissorias"
        }
      ]}
      mainAreaPath="/trabalho"
    />
  );
};

export default HorasExtrasService;
