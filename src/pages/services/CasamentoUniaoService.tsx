
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const CasamentoUniaoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Casamento e União Estável"
      serviceDescription="Proteja seu amor e seu patrimônio desde o início. Oferecemos assessoria jurídica completa para formalização de relacionamentos, desde pactos antenupciais estratégicos até reconhecimento de união estável e conversões."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Pactos Antenupciais Inteligentes",
          description: "Elaboramos pactos personalizados que protegem patrimônio individual, definem regimes de bens adequados ao seu perfil e estabelecem acordos específicos para sua realidade familiar e empresarial.",
          icon: "📜"
        },
        {
          title: "Proteção Patrimonial Estratégica",
          description: "Desenvolvemos estratégias jurídicas para blindagem lícita do patrimônio, proteção de empresa familiar, participações societárias e bens adquiridos antes do casamento.",
          icon: "🛡️"
        },
        {
          title: "Reconhecimento de União Estável",
          description: "Formalizamos união estável através de procedimento judicial ou extrajudicial, garantindo todos os direitos patrimoniais, previdenciários e sucessórios do relacionamento consolidado.",
          icon: "💑"
        },
        {
          title: "Conversão Simplificada",
          description: "Convertemos união estável em casamento civil mantendo data original para todos os efeitos legais, preservando direitos adquiridos e simplificando procedimentos futuros.",
          icon: "💒"
        },
        {
          title: "Orientação sobre Regimes de Bens",
          description: "Analisamos seu perfil patrimonial e oferecemos orientação técnica sobre todos os regimes: comunhão parcial, total, separação e participação final nos aquestos, com análise detalhada de cada um.",
          icon: "⚖️"
        },
        {
          title: "Planejamento Sucessório Conjugal",
          description: "Integramos questões matrimoniais com planejamento sucessório, testamentos, doações e estruturas familiares para proteção integral do patrimônio e da família constituída.",
          icon: "🏡"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Patrimonial e Familiar Detalhada",
          description: "Avaliamos situação patrimonial atual de ambos os nubentes, atividades profissionais, expectativas futuras, existência de filhos anteriores e objetivos específicos do casal para definir melhor estratégia."
        },
        {
          step: 2,
          title: "Orientação Técnica sobre Regimes",
          description: "Explicamos detalhadamente vantagens e desvantagens de cada regime de bens, considerando patrimônio atual, atividade empresarial, planejamento sucessório e possíveis cenários futuros."
        },
        {
          step: 3,
          title: "Elaboração de Pacto Personalizado",
          description: "Redigimos pacto antenupcial sob medida com cláusulas específicas para proteção patrimonial, administração de bens, participação em empresa familiar e questões particulares do casal."
        },
        {
          step: 4,
          title: "Procedimentos Cartoriais Completos",
          description: "Acompanhamos habilitação para casamento, procedimentos de reconhecimento de união estável, registro de pactos antenupciais e todas as formalizações necessárias em cartório."
        },
        {
          step: 5,
          title: "Reconhecimento Judicial quando Necessário",
          description: "Conduzimos ações judiciais para reconhecimento de união estável quando há resistência de terceiros ou necessidade de definição específica de efeitos patrimoniais e temporais."
        },
        {
          step: 6,
          title: "Regularização Documental Integral",
          description: "Providenciamos atualização de documentos pessoais, inclusão de dependentes em planos de saúde e previdência, alteração de beneficiários e demais regularizações decorrentes."
        },
        {
          step: 7,
          title: "Acompanhamento Pós-Matrimonial",
          description: "Orientamos sobre direitos e deveres decorrentes do casamento, auxiliamos em questões supervenientes, mudanças de regime (quando possível) e atualizações necessárias ao longo do tempo."
        }
      ]}
      testimonials={[
        {
          name: "Marina e Paulo - Empresários",
          quote: "Nossos negócios familiares estavam em risco com o casamento. O pacto antenupcial protegeu as empresas e definiu claramente gestão do patrimônio comum. Casamos tranquilos e protegidos."
        },
        {
          name: "Ana Carolina - Médica",
          quote: "Vivíamos juntos há 8 anos mas nunca formalizamos. O reconhecimento da união estável garantiu direitos previdenciários e sucessórios que estávamos perdendo por não ter documentado."
        },
        {
          name: "Roberto e Juliana - Conversão",
          quote: "Convertemos nossa união estável em casamento mantendo a data original. Foi rápido, simples e agora temos todos os benefícios do casamento civil para questões internacionais."
        },
        {
          name: "Carlos - Advogado e Empresário",
          quote: "A orientação sobre regime de participação final nos aquestos foi perfeita para nosso perfil. Temos liberdade para administrar nossos bens individuais mas participamos do crescimento conjunto."
        },
        {
          name: "Fernanda e Lucas - Jovem Casal",
          quote: "Mesmo jovens e com pouco patrimônio, a orientação jurídica foi fundamental para entendermos nossos direitos e planejarmos o futuro financeiro com segurança e conhecimento."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença prática entre casamento e união estável?",
          answer: "Juridicamente geram os mesmos direitos patrimoniais e sucessórios. Casamento requer celebração civil formal; união estável pode ser reconhecida pelos fatos. Para alguns procedimentos (adoção internacional, visto de cônjuge) o casamento ainda é preferencial."
        },
        {
          question: "É obrigatório fazer pacto antenupcial?",
          answer: "Não. Sem pacto aplica-se automaticamente comunhão parcial de bens. Pacto só é necessário para escolher outro regime (comunhão universal, separação total, participação final) ou estabelecer cláusulas específicas."
        },
        {
          question: "Posso mudar regime de bens após casamento?",
          answer: "Sim, desde 2002 é possível através de pedido judicial motivado, desde que não prejudique terceiros e ambos concordem. Requer comprovação de alteração das circunstâncias que justifiquem a mudança."
        },
        {
          question: "Como comprovar união estável?",
          answer: "Documentos que demonstrem convivência pública, contínua e duradoura: contas conjuntas, declaração de dependente no IR, fotos familiares, correspondências no mesmo endereço, testemunhas, contratos de financiamento conjunto."
        },
        {
          question: "Quais requisitos para casamento civil?",
          answer: "Ambos maiores de 16 anos (16-18 com autorização parental), ausência de impedimentos legais (parentesco, casamento anterior), documentação completa e cumprimento do processo de habilitação com antecedência mínima."
        },
        {
          question: "União estável tem direitos previdenciários?",
          answer: "Sim, companheiro(a) tem direito a pensão por morte, auxílio-reclusão e outros benefícios nas mesmas condições do cônjuge, desde que comprovada dependência econômica e relacionamento."
        },
        {
          question: "Como funciona regime de participação final nos aquestos?",
          answer: "Cada cônjuge administra livremente seus bens durante o casamento. Na dissolução, há direito à metade do patrimônio que o outro adquiriu onerosamente na constância da união. É híbrido entre separação e comunhão."
        },
        {
          question: "Casamento homoafetivo tem os mesmos direitos?",
          answer: "Absolutamente sim. Desde 2013 casamento entre pessoas do mesmo sexo é plenamente reconhecido com todos os direitos iguais: adoção, herança, benefícios previdenciários, declaração conjunta de IR, etc."
        }
      ]}
      relatedServices={[
        {
          name: "Divórcio e Separação",
          path: "/servicos/divorcio"
        },
        {
          name: "Planejamento Patrimonial",
          path: "/servicos/planejamento-patrimonial"
        },
        {
          name: "Testamentos e Sucessões",
          path: "/servicos/testamentos-sucessoes"
        },
        {
          name: "Holding Familiar",
          path: "/servicos/holding-familiar"
        }
      ]}
      mainAreaPath="/areas/familia"
    />
  );
};

export default CasamentoUniaoService;
