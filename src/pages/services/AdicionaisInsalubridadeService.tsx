
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AdicionaisInsalubridadeService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Adicionais e Insalubridade"
      serviceDescription="Riscos devem ser compensados. Exigimos o pagamento retroativo de adicionais por insalubridade, periculosidade e trabalho noturno. Nossas perícias e provas são irrefutáveis, garantindo que você receba cada centavo devido por atuar em condições especiais."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Recuperação de Adicionais Retroativos",
          description: "Cobramos adicional de insalubridade (10%, 20% ou 40%), periculosidade (30%) e noturno (20%) de todo período trabalhado em condições especiais, com reflexos em todas as verbas."
        },
        {
          title: "Perícia Técnica Especializada",
          description: "Contratamos engenheiros de segurança e médicos do trabalho para comprovar tecnicamente a exposição aos agentes nocivos e o direito aos adicionais."
        },
        {
          title: "Combate à Neutralização Irregular",
          description: "Contestamos neutralizações inadequadas de insalubridade através de EPIs ineficazes ou medidas de proteção coletiva insuficientes."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise das Condições de Trabalho",
          description: "Avaliamos o ambiente laboral, agentes nocivos presentes, equipamentos de proteção fornecidos e medidas de segurança adotadas pela empresa."
        },
        {
          step: 2,
          title: "Perícia Técnica Independente",
          description: "Contratamos profissionais especializados para realizar perícia técnica comprovando exposição a agentes insalubres, perigosos ou trabalho noturno."
        },
        {
          step: 3,
          title: "Cálculo de Adicionais Devidos",
          description: "Elaboramos planilha com todos os adicionais devidos, reflexos em 13º salário, férias, FGTS, horas extras e demais verbas proporcionais."
        },
        {
          step: 4,
          title: "Contestação de Laudos Empresariais",
          description: "Questionamos PPRAs e PCMSOs inadequados, demonstrando que não refletem a realidade das condições de trabalho enfrentadas."
        },
        {
          step: 5,
          title: "Ação Judicial com Perícia",
          description: "Ajuizamos ação trabalhista requerendo perícia judicial para comprovar definitivamente o direito aos adicionais e sua quantificação."
        }
      ]}
      testimonials={[
        {
          name: "Marcos Pereira - Ex-Soldador",
          quote: "Trabalhei 10 anos exposto a fumos metálicos sem adicional de insalubridade. A perícia comprovou grau máximo e recebi R$ 120.000 retroativo."
        },
        {
          name: "Sandra Lima - Ex-Enfermeira",
          quote: "Nunca recebi adicional por trabalho noturno de forma correta. A ação garantiu 5 anos de diferenças com reflexos em todas as verbas."
        },
        {
          name: "Carlos Santos - Ex-Eletrista",
          quote: "A empresa alegava que o EPI neutralizava a periculosidade, mas a perícia provou o contrário. Recebi 8 anos de adicional retroativo."
        }
      ]}
      faq={[
        {
          question: "Como saber se tenho direito a adicional de insalubridade?",
          answer: "O adicional é devido quando há exposição habitual a agentes nocivos à saúde (ruído, calor, produtos químicos, radiação, etc.) acima dos limites de tolerância estabelecidos pelo Ministério do Trabalho, conforme NR-15."
        },
        {
          question: "O EPI neutraliza completamente o adicional de insalubridade?",
          answer: "Nem sempre. O EPI deve ser adequado, certificado, eficaz na neutralização do agente nocivo e de uso obrigatório e efetivo. Muitas vezes a empresa fornece EPI inadequado ou as condições de trabalho tornam impossível o uso efetivo."
        },
        {
          question: "Tenho direito a adicional noturno trabalhando durante o dia?",
          answer: "Não. O adicional noturno (20%) é devido apenas para trabalho realizado entre 22h e 5h (urbano) ou 21h e 5h (rural). Cada hora noturna tem duração reduzida (52 minutos e 30 segundos)."
        },
        {
          question: "Posso acumular adicional de insalubridade e periculosidade?",
          answer: "Não, os adicionais não se acumulam. O trabalhador deve optar pelo mais vantajoso. Porém, é possível receber um adicional e outros benefícios como aposentadoria especial pelos agentes nocivos."
        }
      ]}
      relatedServices={[
        {
          name: "Acidentes e Doenças Ocupacionais",
          path: "/servicos/acidentes-doencas"
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

export default AdicionaisInsalubridadeService;
