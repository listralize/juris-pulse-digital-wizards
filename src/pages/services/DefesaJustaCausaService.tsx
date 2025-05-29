
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DefesaJustaCausaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Defesa Contra Justa Causa"
      serviceDescription="Sua reputação é seu maior ativo. Defendemos sua honra contra acusações infundadas ou desproporcionais de justa causa. Lutamos pela reversão da demissão, garantindo todos os seus direitos e, se houver abuso, a indenização por danos morais."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Reversão de Justa Causa Injusta",
          description: "Contestamos demissões por justa causa sem fundamento legal válido, transformando-as em demissão sem justa causa com todos os direitos devidos."
        },
        {
          title: "Proteção da Reputação Profissional",
          description: "Defendemos sua honra e imagem profissional contra acusações falsas, garantindo que injustiças não prejudiquem sua carreira futura."
        },
        {
          title: "Indenização por Danos Morais",
          description: "Quando a justa causa é abusiva ou discriminatória, buscamos indenização por danos morais para reparar o constrangimento e prejuízo sofrido."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Técnica da Motivação",
          description: "Examinamos detalhadamente os fatos alegados pela empresa, verificando se configuram motivo legal para justa causa conforme art. 482 da CLT."
        },
        {
          step: 2,
          title: "Investigação de Provas Contrárias",
          description: "Coletamos evidências que desmentem as acusações: testemunhas, documentos, histórico profissional e circunstâncias que demonstrem a inocência."
        },
        {
          step: 3,
          title: "Verificação da Proporcionalidade",
          description: "Analisamos se houve proporcionalidade entre a suposta falta e a penalidade aplicada, verificando gradação de penalidades e perdão tácito."
        },
        {
          step: 4,
          title: "Contestação Judicial Robusta",
          description: "Ajuizamos ação trabalhista com fundamentação técnica sólida, demonstrando a inexistência de motivo legal para justa causa."
        },
        {
          step: 5,
          title: "Execução Integral dos Direitos",
          description: "Após reverter a justa causa, garantimos o recebimento de todas as verbas rescisórias: aviso prévio, multa do FGTS, seguro-desemprego e indenizações."
        }
      ]}
      testimonials={[
        {
          name: "André Martins - Ex-Supervisor de Vendas",
          quote: "Fui demitido por justa causa sob acusação de desídia, mas meu histórico provava o contrário. A defesa reverteu a demissão e recebi R$ 45.000 em verbas rescisórias."
        },
        {
          name: "Lúcia Fernandes - Ex-Coordenadora Administrativa",
          quote: "Me acusaram de quebra de confiança sem qualquer prova. Não só revertemos a justa causa como ganhei indenização por danos morais pelo constrangimento."
        },
        {
          name: "Roberto Campos - Ex-Técnico Industrial",
          quote: "A empresa alegou abandono de emprego, mas eu estava de licença médica. A reversão da justa causa garantiu minha dignidade e meus direitos integrais."
        }
      ]}
      faq={[
        {
          question: "Quais são os motivos legais para demissão por justa causa?",
          answer: "O art. 482 da CLT lista as hipóteses: ato de improbidade, incontinência de conduta, negociação habitual, condenação criminal, desídia, embriaguez habitual, violação de segredo da empresa, ato de indisciplina, abandono de emprego, ato lesivo à honra, jogos de azar. Qualquer motivo fora dessa lista é ilegal."
        },
        {
          question: "Posso ser demitido por justa causa por um erro isolado?",
          answer: "Não. A justa causa exige gravidade proporcional e, na maioria dos casos, reincidência após advertência. Erros isolados ou pequenas faltas não justificam a penalidade máxima. Deve haver gradação: advertência, suspensão e só então demissão."
        },
        {
          question: "Como provar que a justa causa foi injusta?",
          answer: "Utilizamos seu histórico profissional, testemunhas, documentos que comprovem bom desempenho, ausência de advertências anteriores, circunstâncias atenuantes do caso e evidências que contradigam as acusações da empresa."
        },
        {
          question: "Se reverter a justa causa, tenho direito a quais verbas?",
          answer: "Todos os direitos de uma demissão sem justa causa: aviso prévio, multa de 40% do FGTS, seguro-desemprego, férias proporcionais, 13º proporcional, além de eventual indenização por danos morais se houve abuso na aplicação da penalidade."
        }
      ]}
      relatedServices={[
        {
          name: "Defesa do Trabalhador",
          path: "/servicos/defesa-trabalhador"
        },
        {
          name: "Assédio Moral e Sexual",
          path: "/servicos/assedio-moral-sexual"
        }
      ]}
      mainAreaPath="/trabalho"
    />
  );
};

export default DefesaJustaCausaService;
