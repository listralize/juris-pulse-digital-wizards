
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';

const EmpresarialPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
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
      <h2 className="text-4xl font-canela mb-16 text-white">Serviços Especializados</h2>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="bg-black border border-white/20 hover:bg-black/80 transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-canela mb-4 text-white">{service.title}</h3>
              <p className="text-white/80 leading-relaxed">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PracticeAreaLayout>
  );
};

export default EmpresarialPage;
