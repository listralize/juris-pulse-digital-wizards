
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DireitosGestanteService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Direitos da Gestante"
      serviceDescription="A maternidade é intocável. Garantimos sua estabilidade no emprego, da gravidez até cinco meses após o parto. Em caso de demissão irregular, exigimos reintegração ou indenização. Combatemos assédio e discriminação; protegemos sua dignidade e seu futuro profissional."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Garantia de Estabilidade Gestacional",
          description: "Protegemos seu emprego desde a confirmação da gravidez até 5 meses após o parto, independentemente de quando a empresa soube da gestação."
        },
        {
          title: "Reintegração ou Indenização Integral",
          description: "Em caso de demissão irregular, lutamos pela reintegração ao emprego ou, se impossível, pela indenização correspondente a todo período de estabilidade."
        },
        {
          title: "Combate à Discriminação e Assédio",
          description: "Atuamos contra práticas discriminatórias, pressão para pedido de demissão, assédio moral e qualquer tratamento prejudicial devido à maternidade."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Comprovação da Gestação e Estabilidade",
          description: "Reunimos exames, atestados médicos e documentos que comprovem a gravidez na data da demissão, estabelecendo o direito à estabilidade provisória."
        },
        {
          step: 2,
          title: "Análise da Demissão e Circunstâncias",
          description: "Investigamos as circunstâncias da demissão, verificando se houve discriminação, pressão ou qualquer irregularidade no processo demissional."
        },
        {
          step: 3,
          title: "Cálculo dos Direitos Devidos",
          description: "Elaboramos planilha com todos os valores: salários do período de estabilidade, 13º, férias, FGTS e eventual indenização por danos morais."
        },
        {
          step: 4,
          title: "Ação de Reintegração",
          description: "Ajuizamos ação buscando prioritariamente a reintegração ao emprego com pagamento dos salários do período de afastamento forçado."
        },
        {
          step: 5,
          title: "Execução e Acompanhamento",
          description: "Garantimos o cumprimento da decisão judicial e acompanhamos o retorno ao trabalho para evitar novas retaliações ou discriminações."
        }
      ]}
      testimonials={[
        {
          name: "Ana Paula Silva - Analista Contábil",
          quote: "Fui demitida grávida de 3 meses. Consegui a reintegração e ainda recebi indenização por danos morais. Minha filha nasceu com a tranquilidade de ter emprego garantido."
        },
        {
          name: "Fernanda Costa - Supervisora de Vendas",
          quote: "A empresa me pressionou para pedir demissão quando soube da gravidez. A ação garantiu minha estabilidade e uma indenização de R$ 50.000 por discriminação."
        },
        {
          name: "Juliana Santos - Coordenadora de RH",
          quote: "Mesmo sendo de RH, sofri discriminação por estar grávida. A defesa jurídica protegeu meus direitos e serviu de exemplo para outras gestantes da empresa."
        }
      ]}
      faq={[
        {
          question: "Até quando tenho estabilidade no emprego estando grávida?",
          answer: "A estabilidade vai desde a confirmação da gravidez até 5 meses após o parto, totalizando aproximadamente 14 meses de proteção. Esse período é independente de quando a empresa foi comunicada sobre a gestação."
        },
        {
          question: "Posso ser demitida por justa causa estando grávida?",
          answer: "A demissão por justa causa é possível, mas exige motivo grave e comprovado. A empresa deve demonstrar cabalmente a falta grave. Muitas vezes, tentam usar a gravidez como motivação disfarçada, o que caracteriza discriminação."
        },
        {
          question: "E se eu estava em contrato de experiência?",
          answer: "Mesmo em contrato de experiência, a gestante tem direito à estabilidade. A gravidez suspende o término natural do contrato de experiência, garantindo estabilidade até 5 meses após o parto."
        },
        {
          question: "Tenho direito se engravidei durante o aviso prévio?",
          answer: "Sim! Se a gravidez ocorreu durante o cumprimento do aviso prévio, trabalhado ou indenizado, você tem direito à estabilidade. A demissão deve ser anulada e a estabilidade garantida."
        }
      ]}
      relatedServices={[
        {
          name: "Assédio Moral e Sexual",
          path: "/servicos/assedio-moral-sexual"
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

export default DireitosGestanteService;
