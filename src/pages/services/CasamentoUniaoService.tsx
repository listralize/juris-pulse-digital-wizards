
import React, { useEffect } from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const CasamentoUniaoService = () => {
  // Add auto-scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ServiceLandingLayout
      serviceArea="Direito da Família"
      serviceName="Casamento e União Estável"
      serviceDescription="Assessoria jurídica completa para formalização e regularização de casamentos e uniões estáveis, incluindo contratos e acordos pré-nupciais."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Segurança Jurídica",
          description: "Contratos matrimoniais e acordos pré-nupciais que garantem proteção patrimonial e segurança jurídica para o casal."
        },
        {
          title: "Reconhecimento de Direitos",
          description: "Regularização de uniões estáveis com reconhecimento legal e defesa de todos os direitos previstos em lei."
        },
        {
          title: "Proteção Patrimonial",
          description: "Orientação especializada sobre regimes de bens e estratégias para proteção do patrimônio individual e familiar."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta Inicial Gratuita",
          description: "Realizamos uma análise preliminar do seu caso, entendemos suas necessidades e explicamos as opções disponíveis. Esta primeira consulta é sem compromisso e gratuita."
        },
        {
          step: 2,
          title: "Planejamento Estratégico",
          description: "Desenvolvemos uma estratégia personalizada para seu caso, considerando aspectos como patrimônio, filhos e expectativas futuras."
        },
        {
          step: 3,
          title: "Documentação e Preparação",
          description: "Preparamos toda a documentação necessária para formalização do casamento ou reconhecimento da união estável."
        },
        {
          step: 4,
          title: "Registro e Formalização",
          description: "Acompanhamos todo o processo de registro e formalização junto aos órgãos competentes."
        },
        {
          step: 5,
          title: "Acompanhamento Contínuo",
          description: "Oferecemos acompanhamento jurídico contínuo para eventuais questões que surjam após a formalização."
        }
      ]}
      testimonials={[
        {
          name: "Mariana e João",
          quote: "Nunca imaginamos que um contrato pré-nupcial poderia ser tão importante para nossa tranquilidade. Gratidão pela orientação clara e pelo suporte em cada etapa."
        },
        {
          name: "Carlos P.",
          quote: "Após 15 anos de união estável, o reconhecimento legal trouxe segurança jurídica para nossa família. O processo foi muito mais simples do que imaginávamos."
        },
        {
          name: "Amanda T.",
          quote: "A assessoria na elaboração do pacto antenupcial foi fundamental para proteger o patrimônio da empresa familiar."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre casamento e união estável?",
          answer: "O casamento é um ato formal, celebrado por um juiz ou oficial de registro civil, enquanto a união estável é caracterizada pela convivência pública, contínua e duradoura com objetivo de constituir família, sem necessidade de formalização inicial. Ambos geram efeitos jurídicos similares, mas existem diferenças quanto a alguns direitos e à forma de comprovação."
        },
        {
          question: "Preciso de um contrato para formalizar minha união estável?",
          answer: "Embora a união estável seja reconhecida mesmo sem contrato formal, a elaboração de um documento é altamente recomendável para definir questões patrimoniais, evitar conflitos futuros e facilitar o reconhecimento de direitos."
        },
        {
          question: "Qual o melhor regime de bens para meu casamento?",
          answer: "Não existe um regime 'melhor', pois isso depende da situação particular do casal. O regime de bens ideal varia conforme a situação patrimonial, idade, profissão e objetivos do casal. Nossa equipe analisa cada caso individualmente para recomendar a opção mais adequada."
        }
      ]}
      relatedServices={[
        {
          name: "Divórcio e Separação",
          path: "/servicos/divorcio-separacao"
        },
        {
          name: "Inventário e Partilha",
          path: "/servicos/inventario-partilha"
        }
      ]}
      mainAreaPath="/familia"
    />
  );
};

export default CasamentoUniaoService;
