
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';

const EmpresarialPage = () => {
  const services = [
    {
      title: "Constituição de Empresas",
      description: "Assessoria completa para abertura de empresas, escolha do tipo societário adequado e elaboração dos atos constitutivos."
    },
    {
      title: "Contratos Empresariais",
      description: "Elaboração, análise e negociação de contratos comerciais, de fornecimento, distribuição e parcerias estratégicas."
    },
    {
      title: "Fusões e Aquisições",
      description: "Assessoria em operações de compra, venda, fusão, incorporação e outras formas de reorganização societária."
    },
    {
      title: "Reestruturação Societária",
      description: "Planejamento e execução de reorganizações societárias para otimização operacional, tributária e sucessória."
    },
    {
      title: "Governança Corporativa",
      description: "Implementação de práticas de governança, regulamentos internos e estruturas de compliance."
    },
    {
      title: "Compliance Empresarial",
      description: "Desenvolvimento de programas de integridade e conformidade com as legislações aplicáveis."
    },
    {
      title: "Propriedade Intelectual",
      description: "Proteção de marcas, patentes, direitos autorais e outros ativos intangíveis das empresas."
    },
    {
      title: "Contencioso Empresarial",
      description: "Representação em litígios societários, disputas contratuais e outras controvérsias empresariais."
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Empresarial"
      description="O Direito Empresarial tem como objetivo cuidar o exercício da atividade econômica organizada de fornecimento de bens e serviços, a chamada empresa. Seu objeto de estudo é resolver os conflitos de interesses envolvendo empresários ou relacionados às empresas que eles exploram."
      currentArea="empresarial"
    >
      <div className="mt-8 md:mt-16">
        <h2 className="text-3xl md:text-4xl font-canela mb-8 inline-block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Serviços Especializados
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card key={index} className="service-card bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-canela mb-3 text-white">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PracticeAreaLayout>
  );
};

export default EmpresarialPage;
