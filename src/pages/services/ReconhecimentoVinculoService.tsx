
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ReconhecimentoVinculoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Reconhecimento de Vínculo Empregatício"
      serviceDescription="Trabalho informal não anula direitos. Se você atua como PJ, mas sua relação é de emprego, nós a regularizamos. Buscamos o reconhecimento do vínculo e de todos os direitos retroativos, transformando informalidade em segurança jurídica."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Desmascaramento da Pejotização",
          description: "Identificamos e combatemos a contratação fraudulenta de PJ quando na realidade existe vínculo empregatício, garantindo todos os direitos trabalhistas retroativos."
        },
        {
          title: "Recuperação de Direitos Sonegados",
          description: "Após reconhecer o vínculo, buscamos todos os direitos: carteira assinada retroativa, FGTS, 13º salário, férias, verbas rescisórias e benefícios previdenciários."
        },
        {
          title: "Proteção Contra Fraudes Contratuais",
          description: "Atuamos contra contratos de prestação de serviço, cooperativas falsas e outras modalidades que mascaram a verdadeira relação de emprego."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Relação de Trabalho",
          description: "Examinamos todos os elementos da relação: subordinação, pessoalidade, habitualidade, onerosidade e exclusividade para caracterizar o vínculo empregatício."
        },
        {
          step: 2,
          title: "Coleta de Provas Robustas",
          description: "Reunimos evidências como horários fixos, supervisão direta, uso de equipamentos da empresa, integração à estrutura organizacional e dependência econômica."
        },
        {
          step: 3,
          title: "Cálculo de Direitos Retroativos",
          description: "Elaboramos planilha completa com todos os direitos devidos desde o início da prestação de serviços: salários, 13º, férias, FGTS com multa e verbas rescisórias."
        },
        {
          step: 4,
          title: "Ação de Reconhecimento de Vínculo",
          description: "Ajuizamos ação trabalhista específica para declarar o vínculo empregatício e condenar ao pagamento de todas as verbas trabalhistas devidas."
        },
        {
          step: 5,
          title: "Regularização Previdenciária",
          description: "Garantimos a anotação na carteira de trabalho e a regularização junto ao INSS para contagem de tempo de contribuição e direitos previdenciários."
        }
      ]}
      testimonials={[
        {
          name: "Felipe Rodrigues - Ex-'Consultor' de TI",
          quote: "Trabalhei 3 anos como PJ, mas tinha horário fixo, recebia ordens e usava equipamentos da empresa. Consegui o reconhecimento do vínculo e recebi mais de R$ 60.000 em direitos."
        },
        {
          name: "Carla Mendes - Ex-'Prestadora' de Serviços",
          quote: "Meu contrato dizia prestação de serviços, mas eu trabalhava exclusivamente para uma empresa. O reconhecimento do vínculo garantiu minha aposentadoria e FGTS retroativo."
        },
        {
          name: "José Silva - Ex-'Cooperado'",
          quote: "A cooperativa era uma farsa para esconder vínculo empregatício. Trabalhava com subordinação direta há 5 anos. Recebi todos os direitos como se fosse CLT desde o início."
        }
      ]}
      faq={[
        {
          question: "Como saber se minha contratação PJ é irregular?",
          answer: "Se você tem horário fixo, recebe ordens diretas, trabalha exclusivamente para uma empresa, usa equipamentos dela e está integrado à organização, provavelmente existe vínculo empregatício mascarado. A forma de contratação não afasta a realidade da prestação de serviços."
        },
        {
          question: "Quanto tempo tenho para pedir reconhecimento de vínculo?",
          answer: "O prazo é de 2 anos após o fim da prestação de serviços para direitos trabalhistas, mas não há prazo para reconhecimento do vínculo em si. Para direitos previdenciários, é recomendável agir o quanto antes."
        },
        {
          question: "Posso pedir reconhecimento de vínculo ainda trabalhando como PJ?",
          answer: "Sim, é possível, mas requer estratégia cuidadosa. Muitas vezes é mais seguro aguardar o fim da prestação de serviços para evitar retaliações, mas cada caso deve ser analisado individualmente considerando os riscos e benefícios."
        },
        {
          question: "Quais direitos terei reconhecidos além do salário?",
          answer: "Todos os direitos trabalhistas: carteira assinada retroativa, 13º salário proporcional de cada ano, férias vencidas e proporcionais com 1/3, FGTS com multa de 40%, horas extras se houver, verbas rescisórias, além da regularização previdenciária para aposentadoria."
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

export default ReconhecimentoVinculoService;
