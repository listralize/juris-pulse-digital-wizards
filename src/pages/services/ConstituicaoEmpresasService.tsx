
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ConstituicaoEmpresasService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Empresarial"
      serviceName="Constituição e Estruturação de Empresas"
      serviceDescription="Construir um império começa com uma fundação sólida. Não apenas registramos uma empresa; arquitetamos para o sucesso, garantindo que cada cláusula, cada escolha societária, seja uma peça estratégica no plano de dominação de mercado."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Estrutura Societária Blindada",
          description: "Escolhemos a armadura certa para a batalha. A estrutura que maximiza proteção e flexibilidade é definida desde o primeiro dia, criando uma fortaleza jurídica inexpugnável."
        },
        {
          title: "Documentos Constitutivos Estratégicos",
          description: "Elaboramos contratos sociais e estatutos como a constituição do seu legado. Documentos redigidos com precisão cirúrgica e visão estratégica, blindando relações internas."
        },
        {
          title: "Planejamento para Dominação",
          description: "Preparamos o terreno para crescimento futuro, eficiência fiscal e prevenção de disputas. Cada movimento orquestrado para otimizar estrutura e impulsionar eficiência operacional."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Estratégica do Negócio",
          description: "Entendimento profundo do modelo de negócio, objetivos de dominação e definição da estrutura societária como arma competitiva."
        },
        {
          step: 2,
          title: "Arquitetura Jurídica Personalizada",
          description: "Redação de atos constitutivos como mapas de rota para o sucesso, definindo direitos e blindando relações entre sócios e administradores."
        },
        {
          step: 3,
          title: "Blindagem Regulatória Completa",
          description: "Protocolo estratégico em Juntas Comerciais, obtenção de CNPJ e registros necessários para dominar desde o primeiro dia de operação."
        },
        {
          step: 4,
          title: "Licenciamento Setorial Estratégico",
          description: "Orientação especializada para obtenção de licenças específicas, transformando complexidade regulatória em vantagem competitiva."
        },
        {
          step: 5,
          title: "Entrega de Fortaleza Empresarial",
          description: "Entrega completa da documentação e orientações estratégicas sobre obrigações societárias que maximizam proteção e oportunidades."
        }
      ]}
      testimonials={[
        {
          name: "TechStart Innovation",
          quote: "A estrutura societária criada foi nossa vantagem competitiva desde o dia um. Crescemos 400% em dois anos com total proteção jurídica e otimização fiscal."
        },
        {
          name: "Holding Empresarial Alpha",
          quote: "Não apenas constituíram nossa empresa, arquitetaram um império. A estrutura permite expansões estratégicas e protege nossos ativos como uma fortaleza."
        },
        {
          name: "Grupo Industrial Beta",
          quote: "A visão estratégica na constituição nos poupou milhões em reorganizações futuras. Nascemos prontos para dominar o mercado."
        }
      ]}
      faq={[
        {
          question: "Como a estrutura societária pode ser uma vantagem competitiva?",
          answer: "A escolha estratégica do tipo societário (LTDA, SA, EIRELI) não é apenas conformidade legal - é uma arma competitiva. Estruturamos para maximizar proteção patrimonial, otimizar tributação, facilitar captação de investimento e preparar para futuras expansões. Cada cláusula é pensada para criar vantagem, não apenas cumprir lei."
        },
        {
          question: "Qual o diferencial de uma constituição estratégica versus tradicional?",
          answer: "Enquanto escritórios tradicionais apenas 'abrem empresas', nós arquitetamos impérios. Analisamos objetivos de longo prazo, planejamos crescimento, estruturamos para eficiência fiscal máxima e criamos documentos que antecipam cenários futuros. É a diferença entre construir uma casa e construir uma fortaleza."
        },
        {
          question: "Como garantem proteção máxima desde a constituição?",
          answer: "Implementamos blindagem jurídica multicamadas: escolha de tipo societário que limita responsabilidade, cláusulas que protegem sócios minoritários, estruturas que segregam riscos operacionais, planejamento sucessório preventivo e documentação que previne conflitos futuros. Proteção não é opcional - é mandatória."
        }
      ]}
      relatedServices={[
        {
          name: "Contratos Empresariais",
          path: "/servicos/contratos-empresariais"
        },
        {
          name: "Reestruturação Societária",
          path: "/servicos/reestruturacao-societaria"
        }
      ]}
      mainAreaPath="/empresarial"
    />
  );
};

export default ConstituicaoEmpresasService;
