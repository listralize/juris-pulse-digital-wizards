
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ConstituicaoEmpresasService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Empresarial"
      serviceName="Constituição de Empresas"
      serviceDescription="Assessoria completa para abertura de empresas, escolha do tipo societário adequado e elaboração dos atos constitutivos, garantindo o melhor enquadramento legal e fiscal para seu negócio."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Estrutura Societária Adequada",
          description: "Escolha do tipo societário mais vantajoso considerando aspectos tributários, operacionais e de responsabilidade dos sócios."
        },
        {
          title: "Conformidade Legal Completa",
          description: "Cumprimento de todas as exigências legais para constituição, evitando problemas futuros com órgãos reguladores."
        },
        {
          title: "Planejamento Fiscal Otimizado",
          description: "Orientação sobre o melhor regime tributário desde a constituição, maximizando a eficiência fiscal da empresa."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consultoria Inicial",
          description: "Análise do modelo de negócio, objetivos dos sócios e definição da estrutura societária mais adequada."
        },
        {
          step: 2,
          title: "Elaboração dos Atos Constitutivos",
          description: "Redação do contrato social ou estatuto social, definindo direitos e obrigações dos sócios e administradores."
        },
        {
          step: 3,
          title: "Registros e Licenças",
          description: "Protocolo na Junta Comercial, obtenção do CNPJ e demais registros necessários para início das atividades."
        },
        {
          step: 4,
          title: "Licenças Específicas",
          description: "Orientação para obtenção de licenças específicas do ramo de atividade junto aos órgãos competentes."
        },
        {
          step: 5,
          title: "Entrega e Orientações",
          description: "Entrega de toda documentação da empresa constituída e orientações sobre obrigações societárias e fiscais."
        }
      ]}
      testimonials={[
        {
          name: "Ricardo M., Empreendedor",
          quote: "A assessoria foi fundamental para estruturar minha empresa da forma mais eficiente. Economizei impostos desde o primeiro mês de funcionamento."
        },
        {
          name: "StartTech Inovação",
          quote: "O acompanhamento durante toda a constituição foi excepcional. Nossa empresa nasceu com uma estrutura sólida e bem planejada."
        },
        {
          name: "Grupo Familiar Investimentos",
          quote: "A escolha da estrutura societária sugerida facilitou nossa governança e otimizou nossa carga tributária significativamente."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre os tipos societários disponíveis?",
          answer: "Os principais tipos são: LTDA (limitada) - mais comum, com responsabilidade limitada ao capital social; SA (sociedade anônima) - para empresas de grande porte ou com captação de investimento; EIRELI - para empresário individual com responsabilidade limitada; MEI - para pequenos negócios com faturamento limitado. Cada tipo tem características específicas de responsabilidade, tributação e governança."
        },
        {
          question: "Quanto tempo demora para constituir uma empresa?",
          answer: "O prazo varia de 15 a 45 dias úteis, dependendo da complexidade da estrutura societária, tipo de atividade e órgãos envolvidos. Empresas simples (LTDA comum) costumam ficar prontas em 15-20 dias, enquanto estruturas mais complexas ou atividades regulamentadas podem demorar mais tempo devido às licenças específicas necessárias."
        },
        {
          question: "É possível alterar a estrutura societária depois da constituição?",
          answer: "Sim, é possível fazer alterações societárias após a constituição, como mudança de tipo societário, inclusão/exclusão de sócios, alteração de capital social, mudança de administração, etc. No entanto, algumas alterações podem ter custos e implicações tributárias, por isso é importante planejar bem a estrutura inicial."
        }
      ]}
      relatedServices={[
        {
          name: "Contratos Empresariais",
          path: "/servicos/contratos-empresariais"
        },
        {
          name: "Fusões e Aquisições",
          path: "/servicos/fusoes-aquisicoes"
        }
      ]}
      mainAreaPath="/empresarial"
    />
  );
};

export default ConstituicaoEmpresasService;
