
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';

const EmpresarialPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const services = [
    {
      title: "Constituição de Empresas",
      description: "Assessoria completa para abertura de empresas, escolha do tipo societário adequado e elaboração dos atos constitutivos.",
      path: "/servicos/constituicao-empresas"
    },
    {
      title: "Contratos Empresariais",
      description: "Elaboração, análise e negociação de contratos comerciais, de fornecimento, distribuição e parcerias estratégicas.",
      path: "/servicos/contratos-empresariais"
    },
    {
      title: "Fusões e Aquisições",
      description: "Assessoria em operações de compra, venda, fusão, incorporação e outras formas de reorganização societária.",
      path: "/servicos/contratos-empresariais"
    },
    {
      title: "Reestruturação Societária",
      description: "Planejamento e execução de reorganizações societárias para otimização operacional, tributária e sucessória.",
      path: "/servicos/constituicao-empresas"
    },
    {
      title: "Governança Corporativa",
      description: "Implementação de práticas de governança, regulamentos internos e estruturas de compliance.",
      path: "/servicos/contratos-empresariais"
    },
    {
      title: "Compliance Empresarial",
      description: "Desenvolvimento de programas de integridade e conformidade com as legislações aplicáveis.",
      path: "/servicos/constituicao-empresas"
    },
    {
      title: "Propriedade Intelectual",
      description: "Proteção de marcas, patentes, direitos autorais e outros ativos intangíveis das empresas.",
      path: "/servicos/contratos-empresariais"
    },
    {
      title: "Contencioso Empresarial",
      description: "Representação em litígios societários, disputas contratuais e outras controvérsias empresariais.",
      path: "/servicos/contratos-empresariais"
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Empresarial"
      description="O Direito Empresarial tem como objetivo cuidar o exercício da atividade econômica organizada de fornecimento de bens e serviços, a chamada empresa. Seu objeto de estudo é resolver os conflitos de interesses envolvendo empresários ou relacionados às empresas que eles exploram."
      currentArea="empresarial"
    >
      <h2 className={`text-4xl font-canela mb-16 ${isDark ? 'text-white' : 'text-black'}`}>Serviços Especializados</h2>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card 
            key={index} 
            className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60' : 'bg-white/60'} transition-all duration-300 cursor-pointer`}
            onClick={() => navigate(service.path)}
          >
            <CardContent className="p-8">
              <h3 className={`text-2xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{service.title}</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700' + ' leading-relaxed'}>{service.description}</p>
              <p className={`mt-4 font-medium ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                Saiba mais →
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PracticeAreaLayout>
  );
};

export default EmpresarialPage;
