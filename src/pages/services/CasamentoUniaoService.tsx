
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const CasamentoUniaoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Casamento e União Estável"
      serviceDescription="Assessoria jurídica completa para formalização e regularização de casamentos e uniões estáveis, incluindo contratos pré-nupciais, pactos de convivência e proteção patrimonial."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Segurança Jurídica",
          description: "Contratos matrimoniais e pactos de convivência que garantem proteção patrimonial e segurança jurídica para o casal.",
          icon: "🛡️"
        },
        {
          title: "Reconhecimento de Direitos",
          description: "Regularização de uniões estáveis com reconhecimento legal e defesa de todos os direitos previstos em lei.",
          icon: "⚖️"
        },
        {
          title: "Proteção Patrimonial",
          description: "Orientação especializada sobre regimes de bens e estratégias para proteção do patrimônio individual e familiar.",
          icon: "💰"
        },
        {
          title: "Planejamento Sucessório",
          description: "Assessoria em testamentos e planejamento sucessório integrado ao regime matrimonial escolhido.",
          icon: "📋"
        },
        {
          title: "União Homoafetiva",
          description: "Especialização em casamento e união estável entre pessoas do mesmo sexo, garantindo todos os direitos constitucionais.",
          icon: "🏳️‍🌈"
        },
        {
          title: "Conversão e Modificação",
          description: "Conversão de união estável em casamento e alteração de regimes matrimoniais quando necessário.",
          icon: "🔄"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta Inicial Detalhada",
          description: "Análise da situação patrimonial do casal, orientação sobre regimes de bens e identificação das necessidades específicas de proteção."
        },
        {
          step: 2,
          title: "Planejamento Patrimonial",
          description: "Desenvolvimento de estratégia personalizada considerando patrimônio atual, expectativas futuras, atividade profissional e objetivos familiares."
        },
        {
          step: 3,
          title: "Elaboração de Contratos",
          description: "Redação de pacto antenupcial, contrato de convivência ou outros instrumentos adequados à situação específica do casal."
        },
        {
          step: 4,
          title: "Procedimentos Cartoriais",
          description: "Acompanhamento dos procedimentos de habilitação para casamento, escritura pública de pacto ou reconhecimento de união estável."
        },
        {
          step: 5,
          title: "Regularização Documental",
          description: "Providências para atualização de documentos, alteração de nome (se desejado) e registro de mudança de estado civil."
        },
        {
          step: 6,
          title: "Orientação Continuada",
          description: "Acompanhamento para questões supervenientes, alterações contratuais e orientações sobre direitos e deveres conjugais."
        }
      ]}
      testimonials={[
        {
          name: "Mariana e João, Empresários",
          quote: "O pacto antenupcial protegeu nossas empresas familiares. Casamos tranquilos sabendo que nossos patrimônios estão seguros e organizados."
        },
        {
          name: "Carlos P., Médico",
          quote: "Após 15 anos de união estável, o reconhecimento legal trouxe segurança jurídica para nossa família e direitos previdenciários para minha companheira."
        },
        {
          name: "Amanda e Sofia, Casal Homoafetivo",
          quote: "Conseguimos nos casar civilmente com total segurança jurídica. Hoje temos todos os direitos garantidos e uma família legalmente constituída."
        },
        {
          name: "Roberto L., Advogado",
          quote: "A orientação sobre regime de bens foi fundamental. Escolhemos a participação final nos aquestos para equilibrar proteção e comunhão patrimonial."
        },
        {
          name: "Helena M., Arquiteta",
          quote: "A conversão da nossa união estável em casamento foi simples e rápida. Agora temos a formalização que sempre desejamos."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre casamento e união estável?",
          answer: "O casamento é um ato formal celebrado perante autoridade competente, enquanto a união estável é reconhecida pela convivência pública, contínua e duradoura. Ambos geram efeitos jurídicos similares, mas o casamento oferece maior segurança jurídica e facilidade de comprovação."
        },
        {
          question: "É obrigatório fazer pacto antenupcial?",
          answer: "Não é obrigatório, mas é altamente recomendável quando há patrimônio significativo, empresas, bens de família ou intenção de proteger determinados ativos. Sem pacto, aplica-se o regime legal da comunhão parcial de bens."
        },
        {
          question: "Quais são os regimes de bens disponíveis?",
          answer: "Comunhão parcial (padrão), comunhão universal, separação total de bens e participação final nos aquestos. Cada regime tem características específicas de proteção e partilha patrimonial."
        },
        {
          question: "Posso alterar o regime de bens após o casamento?",
          answer: "Sim, é possível através de processo judicial com justificativa relevante e sem prejuízo a terceiros. Requer motivação consistente e concordância de ambos os cônjuges."
        },
        {
          question: "Como comprovar união estável?",
          answer: "Através de documentos que demonstrem vida em comum: conta bancária conjunta, declaração de dependente no IR, seguro de vida, testemunhas, fotos, contratos de locação em conjunto, entre outros."
        },
        {
          question: "Casais homoafetivos têm os mesmos direitos?",
          answer: "Sim, desde 2013 têm direito ao casamento civil e todos os direitos decorrentes: regime de bens, adoção, herança, pensão, benefícios previdenciários e fiscais."
        },
        {
          question: "É possível casar no exterior?",
          answer: "Sim, brasileiros podem casar no exterior. O casamento deve ser registrado no consulado brasileiro ou ter sua validade reconhecida no Brasil através de processo específico."
        },
        {
          question: "Preciso de advogado para casar?",
          answer: "Para o casamento em si, não. Mas é recomendável consultar advogado para orientação sobre regime de bens, elaboração de pacto antenupcial e planejamento patrimonial."
        }
      ]}
      relatedServices={[
        {
          name: "Divórcio",
          path: "/servicos/divorcio"
        },
        {
          name: "Inventário e Partilha",
          path: "/servicos/inventario-partilha"
        },
        {
          name: "Testamentos e Sucessões",
          path: "/servicos/testamentos-sucessoes"
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
