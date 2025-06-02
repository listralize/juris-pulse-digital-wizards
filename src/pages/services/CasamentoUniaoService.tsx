
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const CasamentoUniaoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Casamento e União Estável"
      serviceDescription="Assessoria jurídica completa em questões matrimoniais, desde a celebração até o reconhecimento de união estável, incluindo pactos antenupciais e conversão de união em casamento."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Pacto Antenupcial Personalizado",
          description: "Elaboração de pactos antenupciais sob medida para proteger patrimônio individual, definir regime de bens e estabelecer acordos específicos para o casal.",
          icon: "📜"
        },
        {
          title: "Reconhecimento de União Estável",
          description: "Assessoria completa para reconhecimento judicial ou extrajudicial de união estável, com todos os efeitos patrimoniais e previdenciários decorrentes.",
          icon: "💑"
        },
        {
          title: "Conversão União em Casamento",
          description: "Procedimento simplificado para conversão de união estável em casamento civil, mantendo a data de início da união para todos os efeitos legais.",
          icon: "💒"
        },
        {
          title: "Regimes de Bens Especializado",
          description: "Orientação técnica sobre todos os regimes: comunhão parcial, total, separação total, participação final nos aquestos, com análise das implicações de cada um.",
          icon: "⚖️"
        },
        {
          title: "Proteção Patrimonial Estratégica",
          description: "Estratégias jurídicas para proteção do patrimônio empresarial e familiar, incluindo holdings familiares e blindagem patrimonial lícita.",
          icon: "🛡️"
        },
        {
          title: "Questões Previdenciárias e Sucessórias",
          description: "Orientação sobre direitos previdenciários do cônjuge/companheiro e planejamento sucessório para garantir proteção da família constituída.",
          icon: "📋"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta e Análise Patrimonial",
          description: "Avaliação detalhada da situação patrimonial de ambos os cônjuges, objetivos do casal e identificação da melhor estratégia jurídica para o caso."
        },
        {
          step: 2,
          title: "Escolha do Regime de Bens",
          description: "Orientação técnica sobre as vantagens e desvantagens de cada regime, considerando patrimônio atual, atividade profissional e planejamento futuro."
        },
        {
          step: 3,
          title: "Elaboração de Documentos",
          description: "Redação de pacto antenupcial, contrato de união estável ou outros documentos necessários, com cláusulas específicas adaptadas ao casal."
        },
        {
          step: 4,
          title: "Procedimentos Cartoriais",
          description: "Acompanhamento de todos os procedimentos em cartório: habilitação para casamento, registro de união estável, averbações necessárias."
        },
        {
          step: 5,
          title: "Reconhecimento Judicial (se necessário)",
          description: "Condução de ação judicial para reconhecimento de união estável quando há resistência ou necessidade de definição de efeitos patrimoniais."
        },
        {
          step: 6,
          title: "Regularização Documental",
          description: "Providências para atualização de documentos pessoais, inclusão de dependentes em planos de saúde e previdência privada."
        },
        {
          step: 7,
          title: "Orientação Pós-Matrimonial",
          description: "Acompanhamento sobre direitos e deveres decorrentes do casamento/união, orientação para questões supervenientes e atualizações necessárias."
        }
      ]}
      testimonials={[
        {
          name: "Marina e Paulo, Empresários",
          quote: "O pacto antenupcial protegeu nossos negócios familiares e definiu claramente como seria a gestão do patrimônio comum. Foi fundamental para nossa tranquilidade."
        },
        {
          name: "Ana Carolina, Médica",
          quote: "O reconhecimento da nossa união estável de 8 anos garantiu todos os direitos previdenciários e sucessórios que tínhamos perdido por não ter formalizado antes."
        },
        {
          name: "Roberto e Juliana",
          quote: "A conversão da união estável em casamento foi muito simples e rápida. Mantivemos a data original da união para todos os efeitos, que era nosso objetivo."
        },
        {
          name: "Carlos, Advogado",
          quote: "A orientação sobre regime de bens foi esclarecedora. Escolhemos a participação final nos aquestos, que se adequou perfeitamente ao nosso perfil patrimonial."
        },
        {
          name: "Fernanda e Lucas, Jovem Casal",
          quote: "Mesmo sendo jovens e com pouco patrimônio, a orientação jurídica foi importante para entendermos nossos direitos e planejarmos o futuro com segurança."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença prática entre casamento e união estável?",
          answer: "Ambos geram os mesmos direitos patrimoniais e sucessórios. A principal diferença está na formalização: casamento exige celebração civil, união estável pode ser reconhecida pelos fatos. Para alguns procedimentos (adoção, visto internacional), o casamento ainda é preferencial."
        },
        {
          question: "É obrigatório fazer pacto antenupcial?",
          answer: "Não é obrigatório. Sem pacto, aplica-se automaticamente o regime da comunhão parcial de bens. O pacto só é necessário se os noivos quiserem escolher outro regime ou estabelecer cláusulas específicas."
        },
        {
          question: "Posso mudar o regime de bens após o casamento?",
          answer: "Sim, desde 2002 é possível alterar o regime através de procedimento judicial, desde que comprovada a inexistência de prejuízo a terceiros e que ambos os cônjuges concordem com a mudança."
        },
        {
          question: "Como comprovar união estável para fins legais?",
          answer: "Através de documentos que demonstrem convivência pública, contínua e duradoura: contas conjuntas, declaração de dependente no IR, testemunhas, fotos, correspondências. O reconhecimento pode ser judicial ou por escritura pública."
        },
        {
          question: "Quais os requisitos para o casamento civil?",
          answer: "Ambos devem ser maiores de 16 anos (entre 16-18 com autorização dos pais), não ter impedimentos legais, apresentar documentação completa e cumprir o processo de habilitação no cartório com antecedência mínima."
        },
        {
          question: "União estável tem os mesmos direitos previdenciários?",
          answer: "Sim, companheiro(a) tem direito a pensão por morte, auxílio-reclusão e outros benefícios previdenciários nas mesmas condições do cônjuge, desde que comprovada a dependência econômica e união."
        },
        {
          question: "É possível casamento homoafetivo no Brasil?",
          answer: "Sim, desde 2013 o casamento entre pessoas do mesmo sexo é plenamente reconhecido no Brasil, com todos os direitos iguais ao casamento heterossexual, incluindo adoção, herança e benefícios previdenciários."
        },
        {
          question: "Como funciona o regime de participação final nos aquestos?",
          answer: "Durante o casamento, cada cônjuge administra livremente seus bens. Na dissolução, há direito à metade do que o outro cônjuge adquiriu onerosamente durante a união, sendo uma modalidade híbrida entre separação e comunhão."
        }
      ]}
      relatedServices={[
        {
          name: "Divórcio e Separação",
          path: "/servicos/divorcio"
        },
        {
          name: "Testamentos e Sucessões",
          path: "/servicos/testamentos-sucessoes"
        },
        {
          name: "Inventário e Partilha",
          path: "/servicos/inventario-partilha"
        },
        {
          name: "Planejamento Patrimonial",
          path: "/servicos/planejamento-patrimonial"
        }
      ]}
      mainAreaPath="/areas/familia"
    />
  );
};

export default CasamentoUniaoService;
